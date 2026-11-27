# Phase 1 — ZeroDeck screen inventory

**Engagement:** ZeroDeck product reverse engineering  
**Inventory date:** 2026-11-27  
**Reference repository:** https://github.com/lordwhitefire/Zerodek  
**Inspected revision:** 86908bff1aa1bbf85a231ba0d47b8fe9fff148c6  
**Status:** Complete for the 17-screen baseline. Screen 18 and additional routes are recorded separately.

## 1. Scope and evidence method

The reference repository combines written screen briefs, implementation handoffs, a Next.js preview application, and a separate Expo/React Native source handoff.

The project handoff calls the canonical reference a 17-screen set. The working product-decisions document numbers 18 planned screens: 12 Android-app screens and six admin-web screens. The first 17 are inventoried below; the document's separately numbered Screen 18 (System Health / Audit Logs) is recorded as an extension rather than silently omitted. The product-decisions document itself calls the screen count a planning estimate and says screens may be combined.

The 17-screen baseline is a scanner capability reference within ZeroDeck, not a definition of the whole startup. The owner clarified that ZeroDeck is the broader ethical-hacking and penetration-testing startup and that security scanning is one candidate service. The scanner document is a working draft; its MVP labels do not prove that the founder has selected this capability set as ZeroDeck's launch MVP.

Evidence classes:
- Design brief: intended screen structure/content, not runtime evidence.
- Reference image: a supplied visual asset matched to a screen.
- Source implementation: code present at the inspected revision, not proof of production behaviour.
- Preview route: a Next.js route rendering a Preview component, not proof of a production feature.
- Unknown: not established by inspected material.

No live ZeroDeck runtime was observed. The screen materials do not prove a functioning malware-scanning engine, URL reputation service, authentication backend, CMS, cloud integration, or durable persistence.

## 2. Canonical 17-screen baseline

The design descriptions below are based on upload/android_security_scanner_product_decisions.txt (Screens 1–17), the screen-specific handoffs under upload/, and corresponding source components. Status refers first to the scanner working draft; ZeroDeck MVP selection remains unconfirmed.

