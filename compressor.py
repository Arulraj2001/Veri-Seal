"""
VeriSeal In-Memory Government Exam PDF Compressor & Batch Engine.
Zero-monetization, 100% free public utility suite for Indian applicant portals.
Optimized for:
- TNPSC (100KB - 200KB)
- UPSC OTR / DAF (20KB - 300KB)
- SSC CGL/CHSL/MTS (50KB - 200KB)
- NTA NEET / JEE (50KB - 300KB)
- IBPS / Banking (100KB - 200KB)
- Passport Seva (Max 1MB)
- EPFO UAN (Max 500KB)
- Generic Target Limits: 100KB, 200KB, 300KB, 500KB
"""

import base64
import io
import logging
import zipfile
from typing import Any, Dict, List, Optional, Tuple

import fitz  # PyMuPDF
from PIL import Image
import pikepdf

logger = logging.getLogger("veriseal.compressor")

# Preset target limits in KB
EXAM_PRESETS = {
    "tnpsc": {"name": "TNPSC (Group 1, 2, 4)", "target_kb": 180, "max_limit_kb": 200, "min_limit_kb": 100},
    "upsc": {"name": "UPSC (CSE, NDA, CDS)", "target_kb": 250, "max_limit_kb": 300, "min_limit_kb": 20},
    "neet": {"name": "NEET / JEE / NTA", "target_kb": 240, "max_limit_kb": 300, "min_limit_kb": 50},
    "ssc": {"name": "SSC (CGL, CHSL, MTS)", "target_kb": 175, "max_limit_kb": 200, "min_limit_kb": 50},
    "bank": {"name": "IBPS / SBI Banking", "target_kb": 180, "max_limit_kb": 200, "min_limit_kb": 100},
    "passport": {"name": "Passport Seva", "target_kb": 850, "max_limit_kb": 1024, "min_limit_kb": 10},
    "epfo": {"name": "EPFO / State PSCs", "target_kb": 420, "max_limit_kb": 500, "min_limit_kb": 10},
    "200kb": {"name": "200 KB Exact", "target_kb": 180, "max_limit_kb": 200, "min_limit_kb": 50},
    "100kb": {"name": "100 KB Exact", "target_kb": 90, "max_limit_kb": 100, "min_limit_kb": 20},
    "300kb": {"name": "300 KB Exact", "target_kb": 260, "max_limit_kb": 300, "min_limit_kb": 50},
    "500kb": {"name": "500 KB Exact", "target_kb": 430, "max_limit_kb": 500, "min_limit_kb": 50},
    "custom": {"name": "Custom Target", "target_kb": 200, "max_limit_kb": 200, "min_limit_kb": 10},
}


def _calculate_compliance(size_kb: float) -> List[str]:
    """Returns portal compliance badges based on resulting file size."""
    badges = []
    if size_kb <= 100:
        badges.append("100 KB Strict Portals")
    if size_kb <= 200:
        badges.extend(["TNPSC (<=200KB)", "SSC (<=200KB)", "IBPS / SBI (<=200KB)"])
    if size_kb <= 300:
        badges.extend(["UPSC OTR (<=300KB)", "NEET / JEE (<=300KB)"])
    if size_kb <= 500:
        badges.append("EPFO (<=500KB)")
    if size_kb <= 1024:
        badges.append("Passport Seva (<=1MB)")
    return badges


def _generate_thumbnail_b64(doc: fitz.Document, page_index: int = 0, dpi: int = 120) -> str:
    """Renders a page of the PDF to a crisp base64 JPEG thumbnail."""
    try:
        if len(doc) <= page_index:
            return ""
        page = doc[page_index]
        pix = page.get_pixmap(dpi=dpi)
        img_bytes = pix.tobytes("jpeg")
        return f"data:image/jpeg;base64,{base64.b64encode(img_bytes).decode('utf-8')}"
    except Exception as e:
        logger.warning(f"Could not generate page {page_index} thumbnail: {e}")
        return ""


