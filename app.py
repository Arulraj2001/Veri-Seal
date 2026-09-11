"""
VeriSeal FastAPI Backend Verification Engine.
Designed for Hugging Face Spaces (Docker) and production API gateways.
Features IP rate limiting (slowapi), CORS, 25MB limits, in-memory validation, and standardized error schemas.
"""

import logging
from typing import List, Optional
from fastapi import FastAPI, File, Form, Header, HTTPException, Request, UploadFile, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from cca_certs import cca_manager
from compressor import batch_compress_pdfs, compress_pdf_to_target, inspect_pdf_pages
from models import (
    BatchVerificationResponse,
    CompressionResponse,
    ErrorResponse,
    SupportedDocCategory,
    VerificationResponse,
)
from verifier import InvalidPdfError, VerificationEngineError, async_verify_pdf, verify_pdf

# Configure structured logging (never log file bytes or passwords)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
)
logger = logging.getLogger("veriseal.api")

# Max file size: 25MB
MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024

# Setup slowapi rate limiter: key on client IP
limiter = Limiter(key_func=get_remote_address)

app = FastAPI(
    title="VeriSeal Engine",
    description="Production-grade Indian Government PDF Digital Signature Verification Engine",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Register slowapi state and error handler
app.state.limiter = limiter


@app.exception_handler(RateLimitExceeded)
async def custom_rate_limit_exceeded_handler(request: Request, exc: RateLimitExceeded):
    """Returns standardized JSON error response when IP rate limit is exceeded."""
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content={
            "error": True,
            "code": "RATE_LIMIT_EXCEEDED",
            "message": "Too many verification requests from this IP address.",
            "detail": "Free rate limit is 10 requests per minute per IP. Please wait a moment before trying again.",
        },
    )