| ID | Screen / route | Visible content and controls | Interaction, state and responsive evidence | Scanner draft / ZeroDeck MVP classification |
|---|---|---|---|---|
| SCR-01 | Welcome / Onboarding — / | Shield/brand header and tagline; welcome heading; three benefit rows (file scan, link check, quarantine); Get started button; on-device privacy note; security illustration. | Two-column wide layout becomes one column on narrow screens. Get started is a navigation integration point. Permission requests should be contextual, not all at once. | Entry to the proposed scanner core flow. ZeroDeck selection: candidate; startup MVP not confirmed. |
| SCR-02 | Home Dashboard — /dashboard | Home sidebar; user menu; “Your security” heading; Scan a file and Check a link cards; latest scan result; recent activity table; Quarantine count/card; privacy note. | Sidebar on wide layouts; brand moves to a top bar on narrow layouts. Sample scan rows/statuses and URL input. Handoff explicitly says it does not perform real malware scans or URL reputation checks. | Core file/link entry points align with scanner MVP direction. Data is sample, not live. ZeroDeck selection: candidate. |
| SCR-03 | Choose a File — /file-selection | File list with names/types/sizes; selected-file state; Browse device; Scan selected file; back/cancel affordances. | Expo handoff opens native document picker; selecting a row changes local selection. Scan selected file only confirms selection and does not invoke a scanning engine. Access-error handling is required by the design brief. | Manual file selection is explicitly in scanner MVP direction. ZeroDeck selection: candidate. |
| SCR-04 | File Scan in Progress — /scan-progress | Selected file identity; progress indicator/animation; checking status and explanatory text; possible cancel/retry affordances. | Handoff identifies the progress animation as placeholder UI, not a real scan. Cancellation is valid only if safely supported. Failure/retry is a design requirement, not demonstrated runtime behaviour. | Manual scanning flow is scanner-MVP direction; real scan lifecycle is unimplemented/unverified. ZeroDeck selection: candidate. |
| SCR-05 | File Scan Result — /scan-result | Result card, status icon/text, file details, explanation and follow-up actions. | Product brief requires Threat found, Needs your review/Suspicious, No known threat found, and Could not decide. Quarantine success/failure must be reported truthfully. Handoff uses sample result data and callback integration points; delete asks for confirmation. | File results are in scanner MVP direction; detection and quarantine outcomes are not implemented/proven by UI handoff. ZeroDeck selection: candidate. |
| SCR-06 | Website / Link Checker — /website-link | URL input; Check link action; paste affordance; examples; back/home action; safety hint. | Paste reads device clipboard in Expo handoff. Input validation checks HTTP/HTTPS URL syntax only; it does not determine maliciousness. Exact paste/share-menu entry method remains open. | Website/link checking is explicitly in scanner MVP direction. Detection method and execution location remain open. ZeroDeck selection: candidate. |
| SCR-07 | Link Check Result — /link-scan-result | Submitted URL/domain; result status and explanation; check-another action; warning treatment for dangerous links. | Handoff says results are sample/demo data and no reputation check is performed. External-link icon intentionally warns rather than opening a flagged URL. Required outcomes: Likely dangerous, No known threat found, Could not decide. | Link checking is scanner-MVP direction; actual reputation source unresolved. ZeroDeck selection: candidate. |
| SCR-08 | Quarantine List — /quarantine | Quarantined-file list; labels/status/date; search; row menu; restore/delete actions; empty-state panel. | Search filters local list. Restore/delete only mutate an in-memory demo list. Screenshot layout shows two rows and an illustrative empty panel simultaneously. Sidebar hidden on narrow screens. | Core quarantine workflow is explicitly in scanner MVP direction; actual isolation/storage is not proven. ZeroDeck selection: candidate. |
| SCR-09 | Quarantine File Details / Actions — /quarantine-details | Selected file/status, metadata, quarantine reason/date, scan history, Scan and check / restore, Delete permanently. | Restore requires a fresh scan and user confirmation; delete requires confirmation. Handoff says scan/check and deletion are demo placeholders and recommends app-controlled storage/path validation. Desktop-first layout stacks on narrow screens. | Quarantine details align with scanner MVP direction; native isolation, restore, delete, integrity and audit behaviour unverified. ZeroDeck selection: candidate. |
| SCR-10 | Scan History — /scan-history | Chronological file/link records; search; All / Files / Links filters; result labels; date/time; clickable rows; empty state. | Search filters filename/link, type, result and description. Filters work locally. Row action calls openRecord/console logging until navigation is connected. Records are sample data; narrow layout stacks entries and hides sidebar. | Planned screen, but saved records, exact fields and retention are explicitly undecided. Scanner status: unresolved/partial. ZeroDeck MVP: unresolved. |
| SCR-11 | Settings / Privacy — /settings | Grouped privacy, notification, quarantine-retention and app-information controls; local-file privacy explanation; privacy links; quarantine management. | Expo handoff implements a local notification toggle; privacy links and quarantine-management action are visual placeholders. Retention choices and configurable controls remain open. | Privacy-by-default is stated design intent; full settings scope unresolved. ZeroDeck MVP: unresolved/partial. |
| SCR-12 | Help / About — /help-about | Search field; five suggested topics (file scanning, results, quarantine, link checking, privacy); topic cards; topic detail/modal; version and support contact. | Search filters title/description/answer; empty state specified; selecting a topic opens an in-screen detail panel/modal. Brief says not to claim a connected knowledge base. Support details depend on configuration. | Candidate support content; CMS/content source and support operations unresolved. ZeroDeck MVP: unresolved. |
| SCR-13 | Admin Login — /admin-sign-in | Desktop two-panel layout; brand/portal introduction and feature rows; email/username and password fields; password visibility toggle; forgot-password link; Sign in button; authorised-staff notice. | Panels stack on narrow screens. Required-field validation and password visibility are specified. Authentication/password recovery are callback integration points; no backend authentication is provided. | User accounts/sign-in are open decisions in scanner product document. Scanner status: unresolved/conditional. ZeroDeck MVP: unresolved. |
| SCR-14 | Admin Dashboard — /admin-dashboard | Admin sidebar/topbar; date-range dropdown; summary metrics; recent activity; service-status panel; alerts. Current source additionally shows Real-Time Protection and Privacy Audit tiles. | Date dropdown changes its label only; metrics/activity/statuses are sample data. Activity rows show local feedback. Handoff says real scanning, threat detection, authentication, service-health checks and audit logging are not implemented. | Planned admin view, but live metrics/admin operations are not established as MVP requirements. Scanner status: unresolved. ZeroDeck MVP: unresolved. |
| SCR-15 | User Management — /user-management | Searchable user table; account status/role; filters; row action menu; user detail/disable/enable confirmation; export affordance. | Search/status filtering are local. User rows/audit records are sample data; export only shows a notice. Backend persistence is not connected. Design brief says remove/defer if MVP has no user accounts. | Conditional on unresolved account decision. Scanner status: open/conditional. ZeroDeck MVP: unresolved. |
| SCR-16 | Threat Information Management — /threat-information | Admin table for domain/IP/hash indicators; type/status labels; source and added/updated dates; search/type/status filters; Add Indicator form; recent activity; pagination. | Source component uses local sample arrays/state. It validates required value/type/source, checks duplicates locally, cycles Active/Pending/Blocked, confirms removal and paginates locally. Product brief says manual indicator management depends on detection design. | Conditional on detection architecture; not an established MVP requirement. Scanner status: open/conditional. ZeroDeck MVP: unresolved. |
| SCR-17 | Help Content Management — /help-content | Tabs for Articles, FAQs, Security Tips, Announcements; searchable content list; draft/published labels; New Article; title/body editor; formatting toolbar; preview and publish controls. | Source uses local item state; preview visibility is local; publish updates local state and displays an alert. No Sanity/CMS connection is demonstrated. Brief says use existing Sanity editor if configured rather than build a duplicate. | Conditional on CMS/content-management choice; not an established MVP requirement. Scanner status: open/conditional. ZeroDeck MVP: unresolved. |

