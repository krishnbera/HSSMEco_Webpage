# HSSM Ecosystem Landing Page — Content & Design Spec

**Version:** 3 (supersedes v2 of 2026-08-13, commit `3bbe077`; v1 remains at `7d7ac97`)
**Status:** Design approved — ready for copywriting and implementation planning
**Last updated:** 2026-08-13
**Scope:** Purpose, audience model, information architecture, section content, and visual direction. This document does **not** prescribe implementation technology or layout code.

**Source material:** brainstorming sessions (2026-08-13); ecosystem preprint (`HSSM-preprint/HSSM_Ecosystem_paper.pdf`, local only); cloned repositories in `repos/` (`HSSM/`, `ssm-simulators/`, `LANfactory/`, local only); existing HSSM ecosystem docs (`repos/HSSM/docs/ecosystem/index.md`).

**What changed in v2:** v1 was a faithful record of a good brainstorm, but it described a page that contradicted the owner's stated goal of a short, concise, direct pitch — 8 sections, ~1,200 words, 8 bespoke visual artifacts including custom interactive software. v2 sets a hard budget, resolves the blocking IA question v1 deferred, replaces three redundant sections with one worked example, and corrects a model-count claim that would not have survived scrutiny. Every reversal is recorded in Appendix B with its rationale.

**What changed in v3:** two owner decisions taken during the technology evaluation reach back into content. The hero becomes **interactive** — elements reveal detail on hover, and carry links (§6.1a); this is within the v2 budget, which already exempted "links and hover states" from the zero-interactive-software rule, but it introduces copy that did not previously exist. And the **full model index is replaced by model families** (§13), which removes the generated-index requirement and, with it, the last remaining Python step from the build. Both changes are recorded in Appendix B.

---

## 0. Owner objectives and design preferences

### Purpose

Build the **homepage for the entire HSSM ecosystem** — a short, concise, direct pitch to computational scientists on what the toolchain enables, deferring technical depth to package documentation.

The page pitches the **transformation of modeling practice** — broader model choice, richer data integration, rigorous validation, community-shared infrastructure — not "install our package."

### Success criteria (owner-stated, and the arbiter of every scope decision)

The page succeeds if it lands with two distinct visitors:

1. **PRIMARY — the unfamiliar researcher.** Someone who does not know HSSM and has not done process modeling leaves convinced that *this class of models and methods is the right way to model their data*.
2. **The familiar researcher.** Someone who already knows HDDM or the SSM family leaves convinced that *the ecosystem makes the whole pipeline easy* — simulator → training → simulation-based inference → shared artifacts → hierarchical inference → analysis — and that it comes together as one system.

When a scope question arises, the winning answer is whichever better serves criterion 1, then criterion 2.

### General design preferences

| Preference | Detail |
|---|---|
| **Brevity above all** | Short, concise, direct. Any section added must displace another. |
| **"What" over "how"** | Applications, scientific questions, unlocked workflows — not package internals, API surface, or sampler backends. |
| **Recognizable research problems** | Speak to problems researchers already have, not feature checklists. |
| **Route, don't embed** | When depth is needed, link to docs, tutorials, and the preprint. |
| **Convergent, not divergent** | Show how the same machine serves both roles. Do not ask visitors to self-classify before they know what is on offer. |
| **Show, don't assert** | Where a claim can be demonstrated in a figure, demonstrate it. |
| **Honest claims** | No number goes on the page that cannot be verified against the source of truth at build time. |
| **Quiet HDDM lineage** | Acknowledge as successor in one line. Not a hero angle, not a banner, not glamorized. |
| **Static first** | Ship without animation. Animation is a later enhancement, never a dependency. |

### What this page is not

- Not a replacement for HSSM, ssm-simulators, or LANfactory documentation.
- Not a technical API reference or package comparison matrix (the preprint has one).
- Not a flashy HDDM-successor marketing page.
- Not a tutorial host, and not a beginners' microsite.

---

## 1. Deliverable and information architecture

### The deliverable is two pages

| Page | Role | Budget |
|---|---|---|
| **Landing page** | The pitch. Canonical ecosystem entry point. | ~550 words, 6 sections |
| **Ecosystem reference** (sub-page) | The technical map. Everything a pitch must not carry. | No word budget; reference material |

### Canonical ownership moves here

This landing page **replaces** `https://lnccbrown.github.io/HSSM/ecosystem/` as the canonical description of the ecosystem. Consequences that must be handled at build time:

1. The existing ecosystem page is maintained in **HSSMSpine**. Ownership of that content moves to this project — coordinate before launch so there is one source of truth, not two.
2. `HSSM/ecosystem/index.md` must **redirect** here rather than continue to be maintained in parallel.
3. The technical content on that page is **not discarded** — it moves to the Ecosystem reference sub-page (see §13).

**Rationale for replace-over-coexist:** two independently maintained descriptions of the same ecosystem drift. v1 listed this as an open item; deferring it made §6.5 unspecifiable, because the section's scope depends entirely on whether it is canonical or a teaser.

---

## 2. Budget (hard constraints)

These are not aspirations. A section that exceeds its budget must take the overage from another section.

