# Phase 1 — Reference repository audit

**Engagement:** Zerodek product reverse engineering  
**Audit date:** 2026-11-27  
**Reference repository:** https://github.com/lordwhitefire/Zerodek  
**Branch:** `main`  
**Inspected tree revision:** `86908bff1aa1bbf85a231ba0d47b8fe9fff148c6`  
**Status:** Preliminary inventory; owner clarification received. Scanner materials are treated as one capability area within ZeroDeck, not as the startup definition or automatic MVP scope.

## 1. Repository-level facts

The GitHub repository metadata identifies the repository as `lordwhitefire/Zerodek`, description `guard`, and a fork of `felixik21/Zerodek`.

The recursive Git tree at the revision above contains 284 paths. The tracked material is not merely a set of mockup images. It includes:

- A Next.js application under `src/app/`.
- Screen components and preview components under `src/components/`.
- A Prisma schema and a SQLite database file.
- Build, development, extraction, and runtime scripts.
- A separate downloaded Expo/React Native project under `download/security-scanner-expo/`.
- Product decision and screen handoff documents under `upload/`.
- A gitlink/submodule entry named `Zerodek` at commit `cb481d5172a40ac7350a3e800fa4356dc4669a35`.

The repository root does not contain a `.gitmodules` file, so the target and URL for the gitlink could not be established from that file.

## 2. Screen and implementation inventory (counts from tree)

| Area | Count | Evidence |
|---|---:|---|
| Next.js route page files | 20 | `src/app/**/page.tsx` (19 named subroutes plus root welcome route) |
| Named screen component files | 19 | `src/components/**/*Screen.tsx` |
| Uploaded Markdown/text/screenshot assets | 22 | `upload/` |
| Script files | 13 | `scripts/` |
| Prisma schema files | 1 | `prisma/schema.prisma` |
| Downloaded Expo project files | 31 | `download/security-scanner-expo/` |

The complete tree contains 20 Next.js page files: the root welcome page plus 19 named subroutes. The 19 named Screen.tsx component files cover admin dashboard, admin sign-in, file selection, help/about, help content, link scan result, privacy audit, quarantine, quarantine details, real-time protection, scan history, scan progress, scan result, settings, system health, threat information, user management, website link, and welcome. Dashboard is represented by DashboardPreview and a separate Expo SecurityScannerDashboard handoff. There are 20 Preview components. The canonical first 17 numbered screens and their mapping are detailed in SCREEN-INVENTORY.md.

This is a path inventory only. It does not establish that every route is complete, that all controls work, or that the application is deployed.

## 3. Product identity and scope clarification

The repository's internal handoff materials repeatedly identify the product as **Security Scanner**, not Zerodek:

- `upload/android_security_scanner_product_decisions.txt` is titled “Android Security Scanner — Product Design Decisions” and explicitly says “The product is an Android security scanner.”
- `upload/security-scanner-welcome-screen-spec.md` describes a Security Scanner welcome screen and its file/link scanning, quarantine, and privacy messaging.
- `upload/10.md` is titled “Security Scanner — Scan History Screen.”
- `src/app/dashboard/page.tsx` sets page metadata to “Security Scanner — Dashboard.”
- `src/app/page.tsx` renders `WelcomePreview`, and the matching component is named `SecurityScannerWelcomeScreen`.
- The Expo project under `download/security-scanner-expo/` contains scanner-specific screens.

The product-decision document describes Expo + React Native, manual file scanning, link checking, quarantine, a deferred browser extension, and potential PostgreSQL/Supabase/Neon/Cloudflare/Sanity roles. Those are statements in that separate document; they are not yet adopted as Zerodek requirements.

The repository metadata description is only “guard”. The inspected evidence does not explain the relationship between the Security Scanner materials and the Zerodek product identity.

**Owner clarification and disposition (2026-11-27):** ZeroDeck is the startup: a tool/platform for ethical hacking and penetration testing. The founder is a penetration tester. Security scanning is one service/capability area ZeroDeck may offer, not the definition of the startup. The current materials are therefore relevant as candidate capability evidence. They do not, by themselves, establish the MVP boundary or prove that every depicted scanner capability is selected for launch. Continue inspecting them while classifying each capability as MVP, later candidate, or unresolved.

## 4. Technical baseline observed from source files

- `package.json` identifies a private Next.js project (version `0.2.1`) with React 19, TypeScript, Tailwind CSS 4, Prisma, and React Native Web-related dependencies.
- `prisma/schema.prisma` configures SQLite and defines only generic `User` and `Post` models.
- `src/app/page.tsx` renders `WelcomePreview`.
- `src/app/dashboard/page.tsx` renders `DashboardPreview`.
- A tracked `db/custom.db` file exists.
- A downloaded Expo source tree exists separately.

These observations indicate multiple implementation and handoff layers in one repository. They do not establish which layer is authoritative, whether the database is used by the app, or whether the source is production/runtime behaviour.

## 5. Evidence classification

| Evidence class | Current contents | Permitted claim |
|---|---|---|
| Repository metadata | Repo name, description, fork parent | Repository identity and fork relationship only |
| Source tree | Next.js routes/components, scripts, Prisma schema | Files and implementation structure exist at inspected revision |
| Product decision document | Android Security Scanner decisions | Declared intent of that document only |
| Screen handoff documents | Scanner-specific screen specs and code | Screen requirements/examples described in those documents |
| Downloaded Expo project | React Native screen files | A second implementation/handoff source exists |
| Runtime observations | None in this audit | No runtime claims yet |

## 6. Phase 1 disposition

Phase 1 is complete for the 17-screen baseline. The screen-by-screen inventory, evidence IDs, routes, Preview components, source handoffs, reference-asset dispositions, scanner-draft scope labels, and limitations are recorded in SCREEN-INVENTORY.md. Screen 18 and the two additional routes are separately inventoried. No live runtime behaviour or backend connectivity is claimed.

## 7. Sources inspected

- Repository metadata: https://api.github.com/repos/lordwhitefire/Zerodek
- Recursive tree at revision `86908bff1aa1bbf85a231ba0d47b8fe9fff148c6`
- `package.json`
- `prisma/schema.prisma`
- `src/app/page.tsx`
- `src/app/dashboard/page.tsx`
- `upload/android_security_scanner_product_decisions.txt`
- `upload/security-scanner-welcome-screen-spec.md`
- `upload/10.md`
- `upload/11.md`
- `upload/12.md`
- `upload/18.md`
- Gitlink commit `cb481d5172a40ac7350a3e800fa4356dc4669a35`



## 8. Product framing and scope clarification

See the owner clarification in `ENGAGEMENT-UNDERSTANDING.md`, section 11. The product is the broader ZeroDeck startup, not a standalone Android Security Scanner. This audit remains a repository-content audit: it does not establish that the current repository is the complete product vision, that all its features belong in the MVP, or that any implementation is runtime-verified.


## 9. Phase 1 inventory link

See [SCREEN-INVENTORY.md](SCREEN-INVENTORY.md) for the completed 17-screen baseline and separate records for Screen 18, Real-Time Protection, and Privacy Audit. The inventory also corrects the route-page count to 20 including the root welcome route.
