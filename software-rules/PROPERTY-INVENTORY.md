# ZeroDeck MVP — Scenario-level property inventory

**Status:** Phase 5 synthesis inventory; all runtime values remain unobserved. This inventory enumerates the governing facet dimensions per approved scenario. It is not a runtime capture, not an implementation prescription, and not a claim of replication sufficiency.

## How to read this inventory

- Each scenario/facet pair is taken from `capture.json` scenario `facetIds`; this preserves the Phase 2 scope mapping.
- Each dimension is taken from the corresponding governing Software Rules 0.3.0 facet specification, not invented as a ZeroDeck-specific implementation rule.
- `Required` means the dimension must be investigated/captured to reproduce the scenario if that facet applies. It does not mean a particular value or mechanism is already known.
- `Not observed` means no ZeroDeck runtime execution has established the value. It is not equivalent to absent, false, empty, or not applicable.
- Owner decisions and product working-draft statements remain in their separate evidence classes and are not upgraded into runtime observations.

## Scenario/facet inventory

### MVP-FILE-001 — Select a file and initiate manual scan

Capture the full manual file-analysis workflow. Trigger: User selects a supported file and requests a manual scan.

#### interface

| Property dimension | Capture state |
|---|---|
| Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries | Required; not observed at runtime |
| Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state | Required; not observed at runtime |
| Content: rendered text, accessible name/description, content type, truncation/overflow | Required; not observed at runtime |
| Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method | Required; not observed at runtime |
| Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation | Required; not observed at runtime |
| Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow | Required; not observed at runtime |
| Layering: stacking context, z/paint order, overlays, modal/top-layer state | Required; not observed at runtime |
| Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping | Required; not observed at runtime |
| Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics | Required; not observed at runtime |
| Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour | Required; not observed at runtime |
| Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state | Required; not observed at runtime |
| Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence | Required; not observed at runtime |
| UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection | Required; not observed at runtime |

#### behavior

| Property dimension | Capture state |
|---|---|
| Trigger or stimulus | Required; not observed at runtime |
| Preconditions | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Ordered action/event sequence | Required; not observed at runtime |
| Before/after state references | Required; not observed at runtime |
| Transition(s) | Required; not observed at runtime |
| Observable outputs | Required; not observed at runtime |
| Emitted events | Required; not observed at runtime |
| Side-effect references | Required; not observed at runtime |
| Timing/order | Required; not observed at runtime |
| Termination/result | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

#### data

| Property dimension | Capture state |
|---|---|
| Data subject/schema identity | Required; not observed at runtime |
| Field path | Required; not observed at runtime |
| Observed value/type | Required; not observed at runtime |
| Null versus missing distinction | Required; not observed at runtime |
| Units/format | Required; not observed at runtime |
| Relationships/references | Required; not observed at runtime |
| Constraints evidenced by execution | Required; not observed at runtime |
| Transformation steps | Required; not observed at runtime |
| Validation result | Required; not observed at runtime |
| Serialization representation | Required; not observed at runtime |
| Source/target context | Required; not observed at runtime |
| Redaction and completeness | Required; not observed at runtime |

#### authorization-permissions

| Property dimension | Capture state |
|---|---|
| Principal identity reference | Required; not observed at runtime |
| Authentication context reference | Required; not observed at runtime |
| Action | Required; not observed at runtime |
| Resource | Required; not observed at runtime |
| Environment/context attributes | Required; not observed at runtime |
| Policy/role/capability evidence where exposed | Required; not observed at runtime |
| Decision (permit/deny/indeterminate) | Required; not observed at runtime |
| Enforcement point | Required; not observed at runtime |
| Response/side effect | Required; not observed at runtime |
| Reason/evidence when available | Required; not observed at runtime |

#### security-controls

| Property dimension | Capture state |
|---|---|
| Threat/test objective | Required; not observed at runtime |
| Authorized test scope | Required; not observed at runtime |
| Control under examination | Required; not observed at runtime |
| Attack/stimulus class | Required; not observed at runtime |
| Environment and configuration | Required; not observed at runtime |
| Observed detection/block/allow outcome | Required; not observed at runtime |
| Control response | Required; not observed at runtime |
| Telemetry/audit evidence | Required; not observed at runtime |
| Exposure/impact observed | Required; not observed at runtime |
| Safety constraints | Required; not observed at runtime |

#### errors-recovery

| Property dimension | Capture state |
|---|---|
| Failure trigger/context | Required; not observed at runtime |
| Failing operation reference | Required; not observed at runtime |
| Error category/code/message as exposed | Required; not observed at runtime |
| Origin if established | Required; not observed at runtime |
| Propagation boundary | Required; not observed at runtime |
| Retry/fallback/compensation action | Required; not observed at runtime |
| Recovery state | Required; not observed at runtime |
| Terminal outcome | Required; not observed at runtime |
| Timing | Required; not observed at runtime |
| Impact | Required; not observed at runtime |
| Evidence; distinguish expected validation rejection from unexpected fault | Required; not observed at runtime |

#### configuration

| Property dimension | Capture state |
|---|---|
| Configuration key/semantic identity | Required; not observed at runtime |
| Effective value or redacted marker | Required; not observed at runtime |
| Type/unit | Required; not observed at runtime |
| Source/origin if exposed | Required; not observed at runtime |
| Scope/precedence | Required; not observed at runtime |
| Activation time | Required; not observed at runtime |
| Mutability/reload behaviour | Required; not observed at runtime |
| Target/build/environment | Required; not observed at runtime |
| Observed behavioural effect link | Required; not observed at runtime |

#### performance-resource-behaviour

