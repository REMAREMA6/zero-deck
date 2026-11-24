# Feature Prioritization and the Product Life Cycle — Krbusek (BIR 2024)

Source: "Towards process guidelines for software feature prioritization at different stages of product maturity"
URL (PDF): https://ceur-ws.org/Vol-3804/short1dc.pdf (CEUR-WS Vol-3804, BIR 2024 Workshops and Doctoral Consortium)
Author: Adam Krbusek, Prague University of Economics and Business
Conference: BIR 2024 (23rd International Conference on Perspectives in Business Informatics Research), September 11–13, 2024, Prague
License: CC BY 4.0 · Fetched: 2026-09-30 (raw PDF; text extracted via pdftotext)

## The central claim (the gap)

- Prioritization methodologies such as **RICE, MoSCoW, and the Kano Model** ignore a crucial dimension: **the phase of a product's life cycle (PLC)**.
- Comprehensive SPM frameworks (ISPMA's **SPMBoK**, the **Pragmatic Framework**, **SAFe**, **ProdBOK**) cover the lifecycle but do **not** give detailed, step-by-step guidance for individual SPM activities — and feature prioritization is one of the most critical activities.
- Consequence: teams develop "the right functionality at the wrong time" — wasted resources, missed opportunities, unsuccessful products.
- The author's research program aims to produce **process guidelines for software feature prioritization at different stages of product maturity** (artifact not yet finished — this is a work-in-progress doctoral paper).

## Product life cycle (PLC) model

- Marketing concept adopted by software product management; the four stages: **Introduction, Growth, Maturity, Decline**.
- At each stage a different product development strategy is needed; monitoring for decline signals (Wicaksono), QA extending lifespan (Nikolova), pivoting (Ries) are adjacent research.

## Research questions

- **RQ1** — What practices do product managers follow and what challenges do they face when prioritizing features across different stages of the software product life cycle?
- **RQ2** — How to design process guidelines for software feature prioritization in different stages of product maturity?
- **RQ3** — How effective are the product management outcomes when employing the proposed process guidelines, in contrast to previous methods?

## Method (Design Science Research — Peffers et al. 2007)

Three phases:
1. **Preliminary research** – problem identification & motivation (literature review), definition of solution objectives.
2. **Solution design** – the critical, multi-part phase:
   - **Systematic Mapping Study + thematic analysis** → a taxonomy of SPM frameworks/methodologies (see results below)
   - **Web survey** of software product managers (LinkedIn distribution) → techniques/tools used in practice
   - **Multivocal Literature Review** (academic + professional/grey literature, per Garousi et al.) → existing feature-prioritization approaches vs lifecycle
   - **Semi-structured interviews** with software product managers → best practices and challenges per maturity stage
   - Solution devised using the **Double Diamond** design process; **Opportunity Solution Tree (Torres)** used in the divergent stage; **focus groups** in the convergent stage.
3. **Solution validation** – demonstration & evaluation via **Action Research** in a controlled environment; communication via conferences, journals, and a practical Medium.com guide for professionals.

## Initial results

- **CoSuCo taxonomy**: 82 research papers examined in depth; **122 frameworks and methodologies** used in software product management identified; hierarchical tree of **3 central categories → 9 categories → 22 sub-categories**.
- Web survey underway at time of writing.

## Related literature the paper maps (useful as a citation map)

- PLC+SPM: **ProdBOK** (Geracie & Eppinger — framework, no actionable prioritization steps); **Kittlaus/ISPMA SPMBoK guide** (examples of Kano, Analytical Hierarchy Process, but no PLC link).
- Feature prioritization: **Bukhsh et al. 2020** — systematic literature review of FP techniques; **Achimugu et al. 2014** — SLR identifying **49 FP methodologies**; **Trieflinger et al. 2021** — grey literature review categorizing **18 FP methodologies**; primary studies (Alrashoud & Abhari; Adhim et al.) and contextual studies (Wibawa et al.).
- Adjacent: Wicaksono (decline monitoring), Nikolova (QA extends lifespan), Torres (customer needs → business opportunities; *Continuous Discovery Habits*), Fuchs & Golenhofen (disruptive innovation vs PLC), Ries (pivoting).

## What this file is for the knowledge base

- Evidence-based confirmation that **prioritization should be lifecycle-aware** — a PM deciding "what next" should weight the product stage, not just score features in a vacuum.
- A research-map view of the prioritization literature (RICE/MoSCoW/Kano are the practitioner staples; dozens more exist — ~49 academic, ~18 grey-literature methodologies counted by SLRs).
- Note: the paper is a research program in progress — the promised process guidelines do **not** yet exist; treat its contribution as problem framing + taxonomy, not as an actionable prioritization method.
