# CIRCLES framework: full worked example for PM interviews

**Source:** productinterview.com (third-party, calibrated to the strong-hire bar)
**URL:** https://productinterview.com/frameworks/circles/
**Fetched:** 2026-09-30

Best for: Product design and "improve/design a product" interview questions.

CIRCLES is the dominant structure for product-design questions at Google, Meta, Amazon, and Airbnb. Lewis C. Lin introduced it in "Decode and Conquer" (2013). The acronym: **C**omprehend the situation, **I**dentify the customer, **R**eport customer needs, **C**ut via prioritization, **L**ist solutions, **E**valuate tradeoffs, **S**ummarize. Product design questions account for 30 to 40% of PM loops at major companies, and CIRCLES is still the expected skeleton in 2026. What has shifted is where the weight goes inside it.

## The seven steps and what to say at each one

**Comprehend (1-2 minutes).** Ask one clarifying question that genuinely changes your answer. The word "genuinely" is doing real work: asking "who is the target user?" when the question already says "for commuters" is theatrical, not helpful. A good clarifying question narrows scope, surfaces a business goal, or identifies a constraint. "Are we trying to grow this to new users or deepen retention for existing ones?" is worth asking. "Is this greenfield or an improvement of what exists?" changes your whole approach.

**Identify the customer (3-4 minutes).** Segment the user base, pick one cohort, and say why. The failure mode is a demographic label with no behavior attached. "Adults 25-35 who are busy" is unfalsifiable. A strong cohort is defined by context and friction. Two-sided markets and vague prompts require an extra step: if the prompt gives you a platform, you need to state which side you are designing for and why, then make clear you are aware the other side exists and may be affected.

**Report customer needs (4-5 minutes).** Name the underlying job, not the feature want. "Users want better recommendations" is a want. "Users need continuity across contexts" is a job. Slow down here more than anywhere else. This step is where the answer is actually scored.

**Cut via prioritization (2-3 minutes).** Out loud and with a rationale. Use a three-axis scaffold: frequency of the pain, acuteness (how much it costs the user), alignment with the business goal you named in Comprehend. Say which need scores highest and why.

**List solutions (2-3 minutes).** Two or three meaningfully different options, not eight incremental variations. Lin originally suggested 10+ ideas; in practice, interviewers at senior levels want differentiation, not volume. A useful spectrum: one quick-win with narrow scope, one core bet that addresses the need directly, one longer-horizon idea worth naming even if you do not pick it.

**Evaluate tradeoffs (1-2 minutes).** In 2026, this step has changed. Spend minimal time on technical feasibility and most of it on two questions: Is this a problem people or companies will pay to have solved at scale (viable)? Does this solution fit where users already work without asking them to form a new habit (lovable)?

**Summarize (2 minutes).** One recommendation, one success metric specific enough to distinguish "it worked" from "people tried it once." Name what you are trading away. Connect the recommendation back to the business goal you established in Comprehend.

## Strong vs. weak: the same question, two candidates

**Question:** "How would you improve Google Maps for small-business owners?"

The strong answer: asks a genuine clarifying question (bring more businesses onto Maps vs. help existing ones get more value), picks owner-operated local businesses with context and friction, names the underlying need (confidence that the listing is working — no feedback loop today), prioritizes by frequency/acuteness/alignment, proposes a lightweight attribution prompt (a confidence signal, not a dashboard), and closes with a testable success metric (30-day active rate among claimed-listing owners, with a holdout).

The weak answer: recites the acronym out loud (the single most reliable tell), treats user identification as obvious, conflates a feature want with a specific need, generates five solutions without meaningful differentiation, evaluates tradeoffs purely on engineering complexity, and closes with no testable metric.

## Time budget across a 20-minute question

- Comprehend: 1-2 minutes. One question, confirm scope, move on.
- Identify + Report + Cut: 10-12 minutes. This is where the answer lives.
- List + Evaluate: 3-4 minutes. Feasibility is not a differentiator; move briskly.
- Summarize: 2 minutes. One recommendation, one metric, what you are trading away.

## What changes for AI product questions

AI product questions break CIRCLES in one specific place: the Evaluate step's traditional center of gravity (can we build it? how hard is the ML?) is gone. The questions are: Will users use this, or does it add a task to an overloaded workflow? Does the output need to be editable? What happens when the model is wrong? Probabilistic outputs, cognitive offloading (the tool should reduce decisions, not add them), and error consequences belong in your tradeoff analysis alongside viable and lovable.

## Use it, do not recite it

CIRCLES is a mental checklist, not a presentation script. A candidate who shows genuine thinking, handles pushback without restating their original answer, and compresses steps when the question calls for it reads as a practitioner. One who announces "Now I'll move to the L step" reads as someone who just read a blog post.

## The 2026 reframe

The original framework was designed when "can we build it?" was a genuine gating question. In 2026, feasibility is the floor, not the ceiling. The evaluative weight has moved to viable and lovable. Strong candidates compress List and Evaluate into a tight recommendation, spend more time on Comprehend and Report/Cut, and treat feasibility as a brief checkbox.
