#!/usr/bin/env node
// pman.mjs — the Product Management agent's own program.
//
// This is the engine. It is global: one copy per machine, never inside a workspace.
// The data it works on is per workspace. That split is ruling 26, and it is OpenSpec's
// own split, which is the thing being copied here.
//
//   pman build              bake the live global into the payload and advance the version — the
//                           only command that makes the payload newer
//   pman init [path]        write the instruction files, create the empty data folders
//   pman update [path]      copy a newer payload over an older install. It never goes backwards:
//                           an install already ahead of this payload is left alone, and --force
//                           does not override that.
//   pman update --force     rewrite them even when the version has not moved on
//   pman check [path]       the standing drift check — read-only, writes nothing
//   pman --version
//
// What this program does NOT do, on purpose:
//
//   * On the init/update path it never reads the content of an instruction file. It reads
//     one thing: the `generatedBy` stamp. Edit an instruction file by hand and init/update
//     will not notice, will not warn, and will not touch your edit. That is OpenSpec's
//     behaviour and it is kept exactly, sharp edge included. The one command that does read
//     content is `pman check`, and it only reports.
//   * It never backs up, merges, diffs, or prompts. When the version moves, the old
//     instruction files — the mental model among them — are overwritten and gone.
//     Ruling 36: exactly as OpenSpec, including the parts that bite.
//   * `update` never touches the data folder. There is no `product-management.yaml`, no `specs/`,
//     no `changes/`, and no `config.yaml` to touch — plan v9 removed that register, so those
//     names appear here only to record that they are gone and not written by any code path.
//   * It never reads the build kit. The live global is the source of truth and the only tree
//     `build` reads; the kit is reference material, copied by hand, never operated.

import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { STAMPED, MODEL } from "../lib/master.mjs"
import { bake, defaultLiveGlobal } from "../lib/bake.mjs"

/**
 * The live global — the one real place the agent's instructions live, and the source the payload
 * is built from. Overridable for a non-default config root.
 */
const LIVE_GLOBAL = defaultLiveGlobal()

const HERE = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(HERE, "..")
const PKG = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8"))

/** The program's own version. This is what the stamp is compared against. */
export const PMAN_VERSION = PKG.version

/**
 * The data workspace. One empty directory. Created, never written to by the engine.
 *
 * Named for the agent, on the same convention as the other two: `.mental-model/ontology`,
 * `.mental-model/video-editing`. The owner built the model in `mental-models/product-manager/` —
 * that is where it was built; this is where the agent's own work happens.
 */
const DATA_DIR_NAME = "product-management"

// Plan v9 §1: the instructions are "the skills AND COMMANDS" (v9:8), and the engine sets up
// "the skills, commands, and mental model" (v9:18). The command layer is part of the shape, so it is
// created whether or not anything is in it yet — the same as the empty data workspace.
//
// We have no commands at the moment. An empty layer is the correct state, NOT a missing one: it is
// where a command goes the moment one is written, and it ships in the master so a later version can
// fill it and clean up after an older copy. The file shape is borrowed from OpenSpec —
// commands/<name>.md, `description` in frontmatter, instructions in the body.
const COMMANDS_DIR = path.join(".opencode", "commands")

const STAMP_RE = /^\s*generatedBy:\s*["']?([^"'\n]+)["']?\s*$/m

// ─── The instruction files ─────────────────────────────────────────────────────
//
// Two kinds of file, and the version note lands differently in each.
//
//  * The identity file and the seven skills carry YAML frontmatter, so the note goes in a
//    `metadata` block there — OpenSpec's field, in OpenSpec's place.
//  * The mental model is written BYTE FOR BYTE, with no generatedBy stamp. The Ontology
//    Manager's program stamps its model with a trailing comment; this one must not. This
//    model is the owner's own, built and finished before this engine existed, and it is never
//    read, never edited, and never authored by an agent. A stamp is an edit, and the trace
//    through it — source-map.md, traceability-audit.md — is a record of bytes that a stamp
//    would silently invalidate.
//  * There is no config.yaml. Plan v9 removed the register, so `pman` writes no data file
//    at setup at all — the data workspace is one empty directory. The command layer is
//    also empty, so it contributes no stamped files either.

const IDENTITY_REL = ".opencode/agent/product-management-agent.md"

/**
 * The seven skills, one per letter of CIRCLES, and the payload key each is baked under.
 *
 * This table is the whole wiring, and it exists in the same three places it always has: here for
 * the paths, lib/bake.mjs for the bake, and `contentFor`/`STAMPED_FILES` below for install and
 * version detection. Skills are named here on purpose rather than discovered, exactly as ontology
 * does it — a skill that is not in this table is a skill the engine will refuse to install rather
 * than one it silently ships under a key nothing reads.
 */
