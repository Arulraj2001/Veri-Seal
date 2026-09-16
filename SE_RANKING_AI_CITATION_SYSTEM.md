# SE Ranking AI-Citation & Google #1 Blog System (Blueprint & Prompts)

This document contains the exact 2-step prompt system, structural rules, and 10-step human editing checklist reverse-engineered from **SE Ranking’s 500k+ impression case study** and AI citation analysis across 200+ top-ranking pages.

---

## 1. What the Video & Experiment Are Actually Telling Us

### The Big Trap: 1-Shot Generic AI Content Fails
Most creators ask ChatGPT: *"Write a 1,500-word blog post about [Keyword]"*.
* **The Result:** 200 unedited AI articles tested across 20 brand-new sites were **completely wiped out by Google within 30 days**, losing 100% of their organic traction.
* **Why it fails:** Zero internal linking, no verified statistics, no author expertise (E-E-A-T), generic language that AI search engines (Perplexity, ChatGPT Search, Google AI Overviews) completely skip.

### The Winning Formula: AI Drafting + Structural Architecture + Human Verification
In the same experiment, SE Ranking published **6 AI-assisted, human-edited articles** on their site:
* **Results:** Earned **500,000+ impressions**, **2,000+ clicks**, **3 articles reached Google Top 10**, **5 featured in Google AI Overviews**, and **4 cited as authoritative sources**.
* **The Reason:** Google and AI engines do not hate AI content; they penalize *unstructured, unverified, generic fluff*. When structured with strict modular paragraphs, verified stats, and E-E-A-T verification, AI content outranks traditional human posts.

### The 5 Golden Rules for AI Citation (GEO):
1. **Statistic Density:** Include **3–5 real statistics per 1,000 words** cited as `— Source: [Name, Year]`. Adding 6 verified stats increased AI citations from **2/10 to 8/10**.
2. **The "Answer-First" Sentence Pattern:** AI engines quote standalone declarative sentences (`[Subject] [verb] [definition/fact]`) 3x more often than complex paragraphs.
3. **Key Takeaways Box at the Top:** 5–7 declarative, factual bullet points placed *before* the first `H2` heading are prime targets for Google Featured Snippets and AI summaries.
4. **Self-Contained Paragraphs:** Every paragraph must make 100% sense on its own if extracted in isolation by an LLM web scraper.
5. **E-E-A-T & AI Transparency:** Author bio + "Reviewed by" expert credential + AI assistance disclaimer build trust with Google's Quality Raters.

---

## 2. Prompt 1: Content Planning & AI Citation Specialist

> **When to use:** Run this prompt first in ChatGPT / Claude with your chosen low-competition keyword.

