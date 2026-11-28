# Developer Technical Decisions

**Status:** Active implementation choices within the approved architecture; revise only with compatibility/test evidence and without changing Architect-owned system boundaries.

1. **TypeScript monorepo:** one pnpm workspace with apps/api, apps/web, apps/android, packages/contracts and packages/domain. This gives Web and Android shared types while keeping platform adapters separate.
2. **Backend:** Fastify as one Node.js modular monolith. Module folders own their routes/services/repositories; no microservices or distributed queues.
3. **Web:** Next.js App Router, Node runtime for server-only functionality. Hosting is not tied to Vercel.
4. **Android:** Expo/React Native app with native capability modules only where necessary. Do not assume Web and Android have parity for file/quarantine operations.
5. **Database:** PostgreSQL with SQL migrations and the pg driver. Avoid an ORM until a real use case justifies it; keep repositories explicit and testable.
6. **Shared validation:** Zod schemas at network/config/provider boundaries. Contracts and domain packages build to dist before consuming apps typecheck or bundle.
7. **Password protection:** use the maintained @node-rs/argon2 library with its Argon2id defaults; do not implement a custom password-hashing primitive or persist plaintext passwords. The library is server-side only.
8. **Email canonicalization:** trim surrounding whitespace, lowercase only the domain, preserve local-part semantics and do not strip plus-tags or apply provider-specific aliases.
9. **Session approach:** random opaque session credentials; persist only token hashes in PostgreSQL; Web uses HttpOnly/Secure/SameSite cookies and Android uses platform secure storage. Session expiry follows the owner-approved 7-day inactivity and 30-day absolute limits.
10. **Test:** Vitest, Fastify inject, real PostgreSQL service, Playwright for browser-visible journeys, Expo export and Android instrumentation when available.
11. **No production integrations:** fake email delivery, fake analysis engine and fake URL provider in core CI. No Neon, Vercel, billing, production scanner or production URL provider.

Password acceptance rules, abuse-control thresholds, recovery challenge expiry/resend limits and deletion retention schedule remain owner-policy gates. Registration stays disabled in the runtime until a configured, owner-approved password policy is supplied. CI uses a test-only policy fixture and does not set production defaults.

These choices do not resolve any owner-gated product/security decisions. The implementation must remain disabled where required policies or platform guarantees have not been approved or evidenced.
