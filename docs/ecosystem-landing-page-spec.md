# HSSM Ecosystem Landing Page — Content & Design Spec

**Status:** Brainstorm complete — ready for copywriting and implementation planning  
**Last updated:** 2026-08-13  
**Scope:** Content, information architecture, and visual direction for the HSSM ecosystem homepage. This document does **not** prescribe implementation technology or layout code.

**Source material for this spec:** brainstorming session (2026-08-13); ecosystem preprint (`HSSM-preprint/HSSM_Ecosystem_paper.pdf`, under review, local only); cloned repositories in `repos/` (`HSSM/`, `ssm-simulators/`, `LANfactory/`, local only); existing HSSM ecosystem docs (`repos/HSSM/docs/ecosystem/` when cloned locally).

---

## 0. Owner goals, aims, and constraints

This section records the **project owner’s stated high-level goals and preferences**. All section specs below should be read in light of these.

### High-level aim

Build a **landing page / homepage for the entire HSSM ecosystem** that:

1. **Pitches computational scientists** (and other relevant researchers) on how HSSM can help **transform their computational modeling workflows** and support their **broader computational modeling enterprise** — not just sell a software package.
2. Gives a **high-level overview of applications and possibilities** HSSM unlocks for a computational modeler: what you can *do* scientifically, not how each package is implemented.
3. Provides enough ecosystem context that visitors understand **what the toolchain is for**, while **deferring technical detail** to package documentation, APIs, and tutorials.
4. Positions HSSM as **connective tissue between theory and experiment** — a platform where the **mutual benefit of dialogue** between computational theorists and experimentalists is a first-class message. Both directions matter equally:
   - **Empirical analysis:** fit state-of-the-art computational models to data.
   - **Contribution:** bring your own models into the ecosystem for **broader community adoption**.
5. Includes a **very strong, memorable one-line tagline** for the entire ecosystem. This is a key deliverable; exact wording is still TBD (see §4).

### Content balance (owner preference)

| Do more of | Do less of |
|---|---|
| “What” — applications, scientific questions, unlocked workflows | “How” — package internals, API surface, sampler backends |
| Possibilities for computational modeling | Technical specs of individual packages |
| Recognizable research problems | Feature checklists without scientific context |
| Routing to docs/tutorials when depth is needed | Embedding full tutorials on the landing page |

The page **may** mention the three packages and how they connect, but package sections should stay **high level**. Visitors who want depth should be sent to `lnccbrown.github.io` docs, GitHub, and the preprint.

### Explicit owner preferences (design decisions)

| Topic | Owner preference |
|---|---|
| **Hero story** | Flywheel / connective tissue between theory and experiment — **not** liberation-first, not HDDM-successor-first, not generic capability-list |
| **Hero visual** | Simple, memorable, distinctive; must convey **both** fitting models to data **and** contributing models for community adoption; should imply **state-of-the-art methods and infrastructure** without becoming a technical diagram |
| **Hero visual (selected)** | “Model commons” — periodic-table wall of models, expanded to show **behavioral + neural + eye-tracking** data streams (broader pitch than behavior-only); **symmetric hub** composition with equal weight on both directions |
| **Tagline** | Must be a strong one-liner for the whole ecosystem; initial candidate batch (§4) was **not** accepted — use `[TAGLINE]` stub until a dedicated wordsmithing round |
| **Audience structure** | Mixed audience with **equal weight**; two doors at top (“I have data” / “I have a model”); newcomers get a **section**, not a third door |
| **HDDM lineage** | Acknowledge as successor somewhere on the page, but **not flushed out, not flashy** — one quiet credibility line, not a hero angle or large banner |
| **Capabilities section** | **Hybrid:** 3 broad vignettes (organized by what the researcher *brings*) + capability grid below |
| **Vignette 1** | Behavioral data — broad topic; nest specific examples inside (speed–accuracy, learning while deciding, etc.) |
| **Vignette 2** | Covariates — neural covariates, eye tracking, physiological measures |
| **Vignette 3** | “You have a model” — contribution and community adoption (theorist path) |
| **Capability grid** | Owner-specified items in §6.3; additional items (scalability, openness) are recommendations, not yet owner-confirmed |
| **Ecosystem map** | Combine **hub-and-spoke** (what it is) with **workflow ring** (simulate → train → share → infer); static first, animation-ready later |
| **Model gallery** | Keep — hero wall expanded into browsable index |
| **Newcomer interactivity** | Custom in-page slider widget (pre-computed sims) — **not** iframe embed of `ssms_gui` |
| **Code on page** | **One** minimal 3-line snippet only; all other code lives in docs |
| **Hero CTAs** | “Get started” + “Explore the ecosystem” (scroll to map) |

### What this page is not

- Not a replacement for HSSM, ssm-simulators, or LANfactory documentation.
- Not a technical API reference or package comparison matrix (the ecosystem paper already has one).
- Not a flashy HDDM marketing page — lineage is a **quiet** trust signal, not the hero story. Per owner: **do not over-emphasize or glamorize the HDDM successor narrative.**

