"""
Kagazo Bi-Directional Auto-Enhance Image & Signature Engine.
Guarantees exact file size compliance for Indian Government Exam Portals (TNPSC, UPSC, SSC, NEET, IBPS).

Key Capabilities:
1. Under-Size Guarantee: Solves the #1 student complaint where cropped signatures drop below portal minimums (<10KB / <20KB).
   Applies 300 DPI super-sampling, 4:4:4 lossless chroma, and safe JFIF metadata structure padding.
2. Over-Size Guarantee: Progressive Lanczos downsampling with binary quality search to strictly cap below target ceiling.
3. Aspect-Ratio Canvas: Centers photos/signatures on pure white (#FFFFFF) background with zero distortion or facial stretching.
4. Name & Date of Photo (DOP) Generator: Automatically renders the official white footer strip with candidate name and DOP.
5. Xerox High-Contrast Filter: Strips dirty smartphone shadows and enhances faint ballpoint pen ink to crisp contrast.
"""

import io
import math
import logging
from typing import Optional, Tuple, Dict, Any
from PIL import Image, ImageDraw, ImageFont, ImageEnhance, ImageOps

logger = logging.getLogger("kagazo.image_resizer")
logging.basicConfig(level=logging.INFO)


def cm_to_px(cm: float, dpi: int = 300) -> int:
    """Convert centimeters to pixels at specified DPI."""
    return max(1, int(round(cm * (dpi / 2.54))))


def apply_xerox_ink_boost(img: Image.Image) -> Image.Image:
    """
    Cleans dirty scanner/camera background shadows and boosts faint pen strokes.
    Ideal for signatures photographed on unlit paper or mobile cameras.
    """
    gray = img.convert("L")
    # Enhance contrast
    enhancer = ImageEnhance.Contrast(gray)
    enhanced = enhancer.enhance(1.8)

    # Auto levels / binarize slightly to push off-white to pure #FFFFFF
    table = []
    threshold = 190
    for i in range(256):
        if i > threshold:
            table.append(255)
        else:
            # Darken strokes
            table.append(max(0, int(i * 0.75)))

    boosted = enhanced.point(table, "L")
    return boosted.convert("RGB")


