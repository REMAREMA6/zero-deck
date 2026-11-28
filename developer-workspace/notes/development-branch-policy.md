# Development Branch Policy

**Decision date:** 2026-11-28  
**Authority:** Product Owner instruction in the ZeroDeck development conversation  
**Status:** Active

## Decision

All ZeroDeck implementation and maintenance work is performed directly on the repository's `main` branch. The Developer Agent must not create or use isolated feature/development branches for routine implementation or testing.

## Rationale

The Product Owner explicitly requested a single-branch workflow because the product is still being built and isolated development branches add unnecessary process overhead at this stage. Verification remains necessary, but it is performed through GitHub Actions against `main`, not through a separate branch.

## Operating rules

1. Read and edit product source, migrations, tests, implementation trackers and Developer evidence directly on `main`.
2. Run GitHub Actions after meaningful implementation changes and fix failures before reporting completion.
3. Do not create pull requests or merge branches as part of the normal implementation workflow.
4. If pre-existing branches or pull requests contain outstanding work, inspect their exact changes and integrate the required work into `main` before continuing. Do not blindly merge unrelated or stale work.
5. Do not delete historical branches unless explicitly requested; the policy is to stop using them, not to perform repository cleanup.
6. Keep Architect-owned OpenSpec outcome plans unchanged unless the Product Owner explicitly authorizes an architecture-plan change.
7. This workflow decision does not relax task acceptance criteria, security gates, test evidence, or the rule that unresolved owner decisions must remain unresolved.

## Initial application

Draft PR #2 (task 3.6 authoritative authorization gates) was merged into `main` on 2026-11-28. The resulting `main` commit is `9a84d58e144b923aaab59d48d540c40a2b9ce3c2`. GitHub Actions run [46180883162](https://github.com/REMAREMA6/zero-deck/actions/runs/46180883162) passed on `main`. The historical `developer/authorization-3-6` branch may remain in the repository but is no longer part of the development workflow.
