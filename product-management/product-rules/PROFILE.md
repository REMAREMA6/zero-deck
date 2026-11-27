# ZeroDeck Product Requirements Contract Profile

**Profile:** `zero-deck.pm-product-requirements`  
**Profile version:** `1.0.0-draft`  
**Author:** ZeroDeck Product Management Agent  
**Product:** ZeroDeck  
**Phase:** 1 — complete  
**Status:** Draft profile for owner review; no feature contract is approved by this profile alone.

## 1. Purpose and boundary

This profile defines how the ZeroDeck Product Management Agent authors product requirements and represents them using the current Software Rules specification. It is a product-requirements authoring profile, not a new Software Rules evidence class and not a runtime-capture format.

A PM-authored requirement declares intended or required product behaviour. It must remain distinguishable from:
- runtime rules established from observations of an executing product;
- source-derived rules inferred from implementation artifacts; and
- actual runtime observations and their evidence.

The product contract is authoritative for intended behaviour only to the extent that its status and owner decision say so. It never proves that an implementation behaves accordingly.

## 2. Pinned upstream compatibility target

The profile was designed against this exact Software Rules repository state:

| Item | Value |
|---|---|
| Repository | https://github.com/REMAREMA6/software-rules |
| Inspected commit | `5591a2e62287afc29bde002369eaf659673ec59b` |
| Specification release | 0.3.0 Draft |
| Schema version | 0.2.0 Draft |
| JSON Schema dialect | Draft 2020-12 |
| Capture schema | `schemas/v1/capture.schema.json` |
| Common record definitions | `schemas/v1/records.schema.json` |

Relevant upstream rules:
- The capture has a `declaredContracts` array whose items use the common `declaredContract` definition.
- `declaredContract` is a distinct record type. It is not a runtime rule or source-derived rule.
- The evidence schema separately permits `evidenceClass: declared-contract`; this identifies a retained contract artifact, not an observation.
- The core `declaredContract` fields are `contractId`, `contractType`, `title`, `issuer`, `artifact`, `scope`, `statements`, `retrievedAt`, `evidenceRefs`, and `extensions`.
- Core-required fields are only `contractId`, `contractType`, `artifact`, and `scope`. This profile deliberately requires more.
- A statement contains `statementId`, `text`, and optional `location`; unknown sibling fields are rejected.
- The artifact object supports `uri`, `version`, `revision`, `digest`, and `mediaType`.
- The `extensions` object is the designated location for additional structured data. Unknown core sibling properties must not be added.
- The current schema is Draft and has no stable backward-compatibility guarantee.

Do not silently upgrade this profile to a newer Software Rules schema. When the upstream dependency changes, inspect the new specification and schema, compare the relevant structures, update the compatibility pin, and document any migration before changing generated contracts.

## 3. Canonical representation

Each capability has one canonical, human-readable PM contract artifact in Markdown under `product-rules/contracts/`. The corresponding Software Rules representation is a `declaredContracts[]` record in a Software Rules capture.

The Markdown contract is the editable source of truth. The Software Rules record is its structured projection. Do not maintain two independently edited versions of the normative statements.

### 3.1 Required declaredContract mapping

| Software Rules field | Profile rule |
|---|---|
| `contractId` | Stable ID: `ZD-CONTRACT-<CAPABILITY>`, e.g. `ZD-CONTRACT-AUTH`. Never reuse it for a different capability/scope. |
| `contractType` | Exact value: `product-requirements-contract`. |
| `title` | Human-readable product/capability contract title. |
| `issuer` | Required exact value: `ZeroDeck Product Management Agent`. This explicitly identifies the authoring authority. |
| `artifact.uri` | Canonical repository path/URL of the Markdown contract. |
| `artifact.version` | Contract version, initially `0.1.0-draft`. |
| `artifact.revision` | Immutable Git commit SHA containing that artifact. |
| `artifact.digest` | SHA-256 digest of the exact UTF-8 artifact bytes, formatted `sha256:<lowercase-hex>`. |
| `artifact.mediaType` | `text/markdown`. |
| `scope` | Concise, explicit capability and product-boundary description. |
| `statements[]` | One atomic normative requirement per item. |
| `statements[].statementId` | Stable requirement ID, e.g. `ZD-AUTH-001`. |
| `statements[].text` | The normative statement itself; no rationale, priority, or implementation prescription mixed into it. |
| `statements[].location` | Heading/anchor in the canonical Markdown contract. |
| `evidenceRefs[]` | References to retained evidence records for the contract artifact and any supporting evidence. |
| `extensions.zeroDeckProductRequirements` | Structured PM metadata validated by the local extension schema below. |
| `retrievedAt` | Omit for a newly authored contract; it is a retrieval timestamp, not the authored/approved date. Do not misuse it. |