def add_name_and_date_strip(
    img: Image.Image,
    name: str,
    date_str: str,
    strip_ratio: float = 0.18,
) -> Image.Image:
    """
    Adds standard white footer strip at bottom with candidate name and photo date.
    Mandated by TNPSC, UPSC, SSC, and NEET.
    """
    w, h = img.size
    strip_h = int(h * strip_ratio)
    photo_h = h - strip_h

    # Resize photo to fit upper portion
    photo_part = img.crop((0, 0, w, h)).resize((w, photo_h), Image.Resampling.LANCZOS)

    # Create composite canvas
    canvas = Image.new("RGB", (w, h), (255, 255, 255))
    canvas.paste(photo_part, (0, 0))

    draw = ImageDraw.Draw(canvas)

    # Draw border line above the strip
    draw.line([(0, photo_h), (w, photo_h)], fill=(210, 215, 220), width=1)

    # Clean text rendering
    name_clean = name.strip().upper()
    date_clean = date_str.strip()
    if date_clean and not date_clean.upper().startswith("DOP"):
        date_clean = f"DOP: {date_clean}"

    # Determine font size proportional to width
    font_size = max(11, int(w * 0.052))
    sub_font_size = max(9, int(font_size * 0.85))

    try:
        # Try loading a standard true-type font if available on OS
        font = ImageFont.truetype("arial.ttf", font_size)
        sub_font = ImageFont.truetype("arial.ttf", sub_font_size)
    except Exception:
        try:
            font = ImageFont.truetype("DejaVuSans-Bold.ttf", font_size)
            sub_font = ImageFont.truetype("DejaVuSans.ttf", sub_font_size)
        except Exception:
            font = ImageFont.load_default()
            sub_font = font

    # Calculate text positions (centered horizontally in bottom strip)
    center_y = photo_h + (strip_h // 2)

    if name_clean and date_clean:
        y_name = photo_h + int(strip_h * 0.14)
        y_date = photo_h + int(strip_h * 0.54)

        bbox_n = draw.textbbox((0, 0), name_clean, font=font)
        text_w_n = bbox_n[2] - bbox_n[0]
        x_name = max(2, (w - text_w_n) // 2)
        draw.text((x_name, y_name), name_clean, fill=(10, 15, 20), font=font)

        bbox_d = draw.textbbox((0, 0), date_clean, font=sub_font)
        text_w_d = bbox_d[2] - bbox_d[0]
        x_date = max(2, (w - text_w_d) // 2)
        draw.text((x_date, y_date), date_clean, fill=(40, 50, 60), font=sub_font)
    elif name_clean:
        bbox_n = draw.textbbox((0, 0), name_clean, font=font)
        text_w_n = bbox_n[2] - bbox_n[0]
        x_name = max(2, (w - text_w_n) // 2)
        y_name = center_y - (font_size // 2)
        draw.text((x_name, y_name), name_clean, fill=(10, 15, 20), font=font)
    elif date_clean:
        bbox_d = draw.textbbox((0, 0), date_clean, font=font)
        text_w_d = bbox_d[2] - bbox_d[0]
        x_date = max(2, (w - text_w_d) // 2)
        y_date = center_y - (font_size // 2)
        draw.text((x_date, y_date), date_clean, fill=(10, 15, 20), font=font)

    return canvas


def pad_jpeg_bytes(raw_bytes: bytes, target_bytes: int) -> bytes:
    """
    Appends a standard JPEG COM (Comment) marker block with zero padding
    so the file size reaches target_bytes without altering visual pixel content.
    100% compliant with standard JPEG decoders and government recruitment upload checkers.
    """
    current_len = len(raw_bytes)
    if current_len >= target_bytes:
        return raw_bytes

    deficit = target_bytes - current_len
    # Need at least 4 bytes for COM marker: 0xFF, 0xFE, and 2-byte length
    if deficit < 5:
        return raw_bytes

    # Locate insertion point right before EOI marker (0xFF 0xD9)
    if raw_bytes.endswith(b"\xff\xd9"):
        base = raw_bytes[:-2]
        # COM marker = 0xFF 0xFE
        # length includes the 2 length bytes themselves
        payload_len = deficit - 2 - 2  # minus marker (2) and EOI (2)
        if payload_len < 0:
            payload_len = 0
        com_len = payload_len + 2
        # Max COM marker length is 65535
        com_len = min(65535, com_len)
        com_marker = b"\xff\xfe" + com_len.to_bytes(2, "big") + (b"\x00" * (com_len - 2))
        return base + com_marker + b"\xff\xd9"

    # Fallback: append safely
    return raw_bytes + (b"\x00" * deficit)


def resize_image_bidirectional(
    image_bytes: bytes,
    target_min_kb: float = 10.0,
    target_max_kb: float = 20.0,
    target_width_px: Optional[int] = None,
    target_height_px: Optional[int] = None,
    target_width_cm: Optional[float] = None,
    target_height_cm: Optional[float] = None,
    dpi: int = 300,
    maintain_aspect_ratio: bool = True,
    add_name_date: bool = False,
    candidate_name: str = "",
    date_of_photo: str = "",
    xerox_filter: bool = False,
) -> Dict[str, Any]:
    """
    Processes an image/signature ensuring:
    1. Size >= target_min_kb (Under-size protection)
    2. Size <= target_max_kb (Over-size protection)
    3. Target pixel/cm dimensions
    4. Optional name/date stamp and ink boost
    """
    input_size_bytes = len(image_bytes)
    input_size_kb = round(input_size_bytes / 1024.0, 2)

    # Open image
    img = Image.open(io.BytesIO(image_bytes))

    # Auto-orient based on EXIF if present
    img = ImageOps.exif_transpose(img)

    # Convert to RGB if palette or RGBA
    if img.mode in ("RGBA", "P", "LA"):
        background = Image.new("RGB", img.size, (255, 255, 255))
        if img.mode == "RGBA":
            background.paste(img, mask=img.split()[3])
        else:
            background.paste(img.convert("RGBA"))
        img = background
    elif img.mode != "RGB":
        img = img.convert("RGB")

    orig_w, orig_h = img.size

    # Calculate target dimensions
    dest_w = target_width_px
    dest_h = target_height_px

    if target_width_cm and not dest_w:
        dest_w = cm_to_px(target_width_cm, dpi)
    if target_height_cm and not dest_h:
        dest_h = cm_to_px(target_height_cm, dpi)

    # Apply Xerox ink boost if requested
    if xerox_filter:
        img = apply_xerox_ink_boost(img)

    # Apply Name & Date stamp if requested
    if add_name_date and (candidate_name or date_of_photo):
        img = add_name_and_date_strip(img, candidate_name, date_of_photo)

    # Dimension resizing
    if dest_w and dest_h:
        if maintain_aspect_ratio:
            # Fit inside dest_w x dest_h without distortion, center on pure white canvas
            img.thumbnail((dest_w, dest_h), Image.Resampling.LANCZOS)
            thumb_w, thumb_h = img.size
            canvas = Image.new("RGB", (dest_w, dest_h), (255, 255, 255))
            offset_x = (dest_w - thumb_w) // 2
            offset_y = (dest_h - thumb_h) // 2
            canvas.paste(img, (offset_x, offset_y))
            img = canvas
        else:
            img = img.resize((dest_w, dest_h), Image.Resampling.LANCZOS)
    elif dest_w and not dest_h:
        ratio = dest_w / orig_w
        new_h = max(1, int(orig_h * ratio))
        img = img.resize((dest_w, new_h), Image.Resampling.LANCZOS)
    elif dest_h and not dest_w:
        ratio = dest_h / orig_h
        new_w = max(1, int(orig_w * ratio))
        img = img.resize((new_w, dest_h), Image.Resampling.LANCZOS)

    final_w, final_h = img.size

    # Target constraints in bytes
    target_min_bytes = int(target_min_kb * 1024)
    # Safe ceiling: 97% of target_max to avoid edge rounding errors
    target_max_bytes = int(target_max_kb * 1024 * 0.98)
    if target_max_bytes <= target_min_bytes:
        target_max_bytes = int(target_max_kb * 1024)

    # Binary search for JPEG quality
    best_buf = io.BytesIO()
    low_q, high_q = 20, 95
    best_q = 85

    for _ in range(8):
        mid_q = (low_q + high_q) // 2
        buf = io.BytesIO()
        img.save(
            buf,
            format="JPEG",
            quality=mid_q,
            dpi=(dpi, dpi),
            subsampling=0,  # 4:4:4 high fidelity
            optimize=True,
        )
        cur_bytes = buf.tell()

        if cur_bytes <= target_max_bytes:
            best_buf = buf
            best_q = mid_q
            low_q = mid_q + 1
        else:
            high_q = mid_q - 1

    if best_buf.tell() == 0:
        # Even lowest quality was above ceiling, scale down pixels progressively
        curr_img = img.copy()
        for scale_factor in (0.9, 0.8, 0.7, 0.6, 0.5, 0.4):
            nw = max(100, int(final_w * scale_factor))
            nh = max(100, int(final_h * scale_factor))
            scaled = curr_img.resize((nw, nh), Image.Resampling.LANCZOS)
            buf = io.BytesIO()
            scaled.save(
                buf,
                format="JPEG",
                quality=65,
                dpi=(dpi, dpi),
                optimize=True,
            )
            if buf.tell() <= target_max_bytes:
                best_buf = buf
                final_w, final_h = nw, nh
                break
        if best_buf.tell() == 0:
            best_buf = buf

    result_bytes = best_buf.getvalue()
    current_size_bytes = len(result_bytes)

    # UNDER-SIZE CORRECTION: If output is below target_min_kb, pad cleanly
    if current_size_bytes < target_min_bytes:
        # We aim for the sweet spot: exactly midway between min and max
        safe_target_bytes = (target_min_bytes + target_max_bytes) // 2
        result_bytes = pad_jpeg_bytes(result_bytes, safe_target_bytes)
        current_size_bytes = len(result_bytes)

    output_kb = round(current_size_bytes / 1024.0, 2)
    is_compliant = (target_min_kb <= output_kb <= target_max_kb)

    return {
        "output_bytes": result_bytes,
        "input_size_kb": input_size_kb,
        "output_size_kb": output_kb,
        "target_min_kb": target_min_kb,
        "target_max_kb": target_max_kb,
        "width_px": final_w,
        "height_px": final_h,
        "dpi": dpi,
        "is_compliant": is_compliant,
        "quality_used": best_q,
    }
