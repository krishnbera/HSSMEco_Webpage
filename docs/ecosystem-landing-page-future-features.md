# HSSM Ecosystem Landing Page — Future Features

**Status:** Backlog. Nothing here is committed work.
**Last updated:** 2026-08-13
**Companion to:** [`ecosystem-landing-page-spec.md`](ecosystem-landing-page-spec.md) (v2)

---

## How to use this document

The v2 spec sets a hard budget: **6 sections, ~550 words, ~4 visuals, zero bespoke interactive software.** That budget is the reason the landing page can be short and direct, and it is the thing this backlog is most likely to erode.

So the rule for everything below:

> A feature ships only when it either **earns its way past the budget** (something else is cut to make room) or **lives somewhere other than the landing page** (the Ecosystem reference sub-page, a dedicated page, or the package docs).

Each item records what it is, why it is worth doing, what it would cost, and what has to be decided before it can start.

**Tiers:**

- **Tier 1** — owner-requested, expected to happen
- **Tier 2** — deliberately cut from v2 with the reasoning preserved; revisit when the constraint that killed them changes
- **Tier 3** — speculative, recorded so they are not re-invented from scratch

---

## Tier 1 — Owner-requested

### 1.1 Domain application showcase — "Where the ecosystem is being used"

**What it is.** A curated showcase of how the HSSM ecosystem has been leveraged across research domains, organized by field:

- **Neuroeconomics** — value-based and preference-based choice, attentional drift-diffusion
- **Cognitive neuroscience** — brain–behaviour linkage, trial-wise neural covariates
- **Psychology** — decision-making, learning, attention, individual differences
- **Computational psychiatry** — computational phenotyping, clinical effects, disorders of decision-making

Candidate additions as the corpus grows: perceptual decision-making, developmental work, aging, pharmacology.

