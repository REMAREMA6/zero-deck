---
name: eh-mastg
description: "The OWASP Mobile Application Security Testing Guide — how to test Android and iOS apps, including an Android app built with Capacitor: MASVS controls, MASWE weaknesses, static and dynamic testing, reverse engineering, and the tools. Use when the target is a mobile build, not a website."
metadata:
  generatedBy: "1.0.1"
---

# OWASP MASTG — mobile app testing

**One question:** how do I test this mobile app, including an Android app built with Capacitor?

MASTG is the mobile counterpart to the WSTG. It covers the app package itself — the APK or IPA —
and the platform APIs it uses. It does not replace testing the backend the app talks to.

## What MASTG is

OWASP describes it as a **comprehensive manual for mobile app security testing and reverse
engineering**. It describes technical processes for verifying the controls listed in **OWASP
MASVS** through the weaknesses defined by **OWASP MASWE**.

The site is organised into:

- **Knowledge** — the background concepts;
- **Tests** — the test cases;
- **Techniques** — how to perform them;
- **Demos** — worked examples;
- **Tools** — the tooling;
- **Apps** — sample apps;
- **Best Practices**;
- **Android Security Testing** and **iOS Security Testing**.

It sits alongside **MASVS** (the security requirements), **MASWE** (the weaknesses), **MAS
Profiles**, and **MAS Crackmes** (practice apps).

## What to test on a mobile target

The exact test list comes from the MASVS controls and the MASTG tests. The areas that matter most
for an app the owner built:

1. **The build and its storage** — what is in the package, what is written to local storage, and
   whether secrets or tokens are stored in plaintext.
2. **The network layer** — whether the app enforces TLS, whether it accepts user-installed
   certificates, and whether it can be proxied. A mobile app that trusts any certificate is a
   finding even if the backend is strong.
3. **Authentication and session handling** — token storage, refresh, logout, and whether a stolen
   token can be replayed.
4. **Platform interaction** — intents, deep links, URL schemes, exported components, and WebViews.
5. **The WebView and the web layer** — for a Capacitor app, the bundled web content and the bridge
   between JavaScript and native code.
6. **Reverse engineering and tampering** — whether the app can be repackaged, whether the code is
   obfuscated, and whether the app detects a modified build. These are often "resistance" findings,
   not direct exploits.
7. **The backend** — the app is a client. Test the API it calls with `eh-wstg` and
   `eh-api-top10`; the mobile guide will not find a broken object-level authorization on the server.

## Capacitor, specifically

A Capacitor app is a native shell around a web app. That means:

- the **web layer** is testable like a web app — load `eh-wstg` for it;
- the **native bridge** is a mobile surface — plugins expose native capabilities to JavaScript;
  check which plugins are enabled and what they expose;
- the **packaged assets** may contain source maps, API keys, or debug builds — inspect the APK;
- the **backend API** is the same API the web app uses — load `eh-api-top10`;
- a finding in the web layer may be reachable from the mobile app with a different trust boundary.
  Say which layer you tested.

## How to use it

1. Ask the owner for the **build** — a debug APK is easier to inspect than a release build, and a
   release build is what ships. Prefer the release build for the final finding; use debug for
   understanding.
2. Set up a test device or emulator you control. Never test on a device with real user data.
3. Work the MASVS controls and the MASTG tests. Record the test ID and the MASVS control.
4. Use a proxy you control to observe the traffic. If the app pins certificates, that is a finding,
   and bypassing the pin is an exploit-phase action — ask first.
5. Test the backend with the API skills. A mobile app is not secure because the APK is obfuscated if
   the API returns every user's records.
6. Record the platform, the build version, and the device/emulator in the finding. A mobile finding
   without a build is not reproducible.

## What this skill does not decide

- It is **mobile only**. It does not cover the web app, the API, or the infrastructure.
- It needs a **device or emulator and tooling**. Without them, the finding is `not tested`, not
  guessed.
- iOS testing needs the right host and signing setup; if the owner cannot provide it, say so.
- It does not authorize an action. Installing a proxy certificate, bypassing pinning, or repackaging
  the app is an exploit-phase action; ask first.
- A clean MASTG pass does not mean the app is secure; the backend is half the system.

## Source

- OWASP MASTG — https://mas.owasp.org/MASTG/
- OWASP Mobile Application Security project — https://mas.owasp.org/
- Checked 2026-11-06. The MASTG description, its section list, and the MASVS/MASWE relationship were
  read from the MASTG landing page.
