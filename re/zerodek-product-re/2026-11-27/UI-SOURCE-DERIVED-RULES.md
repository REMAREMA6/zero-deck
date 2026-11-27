# ZeroDeck UI Source-Derived Rules — Product-Intent Reference

**Record:** ZD-UI-SRC-001  
**Inspected repository:** lordwhitefire/Zerodek  
**Immutable revision:** 86908bff1aa1bbf85a231ba0d47b8fe9fff148c6  
**Inspection date:** 2026-11-27  
**Evidence class:** Source-derived rules about the inspected UI implementation, informed by product-intent screen materials  
**Purpose:** Preserve the UI implementation patterns already present in the owner's fork so they can inform the native React/TypeScript implementation of ZeroDeck.

## 1. Scope and evidence boundary

The owner clarified that lordwhitefire/Zerodek is a fork of Felix's repository used to access and retain limited product-intent material and screen/UI demonstrations. REMAREMA6/zero-deck is the actual ZeroDeck product being built.

This review extracts rules from the existing Expo/React Native screen source. It is not a runtime inspection. The source explicitly describes several screens and actions as demo/placeholder UI. No claim below establishes a functioning scanner, real quarantine service, backend, provider integration or production ZeroDeck behaviour.

The UI runtime-reverse-engineering work is excluded from Phase 7. The eventual runtime UI rules can be captured from the implemented REMAREMA6/zero-deck native app by the developer agent.

## 2. Source provenance

All paths below are from the pinned revision above.

| Source path | Blob SHA | Role |
|---|---|---|
| download/security-scanner-expo/README.md | 530502d638171944847c10f23312b95e78ead771 | Screen inventory, run notes and explicit demo/placeholder disclosures |
| download/security-scanner-expo/package.json | 416d2130ac3284614d5637fa3b57c35473e71bae | Expo, React Native and TypeScript dependency context |
| download/security-scanner-expo/SecurityScannerFileSelectionScreen.tsx | e30879049dd89b057e462602f18e6c647cb195a6 | File selection and document picker |
| download/security-scanner-expo/SecurityScannerScanProgressScreen.tsx | 9844d660cd398e3e1a2233017b0cc162fc01c01a | Progress and cancellation demo |
| download/security-scanner-expo/SecurityScannerResultScreen.tsx | 86cf885ef870938beaf9c3072b2b3f9c3928c85b | File result and action confirmations |
| download/security-scanner-expo/WebsiteLinkScreen.tsx | af48f69e4fb731151324c7cc8fb3c014b882fda9 | URL input and local validation |
| download/security-scanner-expo/LinkScanResultScreen.tsx | 9d696f5fc3cd42a6af939bfca0637cd0aef2e4e0 | Link result presentation and copy/open guard |
| download/security-scanner-expo/QuarantineScreen.tsx | f9f6a91b7d4769c6bc781a982d3794acd6098fb4 | Quarantine list and demo actions |
| download/security-scanner-expo/QuarantineDetailsScreen.tsx | 2c3e400fea07a5e388e991b2e8e67abb155015e4 | Quarantine detail and TODO service integration |

## 3. Extracted source-derived rules

### UI-SRC-001 — Screen components own local presentation state

- **Rule:** A screen component may own transient UI state for selection, input, validation visibility, progress display, cancellation display, search and clipboard feedback. Keep such state local unless the application shell needs to coordinate it across screens.
- **Evidence:** FileSelectionScreen uses local state for active tab, selected sample file, picked device file and message; WebsiteLinkScreen uses local URL, attempted and error state; LinkScanResultScreen uses local copied state.
- **Source:** SecurityScannerFileSelectionScreen.tsx (lines 92–100); WebsiteLinkScreen.tsx (lines 27–31); LinkScanResultScreen.tsx (lines 25–36).
- **Evidence class:** Source-derived.
- **Limit:** This is an implementation pattern, not a ZeroDeck-wide state-management requirement.

### UI-SRC-002 — Screen-to-shell transitions are expressed through optional callbacks

