# Typed facet payload mapping

This document maps the complete semantic dimension inventory of the governing Software Rules 0.3.0 facets to ZeroDeck's approved scenarios. The corresponding wire schemas are draft 0.2.0 under `REMAREMA6/software-rules/schemas/v1/facets/`. The typed schema is a serialization contract; it is not proof that the scenario inventory is exhaustive or that any value was observed.

## interface

1. Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries
2. Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state
3. Content: rendered text, accessible name/description, content type, truncation/overflow
4. Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method
5. Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation
6. Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow
7. Layering: stacking context, z/paint order, overlays, modal/top-layer state
8. Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping
9. Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics
10. Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour
11. Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state
12. Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence
13. UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection

## behavior

1. Trigger or stimulus
2. Preconditions
3. Actor/context
4. Ordered action/event sequence
5. Before/after state references
6. Transition(s)
7. Observable outputs
8. Emitted events
9. Side-effect references
10. Timing/order
11. Termination/result
12. Uncertainty

## business-rules

1. Decision subject
2. Inputs and input provenance
3. Applicable conditions
4. Rule/decision identifier if exposed
5. Evaluated branch/criteria where observable
6. Output/decision
7. Calculation operands and result
8. Units/precision/rounding
9. Effective period
10. Actor/context
11. Evidence; unknown internal criteria remain unknown

## data

1. Data subject/schema identity
2. Field path
3. Observed value/type
4. Null versus missing distinction
5. Units/format
6. Relationships/references
7. Constraints evidenced by execution
8. Transformation steps
9. Validation result
10. Serialization representation
11. Source/target context
12. Redaction and completeness

## persistence

1. Store/resource identity
2. Operation (read/write/update/delete)
3. Key/selector
4. Before/after state
5. Transaction boundary
6. Commit/rollback result
7. Consistency/visibility observation
8. Ordering
9. Durability test interval
10. Concurrency context
11. Retention/expiry
12. Evidence access method

## api

1. Protocol and version
2. Endpoint/operation identity
3. Method
4. Target
5. Request headers/query/path/body
6. Authentication context (redacted)
7. Response status/headers/body
8. Content types
9. Timing boundaries/units
10. Correlation IDs
11. Retries/redirects
12. Transport errors
13. Linked side-effect observations

## messaging

1. Channel/topic/queue identity
2. Message ID/correlation/causation
3. Envelope and payload
4. Producer/consumer identity
5. Publish/accept time
6. Delivery attempts
7. Ordering/partition
8. Acknowledgement
9. Retry/redelivery
10. Dead-letter result
11. Processing outcome
12. Broker/consumer context

## identity-authentication

1. Privacy-safe principal reference
2. Authentication mechanism/protocol
3. Credential type (never secret value)
4. Issuer/audience where relevant
5. Session/token lifecycle metadata
6. Challenge
7. Success/failure/step-up outcome
8. Claims actually exposed
9. Expiry/refresh/revocation
10. Evidence/redaction

## authorization-permissions

1. Principal identity reference
2. Authentication context reference
3. Action
4. Resource
5. Environment/context attributes
6. Policy/role/capability evidence where exposed
7. Decision (permit/deny/indeterminate)
8. Enforcement point
9. Response/side effect
10. Reason/evidence when available

## security-controls

1. Threat/test objective
2. Authorized test scope
3. Control under examination
4. Attack/stimulus class
5. Environment and configuration
6. Observed detection/block/allow outcome
7. Control response
8. Telemetry/audit evidence
9. Exposure/impact observed
10. Safety constraints

## background-processing

1. Job/task identity
2. Trigger/source
3. Schedule/time basis
4. Enqueue/acceptance
5. Worker identity/version
6. Lifecycle states
7. Attempt count
8. Start/end
9. Inputs/reference
10. Output
11. Side effects
12. Timeout/cancellation
13. Retry/backoff
14. Terminal result
15. Correlation to initiating operation

## errors-recovery

1. Failure trigger/context
2. Failing operation reference
3. Error category/code/message as exposed
4. Origin if established
5. Propagation boundary
6. Retry/fallback/compensation action
7. Recovery state
8. Terminal outcome
9. Timing
10. Impact
11. Evidence; distinguish expected validation rejection from unexpected fault

## integrations

1. External system/provider identity
2. Boundary
3. Direction
4. Operation
5. Protocol reference
6. Request/response or message references
7. Credentials context (redacted)
8. Timeout/retry/circuit-breaker behaviour
9. Mapping/transformation
10. Dependency outcome
11. Correlation

## configuration

1. Configuration key/semantic identity
2. Effective value or redacted marker
3. Type/unit
4. Source/origin if exposed
5. Scope/precedence
6. Activation time
7. Mutability/reload behaviour
8. Target/build/environment
9. Observed behavioural effect link

## performance-resource-behaviour

1. Metric name/definition
2. Value
3. Unit
4. Aggregation/statistic
5. Measurement boundary
6. Start/end
7. Workload and concurrency
8. Sample count
9. Warm/cold state
10. Hardware/runtime/build
11. Resource scope
12. Collection method
13. Sampling/overhead
14. Uncertainty

## Scenario applicability

- **MVP-FILE-001:** interface, behavior, data, authorization-permissions, security-controls, errors-recovery, configuration, performance-resource-behaviour.
- **MVP-FILE-002:** interface, behavior, business-rules, data, security-controls, errors-recovery.
- **MVP-QUAR-001:** interface, behavior, business-rules, data, persistence, authorization-permissions, security-controls, errors-recovery, integrations, performance-resource-behaviour.
- **MVP-QUAR-002:** interface, behavior, business-rules, data, authorization-permissions, security-controls, errors-recovery.
- **MVP-QUAR-003:** interface, behavior, business-rules, data, persistence, authorization-permissions, security-controls, errors-recovery, performance-resource-behaviour.
- **MVP-LINK-001:** interface, behavior, business-rules, data, api, identity-authentication, authorization-permissions, security-controls, errors-recovery, integrations, configuration, performance-resource-behaviour.
- **MVP-LINK-002:** interface, behavior, business-rules, data, api, security-controls, errors-recovery, integrations, configuration, performance-resource-behaviour.

`messaging` and `background-processing` remain in the 15-facet universe but are not currently assigned to an approved MVP scenario. Their applicability is unresolved rather than assumed absent.