---
name: eh-ptes
description: "The Penetration Testing Execution Standard — the whole engagement from pre-engagement to report, in seven phases. Use at the start of every engagement to decide what is agreed, what phase you are in, and where the next approval gate sits. It is the process spine the other twelve skills hang on."
metadata:
  generatedBy: "1.0.1"
---

# PTES — the whole engagement

**One question:** what is the full engagement, from first contact to report, and what must be
agreed before each phase?

PTES is the process backbone. It does not tell you how to test a specific technology; it tells you
what has to happen before testing, in what order, and what the output of each phase is. Use it to
place every other skill.

## The seven phases

The official documentation lists them in this order:

1. **Pre-engagement Interactions**
2. **Intelligence Gathering**
3. **Threat Modeling**
4. **Vulnerability Analysis**
5. **Exploitation**
6. **Post Exploitation**
7. **Reporting**

### 1. Pre-engagement Interactions

Everything that must be settled before a single packet is sent. The documentation covers:

- **Scope** — what is tested, what is not, and how scope creep is handled;
- **Third parties** — cloud services, ISPs, web hosting, MSSPs, and the countries where servers are
  hosted; each is a separate permission;
- **Rules of engagement** — timeline, locations, disclosure of sensitive information, evidence
  handling, status meetings, time of day, and how to handle being detected or blocked;
- **Permission to test** and the legal considerations behind it;
- **Social engineering pretexts** and **DoS testing** as separate, explicit decisions;
- **Goals** — primary and secondary, tied to the business;
- **Communications** — emergency contact, incident definition, incident reporting process, and
  status-report frequency;
- **Capabilities and technology in place** — what the owner can actually monitor and respond with.

This is the phase that produces `scope.md`. If it is incomplete, nothing else starts.

### 2. Intelligence Gathering

What can be learned without exploitation. The documentation separates:

- **Target selection** — naming the target, the rules-of-engagement limits, the time available, and
  the end goal;
- **OSINT** — corporate, physical, logical, org chart, electronic, infrastructure, financial,
  individual, and employee information;
- **Covert gathering** — on-location, offsite, and HUMINT, where the engagement allows it;
- **Footprinting** — external and internal, passive and active reconnaissance, and building the
  target list;
- **Protection mechanisms** — network, host, application, storage, and user protections.

Recon is read-only. It stays inside the owner's assets; a third party's page, certificate, or
subdomain is out of scope even if it is linked.

### 3. Threat Modeling

Who would attack this system, and what would they want? The documentation covers:

- **Business asset analysis** — organisational data, policies, product information, marketing,
  financial and technical information, employee and customer data, human assets;
- **Business process analysis** — the technical, information, and human assets supporting each
  process, and third-party integration;
- **Threat agents/community** — employees, management, and other communities;
- **Threat capability** — tools, available exploits, communication, accessibility;
- **Motivation** — including news of comparable organisations being compromised.

The output is a ranked idea of what matters. It decides where testing effort goes, not what is
allowed.

### 4. Vulnerability Analysis

Finding weaknesses and deciding which are real. The documentation separates **testing** (active and
passive), **validation**, and **research**. The purpose is to enter exploitation with a planned,
validated list — not a scanner dump.

This is the last phase before the first hard gate.

### 5. Exploitation

PTES states the purpose plainly: **establishing access to a system or resource by bypassing
security restrictions**. If vulnerability analysis was done properly, this should be a **precision
strike**. The documentation also covers countermeasures and evasion (anti-virus, encoding, packing,
encryption, whitelist bypass, process injection, memory-resident techniques, DEP, ASLR, WAF),
tailored exploits, the zero-day angle, and example avenues of attack.

**This is the phase where the agent stops and asks.** The PTES phase is not a permission. The
owner's approval is.

### 6. Post Exploitation

What an attacker does after access. The documentation covers rules of engagement, protecting the
client and yourself, infrastructure analysis (routing, DNS, proxies, VPN, directory services),
pillaging, high-value targets, data exfiltration paths, persistence, further penetration, and
cleanup.

**This is a separate, stricter gate.** Most findings do not need it. Default answer: no. If it is
approved, do the minimum, record every artifact, and remove what you created.

### 7. Reporting

Two audiences, two sections:

- **Executive summary** — the goals, the high-level findings, and what they mean for the
  organisation;
- **Technical report** — the technical detail, evidence, and remediation.

The report is the deliverable. A finding that is not written down did not happen.

## How to use it

1. Run the engagement through the seven phases in order. Do not skip pre-engagement because the
   owner is in a hurry; that is where the authorization lives.
2. Map the five basic steps onto PTES: recon → Intelligence Gathering; scanning → Vulnerability
   Analysis; gaining access → Exploitation; maintaining access → Post Exploitation; reporting →
   Reporting.
3. Put the gates in the right places:
   - **before Exploitation** — the access gate;
   - **before Post Exploitation** — the impact gate;
   - **before any retest** — the retest gate.
4. Record the phase in `plan.md`. A phase that is not named is not approved.
5. Use the other skills for the content of a phase: WSTG for web testing, NIST for a formal
   assessment, OSSTMM for measurement, and so on.

## What this skill does not decide

- It does not authorize anything. The written scope does.
- It does not tell you whether a specific test is legal in the owner's jurisdiction.
- It does not replace the technology-specific guides — PTES is the process, not the test cases.
- It does not promise that following all seven phases finds every weakness.

## Source

- The Penetration Testing Execution Standard — https://pentest-standard.readthedocs.io/en/latest/tree.html
- Phase pages: `preengagement_interactions.html`, `intelligence_gathering.html`,
  `threat_modeling.html`, `vulnerability_analysis.html`, `exploitation.html`,
  `post_exploitation.html`, `reporting.html` on the same host.
- Checked 2026-11-06. The old `pentest-standard.org` host timed out; the project's own Read the
  Docs copy was used. The seven phases and their sub-areas were read from that copy. The
  exploitation purpose is quoted from its page.
