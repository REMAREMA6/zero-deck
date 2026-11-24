# Product brief — Android Security Scanner (2026-11-24)

Companion files: 01-decisions-digest.md (binding decisions, cited as D#), 03-user-journeys.md,
04-screens.md, 05-design-system.md, 06-permissions.md. Decision IDs (D#) resolve in the digest.

## What the product is

An Android security scanner that gives an honest verdict about a suspicious file or link at the
moment of hesitation — without uploading the file anywhere. The user picks a file or pastes a URL;
the app answers with one of four verdicts (Threat found / Needs your review / No known threat
found / Could not decide), shows the evidence behind it, and offers the next action. When a file
is confirmed malicious, the app does not just announce it — it locks the file away (quarantine)
and can give it back only after a fresh scan and explicit confirmation. Built with Expo + React
Native (D1) on the on-device detection pipeline (D9) and backend link-verdict service (D10).

## The moment we design for

A file arrives in a chat, an email, or the Downloads folder. The user hesitates before opening
it. What exists today fails them: Play Protect gives opaque verdicts few people trust or
understand; online file scanners demand uploading the private file to a stranger's server; the
big antivirus brands are paid, noisy, and advertising-driven. Every current path costs either
privacy or trust. This product enters at that moment and must return a verdict in seconds,
on-device where possible, with the evidence visible and the next action ready.

## Who it is for

Primary cohort (from the CIRCLES work): the everyday Android user who is not a security
professional. They tolerate an honest "I don't know" only if it is explained; they are harmed by
unexplained uncertainty, and they are the group the honest-results doctrine protects. Secondary:
the power user who wants the evidence lines — served by visible hashes and pack details on every
verdict, without being the design target. The other side of the product: the operator, who gets
the admin plane as minimum operational tooling (D16), not as an analytics dashboard.

## Goals and success metric

- **Goal:** earn and keep user trust by giving an honest verdict with a safe next step. This is
  forced by D7 — a product whose differentiator is honesty succeeds only if verdicts are believed
  and actionable.
- **Success metric:** the 14-day return-scan rate — among users who complete a first scan, the
  share who run another scan or open their scan history within 14 days, against a **pre-set
  target of 25 percent** (chosen before launch so it cannot move after seeing data; a threshold,
  not a benchmark; recalibrated with the first cohort).
- **Guardrail metric:** zero states in the build that claim 100 percent safety — audited at UI
  review against the voice rules in 05-design-system.md.
- **Instrumentation** (aggregate, no PII, consistent with D12): `first_scan_completed`,
  `scan_completed(state)`, `history_opened`, `quarantine_action_taken`, `verdict_shown(state)`.

## Scope

| Layer | In the MVP (D8, D16) | Later release (D8) | Refused outright |
|---|---|---|---|
| File safety | Pick file → scan → verdict → quarantine | Real-time background protection; APK deep scan | Security-score / "protection level" widgets |
| Link safety | Paste URL → offline pre-check → online verdict | Browser-extension scanning; ambient link watching | Gamified streaks, social verdict sharing |
| Trust surface | Verdict cards with evidence; history as audit trail; embedded help | Full help-site build-out (v1.1) | Any "all clear" state, any manufactured reassurance |
| Operator side | Minimum admin: verdict log, threat-record sync, pack freshness (S13–S16, S18) | User management, dashboard analytics, help-content management (v1.1) | Sharing verdict data in a way that identifies a user |

## Constraints the design must respect

- Solo build; no malware lab exists (D17) — QA planning may reference test files only for an
  isolated lab, never the host.
- Engine licensing (Option A vs B, D9) is open; the design is engine-agnostic — evidence lines
  name hash/algorithm/pack, never engine internals.
- Google Safe Browsing daily quota: **not proven**; link volume and caching design must stay
  adjustable (backend rate limiting is in D10/D11).
- Per-feed commercial rights (ESET, abuse.ch, CyberCure, SaneSecurity): **not proven**; the
  threat-information screen carries per-feed licence notes so the operator sees the terms.
- Android 13+ scoped storage rules shape the quarantine store and file access posture
  (see 06-permissions.md).
- Hypatia performance/memory figures are upstream claims — **not proven**; UI copy stays
  qualitative ("usually seconds for common files"), never quoting numbers as facts.

## Architecture facts the screens sit on (D9–D12)

Device: Kotlin native module does one-pass hashing, Bloom-pack checks, GPG-verified pack
downloads, and owns the Keystore-encrypted quarantine store (SAF-managed, restore gated per D5).
Links: offline domain-Bloom pre-check, then backend verdict via Safe Browsing. Backend: one
Next.js app — link verdicts, scan records (hash, timestamp, verdict state — never the file),
threat records; admin panel in the same app; help content from Sanity. No file content leaves
the device, ever (D6).