---

## 1. Purpose

Build a landing page that serves as the **homepage for the entire HSSM ecosystem**. The page should:

1. Give a **high-level overview** of what the ecosystem enables for computational scientists and related researchers.
2. Pitch HSSM as **connective tissue between theory and experiment** — a flywheel where theorists contribute models and experimentalists fit them to data, with **mutual benefit** and an accelerated research cycle.
3. Emphasize the **“what”** (applications, scientific possibilities, unlocked workflows) over deep technical detail about individual packages.
4. **Redirect** visitors to package docs, tutorials, and APIs when they need the “how.”
5. Convey that the ecosystem is built on **state-of-the-art** probabilistic programming, simulation-based inference, and shared infrastructure — without turning the page into a methods paper.

---

## 2. Audience

The page serves a **mixed audience** with equal weight. No single persona should dominate the hero, but each section can speak more directly to one group.

| Persona | Who they are | What they need from this page |
|---|---|---|
| **Experimentalist / analyst** | Cognitive neuroscientist, decision scientist, computational psychiatrist with behavioral (+ often neural) data | Understand what models and workflows they can run; see that brain/behavior linkage is first-class; get to HSSM quickstart fast |
| **Theorist / model contributor** | Computational scientist with a new or custom generative model | Understand the contribution path (simulate → train → share → community adoption); see that their model can reach a broad audience without every user retraining |
| **Newcomer** | Student or experimentalist who has not done process modeling | Understand *why* computational modeling matters; try a model interactively; find tutorials |

### Persona routing (two doors)

The page uses **two primary doors** at the top (not three). Newcomers are served by a dedicated section lower on the page rather than a third top-level door.

**Rationale (owner decision):** A third “newcomer” door was considered but rejected. Newcomer content overlaps heavily with the experimentalist door (~70%: quickstart, tutorials, why-model). A lower-page section avoids forcing newcomers to self-identify at the top while still serving them.

| Door | Label (draft) | Leads to |
|---|---|---|
| **Door 1** | “I have data” | Vignette 1 & 2, HSSM quickstart, tutorials |
| **Door 2** | “I have a model” | Vignette 3, contribution docs, ecosystem workflow map |

---

## 3. Core narrative

### Primary story: the flywheel

HSSM is **connective tissue between theory and experiment**. The page should make the **mutual benefit of the dialogue** between these two sides tangible — not just list features for analysts.

The ecosystem accelerates the research cycle:

- **Theorists** contribute models once → likelihood networks are trained once → models are shared as reusable artifacts → gain **adoption** across the community.
- **Experimentalists** fit a broad, growing bank of models to their data without needing to understand simulation or network training → gain **insight** into mechanisms.
- **The community** benefits collectively: contributions are amortized across studies; the model bank grows for everyone.

This is the message the hero visual (“model commons”) and the shortlisted tagline candidate (“Bring a model, gain adoption. Bring data, gain insight.”) are meant to express.

Key phrases already in ecosystem docs (usable as copy inspiration):

- “Networks are artifacts, not code.”
- “Training is amortised — once per model, not once per dataset.”
- “Most users never leave HSSM: install, fit, publish.”
- “The boundary is a contract, not a convention.” (ONNX likelihood contract — for deeper docs, not hero)

### Secondary story: the liberation promise

Many theoretically meaningful models lack closed-form likelihoods. Researchers have historically been limited to a narrow set of tractable canonical models (HDDM: 1000+ citations, largely one model family). HSSM unlocks the broader model space via simulation-based inference.

**Suggested placement:** capabilities section or newcomer section, not the hero.

- Headline candidate: **“If you can simulate it, you can fit it.”**
- Supporting idea: forward simulation is easy; inverse inference is hard — HSSM closes that gap.

### Tertiary story: HDDM lineage (quiet)

HSSM is the **modern successor** to HDDM, from the same lab, built on PyMC/Bambi/ArviZ instead of deprecated PyMC2.

**Owner constraint:** Draw on the lineage story, but keep it **subtle** — not flushed out, not flashy. No “successor” banner, no large comparison block, no HDDM-centric hero.

**Placement:** credibility strip only — one sentence, not a hero angle.

- Draft: “From the lab behind HDDM — used in 1000+ published studies.”

---

## 4. Tagline

### Requirement

The ecosystem needs a **very strong, key one-line tagline** — memorable, distinctive, and accurate. This is a first-class deliverable, not an afterthought.

### Status: TBD (stub: `[TAGLINE]`)

A dedicated wordsmithing round is still needed. The hero should ship with a placeholder until a final tagline is chosen. **Do not block other work on tagline finalization**, but do not ship without eventually resolving it.

### Shortlist (candidates to refine)