| Constraint | Value |
|---|---|
| Sections | **6** |
| Total body copy | **~550 words** |
| Scroll depth | **~4 screens** at 1440×900 |
| Substantial visuals | **4** |
| Bespoke interactive software | **0** — links and hover states are not "interactive software"; a custom simulation widget is |
| Code snippets on the page | **1**, three lines |

---

## 3. Audience model

### Two cross-cutting axes

The page must serve two axes at once, which if both branch produce four content tracks and a page nobody finishes:

| Axis | Values | How it is handled |
|---|---|---|
| **Role** | Theorist / experimentalist | **Branches** the layout — hero and payoff band present both, side by side |
| **Familiarity** | New to process modeling / already an SSM user | **Depth**, not branching — the same sections serve both, with newcomers picking up an extra panel or sentence rather than a separate track |

**Decision:** role branches, familiarity is depth. Nobody is asked to self-identify.

### Role weighting

**Equal in the hero and the payoff band. Asymmetric below, favoring the experimentalist.**

This is a deliberate change from v1, which specified equal weight throughout. Rationale: the large majority of visitors arrive with data, not with a new model; equal weight throughout would roughly double word and visual count and break the budget. Equal *billing* at the top preserves the message that both directions matter; asymmetric *depth* below reflects who is actually reading.

### Persona notes

| Persona | What they need here |
|---|---|
| **Experimentalist / analyst** | Cognitive neuroscientist, decision scientist, computational psychiatrist with behavioral and often neural data. Needs to see what workflows are possible, that brain/behavior linkage is first-class, and how to start. |
| **Theorist / model contributor** | Computational scientist with a new or custom generative model. Needs to see the contribution path and that their model can reach a broad audience without every user retraining. |
| **Newcomer** | Student or experimentalist new to process modeling. Served by depth inside the worked example — never labelled "for beginners," which readers skip. |

**Removed in v2:** the "two doors" persona router (v1 §6.2) and the standalone newcomer section (v1 §6.6). See Appendix B.

---

## 4. Narrative

### The frame: the flywheel

HSSM is **connective tissue between theory and experiment**. Theorists contribute models once; likelihood networks are trained once; models become reusable artifacts; experimentalists fit a growing bank of models without needing to simulate or train. Contributions are amortized across the community.

### The governing content rule

> **No field-level claim without an adjacent me-level payoff.**

The flywheel is a claim about *the field*. Both success criteria are about *one researcher's payoff*. A visitor nodding along to an attractive abstraction is not a visitor who installs anything. So the flywheel stops being the message and becomes **the reason the payoffs exist**.

This rule is enforceable during copy review: for every sentence about the community, ecosystem, or field, there must be an adjacent sentence about the reader.

### The cash-out table (copy source for §6.2)

| Flywheel claim (field-level) | Cash-out (me-level) |
|---|---|
| Contributions are amortized across the community | …which is why a bank of models is ready to fit and you never train a network |
| Theorists publish models as shared artifacts | …which is why your model reaches researchers who would never train one themselves |
| One toolchain replaces scattered codebases | …which is why simulate → train → share → fit is four commands, not four codebases |
| Networks are artifacts, not code | …which is why someone else's model installs like a dependency, not a collaboration |

### Supporting stories

| Story | Weight | Placement |
|---|---|---|
| **Liberation** — many theoretically meaningful models lack closed-form likelihoods; simulation-based inference unlocks them | Secondary | Tagline territory; §6.5 |
| **HDDM lineage** — modern successor, same lab, built on PyMC/Bambi/ArviZ rather than deprecated PyMC2 | Tertiary, quiet | §6.6, one sentence |

---

## 5. Page structure

```
1. Hero
2. Payoff band (both roles, equal)
3. Worked example  ← the spine of the page
4. The chain in four steps
5. What's in the box
6. Credibility · citation · community
```

| # | Section | Words | Role weight | Primarily serves |
|---|---|---|---|---|
| 1 | Hero | ~35 | Equal | Both criteria |
| 2 | Payoff band | ~90 | Equal | Both criteria |
| 3 | Worked example | ~150 | Experimentalist | **Criterion 1** |
| 4 | The chain in four steps | ~90 | Theorist-leaning, double-read | Criterion 2 |
| 5 | What's in the box | ~130 | Experimentalist | Criterion 2 |
| 6 | Credibility · citation · community | ~60 | — | Trust |

---

## 6. Section specifications

### 6.1 Hero

**Goal:** convey the ecosystem's dual use case in one distinctive, legible image, and state the shift in modeling practice in one line.

#### Copy

| Element | Content |
|---|---|
| Tagline | See §7 — brief settled, wording pending sign-off |
| Subline | See §7 |
| Primary CTA | **Get started** → HSSM installation / quickstart |
| Secondary CTA | **See it work** → smooth-scroll to §6.3 |

#### Visual: the model commons

The signature visual of the site. Composition, as approved:

**Centre — model core.** Approximately **6 model tiles**, each a legible thin line-art model cartoon (boundaries plus stochastic trajectory). One tile **highlighted** in the warm accent (the model currently in use). One tile is an **empty dashed tile with a "+"** — the contribution slot.

Tile count is deliberately low. Twenty tiles at true hero size render as texture rather than as recognizably different models, which defeats the purpose of showing model variety.