| Property dimension | Capture state |
|---|---|
| Metric name/definition | Required; not observed at runtime |
| Value | Required; not observed at runtime |
| Unit | Required; not observed at runtime |
| Aggregation/statistic | Required; not observed at runtime |
| Measurement boundary | Required; not observed at runtime |
| Start/end | Required; not observed at runtime |
| Workload and concurrency | Required; not observed at runtime |
| Sample count | Required; not observed at runtime |
| Warm/cold state | Required; not observed at runtime |
| Hardware/runtime/build | Required; not observed at runtime |
| Resource scope | Required; not observed at runtime |
| Collection method | Required; not observed at runtime |
| Sampling/overhead | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

### MVP-FILE-002 — Capture file-analysis result and failure branches

Capture each distinct scan classification and operational failure. Trigger: A scan reaches a result or failure branch.

#### interface

| Property dimension | Capture state |
|---|---|
| Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries | Required; not observed at runtime |
| Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state | Required; not observed at runtime |
| Content: rendered text, accessible name/description, content type, truncation/overflow | Required; not observed at runtime |
| Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method | Required; not observed at runtime |
| Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation | Required; not observed at runtime |
| Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow | Required; not observed at runtime |
| Layering: stacking context, z/paint order, overlays, modal/top-layer state | Required; not observed at runtime |
| Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping | Required; not observed at runtime |
| Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics | Required; not observed at runtime |
| Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour | Required; not observed at runtime |
| Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state | Required; not observed at runtime |
| Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence | Required; not observed at runtime |
| UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection | Required; not observed at runtime |

#### behavior

| Property dimension | Capture state |
|---|---|
| Trigger or stimulus | Required; not observed at runtime |
| Preconditions | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Ordered action/event sequence | Required; not observed at runtime |
| Before/after state references | Required; not observed at runtime |
| Transition(s) | Required; not observed at runtime |
| Observable outputs | Required; not observed at runtime |
| Emitted events | Required; not observed at runtime |
| Side-effect references | Required; not observed at runtime |
| Timing/order | Required; not observed at runtime |
| Termination/result | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

#### business-rules

| Property dimension | Capture state |
|---|---|
| Decision subject | Required; not observed at runtime |
| Inputs and input provenance | Required; not observed at runtime |
| Applicable conditions | Required; not observed at runtime |
| Rule/decision identifier if exposed | Required; not observed at runtime |
| Evaluated branch/criteria where observable | Required; not observed at runtime |
| Output/decision | Required; not observed at runtime |
| Calculation operands and result | Required; not observed at runtime |
| Units/precision/rounding | Required; not observed at runtime |
| Effective period | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Evidence; unknown internal criteria remain unknown | Required; not observed at runtime |

#### data

| Property dimension | Capture state |
|---|---|
| Data subject/schema identity | Required; not observed at runtime |
| Field path | Required; not observed at runtime |
| Observed value/type | Required; not observed at runtime |
| Null versus missing distinction | Required; not observed at runtime |
| Units/format | Required; not observed at runtime |
| Relationships/references | Required; not observed at runtime |
| Constraints evidenced by execution | Required; not observed at runtime |
| Transformation steps | Required; not observed at runtime |
| Validation result | Required; not observed at runtime |
| Serialization representation | Required; not observed at runtime |
| Source/target context | Required; not observed at runtime |
| Redaction and completeness | Required; not observed at runtime |

#### security-controls

| Property dimension | Capture state |
|---|---|
| Threat/test objective | Required; not observed at runtime |
| Authorized test scope | Required; not observed at runtime |
| Control under examination | Required; not observed at runtime |
| Attack/stimulus class | Required; not observed at runtime |
| Environment and configuration | Required; not observed at runtime |
| Observed detection/block/allow outcome | Required; not observed at runtime |
| Control response | Required; not observed at runtime |
| Telemetry/audit evidence | Required; not observed at runtime |
| Exposure/impact observed | Required; not observed at runtime |
| Safety constraints | Required; not observed at runtime |

#### errors-recovery

| Property dimension | Capture state |
|---|---|
| Failure trigger/context | Required; not observed at runtime |
| Failing operation reference | Required; not observed at runtime |
| Error category/code/message as exposed | Required; not observed at runtime |
| Origin if established | Required; not observed at runtime |
| Propagation boundary | Required; not observed at runtime |
| Retry/fallback/compensation action | Required; not observed at runtime |
| Recovery state | Required; not observed at runtime |
| Terminal outcome | Required; not observed at runtime |
| Timing | Required; not observed at runtime |
| Impact | Required; not observed at runtime |
| Evidence; distinguish expected validation rejection from unexpected fault | Required; not observed at runtime |

### MVP-QUAR-001 — Quarantine a confirmed threat

Capture eligibility, isolation and integrity outcomes. Trigger: A scan result is classified as a confirmed threat and an isolation operation is requested or triggered.

#### interface

| Property dimension | Capture state |
|---|---|
| Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries | Required; not observed at runtime |
| Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state | Required; not observed at runtime |
| Content: rendered text, accessible name/description, content type, truncation/overflow | Required; not observed at runtime |
| Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method | Required; not observed at runtime |
| Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation | Required; not observed at runtime |
| Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow | Required; not observed at runtime |
| Layering: stacking context, z/paint order, overlays, modal/top-layer state | Required; not observed at runtime |
| Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping | Required; not observed at runtime |
| Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics | Required; not observed at runtime |
| Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour | Required; not observed at runtime |
| Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state | Required; not observed at runtime |
| Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence | Required; not observed at runtime |
| UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection | Required; not observed at runtime |

#### behavior