const SKILLS = [
  { rel: ".opencode/skills/product-management-comprehend/SKILL.md", key: "COMPREHEND_SKILL" },
  { rel: ".opencode/skills/product-management-evaluate/SKILL.md", key: "EVALUATE_SKILL" },
  { rel: ".opencode/skills/product-management-cut/SKILL.md", key: "CUT_SKILL" },
  { rel: ".opencode/skills/product-management-identify/SKILL.md", key: "IDENTIFY_SKILL" },
  { rel: ".opencode/skills/product-management-list/SKILL.md", key: "LIST_SKILL" },
  { rel: ".opencode/skills/product-management-report/SKILL.md", key: "REPORT_SKILL" },
  { rel: ".opencode/skills/product-management-summarize/SKILL.md", key: "SUMMARIZE_SKILL" },
]

/** The files the version check reads. First one found wins, as in OpenSpec. */
const STAMPED_FILES = [
  { rel: IDENTITY_REL, template: STAMPED.IDENTITY },
  ...SKILLS.map((s) => ({ rel: s.rel, template: STAMPED[s.key] })),
]

/**
 * The mental model's own bytes, exactly as they are held in the payload.
 *
 * The whole model takes this path — there is no evidence layer and no exception list to keep,
 * because every file in it belongs to the owner and none of them is ours to annotate. The
 * Ontology Manager's engine still carries `stampPlain` and an evidence matcher for the layers
 * its own model has; neither has any file to match here, and leaving them in would be a rule
 * with nothing to govern.
 */
function modelContent(entry) {
  const [, encoding, content] = entry
  return encoding === "base64" ? Buffer.from(content, "base64") : content
}

// Rebuild the whole file, the way OpenSpec's generateSkillContent() does: it returns the
// entire file as one string and never edits an existing file's bytes, so its output cannot
// come out malformed. The previous version of this function did surgery on the string instead
// — it found the closing "---" with indexOf and appended onto it, which glued the delimiter
// onto the last value ("generatedBy: \"1.0.0\"---") and left a duplicated metadata block,
// because replacing the "metadata:" key inserted a second copy without removing the first.
//
// So: parse the frontmatter into keys, set generatedBy, re-emit. Idempotent — stamping an
// already-stamped file returns the same bytes.
function stampMarkdown(template, version) {
  const m = template.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) throw new Error("template has no YAML frontmatter to stamp")
  const front = m[1]
  const body = template.slice(m[0].length)

  const lines = front.split("\n")
  const out = []
  let i = 0
  let metadataEnd = -1

  while (i < lines.length) {
    const line = lines[i]
    // A metadata: key with no inline value opens a block. Copy its children, dropping any
    // generatedBy we are about to replace. The new one is inserted once the block is closed.
    if (/^metadata:\s*$/.test(line)) {
      if (metadataEnd !== -1) { i++; continue }   // a second metadata: block — drop it
      out.push("metadata:")
      i++
      while (i < lines.length && (/^\s+\S/.test(lines[i]) || lines[i].trim() === "")) {
        if (/^\s+generatedBy:/.test(lines[i])) { i++; continue }
        out.push(lines[i])
        i++
      }
      while (out.length && out[out.length - 1].trim() === "") out.pop()
      metadataEnd = out.length
      continue
    }
    // A stray generatedBy outside any block is dropped too.
    if (/^generatedBy:/.test(line)) { i++; continue }
    out.push(line)
    i++
  }

  // Exactly one generatedBy, always. Inside the metadata block if there was one, else as a
  // new block. Written once, here, so it can never be doubled.
  const stamp = `  generatedBy: "${version}"`
  if (metadataEnd === -1) {
    while (out.length && out[out.length - 1].trim() === "") out.pop()
    out.push("metadata:", stamp)
  } else {
    out.splice(metadataEnd, 0, stamp)
  }

  return `---\n${out.join("\n")}\n---\n${body}`
}

/** The version note, appended rather than inserted, so no cited line number moves. */

function contentFor(rel, version) {
  if (rel === IDENTITY_REL) return stampMarkdown(STAMPED.IDENTITY, version)
  const skill = SKILLS.find((s) => s.rel === rel)
  if (skill) return stampMarkdown(STAMPED[skill.key], version)
  throw new Error(`no template for ${rel}`)
}

// ─── Version detection ────────────────────────────────────────────────────────
//
// Copied from OpenSpec: read the stamp out of the first stamped instruction file
// that exists, and treat the whole set as needing an update when that stamp is
// missing or is not the program's own version. The mental model carries a note in the same
// `generatedBy:` form, at its end; it is never read, exactly as OpenSpec never reads its
// own command files.