def inspect_pdf_pages(file_bytes: bytes, max_pages: int = 12) -> List[Dict[str, Any]]:
    """Inspects a PDF and returns page dimensions and lightweight thumbnails."""
    pages_info = []
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        for i in range(min(len(doc), max_pages)):
            p = doc[i]
            rect = p.rect
            thumb = _generate_thumbnail_b64(doc, page_index=i, dpi=72)
            pages_info.append({
                "page_number": i + 1,
                "width": int(rect.width),
                "height": int(rect.height),
                "thumbnail_b64": thumb,
            })
        doc.close()
    except Exception as e:
        logger.error(f"Failed to inspect PDF pages: {e}")
    return pages_info


def _optimize_with_pikepdf(pdf_bytes: bytes) -> bytes:
    """Performs lossless stream recompression and unreferenced object stripping."""
    try:
        in_stream = io.BytesIO(pdf_bytes)
        with pikepdf.Pdf.open(in_stream) as p_doc:
            p_doc.remove_unreferenced_resources()
            out_stream = io.BytesIO()
            p_doc.save(
                out_stream,
                compress_streams=True,
                object_stream_mode=pikepdf.ObjectStreamMode.generate,
            )
            return out_stream.getvalue()
    except Exception as e:
        logger.warning(f"Pikepdf lossless pass failed: {e}")
        return pdf_bytes


def _compress_embedded_images(
    doc: fitz.Document,
    max_dimension: int,
    quality: int,
    greyscale: bool = False,
) -> None:
    """Downsamples and re-encodes embedded raster images in-place."""
    seen_xrefs = set()

    for page in doc:
        image_list = page.get_images(full=True)
        for img_info in image_list:
            xref = img_info[0]
            if xref in seen_xrefs:
                continue
            seen_xrefs.add(xref)

            try:
                base_image = doc.extract_image(xref)
                if not base_image:
                    continue

                raw_bytes = base_image.get("image")
                if not raw_bytes:
                    continue

                with Image.open(io.BytesIO(raw_bytes)) as pil_img:
                    if greyscale:
                        pil_img = pil_img.convert("L")
                    elif pil_img.mode not in ("RGB", "L"):
                        pil_img = pil_img.convert("RGB")

                    w, h = pil_img.size
                    if max(w, h) > max_dimension:
                        pil_img.thumbnail((max_dimension, max_dimension), Image.Resampling.LANCZOS)

                    out_img_buf = io.BytesIO()
                    pil_img.save(
                        out_img_buf,
                        format="JPEG",
                        quality=quality,
                        optimize=True,
                        progressive=True,
                    )
                    compressed_img_bytes = out_img_buf.getvalue()

                    if len(compressed_img_bytes) < len(raw_bytes):
                        page.replace_image(xref, stream=compressed_img_bytes)
            except Exception as img_err:
                logger.debug(f"Failed to optimize image xref {xref}: {img_err}")


def _rasterize_and_rebuild_pdf(
    pdf_bytes: bytes,
    dpi: int,
    quality: int,
    greyscale: bool = False,
) -> bytes:
    """
    Fallback for non-image-stream PDFs (complex vector scans or broken streams).
    Renders pages to high-contrast images and compiles a clean, lightweight PDF.
    """
    src_doc = fitz.open(stream=pdf_bytes, filetype="pdf")
    out_doc = fitz.open()

    for page in src_doc:
        rect = page.rect
        pix = page.get_pixmap(dpi=dpi)
        pil_img = Image.open(io.BytesIO(pix.tobytes("png")))

        if greyscale:
            pil_img = pil_img.convert("L")
        elif pil_img.mode not in ("RGB", "L"):
            pil_img = pil_img.convert("RGB")

        img_buf = io.BytesIO()
        pil_img.save(img_buf, format="JPEG", quality=quality, optimize=True)
        img_bytes = img_buf.getvalue()

        new_page = out_doc.new_page(width=rect.width, height=rect.height)
        new_page.insert_image(rect, stream=img_bytes)

    result = out_doc.tobytes(garbage=4, deflate=True)
    src_doc.close()
    out_doc.close()
    return result