| Property dimension | Capture state |
|---|---|
| Trigger or stimulus | Required; not observed at runtime |
| Preconditions | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Ordered action/event sequence | Required; not observed at runtime |
| Before/after state references | Required; not observed at runtime |
| Transition(s) | Required; not observed at runtime |
| Observable outputs | Required; not observed at runtime |
| Emitted events | Required; not observed at runtime |
| Side-effect references | Required; not observed at runtime |
| Timing/order | Required; not observed at runtime |
| Termination/result | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

#### business-rules

| Property dimension | Capture state |
|---|---|
| Decision subject | Required; not observed at runtime |
| Inputs and input provenance | Required; not observed at runtime |
| Applicable conditions | Required; not observed at runtime |
| Rule/decision identifier if exposed | Required; not observed at runtime |
| Evaluated branch/criteria where observable | Required; not observed at runtime |
| Output/decision | Required; not observed at runtime |
| Calculation operands and result | Required; not observed at runtime |
| Units/precision/rounding | Required; not observed at runtime |
| Effective period | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Evidence; unknown internal criteria remain unknown | Required; not observed at runtime |

#### data

| Property dimension | Capture state |
|---|---|
| Data subject/schema identity | Required; not observed at runtime |
| Field path | Required; not observed at runtime |
| Observed value/type | Required; not observed at runtime |
| Null versus missing distinction | Required; not observed at runtime |
| Units/format | Required; not observed at runtime |
| Relationships/references | Required; not observed at runtime |
| Constraints evidenced by execution | Required; not observed at runtime |
| Transformation steps | Required; not observed at runtime |
| Validation result | Required; not observed at runtime |
| Serialization representation | Required; not observed at runtime |
| Source/target context | Required; not observed at runtime |
| Redaction and completeness | Required; not observed at runtime |

#### persistence

| Property dimension | Capture state |
|---|---|
| Store/resource identity | Required; not observed at runtime |
| Operation (read/write/update/delete) | Required; not observed at runtime |
| Key/selector | Required; not observed at runtime |
| Before/after state | Required; not observed at runtime |
| Transaction boundary | Required; not observed at runtime |
| Commit/rollback result | Required; not observed at runtime |
| Consistency/visibility observation | Required; not observed at runtime |
| Ordering | Required; not observed at runtime |
| Durability test interval | Required; not observed at runtime |
| Concurrency context | Required; not observed at runtime |
| Retention/expiry | Required; not observed at runtime |
| Evidence access method | Required; not observed at runtime |

#### authorization-permissions

| Property dimension | Capture state |
|---|---|
| Principal identity reference | Required; not observed at runtime |
| Authentication context reference | Required; not observed at runtime |
| Action | Required; not observed at runtime |
| Resource | Required; not observed at runtime |
| Environment/context attributes | Required; not observed at runtime |
| Policy/role/capability evidence where exposed | Required; not observed at runtime |
| Decision (permit/deny/indeterminate) | Required; not observed at runtime |
| Enforcement point | Required; not observed at runtime |
| Response/side effect | Required; not observed at runtime |
| Reason/evidence when available | Required; not observed at runtime |

#### security-controls

| Property dimension | Capture state |
|---|---|
| Threat/test objective | Required; not observed at runtime |
| Authorized test scope | Required; not observed at runtime |
| Control under examination | Required; not observed at runtime |
| Attack/stimulus class | Required; not observed at runtime |
| Environment and configuration | Required; not observed at runtime |
| Observed detection/block/allow outcome | Required; not observed at runtime |
| Control response | Required; not observed at runtime |
| Telemetry/audit evidence | Required; not observed at runtime |
| Exposure/impact observed | Required; not observed at runtime |
| Safety constraints | Required; not observed at runtime |

#### errors-recovery

| Property dimension | Capture state |
|---|---|
| Failure trigger/context | Required; not observed at runtime |
| Failing operation reference | Required; not observed at runtime |
| Error category/code/message as exposed | Required; not observed at runtime |
| Origin if established | Required; not observed at runtime |
| Propagation boundary | Required; not observed at runtime |
| Retry/fallback/compensation action | Required; not observed at runtime |
| Recovery state | Required; not observed at runtime |
| Terminal outcome | Required; not observed at runtime |
| Timing | Required; not observed at runtime |
| Impact | Required; not observed at runtime |
| Evidence; distinguish expected validation rejection from unexpected fault | Required; not observed at runtime |

#### integrations

| Property dimension | Capture state |
|---|---|
| External system/provider identity | Required; not observed at runtime |
| Boundary | Required; not observed at runtime |
| Direction | Required; not observed at runtime |
| Operation | Required; not observed at runtime |
| Protocol reference | Required; not observed at runtime |
| Request/response or message references | Required; not observed at runtime |
| Credentials context (redacted) | Required; not observed at runtime |
| Timeout/retry/circuit-breaker behaviour | Required; not observed at runtime |
| Mapping/transformation | Required; not observed at runtime |
| Dependency outcome | Required; not observed at runtime |
| Correlation | Required; not observed at runtime |

#### performance-resource-behaviour

| Property dimension | Capture state |
|---|---|
| Metric name/definition | Required; not observed at runtime |
| Value | Required; not observed at runtime |
| Unit | Required; not observed at runtime |
| Aggregation/statistic | Required; not observed at runtime |
| Measurement boundary | Required; not observed at runtime |
| Start/end | Required; not observed at runtime |
| Workload and concurrency | Required; not observed at runtime |
| Sample count | Required; not observed at runtime |
| Warm/cold state | Required; not observed at runtime |
| Hardware/runtime/build | Required; not observed at runtime |
| Resource scope | Required; not observed at runtime |
| Collection method | Required; not observed at runtime |
| Sampling/overhead | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

### MVP-QUAR-002 — Review a suspicious or inconclusive file

