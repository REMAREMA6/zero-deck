# Shape Up — Stop Running in Circles and Ship Work that Matters (Ryan Singer)

Source: Free book by Ryan Singer (Basecamp / 37signals), published 2019
URLs: https://shapeup.basecamp.com/ (HTML, per-chapter) · official PDF: https://basecamp.com/shapeup/shape-up.pdf
Fetched: 2026-09-30 (HTML site blocked for direct fetch — transport error; full text obtained via the official PDF, extracted with pdftotext, 132 pages). Raw text kept at /tmp/opencode/shape-up.txt.
Citation note: the same ideas appear in Singer's talks and the Lenny's Podcast episode with Ryan Singer (retained only as an index in continuous-discovery/03-lenny-podcast-teresa-torres.md? no — that is Torres; Singer appears in other Lenny episodes not captured here).

## What the book is

- Basecamp's product development method, presented as "a book of basic truths + specific practices at our current scale."
- Explicitly **not** Waterfall, not agile/scrum: no standups, no sprints, no backlogs, no Kanban, no velocity tracking.
- Foreword (Jason Fried): "execution is everything" is often wrong when you execute the wrong way — the how shapes morale, trust, and long-term progress.

## The core (Introduction)

Four headline ideas:
1. **Six-week cycles** — most new features are built and released in one cycle. Focus is "if this ships in six weeks we'll be happy," then the team is left alone.
2. **Shaping the work** — a small senior group defines the key elements of a solution at the right level of abstraction *before* a project is bet on.
3. **Making teams responsible** — a small integrated team of designers and programmers defines its own tasks, adjusts scope, and builds vertical slices one at a time (no manager-chopped "tickets").
4. These form a virtuous circle: autonomy → less management → better shaping → clearer boundaries → more autonomy.

