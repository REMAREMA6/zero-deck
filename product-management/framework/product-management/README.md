# Product Management agent — build kit

**This folder is reference material. It is never operated.**

There is no engine run here, no `pman build`, no `pman init`, no `pman update`, no `pman check`.
Nothing in this repository is ever installed from, and nothing here is connected to a live setup. If
you find an instruction anywhere in this folder that tells you to run a command from inside it, that
instruction is wrong.

The kit exists so that someone starting from nothing can reconstruct the agent: the code, the
instructions, and the thinking. Files are copied across **by hand**, in both directions, and nothing
automates it.

## The one direction that matters

| | |
|---|---|
| **The live setup** — `~/.config/opencode/` and `~/.config/opencode/product-management-agent/` | **The source of truth.** This is where the agent is designed and edited, day to day. This is the only place anything is **run**. |
| **This kit** — `product-management/` | Materials for rebuilding, kept current with the live setup. Never operated. |

> **Design and edit in the live global. Rebuild the kit to match it when it changes. Run the live
> engine wherever the work is.**

If the live setup and this kit ever disagree, **the live setup is right.** The direction is not
reversible, and an inverted reference kit gets inherited by everything built from it.

## `build`, `init`, `update` and `check` belong to the live setup only

None of these is run here and **none of them must be run here**.

| Command | Where it runs |
|---|---|
| `pman build` | the **live setup only** — bakes the live global into the payload, advances the version |
| `pman init [path]` | anywhere, on a target project |
| `pman update [path]` | anywhere, on a target project |
| `pman check [path]` | anywhere — read-only |
| `pman --version` | anywhere |

## `engine/lib/master.mjs` is absent on purpose

The payload is **generated output**. It is not in this kit, and its absence is correct — not a
missing file.

Three reasons it does not ship here:

- **Nothing may read it.** This kit's engine is never run, so a payload inside it has no reader and
  cannot do the job it would be kept for.
- **A shipped payload snapshot is the proven source of false states.** Hand-copying a generated file
  is exactly how drift happens, and it happens silently. A payload sitting in a kit looks current
  long after it stopped being current.
- **`build` regenerates it** from the live global, and this kit already carries the full content in
  `live-global/` — the same content, in a form a person can read and diff.

So the content ships as **readable source**, and the payload ships nowhere.

## The kit's `engine/bin/pman.mjs` will not run. That is expected.

```js
import { STAMPED, MODEL } from "../lib/master.mjs"
```

The import is left exactly as it is in the live engine, and `master.mjs` is deliberately not here, so
running the kit's copy fails with `ERR_MODULE_NOT_FOUND`. **That is not a defect — do not file it as
one, and do not "fix" it by adding a payload or editing the import.**

The import is byte-identical to the live engine's. Keeping it identical is the point: this folder is
here so a reader can see the real code, and a patched import would show them code that is not what
runs.

## The mental model was built by the owner, and it is finished

**`live-global/mental-model/product-management/` is a copy of the owner's finished model. This kit
does not produce it, and nothing in this kit ever writes to it.**

It was built separately, by the owner, before this agent existed — 11 files under
`mental-models/product-manager/`, carried through the mental-model process with its own build
report, source map, extraction log, traceability audit, and three verdicts. Plan v10 §6 is plain:
mental models are built by the owner, not as part of building an agent.

This task's entire job on the model was to **place** it: copy it unchanged into the live global's
hidden `.mental-model/product-management/`, and mirror it here. No model file was authored, edited,
extended, or re-derived. **A diff against the owner's copy showing anything is a failure, not a
tidy-up opportunity.**

Two copies of the owner's model exist in this kit and neither is the kit's model:

- `mental-models/product-manager/` — where the owner built it. **Untouched**: not moved, not
  deleted, not merged. It is the historical record of how the model came to be.
- `live-global/mental-model/product-management/` — the copy the agent is installed with.

They hold the same 11 files. Do not consolidate them.

**The model is thinking only, and this agent never reads it** (v10 §5). It captures how the agent
reasons; it never instructs the agent to call, defer to, or check with anyone. It is there for the
Decision agent and the three judges, which are the only kinds of agent permitted to consult one. The
agent's own method is in the seven skills.

## What is in this kit

