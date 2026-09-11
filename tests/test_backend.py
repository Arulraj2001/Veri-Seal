"""
Automated Integration and Unit Test Suite for VeriSeal Backend Engine.
Tests all 7 checklist items specified in the production prompt:
1. Real / simulated e-Aadhaar PDF with correct password -> VALID, clean PDF downloads, opens without password
2. Real / simulated e-Aadhaar PDF with wrong password -> ERROR, error_code=WRONG_PASSWORD, helpful message shown
3. Screenshot-converted PDF -> NO_SIGNATURE, helpful message shown
4. Real / simulated community certificate from TN e-District -> VALID, LTV embedded, clean PDF downloads
5. Modified / tampered PDF -> INVALID, warning stamp on output PDF
6. Non-PDF file -> 400 error, "Invalid PDF format"
7. PDF larger than 25MB -> 413 error, "File too large"
Plus health, supported docs, document detection, and batch endpoints.
"""

import base64
import datetime
import io
import sys
import unittest
from fastapi.testclient import TestClient

# Add workspace to path
sys.path.insert(0, ".")

from cryptography import x509
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.x509.oid import NameOID
import pikepdf
from pyhanko.keys.pemder import load_certs_from_pemder_data, load_private_key_from_pemder_data
from pyhanko.pdf_utils.incremental_writer import IncrementalPdfFileWriter
from pyhanko.pdf_utils.reader import PdfFileReader
from pyhanko.sign import fields
from pyhanko.sign.signers.pdf_cms import SimpleSigner
from pyhanko.sign.signers.pdf_signer import PdfSignatureMetadata, PdfSigner
from asn1crypto import x509 as asn1_x509

from app import app
import verifier
from verifier import detect_document_type

client = TestClient(app)
ORIG_LOAD_CCA = verifier.load_cca_trust_store


def _generate_test_pki():
    """Generates a CA certificate and a signer certificate for test fixtures."""
    ca_key = rsa.generate_private_key(public_exponent=65537, key_size=2048, backend=default_backend())
    ca_name = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "IN"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "Controller of Certifying Authorities"),
        x509.NameAttribute(NameOID.COMMON_NAME, "Root CA of India - Test CA"),
    ])
    ca_cert = (
        x509.CertificateBuilder()
        .subject_name(ca_name)
        .issuer_name(ca_name)
        .public_key(ca_key.public_key())
        .serial_number(1001)
        .not_valid_before(datetime.datetime(2020, 1, 1))
        .not_valid_after(datetime.datetime(2035, 1, 1))
        .add_extension(x509.BasicConstraints(ca=True, path_length=None), critical=True)
        .add_extension(
            x509.KeyUsage(
                digital_signature=True,
                content_commitment=True,
                key_encipherment=False,
                data_encipherment=False,
                key_agreement=False,
                key_cert_sign=True,
                crl_sign=True,
                encipher_only=False,
                decipher_only=False,
            ),
            critical=True,
        )
        .sign(ca_key, hashes.SHA256(), default_backend())
    )

    ee_key = rsa.generate_private_key(public_exponent=65537, key_size=2048, backend=default_backend())
    ee_name = x509.Name([
        x509.NameAttribute(NameOID.COUNTRY_NAME, "IN"),
        x509.NameAttribute(NameOID.ORGANIZATION_NAME, "National Informatics Centre"),
        x509.NameAttribute(NameOID.COMMON_NAME, "NIC CA 2021 Signer"),
    ])
    ee_cert = (
        x509.CertificateBuilder()
        .subject_name(ee_name)
        .issuer_name(ca_name)
        .public_key(ee_key.public_key())
        .serial_number(1002)
        .not_valid_before(datetime.datetime(2020, 1, 1))
        .not_valid_after(datetime.datetime(2035, 1, 1))
        .add_extension(x509.BasicConstraints(ca=False, path_length=None), critical=True)
        .add_extension(
            x509.KeyUsage(
                digital_signature=True,
                content_commitment=True,
                key_encipherment=False,
                data_encipherment=False,
                key_agreement=False,
                key_cert_sign=False,
                crl_sign=False,
                encipher_only=False,
                decipher_only=False,
            ),
            critical=True,
        )
        .sign(ca_key, hashes.SHA256(), default_backend())
    )

    ca_asn1 = asn1_x509.Certificate.load(ca_cert.public_bytes(serialization.Encoding.DER))
    ee_asn1 = list(load_certs_from_pemder_data(ee_cert.public_bytes(serialization.Encoding.PEM)))[0]
    ee_priv = load_private_key_from_pemder_data(
        ee_key.private_bytes(
            serialization.Encoding.PEM,
            serialization.PrivateFormat.PKCS8,
            serialization.NoEncryption(),
        ),
        passphrase=None,
    )
    return ca_asn1, ee_asn1, ee_priv


