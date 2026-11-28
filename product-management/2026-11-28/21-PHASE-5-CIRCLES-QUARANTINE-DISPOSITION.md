# Phase 5 — CIRCLES Analysis: MVP-02 Quarantine and File Disposition

**Date:** 2026-11-28  
**Capability:** MVP-02 — Quarantine and file disposition  
**Contract:** `ZD-CONTRACT-QUARANTINE-DISPOSITION` v0.1.0-draft  
**Author:** ZeroDeck Product Management Agent  
**Status:** PM recommendation; not an owner product decision

## C — Comprehend the situation

### Goal

The product goal for this capability is to help an everyday user handle a file that the manual analysis workflow has identified as a confirmed threat, suspicious, or inconclusive, without silently destroying legitimate data or overstating what the product has isolated, restored, or deleted.

The capability should make the file's actual disposition and recoverability understandable. This supports the broader ZeroDeck goal of providing trustworthy file-security handling, not simply adding a quarantine list.

### Constraints

- Owner-approved scope includes MVP-02 alongside MVP-01 and MVP-03; MVP-03 is unrelated to this phase.
- Web and Android are product platforms, but file-operation capabilities differ.
- The owner prefers first-party product control and local-first file handling; no cloud quarantine upload is approved.
- Android SAF permissions and provider capabilities are user-/provider-controlled. Android app-specific files are removed on uninstall.
- No deployed ZeroDeck runtime, real quarantine service, or production file-disposition operation has been observed.
- No storage architecture, encryption algorithm, key-recovery design, retention period, file-size limit, or restore destination policy is approved.
- The 30-day retention value is explicitly proposed in source working material, not an owner decision.
- Automatic/background protection is excluded from the MVP.
- This phase is product definition only; no implementation or Software Rules repository changes are authorized.

### Context

MVP-01 produces a bounded result for a user-selected file. MVP-02 consumes that result and manages the disposition of the file. Existing product material proposes:
- confirmed threats may be quarantined when permitted and when the operation succeeds;
- suspicious items go to review;
- clean items remain untouched;
- unknown/inconclusive items are rescanned or reviewed;
- restore requires fresh analysis and confirmation;
- restored content is checked against a recorded integrity identity;
- failed deletion retains a record and reports failure;
- quarantined content is never executed;
- unrelated files are not overwritten.

These are provisional product-material baselines, not runtime facts or owner-approved detailed policies. The current reference UI's restore/delete actions are explicitly placeholders.

### Success measure

The product outcome is not “a quarantine button was tapped.” A useful measure is the percentage of first-time target users who, in a moderated task using a controlled test file, correctly understand whether the original remains, correctly identify the quarantine/restore/delete state, and complete the intended safe disposition without accidental data loss. Compare against the user's current workaround or a baseline task with the existing workflow. Define the target and sample before validation; no numerical target is invented here.

### Explicit assumptions

1. The primary user cohort remains the owner-selected everyday non-technical user.
2. A user arrives at MVP-02 from an MVP-01 result or a user-visible quarantined-item record; this is not a standalone file-manager feature.
3. Local-first handling remains the working product direction, but exact storage and encryption choices are unresolved.
4. Product-level requirements must be shared across platforms where possible, while unsupported platform operations must remain explicit.
5. No primary customer interviews or usability tests are available in the evidence set; all user needs below are hypotheses.

## I — Identify the customer

### Segments by context and friction

| Segment | Context | Friction / consequence |
|---|---|---|
| Everyday non-technical user with a flagged file | Has selected a downloaded or received file for manual analysis and receives a threat/suspicious result | May not understand whether the file is still in its original location, whether it is isolated, or whether deletion/restore will lose data |
| Technical security practitioner | Reviews suspicious samples as part of a broader security workflow | Needs precise provenance and safe handling, but may expect advanced analysis, evidence export and lab controls outside this MVP |
| Small-business device user | Handles work documents and downloads on a personal/work device | Accidental deletion or leakage can have higher operational impact; governance needs may exceed MVP |
| Platform/document-provider operator | Supplies the source file and controls available read/write/delete operations | Provider limitations, availability and permission revocation affect what ZeroDeck can truthfully do |
| ZeroDeck product/security operator | Defines eligibility, retention and support boundaries | Must manage false-positive harm, user trust, privacy, storage and support incidents |

### Chosen cohort

**Primary cohort:** an everyday non-technical user who has manually analysed a specific file and now needs to decide what to do with a threat, suspicious, or inconclusive result.

This cohort is selected because it is the direct recipient of the owner-approved first MVP and is exposed to the highest immediate consequence of confusing a quarantine copy with removal of the original, or of restoring/deleting the wrong file. The choice follows the existing owner-selected audience; it is not a claim that research has established segment size or demand.

### Stakeholders

