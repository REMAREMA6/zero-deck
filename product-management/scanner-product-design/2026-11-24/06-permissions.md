# Android permissions — scanner product design (2026-11-24)

Decision IDs (D#) resolve in 01-decisions-digest.md; screen IDs (S#) in 04-screens.md. Every
permission follows the same pattern: requested at the moment of use (never on first launch),
with a one-line honest explanation, and a stated fallback when denied (J1 posture).

## Posture: SAF-first

The MVP scans files the user picks (S3). Using the Storage Access Framework picker, broad
storage permissions can be avoided entirely: the app receives per-file grants, takes
persistable URI permissions for files the user chooses so quarantine/restore stays possible
(D4, D5), and reads/write only what was granted.

This differs from Hypatia's route — upstream documents MANAGE_EXTERNAL_STORAGE (recon §5.4) for
whole-device scanning and deletion. That route fits an F-Droid app scanning everything; ours is
picker-based in the MVP, which is both more private and Play-policy-safer. Whole-device scanning
would reopen this decision and is **flagged as an owner decision**, not silently chosen.

## Permissions requested in the MVP

| Permission | Why we need it | What we tell the user (one line) | If denied | Notes |
|---|---|---|---|---|
| INTERNET | Signature-pack updates (GPG-verified, D9); link verdicts via our backend (D10) | "Used to update threat signatures and check links. Files never leave your phone." | Scanning still works offline for already-loaded packs; link checks show Could not decide; pack updates fail explicitly (J12) | Granted at install, no runtime prompt |
| READ_MEDIA_FILES (Android 13+; legacy READ_EXTERNAL_STORAGE below 13) | Only if the user picks media files via the system picker flow that requires it | "Needed to read the files you pick for scanning. Nothing is read without you choosing it." | SAF picker path still works; only non-media picking is affected | Scoped to the user's pick; never a bulk read |
| POST_NOTIFICATIONS (Android 13+) | Scan-complete and quarantine-event notifications (S11 toggle) | "Optional. Tells you when a scan finishes or something is quarantined." | Everything works; results are visible in-app | Off by default until the user enables it |
| Persistable URI grants (SAF, not a runtime permission) | Keep quarantine and restore working across restarts (D4, D5) | "To allow quarantine later, grant continued access to this file." | File still scans; quarantine unavailable and S5 says so | Requested per file at pick time (S3) |

## Permissions explicitly NOT requested in the MVP

| Permission | Why not | When it could return |
|---|---|---|---|
| MANAGE_EXTERNAL_STORAGE | Whole-device access contradicts the picker-based MVP and the privacy promise (D6); Play-policy sensitive | Only if the owner decides on whole-device scanning (flagged decision) |
| QUERY_ALL_PACKAGES | We scan files, not installed apps (Hypatia uses it for app scanning — recon §5.4); we don't | APK/app scanning, a later-release candidate — with its own disclosure |
| AccessibilityService | Hypatia's ambient link scanner pattern (recon §5.3) reads on-screen text; privacy-sensitive and D18 keeps MVP link input manual | Ambient link watching / browser-extension release (D8) |
| Location, contacts, camera, microphone, phone | No feature uses them; none will be requested | Never |

## Honesty surfaces

- **S1** states the promise: files never leave the phone (D6). **S6** states the URL flow
  truth: checked URLs go to our server and to Google Safe Browsing, not linked to the user
  (recon §6.1 — clientId identifies the app). **S11** repeats both in the same words.
- **Play Data Safety form** (launch-time artefact, noted for the owner): declare link-URL
  transmission to Google; declare scan records (hash, timestamp, verdict state) stored in the
  backend per D12; declare no collection of file content — consistent with the above.
- Every denied-permission state in the app degrades **with an explanation** — the app never
  silently loses a capability (J2/J9 edges).

## Open items for the owner

1. Whole-device scanning (would need MANAGE_EXTERNAL_STORAGE) — in or out of scope, ever.
2. Distribution channel (Play vs F-Droid) changes the permission-risk calculus for the
   flagged items above — tied to the engine Option A/B decision (D9).
3. Notification default (on at first quarantine event vs fully opt-in) — design says opt-in;
   override welcome.
