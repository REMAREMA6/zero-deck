# Developer Task Breakdown — ZeroDeck Core Product

This is the Developer-owned executable breakdown of the Architect's outcome-level implementation plans. The Architect's openspec/changes/core-product-architecture/tasks.md remains unchanged as the outcome/acceptance source.

## Phase A — Foundation

- [ ] **A1. Monorepo/toolchain scaffold** — pnpm workspaces, TypeScript strict config, app/package skeletons, lint/format/test scripts. Depends: none. Verify: clean install, typecheck, lint, unit test, Web build and Expo export.
- [ ] **A2. Backend bootstrap/config** — Fastify server, validated env schema, request IDs, structured errors, health/readiness. Depends: A1. Verify: API tests for healthy/unready/invalid config and no internal error leakage.
- [ ] **A3. PostgreSQL/migrations** — real PostgreSQL service, migration runner, pool lifecycle, first schema. Depends: A1/A2. Verify: clean DB migration and repository integration tests.
- [ ] **A4. Shared contracts** — Zod API/domain contracts and generated/checked OpenAPI. Depends: A1. Verify: shared schema tests and API boundary validation.

**Checkpoint A:** [ ] clean install [ ] lint/typecheck [ ] tests [ ] Web build [ ] Android export [ ] real PostgreSQL migrations/integration pass.

## Phase B — Identity and authorization

- [ ] **B1. Account creation** — stable principal, email/password, Argon2id hash, uniqueness, safe errors. Depends: A2/A3/A4.
- [ ] **B2. Verification** — single-use challenge and fake delivery port; no real email provider. Depends: B1. Gate: no invented TTL/rate values; require explicit configured policy for public release.
- [ ] **B3. Sign-in/session** — opaque session token, server-side hash, 7-day inactivity and 30-day absolute expiry, secure Web cookie and Android secure storage. Depends: B1/A3/A4.
- [ ] **B4. Revocation/rotation** — logout current, logout all, individual session revocation service, credential-change rotation. Depends: B3.
- [ ] **B5. Recovery/step-up** — verified-email recovery, fake notification, fresh auth for sensitive changes. Depends: B2/B3/B4.
- [ ] **B6. Entitlement/activation** — independent DB-backed Pro and owner activation gates, fail-closed guard. Depends: A3/A4/B1.
- [ ] **B7. Account deletion** — immediate disable and revoke, policy-gated deletion schedule/retention. Depends: B3/B4/B6.

**Checkpoint B:** [ ] PostgreSQL auth integration [ ] session expiry/revocation [ ] recovery replay/expiry [ ] cross-client auth [ ] fail-closed authorization [ ] no real delivery dependency.

## Phase C — MVP-01 local file analysis

- [ ] **C1. File capability adapters** — Web/Android user-selected file access, revoked/unreadable/unsupported handling. Depends: A1/A4.
- [ ] **C2. Engine port/result model** — four outcomes and deterministic fake engine for tests only. Depends: A4.
- [ ] **C3. Local orchestration** — no upload, no content persistence, cancellation/interruption truthfulness, retry identity. Depends: C1/C2.
- [ ] **C4. Analysis UI** — Web and Android file selection/result surfaces; no simulated clean results. Depends: C3, B1/B3 for account surfaces only if protected UI is required.

**Checkpoint C:** [ ] original preserved [ ] no file-byte network path [ ] outcome mapping tests [ ] unsupported/failure not clean [ ] both clients disclose limitations.

## Phase D — MVP-02 quarantine

- [ ] **D1. Capability experiments** — Android/Web storage, permission, persistence, uninstall/data-clear tests. Depends: C1.
- [ ] **D2. Domain state machine** — eligibility, explicit confirmation, verified-copy ordering, restore/purge state transitions behind interfaces. Depends: C2/D1.
- [ ] **D3. Approved storage operations** — implement only after cryptographic/key, integrity, retention, capacity and platform gates are approved. Depends: D1/D2. Gate: owner/security decisions.

**Checkpoint D:** [ ] automatic quarantine impossible [ ] source never auto-deleted [ ] unsupported operation denied [ ] storage content not persisted until policy gate passes.

## Phase E — MVP-03 URL checking

- [ ] **E1. URL input/consent** — HTTP/HTTPS only, redaction, explicit consent. Depends: A4.
- [ ] **E2. Dual gates** — Pro + owner activation, dispatch-time server revalidation. Depends: B6.
- [ ] **E3. Fake provider** — only provider adapter can dispatch; fake records calls; no arbitrary fetch. Depends: E1/E2.
- [ ] **E4. URL UI** — Web/Android flow and truthful results/unavailable states. Depends: E3, B3/B6.

**Checkpoint E:** [ ] all denied cases zero calls [ ] no raw URL persistence/logging [ ] no destination fetch [ ] no no-match=safe claim.

## Phase F — Cross-platform verification/core exit

- [ ] **F1. Web E2E/responsive** — Playwright identity, analysis, quarantine gates, URL flow. Depends: B/E/C/D.
- [ ] **F2. Android tests** — emulator/instrumentation for auth, file access, local analysis and capability gates. Depends: B/C/D/E.
- [ ] **F3. Security/privacy/recovery** — dependency/secret checks, auth/authorization, redaction, DB recovery, interruption and abuse tests. Depends: all feature slices.
- [ ] **F4. Core exit report** — map every Architect outcome plan to evidence/completion/blocker; no live integrations. Depends: all prior tasks.

**Checkpoint F:** [ ] clean GitHub Actions [ ] real PostgreSQL evidence [ ] Web E2E [ ] Android evidence or explicit limitations [ ] all release gates accounted for [ ] core completion report.

## Checkpoint rule

Do not mark a task complete from code existence alone. Require the stated tests and evidence. If a release gate remains unresolved, keep the affected capability disabled and mark its task blocked rather than inventing a policy.