function extractGeneratedByVersion(file) {
  try {
    if (!fs.existsSync(file)) return null
    const content = fs.readFileSync(file, "utf8")
    const m = content.match(STAMP_RE)
    return m && m[1] ? m[1].trim() : null
  } catch {
    return null
  }
}

/** A dotted version, split into numbers. Anything non-numeric counts as 0. */
function parseVersion(v) {
  return String(v)
    .trim()
    .replace(/^v/, "")
    .split(".")
    .map((part) => {
      const n = parseInt(part, 10)
      return Number.isFinite(n) ? n : 0
    })
}

/**
 * Is `a` strictly newer than `b`?
 *
 * Compared part by part, left to right, so 1.0.10 is newer than 1.0.9. The old check was `!==`,
 * which cannot tell "newer" from "older" at all: it only knows the two strings differ, so an update
 * would happily push an older payload over a newer install. A string compare would get 1.0.10 vs
 * 1.0.9 wrong in the other direction. A missing side is treated as 0, so 1.0 and 1.0.0 are the same
 * version and neither is "newer".
 */
function versionIsNewer(a, b) {
  if (a === null || a === undefined || b === null || b === undefined) return false
  const A = parseVersion(a)
  const B = parseVersion(b)
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const x = A[i] || 0
    const y = B[i] || 0
    if (x !== y) return x > y
  }
  return false
}

/** The next version up, bumping the patch: 1.0.0 -> 1.0.1. */
function nextVersion(v) {
  const parts = parseVersion(v)
  while (parts.length < 3) parts.push(0)
  parts[parts.length - 1] += 1
  return parts.join(".")
}

function getVersionStatus(workspace) {
  let configured = false
  let generatedByVersion = null
  for (const f of STAMPED_FILES) {
    const abs = path.join(workspace, f.rel)
    if (fs.existsSync(abs)) {
      configured = true
      generatedByVersion = extractGeneratedByVersion(abs)
      break
    }
  }
  return {
    configured,
    generatedByVersion,
    // A newer payload is the ONLY thing that makes an install stale. Anything else — equal, or the
    // installed copy being ahead of this payload — leaves the install alone. An unreadable or absent
    // stamp cannot be compared, so it is treated as stale and rewritten.
    needsUpdate:
      configured &&
      (generatedByVersion === null || versionIsNewer(PMAN_VERSION, generatedByVersion)),
    /** The installed copy is ahead of this payload. Rewriting it would be a downgrade. */
    isDowngrade:
      configured && generatedByVersion !== null && versionIsNewer(generatedByVersion, PMAN_VERSION),
  }
}

// ─── Writing ──────────────────────────────────────────────────────────────────

// Copied from OpenSpec: assertProjectArtifactPath / assertPathWithin, called before EVERY write.
//
// OpenSpec does this because the paths it writes come out of a payload, and a payload is data. Ours
// paths come from a hardcoded list, so there is no reachable escape today — that is why this is a
// defence-in-depth gap and not a vulnerability, and it must not be recorded as one. What the guard
// buys is the second line: if the list is ever wrong, edited badly, or built from something
// untrusted, a write outside the workspace stops here instead of landing in someone's home directory.
//
// Two passes, as OpenSpec has. The first catches "..", absolute paths and the like. The second
// canonicalises, so a SYMLINK in the path cannot redirect the write to somewhere else.
function assertPathWithin(baseDir, target) {
  const base = path.resolve(baseDir)
  const abs = path.resolve(target)
  if (abs !== base && !abs.startsWith(base + path.sep)) {
    throw new Error(`refusing to write outside the workspace: ${target}`)
  }
  // Second pass: resolve what is actually on disk. A symlink anywhere along the path
  // (including a symlinked final component) would otherwise redirect the write.
  let real = abs
  try {
    real = fs.realpathSync(abs)
  } catch {
    // The file does not exist yet, which is the normal case. Canonicalise the deepest
    // existing ancestor instead, so a symlinked PARENT is still caught.
    let dir = path.dirname(abs)
    while (dir !== path.dirname(dir)) {
      try {
        real = path.join(fs.realpathSync(dir), path.relative(dir, abs))
        break
      } catch {
        dir = path.dirname(dir)
      }
    }
  }
  const realBase = fs.existsSync(base) ? fs.realpathSync(base) : base
  if (real !== realBase && !real.startsWith(realBase + path.sep)) {
    throw new Error(`refusing to write through a symlink that leaves the workspace: ${target}`)
  }
  return abs
}

