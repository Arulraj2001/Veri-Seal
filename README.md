---
title: VeriSeal Backend
emoji: 🛡️
colorFrom: orange
colorTo: red
sdk: docker
pinned: false
---

# 🛡️ VeriSeal Backend Verification Engine

Production-grade Indian Government PDF Digital Signature Verification Engine powered by **FastAPI**, **pyHanko**, and **CCA India PKI Trust Stores**.

Designed for deployment on **Hugging Face Spaces** (Docker) or high-throughput production cloud instances.

---

## 🇮🇳 Capabilities

- **CCA India PKI Chain Validation**: Validates digital signatures directly against the official Root Certifying Authority of India (RCAI 2004/2014/2022) and licensed Sub-CAs:
  - National Informatics Centre (NIC CA 2014, 2017, 2021)
  - eMudhra CA
  - Capricorn CA
  - (n)Code Solutions CA
  - SafeScrypt (Sify) CA
  - Protean (NSDL) e-Gov CA
- **LTV (Long-Term Validation) Embedding**: Automatically applies Document Security Store (`/DSS`) structures and VRI dictionaries to valid PDFs so they retain permanent green ticks in Adobe Acrobat and all standard PDF readers without manual root cert imports.
- **Intelligent Document Type Detection**: Identifies e-Aadhaar (UIDAI), Community Certificates (BC/MBC/SC/ST), Nativity, Income, First Graduate, PAN Cards, DigiLocker docs, ITR-V, Birth, and Death certificates.
- **Zero-Storage Privacy Architecture**: All PDF processing, signature extraction, cryptographic checks, and LTV additions occur **100% in-memory** (`io.BytesIO`). No user documents are ever written to disk or persisted.
- **DDoS & Abuse Protection**: Integrated `slowapi` rate limiting (10 requests/min per IP address for free tier).

---

## 📡 API Endpoints

### 1. `POST /verify`
Verifies a single Indian government PDF.

- **Content-Type**: `multipart/form-data`
- **Fields**:
  - `file`: PDF binary file (max 25MB)
  - `password`: *(Optional)* Decryption password for password-protected PDFs (e.g. e-Aadhaar convention `NAME1995`)
- **Rate Limit**: 10 requests / minute / IP

#### Example Request:
```bash
curl -X POST "https://YOUR_HF_SPACE_URL/verify" \
  -F "file=@eaadhaar_sample.pdf" \
  -F "password=RAMA1992"
```

#### Success Response (`200 OK`):
```json
{
  "status": "VALID",
  "document_type": "e-Aadhaar (UIDAI)",
  "signatures": [
    {
      "field_name": "Signature1",
      "signer_name": "Unique Identification Authority of India",
      "signer_org": "UIDAI",
      "issuer": "NIC CA 2014 Sub-CA",
      "valid_from": "2021-04-12T08:30:00",
      "valid_to": "2024-04-12T08:30:00",
      "signed_on": "2023-11-20T14:15:32",
      "covers_whole_document": true,
      "hash_valid": true,
      "chain_valid": true,
      "ltv_added": true
    }
  ],
  "error": null,
  "verified_pdf_base64": "JVBERi0xLjc..."
}
```

---

### 2. `GET /health`
Returns service status.

```bash
curl -X GET "https://YOUR_HF_SPACE_URL/health"
```

```json
{
  "status": "ok",
  "version": "1.0.0"
}
```

---

### 3. `GET /supported-docs`
Lists all supported document categories and detection patterns.

```bash
curl -X GET "https://YOUR_HF_SPACE_URL/supported-docs"
```

---

### 4. `POST /verify-batch` *(Pro / API Key)*
Verifies up to 10 PDFs in a single request.

- **Header**: `X-API-Key: your_api_key`
- **Fields**: `files` (multiple PDF files)

---

## ⚠️ Error Responses

All error responses strictly follow this schema:
```json
{
  "error": true,
  "code": "ERROR_CODE",
  "message": "Human-readable explanation",
  "detail": "Technical error detail"
}
```

| Code | HTTP Status | Description |
| :--- | :--- | :--- |
| `NO_SIGNATURE_FOUND` | 422 | No cryptographic signature block exists in the PDF |
| `WRONG_PASSWORD` | 401 | Document is password-encrypted and an invalid or missing password was provided |
| `FILE_TOO_LARGE` | 413 | File exceeds 25MB size limit |
| `INVALID_PDF` | 400 | File is corrupt or not a recognized PDF specification |
| `UNSUPPORTED_FORMAT` | 415 | Uploaded file is not a PDF |
| `RATE_LIMIT_EXCEEDED`| 429 | Exceeded 10 requests per minute per IP |
| `VERIFICATION_FAILED`| 500 | Unexpected cryptographic verification failure |

---

## 🔒 Security Principles

1. **In-Memory Pipeline**: All operations operate on memory streams (`io.BytesIO`).
2. **Confidentiality**: Passwords and document text are never logged.
3. **Soft-Fail Revocation**: Prevents false negatives when government CRL/OCSP servers experience network outages.
4. **CORS Protected**: Configured for `https://veriseal.in` and local frontend environments.
