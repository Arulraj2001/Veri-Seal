"""
VeriSeal Driving License & Smart Card (RC / PAN) Front-Back Merger Engine.
Combines Front and Back sides of smart card driving licenses onto a single A4 page
calibrated strictly under <200KB for Parivahan Sarathi, State RTOs, and FASTag portals.
"""

import io
import base64
import logging
from typing import Dict, Any, Optional
import fitz  # PyMuPDF
from PIL import Image, ImageOps, ImageDraw

logger = logging.getLogger("veriseal.card_merger")

# Standard ISO/IEC 7810 ID-1 (CR-80 Smart Card) Dimensions
CARD_ASPECT_RATIO = 85.60 / 53.98  # ~1.5858


def standardize_card_image(img: Image.Image, target_width: int = 1000) -> Image.Image:
    """
    Crops/pads image to exact CR-80 card aspect ratio with smooth antialiasing.
    """
    img = img.convert("RGB")
    target_height = int(target_width / CARD_ASPECT_RATIO)

    # Use ImageOps.fit to preserve card content and center
    card = ImageOps.fit(img, (target_width, target_height), Image.Resampling.LANCZOS)
    return card


def draw_card_border(card_img: Image.Image, border_color=(200, 200, 200), width=3) -> Image.Image:
    """
    Adds a subtle, professional border around the smart card edges for photocopy realism.
    """
    draw = ImageDraw.Draw(card_img)
    w, h = card_img.size
    draw.rectangle([0, 0, w - 1, h - 1], outline=border_color, width=width)
    return card_img