Capture non-destructive review and rescan paths. Trigger: A scan returns suspicious or inconclusive.

#### interface

| Property dimension | Capture state |
|---|---|
| Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries | Required; not observed at runtime |
| Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state | Required; not observed at runtime |
| Content: rendered text, accessible name/description, content type, truncation/overflow | Required; not observed at runtime |
| Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method | Required; not observed at runtime |
| Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation | Required; not observed at runtime |
| Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow | Required; not observed at runtime |
| Layering: stacking context, z/paint order, overlays, modal/top-layer state | Required; not observed at runtime |
| Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping | Required; not observed at runtime |
| Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics | Required; not observed at runtime |
| Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour | Required; not observed at runtime |
| Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state | Required; not observed at runtime |
| Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence | Required; not observed at runtime |
| UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection | Required; not observed at runtime |

#### behavior

| Property dimension | Capture state |
|---|---|
| Trigger or stimulus | Required; not observed at runtime |
| Preconditions | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Ordered action/event sequence | Required; not observed at runtime |
| Before/after state references | Required; not observed at runtime |
| Transition(s) | Required; not observed at runtime |
| Observable outputs | Required; not observed at runtime |
| Emitted events | Required; not observed at runtime |
| Side-effect references | Required; not observed at runtime |
| Timing/order | Required; not observed at runtime |
| Termination/result | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

#### business-rules

| Property dimension | Capture state |
|---|---|
| Decision subject | Required; not observed at runtime |
| Inputs and input provenance | Required; not observed at runtime |
| Applicable conditions | Required; not observed at runtime |
| Rule/decision identifier if exposed | Required; not observed at runtime |
| Evaluated branch/criteria where observable | Required; not observed at runtime |
| Output/decision | Required; not observed at runtime |
| Calculation operands and result | Required; not observed at runtime |
| Units/precision/rounding | Required; not observed at runtime |
| Effective period | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Evidence; unknown internal criteria remain unknown | Required; not observed at runtime |

#### data

| Property dimension | Capture state |
|---|---|
| Data subject/schema identity | Required; not observed at runtime |
| Field path | Required; not observed at runtime |
| Observed value/type | Required; not observed at runtime |
| Null versus missing distinction | Required; not observed at runtime |
| Units/format | Required; not observed at runtime |
| Relationships/references | Required; not observed at runtime |
| Constraints evidenced by execution | Required; not observed at runtime |
| Transformation steps | Required; not observed at runtime |
| Validation result | Required; not observed at runtime |
| Serialization representation | Required; not observed at runtime |
| Source/target context | Required; not observed at runtime |
| Redaction and completeness | Required; not observed at runtime |

#### authorization-permissions

| Property dimension | Capture state |
|---|---|
| Principal identity reference | Required; not observed at runtime |
| Authentication context reference | Required; not observed at runtime |
| Action | Required; not observed at runtime |
| Resource | Required; not observed at runtime |
| Environment/context attributes | Required; not observed at runtime |
| Policy/role/capability evidence where exposed | Required; not observed at runtime |
| Decision (permit/deny/indeterminate) | Required; not observed at runtime |
| Enforcement point | Required; not observed at runtime |
| Response/side effect | Required; not observed at runtime |
| Reason/evidence when available | Required; not observed at runtime |

#### security-controls

| Property dimension | Capture state |
|---|---|
| Threat/test objective | Required; not observed at runtime |
| Authorized test scope | Required; not observed at runtime |
| Control under examination | Required; not observed at runtime |
| Attack/stimulus class | Required; not observed at runtime |
| Environment and configuration | Required; not observed at runtime |
| Observed detection/block/allow outcome | Required; not observed at runtime |
| Control response | Required; not observed at runtime |
| Telemetry/audit evidence | Required; not observed at runtime |
| Exposure/impact observed | Required; not observed at runtime |
| Safety constraints | Required; not observed at runtime |

#### errors-recovery

| Property dimension | Capture state |
|---|---|
| Failure trigger/context | Required; not observed at runtime |
| Failing operation reference | Required; not observed at runtime |
| Error category/code/message as exposed | Required; not observed at runtime |
| Origin if established | Required; not observed at runtime |
| Propagation boundary | Required; not observed at runtime |
| Retry/fallback/compensation action | Required; not observed at runtime |
| Recovery state | Required; not observed at runtime |
| Terminal outcome | Required; not observed at runtime |
| Timing | Required; not observed at runtime |
| Impact | Required; not observed at runtime |
| Evidence; distinguish expected validation rejection from unexpected fault | Required; not observed at runtime |

### MVP-QUAR-003 — Restore or permanently delete a quarantined item

Capture restore/delete preconditions, effects and recovery. Trigger: User requests restore or permanent deletion.

#### interface

| Property dimension | Capture state |
|---|---|
| Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries | Required; not observed at runtime |
| Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state | Required; not observed at runtime |
| Content: rendered text, accessible name/description, content type, truncation/overflow | Required; not observed at runtime |
| Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method | Required; not observed at runtime |
| Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation | Required; not observed at runtime |
| Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow | Required; not observed at runtime |
| Layering: stacking context, z/paint order, overlays, modal/top-layer state | Required; not observed at runtime |
| Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping | Required; not observed at runtime |
| Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics | Required; not observed at runtime |
| Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour | Required; not observed at runtime |
| Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state | Required; not observed at runtime |
| Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence | Required; not observed at runtime |
| UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection | Required; not observed at runtime |

#### behavior

