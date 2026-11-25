# RE workspace — the agent's job (owner's directive, 2026-11-25)

The reverse-engineering agent does NOT security-test the mockup. Its actual work:

1. **Read the mockup.** The 17 Zerodek screens define the intended feature set.
   Walk the screens and extract the features the product is supposed to have.

2. **Find prior art.** Locate open-source repositories that already implement
   those features. The recon decision for this lives in `re/oss-recon/`.

3. **Reverse-engineer the rules — with code references attached.** From each
   chosen repo, extract the rules of each feature: behavior, logic, decisions,
   workflows. Code is reference only, but every rule must carry its code
   reference (repo, path, and where useful the snippet) so each rule is
   auditable and can be revisited. The rule is the deliverable; the code is not.

4. **Deliver tool-agnostic rules.** The rule set must not be tied to any
   language, framework, or library. It states what the product must do and why,
   so the chosen implementation tool can build from it.

Pipeline: mockup → feature list → open-source implementations → rules + code
references → tool-agnostic rule set.

Status: step 2 done (`re/oss-recon/`); steps 1 and 3 not started.
