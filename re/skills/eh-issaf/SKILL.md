---
name: eh-issaf
description: "The Information Systems Security Assessment Framework — a very broad, tool-linked assessment framework from 2005: planning, assessment, treatment, accreditation, maintenance, and per-platform procedures from Windows and Unix to routers, firewalls, databases, web apps, and social engineering. Use as a checklist and a procedure library, not as current best practice."
metadata:
  generatedBy: "1.0.1"
---

# ISSAF — the broad, tool-linked framework

**One question:** what does a structured assessment look like when every step is tied to a specific
platform, tool, and technique?

ISSAF is the widest document in this set. It covers not only penetration testing but the whole
assessment programme: engagement management, risk assessment, policy, organisation, technical
controls, operations, change management, awareness, incident management, outsourcing, business
continuity, and legal and regulatory compliance. That breadth is its value and its problem.

## What the document is

- **Information Systems Security Assessment Framework, draft 0.2**, 2005, Open Information Systems
  Security Group.
- It is a **draft**, not a maintained standard. OWASP's own WSTG notes that ISSAF "is not an active
  community" while still calling it a good reference source with comprehensive technical guidance.
- It is long — over 1,200 pages in the copy read — and much of it is per-platform procedure.

## The framework phases

The framework section describes a four-phase model:

1. **Planning**
2. **Assessment**
3. **Treatment**
4. **Accreditation**

The document then includes a fifth section, **Maintenance** (section 3.5). Treat the model as
four phases plus ongoing maintenance.

The **penetration testing methodology** inside the framework has its own three phases:

1. **Phase I — Planning and preparation**
2. **Phase II — Assessment**
3. **Phase III — Reporting, clean-up, and destroy artifacts**

That third phase is worth keeping even if the rest of the document is dated. A test that leaves
tools, files, accounts, or shells behind has not finished.

## What it covers

The table of contents, grouped:

- **Engagement and programme** — engagement management (scope, kickoff, communications, escalation,
  plan, milestones, deliverables, assumptions, risks, responsibility matrix, sign-off), good
  practices for pre-assessment / assessment / post-assessment, risk assessment methodology.
- **Enterprise security** — policy, organisation and management, controls assessment, personnel
  security.
- **Network** — password security and cracking, switches, routers, firewalls, IDS, VPN, anti-virus,
  SAN, WLAN, internet users, AS/400, Lotus Notes.
- **Host** — Unix/Linux, Windows, Novell NetWare.
- **Application** — web server, web application, SQL injection, source-code auditing, binary
  auditing, an application security evaluation checklist.
- **Database** — database security assessment.
- **Physical and human** — physical security assessment, social engineering.
- **Operations** — security operations management, change management, awareness, incident
  management, outsourcing, business continuity, legal and regulatory compliance.
- **Knowledge base** — templates, build foundation, penetration-testing lab, false-detection-rate
  handling, Windows/Linux/Solaris checklists, links, team, feedback.

## How to use it

1. Use it as a **procedure library** when you need a tool-linked checklist for a specific platform:
   a Windows host, a Unix host, a router, a firewall, a database, a web server.
2. Use its **engagement management** section when the owner needs a formal engagement: scope,
   milestones, sign-off, responsibility matrix, escalation.
3. Use its **Phase III: Reporting, clean-up, and destroy artifacts** discipline at the end of every
   phase. Record what you created and remove it.
4. Use its breadth as a coverage check. If the assessment claims "full", it should be able to say
   which of these areas were in scope and which were not.
5. Do **not** follow its tool commands blindly. Many are from 2005 and target systems that no longer
   exist. Verify the current syntax and the current vulnerability before running anything.

## What this skill does not decide

- It is **old**. It predates modern cloud, containers, Kubernetes, single-page apps, mobile apps,
  and most of the current web stack.
- It is a **draft** and is not actively maintained. Current WSTG, PTES, NIST, and MASTG win on
  current technology.
- Its per-platform checklists are a starting point, not a substitute for understanding the system.
- It does not authorize an action. The written scope does.
- It does not make a result comparable. Two ISSAF assessments by two people are not necessarily the
  same measurement.

## Source

- ISSAF draft 0.2 PDF — http://www.untrustednetwork.net/files/issaf0.2.1.pdf
- The WSTG's summary of ISSAF (and the "not an active community" note) —
  https://wstg.owasp.org/v4.1/3-The_OWASP_Testing_Framework/1-Penetration_Testing_Methodologies/
- Checked 2026-11-06. The framework phases, the penetration-testing phases, and the coverage list
  were read from the ISSAF PDF's table of contents and framework section.