| Property dimension | Capture state |
|---|---|
| Trigger or stimulus | Required; not observed at runtime |
| Preconditions | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Ordered action/event sequence | Required; not observed at runtime |
| Before/after state references | Required; not observed at runtime |
| Transition(s) | Required; not observed at runtime |
| Observable outputs | Required; not observed at runtime |
| Emitted events | Required; not observed at runtime |
| Side-effect references | Required; not observed at runtime |
| Timing/order | Required; not observed at runtime |
| Termination/result | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

#### business-rules

| Property dimension | Capture state |
|---|---|
| Decision subject | Required; not observed at runtime |
| Inputs and input provenance | Required; not observed at runtime |
| Applicable conditions | Required; not observed at runtime |
| Rule/decision identifier if exposed | Required; not observed at runtime |
| Evaluated branch/criteria where observable | Required; not observed at runtime |
| Output/decision | Required; not observed at runtime |
| Calculation operands and result | Required; not observed at runtime |
| Units/precision/rounding | Required; not observed at runtime |
| Effective period | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Evidence; unknown internal criteria remain unknown | Required; not observed at runtime |

#### data

| Property dimension | Capture state |
|---|---|
| Data subject/schema identity | Required; not observed at runtime |
| Field path | Required; not observed at runtime |
| Observed value/type | Required; not observed at runtime |
| Null versus missing distinction | Required; not observed at runtime |
| Units/format | Required; not observed at runtime |
| Relationships/references | Required; not observed at runtime |
| Constraints evidenced by execution | Required; not observed at runtime |
| Transformation steps | Required; not observed at runtime |
| Validation result | Required; not observed at runtime |
| Serialization representation | Required; not observed at runtime |
| Source/target context | Required; not observed at runtime |
| Redaction and completeness | Required; not observed at runtime |

#### persistence

| Property dimension | Capture state |
|---|---|
| Store/resource identity | Required; not observed at runtime |
| Operation (read/write/update/delete) | Required; not observed at runtime |
| Key/selector | Required; not observed at runtime |
| Before/after state | Required; not observed at runtime |
| Transaction boundary | Required; not observed at runtime |
| Commit/rollback result | Required; not observed at runtime |
| Consistency/visibility observation | Required; not observed at runtime |
| Ordering | Required; not observed at runtime |
| Durability test interval | Required; not observed at runtime |
| Concurrency context | Required; not observed at runtime |
| Retention/expiry | Required; not observed at runtime |
| Evidence access method | Required; not observed at runtime |

#### authorization-permissions

| Property dimension | Capture state |
|---|---|
| Principal identity reference | Required; not observed at runtime |
| Authentication context reference | Required; not observed at runtime |
| Action | Required; not observed at runtime |
| Resource | Required; not observed at runtime |
| Environment/context attributes | Required; not observed at runtime |
| Policy/role/capability evidence where exposed | Required; not observed at runtime |
| Decision (permit/deny/indeterminate) | Required; not observed at runtime |
| Enforcement point | Required; not observed at runtime |
| Response/side effect | Required; not observed at runtime |
| Reason/evidence when available | Required; not observed at runtime |

#### security-controls

| Property dimension | Capture state |
|---|---|
| Threat/test objective | Required; not observed at runtime |
| Authorized test scope | Required; not observed at runtime |
| Control under examination | Required; not observed at runtime |
| Attack/stimulus class | Required; not observed at runtime |
| Environment and configuration | Required; not observed at runtime |
| Observed detection/block/allow outcome | Required; not observed at runtime |
| Control response | Required; not observed at runtime |
| Telemetry/audit evidence | Required; not observed at runtime |
| Exposure/impact observed | Required; not observed at runtime |
| Safety constraints | Required; not observed at runtime |

#### errors-recovery

| Property dimension | Capture state |
|---|---|
| Failure trigger/context | Required; not observed at runtime |
| Failing operation reference | Required; not observed at runtime |
| Error category/code/message as exposed | Required; not observed at runtime |
| Origin if established | Required; not observed at runtime |
| Propagation boundary | Required; not observed at runtime |
| Retry/fallback/compensation action | Required; not observed at runtime |
| Recovery state | Required; not observed at runtime |
| Terminal outcome | Required; not observed at runtime |
| Timing | Required; not observed at runtime |
| Impact | Required; not observed at runtime |
| Evidence; distinguish expected validation rejection from unexpected fault | Required; not observed at runtime |

#### performance-resource-behaviour

| Property dimension | Capture state |
|---|---|
| Metric name/definition | Required; not observed at runtime |
| Value | Required; not observed at runtime |
| Unit | Required; not observed at runtime |
| Aggregation/statistic | Required; not observed at runtime |
| Measurement boundary | Required; not observed at runtime |
| Start/end | Required; not observed at runtime |
| Workload and concurrency | Required; not observed at runtime |
| Sample count | Required; not observed at runtime |
| Warm/cold state | Required; not observed at runtime |
| Hardware/runtime/build | Required; not observed at runtime |
| Resource scope | Required; not observed at runtime |
| Collection method | Required; not observed at runtime |
| Sampling/overhead | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

### MVP-LINK-001 — Submit a website URL for checking

Capture validation, independent gates, provider exchange and bounded result. Trigger: User submits a URL/link for a security or reputation check.

#### interface

| Property dimension | Capture state |
|---|---|
| Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries | Required; not observed at runtime |
| Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state | Required; not observed at runtime |
| Content: rendered text, accessible name/description, content type, truncation/overflow | Required; not observed at runtime |
| Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method | Required; not observed at runtime |
| Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation | Required; not observed at runtime |
| Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow | Required; not observed at runtime |
| Layering: stacking context, z/paint order, overlays, modal/top-layer state | Required; not observed at runtime |
| Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping | Required; not observed at runtime |
| Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics | Required; not observed at runtime |
| Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour | Required; not observed at runtime |
| Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state | Required; not observed at runtime |
| Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence | Required; not observed at runtime |
| UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection | Required; not observed at runtime |