# Configure CORS for production veriseal.in and local development (supports any localhost/127.0.0.1 port)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://veriseal.in",
        "https://www.veriseal.in",
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3001",
        "http://127.0.0.1:3002",
    ],
    allow_origin_regex=r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$|^https://.*\.vercel\.app$|^https://.*\.onrender\.com$|^https://.*\.veriseal\.in$",
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initializes the CCA India root trust store on server boot."""
    logger.info("Initializing VeriSeal CCA India PKI Trust Store...")
    try:
        cca_manager.initialize()
        logger.info("CCA India PKI Trust Store ready.")
    except Exception as exc:
        logger.error("Failed to initialize trust store: %s", exc)


@app.api_route("/", methods=["GET", "HEAD"], summary="Service Root / Health Check")
async def root():
    """Returns the operational status and engine info for root health checks (e.g. Render / Cloud Run probes)."""
    return {"status": "ok", "service": "VeriSeal Engine", "version": "1.0.0"}


@app.api_route("/health", methods=["GET", "HEAD"], summary="Service Health Check")
async def health_check():
    """Returns the operational status and engine version."""
    return {"status": "ok", "version": "1.0.0"}


@app.post(
    "/verify",
    response_model=VerificationResponse,
    summary="Verify PDF Digital Signature",
    responses={
        400: {"model": ErrorResponse},
        413: {"model": ErrorResponse},
        429: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
)
@limiter.limit("10/minute")
async def verify_single_pdf(
    request: Request,
    file: UploadFile = File(..., description="The Indian government PDF file to verify"),
    password: Optional[str] = Form(
        None, description="Decryption password if the PDF is password-protected (e.g. e-Aadhaar)"
    ),
):
    """
    Verifies digital signatures on an uploaded Indian government PDF against the official CCA India PKI chain.
    - Max file size: 25MB
    - Rate limit: 10 requests / minute / IP
    - Returns signer certificate details, cryptographic integrity, and verified PDF with embedded LTV DSS.
    """
    # 1. Validate MIME type / file extension
    filename = file.filename or "uploaded.pdf"
    if not filename.lower().endswith(".pdf") and file.content_type != "application/pdf":
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "error": True,
                "code": "INVALID_PDF",
                "message": "Invalid PDF format",
                "detail": f"Received content type: {file.content_type}, filename: {filename}",
            },
        )

    # 2. Read file in memory and enforce 25MB limit
    try:
        file_bytes = await file.read()
    except Exception as read_err:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "error": True,
                "code": "INVALID_PDF",
                "message": "Failed to read uploaded file.",
                "detail": str(read_err),
            },
        )

    if len(file_bytes) > MAX_FILE_SIZE_BYTES:
        return JSONResponse(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            content={
                "error": True,
                "code": "FILE_TOO_LARGE",
                "message": "The uploaded PDF exceeds the 25MB file size limit.",
                "detail": f"File size was {len(file_bytes) / (1024 * 1024):.2f}MB.",
            },
        )

    # 3. Perform verification
    try:
        result = await async_verify_pdf(file_bytes=file_bytes, password=password)
        if result.error_code == "INVALID_PDF":
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "error": True,
                    "code": "INVALID_PDF",
                    "message": "Invalid PDF format",
                    "detail": result.error_message,
                },
            )
        return result.to_response() if hasattr(result, "to_response") else result
    except InvalidPdfError as ipe:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "error": True,
                "code": ipe.code,
                "message": ipe.message,
                "detail": ipe.detail,
            },
        )
    except VerificationEngineError as vee:
        return JSONResponse(
            status_code=vee.status_code,
            content={
                "error": True,
                "code": vee.code,
                "message": vee.message,
                "detail": vee.detail,
            },
        )
    except Exception as exc:
        logger.exception("Unexpected error during PDF verification: %s", exc)
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "error": True,
                "code": "VERIFICATION_FAILED",
                "message": "An unexpected error occurred while verifying the digital signature.",
                "detail": str(exc),
            },
        )
    finally:
        # Zero out local references for memory hygiene
        file_bytes = None


@app.post(
    "/verify-batch",
    response_model=BatchVerificationResponse,
    summary="Batch PDF Verification (Pro / API Key Required)",
    responses={
        401: {"model": ErrorResponse},
        400: {"model": ErrorResponse},
    },
)
async def verify_batch_pdfs(
    files: List[UploadFile] = File(..., description="List of PDF files to verify (up to 10)"),
    x_api_key: Optional[str] = Header(None, alias="X-API-Key", description="API Key for Batch Processing"),
):
    """
    Batch verification endpoint for Pro users and API integrations.
    Accepts up to 10 files. Requires X-API-Key header.
    """
    # 1. API Key Authentication Check (Full auth in Phase 5)
    if not x_api_key:
        return JSONResponse(
            status_code=status.HTTP_401_UNAUTHORIZED,
            content={
                "error": True,
                "code": "UNAUTHORIZED",
                "message": "Missing API Key.",
                "detail": "Batch verification requires a valid 'X-API-Key' header.",
            },
        )

    # 2. Limit batch size to 10
    if len(files) > 10:
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={
                "error": True,
                "code": "BATCH_SIZE_EXCEEDED",
                "message": "Batch size limit exceeded.",
                "detail": "A maximum of 10 PDF documents can be verified in a single batch request.",
            },
        )

    results: List[VerificationResponse] = []
    for f in files:
        try:
            content = await f.read()
            if len(content) > MAX_FILE_SIZE_BYTES:
                results.append(
                    VerificationResponse(
                        status="ERROR",
                        signatures=[],
                        document_type="Unknown",
                        error_code="FILE_TOO_LARGE",
                        error_message="The uploaded PDF exceeds the 25MB file size limit.",
                        error="The uploaded PDF exceeds the 25MB file size limit.",
                    )
                )
                continue
            res = await async_verify_pdf(file_bytes=content)
            results.append(res.to_response() if hasattr(res, "to_response") else res)
        except VerificationEngineError as vee:
            results.append(
                VerificationResponse(
                    status="ERROR",
                    signatures=[],
                    document_type="Unknown",
                    error_code=vee.code,
                    error_message=vee.message,
                    error=f"{vee.code}: {vee.message}",
                )
            )
        except Exception as exc:
            results.append(
                VerificationResponse(
                    status="ERROR",
                    signatures=[],
                    document_type="Unknown",
                    error_code="VERIFICATION_FAILED",
                    error_message=str(exc),
                    error=str(exc),
                )
            )

    return BatchVerificationResponse(results=results, total_processed=len(results))


@app.post(
    "/compress",
    response_model=CompressionResponse,
    summary="Compress PDF for Government Exam Portals",
    description="100% Free unmonetized public utility. Compresses PDF to exact target limits (TNPSC 200KB, UPSC 300KB, SSC, NEET, etc.) with in-memory processing.",
)
@limiter.limit("30/minute")
async def compress_pdf_endpoint(
    request: Request,
    file: UploadFile = File(..., description="PDF certificate or document to compress"),
    target_kb: int = Form(default=200, description="Target max file size in KB (e.g. 180, 200, 250, 300)"),
    preset: str = Form(default="custom", description="Exam preset identifier (tnpsc, upsc, neet, ssc, bank, passport, 200kb, 100kb, custom)"),
    greyscale: bool = Form(default=False, description="Convert color scans to high-contrast monochrome/greyscale"),
    pages_to_keep: Optional[str] = Form(default=None, description="Comma-separated 1-indexed page numbers to keep (e.g. '1,2')"),
):
    """Compresses uploaded PDF in-memory to strictly comply with exam portal upload rules."""
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are supported for government exam portal compression.",
        )

    content = await file.read()
    if len(content) > MAX_FILE_SIZE_BYTES:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail="Uploaded file exceeds maximum allowed limit of 25MB.",
        )

    # Sanity checks on target_kb
    if target_kb < 10 or target_kb > 10000:
        target_kb = 200

    parsed_pages = None
    if pages_to_keep and pages_to_keep.strip():
        try:
            parsed_pages = [int(p.strip()) for p in pages_to_keep.split(",") if p.strip().isdigit()]
        except Exception:
            parsed_pages = None

    try:
        result = compress_pdf_to_target(
            file_bytes=content,
            target_kb=target_kb,
            preset=preset,
            greyscale=greyscale,
            pages_to_keep=parsed_pages,
        )
        return CompressionResponse(**result)
    except ValueError as ve:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(ve),
        )
    except Exception as exc:
        logger.error(f"Compression failed unexpectedly: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Compression processing failed: {str(exc)}",
        )


@app.post(
    "/compress-batch",
    summary="Batch Compress Multiple PDFs for Portals",
    description="100% Free multi-file PDF compressor. Compresses up to 10 certificate PDFs at once and packages them into a downloadable ZIP archive.",
)
@limiter.limit("15/minute")
async def compress_batch_endpoint(
    request: Request,
    files: List[UploadFile] = File(..., description="Multiple PDF certificates to compress"),
    target_kb: int = Form(default=200),
    preset: str = Form(default="custom"),
    greyscale: bool = Form(default=False),
):
    if not files or len(files) == 0:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No files uploaded.")

    if len(files) > 10:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Batch limit is 10 files at a time to ensure instant in-memory processing.",
        )

    file_tuples = []
    for f in files:
        if f.filename and f.filename.lower().endswith(".pdf"):
            data = await f.read()
            if len(data) <= MAX_FILE_SIZE_BYTES:
                file_tuples.append((f.filename, data))

    if not file_tuples:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No valid PDF files found.")

    try:
        batch_result = batch_compress_pdfs(
            files=file_tuples,
            target_kb=target_kb,
            preset=preset,
            greyscale=greyscale,
        )
        return JSONResponse(content=batch_result)
    except Exception as exc:
        logger.error(f"Batch compression failed: {exc}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Batch compression failed: {str(exc)}",
        )


@app.post(
    "/inspect-pdf",
    summary="Inspect PDF Pages and Generate Preview Thumbnails",
)
@limiter.limit("30/minute")
async def inspect_pdf_endpoint(
    request: Request,
    file: UploadFile = File(...),
):
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only PDF files supported.")

    content = await file.read()
    pages = inspect_pdf_pages(content)
    return JSONResponse(content={"pages": pages, "total_pages": len(pages)})



@app.get("/supported-docs", response_model=List[SupportedDocCategory], summary="Supported Document Categories")
async def get_supported_documents():
    """Returns the list of all supported Indian government documents and their issuing portals."""
    return [
        SupportedDocCategory(
            category="All India",
            name="e-Aadhaar (UIDAI)",
            portal="myAadhaar UIDAI Portal",
            sample_authority="Unique Identification Authority of India (NIC CA)",
            detection_keywords=["uidai", "myaadhaar", "aadhaar"],
        ),
        SupportedDocCategory(
            category="All India",
            name="PAN Card PDF",
            portal="Protean (NSDL) / UTIITSL",
            sample_authority="Income Tax Department (Protean CA)",
            detection_keywords=["permanent account number", "income tax", "pan"],
        ),
        SupportedDocCategory(
            category="All India",
            name="DigiLocker Issued Documents",
            portal="DigiLocker Portal",
            sample_authority="DigiLocker Authority (NIC CA)",
            detection_keywords=["digilocker"],
        ),
        SupportedDocCategory(
            category="All India",
            name="ITR-V (Income Tax Return)",
            portal="Income Tax e-Filing Portal",
            sample_authority="Central Processing Centre (CPC)",
            detection_keywords=["itr-v", "income tax return"],
        ),
        SupportedDocCategory(
            category="Tamil Nadu",
            name="Community Certificate",
            portal="TNeGA e-District Portal",
            sample_authority="Revenue Administration (NIC CA)",
            detection_keywords=["community certificate", "சமூக சான்றிதழ்", "caste"],
        ),
        SupportedDocCategory(
            category="Tamil Nadu",
            name="Nativity Certificate",
            portal="TNeGA e-District Portal",
            sample_authority="Tahsildar (NIC CA)",
            detection_keywords=["nativity", "பிறப்பிடச் சான்றிதழ்"],
        ),
        SupportedDocCategory(
            category="Tamil Nadu",
            name="Income Certificate",
            portal="TNeGA e-District Portal",
            sample_authority="Tahsildar (NIC CA)",
            detection_keywords=["income certificate", "வருமானச் சான்றிதழ்"],
        ),
        SupportedDocCategory(
            category="Andhra Pradesh & Telangana",
            name="Caste / Income Certificate (MeeSeva)",
            portal="MeeSeva Online Portal",
            sample_authority="Revenue Department (NIC CA)",
            detection_keywords=["meeseva", "caste", "income"],
        ),
        SupportedDocCategory(
            category="Karnataka",
            name="Caste & Income (Nadakacheri)",
            portal="Nadakacheri Atalji Janasnehi Kendra",
            sample_authority="Tahsildar / Revenue Inspector (NIC CA)",
            detection_keywords=["nadakacheri", "ejanma"],
        ),
        SupportedDocCategory(
            category="Kerala",
            name="Birth & Death Certificate (Sevana)",
            portal="Sevana Civil Registration / LSGD",
            sample_authority="Registrar of Births and Deaths (NIC CA)",
            detection_keywords=["sevana", "lsgd"],
        ),
    ]