### 2.1 Shared design conventions

The written design brief specifies:
- consistent shield/product header and shared design language;
- dark navy/charcoal surfaces, light content surfaces, blue primary accent;
- green for positive results, amber for caution, red for confirmed danger, always paired with text/icons;
- readable typography, high-contrast controls and clear touch targets;
- mobile-oriented Android layouts for user screens and responsive desktop-web layouts for admin screens;
- sidebar/topbar navigation for admin pages;
- loading, empty, error, permission and confirmation states where relevant;
- plain-language results; “No known threat found” must not be presented as a guarantee of safety;
- files remain on-device by default and are not silently uploaded;
- confirmation before destructive actions.

These are declared design requirements, not verified cross-screen runtime behaviour.

## 3. Numbered extension beyond the 17-screen baseline

| ID | Screen / route | Evidence and contents | Disposition |
|---|---|---|---|
| SCR-18 | System Health / Audit Logs — /system-health | upload/18.md and SystemHealthScreen.tsx describe service availability, recent errors, admin actions, searchable/filterable audit events, pagination and trend cards. Handoff says metric values and audit rows are sample data, filters/pagination are local, and trend graphics are decorative placeholders. | Explicitly numbered Screen 18 in product-decision document; not silently included in the 17-screen baseline. MVP status unresolved. |

## 4. Additional routes/components outside the numbered 18-screen design brief

| ID | Screen / route | Source evidence | Disposition |
|---|---|---|---|
| EXTRA-01 | Real-Time Protection — /real-time-protection | RealTimeProtectionScreen.tsx exposes download scanning, link/URL checking, email attachment scanning, removable-drive scanning, pause/resume, simulated event feed and clear-feed action. | Not in numbered 18-screen brief. Product-decision document explicitly defers automatic background download monitoring and broader event-driven protection to a later release. Treat as later candidate, not MVP scope. |
| EXTRA-02 | Privacy Audit — /privacy-audit | PrivacyAuditScreen.tsx lists Camera, Microphone, Location, Contacts, Files & folders and Notifications; includes run-audit, revoke-app and recommendation actions. | Not in numbered 18-screen brief. No approved MVP decision or matching screen specification found. Treat as unresolved candidate/outside current baseline. |

Admin Dashboard also links to these two additional routes; those links do not make them part of the original 17-screen design.

## 5. Reference-asset register

| Asset | Observed contents | Relevance / disposition |
|---|---|---|
| upload/IMG-20261031-WA0002.jpg | 1536×1024 desktop Security Scanner home/dashboard: left sidebar, Scan a file and Check a link cards, latest result, recent activity, quarantine card and privacy footer. | Matched to SCR-02 Home Dashboard. Only uploaded image clearly matching one of the numbered product screens. |
| public/logo.svg | Brand/logo asset in public directory. | Shared visual asset; exact use across routes should be verified in later source analysis. |
| upload/Screenshot_2026-10-31_16_50_42.png | Browser screenshot of a ChatGPT-like coding workspace with a failed preview page; not a ZeroDeck/Scanner screen. | Context/process screenshot; excluded from screen references. |
| upload/Screenshot_2026-11-05_14_34_12.png | Browser image viewer showing a dark “CyberGuard AI Agent” dashboard credited on-screen to Devpost; incident timeline, threat/system-health gauges, network traffic, alert statistics and top threats. | Possible external visual reference, but no inspected document maps it to a ZeroDeck screen. Not treated as canonical screen or product requirement. |
| upload/pasted_image_1793887067908.png | Kali Linux terminal in a local Zerodek project directory showing a failed npm remote-package install. | Development-context screenshot; excluded from screen references. |

