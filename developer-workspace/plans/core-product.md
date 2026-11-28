# Developer Execution Plan — ZeroDeck Core Product

**Plan owner:** Developer Agent  
**Architect source:** openspec/changes/core-product-architecture/  
**Status:** Active  
**Implementation branch:** developer/core-product  
**Scope:** Core product; no hosted integrations/deployment.

## Overview

Build the first-party ZeroDeck core from an empty application surface. Use a small TypeScript monorepo with a Web client, Android client, one modular-monolith API and shared domain/API contracts. PostgreSQL is the authoritative database. Build vertical slices and keep each increment testable in GitHub Actions.

## Developer-selected engineering approach

| Area | Selection | Reason / boundary |
|---|---|---|
| Runtime | Node.js 24 LTS for server and CI | Supported by current Next.js/Expo tooling; stable LTS line |
| Workspace | pnpm workspaces | One lockfile, shared packages, reproducible CI |
| Web | Next.js App Router + TypeScript | Server-capable React web app; no Vercel coupling |
| Android | Expo SDK 58 + React Native + TypeScript | Native Android client with access to Android platform adapters |
| Backend | Fastify modular monolith, Node runtime | One API process with explicit bounded modules; no microservices |
| Shared contracts | Zod schemas and TypeScript domain types | Runtime validation at trust boundaries and shared client/server contracts |
| Persistence | PostgreSQL 17 + pg driver + versioned SQL migrations | Real PostgreSQL in CI; transparent SQL and portable DB boundary; no Neon-specific API |
| Password protection | Argon2id via maintained server-side package | Established password hashing; no custom cryptography |
| Tests | Vitest + Fastify inject + Playwright | Unit/API/DB/browser coverage; deterministic external adapters |
| Android verification | Expo export/typecheck plus Android emulator/instrumentation where runner capability permits | No claim of device-specific capability without evidence |

These are Developer implementation choices within the architecture's framework/language/ORM freedom. They do not approve any production engine, URL provider, cryptographic quarantine policy, legal/retention policy or numeric operating limits.

## System shape

apps/web (Next.js) ───────┐
                          ├── apps/api (Fastify modular monolith) ── PostgreSQL
apps/android (Expo) ──────┘
        │                          │
        └──── packages/contracts / packages/domain ────┘

The backend owns account, credential, session, entitlement, activation, usage-control and minimal operational state. File bytes, quarantine contents/keys, raw URLs and complete provider payloads do not cross into PostgreSQL by default. Local file analysis and quarantine use platform adapters and never depend on backend upload.

## Dependency graph

1. Workspace/toolchain and CI skeleton.
2. Shared contracts, config validation and PostgreSQL migration/repository foundation.
3. Backend health/readiness and module boundaries.
4. Identity/account principal and credentials.
5. Verification/recovery delivery port and fake adapter.
6. Session lifecycle, revocation and cross-platform auth clients.
7. Authoritative entitlements/activation and fail-closed protected-operation guard.
8. Local file access contract and analysis engine port.
9. Quarantine capability contract and safe, disabled-by-default operations.
10. URL provider boundary, consent, validation and authorization gates.
11. Web/Android feature surfaces and integration.
12. Security, privacy, failure, responsive and end-to-end verification.

## Detailed executable task breakdown

### Phase A — Buildable foundation

**A1. Monorepo and toolchain**
- Create pnpm workspace, strict TypeScript base config, lint/format/test scripts and app/package skeletons.
- Acceptance: clean install; workspace graph resolves; typecheck/lint pass; no app uses undocumented environment globals.
- Verification: pnpm install --frozen-lockfile, lint, typecheck, unit test, Web build and Expo export in Actions.

**A2. API boot and safe configuration**
- Create Fastify API bootstrap, config schema, structured errors, request IDs, health and readiness endpoints.
- Acceptance: invalid required configuration fails closed; health is distinct from dependency readiness; error responses reveal no internals.
- Verification: API tests for valid/invalid config and health/readiness.

**A3. PostgreSQL migrations and repository boundary**
- Add SQL migration runner, schema migration ledger, database pool lifecycle and first account/session/entitlement/activation/operational tables only when corresponding domain slices arrive.
- Acceptance: fresh PostgreSQL migrates; migration is transactional and repeatable; no in-memory persistence substitute.
- Verification: real PostgreSQL CI service, migration up/down or documented forward-repair test, repository integration tests.

**A4. Shared domain and API contracts**
- Define stable account/session, auth, analysis, quarantine, URL-check and API error contracts. Validate all external input and provider responses.
- Acceptance: Web and Android import the same contracts; API rejects malformed input consistently.
- Verification: schema unit tests and generated OpenAPI/contract checks.

