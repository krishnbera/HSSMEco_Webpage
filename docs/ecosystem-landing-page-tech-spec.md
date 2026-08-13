# HSSM Ecosystem Landing Page — Technical Specification

**Status:** Scaffold. **All technology decisions are OPEN**, pending a separate technology evaluation the owner will run.
**Last updated:** 2026-08-13
**Companion to:** [`ecosystem-landing-page-spec.md`](ecosystem-landing-page-spec.md) (v2 — content and design) · [`ecosystem-landing-page-future-features.md`](ecosystem-landing-page-future-features.md) (backlog)

---

## Purpose

The v2 content spec explicitly places technology stack out of scope. This document is where those decisions land once made.

It is deliberately **not** a recommendation. It records:

1. **Requirements** any candidate stack must satisfy, derived from the approved design
2. **A decision register** of what is still open, with candidates listed neutrally
3. **A research brief** — the questions an evaluation needs to answer

Fill the register as decisions are made. Record the reasoning, not just the outcome.

---

## 1. Requirements derived from the approved design

These are constraints, not preferences. A stack that cannot meet them is disqualified regardless of other merits. Each traces to a section of the v2 spec.

### 1.1 Output and hosting

| # | Requirement | Source |
|---|---|---|
| R1 | **Static output.** No server-side runtime required to serve the page. | Implied by hosting candidates and by a page with no dynamic data |
| R2 | Must serve **two pages**: the landing page and the Ecosystem reference sub-page. | v2 §1, §13 |
| R3 | The reference sub-page needs conventional documentation affordances — dense tables, deep headings, stable anchors, code blocks. | v2 §13 |
| R4 | Must be able to **own a redirect** from `lnccbrown.github.io/HSSM/ecosystem/`. | v2 §1 |
| R5 | URLs must be stable and citable. This page becomes the canonical ecosystem reference and will be linked from papers and talks. | v2 §1 |

### 1.2 Visual assets

| # | Requirement | Source |
|---|---|---|
| R6 | **Four substantial bespoke visuals**, most naturally inline SVG: hero commons, four-panel worked example, four-step chain, capability iconography. | v2 §8 |
| R7 | **Artwork must stay editable in source.** Hero content changes as the ecosystem grows — model tiles, module labels, modalities, captions. Any pipeline that converts artwork to an opaque binary is disqualified. | v2 §6.1; future-features §1.2 |
| R8 | Hero model tiles must be **clickable links** into the model index. | v2 §6.1 |
| R9 | The hero needs a **defined mobile composition** — flanks stack beneath the core or degrade to captions. Not a post-hoc responsive fix. | v2 §6.1 |
| R10 | **Animation-ready but static-first.** Every visual must communicate fully in a screenshot; animation is enhancement only, and `prefers-reduced-motion` must fall back to static. | v2 §8; future-features §1.2 |

### 1.3 Content and correctness

| # | Requirement | Source |
|---|---|---|
| R11 | One **syntax-highlighted Python code block**, three lines. | v2 §6.3 |
| R12 | The **model index should be generated from the `ssm-simulators` registry**, not hand-maintained. This implies either a Python step in CI or a committed generated artifact refreshed by a scheduled job — a real constraint on the toolchain. | v2 §13 |
| R13 | No **model counts** anywhere in the build output. If counts are ever reintroduced they must be generated at build time, never hand-written. | v2 §10 |

### 1.4 Quality bars

| # | Requirement |
|---|---|
| R14 | Accessible: semantic landmarks, keyboard-navigable, sufficient contrast, SVG visuals given text alternatives, `prefers-reduced-motion` honoured. |
| R15 | Light and dark treatment decided **before** the four SVGs are authored — retrofitting theme awareness across bespoke artwork is expensive. |
| R16 | **Low maintenance burden for a Python-centric team.** Whoever inherits this predominantly works in Python; a stack requiring constant JavaScript ecosystem upkeep is a long-term liability. |
| R17 | Fast on a poor connection. This is a pitch page — a slow first paint defeats its purpose. |

---

## 2. Decision register

Every row is **OPEN**. Candidates are listed without endorsement.

### D1 — Build stack · OPEN

Candidates raised so far: **Astro** · **plain HTML/CSS/vanilla JS** · **MkDocs Material** · **React/Next.js**.

Notes for the evaluation, not conclusions:

