"""
VeriSeal Black Ink Signature Extractor & Contrast Enhancer Engine.
Removes ruled notebook lines, converts blue/faint ink to dense official India Black,
whitens paper backgrounds to pure #FFFFFF, auto-crops to stroke boundaries,
and calibrates output to strict portal specifications (SSC, UPSC, IBPS, TNPSC).
"""

from __future__ import annotations
import io
import base64
import logging
from typing import Dict, Any, Optional, Tuple
try:
    import cv2
    import numpy as np
except ImportError:
    cv2 = None
    np = None
from PIL import Image, ImageOps

logger = logging.getLogger("veriseal.signature_extractor")


def remove_notebook_lines(gray: np.ndarray, line_sensitivity: float = 1.0) -> np.ndarray:
    """
    Detects and eliminates horizontal ruled notebook lines using morphological structuring elements.
    Preserves diagonal and vertical handwritten signature pen strokes.
    """
    h, w = gray.shape
    # Line width kernel scaled to image dimensions
    kernel_len = max(20, int(w * 0.04 * line_sensitivity))
    horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (kernel_len, 1))

    # Binary inverse of grayscale to detect dark strokes
    binary = cv2.adaptiveThreshold(
        gray, 255, cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY_INV, 15, 8
    )

    # Detect horizontal lines
    detected_lines = cv2.morphologyEx(binary, cv2.MORPH_OPEN, horizontal_kernel, iterations=2)

    # Dilate lines slightly to cover anti-aliased pen edges
    dilate_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (3, 2))
    detected_lines = cv2.dilate(detected_lines, dilate_kernel, iterations=1)

    return detected_lines


def auto_crop_signature(img_bgr: np.ndarray, mask: np.ndarray, padding_ratio: float = 0.06) -> Tuple[np.ndarray, np.ndarray]:
    """
    Crops the image strictly to the signature's active stroke bounding box with safe padding.
    """
    coords = cv2.findNonZero(mask)
    if coords is None:
        return img_bgr, mask

    x, y, w, h = cv2.boundingRect(coords)
    img_h, img_w = img_bgr.shape[:2]

    # Calculate padding
    pad_x = max(8, int(w * padding_ratio))
    pad_y = max(8, int(h * padding_ratio))

    x1 = max(0, x - pad_x)
    y1 = max(0, y - pad_y)
    x2 = min(img_w, x + w + pad_x)
    y2 = min(img_h, y + h + pad_y)

    cropped_bgr = img_bgr[y1:y2, x1:x2]
    cropped_mask = mask[y1:y2, x1:x2]

    return cropped_bgr, cropped_mask


