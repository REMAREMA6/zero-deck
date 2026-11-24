# Screen designs — scanner product design (2026-11-24)

The eighteen screens are already fixed and prototyped (D2). This file specifies, for each: purpose,
entry points, elements, actions and results, states, verdict-state variations, and edge rules. It
fills states and wiring into the existing skeleton — no new screens. Screen IDs S1–S18 are cited by
03-user-journeys.md; decision IDs (D#) resolve in 01-decisions-digest.md. Component and colour
references (Card, chip, banner…) resolve in 05-design-system.md.

## The verdict contract (applies to S5 and S7)

Per D3 and D15, every scan ends in exactly one of four verdicts. The implementation layers per
scan type:

| Verdict | File scan means | Link scan means | Auto-behaviour (D4) |
|---|---|---|---|
| Threat found | Hash matched a signature pack (GPG-verified) | Safe Browsing match: MALWARE or SOCIAL_ENGINEERING | File: auto-quarantine. Link: none (user decides) |
| Needs your review | Probabilistic Bloom hit pending confirmation (D14) | Offline domain-blocklist hit while the online verdict is unreachable/pending | Never auto-quarantines |
| No known threat found | No hash matched any loaded pack | No offline hit and no online match | None; copy states "not proof of safety" (D7) |
| Could not decide | File unreadable, scan cancelled, internal error | Service unreachable, quota exhausted, timeout | None; reason shown (D7) |

Every verdict card carries: state band (colour + icon + title), one plain-language headline,
evidence lines (monospace, copyable), a "what this means" explanation, and actions with exactly
one primary. Full anatomy in 05-design-system.md.

---

## User screens (S1–S12)

### S1 — Welcome & Onboarding

- **Purpose:** state the promises before anything else happens (D6, D7).
- **Entry:** first launch only; returning users go straight to S2.
- **Elements:** brand mark; the three promises in plain words — files never leave this phone;
  verdicts show what the app knows and does not know; "Could not decide" is a real answer.
  Primary: Start. Secondary: How verdicts work (deep-link to S12 explainer).
- **Actions & results:** Start → S2. No permission wall here; permissions are requested at the
  moment of use with their one-line honest explanations (06-permissions.md).
- **States:** first-run (full flow); returning (skipped).
- **Edges:** none — this screen makes no requests and stores nothing.

### S2 — Home Dashboard

- **Purpose:** scan-first launchpad; the last verdict and containment status at a glance (D16).
- **Entry:** S1 Start; app relaunch.
- **Elements:** two primary actions — Scan a file (→ S3) and Check a link (→ S6); last-verdict
  banner (verdict chip, item, time; tap → detail in S5/S7 context or S10 record); quarantine chip
  (count locked; tap → S8); recent activity (last three records; tap → S10 detail); pack status
  footer (pack versions, last verified, update-available badge; tap → S11).
- **States:** empty (no scans yet — explains the two actions and that packs download on first
  use); content; packs-not-ready banner (download triggers on first scan, progress in S4).
- **Edges:** stale packs (update failed before) show age on the badge — never silent staleness
  (J12). Quarantine chip is hidden when count is zero, replaced by nothing — no empty-section
  padding.

### S3 — File Selection

- **Purpose:** pick what to scan, honestly and minimally (SAF-first posture, 06-permissions.md).
- **Entry:** S2 Scan a file.
- **Elements:** system picker (primary); scan queue list once files are chosen (multi-select
  allowed); per-item size shown; persistent-grant explainer line: "To allow quarantine later,
  grant continued access to this file" (why it matters: D4/D5 only work if the app can still
  reach the file).
- **Actions & results:** Add files → queue; Scan → S4. Remove from queue before scan.
- **States:** picker open; queue (0..n items); oversized-note (qualitative, no fabricated limits).
- **Edges:** unreadable/zero-byte file → stays in queue, will resolve as Could not decide (J5);
  grant denied → file still scans; quarantine will be unavailable for it and S5 will say so.

### S4 — Scan Progress

- **Purpose:** visible, honest progress; pack download is a first-class phase, not a hidden wait.
- **Entry:** S3 Scan.
- **Elements:** per-file rows (name, phase icon: hashing → checking → done); overall progress;
  Cancel. Copy: "Computing hashes and checking known-threat signature packs. Nothing is
  uploaded." If packs need download first: phase row "Updating signature packs (GPG-verified)"
  with its own progress and failure state.