- MkDocs Material is what all three package doc sites use, so it wins on team familiarity, brand consistency, and R3. The open question is whether a bespoke hero and a four-panel worked example can be built in it without fighting the theme.
- Plain HTML has no dependency surface and scores well on R16, at the cost of no componentization.
- Astro and Next.js buy a component model and future interactivity headroom, at the cost of a Node toolchain (R16).
- R12 interacts with all of them: whichever is chosen must accommodate a Python step producing the model index, or a committed artifact.

**Decision:** _pending_
**Rationale:** _pending_

### D2 — Hosting and URL · OPEN

Candidates and trade-offs as discussed:

| Option | For | Against |
|---|---|---|
| GitHub Pages + custom domain | Best ecosystem identity; citable in talks and papers; independent of any one package's release cycle | Someone must buy and administer the domain |
| GitHub Pages, `lnccbrown.github.io` subpath | No purchase, no new administration, same org as the packages | Weaker identity; reads as a fourth package rather than the front door |
| Replace the HSSM docs site root | Inherits traffic immediately; trivial redirect | Couples the ecosystem front door to one package's release cycle — the entanglement v2 was written to avoid |

**Blocked on:** the HSSMSpine ownership conversation (v2 §1, §11). Deciding hosting before ownership risks committing to a URL the ecosystem does not control.

**Decision:** _pending_
**Rationale:** _pending_

### D3 — Animation technique · OPEN

Goals and hard constraints are specified in future-features §1.2. Technique deliberately deferred.

Candidates raised: **CSS + native SVG animation** · **lightweight JS motion library** · **Lottie / motion-tool exports**.

Note that R7 (artwork editable in source) constrains this choice significantly.

**Decision:** _pending_

### D4 — Model index generation · OPEN

Per R12, the index derives from the `ssm-simulators` registry. Sub-questions: generated at build time or committed and refreshed on a schedule? Which registry fields are surfaced? How is drift detected when `ssm-simulators` releases?

**Decision:** _pending_

### D5 — Theming (light/dark) · OPEN

Must be settled before SVG authoring begins (R15). Sub-question: follow system preference only, or offer an explicit toggle?

**Decision:** _pending_

### D6 — CI, deployment, and preview · OPEN

Build and deploy pipeline; whether pull requests get preview deployments; who holds deploy credentials.

**Decision:** _pending_

### D7 — Instrumentation · OPEN

v2 §11 flags that without analytics the success criteria are unmeasurable, and recommends minimal event tracking on the two CTAs. Not yet owner-confirmed. If adopted, privacy posture (self-hosted vs third-party, cookie banner implications) needs deciding — a consent banner on a pitch page is real friction.

**Decision:** _pending_

### D8 — Asset pipeline · OPEN

How SVGs are authored, optimized, and kept consistent; whether icon and model-cartoon glyphs become a shared symbol set.

**Decision:** _pending_

---

## 3. Research brief

Questions a technology evaluation should answer, roughly in order of how much they constrain everything else:

1. Can **MkDocs Material** carry a bespoke hero and a four-panel scroll narrative without fighting the theme? If yes, R3 and R16 make it very hard to beat. If no, that eliminates the option cleanly and the evaluation narrows fast.
2. What is the **realistic maintenance cost** of a Node-based stack for a team that otherwise ships Python? Include dependency updates, build breakage, and who is on the hook in two years.
3. How does each candidate handle **R12** — a Python-generated model index inside the build?
4. What does each candidate cost for **R9** (a genuinely different mobile hero composition, not a squeezed desktop one)?
5. Which candidates let the **four SVGs stay hand-editable** while supporting R10 and R15?
6. Is **one stack for both pages** right, or is a bespoke landing page plus a docs-framework reference page the better split? Two stacks means two build pipelines, but each does what it is good at.
7. What is the **migration path from HSSMSpine** for the reference content, and does the stack choice make that easier or harder?

---

## 4. Non-goals

- Server-side rendering, a backend, or a database
- User accounts or authentication
- A CMS — content lives in the repository as source
- Hosting model artifacts (HuggingFace is their home)
- Rebuilding any of the three package documentation sites

---

## 5. Open dependencies on other documents

| Dependency | Where it lives | Blocks |
|---|---|---|
| HSSMSpine content ownership handoff | v2 §1, §11 | D2 |
| Final tagline and subline | v2 §7, §11 | Nothing technical; blocks copy |
| Hero mobile composition | v2 §6.1, §11 | D1 (informs feasibility), R9 |
| Instrumentation go/no-go | v2 §11 | D7 |