```
live-global/                          the content, in the config-root layout a human reads
  agent/product-management-agent.md     the agent's identity — no procedure, names no other agent
  skills/                              the seven skills, one per letter of CIRCLES
    product-management-comprehend/       establish the goal, constraints, context
    product-management-identify/         who the work is for, and which side
    product-management-report/          the underlying need, not the feature want
    product-management-cut/             which need wins, and what is given up
    product-management-list/             genuinely different options
    product-management-evaluate/        trade-offs, viable and lovable over buildable
    product-management-summarize/        one recommendation, one metric, the trade-off
  mental-model/product-management/     the owner's model, copied in (11 files)
engine/                               the code
  bin/pman.mjs                          the CLI — byte-identical to the live engine's
  lib/bake.mjs                          the bake, called by `pman build` in the live setup
  package.json                          the real version, copied from live
data-workspace/                        empty — stands for the `product-management/` folder a project gets
intent/knowledge-base/                 the 25 source files the model was built from — never installed
mental-models/product-manager/          the owner's build output, untouched — NOT the kit's model copy
README.md                              this file
```

### Why `live-global/` is visible and the real one is hidden

`live-global/` here is a **plainly-named, visible** copy. In the live global the same content is
**hidden** — `agent/`, `skills/`, and `.mental-model/product-management/` — because the platform's
convention is that agent-owned things stay out of plain sight.

The two are **not byte-identical by path, on purpose** (v10 §2). Compare them by content and intent,
not by diffing paths. The live global is where editing happens; this is the readable copy kept beside
it.

## The shape of an installed workspace

| | What it is | Where (installed) |
|---|---|---|
| **The engine** | the CLI — the machine that does the work | `~/.config/opencode/product-management-agent/`, once, globally |
| **The identity** | who the agent is | `.opencode/agent/` |
| **The skills** | what it works from | `.opencode/skills/` — 7 |
| **The commands** | what it can be told to do | `.opencode/commands/` — **empty for now** |
| **The mental model** | its own thinking | `.mental-model/product-management/` (11 files) — **hidden** |
| **The data workspace** | empty, where its real work happens | `product-management/`, per project |

**The command layer is empty on purpose.** The agent advises; it does not act on the product. There
is no tool to wrap until there is a real action to wrap. The layer is part of the design and is
created empty, so the shape is right before there is anything to put in it. Add a command when there
is something for it to do.

**The data folder is named for the agent**, on the same convention as `.mental-model/ontology` and
`.mental-model/video-editing`. The owner built the model in `product-manager` — that is where it was
built, not where it lives.

## The seven skills

CIRCLES is a real, published method — Lewis C. Lin's, from *Decode and Conquer* and *The Product
Manager Interview*. One skill per letter:

| Letter | Skill | What it does |
|---|---|---|
| **C** | **`product-management-comprehend`** | Establishes the goal, the constraints, and the context, so the rest works on the right problem. Asks one clarifying question that genuinely changes the answer, or states its assumption. |
| **I** | **`product-management-identify`** | Segments the user base, commits to one cohort defined by context and friction, and says why. On a platform, names which side and acknowledges the other. |
| **R** | **`product-management-report`** | Names the underlying job, not the stated feature want. User stories, and an explicit mark on every inferred need. |
| **C** | **`product-management-cut`** | Ranks needs on frequency, acuteness, and alignment to the goal. RICE, MoSCoW, or weighted scoring. States what was cut. |
| **L** | **`product-management-list`** | Two or three genuinely different options — a quick win, a core bet, a longer horizon. |
| **E** | **`product-management-evaluate`** | Weighs trade-offs. Feasibility is the floor, not the test: the weight is on viable and lovable. |
| **S** | **`product-management-summarize`** | One recommendation, one testable metric, the trade-off named, linked back to the goal. |

**The method lives in the skills, not in the identity.** Converting CIRCLES into something else —
merging two letters, adding an eighth, renaming one — means editing skills. The identity names which
skill is which and stops there.

**The agent recommends; it does not decide.** That rule is in the skills. Its output is a
recommendation with its reasoning and its sources, and where it goes is not the agent's to settle.

**`intent/knowledge-base/` is never installed into a project.** It is the source material that stood
behind the model — CIRCLES (8 files), continuous discovery (3), prioritization including the RICE
origin article (4), the SVPG product model (8), Shape Up (1), and `sources.md` (1). The agent does
not read it at runtime; its method is carried in the skills.

## Rebuilding the live setup from this kit

Step by step, in order. This is the whole procedure; there is no script, because a script would make
the kit an operated thing.

### ⚠ These steps write to `~/.config/opencode/` — they overwrite a live setup

**Every path below points at the real config root.** There is no prompt and no backup: step 1 lands
on top of an existing `~/.config/opencode/product-management-agent/`, step 3 overwrites the identity
and all seven skills in place, step 4 overwrites the installed model, and step 2 replaces the `pman`
symlink.