**Asset coverage limitation:** the repository does not contain 17 separately identifiable screen images. Most screen evidence is textual design briefs and code handoffs. Do not claim pixel-level visual capture of all 17 screens from this asset set.

## 6. Route and implementation mapping

At the inspected revision, each canonical screen has a Next.js preview route. These route pages render named Preview components; they are not evidence that the route is a production implementation or that backend services are connected.

| Screen | Next.js route page | Preview component | Screen/source component or handoff |
|---|---|---|---|
| SCR-01 | src/app/page.tsx | src/components/welcome/WelcomePreview.tsx | src/components/welcome/SecurityScannerWelcomeScreen.tsx; upload/security-scanner-welcome-screen-spec.md; upload/security-scanner-welcome-screen-code.md; download/security-scanner-expo/SecurityScannerWelcomeScreen.tsx |
| SCR-02 | src/app/dashboard/page.tsx | src/components/dashboard/DashboardPreview.tsx | download/security-scanner-expo/SecurityScannerDashboard.tsx; upload/2.md |
| SCR-03 | src/app/file-selection/page.tsx | src/components/fileselection/FileSelectionPreview.tsx | src/components/fileselection/SecurityScannerFileSelectionScreen.tsx; download/security-scanner-expo/SecurityScannerFileSelectionScreen.tsx; upload/3.md |
| SCR-04 | src/app/scan-progress/page.tsx | src/components/scanprogress/ScanProgressPreview.tsx | src/components/scanprogress/SecurityScannerScanProgressScreen.tsx; download/security-scanner-expo/SecurityScannerScanProgressScreen.tsx; upload/4.md |
| SCR-05 | src/app/scan-result/page.tsx | src/components/scanresult/ResultPreview.tsx | src/components/scanresult/SecurityScannerResultScreen.tsx; download/security-scanner-expo/SecurityScannerResultScreen.tsx; upload/5.md |
| SCR-06 | src/app/website-link/page.tsx | src/components/websitelink/WebsiteLinkPreview.tsx | src/components/websitelink/WebsiteLinkScreen.tsx; download/security-scanner-expo/WebsiteLinkScreen.tsx; upload/6.md |
| SCR-07 | src/app/link-scan-result/page.tsx | src/components/linkscanresult/LinkResultPreview.tsx | src/components/linkscanresult/LinkScanResultScreen.tsx; download/security-scanner-expo/LinkScanResultScreen.tsx; upload/7.md |
| SCR-08 | src/app/quarantine/page.tsx | src/components/quarantine/QuarantinePreview.tsx | src/components/quarantine/QuarantineScreen.tsx; download/security-scanner-expo/QuarantineScreen.tsx; upload/8.md |
| SCR-09 | src/app/quarantine-details/page.tsx | src/components/quarantinedetails/QuarantineDetailsPreview.tsx | src/components/quarantinedetails/QuarantineDetailsScreen.tsx; download/security-scanner-expo/QuarantineDetailsScreen.tsx; upload/9.md |
| SCR-10 | src/app/scan-history/page.tsx | src/components/scanhistory/ScanHistoryPreview.tsx | src/components/scanhistory/ScanHistoryScreen.tsx; download/security-scanner-expo/ScanHistoryScreen.tsx; upload/10.md |
| SCR-11 | src/app/settings/page.tsx | src/components/settings/SettingsPreview.tsx | src/components/settings/SettingsScreen.tsx; download/security-scanner-expo/SettingsScreen.tsx; upload/11.md |
| SCR-12 | src/app/help-about/page.tsx | src/components/helpabout/HelpAboutPreview.tsx | src/components/helpabout/HelpAboutScreen.tsx; download/security-scanner-expo/HelpAboutScreen.tsx; upload/12.md |
| SCR-13 | src/app/admin-sign-in/page.tsx | src/components/adminsignin/AdminSignInPreview.tsx | src/components/adminsignin/AdminSignInScreen.tsx; download/security-scanner-expo/AdminSignInScreen.tsx; upload/13.md |
| SCR-14 | src/app/admin-dashboard/page.tsx | src/components/admindashboard/AdminDashboardPreview.tsx | src/components/admindashboard/AdminDashboardScreen.tsx; download/security-scanner-expo/AdminDashboardScreen.tsx; upload/14.md |
| SCR-15 | src/app/user-management/page.tsx | src/components/usermanagement/UserManagementPreview.tsx | src/components/usermanagement/UserManagementScreen.tsx; download/security-scanner-expo/UserManagementScreen.tsx; upload/15.md |
| SCR-16 | src/app/threat-information/page.tsx | src/components/threatinformation/ThreatInformationPreview.tsx | src/components/threatinformation/ThreatInformationScreen.tsx; download/security-scanner-expo/ThreatInformationScreen.tsx; Screen 16 brief in upload/android_security_scanner_product_decisions.txt |
| SCR-17 | src/app/help-content/page.tsx | src/components/helpcontent/HelpContentPreview.tsx | src/components/helpcontent/HelpContentScreen.tsx; download/security-scanner-expo/HelpContentScreen.tsx; Screen 17 brief in upload/android_security_scanner_product_decisions.txt |
| SCR-18 | src/app/system-health/page.tsx | src/components/systemhealth/SystemHealthPreview.tsx | src/components/systemhealth/SystemHealthScreen.tsx; download/security-scanner-expo/SystemHealthScreen.tsx; upload/18.md |