| Candidate | Notes |
|---|---|
| **“Bring a model, gain adoption. Bring data, gain insight.”** | Owner shortlisted. Captures bidirectional flywheel; may work as tagline *or* hero subline / visual captions (two parallel phrases, not strictly one line — may need tightening) |
| “Where models meet data.” | Short, symmetric with two doors; less distinctive |
| “If you can simulate it, you can fit it.” | Liberation story; better as capabilities headline than main tagline |
| “From theory to data and back — faster.” | Names the loop; close to paper language |

### Rejected in initial brainstorm (owner did not like these as taglines)

Do not reuse without substantial revision:

- “Build a model once. Test it against any dataset.” / “Contribute once. Fit everywhere.”
- “Any model. Any dataset. One ecosystem.”
- “A modern open-source Python toolbox for hierarchical Bayesian neurocognitive modeling.” (accurate but doc-like, not a tagline)
- Generic capability-first lines without the theory–experiment dialogue

### Subline (draft direction)

Carries specifics the tagline omits:

> An open Python ecosystem for hierarchical Bayesian modeling of behavior and brain.

(Exact wording TBD alongside final tagline.)

---

## 5. Page structure

Top-to-bottom section order:

```
1. Hero
2. Two doors (persona router)
3. Capabilities showcase (3 vignettes + grid)
4. Model gallery strip
5. Ecosystem map (hub-and-spoke + workflow ring)
6. Newcomer section
7. Credibility strip
8. Community close
```

---

## 6. Section specifications

### 6.1 Hero

**Goal:** Immediately convey the ecosystem’s **dual core use case** via a distinctive, simple, memorable visual:

1. **Empirical analysis** — fitting computational models to data using state-of-the-art hierarchical Bayesian inference.
2. **Contribution** — bringing your own models into the ecosystem for broader community adoption.

Both directions must receive **equal visual and narrative weight**. The hero is **not** behavior-only; it must signal that neural covariates, eye tracking, and related data streams are part of the pitch (see analyst flow below).

#### Copy

| Element | Content |
|---|---|
| Tagline | `[TAGLINE]` — see §4 |
| Subline | Open Python ecosystem; hierarchical Bayesian modeling of behavior and brain (draft) |
| Primary CTA | **Get started** → HSSM quickstart / installation |
| Secondary CTA | **Explore the ecosystem** → smooth-scroll to §6.5 ecosystem map |

#### Visual: “The model commons” (selected concept)

**Origin:** Started as “periodic table of models” (concept 6 in brainstorm). Owner asked to **expand** it to: (a) incorporate **covariates** (neural, eye tracking) for a broader pitch, and (b) emphasize the **contribution direction** equally with the fitting direction.

**Composition:** Symmetric hub (Concept B — **approved** over triptych A).

**Why symmetric hub over triptych:** Triptych (left: contribute → center: wall → right: fit) reads as a linear pipeline and subtly implies contribution comes “before” analysis. Symmetric hub shows **bidirectional dialogue** — both personas feed the commons and receive payoffs back.

**Central element:** A wall of model tiles arranged like a periodic table. Each tile is a miniature model cartoon (boundaries + stochastic trajectory). Include:

- ~20 tiles showing model variety (DDM, angle, Lévy, LBA, race, LCA, etc.)
- One **empty dashed tile with “+”** — invitation to contribute
- One **glowing/highlighted tile** — the model currently in use

**Left flow — theorist (“bring a model, gain adoption”):**

1. A new model tile travels **into** the wall and docks at the “+” slot.
2. A return path shows **adoption**: connection lines spark from the new tile to other points; small user/community indicators suggest reach.

**Right flow — analyst (“bring data, gain insight”):**

1. Three parallel data streams flow **into** the highlighted tile:
   - Behavioral: choice/RT histogram
   - Neural: EEG-like waveform (trial-wise covariate)
   - Eye-tracking: gaze scanpath
2. A return path shows **insight**: posterior distributions emerge (labeled parameter curves).

**Implied message (state-of-the-art without jargon):** The wall = shared model infrastructure; data streams = rich empirical inputs; posteriors = rigorous inference output; docking a new tile = extensible platform; adoption sparks = community amortization. Together: modern computational modeling enterprise, not a single-purpose fitting tool.

**Design notes for production:**

- Remove or replace “THEORIST” / “ANALYST” role labels from mockups — use captions only (“bring a model, gain adoption” / “bring data, gain insight”).
- Optional formula chip (`v ~ theta + (1|participant_id)`) is **too detailed for hero** — reserve for vignette 2.
- Keep thin line-art aesthetic; muted palette (indigo/teal) with one warm accent (orange) for the active tile.
- Design static first; optional future animation: tiles glow as data pulses; new tile slides in periodically.
- Hero visual must work **without** animation.

**Rejected alternatives (for reference):**

| Concept | Why rejected |
|---|---|
| Triptych left-to-right | Reads as pipeline; underweights bidirectionality |
| Two-way bridge (model ⇄ data) | Strong on fit; weaker on contribution/adoption |
| Prism (data → mechanisms) | Fitting-only |
| Self-assembling model cartoon | Fitting-only; busy for hero |
| Relay loop (card → network → posterior) | Flywheel without covariate breadth |
| Periodic table **without** covariate streams | Too narrow per owner feedback |
| Typography-only + ambient trajectories | Depends on tagline; less distinctive use-case visual |
| Struck-through integral (“no likelihood?”) | Inside joke; liberation not dialogue story |
| Tabbed/carousel capabilities | Hidden content risk; rejected for capabilities section |

