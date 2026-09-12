"""
Kagazo PVC Smart Card Tray Print Studio Engine.
Aligns Front and Back of ID cards (e-Aadhaar, Voter ID, PAN, Ayushman Bharat)
onto exact Epson L805 / Canon inkjet PVC dual-tray templates or A4 photo sheets at 300 DPI.
"""

import io
import base64
import logging
from typing import Dict, Any, Optional
try:
    import pymupdf as fitz
except ImportError:
    import fitz
from PIL import Image, ImageOps, ImageDraw

logger = logging.getLogger("kagazo.pvc_card_engine")

# ISO/IEC 7810 ID-1 (CR-80) at 300 DPI
# 85.60 mm * (300 / 25.4) = 1011 px
# 53.98 mm * (300 / 25.4) = 638 px
CARD_WIDTH_300DPI = 1011
CARD_HEIGHT_300DPI = 638


def prepare_card_image(card_bytes: bytes, target_w: int = CARD_WIDTH_300DPI, target_h: int = CARD_HEIGHT_300DPI) -> Image.Image:
    """
    Standardizes input card image/pdf to exact CR-80 dimensions with subtle border guide.
    """
    try:
        # Check if PDF
        if card_bytes.startswith(b"%PDF"):
            doc = fitz.open(stream=card_bytes, filetype="pdf")
            page = doc[0]
            pix = page.get_pixmap(dpi=300)
            pil_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
            doc.close()
        else:
            pil_img = Image.open(io.BytesIO(card_bytes)).convert("RGB")
    except Exception as e:
        logger.error(f"Error opening card image: {e}")
        pil_img = Image.new("RGB", (target_w, target_h), (240, 240, 240))

    fitted = ImageOps.fit(pil_img, (target_w, target_h), Image.Resampling.LANCZOS)
    draw = ImageDraw.Draw(fitted)
    # Subtle 1px boundary guide for cutting / alignment
    draw.rectangle([0, 0, target_w - 1, target_h - 1], outline=(180, 180, 180), width=1)
    return fitted


def generate_pvc_card_tray(
    front_bytes: bytes,
    back_bytes: bytes,
    tray_format: str = "epson_tray",      # "epson_tray" or "a4_sheet"
    include_cutting_guides: bool = True,
    card_title: Optional[str] = None,
) -> Dict[str, Any]:
    """
    Generates exact 300 DPI print layout in RAM.
    """
    front_card = prepare_card_image(front_bytes)
    back_card = prepare_card_image(back_bytes)

    if tray_format == "epson_tray":
        # Epson L805 / Canon PVC Card Tray: 140mm x 210mm at 300 DPI = 1654 x 2480 px
        canvas_w, canvas_h = 1654, 2480
        canvas = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
        draw = ImageDraw.Draw(canvas)

        # Standard tray slot offsets: Card 1 on Left, Card 2 on Right (stacked vertically or side by side)
        # Epson tray has Card 1 at Top, Card 2 at Bottom centered
        center_x = (canvas_w - CARD_WIDTH_300DPI) // 2
        slot_1_y = 280
        slot_2_y = slot_1_y + CARD_HEIGHT_300DPI + 220

        canvas.paste(front_card, (center_x, slot_1_y))
        canvas.paste(back_card, (center_x, slot_2_y))

        # Tray alignment markings
        draw.text((center_x, slot_1_y - 40), "CARD 1: FRONT SIDE (முன்பக்கம்)", fill=(100, 100, 100))
        draw.text((center_x, slot_2_y - 40), "CARD 2: BACK SIDE (பின்பக்கம்)", fill=(100, 100, 100))

        # Center notch line for tray alignment
        draw.line([center_x - 40, slot_1_y + (CARD_HEIGHT_300DPI // 2), center_x - 10, slot_1_y + (CARD_HEIGHT_300DPI // 2)], fill=(150, 150, 150), width=2)
        draw.line([center_x - 40, slot_2_y + (CARD_HEIGHT_300DPI // 2), center_x - 10, slot_2_y + (CARD_HEIGHT_300DPI // 2)], fill=(150, 150, 150), width=2)

    else:
        # Standard A4 Sheet (2480 x 3508 px at 300 DPI) for lamination pouches
        canvas_w, canvas_h = 2480, 3508
        canvas = Image.new("RGB", (canvas_w, canvas_h), (255, 255, 255))
        draw = ImageDraw.Draw(canvas)

        center_x = (canvas_w - CARD_WIDTH_300DPI) // 2
        slot_1_y = 450
        slot_2_y = slot_1_y + CARD_HEIGHT_300DPI + 180

        canvas.paste(front_card, (center_x, slot_1_y))
        canvas.paste(back_card, (center_x, slot_2_y))

        draw.text((center_x, slot_1_y - 45), "FRONT SIDE (CR-80 EXACT 85.6mm x 54mm)", fill=(80, 80, 80))
        draw.text((center_x, slot_2_y - 45), "BACK SIDE (CR-80 EXACT 85.6mm x 54mm)", fill=(80, 80, 80))

    # Save to high-res JPEG
    img_buf = io.BytesIO()
    canvas.save(img_buf, format="JPEG", quality=95, optimize=True, dpi=(300, 300))
    img_bytes = img_buf.getvalue()
    img_b64 = f"data:image/jpeg;base64,{base64.b64encode(img_bytes).decode('ascii')}"

    # Generate 300 DPI PDF
    doc = fitz.open()
    # In points (72 pt per inch): canvas_w / 300 * 72
    pt_w = (canvas_w / 300.0) * 72.0
    pt_h = (canvas_h / 300.0) * 72.0
    page = doc.new_page(width=pt_w, height=pt_h)
    page.insert_image(fitz.Rect(0, 0, pt_w, pt_h), stream=img_bytes)
    pdf_bytes = doc.tobytes(deflate=True)
    doc.close()
    pdf_b64 = f"data:application/pdf;base64,{base64.b64encode(pdf_bytes).decode('ascii')}"

    return {
        "status": "success",
        "tray_format": tray_format,
        "width_px": canvas_w,
        "height_px": canvas_h,
        "dpi": 300,
        "output_size_kb": round(len(img_bytes) / 1024.0, 2),
        "pdf_size_kb": round(len(pdf_bytes) / 1024.0, 2),
        "image_base64": img_b64,
        "pdf_base64": pdf_b64,
        "preview_base64": img_b64,
    }
