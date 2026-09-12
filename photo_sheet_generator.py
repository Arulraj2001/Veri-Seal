"""
VeriSeal Cyber Cafe Passport Photo Sheet Maker Engine.
Generates printable 4"x6" (8 photos) and A4 (32 photos) sheets at crisp 300 DPI
complete with scissor cutting guidelines, candidate Name & Date of Photo captions,
and white/blue background options.
"""

import io
import base64
import logging
from typing import Dict, Any, Optional
from PIL import Image, ImageDraw, ImageFont
try:
    import pymupdf as fitz
except ImportError:
    import fitz

logger = logging.getLogger("veriseal.photo_sheet_generator")


def get_system_font(size: int = 24):
    """Safely loads Arial or falls back to PIL default font."""
    font_names = ["arial.ttf", "calibri.ttf", "segoeui.ttf", "DejaVuSans.ttf"]
    for fn in font_names:
        try:
            return ImageFont.truetype(fn, size)
        except Exception:
            continue
    return ImageFont.load_default()


def prepare_single_passport_photo(
    img: Image.Image,
    photo_w: int,
    photo_h: int,
    add_name_date: bool = False,
    candidate_name: str = "",
    date_of_photo: str = "",
    bg_color: Optional[str] = None,
) -> Image.Image:
    """Crops and resizes image to exact passport dimensions (35x45mm or 51x51mm) with optional name/date strip."""
    if img.mode != "RGB":
        img = img.convert("RGB")

    # Crop to aspect ratio photo_w / photo_h
    target_aspect = photo_w / photo_h
    cur_aspect = img.width / img.height

    if cur_aspect > target_aspect:
        new_w = int(img.height * target_aspect)
        left = (img.width - new_w) // 2
        cropped = img.crop((left, 0, left + new_w, img.height))
    else:
        new_h = int(img.width / target_aspect)
        top = (img.height - new_h) // 2
        cropped = img.crop((0, top, img.width, top + new_h))

    resized = cropped.resize((photo_w, photo_h), Image.Resampling.LANCZOS)

    # If Name and Date strip requested
    if add_name_date and (candidate_name or date_of_photo):
        strip_height = int(photo_h * 0.16)
        name_date_canvas = resized.copy()
        draw = ImageDraw.Draw(name_date_canvas)
        
        # Draw white bottom strip
        strip_top = photo_h - strip_height
        draw.rectangle([0, strip_top, photo_w, photo_h], fill=(255, 255, 255))
        draw.line([0, strip_top, photo_w, strip_top], fill=(180, 180, 180), width=1)

        font_size = max(14, int(strip_height * 0.38))
        font = get_system_font(font_size)

        lines = []
        if candidate_name.strip():
            lines.append(candidate_name.strip().upper())
        if date_of_photo.strip():
            lines.append(f"DOP: {date_of_photo.strip()}")

        if len(lines) == 1:
            bbox = draw.textbbox((0, 0), lines[0], font=font)
            tw = bbox[2] - bbox[0]
            th = bbox[3] - bbox[1]
            tx = (photo_w - tw) // 2
            ty = strip_top + (strip_height - th) // 2
            draw.text((tx, ty), lines[0], fill=(0, 0, 0), font=font)
        elif len(lines) >= 2:
            line_font = get_system_font(max(12, int(strip_height * 0.32)))
            bbox1 = draw.textbbox((0, 0), lines[0], font=line_font)
            bbox2 = draw.textbbox((0, 0), lines[1], font=line_font)
            tx1 = (photo_w - (bbox1[2] - bbox1[0])) // 2
            tx2 = (photo_w - (bbox2[2] - bbox2[0])) // 2
            ty1 = strip_top + 2
            ty2 = strip_top + int(strip_height * 0.50)
            draw.text((tx1, ty1), lines[0], fill=(0, 0, 0), font=line_font)
            draw.text((tx2, ty2), lines[1], fill=(0, 0, 0), font=line_font)

        resized = name_date_canvas

    return resized


def draw_dashed_rectangle(
    draw: ImageDraw.ImageDraw,
    rect: tuple,
    dash_length: int = 8,
    space_length: int = 6,
    color: tuple = (160, 160, 160),
    width: int = 1,
):
    """Draws scissor cutting guide dashed rectangle."""
    x0, y0, x1, y1 = rect

    # Top line
    x = x0
    while x < x1:
        draw.line([x, y0, min(x + dash_length, x1), y0], fill=color, width=width)
        x += dash_length + space_length

    # Bottom line
    x = x0
    while x < x1:
        draw.line([x, y1, min(x + dash_length, x1), y1], fill=color, width=width)
        x += dash_length + space_length

    # Left line
    y = y0
    while y < y1:
        draw.line([x0, y, x0, min(y + dash_length, y1)], fill=color, width=width)
        y += dash_length + space_length

    # Right line
    y = y0
    while y < y1:
        draw.line([x1, y, x1, min(y + dash_length, y1)], fill=color, width=width)
        y += dash_length + space_length


