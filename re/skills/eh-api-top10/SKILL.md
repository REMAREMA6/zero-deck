---
name: eh-api-top10
description: "The OWASP API Security Top 10:2023 — the ten API-specific risk categories, from broken object-level authorization to unsafe consumption of third-party APIs. Use as a coverage checklist for an API test and as the reporting vocabulary for API findings. It is not a methodology."
metadata:
  generatedBy: "1.0.1"
---

# OWASP API Security Top 10:2023 — the API risks

**One question:** which API-specific risks should this test cover?

APIs fail differently from web pages. The most common serious API flaw is not injection; it is an
endpoint that returns someone else's object because it never checked who was asking. This list is
the coverage check for that surface.

## The 2023 list

### API1:2023 — Broken Object Level Authorization

APIs expose endpoints that handle object identifiers, creating a wide attack surface of object-level
access control issues. **Object-level authorization should be considered in every function that
accesses a data source using an ID from the user.**

### API2:2023 — Broken Authentication

Authentication mechanisms are often implemented incorrectly, allowing attackers to compromise
tokens or exploit implementation flaws to assume another user's identity, temporarily or permanently.

### API3:2023 — Broken Object Property Level Authorization

This combines the 2019 categories **Excessive Data Exposure** and **Mass Assignment**. The root
cause is the lack of, or improper, authorization validation at the **object property** level —
leading to information exposure or manipulation by unauthorized parties.

### API4:2023 — Unrestricted Resource Consumption

Satisfying API requests consumes network bandwidth, CPU, memory, storage, and sometimes paid
resources such as emails, SMS, phone calls, or biometric validation. Successful attacks can cause
denial of service or increase operational costs.

### API5:2023 — Broken Function Level Authorization

Complex access control policies with different hierarchies, groups, and roles, and an unclear
separation between administrative and regular functions, tend to lead to authorization flaws.
Attackers can gain access to other users' resources or administrative functions.

### API6:2023 — Unrestricted Access to Sensitive Business Flows

The API exposes a business flow — buying a ticket, posting a comment — without compensating for how
the functionality could be harmed if used excessively in an automated manner. This is not
necessarily an implementation bug; it is a missing business control.

### API7:2023 — Server Side Request Forgery

The API fetches a remote resource without validating the user-supplied URI. This can coerce the
application into sending a crafted request to an unexpected destination, even behind a firewall or
VPN.

### API8:2023 — Security Misconfiguration

APIs and their supporting systems typically contain complex configurations meant to make them
customisable. Missing or incorrect configuration opens the door to different attacks.

### API9:2023 — Improper Inventory Management

APIs tend to expose more endpoints than traditional web applications, making documentation and
inventory important. A proper inventory of hosts and deployed API versions mitigates deprecated
versions and exposed debug endpoints.

### API10:2023 — Unsafe Consumption of APIs

Developers tend to trust data received from third-party APIs more than user input, and adopt weaker
security standards. Attackers go after the integrated third-party services instead of the target API
directly.

## How to use it

1. **Inventory first.** List every host, version, and endpoint — including the old, the debug, and
   the undocumented. API9 is usually the finding that makes the others reachable.
2. **For every endpoint that takes an object ID**, ask who is allowed to read or change that object,
   and test it with two different accounts. That is API1, the most common serious API finding.
3. **For every function**, ask whether a regular user can call an admin function. That is API5.
4. **For every response**, ask whether it returns fields the caller should not see, and whether the
   caller can set fields they should not. That is API3.
5. **For every request that costs money or resources**, ask what happens at volume. That is API4 and
   API6. Test with a small, safe increment; do not run a denial-of-service test.
6. **For every URL the API fetches**, test against an allowed destination you control first. That is
   API7. Do not point it at cloud metadata or a third party.
7. **For every third-party API consumed**, ask what happens if that API is compromised or returns
   malicious data. That is API10.
8. **Pair with `eh-wstg` section 4.12** for the testing method, and with the app's own API
   documentation for the intended behaviour.

## What this skill does not decide

- It is a **list, not a method**. It does not tell you how to test; WSTG does.
- It is the **2023** edition. Cite the edition.
- It is **not exhaustive**. GraphQL-specific flaws, WebSocket flaws, and business-logic issues need
  their own coverage.
- It needs the owner's context for API6: only the owner knows which business flows are sensitive.
- It does not authorize an action. The scope does.

## Source

- OWASP API Security Top 10, 2023 — https://api-security.owasp.org/editions/2023/en/0x11-t10/
- OWASP API Security project — https://owasp.org/www-project-api-security/
- Checked 2026-11-06. The ten categories and their descriptions were read from the 2023 list.