**Why it is worth doing.** This is the single most persuasive thing a landing page can carry for a scientific audience and the page currently has none of it. The v2 spec convinces by *demonstration* (the worked example) and by *specification* (what's in the box); a showcase convinces by **precedent** — "researchers like you, in your field, already did this." It serves both success criteria: it tells an unfamiliar researcher the method is established in their domain, and it tells a familiar one the ecosystem is in real use rather than a lab prototype.

**Likely form.** A dedicated page rather than a landing-page section — the landing page could carry at most a one-line link plus, later, a compact logo/field strip. A showcase is inherently long and inherently growing, which is exactly what the 550-word budget cannot absorb.

**Sourcing.** The citing literature is the corpus. The preprint's introduction and discussion already cite domain applications that would seed the first entries, and HDDM's usage (over 1,000 published studies) is the wider pool for lineage-relevant work. A first pass can be assembled by hand from those citations.

**Open questions — resolve before starting:**

| Question | Why it matters |
|---|---|
| Hand-curated or generated from a citation source? | Determines whether this is a one-off content task or a maintained pipeline |
| Who owns curation after launch, and at what cadence? | A stale showcase is worse than no showcase — it signals abandonment |
| Inclusion criteria — HSSM only, or HDDM lineage too? | HDDM inclusion massively increases volume but dilutes "this ecosystem" |
| Per-entry depth: citation only, or a short plain-language summary of what the model did? | Summaries are far more persuasive and far more expensive |
| Does it need author or lab consent to feature? | Affects timeline and whether logos/branding can be used |
| Landing-page footprint: nothing, one link, or a field strip? | Direct budget impact |

**Cost estimate.** Content-heavy, engineering-light. The build is a straightforward list or card page; the real cost is editorial and ongoing.

---

### 1.2 Animated visualizations

**What it is.** Bring the page's static visuals to life so the ecosystem reads as active and inviting rather than as a diagram.

**Technique is deliberately deferred.** Recorded here are the *goals* and the *constraints*; whoever builds it chooses the implementation. See [`ecosystem-landing-page-tech-spec.md`](ecosystem-landing-page-tech-spec.md) for the open decision.

**What should feel alive:**

| Target | Intended behaviour |
|---|---|
| Hero — data streams | Behaviour, neural, and gaze streams pulse along their paths into the model core, so the core visibly *receives* data |
| Hero — posteriors | Posterior curves bloom outward on the return path, so inference reads as an output rather than an ornament |
| Hero — contribution | A new model tile periodically travels in from the right and **docks at the "+" slot**, then the adoption fan lights up |
| Hero — model tiles | Very subtle trajectory motion inside tiles, so the wall reads as many live processes rather than static icons |
| Four-step chain | Steps highlight in sequence on scroll, reinforcing the double reading (contribution path / already-done-for-you) |
| Worked example | Panels reveal in order on scroll, so the argument lands as a sequence rather than all at once |

**Hard constraints (non-negotiable):**

1. **Static-first.** Every visual must communicate fully in a screenshot. Animation is enhancement, never a dependency. This is v2 §8 and it does not change.
2. **`prefers-reduced-motion` must be honoured**, falling back to the static composition. This is an accessibility requirement, not a nicety.
3. **No layout shift.** Animation must not move surrounding content.
4. **No blocking.** Animation must never delay first paint or gate access to content or CTAs.
5. **Content stays editable in source.** The hero's content will change as the ecosystem grows — model tiles, module labels, modalities. Any technique that converts the artwork into an opaque binary makes it un-maintainable.
6. **Performance budget** to be set in the tech spec once the stack is chosen.

**Open questions:**

- Does the hero animate on load, on scroll into view, on loop, or on hover?
- Loop indefinitely or play once? Indefinite motion in a hero is a common accessibility and attention complaint.
- Is there a mobile animation story, or does mobile go static?

---

## Tier 2 — Cut from v2, revisit later

These were removed for specific reasons. The reason is recorded so the decision can be revisited when the constraint changes rather than re-argued from zero.

| Feature | What it was | Why it was cut | Revisit when |
|---|---|---|---|
| **Interactive parameter widget** | In-page sliders over pre-computed simulations — adjust drift, boundary, bias and watch the RT distribution update | Highest build cost on the page, lowest leverage; `franklab/ssms_gui` already exists and is linked | There is engineering capacity to spare, or newcomer drop-off shows the static "why model" panel is not landing |
| **Full model gallery** | Browsable, linkable index of every model with cartoons and descriptors | Its stated rationale was making the "100+ models" claim tangible, and that claim was dropped | The model index on the reference sub-page exists and proves worth linking more prominently |
| **Persona router ("two doors")** | "I have data" / "I have a model" cards after the hero | Fragmented the hero's convergent message; categories neither exclusive nor exhaustive | Never, in this form. If routing is needed, route by *research question* rather than by persona |
| **Deep vignettes** | Three long-form stories with clusters of recognizable research questions | Overlapped the capability grid; consumed the budget the worked example now uses | The research questions may return as a compact scannable cluster, or as the entry points into the domain showcase (1.1) |
| **Full ecosystem map** | Hub-and-spoke plus numbered journey ring plus package cards | Duplicated HSSMSpine-maintained content and broke the budget | It now belongs on the reference sub-page; an animated version there is a reasonable Tier 3 idea |

---

## Tier 3 — Speculative

Recorded so they are not re-invented. None is endorsed.

- **Citation / usage counter** — live count of papers using the ecosystem. Persuasive, but needs a reliable data source and looks bad if it stalls.
- **"Which model should I use?" chooser** — a short guided flow from data description to a recommended starting model. High value for newcomers, high risk of giving bad methodological advice without careful design.
- **Workshop and tutorial archive** — a landing spot for past workshop material. Currently scattered.
- **Model comparison explorer** — interactive comparison of model families and their parameters. Overlaps ssm-simulators docs.
- **Community contributions feed** — recently added models or networks, pulled from the HuggingFace repo. Makes the flywheel visible as something actually turning; depends on contribution volume being high enough not to look dead.
- **Dark mode** — if not handled at build time, this becomes a retrofit across four bespoke SVGs. Cheaper to decide early; noted in the tech spec.

---

## Explicitly not planned

| Idea | Why not |
|---|---|
| Embedding full tutorials on the landing page | The page routes to docs; it does not replace them |
| Package comparison matrix | Lives in the preprint |
| An HDDM-migration marketing campaign | Owner constraint: lineage stays quiet |
| Hosting model artifacts on this site | HuggingFace is the artifact home |