def generate_passport_photo_sheet(
    image_bytes: bytes,
    sheet_format: str = "4x6_8photos",  # "4x6_8photos", "4x6_6photos", "A4_32photos", "A4_30photos", "single_35x45", "single_51x51"
    add_name_date: bool = False,
    candidate_name: str = "",
    date_of_photo: str = "",
    add_cutting_guides: bool = True,
    output_format: str = "both",  # "image", "pdf", "both"
) -> Dict[str, Any]:
    """
    Tiles input photo into a 300 DPI printable sheet for inkjet or lab printers.
    """
    raw_img = Image.open(io.BytesIO(image_bytes))
    DPI = 300

    # Define Dimensions at 300 DPI
    # Standard Indian Passport: 35mm x 45mm -> 413 x 531 px
    # US Visa / OCI Square: 50.8mm x 50.8mm (2" x 2") -> 600 x 600 px
    if "51x51" in sheet_format:
        photo_w, photo_h = 600, 600
    else:
        photo_w, photo_h = 413, 531

    # Single Passport Photo
    single_photo = prepare_single_passport_photo(
        raw_img,
        photo_w,
        photo_h,
        add_name_date=add_name_date,
        candidate_name=candidate_name,
        date_of_photo=date_of_photo,
    )

    if sheet_format == "single_35x45" or sheet_format == "single_51x51":
        # Just return single photo
        buf = io.BytesIO()
        single_photo.save(buf, format="JPEG", quality=95, dpi=(DPI, DPI))
        b64 = f"data:image/jpeg;base64,{base64.b64encode(buf.getvalue()).decode('ascii')}"
        return {
            "status": "success",
            "sheet_format": sheet_format,
            "total_photos": 1,
            "sheet_width_px": photo_w,
            "sheet_height_px": photo_h,
            "dpi": DPI,
            "image_base64": b64,
            "preview_base64": b64,
            "pdf_base64": None,
        }

    # Sheet configurations
    if sheet_format == "4x6_8photos":
        # 4" x 6" Photo Paper in Landscape: 1800 x 1200 px
        sheet_w, sheet_h = 1800, 1200
        cols, rows = 4, 2
        total_photos = 8
    elif sheet_format == "4x6_6photos":
        # 4" x 6" Photo Paper: 3 cols x 2 rows = 6 photos with wide borders
        sheet_w, sheet_h = 1800, 1200
        cols, rows = 3, 2
        total_photos = 6
    elif sheet_format == "A4_32photos":
        # A4 Paper at 300 DPI: 2480 x 3508 px
        # 4 cols x 8 rows = 32 photos
        sheet_w, sheet_h = 2480, 3508
        cols, rows = 4, 8
        total_photos = 32
    else:  # A4_30photos
        sheet_w, sheet_h = 2480, 3508
        cols, rows = 5, 6
        total_photos = 30

    # Create sheet canvas with pure white background
    sheet = Image.new("RGB", (sheet_w, sheet_h), color=(255, 255, 255))
    draw = ImageDraw.Draw(sheet)

    # Calculate Grid Spacing & Centering
    total_grid_w = cols * photo_w
    total_grid_h = rows * photo_h
    
    margin_x = (sheet_w - total_grid_w) // (cols + 1)
    margin_y = (sheet_h - total_grid_h) // (rows + 1)

    # Paste photos and draw cutting guides
    for r in range(rows):
        for c in range(cols):
            x = margin_x + c * (photo_w + margin_x)
            y = margin_y + r * (photo_h + margin_y)
            sheet.paste(single_photo, (x, y))

            if add_cutting_guides:
                # Draw outer guide box with 2px padding
                guide_rect = (x - 2, y - 2, x + photo_w + 2, y + photo_h + 2)
                draw_dashed_rectangle(draw, guide_rect, dash_length=6, space_length=5, color=(170, 170, 170), width=1)

    # Header / Footer watermark instruction for cyber cafe operator
    footer_text = "VeriSeal 300 DPI Passport Photo Sheet • Print at 100% Scale / Actual Size (Do not scale)"
    f_font = get_system_font(18)
    f_bbox = draw.textbbox((0, 0), footer_text, font=f_font)
    draw.text(
        ((sheet_w - (f_bbox[2] - f_bbox[0])) // 2, sheet_h - 26),
        footer_text,
        fill=(180, 180, 180),
        font=f_font,
    )

    # Export high-res image
    img_buf = io.BytesIO()
    sheet.save(img_buf, format="JPEG", quality=95, dpi=(DPI, DPI))
    img_bytes = img_buf.getvalue()
    img_b64 = f"data:image/jpeg;base64,{base64.b64encode(img_bytes).decode('ascii')}"

    # Generate printable PDF
    pdf_b64 = None
    if output_format in ("pdf", "both"):
        doc = fitz.open()
        # Convert pixels to PDF points (1 point = 1/72 inch, 300 DPI = 72 / 300)
        pt_w = sheet_w * 72.0 / DPI
        pt_h = sheet_h * 72.0 / DPI
        page = doc.new_page(width=pt_w, height=pt_h)
        page.insert_image(fitz.Rect(0, 0, pt_w, pt_h), stream=img_bytes)
        pdf_bytes = doc.tobytes(deflate=True)
        doc.close()
        pdf_b64 = f"data:application/pdf;base64,{base64.b64encode(pdf_bytes).decode('ascii')}"

    # Thumbnail Preview
    preview_img = sheet.copy()
    preview_img.thumbnail((600, 600), Image.Resampling.LANCZOS)
    p_buf = io.BytesIO()
    preview_img.save(p_buf, format="JPEG", quality=85)
    preview_b64 = f"data:image/jpeg;base64,{base64.b64encode(p_buf.getvalue()).decode('ascii')}"

    return {
        "status": "success",
        "sheet_format": sheet_format,
        "total_photos": total_photos,
        "sheet_width_px": sheet_w,
        "sheet_height_px": sheet_h,
        "dpi": DPI,
        "image_size_kb": round(len(img_bytes) / 1024.0, 2),
        "image_base64": img_b64,
        "pdf_base64": pdf_b64,
        "preview_base64": preview_b64,
    }