#### Mockups

Rough concept mockups were generated during brainstorming:

- Triptych (rejected): `assets/hero_concept_A_triptych.png` (if added to repo)
- Symmetric hub (selected): `assets/hero_concept_B_symmetric_hub.png` (if added to repo)

---

### 6.2 Two doors (persona router)

**Goal:** Let visitors self-select immediately after the hero.

Two cards, side by side:

| Door | Headline (draft) | Body (draft) | Links |
|---|---|---|---|
| **I have data** | Fit computational models to your experiments | Test theoretically interesting process models on choice and response-time data — with neural, physiological, and trial-wise covariates built in. | HSSM quickstart, relevant vignettes, tutorials |
| **I have a model** | Share your model with the community | Simulate, train a likelihood network, publish to the shared model hub — and let researchers fit your model to their data without retraining. | ssm-simulators contributing guide, LANfactory docs, ecosystem map |

**Code snippet placement:** One minimal 3-line example lives here (experimentalist door) or in the newcomer section:

```python
import hssm
model = hssm.HSSM(data=my_data, model="ddm")
model.sample()
```

Keep code minimal on the page — all detailed examples live in docs.

---

### 6.3 Capabilities showcase

**Goal:** The **heart of the page** — and the primary answer to the owner’s core question: *what applications and possibilities does HSSM unlock for a computational modeler?* Convey this without package-level technical detail.

**Format:** Hybrid — **3 deep vignettes** followed by a **compact capability grid**. (Owner preferred hybrid over vignette-only or grid-only; rejected tabbed/carousel for this section due to hidden-content risk.)

#### Organizing principle (owner specification)

Vignettes are grouped by **very broad topics that appeal to a wide variety of audiences** — specifically, by **what the researcher brings** (data type, measurements, or a model). Each vignette nests **specific example questions** inside the broad topic. Do not structure vignettes as package features or model-family lists.

#### Vignette structure

Each vignette:

- Broad topic headline (what the researcher *brings*)
- 2–3 sentences of “what this makes possible”
- Cluster of **recognizable research questions** (not feature bullets) — phrased as scientists would ask them
- One strong visual
- Link to relevant tutorial(s) / docs (redirect, not inline tutorial)

---

#### Vignette 1: “You have behavioral data”

**Owner framing:** Focus on how we can **test theoretically interesting computational models that describe the behavioral data at hand** — choice, response times, learning dynamics, etc.

**Headline (draft):** Test theoretically interesting models against the behavior you measured.

**Pitch:** Move beyond summary statistics. Sequential sampling and related process models decompose choices and response times into interpretable mechanisms — evidence accumulation, caution, bias, non-decision time, learning dynamics.

**Example research questions (owner examples + extensions — refine in copy pass):**

- How do people make decisions under conditions that favor speed?
- How do people learn while deciding?
- Do decision strategies change when the number of options increases?
- Do collapsing boundaries better explain your RT distributions than fixed boundaries?
- How do choice and RT jointly constrain theories of reinforcement learning?

**Visual ideas:** Model cartoon plot; quantile-probability plot; RLSSM posterior predictive (from paper figures).

**Models implied (don’t list exhaustively):** DDM variants, angle/Weibull/Lévy, race/LBA/LCA, RLSSM, choice-only models.

---

#### Vignette 2: “You have more than behavior” — covariates, neural data, eye tracking

**Owner framing:** Focus on **modeling with covariates** — neural covariates, eye tracking, and related trial-wise measurements.

**Headline (draft):** Bring neural and physiological measurements into the model itself.

**Pitch:** Trial-wise covariates — EEG, fMRI, pupil, skin conductance, eye fixations — can enter **any model parameter** through hierarchical mixed-effects formulas. This is not post-hoc correlation; it is part of the generative model.

**Example research questions (owner examples + extensions — refine in copy pass):**

- How does brain activity modulate caution? *(owner example)*
- How do you model preference-based decision making leveraging an eye-tracking experiment? *(owner example)*
- Does frontal theta modulate decision caution? (canonical `cavanagh_theta` story)
- Do clinical symptoms or interventions track specific computational parameters?
- How does attention (fixation patterns) modulate evidence accumulation? (aDDM)

**Visual ideas:** cavanagh_theta dataset schematic; formula chip `v ~ theta + (1|participant_id)`; EEG trace + posterior on `a` or `v`.

**Canonical example:** Cavanagh & Frank (2014) frontal theta dataset (shipped with HSSM as `cavanagh_theta`).

---

#### Vignette 3: “You have a model”

**Owner decision:** Selected over alternative vignette topics considered in brainstorm: “you have populations” (clinical/individual differences), “you have a real task” (messy designs), “you have candidate models” (model comparison). Owner chose the **theorist contribution** angle to balance vignettes 1–2 (analyst-focused) and to align with the flywheel / two-door story.

