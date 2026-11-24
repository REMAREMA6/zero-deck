# Design system — scanner product design (2026-11-24)

Companion files: decision IDs (D#) resolve in 01-decisions-digest.md; screen IDs (S#) in
04-screens.md. This file defines the visual and verbal language the eighteen screens share.

## Principles

1. **Honesty made visible.** Verdict colours are unambiguous and never celebratory; the clean
   verdict is calm, not triumphant (D7).
2. **Calm security.** No fear imagery, no exclamation marks in verdict states, no skull icons.
   The app informs; it does not alarm or soothe artificially.
3. **Evidence on the surface.** Hashes, pack versions and sources are first-class UI content,
   not buried debug detail (D9, D16).
4. **One vocabulary.** The same promise is worded identically on S1, S6, S11 and S12 (D6, D7).

## Colour

Neutrals and brand:

| Token | Hex | Use |
|---|---|---|
| background | #FFFFFF | screen background |
| surface | #F6F7F9 | cards, rows |
| divider | #E3E6EA | hairlines |
| text-primary | #16181D | body and titles |
| text-secondary | #5A6472 | meta, captions |
| brand-primary | #17324D | primary buttons, links, active states |
| brand-pressed | #122538 | pressed state |

Verdict colours (the semantic core — every pair listed is used as text-on-surface-tint):

| Verdict | Text/accent | Surface tint | Icon |
|---|---|---|---|
| Threat found | #B3261E | #FBEDED | filled alert-shield |
| Needs your review | #9A6A00 | #FFF4E0 | question-shield |
| No known threat found | #1E6B45 | #E9F5EF | outline check-shield (never filled-confetti) |
| Could not decide | #44546A | #EEF1F5 | dashed/question mark |

Rules: verdict is conveyed by colour **+ icon + text**, never colour alone (accessibility).
"No known threat found" uses a muted green — darker text, no bright success green, no
celebration motion. Danger actions (Delete permanently, Open anyway) use #8C1D18 filled buttons,
separated from other actions. All text pairs meet WCAG AA (≥ 4.5:1 body, ≥ 3:1 large).

## Typography

System stack (Roboto on Android; SF on any future iOS build). Scale:

| Style | Size/line | Weight | Use |
|---|---|---|---|
| Display | 28/34 | 600 | S1 promises, screen titles |
| Title | 22/28 | 600 | verdict card headline |
| Body | 16/24 | 400 | copy, explanations |
| Label | 14/20 | 600 | buttons, section headers |
| Caption | 12/16 | 400 | meta, timestamps, disclosures |
| Mono | 14/20 | 400 | hashes, pack versions (selectable, copy button) |

No all-caps except chips. Font scaling follows the OS setting; layouts reflow, never clip.

## The verdict card (the core component)

Five zones, in order: **1 state band** (verdict colour, icon, verdict title) → **2 headline**
(one plain sentence, Title style) → **3 evidence lines** (mono; always visible for Threat found
and Needs your review, collapsible for the other two) → **4 what this means** (Body copy,
honest framing per D7) → **5 actions** (exactly one primary; danger actions separated below
with space, never adjacent to the primary).

Card variants: single-result (S5/S7 full width), batch-summary strip (S5 with n files),
read-only rerender (S2 banner tap). The card never contains a spinner — loading is a distinct
state outside the card (S7 edge rule).

## Components

- **Buttons:** primary (filled brand), secondary (outlined), danger (filled #8C1D18). Minimum
  touch target 48dp; danger buttons are never the only button in a dialog.
- **Verdict chip:** small state pill (colour + short label) for lists — S8, S10, S14.
- **Banner:** last-verdict (S2), packs-not-ready (S2), containment-failed (S5 — persistent,
  dismissible only after the user acts).
- **List item:** name, meta line (caption), trailing chip; used in S3, S4, S8, S10.
- **Progress row:** phase icon + label + inline progress (S4); pack-download variant adds the
  GPG-verified marker (D9).
- **Dialogs:** confirm (single action), double-confirm (danger; names the object and the
  irreversible consequence — S9 delete, S7 open-anyway). No dark patterns: equal-weight buttons,
  no timers.
- **Empty states:** one sentence of fact plus one of orientation — no illustrations that imply
  safety or danger (S2, S8, S10).
- **Badge:** pack-update-available (S2, S11).
- **Hash/code text:** mono, selectable, copy affordance with "Copied" feedback (S5, S9, S10).

## Voice and tone (the honesty rules, as copy)

| Say | Never say |
|---|---|
| "No match in the loaded signature packs. This is not proof of safety." | "All clear!", "100% safe", "You're protected!" |
| "Moved to quarantine. The file is locked and encrypted." | "Threat vaporized", "We removed the virus" |
| "Could not decide — here is why." | Silent failure, generic "Something went wrong" with no verdict |
| "Checked URLs are sent to Google Safe Browsing. They are not linked to you." | "Anonymous scanning" (overclaim) |
| "This file could not be read." | "Scan failed" alone, with no state |

Rules: no exclamation marks in verdict states; instructions are verbs ("Rescan now", not "You
might want to rescan"); every number shown must be measured on-device or sourced — upstream
performance claims are never quoted in UI copy (02-product-brief.md constraints).

## Accessibility

- Touch targets ≥ 48dp; contrast AA as listed; verdict = colour + icon + text.
- TalkBack labels on all copy buttons and chips ("Verdict: Threat found").
- Dynamic font scale supported; evidence lines wrap, never truncate mid-hash (a hash is
  copyable, not decorative).
- No motion-based meaning; card entrance is a subtle fade at most; **no confetti or success
  animation on clean verdicts** — celebration would contradict D7.

## Motion

Minimal by policy: 150–200 ms fades and state changes; progress is always real (no fake
spinners); nothing pulses except the active scan phase icon.
