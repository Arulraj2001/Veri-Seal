---
name: kagazo-seo-writer
description: Generates high-ranking, citation-ready blog posts, portal guides, and tool documentation for Kagazo (kagazo.in). Implements the 5-skill GEO (Generative Engine Optimization) pipeline with content answer capsules, fan-out query mapping, official portal citations, bilingual cross-linking, and JSON-LD schema.
---

# Kagazo SEO & Content Capsule Writer Skill

Use this skill whenever drafting, optimizing, or auditing blog articles and tool landing pages for **Kagazo** (`https://kagazo.in`).

## 1. Context & Entity Constraints (Site Brief)
- **Entity:** Kagazo (காகஸோ) — India's Sovereign PDF Verification & Document Utility Suite.
- **Privacy Core:** 100% in-browser volatile RAM execution. Files are never uploaded or stored. Zero watermarks. Zero signups.
- **Audience:** Indian exam candidates (TNPSC, UPSC, SSC, IBPS, Police SI, TNEA), cyber café operators, and citizens.
- **Locales:** English (`en-IN`) and native Tamil (`ta-IN`).

## 2. Content Capsule Writing Protocol ("Rule of One")
1. **No Intro Fluff:** The first paragraph must state the user's immediate problem and link directly to the relevant Kagazo tool.
2. **One Answer Capsule per H2:** The first 2 sentences directly under every `H2` must be a self-contained, bolded answer block that directly answers the question so AI search engines (Google AI Overviews, ChatGPT Search, Perplexity) can quote it directly.
3. **Inline Government Citations:** Every claim regarding recruitment rules or photo sizes must link directly on the keyword to official sources (`tnpsc.gov.in`, `uidai.gov.in`, `ssc.gov.in`).
4. **Structured Comparison Table:** Include at least one table comparing allowed byte sizes, dimensions, and accepted file formats.
5. **Bidirectional Language Cross-Links:**
   - English posts must link to both `/tools/[slug]` and `/ta/tools/[slug]`.
   - Tamil posts must link to both `/ta/tools/[slug]` and `/tools/[slug]`.

## 3. On-Page & Schema Standards
- **Word Count:** 1,000–1,500 words of high-density, helpful technical and practical advice.
- **JSON-LD Schema:** Inject `Article` schema and `FAQPage` schema mirroring the exact FAQs in the post.
- **Headings:** Single `H1` matching user search query, semantic `H2` for fan-out sub-queries, `H3` for steps/FAQs.
