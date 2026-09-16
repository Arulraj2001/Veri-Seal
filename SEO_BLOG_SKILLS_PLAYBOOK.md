# Kagazo Autonomous SEO & Blog Writing Playbook (GEO System)

This document is the unified, repeatable standard for researching, drafting, optimizing, and linking blog articles for **Kagazo** (`https://kagazo.in`). It converts the 5-skill GEO (Generative Engine Optimization) architecture into an actionable, plug-and-play manual.

---

## Skill 0: The Kagazo Site Brief (Entity Context)

Never write a blog article without loading this context. It prevents generic AI fluff and ensures every post reinforces Kagazo’s domain authority.

* **Entity Name:** Kagazo (காகஸோ) — India’s Document Verification & Sovereign Utility Tool Suite.
* **Core Value Proposition (UVP):** 100% in-browser RAM execution. User files and personal government documents are **never uploaded to or stored on any server**. Zero watermarks. Zero signups.
* **Primary Target Audience:** 
  1. Indian government job aspirants (TNPSC, UPSC, SSC, IBPS, RRB, Police SI).
  2. Students applying for state admissions (TNEA, NEET, TNeGA).
  3. Rural cyber café operators and e-Sevai agents needing fast, compliant photo/signature preparation.
* **Supported Languages:** Bilingual English (`en-IN`) and native Tamil (`ta-IN`).
* **The "Money Pages" (Primary Conversion Destinations):**
  * `/tools/tnpsc-photo-signature-resizer` & `/ta/tools/tnpsc-photo-signature-resizer`
  * `/tools/compress-image-to-20kb` & `/ta/tools/compress-image-to-20kb`
  * `/tools/compress-image-to-50kb` & `/ta/tools/compress-image-to-50kb`
  * `/tools/mask-aadhaar` & `/ta/tools/mask-aadhaar`
  * `/tools/tnea-cutoff-calculator` & `/ta/tools/tnea-cutoff-calculator`
  * `/#upload-zone` (Digital signature verification)
* **Tone of Voice:** Authoritative, direct, technical yet accessible, zero fluff, government notification compliant.

---

## Skill 1: Keyword Fan-Out Mapping (The Research Engine)

AI search engines (Google AI Overviews, ChatGPT Search, Perplexity) do not rank single keywords; they break user intent into **Fan-Out Sub-Queries**.

### How to Map Any Topic:
1. **Pick the Seed Query:** (e.g., *TNPSC OTR Signature Upload*)
2. **Generate the 4 Fan-Out Sub-Queries:**
   * *Problem:* "Why does TNPSC reject signatures under 10 KB?"
   * *Specification:* "What are the exact dimensions in cm for TNPSC signature?"
   * *Troubleshooting:* "How to boost contrast of blue ink pen signature to pure white background?"
   * *Action:* "How to resize signature on mobile without Photoshop?"
3. **Map Each Fan-Out Query Directly to an `H2` Heading.**

---

## Skill 2: Content Capsule Writer (The "Rule of One")

AI engines lift a **specific 2-sentence answer** and attach the **link next to it**. If the answer is buried in a long story, the AI skips your page.

### The Rule of One:
* **One Query per `H2`:** The heading must match what the user or AI asks.
* **One Answer Capsule per `H2`:** The very first 2 sentences directly under the heading must answer the question completely with no introductory fluff.
* **One Inline Primary Source:** Back up claims with links directly on the keyword to official sources (`tnpsc.gov.in`, `uidai.gov.in`).
* **One Comparison Table per Piece:** Clean, structured HTML table comparing portal specs.
* **One Real Technical Tip:** A concrete detail (e.g., DPI, JPEG chroma subsampling, pure white background `#FFFFFF`).

### Content Capsule Example:
```markdown
## Why Does the TNPSC Portal Reject Signatures Under 10 KB?

**Answer Capsule:** The TNPSC One Time Registration (OTR) portal strictly validates image byte size between 10.0 KB and 20.0 KB. If an uploaded signature drops below 10 KB (such as 8 KB or 9.5 KB), the recruitment server automatically blocks the file with a "File size too small" error to prevent blurry, unreadable signatures on hall tickets.
```

---

## Skill 3: On-Page Optimizer & Search Console Rescue

Use this checklist when auditing drafts or fixing pages stuck in Google Search Console's **"Crawled - currently not indexed"** status:

- [ ] **Title Tag:** Must contain exact primary keyword + value promise (Under 60 chars).  
  *Example:* `Fix TNPSC Signature Under 10KB Error Online Free | Kagazo`
