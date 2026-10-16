# Kagazo (#1 Search & GEO Dominance) Master Execution Plan

> **Objective:** Propel `kagazo.in` to the **#1 ranking** on Google Search, Google AI Overviews (SGE), Perplexity, and ChatGPT Search for Indian competitive exam document preparation, PDF compression, and sovereign identity tools.  
> **Status:** 🟢 All 18 Tasks Fully Executed & Production Ready (100%)  
> **Last Updated:** 2026-09-27  

---

## Master Progress Dashboard

| Phase | Description | Total Tasks | Completed | Status |
| :--- | :--- | :---: | :---: | :---: |
| **Phase 1** | Technical SEO & Generative Engine Optimization (GEO) | 4 | 4 | ✅ Completed |
| **Phase 2** | High-Yield Evergreen Authority Content Hubs | 4 | 4 | ✅ Completed |
| **Phase 3** | High-Intent Viral Tools & Workflow Bundles | 4 | 4 | ✅ Completed |
| **Phase 4** | Regional Indic SEO (`ta-IN`) & Transliteration Grid | 3 | 3 | ✅ Completed |
| **Phase 5** | Digital PR, Backlinks & Distribution Engine | 3 | 3 | ✅ Completed |
| **Phase 6** | Search Indexation Repair, 404 Elimination & AdSense Shield | 4 | 4 | ✅ Completed |
| **Total** | | **22** | **22** | **100% Completed 🎉** |

---

## Phase 1: Technical SEO & Generative Engine Optimization (GEO)

*Goal: Transform Kagazo from a standard utility website into an authoritative entity cited by Google AI Overviews, Perplexity, and ChatGPT Search.*

- [x] **Task 1.1: WebApplication + HowTo + FAQPage Combined Schema Pipeline**
  - Built unified Schema.org generator in `lib/seo-schema.ts` (`buildToolStructuredData` & `buildSeoPortalStructuredData`).
  - Created safe JSON-LD renderer `components/seo/JsonLd.tsx` with XSS mitigation.
  - Eliminated global FAQ schema contamination in `app/layout.tsx` to fix Google duplicate schema warnings.
  - Upgraded portal pages (`app/[slug]/page.tsx`) with combined WebApplication + HowTo + FAQPage + BreadcrumbList graph.
  - Upgraded regional Tamil tool pages (`app/ta/tools/...`) with full 4-tier structured data.
  - Verified with 0 TypeScript compilation errors.

- [x] **Task 1.2: Answer Capsule ("Rule of 45 Words") Protocol Integration**
  - Created reusable GEO `<AnswerCapsule />` component (`components/seo/AnswerCapsule.tsx`) with external official gazette citations, in-RAM privacy badges, and bilingual English/Tamil mode.
  - Implemented Answer Capsule on English TNPSC Tool (`app/tools/tnpsc-photo-signature-resizer/page.tsx`).
  - Implemented Answer Capsule on Tamil TNPSC Tool (`app/ta/tools/tnpsc-photo-signature-resizer/page.tsx`).
  - Standardized direct answer box in document/portal SEO pages (`app/[slug]/page.tsx`).

- [x] **Task 1.3: BreadcrumbList Schema & Canonical/Hreflang Standardization**
  - Fixed `components/ui/Breadcrumb.tsx` to ensure every `ListItem` has a valid Google-compliant `item` URL and added `suppressSchema` prop to prevent duplicate BreadcrumbList scripts on parent pages.
  - Standardized bidirectional `hreflang` language tags across blog posts and Tamil pages supporting `en`, `en-IN`, `ta`, `ta-IN`, `hi`, `hi-IN`, and `x-default`.

- [x] **Task 1.4: XML Sitemap Dynamic Catalog Synchronization & Priority Calibration**
  - Implemented dynamic zero-orphan catalog synchronization in `app/sitemap.ts` with `TOOLS_CATALOG` to automatically index all 135+ current and future tools.
  - Resolved missing indexation for `/tools/voice-to-text`.
  - Calibrated search priority rankings (1.0 for core portals, 0.98 for high-demand exam tools, 0.95 for utility catalog, 0.90 for SEO guides, 0.85 for blog posts).
  - Verified integration with `app/robots.ts` declaring both `/sitemap.xml` and `/feed.xml`.

---

## Phase 2: High-Yield Evergreen Authority Content Hubs

*Goal: Write comprehensive, citation-grade technical and exam manuals that capture high-volume organic search queries and earn natural `.gov.in` and educational backlinks.*