/**
 * The exact bytes this engine would write for one managed rel, as a string or a Buffer.
 *
 * `contentFor` answers only for the stamped instruction files; the mental model is written as it
 * is held. `check` has to reproduce all of it, so the rules live in one place and both the writer
 * and the checker read them. Two copies of "what does this file look like" is how a checker ends
 * up agreeing with a writer that is wrong.
 */
function onDiskContentFor(rel, version) {
  const stamped = STAMPED_FILES.find((f) => f.rel === rel)
  if (stamped) return contentFor(rel, version)
  const entry = MODEL.find(([mrel]) => mrel === rel)
  if (!entry) return null
  return modelContent(entry)
}

function writeInstructionFiles(workspace) {
  let written = 0
  for (const f of STAMPED_FILES) {
    const abs = assertPathWithin(workspace, path.join(workspace, f.rel))
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    fs.writeFileSync(abs, contentFor(f.rel, PMAN_VERSION))
    written++
  }
  for (const [rel] of MODEL) {
    const abs = assertPathWithin(workspace, path.join(workspace, rel))
    fs.mkdirSync(path.dirname(abs), { recursive: true })
    fs.writeFileSync(abs, onDiskContentFor(rel, PMAN_VERSION))
    written++
  }
  return written
}

// The data workspace: ONE empty directory, and nothing else.
//
// Plan v9 §1: the four things an agent has are the engine, the instructions, the mental model,
// and an EMPTY data workspace. The data workspace is not a scaffold with subfolders — it is
// where the agent's real work happens, and it starts empty.
//
// There is no config.yaml, no specs/, no changes/. Those belonged to a register this agent does
// not have. What belongs here is the agent's own product work — the recommendations it makes and
// the reasoning behind them — written by the agent, never by this engine.
function createDataStructure(workspace) {
  const root = assertPathWithin(workspace, path.join(workspace, DATA_DIR_NAME))
  fs.mkdirSync(root, { recursive: true })
  return root
}

// The command layer: created, empty, and left that way. `pman` writes no command files today, and
// the owner has ruled that the layer itself is part of the design. It is created so that (a) the
// workspace has the v9 shape before anything is written into it, and (b) a later version that DOES
// ship a command has a place to put it and a managed directory for the cleanup to recognise.
function createCommandsLayer(workspace) {
  const dir = assertPathWithin(workspace, path.join(workspace, COMMANDS_DIR))
  fs.mkdirSync(dir, { recursive: true })
  return dir
}