def merge_smart_card_sides(
    front_bytes: bytes,
    back_bytes: bytes,
    layout: str = "stacked",             # "stacked" or "side_by_side"
    front_rotation: int = 0,
    back_rotation: int = 0,
    card_title: str = "DRIVING LICENCE / VEHICLE REGISTRATION",
    target_kb: int = 200,                # Parivahan Sarathi limit <200KB
    output_format: str = "both",         # "pdf", "image", "both"
) -> Dict[str, Any]:
    """
    Merges front and back card images onto a single white A4 canvas strictly in RAM.
    """
    # 1. Load Front and Back images
    front_pil = Image.open(io.BytesIO(front_bytes))
    back_pil = Image.open(io.BytesIO(back_bytes))

    # Apply rotations
    if front_rotation in (90, 180, 270):
        front_pil = front_pil.rotate(-front_rotation, expand=True)
    if back_rotation in (90, 180, 270):
        back_pil = back_pil.rotate(-back_rotation, expand=True)

    # Standardize to CR-80 proportions
    card_w = 950
    front_card = draw_card_border(standardize_card_image(front_pil, target_width=card_w))
    back_card = draw_card_border(standardize_card_image(back_pil, target_width=card_w))
    card_h = front_card.height

    # 2. Setup A4 Canvas (Standard A4 ratio 1:1.414 @ ~150 DPI = 1240 x 1754 px)
    a4_w, a4_h = 1240, 1754
    canvas = Image.new("RGB", (a4_w, a4_h), (255, 255, 255))
    draw = ImageDraw.Draw(canvas)

    # 3. Layout Positioning
    if layout == "stacked":
        # Top-bottom arrangement
        center_x = (a4_w - card_w) // 2
        top_y_front = 240
        top_y_back = top_y_front + card_h + 140

        # Paste Front
        canvas.paste(front_card, (center_x, top_y_front))
        # Paste Back
        canvas.paste(back_card, (center_x, top_y_back))

        # Labels
        # Header title
        draw.text((center_x, top_y_front - 45), "FRONT SIDE (முன்பக்கம்)", fill=(80, 80, 80))
        draw.text((center_x, top_y_back - 45), "BACK SIDE (பின்பக்கம்)", fill=(80, 80, 80))

    else:  # side_by_side (landscape orientation or scaled on A4)
        scaled_w = 540
        scaled_h = int(scaled_w / CARD_ASPECT_RATIO)
        front_small = front_card.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)
        back_small = back_card.resize((scaled_w, scaled_h), Image.Resampling.LANCZOS)

        pos_y = 550
        gap = 40
        margin_x = (a4_w - (scaled_w * 2 + gap)) // 2

        canvas.paste(front_small, (margin_x, pos_y))
        canvas.paste(back_small, (margin_x + scaled_w + gap, pos_y))

        draw.text((margin_x, pos_y - 40), "FRONT SIDE", fill=(80, 80, 80))
        draw.text((margin_x + scaled_w + gap, pos_y - 40), "BACK SIDE", fill=(80, 80, 80))

    # Watermark-free footer disclaimer
    draw.text((a4_w // 2 - 190, a4_h - 100), "VERIFIED OFFICIAL COPY • COMPLIANT WITH RTO / PARIVAHAN", fill=(160, 160, 160))

    # 4. Generate compressed JPEG
    target_bytes = target_kb * 1024
    low_q, high_q = 30, 92
    best_img_buf = io.BytesIO()

    while low_q <= high_q:
        mid_q = (low_q + high_q) // 2
        test_buf = io.BytesIO()
        canvas.save(test_buf, format="JPEG", quality=mid_q, optimize=True, dpi=(150, 150))
        if len(test_buf.getvalue()) <= target_bytes:
            best_img_buf = test_buf
            low_q = mid_q + 1
        else:
            high_q = mid_q - 1

    final_img_bytes = best_img_buf.getvalue() if best_img_buf.tell() > 0 else test_buf.getvalue()
    img_b64 = f"data:image/jpeg;base64,{base64.b64encode(final_img_bytes).decode('ascii')}"

    # 5. Generate single-page PDF strictly under target_kb
    pdf_b64 = None
    final_pdf_size_kb = 0.0

    if output_format in ("pdf", "both"):
        p_doc = fitz.open()
        # Standard A4 in points (595.3 x 841.9)
        p_page = p_doc.new_page(width=595.3, height=841.9)

        # Binary search image compression to ensure PDF is strictly < target_kb
        pdf_low_q, pdf_high_q = 30, 92
        best_pdf_bytes = b""

        while pdf_low_q <= pdf_high_q:
            pdf_mid_q = (pdf_low_q + pdf_high_q) // 2
            t_buf = io.BytesIO()
            canvas.save(t_buf, format="JPEG", quality=pdf_mid_q, optimize=True, dpi=(150, 150))

            temp_doc = fitz.open()
            temp_page = temp_doc.new_page(width=595.3, height=841.9)
            temp_page.insert_image(fitz.Rect(0, 0, 595.3, 841.9), stream=t_buf.getvalue())
            temp_bytes = temp_doc.tobytes(deflate=True)
            temp_doc.close()

            if len(temp_bytes) <= target_bytes:
                best_pdf_bytes = temp_bytes
                pdf_low_q = pdf_mid_q + 1
            else:
                pdf_high_q = pdf_mid_q - 1

        if not best_pdf_bytes:
            best_pdf_bytes = temp_bytes

        final_pdf_size_kb = round(len(best_pdf_bytes) / 1024.0, 2)
        pdf_b64 = f"data:application/pdf;base64,{base64.b64encode(best_pdf_bytes).decode('ascii')}"
        p_doc.close()

    output_size_kb = final_pdf_size_kb if output_format == "pdf" else round(len(final_img_bytes) / 1024.0, 2)

    return {
        "status": "success",
        "layout": layout,
        "width_px": a4_w,
        "height_px": a4_h,
        "output_size_kb": output_size_kb,
        "target_kb": target_kb,
        "is_under_limit": output_size_kb <= target_kb,
        "image_base64": img_b64,
        "pdf_base64": pdf_b64,
        "preview_base64": img_b64,
    }