- [x] **Task 2.1: All-India Competitive Exam Document Guidelines**
  - **Guide 1 (UPSC CSE):** Published `upsc-cse-photo-signature-guidelines-name-date-stamp-2026` covering the mandatory 10-day Date of Photograph (DOP) rule, 20–300 KB bounds, and capital letter name banner integration.
  - **Guide 2 (IBPS PO/Clerk):** Published `ibps-photo-signature-thumb-declaration-size-guidelines-2026` covering the 4-in-1 asset matrix (Photo, Signature, Left Thumb, and exact black-ink handwritten declaration text).
  - **Guide 3 (SSC CGL/CHSL):** Published `ssc-live-photo-signature-upload-guidelines-cgl-chsl-2026` covering live webcam background contrast requirements, computer vision face checks, and 10–20 KB signature sizing.
  - **Guide 4 (TNPSC OTR):** Published `tnpsc-community-nativity-pstm-certificate-pdf-compression-guide` covering Community, Nativity, and 2021-amended PSTM certificate compression under 200 KB without roll number blur.

- [x] **Task 2.2: Cyber Café & CSC Center "Business OS" Operational Playbooks**
  - **Guide 5 (Cyber Cafe Hardware):** Published `how-to-print-8-passport-photos-on-4x6-sheet-epson-canon` covering Epson L805 vs Canon G-Series gang-run margins, 300 DPI spacing, and 88% gross profit margins on 4x6 photo paper.
  - **Guide 6 (e-Sevai Operations):** Published `tnesevai-csc-kiosk-revenue-certificate-pdf-compression-guide` covering TNeGA / e-District upload limits (< 200 KB), monochrome thresholding, and multi-page attachment merging.

- [x] **Task 2.3: Sovereign Identity, Privacy & Court Evidentiary Manuals**
  - **Guide 7 (Legal Evidence):** Published `section-65b-electronic-evidence-digital-signatures-court-validity` covering Section 65B (Section 63 BSA 2023), Section 85B judicial presumption, Arjun Panditrao Khotkar precedents, RCAI root installation, and /DSS LTV validation.
  - **Guide 8 (Identity & Privacy):** Published `masked-aadhaar-vs-regular-aadhaar-rbi-hotel-kyc-guide-2026` covering Supreme Court Puttaswamy judgment, Section 29 Aadhaar Act penalties, Section 16 RBI Master Direction on KYC redaction, AePS fraud prevention, and in-RAM masking.

- [x] **Task 2.4: Citizen, HR & Tax Formats**
  - **Guide 9 (Tax & Payroll):** Published `salary-slip-calculation-format-fy-2025-26-new-tax-regime-guide` covering the FY 2025–26 New Tax Regime slabs, the enhanced ₹75,000 standard deduction under Sec 16(ia), EPF 12% calculation rules, and loan underwriting compliance.
  - **Guide 10 (Matrimonial):** Published `indian-marriage-biodata-format-guide-traditional-modern-kundli` covering South Indian 10-Porutham and North Indian Kundli Guna Milan astrological integration, privacy-first parental contact structures, and print styling.

---

## Phase 3: High-Intent Viral Tools & Workflow Bundles

*Goal: Build features competitors do not have, solving multi-step applicant frustrations to trigger organic word-of-mouth adoption.*

- [x] **Task 3.1: "1-Click All-in-One Exam Bundles" (The Game Changer)**
  - Built unified multi-asset engine `components/tools/ExamComboPackEngine.tsx` with JSZip export, live compliance checks, and confetti celebration.
  - Deployed `app/tools/tnpsc-combo-pack` (Photo with Name/Date strip 20–50 KB, Signature 10–20 KB, and PDF Certificate <200 KB in 1-Click ZIP).
  - Deployed `app/tools/ssc-combo-pack` (Photo 20–50 KB, Signature 10–20 KB, and Category Certificate <300 KB in 1-Click ZIP).
  - Registered both tools in `TOOLS_CATALOG` (`lib/tools-data.ts`) with dynamic sitemap sync.

- [x] **Task 3.2: UPSC Name & Date Photo Stamper Engine**
  - Enhanced `components/tools/PhotoDateNameEngine.tsx` with dedicated presets for UPSC OTR, SSC CGL/CHSL, and TNPSC OTR.
  - Implemented real-time UPSC 10-day strict freshness rule validation with immediate alert warnings.
  - Automatically calibrates the lower 20% white bar banner and full capital letter candidate name typesetting.
  - Injected GEO Answer Capsule on `app/tools/photo-date-name-stamper/page.tsx`.