The PM profile requires `issuer`, all artifact identity fields, at least one statement, and the namespaced extension even though the upstream core schema permits some of them to be absent.

### 3.2 Evidence artifact mapping

Create a matching evidence record for the canonical Markdown contract:
- `evidenceId`: stable ID such as `ZD-EV-CONTRACT-AUTH-001`.
- `evidenceClass`: `declared-contract`.
- `evidenceType`: `product-requirements-contract`.
- `origin.sourceUri`: canonical contract artifact URL/path.
- `origin.sourceRevision`: immutable Git commit SHA.
- `capturedAt`: time the evidence record was created.
- `locator`: canonical repository path.
- `retention.status`: `retained`.
- `retention.access`: access/location description.

The declared contract's `evidenceRefs` must point to the matching evidence record. This is provenance for the declared artifact; it is not runtime evidence.

## 4. Namespaced extension profile

All PM-specific metadata lives under exactly:

```json
{
  "extensions": {
    "zeroDeckProductRequirements": {
      "profileId": "zero-deck.pm-product-requirements",
      "profileVersion": "1.0.0-draft"
    }
  }
}
```

The complete PM record schema is `schemas/zero-deck-pm-declared-contract.schema.json`; it composes the upstream `declaredContract` definition with ZeroDeck's stricter author, artifact, statement, and extension requirements. It references the pinned upstream records schema and the local extension schema. The extension schema is `schemas/zero-deck-pm-requirements-extension.schema.json` and validates the contents of `extensions.zeroDeckProductRequirements`. Validate the containing capture separately with the pinned upstream capture schema.

The extension contains:
- explicit author identity and role;
- pinned Software Rules release/schema compatibility;
- contract lifecycle status;
- capability identifier;
- one metadata entry per declared statement;
- unresolved product questions; and
- explicit owner approval metadata when the contract is owner-approved.

### 4.1 Requirement metadata

Every extension requirement entry must match exactly one `statements[].statementId`. Every statement must have exactly one extension entry. The two sets must be identical. Each requirement must also contain at least one `basis` item so a recommendation cannot appear evidence-backed when it is only PM inference.

| Field | Meaning |
|---|---|
| `statementId` | Exact matching ID from the declared contract statement. |
| `requirementType` | Functional, business-rule, data, security, privacy, usability, compatibility, performance, reliability, operational, commercial, or policy requirement. |
| `normativeKind` | `required`, `forbidden`, `permitted`, or `conditional`. |
| `priority` | `P0` critical, `P1` high, `P2` medium, `P3` low. Priority is not the same as normative force. |
| `decisionStatus` | `pm-proposed`, `owner-approved`, `owner-rejected`, or `deferred`. |
| `facetRefs` | One or more exact Software Rules facet IDs relevant to the requirement. |
| `platforms` | Explicit applicability: `web`, `android`, or both. |
| `subject` | Product concept, actor, resource, or boundary the requirement concerns. |
| `conditions` | Explicit conditions for a conditional requirement. |
| `preconditions`, `inputs`, `outcomes` | Relevant scenario context and externally meaningful results. |
| `forbiddenBehaviors` | Specific prohibited outcomes/actions where useful. |
| `rationale` | Why the requirement exists; does not alter its normative force. |
| `basis` | One or more explicitly classified bases: owner decision, external research, platform contract, source evidence, user research, PM inference, or other. PM inference must be labelled as such. |
| `acceptanceCriteria` | One or more Given/When/Then criteria with a verification method. |
| `dependencies` | Other requirement IDs that must be satisfied first or together. |
| `assumptions`, `constraints` | Explicit assumptions and product/platform boundaries. |
| `decisionRefs` | IDs in the product decision/traceability register. Required for owner-approved, rejected, or deferred statuses. |
| `evidenceRefs` | IDs in the product evidence/traceability register. |

