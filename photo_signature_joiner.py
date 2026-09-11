"""
VeriSeal Combined Photo + Signature + Declaration Slip Generator.
Combines Passport Photo, Signature, and Handwritten Declaration/DOP into a single official
composite slip for MP PEB / Vyapam, UPSSSC, Rajasthan RSMSSB, and Kerala PSC.
"""

import io
import base64
import logging
from typing import Dict, Any, Optional
from PIL import Image, ImageOps, ImageDraw, ImageFont

logger = logging.getLogger("veriseal.photo_signature_joiner")


def create_composite_slip(
    photo_bytes: bytes,
    signature_bytes: bytes,
    declaration_bytes: Optional[bytes] = None,
    candidate_name: Optional[str] = None,
    date_of_photo: Optional[str] = None,
    preset: str = "mp_peb",              # "mp_peb", "upsssc", "kerala_psc", "custom"
    target_width: int = 400,
    target_height: int = 500,
    target_max_kb: int = 100,
) -> Dict[str, Any]:
    """
    Assembles photo, signature, and optional declaration/text into one composite slip strictly in RAM.
    """
    # 1. Load Images
    photo_pil = Image.open(io.BytesIO(photo_bytes)).convert("RGB")
    sig_pil = Image.open(io.BytesIO(signature_bytes)).convert("RGB")

    # Dimensions based on preset
    w, h = target_width, target_height
    if preset == "mp_peb":
        # MP PEB / Vyapam: 400 x 500 px (Photo 400x300, Signature 400x100, Declaration 400x100)
        w, h = 400, 500
        target_max_kb = 100
    elif preset == "upsssc":
        # UPSSSC: 350 x 500 px
        w, h = 350, 500
        target_max_kb = 50
    elif preset == "kerala_psc":
        # Kerala PSC: 150 x 200 px
        w, h = 300, 400
        target_max_kb = 40

    # 2. Setup White Canvas
    canvas = Image.new("RGB", (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(canvas)

    # 3. Layout Slots Calculation
    if declaration_bytes or (preset == "mp_peb" and not declaration_bytes):
        # 3-Part Layout: Photo (60%), Signature (20%), Declaration (20%)
        photo_h = int(h * 0.58)
        sig_h = int(h * 0.20)
        decl_h = h - photo_h - sig_h

        # Fit Photo in top section
        photo_fit = ImageOps.fit(photo_pil, (w - 10, photo_h - 10), Image.Resampling.LANCZOS)
        canvas.paste(photo_fit, (5, 5))

        # Stamp Name & Date if provided
        if candidate_name or date_of_photo:
            banner_h = 32
            draw.rectangle([5, photo_h - banner_h, w - 5, photo_h - 5], fill=(255, 255, 255))
            txt = f"{candidate_name or ''} {f'• {date_of_photo}' if date_of_photo else ''}".strip()
            draw.text((15, photo_h - banner_h + 8), txt[:40], fill=(0, 0, 0))

        # Divider line 1
        draw.line([0, photo_h, w, photo_h], fill=(180, 180, 180), width=1)

        # Fit Signature in middle section
        sig_fit = ImageOps.fit(sig_pil, (w - 20, sig_h - 10), Image.Resampling.LANCZOS)
        canvas.paste(sig_fit, (10, photo_h + 5))

        # Divider line 2
        draw.line([0, photo_h + sig_h, w, photo_h + sig_h], fill=(180, 180, 180), width=1)

        # Bottom section: Declaration
        if declaration_bytes:
            decl_pil = Image.open(io.BytesIO(declaration_bytes)).convert("RGB")
            decl_fit = ImageOps.fit(decl_pil, (w - 10, decl_h - 8), Image.Resampling.LANCZOS)
            canvas.paste(decl_fit, (5, photo_h + sig_h + 4))
        else:
            # Default self-declaration text placeholder box
            draw.text((15, photo_h + sig_h + 8), "DECLARATION: I certify that the details", fill=(90, 90, 90))
            draw.text((15, photo_h + sig_h + 24), "filled in this application are correct.", fill=(90, 90, 90))

    else:
        # 2-Part Layout: Photo (72%) + Signature (28%)
        photo_h = int(h * 0.72)
        sig_h = h - photo_h

        photo_fit = ImageOps.fit(photo_pil, (w - 8, photo_h - 8), Image.Resampling.LANCZOS)
        canvas.paste(photo_fit, (4, 4))

        # Name / Date Banner
        if candidate_name or date_of_photo:
            banner_h = 32
            draw.rectangle([4, photo_h - banner_h, w - 4, photo_h - 4], fill=(255, 255, 255))
            txt = f"{candidate_name or ''} {f'• {date_of_photo}' if date_of_photo else ''}".strip()
            draw.text((15, photo_h - banner_h + 8), txt[:40], fill=(0, 0, 0))

        # Divider
        draw.line([0, photo_h, w, photo_h], fill=(180, 180, 180), width=1)

        # Signature
        sig_fit = ImageOps.fit(sig_pil, (w - 16, sig_h - 8), Image.Resampling.LANCZOS)
        canvas.paste(sig_fit, (8, photo_h + 4))

    # Outer border
    draw.rectangle([0, 0, w - 1, h - 1], outline=(150, 150, 150), width=1)

    # 4. Binary search JPEG compression strictly under target_max_kb
    target_bytes = target_max_kb * 1024
    low_q, high_q = 35, 95
    best_buf = io.BytesIO()

    while low_q <= high_q:
        mid_q = (low_q + high_q) // 2
        t_buf = io.BytesIO()
        canvas.save(t_buf, format="JPEG", quality=mid_q, optimize=True, dpi=(200, 200))
        if len(t_buf.getvalue()) <= target_bytes:
            best_buf = t_buf
            low_q = mid_q + 1
        else:
            high_q = mid_q - 1

    final_bytes = best_buf.getvalue() if best_buf.tell() > 0 else t_buf.getvalue()
    final_kb = round(len(final_bytes) / 1024.0, 2)
    img_b64 = f"data:image/jpeg;base64,{base64.b64encode(final_bytes).decode('ascii')}"

    return {
        "status": "success",
        "preset": preset,
        "width_px": w,
        "height_px": h,
        "aspect_ratio": round(w / h, 3),
        "output_size_kb": final_kb,
        "target_max_kb": target_max_kb,
        "is_under_limit": final_kb <= target_max_kb,
        "image_base64": img_b64,
        "preview_base64": img_b64,
        "format": "JPEG",
    }
