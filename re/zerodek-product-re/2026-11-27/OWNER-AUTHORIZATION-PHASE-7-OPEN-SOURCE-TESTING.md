# Owner Authorization Record — Phase 7 Open-Source Prior-Art Testing

**Decision ID:** ZD-AUTH-2026-11-27-01  
**Date:** 2026-11-27  
**Scope:** Renewed Phase 7 investigation only

## Owner's rationale for the strict RE-agent default

The owner deliberately wrote the reverse-engineering agent's ownership restriction as an absolute default because agents can misread intent, take liberties, or perform actions the owner did not mean to authorize. The restriction is a safety interlock: when an action is prohibited by default or requires consultation, the agent must stop and ask rather than infer permission. This reduces accidental execution, legal exposure, and other mistakes that could affect the owner.

An absolute default is not a claim that every covered action is permanently forbidden. The owner retains the decision. An agent must not create its own exception, but it may proceed when the owner explicitly reviews and authorizes the specific action and scope.

## Explicit owner authorization

For this renewed Phase 7, the owner explicitly directs the agent to inspect, build, run ordinary project tests, and study the selected public open-source prior-art repositories already pinned in the Phase 3 register:

- SRC-01 MaintainTeam/Hypatia — `c0f98977be935e58849726313635a2459cac3892`
- SRC-02 MaintainTeam/HypatiaDatabases — `3c35f52e1a847caed46d8e1ad34968bfa3c8b10a`
- SRC-06 Cisco-Talos/ClamAV — `cad7b18a3e6505195fe08db1412449a18fc9f012`

This authorization is the owner's explicit override of the uploaded RE-agent written-permission default for the listed, pinned repositories and the ordinary source/build/test work described in the renewed Phase 7 plan. It is not inferred from public availability, a licence, a fork, or repository access. The authorization was given directly by the owner in this conversation on 2026-11-27.

## Limits

This authorization does **not** authorize:

- attacks against live third-party services or infrastructure;
- execution of malware, suspicious files, or weaponized samples;
- DRM, licensing, anti-cheat, authentication, or access-control circumvention;
- publishing generated threat feeds, unsigned/signed packs, or other artifacts to upstream repositories;
- live Google Web Risk calls, URL disclosure, billing, or other provider-side effects without the separate specific approval and credentials already required by the project procedure;
- adoption, copying, or redistribution of third-party code or datasets without a separate licence and provenance review;
- testing any unlisted third-party target or revision.

Use exact pinned revisions, ordinary build/test inputs, ephemeral GitHub-hosted runners where suitable, least-privilege permissions, and no secrets unless separately authorized. For HypatiaDatabases, avoid external feed ingestion and publication; use safe deterministic fixtures or bounded compile/test paths. For ClamAV, use harmless built-in/example tests and do not execute malware samples.

## Agent decision rule going forward

1. Treat the uploaded absolute restriction as the protective default.
2. If a proposed action falls under a stop/consult rule, stop and ask the owner; do not infer an exception.
3. Record the owner's exact scope of authorization and its limits.
4. Proceed only within that scope, respecting licences and other safety constraints.
5. If authorization is absent or ambiguous, do not proceed with the restricted action; record the blocker and continue with unrelated eligible work.
6. Never weaken or delete the default merely because one scoped exception was authorized.

**Status:** Explicitly authorized for the three listed pinned targets and ordinary Phase 7 build/test/research activity, within the limits above.
