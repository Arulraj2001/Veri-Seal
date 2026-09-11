from datetime import datetime
from typing import List, Optional, Literal
from pydantic import BaseModel, Field


class SignatureDetail(BaseModel):
    field_name: str = Field(..., description="Name of the PDF signature form field")
    signer_name: str = Field(..., description="Common Name (CN) of signer from X.509 certificate")
    signer_org: str = Field(default="N/A", description="Organization (O) or Organizational Unit (OU) of signer")
    issuer: str = Field(..., description="Issuer certificate Common Name / CA identity")
    valid_from: Optional[datetime] = Field(default=None, description="Certificate validity start timestamp")
    valid_to: Optional[datetime] = Field(default=None, description="Certificate expiration timestamp")
    signed_on: Optional[datetime] = Field(default=None, description="Signing timestamp or embedded RFC 3161 token time")
    covers_whole_document: bool = Field(..., description="True if signature byte range covers EOF")
    hash_valid: bool = Field(..., description="True if cryptographic digest matches unmodified PDF bytes")
    chain_valid: bool = Field(..., description="True if validated against India CCA/RCAI trust hierarchy")
    intact: bool = Field(default=False, description="True if the PDF signature container is cryptographically intact")
    ltv_added: bool = Field(default=False, description="True if Document Security Store (DSS) LTV information was added")


class VerificationResponse(BaseModel):
    status: Literal["VALID", "INVALID", "UNKNOWN", "ERROR", "NO_SIGNATURE"]
    signatures: List[SignatureDetail] = Field(default_factory=list)
    document_type: str = Field(default="Government Document")
    doc_source: str = Field(default="State Portal")
    is_aadhaar: bool = Field(default=False)
    ltv_embedded: bool = Field(default=False)
    verified_pdf_b64: Optional[str] = Field(
        default=None,
        description="Base64 encoded stamped clean PDF without file-level encryption",
    )
    error_code: Optional[str] = None
    error_message: Optional[str] = None
    error: Optional[str] = None
    verified_pdf_base64: Optional[str] = Field(
        default=None,
        description="Backward-compatible alias for verified_pdf_b64",
    )


class BatchVerificationResponse(BaseModel):
    results: List[VerificationResponse]
    total_processed: int


class ErrorResponse(BaseModel):
    error: bool = True
    code: str
    message: str
    detail: Optional[str] = None


class SupportedDocCategory(BaseModel):
    category: str
    name: str
    portal: str
    sample_authority: str
    detection_keywords: List[str]


class CompressionResponse(BaseModel):
    success: bool = True
    original_size_kb: float
    compressed_size_kb: float
    reduction_percent: float
    target_kb: int
    fits_target: bool
    page_count: int
    preset: str
    greyscale: bool
    compliance_badges: List[str]
    preview_image_b64: str
    compressed_pdf_b64: str