**Centre — supporting infrastructure.** A **straight row of module tiles beneath the core**, visually subordinate to it, labelled: simulation · SBI · sampling · validation · plots. Two colour families distinguish inference machinery from validation and plotting.

This is a v2 expansion. The centre is no longer *a model library*; it is **the ecosystem's commons** — models plus the inference machinery and validation tooling that surround them. Models remain the heart; everything else is explicitly auxiliary and supports them.

**Left flank — the experimentalist.** Three labelled data streams, each drawn as a real miniature plot, flowing **into** the core:

- **Behaviour** — choice and response-time distribution
- **Neural** — trial-wise EEG / fMRI traces
- **Eye-tracking** — fixations and gaze scanpath

A return path shows **insight**: posterior distributions over mechanism parameters.

**Right flank — the theorist.** A three-stage mechanism, not a vague spark:

1. **Your model** (dashed tile) →
2. **Trained artifact** — captioned "trained once, shared" →
3. **Docks specifically at the "+" tile** in the core — the arrow must terminate at the empty slot, not at the wall generally

A return path shows reach, captioned **"enable wider community adoption."**

**Captions:** "bring data, gain insight" (left) · "bring a model, gain adoption" (right). Do not label the flanks with role names such as "THEORIST" / "ANALYST" — the captions do that work.

**Interaction:** see §6.1a. Core model tiles are **clickable**, linking to the model families section of the Ecosystem reference sub-page (§13). This is the entire surviving remnant of v1's model gallery section, and it gives the hero a job beyond decoration.

#### Design notes for production

- Fix the return-arrow crossing: in the mockup, the insight return path crosses an incoming data-stream arrow. Route returns beneath the stream panels, or exit from the core's lower edge.
- Ring vs. straight row for the infrastructure modules: **deferred to implementation.** The concept is "models at the core, infrastructure auxiliary and supporting"; the arrangement can be explored against real art.
- Mobile: flanks stack beneath the core, or degrade to captions. The hero must have a defined mobile composition — this is a content decision, not an implementation detail, and v1 wrongly deferred it as the latter.
- Thin line-art aesthetic; muted indigo/teal palette with one warm accent (orange) for the active tile and return paths.
- Must work **without** animation. Optional later: tiles pulse as data arrives; a new tile docks periodically.

---

### 6.1a Hero interaction

**New in v3.** The hero is the one interactive element on the page. This does not breach the §2 budget, which explicitly exempts links and hover states from the zero-bespoke-interactive-software rule — but it introduces copy and behaviour that v2 did not specify.

**Goal:** let a curious visitor go deeper without lengthening the page. The hero carries more information than its ~35 words can state; interaction is how that surplus becomes reachable without spending budget on it.

#### What each element does

| Element | On hover/focus | On activation |
|---|---|---|
| **Model tile** (×~6) | Reveals the model family name and a one-line description | Links to that family on the Ecosystem reference sub-page (§13) |
| **Empty "+" tile** | Reveals the contribution invitation | Links to the contribution path (§6.4 / contribution guide) |
| **Module tile** (simulation · SBI · sampling · validation · plots) | Reveals which package owns it and what it does in one line | Links to that package's documentation |
| **Data stream** (behaviour · neural · eye-tracking) | Reveals a one-line statement of how that modality enters the model | — |
| **Return paths** (insight · adoption) | Reveals a one-line cash-out, per the §4 governing content rule | — |

#### Hard constraints

1. **Nothing is hover-only.** Every hover-revealed payload must also be reachable by keyboard focus and by tap. Hover-only content is invisible to keyboard users and to every mobile visitor, and fails WCAG 2.1 SC 1.4.13. This is a content constraint, not just an implementation one: if a payload cannot be reached three ways, it does not go in the hero.
2. **The hero must be complete without interaction.** Consistent with v2 §8's screenshot test — hover payloads are *supplementary*, never the only place something is said. Nothing required to understand the pitch may live behind an interaction.
3. **Payloads are one line.** A hover that opens a paragraph is a section in disguise and breaks the budget.
4. **Mobile has a defined behaviour**, decided alongside the mobile composition (§6.1). Tap-to-reveal and link-through compete for the same gesture; that conflict must be resolved in the design, not discovered in the build.

#### Word budget

Hover payloads are **excluded** from the ~550-word body count — they are not body copy and are not read linearly. They carry their own budget: **~120 words total** across all elements. Exceeding it means the hero is doing a section's job.

---

### 6.2 Payoff band

**Goal:** the only place below the hero where both roles get equal billing. Convert the flywheel from an abstraction into two first-person payoffs.

**Format:** two columns, equal visual weight. Light iconography only — no substantial visual, to protect the budget for §6.3.

**Content:** drawn directly from the cash-out table in §4. Left column addresses the reader with data; right column the reader with a model. Each column pairs one field-level sentence with one me-level sentence, per the governing content rule.

**Links:** left → quickstart and tutorials; right → contribution guide and §6.4.

**Word budget:** ~90.

---

### 6.3 Worked example — the spine of the page

**Goal:** the section that carries the primary success criterion. It must convince a researcher unfamiliar with process modeling that this class of models fits their data — by demonstration, not assertion — and close the "can I trust an approximated likelihood?" objection in the same breath.

**Format:** four panels in sequence, one continuous visual, one code snippet.

