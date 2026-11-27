# Phase 7 — GitHub Actions Runner Capability Smoke Test

**Date:** 2026-11-27  
**Status:** PASS — two successful GitHub-hosted runs  
**Purpose:** Verify that a first-party GitHub Actions workflow can install Playwright, run headless Chromium, assert UI behaviour, and retain screenshot/video/trace artifacts. This is an infrastructure smoke test, not ZeroDeck product or prior-art evidence.

## 1. Workflow

- File: `.github/workflows/phase7-runner-smoke.yml`
- Trigger: push to the workflow file or manual workflow dispatch.
- Job: `Headless browser, screenshot, video and trace`
- Runner requested: `ubuntu-latest`
- Permissions: `contents: read`
- No external target, secrets, paid API, production system, or third-party application was used.
- The job generated its own static HTML fixture in the ephemeral runner workspace.

## 2. Runs

### Run A — initial workflow

- Commit: `3a1a0ff6d13da1df607f7ff50588a409d9a8c2dd`
- Run: [46026033625](https://github.com/REMAREMA6/zero-deck/actions/runs/46026033625)
- Result: **success**
- Artifact: `phase7-playwright-runner-evidence`, ID `15211223196`
- Artifact SHA-256: `58b22c9d31ec14148f8ca6e0bbf956c22ffba790ecc9c1892695a1a3017fe813`

### Run B — artifact action pinned to immutable revision

- Commit: `9e05176b52c312ccb2124d4bac5279c38a34e598`
- Pinned upload action: `actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02` (v4.6.2)
- Run: [46026203672](https://github.com/REMAREMA6/zero-deck/actions/runs/46026203672)
- Result: **success**
- Artifact: `phase7-playwright-runner-evidence`, ID `15212805113`
- Artifact SHA-256: `adf0a13e27fd8fdda42ba867fa0c07cca8f12d032a1fd9eaae62ac3eab165362`

Both initial runs completed all steps successfully, including Playwright installation, fixture creation, browser assertions, evidence listing, and artifact upload. A third run then pinned both the runner label and Playwright package and also passed.

### Run C — runner and Playwright dependency pinned

- Commit: `d6b0f1ee7680eedd343dc9ecb6c435082bfe5b6f`
- Runner: `ubuntu-26.04`
- Playwright npm package: `1.65.1`
- Upload action remains pinned to `ea165f8d65b6e75b540449e92b4886f43607fa02`.
- Run: [46026419660](https://github.com/REMAREMA6/zero-deck/actions/runs/46026419660)
- Result: **success**
- Artifact: `phase7-playwright-runner-evidence`, ID `15212178222`
- Artifact SHA-256: `8da4fe47e9d26232e15bccb57dc4d3203ed7123a869e6629fa8819acb28ac6dc`

All workflow steps passed. The log printed Playwright version `1.65.1` and the expected browser assertion success message.

## 3. Environment observed

From retained job logs:

- GitHub-hosted Linux VM; runner version `2.338.2`.
- Runner image resolved from `ubuntu-latest` to `ubuntu-26.04`, image version `20261116.202.1`.
- Node.js `v24.22.3`.
- npm `11.19.1`.
- Playwright `1.65.1` was explicitly pinned in Run C. It installed Chromium and its system dependencies. Run A's browser log identified Chrome for Testing `159.0.8154.6` (Playwright Chromium build `v1255`); each target workflow should record its exact browser/tool versions.

## 4. Assertions performed

The first-party HTML fixture was opened in headless Chromium. Playwright verified:

1. Document title equals `ZeroDeck CI Browser Smoke Test`.
2. The expected heading is visible.
3. The `Verify interaction` button can be clicked.
4. The resulting `Interaction passed` text appears.
5. A screenshot can be captured.
6. Browser video and Playwright trace can be recorded and uploaded.

The job log contains: `PASS: title, heading, click interaction and screenshot`.

## 5. Captured artifacts

All three runs uploaded three files:

- `screenshots/runner-smoke.png` — 1280 × 720 PNG.
- `videos/page@….webm` — browser recording.
- `traces/runner-smoke-trace.zip` — Playwright trace.

Run A's artifact was downloaded and inspected. The ZIP contained all three files; the screenshot was verified as a 1280 × 720 PNG, and the video and trace were verified as WebM and ZIP files respectively. The screenshot visibly showed the expected heading, fixture text, button and successful interaction output.

Artifacts are retained by GitHub Actions for 14 days from each run. Use the run links above to retrieve them before expiry.

## 6. What this proves

**Proven:** a GitHub-hosted Ubuntu runner can install Playwright/Chromium, execute headless browser assertions, interact with a page, produce a screenshot, video and trace, and upload those artifacts. This confirms the proposed remote browser-test mechanism is technically workable for first-party browser targets.

**Not proven:** capture or reproduction of any ZeroDeck screen, native mobile UI automation, API/database/provider testing, visual-baseline comparison, full Software Rules capture, or third-party prior-art runtime behaviour. The fixture was intentionally a small first-party test page.

## 7. Remaining constraints

- The workflow now requests `ubuntu-26.04` rather than `ubuntu-latest`; GitHub still updates the image revision over time, so logs must retain the resolved image version.
- Playwright is pinned to `1.65.1` and the artifact upload action is pinned to an immutable commit.
- Future target workflows should pin dependencies/tool versions and record the resolved runner image revision.
- GitHub-hosted runners do not override the uploaded RE-agent ownership gate for third-party software and do not automatically qualify as an isolated malware-analysis lab.

## 8. Exit result

**Runner capability smoke test: SATISFIED.** The first-party GitHub Actions + Playwright + artifact path passed three times. The final run pinned the runner label, Playwright `1.65.1`, and the artifact-upload action to an immutable commit. The renewed Phase 7 prior-art investigation remains incomplete: selected third-party targets are currently blocked by the written-permission requirement, and conditional provider tests need owner-supplied credentials and explicit approval.
