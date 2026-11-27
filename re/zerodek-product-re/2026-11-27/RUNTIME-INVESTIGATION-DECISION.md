# Phase 7 Decision — Non-UI Prior-Art Runtime Investigation

**Decision ID:** ZD-DEC-2026-11-27-03 (corrected scope)  
**Recorded:** 2026-11-27  
**Status:** Phase 7 started; runtime execution blocked at preflight  
**Workspace:** re/zerodek-product-re/2026-11-27/

## Correction to the earlier decision

The earlier version incorrectly named lordwhitefire/Zerodek as the runtime target. That was a scope error and is superseded by this correction. The earlier commit remains in Git history; it is not silently erased.

The owner clarified the repository roles:

- lordwhitefire/Zerodek is the owner's fork of Felix's repository. It contains limited product-intent material and screen/UI demonstrations. Use it to understand intended screens and inspect existing UI source. Do not treat it as a functioning product or run it for non-UI runtime extraction.
- REMAREMA6/zero-deck is the actual ZeroDeck product repository being built.
- Phase 7 runtime targets are the selected working prior-art implementations recorded in the Phase 3 register.
- Software Rules remains technology- and stack-agnostic. Runtime investigation excludes UI.
- UI rules are derived from screen/design evidence and source code now; later UI runtime rules can be captured from the actual ZeroDeck implementation by the developer agent.

## Phase 7 investigation targets

| Phase 3 source | Nature | Phase 7 treatment |
|---|---|---|
| SRC-01 MaintainTeam/Hypatia, c0f98977be935e58849726313635a2459cac3892 | Working Android file scanner | Non-UI runtime target, subject to target-specific triage and real isolated-lab gate |
| SRC-02 MaintainTeam/HypatiaDatabases, 3c35f52e1a847caed46d8e1ad34968bfa3c8b10a | Working database generator/CI pipeline | Non-UI pipeline target, subject to triage and safe execution gate; do not infer Android app behaviour from generator runs |
| SRC-06 Cisco-Talos/ClamAV, cad7b18a3e6505195fe08db1412449a18fc9f012 | Working antivirus engine | Comparative runtime target only if safe and useful; not an adopted dependency |
| SRC-04 Google Web Risk Lookup | Remote API contract | No provider calls, account creation, new secrets or paid activity. Runtime unverified unless separately approved |
| SRC-07 Android storage, SAF and Keystore documentation | Platform documentation | Source/document-derived constraints only; not a runnable target |

SRC-03 Safe Browsing v4 is rejected for default commercial use; SRC-05 is a stale wrapper around that API. Neither is a runtime target. The Phase 3 register remains the authority for source selection and provenance.

## In-scope runtime questions

Investigate non-UI implementation behaviour relevant to the owner-approved MVP:

- File content acquisition, hashing, signature lookup, scan orchestration, progress/cancellation, verdict semantics and failure paths.
- Threat-database generation, feed transformation, deduplication, signing, verification, freshness and publication.
- ClamAV engine input/output, supported operation modes, error handling and resource behaviour, only to the extent useful as comparison.
- Relevant persistence, APIs, messaging, identity/authorization, security controls, background work, configuration, integrations, errors/recovery and performance/resource behaviour.
- Quarantine behaviour only where an inspected working implementation actually provides it. Do not invent a quarantine implementation from Android documentation.

Exclude runtime UI inspection, visual parity, replacement implementation, production ZeroDeck claims, IP investigation and unrelated admin/background-protection capabilities.

## Integration and service limits

- Do not call Google Web Risk or another external provider; do not provision accounts, acquire secrets, buy services or incur charges.
- Record provider request/response semantics from pinned official documentation as documented contracts, not runtime observations.
- If a reference feature depends on credentials, remote infrastructure or an unavailable integration, skip execution and record the exact blocker.
- Do not connect to production systems or send real user files/URLs.

## Authorization and execution gates

The owner authorized running the owner's own repository, but that authorization does not establish ownership of third-party prior-art repositories. Before executing each third-party target, record its exact licence/permission basis and the permitted action. Public source access is not treated as blanket authorization to bypass controls or ignore licence terms.

The uploaded RE-agent instructions require re-triage before deeper analysis and a real named isolated lab before dynamic execution. The lab must have no host filesystem shares, no bridged network, a restorable snapshot and teardown capability. An ordinary container, folder, process or separate user is not accepted as a lab. Never execute malware or suspicious samples.

## Initial environment preflight — 2026-11-27

Observed in the available container:
- Linux x86_64; process identity is root.
- Java, Git, Node.js, npm and Python are present.
- Docker, Podman, ADB, Gradle, ClamAV clamscan and freshclam were not found on PATH.
- No named isolated lab has been supplied or verified.
- No evidence currently establishes absence of host filesystem shares, absence of bridged networking, snapshot rollback or destroy/revert capability.

**Disposition:** runtime execution is blocked. Do not execute selected repository code in this environment or describe static inspection as runtime evidence. Continue with source/document analysis and record the exact blocker. Reassess if a genuine lab and target-specific authorization become available.

## Evidence requirements

For every runtime observation, record immutable repository revision, exact environment, command, initial state, fixture/input, ordered actions, output/log excerpt, resulting state, stop condition, date and evidence hash where available. Map observations to the Software Rules 15 facets and ZeroDeck scenarios. Preserve these evidence classes:

1. Runtime-observed behaviour of the reference implementation.
2. Source-derived rules about the inspected reference implementation.
3. Owner-declared ZeroDeck product intent.
4. Inference/assumption.
5. Unknown/unresolved.

A reference runtime observation is not ZeroDeck production runtime behaviour. A source tree is not proof of execution. A successful build/test alone does not prove complete product behaviour.

## UI handoff

UI source/design rules are maintained separately from Phase 7 runtime work. The owner's fork is a product-intent and source reference. It does not establish backend behaviour. Later, the developer agent may capture runtime UI rules from the actual REMAREMA6/zero-deck implementation after it exists.

## Supersession

This corrected decision supersedes the initial target designation in commit b7187c126a8b3160a9a56828923843298abb33bf. The original record is retained in Git history for auditability.
