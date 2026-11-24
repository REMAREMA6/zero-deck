---
name: eh-red-team
description: "Full attack simulation — testing people, processes, and technology together, with a threat-based scenario, stealth, and a control team. Use when the owner wants to test detection and response, not just find bugs. It draws on MITRE ATT&CK adversary emulation, the Kill Chain, and the regulated TIBER/CBEST structure; there is no single canonical Red Team Operations standard, and this skill says so."
metadata:
  generatedBy: "1.0.1"
---

# Red team operations — full attack simulation

**One question:** how do I run a full attack simulation that tests people, processes, and technology
together, rather than only finding individual bugs?

A red team is not a bigger pentest. A pentest asks "what is broken?". A red team asks "would anyone
notice, and could they stop it?". That difference changes the scope, the risk, and the rules.

## An honest note about the source

There is **no single canonical "Red Team Operations" standard** in the owner's source file, and none
in the sources read for this skill. MITRE's ATT&CK resource page describes how red teams use ATT&CK
to **emulate specific threats and plan operations**; it does not publish a full red-team methodology.
The regulated frameworks — TIBER-EU and CBEST — do define a full threat-led test, but only for
financial entities and authorities.

So this skill combines three things and says which is which:

1. **MITRE ATT&CK's adversary-emulation guidance** — the technique language and the emulation
   resources;
2. **the Cyber Kill Chain** — the stages of the simulated intrusion;
3. **the TIBER-EU / CBEST structure** — the control team, the threat-intelligence phase, and the
   formal closure, where the engagement is regulated.

It does not invent a standard. When the owner asks "what is the red team methodology?", the honest
answer is: there are several, and this is the combination being used.

## What a red team tests

A red team tests **detection and response**, not only configuration:

- **People** — would someone report a suspicious email, a strange phone call, or an unfamiliar
  person?
- **Processes** — is there an incident process, and does it work under pressure?
- **Technology** — do the logs, alerts, and controls actually catch the simulated behaviour?

A red-team finding is often "the attack succeeded and nobody noticed", not "this header is missing".
That is a different report.

## The shape of an engagement

### 1. Objective

Agree what the simulated adversary is trying to achieve: access a specific system, obtain a specific
kind of data, disrupt a specific service, or reach a specific team. "Get in somewhere" is not an
objective.

### 2. Threat intelligence

Choose the threat to emulate. Use real intelligence where available: a sector report, a known actor,
or the owner's own concerns. ATT&CK is the language for turning that into techniques.

### 3. Rules of engagement

More detailed than a pentest's:

- the objective and the prohibited actions;
- the systems and people in scope, and the third parties out;
- the control team — the small group inside the organisation who know the test is happening;
- the white cell / exercise control — who adjudicates and who can stop it;
- the emergency stop and the escalation path;
- the deconfliction process — how a real incident is told apart from the exercise;
- the evidence and communications plan.

### 4. Scenario and plan

Map the chosen threat's techniques to the Kill Chain stages, decide which are in scope, and write
the plan. Keep the blue team unaware of the specifics; keep the control team fully aware.

### 5. Execution

Run the scenario. Prefer stealth and realism over volume. Stop at the objective, not at "as far as we
could get". If a real incident occurs, stop and use the deconfliction process.

### 6. Reporting and read-out

Report what was done, what was detected, what was not, and how long it took. Separate:

- **red-team findings** — the attack path and the objective;
- **blue-team findings** — what was seen, what was missed, and why;
- **process findings** — the response, the escalation, the communication.

### 7. Remediation and retest

Fix the path and the detection gap. Retest the scenario, not just the individual vulnerability.

## How to use it

1. **Start with the objective.** If the owner cannot name one, a red team is premature; start with a
   pentest or a tabletop exercise.
2. **Use ATT&CK** (`eh-attack`) to choose techniques and map them. Use the **Kill Chain**
   (`eh-kill-chain`) to place them in stages.
3. **Use TIBER-EU / CBEST** (`eh-tiber-cbest`) if the target is a regulated financial entity. Do not
   claim their structure for a non-regulated engagement.
4. **For a solo owner, start smaller.** A tabletop exercise or a purple-team session against the
   owner's own detection is cheaper, safer, and often more useful than a full stealth simulation.
5. **Do not run a full red team alone.** It needs a control team, a deconfliction process, and
   someone empowered to stop it. The agent can plan and run scoped phases, but it cannot be the
   control team for its own test.
6. **Write the report for the blue team.** The point is detection and response, not a score.

## What this skill does not decide

- It is **not a single standard**. It is a combination, and the skill says which part comes from
  where.
- It is **not a pentest**. A red team that only lists vulnerabilities has missed the point.
- It is **not safe by default**. Stealth, social engineering, physical access, and persistence are
  high-risk; each needs explicit scope and approval.
- It is **not a solo activity**. The control team and deconfliction are part of the method.
- It does not authorize an action. The rules of engagement do.

## Source

- MITRE ATT&CK, Adversary Emulation and Red Teaming —
  https://attack.mitre.org/resources/get-started/adversary-emulation-and-red-teaming/
- The Kill Chain guide — see `eh-kill-chain` for the source.
- TIBER-EU / CBEST — see `eh-tiber-cbest` for the sources.
- Checked 2026-11-06. The ATT&CK red-team description, the three levels of sophistication, the
  adversary emulation plans, and CALDERA were read from the ATT&CK resource page. The absence of a
  single canonical red-team standard is stated as a limit, not filled with an invented one.