| Panel | Content | What it accomplishes |
|---|---|---|
| **0 — the problem** | Two groups with near-identical mean response times | Makes a newcomer *feel* that summary statistics hide mechanism, without a "for beginners" label anyone would skip |
| **1 — the model** | The one code snippet on the page, with a mixed-effects formula | Shows how little it takes to express a real hierarchical model with a covariate |
| **2 — the answer** | Posteriors showing the groups differ in drift rate versus boundary separation | Delivers the payoff: interpretable mechanisms, with uncertainty |
| **3 — the check** | Posterior predictive check showing the fitted model reproduces the observed data | Answers the trust objection by demonstration |

**The code snippet** (the only code on the page):

```python
import hssm
model = hssm.HSSM(data=my_data, model="ddm")
model.sample()
```

Panel 1 may show a formula chip (`v ~ theta + (1|participant_id)`) alongside the snippet. All longer examples live in the docs.

**Trust content:** panel 3 carries it visually. **Parameter recovery** gets one sentence plus a link — it is the second thing a careful reader asks about and the cheapest possible reassurance.

**Canonical dataset:** Cavanagh & Frank (2014) frontal theta data, shipped with HSSM as `cavanagh_theta`, is the natural candidate. Confirm during copy that the narrative it supports matches panels 0–3.

**Word budget:** ~150.

---

### 6.4 The chain in four steps

**Goal:** carry success criterion 2 — that the ecosystem comes together as one system, end to end.

**Format:** a four-step linear diagram, with package names.

```
① Simulate & define model   →  ssm-simulators
② Train likelihood network  →  LANfactory
③ Share artifact            →  HuggingFace
④ Infer hierarchically      →  HSSM
```

**The double reading — this is the point of the section.** The same four steps must be legible two ways, and the caption must make both explicit:

- A **theorist** reads it as *the contribution path*: this is what I do to get my model into people's hands.
- An **experimentalist** reads it as *work already done for me*: steps ① – ③ happened before I arrived; I only do ④.

**Caption direction:** something in the register of "Fitting models to your data? You only ever touch step ④. Contributing a model? The other three are one command each."

**Do not** reproduce the full hub-and-spoke ecosystem map, the package cards, the version tables, or the auxiliary-repository footnotes. Those live on the Ecosystem reference sub-page (§13), linked once from here.

**Word budget:** ~90.

---

### 6.5 What's in the box

**Goal:** a dense, scannable capability list. Scientists read spec sheets; this is the section that replaces v1's three vignettes *and* its capability grid, both of which covered the same ground.

**Format:** compact grid, icon + short phrase + one line each.

| Capability | One-line description (draft) |
|---|---|
| **Model families** | Diffusion variants, race and LBA/LCA accumulators, attention models, and reinforcement-learning SSMs — with a path to add your own |
| **Hierarchical Bayesian inference** | Pool across participants; estimate individual and group parameters with uncertainty |
| **Simulation-based inference** | Fit models with no analytical likelihood, via trained likelihood surrogates |
| **Full mixed-effects models** | `lmer`-style formulas on any model parameter — conditions, covariates, random intercepts and slopes |
| **Trial-wise covariates** | EEG, fMRI, pupil, skin conductance, and fixations enter the generative model itself, not a post-hoc correlation |
| **Learning and deciding jointly** | RLSSMs, where decision parameters are driven by a learning process |
| **Complete inference workflow** | Posterior predictive checks, model comparison, quantile-probability plots, model cartoons |
| **Scale and interoperability** | GPU-accelerated gradient-based samplers; built on PyMC/Bambi/ArviZ; import networks from sbi or BayesFlow via ONNX |

**Claim discipline — no model counts.** Name **families**, never numbers. See §10 for why, and for what the numbers actually are.

**Word budget:** ~130.

---

### 6.6 Credibility, citation, community

**Goal:** trust signals and practical next steps, without dominating the page. Merges v1's §6.7 and §6.8.

| Element | Treatment |
|---|---|
| HDDM lineage | One quiet line: "From the lab behind HDDM — used in over 1,000 published studies." No banner, no comparison block. |
| Institutions | Brown University; Carney Institute for Brain Science; Center for Computation and Visualization; BRAINSTORM |
| Funding | NIMH, ONR (per paper acknowledgments) |
| Paper | Preprint link, phrased so it does not expire when the paper leaves review (see §10) |
| Built on | Logo strip: PyMC, Bambi, ArviZ, JAX, ONNX, HuggingFace |
| Community | GitHub Discussions; contribution invitation; citation block (paper plus per-package Zenodo DOIs) |

**Word budget:** ~60.

---

## 7. Tagline and subline

### The tagline's job (settled)

**Name the shift in practice** — what changes about how you work.

The hero visual and its captions already state the flywheel explicitly. A tagline that restates it would spend the page's most valuable line on something already said, competing with the picture instead of complementing it. This is the most likely reason v1's first candidate batch felt flat: every candidate was in territory the visual had already occupied.

Note also that v1's shortlisted candidate — "Bring a model, gain adoption. Bring data, gain insight." — is now **spoken for**: it is the two hero captions. That is its correct home.

### Brief