### Phase B — Identity and authorization vertical slices

**B1. Account creation**
- Create stable account principal, unique email identifier and password hash storage.
- Acceptance: account identity is separate from credentials; duplicate identifiers do not leak account existence; password hashes only are stored.
- Verification: PostgreSQL integration tests and auth abuse/error tests.

**B2. Email verification**
- Add single-use verification challenge and delivery port with deterministic fake delivery adapter.
- Acceptance: account may remain explicitly unverified; unverified email cannot be used for recovery/security notifications; challenge is single-use and time-limited.
- Gate: exact challenge expiry/resend/rate values remain configuration/approval requirements; no production delivery integration.
- Verification: expiry, replay, consumption and fake-delivery failure tests.

**B3. Sign-in and session lifecycle**
- Implement email/password sign-in, opaque random session credentials stored as hashes, server-enforced 7-day inactivity and 30-day absolute expiry, current logout and concurrent sessions.
- Acceptance: Web uses protected HttpOnly cookies; Android stores its credential in platform secure storage; server is authoritative; session expiry/revocation works across clients.
- Verification: real PostgreSQL session tests, cookie/security tests and cross-client API tests.

**B4. Session rotation and logout-all**
- Implement rotation at approved trust-boundary changes, logout-all and individual-session revocation service support.
- Acceptance: credential recovery/replacement revokes all sessions; stale/replayed credentials fail; no detailed session list UI is added.
- Gate: exact renewal cadence remains unresolved.
- Verification: replay, rotation and concurrent-session tests.

**B5. Recovery and sensitive actions**
- Implement verified-email single-use recovery challenge, fake notification adapter and fresh-auth checks for password changes, recovery-email changes and account deletion.
- Acceptance: expired/consumed challenge fails; successful recovery revokes all sessions and emits a security notification through the fake adapter.
- Gate: expiry/rate values are not invented; production release blocked until policy values and delivery provider are approved.
- Verification: lifecycle, replay, notification failure and step-up tests.

**B6. Authoritative authorization**
- Implement server-owned entitlement and owner-activation state, permission checks and a reusable fail-closed authorization boundary.
- Acceptance: false/unknown/unavailable/stale state denies; Pro and activation are independent; client state cannot grant access.
- Verification: truth-table and tampering tests against PostgreSQL.

**B7. Account closure**
- Disable account and revoke sessions immediately; implement deletion workflow boundary without inventing deletion schedule/retention categories.
- Acceptance: protected access stops immediately; personal-data deletion cannot be falsely reported complete before policy execution; retained records require reason and period.
- Gate: production deletion schedule/legal categories unresolved.
- Verification: immediate disable/revocation integration tests and retention-policy gate tests.

### Phase C — MVP-01 local analysis

**C1. File access and capability contract**
- Define Web and Android selected-file adapters and truthful unsupported/permission-revoked outcomes.
- Acceptance: scan only after explicit user action; original is not modified; inaccessible/unsupported input is inconclusive, not clean.
- Verification: adapter tests and Web/Android capability probes.

**C2. Analysis engine port and result mapping**
- Define four distinct outcomes and deterministic fake engine for tests only.
- Acceptance: confirmed threat, suspicious, no-known-threat and could-not-decide remain distinct; no-match is never called safe; engine failure never becomes clean.
- Gate: no production engine is selected or activated.
- Verification: mapping tests and fake-engine contract tests.

**C3. Analysis orchestration**
- Implement local-only orchestration, lifecycle, cancellation where actually supported, interrupted/inconclusive states and no file-byte network boundary.
- Acceptance: selected bytes never reach API/backend; no scan history or content persistence is introduced; retries are distinct attempts.
- Verification: network-boundary tests, cancellation/failure tests and platform adapter tests.

**C4. Analysis client surfaces**
- Implement Web and Android selection/result surfaces, honest unavailable states and accessibility/responsive behaviour.
- Acceptance: both clients render the same outcome semantics; unsupported coverage is disclosed; no fake result is presented as a real scan.
- Verification: Playwright and Android UI tests.

### Phase D — MVP-02 quarantine and disposition

**D1. Platform feasibility and capability matrix**
- Probe Android app-private storage/key-protection and Web file/storage permissions using non-sensitive fixtures.
- Acceptance: supported/unsupported operations are evidenced per platform; no device-wide isolation or secure erase promise.
- Verification: Android instrumentation and browser capability tests.

