# ZeroDeck Platform and Integration Architecture Assessment

**Date:** 2026-11-27  
**Status:** Product-manager recommendation for owner review; not an approved implementation architecture  
**Scope:** Owner-approved MVP only — manual file security analysis, quarantine/file disposition, and website/link checking. Platforms: web + Android.  
**Audience:** Everyday non-technical users first. Technical users and businesses are later expansion audiences.

## 1. Executive recommendation

Build ZeroDeck as one product with two deliberately different clients:

- **Web:** account/product entry point, link checking, and user-selected file analysis only where a browser-compatible analysis path can be demonstrated. It must not claim it can quarantine or manage arbitrary files on the user's device.
- **Android:** the primary environment for file selection, manual file analysis and quarantine/disposition because Android exposes native document and app-private storage capabilities.

Use a **local-first file security model**:
- Do not upload suspicious user files to our backend, Sanity, Cloudinary, or a public media CDN in the first version.
- Keep quarantine artifacts in Android app-private internal storage.
- Add application-level authenticated encryption for quarantined content; protect encryption keys with Android Keystore-backed key management.
- Make retention, restore, deletion, app-data-clear and uninstall consequences explicit. App-private files are removed on uninstall; quarantine must never be marketed as permanent backup.
- A cloud scanning/upload feature is a separate future product decision requiring explicit consent, provider terms, data-flow disclosure, cost controls and a security review.

**Leading stack recommendation for evaluation:** Expo + React Native + TypeScript for Android; a separate React/Next.js web client; shared TypeScript domain contracts and validation; Supabase as the first backend candidate for authentication, Postgres and server-side functions. Keep private file storage out of the cloud in MVP. Do not add Neon, Sanity, Cloudinary, Redis, a separate worker fleet or a message broker unless a demonstrated requirement appears.

This is the smallest coherent starting point I currently recommend. It is not a claim that Expo alone supplies every native security capability; quarantine and key handling require native Android integration and device testing.

## 2. Security boundary: what goes where

| Data | Recommended location | Rationale / restrictions |
|---|---|---|
| Original user-selected file during Android analysis | Read from the user-granted document URI; stage only as needed in app-private storage | Respect Android's document-provider permissions; avoid broad filesystem access. |
| Quarantined file bytes | Android app-private internal storage, encrypted at application level | Other apps cannot ordinarily access internal app storage. Android documents internal storage as encrypted on Android 10+; application-level encryption adds a separate protection layer and explicit key lifecycle. |
| Encryption keys | Android Keystore-backed key protection; never store raw key material beside the file | Keystore can keep key material non-exportable and perform cryptographic operations in the device security boundary. |
| Scan metadata/results | Local device initially; send only minimal account/operational data if a later justified sync feature needs it | Avoid collecting file names, paths, hashes or verdict details by default without a clear purpose and retention policy. |
| Submitted URLs | Server-side link-check function only after both gates pass | URLs may contain private tokens, search terms or identifiers. Minimise logs and provider disclosure. |
| Account, Pro entitlement, owner activation state and quota counters | Backend database | These controls must be authoritative and enforced server-side, not trusted to a client toggle. |
| Marketing/help images and public product documents | Optional CMS/media service later | These are not user quarantine files and should have a separate data classification. |

### Important limits

- App-private storage is not a backup. Android app-specific files are removed when the app is uninstalled. Users must be told what happens to quarantined items if they uninstall, clear app data, lose access to the device or the key becomes unavailable.
- Encryption does not solve every threat: a compromised/unlocked device, malicious app running with the user's privileges, OS compromise, weak recovery design or an implementation bug can still expose data.
- A user-selected document URI does not grant unrestricted access to the whole filesystem. Permissions and provider behaviour can vary.
- A browser cannot silently inspect all local files or perform Android-style quarantine. The user must select a file, and the browser remains sandboxed.

## 3. Platform capability recommendation

| Capability | Web client | Android client |
|---|---|---|
| Website/link checking | Yes, after server verifies Pro + owner activation + usage limits | Yes, same server-enforced gates |
| Manual file analysis | Only selected files and only if a browser-compatible engine is validated; no silent/background scanning | Yes, selected files through Android document picker |
| Quarantine | No general device quarantine. At most, browser-local handling with clearly bounded semantics | Yes, app-private encrypted quarantine, subject to URI and storage constraints |
| Restore/delete | Cannot promise restoration/deletion of arbitrary original device files | Can manage the app's quarantined copy and perform supported disposition operations with confirmation |
| Background scanning | Not assumed | Not a first-MVP requirement; Android scheduling is OS-controlled and not continuous execution |
| Device-wide protection | No | Not promised; requires a separate permissions, platform and product assessment |

**Product implication:** same product identity and account, but not identical feature parity. Do not force web to imitate native capabilities it does not possess.

## 4. Stack and service choices

### Client applications

**Recommendation:** Expo + React Native + TypeScript for Android, with a separate React/Next.js web client.

