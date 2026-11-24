# The PM's Guide to RICE Prioritization

**Source:** Product Teacher (Clement Kao) — third-party teaching guide, builds on the Intercom original
**URL:** https://www.productteacher.com/articles/product-manager-guide-to-rice-prioritization
**Author:** Clement Kao, May 12
**Fetched:** 2026-09-30

## Why prioritization matters

- The outcome of prioritization is a **stack-ordered sequence** — an ordered list with no ties. Never have multiple "first priorities"; more than one priority means nothing is truly important.
- A ranked list eliminates mental overhead and aligns stakeholders/customers on "what's next". Transparency in what inputs went into the sequence helps customers and stakeholders feel heard.
- Prioritization is hard because PMs stand at the intersection of customers (acquisition, retention, sentiment, virality, LTV, alternatives), makers (innovation, scalability, reliability, abstraction, speed, effort, quality), and the business (revenues, profits, costs, payback, competitive landscape, partnerships).
- **Checklists don't work** — they output binary good/bad, not sequencing. SWOT, 4 Ps, PEST, growth/share matrix, Ansoff, GE/McKinsey, 3 Cs all fail as prioritization tools.
- Single-criterion lenses fail too: "ship the smallest wins" never ships high-value sustained-effort initiatives; "ship the most immediate revenue" chases monetization over strategic bets; "most advanced technology" confuses the tech with the value driver.
- Two root problems: prioritization relies on qualitative info that can't be easily quantified, and initiatives are apples-to-oranges comparisons.

## The value of simplifying and standardizing

- **Standardize the model across the org.** Custom team-by-team models cause loss of alignment and context for non-product teams; accusations of inconsistency/unfairness.
- **Quick and straightforward.** Diminishing marginal returns are huge: the top 3 funded initiatives matter more than all others combined; the top 3 sequence matters more than everything else. Everything outside the top 3 likely won't be funded next quarter anyway.
- Cost example: 5 PMs × quarterly × 3 weeks fact-finding = 60 PM-weeks/year (~more than one FTE). A simplified model (30 min per initiative, sort within a day) = 20 PM-days/year — 15x more efficient. Pareto: 80% of prioritization value from 20% of effort.
- Get granularity only for the initiatives you're tackling next, not for everything.

## The RICE framework (origin)

Proposed by Sean McBride at Intercom. Formula: R × I × C / E. A more granular ROI (benefits/costs): splitting benefits into reach, impact, confidence gives a more reasoned comparison.

## The simplified RICE model (Product Teacher's adaptation)

### Reach (3 buckets)
- Everyone in your current product (4 points)
- Some of the users in your current product (2 points)
- New users who aren't in your product right now (1 point)

### Impact (3 buckets — assessed at product-org level, not feature level)
- Game changer (4 points)
- Significant value (2 points)
- Some value (1 point)
- Excludes "low/trivial value" — those belong in sprint planning, not on a roadmap.

### Confidence (3 buckets — reduced vs McBride to fight confirmation bias)
- High confidence (80%) — extensive qualitative feedback AND quantitative metrics
- Medium confidence (50%) — either extensive qualitative OR quantitative, not both
- Low confidence (30%) — some feedback/metrics, not enough for a public claim
- Excludes "guesses" (10%) — need validation first.

### Effort (4 buckets, powers-of-two scaling because estimates have error bars)
- Large: more than one dev-year (4 points)
- Medium: more than one dev-quarter (2 points)
- Small: 1–3 dev months (1 point)
- Trivial: less than 1 dev month (0.5 points)

## Ways to improve RICE scores

- **Increase reach** (without significantly increasing effort): B2B — configurations, abstraction, training/enablement; B2C — virality, partnerships.
- **Increase impact:** solve a deeper pain than the one stated (e.g., "turn off all notifications" at once vs one-by-one).
- **Increase confidence:** in-product analytics, user interviews, user feedback, rapid prototyping.
- **Decrease effort:** eliminate low-value work from feature sets; don't cut engineering work enabling abstraction, scalability, reusability.

## Caveats

1. RICE maximizes ratio of time vs quality of decision, not accuracy at all costs (don't use for acquisitions or pricing).
2. Valid time horizon: 1 quarter to 3 years (not years/decades strategy).
3. RICE does not replace product strategy (strategy = how to achieve the vision; sequencing = how to achieve the strategy).
4. Does not replace sprint planning/estimates.
5. Living and breathing — scores change as you learn.
6. Guideline, not a mandate — deviating from rank order is fine with clear justification written up.

## Customizations

- Change weighting/scales (e.g., Fibonacci 1,2,3,5,8 instead of powers of two).
- Feature buckets (e.g., Adam Nash's Three Buckets: metric movers, customer requests, customer delight) — only works with a defined point allocation mix per bucket.
- Don't add more than 5 categories per axis; keep the model consistent across all PMs in the org.
