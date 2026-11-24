# User journeys — scanner product design (2026-11-24)

Screen IDs (S1–S18) resolve in 04-screens.md; decision IDs (D#) in 01-decisions-digest.md.
Journeys are written from the primary cohort (everyday user) unless marked operator-side.

## J1 — First run and onboarding

Actor: new user, just installed. Trigger: first launch.

1. **S1 Welcome** — the three promises, in plain words: files never leave this phone (D6);
   verdicts show what the app knows and does not know (D7); "Could not decide" is a real answer,
   not a failure. Primary action: Start.
2. **S1 → S2** — no permission wall up front (D18 posture, 06-permissions.md): permissions are
   requested at the moment of use, each with its honest one-line explanation.
3. **S2 Home, empty state** — explains the two things the app does (scan a file, check a link)
   and that signature packs will download on first use.

Outcome: user lands on a usable home with no choices made for them.
Edges: returning users skip straight to S2 (no repeated onboarding). Pack download failure on
first run → home shows "signature packs not ready" banner; scan actions trigger the download
first (S4 shows that phase).

## J2 — Scan a file, no threat found

Actor: user holding a file from a group chat. Trigger: taps Scan a file.

1. **S2 Home** → Scan a file.
2. **S3 File selection** — system picker opens (SAF-first posture, 06-permissions.md); user picks
   one file. If quarantine should be possible later, the app asks for a persistent grant with its
   one-line explanation.
3. **S4 Scan progress** — one row, phases: hashing → checking packs. Copy: nothing is uploaded.
4. **S5 Scan result** — **No known threat found** (D15: no match). Card carries the honest line
   "not proof of safety", collapsible "what was checked" (pack names/versions/date), actions:
   Scan another / Quarantine anyway / Done.

Outcome: informed calm — the user knows exactly what was and was not checked (D7).
Edges: file unreadable → **Could not decide** card with reason and Retry (J5). Packs not ready →
download phase appears inside S4 before checking.

## J3 — Scan a file, threat found (the critical path)

Actor: user holding a malicious file (QA reference only — real testing is lab-only, D17).
Trigger: taps Scan a file.

1. **S2 → S3 → S4** as in J2.
2. **S5 Scan result** — **Threat found** (D15: pack hit). Evidence visible: matched hash prefix,
   algorithm, pack name/version. Auto-quarantine fires (D4): banner "Moved to quarantine" with
   Open quarantine action. No delete happens silently; nothing is renamed in place.
3. **S8 Quarantine list** — the item appears locked, encrypted at rest, original path recorded.
4. **S9 Quarantine details** — evidence and the three honest options: Keep locked / Restore
   (gated, J9) / Delete permanently (double-confirm, J10).

Outcome: threat contained in one flow; the user never holds a live file after a confirmed
verdict (N2 of the CIRCLES record).
Edges: quarantine write fails (storage full, grant revoked) → Threat found verdict still shows,
with a prominent warning that containment FAILED and manual guidance; that state must never be
quiet. Multiple threats in one batch → all auto-quarantined, list reflects count.

## J4 — Scan a file, needs your review (probabilistic hit)

Actor: user; a Bloom-filter probabilistic hit occurred (D14, expected occasionally).
Trigger: scan completes with pending confirmation.

1. **S5 Scan result** — **Needs your review** (D15: offline hit, not yet confirmed). Evidence:
   which algorithm hit, that it is a probabilistic filter hit. Actions: Rescan now / Look up
   hash online (VirusTotal-style hand-off, opens browser, disclosed) / Quarantine anyway / Keep.
2. Rescan → either **Threat found** (J3 continues) or **No known threat found** (J2 continues) —
   the card updates in place and the history records both readings.

Outcome: uncertainty is handed to the user with tools, not with silence (D7, D14).
Edges: repeated probabilistic hits across rescans → card suggests the online lookup and stays
honest that the app cannot resolve it alone.

## J5 — Scan a file, could not decide

Trigger: file unreadable, scan cancelled, or internal error.

1. **S5 Scan result** — **Could not decide** (D15: failure state is a verdict). Reason shown
   plainly: "This file could not be read" / "The scan was cancelled" / "Something went wrong on
   this device". Action: Retry; secondary: Why? → S12 topic.

Outcome: no guessing in either direction (D7).
Edges: error details stay on-device; nothing about the file is reported upward (D6, D12).

## J6 — Check a link, dangerous

Actor: user pasting a URL from a message. Trigger: taps Check a link.

1. **S6 Link checker** — paste URL. Offline pre-check (D10) runs instantly: if the domain is on
   the offline blocklist, an amber inline note appears before submission.
2. **S7 Link result** — **Threat found**: Google Safe Browsing match (D10), threat type named
   (malware or phishing), verdict freshness noted (cacheDuration). Actions: Back to safety
   (primary) / Open anyway (danger, double-confirm with an honest warning) / Details.
3. If opened anyway → device browser; the app records the choice in history (accountability
   without nagging).

Outcome: warning before exposure, evidence, and a recorded decision.
Edges: URL malformed → inline validation, not a verdict. Disclosure line visible on S6 (D6:
URLs go to our server and to Google; never linked to the user's identity — clientId identifies
the app, recon §6.1).

## J7 — Check a link, offline hit but online check unreachable

Trigger: domain on offline blocklist; backend or Google unreachable (quota, timeout).

1. **S7 Link result** — **Needs your review** (D15: offline hit pending online confirmation).
   Evidence: which layer flagged it (offline pack), online status (unreachable + reason class).
   Actions: Retry online check / Open anyway (danger) / Copy URL.
2. If retries fail and the user leaves the screen: verdict stays Needs your review in history —
   it does **not** silently degrade to Could not decide.

Outcome: honest uncertainty, with the reason attached (D7).
Edges: quota exhaustion is a named reason class; the admin sees it on S14 (GSB usage indicator).

## J8 — Check a link, no threat found

Trigger: no offline hit; online verdict returns no match.

1. **S7 Link result** — **No known threat found** with the honest line "not proof of safety";
   collapsible: what was checked (offline pack date, online source). Actions: Open / Copy URL /
   Done.

Outcome: user proceeds knowingly; no manufactured reassurance (D7).

## J9 — Quarantine restore (the gated flow, D5)

Actor: user who quarantined a file and wants it back. Trigger: taps a quarantined item.

1. **S9 Quarantine details** — Restore begins. Step 1 is automatic: a fresh rescan runs now.
2. Fresh scan still says **Threat found** → restore is refused, with the reason and evidence;
   options stay Keep locked / Delete.
3. Fresh scan says **No known threat found** (pack updated, or the original hit was a false
   positive) → confirmation dialog: "Restore to <original location>? The file will be unlocked."
   Confirm → file restored to its original location; persistent grant re-checked first.
4. History records the whole sequence: original verdict, rescan verdict, restore.

Outcome: recovery without a blind lever (D5); false-positive recovery works (D14).
Edges: original location no longer exists → user picks a folder (SAF); grant expired → re-grant
flow with explanation.

## J10 — Quarantine delete permanently

Trigger: user chooses Delete permanently on S9.

1. Double-confirm dialog names the file and the irreversibility; no dark patterns, no tiny
   cancel button.
2. Confirm → encrypted item destroyed; history keeps the record (hash + verdicts), never the
   file (D12).

Outcome: decisive, honest cleanup.
Edges: delete failure (storage) → explicit error, item stays locked.

## J11 — History and evidence review

Actor: any user; also the power user's evidence view. Trigger: taps History on S2.

1. **S10 Scan history** — chronological records: type icon, name/host, verdict chip, date;
   filters by verdict and type; search by name or host.
2. Record detail — full evidence: complete hash, algorithm, verdict state, pack versions at scan
   time, actions taken (e.g. "quarantined", "restored after rescan").
3. Honesty footer, always visible: "History stores hash, verdict and time — never file contents"
   (D12).

Outcome: accountability the trust goal needs (CIRCLES N3); the audit trail survives even when
the app was wrong.

## J12 — Settings: packs and privacy

Trigger: taps Settings on S2, or the pack-update badge.

1. **S11 Settings** — Signature packs: versions, sizes, last verified, GPG state (D9); Update
   now; extended packs opt-in with the RAM warning (D13).
2. Privacy section recaps D6 in the same words the welcome screen used — one vocabulary
   everywhere.
3. History: clear history (confirm; quarantined items are unaffected).

Outcome: the honesty promises stay checkable, not just claimed.
Edges: update fails (mirror unreachable, GPG verification fails) → explicit state, no silent
stale packs (stale packs show their age on S2 and S11).

## J13 — Admin: sign-in and health check (operator-side)

Actor: the operator. Trigger: opens the admin web panel (S13).

1. **S13 Admin sign-in** — operator credentials; no self-signup.
2. **S14 Admin dashboard (minimum operational, D16)** — verdict log (recent verdicts by state),
   threat-record sync status per feed, signature-pack freshness (current vs published), GSB
   usage indicator (quota figure not proven — indicator ships, limit configured when confirmed).
3. **S16 Threat information** — records with per-feed attribution and licence notes; manual
   add/deprecate; sync errors visible.

Outcome: the operator can keep the app's promises true after launch (CIRCLES N4).
Edges: feed sync failure → named on S14 with last-good timestamp; deferred screens (S15 user
management, S17 help-content management) show their deferred status honestly (D8, D16).

## J14 — Help from a verdict card

Trigger: taps "Why?" or a verdict's help link.

1. **S12 Help** — topic opens pre-filtered to the verdict in hand: what it means, what it does
   not mean, what to do next. Same words as the card (D7).
2. Content from Sanity (D11) with an offline fallback cache; the four-verdict explainer works
   with no network.

Outcome: fear met with plain language at the moment it appears (CIRCLES N5).