Why:
- The user wants both web and Android.
- Expo supports Android and web, but shared UI does not erase browser/native capability differences.
- A separate web client gives better control over web routing, accessibility, SEO and browser-specific behaviour.
- Share domain types, API contracts, validation and non-platform business rules; do not force every screen or file operation into a single cross-platform UI abstraction.
- Use a small native Android module where required for secure file operations, streaming large files, encryption/key integration or robust quarantine semantics. Validate Expo config-plugin/development-build compatibility before committing.

Alternative: one Expo app for Android and web. This may reduce initial code duplication, but it should be chosen only if the web experience proves suitable. Do not sacrifice browser-specific product quality or native file controls merely to maximise shared UI.

### Backend, database and authentication

**Leading recommendation: Supabase, provisionally.**

Use only the parts needed:
- Supabase Auth for account identity if account-based Pro entitlement is required.
- Postgres for account entitlement, owner-controlled activation configuration, quota/budget accounting and minimal service records.
- Edge Functions or a small trusted server API for link-check orchestration and secret-bearing provider calls.

Why it leads over Neon + a separate API + separate auth:
- One integrated service can reduce initial integration and operational burden.
- Current published pricing lists a Free tier with 500 MB database per project, 50,000 monthly active users, 1 GB storage and 500,000 Edge Function invocations. It also states free projects may pause after inactivity and do not include automatic backups. Those limitations make it suitable for a prototype, not automatically suitable for a security product with paying users.
- Neon is a credible Postgres option, but it is only the database layer. Choosing it would still require separate authentication, API hosting and function execution. That may be worthwhile later if database-specific needs justify the added components.

**Security condition:** the client must never decide for itself that a user is Pro or that link checking is enabled. The trusted backend must verify:
1. authenticated principal;
2. active Pro entitlement;
3. owner-controlled activation switch;
4. per-user allowance, rate limit and global spend/budget controls.

If any required gate fails or cannot be verified, do not call the threat-intelligence provider. Do not put provider API keys in either client.

### Private object storage

**Recommendation: no cloud file bucket for MVP quarantine.**

Cloudflare R2 is a strong candidate if a later approved feature genuinely needs private object storage. Its published Standard pricing includes 10 GB-month storage, 1 million Class A operations and 10 million Class B operations in the free tier, with no internet egress charge. R2 buckets are private by default unless deliberately exposed; presigned URLs can grant time-limited access. But a cheap bucket is not automatically a safe quarantine architecture: access policy, object encryption, key custody, malware-safe processing, retention, deletion, audit and breach response still have to be designed.

Supabase Storage is also convenient for ordinary private application files, but I do not recommend storing suspicious files there merely because it is bundled with the database/auth platform.

### Sanity and Cloudinary

**Do not add either to the security-sensitive MVP.**
- Sanity is appropriate for managed public content such as marketing/help articles. Its asset CDN behaviour is not an appropriate default for private user quarantine artifacts.
- Cloudinary is appropriate for image/video transformation and delivery, not as a default malware-file vault or quarantine service.
- If product-managed help content becomes necessary later, evaluate Sanity then. Do not introduce a CMS just because the product has images or documents.

### Hosting and operations

Keep the first deployment shape small:
- Static web hosting for the web client.
- One trusted backend/function boundary for identity/entitlement and gated link checks.
- Managed Postgres/auth only if accounts and Pro entitlements are needed for the launch workflow.
- No dedicated queue, Redis, worker fleet or microservices for manual, user-initiated MVP operations unless file-analysis requirements prove they are necessary.
- Add error monitoring and privacy-safe operational alerts before public launch; never log file contents, secrets, raw access tokens or full sensitive URLs by default.

Hosting choice remains open pending region/latency, deployment, egress, cold-start, availability and total-cost comparison. A free tier is acceptable for a demo, not evidence of production readiness.

### Payments and Pro

Do not lock a payment processor into the product architecture yet. The entitlement model should be provider-neutral. Stripe's global availability page currently routes Nigeria through its extended network/Paystack rather than listing Nigeria as a standard direct Stripe account country. Therefore, payment-provider availability and merchant eligibility must be verified for the owner's actual business setup before choosing a billing integration.

For the first demo, Pro entitlement can be represented by a controlled test entitlement in the backend. Do not fake client-side Pro state or bypass the owner activation switch. Production billing is a later decision.

## 5. Recommended minimum architecture

1. **Android app:** Expo/React Native + TypeScript, with native Android support for file operations and Keystore-backed encryption where necessary.
2. **Web app:** React/Next.js, sharing typed contracts and domain logic with Android where useful.
3. **Backend:** Supabase Auth + Postgres + Edge Functions as the leading low-complexity candidate; compare against a small standalone API before final selection.
4. **File data:** local-only for MVP; encrypted Android app-private quarantine. No server upload of suspicious files.
5. **URL checks:** backend proxy; enforce Pro + owner activation + quota/budget before provider call; keep provider credentials server-side.
6. **Storage services:** no R2/Supabase Storage/Sanity/Cloudinary dependency for quarantine in MVP.
7. **Operations:** minimal monitoring, secret management, backups for backend records, and an incident/recovery plan. Free-tier backup gaps must be addressed before production use.