Additional route mappings:
- EXTRA-01: src/app/real-time-protection/page.tsx → src/components/realtimeprotection/RealTimeProtectionPreview.tsx → RealTimeProtectionScreen.tsx.
- EXTRA-02: src/app/privacy-audit/page.tsx → src/components/privacyaudit/PrivacyAuditPreview.tsx → PrivacyAuditScreen.tsx.

### Route-count correction

The preliminary repository audit reported 19 route page files. The complete tree contains **20** Next.js page files when src/app/page.tsx is included: 19 named subroutes plus the root welcome route. The earlier count of 19 corresponds to the named subroutes excluding the root page. This inventory corrects that counting ambiguity. The tree contains 19 named Screen.tsx components; the dashboard is represented by DashboardPreview plus the separate Expo SecurityScannerDashboard.tsx handoff rather than a same-named src/components/dashboard/*Screen.tsx file.

## 7. Product scope classification and unresolved boundaries

The scanner working product-decisions document is marked a working draft. It declares manual file scanning, core quarantine and website/link checking as MVP direction; automatic background download monitoring, browser-extension scanning and broader event-driven protection are later-release direction. It also leaves open the scanning engine, link-detection method, supported file types/sizes, failure handling, cloud options, accounts/sign-in, backend records/retention and several settings.

For the 17 baseline screens:
- SCR-01 through SCR-09 support the draft scanner's core manual file/link/quarantine MVP workflows.
- SCR-10 through SCR-12 are in the planned screen set, but persistence, settings scope and help-content operations are not fully decided.
- SCR-13 through SCR-17 are planned admin screens with explicit dependencies on unresolved account, detection-management and CMS decisions.
- None of these classifications confirms that the ZeroDeck founder has selected Security Scanning as the startup's launch MVP. The owner has clarified only that it is one candidate service area within ZeroDeck.

The next phase must establish ZeroDeck's actual declared MVP boundary rather than assume the entire scanner screen set is in scope.

## 8. Phase 1 exit assessment

**Phase 1 exit gate: satisfied for the 17-screen baseline.**

- [x] All 17 baseline screens are individually identified and assigned stable evidence IDs.
- [x] Each screen is mapped to its route, preview component and available screen/code handoff.
- [x] Visible content, controls, stated interactions, sample/local states and responsive clues are recorded at the level supported by source material.
- [x] Missing screen-specific briefs for Screens 16 and 17 are identified; the product-decision descriptions and source components are used, with the limitation retained.
- [x] Screen 18 and two extra routes are recorded separately rather than silently merged into the 17-screen baseline.
- [x] Uploaded image assets are inspected and classified; unrelated/context images are excluded from product evidence.
- [x] Scanner-draft scope labels are kept separate from the unconfirmed ZeroDeck startup MVP decision.
- [x] No claim is made that the preview app is production-ready or that backend/runtime behaviour has been observed.

**Important limitation:** this is a complete inventory of the declared 17-screen baseline, not a complete reverse engineering of all software behaviour and not a claim that the entire ZeroDeck startup or its MVP has been specified. Those are later phases.
