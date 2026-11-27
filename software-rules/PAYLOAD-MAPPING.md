# ZeroDeck — Typed Facet Payload Mapping

**Maturity:** Draft  
**Governing schemas:** Software Rules schema 0.2.0 Draft, JSON Schema 2020-12  
**Important:** This is a payload plan. No ZeroDeck runtime observations have been fabricated to populate it.

The governing format requires one typed payload per observation. The capture uses the 15 facet IDs below. Payloads are created only when a corresponding runtime observation exists; an unknown property is represented in the replication property inventory and coverage, not as a fake empty observation.

| Facet ID | Payload schema | Required discriminator | Capture dimensions to populate when observed |
|---|---|---|---|
| interface | `schemas/v1/facets/interface.schema.json` | `facet=interface`, `kind=snapshot` | platformContext; viewport; roots; ordered nodes; accessibilityTree; assets; uiState; renderingEvidence; completeness |
| behavior | `schemas/v1/facets/behavior.schema.json` | `facet=behavior`, `kind=triggered-operation` | trigger; preconditions; actor; ordered actions; stateTransitions; outputs; emittedEvents; sideEffects; timing; termination |
| business-rules | `schemas/v1/facets/business-rules.schema.json` | `facet=business-rules`, `kind=domain-decision` | decisionSubject; inputs; conditions; ruleIdentifier; evaluatedCriteria; decision; calculation; effectivePeriod; actor |
| data | `schemas/v1/facets/data.schema.json` | `facet=data`, `kind=data-value` | dataSubject; fieldPath; observedValue/type; nullability; format; relationships; constraints; transformations; validation; serialization; redaction |
| persistence | `schemas/v1/facets/persistence.schema.json` | `facet=persistence`, `kind=state-operation` | store; operation; selector; before/after state; transaction; commitResult; consistency; ordering; durabilityInterval; concurrency; retention |
| api | `schemas/v1/facets/api.schema.json` | `facet=api`, `kind=request-response` | protocol; endpoint; method; target; request; response; timing; correlationIds; redirects; retries; transportError; side-effect observation references |
| messaging | `schemas/v1/facets/messaging.schema.json` | `facet=messaging`, `kind=message-lifecycle` | channel; message envelope; producer/consumer; publish/accept times; delivery attempts; ordering; acknowledgement; redelivery; dead-letter; processing outcome; broker context |
| identity-authentication | `schemas/v1/facets/identity-authentication.schema.json` | `facet=identity-authentication`, `kind=authentication-event` | privacy-safe principalRef; mechanism/protocol; credential type; issuer/audience; session; challenge; outcome; claims; expiry; refresh; revocation |
| authorization-permissions | `schemas/v1/facets/authorization-permissions.schema.json` | `facet=authorization-permissions`, `kind=access-decision` | principal/authentication context; action; resource; context attributes; policy evidence; permit/deny/indeterminate decision; enforcement point; response/reason |
| security-controls | `schemas/v1/facets/security-controls.schema.json` | `facet=security-controls`, `kind=security-control-outcome` | test objective; authorized scope; control; stimulus class; environment; detected/blocked/allowed/contained/not-detected/inconclusive outcome; response; telemetry; impact; safety constraints |
| background-processing | `schemas/v1/facets/background-processing.schema.json` | `facet=background-processing`, `kind=job-lifecycle` | job; trigger/schedule; enqueue; worker; lifecycle; attempts; start/end; inputs/output; side effects; timeout/cancellation; retry; terminal result; correlation |
| errors-recovery | `schemas/v1/facets/errors-recovery.schema.json` | `facet=errors-recovery`, `kind=failure-recovery-event` | trigger; operationRef; error category/code/message; origin; propagation boundary; recovery actions/state; terminal outcome; timing/impact; expected-rejection flag |
| integrations | `schemas/v1/facets/integrations.schema.json` | `facet=integrations`, `kind=external-interaction` | provider; boundary; direction; operation; protocol/request/response references; redacted credential context; resilience; mapping; dependency outcome; correlation |
| configuration | `schemas/v1/facets/configuration.schema.json` | `facet=configuration`, `kind=effective-configuration` | key; effective value or redaction; type/unit; origin; scope/precedence; activation time; mutability/reload; target context; linked effect observations |
| performance-resource-behaviour | `schemas/v1/facets/performance-resource-behaviour.schema.json` | `facet=performance-resource-behaviour`, `kind=measurement` | metric/definition/value/unit/statistic; measurement boundary/time; workload/concurrency/sample count; warm state; hardware/runtime; resource scope; collection/sampling/uncertainty |

## Common observation envelope

Every future observation must also carry the common envelope required by the governing schema: observation identity; target; execution or explicit runtime interval; facet and subject; observation time/sequence where available; runtime method class and procedure; conditions and trigger; typed payload; raw value/normalization where relevant; evidence references; status; limitations and redactions.

## ZeroDeck cross-facet capture chains

- **File scan:** interface selection → behaviour trigger/lifecycle → authorization and file access → data/file identity → security-control outcome → business classification → errors/recovery → performance measurement.
- **Quarantine:** classification → business eligibility → permission/provider capability → persistence operation → data identity/integrity → security-control outcome → interface state → error/recovery. Link the same operation across facets using stable references/correlation where established.
- **Link check:** input/interface → URL data validation → Pro/activation authorization and configuration → API request/response only if actually observed → integration/provider boundary → business result interpretation → error/recovery → user-facing interface → performance measurement.

## Non-observation rule

A schema-valid placeholder payload is not an observation. Until a ZeroDeck execution and evidence artifact exist, keep `observations` empty, coverage `not-observed`, and the corresponding replication property `unknown` or `not-observed` with a reason. Do not use null, empty objects, zero values, or invented defaults to simulate missing runtime evidence.
