---
name: eh-tiber-cbest
description: "TIBER-EU and CBEST — the European and UK frameworks for threat intelligence-based ethical red-teaming of financial entities. Use only when the target is a regulated financial entity and the engagement is a threat-led penetration test; they are regulatory frameworks, not general pentest methods."
metadata:
  generatedBy: "1.0.1"
---

# TIBER-EU and CBEST — regulated threat-led testing

**One question:** how is a threat-led red-team test run in a regulated financial context, and what
does that require that an ordinary pentest does not?

These are the frameworks a bank, insurer, or financial market infrastructure uses when a regulator
expects a threat-led penetration test (TLPT). They are not for a solo developer's web app, and they
are not generic methodologies.

## TIBER-EU

TIBER-EU is the **European framework for threat intelligence-based ethical red-teaming**. It gives
guidance on how authorities, entities, threat intelligence providers, and red-team testers work
together to test and improve cyber resilience through **controlled cyberattacks**.

### How a test works

- Tests **mimic the tactics, techniques, and procedures of real-life attackers**, based on bespoke
  threat intelligence.
- They are **tailor-made** to the entity's critical functions and the systems underneath — people,
  processes, and technologies.
- The outcome is **not pass or fail**. The test reveals strengths and weaknesses, with a focus on the
  learning effect and on reaching a higher level of cyber maturity.

### The five teams

| Team | Role |
|---|---|
| **Blue team** | The people in the entity being tested; their prevention, detection, and response are tested **without their foreknowledge**. |
| **Threat intelligence provider** | Looks at the range of possible threats and carries out reconnaissance on the entity. |
| **Red-team testers** | Carries out the simulated attack, attempting to compromise the critical functions while mimicking a cyber attacker. |
| **Control team** | A small team inside the target entity — the only people there who know a test is happening — who lead and manage it with the TIBER cyber team. |
| **TIBER cyber team** | The team in the authority that oversees the test and ensures it meets the framework, enabling mutual recognition. |

TIBER-EU also publishes guidance for service-provider procurement, for setting up the control team,
and for purple-teaming in the testing or closure phase.

### The phases

The framework uses templates and guidance across:

1. initiation;
2. scoping;
3. threat intelligence;
4. red-team testing (planning and reporting);
5. blue-team report creation;
6. remediation plan creation.

The result is formalised in a **test summary report** and an **attestation**, which is what enables
mutual recognition by other authorities.

### Who it is for

Entities providing **core financial infrastructure**, and national or supranational authorities. It
can be used in other critical sectors too. It has mandatory and optional requirements, allowing
jurisdictions to adapt it.

TIBER-EU was developed by the ECB and the EU's national central banks, approved by the ECB Governing
Council, and published in May 2018. It was **updated in 2024** to align with the DORA regulatory
technical standards on TLPT. It has been adopted in a long list of EU countries and is applied by the
ECB.

## CBEST

CBEST is the Bank of England's framework, used by the PRA, the Bank's Financial Market Infrastructure
Directorate, and the FCA. Its own implementation guide describes it as:

- an **intelligence-led security testing framework**;
- a **targeted assessment** of a firm's or FMI's cyber resilience;
- focused on **important business services (IBSs)** and the technology, people, and processes
  supporting them;
- built on a **"golden thread"** linking security testing to threats and to potential impact on the
  wider economy.

CBEST is a **guiding framework**, not a detailed prescriptive methodology. It should be read with the
other CBEST materials.

### The four phases

1. **Initiation** — launch, engagement, scoping, procurement.
2. **Threat Intelligence** — direction, intelligence, validation, assessment.
3. **Penetration Testing** — planning, execution, assessment, review.
4. **Closure** — remediation, debrief, supervision.

After CBEST there is **thematic analysis** across assessments. CREST is the CBEST accreditation and
certification body. The 2024 edition of the implementation guide clarifies roles, remediation
documentation, and third-party considerations.

## How to use it

1. **Check whether it applies at all.** Is the target a regulated financial entity or authority? Is
   the engagement a threat-led test that a regulator expects? If not, these frameworks are the wrong
   tool; use PTES and the technology guides.
2. **Do not run a TIBER-EU or CBEST test alone.** Both require a control team, an independent
   threat-intelligence provider, and red-team testers, and TIBER-EU requires the TIBER cyber team in
   the authority. A solo owner cannot satisfy that structure.
3. **Use the phase model as a reference** if the owner works at a financial entity and wants to
   understand what a regulated test will involve: initiation, threat intelligence, testing, closure,
   remediation, and a formal attestation.
4. **Keep the "not pass/fail" framing.** Both frameworks are about learning and maturity, not a
   score. A clean result is not a guarantee.
5. **Never claim compliance** unless the full process, the authorities, and the attestation exist.

## What this skill does not decide

- They are **not general pentest methodologies**. They are for regulated financial entities and
  authorities.
- They do not replace PTES, WSTG, NIST, or OSSTMM for the technical work.
- They do not authorize an action. The scope and the control team do.
- They are not a certification the owner can self-award.
- A TIBER-EU or CBEST report is not comparable to a normal pentest report.

## Source

- TIBER-EU — https://www.ecb.europa.eu/paym/cyber-resilience/tiber-eu/html/index.en.html
- CBEST implementation guide — https://www.bankofengland.co.uk/financial-stability/operational-resilience-of-the-financial-sector/cbest-threat-intelligence-led-assessments-implementation-guide
- Checked 2026-11-06. The TIBER-EU definition, the five teams, the phases, the 2018/2024 dates, and
  the DORA alignment were read from the ECB page. The CBEST definition, the four phases, the
  "guiding framework" statement, and the CREST role were read from the Bank of England guide.
