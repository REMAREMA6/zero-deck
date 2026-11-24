# BUILD — how to build this engine

For an agent to follow **by hand**. No function runs. Every path below is relative to this file's
folder, so this recipe works on a fresh clone of agentic-frameworks on any machine. If you find an
absolute path in this file, it is a bug — fix it, do not use it.

## What this kit is

A workspace of materials. It is never run. The engine is assembled from it, by an agent, following
this recipe.

## The materials, by name

| material | where it is |
|---|---|
| identity | `live-global/agent/product-management-agent.md` |
| the seven skills | `live-global/skills/product-management-*` — one per CIRCLES letter |
| the mental model | `live-global/mental-model/product-management/` (11 files) |
| the engine's own runtime | `engine/bin/pman.mjs`, `engine/lib/bake.mjs` |
| the working notes | `README.md` |

No commands directory — this agent has none, and none is expected.

## How to build

1. Create the engine folder outside agentic-frameworks, named `product-management-agent`.
2. **Bump the patch version in `package.json`** — every change gets its own version. It is the only
   place the version is written.
3. Assemble `payload/agent/` with the identity file, copied from `live-global/agent/`.
4. Assemble `payload/skills/`, one directory per skill, copied from `live-global/skills/`.
5. Assemble `payload/mental-model/` from `live-global/mental-model/product-management/` (11 files).
6. Copy the runtime: `engine/bin/pman.mjs` → `bin/`, and `engine/lib/bake.mjs` → `lib/`. **Every file
   in both** — `bin/pman.mjs` imports `../lib/master.mjs` **and** `../lib/bake.mjs`; shipping one
   without the other gives an installed engine that cannot start.
7. Assemble the payload into `lib/master.mjs` — an ES module exporting `STAMPED` with **named keys**:
   `IDENTITY`, then one key per skill, in the order below, and `MODEL` as `[rel, "text", content]`
   entries (this engine's model is all text; binary entries would be `"base64"`):

   | key | skill |
   |---|---|
   | `COMPREHEND_SKILL` | product-management-comprehend |
   | `CUT_SKILL` | product-management-cut |
   | `EVALUATE_SKILL` | product-management-evaluate |
   | `IDENTIFY_SKILL` | product-management-identify |
   | `LIST_SKILL` | product-management-list |
   | `REPORT_SKILL` | product-management-report |
   | `SUMMARIZE_SKILL` | product-management-summarize |

   Stamp the payload with **the version held in `package.json`** in the identity's frontmatter as
   `metadata.generatedBy: "<version>"`. The program also stamps at write time, so the installed file
   carries the same number twice by design here — one value, not two different ones.
8. Add the install stamp: `init` writes `<workspace>/.opencode/.pman-stamp.json` =
   `{engine, version, installedAt}`; `--version` prints the installed stamp beside the program
   version; `check` reports agreement or DRIFT. Written by the engine, never by hand.
9. Copy this file in as `RECIPE.md`, unchanged.
10. **Add the publish workflow** — `.github/workflows/publish.yml`, `v*` tag or `workflow_dispatch`,
    `permissions: packages: write`, `NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}`.
11. **Check the scope before pushing** — `grep -c lordwhitefire package.json RECIPE.md README.md` must
    print **0**. A misspelled scope publishes as 403 "owner not found", which reads like a permissions
    problem and is not one.
12. Write `package.json`: `@lordwhitefire/product-management-agent`, `private: false`, `bin` `pman`,
    `main` `lib/master.mjs`, `files` = `bin/`, `lib/`, `payload/`, `publishConfig.registry` = GitHub
    Packages, `repository`, `license: UNLICENSED`. **The git committer name is set from GitHub's own
    greeting** (`ssh -T git@github.com`), never typed by hand.
13. Write `README.md`: what the agent is, its version, the seven CIRCLES skills, the model, and that
    it was assembled by an agent following this recipe.
14. **Do not write any stamp by hand.**
15. Put **no credential anywhere** in the folder.

## What must NOT go in

Evidence, eval artefacts, run outputs, `.git`, or anything that is not identity, skills, the model, or
the engine's own runtime.

## How this is proved

- no step names a location outside the kit itself (verified: no absolute path appears);
- this file contains no runnable code;
- reading this file on a fresh clone reproduces the same file list;
- the kit's hash before and after the build differs only by this file.
