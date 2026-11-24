// bake.mjs — the bake, as an internal module.
//
// This is what `pman build` calls. It is NOT the master and it is NOT a second source of truth.
// The master is lib/master.mjs, which the program reads. This module only exists so the master can
// be reproduced byte-exactly from the sources it was taken from.
//
//   pman build
//
// SOURCE OF TRUTH: the LIVE GLOBAL (~/.config/opencode), never the build kit.
//
// This is the inversion the old build-master.mjs had backwards. It read hardcoded paths into the
// kit folder, which taught the direction "design in the kit, push it at the live setup" — the exact
// wiring video was built to remove, and if the other eleven agents are copied from this kit they
// would all inherit it. The live global is where the agent is designed and edited; the kit is kept
// to match it by copying files across.

import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import { fileURLToPath } from "node:url"

// The engine root, NOT lib/. The old loose script sat at the engine root, so `HERE` was the engine
// root and path.join(HERE, "lib") was right. The baker moved into lib/ and HERE became lib/, so the
// output path silently became lib/lib/ — in video that made `build` advance the version counter
// while writing a payload the CLI never reads. Resolving the root explicitly means the path is
// correct wherever this module is imported from.
const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..")

/** This agent's own names in the shared global: a prefix for skills, exact names below. */
const PREFIX = "product-management-"
const IDENTITY_FILE = "product-management-agent.md"
const MODEL_DIR = "product-management"

/**
 * The payload's STAMPED keys are named constants, not an array, because bin/pman.mjs looks each one
 * up by name. Skills are therefore mapped to their key here rather than discovered positionally —
 * a new skill is added to this table on purpose, so it cannot be picked up by accident and shipped
 * under a key nothing reads. The seven keys here are the seven CIRCLES skills, and the list matches
 * the SKILLS table in bin/pman.mjs; a skill in one and not the other is a wiring error, and the
 * checks below make each one loud rather than silent.
 */
const SKILL_KEYS = {
  "product-management-comprehend": "COMPREHEND_SKILL",
  "product-management-evaluate": "EVALUATE_SKILL",
  "product-management-cut": "CUT_SKILL",
  "product-management-identify": "IDENTIFY_SKILL",
  "product-management-list": "LIST_SKILL",
  "product-management-report": "REPORT_SKILL",
  "product-management-summarize": "SUMMARIZE_SKILL",
}

function walk(dir, base) {
  const acc = []
  for (const name of fs.readdirSync(dir).sort()) {
    const abs = path.join(dir, name)
    const rel = base ? `${base}/${name}` : name
    const st = fs.statSync(abs)
    if (st.isDirectory()) acc.push(...walk(abs, rel))
    else acc.push({ abs, rel })
  }
  return acc
}

/** A file that survives a utf8 round trip is held as text; anything else goes in as base64. */
function isText(abs) {
  const b = fs.readFileSync(abs)
  if (b.includes(0)) return false
  return Buffer.from(b.toString("utf8"), "utf8").equals(b)
}

/**
 * Bake the payload from the live global.
 *
 * Returns a summary of what was written, so the caller decides what to print. The version counter
 * is NOT touched here — the caller bumps it, because the rule is that the counter only moves after
 * a bake has actually succeeded.
 */
export function bake(liveGlobal) {
  if (!liveGlobal || !fs.existsSync(liveGlobal)) {
    // Fail loudly. Falling back to the kit is what produced the inverted direction: a payload that
    // looks correct because it was built from a folder nobody runs. Better no payload at all.
    const err = new Error(`live global not found: ${liveGlobal}`)
    err.hint = "set PMAN_LIVE_GLOBAL to the config root that holds agent/, skills/ and .mental-model/"
    throw err
  }

  const sources = {
    identity: path.join(liveGlobal, "agent", IDENTITY_FILE),
    skills: path.join(liveGlobal, "skills"),
    model: path.join(liveGlobal, ".mental-model", MODEL_DIR),
  }

  for (const [what, abs] of Object.entries(sources)) {
    if (!fs.existsSync(abs)) {
      const err = new Error(`live global is missing its ${what}: ${abs}`)
      err.hint = "the live global is the source of truth; fix it there, then rebuild"
      throw err
    }
  }

  /** This agent's skill directories in the shared global, in name order. */
  const skillNames = fs
    .readdirSync(sources.skills, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((n) => n.startsWith(PREFIX))
    .sort()

  const unknown = skillNames.filter((n) => !SKILL_KEYS[n])
  if (unknown.length) {
    // A new `product-management-*` skill in the live global with no key here would be silently dropped from
    // the payload, and the workspace would be missing a file the agent's own identity names.
    const err = new Error(`live global has skills the payload has no key for: ${unknown.join(", ")}`)
    err.hint = "add each one to SKILL_KEYS in lib/bake.mjs and to SKILLS in bin/pman.mjs"
    throw err
  }

  const stamped = [{ key: "IDENTITY", abs: sources.identity }]
  for (const name of skillNames) {
    stamped.push({ key: SKILL_KEYS[name], abs: path.join(sources.skills, name, "SKILL.md") })
  }

  const model = walk(sources.model, `.mental-model/${MODEL_DIR}`)

  const out = []
  out.push("// lib/master.mjs — the master's content. Generated by `pman build`; do not hand-edit.")
  out.push("//")
  out.push("// Baked from the live global. This module IS the master: the program never reads an")
  out.push("// instruction file from a workspace as a source, only the stamp in it.")
  out.push("//")
  out.push("// Two kinds of entry:")
  out.push("//   stamped — the identity and the seven skills. Text templates with YAML frontmatter.")
  out.push("//            The program injects `metadata.generatedBy: <program version>` at write time.")
  out.push("//   model   — the mental model, carried file for file and written byte for byte. It")
  out.push("//            takes no note and no stamp: it is the owner's own finished material, and")
  out.push("//            an annotation would be an edit to it. See bin/pman.mjs for why.")
  out.push("//            The version check reads the stamp from the `stamped` entries only, which is")
  out.push("//            what OpenSpec does with its command files.")
  out.push("")
  out.push("export const STAMPED = {")
  for (const e of stamped) {
    out.push(`  ${e.key}: ${JSON.stringify(fs.readFileSync(e.abs, "utf8"))},`)
  }
  out.push("}")
  out.push("")
  out.push("export const MODEL = [")
  for (const e of model) {
    if (isText(e.abs)) {
      out.push(`  [${JSON.stringify(e.rel)}, "text", ${JSON.stringify(fs.readFileSync(e.abs, "utf8"))}],`)
    } else {
      out.push(
        `  [${JSON.stringify(e.rel)}, "base64", ${JSON.stringify(fs.readFileSync(e.abs).toString("base64"))}],`,
      )
    }
  }
  out.push("]")
  out.push("")

  const libDir = path.join(ROOT, "lib")
  fs.mkdirSync(libDir, { recursive: true })
  const content = out.join("\n")
  fs.writeFileSync(path.join(libDir, "master.mjs"), content, "utf8")

  // Buffer.byteLength, not content.length: the payload carries em-dashes and box characters, so
  // the character count is short of the file size and "bytes" would not match `wc -c`.
  return {
    bytes: Buffer.byteLength(content, "utf8"),
    skills: skillNames.length,
    model: model.length,
  }
}

/** The live global, resolved the way the CLI and the bake must agree on it. */
export function defaultLiveGlobal() {
  return process.env.PMAN_LIVE_GLOBAL || path.join(os.homedir(), ".config", "opencode")
}
