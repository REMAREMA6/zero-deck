---
name: eh-attack
description: "MITRE ATT&CK — the knowledge base of real adversary tactics and techniques, used to choose what a test should imitate and to map findings to a shared language. Use when the owner wants a test shaped like a real threat, or when findings and detections must be reported in ATT&CK terms."
metadata:
  generatedBy: "1.0.1"
---

# MITRE ATT&CK — real adversary behaviour

**One question:** which real attacker techniques should this test imitate, and how do I map what I
did to a shared language?

ATT&CK is a catalog, not a test plan. It is the best available answer to "what do real attackers
actually do?", and it is the common language red teams, blue teams, and detection engineers use.

## What ATT&CK is

MITRE describes it as a **globally accessible knowledge base of adversary tactics and techniques
based on real-world observations**. It is used as a foundation for threat models and methodologies
in the private sector, government, and the cybersecurity product and service community. It is open
and free.

It has matrices for **Enterprise**, **Mobile**, and **ICS**. Each matrix is organised by **tactic**
(the adversary's goal) and **technique** (how they achieve it), with sub-techniques, and with
software, groups, mitigations, and detections attached.

## The Enterprise tactics as rendered

The page read on 2026-11-06 showed these tactics, in this order:

1. Reconnaissance
2. Resource Development
3. Initial Access
4. Execution
5. Persistence
6. Privilege Escalation
7. Stealth
8. Defense Impairment
9. Credential Access
10. Discovery
11. Lateral Movement
12. Collection
13. Command and Control
14. Exfiltration
15. Impact

**A naming note, recorded honestly:** older ATT&CK versions used a single "Defense Evasion" tactic.
The current page shows **Stealth** and **Defense Impairment** as separate tactics. Cite the version
or the date when you use a tactic name; the matrix changes.

## Adversary emulation and red teaming

MITRE's own resource page says ATT&CK **provides a common language and framework that red teams can
use to emulate specific threats and plan their operations**. The resources it names:

- a getting-started blog post describing three levels of sophistication for adversary emulation and
  red teaming;
- do-it-yourself ATT&CK evaluations;
- threat-based purple teaming;
- **adversary emulation plans**, including a published APT3 plan and field manual;
- **CALDERA**, an automated adversary emulation system for post-compromise behaviour in Windows
  enterprise networks;
- using threat intelligence for ATT&CK-based emulation.

That is the honest shape of "ATT&CK for red teams": a way to choose a threat, map its techniques,
plan an operation, and compare what was tested with what was detected.

## How to use it

1. **Choose the threat first.** A test without a threat model is a list of techniques. Ask the owner
   what they are worried about: a opportunistic scanner, a criminal group, an insider, a specific
   actor.
2. **Select techniques, not the whole matrix.** Pick the techniques that matter for that threat and
   that scope. A matrix with hundreds of techniques is not a to-do list.
3. **Map each test to a technique ID** (for example `T1190` for Exploit Public-Facing Application).
   Put the ID in the finding. That lets the owner compare with detections and with future tests.
4. **Use it for coverage reporting.** "We tested these ten techniques; we did not test these
   others" is an honest report. "We tested ATT&CK" is not.
5. **Use it with the Kill Chain** (`eh-kill-chain`) when the owner wants to see where in an intrusion
   a technique sits. ATT&CK says what; the Kill Chain says when.
6. **Use it with detections.** For each technique tested, ask whether the owner's logging would have
   seen it. That is where a pentest becomes useful to defence.

## What this skill does not decide

- It is **not a methodology**. It does not tell you how to scope, approve, execute, or report an
  engagement. PTES and NIST do that.
- It is **not a permission**. It describes attacker behaviour; describing it does not authorize it.
- It is **not exhaustive for the owner's app**. Many business-logic and access-control findings do
  not map cleanly to a technique.
- It is **not a severity scale**. A technique in the matrix is not automatically a finding.
- It changes. Cite the version or the date.

## Source

- MITRE ATT&CK — https://attack.mitre.org/
- Adversary Emulation and Red Teaming — https://attack.mitre.org/resources/get-started/adversary-emulation-and-red-teaming/
- Checked 2026-11-06. The definition, the Enterprise tactic list, and the red-team resources were
  read from those pages.
