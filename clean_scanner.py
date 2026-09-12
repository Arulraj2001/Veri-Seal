"""
VeriSeal Clean Document Scanner & Xerox Binarizer Engine.
Removes phone shadows, yellow incandescent tint, and desk backgrounds from certificate photos.
Produces crisp, portal-ready documents (Magic Color, High-Contrast Xerox, or Greyscale).
"""

import io
import base64
import logging
from typing import Dict, Any, Optional
try:
    import numpy as np
except ImportError:
    np = None
from PIL import Image, ImageEnhance, ImageOps
try:
    import pymupdf as fitz
except ImportError:
    import fitz

logger = logging.getLogger("veriseal.clean_scanner")


def remove_shadows_magic_color(img: Image.Image) -> Image.Image:
    """
    Normalizes background lighting to pure white using background division.
    Keeps ink, blue/red stamps, and photos vibrant while eliminating shadows.
    """
    if np is None:
        enhancer = ImageEnhance.Contrast(img.convert("RGB"))
        boosted = enhancer.enhance(1.25)
        brightener = ImageEnhance.Brightness(boosted)
        return brightener.enhance(1.1)

    img_rgb = img.convert("RGB")
    np_img = np.array(img_rgb, dtype=np.float32)

    # Convert to greyscale for background illumination estimation
    grey = img.convert("L")
    
    # Fast background estimation using downsampled max/mean filter
    small_w, small_h = max(32, grey.width // 16), max(32, grey.height // 16)
    small_grey = grey.resize((small_w, small_h), Image.Resampling.BOX)
    
    # Smooth the background
    blurred_bg = small_grey.resize((grey.width, grey.height), Image.Resampling.BILINEAR)
    np_bg = np.array(blurred_bg, dtype=np.float32)
    np_bg = np.maximum(np_bg, 1.0)  # avoid div by zero

    # Division normalization: img / bg * 255
    norm_channels = []
    for c in range(3):
        norm = (np_img[:, :, c] / np_bg) * 235.0
        norm = np.clip(norm, 0, 255).astype(np.uint8)
        norm_channels.append(norm)

    result_np = np.stack(norm_channels, axis=2)
    result_img = Image.fromarray(result_np, "RGB")

    # Final contrast and color saturation polish
    enhancer = ImageEnhance.Contrast(result_img)
    result_img = enhancer.enhance(1.25)
    color_enhancer = ImageEnhance.Color(result_img)
    result_img = color_enhancer.enhance(1.15)

    return result_img


def apply_xerox_binarize(img: Image.Image, threshold_offset: int = 0) -> Image.Image:
    """
    Creates an ultra-sharp black & white photocopy scan using local adaptive thresholding.
    Eliminates all phone shadows, creases, and off-white tints.
    """
    if np is None:
        grey = img.convert("L")
        threshold = 140 + threshold_offset
        return grey.point(lambda p: 255 if p > threshold else 0).convert("RGB")

    grey = img.convert("L")
    np_grey = np.array(grey, dtype=np.float32)

    # Estimate local background
    small_w, small_h = max(32, grey.width // 16), max(32, grey.height // 16)
    small_bg = grey.resize((small_w, small_h), Image.Resampling.BOX)
    smooth_bg = small_bg.resize((grey.width, grey.height), Image.Resampling.BILINEAR)
    np_bg = np.array(smooth_bg, dtype=np.float32)

    # Difference from background
    diff = np_bg - np_grey
    
    # Text is typically darker than local background
    threshold = 28 + threshold_offset
    binary_mask = np.where(diff > threshold, 0, 255).astype(np.uint8)

    return Image.fromarray(binary_mask, "L").convert("RGB")


def apply_clean_greyscale(img: Image.Image) -> Image.Image:
    """Produces clean high-contrast greyscale document without yellow tint."""
    color_cleaned = remove_shadows_magic_color(img)
    grey = color_cleaned.convert("L")
    enhancer = ImageEnhance.Contrast(grey)
    boosted = enhancer.enhance(1.3)
    return boosted.convert("RGB")


def process_clean_document(
    file_bytes: bytes,
    mode: str = "magic_color",  # "magic_color", "xerox_bw", "greyscale"
    rotation: int = 0,  # 0, 90, 180, 270
    brightness: float = 1.0,  # 0.5 to 1.5
    contrast: float = 1.0,  # 0.5 to 2.0
    target_kb: Optional[int] = None,
    output_type: str = "both",  # "image", "pdf", "both"
) -> Dict[str, Any]:
    """
    Processes a document image or PDF page to remove shadows and produce clean scan.
    """
    # Open image (if PDF, render page 1)
    if file_bytes[:4] == b"%PDF":
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        if len(doc) == 0:
            raise ValueError("PDF document has no pages.")
        pix = doc[0].get_pixmap(dpi=200)
        img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
        doc.close()
    else:
        img = Image.open(io.BytesIO(file_bytes))
        if img.mode != "RGB":
            img = img.convert("RGB")

    # Apply Rotation
    if rotation in (90, 180, 270):
        # PIL rotate is counter-clockwise, expand=True preserves dimensions
        img = img.rotate(-rotation, expand=True)

    # Apply Scan Filter
    if mode == "xerox_bw":
        processed = apply_xerox_binarize(img)
    elif mode == "greyscale":
        processed = apply_clean_greyscale(img)
    else:  # magic_color default
        processed = remove_shadows_magic_color(img)

    # Apply Brightness / Contrast adjustments if non-default
    if brightness != 1.0:
        b_enh = ImageEnhance.Brightness(processed)
        processed = b_enh.enhance(brightness)
    if contrast != 1.0:
        c_enh = ImageEnhance.Contrast(processed)
        processed = c_enh.enhance(contrast)

    # Save output image with size budgeting
    img_buf = io.BytesIO()
    quality = 88
    if target_kb and target_kb > 0:
        target_bytes = target_kb * 1024
        # Binary search quality
        low_q, high_q = 30, 95
        best_buf = io.BytesIO()
        while low_q <= high_q:
            mid_q = (low_q + high_q) // 2
            t_buf = io.BytesIO()
            processed.save(t_buf, format="JPEG", quality=mid_q, optimize=True)
            if len(t_buf.getvalue()) <= target_bytes:
                best_buf = t_buf
                low_q = mid_q + 1
            else:
                high_q = mid_q - 1
        img_buf = best_buf if best_buf.tell() > 0 else t_buf
    else:
        processed.save(img_buf, format="JPEG", quality=quality, optimize=True)

    final_img_bytes = img_buf.getvalue()
    img_b64 = f"data:image/jpeg;base64,{base64.b64encode(final_img_bytes).decode('ascii')}"

    # Generate PDF if requested
    pdf_b64 = None
    if output_type in ("pdf", "both"):
        p_doc = fitz.open()
        a4_w, a4_h = 595.0, 842.0
        p_page = p_doc.new_page(width=a4_w, height=a4_h)
        p_page.insert_image(fitz.Rect(0, 0, a4_w, a4_h), stream=final_img_bytes)
        pdf_bytes = p_doc.tobytes(deflate=True)
        p_doc.close()
        pdf_b64 = f"data:application/pdf;base64,{base64.b64encode(pdf_bytes).decode('ascii')}"

    output_size_kb = round(len(final_img_bytes) / 1024.0, 2)

    return {
        "status": "success",
        "mode": mode,
        "width_px": processed.width,
        "height_px": processed.height,
        "output_size_kb": output_size_kb,
        "image_base64": img_b64,
        "pdf_base64": pdf_b64,
        "preview_base64": img_b64,
    }