**Targeting risk:** the book targets the risk of *not shipping on time* (getting stuck, bogged down, not free to do tomorrow's work) — NOT the risk of building the wrong thing. Discovery ("what to build") is deliberately out of scope; the book recommends *Competing Against Luck* for that. Improvement of discovery should come *after* regaining the ability to ship. Risk is reduced in:
- **Shaping** — solving open questions/rabbit holes before committing to a time box
- **Planning** — capping bets at six weeks; the **circuit breaker** (no extension by default)
- **Building** — integrating design + programming early; sequence from most-unknown to least-worrisome

## Part 1 — Shaping

### Principles of shaping (Ch. 2)
- Shape at the right level of abstraction: not too vague, not too concrete.
- **Wireframes are too concrete** — they over-specify, leave designers no room, and cause estimation errors (the hidden complexities behind a "just so" interface are invisible in the mockup; scope can't flex).
- **Words are too abstract** — "build a calendar view" gives no context for trade-offs; under-specified projects grow out of control (no boundary defines what's out of scope).
- Case study: **The Dot Grid Calendar** — customers asked Basecamp 3 for a calendar; calendars are complex (drag-drop, multi-day wrap, views, edge-dragging, color coding, desktop/mobile). Only ~10% used past calendars → **no appetite for six months**, but willing to do *something* in six weeks → simpler "Dot Grid" concept (a grid showing dots where days have events — roughly a tenth of the full calendar).
- Shaped work has three properties: **rough** (not detailed), **solved** (the hard parts are figured out), **bounded** (clear scope).
- **Who shapes:** senior people, technically literate (judge what's easy/hard), strategic thinking (what are we solving, why does it matter, what counts as success, what's the opportunity cost). Writing is not required; programming is not required.
- **Two tracks:** a shaping track (seniors, private, parallel to cycles, can shelf/drop WIP) and a building track (teams building previously shaped work). Shaping can't be scheduled — it's risky, unknown work.
- **Four steps of shaping:** (1) Set boundaries, (2) Rough out the elements, (3) Address risks and rabbit holes, (4) Write the pitch.

### Set boundaries (Ch. 3)
- **The appetite** = a time budget for a standard team size; two sizes: *Small Batch* (1–2 weeks, one designer + one/two programmers) and *Big Batch* (a full six weeks). Huge scope → narrow the problem or break off a meaningful six-week piece.
- **Fixed time, variable scope** — the key principle. Estimates start with a design and end with a number; appetites start with a number and end with a design. The dead (fixed) deadline forces trade-offs; the variable scope lets the team make them.
- **"Good" is relative** — to constraints; a ten-course dinner vs a hot dog.
- **Responding to raw ideas:** default answer "Interesting. Maybe some day." — a soft no that keeps options open; no backlog.
- **Narrow down the problem:** e.g. "calendar" → "a simple way to see what's on today" → Dot Grid. Watch out for **grab-bags** (ideas stuffed with many unrelated things).

### Find the elements (Ch. 4)
- Work by hand at the right speed with two prototyping techniques:
- **Breadboarding** (borrowed from electrical engineering): schematic of components and connections, no visual design. Three drawing primitives: **Places** (navigable screens/dialogs/menus), **Affordances** (things the user can act on — buttons, fields, even copy), **Connection lines** (how affordances move you between places). Words, not pictures. Autopay-in-invoicing example shows how a few words and arrows provoke real product debates (does Autopay also pay the current invoice? does the customer need a username? scope → skip it, put a disable option on a page we already have).
- **Fat marker sketches:** for fundamentally visual ideas — broad strokes make detail impossible; keeps you from over-specifying.
- Output is **elements** (components + connections), not a deliverable; leave room for designers; shaping is not a conveyor belt.

### Risks and rabbit holes (Ch. 5)
- After a solution exists, take a hard look: different categories of risk; find **rabbit holes** (places the team could get stuck); if needed **declare out of bounds** (explicitly out of scope), **cut back**, or specify tricky spots. Present to **technical experts** to de-risk. Don't hand a team a project with holes.

### Write the pitch (Ch. 6)
- The **pitch** packages the shaped work for the betting table (and is reused at kick-off). Five ingredients:
  1. **Problem** — the raw idea + concrete story
  2. **Appetite** — the time budget, stated as a constraint (prevents unproductive "there's always a better solution" conversations)
  3. **Solution** — help them see it: embedded sketches at a slightly more concrete level, annotated fat marker sketches; avoid wireframes/mockups that box designers in; go into more detail only on a "linchpin" part everyone must see concretely
  4. **Rabbit holes** — pre-patched tricky bits
  5. **No Gos** — explicitly what we're *not* doing (e.g. no WYSIWYG editing for the Payment Form project)

## Part 2 — Betting

### Bets, not backlogs (Ch. 7)
- **No backlogs** — they're a weight; reviewing/grooming old ideas wastes time.
- A few **potential bets** (pitches) at the betting table; nothing else on the table. If not bet on, let it go; anyone can track it independently and lobby again — **important ideas come back**.
- **Decentralized lists** — support keeps its own request list, product tracks ideas, programmers their bugs; no single backlog and none of these is a direct input to betting.

### The betting table (Ch. 8)
- **Six-week cycles:** two-week sprints are too short (planning overhead, momentum cost); six weeks is long enough to finish something meaningful, short enough to "see the end from the beginning" (a real deadline forces trade-offs).
- **Cool-down:** two weeks after each cycle with no scheduled work — breathe, meet, fix bugs, explore.
- **Team/project sizes:** 1 designer + 1–2 programmers (+ QA later); a *big batch* team spends the cycle on one project, a *small batch* team on several 1–2-week projects.
- **Betting table participants:** at Basecamp — CEO (last word on product), CTO, a senior programmer, and product strategists.
- **The meaning of a bet:** out of the pot within one cycle? shipped? The bet is a commitment to *uninterrupted time* + the circuit breaker.
- **The circuit breaker:** no extension by default. Eliminates runaway projects; if a project fails to finish it means the *shaping* was wrong (reframe on the next shaping track); motivates ownership and scope decisions.
- **Bugs:** question the assumption that bugs outrank everything; most can wait. Three strategies: (1) fix them in cool-down, (2) bring them to the betting table as shaped pitches, (3) a once-a-year **bug smash** cycle.
- **Keep the slate clean:** bet one cycle at a time, never carry scraps; even multi-cycle features are shaped as a specific six-week target with something fully working at the end.

### Place your bets (Ch. 9)
- **Look where you are:** existing products → standard Shape Up (furniture for an already-built house); new products → **R&D mode** (1–2 exploratory cycles, small teams, no promises) then **production mode**; **cleanup mode** for bigger technical debt.
- **Questions to ask:** Does the problem matter? Is the appetite right? Is the solution attractive? Is this the right time? Are the right people available?
- Post a **kick-off message** announcing commitments (not just to the team — to the wider org).

## Part 3 — Building

### Hand over responsibility (Ch. 10)
- **Assign projects, not tasks** — the team discovers its own tasks; "done means deployed" within the cycle (testing/QA happens inside the cycle; docs/marketing announcements can spill into cool-down).
- **Kick-off:** post the pitch to the project, arrange a kick-off call, walk through the shaped work, let questions surface. Expect an "**getting oriented**" phase of radio silence for the first few days — respect it (asking for status too early pushes exploration underground); if silence lasts beyond ~3 days, check in.
- **Imagined vs discovered tasks** — you discover the true bulk of the work by doing real work.

### Get one piece done (Ch. 11)
- Aim for something tangible and demoable in the first week — **integrate one vertical slice** (front-end + back-end) instead of chipping at horizontal layers; don't build disconnected parts hoping they fit at the 11th hour.
- Case study: Clients in Projects — the designer picked the **visibility toggle** (most central UI) and integrated the first working slice in ~3 days; programmer spiked the access model meanwhile.
- Programmers don't need to wait for pixel-perfect screens; **affordances before pixel-perfect**; program just enough for the next step; start in the middle.

### Map the scopes (Ch. 12)
- Start with raw discovered tasks; as real work begins, factor the project into **scopes** — "territories" of the project that can be completed independently in a few days or less (bigger than tasks, smaller than the project). Tracked as to-do lists.
- Scopes become **the language of the project** (status conversations at the macro level: "After Bucket Access is done we can implement Invite Clients…").
- Case study: Message drafts → scopes Start New / Locate / Trash / Save/Edit / Send; scopes keep being split as work reveals structure.
- **Common scope shapes:** *layer cakes* (each scope needs the previous), *icebergs* (a small visible part + huge hidden part), *chowder* (many small things at once). **Mark nice-to-haves with a tilde (~)** — never built unless time remains.

### Show progress (Ch. 13)
- **The hill chart:** each scope is a dot on a hill; **uphill = problem-solving/unknown** ("thought about it" → "validated my approach" → "built enough to believe no other unknowns"), **downhill = execution/knowledge**.
- **Status without asking** — self-serve for managers; a dot that doesn't move is "effectively a raised hand" — it surfaces stuck-ness *without anyone saying "I don't know."* The language of uphill/downhill is about the work, not the person.
- Refactor scopes that are stuck because they're actually several things (the Notify example — split into email-design / email-delivery / in-app display).
- **Build your way uphill; solve in the right sequence** — the most important problems with the most unknowns first; leave routine work for last.

### Decide when to stop (Ch. 14)
- **Compare to baseline, not the ideal** — "better than what customers have today" vs "never good enough". This is how you make the call that it's good enough.
- **Limits motivate trade-offs** — the fixed deadline forces the team to question new work ("Is there time for this?").
- **Scope grows like grass** — give teams the authority and tools to constantly cut it; cutting scope isn't lowering quality — being picky *differentiates* the product.
- **Scope hammering** — ask: Must-have? Ship without it? New problem or pre-existing? How likely? Which customers? Core or edge case? Actual impact? Aligned with intended audience?
- **QA is for the edges** — a level-up, not a gate; QA generates tasks that are nice-to-haves by default and the team elevates some to must-haves. Code review likewise — opportunistic, not mandatory.
- **When to extend a project** (rare): outstanding work must be true must-haves that survived hammering, AND all downhill (no unknown uphill work). Prefer discipline: running into cool-down points to a shaping or performance problem.

### Move on (Ch. 15)
- **Let the storm pass** — shipping generates feedback (feature requests, bug reports, "you ruined it!" pushback); avoid knee-jerk reactions.
- **Stay debt-free** — don't justify shortcuts by promising to clean up later; scope is what we actually ship.
- **Feedback needs to be shaped** — raw feedback and feature requests shouldn't go straight to teams; they go through the shaping track.

## Conclusion / key concepts (Ch. 16)

Setting appetites instead of estimates · designing at the right level of abstraction · concepting with breadboards and fat marker sketches · making bets with a capped downside (circuit breaker) and honoring them with uninterrupted time · choosing the right cycle length (six weeks) · a cool-down period between cycles · breaking projects into scopes · downhill vs uphill work and communicating about unknowns · scope hammering to separate must-haves from nice-to-haves.

## Appendices

- **Implement in Basecamp:** a shaping team workspace ("Product Strategy"), pitches as Messages in a "Pitch" category, Campfire chat for shaping/betting coordination, video-call betting table, cycle projects, To-Do lists per scope, Hill Chart for tracking.
- **Adjust to your size:** *Basic truths* (fixed-time/variable-scope bets, cap downside, distinguish knowns/unknowns, sequence by unknowns) apply at any size; *specific practices* are scale-dependent.
  - **Small enough to wing it** (2–3 people): drop cycles, cool-downs, formal pitches and betting table; same people alternate shaping and building; vary bet sizes (two weeks here, three there) — still shape/bet/build.
  - **Big enough to specialize** (~50 people, ~12 on product): formal six-week cycles, cool-downs, betting table; dedicated shapers on an out-of-cycle track; specialized teams (SIP = Security/Infrastructure/Performance; Ops; technical support) so core teams aren't interrupted.
- **How to begin:** Option A — one six-week experiment (shape one conservative project, carve out one designer + two programmers with guaranteed uninterrupted time, plan it, kick off with the pitch, give them a shared space, encourage "get one piece done"); Option B — start with shaping; Option C — start with cycles. **Fix shipping first**, focus on the end result.

## What this file is for the knowledge base

- Shape Up is the shipping/execution method: **deciding what to build next and getting it out on time** — the "bets not backlogs" approach, appetite-first prioritization, and the team-autonomy model. It complements CIRCLES (structured product-design problem-solving, interview + real-world) and continuous discovery (finding what to build); Shape Up explicitly defers the "discovery" part to other practices.
- Directly useful to a product-manager agent as: the fixed-time/variable-scope principle, the appetite as a prioritization tool, pitch-writing structure (problem/appetite/solution/rabbit-holes/no-gos), the betting-table decision ritual, scopes + hill chart as status and progress tooling, and scope-hammering questions for deciding when to stop.
- The book is free (official PDF link above). The HTML version at shapeup.basecamp.com blocked our fetcher (transport error); text was extracted from the official PDF. If a fresh pull is needed, curl the PDF and pdftotext.