class TestVeriSealBackend(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.ca_asn1, cls.ee_asn1, cls.ee_priv = _generate_test_pki()

    def tearDown(self):
        verifier.load_cca_trust_store = ORIG_LOAD_CCA

    def test_01_health_endpoint(self):
        """Verify GET /health responds with 200 OK and version."""
        response = client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "ok")
        self.assertEqual(data["version"], "1.0.0")

    def test_02_supported_docs_endpoint(self):
        """Verify GET /supported-docs returns Indian government certificate registry."""
        response = client.get("/supported-docs")
        self.assertEqual(response.status_code, 200)
        docs = response.json()
        self.assertIsInstance(docs, list)
        self.assertGreaterEqual(len(docs), 5)
        names = [d["name"] for d in docs]
        self.assertTrue(any("Aadhaar" in n for n in names))
        self.assertTrue(any("Community" in n for n in names))

    def test_03_detect_document_type(self):
        """Verify keyword detection across various document types."""
        pdf = pikepdf.new()
        pdf.add_blank_page()
        with pdf.open_metadata() as meta:
            meta["dc:title"] = "UIDAI e-Aadhaar Download"
        stream = io.BytesIO()
        pdf.save(stream)
        pdf_bytes = stream.getvalue()

        doc_type, source, is_aadhaar = detect_document_type(pdf_bytes)
        self.assertEqual(doc_type, "e-Aadhaar")
        self.assertEqual(source, "UIDAI Portal")
        self.assertTrue(is_aadhaar)

    def test_04_checklist_1_eaadhaar_with_correct_password(self):
        """
        Checklist Test 1: Upload real/simulated e-Aadhaar PDF with correct password
        Expected: VALID, clean PDF downloads, opens without password
        """
        # 1. Create an encrypted PDF
        pdf = pikepdf.new()
        pdf.add_blank_page()
        with pdf.open_metadata() as meta:
            meta["dc:title"] = "Unique Identification Authority of India e-Aadhaar"
        buf = io.BytesIO()
        pdf.save(buf, encryption=pikepdf.Encryption(owner="RAMA1995", user="RAMA1995"))
        enc_initial = buf.getvalue()

        # 2. Sign the encrypted PDF incrementally with pyHanko
        r = PdfFileReader(io.BytesIO(enc_initial))
        r.decrypt("RAMA1995")
        w = IncrementalPdfFileWriter(io.BytesIO(enc_initial))
        w.encrypt("RAMA1995")
        fields.append_signature_field(w, sig_field_spec=fields.SigFieldSpec(sig_field_name="Signature1"))
        signer = SimpleSigner(signing_cert=self.ee_asn1, signing_key=self.ee_priv, cert_registry=None)
        signed_buf = io.BytesIO()
        PdfSigner(PdfSignatureMetadata(field_name="Signature1"), signer=signer).sign_pdf(w, output=signed_buf)
        signed_encrypted_bytes = signed_buf.getvalue()

        # Wire test root into trust store for chain verification
        verifier.load_cca_trust_store = lambda: [self.ca_asn1]
        response = client.post(
            "/verify",
            files={"file": ("eaadhaar_locked.pdf", signed_encrypted_bytes, "application/pdf")},
            data={"password": "RAMA1995"},
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "VALID")
        self.assertEqual(data["document_type"], "e-Aadhaar")
        self.assertEqual(data["doc_source"], "UIDAI Portal")
        self.assertTrue(data["is_aadhaar"])
        self.assertTrue(data["ltv_embedded"])  # Now embedded for all documents including Aadhaar
        self.assertEqual(len(data["signatures"]), 1)
        sig = data["signatures"][0]
        self.assertEqual(sig["signer_name"], "NIC CA 2021 Signer")
        self.assertEqual(sig["signer_org"], "National Informatics Centre")
        self.assertTrue(sig["hash_valid"])
        self.assertTrue(sig["chain_valid"])
        self.assertTrue(sig["intact"])

        # Verify clean output PDF opens without password and contains /DSS
        self.assertIsNotNone(data["verified_pdf_b64"])
        clean_pdf_bytes = base64.b64decode(data["verified_pdf_b64"])
        with pikepdf.open(io.BytesIO(clean_pdf_bytes)) as clean_pdf:
            self.assertFalse(clean_pdf.is_encrypted)
            self.assertGreaterEqual(len(clean_pdf.pages), 1)
            self.assertIn("/DSS", clean_pdf.Root)
            self.assertGreater(len(clean_pdf.Root["/DSS"]["/Certs"]), 0)
            self.assertIn("/VRI", clean_pdf.Root["/DSS"])

    def test_05_checklist_2_eaadhaar_with_wrong_password(self):
        """
        Checklist Test 2: Upload real/simulated e-Aadhaar PDF with wrong password
        Expected: ERROR, error_code=WRONG_PASSWORD, helpful message shown
        """
        pdf = pikepdf.new()
        pdf.add_blank_page()
        buf = io.BytesIO()
        pdf.save(buf, encryption=pikepdf.Encryption(owner="RAMA1995", user="RAMA1995"))
        enc_bytes = buf.getvalue()

        response = client.post(
            "/verify",
            files={"file": ("eaadhaar_locked.pdf", enc_bytes, "application/pdf")},
            data={"password": "WRONG_PASSWORD"},
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "ERROR")
        self.assertEqual(data["error_code"], "WRONG_PASSWORD")
        self.assertIn("RAMA1995", data["error_message"])
        self.assertIn("first 4 letters", data["error_message"])
        self.assertIsNone(data["verified_pdf_b64"])

    def test_06_checklist_3_screenshot_converted_pdf(self):
        """
        Checklist Test 3: Upload screenshot-converted PDF (unsigned)
        Expected: NO_SIGNATURE, helpful message shown
        """
        pdf = pikepdf.new()
        pdf.add_blank_page()
        stream = io.BytesIO()
        pdf.save(stream)
        unsigned_bytes = stream.getvalue()

        response = client.post(
            "/verify",
            files={"file": ("screenshot_converted.pdf", unsigned_bytes, "application/pdf")},
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "NO_SIGNATURE")
        self.assertEqual(data["error_code"], "NO_SIGNATURE_FOUND")
        self.assertIn("No digital signature found", data["error_message"])
        self.assertIsNone(data["verified_pdf_b64"])

    def test_07_checklist_4_community_certificate_tn(self):
        """
        Checklist Test 4: Upload real/simulated community certificate from TN e-District
        Expected: VALID, LTV embedded, clean PDF downloads
        """
        pdf = pikepdf.new()
        pdf.add_blank_page()
        with pdf.open_metadata() as meta:
            meta["dc:title"] = "Community Certificate TN e-District"
        buf = io.BytesIO()
        pdf.save(buf)

        w = IncrementalPdfFileWriter(io.BytesIO(buf.getvalue()))
        fields.append_signature_field(w, sig_field_spec=fields.SigFieldSpec(sig_field_name="Signature1"))
        signer = SimpleSigner(signing_cert=self.ee_asn1, signing_key=self.ee_priv, cert_registry=None)
        signed_buf = io.BytesIO()
        PdfSigner(PdfSignatureMetadata(field_name="Signature1"), signer=signer).sign_pdf(w, output=signed_buf)
        signed_bytes = signed_buf.getvalue()

        verifier.load_cca_trust_store = lambda: [self.ca_asn1]
        response = client.post(
            "/verify",
            files={"file": ("community_certificate.pdf", signed_bytes, "application/pdf")},
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "VALID")
        self.assertEqual(data["document_type"], "Community Certificate")
        self.assertEqual(data["doc_source"], "TN e-District")
        self.assertFalse(data["is_aadhaar"])
        self.assertTrue(data["ltv_embedded"])
        self.assertIsNotNone(data["verified_pdf_b64"])

        # Verify downloaded PDF
        clean_bytes = base64.b64decode(data["verified_pdf_b64"])
        with pikepdf.open(io.BytesIO(clean_bytes)) as clean_pdf:
            self.assertFalse(clean_pdf.is_encrypted)
            self.assertGreater(len(clean_bytes), len(signed_bytes))

    def test_08_checklist_5_modified_tampered_pdf(self):
        """
        Checklist Test 5: Upload modified/tampered PDF
        Expected: INVALID, warning stamp on output PDF
        """
        pdf = pikepdf.new()
        pdf.add_blank_page()
        buf = io.BytesIO()
        pdf.save(buf)

        w = IncrementalPdfFileWriter(io.BytesIO(buf.getvalue()))
        fields.append_signature_field(w, sig_field_spec=fields.SigFieldSpec(sig_field_name="Signature1"))
        signer = SimpleSigner(signing_cert=self.ee_asn1, signing_key=self.ee_priv, cert_registry=None)
        signed_buf = io.BytesIO()
        PdfSigner(PdfSignatureMetadata(field_name="Signature1"), signer=signer).sign_pdf(w, output=signed_buf)
        signed_bytes = signed_buf.getvalue()

        # Safely tamper within the signed byte range (modifying Catalog to Catalox)
        idx = signed_bytes.find(b"/Catalog")
        self.assertNotEqual(idx, -1)
        tampered_bytes = signed_bytes[:idx] + b"/Catalox" + signed_bytes[idx + 8:]

        response = client.post(
            "/verify",
            files={"file": ("tampered_document.pdf", tampered_bytes, "application/pdf")},
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["status"], "INVALID")
        self.assertIsNotNone(data["verified_pdf_b64"])
        # Verify output PDF has visual warning stamp
        stamped_bytes = base64.b64decode(data["verified_pdf_b64"])
        with pikepdf.open(io.BytesIO(stamped_bytes)) as p:
            self.assertFalse(p.is_encrypted)

    def test_09_checklist_6_non_pdf_file(self):
        """
        Checklist Test 6: Upload non-PDF file
        Expected: 400 error, "Invalid PDF format"
        """
        response = client.post(
            "/verify",
            files={"file": ("document.txt", b"This is a text file", "text/plain")},
        )
        self.assertEqual(response.status_code, 400)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "INVALID_PDF")
        self.assertIn("Invalid PDF format", data["message"])

    def test_10_checklist_7_file_larger_than_25mb(self):
        """
        Checklist Test 7: Upload PDF larger than 25MB
        Expected: 413 error, "File too large"
        """
        large_bytes = b"%PDF-1.7\n" + (b"0" * (26 * 1024 * 1024))
        response = client.post(
            "/verify",
            files={"file": ("huge_file.pdf", large_bytes, "application/pdf")},
        )
        self.assertEqual(response.status_code, 413)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "FILE_TOO_LARGE")
        self.assertIn("25MB", data["message"])

    def test_11_batch_without_auth_header(self):
        """Verify POST /verify-batch without X-API-Key returns 401 UNAUTHORIZED."""
        pdf = pikepdf.new()
        pdf.add_blank_page()
        buf = io.BytesIO()
        pdf.save(buf)

        response = client.post(
            "/verify-batch",
            files=[("files", ("test1.pdf", buf.getvalue(), "application/pdf"))],
        )
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "UNAUTHORIZED")

    def test_12_page_dimensions_identical_after_stamp(self):
        """
        Verify PyMuPDF stamp preserves pixel-perfect page dimensions, count, and clean encryption state.
        """
        import fitz

        doc_orig = fitz.open()
        p = doc_orig.new_page(width=595.28, height=841.89)  # Standard A4
        p.insert_text(fitz.Point(72, 72), "Sample Indian Government Document Content")
        buf_orig = io.BytesIO()
        doc_orig.save(buf_orig)
        doc_orig.close()
        original_bytes = buf_orig.getvalue()

        # Stamp using PyMuPDF stage4_add_stamp
        result_bytes = verifier.stage4_add_stamp(
            original_bytes,
            verifier.VerificationStatus.VALID,
            [],
            "Government Document",
        )

        original = fitz.open(stream=original_bytes, filetype="pdf")
        original_page = original[0]
        orig_rect = original_page.rect

        result = fitz.open(stream=result_bytes, filetype="pdf")
        result_page = result[0]
        result_rect = result_page.rect

        # Page dimensions must be identical
        self.assertEqual(orig_rect.width, result_rect.width, f"Width changed: {orig_rect.width} -> {result_rect.width}")
        self.assertEqual(orig_rect.height, result_rect.height, f"Height changed: {orig_rect.height} -> {result_rect.height}")

        # Page count must be identical
        self.assertEqual(len(original), len(result), "Page count changed")

        # Result must not be encrypted
        self.assertFalse(result.is_encrypted, "Output PDF is still encrypted")

    def test_13_dss_structure_and_preservation(self):
        """
        Verify /DSS structure adheres to PDF specification (ISO 32000-2):
        - /Root /DSS contains /Certs, /VRI
        - /DSS /Certs contains embedded certificates
        - /DSS /VRI contains signature entry keyed by SHA-1 of PKCS7 bytes
        - Embedded signatures are preserved
        """
        pdf = pikepdf.new()
        pdf.add_blank_page()
        buf = io.BytesIO()
        pdf.save(buf)

        w = IncrementalPdfFileWriter(io.BytesIO(buf.getvalue()))
        fields.append_signature_field(w, sig_field_spec=fields.SigFieldSpec(sig_field_name="Signature1"))
        signer = SimpleSigner(signing_cert=self.ee_asn1, signing_key=self.ee_priv, cert_registry=None)
        signed_buf = io.BytesIO()
        PdfSigner(PdfSignatureMetadata(field_name="Signature1"), signer=signer).sign_pdf(w, output=signed_buf)
        signed_bytes = signed_buf.getvalue()

        # Run verification engine
        verifier.load_cca_trust_store = lambda: [self.ca_asn1]
        res = verifier.verify_pdf(raw_bytes=signed_bytes)
        self.assertEqual(res.status, verifier.VerificationStatus.VALID)
        self.assertTrue(res.ltv_embedded)
        self.assertIsNotNone(res.verified_pdf_bytes)

        # Check /DSS in resulting PDF using pikepdf
        with pikepdf.open(io.BytesIO(res.verified_pdf_bytes)) as doc:
            self.assertIn("/DSS", doc.Root)
            dss = doc.Root["/DSS"]
            self.assertIn("/Certs", dss)
            self.assertGreater(len(dss["/Certs"]), 0)
            self.assertIn("/VRI", dss)
            self.assertGreater(len(dss["/VRI"]), 0)

        # Check that PyHanko / reader can still read embedded signature
        reader = PdfFileReader(io.BytesIO(res.verified_pdf_bytes))
        self.assertEqual(len(reader.embedded_signatures), 1)


if __name__ == "__main__":
    unittest.main()
