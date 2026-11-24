---
name: eh-osstmm
description: "The Open Source Security Testing Methodology Manual — a measured, repeatable way to test operational security across five channels (human, physical, wireless, telecommunications, data networks), with the RAV attack-surface metric and the STAR report. Use when the owner wants a score and a comparison over time, not only a list of bugs."
metadata:
  generatedBy: "1.0.1"
---

# OSSTMM — measured operational security

**One question:** how secure is this system, measured, rather than only which individual bugs exist?

OSSTMM is different from the other guides in this set. Most of them ask "what is broken?". OSSTMM
asks "how much attack surface is exposed, across every channel, and is the number better or worse
than last time?". That makes it useful for a baseline and a trend, and awkward for a quick web-app
scan.

## The manual read

- **OSSTMM 3.02**, published 14 December 2010 by ISECOM. It ends the 2.x series and declares all
  earlier versions obsolete.
- The manual describes itself as **test cases that result in verified facts**, so decisions rest on
  measured information rather than best practice or anecdote.
- It is one methodology for **five channels**: **Human, Physical, Wireless, Telecommunications, and
  Data Networks**. Each channel is tested separately for each vector.

## The seven steps that define a test

From Chapter 2, "What You Need to Do":

1. **Define what you want to protect.** The assets. The protection mechanisms are the controls;
   their weaknesses are the limitations.
2. **Identify the engagement zone.** The area around the assets, including the controls and the
   processes or services built around them.
3. **Define the test scope.** Everything outside the engagement zone needed to keep the assets
   operational — including things the owner cannot influence, such as power, law, and regulations.
4. **Define the vectors.** How the scope interacts with itself and the outside: inside-to-outside,
   outside-to-inside, inside-to-inside, department-to-department. Each vector is ideally a separate
   test.
5. **Identify the equipment for each test.** Interactions are classified by function into the five
   channels; each channel is tested separately for each vector.
6. **Define the test type.** The manual names six: **Blind, Double Blind, Gray Box, Double Gray Box,
   Tandem, and Reversal**.
7. **Check the test is compliant with the rules of engagement.** The manual treats this as the step
   that prevents misunderstandings and false expectations.

The result is a measurement of the **attack surface**: the unprotected part of the scope from a
defined vector.

## RAV — the attack-surface metric

- RAV is a scale measurement of the attack surface.
- **100 RAV** is perfect balance. **Less than 100** means too few controls, so a larger attack
  surface. **More than 100** means more controls than necessary, which is its own problem.
- OSSTMM 3 explicitly moves away from measuring "risk" in areas where no price can be put on the
  asset, and toward **trust metrics** based on facts.
- The RAV calculation is a formula in the manual, with a spreadsheet calculator published by
  ISECOM. It is not a number you estimate.

## STAR — the report

- **STAR** is the Security Test Audit Report.
- It records what was tested, how it was tested (the parts of the targets, not the tools), the
  controls discovered, and **what was not tested**.
- A STAR is signed by the analyst and can be submitted to ISECOM for review. It is designed to be
  comparable with previous tests and with industry averages.

The "what was not tested" column is the part most reports omit. It is the part that makes the
measurement honest.

## OSSTMM 4 — the current direction

The current ISECOM page describes **OSSTMM 4**, a substantial revision:

- a Foundation volume plus channel-specific **Facets**;
- **5PP** attributes: Characteristics, Context, Force, Resources, Narrative;
- a **Control Lattice** of 15 controls (5×3);
- three temporal phases: **Intent, React, Resolve**;
- **Trust Controls**, with AI agents as the headline use case;
- **Attack Surface Mapping** — described as the inverse of MITRE: mapping control gaps to exploitable
  paths;
- a reformulated RAV;
- new channels including Web, Cloud, Mobile, AI, Source Code, OT/ICS, IoT, and AI/Agents;
- compliance mapping to NIS2, DORA, the EU AI Act, GDPR, HIPAA, PCI DSS, ISO 27001, and NIST CSF;
- a methodology written to be parsed by AI.

OSSTMM 4 is early access on the ISECOM page. The manual read for this skill is **OSSTMM 3.02**.
Do not mix the two scoring models; say which one you are using.

## How to use it

1. Use it when the owner wants a **baseline and a trend**: "is this better than three months ago?"
2. Use it when the scope is broader than a web app — a home lab, an office, a wireless network, a
   phone system, or a combination.
3. Define the seven steps before testing. The scope and the vectors are the methodology; the tools
   are not.
4. Record what you did **not** test. That is not a weakness in the report; it is the report.
5. For a solo developer's web app, do not start here. Start with `eh-wstg`, then use OSSTMM's
   discipline — defined scope, defined vectors, a signed report, and an explicit not-tested list —
   to make the result comparable.
6. Never invent a RAV number. If the owner wants one, use the manual's formula and the ISECOM
   calculator, with the full scope defined.

## What this skill does not decide

- It does not replace the technology-specific test cases. OSSTMM tells you how to structure and
  measure; WSTG tells you what to try on a web app.
- It does not authorize an action. The rules of engagement do.
- It does not make a score comparable across different scopes. A RAV for a home lab and a RAV for a
  bank are not the same thing.
- It does not make the result a certification unless the full ISECOM process is followed.

## Source

- OSSTMM 3.02 PDF — https://www.isecom.org/OSSTMM.3.pdf
- ISECOM OSSTMM page (including OSSTMM 4) — https://www.isecom.org/osstmm.html
- Checked 2026-11-06. The seven steps, the five channels, the six test types, the RAV definition,
  and the STAR description were read from the OSSTMM 3.02 PDF. The OSSTMM 4 description was read
  from the current ISECOM page.