**Headline (draft):** Contribute once. Let the community fit it everywhere.

**Pitch:** If you can simulate from a model, the ecosystem provides a streamlined path to make it estimable: generate training data, train a likelihood approximation network, publish to the shared HuggingFace hub. Every researcher can then fit your model hierarchically to their own data — without costly per-study retraining.

**Example research questions / value props (draft):**

- You built a new accumulator model — how do you get it into the hands of experimentalists?
- Your model has no closed-form likelihood — can it still be fit hierarchically with neural covariates?
- Can networks trained in sbi or BayesFlow be shared through the same pipeline?

**Visual ideas:** simulate → train → share → infer pipeline; HuggingFace model card; empty “+” tile from hero visual.

**Key copy lines:**

- “Train once per model, not once per dataset.”
- “Networks are artifacts, not code.”

---

#### Capability grid (below vignettes)

Scannable grid: icon + short phrase + one line. Sweeps up ecosystem capabilities **derived from** the three vignettes — things a modeler gets from the toolchain as a whole.

**Owner-specified grid items (must include):**

| Capability | One-line description (draft) |
|---|---|
| **Hierarchical Bayesian inference** | Pool information across participants; estimate individual and group parameters with uncertainty |
| **Simulation-based inference** | Work with models that do not have analytical likelihoods — via trained likelihood surrogates (LANs) and related methods |
| **Full mixed-effects models** | `lmer`-style formulas on any model parameter — conditions, covariates, random intercepts and slopes |
| **Complete inference workflow** | Support for a full Bayesian inference workflow — plotting, validation, and analysis (PPC, model comparison, QP plots, model cartoons) |
| **Ease of contribution & knowledge sharing** | Streamlined path from simulator to shared artifact; community model hub; contributions benefit everyone |

**Recommended additions (brainstorm — not yet owner-confirmed):**

| Capability | One-line description (draft) |
|---|---|
| **Learning + deciding jointly** | RLSSM: combine reinforcement learning with sequential sampling decision processes |
| **Scalability** | GPU-accelerated, gradient-based samplers |
| **Openness & interoperability** | Built on PyMC/Bambi/ArviZ; import from sbi/BayesFlow; ONNX as exchange format |

Grid items not given their own vignette should still feel covered by the three vignettes above.

---

### 6.4 Model gallery strip

**Goal:** Make the “100+ models” claim tangible. Visual rhyme with the hero’s model wall.

**Format:** Horizontally scrollable (carousel) strip of model tiles. Each tile:

- Miniature model cartoon
- Model name (e.g., `ddm`, `angle`, `lba3`, `race_no_bias_angle_4`)
- Optional: one-line descriptor
- Link to model docs / tutorial

**Content source:** ssm-simulators model registry; HSSM `supported_models`.

**Interaction:** Browsing collection — not core messaging. Can be static scroll on mobile.

**Relationship to hero:** Hero = conceptual commons; gallery = expanded, linkable index.

---

### 6.5 Ecosystem map

**Goal:** Answer two questions in one visual (owner requested **both** hub-and-spoke and workflow-first approaches combined):

1. **What is this?** — the packages and how they relate (hub-and-spoke)
2. **How do I interact with the ecosystem?** — especially when starting with a new model: simulate → train → share → infer (workflow ring)

**Owner note:** Visitors should understand they can engage at different entry points — most analysts only need HSSM; contributors follow the full loop. Packages can also be used independently (ssm-simulators alone for simulation; LANfactory optional for custom networks).

**Format:** Static **hub-and-spoke with numbered journey ring** (animation-ready for later). Persona-lens toggle was considered but not selected.

#### Hub (center)

**HSSM** — “Most users only ever touch this.”

#### Spokes (4 nodes)

| Node | Role |
|---|---|
| **ssm-simulators** | Fast forward simulation; training data generation; model registry |
| **LANfactory** | Train LAN/CPN/OPN networks; export to ONNX |
| **HuggingFace hub** (`franklab/HSSM`) | Shared repository of trained likelihood networks |
| *(HSSM at center consumes networks at runtime)* | |

#### Numbered journey ring (contribution path)

```
① Simulate & define model     →  ssm-simulators
② Train likelihood network    →  LANfactory
③ Share artifact              →  HuggingFace
④ Community infers            →  HSSM
```

**Caption (draft):** “Fitting models to your data? HSSM is all you need. Contributing a new model? Follow the loop.”

#### Below the diagram

Package cards with:

- One-sentence pitch
- “Start here if you want to…” (from existing ecosystem docs)
- Link to package docs and GitHub

#### Footnote line (auxiliary repos — not on main diagram)

- `LAN_pipeline_minimal` — cluster orchestration
- `hddm-wfpt` — analytical DDM likelihood (ships with HSSM)
- Future: HSSMCortex, HSSMeister, HSSMSpine (coordination)

