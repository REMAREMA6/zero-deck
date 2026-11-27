# Phase 2 — ZeroDeck candidate capability inventory

**Date:** 2026-11-27  
**Basis:** Owner clarification in `ENGAGEMENT-UNDERSTANDING.md` §11; completed `SCREEN-INVENTORY.md`; reference repository revision `86908bff1aa1bbf85a231ba0d47b8fe9fff148c6`; scanner working draft `upload/android_security_scanner_product_decisions.txt`.  
**Status:** Phase 2 scope decision recorded. The ZeroDeck launch MVP is the three-capability scanner slice selected by the owner; IP tracking is a deferred candidate and excluded from MVP.

## 1. Product boundary

ZeroDeck is the startup and broader tool/platform direction for people involved in ethical hacking and penetration testing. Security scanning is one possible service/capability area. The current reference repository is heavily scanner-oriented; it is not a complete statement of ZeroDeck's product vision or the universe of possible capabilities.

Three scopes must remain distinct:

1. **Startup direction:** ethical-hacking and penetration-testing tools/platform.
2. **Evidence-backed candidates:** capabilities actually described by the supplied ZeroDeck/reference materials.
3. **Selected launch MVP:** owner-approved three-capability slice recorded in `MVP-SCOPE-DECISION.md`.

The scanner working draft's labels are evidence of a proposed scanner-service scope; the ZeroDeck owner separately selected the first MVP. Link checking is Pro-gated and owner-activation-gated under decision `PRO-GATED-LINK-CHECK-DECISION.md`.

## 2. Candidate capability register

| ID | Candidate capability | Evidence in reference materials | Candidate workflows / outcomes | Scanner-document status | ZeroDeck launch status |
|---|---|---|---|---|---|
| CAP-01 | Manual file security analysis | Product decisions §§3–5, 9; SCR-03–05 | Select one permitted file; scan; classify result as threat/suspicious/no known threat/could not decide; explain limitations and outcome. | Explicit scanner MVP direction; engine, supported formats/sizes, detection logic and failure semantics open. | **Selected — MVP-01.** |
| CAP-02 | Quarantine and file disposition | Product decisions §3; SCR-05, SCR-08–09 | Quarantine confirmed malware when permitted; request review for suspicious items; leave clean items untouched; restore only after fresh scan and confirmation; permanently delete with truthful success/failure. | Core scanner MVP direction; policy is detailed, but platform enforcement, storage implementation, key handling and retention details require verification. | **Selected — MVP-02.** |
| CAP-03 | Website and link reputation checking | Product decisions §§4, 9; SCR-06–07 | Accept a user-supplied URL; validate input; assess known danger; return likely dangerous/no known threat/could not decide; never guarantee safety or imply whole-site inspection from a URL check. | Explicit scanner MVP direction; detection source, execution location and input method open. | **Selected — MVP-03.** |
| CAP-04 | Scan records and history | SCR-02, SCR-10; product decisions §7 | Present recent results; search/filter file and link records; inspect a record. | Planned screen; exact fields, persistence, retention and backend need are open. | Outside MVP; not selected. |
| CAP-05 | User privacy and app settings | Product decisions §§5–7, 9–10; SCR-11 | Explain on-device default; control notification/retention preferences; disclose any optional cloud transfer and obtain appropriate consent. | Privacy principles declared; detailed settings and retention controls remain open. | Not a standalone MVP capability; relevant privacy/safety properties remain cross-cutting where applicable. |
| CAP-06 | User-facing help and product information | SCR-12; product decisions §6 | Explain scanning, result meanings, quarantine, link checking and privacy; provide version/support information. | Screen planned; content source and support operations unresolved. | Unresolved candidate. |
| CAP-07 | Administrative access and operations | SCR-13–15 | Authenticate authorised staff; inspect service/activity summaries; manage users if accounts exist. | Conditional/open; account model, sign-in and user management not decided. | Unresolved candidate. |
| CAP-08 | Threat-indicator administration | SCR-16; product decisions §§6–7 | Create/search/filter/update/remove domain, IP or hash indicators; manage status and source metadata. | Conditional on selected detection architecture and indicator ownership. | Unresolved candidate. |
| CAP-09 | Help-content administration | SCR-17 | Create/edit/preview/publish articles, FAQs, tips and announcements. | Conditional on CMS/content-management choice; Sanity is only a possible service. | Unresolved candidate. |
| CAP-10 | Service health and audit visibility | SCR-18; EXTRA-01/02 references | Inspect service availability, errors and administrative audit events. | Screen 18 extension; sample data/local filters in handoff. | Unresolved candidate. |
| CAP-11 | Automatic/background protection | EXTRA-01; product decisions §4 | Monitor eligible downloads/security events, scan supported events, pause/resume protection and handle background limitations. | Explicitly later release in scanner draft; browser extension also deferred. | Later candidate only if scanner capability is selected. |
| CAP-12 | Device privacy audit | EXTRA-02 | Inspect device permission/privacy categories and present recommendations or revocation affordances. | Extra route only; no matching approved product decision or screen specification. | Unresolved candidate; outside MVP. |
| CAP-13 | IP address tracking and investigation | Owner clarification during Phase 2: a stakeholder said IP tracking should be a feature; exact intended meaning and workflow were not defined. | Potentially record, monitor, correlate or investigate IP addresses associated with assessment activity; these are possible interpretations, not adopted requirements. | Not defined in scanner working draft; requires discovery and precise product definition. | Future candidate only; explicitly excluded from MVP. |

