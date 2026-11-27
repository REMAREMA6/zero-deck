# ZeroDeck Primary Customer Research Protocol — Draft

**Date:** 2026-11-27  
**Status:** Ready for owner review; no participants recruited or interviewed  
**Workspace:** product-management/  
**Purpose:** Validate customer jobs, pain, current alternatives and adoption signals before treating the provisional cohort recommendation as settled.

## 1. Research questions

1. Which candidate cohort experiences a recurring, consequential problem that the three approved MVP capabilities can address?
2. What do people actually do today when uncertain about a file or link?
3. Which existing protections or tools do they rely on, and where do they fail in real situations?
4. Are unfamiliar-link and unfamiliar-file problems part of the same user's repeated workflow or separate jobs?
5. Is quarantine/disposition wanted, understood and trusted after a concerning file result?
6. What result evidence and data-handling transparency are needed before a person acts?
7. Does the current MVP offer a meaningful advantage over existing alternatives?
8. What real behaviour indicates adoption rather than one-time curiosity?

## 2. Candidate segments to compare

| Segment | Behaviour/context definition | Why include | Main uncertainty |
|---|---|---|---|
| A — Security practitioners | Independent penetration testers, mobile security testers or security analysts who personally triage suspicious files/URLs as part of work. | Original ZeroDeck direction; may have acute technical needs and privacy constraints. | Current MVP may be too shallow for their broader assessment workflow. |
| B — Non-technical individuals | People who regularly receive/download unfamiliar files/apps and links from channels they do not fully trust. | Provisional recommendation; clear decision moments map to manual checks and safe disposition. | Play Protect and browser/messaging protections may already satisfy most needs. |
| C — Businesses/licensed organisations | Small businesses or teams responsible for handling employee/customer files and links or paying for security tooling. | Ideation alternative; may have organizational purchasing ability and policy needs. | Current MVP excludes standalone admin, fleet management and reporting capabilities. |

No segment is selected by this protocol. The owner decides the initial target cohort.

## 3. Recruitment and screening

### Segment A screener
- Currently performs security testing, malware triage or security analysis as part of paid work, study or an active project.
- Has handled suspicious files or URLs in a real workflow recently.
- Can describe the last concrete case and tools/actions used.
- Record role and context; do not treat all security roles as interchangeable.

### Segment B screener
- Has received or downloaded unfamiliar files/apps or links in a real situation recently.
- Has made an actual decision to open, avoid, delete, check or ask someone about the item.
- Can describe the source channel, uncertainty and action.
- Do not screen solely on interest in cybersecurity or willingness to install a new app.

### Segment C screener
- Has direct responsibility for security decisions or tool purchasing in a small business/team.
- Can describe a recent real incident involving unfamiliar files or links.
- Can explain who uses tools, who approves spending and what existing controls are in place.
- Do not treat an employee who lacks purchasing/administrative authority as the buyer.

### Sampling rule

Start with a small, balanced exploratory wave across the segments that can be recruited. Continue interviews where evidence remains ambiguous or new recurring jobs continue to emerge. Do not claim statistical representativeness from qualitative interviews. Record geography, role, device/platform and recruitment source; do not assume a Nigerian or Android-only sample unless the owner selects that market/platform.

No fixed sample size is prescribed until recruitment feasibility and segment heterogeneity are known.

## 4. Interview method

Use semi-structured interviews centred on the participant's most recent real incident. Ask permission before recording or retaining any personal information. Do not ask participants to send actual suspicious files, live malicious URLs, passwords, client artifacts or other sensitive content. A verbal description or safely redacted example is sufficient.

### Opening
- Explain that the research is about how people handle unfamiliar files and links, not a test of their knowledge.
- State that there are no right or wrong answers.
- Ask permission to take notes/record if recording is necessary.
- Do not pitch ZeroDeck before the behavioural questions.

### Recent incident reconstruction
1. Tell me about the last time you received or downloaded a file, app or link and were unsure whether to open it.
2. Where did it come from?
3. What made you uncertain?
4. What did you do next, step by step?
5. What tools, settings or people did you rely on?
6. How did you decide whether the result was trustworthy?
7. What happened after your decision?
8. Did the situation cost you time, access, money or create a security concern?
9. How often has a similar situation happened recently?
10. What was difficult or unsatisfactory about the way you handled it?

### File and quarantine follow-up
- What file type was it, if known?
- Did you scan it? With what?
- What did the scan result actually say?
- Did you keep, delete, move, isolate or ask someone else to inspect it?
- What would have made you more confident in the next action?
- Have you ever lost access to a legitimate file because it was flagged or deleted?
- What would you expect a quarantine feature to do to the original file?
- How would you expect to restore or permanently delete it?

### Link-check follow-up
- Did you open the link, avoid it, preview it, ask the sender or use a checker?
- Did you check the destination or only trust the sender?
- Did you understand what the check inspected?
- Would a result showing no known threat change your decision? Why or why not?
- What data would you be uncomfortable sending to a third-party checker?