- **Rule:** Reusable screen components expose explicit callback props for navigation and workflow handoff rather than owning the complete application router.
- **Evidence:** File selection exposes onNavigate through its sidebar and scan-related handoff is presented separately; scan progress exposes onCancel, onBackHome and onScanComplete; website link checking exposes onBackHome and onCheckLink(url); result screens expose action callbacks.
- **Source:** SecurityScannerScanProgressScreen.tsx (lines 13–22); WebsiteLinkScreen.tsx (lines 15–19); SecurityScannerResultScreen.tsx (Props near lines 10–20).
- **Evidence class:** Source-derived.
- **Limit:** Optional callbacks can leave controls inert when the parent does not supply them. The app shell must wire every required transition.

### UI-SRC-003 — Device file selection uses the platform document picker and handles cancellation separately from failure

- **Rule:** When the user browses for a file, invoke the native document picker; treat user cancellation as a non-error outcome, store the selected asset only after a successful selection, and show a recoverable message when the picker throws.
- **Evidence:** getDocumentAsync is called with type '*/*' and copyToCacheDirectory true; canceled results do not set a file; successful results use the first asset; exceptions show a failure message.
- **Source:** SecurityScannerFileSelectionScreen.tsx (lines 80–90).
- **Evidence class:** Source-derived.
- **Limit:** The current wildcard accepts all file types at picker level; it does not establish the product's supported scan formats, size limits, persistence or file-access guarantees.

### UI-SRC-004 — A change of file category clears the previous selection

- **Rule:** When the user changes the file-list tab, reset both the selected sample-file ID and any previously picked device file, and clear the previous message so stale selection does not silently carry into the new category.
- **Evidence:** Tab press updates tab and clears selected, deviceFile and message; selecting a sample row clears deviceFile and message.
- **Source:** SecurityScannerFileSelectionScreen.tsx (lines 130–142).
- **Evidence class:** Source-derived.

### UI-SRC-005 — UI validation is a pre-submit check, not a security verdict

- **Rule:** Validate URL syntax locally before invoking the link-check callback; only accept HTTP/HTTPS schemes in this screen; display validation feedback and do not submit an invalid value.
- **Evidence:** isValidUrl parses with URL, accepts http: and https: and requires a hostname containing a dot; checkLink trims the value, sets attempted state, returns early on invalid input and invokes onCheckLink only for valid input.
- **Source:** WebsiteLinkScreen.tsx (lines 34–57).
- **Evidence class:** Source-derived.
- **Limit:** This check does not establish DNS/IP safety, redirect safety, SSRF protection, reputation, provider results or whether the URL is safe. The UI copy itself says checking cannot guarantee safety.

### UI-SRC-006 — Demo progress must not be represented as a real scan

- **Rule:** The current progress animation is demonstrative only and must not be reused as a real scanning contract. A production progress indicator must be driven by actual scanner state/events and completion must correspond to a real terminal result.
- **Evidence:** The source comment says “Demo animation only; replace with real scanner progress.” It starts at 48, increments by 2 every 350ms, and invokes onScanComplete when the displayed value reaches 100.
- **Source:** SecurityScannerScanProgressScreen.tsx (lines 32–46).
- **Evidence class:** Source-derived.
- **Explicit non-rule:** The 48% initial value, 2-point increment and 350ms interval are demo constants, not product requirements.

### UI-SRC-007 — Destructive file actions require confirmation

- **Rule:** Permanent deletion must present a destructive confirmation step and an explicit cancel option before invoking the destructive action.
- **Evidence:** File result and quarantine screens use Alert.alert with Cancel and destructive Delete permanently actions.
- **Source:** SecurityScannerResultScreen.tsx (lines 40–49); QuarantineScreen.tsx (lines 65–82); QuarantineDetailsScreen.tsx (lines 168–187).
- **Evidence class:** Source-derived product interaction pattern.
- **Limit:** The source's confirmation dialog does not prove that a real file is deleted or that deletion is secure/irreversible.

### UI-SRC-008 — Quarantine list actions are placeholders, not file disposition behaviour