### 4.2 Normative language

Use only these binding forms in statement text:
- **MUST** — required behaviour.
- **MUST NOT** — forbidden behaviour.
- **MAY** — permitted/optional behaviour.
- **Conditional MUST/MUST NOT/MAY** — binding only when the condition stated in the same requirement holds.

Do not use vague terms such as "should", "normally", "fast", "secure", "appropriate", or "user-friendly" as acceptance criteria without a measurable definition. Put advice/recommendations outside normative statements and label them as recommendations.

One statement expresses one independently testable obligation. Split compound statements when their clauses can pass or fail independently. Avoid implementation-specific instructions unless a platform contract or owner decision makes them necessary.

### 4.3 Priority and approval are separate

- Priority communicates implementation importance.
- Normative kind communicates whether behaviour is mandatory, forbidden, permitted, or conditional.
- Decision status communicates whether the Product Owner has approved the requirement.
- A PM-authored statement remains `pm-proposed` until an explicit owner decision is recorded.
- Never infer approval from silence, repository merge, a successful test, or the PM's recommendation.
- When owner-approved, add a decision record/reference and the contract-level `ownerApproval` metadata.

## 5. Identifier and version policy

### Contract IDs
- Pattern: `ZD-CONTRACT-<CAPABILITY>`.
- Examples: `ZD-CONTRACT-AUTH`, `ZD-CONTRACT-FILE-ANALYSIS`, `ZD-CONTRACT-QUARANTINE`, `ZD-CONTRACT-LINK-CHECK`, `ZD-CONTRACT-SYSTEM`.
- One contract per bounded capability or coherent cross-cutting scope.
- Keep the contract ID when revising the same capability contract; create a new ID only for a genuinely separate scope.

### Requirement IDs
- Pattern: `ZD-<CAPABILITY>-<NNN>`, e.g. `ZD-AUTH-001`.
- IDs are unique across the ZeroDeck PM product-rules workspace, not merely within one file.
- Never recycle an ID. Keep it when wording is clarified without changing the underlying obligation.
- Assign a new ID when the subject, trigger, applicability, or required outcome materially changes; record the old/new relationship and reason.

### Acceptance criterion IDs
- Pattern: `ZD-<CAPABILITY>-AC-<NN>`, e.g. `ZD-AUTH-AC-01`.
- Unique within the product-rules workspace.

### Question IDs
- Pattern: `ZD-Q-<CAPABILITY>-<NNN>`.
- A question is not silently converted into a requirement. Resolve it, defer it with consequence, or keep it open.

### Versioning
Use `MAJOR.MINOR.PATCH-draft` while the contract is not owner-approved:
- MAJOR: breaking change to scope or normative meaning, removal of a requirement, or incompatible reinterpretation.
- MINOR: additive requirement or non-breaking change to contract coverage.
- PATCH: editorial/structural clarification with no change to normative meaning.

After owner approval, retain the same versioning rules and record the owner decision. Every published Software Rules projection pins the exact Markdown artifact revision and digest.

## 6. Facet mapping

Use the official Software Rules facet IDs, not display labels or implementation modules:

`interface`, `behavior`, `business-rules`, `data`, `persistence`, `api`, `messaging`, `identity-authentication`, `authorization-permissions`, `security-controls`, `background-processing`, `errors-recovery`, `integrations`, `configuration`, `performance-resource-behavior`.

