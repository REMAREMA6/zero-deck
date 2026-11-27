# Phase 6 — MVP interface source review

**Date:** 2026-11-27  
**Reference repository:** `lordwhitefire/Zerodek`  
**Pinned revision:** `86908bff1aa1bbf85a231ba0d47b8fe9fff148c6`  
**Evidence class:** Source implementation / design handoff. This is not runtime observation.

## 1. MVP screen-to-scenario mapping

| MVP capability | Screen IDs | Screen names | Scenario linkage |
|---|---|---|---|
| Manual file analysis | SCR-02–SCR-05 | Dashboard; Choose a File; File Scan in Progress; File Scan Result | MVP-FILE-001, MVP-FILE-002 |
| Quarantine/disposition | SCR-05, SCR-08–SCR-09 | File Scan Result; Quarantine List; Quarantine File Details / Actions | MVP-FILE-002, MVP-QUAR-001–003 |
| Website/link checking | SCR-02, SCR-06–SCR-07 | Dashboard; Website / Link Checker; Link Check Result | MVP-LINK-001, MVP-LINK-002 |

SCR-01 Welcome/Onboarding is an entry design reference, but its inclusion in the exact three-capability MVP reproduction boundary is not established. Screens SCR-10 onward are not included as standalone MVP capabilities; see the Phase 1 screen inventory and owner scope decision. Do not promote them into scope.

## 2. Pinned source files inspected

| Screen | Source path at pinned revision | Blob SHA | Evidence limitation |
|---|---|---|---|
| SCR-02 Dashboard | `src/components/dashboard/DashboardPreview.tsx` | `aa310bdcfdb12a142b9fa858c108f77c0f0d167e` | Preview wrapper; dashboard sample data and preview state are not live service behaviour. |
| SCR-03 Choose a File | `download/security-scanner-expo/SecurityScannerFileSelectionScreen.tsx` | `e30879049dd89b057e462602f18e6c647cb195a6` | Demo file list; scan action explicitly reports that a scanning engine must be connected. |
| SCR-04 Scan Progress | `download/security-scanner-expo/SecurityScannerScanProgressScreen.tsx` | `9844d660cd398e3e1a2233017b0cc162fc01c01a` | Progress value/state is local placeholder behaviour; does not establish scan execution timing or cancellation semantics. |
| SCR-05 File Result | `download/security-scanner-expo/SecurityScannerResultScreen.tsx` | `86cf885ef870938beaf9c3072b2b3f9c3928c85b` | Sample result and callback/demo actions; not proof of detection or quarantine execution. |
| SCR-06 Website/Link Input | `download/security-scanner-expo/WebsiteLinkScreen.tsx` | `af48f69e4fb731151324c7cc8fb3c014b882fda9` | URL syntax validation/input UI only; no reputation provider execution. |
| SCR-07 Link Result | `download/security-scanner-expo/LinkScanResultScreen.tsx` | `9d696f5fc3cd42a6af939bfca0637cd0aef2e4e0` | Sample result and presentation; not evidence of a provider result. |
| SCR-08 Quarantine List | `download/security-scanner-expo/QuarantineScreen.tsx` | `f9f6a91b7d4769c6bc781a982d3794acd6098fb4` | In-memory demo list/search/actions; not proof of isolation or persistence. |
| SCR-09 Quarantine Details | `download/security-scanner-expo/QuarantineDetailsScreen.tsx` | `2c3e400fea07a5e388e991b2e8e67abb155015e4` | Callback/demo action flow; not proof of restore, scan, delete or integrity guarantees. |
| SCR-01 Welcome | `src/components/welcome/WelcomePreview.tsx` | `dc7bc36a7ebe4feeeb357f035070ad49c349a257` | Preview wrapper; entry-screen scope is not settled. |

The selected source files are pinned to the immutable reference revision above. Their hashes identify the exact artifacts reviewed; they do not prove that the code is deployed or is the canonical final UI.

## 3. Duplicate-path check

At the pinned revision, the following `src/components` and `download/security-scanner-expo` paths resolve to identical Git blob content:
- `src/components/fileselection/SecurityScannerFileSelectionScreen.tsx` and `download/security-scanner-expo/SecurityScannerFileSelectionScreen.tsx` — `e30879049dd89b057e462602f18e6c647cb195a6`.
- `src/components/quarantine/QuarantineScreen.tsx` and `download/security-scanner-expo/QuarantineScreen.tsx` — `f9f6a91b7d4769c6bc781a982d3794acd6098fb4`.
- `src/components/scanprogress/SecurityScannerScanProgressScreen.tsx` and `download/security-scanner-expo/SecurityScannerScanProgressScreen.tsx` — `9844d660cd398e3e1a2233017b0cc162fc01c01a`.
- `src/components/websitelink/WebsiteLinkScreen.tsx` and `download/security-scanner-expo/WebsiteLinkScreen.tsx` — `af48f69e4fb731151324c7cc8fb3c014b882fda9`.

This confirms duplicate file content for those four pairs only. It does not establish that every route, screen, or platform implementation is identical.

## 4. Source-level visual facts observed

The selected screen components contain concrete layout and presentation declarations that can support source-derived design rules. Examples include:
- Shared desktop shell: 280-unit sidebar width and 62-unit top bar height in the selected file-selection, scan-progress, quarantine-list and link-input sources.
- Shared page gutters differ by screen: file selection/scan progress use 44-unit desktop horizontal padding; quarantine list uses 36; link input uses 41. Mobile gutters also differ (15 or 16).
- The file-selection screen defines a centered 102-unit hero icon, 33-unit heading text, 66-unit tabs and 62-unit file rows.
- The scan-progress screen defines a 128-unit circular progress display, 504-unit minimum card height and a 9-unit horizontal progress track.
- The quarantine-list screen defines 82-unit file rows, a 295-unit search control, and a 274-unit minimum empty panel.
- The link-input screen defines a 55-unit input row, 45-unit primary action and screen-specific information/example spacing.

These are source-declared style values, not measured runtime geometry. They must retain the source platform/unit context and must not be misrepresented as CSS pixels or browser-computed values without a verified mapping.

## 5. Interface completeness finding

The Phase 5 Software Rules capture currently contains generic Interface semantic dimensions but does not yet encode a complete set of screen-specific source-derived visual rules. The Phase 1 inventory provides screen content/control descriptions and limited responsive clues, while the source files provide style declarations and local demo interactions. Neither provides a complete runtime interface observation.

Still required for faithful interface replication:
- Full source-level extraction of every relevant component's hierarchy, text, styles, assets, breakpoints/layout conditions and interaction states.
- An explicit canonical design-source decision if source artifacts conflict or differ in authority.
- Actual runtime hierarchy/computed presentation/geometry/accessibility evidence if a deployed target becomes available.
- Screen/state/viewport coverage, including empty, populated, selected, disabled, validation, loading, error, confirmation and narrow/wide layouts where applicable.
- Mapping every extracted screen/state rule to its scenario and evidence record.

**Conclusion:** MVP screen references are now linked to the scenario set and key source files are pinned, but the Interface facet remains incomplete and not replication-sufficient.