// ─── Deleting stale managed files ──────────────────────────────────────────────
//
// Copied from OpenSpec's update.js: removeUnselectedSkillDirs / removeSkillDirs /
// removeUnselectedCommandFiles / removeCommandFiles, and report the counts.
//
// The rule that matters: only files WE wrote are ever removed. This program tracks them by
// generatedByVersion — a file carrying our stamp is ours and may go; anything else in the tree is
// somebody's own work and is left completely alone. That is what keeps this safe in a real
// workspace: a hand-written SKILL.md with no stamp, and every byte of the owner's data, survive.
//
// The directory itself is removed only when it is empty afterwards. This program never unlinks a directory
// that still holds anything, so an in-progress or user-authored file cannot be destroyed by a
// cleanup that did not write it.
// The one mark this program leaves, and the only one this function will accept:
//   `generatedBy: "x.y.z"` — in an instruction file's frontmatter, or in the trailing comment
//   on a plain file.
// It deliberately does NOT reuse extractGeneratedByVersion(), which returns null for an unstamped
// file and would then make "not stamped" indistinguishable from "stamped at an unknown version".
// Anything this program did not write has no mark, and is left alone — which now includes every
// mental-model file, because those are written verbatim and deliberately carry no mark. An owner
// model file is therefore never a candidate for removal, at any version.
const STAMP_MARK = /generatedBy:\s*["']?([\d.]+)["']?/
// The one file never removed, whatever else happens. It is the README that keeps git tracking an
// otherwise-empty command layer, and it carries no stamp precisely so that it is not ours to delete.
const COMMAND_LAYER_README = path.join(".opencode", "commands", "README.md")

function isOurs(workspace, rel) {
  try {
    if (rel === COMMAND_LAYER_README) return false
    const abs = assertPathWithin(workspace, path.join(workspace, rel))
    if (!fs.existsSync(abs) || !fs.statSync(abs).isFile()) return false
    // Read the WHOLE file, not just the first 1 KB. An instruction file stamps its frontmatter at
    // the top; a stamp lower down in a long document would be missed by a 1 KB window, and the
    // file would then look unstamped and never be cleaned up.
    return STAMP_MARK.test(fs.readFileSync(abs, "utf8"))
  } catch {
    return false
  }
}

function removeEmptyDir(dir) {
  try {
    if (fs.readdirSync(dir).length === 0) {
      fs.rmdirSync(dir)
      return true
    }
  } catch {
    /* not empty, not a directory, or already gone — either way, not ours to remove */
  }
  return false
}

function removeStaleManagedFiles(workspace) {
  // "Current" must be EVERY path this program ships — the stamped instruction files AND every
  // mental-model file. Listing only STAMPED_FILES here would classify the whole 568-file model as
  // stale, and the stamp check would then happily delete 22 current model files on the first
  // update. That was a real bug, caught by diffing an updated workspace against a clean one.
  const current = new Set([
    ...STAMPED_FILES.map((f) => f.rel),
    ...MODEL.map(([rel]) => rel),
  ])
  let removedFiles = 0
  let removedDirs = 0

  // 1. Stamped instruction files that the current program no longer ships.
  //
  // The command layer is walked HERE, alongside skills and the agent file, because the rule is the
  // same for all three: a file this program stamped may go, a file it did not write is untouched. The layer
  // ships empty today, so this branch currently removes nothing — but it is live code, not a port
  // left in as dead weight, and a future version that ships a command gets its cleanup for free.
  const skillsRoot = path.join(workspace, ".opencode", "skills")
  const agentRoot = path.join(workspace, ".opencode", "agent")
  const commandsRoot = path.join(workspace, COMMANDS_DIR)
  for (const root of [skillsRoot, agentRoot, commandsRoot]) {
    if (!fs.existsSync(root)) continue
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      const rel = path.relative(workspace, path.join(root, entry.name))
      if (current.has(rel)) continue
      if (entry.isDirectory()) {
        // A skill directory is ours only if its SKILL.md is stamped.
        const skillFile = path.join(root, entry.name, "SKILL.md")
        if (!fs.existsSync(skillFile) || !isOurs(workspace, path.relative(workspace, skillFile))) continue
        for (const inner of fs.readdirSync(path.join(root, entry.name))) {
          const innerRel = path.relative(workspace, path.join(root, entry.name, inner))
          if (current.has(innerRel)) continue
          if (isOurs(workspace, innerRel)) {
            fs.unlinkSync(path.join(root, entry.name, inner))
            removedFiles++
          }
        }
        if (removeEmptyDir(path.join(root, entry.name))) removedDirs++
      } else if (isOurs(workspace, rel)) {
        fs.unlinkSync(path.join(root, entry.name))
        removedFiles++
      }
    }
  }

  // 2. Stamped model files that the current program no longer ships.
  const modelRoot = path.join(workspace, ".mental-model", "product-management")
  if (fs.existsSync(modelRoot)) {
    for (const rel of listModelFiles(modelRoot)) {
      const full = path.relative(workspace, path.join(modelRoot, rel))
      if (current.has(full)) continue
      if (isOurs(workspace, full)) {
        fs.unlinkSync(path.join(modelRoot, rel))
        removedFiles++
      }
    }
    // Prune directories left empty by the above, deepest first.
    const dirs = []
    const walk = (d) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        if (e.isDirectory()) {
          const sub = path.join(d, e.name)
          walk(sub)
          dirs.push(sub)
        }
      }
    }
    walk(modelRoot)
    for (const d of dirs.reverse()) if (removeEmptyDir(d)) removedDirs++
  }

  return { removedFiles, removedDirs }
}