The user is the primary customer. Other affected parties include the owner of the file (which may or may not be the user), people whose information is inside the file, the source document provider, device/browser platform providers, and ZeroDeck operators responsible for support, policy and data protection. ZeroDeck is not a marketplace; there is no second commercial side to select, but provider and data-subject interests must be acknowledged.

## R — Report the customer's needs

The available evidence is product scope, source-derived intent, platform documentation and PM inference—not customer interview data. No need below is labelled as directly reported by a customer.

| Stated want / product-material request | Underlying job or need | Evidence status |
|---|---|---|
| “Quarantine this file” | **Inferred:** know that a flagged file is actually contained, and know whether the original is still accessible | Source material defines quarantine workflow; platform sources show provider operations vary |
| “Restore this file” | **Inferred:** regain access to a legitimate file without reintroducing a threat or overwriting newer data | Fresh-scan/confirmation intent exists in working draft and source-derived UI note; detailed policy open |
| “Delete permanently” | **Inferred:** remove the quarantined copy and understand what the delete action does and does not guarantee | Source material requires truthful deletion success/failure; secure-erasure guarantee is not established |
| “Keep it for 30 days” | **Inferred, not accepted:** avoid indefinite storage while retaining a recovery window | 30 days appears only as a proposed working-draft value |
| “Show me my quarantined files” | **Inferred:** identify the correct artifact and understand its current state and available actions | Item-level lifecycle record is necessary; standalone scan history is excluded |

### User stories

- As an everyday user with a flagged file, I want to know what has happened to the original and the quarantine copy so that I can make a safe next decision.
- As an everyday user whose file may be a false positive, I want a recoverable route back to a usable file so that a mistaken classification does not permanently cost me the file.
- As an everyday user who chooses deletion, I want the product to report the actual result and its limits so that I do not rely on a false claim of permanent erasure.
- As a user on a platform with limited file permissions, I want to know which actions are actually possible so that I am not told a file is isolated when it is not.

All four stories are PM-inferred needs, not reported interview findings.

## C — Cut through prioritization

Axes fixed before comparing needs:
1. **Frequency:** how often the user is likely to encounter the need within the approved manual file workflow. No usage data exists; ratings are qualitative hypotheses.
2. **Acuteness:** cost if the need is unmet, especially data loss, continued exposure or false reassurance.
3. **Goal alignment:** contribution to trustworthy, safe file handling within the owner-approved MVP.

| Rank | Need | Frequency hypothesis | Acuteness | Goal alignment | Decision |
|---:|---|---|---|---|---|
| 1 | Know whether the flagged file is actually contained and what happened to the original | Medium | Very high | Very high | Choose |
| 2 | Recover a legitimate/false-positive file without overwriting data or reintroducing a threat | Medium | Very high | Very high | Keep, but dependent on safe state/integrity |
| 3 | Understand what permanent deletion actually guarantees | Medium/low | High | High | Keep as a required disposition branch |
| 4 | Control retention duration and expiry | Unknown | Medium/high | High | Defer exact policy decision; require a policy before release |
| 5 | Browse/search historical scan activity | Unknown | Low for MVP-02 | Low | Cut; standalone scan history is outside MVP |

**Chosen need:** the user must be able to understand and trust the actual file-disposition state—whether a verified quarantine artifact exists, whether the original remains, and what safe next actions are available.

**Explicit cut:** no standalone scan-history browser, general file manager, device-wide protection, automatic/background monitoring, cloud backup/sync, or broad web file-system management is added by this phase. Restore and deletion are included only as disposition workflows for quarantined items.

The ranking is qualitative because there are no usage frequencies, interviews, support tickets or quantified harm rates. It is a prioritization hypothesis, not measured demand.

## L — List solutions

Three meaningfully different approaches to the chosen need:

### Option A — Minimal review marker (quick win)

Keep the original untouched and attach a local “needs review” state to the scan result. Offer guidance and user-directed next steps, but do not create a separate quarantine artifact.

- Addresses the need by making status explicit and avoiding risky file operations.
- Fastest and lowest operational complexity.
- Does not provide actual isolation; the original flagged file remains where it was.
- It is insufficient as the full MVP-02 outcome if users reasonably expect a real quarantine capability.

### Option B — Verified local quarantine with explicit source disposition (core bet)

Create a quarantine artifact in a documented, platform-supported local boundary; verify its content identity/integrity; record whether the original remains, was copied, moved or removed; require fresh analysis and confirmation before restore; require confirmation before permanent deletion; report partial/failure states truthfully.

- Directly addresses containment and user understanding.
- Avoids claiming an atomic move or secure erase where the platform/provider does not guarantee one.
- Supports platform-specific capabilities without pretending web and Android are identical.
- Requires careful storage, integrity, permission, retention and recovery engineering.

### Option C — Managed recovery vault (longer horizon)