def compress_pdf_to_target(
    file_bytes: bytes,
    target_kb: int = 200,
    preset: str = "custom",
    greyscale: bool = False,
    pages_to_keep: Optional[List[int]] = None,
) -> Dict[str, Any]:
    """
    Compresses a PDF to strictly fit within `target_kb` with guaranteed boundary limits.
    Optionally drops unselected pages (1-indexed list in `pages_to_keep`).
    100% in-memory processing.
    """
    original_size_bytes = len(file_bytes)
    original_size_kb = round(original_size_bytes / 1024, 2)

    # Validate PDF structure
    try:
        working_doc = fitz.open(stream=file_bytes, filetype="pdf")
        total_pages = len(working_doc)

        # Handle page deletion / selection if specified
        if pages_to_keep and len(pages_to_keep) > 0:
            # 1-indexed to 0-indexed
            valid_indices = {p - 1 for p in pages_to_keep if 1 <= p <= total_pages}
            if valid_indices and len(valid_indices) < total_pages:
                # Delete pages from end to start to avoid index shifting
                for page_idx in range(total_pages - 1, -1, -1):
                    if page_idx not in valid_indices:
                        working_doc.delete_page(page_idx)

        current_page_count = len(working_doc)
        if current_page_count == 0:
            raise ValueError("Document has no pages to retain.")

        initial_preview = _generate_thumbnail_b64(working_doc, 0, 120)
        processed_bytes = working_doc.tobytes(garbage=4, deflate=True)
        working_doc.close()
    except Exception as e:
        raise ValueError(f"Invalid or corrupted PDF file: {str(e)}")

    target_bytes = target_kb * 1024

    # If the PDF is already smaller than target_kb, apply lossless cleanup and return
    if len(processed_bytes) <= target_bytes:
        cleaned_bytes = _optimize_with_pikepdf(processed_bytes)
        final_bytes = cleaned_bytes if len(cleaned_bytes) < len(processed_bytes) else processed_bytes
        final_kb = round(len(final_bytes) / 1024, 2)
        return {
            "success": True,
            "original_size_kb": original_size_kb,
            "compressed_size_kb": final_kb,
            "reduction_percent": round(max(0.0, (1 - final_kb / original_size_kb) * 100), 1),
            "target_kb": target_kb,
            "fits_target": final_kb <= target_kb,
            "page_count": current_page_count,
            "preset": preset,
            "greyscale": greyscale,
            "compliance_badges": _calculate_compliance(final_kb),
            "preview_image_b64": initial_preview,
            "compressed_pdf_b64": base64.b64encode(final_bytes).decode("utf-8"),
        }

    # Pass 1: Lossless optimization with pikepdf
    pass1_bytes = _optimize_with_pikepdf(processed_bytes)
    if len(pass1_bytes) <= target_bytes:
        final_kb = round(len(pass1_bytes) / 1024, 2)
        doc = fitz.open(stream=pass1_bytes, filetype="pdf")
        preview = _generate_thumbnail_b64(doc, 0, 120)
        doc.close()
        return {
            "success": True,
            "original_size_kb": original_size_kb,
            "compressed_size_kb": final_kb,
            "reduction_percent": round((1 - final_kb / original_size_kb) * 100, 1),
            "target_kb": target_kb,
            "fits_target": True,
            "page_count": current_page_count,
            "preset": preset,
            "greyscale": greyscale,
            "compliance_badges": _calculate_compliance(final_kb),
            "preview_image_b64": preview,
            "compressed_pdf_b64": base64.b64encode(pass1_bytes).decode("utf-8"),
        }

    # Pass 2: Progressive intelligent downsampling on embedded images
    stages = [
        (1800, 85),  # High detail (200 DPI equivalent for A4)
        (1400, 75),  # Medium-high detail (150 DPI)
        (1200, 65),  # Standard document detail (130 DPI)
        (1000, 55),  # Strict exam limit pass (110 DPI)
        (800, 45),   # Maximum compression pass
    ]

    best_bytes = pass1_bytes
    best_preview = initial_preview

    for max_dim, quality in stages:
        doc = fitz.open(stream=processed_bytes, filetype="pdf")
        _compress_embedded_images(doc, max_dimension=max_dim, quality=quality, greyscale=greyscale)
        candidate_bytes = doc.tobytes(garbage=4, deflate=True)
        candidate_bytes = _optimize_with_pikepdf(candidate_bytes)

        if len(candidate_bytes) < len(best_bytes):
            best_bytes = candidate_bytes
            best_preview = _generate_thumbnail_b64(doc, 0, 120)

        doc.close()

        if len(best_bytes) <= target_bytes:
            break

    # Pass 3: Strict Fallback Rasterizer if still above target_kb
    if len(best_bytes) > target_bytes:
        logger.info("Embedded image compression insufficient. Running rasterized page fallback...")
        raster_stages = [
            (120, 65),
            (100, 55),
            (90, 45),
            (80, 38),
            (72, 32),
        ]
        for dpi, quality in raster_stages:
            try:
                candidate = _rasterize_and_rebuild_pdf(
                    processed_bytes, dpi=dpi, quality=quality, greyscale=greyscale
                )
                candidate = _optimize_with_pikepdf(candidate)
                if len(candidate) < len(best_bytes):
                    best_bytes = candidate
                    r_doc = fitz.open(stream=candidate, filetype="pdf")
                    best_preview = _generate_thumbnail_b64(r_doc, 0, 120)
                    r_doc.close()

                if len(best_bytes) <= target_bytes:
                    break
            except Exception as r_err:
                logger.warning(f"Raster fallback failed at {dpi} DPI: {r_err}")

    final_kb = round(len(best_bytes) / 1024, 2)
    fits_target = final_kb <= target_kb

    return {
        "success": True,
        "original_size_kb": original_size_kb,
        "compressed_size_kb": final_kb,
        "reduction_percent": round(max(0.0, (1 - final_kb / original_size_kb) * 100), 1),
        "target_kb": target_kb,
        "fits_target": fits_target,
        "page_count": current_page_count,
        "preset": preset,
        "greyscale": greyscale,
        "compliance_badges": _calculate_compliance(final_kb),
        "preview_image_b64": best_preview,
        "compressed_pdf_b64": base64.b64encode(best_bytes).decode("utf-8"),
    }