function listModelFiles(root, prefix = "") {
  const out = []
  for (const e of fs.readdirSync(root, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name
    if (e.isDirectory()) out.push(...listModelFiles(path.join(root, e.name), rel))
    else out.push(rel)
  }
  return out
}

// ─── The standing drift check ─────────────────────────────────────────────────
//
// `pman check` recomputes the baked payload from the live global and reports every file in a
// workspace that has drifted from it. It is the verb that would have caught a stale payload, which
// until now nothing could do: a payload frozen while the version counter moved looks correct from
// the inside, because the only thing being compared is the payload against itself.
//
// It is read-only. It writes nothing, repairs nothing, and prompts for nothing. It exits non-zero
// when something has drifted so a script or an agent can act on it, but the fix is always
// `pman update --force` — never an edit made by this program. It is the one command in this engine
// that deliberately reads an instruction file's CONTENT; init and update read only the
// `generatedBy` stamp, and the header note above is scoped to those two.

/** Every file this engine manages — the stamped instruction files and the mental model. */
function managedRels() {
  return [...STAMPED_FILES.map((f) => f.rel), ...MODEL.map(([rel]) => rel)]
}

function bytesEqualOnDisk(abs, expected) {
  const onDisk = fs.readFileSync(abs)
  return Buffer.isBuffer(expected)
    ? onDisk.equals(expected)
    : onDisk.equals(Buffer.from(expected, "utf8"))
}

const IDENTITY_ABS = ".opencode/agent/product-management-agent.md"
const LIVE_GLOBAL_IDENTITY = path.join("agent", "product-management-agent.md")

/** Map a target-project rel to the same file's rel inside a live global, and back. */
function toLiveGlobalRel(rel) {
  // The target project's `.opencode/` becomes the config root in a live global:
  // `.opencode/agent/x.md` → `agent/x.md`, `.opencode/skills/x/SKILL.md` → `skills/x/SKILL.md`.
  // The hidden `.mental-model/` sits at the root in both and carries no `.opencode/` prefix, so it
  // passes through unchanged.
  if (rel.startsWith(".opencode/")) return rel.slice(".opencode/".length)
  return rel
}

/** The unstamped source bytes for a live-global file — the template as held, no stamp added. */
function liveGlobalExpected(rel) {
  if (rel === LIVE_GLOBAL_IDENTITY) return STAMPED.IDENTITY
  for (const f of STAMPED_FILES) {
    const template = toLiveGlobalRel(f.rel)
    if (template === rel) return f.template
  }
  const model = MODEL.find(([mrel]) => mrel === rel)
  if (model) {
    const [, encoding, content] = model
    return encoding === "base64" ? Buffer.from(content, "base64") : Buffer.from(content, "utf8")
  }
  return null
}

function detectLayout(ws) {
  if (fs.existsSync(path.join(ws, IDENTITY_ABS))) return "project"
  if (fs.existsSync(path.join(ws, LIVE_GLOBAL_IDENTITY))) return "live-global"
  return null
}

function cmdCheck(arg) {
  let ws = resolveWorkspace(arg)
  let layout = detectLayout(ws)

  // With no path given, the cwd is usually a real target project — but it is not always. Run from
  // inside an installed engine it is the engine's own folder, which holds no managed files, and
  // the check would report "nothing to check" while the tree that actually matters went unexamined.
  // The live global is the reference, so fall back to it rather than no-op silently.
  if (arg === undefined && layout === null && detectLayout(LIVE_GLOBAL) !== null) {
    console.log(`No path given and ${ws} holds no Product Management files; checking the live global instead.`)
    ws = LIVE_GLOBAL
    layout = detectLayout(ws)
  }

  if (layout === null) {
    const status = getVersionStatus(ws)
    if (!status.configured) {
      console.log(`No Product Management instruction files in ${ws}. Nothing to check.`)
      console.log(`  give a path to check a target project, or check the live global: pman check ${LIVE_GLOBAL}`)
      return
    }
    console.log(`Cannot tell which layout ${ws} is — no identity file at either root. Nothing to check.`)
    return
  }

  const drifted = []
  const missing = []
  let checked = 0

  for (const rel of managedRels()) {
    const target = layout === "live-global" ? toLiveGlobalRel(rel) : rel
    const abs = path.join(ws, target)
    const expected =
      layout === "live-global" ? liveGlobalExpected(target) : onDiskContentFor(rel, PMAN_VERSION)
    if (expected === null) continue
    if (!fs.existsSync(abs)) {
      missing.push(target)
      continue
    }
    checked++
    if (!bytesEqualOnDisk(abs, expected)) drifted.push(target)
  }

  const where = layout === "live-global" ? "live global" : "target project"
  const fix =
    layout === "live-global"
      ? "the live global is the source of truth — fix it there, then rebuild the payload"
      : `pman update --force "${ws}"   (this program changed nothing)`

  if (!drifted.length && !missing.length) {
    console.log(
      `✓ ${where} ${ws} is in sync with the baked payload (v${PMAN_VERSION}) — ${checked} managed files, none drifted.`,
    )
    return
  }

  console.log(`DRIFT — ${where} ${ws} has diverged from the baked payload (v${PMAN_VERSION}).`)
  if (missing.length) {
    console.log(`  missing (${missing.length}):`)
    for (const rel of missing) console.log(`    + ${rel}`)
  }
  if (drifted.length) {
    console.log(`  changed (${drifted.length}):`)
    for (const rel of drifted) console.log(`    ~ ${rel}`)
  }
  console.log(`  fix by:      ${fix}`)
  process.exitCode = 1
}

// ─── Commands ─────────────────────────────────────────────────────────────────

function resolveWorkspace(arg) {
  return path.resolve(arg ?? process.cwd())
}

/**
 * The install stamp. The engine writes it once, at the end of a successful init, so a later refresh can
 * read what version is installed here and when. Written by the engine, never by hand, never back-dated.
 */
const STAMP_FILE = path.join(".opencode", ".pman-stamp.json")

function writeStamp(ws) {
  const file = path.join(ws, STAMP_FILE)
  const stamp = { engine: "product-management-agent", version: PMAN_VERSION, installedAt: new Date().toISOString() }
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, `${JSON.stringify(stamp, null, 2)}\n`, "utf8")
  return file
}