**D2. Quarantine domain lifecycle**
- Define eligibility, explicit confirmation, verified-copy-before-source-disposition, restore and purge state transitions behind interfaces.
- Acceptance: automatic quarantine disabled; source never removed automatically; suspicious/inconclusive/unanalysed items are not treated as eligible; failures preserve source.
- Gate: no persistent content adapter until cryptographic/key, integrity, retention and capacity decisions are approved.
- Verification: pure domain/state-machine tests and failure injection.

**D3. Storage adapter and user-facing operation gates**
- Implement only adapters whose guarantees are proven and approved; leave unsupported actions disabled with clear explanations.
- Acceptance: no content/key backup; no operation claims beyond tested provider capability; deletion reports actual platform result only.
- Gate: unresolved security and owner decisions block content storage and restore/purge release.
- Verification: platform tests, storage-exhaustion and interruption tests.

### Phase E — MVP-03 URL checking

**E1. URL input and consent**
- Implement HTTP/HTTPS-only parser/input, sensitive-value redaction and explicit disclosure/consent before disclosure.
- Acceptance: unsupported schemes rejected; credentials/sensitive components never logged; no provider call before consent.
- Verification: parser adversarial tests, UI consent tests and log-redaction tests.

**E2. Dual server-side gates**
- Implement Pro entitlement and owner activation as independent server-owned gates, revalidated immediately before dispatch.
- Acceptance: every false/unknown/unavailable/stale/revoked combination denies; no provider adapter call on denied paths.
- Verification: exhaustive truth table and race/revocation tests.

**E3. Fake provider and result semantics**
- Implement a deterministic fake provider adapter with call recording, response validation and explicit inconclusive/outage outcomes.
- Acceptance: only the provider adapter dispatches; no destination fetch/crawl/redirect; raw URLs/full responses/results are not persisted by default.
- Verification: zero-call denied-case tests, provider-failure tests and SSRF/network-boundary tests.

**E4. URL client surfaces**
- Implement Web and Android user-initiated URL check flows, Pro/activation disabled states and honest results/unavailable states.
- Acceptance: no-match is not safe; no full-site inspection claim; consent, gating and failure are visible and understandable.
- Verification: Playwright and Android UI tests.

### Phase F — Cross-platform core exit

**F1. Web end-to-end and responsive verification**
- Cover identity, auth, file-analysis capability states, quarantine gating and URL dual-gate flow with Playwright.
- Acceptance: visible user flows, failure states and responsive layouts verified at agreed viewport classes.
- Verification: screenshots, traces and test reports in Actions.

**F2. Android verification**
- Cover auth, file access, local-only analysis boundary and quarantine capability states using Android test runner/emulator where available.
- Acceptance: permission revocation, app process interruption and secure local session handling are verified or explicitly recorded as unsupported.
- Verification: emulator/instrumentation artifacts.

**F3. Security/privacy/recovery validation**
- Run dependency, secret, authorization, logging-redaction, DB recovery, concurrency and failure-path tests.
- Acceptance: no high-risk unresolved issue is silently accepted; open release gates are explicit.
- Verification: CI reports and security review checklist.

**F4. Core completion report**
- Reconcile all 51 Architect outcome plans to implemented, blocked or not applicable with evidence; produce limitations, risks and next-stage integration handoff.
- Acceptance: core can be exercised without live hosted integrations; no production capability is claimed without evidence/approval.
- Verification: clean CI, PostgreSQL integration, Web E2E and Android evidence.

## Release gates that remain closed until authority/evidence exists

- Production malware engine/detection claims: FILE-002/003 and relevant licence, update-trust and corpus evidence.
- Published file support matrix/resource limits: FILE-001/006/007.
- Quarantine content storage/restore/purge: QUAR-002/003/005/006/008/010/011/013/014.
- Public authentication abuse controls and exact challenge expiry/resend/deletion policy: AUTH-009–013 and security/operations/legal evidence as applicable.
- Production URL provider dispatch: WEB-003/005/007–012/015/016 and provider terms, consent, privacy and owner-approved quota/spend ceiling.
- Production launch: SYS-001/002/004–013/017/018 plus qualified legal/operations review.

## Verification policy

- All commands execute in GitHub Actions; owner is not asked to run a local terminal.
- Database persistence tests use a real PostgreSQL service.
- Unit tests use deterministic fakes; no fake adapter is represented as a production engine/provider.
- Every increment is tested before the next increment.
- Playwright uses accessible locators and web-first assertions; no fixed sleeps.
- No main merge or production deployment without owner approval.

## Current first slice

Start with A1–A4: establish the monorepo, API bootstrap, PostgreSQL test service, shared contracts and first green CI run. Then proceed to B1 account creation as the first complete user-facing vertical slice.