```markdown
You are an expert SEO strategist, content planner, and AI-citation optimization specialist. Your task is to analyze a blog keyword and generate a comprehensive strategic content brief that will help writers create a high-quality, SEO-optimized blog post that ranks on Google, earns Featured Snippets, AND gets cited by AI tools like ChatGPT, Perplexity, Google AI Overviews, and Grok.

Here is the keyword to analyze:
<keyword> {{KEYWORD}} </keyword>

Analyze this keyword carefully and provide the following strategic elements:

1. User Intent: Determine the primary search intent behind the keyword (Informational, Navigational, Commercial, or Transactional). Explain what users are likely trying to accomplish or learn.
2. Target Audience: Demographics, expertise level, specific pain points, and why they search for this keyword.
3. Content Format: Recommend the most appropriate blog format (guide, listicle, tutorial, comparison, case study). 
   * IMPORTANT: If the keyword contains "vs" or implies a comparison, follow the comparison structure: Define Option A independently, Define Option B independently, Compare side-by-side along 3-5 dimensions, present use cases for both ("when to use which"), and close with a non-polarizing conclusion.
4. Tone of Voice: Educational, conversational, authoritative, technical, or friendly.
5. Creativity Level: Rate on a scale of 1-10 with reasoning (1 = purely technical/factual, 10 = highly creative/original).
6. Critical Points to Cover (Must follow this exact hierarchy):
   - A "What is [Topic]?" definition section (MUST be first body section)
   - A "Why [Topic] Matters" / "Importance of [Topic]" section
   - The core how-to / process / types / methods sections (main body)
   - Tools, examples, or practical applications section
   - A "What's Next" actionable next-steps section
   - A conclusion with a motivational close
7. Key Takeaways (Pre-Draft): 5-7 bullet points summarizing key value to sit at the TOP of the post before main content. Each bullet must:
   - Be a self-contained, factual, declarative statement (not a teaser)
   - Start with a noun or subject
   - Be no longer than 2 sentences
   - Collectively cover: definition, methods/types, benefits, and actionable advice
8. Opening Hook Strategy: 2-3 sentences using the formula:
   - Acknowledge (what reader already knows/does)
   - Gap (subtly suggest they are missing something important)
   - Promise (tell them exactly what they will learn)
9. Relevant Keywords to Incorporate: 8-12 related long-tail semantic keywords.
10. Specific Questions to Answer: 6-10 questions phrased as standalone H2/H3 headings that independently answer search queries.
11. Internal Link Suggestions: 8-12 internal link suggestions with anchor text, target topic/tool, and section placement (~1 link per 150-200 words).
12. AI Citation Optimization Notes: 3-5 specific extractable sentences formatted as:
   - "[Term] is [clear definition]."
   - "[Process] involves [clear explanation]."
   - "[Statistic/fact] according to [source]."

Format your response exactly as follows:
Keyword: [State the keyword]
User Intent: [Your analysis]
Target Audience: [Your description]
Content Format: [Your recommendation]
Tone of Voice: [Your recommendation]
Creativity Level: [Explanation, then X/10]
Critical Points to Cover (in order):
[Definition section]
[Importance section]
[Core body points]
[Tools/examples section]
[Next steps section]
[Conclusion]
Key Takeaways (for top of blog):
[Takeaways 1-7]
Opening Hook (Acknowledge → Gap → Promise): [Your 2-3 sentence opening]
Relevant Keywords: [Keywords 1-12]
Specific Questions to Answer (as H2/H3 headings): [Questions 1-10]
Internal Link Suggestions: Anchor: "[text]" → Target: [page] → Placement: [section]
AI Citation Optimization — Key Extractable Sentences: [Sentences 1-5]
```

---

## 3. Prompt 2: 10-Rule Blog Writing Architecture

> **When to use:** Open a fresh chat, paste Prompt 2, and fill in the placeholders with the output from Prompt 1.

```markdown
You are an expert SEO blog writer and AI-optimization specialist. Your job is to write a highly engaging, 100% original, SEO-optimized blog post that ranks #1 on Google AND gets cited by AI tools like ChatGPT, Perplexity, Google AI Overviews, and Grok.

Here are the inputs:
<blog_post>
Main Keyword / Title: {{main_keyword/blog_title}}
Author Info: {{author_info}}
Content Planning Framework: {{content_planning_framework}}
Sample Blog Post (Style Reference): {{sample_blog_post}}
Desired Word Count: {{Desired_word_count}}
</blog_post>

MANDATORY BLOG ARCHITECTURE (Strict Sequence):
1. TITLE (H1) — Primary keyword + authority modifier (Ultimate, Definitive, Comprehensive) + benefit
2. META DESCRIPTION — Max 155 characters, includes primary keyword
3. AI SUMMARIZATION LINKS — "Summarize this blog post with: ChatGPT | Perplexity | Claude | Grok"
4. OPENING HOOK — 2-3 sentences using Acknowledge → Gap → Promise formula
5. KEY TAKEAWAYS BOX — 5-7 bullet points BEFORE the main content
6. DEFINITION SECTION (H2) — "What is/are [Topic]?" — Direct answer in the FIRST sentence
7. IMPORTANCE SECTION (H2) — "Why [Topic] Matters" or "Why Are [Topic] Important?"
8. CORE BODY SECTIONS (H2s with H3s) — Process, methods, types, or how-to content
9. TOOLS / PRACTICAL APPLICATION SECTION (H2) — With screenshot suggestions
10. NEXT STEPS SECTION (H2) — Actionable advice for the reader
11. CONCLUSION (H2) — Brief recap + motivational close
12. AUTHOR SECTION — Written by + Reviewed by + AI transparency disclaimer

STRICT WRITING RULES:
1. AI Citation Optimization:
   - Answer-First Paragraph Rule: Every H2 section MUST start with a direct answer or definition in the FIRST sentence: "[Term] is/are [clear definition that works as a standalone sentence]."
   - Self-Contained Paragraph Rule: Every paragraph must make complete sense on its own if extracted by an AI search engine.
   - Include the 3-5 extractable AI citation sentences from the brief.
   - Include 3-5 real, specific statistics per 1,000 words formatted as: "Statistic here — Source: [Source Name, Year]".
2. Opening Hook: 2-3 sentences only: Acknowledge → Gap → Promise. No filler intros.
3. Heading Strategy: Every H2 must be phrased as a real search query. H3s break them into 150-300 word chunks. Include at least 1 structured comparison table.
4. Sentence & Paragraph Rhythm:
   - ~40% short sentences (8-15 words), ~45% medium (16-25 words), ~15% longer (26-35 words).
   - Max 3-4 sentences per paragraph.
   - Every paragraph starts with a transition word ("First", "Second", "Moreover", "For example", "As such").
   - After every abstract concept, the very next sentence must provide a concrete example.
   - Bold key phrases inside body paragraphs for visual scanning and AI snippet extraction.
5. Internal Linking: Density of ~1 link per 150-200 words. Use descriptive keyword-rich anchors (never "click here"). Format as: [Internal link: "anchor text" → suggested target page/topic].
6. Visual & Image Strategy: Suggest screenshots using: [Insert image: Description | Alt text: "[Action verb] + [keyword] + [context]"].
7. Soft-Selling Tools: Teach concept first → Introduce tool as natural solution → Suggest screenshot → Mention free alternative.
8. Word Count: Hit the specified word count range accurately.

OUTPUT FORMAT:
Provide the output strictly inside these tags:
<meta_description> [155-char meta description] </meta_description>
<blog_post>
[Your complete blog post matching the architecture above]
</blog_post>
```

