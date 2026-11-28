# Developer Brief — ZeroDeck Core Product

**Source:** openspec/changes/core-product-architecture/  
**Authorization:** Owner instruction in chat on 2026-11-28: act as Developer and start implementation to completion.  
**Branch:** developer/core-product  
**Scope:** Core product only. Hosted integrations and deployment are deferred.

## Required outcomes

Deliver the owner-approved ZeroDeck MVP as one product identity across Web and Android:

1. Shared identity, email/password authentication, session lifecycle, recovery and account closure.
2. MVP-01 manual file security analysis, local/on-device by default, with honest four-way outcome semantics.
3. MVP-02 quarantine and file disposition, local/device-bound, explicit confirmation and platform capability disclosure.
4. MVP-03 user-initiated HTTP/HTTPS link checking with independent Pro and owner-activation gates, explicit disclosure/consent, and a deterministic fake provider during core development.
5. PostgreSQL-backed authoritative state, cross-platform API contracts, security/privacy boundaries, responsive Web UI and Android client.
6. Continuous unit, integration, database, browser and platform verification with evidence in GitHub Actions.

## Hard boundaries

- PostgreSQL is used in core development and CI. No SQLite-only or in-memory-only persistence proof.
- Do not integrate Neon, Vercel, live email delivery, billing, production malware engines/feeds or production URL reputation providers in this stage.
- File bytes and quarantine contents/keys stay on-device by default. Do not send file content to the backend.
- Do not persist raw submitted URLs, full provider responses, file bytes, quarantine contents/keys or scan/check results by default.
- MVP-03 provider dispatch is impossible unless the server positively establishes both active Pro entitlement and owner-controlled activation immediately before dispatch. Unknown, false, stale, unavailable or revoked state denies.
- The URL feature must never fetch the submitted destination, crawl it or follow arbitrary redirects. Only the configured provider adapter may make outbound calls.
- Do not claim that no-known-threat/no-match means safe.
- Do not enable quarantine content storage until the unresolved platform, cryptographic/key lifecycle, integrity, retention and capacity decisions have the required evidence/approval.
- Do not claim a production file-scanning capability until a production engine/source is evaluated and owner-approved.
- Preserve authority labels. Owner-approved policy is binding; PM-proposed requirements are not silently upgraded to owner-approved.
- Do not invent numeric rate, quota, timeout, size, retention, resource or spend thresholds.
- Do not claim secure/forensic erasure.
- Do not merge into main without owner approval.

## Developer authority

The Developer chooses implementation methods, libraries, code organization, migrations, API contracts and execution order within the approved architecture. The Developer performs detailed task decomposition using the planning-and-task-breakdown skill and maintains it under developer-workspace/.

## Definition of done

The core is done only when every safely implementable owner-approved outcome has working code and evidence; release-blocking unresolved decisions are explicitly gated; all applicable tests pass in clean GitHub Actions runs with real PostgreSQL; browser and Android flows are verified to the extent the CI environment supports; and the Developer report lists completed, blocked and not-yet-verified behaviour honestly. A fake adapter is not a production engine/provider.
