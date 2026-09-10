"""
Core PDF Verification Engine for VeriSeal.
Uses pyHanko to verify Indian Government digital signatures against CCA/RCAI trust store,
checks cryptographic hash integrity, extracts signer info, detects doc types, and embeds LTV data.
Operates 100% in-memory with BytesIO (zero file storage).
"""

import base64
import io
import asyncio
import concurrent.futures
import logging
from datetime import datetime
from typing import Optional, Dict, Any, List

import pypdf
from pyhanko.pdf_utils.reader import PdfFileReader
from pyhanko.pdf_utils.incremental_writer import IncrementalPdfFileWriter
from pyhanko.pdf_utils.misc import PdfReadError
from pyhanko.sign.validation import async_validate_pdf_signature, async_add_validation_info
from pyhanko.sign.validation.status import SignatureCoverageLevel

from cca_certs import get_cca_trust_context
from models import SignatureDetail, VerificationResponse

logger = logging.getLogger("veriseal.verifier")


# Custom Verification Exceptions
class VerificationEngineError(Exception):
    """Base exception for VeriSeal verification failures."""
    def __init__(self, code: str, message: str, detail: Optional[str] = None, status_code: int = 400):
        self.code = code
        self.message = message
        self.detail = detail
        self.status_code = status_code
        super().__init__(message)


class NoSignatureFoundError(VerificationEngineError):
    def __init__(self, message: str = "No digital signature was found in the provided PDF document"):
        super().__init__(code="NO_SIGNATURE_FOUND", message=message, status_code=422)


class WrongPasswordError(VerificationEngineError):
    def __init__(self, message: str = "The PDF is password protected and an incorrect or missing password was provided"):
        super().__init__(code="WRONG_PASSWORD", message=message, status_code=401)


class InvalidPdfError(VerificationEngineError):
    def __init__(self, message: str = "The provided file is corrupted or not a recognized PDF document"):
        super().__init__(code="INVALID_PDF", message=message, status_code=400)


class VerificationFailedError(VerificationEngineError):
    def __init__(self, message: str = "Cryptographic verification failed", detail: Optional[str] = None):
        super().__init__(code="VERIFICATION_FAILED", message=message, detail=detail, status_code=500)


def detect_document_type(file_bytes: bytes, password: Optional[str] = None) -> str:
    """
    Analyzes text streams and metadata across the PDF to detect official document type:
    e-Aadhaar, Community Certificate, Nativity, Income, PAN Card, DigiLocker, ITR-V, Birth, Death.
    """
    text_content = ""
    try:
        stream = io.BytesIO(file_bytes)
        reader = pypdf.PdfReader(stream)
        if reader.is_encrypted:
            if password:
                reader.decrypt(password)
            else:
                return "e-Aadhaar (UIDAI)"  # Most common password-protected government doc in India

        # Extract text from the first 3 pages
        num_pages = min(len(reader.pages), 3)
        for i in range(num_pages):
            try:
                page_text = reader.pages[i].extract_text() or ""
                text_content += " " + page_text
            except Exception:
                pass

        if reader.metadata:
            for k, v in reader.metadata.items():
                if v:
                    text_content += f" {k}:{v}"
    except Exception as exc:
        logger.debug("Error during document type text extraction: %s", exc)

    lower = text_content.lower()

    if "uidai" in lower or "unique identification authority" in lower or "myaadhaar" in lower:
        return "e-Aadhaar (UIDAI)"
    if "community certificate" in lower or "சமூக சான்றிதழ்" in text_content or "caste certificate" in lower:
        return "Community Certificate"
    if "nativity certificate" in lower or "nativity" in lower or "பிறப்பிடச் சான்றிதழ்" in text_content:
        return "Nativity Certificate"
    if "income certificate" in lower or "வருமானச் சான்றிதழ்" in text_content:
        return "Income Certificate"
    if "first graduate" in lower or "முதல் பட்டதாரி" in text_content:
        return "First Graduate Certificate"
    if "permanent account number" in lower or ("income tax" in lower and "pan" in lower):
        return "PAN Card PDF"
    if "digilocker" in lower:
        return "DigiLocker Document"
    if "itr-v" in lower or "income tax return" in lower or "form 16" in lower:
        return "ITR-V (Income Tax Return)"
    if "birth certificate" in lower or "birth" in lower or "crstn" in lower or "ejanma" in lower:
        return "Birth Certificate"
    if "death certificate" in lower or "death" in lower:
        return "Death Certificate"

    return "Government Document"