- **Actions & results:** completion → S5 (one card per file). Cancel → completed files keep
  verdicts, cancelled files show "cancelled" (never Could not decide — a cancellation is not a
  service failure; it is recorded as cancelled in history).
- **States:** running (per-file phases); pack-downloading; done.
- **Edges:** GPG verification failure on a pack → download error, retry offered, scan cannot
  proceed into checking without verified packs (D9); timing copy stays qualitative (upstream
  numbers are not proven — 02-product-brief.md constraints).

### S5 — Scan Result (file)

- **Purpose:** the core screen — verdict + evidence + next action (D16).
- **Entry:** S4 completion; S2 last-verdict banner tap (re-renders last result read-only).
- **Elements:** one verdict card per scanned file; summary strip when batch (counts by verdict).
  Verdict-state variations:
  - **Threat found** — evidence: matched hash (prefix, expandable to full), algorithm, pack
    name/version. Banner: "Moved to quarantine" + Open quarantine (S8). Why was this moved? →
    S12. If containment failed: prominent persistent warning + manual guidance; never quiet.
  - **Needs your review** — evidence: which algorithm hit, "probabilistic filter hit, pending
    confirmation". Actions: Rescan now (primary) / Look up hash online (disclosed hand-off, D14)
    / Quarantine anyway / Keep. Rescan result replaces the card in place; both readings are
    recorded in history (J4).
  - **No known threat found** — headline: "No match in the loaded signature packs. This is not
    proof of safety." Collapsible: what was checked (pack names, versions, date). Actions: Scan
    another / Quarantine anyway / Done.
  - **Could not decide** — reason named (unreadable / internal error); Cancelled is NOT shown
    here (see S4). Actions: Retry (primary) / Why? → S12.
- **States:** content (n cards); empty (all cancelled) → history note only.
- **Edges:** verdict may not change after pack updates — the card shows the pack date so the
  user can judge freshness; re-scanning is always available.

### S6 — Website Link Checker