**Reference:** Existing ecosystem map content in HSSM docs (`docs/ecosystem/index.md`) and https://lnccbrown.github.io/HSSM/ecosystem/

---

### 6.6 Newcomer section

**Goal:** On-ramp for visitors who don’t yet do computational modeling. Not a third door — a section lower on the page.

**Headline (draft):** New to computational modeling?

#### Content blocks

1. **Why model?** (static visual)
   - Two groups with identical mean RTs but different underlying parameters.
   - Message: summary statistics hide mechanism; process models decompose behavior.

2. **Feel it in your hands** (interactive)
   - **Custom in-page slider widget** (selected — not iframe embed).
   - Pre-computed simulations; user adjusts drift, boundary, bias (and optionally collapse angle).
   - RT distribution updates in real time.
   - Styled to match site; no install required.
   - Alternative considered: embed `ssms_gui` HuggingFace Space — rejected in favor of lightweight custom widget.

3. **Low barrier proof**
   - `pip install hssm` + 3-line quickstart (if not already shown in doors).
   - “Runs in Colab” / workshop mention.

4. **Routing**
   - HSSM tutorials, quickstart, workshop archive, paper.

---

### 6.7 Credibility strip

**Goal:** Trust signals without dominating the page.

**Content (draft):**

| Element | Treatment |
|---|---|
| HDDM lineage | One quiet line: “From the lab behind HDDM — used in 1000+ published studies.” |
| Institution | Brown University; Carney Institute; Center for Computation and Visualization; BRAINSTORM |
| Funding | NIMH, ONR (as in paper acknowledgments) |
| Paper | Link to preprint: Fengler et al. 2026, bioRxiv — “HSSM: A Widely Applicable Toolbox for Hierarchical Bayesian Neurocognitive Modeling” |
| Built on | Logo strip: PyMC, Bambi, ArviZ, JAX, ONNX, HuggingFace |

Keep HDDM mention **subtle** — no large “successor” banner, no extended HDDM comparison, no flashy “we’re the new HDDM” creative. One line + move on.

**Preprint:** Link prominently in credibility strip — paper is under review and will be published soon; landing page can serve as entry point while preprint is the canonical scientific reference.

---

### 6.8 Community close

**Goal:** Invite participation and provide practical next steps.

**Content (draft):**

- Contribution invitation (theorists: add a model; analysts: open an issue, share results)
- GitHub Discussions link (HSSM repo)
- Workshop / tutorial archive
- Citation block (paper + Zenodo software archives per package)
- Optional: link to `ssms_gui` for extended exploration

---

## 7. Visual & design direction

### Aesthetic (from hero mockups)

- Clean, modern, flat-vector scientific illustration
- Light background (off-white)
- Muted indigo/teal palette; one warm accent (orange) for active/selected elements
- Thin line-art model cartoons as the signature visual language
- Generous whitespace; minimal label text on diagrams

### Signature visual elements

| Element | Where used |
|---|---|
| Model tile / model cartoon | Hero, gallery, vignettes |
| Data streams (RT histogram, EEG, gaze) | Hero, vignette 2 |
| Posterior curves | Hero, vignette outputs |
| Empty “+” tile | Hero, vignette 3, contribution CTAs |

### Animation policy

- **Ship static first** for hero and ecosystem map.
- Optional later: hero pulse animation, journey ring highlight on scroll.
- Newcomer widget: interactive by default (sliders), not ambient animation.

---

## 8. Content principles

### Emphasize

- Scientific possibilities and recognizable research questions
- Bidirectional theory ↔ experiment flywheel
- Breadth of models (without listing every model in prose)
- Neural/physiological covariates as first-class
- Community contribution and amortized training
- Validation culture (PPC, QP plots, model cartoons)
- Open ecosystem (PyMC stack, ONNX, HuggingFace, sbi/BayesFlow)

### De-emphasize

- Package internals, version matrices, API details
- Sampler/backend enumeration (mention GPU once in grid)
- HDDM comparison table (lives in paper)
- Deep LAN/ONNX contract (link to docs)

### Tone

- Precise, confident, accessible to computational scientists and related researchers (cognitive neuroscience, computational psychiatry, decision science)
- Not marketing-hype; not jargon-heavy
- Speak to *problems researchers recognize*, not feature checklists
- Pitch **transformation of modeling practice** — broader model choice, richer data integration, rigorous validation, community-shared infrastructure — not “install our package”

### Messaging themes from the preprint (usable on page, non-technical)

These themes from `HSSM_Ecosystem_paper.pdf` support the owner’s aims; use as copy inspiration, not verbatim blocks:

- **Democratizing** access to a broad array of neurocognitive process models
- **Forward/inverse asymmetry:** easy to simulate, hard to infer — ecosystem closes the gap
- **Virtuous cycle:** theoreticians gain audience for models; experimentalists gain model choice; community shares amortized artifacts
- **Clinical and basic science:** computational phenotyping, brain–behavior linkage, disorders of decision-making
- **Design principles** (if a “why trust this” micro-section is needed): flexibility (high ceiling, low floor), extensibility (community contribution), innovation inheritance (PyMC/JAX/ArviZ ecosystem)