**If a live setup is already installed, this procedure destroys it and replaces it with what is in
this kit.** That is the correct behaviour when the kit is the newer thing and you mean to reinstall.
It is data loss when it is not what you meant.

Check first, and decide deliberately:

```bash
pman --version                    # is there a live setup, and at what version?
ls ~/.config/opencode/product-management-agent/ 2>/dev/null && echo "ONE IS ALREADY INSTALLED"
```

Then either:

- **You mean to replace it.** Copy `~/.config/opencode/product-management-agent/` somewhere first if
  you want to be able to go back. Then run the steps.
- **You are only reading, or the live setup is newer.** **Stop.** Do not run these steps. Nothing in
  this kit is required to *use* an installed agent — the kit is for rebuilding, not for repairing.

To rehearse the whole procedure without touching anything real, run it against a throwaway home:

```bash
mkdir -p /tmp/rehearsal/home
HOME=/tmp/rehearsal/home  # then run the steps with this set
```

That was how this procedure was verified — all seven steps, end to end, producing a setup identical
to the live one.

### Two orderings that are not optional

1. **The model is copied (step 4) before the payload is baked (step 5).** The bake reads the model out
   of the live global; with the model still missing it bakes a payload with no model in it.
2. **Step 5 must happen before `pman build` (step 6) can work at all.** See the note on step 5.

### The steps

1. **Copy the engine.**

   ```bash
   cp -r product-management/engine ~/.config/opencode/product-management-agent
   ```

   Do not create `lib/master.mjs` here or anywhere yet — see the next step.

2. **Put the command on `PATH`**, the way `om` and `vedit` are:

   ```bash
   ln -s ~/.config/opencode/product-management-agent/bin/pman.mjs ~/.local/bin/pman
   ```

3. **Copy the identity and the skills into the live global:**

   ```bash
   mkdir -p ~/.config/opencode/agent
   cp product-management/live-global/agent/product-management-agent.md ~/.config/opencode/agent/
   for s in comprehend identify report cut list evaluate summarize; do
     mkdir -p ~/.config/opencode/skills/product-management-$s
     cp product-management/live-global/skills/product-management-$s/SKILL.md \
        ~/.config/opencode/skills/product-management-$s/
   done
   ```

4. **Copy the model into the live global, unchanged** — hidden, and named for the agent:

   ```bash
   mkdir -p ~/.config/opencode/.mental-model/product-management
   cp -r product-management/live-global/mental-model/product-management/. \
         ~/.config/opencode/.mental-model/product-management/
   ```

   All 11 files byte for byte. Edit nothing inside. **Must be done before step 5** — the bake reads
   the model out of the live global, and with it missing the payload bakes with no model in it.

5. **Bake the payload. This step is not optional and `pman build` cannot do it for you.** The engine
   imports `lib/master.mjs` at startup, so the very first build cannot go through the CLI — the
   payload it needs does not exist yet, and the command that would create it dies before it runs.
   Bootstrap by calling the engine's own baker, which imports nothing but node's built-ins:

   ```bash
   cd ~/.config/opencode/product-management-agent
   node --input-type=module -e '
     import { bake, defaultLiveGlobal } from "./lib/bake.mjs"
     console.log(bake(defaultLiveGlobal()))'
   ```

   Every later build is an ordinary `pman build`.

6. **Run the lifecycle in the live setup:**

   ```bash
   pman build            # bake, and advance the version
   pman --version
   pman check ~/.config/opencode
   ```

   `check` is read-only and writes nothing.

7. **Verify on a throwaway folder, never a real one.** `pman init /tmp/probe`, then `pman check` on
   it. Delete it afterwards.

## Copying changes back into this kit

The other direction, by hand, same as everything else here:

- **Changed the identity or a skill?** Edit in the live global, run `pman build`, then copy the file
  into `live-global/`.
- **Changed the engine?** Copy `bin/pman.mjs`, `lib/bake.mjs`, and `package.json` into `engine/`.
  Do **not** copy `lib/master.mjs` — it never ships here.
- **Changed the model?** The model is the owner's and is not edited by this kit. If the owner
  rebuilds it, copy the new files into both `live-global/mental-model/product-management/` and the
  live global, and leave `mental-models/product-manager/` as the record of how it was built.

After any of these, `pman check ~/.config/opencode` must still pass.

## A note on the version in `engine/package.json`

It carries the **real live version**, copied across, not a pinned `1.0.0`. A version labels real
content; a pinned one would invent a version that never existed.
