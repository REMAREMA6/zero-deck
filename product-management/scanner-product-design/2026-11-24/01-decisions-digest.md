# Decisions digest — scanner product design (2026-11-24)

Every binding decision the screen designs must obey, each with its source. The screen designs
(04-screens.md) cite these IDs (D#). Nothing here is invented: each item paraphrases a recorded
source, and confidence statuses carry over from the RE record.

## Source note (honesty)

- D1–D8 come from the owner's design decisions document. That document's standalone file is **not
  present in this workspace**; its binding content is recorded in the RE engagement's decision
  report §2.1 and §10 (`download/security-scanner-oss-recon.docx`), which was written directly
  against it. If the original document is re-shared, this digest should be checked against it
  line by line.
- D9–D15, D17 are RE-side facts from the engagement record
  (`re/scanner-prior-art/2026-11-24/report.md` + `analysis.md`), confidence-graded:
  engine mechanics **confirmed**; speed/RAM claims, GSB quota, per-feed commercial rights
  **not proven** (flagged, never assumed).
- D16 is this workspace's own CIRCLES recommendation (`product-management/circles-2026-11-24.md`).

## The decisions

- **D1 — Platform.** Android app built with Expo + React Native (development build, so Kotlin
  native modules are available), paired with an admin web panel. Binds: every screen is a RN
  screen; the scan pipeline lives in a native module, not JS. Source: recon §2.1, §10.

- **D2 — Eighteen screens, already specified and prototyped.** welcome/onboarding, home
  dashboard, file selection, scan progress, scan result, website-link checker, link scan result,
  quarantine list, quarantine details, scan history, settings, help; admin sign-in, admin
  dashboard, user management, threat-information management, help content management, audit logs.
  Binds: the design fills states and wiring into these screens — no new screens invented; any
  structural change is flagged, not silent. Source: recon §2.1.

- **D3 — Four-verdict set, fixed.** Threat found / Needs your review / No known threat found /
  Could not decide. Binds: every scan surface ends in one of these four; no fifth "safe" state
  exists anywhere. Source: recon §2.1, §10.

- **D4 — Intelligent Hybrid Quarantine (IQH).** Confirmed malware is auto-quarantined; suspicious
  files are presented for review; clean files are untouched. Binds: the Threat found verdict on a
  file auto-moves the file; Needs your review never auto-moves. Source: recon §2.1.

- **D5 — Restore gate.** Restore from quarantine only after a fresh scan and explicit user
  confirmation. Binds: the restore flow is two-step by law, not by preference. Source: recon §2.1.

- **D6 — Privacy promise.** Files stay on the phone by default; no file content ever leaves the
  device; checked URLs are sent onward for verdicts and that is disclosed. Binds: copy on welcome,
  link checker, and settings; backend stores hash + verdict only. Source: recon §2.1, §9, §10.

- **D7 — Honest-results doctrine.** The app never claims a site or file is 100 percent safe, and
  always offers the Could not decide verdict. Binds: all verdict copy; "No known threat found" is
  never rendered as "safe"; a service failure is a verdict, not an error toast. Source: recon §2.1.

- **D8 — Release scope.** MVP: file scan, link check, quarantine, scan history, admin panel, help.
  Later release: real-time background protection and browser-extension scanning. Binds: no MVP
  screen may promise ambient protection; deferred features get deferred screens, marked as such.
  Source: recon §2.1, §2.3.

- **D9 — File detection (resolved by recon, engine decision open).** One-pass MD5/SHA-1/SHA-256
  hashing against GPG-verified Bloom-filter signature packs (the Hypatia pattern). Option A
  (reuse Hypatia code+packs, app becomes AGPL-3.0) vs Option B (self-built module + self-generated
  packs) is an open business decision — **the product design is identical under both**. Binds:
  evidence lines can name hash, algorithm, pack version; never engine internals. Sources: recon
  §5.1, §8, §10; RE report §2.

- **D10 — Link checking (resolved).** Backend Google Safe Browsing v4 Lookup API (MALWARE +
  SOCIAL_ENGINEERING, caching + rate limiting) plus an on-device domain Bloom filter as the
  offline pre-check. Binds: link verdicts have an offline and an online layer; disclosure copy
  required. Source: recon §6.1, §10.

- **D11 — Backend shape.** One small Next.js service, three endpoints: link verdicts, scan-record
  storage, threat-record management; admin panel in the same app; help content from Sanity.
  Binds: admin screens (S13–S18) design against these, nothing more. Source: recon §10.

- **D12 — Scan records.** Stored: file hash, timestamp, verdict state. Never: the file itself,
  user identity. Binds: history screen content and its honesty footer. Source: recon §10.

- **D13 — Pack policy.** Default packs ship (≈120 MB in-memory footprint); extended databases
  (≈8 GB RAM claimed by upstream — not proven) are opt-in only. Binds: settings screen pack
  controls. Source: recon §5.4; RE analysis §1 (likely).

- **D14 — Bloom false positives.** Occasional probabilistic false positives are expected;
  mitigation is a rescan flow plus a VirusTotal-style lookup hand-off in UI copy. Binds: the
  Needs your review verdict's actions. Source: recon §9; RE analysis §1 (likely).

- **D15 — Verdict-state implementation.** The four verdicts are a deliberate combination of:
  blocklist hit → Threat found / Needs your review (offline hit pending online check); no match →
  No known threat found; service failure/unreadable file → Could not decide. Binds: the verdict
  mapping table in 04-screens.md. Source: recon §10.

- **D16 — CIRCLES recommendation (this workspace, 2026-11-24).** Ship the MVP as the
  verdict-plus-containment loop: every verdict card carries evidence and a next action; quarantine
  is first-class; admin plane is minimum operational tooling (verdict log, threat-record sync
  status, pack freshness — analytics, user management, help-content management deferred to v1.1);
  help is embedded in verdict cards plus a minimal Sanity page; success metric = 14-day
  return-scan rate against a pre-set 25 percent target; a security-score widget is refused on
  principle. Status: recommendation, owner decision pending. Source:
  `product-management/circles-2026-11-24.md`.

- **D17 — Lab rule.** Real malware behaviour is tested only inside an isolated lab, never on a
  host. Binds: design may reference test malware only for QA planning, never ship samples; no
  in-app "test a threat" demo. Source: recon §11; RE scope (lab gate never opened).

- **D18 — MVP link input is manual.** The prototype's link screen takes user-entered URLs; the
  ambient link scanner pattern (AccessibilityService reading on-screen text, Hypatia's approach)
  is a later-release candidate and is privacy-sensitive. Binds: S6 is an input screen, not an
  ambient watcher; no AccessibilityService in MVP. Source: recon §5.3, §2.3; design inference —
  marked as such.
