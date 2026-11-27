import fs from "node:fs";

const root = new URL("../", import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), "utf8");
const capture = JSON.parse(read("software-rules/capture.json"));
const traceability = read("software-rules/RULE-TRACEABILITY.md");
const ownerRules = read("software-rules/OWNER-RULES.md");
const productRules = read("software-rules/PRODUCT-MATERIAL-RULES.md");
const evidenceRegister = read("software-rules/EVIDENCE.md");
const fail = [];
const assert = (condition, message) => { if (!condition) fail.push(message); };

const facets = new Set(capture.replicationScope.facets);
const evidenceIds = new Set(capture.evidence.map((item) => item.evidenceId));
const scenarioIds = new Set(capture.scenarios.map((item) => item.scenarioId));
const propertyIds = new Set();
assert(facets.size === 15, "Expected exactly 15 unique governing facets.");
assert(capture.scenarios.length === 7, "Expected seven approved MVP scenarios.");
assert(capture.coverage.length === 15, "Expected one coverage record per facet.");
assert(capture.executions.length === 0, "Do not fabricate scenario executions.");
assert(capture.observations.length === 0, "Do not fabricate runtime observations.");
assert(capture.runtimeRules.length === 0, "Do not fabricate runtime rules.");
assert(capture.replicationScope.completeness.status === "incomplete", "Capture must remain incomplete while runtime properties are unobserved.");

for (const scenario of capture.scenarios) {
  for (const facet of scenario.facetIds) assert(facets.has(facet), `Scenario ${scenario.scenarioId} references undeclared facet ${facet}.`);
}
for (const item of capture.coverage) assert(facets.has(item.facet), `Coverage references undeclared facet ${item.facet}.`);
for (const item of capture.replicationScope.propertyInventory) {
  assert(!propertyIds.has(item.propertyId), `Duplicate property ID: ${item.propertyId}`);
  propertyIds.add(item.propertyId);
  assert(facets.has(item.facet), `Property ${item.propertyId} references undeclared facet.`);
  if (item.subject.startsWith("MVP-")) assert(scenarioIds.has(item.subject) || ["manual-file-analysis","quarantine-and-disposition","website-link-checking"].includes(item.subject), `Property ${item.propertyId} references unknown subject.`);
  for (const ref of item.evidenceRefs ?? []) assert(evidenceIds.has(ref), `Property ${item.propertyId} has unresolved evidence ref ${ref}.`);
  for (const ref of item.observationRefs ?? []) assert(capture.observations.some((o) => o.observationId === ref), `Property ${item.propertyId} has unresolved observation ref ${ref}.`);
}
for (const contract of capture.declaredContracts) {
  for (const ref of contract.evidenceRefs ?? []) assert(evidenceIds.has(ref), `Contract ${contract.contractId} has unresolved evidence ref ${ref}.`);
}
for (const rule of [...ownerRules.matchAll(/ZD-OWNER-\d{3}/g), ...productRules.matchAll(/PM-(?:FILE|QUAR|LINK)-\d{3}/g)]) {
  assert(traceability.includes(rule[0]), `Rule ${rule[0]} is missing from the traceability register.`);
}
for (const id of evidenceIds) assert(evidenceRegister.includes(id), `Capture evidence ${id} is missing from EVIDENCE.md.`);
for (const match of evidenceRegister.matchAll(/\|\s*(EVD-[A-Z0-9-]+)\s*\|/g)) assert(evidenceIds.has(match[1]), "Evidence register ID " + match[1] + " is missing from capture.json.");

if (fail.length) {
  console.error(fail.map((message) => `FAIL: ${message}`).join("\n"));
  process.exit(1);
}
console.log(`PASS: ${capture.scenarios.length} scenarios, ${facets.size} facets, ${propertyIds.size} property entries, ${evidenceIds.size} evidence records, declared-contract and rule/evidence references consistent.`);
console.log("PASS: runtime executions/observations/rules remain empty; completeness remains explicitly incomplete.");