- **Rule:** Treat current restore/delete menu interactions as presentation-only until connected to a real quarantine service; do not infer that a file was restored, deleted or removed from storage.
- **Evidence:** QuarantineScreen reports “Demo action” and says only the sample list changed and no real file was restored. QuarantineDetailsScreen contains TODO comments for the native quarantine/file service and scanner service.
- **Source:** QuarantineScreen.tsx (lines 60–80); QuarantineDetailsScreen.tsx (lines 168–200).
- **Evidence class:** Source-derived limitation.
- **Implementation implication:** Actual disposition rules must be established separately from a working implementation and verified against the selected platform's file-access semantics.

### UI-SRC-009 — Restoring a quarantined file is intended to be gated by a fresh scan

- **Rule:** The source expresses an intended restore guard: do not offer/complete restoration until the quarantined file has been rescanned and the result meets the product's defined safe policy.
- **Evidence:** The scanBeforeRestore comment says only offer restore after a real scan reports a result that the security policy considers safe; the current function only displays a placeholder alert.
- **Source:** QuarantineDetailsScreen.tsx (lines 190–200).
- **Evidence class:** Source-derived stated intent, not implemented behaviour.
- **Open property:** The acceptable result states, freshness requirement, scan failure handling and policy threshold are unspecified.

### UI-SRC-010 — A flagged link is not opened by the result screen's external-link control

- **Rule:** In the current result mockup, the external-link control for a flagged URL displays a caution alert instead of opening the destination. Preserve a warning/confirmation boundary if this interaction is carried forward.
- **Evidence:** The control's handler displays “This link was flagged as potentially dangerous. It has not been opened.”
- **Source:** LinkScanResultScreen.tsx (lines 118–124).
- **Evidence class:** Source-derived interaction intent.
- **Limit:** The default “Likely dangerous” verdict and sample URL are hard-coded display data, not a real link-check result.

### UI-SRC-011 — Responsive layout is breakpoint-driven, but thresholds are not yet unified

- **Rule:** The screen source adapts navigation/layout based on available window width. Do not assume one universal breakpoint from the current implementation.
- **Evidence:** File selection and scan progress use width >= 1000 for desktop layout; website link and link result use width >= 900; quarantine details uses width < 900 for compact layout.
- **Source:** SecurityScannerFileSelectionScreen.tsx (line 76); SecurityScannerScanProgressScreen.tsx (line 30); WebsiteLinkScreen.tsx (line 28); LinkScanResultScreen.tsx (line 28); QuarantineDetailsScreen.tsx (line 156).
- **Evidence class:** Source-derived.
- **Open property:** The intended canonical breakpoint and mobile/tablet/desktop behaviour need a product-level decision. Do not copy inconsistent thresholds blindly.

## 4. Explicit non-findings

The inspected screen source does not establish:

- Actual malware detection, file hashing, threat-feed matching or scan coverage.
- Actual quarantine storage, encryption, restore, secure deletion, retention or recovery.
- Actual URL reputation lookup, provider calls, API credentials, result freshness or quotas.
- Authentication, authorization, server persistence, audit logging or cross-device state.
- Production ZeroDeck runtime behaviour.
- Final native app architecture or a mandate to copy the exact Expo implementation.

The package manifest shows an Expo/React Native/TypeScript UI package with React 19 and Expo SDK dependencies. This is provenance/context only; the owner separately states the product implementation target is a native app using React and TypeScript. Software Rules itself remains stack-agnostic.

## 5. Relationship to Phase 7

These UI source-derived rules are separate from Phase 7 non-UI runtime investigation. Do not run the mockup repository to obtain UI runtime evidence. When the actual REMAREMA6/zero-deck app exists, the developer agent can observe and record its real UI runtime behaviour, then reconcile that evidence with these source-derived patterns and the approved screens.

## 6. Status

This is a bounded source review of the selected MVP-related UI screens, not a complete UI specification. The broader 17-screen inventory remains the scope reference; screens outside the three approved MVP capabilities are not promoted into MVP requirements by this review.