async def async_verify_pdf(file_bytes: bytes, password: Optional[str] = None) -> VerificationResponse:
    """
    Verifies the digital signatures of an in-memory PDF file against the CCA India PKI trust chain.
    - Decrypts with password if required
    - Validates signature hash integrity and PKCS#7 certificate chain
    - Embeds LTV (Long Term Validation) data into output PDF
    - Returns structured response with base64 encoded verified PDF
    """
    if not file_bytes:
        raise InvalidPdfError("Empty file stream received")

    # Fast magic number check
    if not file_bytes.startswith(b"%PDF-"):
        raise InvalidPdfError("File header does not match valid PDF specification")

    detected_doc_type = detect_document_type(file_bytes, password)
    val_context = get_cca_trust_context()

    input_stream = io.BytesIO(file_bytes)

    # Step 1: Open PDF with pyHanko Incremental Reader
    try:
        reader = PdfFileReader(input_stream)
    except PdfReadError as pre:
        raise InvalidPdfError(f"Failed to parse PDF: {pre}")
    except Exception as e:
        raise InvalidPdfError(f"Malformed or unreadable PDF: {e}")

    # Handle encryption / password decryption if document is protected
    if reader.encrypted:
        from pyhanko.pdf_utils.crypt.api import AuthStatus
        if not password:
            raise WrongPasswordError("This PDF is password-protected. Please provide the document decryption password.")
        try:
            auth_res = reader.decrypt(password)
            if auth_res.status == AuthStatus.FAILED:
                raise WrongPasswordError("Incorrect password provided for this encrypted PDF.")
        except WrongPasswordError:
            raise
        except Exception as decrypt_err:
            raise WrongPasswordError(f"Failed to decrypt password-protected PDF: {decrypt_err}")

    # Step 2: Check for embedded digital signatures
    embedded_sigs = reader.embedded_signatures
    if not embedded_sigs:
        raise NoSignatureFoundError(
            "No digital signatures were detected in this document. Please ensure you are uploading the official digitally signed government PDF."
        )

    signatures_detail: List[SignatureDetail] = []
    overall_status: str = "VALID"
    valid_statuses_for_ltv = []

    # Step 3: Validate each signature
    for idx, sig in enumerate(embedded_sigs):
        try:
            status = await async_validate_pdf_signature(
                sig,
                signer_validation_context=val_context,
            )
        except Exception as val_err:
            logger.warning("Error evaluating signature field %s: %s", sig.field_name, val_err)
            signatures_detail.append(
                SignatureDetail(
                    field_name=sig.field_name or f"Signature_{idx+1}",
                    signer_name="Error reading certificate",
                    signer_org="N/A",
                    issuer="Unknown",
                    covers_whole_document=False,
                    hash_valid=False,
                    chain_valid=False,
                    ltv_added=False,
                )
            )
            overall_status = "INVALID"
            continue

        # Extract Signer Certificate Details
        signing_cert = status.signing_cert
        signer_name = "Government Signer"
        signer_org = "Government of India"
        issuer_name = "CCA India"
        valid_from = None
        valid_to = None

        if signing_cert:
            try:
                subject = signing_cert.subject.native
                signer_name = (
                    subject.get("common_name")
                    or subject.get("organization_name")
                    or signing_cert.subject.human_friendly
                )
                signer_org = (
                    subject.get("organization_name")
                    or subject.get("organizational_unit_name")
                    or "Government Authority"
                )
            except Exception:
                signer_name = signing_cert.subject.human_friendly

            try:
                issuer = signing_cert.issuer.native
                issuer_name = (
                    issuer.get("common_name")
                    or issuer.get("organization_name")
                    or signing_cert.issuer.human_friendly
                )
            except Exception:
                issuer_name = signing_cert.issuer.human_friendly

            try:
                valid_from = signing_cert.not_valid_before
                valid_to = signing_cert.not_valid_after
            except Exception:
                pass

        # Determine signed_on timestamp
        signed_on = None
        try:
            if status.signer_reported_dt:
                signed_on = status.signer_reported_dt
            elif status.timestamp_validity and status.timestamp_validity.timestamp:
                signed_on = status.timestamp_validity.timestamp
            else:
                signed_on = datetime.utcnow()
        except Exception:
            signed_on = datetime.utcnow()

        # Check coverage
        covers_whole = False
        try:
            covers_whole = status.coverage in (
                SignatureCoverageLevel.ENTIRE_FILE,
                SignatureCoverageLevel.ENTIRE_REVISION,
            )
        except Exception:
            covers_whole = True

        # Check cryptographic validity and trust chain
        hash_is_valid = bool(status.intact and status.valid)
        chain_is_valid = bool(status.trusted)

        sig_detail = SignatureDetail(
            field_name=sig.field_name or f"Signature_{idx+1}",
            signer_name=str(signer_name),
            signer_org=str(signer_org),
            issuer=str(issuer_name),
            valid_from=valid_from,
            valid_to=valid_to,
            signed_on=signed_on,
            covers_whole_document=covers_whole,
            hash_valid=hash_is_valid,
            chain_valid=chain_is_valid,
            ltv_added=False,
        )

        signatures_detail.append(sig_detail)

        if not hash_is_valid:
            overall_status = "INVALID"
        elif not chain_is_valid and overall_status != "INVALID":
            overall_status = "UNKNOWN"

        if hash_is_valid:
            valid_statuses_for_ltv.append(status)

    # Step 4: Embed LTV (Long Term Validation) / DSS Information into Output PDF
    verified_pdf_base64 = None
    ltv_applied = False

    if overall_status == "VALID" and embedded_sigs:
        try:
            output_stream = io.BytesIO()
            # Apply DSS validation info for Adobe permanent green tick
            await async_add_validation_info(
                embedded_sig=embedded_sigs[0],
                validation_context=val_context,
                output=output_stream,
            )
            verified_bytes = output_stream.getvalue()
            if verified_bytes:
                verified_pdf_base64 = base64.b64encode(verified_bytes).decode("ascii")
                ltv_applied = True
                for s in signatures_detail:
                    s.ltv_added = True
        except Exception as ltv_exc:
            logger.info("LTV DSS embedding skipped: %s", ltv_exc)
            # If DSS embedding could not be completed, fallback to providing original base64
            verified_pdf_base64 = base64.b64encode(file_bytes).decode("ascii")
    elif overall_status in ("VALID", "UNKNOWN"):
        verified_pdf_base64 = base64.b64encode(file_bytes).decode("ascii")

    # Construct final result
    return VerificationResponse(
        status=overall_status,  # type: ignore
        signatures=signatures_detail,
        document_type=detected_doc_type,
        error=None,
        verified_pdf_base64=verified_pdf_base64,
    )


def verify_pdf(file_bytes: bytes, password: Optional[str] = None) -> VerificationResponse:
    """
    Universal verification entry point supporting execution in any context.
    Executes async_verify_pdf safely whether or not an event loop is running.
    """
    try:
        loop = asyncio.get_running_loop()
    except RuntimeError:
        loop = None

    if loop and loop.is_running():
        with concurrent.futures.ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(asyncio.run, async_verify_pdf(file_bytes, password)).result()
    else:
        return asyncio.run(async_verify_pdf(file_bytes, password))