function readStamp(ws) {
  try { return JSON.parse(fs.readFileSync(path.join(ws, STAMP_FILE), "utf8")) } catch { return null }
}

function cmdInit(arg) {
  const ws = resolveWorkspace(arg)
  const written = writeInstructionFiles(ws)
  createCommandsLayer(ws)
  createDataStructure(ws)
  console.log(`Product Management setup complete (v${PMAN_VERSION})`)
  console.log(`  workspace:    ${ws}`)
  console.log(`  instructions: ${written} files written (${STAMPED_FILES.length} stamped, ${MODEL.length} mental model)`)
  console.log(`  commands:     ${COMMANDS_DIR}/ (empty — the command layer, part of the v9 shape)`)
  console.log(`  data:         ${DATA_DIR_NAME}/ (empty — the data workspace)`)
  console.log(`  stamped with: generatedBy: "${PMAN_VERSION}" (instruction files only)`)
  const stamp = writeStamp(ws)
  console.log(`  install stamp: ${path.relative(ws, stamp)} — v${PMAN_VERSION}, written now`)
  }

function cmdUpdate(arg, opts) {
  const ws = resolveWorkspace(arg)
  const status = getVersionStatus(ws)
  if (!status.configured) {
    console.log(`No Product Management instruction files in ${ws}. Run: pman init "${ws}"`)
    return
  }
  const hadCommands = fs.existsSync(path.join(ws, COMMANDS_DIR))

  // A project installed from a NEWER payload than this one is not stale — it is ahead of the
  // engine. Rewriting it would push older content over newer, so it is refused outright. --force
  // does not override this: there is no way to downgrade by accident.
  //
  // This guard comes BEFORE any write, deliberately. It prints "Nothing written", so it must be
  // true: it cannot create the command layer on its way out, or a project that happened to be
  // missing that one empty directory would be modified by a run that refused to touch it.
  if (status.isDowngrade) {
    console.log(`✓ Already up to date — this project is AHEAD of the engine`)
    console.log(`  installed:  v${status.generatedByVersion}`)
    console.log(`  this build: v${PMAN_VERSION}`)
    console.log(`\nNothing written. An update only moves a project forward, never back.`)
    console.log(`  If this payload really is the newer one, re-run \`pman build\` to re-bake and advance the version.`)
    return
  }

  // Past the guard, ensuring the command layer is safe. The up-to-date path below reports it when
  // it had to create it, so a shape that is wrong but not stale still gets repaired.
  createCommandsLayer(ws)

  if (!opts.force && !status.needsUpdate) {
      console.log(`✓ All instruction files up to date (v${status.generatedByVersion})`)
      console.log(`  Tools: product-management-agent`)
      if (!hadCommands) console.log(`  Created ${COMMANDS_DIR}/ (the command layer, part of the v9 shape)`)
      // A version gate that skips the write must not also skip the cleanup. A stale skill from an
      // older version is still stale even when the current version has not moved, so this runs on
      // the no-op path too.
      const { removedFiles, removedDirs } = removeStaleManagedFiles(ws)
    if (removedFiles || removedDirs) {
      console.log(`  Removed ${removedFiles} stale file(s) and ${removedDirs} empty folder(s) from an older version.`)
    }
    console.log(`\nUse --force to rewrite the files anyway.`)
    return
  }
  if (status.generatedByVersion && status.generatedByVersion !== PMAN_VERSION) {
    console.log(`Updating ${status.generatedByVersion} → ${PMAN_VERSION}`)
  }
    const written = writeInstructionFiles(ws)
    createCommandsLayer(ws)
    console.log(`✓ Wrote ${written} instruction files at v${PMAN_VERSION}`)
    if (!opts.force) console.log(`  The previous copies, including the mental model, were overwritten. No backup was kept.`)
  // Clean up anything a PREVIOUS version of this program installed and this one no longer ships.
  const { removedFiles, removedDirs } = removeStaleManagedFiles(ws)
  if (removedFiles || removedDirs) {
    console.log(`  Removed ${removedFiles} stale file(s) and ${removedDirs} empty folder(s) from an older version.`)
  }
}