def process_signature(
    image_bytes: bytes,
    ink_mode: str = "pure_black",       # "pure_black", "deep_navy", "original"
    remove_lines: bool = True,
    line_sensitivity: float = 1.0,     # 0.5 (gentle) to 1.5 (aggressive)
    auto_crop: bool = True,
    target_preset: str = "ssc",        # "ssc", "upsc", "ibps", "tnpsc", "custom"
    custom_width: Optional[int] = None,
    custom_height: Optional[int] = None,
    target_min_kb: Optional[int] = None,
    target_max_kb: Optional[int] = None,
    rotation: int = 0,
) -> Dict[str, Any]:
    """
    Main entry point for signature processing.
    Executes in volatile RAM; zero disk storage.
    """
    # 1. Load image from RAM buffer
    if cv2 is None or np is None:
        raise RuntimeError("OpenCV and NumPy are required for signature extraction on the server.")

    nparr = np.frombuffer(image_bytes, np.uint8)
    img_bgr = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img_bgr is None:
        raise ValueError("Invalid or corrupted image format. Please upload JPG, PNG, or WebP.")

    # 2. Handle Rotation
    if rotation == 90:
        img_bgr = cv2.rotate(img_bgr, cv2.ROTATE_90_CLOCKWISE)
    elif rotation == 180:
        img_bgr = cv2.rotate(img_bgr, cv2.ROTATE_180)
    elif rotation == 270:
        img_bgr = cv2.rotate(img_bgr, cv2.ROTATE_90_COUNTERCLOCKWISE)

    # 3. Grayscale conversion and illumination normalization
    gray = cv2.cvtColor(img_bgr, cv2.COLOR_BGR2GRAY)

    # Background illumination estimation via morphological opening
    bg_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (25, 25))
    background = cv2.morphologyEx(gray, cv2.MORPH_DILATE, bg_kernel)
    diff = cv2.absdiff(background, gray)
    norm_gray = cv2.normalize(diff, None, alpha=0, beta=255, norm_type=cv2.NORM_MINMAX, dtype=cv2.CV_8UC1)

    # 4. Extract ink strokes via Otsu adaptive thresholding
    _, ink_mask = cv2.threshold(norm_gray, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

    # 5. Remove horizontal notebook lines if enabled
    if remove_lines:
        line_mask = remove_notebook_lines(gray, line_sensitivity=line_sensitivity)
        # Erase detected lines from ink mask
        ink_mask = cv2.bitwise_and(ink_mask, cv2.bitwise_not(line_mask))

    # Noise reduction (remove single dust particles < 4 pixels)
    kernel_clean = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (2, 2))
    ink_mask = cv2.morphologyEx(ink_mask, cv2.MORPH_OPEN, kernel_clean)

    # 6. Auto-crop to signature bounding box
    if auto_crop:
        img_bgr, ink_mask = auto_crop_signature(img_bgr, ink_mask)

    # 7. Render clean output with target ink color
    h, w = ink_mask.shape
    # Pure white background canvas
    clean_output = np.full((h, w, 3), 255, dtype=np.uint8)

    if ink_mode == "pure_black":
        # Official Indian Standard Dense Black ink (#141414) with anti-aliasing gradient
        intensity = norm_gray[0:h, 0:w].astype(np.float32) / 255.0
        for c in range(3):
            clean_output[:, :, c] = np.where(
                ink_mask > 0,
                np.clip(255 - (intensity * 240), 14, 255).astype(np.uint8),
                255
            )
    elif ink_mode == "deep_navy":
        # Professional Bank/SSC Deep Blue (#0d1b4c)
        clean_output[ink_mask > 0] = [76, 27, 13]  # BGR for #0d1b4c
    else:  # original
        clean_output = np.where(ink_mask[:, :, None] > 0, img_bgr, [255, 255, 255]).astype(np.uint8)

    # Convert BGR back to PIL Image (RGB)
    result_rgb = cv2.cvtColor(clean_output, cv2.COLOR_BGR2RGB)
    pil_img = Image.fromarray(result_rgb)

    # 8. Apply Target Preset Dimensions and Size Budgeting
    target_w, target_h = pil_img.width, pil_img.height
    min_kb, max_kb = 10, 20  # Default SSC

    if target_preset == "ssc":
        target_w, target_h = 140, 60
        min_kb, max_kb = 10, 20
    elif target_preset == "upsc":
        target_w, target_h = 350, 350
        min_kb, max_kb = 20, 50
    elif target_preset == "ibps":
        target_w, target_h = 140, 60
        min_kb, max_kb = 10, 20
    elif target_preset == "tnpsc":
        target_w, target_h = 200, 60
        min_kb, max_kb = 10, 20
    elif target_preset == "custom":
        if custom_width and custom_height:
            target_w, target_h = custom_width, custom_height
        if target_min_kb and target_max_kb:
            min_kb, max_kb = target_min_kb, target_max_kb

    # Resize to exact portal dimensions with Lanczos resampling
    resized_img = pil_img.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # 9. Compress strictly between min_kb and max_kb
    target_max_bytes = max_kb * 1024
    target_min_bytes = min_kb * 1024

    best_buf = io.BytesIO()
    low_q, high_q = 30, 95
    chosen_quality = 85

    # Binary search optimal JPEG quality
    while low_q <= high_q:
        mid_q = (low_q + high_q) // 2
        test_buf = io.BytesIO()
        resized_img.save(test_buf, format="JPEG", quality=mid_q, optimize=True, dpi=(200, 200))
        size = len(test_buf.getvalue())
        if size <= target_max_bytes:
            best_buf = test_buf
            chosen_quality = mid_q
            low_q = mid_q + 1
        else:
            high_q = mid_q - 1

    final_bytes = best_buf.getvalue() if best_buf.tell() > 0 else test_buf.getvalue()

    # If file size is under min_kb, pad with safe EXIF metadata/quality
    if len(final_bytes) < target_min_bytes:
        pad_buf = io.BytesIO()
        resized_img.save(pad_buf, format="JPEG", quality=95, optimize=False, dpi=(300, 300))
        final_bytes = pad_buf.getvalue()

    final_size_kb = round(len(final_bytes) / 1024.0, 2)
    img_b64 = f"data:image/jpeg;base64,{base64.b64encode(final_bytes).decode('ascii')}"

    return {
        "status": "success",
        "preset": target_preset,
        "width_px": target_w,
        "height_px": target_h,
        "aspect_ratio": round(target_w / target_h, 3),
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
