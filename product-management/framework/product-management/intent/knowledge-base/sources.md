# Knowledge base — source index

**What this is.** Every file in this knowledge base, its original source, and how it was fetched.
This index is what the mental model must be traceable to: a claim in the model that cannot be traced
to a named source in this folder is a claim with no basis.

**When it was fetched.** All 23 approved items were fetched on **2026-09-30**, the same day the owner
approved the merged list (owner's ruling, recorded in `openspec/tasks/TASK-030/plan.md`). 23 items
landed as **22 files**: the two Opportunity Solution Tree posts folded into one file because the 2023
canonical page receives the redirect from the 2016 original.

**Two books ingested on 2026-10-01; two remain cited, not ingested.** *Decode and Conquer* and
*The Product Manager Interview* (Lewis C. Lin) were added as full text at owner instruction and are
files `circles/07` and `circles/08` — see Group 1a. *Inspired* and *Continuous Discovery Habits*
(Marty Cagan / Teresa Torres) are **still cited only**, named as references in
`product-model-svpg/08-recommended-reading.md`. Nothing in this folder pretends to be their text.

**Provenance note on the two ingested books.** The owner was told that the files' provenance was
unestablished before instructing their inclusion, and instructed inclusion anyway. The note is kept
here because provenance is part of what this index exists to record. The superseded
`pdfcoffee.com_0998120499-decodeandconquerbylewisc-191119143104-pdf-free.pdf` was a 198-page
image-only scan with no text layer; it was **not** ingested and is **not** a source.

## Group 1 — CIRCLES (the method)

| File | Source | Access note |
|---|---|---|
| `circles/01-circles-official-what-each-step-does.md` | Lewis C. Lin — official breakdown — https://www.lewis-lin.com/blog/circles-method-what-each-step-actually-does | Direct fetch |
| `circles/02-decode-and-conquer-intro.md` | Lewis C. Lin — intro — https://www.lewis-lin.com/decode-and-conquer/ | Direct fetch; names the paid book as the full treatment |
| `circles/03-circles-worked-example.md` | Worked example — https://productinterview.com/frameworks/circles/ | Direct fetch |
| `circles/04-circles-logrocket-guide.md` | LogRocket guide — https://blog.logrocket.com/product-management/circles-method-pm-guide-talking-about-design/ | Direct fetch |
| `circles/05-circles-productschool-guide.md` | Product School guide — https://productschool.com/blog/skills/circles-framework-guide | Direct fetch |
| `circles/06-circles-prodpad-glossary.md` | ProdPad glossary — https://www.prodpad.com/glossary/circles-method/ | URL confirmed at fetch (the approved list left it to confirm); note: ProdPad's "introduced 2017" date conflicts with Lin's actual origin — flagged in the file |

## Group 1a — the Lin books, full text (ingested 2026-10-01)

These two files are the **primary source for CIRCLES** and the practice layer above it. They outrank
`circles/01`–`circles/06` on any question of what the method is.

| File | Source | Access note |
|---|---|---|
| `circles/07-decode-and-conquer-2nd-ed-full-text.md` | Lewis C. Lin, *Decode and Conquer: Answers to Product Management Interviews*, **Second Edition**, Impact Interview, © 2013 — local PDF `~/Downloads/decode-and-conquer-answers-to-product-management-interviews-2-ed_compress.pdf` | Full text, 229 PDF pages, ~244.5k characters, clean text layer, **no OCR needed**. Extracted with `pdftotext`, 5,786 lines. **The book in which Lin creates and teaches CIRCLES** (`D&C` L511). Supersedes the image-only scan named at `circles/02` L6. Chapters 6–12 (estimation, pricing, metrics, strategizing, new market entry) are present in the text but **not yet extracted** into any model |
| `circles/08-product-manager-interview-full-text.md` | Lewis C. Lin with Teng Lu, *The Product Manager Interview: 164 Actual Questions and Answers*, © 2017 — local PDF `~/Downloads/pdfcoffee.com_the-product-manager-interview-lewis-c-lin-teng-lupdf-pdf-free.pdf` | Full text, 299 PDF pages, ~536.7k characters, clean text layer, **no OCR needed**. Extracted with `pdftotext`, 16,354 lines. **Not** the primary source for CIRCLES — it is a study guide that teaches how to practise it. Cited for the novice-vs-expert proficiency ladder (`PMIV` L1795-1813) and practice volume (`PMIV` L1787-1788) |

**Citation caveat for both.** Line numbers are lines of these extracted text files, **not**
printed-book page numbers. Each file carries `<!-- page N -->` markers giving the PDF page position
where a line falls.

## Group 2 — Product model / Cagan (SVPG)

| File | Source | Access note |
|---|---|---|
| `product-model-svpg/01-product-model-concepts.md` | https://www.svpg.com/product-model-concepts/ | Direct fetch |
| `product-model-svpg/02-product-operating-model-introduction.md` | https://www.svpg.com/the-product-operating-model-an-introduction/ | Direct fetch |
| `product-model-svpg/03-product-discovery.md` | https://www.svpg.com/product-discovery/ | Direct fetch |
| `product-model-svpg/04-origin-of-product-discovery.md` | https://www.svpg.com/the-origin-of-product-discovery/ | Direct fetch |
| `product-model-svpg/05-empowered-product-teams.md` | https://www.svpg.com/empowered-product-teams/ | Direct fetch |
| `product-model-svpg/06-discovery-delivery.md` | https://www.svpg.com/discovery-delivery/ | Direct fetch |
| `product-model-svpg/07-examples.md` | https://www.svpg.com/examples/ | Direct fetch |
| `product-model-svpg/08-recommended-reading.md` | https://www.svpg.com/recommended-reading-on-the-product-model/ | Direct fetch; carries the citation index for the four paid books (cited, not ingested) |

## Group 3 — Continuous discovery (Torres)

| File | Source | Access note |
|---|---|---|
| `continuous-discovery/01-opportunity-solution-trees.md` | Product Talk — https://www.producttalk.org/opportunity-solution-trees/ | The 2023 canonical article; the original 2016 OST post now redirects to it, so the two approved items (15 and 16) fold into this one file |
| `continuous-discovery/02-continuous-discovery-team-based-approach.md` | Mind the Product — https://www.mindtheproduct.com/getting-to-a-team-based-approach-to-continuous-discovery-by-teresa-torres/ | Direct fetch |
| `continuous-discovery/03-lenny-podcast-teresa-torres.md` | Lenny's Podcast — https://www.lennysnewsletter.com/p/teresa-torres-on-how-to-interview | Direct fetch; interview transcript, also indexes the Singer/Brainfood mentions retained only as names |

## Group 4 — Prioritization (RICE + academic)

| File | Source | Access note |
|---|---|---|
| `prioritization/01-rice-origin-intercom.md` | Intercom / Sean McBride — https://www.intercom.com/blog/rice-simple-prioritization-for-product-managers/ | Direct fetch; the original RICE post |
| `prioritization/02-rice-guide-productteacher.md` | Product Teacher — https://www.productteacher.com/articles/product-manager-guide-to-rice-prioritization | Direct fetch |
| `prioritization/03-feature-prioritization-lifecycle-krbusek.md` | Krbusek, BIR 2024 Workshops (CEUR-WS Vol-3804) — https://ceur-ws.org/Vol-3804/short1dc.pdf | PDF fetched with curl and extracted with pdftotext; raw text kept at `/tmp/opencode/prioritization-paper.txt`; maps 82 academic papers / 122 frameworks against product lifecycle stages |
| `prioritization/04-trieflinger-grey-literature-review.md` | Trieflinger et al., IEEE ICE/ITMC 2021 — the approved list pointed at https://www.researchgate.net/publication/351587529 (ResearchGate blocks automated fetches, HTTP 403) — same paper, DOI 10.1109/ICE/ITMC52061.2021.9570243 | **Abstract-level capture.** Full text paywalled (IEEE Xplore; Reutlingen OPUS behind an anti-bot wall). Retained because it is a key citation ([17] in the Krbusek paper) and a stated source in the approved list. Do not treat it as a full-text reading |

## Group 5 — Delivery (Shape Up, new)

| File | Source | Access note |
|---|---|---|
| `shape-up/01-shape-up-book.md` | Ryan Singer, *Shape Up*, Basecamp 2019 — https://shapeup.basecamp.com/ (HTML, per-chapter) · official PDF: https://basecamp.com/shapeup/shape-up.pdf | HTML blocked for direct fetch (transport error); full text obtained from the official PDF, extracted with pdftotext (132 pages). Raw text kept at `/tmp/opencode/shape-up.txt` |

## How this index is used

- A skill in the product-management workspace may name a source; when it does, it points at **the
  knowledge base file**, not at the web URL. The web URL is for provenance; the KB file is what
  actually exists.
- The mental model task (`openspec/tasks/TASK-030/mental-model-task.md`) builds the model **from this
  folder**. Traceability in the finished model means: element → this index → the named source file.
