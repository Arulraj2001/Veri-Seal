"""
VeriSeal Left Thumb Impression (LTI) Ridge Sharpener & Binarizer Engine.
Enhances biological friction ridges, normalizes uneven ink darkness,
eliminates paper smudges, and budgets strictly to 20KB-50KB for IBPS, SBI, and Railway RRB portals.
"""

import io
import base64
import logging
from typing import Dict, Any, Optional
import cv2
import numpy as np
from PIL import Image

logger = logging.getLogger("veriseal.thumb_impression_engine")


def enhance_friction_ridges(gray: np.ndarray, ridge_boost: float = 1.2) -> np.ndarray:
    """
    Enhances papillary ridges using Contrast Limited Adaptive Histogram Equalization (CLAHE)
    and unsharp masking.
    """
    # 1. CLAHE for local ridge contrast
    clahe = cv2.createCLAHE(clipLimit=2.5 * ridge_boost, tileGridSize=(8, 8))
    enhanced = clahe.apply(gray)

    # 2. Unsharp masking to crisp up ridge edges
    gaussian = cv2.GaussianBlur(enhanced, (0, 0), 2.0)
    unsharp = cv2.addWeighted(enhanced, 1.5, gaussian, -0.5, 0)

    return unsharp


def process_thumb_impression(
    image_bytes: bytes,
    rotation: int = 0,
    ridge_sharpness: float = 1.0,     # 0.5 to 1.5
    ink_density: float = 1.0,          # 0.8 to 1.4
    paper_clean_strength: float = 1.0, # 0.5 to 1.5
    portal_preset: str = "ibps",       # "ibps", "rrb", "ssc", "custom"
    target_width: int = 240,
    target_height: int = 240,
    min_kb: int = 20,
    max_kb: int = 50,
) -> Dict[str, Any]:
    """
    Processes thumb impression strictly in RAM.
    """
    nparr = np.frombuffer(image_bytes, np.uint8)
    img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img_bgr is None:
        raise ValueError("Invalid image format. Please upload a clear photo of your thumb impression.")

    # 1. Rotation
    if rotation == 90:
        img_bgr = cv2.rotate(img_bgr, cv2.ROTATE_90_CLOCKWISE)
    elif rotation == 180:
        img_bgr = cv2.rotate(img_bgr, cv2.ROTATE_180)
    elif rotation == 270:
        img_bgr = cv2.rotate(img_bgr, cv2.ROTATE_90_COUNTERCLOCKWISE)

    # 2. Grayscale
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

    # 3. Ridge enhancement
    enhanced_ridges = enhance_friction_ridges(gray, ridge_boost=ridge_sharpness)

    # 4. Background illumination subtraction
    bg_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (35, 35))
    bg = cv2.morphologyEx(enhanced_ridges, cv2.MORPH_DILATE, bg_kernel)
    diff = cv2.absdiff(bg, enhanced_ridges)
    normalized = cv2.normalize(diff, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)

    # 5. Ink density scaling
    scaled = np.clip(normalized.astype(np.float32) * (1.2 * ink_density), 0, 255).astype(np.uint8)

    # 6. Reconstruct onto pure white paper canvas
    # Thumb ink is typically dark navy/blue or black on Indian exam forms
    h, w = scaled.shape
    output_rgb = np.full((h, w, 3), 255, dtype=np.uint8)

    # Render dark blue/black ink with antialiased intensity
    intensity = scaled.astype(np.float32) / 255.0
    for c, base_color in enumerate([18, 30, 95]):  # Deep Blue Ink #121e5f
        output_rgb[:, :, c] = np.where(
            scaled > int(25 / paper_clean_strength),
            np.clip(255 - (intensity * (255 - base_color)), base_color, 255).astype(np.uint8),
            255
        )

    pil_img = Image.fromarray(output_rgb)

    # 7. Apply portal dimensions
    t_w, t_h = target_width, target_height
    if portal_preset in ("ibps", "rrb", "ssc"):
        t_w, t_h = 240, 240
        min_kb, max_kb = 20, 50

    resized_img = pil_img.resize((t_w, t_h), Image.Resampling.LANCZOS)

    # 8. Size budgeting strictly between min_kb and max_kb
    target_max_bytes = max_kb * 1024
    target_min_bytes = min_kb * 1024

    best_buf = io.BytesIO()
    low_q, high_q = 35, 95

    while low_q <= high_q:
        mid_q = (low_q + high_q) // 2
        test_buf = io.BytesIO()
        resized_img.save(test_buf, format="JPEG", quality=mid_q, optimize=True, dpi=(200, 200))
        size = len(test_buf.getvalue())
        if size <= target_max_bytes:
            best_buf = test_buf
            low_q = mid_q + 1
        else:
            high_q = mid_q - 1

    final_bytes = best_buf.getvalue() if best_buf.tell() > 0 else test_buf.getvalue()

    # Pad if under min_kb
    if len(final_bytes) < target_min_bytes:
        pad_buf = io.BytesIO()
        resized_img.save(pad_buf, format="JPEG", quality=96, optimize=False, dpi=(300, 300))
        final_bytes = pad_buf.getvalue()

    final_size_kb = round(len(final_bytes) / 1024.0, 2)
    img_b64 = f"data:image/jpeg;base64,{base64.b64encode(final_bytes).decode('ascii')}"

    return {
        "status": "success",
        "preset": portal_preset,
        "width_px": t_w,
        "height_px": t_h,
        "aspect_ratio": 1.0,
        "output_size_kb": final_size_kb,
        "min_kb_target": min_kb,
        "max_kb_target": max_kb,
        "is_within_limits": min_kb <= final_size_kb <= max_kb,
        "image_base64": img_b64,
        "preview_base64": img_b64,
        "format": "JPEG",
        "color_space": "sRGB",
        "dpi": 200,
    }