- [x] **Task 3.3: Aadhaar + PAN Single-Page A4 KYC Print Layout Maker**
  - Confirmed and verified dedicated 3-card layout engine `components/tools/AadhaarPanKycMergerEngine.tsx` compiling Aadhaar Front, Aadhaar Back, and PAN Front onto single A4 PDF.
  - Implemented self-attestation signing margins, Aadhaar first-8-digits masking, and strict 140–190 KB compression.
  - Integrated GEO Answer Capsule on `app/tools/aadhaar-pan-kyc-merge/page.tsx`.

- [x] **Task 3.4: "Upload Error Doctor" (Reverse Diagnosis Tool)**
  - Built clinical defect analyzer `components/tools/UploadErrorDoctorEngine.tsx` with error message parsing, threshold detection, and 1-click curing.
  - Deployed `app/tools/upload-error-fixer` with common error catalog, Answer Capsule, and full Schema.org structured data.
  - Registered tool in `TOOLS_CATALOG` (`lib/tools-data.ts`) with dynamic sitemap synchronization.

---

## Phase 4: Regional Indic SEO (`ta-IN`) & Transliteration Grid

*Goal: Dominate South Indian regional search traffic where competition is virtually non-existent.*

- [x] **Task 4.1: Native Tamil Mirror Pages for High-Volume Tools**
  - Upgraded all core high-volume Tamil mirror pages with `buildToolStructuredData` (@graph with `WebApplication`, `HowTo`, `FAQPage`, and `BreadcrumbList`) and injected `<AnswerCapsule lang="ta" />`:
    - TNPSC Photo & Signature Resizer (`/ta/tools/tnpsc-photo-signature-resizer`)
    - Image to 20KB (`/ta/tools/compress-image-to-20kb`)
    - Image to 50KB (`/ta/tools/compress-image-to-50kb`)
    - Aadhaar Masking (`/ta/tools/mask-aadhaar`)
    - TNEA Engineering Cutoff Calculator (`/ta/tools/tnea-cutoff-calculator`)
    - Tamil Home Hub (`/ta`) upgraded with structured data `@graph` and clean metadata.

- [x] **Task 4.2: Transliteration & Tanglish Query Targeting**
  - Injected natural colloquial Tanglish and Tamil queries into page metadata, FAQ schemas, and editorial copy:
    - *"TNPSC photo size eppadi mathurathu? Signature size kuraippathu eppadi?"*
    - *"TNPSC signature less than 10kb error fix tamil"*
    - *"Passport photo 50kb kuraippathu eppadi? (TNEB photo size 50kb fix tamil)"*
    - *"Aadhaar mask seivathu eppadi? (Aadhaar number maraipathu eppadi?)"*
    - *"TNEA engineering cutoff eppadi calculate seivathu? (Cutoff marks calculation tamil)"*
    - *"7.5 reservation cutoff marks tamil: அரசுப் பள்ளி மாணவர்களுக்கான கட்-ஆஃப் சலுகை என்ன?"*

- [x] **Task 4.3: Indic Font Optimization & Zero CLS**
  - Verified `Noto_Sans_Tamil` font loading configuration via Next.js Google Fonts with `display: 'swap'` and CSS variable mapping (`--font-noto-tamil`).
  - Font styling bound to `font-tamil` container in `app/ta/layout.tsx` ensuring zero layout shift (CLS 0.0) during initial paint.
  - Linked `TamilLanguageSetter` to maintain dynamic `<html lang="ta">` language attributes for search crawlers.

---

## Phase 5: Digital PR, Backlinks & Distribution Engine

*Goal: Build domain authority (DA/DR) without spending on paid ads through organic student networks.*

- [x] **Task 5.1: Cyber Café Printable Wall Cheat-Sheet**
  - Designed interactive and high-resolution printable cheat sheet engine `components/tools/ExamDimensionChartEngine.tsx` with dedicated `@media print` rules, categories filter, search, and Excel/TSV copy.
  - Deployed `app/tools/exam-photo-dimension-chart-2026/page.tsx` with Answer Capsule, Breadcrumbs, and Schema.org structured data.
  - Registered tool in `TOOLS_CATALOG` (`lib/tools-data.ts`) with dynamic sitemap indexing.