#### behavior

| Property dimension | Capture state |
|---|---|
| Trigger or stimulus | Required; not observed at runtime |
| Preconditions | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Ordered action/event sequence | Required; not observed at runtime |
| Before/after state references | Required; not observed at runtime |
| Transition(s) | Required; not observed at runtime |
| Observable outputs | Required; not observed at runtime |
| Emitted events | Required; not observed at runtime |
| Side-effect references | Required; not observed at runtime |
| Timing/order | Required; not observed at runtime |
| Termination/result | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

#### business-rules

| Property dimension | Capture state |
|---|---|
| Decision subject | Required; not observed at runtime |
| Inputs and input provenance | Required; not observed at runtime |
| Applicable conditions | Required; not observed at runtime |
| Rule/decision identifier if exposed | Required; not observed at runtime |
| Evaluated branch/criteria where observable | Required; not observed at runtime |
| Output/decision | Required; not observed at runtime |
| Calculation operands and result | Required; not observed at runtime |
| Units/precision/rounding | Required; not observed at runtime |
| Effective period | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Evidence; unknown internal criteria remain unknown | Required; not observed at runtime |

#### data

| Property dimension | Capture state |
|---|---|
| Data subject/schema identity | Required; not observed at runtime |
| Field path | Required; not observed at runtime |
| Observed value/type | Required; not observed at runtime |
| Null versus missing distinction | Required; not observed at runtime |
| Units/format | Required; not observed at runtime |
| Relationships/references | Required; not observed at runtime |
| Constraints evidenced by execution | Required; not observed at runtime |
| Transformation steps | Required; not observed at runtime |
| Validation result | Required; not observed at runtime |
| Serialization representation | Required; not observed at runtime |
| Source/target context | Required; not observed at runtime |
| Redaction and completeness | Required; not observed at runtime |

#### api

| Property dimension | Capture state |
|---|---|
| Protocol and version | Required; not observed at runtime |
| Endpoint/operation identity | Required; not observed at runtime |
| Method | Required; not observed at runtime |
| Target | Required; not observed at runtime |
| Request headers/query/path/body | Required; not observed at runtime |
| Authentication context (redacted) | Required; not observed at runtime |
| Response status/headers/body | Required; not observed at runtime |
| Content types | Required; not observed at runtime |
| Timing boundaries/units | Required; not observed at runtime |
| Correlation IDs | Required; not observed at runtime |
| Retries/redirects | Required; not observed at runtime |
| Transport errors | Required; not observed at runtime |
| Linked side-effect observations | Required; not observed at runtime |

#### identity-authentication

| Property dimension | Capture state |
|---|---|
| Privacy-safe principal reference | Required; not observed at runtime |
| Authentication mechanism/protocol | Required; not observed at runtime |
| Credential type (never secret value) | Required; not observed at runtime |
| Issuer/audience where relevant | Required; not observed at runtime |
| Session/token lifecycle metadata | Required; not observed at runtime |
| Challenge | Required; not observed at runtime |
| Success/failure/step-up outcome | Required; not observed at runtime |
| Claims actually exposed | Required; not observed at runtime |
| Expiry/refresh/revocation | Required; not observed at runtime |
| Evidence/redaction | Required; not observed at runtime |

#### authorization-permissions

| Property dimension | Capture state |
|---|---|
| Principal identity reference | Required; not observed at runtime |
| Authentication context reference | Required; not observed at runtime |
| Action | Required; not observed at runtime |
| Resource | Required; not observed at runtime |
| Environment/context attributes | Required; not observed at runtime |
| Policy/role/capability evidence where exposed | Required; not observed at runtime |
| Decision (permit/deny/indeterminate) | Required; not observed at runtime |
| Enforcement point | Required; not observed at runtime |
| Response/side effect | Required; not observed at runtime |
| Reason/evidence when available | Required; not observed at runtime |

#### security-controls

| Property dimension | Capture state |
|---|---|
| Threat/test objective | Required; not observed at runtime |
| Authorized test scope | Required; not observed at runtime |
| Control under examination | Required; not observed at runtime |
| Attack/stimulus class | Required; not observed at runtime |
| Environment and configuration | Required; not observed at runtime |
| Observed detection/block/allow outcome | Required; not observed at runtime |
| Control response | Required; not observed at runtime |
| Telemetry/audit evidence | Required; not observed at runtime |
| Exposure/impact observed | Required; not observed at runtime |
| Safety constraints | Required; not observed at runtime |

#### errors-recovery

| Property dimension | Capture state |
|---|---|
| Failure trigger/context | Required; not observed at runtime |
| Failing operation reference | Required; not observed at runtime |
| Error category/code/message as exposed | Required; not observed at runtime |
| Origin if established | Required; not observed at runtime |
| Propagation boundary | Required; not observed at runtime |
| Retry/fallback/compensation action | Required; not observed at runtime |
| Recovery state | Required; not observed at runtime |
| Terminal outcome | Required; not observed at runtime |
| Timing | Required; not observed at runtime |
| Impact | Required; not observed at runtime |
| Evidence; distinguish expected validation rejection from unexpected fault | Required; not observed at runtime |

#### integrations

| Property dimension | Capture state |
|---|---|
| External system/provider identity | Required; not observed at runtime |
| Boundary | Required; not observed at runtime |
| Direction | Required; not observed at runtime |
| Operation | Required; not observed at runtime |
| Protocol reference | Required; not observed at runtime |
| Request/response or message references | Required; not observed at runtime |
| Credentials context (redacted) | Required; not observed at runtime |
| Timeout/retry/circuit-breaker behaviour | Required; not observed at runtime |
| Mapping/transformation | Required; not observed at runtime |
| Dependency outcome | Required; not observed at runtime |
| Correlation | Required; not observed at runtime |

