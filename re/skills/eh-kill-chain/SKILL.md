---
name: eh-kill-chain
description: "The Lockheed Martin Cyber Kill Chain — seven stages of an intrusion, from reconnaissance to actions on objectives. Use to structure an attack simulation, place a finding at the stage where it occurs, and explain where a defender could have stopped it."
metadata:
  generatedBy: "1.0.1"
---

# Cyber Kill Chain — the seven stages

**One question:** at which stage of an intrusion does this finding sit, and where could it have been
stopped?

The Kill Chain is a model of an intrusion, not a test plan. It is useful because it forces a finding
to answer a second question: not only "what is broken?", but "at what point would a defender have
seen or stopped this?".

## What it is

Lockheed Martin's Cyber Kill Chain is part of its **Intelligence Driven Defense** model. It
identifies what adversaries must complete to achieve their objective. The model has **seven steps**.
Stopping an adversary at any stage breaks the chain; the intruder succeeds only if they can proceed
through steps 1–6 and reach the final stage.

## The seven stages

### 1. Reconnaissance — identify the targets

The adversary is in the planning stage, selecting targets and gathering information. The defender's
job is to detect reconnaissance as it happens, using behaviours unique to reconnaissance.

### 2. Weaponization — prepare the operation

The adversary builds the tool: selects a backdoor or implant, chooses command-and-control
infrastructure, compiles the payload, and may embed a mission identifier. Much malware generation is
not done specifically for one target; "malware off the shelf" is reused. The defender looks for
tooling reuse and for the timeline of when malware was created relative to when it was used.

### 3. Delivery — launch the operation

The adversary transmits the weapon to the target. The guide distinguishes:

- **adversary-controlled delivery** — for example, direct against web servers;
- **adversary-released delivery** — for example, a phishing email or a USB device.

The defender analyses the delivery medium and blocks at the point of delivery.

### 4. Exploitation — gain access to the victim

The weapon triggers and exploits a vulnerability. The adversary now has a foothold.

### 5. Installation — establish a beachhead

The adversary installs a persistent backdoor or implant to maintain access. The defender detects and
logs installation activity and looks for installation paths.

### 6. Command and Control — remote manipulation

Malware opens a command channel so the adversary can remotely manipulate the victim. The guide calls
this the defender's **last best chance** to block the operation: if the adversary cannot issue
commands, the impact can be prevented. Common C2 channels are over web, DNS, and email protocols.
The defender discovers C2 infrastructure through malware analysis and hardens the network.

### 7. Actions on Objectives — achieve the mission's goal

The adversary does what they came for: internal reconnaissance, collection, exfiltration, destruction,
or another objective.

## How to use it

1. **Structure a scenario.** If the owner wants an attack simulation, walk the seven stages and say
   what the simulated adversary would do at each one, and what the owner's defences would see.
2. **Place each finding.** A missing security header is not a stage; an exploit that gets a shell is
   Exploitation; a persistence mechanism is Installation; an outbound C2 channel is Command and
   Control. If a finding spans stages, say so.
3. **Find the cheapest stop point.** A finding at Delivery that could have been blocked is often
   cheaper to fix than the same intrusion detected at Actions on Objectives. Use the stages to
   prioritise detection and prevention.
4. **Pair it with ATT&CK.** The Kill Chain says *when*; ATT&CK says *what technique*. A finding can
   carry both: stage 4, technique `T1190`.
5. **Use it to explain defence to a non-hacker.** "The attacker got in here, stayed here, and called
   home here" is clearer than a CVE list.

## What this skill does not decide

- It is **a model, not a test plan**. It does not tell you what to test or how.
- It is **intrusion-centric**. Business-logic flaws, broken access control without an intrusion, and
  pure design weaknesses do not map cleanly. Do not force every finding into a stage.
- A modern attack may not be linear. The chain is a teaching and analysis model, not a claim that
  every attacker follows it in order.
- It does not authorize an action. The scope does.
- It does not replace ATT&CK for technique-level detail, or PTES for the engagement process.

## Source

- Lockheed Martin, Cyber Kill Chain — https://www.lockheedmartin.com/en-us/capabilities/cyber/cyber-kill-chain.html
- Lockheed Martin, *Gaining the Advantage: Applying Cyber Kill Chain Methodology to Network
  Defense* — https://www.lockheedmartin.com/content/dam/lockheed-martin/rms/documents/cyber/Gaining_the_Advantage_Cyber_Kill_Chain.pdf
- Checked 2026-11-06. The seven stage names and the adversary/defender descriptions were read from
  the guide PDF; the "stopping at any stage breaks the chain" statement was read from the page.