## 3. What is not established

The inspected material does **not** establish additional ZeroDeck-wide capabilities such as penetration-test project management, asset discovery, vulnerability assessment, exploit validation, reporting, collaboration, client engagement management, or team workflows. These are examples of possible product areas one might encounter in the broader domain, **not ZeroDeck requirements or even evidence-backed candidates**. They must not be added to the capability set without owner/product evidence.

Likewise, no claim is made that ZeroDeck is exclusively an Android app or that every scanner admin screen is needed for the first release. The owner has selected the three scanner capabilities listed in §5 as the constrained launch MVP; this does not define the whole startup.

## 4. Capability dependencies and decision gates

| Capability | Depends on / decision required |
|---|---|
| CAP-01 File analysis | Threat model; scanning engine/detection approach; supported file types and size; local vs optional remote analysis; permission/access model; result confidence and inconclusive behaviour. |
| CAP-02 Quarantine | File access and isolation mechanism; confirmed-threat threshold; encrypted app-private storage; key protection; restore integrity; retention/deletion; uninstall behaviour; audit semantics. |
| CAP-03 Link checking | URL acceptance method; normalization/redirect policy; threat-intelligence source; local/backend/provider execution; freshness; timeout/offline handling; safe result wording. |
| CAP-04 History | Whether history is a required user feature; exact event/result fields; local/cloud location; retention/deletion; privacy constraints. |
| CAP-05 Privacy/settings | Effective settings; consent rules; file-transfer disclosure; telemetry policy; retention options; permission prompts. |
| CAP-06 Help | Content ownership, versioning, offline behaviour and support contact. |
| CAP-07 Administration | Whether accounts/admin portal are in launch scope; principal model; roles; recovery; tenant boundary; privileged actions. |
| CAP-08 Indicators | Detection engine contract; source trust; indicator lifecycle; deduplication; update authority; freshness and false-positive handling. |
| CAP-09 Content management | Whether a CMS is required; publisher roles; review/publish lifecycle; content versioning. |
| CAP-10 Health/audit | Which services exist; what health means; event taxonomy; retention and access restrictions. |
| CAP-11 Background protection | Android platform capabilities/limits; battery/resource budgets; permissions; scheduling/event triggers; supported browser/device targets. |
| CAP-12 Privacy audit | Platform APIs available; meaning of permission state; user consent and safe revocation; supported Android versions. |

## 5. Candidate MVP decision status

**No ZeroDeck launch-MVP capability is confirmed in the available owner-approved record.**

The scanner document's own proposed MVP comprises manual selected-file scanning, quarantine and website/link checking. This is a useful coherent candidate slice, but its scope belongs to the Android Security Scanner working draft. The owner explicitly instructed that the MVP must not be inferred solely from current repository contents. Therefore this inventory preserves it as a candidate proposal, not an adopted ZeroDeck decision.

The remaining candidates are either unresolved, conditional on the scanner's architecture, or explicitly later-release in the scanner document.

## 6. Phase 2 scope consequence

The evidence-backed candidate inventory is complete relative to the inspected product materials. A startup-wide exhaustive capability inventory is **not** established because the current materials do not describe the broader ethical-hacking/penetration-testing platform beyond the scanner service area.

Before a replication scope can be frozen, the owner must designate:
- which candidate service/capability is the first ZeroDeck launch MVP;
- which workflows within that capability are in;
- which capabilities are explicitly later or out of scope; and
- whether the current scanner design draft is approved as the source of requirements for that first service.

Until then, Phase 2 can provide a complete candidate/facet map, but cannot honestly pass its MVP-scope exit gate.
