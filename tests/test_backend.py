"""
Automated Integration and Unit Test Suite for VeriSeal Backend Engine.
Tests health, supported docs, error codes, signature extraction, doc type detection, and batch endpoints.
"""

import io
import sys
import unittest
from datetime import datetime
from fastapi.testclient import TestClient

# Add workspace to path
sys.path.insert(0, ".")

import pypdf
from app import app
from verifier import detect_document_type, verify_pdf, NoSignatureFoundError, WrongPasswordError, InvalidPdfError

client = TestClient(app)


class TestVeriSealBackend(unittest.TestCase):

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
        self.assertIn("e-Aadhaar (UIDAI)", names)
        self.assertIn("Community Certificate", names)
        self.assertIn("PAN Card PDF", names)

    def test_03_detect_document_type(self):
        """Verify keyword detection across various document types."""
        # Create minimal PDF with UIDAI text
        writer = pypdf.PdfWriter()
        page = writer.add_blank_page(width=200, height=200)
        writer.add_metadata({"/Title": "UIDAI e-Aadhaar Download"})
        stream = io.BytesIO()
        writer.write(stream)
        pdf_bytes = stream.getvalue()

        doc_type = detect_document_type(pdf_bytes)
        self.assertEqual(doc_type, "e-Aadhaar (UIDAI)")

    def test_04_verify_unsupported_format(self):
        """Verify uploading a non-PDF file triggers 415 UNSUPPORTED_FORMAT."""
        response = client.post(
            "/verify",
            files={"file": ("test.txt", b"This is plain text", "text/plain")},
        )
        self.assertEqual(response.status_code, 415)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "UNSUPPORTED_FORMAT")

    def test_05_verify_unsigned_pdf(self):
        """Verify uploading an unsigned PDF returns 422 NO_SIGNATURE_FOUND."""
        writer = pypdf.PdfWriter()
        writer.add_blank_page(width=300, height=300)
        stream = io.BytesIO()
        writer.write(stream)
        pdf_bytes = stream.getvalue()

        response = client.post(
            "/verify",
            files={"file": ("unsigned_document.pdf", pdf_bytes, "application/pdf")},
        )
        self.assertEqual(response.status_code, 422)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "NO_SIGNATURE_FOUND")
        self.assertIn("No digital signatures were detected", data["message"])

    def test_06_verify_file_too_large(self):
        """Verify files larger than 25MB trigger 413 FILE_TOO_LARGE."""
        # 26MB fake payload with %PDF- header
        large_bytes = b"%PDF-1.7\n" + (b"0" * (26 * 1024 * 1024))
        response = client.post(
            "/verify",
            files={"file": ("huge_file.pdf", large_bytes, "application/pdf")},
        )
        self.assertEqual(response.status_code, 413)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "FILE_TOO_LARGE")

    def test_07_batch_without_auth_header(self):
        """Verify POST /verify-batch without X-API-Key returns 401 UNAUTHORIZED."""
        writer = pypdf.PdfWriter()
        writer.add_blank_page(width=100, height=100)
        stream = io.BytesIO()
        writer.write(stream)
        pdf_bytes = stream.getvalue()

        response = client.post(
            "/verify-batch",
            files=[("files", ("test1.pdf", pdf_bytes, "application/pdf"))],
        )
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "UNAUTHORIZED")

    def test_08_password_protected_wrong_password(self):
        """Verify encrypted PDF with wrong password triggers 401 WRONG_PASSWORD."""
        writer = pypdf.PdfWriter()
        writer.add_blank_page(width=100, height=100)
        writer.encrypt("SECRET123")
        stream = io.BytesIO()
        writer.write(stream)
        pdf_bytes = stream.getvalue()

        response = client.post(
            "/verify",
            files={"file": ("aadhaar_locked.pdf", pdf_bytes, "application/pdf")},
            data={"password": "WRONG_PASSWORD"},
        )
        self.assertEqual(response.status_code, 401)
        data = response.json()
        self.assertTrue(data["error"])
        self.assertEqual(data["code"], "WRONG_PASSWORD")

    def test_09_verify_signed_pdf(self):
        """Verify digitally signed PDF through POST /verify endpoint."""
        from cryptography import x509
        from cryptography.hazmat.backends import default_backend
        from cryptography.hazmat.primitives import hashes, serialization
        from cryptography.hazmat.primitives.asymmetric import rsa
        from cryptography.x509.oid import NameOID
        from pyhanko.sign.signers.pdf_cms import SimpleSigner
        from pyhanko.keys.pemder import load_certs_from_pemder_data, load_private_key_from_pemder_data
        from pyhanko.pdf_utils.incremental_writer import IncrementalPdfFileWriter
        from pyhanko.sign import fields
        from pyhanko.sign.signers.pdf_signer import PdfSigner, PdfSignatureMetadata

        # Generate a test certificate
        key = rsa.generate_private_key(public_exponent=65537, key_size=2048, backend=default_backend())
        name = x509.Name([
            x509.NameAttribute(NameOID.COUNTRY_NAME, "IN"),
            x509.NameAttribute(NameOID.ORGANIZATION_NAME, "National Informatics Centre"),
            x509.NameAttribute(NameOID.COMMON_NAME, "NIC CA Digital Signer"),
        ])
        cert = (
            x509.CertificateBuilder()
            .subject_name(name)
            .issuer_name(name)
            .public_key(key.public_key())
            .serial_number(99999)
            .not_valid_before(datetime(2023, 1, 1))
            .not_valid_after(datetime(2030, 1, 1))
            .sign(key, hashes.SHA256(), default_backend())
        )
        cert_pem = cert.public_bytes(serialization.Encoding.PEM)
        key_pem = key.private_bytes(serialization.Encoding.PEM, serialization.PrivateFormat.PKCS8, serialization.NoEncryption())

        c_asn1 = list(load_certs_from_pemder_data(cert_pem))[0]
        k_asn1 = load_private_key_from_pemder_data(key_pem, passphrase=None)
        signer = SimpleSigner(signing_cert=c_asn1, signing_key=k_asn1, cert_registry=None)

        writer = pypdf.PdfWriter()
        writer.add_blank_page(width=300, height=300)
        buf = io.BytesIO()
        writer.write(buf)
        buf.seek(0)

        w = IncrementalPdfFileWriter(buf)
        fields.append_signature_field(w, sig_field_spec=fields.SigFieldSpec(sig_field_name="Signature1"))
        out = io.BytesIO()
        pdf_signer = PdfSigner(
            signature_meta=PdfSignatureMetadata(field_name="Signature1"),
            signer=signer,
        )
        pdf_signer.sign_pdf(w, output=out)
        signed_bytes = out.getvalue()

        # POST /verify with signed PDF
        response = client.post(
            "/verify",
            files={"file": ("nic_signed_certificate.pdf", signed_bytes, "application/pdf")},
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("signatures", data)
        self.assertEqual(len(data["signatures"]), 1)
        sig = data["signatures"][0]
        self.assertEqual(sig["signer_name"], "NIC CA Digital Signer")
        self.assertEqual(sig["signer_org"], "National Informatics Centre")
        self.assertTrue(sig["hash_valid"])
        self.assertTrue(sig["covers_whole_document"])
        self.assertIsNotNone(data["verified_pdf_base64"])


if __name__ == "__main__":
    unittest.main()

