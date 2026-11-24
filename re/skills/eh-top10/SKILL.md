---
name: eh-top10
description: "The OWASP Top 10:2025 — the ten most common web application risk categories, as a coverage checklist and a reporting vocabulary. Use to check that a web test covered the common ground and to name a finding in a way the owner can look up. It is not a methodology and not a test plan."
metadata:
  generatedBy: "1.0.1"
---

# OWASP Top 10:2025 — the common web risks

**One question:** which of the most common web application risks should this test cover first?

The OWASP Top 10 is a **standard awareness document** for developers and web application security.
It represents a broad consensus about the most critical security risks to web applications. It is
not a test method, not a standard, and not a guarantee.

## The 2025 list

1. **A01 — Broken Access Control**
2. **A02 — Security Misconfiguration**
3. **A03 — Software Supply Chain Failures**
4. **A04 — Cryptographic Failures**
5. **A05 — Injection**
6. **A06 — Insecure Design**
7. **A07 — Authentication Failures**
8. **A08 — Software or Data Integrity Failures**
9. **A09 — Security Logging and Alerting Failures**
10. **A10 — Mishandling of Exceptional Conditions**

**Edition note:** this is the **2025** list. It differs from the 2021 list (which had, for example,
"Vulnerable and Outdated Components" and "Identification and Authentication Failures"). Cite the
edition you used; a finding mapped to "A07:2021" is not the same label as "A07:2025".

## How to use it

1. **As a coverage check.** After the test, ask: did we look at access control, configuration,
   supply chain, cryptography, injection, design, authentication, integrity, logging, and error
   handling? If a category was not tested, say so.
2. **As a reporting vocabulary.** Put the `A0x:2025` label in the finding next to the WSTG scenario.
   The owner can look it up, and a future test can compare.
3. **As a conversation starter with the owner.** "Broken access control" is abstract; the WSTG
   scenario and the actual request are concrete. Use the Top 10 as the heading, not the evidence.
4. **With `eh-wstg`.** The WSTG is the method; the Top 10 is the short list of common risk families.
   Do not use the Top 10 in place of the WSTG's test cases.
5. **With `eh-api-top10`** for APIs. The two lists overlap but are not the same.

## What this skill does not decide

- It is **not a methodology**. It does not tell you how to test, in what order, or with what
  evidence.
- It is **not exhaustive**. A clean Top 10 pass does not mean the app is secure; many serious
  findings (business logic, race conditions, tenant isolation) sit outside the ten categories.
- It is **not a severity ranking for the owner's app**. A category's position in the list is based
  on broad data, not on this app's risk.
- It changes between editions. Do not mix editions in one report.
- It does not authorize an action. The scope does.

## Source

- OWASP Top 10:2025 — https://top10.owasp.org/2025/
- OWASP Top 10 project — https://owasp.org/www-project-top-ten/
- Checked 2026-11-06. The ten categories and the "standard awareness document / broad consensus"
  description were read from the 2025 site.