Offer a managed vault with cross-device recovery, backup/restore, key recovery and potentially synchronized quarantine metadata/content under an explicit security and privacy model.

- Could address device loss, uninstall and key loss more comprehensively.
- Adds remote data handling, account/authorization, cost, key custody, backup consistency and a larger threat model.
- Conflicts with the current local-first direction unless separately approved.
- It is a future option, not an MVP requirement.

## E — Evaluate trade-offs

Evaluation axes fixed before weighing:
- **Viability:** whether this solves an acute user problem in a way that can be sustained and supported.
- **Lovability:** whether the user can complete the job in the existing file workflow without learning a separate system.
- **Risk and consequence:** false-positive harm, accidental data loss, false containment/deletion claims, privacy exposure.
- **Cost and operating burden:** engineering, support, storage and ongoing policy work.
- **Feasibility floor:** whether web/Android platform contracts can support the stated outcome. Feasibility is a floor, not the main differentiator.
- **Short-/long-term consequences:** whether the option creates a coherent path beyond MVP without prematurely committing to cloud infrastructure.

| Option | Viability | Lovability | Risk / drawback | Cost / operating burden | Feasibility |
|---|---|---|---|---|---|
| A — Review marker | Low/medium: inexpensive, but may not satisfy the approved quarantine outcome | Simple, but leaves the original exposed | Main drawback: it can be mistaken for actual isolation unless labelled carefully | Low | High; it avoids most file operations |
| B — Verified local quarantine | Medium/high hypothesis: delivers a concrete user outcome while respecting local-first direction | Strong if the system explains source-vs-copy and safe restore/deletion | Main drawback: platform/provider differences, false positives, key loss, storage exhaustion and partial failures require robust handling | Medium/high; local file lifecycle and support are non-trivial | Conditional: Android has user-mediated SAF operations; browser support must be proven per capability |
| C — Managed recovery vault | Unknown; no validated willingness to pay or need for cross-device recovery | Potentially convenient, but introduces account and trust complexity | Largest privacy, key custody, breach, backup mismatch and operating risk | High recurring cost and operational burden | Technically possible only after substantial architecture, security and commercial decisions |

### Evaluation conclusion

Option B best addresses the chosen need while keeping file contents local and limiting the promise to verified operations. Its drawback is material: it is not a trivial file move, and it cannot be promised uniformly across arbitrary Android providers or browsers. It must be validated on supported devices/providers before release.

Option A is rejected as the sole MVP-02 solution because it marks a state without providing a quarantine artifact. Option C is deferred because the need and willingness to pay are unvalidated, and the additional remote trust boundary is not justified by the current MVP.

## S — Summarize the recommendation

**Recommendation:** pursue Option B, a verified local quarantine workflow with explicit and separately recorded source disposition, fresh-scan restore gating, item-specific deletion confirmation, and truthful partial/failure states. Do not promise universal isolation, atomic move, post-uninstall retention, or secure erasure. If a platform cannot provide a safe supported operation, communicate that limitation rather than simulating success.

**Customer benefit:** users can understand whether a flagged file is contained, whether the original remains, and whether restore/deletion actually completed.  
**Business benefit:** a concrete, differentiated file-handling capability with bounded privacy exposure and fewer trust-damaging false success claims.

**Success metric:** among first-time target users completing a controlled file-disposition task, the percentage who correctly identify (1) whether the original remains, (2) whether quarantine/restore/delete actually succeeded, and (3) the safe next action, without accidental data loss. Compare with the same task using the user's current workaround or a pre-change baseline. Define the target and sample before testing; no numeric target or customer evidence currently exists.

**Trade-off:** this recommendation gives up the quick, low-cost review-only marker and the convenience of a cloud recovery vault. It accepts greater local engineering/support complexity in exchange for a real quarantine outcome without adding a remote file-content trust boundary.

**Objections and answers:**
- *Why not automatically quarantine confirmed threats?* The confirmed-threat threshold and false-positive recovery policy are not yet approved. Automatic action should remain gated by an explicit owner decision.
- *Why not delete the original immediately?* SAF/provider deletion may be unsupported or fail; a verified copy must exist before any source-removal step, and the original's status must be disclosed.
- *Why not support identical web and Android behaviour?* The platforms expose different file permissions and storage capabilities. False parity claims would be misleading.
- *Why not use the proposed 30-day retention?* It is a working-draft proposal, not an owner-approved policy.
- *Why not promise secure deletion?* The reviewed platform/provider sources do not establish universal forensic erasure.

**Open evidence gaps:** no primary user research; no tested Android quarantine prototype; no validated browser quarantine path; no final threat threshold, storage/key design, retention policy, supported device matrix, file-size/capacity target, or deletion guarantee.

This is the Product Management Agent's recommendation. The owner retains the decision.