---

## 4. The 10-Step Human Editing Checklist

Publishing raw AI drafts gets sites de-indexed. Run this 10-step audit before every publish:

| Step | Action | Why It Matters |
| :--- | :--- | :--- |
| **1. Fact-Check Everything** | Verify every statistic, year, and percentage manually. Remove or correct unverified claims. | AI hallucinations destroy trust and trigger search penalties. |
| **2. Add Real Internal Links** | Swap placeholder tags with live URLs (`/tools/...`, `/ta/...`). | Connects topical clusters and passes PageRank. |
| **3. Add Real Screenshots** | Replace image suggestions with real WebP images. Set alt text: `[Action verb] + [keyword] + [context]`. | Ranks in Google Images and improves dwell time. |
| **4. Verify Key Takeaways** | Check that all 5-7 bullets at the top are standalone factual statements. | Featured Snippet trigger for position zero on Google. |
| **5. Add Genuine E-E-A-T** | Inject 2-3 sentences of genuine first-hand experience (e.g., testing on mobile, TNPSC portal quirks). | Differentiates from generic AI scrapers. |
| **6. Author & Reviewer Creds** | Add real author names, real titles, and a dedicated "Reviewed by" expert credit. | High-trust signal for Google Quality Raters. |
| **7. Paragraph Self-Containment** | Read each paragraph in isolation. Ensure it makes complete sense on its own. | Ensures AI search bots extract clean citation snippets. |
| **8. AI Summarization Links** | Add one-click summarize URLs at the top: `https://chat.openai.com/?q=Summarize+[URL]`. | Encourages LLM crawlers to ingest and parse your page. |
| **9. Schema Markup** | Inject JSON-LD `Article`, `BreadcrumbList`, and `FAQPage` schemas. | Gives search bots machine-readable structure. |
| **10. Final Read-Aloud Test** | Read the post out loud to verify natural cadence and remove any robotic phrasing. | Keeps bounce rate low and readability score high. |

---

## 5. How Kagazo Implements This Automatically

At Kagazo, this framework connects directly to our **in-browser tools** and **regional Tamil arbitrage**:

```
[Target Keyword: e.g. "TNPSC Signature Under 10KB"]
         │
         ▼
[Step 1: Content Brief (Prompt 1)]
  ├── Target: Aspirants & cyber cafés
  ├── Extractable Definition: "TNPSC OTR validates signatures strictly between 10.0 KB and 20.0 KB."
  └── Internal Links: Primary tool + Tamil bridge (/ta/tools/...)
         │
         ▼
[Step 2: 10-Rule Blog Post (Prompt 2)]
  ├── Hook: Acknowledge → Gap → Promise
  ├── Key Takeaways Box (Top)
  ├── 1 Comparison Table (Specs vs Limits)
  └── Soft-Sell Kagazo's client-side resizer
         │
         ▼
[Step 3: Human Verification]
  ├── Verified against official tnpsc.gov.in notification
  └── JSON-LD Article + FAQ Schema injected
```