#### configuration

| Property dimension | Capture state |
|---|---|
| Configuration key/semantic identity | Required; not observed at runtime |
| Effective value or redacted marker | Required; not observed at runtime |
| Type/unit | Required; not observed at runtime |
| Source/origin if exposed | Required; not observed at runtime |
| Scope/precedence | Required; not observed at runtime |
| Activation time | Required; not observed at runtime |
| Mutability/reload behaviour | Required; not observed at runtime |
| Target/build/environment | Required; not observed at runtime |
| Observed behavioural effect link | Required; not observed at runtime |

#### performance-resource-behaviour

| Property dimension | Capture state |
|---|---|
| Metric name/definition | Required; not observed at runtime |
| Value | Required; not observed at runtime |
| Unit | Required; not observed at runtime |
| Aggregation/statistic | Required; not observed at runtime |
| Measurement boundary | Required; not observed at runtime |
| Start/end | Required; not observed at runtime |
| Workload and concurrency | Required; not observed at runtime |
| Sample count | Required; not observed at runtime |
| Warm/cold state | Required; not observed at runtime |
| Hardware/runtime/build | Required; not observed at runtime |
| Resource scope | Required; not observed at runtime |
| Collection method | Required; not observed at runtime |
| Sampling/overhead | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

### MVP-LINK-002 — Capture link-check result and failure branches

Capture threat, no-match, inconclusive and operational failure outcomes. Trigger: A URL check returns a provider result or a failure/blocked state.

#### interface

| Property dimension | Capture state |
|---|---|
| Hierarchy: node/element identity, type, parent/child and sibling order, embedded boundaries | Required; not observed at runtime |
| Attributes and state: relevant attributes, properties, form values, selected/checked/disabled/expanded/focused state | Required; not observed at runtime |
| Content: rendered text, accessible name/description, content type, truncation/overflow | Required; not observed at runtime |
| Computed presentation: resolved properties, values, units, cascade/inheritance/defaults and inspection method | Required; not observed at runtime |
| Geometry: bounding rectangle, coordinate space, dimensions, box model, scroll offsets, viewport relation | Required; not observed at runtime |
| Positioning: position mode, containing block/context, offsets, transforms, clipping and overflow | Required; not observed at runtime |
| Layering: stacking context, z/paint order, overlays, modal/top-layer state | Required; not observed at runtime |
| Visibility: rendered/visible state, occlusion, display/visibility/opacity, viewport intersection and clipping | Required; not observed at runtime |
| Accessibility: role, accessible name/description, states, relationships, focus order, keyboard affordances, live-region semantics | Required; not observed at runtime |
| Interaction affordances: action type, enabled state, target, focusability, hit region; outcome linked to Behaviour | Required; not observed at runtime |
| Assets: resolved image/font/icon/media reference, intrinsic/rendered dimensions, format, variant and loading/failure state | Required; not observed at runtime |
| Rendering evidence: screenshot/video/frame, capture dimensions, timestamp and structured-snapshot correspondence | Required; not observed at runtime |
| UI state: route/screen, active tab, open menu/dialog, validation, loading/empty/error state and selection | Required; not observed at runtime |

#### behavior

| Property dimension | Capture state |
|---|---|
| Trigger or stimulus | Required; not observed at runtime |
| Preconditions | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Ordered action/event sequence | Required; not observed at runtime |
| Before/after state references | Required; not observed at runtime |
| Transition(s) | Required; not observed at runtime |
| Observable outputs | Required; not observed at runtime |
| Emitted events | Required; not observed at runtime |
| Side-effect references | Required; not observed at runtime |
| Timing/order | Required; not observed at runtime |
| Termination/result | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

#### business-rules

| Property dimension | Capture state |
|---|---|
| Decision subject | Required; not observed at runtime |
| Inputs and input provenance | Required; not observed at runtime |
| Applicable conditions | Required; not observed at runtime |
| Rule/decision identifier if exposed | Required; not observed at runtime |
| Evaluated branch/criteria where observable | Required; not observed at runtime |
| Output/decision | Required; not observed at runtime |
| Calculation operands and result | Required; not observed at runtime |
| Units/precision/rounding | Required; not observed at runtime |
| Effective period | Required; not observed at runtime |
| Actor/context | Required; not observed at runtime |
| Evidence; unknown internal criteria remain unknown | Required; not observed at runtime |

#### data

| Property dimension | Capture state |
|---|---|
| Data subject/schema identity | Required; not observed at runtime |
| Field path | Required; not observed at runtime |
| Observed value/type | Required; not observed at runtime |
| Null versus missing distinction | Required; not observed at runtime |
| Units/format | Required; not observed at runtime |
| Relationships/references | Required; not observed at runtime |
| Constraints evidenced by execution | Required; not observed at runtime |
| Transformation steps | Required; not observed at runtime |
| Validation result | Required; not observed at runtime |
| Serialization representation | Required; not observed at runtime |
| Source/target context | Required; not observed at runtime |
| Redaction and completeness | Required; not observed at runtime |

#### api

| Property dimension | Capture state |
|---|---|
| Protocol and version | Required; not observed at runtime |
| Endpoint/operation identity | Required; not observed at runtime |
| Method | Required; not observed at runtime |
| Target | Required; not observed at runtime |
| Request headers/query/path/body | Required; not observed at runtime |
| Authentication context (redacted) | Required; not observed at runtime |
| Response status/headers/body | Required; not observed at runtime |
| Content types | Required; not observed at runtime |
| Timing boundaries/units | Required; not observed at runtime |
| Correlation IDs | Required; not observed at runtime |
| Retries/redirects | Required; not observed at runtime |
| Transport errors | Required; not observed at runtime |
| Linked side-effect observations | Required; not observed at runtime |