/**
 * `build` — bake the live global into the payload and advance the version.
 *
 * The only command that makes the payload newer. It reads the live global, which is the one real
 * source, and writes lib/master.mjs from it. The version counter moves AFTER a successful bake, so
 * a failed bake leaves the counter where it was and no install thinks it is stale when nothing
 * actually changed.
 */
function cmdBuild(opts) {
  const pkgPath = path.join(ROOT, "package.json")
  let from
  let result
  try {
    from = JSON.parse(fs.readFileSync(pkgPath, "utf8")).version
    result = bake(LIVE_GLOBAL)
  } catch (err) {
    console.error(`build failed: ${err.message}`)
    if (err.hint) console.error(`  ${err.hint}`)
    process.exitCode = 1
    return
  }

  // The bake succeeded, so the payload is now newer than the version it was baked under. Move the
  // counter and re-bake, so the header and the payload agree about what was just written.
  const to = nextVersion(from)
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"))
  pkg.version = to
  fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, "utf8")
  result = bake(LIVE_GLOBAL)

  console.log(`✓ Baked the live global into lib/master.mjs`)
  console.log(`  source:     ${LIVE_GLOBAL}`)
  console.log(`  version:    ${from} → ${to}`)
  console.log(`  contents:   ${result.skills} skills, ${result.model} model files`)
  console.log(`  size:       ${result.bytes} bytes`)
  console.log(`\nThe payload is now the newest thing after the live global.`)
  if (!opts.quiet) {
    console.log(`  Next: \`pman update <project>\` moves any installed project up to v${to}.`)
  }
}

function usage() {
  console.log(`pman — the Product Management agent's program (v${PMAN_VERSION})

  pman build              bake the live global into the payload, advancing the version
  pman init [path]        write the instruction files, create the empty data folders
  pman update [path]      copy a NEWER payload over an older install — never backwards
  pman update --force     rewrite them even when the version has not moved on
  pman check [path]       the standing drift check — read-only, writes nothing
  pman --version          print the program's version`)
}

// ─── Entry ────────────────────────────────────────────────────────────────────

// Flags that take no value. Everything else takes the next argument as its value. `quiet` belongs
// here because build reads it to drop its "next:" line; without this declaration the parser treats
// it as value-taking and `pman build --quiet` is refused.
const BOOLEAN_FLAGS = new Set(["force", "help", "quiet"])

/**
 * Split argv into flags and positionals correctly.
 *
 * The previous version derived positionals by filtering out anything starting with "--", which
 * cannot work: a flag's VALUE is not a flag, so a future `--workspace PATH` would put PATH in the
 * positionals and the command would treat it as the workspace path. Value-taking and boolean flags
 * are declared here, and a flag's value is never a positional.
 */
function parseArgs(argv) {
  const flags = {}
  const positionals = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (!a.startsWith("--")) {
      positionals.push(a)
      continue
    }
    const key = a.slice(2).replace(/-([a-z])/g, (_, c) => c.toUpperCase())
    if (BOOLEAN_FLAGS.has(key)) {
      flags[key] = true
      continue
    }
    const next = argv[i + 1]
    if (next === undefined) {
      console.error(`REFUSED — --${key} needs a value.`)
      process.exit(1)
    }
    flags[key] = next
    i++
  }
  return { flags, positionals }
}

// A CLI that writes to disk will eventually hit a permission error, a full disk, or a path it
// cannot create. None of those is the caller's fault, and a Node stack trace hides the one line
// that matters — which path, and why. Report it and stop.
function fail(message, err) {
  const reason = err && err.code ? ` (${err.code})` : ""
  console.error(`FAILED — ${message}${reason}`)
  if (err && err.path) console.error(`  path: ${err.path}`)
  process.exit(1)
}

const [, , cmd, ...rest] = process.argv
const { flags: opts, positionals: positional } = parseArgs(rest)

try {
  switch (cmd) {
    case "build":
      cmdBuild(opts)
      break
    case "init":
      cmdInit(positional[0])
      break
    case "update":
      cmdUpdate(positional[0], opts)
      break
    case "check":
      cmdCheck(positional[0])
      break
    case "--help":
    case "-h":
    case "help":
      usage()
      break
    case "--version": {
      const here = readStamp(process.cwd())
      console.log(PMAN_VERSION)
      if (here) console.log(`installed here: v${here.version} (${here.installedAt})`)
      break
    }
    default:
      usage()
  }
} catch (err) {
  fail(`${cmd} could not complete: ${err.message}`, err)
}