---

## 9. Key links & references

### Package docs

| Package | Docs | GitHub | Install |
|---|---|---|---|
| HSSM | https://lnccbrown.github.io/HSSM/ | https://github.com/lnccbrown/HSSM | `pip install hssm` |
| ssm-simulators | https://lnccbrown.github.io/ssm-simulators/ | https://github.com/lnccbrown/ssm-simulators | `pip install ssm-simulators` |
| LANfactory | https://lnccbrown.github.io/LANfactory/ | https://github.com/lnccbrown/LANfactory | `pip install lanfactory` |

### Ecosystem artifacts

- HuggingFace models: https://huggingface.co/franklab/HSSM
- Interactive simulator GUI: https://huggingface.co/spaces/franklab/ssms_gui
- Ecosystem map (existing): https://lnccbrown.github.io/HSSM/ecosystem/
- ONNX likelihood contract: https://lnccbrown.github.io/HSSM/how_to/custom_onnx_likelihoods/

### Paper

- **Title:** HSSM: A Widely Applicable Toolbox for Hierarchical Bayesian Neurocognitive Modeling
- **Authors:** Fengler, Xu, Bera, Paniagua, Omar, Frank (Brown University)
- **Preprint:** https://doi.org/10.64898/2026.06.05.730398
- **Local copy:** `HSSM-preprint/HSSM_Ecosystem_paper.pdf` (gitignored)

### Institutional

- BRAINSTORM: https://ccbs.carney.brown.edu/brainstorm

---

## 10. Ecosystem context (for copywriters)

Brief reference — not to be reproduced verbatim on the landing page.

### Three core packages

```
ssm-simulators ──training data──> LANfactory ──ONNX──> HuggingFace
                                                          │
                                                          ▼
                                                        HSSM
```

| Package | One-line role |
|---|---|
| **ssm-simulators** | Fast C/Cython simulators; 100+ SSM configs; RLSSM presets; training data generators |
| **LANfactory** | Train LAN/CPN/OPN networks (PyTorch/JAX); export ONNX; upload to HuggingFace |
| **HSSM** | User-facing hierarchical Bayesian inference; PyMC/Bambi/ArviZ; model validation plots |

### What HSSM enables (application-level, from paper + docs)

- Hierarchical mixed-effects on any model parameter
- Trial-wise neural/physiological covariates (EEG, fMRI, pupil, SCR, fixations)
- RLSSM: learning + deciding jointly
- Models without analytical likelihoods (via LANs)
- Clinical / computational psychiatry phenotyping
- Model comparison, PPC, QP plots, model cartoons
- GPU-accelerated inference
- Custom likelihoods (ONNX, JAX, blackbox; sbi/BayesFlow import)

### HDDM context (for credibility strip only)

- Predecessor toolbox; 1000+ citations; limited model scope
- HSSM migrates to PyMC3+, adds full mixed-effects, broader model bank, modern SBI

---

## 11. Open items

| Item | Owner | Notes |
|---|---|---|
| Capability grid extras | Owner | Confirm RLSSM, scalability, openness items before build |
| Tagline | Copy | `[TAGLINE]` stub; owner rejected initial batch; one candidate shortlisted |
| Vignette research questions | Copy | Refine 3–4 sharpest questions per vignette |
| Hero production artwork | Design | Clean up mockup B per §6.1 notes |
| Newcomer slider widget | Design + eng | Spec pre-computed parameter grids |
| Model gallery curation | Content | Which models to feature vs. full index |
| Community close copy | Copy | Citation formatting, workshop links |
| URL / hosting | Infra | Domain, deployment target TBD |
| Relationship to existing ecosystem page | IA | This landing page vs. `lnccbrown.github.io/HSSM/ecosystem/` — redirect, replace, or coexist? |

---

## 12. Out of scope (this spec)

- Technology stack (React, Astro, static site generator, etc.)
- Responsive breakpoints and component library
- SEO, analytics, accessibility audit
- Implementation plan and task breakdown
- Copy finalization and legal review

**Next step when ready:** implementation planning (separate document) after tagline and copy pass.

---

## Appendix A: Section wireframe (ASCII)