#### security-controls

| Property dimension | Capture state |
|---|---|
| Threat/test objective | Required; not observed at runtime |
| Authorized test scope | Required; not observed at runtime |
| Control under examination | Required; not observed at runtime |
| Attack/stimulus class | Required; not observed at runtime |
| Environment and configuration | Required; not observed at runtime |
| Observed detection/block/allow outcome | Required; not observed at runtime |
| Control response | Required; not observed at runtime |
| Telemetry/audit evidence | Required; not observed at runtime |
| Exposure/impact observed | Required; not observed at runtime |
| Safety constraints | Required; not observed at runtime |

#### errors-recovery

| Property dimension | Capture state |
|---|---|
| Failure trigger/context | Required; not observed at runtime |
| Failing operation reference | Required; not observed at runtime |
| Error category/code/message as exposed | Required; not observed at runtime |
| Origin if established | Required; not observed at runtime |
| Propagation boundary | Required; not observed at runtime |
| Retry/fallback/compensation action | Required; not observed at runtime |
| Recovery state | Required; not observed at runtime |
| Terminal outcome | Required; not observed at runtime |
| Timing | Required; not observed at runtime |
| Impact | Required; not observed at runtime |
| Evidence; distinguish expected validation rejection from unexpected fault | Required; not observed at runtime |

#### integrations

| Property dimension | Capture state |
|---|---|
| External system/provider identity | Required; not observed at runtime |
| Boundary | Required; not observed at runtime |
| Direction | Required; not observed at runtime |
| Operation | Required; not observed at runtime |
| Protocol reference | Required; not observed at runtime |
| Request/response or message references | Required; not observed at runtime |
| Credentials context (redacted) | Required; not observed at runtime |
| Timeout/retry/circuit-breaker behaviour | Required; not observed at runtime |
| Mapping/transformation | Required; not observed at runtime |
| Dependency outcome | Required; not observed at runtime |
| Correlation | Required; not observed at runtime |

#### configuration

| Property dimension | Capture state |
|---|---|
| Configuration key/semantic identity | Required; not observed at runtime |
| Effective value or redacted marker | Required; not observed at runtime |
| Type/unit | Required; not observed at runtime |
| Source/origin if exposed | Required; not observed at runtime |
| Scope/precedence | Required; not observed at runtime |
| Activation time | Required; not observed at runtime |
| Mutability/reload behaviour | Required; not observed at runtime |
| Target/build/environment | Required; not observed at runtime |
| Observed behavioural effect link | Required; not observed at runtime |

#### performance-resource-behaviour

| Property dimension | Capture state |
|---|---|
| Metric name/definition | Required; not observed at runtime |
| Value | Required; not observed at runtime |
| Unit | Required; not observed at runtime |
| Aggregation/statistic | Required; not observed at runtime |
| Measurement boundary | Required; not observed at runtime |
| Start/end | Required; not observed at runtime |
| Workload and concurrency | Required; not observed at runtime |
| Sample count | Required; not observed at runtime |
| Warm/cold state | Required; not observed at runtime |
| Hardware/runtime/build | Required; not observed at runtime |
| Resource scope | Required; not observed at runtime |
| Collection method | Required; not observed at runtime |
| Sampling/overhead | Required; not observed at runtime |
| Uncertainty | Required; not observed at runtime |

## Facets outside the current scenario paths

The 15-facet capture still lists every governing facet. `messaging` and `background-processing` are not present in any of the seven approved scenario definitions. Their absence from those scenario paths is not proof that the entire product has no messaging or background processing. They remain conditional/unresolved pending evidence of the actual system boundary and execution architecture; do not invent queues, workers, schedulers, or events.

## Cross-facet dependencies that must be correlated

- Interface ↔ Behaviour: visible affordance/state versus action result and state transition.
- Identity/Authentication ↔ Authorization: establish the principal separately from the permission decision; MVP-03 requires Pro entitlement, but the principal and entitlement lifecycle are unresolved.
- Business Rules ↔ Data: decision inputs, provenance, output and representation.
- Behaviour ↔ Persistence: quarantine/restore/delete operations and durable before/after state.
- API ↔ Integrations ↔ Security Controls: provider request/response, URL disclosure, credential context, gates and observed control outcome.
- Errors/Recovery ↔ every operation facet: failure trigger, propagation, retry/compensation and terminal state.
- Configuration ↔ Behaviour/Integrations: effective Pro/owner switches, scan limits, provider limits and their observed effects.
- Performance ↔ each scenario: measurement boundary, workload, hardware/runtime, sample count and uncertainty; no targets or benchmarks are currently established.

## Evidence and scope limits

- Owner-approved MVP contains exactly manual file security analysis, quarantine/file disposition, and website/link checking.
- Website/link checking requires Pro entitlement and a separate owner-controlled activation switch. No provider/API call is permitted if either gate denies it. Exact entitlement mechanism, quotas and activation values remain unknown.
- The Android scanner source is a working draft. Its proposed 30-day retention, encrypted app-private quarantine, restore scan/hash checks and other workflow statements retain draft/proposed maturity; they are not silently promoted to final owner rules.
- Hypatia, Android platform documentation and Google Web Risk are reference/source-contract evidence only. They do not prove ZeroDeck runtime implementation or approve a production provider.
- IP address tracking/investigation is excluded from this MVP.
- No runtime observations, executions, sourceRules, provider calls, malware execution, or performance measurements are fabricated.