- **Purpose:** manual link input with the offline pre-check made visible (D10, D18).
- **Entry:** S2 Check a link; S5/S7 cross-links.
- **Elements:** URL input (paste button, clear button); offline pre-check chip — if the domain
  is on the offline blocklist, an amber inline note appears before submission ("This domain is
  on an offline blocklist — checking online…"); disclosure line, always visible: "URLs you check
  are sent to our server and to Google Safe Browsing for the verdict. They are not linked to
  you." (D6; clientId identifies the app — recon §6.1). Check button disabled while empty or
  malformed (inline validation, not a verdict).
- **Actions & results:** Check → S7.
- **States:** empty; input-valid; input-invalid (message names the problem); pre-check hit.
- **Edges:** no clipboard auto-reading without a paste action (privacy posture); no link history
  beyond the record the user created by checking.

### S7 — Link Scan Result

- **Purpose:** verdict + evidence + safe next step for links (D16).
- **Entry:** S6 Check; S10 record detail re-render.
- **Verdict-state variations:**
  - **Threat found** — evidence: threat type (MALWARE / SOCIAL_ENGINEERING), verdict freshness
    (cacheDuration, humanized), source (Google Safe Browsing). Actions: Back to safety
    (primary) / Open anyway (danger — double-confirm dialog with an honest warning; the choice
    is recorded in history) / Details.
  - **Needs your review** — evidence: which layer flagged (offline pack), online status and
    reason class (unreachable / quota / timeout). Actions: Retry online check (primary) / Open
    anyway (danger) / Copy URL. Stays Needs your review if left unresolved — no silent
    downgrade (J7).
  - **No known threat found** — headline includes "not proof of safety"; collapsible: offline
    pack date + online source. Actions: Open / Copy URL / Done.
  - **Could not decide** — reason named; actions: Retry (primary) / Copy URL.
- **States:** loading (distinct from all four verdicts — the user must never mistake a spinner
  for a verdict); content per verdict.
- **Edges:** quota exhaustion surfaces as its own reason class (admin sees it on S14); the
  offline-hit-then-online-clean case explains both readings rather than showing only the last.

### S8 — Quarantine List

- **Purpose:** containment is first-class and visible (D4, D16).
- **Entry:** S2 quarantine chip; S5 Open quarantine.
- **Elements:** count header; per-item rows: name, original location, quarantine date, verdict
  chip; encrypted-at-rest notice: "Items are encrypted and locked inside the app's private
  storage." Empty state: "Nothing is quarantined. If something lands here, it stays locked until
  you decide."
- **Actions & results:** tap item → S9.
- **States:** empty; content.
- **Edges:** items whose original location vanished still list (restore will ask for a folder,
  J9); no bulk operations in MVP (deferred — 02-product-brief.md scope).

### S9 — Quarantine Details

- **Purpose:** evidence and the three honest options; the D5 gate made tangible.
- **Entry:** S8 tap.
- **Elements:** full evidence (hash, algorithm, verdict at quarantine time, pack name/version,
  original path, quarantined timestamp); actions: Keep locked (default emphasis), Restore,
  Delete permanently.
- **Actions & results (Restore, gated per D5):** runs a fresh rescan automatically; still
  Threat found → refused with reason and evidence; no longer detected → confirmation dialog
  ("Restore to <original location>? The file will be unlocked.") → restore; grant re-checked
  first, expired grant → re-grant flow. Whole sequence recorded in history (J9).
- **Actions & results (Delete permanently):** double-confirm naming the file and
  irreversibility; failure leaves the item locked with an explicit error.
- **States:** content; scanning-in-progress (rescan gate running); restore-blocked;
  restore-ready (confirmation dialog).
- **Edges:** nothing here ever offers "open the file in place" — the file stays encrypted until
  restored (D5, D6).

### S10 — Scan History

- **Purpose:** the accountability record (CIRCLES N3); the trust loop's memory.
- **Entry:** S2 History; S5/S7 links.
- **Elements:** chronological rows: type icon (file/link), name or host, verdict chip, date;
  filters (verdict, type); search by name/host; honesty footer always visible: "History stores
  hash, verdict and time — never file contents." (D12). Record detail: complete hash (copyable),
  algorithm, verdict state, pack versions at scan time, actions taken ("quarantined",
  "restored after rescan", "opened anyway" for links).
- **States:** empty ("No scans yet."); content.
- **Edges:** Clear history lives in S11 (with confirm) — never a destructive swipe here
  (accident-proofing); history shows cancelled scans as cancelled, preserving the true sequence.

### S11 — Settings

- **Purpose:** promises stay checkable; packs and disclosure managed (D13, D6).
- **Entry:** S2 Settings; pack-update badge.
- **Elements and sections:**
  - Signature packs: current versions, sizes, last verified, GPG verification state; Update now;
    extended packs opt-in with RAM warning (D13 — off by default).
  - Link checking: how verdicts work; the Google disclosure, worded exactly as S6 (D6).
  - Privacy: the three promises, same words as S1 — one vocabulary everywhere (D7).
  - History: Clear history (confirm; quarantined items unaffected).
  - Notifications: scan-complete and quarantine events on/off (06-permissions.md).
  - About: app version, licences and per-feed attribution (feeds per recon Table 3; licence
    notices depend on the A/B engine decision — D9).
- **States:** content; updating (progress); update-failed (explicit, retryable).
- **Edges:** no telemetry toggles — nothing to turn off because nothing is collected beyond
  D12; that absence is stated, not hidden.

### S12 — Help

- **Purpose:** plain language at the moment of fear (CIRCLES N5); D7 made readable.
- **Entry:** verdict-card links on S5/S7; S1 "How verdicts work"; S2 footer.
- **Elements:** topics: What the verdicts mean (all four); Why "No known threat found" is not
  "safe"; How quarantine works (including the rescan gate, D5); Why files never leave your
  phone; What Could not decide means; Report a problem. Content from Sanity (D11) with offline
  fallback cache — the four-verdict explainer must work with no network.
- **States:** content per topic (deep-linkable, pre-filtered by verdict context, J14);
  offline-fallback banner when network content is stale.
- **Edges:** no troubleshooting advice that requires uploading files anywhere — every suggestion
  must respect D6.

---

## Admin screens (S13–S18) — minimum operational tooling (D16)

The admin plane exists to keep the app's promises true after launch (CIRCLES N4). Analytics,
user management and help-content management are deferred to v1.1 (D8, D16); deferred screens
show their deferred status honestly rather than pretending.

### S13 — Admin Sign-in

- **Purpose:** operator gate. **Entry:** admin panel URL.
- **Elements:** credentials form; error states (wrong credentials / backend unreachable);
  no self-signup, no public hint that the panel exists beyond the URL.
- **Edges:** password-reset flow is an **open item for the owner** (no decision on record) —
  v1 ships without it and marks it.

### S14 — Admin Dashboard

- **Purpose:** verdict health, sync health, pack freshness, GSB usage — nothing else (D16).
- **Elements:**
  - Verdict log: recent verdicts (time, hash prefix or URL host, state, app version).
  - Threat-record sync status: per feed — last sync, record count, errors, last-good timestamp.
  - Signature-pack freshness: current published versions vs what the app fleet last fetched.
  - GSB usage indicator: daily usage against the configured limit (figure **not proven** —
    recon §6.1; indicator ships, limit configured when the Cloud Console number is confirmed).
- **States:** content; sync-error highlighting; empty (no traffic yet).
- **Edges:** no user-level data anywhere — aggregate states only (D6, D12); no charts for
  decoration.

### S15 — User Management (deferred)

- **Status:** deferred to v1.1 (D16). Screen exists in the prototype; v1 renders the deferred
  notice plus, if the backend auth requires user records, a read-only list. No edit actions.

### S16 — Threat Information Management

- **Purpose:** the threat records the verdicts lean on (D11); licence visibility per feed.
- **Elements:** records table (indicator, type: hash/domain, source feed, added date, mapping
  state); manual add / edit / deprecate; per-feed sync status and errors; per-feed attribution
  and licence note (terms from recon Table 4 — ESET, ThreatView, ThreatFox, MalwareBazaar,
  CyberCure, SaneSecurity, DCG; commercial-use caveats displayed, not buried).
- **Edges:** deprecating a record does not rewrite history — past verdicts keep the record they
  were made with; sync failures are named per feed.

### S17 — Help Content Management (deferred)

- **Status:** deferred to v1.1 for management tooling (D16); the Sanity content itself ships
  minimal in v1 (embedded help per S12). Screen renders the deferred notice.

### S18 — Audit Logs

- **Purpose:** who did what to the system the verdicts depend on.
- **Elements:** admin action log (actor, action, target, time); verdict-record changes;
  retention policy note (**retention length is an open item for the owner**).
- **Edges:** log entries are append-only; export is deferred (v1.1).

---

## Screen map (one glance)

| ID | Screen | Journeys | Verdict states shown |
|---|---|---|---|
| S1 | Welcome & onboarding | J1 | none (promise copy) |
| S2 | Home dashboard | all | last verdict (any of four, read-only) |
| S3 | File selection | J2–J5 | none |
| S4 | Scan progress | J2–J5 | none (phases only) |
| S5 | Scan result (file) | J2–J5 | all four, full card anatomy |
| S6 | Website link checker | J6–J8 | pre-check chip only |
| S7 | Link scan result | J6–J8 | all four, link flavour |
| S8 | Quarantine list | J3, J9, J10 | none (verdict chips per item) |
| S9 | Quarantine details | J9, J10 | rescan gate reuses verdict logic |
| S10 | Scan history | J11 | all four as chips |
| S11 | Settings | J12 | none (pack states) |
| S12 | Help | J14 | explainer for all four |
| S13 | Admin sign-in | J13 | none |
| S14 | Admin dashboard | J13 | verdict log (states as data) |
| S15 | User management | — | deferred notice (v1.1) |
| S16 | Threat information | J13 | none (records) |
| S17 | Help content mgmt | — | deferred notice (v1.1) |
| S18 | Audit logs | — | none (log rows) |

## Open items this design leaves for the owner

1. Engine Option A vs Option B (D9) — no screen impact, but About/licence copy depends on it.
2. GSB daily quota figure — S14's indicator needs the configured limit (recon §6.1: not proven).
3. Admin password-reset flow (S13) — no decision on record.
4. Audit-log retention length (S18) — no decision on record.
5. The original design decisions document is not in the workspace; this design follows its
   content as recorded in the recon report §2.1/§10. If re-shared, 01-decisions-digest.md should
   be checked against it line by line.
