# ZeroDeck — Product-Design Closure and Architecture Handoff

**Status:** Product design closed  
**Decision reference:** ZD-DEC-PHASE9-2026-11-28  
**Next agent/workstream:** Technical architecture  
**Authority boundary:** This handoff conveys approved product intent. It is not an architecture decision record.

## 1. Product-design outcome

The Product Owner accepted the Phase 9 product-level recommendations. Phase 9 is complete. The Product Management workstream has produced five technology-independent declared product contracts covering identity/authentication, MVP-01 manual file analysis, MVP-02 quarantine/file disposition, MVP-03 website/link checking and cross-cutting system requirements.

The five contracts contain 160 requirements and 259 acceptance criteria, assess all 15 official Software Rules facets, and have synchronized Markdown, structured projections and evidence records. The 64 questions carried from Phase 8 have explicit dispositions: 15 resolved at product-policy level and 49 deferred to architecture, evidence-led testing, operations or qualified legal review.

## 2. Owner-approved product boundary

The approved MVP remains exactly:
1. **MVP-01 — Manual file security analysis.**
2. **MVP-02 — Quarantine and file disposition.**
3. **MVP-03 — Website and link checking.**

MVP-03 has two independent mandatory gates: active Pro entitlement and owner-controlled activation. Both must be positively established before any provider/API call. False or unknown gate state denies protected work. Pro does not mean unlimited usage.

Other important product decisions are recorded in:
- [Phase 9 owner decision register](35-PHASE-9-OWNER-DECISION-REGISTER.md)
- [Phase 9 question disposition register](37-PHASE-9-QUESTION-DISPOSITION-REGISTER.md)
- [Authentication owner decisions](17-AUTHENTICATION-OWNER-DECISIONS.md)
- [MVP scope decision](/MVP-SCOPE-DECISION.md)

The decision register is authoritative for Phase 9 product-level recommendations and their limits.

## 3. Architecture must preserve these product invariants

- Web and Android are one product identity; platform-specific capability differences are allowed and must be disclosed where material.
- Authentication, entitlement, permissions and owner-controlled activation are authoritative gates. False or unknown means deny.
- After authoritative revocation, new and queued/not-yet-dispatched protected work is denied. Already-dispatched work is cancelled where supported and must not initiate follow-on provider calls. Exact propagation bounds and cancellation mechanics are architecture/test decisions.
- MVP-01 analysis is local/on-device by default. Optional cloud analysis is not in MVP and requires separate owner approval and explicit consent.
- MVP-02 quarantine requires explicit user confirmation. Automatic quarantine is not in MVP. Ask before removing the original. Do not promise secure erasure. Quarantine content and keys are not backed up by default.
- MVP-03 accepts HTTP/HTTPS only and uses the approved provider-checking boundary; it must not turn into arbitrary destination fetching or unapproved redirect-following. Preserve the approved no-call invariant.
- Account deletion immediately disables access and revokes sessions; personal data is deleted on a documented schedule. Any retained record needs a justified purpose, reason and period.
- Ordinary diagnostics exclude passwords, secrets, file contents and sensitive URL components.
- Do not introduce a feature, data transfer, persistence behaviour, provider or external dependency that contradicts the owner-approved contracts.

## 4. Architecture work to perform next

The architecture agent should plan and investigate, not silently reinterpret product requirements. The next workstream should cover:

1. **Architecture baseline and traceability:** inspect all five contracts and their projections; create requirement-to-component/data-flow traceability; record unknowns and conflicts before choosing mechanisms.
2. **Identity and authorization:** authentication/session lifecycle, server-authoritative entitlements/permissions/activation, revocation propagation, abuse controls, recovery notification and deletion workflows.
3. **MVP-01 analysis:** engine/provider options, local-vs-cloud boundary, supported formats, threat-intelligence sources, verdict classes/calibration, updates, resource budgets and platform proof.
4. **MVP-02 quarantine:** isolation and storage semantics per platform, original-file handling, integrity binding, encryption/key lifecycle, restore eligibility/freshness, expiry, purge and backup boundaries.
5. **MVP-03 website checking:** provider/API evaluation, URL normalization and safety boundary, redirect behaviour, timeouts, rate/concurrency/spend budgets, caching/freshness, cancellation and gate enforcement.
6. **Shared system qualities:** data classification, least privilege, diagnostics/audit, backup/recovery, RTO/RPO, availability, compatibility, update provenance/rollback, incident response, external dependency governance and support operations.
7. **Evidence and validation:** platform experiments, provider contracts, threat modelling, security review, performance/cost benchmarks, legal/privacy review and release gates.

For each proposed technical decision, cite the requirement IDs it satisfies, alternatives considered, evidence, failure modes, trade-offs and any product-policy impact. If architecture discovers that a product decision must change, return it to the Product Owner instead of changing the contract silently.

## 5. Explicitly deferred items

The 49 deferred questions are enumerated individually in the question disposition register. The major groups are:
- numeric abuse/resource/rate/concurrency/timeout/cost limits;
- file formats, engine selection, verdict thresholds and platform capability matrix;
- quarantine isolation, storage, integrity metadata, cryptographic/key lifecycle, capacity and retention implementation;
- URL/provider behaviour, caching, cancellation and provider cost/terms;
- backup expiry, recovery targets, data classification and audit/diagnostic retention;
- legal jurisdictions, statutory retention/notification obligations, incident operations, compatibility windows and support channel/SLA.

Do not treat the deferred list as a reason to reopen already approved product policies. It is a set of implementation and evidence questions with explicit owners/stages.

## 6. What Phase 9 did not prove

Phase 9 did not implement or test ZeroDeck. It did not run independent full Draft 2020-12 validation or upstream Software Rules CI, runtime/web/Android/provider/engine tests, a security audit, malware corpus validation, performance/cost benchmarks, customer research or qualified legal review. The contracts are product requirements, not evidence of runtime conformance or production readiness.

## 7. Handoff rule

The architecture workstream begins from this product baseline. Product Management's Phase 9 work is closed; architecture may now investigate and decide technical mechanisms within the approved product boundary. Any change to scope or user-visible product policy returns to the Product Owner for approval.
