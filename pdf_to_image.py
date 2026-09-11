"""
VeriSeal High-Resolution PDF to Image (300 DPI) Extractor Engine.
Converts PDF documents, e-Aadhaars, admit cards, and marksheets into crisp,
high-resolution JPEG/PNG images with optional Xerox ink boost and size capping.
"""

import io
import base64
import logging
from typing import List, Dict, Any, Optional
import fitz  # PyMuPDF
from PIL import Image, ImageEnhance

logger = logging.getLogger("veriseal.pdf_to_image")


def apply_xerox_ink_boost(img: Image.Image) -> Image.Image:
    """Enhances faint text and removes grayish background shadows from scanned PDFs."""
    gray = img.convert("L")
    enhancer = ImageEnhance.Contrast(gray)
    enhanced = enhancer.enhance(1.7)
    table = []
    threshold = 200
    for i in range(256):
        if i > threshold:
            table.append(255)
        else:
            table.append(max(0, int(i * 0.75)))
    boosted = enhanced.point(table, "L")
    return boosted.convert("RGB")


def convert_pdf_to_images(
    pdf_bytes: bytes,
    dpi: int = 300,
    image_format: str = "jpeg",
    max_pages: int = 10,
    xerox_filter: bool = False,
    target_max_kb: Optional[float] = None,
) -> Dict[str, Any]:
    """
    Renders pages of a PDF document to crisp images.

    Args:
        pdf_bytes: Raw bytes of the uploaded PDF file.
        dpi: Target resolution (standard 300 for official government scans).
        image_format: 'jpeg' or 'png'.
        max_pages: Maximum number of pages to convert (default 10 for safety).
        xerox_filter: Whether to apply contrast enhancement.
        target_max_kb: Optional file size ceiling per page image.

    Returns:
        Dictionary containing page images with base64 data and metadata.
    """
    input_size_kb = round(len(pdf_bytes) / 1024.0, 2)
    doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    total_pages = len(doc)
    pages_to_process = min(total_pages, max_pages)

    results: List[Dict[str, Any]] = []

    for page_num in range(pages_to_process):
        page = doc[page_num]
        pix = page.get_pixmap(dpi=dpi)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

        if xerox_filter:
            img = apply_xerox_ink_boost(img)

        # Output encoding
        out_format = "JPEG" if image_format.lower() in ("jpg", "jpeg") else "PNG"
        mime_type = "image/jpeg" if out_format == "JPEG" else "image/png"

        # Determine optimal quality if target_max_kb is provided
        quality = 90
        buf = io.BytesIO()

        if out_format == "JPEG":
            if target_max_kb:
                # Binary search for best quality under target_max_kb
                target_bytes = int(target_max_kb * 1024)
                low_q, high_q = 30, 95
                best_buf = io.BytesIO()
                while low_q <= high_q:
                    mid_q = (low_q + high_q) // 2
                    trial_buf = io.BytesIO()
                    img.save(trial_buf, format="JPEG", quality=mid_q, dpi=(dpi, dpi), optimize=True)
                    if len(trial_buf.getvalue()) <= target_bytes:
                        best_buf = trial_buf
                        low_q = mid_q + 1
                    else:
                        high_q = mid_q - 1
                if best_buf.tell() > 0:
                    buf = best_buf
                else:
                    img.save(buf, format="JPEG", quality=40, dpi=(dpi, dpi), optimize=True)
            else:
                img.save(buf, format="JPEG", quality=88, dpi=(dpi, dpi), optimize=True)
        else:
            img.save(buf, format="PNG", optimize=True)

        img_bytes = buf.getvalue()
        img_size_kb = round(len(img_bytes) / 1024.0, 2)
        b64_str = f"data:{mime_type};base64,{base64.b64encode(img_bytes).decode('ascii')}"

        results.append({
            "page_number": page_num + 1,
            "width_px": pix.width,
            "height_px": pix.height,
            "size_kb": img_size_kb,
            "mime_type": mime_type,
            "data_base64": b64_str,
        })

    doc.close()

    return {
        "status": "success",
        "total_pdf_pages": total_pages,
        "converted_pages_count": len(results),
        "input_size_kb": input_size_kb,
        "dpi": dpi,
        "format": out_format.lower(),
        "pages": results,
    }