- [x] **Task 5.2: Telegram & WhatsApp Exam Community Integration**
  - Created reusable `components/tools/ExamSocialShareBar.tsx` featuring native 1-click WhatsApp (`api.whatsapp.com`) and Telegram (`t.me/share/url`) sharing links tailored specifically for study groups.
  - Integrated viral sharing buttons directly into download and success states:
    - `ExamComboPackEngine.tsx` (TNPSC & SSC 1-Click ZIP bundles)
    - `PhotoDateNameEngine.tsx` (UPSC/SSC photo date & name stamper)
    - `UploadErrorDoctorEngine.tsx` (Upload error diagnosis & curing)
    - `ExamDimensionChartEngine.tsx` (Exam Dimension Cheat Sheet)

- [x] **Task 5.3: Chrome Web Store Extension**
  - Built full production Chrome Extension Manifest V3 in `public/extension/`: `manifest.json`, `popup.html`, `popup.js`, `icon16.png`, `icon48.png`, `icon128.png`.
  - Packaged extension into instant downloadable archive `public/extension/kagazo-chrome-extension.zip`.
  - Deployed dedicated landing and installation guide page `app/tools/chrome-extension/page.tsx`.
  - Registered in `TOOLS_CATALOG` (`lib/tools-data.ts`) with dynamic sitemap synchronization.

---

## Phase 6: Search Indexation Repair, 404 Elimination & AdSense Shield

*Goal: Resolve all technical de-indexing signals, eradicate internal 404 links, and establish mandatory YMYL legal compliance for Google AdSense monetization.*

- [x] **Task 6.1: Domain Casing Normalization & Root Canonical Trap Elimination**
  - Replaced 286 instances of uppercase `https://Kagazo.in` with canonical lowercase `https://kagazo.in` across 62 files (preventing Google GSC "Duplicate without user-selected canonical" drops).
  - Removed global `canonical: SITE_URL` from root `app/layout.tsx` so individual subpages, tools, and guides generate their own authoritative self-referential canonical URLs rather than trapping crawlers at the homepage.
  - Corrected `Permissions-Policy` in `next.config.js` to `camera=(self), microphone=(self)` so live webcam photo capture and barcode scanning do not throw browser security violations.

- [x] **Task 6.2: Internal 404 Eradication & Server-Level 301 Redirect Architecture**
  - Audited and repaired broken internal tool links in `lib/related-tools.ts` (`/tools/community-certificate-compressor` mapped to `/tools/compress-pdf-to-200kb`, and `/tools/digital-signature-verifier` mapped to `/verify-aadhaar-pdf`).
  - Added edge-level 301 permanent redirects in `next.config.js` for legacy and duplicate paths (`/tools/gst-verifier`, `/tools/digital-signature-verifier`, `/tools/community-certificate-compressor`, `/blog/community-certificate-signature-not-verified-fix`, and `/blog/fix-aadhaar-pdf-yellow-question-mark`).
  - Removed ghost slug `/blog/community-certificate-signature-not-verified-fix` from `app/api/indexnow/route.ts` and added all 11 newly published high-authority guides to the IndexNow ping engine.

- [x] **Task 6.3: AdSense Legal Shield Deployment (`/terms`, `/disclaimer`, `/cookies`)**
  - Built comprehensive **Terms of Service** (`app/terms/page.tsx`) with Information Technology Act 2000, zero-retention liability terms, and allowable usage bounds.
  - Built **Government Non-Affiliation Disclaimer** (`app/disclaimer/page.tsx`) explicitly stating Kagazo is an independent private educational tool not affiliated with UIDAI, State Governments, or recruitment commissions (UPSC, TNPSC, SSC). Prevents instant AdSense rejection under "Government Impersonation / Misleading Identity".
  - Built **Cookie Policy** (`app/cookies/page.tsx`) complying with India's DPDP Act 2023, GDPR transparency, DoubleClick/AdSense ad cookie disclosures, and opt-out mechanics.
  - Linked all legal pages into `components/layout/Footer.tsx` and registered them with monthly crawl frequencies in `app/sitemap.ts`.

- [x] **Task 6.4: Ad Container Sanitation & CLS Protection**
  - Updated `components/ads/AdSlot.tsx` to eliminate hardcoded dummy ad slot numbers (`1234567890`) that cause 400 Bad Request crawling errors on Google AdSense bots.
  - Configured clean responsive layout containers with strict min-height protection to guarantee zero Cumulative Layout Shift (CLS 0.0) during live ad injection.

---

## Rules of Execution

1. **Strictly Sequential:** Complete one task at a time thoroughly.
2. **Real Implementations Only:** No placeholder dummy text, no mocked broken endpoints, no superficial SEO tags.
3. **Live Progress Tracking:** After each task is tested and validated, update this document by changing `[ ]` to `[x]` and updating the dashboard table.