```
┌─────────────────────────────────────────────────────────────┐
│  [TAGLINE]                                                  │
│  Subline: open Python ecosystem for behavior + brain      │
│                                                             │
│     ┌── theorist flow ──┐                                   │
│  adoption ← [ MODEL WALL ] → insight                        │
│     └── analyst flow ───┘   (behavior + EEG + gaze)         │
│                                                             │
│  [ Get started ]    [ Explore the ecosystem ↓ ]             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌─────────────────┐               │
│  │  I have data    │    │  I have a model │               │
│  └─────────────────┘    └─────────────────┘               │
├─────────────────────────────────────────────────────────────┤
│  VIGNETTE 1: behavioral data                                │
│  VIGNETTE 2: behavior + brain/physiology                    │
│  VIGNETTE 3: contribute your model                          │
│  ┌────┬────┬────┬────┬────┬────┬────┬────┐                  │
│  │ grid of capabilities                  │                  │
│  └────┴────┴────┴────┴────┴────┴────┴────┘                  │
├─────────────────────────────────────────────────────────────┤
│  ◀ [ model ] [ model ] [ model ] ... [ model ] ▶  gallery   │
├─────────────────────────────────────────────────────────────┤
│           ┌─────────┐                                       │
│     ssms ─┤         ├─ HF                                  │
│  LANfactory─┤ HSSM  │                                     │
│           └─────────┘                                       │
│     ① simulate → ② train → ③ share → ④ infer                │
├─────────────────────────────────────────────────────────────┤
│  New to computational modeling?                             │
│  [ why model visual ]  [ interactive slider widget ]        │
├─────────────────────────────────────────────────────────────┤
│  HDDM lineage · Brown · paper · PyMC/ArviZ logos            │
├─────────────────────────────────────────────────────────────┤
│  Contribute · Discussions · Cite                            │
└─────────────────────────────────────────────────────────────┘
```

---

## Appendix B: Brainstorm decisions log

| Decision | Choice | Rationale / owner input |
|---|---|---|
| Page type | Ecosystem homepage / landing page | Owner: overview + pitch, not implementation |
| Primary audience | Mixed equal | Owner rejected single-audience hero optimization |
| Persona structure | Two doors + newcomer section | Third door rejected; newcomer overlaps experimentalist |
| Hero story angle | Flywheel / connective tissue | Owner rejected liberation-first, capability-first, HDDM-first |
| Hero visual | Model commons — symmetric hub (B) | Owner expanded periodic-table idea with covariates + contribution |
| Hero visual rejected | Triptych (A) | Reads as pipeline; underweights bidirectionality |
| Hero CTAs | Get started + Explore the ecosystem | Owner selected over pip-box or door-only CTAs |
| Capabilities format | Hybrid: 3 broad vignettes + grid | Owner; rejected tabbed/carousel for core capabilities |
| Vignette organizing principle | By what researcher brings | Owner specification |
| Vignette 1 | Behavioral data + nested examples | Owner examples: speed pressure, learn while deciding |
| Vignette 2 | Covariates / neural / eye tracking | Owner examples: theta→caution, eye tracking→preference |
| Vignette 3 | You have a model (contribution) | Owner chose over populations / real-task / model-comparison options |
| Capability grid | Owner list + recommended extras | See §6.3; confirm extras before build |
| Ecosystem map | Hub-and-spoke + workflow ring; static | Owner wanted both map and journey; animation later |
| Model gallery | Keep | Owner; rhymes with hero wall |
| Newcomer interactivity | Custom in-page slider | Owner rejected iframe embed |
| Code on page | One 3-line snippet only | Owner |
| HDDM mention | Quiet credibility strip only | Owner: successor yes, not flashy |
| Tagline | TBD — key deliverable | Owner rejected initial batch; one candidate shortlisted |
| Package detail level | High-level on page; redirect to docs | Owner core preference |
| Paper | Preprint as reference | Under review; local copy in `HSSM-preprint/` (gitignored) |

---

## Appendix C: Rejected approaches (full log)

For future reference — do not re-propose without new rationale.

### Hero story angles considered

| Angle | Verdict |
|---|---|
| Liberation (“if you can simulate it, you can fit it”) | Secondary — capabilities section, not hero |
| HDDM successor / lineage | Tertiary — credibility strip only |
| Generic capability (“hierarchical Bayes for behavior + brain”) | Too flat for hero |
| Flywheel / connective tissue | **Selected** |

### Hero visual concepts considered

See §6.1 rejected table. Additional: owner asked to keep iterating after first batch; concept 6 (periodic table) selected and expanded.

### Capabilities presentation considered

| Format | Verdict |
|---|---|
| Vignette-only (4–6 stories) | Too long |
| Grid-only | Too generic |
| Tabbed/carousel showcase | Hidden content risk — rejected |
| Hybrid vignettes + grid | **Selected** |
| Hybrid + separate model-gallery carousel | **Selected** |

### Tagline candidates considered

See §4 rejected list. Owner: none of first batch acceptable; dedicated session needed.

### Ecosystem map treatments considered

| Format | Verdict |
|---|---|
| Workflow-first only | Missing package identity |
| Package-first three cards | Missing journey |
| Hub-and-spoke only | Missing contribution path |
| Layered stack | Less dialogue, more hierarchy |
| Hub-and-spoke + journey ring | **Selected** |
| Persona-lens toggle on map | Not selected |
| Animated journey | Deferred — static first |

### Newcomer interactivity considered

| Option | Verdict |
|---|---|
| Custom in-page slider widget | **Selected** |
| iframe `ssms_gui` | Rejected — too heavy |
| Link out only | Too weak for “feel it” goal |
| No interactivity | Rejected |
