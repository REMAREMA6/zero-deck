---
name: eh-nist-800-115
description: "NIST SP 800-115 — the formal, auditable security testing and assessment guide: planning, discovery, attack, reporting, with documented approval and rules of engagement. Use when the assessment must survive an auditor, a regulator, or a customer's security review, or when the owner needs a disciplined written plan before testing."
metadata:
  generatedBy: "1.0.1"
---

# NIST SP 800-115 — formal testing and assessment

**One question:** how do I run a formal, documented assessment that another person can audit,
without skipping the approval and reporting steps?

NIST SP 800-115 is a government guide, not a certification scheme. It is useful because it makes the
boring parts mandatory: written approval, a plan, rules of engagement, evidence handling, and a
report that separates root cause from symptom.

## What the document is

- **Title:** Technical Guide to Information Security Testing and Assessment.
- **Published:** September 2008. It supersedes SP 800-42.
- **Authors:** Karen Scarfone and Murugiah Souppaya (NIST), Amanda Cody and Angela Orebaugh (BAH).
- **Purpose:** assist organisations in planning and conducting technical information security tests
  and examinations, analysing findings, and developing mitigation strategies.
- **Scope limit, stated by NIST:** it is an overview of key elements, not a comprehensive testing
  programme. It gives techniques, their benefits and limitations, and recommendations for use.

## The assessment methodology

At minimum, NIST says a phased methodology should contain:

1. **Planning** — gather the information needed to execute: the assets, the threats, the controls
   that mitigate them, and the assessment approach. Treat it as a project with goals, scope,
   requirements, roles, limitations, assumptions, resources, timeline, and deliverables.
2. **Execution** — identify vulnerabilities and validate them where appropriate.
3. **Post-Execution** — analyse the vulnerabilities, determine root causes, establish mitigation
   recommendations, and write the final report.

## The four-stage penetration testing methodology

For penetration testing specifically, NIST uses four stages:

```
Planning → Discovery → Attack → Reporting
                ↑          |
                └──────────┘
              additional discovery
```

### Planning

Rules are identified, **management approval is finalised and documented**, and testing goals are
set. NIST is explicit: **no actual testing occurs in this phase.** This is where the authorization
record and the rules of engagement are written.

### Discovery

The first part of actual testing: information gathering and scanning.

- Network port and service identification to find potential targets.
- Host name and IP information through DNS, WHOIS, and network sniffing (generally internal only).
- Employee names and contact information from web or directory servers.
- System information such as names and shares through NetBIOS or NIS (generally internal only).
- Application and service versions through banner grabbing.
- In some cases, dumpster diving and physical walkthroughs — these are separate permissions, and
  the agent does not do them without explicit scope.

The second part is **vulnerability analysis**: comparing the scanned services, applications, and
operating systems against vulnerability databases (automatic for scanners) and the tester's own
knowledge. NIST names the National Vulnerability Database (NVD) as a public source. Manual analysis
can find new or obscure issues that scanners miss, but it is slower.

### Attack

The process of **verifying previously identified potential vulnerabilities by attempting to
exploit them**. If an attack succeeds, the vulnerability is verified and safeguards are identified
to mitigate the exposure.

This is the same hard gate as PTES Exploitation. NIST's documented approval is not a blanket
permission to exploit; the owner still names the phase, the targets, and the window.

### Reporting

Analyse the vulnerabilities, determine root causes, establish mitigation recommendations, and
produce the final report. NIST treats remediation as part of the post-testing activity, not a
separate favour.

## The technique families

The guide groups techniques into three families, which is a useful way to check coverage:

| Family | Techniques |
|---|---|
| **Review** | documentation review, log review, ruleset review, system configuration review, network sniffing, file integrity checking |
| **Target identification and analysis** | network discovery, network port and service identification, vulnerability scanning, wireless scanning |
| **Target vulnerability validation** | password cracking, penetration testing, social engineering |

The last two in the validation row are separate permissions. Password cracking and social
engineering are not implied by "do a pentest".

## How to use it

1. Use it when the owner needs a **formal, auditable** assessment: a customer's security review, a
   regulator, an insurer, or an internal audit.
2. Write the planning phase first, with the owner's documented approval. NIST treats this as the
   foundation; do not start scanning before it exists.
3. Use the four stages as the phase skeleton, and place the identity's gates at **Attack** and at
   any **post-exploitation** work.
4. Use the technique families as a coverage check. If the assessment claims "full", it should be
   able to say which families were used and which were not.
5. For the technical content of a web test, use `eh-wstg`. NIST tells you how to run the
   assessment; the WSTG tells you what to test on a web app.
6. Keep the evidence and data-handling discipline: NIST has sections on data collection, storage,
   transmission, and destruction. Real user data is not a souvenir.

## What this skill does not decide

- It is a **2008** guide. Some tools and techniques have moved on; current technology guides win on
  current products.
- It is written for US federal agencies and offered to others voluntarily. It is not law for a
  private owner.
- It is not a comprehensive testing programme, by its own statement.
- It does not authorize exploitation. The planning approval is a prerequisite, not a substitute for
  the phase gate.
- It does not cover mobile or modern cloud-native surfaces in depth.

## Source

- NIST SP 800-115, Technical Guide to Information Security Testing and Assessment —
  https://csrc.nist.gov/pubs/sp/800/115/final
- PDF — https://nvlpubs.nist.gov/nistpubs/Legacy/SP/nistspecialpublication800-115.pdf
- DOI — https://doi.org/10.6028/NIST.SP.800-115
- Checked 2026-11-06. The four-stage figure, the planning/discovery/attack/reporting descriptions,
  the assessment-methodology phases, and the technique families were read from the PDF.