| Constraint | Requirement |
|---|---|
| Territory | What changes about how you model — the shift in practice |
| Length | **≤ 8 words** |
| Jargon | None. Must land on a reader who has never heard of a sequential sampling model |
| Relationship to visual | Complements the captions; must not restate the flywheel |
| Standalone | Must survive being read aloud in a talk, printed on a slide, and truncated in a search result |
| Subline dependency | May lean on the subline for specifics, but must not be meaningless without it |

### Candidates (fresh batch under the new brief — pending owner sign-off)

| Candidate | Words | Note |
|---|---|---|
| **Model what you mean.** | 4 | Shortest and most quotable. Names the shift precisely: you model the process you actually theorize, not the tractable proxy. Risk: may read as too abstract without the subline. |
| **Test the model you actually believe.** | 6 | Most direct statement of the shift. Slight risk of sounding accusatory about current practice. |
| **Your best model, not your most convenient one.** | 8 | Most explicit about the trade-off being eliminated. At the length ceiling. |
| **Fit the model your theory implies.** | 6 | Clean, confident, closest to how a methods paper would put it. Least distinctive. |
| **Modeling that keeps pace with your theory.** | 7 | Warmest register; frames the ecosystem as infrastructure that has caught up. Slightly vaguer. |
| **From theory to inference, without the detour.** | 7 | Names the removed friction. Risk: "detour" needs the reader to already know what the detour was. |

**Recommendation:** "Model what you mean." — with a subline carrying the specifics. It is the only candidate short enough to function as an ecosystem-wide handle while still making a claim.

### Subline drafts

- An open Python ecosystem for hierarchical Bayesian modeling of behaviour and brain.
- Hierarchical Bayesian inference for the process models your theory actually implies — behaviour, brain, and gaze.
- Open Python tools for fitting neurocognitive process models to behaviour, neural, and eye-tracking data.

Final wording to be chosen alongside the tagline.

---

## 8. Visual and design direction

### Aesthetic

- Clean, modern, flat-vector scientific illustration
- Light background (off-white); defined dark-mode treatment if the site supports it
- Muted indigo/teal palette; one warm accent (orange) for active and return elements
- Thin line-art model cartoons as the signature visual language
- Generous whitespace; minimal label text on diagrams

### Signature elements

| Element | Where used |
|---|---|
| Model tile / model cartoon | Hero core, worked example, capability grid |
| Infrastructure module tile | Hero infrastructure row |
| Data streams (RT histogram, neural trace, gaze scanpath) | Hero left flank |
| Posterior curves | Hero left return, worked example panel 2 |
| Empty "+" tile | Hero core, hero right flank target, contribution CTAs |

### The four substantial visuals

1. Hero commons (§6.1)
2. Worked example, four panels as one composite (§6.3)
3. Four-step chain (§6.4)
4. Capability grid iconography (§6.5) — lightweight, a set rather than a scene

### Animation policy

Ship static. Animation is a later enhancement and never a dependency: every visual must communicate fully in a screenshot.

---

## 9. Content principles

### Emphasize

- Scientific possibilities and recognizable research questions
- The bidirectional theory ↔ experiment flywheel, always cashed out to a reader payoff
- Breadth of models, by family
- Neural, physiological, and gaze covariates as first-class
- Validation culture — posterior predictive checks, parameter recovery, model comparison
- Open ecosystem — PyMC stack, ONNX, HuggingFace, sbi/BayesFlow

### De-emphasize

- Package internals, version matrices, API details
- Sampler and backend enumeration (GPU is mentioned once)
- HDDM comparison (lives in the paper)
- The ONNX likelihood contract (link to docs)

### Tone

- Precise, confident, accessible to computational scientists and adjacent fields
- Not marketing hype; not jargon-heavy
- Speak to problems researchers recognize, not feature checklists

---

## 10. Claims and factual accuracy

Every number on the page must be verifiable against a source of truth. Verified 2026-08-13 against the local clones:

| Claim | Verified value | Source |
|---|---|---|
| Registered model configurations | **113** | `len(ssms.config.model_config)` |
| Models fittable in HSSM by name | **16** | `hssm._types.SupportedModels` |
| HDDM usage | "used in over 1,000 published **studies**" | Preprint, HDDM comparison section |

### Why the page names families and not numbers

"100+ models" is true of *simulators* and misleading about *fitting*. A visitor who reads 100+ and then discovers that a given model has no trained network available loses trust at exactly the wrong moment. Naming families is accurate, never goes stale, and requires no build-time audit.

**If numbers are ever reintroduced,** the HuggingFace repository (`franklab/HSSM`) must first be audited for what it actually hosts — that count may exceed 16 and has **not** been verified — and the figures must be generated at build time rather than hand-written.

### Required corrections carried from v1

| Item | Correction |
|---|---|
| HDDM figure | "1,000+ published **studies**", not "1,000+ citations". For this audience the distinction matters. |
| Author list | Fengler, Xu, Bera, **Paniagua**, Omar, Frank — per the preprint. |
| Deprecated API | `HSSM.supported_models` is deprecated (`src/hssm/base.py:506`). Use `hssm.modelconfig.list_models()`. |
| Preprint status | bioRxiv, posted 9 June 2026, DOI `10.64898/2026.06.05.730398`. Phrase the reference so it does not expire when the paper leaves review — avoid "under review" in page copy. |
| Upstream drift | The HSSM docs `index.md` citation is stale relative to the preprint (omits Paniagua, says "in preparation"). Worth fixing upstream before this page links to both. |