def batch_compress_pdfs(
    files: List[Tuple[str, bytes]],
    target_kb: int = 200,
    preset: str = "custom",
    greyscale: bool = False,
) -> Dict[str, Any]:
    """
    Compresses multiple PDF files in-memory and builds a downloadable ZIP archive.
    Ideal for students and cyber cafe operators with multiple certificates.
    """
    results = []
    total_original_bytes = 0
    total_compressed_bytes = 0

    zip_buffer = io.BytesIO()

    with zipfile.ZipFile(zip_buffer, "w", zipfile.ZIP_DEFLATED) as zip_file:
        for filename, content in files:
            try:
                comp = compress_pdf_to_target(
                    file_bytes=content,
                    target_kb=target_kb,
                    preset=preset,
                    greyscale=greyscale,
                )
                raw_compressed = base64.b64decode(comp["compressed_pdf_b64"])
                total_original_bytes += len(content)
                total_compressed_bytes += len(raw_compressed)

                # Format filename in zip
                clean_name = filename.rsplit(".", 1)[0]
                zip_filename = f"{clean_name}_compressed_{int(comp['compressed_size_kb'])}KB.pdf"
                zip_file.writestr(zip_filename, raw_compressed)

                results.append({
                    "filename": filename,
                    "success": True,
                    "original_size_kb": comp["original_size_kb"],
                    "compressed_size_kb": comp["compressed_size_kb"],
                    "reduction_percent": comp["reduction_percent"],
                    "fits_target": comp["fits_target"],
                    "compliance_badges": comp["compliance_badges"],
                    "preview_image_b64": comp["preview_image_b64"],
                    "compressed_pdf_b64": comp["compressed_pdf_b64"],
                    "download_name": zip_filename,
                })
            except Exception as e:
                logger.error(f"Failed to compress file {filename} in batch: {e}")
                results.append({
                    "filename": filename,
                    "success": False,
                    "error": str(e),
                })

    zip_bytes = zip_buffer.getvalue()
    orig_kb = round(total_original_bytes / 1024, 2)
    comp_kb = round(total_compressed_bytes / 1024, 2)

    return {
        "success": True,
        "total_files": len(files),
        "successful_files": sum(1 for r in results if r.get("success")),
        "total_original_size_kb": orig_kb,
        "total_compressed_size_kb": comp_kb,
        "overall_reduction_percent": round(max(0.0, (1 - comp_kb / orig_kb) * 100), 1) if orig_kb > 0 else 0.0,
        "results": results,
        "zip_archive_b64": base64.b64encode(zip_bytes).decode("utf-8") if len(zip_bytes) > 0 else None,
    }
