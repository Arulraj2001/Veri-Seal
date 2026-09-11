"""
VeriSeal In-Memory PDF Decryption & e-Aadhaar Password Remover.
Permanently decrypts password-protected PDFs (e-Aadhaar, Form 16, bank statements)
in volatile RAM memory so government recruitment portals can accept them without errors.
"""

import io
import base64
import logging
from typing import Dict, Any, Optional
import fitz  # PyMuPDF
from PIL import Image

logger = logging.getLogger("veriseal.pdf_unlocker")


def unlock_pdf_document(
    pdf_bytes: bytes,
    password: str = "",
    generate_preview: bool = True,
) -> Dict[str, Any]:
    """
    Decrypts a password-protected PDF document in volatile RAM memory.

    Args:
        pdf_bytes: Raw bytes of the encrypted PDF.
        password: User-provided password (or constructed e-Aadhaar password).
        generate_preview: Whether to render page 1 thumbnail preview.

    Returns:
        Dictionary containing unlocked PDF base64, page count, and status.
    """
    input_size_kb = round(len(pdf_bytes) / 1024.0, 2)
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")

    was_encrypted = doc.is_encrypted

    if was_encrypted:
        if not password:
            doc.close()
            return {
                "status": "error",
                "error_code": "PASSWORD_REQUIRED",
                "message": "This PDF is encrypted. Please enter the password (for e-Aadhaar: First 4 letters of name in CAPITAL + Birth Year).",
            }

        # Attempt authentication with password
        auth_success = doc.authenticate(password.strip())
        if auth_success <= 0:
            # Also try uppercase trimmed
            auth_success = doc.authenticate(password.strip().upper())

        if auth_success <= 0:
            doc.close()
            return {
                "status": "error",
                "error_code": "WRONG_PASSWORD",
                "message": "Incorrect password. For e-Aadhaar, format is: 4 CAPITAL letters + 4-digit Birth Year (e.g. SURE1998).",
            }

    total_pages = len(doc)

    # Render page 1 preview if requested
    preview_base64 = ""
    if generate_preview and total_pages > 0:
        try:
            p1 = doc[0]
            pix = p1.get_pixmap(dpi=150)
            img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            buf = io.BytesIO()
            img.save(buf, format="JPEG", quality=85)
            preview_base64 = f"data:image/jpeg;base64,{base64.b64encode(buf.getvalue()).decode('ascii')}"
        except Exception as p_err:
            logger.warning(f"Could not generate page 1 preview: {p_err}")

    # Export clean unencrypted PDF
    clean_bytes = doc.tobytes(encryption=fitz.PDF_ENCRYPT_NONE, deflate=True)
    doc.close()

    output_size_kb = round(len(clean_bytes) / 1024.0, 2)
    pdf_b64 = f"data:application/pdf;base64,{base64.b64encode(clean_bytes).decode('ascii')}"

    return {
        "status": "success",
        "was_encrypted": was_encrypted,
        "is_unlocked": True,
        "total_pages": total_pages,
        "input_size_kb": input_size_kb,
        "output_size_kb": output_size_kb,
        "pdf_base64": pdf_b64,
        "preview_base64": preview_base64,
    }