---

## 11. Open items

| Item | Owner | Notes |
|---|---|---|
| Tagline final wording | Copy | Brief settled (§7); candidate batch awaiting sign-off |
| Subline final wording | Copy | Choose alongside tagline |
| Worked-example dataset | Content | Confirm `cavanagh_theta` supports the panel 0–3 narrative |
| Hero production artwork | Design | Fix return-arrow crossing; decide ring vs. row; define mobile composition |
| **Hero hover payloads** | Copy | New in v3 (§6.1a). Every element in the table needs its one-line payload written. ~120 words total, excluded from the body budget |
| **Hero mobile interaction** | Design | New in v3 (§6.1a). Tap-to-reveal and tap-to-follow-link compete for one gesture; resolve in design, not in the build |
| **Model families copy** | Copy | New in v3 (§13). Four families, one line each, labelled as a selection rather than a catalogue |
| **Upstream: model-listing pages** | Infra | New in v3 (§13). Neither HSSM nor `ssm-simulators` publishes a browsable model list, so this page has no canonical target to link out to. Recommend adding one to each, generated from the registry. Same class of upstream fix as the stale citation in §10 |
| Copy pass | Copy | All section copy is currently direction, not final text |
| HSSMSpine coordination | Infra | Ownership transfer and redirect from `HSSM/ecosystem/` |
| URL / hosting | Infra | Domain and deployment target |
| Instrumentation | Infra | v1 put analytics out of scope, which leaves the success criteria unmeasurable. Recommend minimal event tracking on both CTAs so scope arguments can be settled by evidence. Not yet owner-confirmed. |

---

## 12. Out of scope for this spec

- Technology stack (React, Astro, static site generator, etc.)
- Responsive breakpoints and component library — **except** the hero's mobile composition, which is a content decision and is in scope (§6.1)
- SEO and accessibility audit
- Implementation plan and task breakdown
- Copy finalization and legal review

**Next step:** implementation planning, in a separate document.

---

## 13. Ecosystem reference sub-page

**Goal:** hold everything the pitch must not carry, so that replacing the existing ecosystem page orphans nothing.

**Content inherited from `repos/HSSM/docs/ecosystem/index.md`:**

- The packages you install, and what each owns
- Which package answers which question
- How the pieces connect — the file-handoff chain, and why networks are artifacts rather than code
- The ONNX likelihood contract, and what it means for openness at the edges
- Supporting components (`hddm-wfpt`, `franklab/HSSM`, `franklab/ssms_gui`, conda-forge feedstocks)
- Development and coordination repositories (HSSMSpine, HSSMCortex)
- Tracking runs with MLflow
- Version compatibility
- Where to ask

**Additions:**

- **Model families** — the link target for the hero's clickable tiles. See below.
- Auxiliary repositories (`LAN_pipeline_minimal`; future HSSMCortex, HSSMeister, HSSMSpine coordination)

**Linked from:** §6.4 (once), and the footer.

### Model families, not a model index

**Changed in v3.** v2 specified "a full model index, generated from the registry rather than hand-curated." That is replaced by a short, hand-written description of **model families**, supplemented by links out to the packages for the exhaustive lists.

**Rationale.** A generated index was proposed to make model breadth tangible without hand-maintenance. But §9 already commits this page to naming *families, never numbers*, and §10 records why: "113 registered simulator configurations" and "16 models fittable by name" are different quantities, and a visitor who conflates them loses trust at exactly the wrong moment. An exhaustive index invites the same conflation by enumeration rather than by count. Families are also stable — they do not go stale between releases, and they need no build-time audit.

**Content.** The families already named in §6.5: diffusion variants, race and LBA/LCA accumulators, attention models, and reinforcement-learning SSMs — each with a one-line description and a link onward.

**Honesty constraint.** The list must read as **a selection, not a catalogue.** Label it so, and make the "for the complete list, see…" link prominent rather than a footnote. This is the same discipline §10 applies to numbers, extended to enumeration.

**Link targets — and an upstream gap.** Verified 2026-08-13 against the local clones: **neither package currently publishes a browsable list of models.**

| Package | What exists | What does not |
|---|---|---|
| HSSM | `hssm.modelconfig.list_models()` (`src/hssm/modelconfig/__init__.py:40`); `hssm.show_defaults` API page | No docs page enumerating supported models |
| ssm-simulators | `ssms.config` API page; "Configuration systems" and "What ssm-simulators can do" tutorials | No docs page enumerating available simulators |

Until that changes, link to the closest existing targets — the configuration tutorials and the `show_defaults` / `config` API pages — and state plainly what they are. **Recommended upstream fix:** a generated model-listing page in the HSSM and `ssm-simulators` docs, which is where that content belongs and where it can be generated from the registry cheaply. Tracked in §11.

---

## 14. Key links and references

### Package docs