## 6. Main risks and required product rules

- **Quarantine recovery:** define whether the original is copied, moved or otherwise dispositioned; verify integrity before reporting success; preserve a recovery path for false positives.
- **Uninstall/data loss:** clearly warn that app-private quarantine is removed with app data/uninstall unless the user restores or exports the file first.
- **Large files:** stream rather than load entire files into memory; define maximum size, supported formats and archive limits before implementation.
- **Key loss:** define behaviour if Keystore keys become invalidated, device security changes, app data is restored to another device or the user migrates phones.
- **Malicious parsing:** isolate parsers and archive handling; do not execute suspicious files; treat file metadata and content as untrusted input.
- **URL privacy:** minimise URL logging and redact sensitive query parameters where feasible; disclose the external reputation provider before lookup.
- **Provider abuse/cost:** server-side rate limits, per-user quotas, global spend caps, alerts and a kill switch.
- **Permission failure:** distinguish denied, revoked, inaccessible, unsupported and provider-offline states. Never show a clean result when no scan occurred.
- **Web parity:** do not claim web quarantine or device-wide scanning.
- **Backend outage:** local file analysis/quarantine should remain independent of link-provider availability where the chosen engine permits it.

## 7. Decisions: recommendation versus owner authority

| Topic | Product-manager recommendation | Status |
|---|---|---|
| First target users | Everyday non-technical users | Owner-selected |
| Platforms | Web + Android, with different capability sets | Owner-selected |
| Suspicious file upload | No upload by default in MVP | Recommended; owner review |
| Android quarantine | Encrypted app-private internal storage, Keystore-backed key protection | Recommended; requires technical validation |
| Cloud quarantine | Exclude from MVP | Recommended |
| Client stack | Expo/React Native Android + separate React/Next.js web; shared TypeScript contracts | Leading recommendation; not final |
| Backend | Supabase Auth + Postgres + Edge Functions | Leading candidate; not final |
| Database alternative | Neon only if a separate backend/auth stack is justified | Alternative |
| Object storage | None for user files in MVP; consider private R2 only for a future justified use | Recommended |
| Sanity / Cloudinary | Defer | Recommended |
| Payment processor | Defer selection; keep Pro entitlement provider-neutral | Recommended |
| Background scanning | Not in MVP | Not assumed or approved |

## 8. Work still required before architecture approval

- Validate exact Expo/React Native native-module path for streaming document access, encryption and quarantine on supported Android versions.
- Prototype a complete file lifecycle: select → inspect → quarantine → verify integrity → restore → delete → interruption recovery.
- Compare local detection engines, signature-update distribution, licences, file coverage, false positives/negatives and resource use. The storage recommendation does not settle the detection engine.
- Test browser file analysis feasibility and define the exact web MVP capability boundary.
- Compare Supabase against a minimal standalone API + Neon using current regional availability, limits, backup/recovery, security features and real projected cost.
- Verify the chosen hosting region and latency for users in the initial launch market.
- Verify payment-provider onboarding and settlement eligibility for the actual business entity before implementing paid subscriptions.
- Define retention, backup, telemetry, privacy notice, deletion and incident-response rules.
- Conduct device testing, including low storage, revoked URI permission, app kill, crash, reboot, key invalidation, app-data clear and uninstall.

## 9. Sources

Platform:
- Android app-specific storage: https://developer.android.com/training/data-storage/app-specific
- Android Keystore: https://developer.android.com/privacy-and-security/keystore
- Android Storage Access Framework: https://developer.android.com/training/data-storage/shared/documents-files
- Expo DocumentPicker: https://docs.expo.dev/versions/latest/sdk/document-picker/
- Expo FileSystem: https://docs.expo.dev/versions/latest/sdk/filesystem/
- Expo web workflow: https://docs.expo.dev/workflow/web/
- Android background work constraints: https://developer.android.com/develop/background-work/background-tasks/persistent

Provider and pricing:
- Supabase pricing: https://supabase.com/pricing
- Neon pricing: https://neon.com/pricing
- Cloudflare R2 pricing: https://developers.cloudflare.com/r2/pricing/
- Cloudflare R2 public/private bucket behaviour: https://developers.cloudflare.com/r2/buckets/public-buckets/
- Sanity assets: https://www.sanity.io/docs/content-lake/assets
- Cloudinary image delivery: https://cloudinary.com/documentation/image_delivery_options
- Stripe global availability: https://stripe.com/global

**Evidence note:** Provider plan limits and pricing can change. Recheck before procurement. A vendor's published security features do not replace a ZeroDeck threat model, implementation review or testing.
