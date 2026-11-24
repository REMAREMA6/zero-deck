---
name: eh-crest-oscp
description: "What CREST and OSCP actually are, and when they matter — CREST accredits testing companies and certifies professionals; OSCP is OffSec's hands-on penetration testing course and 24-hour exam. Use when the question is tester qualification, procurement, or what a certificate proves. Neither is a methodology."
metadata:
  generatedBy: "1.0.1"
---

# CREST and OSCP — certification, not methodology

**One question:** what do CREST and OSCP actually decide, and when does a certification matter?

The owner's source file is honest about this: these are **not frameworks themselves**, but
certification bodies whose exams follow their own testing approach. This skill says what each one
is, so a certificate is never mistaken for a method or a guarantee.

## CREST

CREST is a global community of cyber security businesses and professionals. Its own description:

- **Accreditation** — member companies undergo rigorous audit and accreditation processes.
- **Codes of conduct and ethics** — all members sign enforceable codes and agree to complaints and
  resolution measures.
- **Professional certification** — certifications across the main cyber security disciplines and at
  all levels; exams are developed by technical information security experts, with governments and
  regulators.
- **Marketplace** — accredited suppliers are listed for buyers.
- **Scale** — over 500 member companies worldwide; links to governments and regulators in every
  global region.

**What it decides:** whether a *company* has been audited and accredited, and whether a *person*
holds a CREST certification. It is a procurement and quality signal.

**What it does not decide:** whether a particular test was good, whether a particular finding is
real, or which methodology was used. Accreditation is not a test result.

## OSCP

OSCP is OffSec's **PEN-200: Penetration Testing with Kali Linux** course and certification.

The course description covers:

- enumeration and information gathering, including vulnerability scanning and assessment;
- encryption and cryptography;
- perimeter attacks in web and application security, and client-side attacks — XSS, command
  injection, directory traversal, file uploads, SQL injection;
- password attacks;
- Windows and Linux privilege escalation and lateral movement, including pivoting and tunnelling;
- Active Directory authentication attacks and lateral movement;
- AWS cloud infrastructure enumeration and attack;
- tools including Nmap, Metasploit, Burp Suite, Hydra, Nessus, sqlmap, and Shellter.

The course is 20+ modules with labs and nine challenge labs. The exam is:

- **24 hours, proctored** by an OffSec employee over a private VPN;
- **three standalone machines**, graded on initial access and privilege escalation;
- **one Active Directory set** simulating a breach across three machines;
- hands-on: identify, exploit, and report real vulnerabilities in live lab systems.

**OSCP** is a lifetime certification. **OSCP+** is the same certification with a three-year
expiry; it can be maintained by a recertification exam, another qualifying OffSec exam, or the CPE
programme.

**What it decides:** that a person passed a hands-on exam under time pressure. It is evidence of
practical skill.

**What it does not decide:** that the person will test the owner's system well, that they will
follow the owner's scope, or that their report will be useful. It is not a methodology and not a
standard.

## How to use it

1. **When choosing a tester**, a CREST-accredited company or an OSCP holder is a reasonable starting
   filter, not a decision. Ask for a sample report, a scope document, and references.
2. **When a customer or regulator requires it**, use it as a procurement requirement and say so in
   the plan. Do not claim the certification as evidence that the test was thorough.
3. **When the owner wants to learn**, OSCP/PEN-200 is a study path. It is not the same as testing
   the owner's app; the exam lab is not the owner's system.
4. **When reporting**, never write "OSCP-certified" as a substitute for evidence. The finding stands
   on the request, the response, and the reproduction.
5. **For the agent itself**, these are not gates. The agent does not need a certificate to run a
   scoped test; it needs the owner's authorization and the skills.

## What this skill does not decide

- Neither CREST nor OSCP is a **methodology**. Do not cite them where PTES, WSTG, NIST, or OSSTMM
  belongs.
- A certificate is **not a guarantee** of quality, ethics, or scope compliance.
- CREST accreditation is **organisational**; it does not certify a particular engagement.
- The OSCP exam's approach is **not a standard**. It is one exam's format.
- Neither one authorizes an action on the owner's system.

## Source

- CREST — https://www.crest-approved.org/
- OffSec PEN-200 / OSCP — https://www.offsec.com/courses/pen-200/
- Checked 2026-11-06. The CREST accreditation, codes, certification, and marketplace description,
  and the PEN-200 topics, exam format, and OSCP/OSCP+ distinction were read from those pages.