Map by the primary semantic question, and include multiple facets when a requirement genuinely crosses boundaries. In particular:
- identity establishment/session lifecycle → `identity-authentication`;
- access permission/enforcement → `authorization-permissions`;
- security mechanism/control → `security-controls`;
- domain eligibility/quotas/pricing → `business-rules`;
- request/response contract → `api`;
- external provider behaviour → `integrations`;
- durable state lifecycle → `persistence`;
- failure and recovery semantics → `errors-recovery`.

A facet is an observation perspective, not a code module. Do not force every requirement into one facet or claim every facet is applicable to every capability.

## 7. Validation procedure

Every published contract must pass all of these layers:

1. **Upstream structural validation:** validate the containing capture against the pinned Software Rules 0.2.0 Draft `capture.schema.json` and `records.schema.json` (Draft 2020-12).
2. **PM record-profile validation:** validate each `declaredContracts[]` item against `schemas/zero-deck-pm-declared-contract.schema.json`, registering the pinned upstream records schema and the local extension schema.
3. **Direct extension validation:** validate each `declaredContracts[].extensions.zeroDeckProductRequirements` against `schemas/zero-deck-pm-requirements-extension.schema.json` when validating or editing the extension independently.
4. **Record integrity:** all contract IDs, statement IDs, evidence IDs, decision IDs, and references are unique/resolvable; each contract's evidence references resolve to the correct retained artifact evidence record.
5. **Statement/metadata parity:** extension requirement statement IDs and declared statement IDs are an exact one-to-one set; no orphan statement and no orphan metadata.
6. **Normative consistency:** normativeKind matches the uppercase normative term in statement text; conditional requirements contain explicit conditions; each statement is atomic.
7. **Facet validity:** every facetRef is one of the 15 accepted IDs in the pinned upstream facet catalogue.
8. **Testability:** every requirement has at least one observable Given/When/Then acceptance criterion and a stated verification method.
9. **Authority/provenance:** issuer and extension author are exact; approval states have decision references; claims are traceable to owner decisions, external evidence, platform contracts, or labelled PM inference.
10. **Technology-independence:** reject unnecessary framework, language, database, hosting, vendor, or code-structure prescriptions.
11. **Completeness/consistency review:** check applicable normal, boundary, denied, failure, interruption, recovery, privacy, and cross-facet cases; unresolved questions remain visible.

JSON Schema validation alone does not establish issuer authenticity, evidence truth, semantic completeness, requirement quality, or runtime conformance. The semantic and owner-authority checks above are mandatory.

## 8. What this profile does not decide

This profile does not decide ZeroDeck's authentication methods, verification channels, MFA, recovery mechanism, session policy, file-analysis engine, provider, retention durations, pricing, quotas, or final implementation architecture. Those are feature-contract decisions for later phases and/or the Product Owner.

The profile also does not change the Software Rules specification or claim that its current Draft schema is stable or exhaustive.

## 9. Phase 1 exit checklist

- [x] Pinned and inspected the exact upstream specification/schema revision.
- [x] Selected the existing `declaredContract` record and `declared-contract` evidence class without inventing a fourth class.
- [x] Defined exact field mapping and explicit PM issuer/author identity.
- [x] Defined a namespaced extension location, extension JSON Schema, and complete PM declared-contract JSON Schema.
- [x] Defined contract, requirement, acceptance-criterion, question and evidence identifier conventions.
- [x] Defined normative language, priority, owner-approval status and versioning semantics.
- [x] Defined official facet mapping and technology-independence rules.
- [x] Defined structural, extension, integrity, semantic and owner-authority validation layers.
- [x] Added explicit basis classification so owner decisions, external research, platform contracts, source evidence, user research and PM inference cannot be silently conflated.
- [x] Created a declared-contract template and retained-evidence template.
- [x] Kept all changes inside ZeroDeck `product-management/`; no Software Rules core files changed.

**Phase 1 result:** complete. Phase 2 may begin. The profile is a PM working standard; individual ZeroDeck requirements remain un-authored and unapproved until their own contract phases are completed.