### Existing alternative and switching follow-up
- What protection is already enabled on your device/browser/email/messaging service?
- When did it last help with a real problem?
- When did it fail or leave you uncertain?
- What would make you use a separate tool instead of the existing option?
- What would make you uninstall or stop using it?

### Practitioner follow-up
- Describe the last artifact/URL triage sequence.
- Which steps were manual, automated or outsourced?
- What evidence was required before acting?
- What sample data could not be sent to external services?
- Which work is already covered by existing tooling?
- Would a lightweight manual utility fit into the workflow, or would it be redundant?

### Business follow-up
- Who experiences the problem and who owns the risk?
- What tools/policies are already used?
- Who approves a purchase?
- What incident or operational cost would justify a new tool?
- What evidence would be required for procurement or deployment?

## 5. Evidence capture template

For each interview, capture only the minimum necessary:

| Field | What to record |
|---|---|
| Participant code | Non-identifying research ID. |
| Segment/context | A, B or C; role/context without unnecessary personal details. |
| Geography/platform | Participant's stated market/device context; do not infer. |
| Recent incident | Short, anonymised description. |
| Trigger/source | Where the file/link came from. |
| Frequency | Participant's recalled frequency, with time window. |
| Current workaround | Actual tool, person or avoidance action. |
| Failure/friction | What did not work and why. |
| Consequence | Time, money, risk, lost access or no meaningful consequence. |
| Need statement | Participant-language summary, clearly separated from analyst interpretation. |
| Existing substitute | Built-in tool, vendor, manual method or no action. |
| Trust/privacy | Evidence required and data-sharing boundary. |
| Repeat behaviour | Whether the same problem recurred and what they did again. |
| Contradictory evidence | Any evidence against the current hypothesis. |
| Confidence | Direct observation, participant recollection, interpretation or speculation. |

Do not store live malware, private URLs, client files, credentials or personal identifiers in interview notes.

## 6. Analysis method

After each interview:
1. Extract concrete jobs and triggers.
2. Separate participant statements from analyst interpretation.
3. Record frequency and consequences with the participant's stated time window.
4. Map current alternatives and exact points of failure.
5. Identify whether the job maps to one of the three approved capabilities.
6. Record unmet needs not covered by MVP without adding them to scope.
7. Compare across segments and look for disconfirming cases.
8. Update the needs report and prioritization only when new evidence warrants it.

A need is stronger when the participant can describe a recent real event, repeated frequency, a meaningful consequence, a current workaround and a specific failure in that workaround. Positive reaction to a hypothetical feature is weak evidence.

## 7. Decision rules

### Keep Segment B as the provisional first cohort only if:
- unfamiliar-file/link decisions recur for the recruited participants;
- current alternatives leave a meaningful gap;
- the approved MVP can address the gap without unsupported promises;
- the need is sufficiently common/consequential to justify a separate product;
- the segment is reachable through a plausible launch/distribution path.

### Reconsider in favour of Segment A if:
- practitioners repeatedly describe a specific unmet workflow that the MVP can address;
- the pain is materially more frequent or consequential than Segment B's;
- current alternatives leave a credible gap;
- the product can meet confidentiality and evidence requirements without expanding beyond approved scope.

### Reconsider in favour of Segment C if:
- businesses describe a shared, recurring problem and a clear buyer/user;
- the current three capabilities address the need without requiring excluded admin/fleet capabilities;
- procurement, privacy and support requirements are feasible.

If none meets these conditions, recommend narrowing the problem or revisiting the product direction rather than inventing a customer need.

## 8. Prototype/experiment guardrails

- Do not represent a mockup or concept as a working scanner.
- Do not upload real participant files to external providers.
- Do not use live malicious samples in an uncontrolled environment.
- Do not bypass Pro entitlement or the owner activation switch for link-check tests.
- If MVP-03 remains locked, do not count lack of usage as lack of demand. Select a separately approved enabled workflow for initial validation.
- Do not set numeric success thresholds after observing results.
- Keep participant consent, privacy, deletion and data minimisation explicit.

## 9. Experiment metric options

The existing provisional recommendation defines the 30-day qualified repeat link-check rate for an eligible cohort, compared with a manual-check baseline. This metric is only available after both Pro and owner activation gates permit real provider-backed use.

For manual file analysis/quarantine, a separate metric must be selected only after the customer need and enabled workflow are validated. Candidate measures include:
- qualified repeat manual-scan use for separate real incidents;
- completion of a manual scan followed by an informed user decision;
- successful, recoverable quarantine/restore/disposition in a real workflow.

Do not combine these into a single opaque usage count. A scan click is not proof of a useful result or a safer decision.

## 10. Status and next action

**Status:** Protocol prepared; no participants recruited or interviewed.

**Blocked by:** No owner-approved target cohort or launch geography; no participant list or recruitment channel has been supplied. This does not prevent further secondary research, but it prevents claims of primary validation.

**Next action:** Owner selects the first cohort/market or authorizes a balanced exploratory sample across A/B/C. Then recruit participants and run interviews. Update the needs report, prioritization and recommendation with actual evidence.
