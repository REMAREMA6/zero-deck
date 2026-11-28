# Developer Technical Decisions

**Status:** Initial choices for the first implementation slice; revise only with compatibility/test evidence and without changing the Architect's system boundaries.

1. **TypeScript monorepo:** one pnpm workspace with apps/api, apps/web, apps/android, packages/contracts and packages/domain. This gives Web and Android shared types while keeping platform adapters separate.
2. **Backend:** Fastify as one Node.js modular monolith. Module folders own their routes/services/repositories; no microservices or distributed queues.
3. **Web:** Next.js App Router, Node runtime for server-only functionality. Hosting is not tied to Vercel.
4. **Android:** Expo/React Native app with native capability modules only where necessary. Do not assume Web and Android have parity for file/quarantine operations.
5. **Database:** PostgreSQL with SQL migrations and the pg driver. Avoid an ORM until a real use case justifies it; keep repositories explicit and testable.
6. **Shared validation:** Zod schemas at network/config/provider boundaries.
7. **Auth:** Argon2id password hashes; random opaque session credentials, only hashes stored in PostgreSQL; Web HttpOnly/Secure/SameSite cookies; Android secure storage. No third-party identity provider.
8. **Test:** Vitest, Fastify inject, real PostgreSQL service, Playwright for browser-visible journeys, Expo export and Android instrumentation when available.
9. **No production integrations:** fake email delivery, fake analysis engine, fake URL provider in core CI. No Neon, Vercel, billing, production scanner or production URL provider.

These choices do not resolve any owner-gated product/security decisions. The implementation must remain disabled where required policies or platform guarantees have not been approved or evidenced.