- [ ] **Meta Description:** Must summarize the answer capsule + action (Under 155 chars).
- [ ] **First 100 Words:** Must state the exact problem and link to the relevant Kagazo tool.
- [ ] **Structured Data (JSON-LD):**
  * Include `Article` schema with author, datePublished, and dateModified.
  * Include `FAQPage` schema mirroring the exact Q&As in the article.
  * Include `BreadcrumbList` schema (`Home` → `Blog` → `Article Title`).
- [ ] **No Dead Intros:** Remove generic opening sentences like *"In today's digital age..."* or *"As we all know..."*.

---

## Skill 4: Internal Link Architect (The Door System)

A blog post without internal links is an "empty room with no doors." Google cannot pass authority, and users cannot convert.

### Every Kagazo Blog Post Must Have:
1. **The Primary Tool Link (Top 20%):**  
   Link to the primary English tool within the first 2 paragraphs.  
   *Anchor Text:* Must be descriptive, never "click here" (e.g., `[TNPSC Photo and Signature Resizer](https://kagazo.in/tools/tnpsc-photo-signature-resizer)`).
2. **The Regional Language Bridge:**  
   Provide a direct link to the Tamil counterpart tool for Tamil Nadu applicants:  
   *Anchor Text:* `[TNPSC புகைப்படம் மற்றும் கையொப்பம் அளவு மாற்றி](https://kagazo.in/ta/tools/tnpsc-photo-signature-resizer)`.
3. **Cross-Cluster Link:**  
   Link to 1 related guide (e.g., an article on TNPSC signature should link to the guide on TNPSC photo with name/date strip).
4. **Bottom Action Widget:**  
   End the article with a clear, high-contrast CTA button leading into the interactive tool.

---

## Skill 5: AI Visibility & GEO Citation Checklist

To ensure your article is cited by ChatGPT, Perplexity, and Google AI Overviews:

1. **Entity Stacking:** Pair your brand name with the core solution:  
   *"Kagazo's client-side auto-calibrator pads signatures under 10 KB..."*
2. **Data-Dense Sentences:** Include numbers, exact file sizes, and centimetre dimensions. AI engines prefer citing specific numbers over vague advice.
3. **Primary Domain Anchoring:** Ensure the anchor text sits directly on the claim, not separated in a references block at the very bottom.
4. **Tamil Regional Arbitrage:** Publish a corresponding summary or Tamil post under `/ta/` so local language AI queries (e.g. Gemini Tamil) cite Kagazo.

---

## Blog Template (Ready to Copy & Fill)

```markdown
---
title: "[Target Keyword Problem Solution] | Kagazo"
description: "[150-char summary answering the query with direct action]"
author: "Kagazo Editorial Team"
category: "Exam Guides"
language: "en-IN"
---

# [H1: Clear, Direct Action Title Matching Search Query]

[Brief 2-sentence overview stating the problem and introducing the 1-click solution via Kagazo's tool.]

You can format your file immediately using the free [Primary Tool Name](https://kagazo.in/tools/[slug]). For Tamil language applicants: [கருவியின் பெயர்](https://kagazo.in/ta/tools/[slug]).

---

## [H2: Fan-Out Question 1 - The Core Problem]

**Answer Capsule:** [Bold 2-sentence direct answer explaining exactly why the problem occurs with specific portal byte limits].

[2-3 paragraphs of detailed explanation citing official government recruitment notification guidelines].

---

## [H2: Fan-Out Question 2 - Exact Official Specifications]

**Answer Capsule:** [Bold 2-sentence summary of the required dimensions, byte ranges, and format].

| Parameter | Allowed Range | Official Dimension | Recommended Setting |
| :--- | :--- | :--- | :--- |
| File Size | 10.0 KB – 20.0 KB | Exact | 15.0 KB Safe Zone |
| Format | JPG / JPEG | — | 100% Quality |

---

## [H2: Fan-Out Question 3 - Step-by-Step Fix]

**Answer Capsule:** [Bold 2-sentence instruction on how to use Kagazo to resolve this on mobile/desktop].

1. **Upload File:** Select your photo or cropped signature.
2. **Auto-Calibrate:** Choose the portal preset to lock between minimum and maximum KB.
3. **Download:** Export your validated file with zero watermark.

---

## Frequently Asked Questions

### [FAQ Question 1]?
[Direct, factual 2-sentence answer].

### [FAQ Question 2]?
[Direct, factual 2-sentence answer].
```
