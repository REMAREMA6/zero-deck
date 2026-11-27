# Owner Decision — Pro-gated website and link checking

**Decision ID:** ZD-DEC-2026-11-27-02  
**Date:** 2026-11-27  
**Authority:** Explicit owner instruction in the active ZeroDeck reverse-engineering session.  
**Related scope:** ZD-SCOPE-001; MVP capability MVP-03 (website and link checking).  
**Status:** Approved.

## Decision

Website and link checking remains one of the three approved ZeroDeck MVP capabilities, but it is not a free-tier capability.

- Access to website/link checking is gated behind the **Pro** entitlement.
- The capability is to remain locked until the owner chooses to activate it when paid-user revenue can fund its operating/API costs.
- ZeroDeck must not silently absorb third-party lookup charges before the capability is commercially enabled.
- The Pro entitlement is an access/business rule. It must be represented separately from URL-check execution, provider verdicts, errors and result semantics.
- When activated, paid entitlement alone is not proof that a check succeeded. The system must still report provider outcomes and failures accurately.
- The feature must remain unavailable when it is disabled by the owner/configuration, even if the user has Pro access.
- No promise is made here about Pro pricing, launch date, provider, API quota, or exact activation threshold.

## Research implications

1. Continue evaluating a commercially permitted provider and its cost model.
2. Preserve a provider-independent link-checking capability contract so the service can be enabled, disabled, budget-limited or replaced without changing the user-facing rule semantics.
3. Evaluate usage controls, quotas, cache behaviour, timeouts and provider cost exposure before activation.
4. Do not call a paid API for free-tier users.
5. Do not treat a Pro user as entitled to unlimited calls unless a separate product/billing decision explicitly establishes that.
6. Keep the capability in the approved MVP scope; Pro gating changes availability, not scope membership.

## Evidence boundary

This is a declared product/business decision, not an observed behaviour from the current reference application or a verified implementation. It must be classified as owner-declared intent in later Software Rules synthesis.

## Related research

See `PHASE-3-PRIOR-ART-REGISTER.md` for Web Risk Lookup API pricing and contract, Safe Browsing v4 commercial restriction, and URLhaus commercial-use conditions.