| Package | Docs | GitHub | Install |
|---|---|---|---|
| HSSM | https://lnccbrown.github.io/HSSM/ | https://github.com/lnccbrown/HSSM | `pip install hssm` |
| ssm-simulators | https://lnccbrown.github.io/ssm-simulators/ | https://github.com/lnccbrown/ssm-simulators | `pip install ssm-simulators` |
| LANfactory | https://lnccbrown.github.io/LANfactory/ | https://github.com/lnccbrown/LANfactory | `pip install lanfactory` |

### Ecosystem artifacts

- HuggingFace models: https://huggingface.co/franklab/HSSM
- Interactive simulator GUI: https://huggingface.co/spaces/franklab/ssms_gui
- Ecosystem map (to be replaced by this page): https://lnccbrown.github.io/HSSM/ecosystem/
- ONNX likelihood contract: https://lnccbrown.github.io/HSSM/how_to/custom_onnx_likelihoods/

### Paper

- **Title:** HSSM: A Widely Applicable Toolbox for Hierarchical Bayesian Neurocognitive Modeling
- **Authors:** Fengler, Xu, Bera, Paniagua, Omar, Frank (Brown University)
- **Preprint:** bioRxiv, posted 9 June 2026 — https://doi.org/10.64898/2026.06.05.730398
- **Local copy:** `HSSM-preprint/HSSM_Ecosystem_paper.pdf` (gitignored)

### Institutional

- BRAINSTORM: https://ccbs.carney.brown.edu/brainstorm

---

## Appendix A: Wireframe

```
┌──────────────────────────────────────────────────────────────────┐
│  [TAGLINE]                                                       │
│  Subline: open Python ecosystem, behaviour + brain               │
│                                                                  │
│   behaviour ─┐                          ┌─ your model            │
│   neural ────┼──▶ [ MODEL CORE ] ◀──────┤  → artifact → "+"      │
│   gaze ──────┘    ┌──────────────┐      └─ ← adoption            │
│   ◀── posteriors  │ sim·SBI·samp │                               │
│                   │ ·valid·plots │                               │
│                   └──────────────┘                               │
│  bring data, gain insight        bring a model, gain adoption    │
│                                                                  │
│  [ Get started ]     [ See it work ↓ ]                           │
├──────────────────────────────────────────────────────────────────┤
│  PAYOFF BAND    │  you have data  │  you have a model  │  equal  │
├──────────────────────────────────────────────────────────────────┤
│  WORKED EXAMPLE                                                  │
│  ⓪ same mean RT → ① formula → ② posteriors → ③ predictive check  │
├──────────────────────────────────────────────────────────────────┤
│  ① simulate → ② train → ③ share → ④ infer                        │
│  "fitting? you only touch ④"                                     │
├──────────────────────────────────────────────────────────────────┤
│  WHAT'S IN THE BOX  ┌────┬────┬────┬────┐                        │
│                     └────┴────┴────┴────┘                        │
├──────────────────────────────────────────────────────────────────┤
│  HDDM lineage · Brown · paper · logos · cite · Discussions       │
└──────────────────────────────────────────────────────────────────┘
```

---

## Appendix B: Decisions log

### v3 decisions

| Decision | Choice | Rationale |
|---|---|---|
| Hero interaction | Elements reveal detail on hover/focus/tap; tiles and modules carry links (§6.1a) | Owner; lets the hero carry more than its ~35 words without lengthening the page. Already permitted by the §2 budget, which exempts links and hover states |
| Hover accessibility | Nothing is hover-only; every payload reachable three ways | WCAG 2.1 SC 1.4.13. Treated as a *content* constraint — a payload that cannot be reached three ways does not go in the hero |
| Hover budget | ~120 words, excluded from the ~550-word body count | Hover payloads are not read linearly, but they still need a ceiling or the hero becomes a section |
| Hero completeness | Must remain complete without interaction | Extends v2 §8's screenshot test to interaction |
| Model index | Replaced by **model families** plus links out (§13) | Owner; a small demonstrative list. An exhaustive index invites the same conflation §10 dropped numbers to avoid — 113 simulator configs vs 16 fittable by name |
| Index honesty | Must read as a selection, not a catalogue | Extends §10's claim discipline from numbers to enumeration |
| Upstream model lists | Recommend HSSM and `ssm-simulators` each publish a generated model-listing page | Verified 2026-08-13: neither does, so this page has no canonical link target |

### v2 decisions

| Decision | Choice | Rationale |
|---|---|---|
| Success criteria | Two-fold: unfamiliar researcher convinced of the method (primary); familiar researcher convinced of end-to-end ease | Owner |
| Hero story | Flywheel retained, with mandatory me-level cash-out | Owner; neither success criterion is about community adoption on its own, so the flywheel needed to pay rent |
| Audience axes | Role branches; familiarity is depth | Avoids four content tracks |
| Role weighting | Equal in hero and payoff band; asymmetric below | Budget and traffic reality; changes v1's equal-weight-throughout |
| Budget | 6 sections, ~550 words, ~4 screens, 4 visuals | Owner |
| IA | This page replaces `HSSM/ecosystem/` as canonical | Owner; ends the two-sources-of-truth drift risk |
| Technical content | Moves to an Ecosystem reference sub-page | Owner; nothing orphaned, pitch stays clean |
| Hero centre | Model core plus auxiliary infrastructure modules | Owner; centre is the commons, not just a model library |
| Hero tile count | ~6, down from ~20 | Twenty tiles render as texture at true hero size |
| Hero flanks | Experimentalist left, theorist right | Owner |
| Contribution arrow | Docks specifically at the "+" tile | Owner |
| Adoption caption | "enable wider community adoption" | Owner |
| Infrastructure arrangement | Ring vs. straight row deferred to implementation | Owner |
| Tagline job | Name the shift in practice | Owner; visual captions already carry the flywheel |
| Model breadth | Name families, no numbers | Owner; 113 simulators vs 16 fittable by name |
| Trust content | Final panel of the worked example | Demonstration beats assertion |
| "Why model at all" | Panel 0 of the worked example | Serves the primary criterion without a skippable beginners' label |
| Model gallery | Cut as a section; hero tiles clickable instead | Its rationale was the "100+" claim, now dropped |

### v1 decisions retained

| Decision | Choice |
|---|---|
| Page type | Ecosystem homepage / landing page |
| Hero story angle | Flywheel / connective tissue |
| Hero visual concept | Model commons, symmetric composition |
| Code on page | One three-line snippet only |
| HDDM mention | Quiet credibility line only |
| Package detail level | High level on page; redirect to docs |
| Animation | Static first |
| Content balance | "What" over "how" |

### v1 decisions superseded

| v1 decision | v2 replacement | Why |
|---|---|---|
| Two doors (persona router) after the hero | Cut | Fragmented the hero's convergent message; categories neither exclusive nor exhaustive; required self-ID before the pitch |
| Equal role weight throughout | Equal in hero and payoff band only | Budget; most visitors arrive with data |
| Three vignettes plus capability grid | One worked example plus spec sheet | v1 itself conceded the grid was covered by the vignettes |
| Model gallery strip as a section | Clickable hero tiles | Rationale was the "100+" claim |
| "100+ models" | Model families, no numbers | 113 simulators vs 16 fittable by name |
| Standalone newcomer section | Panel 0 of the worked example | ~70% overlap with the analyst path by v1's own analysis |
| Custom in-page slider widget | Cut entirely | Highest build cost on the page, lowest leverage; `ssms_gui` already exists and is linked |
| Hub-and-spoke map plus workflow ring plus package cards | Four-step chain plus reference sub-page | Was duplicating HSSMSpine-maintained content |
| Hero mobile composition deferred as implementation detail | In scope here | The composition chosen determines whether a mobile version is possible at all |
| Tagline restating the flywheel | Tagline names the shift in practice | The hero captions now carry the flywheel |

---

## Appendix C: Rejected approaches

Do not re-propose without new rationale.

### Hero story angles

| Angle | Verdict |
|---|---|
| Flywheel / connective tissue | **Selected** (with mandatory me-level cash-out) |
| Liberation ("if you can simulate it, you can fit it") | Secondary — tagline territory and §6.5 |
| Ease / end-to-end as the hero | Considered in v2; folded in as the job of §6.4 instead |
| HDDM successor / lineage | Tertiary — one line in §6.6 |
| Generic capability ("hierarchical Bayes for behaviour + brain") | Too flat for a hero |

### Hero visual concepts

| Concept | Verdict |
|---|---|
| Model commons, model core + auxiliary infrastructure | **Selected** |
| Model commons, 20 tiles + all flows drawn (v1 §6.1) | Rejected in v2 — tiles read as texture; no mobile composition |
| Grouped blocks (models / inference / plots as three labelled clusters) | Rejected — reads as an inventory, most diagram-like |
| One colour-coded periodic table with a legend | Rejected — good, but weaker argument than models-at-the-core |
| Triptych left-to-right | Reads as a pipeline; underweights bidirectionality |
| Two-way bridge (model ⇄ data) | Strong on fit, weak on contribution |
| Prism (data → mechanisms) | Fitting-only |
| Self-assembling model cartoon | Fitting-only; busy |
| Relay loop | Flywheel without covariate breadth |
| Typography-only with ambient trajectories | Depends entirely on tagline; less distinctive |
| Struck-through integral ("no likelihood?") | Inside joke; wrong story |

### Capabilities presentation

| Format | Verdict |
|---|---|
| Worked example plus spec sheet | **Selected** |
| Vignette-only (4–6 stories) | Too long |
| Grid-only | Too generic |
| Three vignettes plus grid | Rejected in v2 — redundant with itself |
| Tabbed / carousel | Hidden-content risk |

### Ecosystem map treatments

| Format | Verdict |
|---|---|
| Four-step chain with double reading, plus reference sub-page | **Selected** |
| Hub-and-spoke plus journey ring plus package cards | Rejected in v2 — duplicates maintained content, breaks budget |
| Workflow-first only | Missing package identity |
| Package-first three cards | Missing journey |
| Layered stack | Less dialogue, more hierarchy |
| Persona-lens toggle | Not selected |
| Animated journey | Deferred — static first |

### Newcomer treatment

| Option | Verdict |
|---|---|
| Panel 0 of the worked example | **Selected** |
| Standalone newcomer section | Rejected in v2 — overlaps the analyst path |
| Custom in-page slider widget | Rejected in v2 — highest cost, lowest leverage |
| iframe `ssms_gui` | Rejected in v1 |
| Link out only | Retained as a supplement, not the main vehicle |
