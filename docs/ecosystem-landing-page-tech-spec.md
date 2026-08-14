# HSSM Ecosystem Landing Page — Technical Specification

**Version:** 3 (supersedes v2 of 2026-08-13, commit `1880ba2`; the v1 scaffold is at `df45898`)
**Companion content spec:** v3 — this document's C11 and C12 are reflected there as §6.1a and §13.
**Companion design philosophy:** [`ecosystem-landing-page-design-philosophy.md`](ecosystem-landing-page-design-philosophy.md) v1 — revises **D10** (three font families; JetBrains Mono shared with matplotlib) and **D5/D8** (one generated-figure variant, not two).
**Status:** Stack and hosting decided. **D1, D2, D4, D5, D6, D9, D10, D11 are CLOSED. D3 (animation) and D7 (instrumentation) remain OPEN by decision. D8 (asset pipeline) is deferred to pass 2, except the hero's structure.**
**Last updated:** 2026-08-13
**Companion to:** [`ecosystem-landing-page-spec.md`](ecosystem-landing-page-spec.md) (v2 — content and design) · [`ecosystem-landing-page-future-features.md`](ecosystem-landing-page-future-features.md) (backlog)

**Source material:** technology evaluation session (2026-08-13); owner decisions (2026-08-13); web research into candidate stacks; inspection of the package CI conventions in `repos/` (local only).

---

## Purpose

The v2 content spec places technology stack out of scope. This document is where those decisions land. Every closed decision records **why**, and §5 records what was rejected so it is not re-proposed.

**What changed in v3.** The owner introduced a **two-pass delivery model** (§2), made the **hero interactive** (R22–R24), **dropped model index generation** in favour of a hand-curated demonstrative list (R12 void, D4 revised), closed **D2** on GitHub Pages with a custom domain, and deliberately **reopened D3** and held **D7** open. D8 is deferred to pass 2 except where the hero's interactivity makes structure load-bearing now.

**Carried from v2.** Two requirements were revised in v2 because the evaluation disproved the assumptions behind them (R3 and R7 — see §3.5). That analysis stands and is what eliminated MkDocs Material, the v1 scaffold's front-runner.

---

## 1. Constraints

Gathered during evaluation and from owner decisions. These drove the outcome more than the original requirement list did.

| # | Constraint | Consequence |
|---|---|---|
| C1 | **Content contributors** are rotating lab members: Python- and Markdown-literate, no Node experience | They must never install Node, run a build, or debug a dependency |
| C2 | Initial build is **AI-assisted**; build complexity ≠ maintenance complexity | The question is "who fixes CI when it breaks", not "who runs the build" |
| C3 | Schematic artwork is **Figma/Illustrator-authored**; data-bearing artwork is **Python-generated** | Splits R7 in two — see §3.5 |
| C4 | **One stack serves both pages** | Must handle a bespoke interactive hero *and* a reference page |
| C5 | The reference sub-page is a **curated map of links** into package documentation — **not** API docs or tutorials | Voids most of R3 — see §3.5 |
| C6 | Contributors must, unaided: **edit copy**, **add collection entries**, **deploy and verify**. Not: author reference prose, not edit artwork | Makes collections the dominant functional need |
| C7 | Three content structures are **collections**, not prose: model index, domain showcase, capability grid | The single most discriminating requirement between candidates |
| C8 | Hosting is a **standalone site**; replacing the HSSM docs root is off the table | Hosting is stack-neutral; MkDocs is not forced |
| C9 | The lab **already runs scheduled drift detection** with an automated healing queue (`drift.yml` in all three packages) | Materially de-risks a stack with a periodic upgrade cost — see D1 |
| C10 | **The owner maintains the CI and deploy pipeline**, but it must stay as general as possible | C1 governs *content contribution*; pipeline ownership is the owner's. "General" means no step that only one person can run |
| C11 | **The hero is interactive** — hover reveals detail, elements carry links | The hero is a structured, inlined composition, not a flat image. See R22–R24 |
| C12 | **The model index is hand-curated**, small and demonstrative | R12 is void. Removes the only Python step from the build — see D4 |

---

## 2. Delivery model — two passes

Recorded as a first-class constraint because several decisions are deliberately deferred to pass 2, and deferring the wrong ones is expensive.

| Pass | Scope |
|---|---|
| **Pass 1** | Static site. Full content, full interactivity that does not depend on motion (links, hover and focus states, theme toggle). Artwork hand-placed; no generation pipeline |
| **Pass 2** | Animation (D3), and the asset generation pipeline (D8) |

**What must not be deferred, despite the above.** Two things are cheap now and expensive as retrofits, so they are pass-1 obligations even though their payoff is in pass 2:

1. **Hero structure** (R24). Interactivity in pass 1 already requires individually addressable elements. Those same elements are the animation targets in pass 2. Build the structure once.
2. **Theming tokens** (D5, R15). Retrofitting theme awareness across finished artwork is the expensive path the original R15 was written to prevent.

---

## 3. Requirements

Constraints, not preferences. A stack that cannot meet them is disqualified regardless of other merits.

### 3.1 Output and hosting

| # | Requirement | Source |
|---|---|---|
| R1 | **Static output.** No server-side runtime required to serve the page. | Hosting candidates; no dynamic data |
| R2 | Must serve **two pages**: the landing page and the Ecosystem reference sub-page. | v2 §1, §13 |
| R3 | **REVISED — see §3.5.** The reference sub-page needs *link-map* affordances, not documentation affordances. | v2 §13; C5 |
| R4 | Must be able to **own a redirect** from `lnccbrown.github.io/HSSM/ecosystem/`. Implemented on the *HSSM docs* side (`mkdocs-redirects`), not here. | v2 §1 |
| R5 | URLs must be stable and citable. This page becomes the canonical ecosystem reference and will be linked from papers and talks. | v2 §1 |

### 3.2 Visual assets and hero interactivity

| # | Requirement | Source |
|---|---|---|
| R6 | **Four substantial bespoke visuals**, inlined as SVG or markup. Inlining is mandatory — an `<img>` is a sealed box that page CSS cannot theme and page JS cannot address. | v2 §8; D5; C11 |
| R7 | **REVISED — see §3.5.** Artwork must stay editable in source, where "source" differs by visual type. | v2 §6.1; future-features §1.2 |
| R8 | Hero model tiles must be **clickable links** into the model families section of the reference sub-page. Module tiles, the "+" tile, streams, and return paths carry their own hover payloads and, where listed, links — see v3 §6.1a for the full element table. | v3 §6.1, §6.1a |
| R9 | The hero needs a **defined mobile composition** — flanks stack beneath the core or degrade to captions. Not a post-hoc responsive fix. | v2 §6.1 |
| R10 | **Animation-ready but static-first.** Every visual must communicate fully in a screenshot; `prefers-reduced-motion` must fall back to static. | v2 §8; future-features §1.2 |
| R22 | **The hero reveals detail on interaction.** Hovering an element surfaces additional information about it. | C11 |
| R23 | **Hover-revealed content must have focus and touch parity.** Anything reachable by hover must also be reachable by keyboard focus and by tap. Non-negotiable: hover-only content is invisible to keyboard users and to every mobile visitor, and fails WCAG 2.1 SC 1.4.13 (Content on Hover or Focus). | C11; R14 |
| R24 | **Hero elements are individually addressable** — stable ids or data attributes on model tiles, module tiles, data streams, and return paths. Required by R8 and R22 in pass 1; reused as animation targets in pass 2. | C11; §2 |

**Consequence of R22–R24 for the asset pipeline.** The hero cannot be a flat exported SVG, even in pass 1. It is a composition of addressable parts — most naturally an Astro component that lays out slots, with authored SVG inside them. This is the one part of D8 that pass 1 cannot defer.

### 3.3 Content and correctness

| # | Requirement | Source |
|---|---|---|
| R11 | One **syntax-highlighted Python code block**, three lines. | v2 §6.3 |
| ~~R12~~ | ~~The model index is generated from the `ssm-simulators` registry.~~ **VOID — see §3.6.** | C12 |
| R13 | No **model counts** anywhere in the build output. If reintroduced they must be generated at build time, never hand-written. | v2 §10 |
| R25 | **Model families, not a model index.** The reference sub-page describes ~4 families with one line each and links out for the exhaustive lists. It must read as a selection, not a catalogue. | v3 §13; C12 |
| R26 | **The outbound link targets do not yet exist.** Neither HSSM nor `ssm-simulators` publishes a browsable model list (verified 2026-08-13). Link to the closest existing targets and state plainly what they are, until the upstream pages land. | v3 §13, §11 |

### 3.4 Quality bars

| # | Requirement |
|---|---|
| R14 | Accessible: semantic landmarks, keyboard-navigable, sufficient contrast, SVG visuals given text alternatives, `prefers-reduced-motion` honoured, **and R23 satisfied for all hover-revealed content**. Enforced as a **CI gate**, not a review item — see D6. |
| R15 | Light and dark treatment decided **before** the four SVGs are authored. |
| R16 | **Low maintenance burden for a Python-centric team.** Read precisely: *content contributors* must never install Node, run a build, or debug a dependency. Pipeline maintenance is the owner's (C10). |
| R17 | Fast on a poor connection. A slow first paint defeats a pitch page. |
| R18 | **Reproducible builds.** Committed lockfile, `npm ci`, pinned CI runtime. A contributor's copy-edit PR must never fail for reasons unrelated to their change. |
| R19 | **Link integrity is a CI gate.** Because the reference page is a map of links (C5), link rot is the primary way this site silently degrades. |
| R20 | **Instrumentable.** CTAs carry stable hooks so analytics is a one-line addition if D7 closes yes. A no-regret hedge that does not presuppose the outcome. |
| R21 | **No *personal* billing dependency may be required to keep the site reachable.** A lapsed personal card 404-ing a paper-cited URL is a likelier failure than any technical rot considered here. See D2 — the custom domain registration is the live instance of this. |

### 3.5 Requirement revisions (carried from v2)

Two requirements were written on assumptions the evaluation disproved. Both are recorded rather than silently edited, because both changed the outcome.

**R3 — downgraded.** The v1 scaffold specified "conventional documentation affordances," and its research brief stated that if MkDocs Material could carry the hero, "R3 and R16 make it very hard to beat."

The reference sub-page is a **curated map of links into the package documentation**. It hosts no API reference and no tutorials. MkDocs Material's decisive advantage — free TOC, anchors, and search over deep prose — therefore buys nothing that is needed, and the question the v1 brief expected to settle the evaluation no longer settles anything.

**R7 — split in two.** The original text — "any pipeline that converts artwork to an opaque binary is disqualified" — assumed a single authoring path. There are two:

| Visual | Source of truth | How R7 is met |
|---|---|---|
| Worked example panels 0, 2, 3 (RT distributions, posteriors, PPC) | **Python script in this repo** | Fully — the source is versioned code, not a design file |
| Hero model tiles (~6 cartoons) | **Python script**, via `hssm.plotting.plot_model_cartoon` | Fully — regenerates as models change |
| Hero composition (flanks, arrows, captions, slots) | **Astro component** wrapping authored SVG | Fully — required by R24 |
| Four-step chain | **Astro component**, HTML/CSS — likely no SVG at all | Fully |
| Capability iconography | **Figma → SVG**, inlined | Conditionally — requires the discipline in D8 |

HSSM already generates most of the data-bearing artwork: `repos/HSSM/src/hssm/plotting/` contains `plot_model_cartoon` ([`model_cartoon.py:488`](../repos/HSSM/src/hssm/plotting/model_cartoon.py)), plus `predictive.py` and `quantile_probability.py`. The v2 spec's "thin line-art model cartoon — boundaries plus stochastic trajectory" describes `plot_model_cartoon` output literally.

This also strengthens v2 §0's **"show, don't assert"** principle: the figures become genuine output of the toolchain being pitched, and cannot silently go stale.

### 3.6 R12 voided — model index is hand-curated

**Owner decision (C12).** The model index is a small demonstrative list, hand-written. There is no registry generation step.

**What this removes.** The only Python step in the build, and with it the whole build-time-vs-committed-artifact question the v1 scaffold flagged as "a real constraint on the toolchain." The Astro build is now unambiguously Node-only.

**What this introduces — R25.** The generated version was self-evidently complete. A hand-picked list is not, and can read as exhaustive when it is not. v2 §10 dropped model counts precisely because "a visitor who reads 100+ and then discovers that a given model has no trained network available loses trust at exactly the wrong moment." A curated index invites the same failure by implication rather than by number. It must therefore be labelled as a selection.

> **Conflicts with the content spec.** v2 §13 specifies "Full model index, generated from the registry rather than hand-curated, and the link target for the hero's clickable tiles." That sentence is now wrong. The content spec needs a matching revision; it is not this document's to make.

---

## 4. Decision register

### D1 — Build stack · **DECIDED: Astro**

**Decision.** Astro, plus the frontend and visualization dependencies the design genuinely needs — including for hero interactivity (R22–R24) and, in pass 2, animation. Content in Markdown; collections defined by schema (D4).

**Dependencies are permitted where they earn their place, not banned by policy.** The bar is that each one justifies its payload (R17) and its upkeep (C2, C10). D9 records the one framework-level choice made against this bar.

**Rationale.** Three of the four dominant needs are what Astro is built for:

1. **Collections (C7)** — content collections with schema validation are the best-in-class fit, and the most discriminating requirement.
2. **Inline, addressable SVG (R6, R24)** — native `?raw` imports and `astro-icon` make an SVG into a component whose fills are CSS variables and whose elements are individually targetable.
3. **Performance (R17)** — zero JavaScript by default, with islands available for the interactive hero and for any Tier-2 interactivity later, without a rewrite.

Plus: contributors edit Markdown and YAML and never touch Node (R16, C6), and the official `withastro/action` handles the build.

**The cost, stated plainly.** Astro ships annual majors with genuine breaking changes. v6 dropped Node 18/20 (22.12 minimum), moved to Vite 7 and Zod 4, removed `Astro.glob()`, and relocated `content.config.ts`. Practitioners describe v5→v6 as a few hours of work, not a rewrite.

**Why that cost is acceptable — C9.** The original objection was "an annual breaking change owned by nobody." All three packages already run a scheduled `drift.yml` that re-runs the gates against a fresh dependency resolve, files one deduped `drift`-labelled issue, and feeds an automated healing queue. Astro adds one repo to an existing, staffed process rather than creating an unowned risk. This finding is what changed the recommendation from "Astro, with a caveat" to "Astro."

**Residual risk and its mitigation.** Content is **not framework-locked** — Markdown, YAML, and SVG port to any other generator. Migration cost would be templates only.

**Governance note.** Cloudflare acquired Astro in January 2026, with MIT licensing, open governance, a public roadmap, and vendor-neutral deployment publicly committed. Recorded as a fact to monitor, not a present concern.

**Rejected alternatives:** see §5.

---

### D2 — Hosting and URL · **DECIDED: GitHub Pages with a custom domain**

**Decision.** GitHub Pages, served at a custom domain.

**Rationale.** Best ecosystem identity — the front door reads as the ecosystem's, not as a fourth package (C8) — while staying in the same org as the three packages, with no platform account to administer and no hosting bill.

**Two consequences to handle.**

1. **PR previews are not native.** GitHub Pages has no built-in preview deployments, so C6's "deploy and verify unaided" needs a third-party action publishing previews to a branch. The owner maintains this (C10). Recorded in D6.
2. **The domain registration is the R21 exposure.** Hosting costs nothing, but a domain does, and it renews. If it is registered to a personal account and that card lapses, the canonical ecosystem URL — cited in papers — 404s. **Register it institutionally** (Brown, Carney, or CCV) rather than personally, and set the renewal to auto. This is the single most likely long-term failure mode of the whole site, and it is not a technical one.

**Still to settle:** the domain name itself, and who registers it. Tied to the HSSMSpine ownership conversation (v2 §1, §11).

**Ruled out:** replacing the HSSM docs site root (C8 — couples the front door to one package's release cycle); AWS Lightsail (a VPS to serve static files contradicts R1 and inverts R16). Cloudflare Pages, AWS Amplify, and S3+CloudFront were viable but are not needed once identity is the deciding criterion.

---

### D3 — Animation technique · **OPEN by decision, deferred to pass 2**

**Status.** Deliberately open. Pass 1 ships static (§2), consistent with v2 §8's animation policy.

**What pass 1 must nonetheless deliver — R24.** Individually addressable hero elements. These are required by pass-1 interactivity anyway (R8, R22), and they are the pass-2 animation targets. Building them once avoids the retrofit.

**Constraints that will bind whatever technique is chosen:**

- `prefers-reduced-motion` must fall back to the static composition (R10, R14)
- No layout shift; no blocking of first paint (future-features §1.2)
- Artwork stays editable in source (R7) — which disqualifies Lottie and any motion-tool export that produces an opaque blob
- Payload must justify itself (R17)

**Candidates to evaluate at pass 2:** CSS plus native SVG animation with a small `IntersectionObserver` for scroll sequencing; a lightweight JS motion library. The former was v2's provisional pick and remains the default to beat — everything future-features §1.2 describes is reachable without a library.

**Also open (design, not technique):** whether the hero animates on load, on scroll into view, or on loop; whether motion loops indefinitely; whether mobile animates at all.

---

### D4 — Collections · **DECIDED: three hand-authored collections, no generation**

**Decision.** Three collections, all hand-authored YAML in this repository, rendered by Astro with schema validation in CI.

| Collection | Authoring | Notes |
|---|---|---|
| **Model families** | Hand-curated YAML, one entry per family (~4) | Diffusion variants, race and LBA/LCA accumulators, attention models, RLSSMs. Must be labelled as a selection (R25). Link target for the hero's clickable tiles (R8), and the source of their hover payloads (v3 §6.1a) |
| **Domain showcase** (future-features §1.1) | Hand-authored YAML, one file per entry, PR-contributed | The scverse contribution model — schema-validated, submitted by PR |
| **Capability grid** (v2 §6.5) | Hand-authored YAML | |

**Changed from v2.** The model index was to be generated from the `ssm-simulators` registry and committed. C12 drops this. The Python generation step, its scheduling, and its upstream-drift detection are all removed.

**Rationale for one repo.** The closest analogue — scverse, a scientific ecosystem front door with a package registry — keeps its registry in a separate repo (`scverse/ecosystem-packages`) because that registry is **community-contributed**. Nothing here is. A second repository would be ceremony without benefit. The scverse *contribution model* — one file per entry, schema-validated in CI, submitted by PR — is adopted; the second repository is not.

---

### D5 — Theming · **DECIDED: light and dark, system preference plus persisted toggle**

**Decision.** Follow `prefers-color-scheme` by default; offer an explicit toggle that persists. Semantic design tokens as CSS custom properties throughout.

**Rationale.** Matches all three package documentation sites, so the ecosystem feels consistent. Settled **now**, before artwork is authored (R15) — and it is a pass-1 obligation despite D8's deferral, because retrofitting theme awareness across finished artwork is exactly what R15 exists to prevent (§2).

**Mechanics, which differ by visual type:**

- **Authored SVG** — build the Figma file on semantic variables with Light and Dark modes, then export via a plugin that emits CSS custom properties rather than baked hex.
- **Generated SVG** — **one variant only.** Revised by the design philosophy document (§9): dark mode is *Plate*, meaning figures stay on a paper board in both themes. matplotlib's inline `style=` attributes therefore never need overriding, and no second matplotlib style is required. This removes the light/dark variant pairing the earlier revision specified, and with it the risk of the two drifting apart.
- Note that SVG `fill` attributes cannot use `light-dark()`; fills in *authored* artwork must become CSS classes.

---

### D6 — CI, deployment, and preview · **DECIDED**

**Ownership (C10).** The owner maintains the pipeline. It must nonetheless stay general — no step that depends on one person's machine, local environment, or credentials beyond repository secrets.

**Build.** GitHub Actions, `npm ci` against a **committed lockfile**, pinned Node version (R18). Deploy to GitHub Pages (D2).

**Drift.** A `drift.yml` on the packages' existing pattern runs a **separate, unpinned dependency resolve** on a schedule. Rot surfaces as a `drift`-labelled issue for the healing queue rather than in a contributor's PR.

> **Deliberate divergence from the package convention.** The packages run without a committed lockfile *so that* drift surfaces early. Correct for a library. For this site the edit cycle is far slower and contributors are non-specialists, so reproducibility outranks early signal in the default build. Running both — pinned by default, unpinned on schedule — gets both properties.

**Gates.**

| Gate | Tool | Why |
|---|---|---|
| Link integrity | **lychee** | R19. Already used in all three packages' docs workflows — reuse the configuration |
| Accessibility | axe or Lighthouse CI | R14, including R23 hover/focus parity |
| Collection schemas | Astro/Zod schema validation | D4 — a malformed entry must fail CI, not render broken |
| Performance budget | Lighthouse CI | R17 |

**PR previews.** Required by C6. Not native to GitHub Pages (D2) — use a preview action publishing to a branch.

---

### D7 — Instrumentation · **OPEN by owner decision**

**Status.** Held open. Not a blocker for pass 1.

**Position recorded.** v2 §11 notes that without analytics the success criteria are unmeasurable, and recommends minimal event tracking on the two CTAs. R20 keeps this cheap by requiring stable CTA hooks regardless of the outcome — a hedge that does not presuppose the answer.

**If it closes yes:** use a **cookieless** tool (GoatCounter, Plausible, Umami, or Cloudflare Web Analytics). These fall outside the consent-banner requirement, and a cookie banner on a pitch page is exactly the friction v2 §11 warns about. GA4 is ruled out on banner-friction grounds.

**Recorded risk of leaving it open:** deferring past launch forfeits the launch-window baseline, which is the most informative data the page will ever produce.

---

### D8 — Asset pipeline · **DEFERRED to pass 2, except the hero's structure**

**Deferred (pass 2).** The generation pipeline for data-bearing visuals — worked-example panels 0, 2, 3 and the hero model tiles. Pass 1 hand-places artwork.

**Not deferred (pass 1).** The hero's **structure**, per R24 and §2. Interactivity already requires addressable elements; those elements are also the animation targets. This is the retrofit worth avoiding.

**Recorded for pass 2, when the pipeline is built:**

| Stage | Treatment |
|---|---|
| **Data-bearing visuals** | Python script → SVG, **single variant** (figures stay on paper in both themes — design philosophy §9), committed. Set `svg.fonttype: 'none'` so labels remain real `<text>` (R14) rather than outlined paths, in **JetBrains Mono** per D10. Name elements with `set_gid()` for D3 animation targets. Seed for determinism |
| **Authored visuals** | Figma built on semantic variables → SVG export preserving CSS custom properties → inlined. Name layers deliberately; they become animation-target ids |
| **Four-step chain** | Astro component in HTML/CSS. Responsive, themeable, translatable for free — no SVG needed |
| **Icons** | Shared symbol set via `astro-icon`, svgo-optimized automatically |

**The trap to avoid.** Do not generate the hero *composition* programmatically. Laying out flanks, arrows, and captions in code means writing a bespoke layout engine for a single image: high effort, worse result, never looks art-directed. Generate the data; author the design.

**Accessibility per visual (R14).** `role="img"` plus `<title>` and `<desc>` referenced by `aria-labelledby`; decorative sub-elements `aria-hidden="true"`. The hero carries the page's central argument and needs more than a `<desc>` string — give it a **visually-hidden text equivalent** adjacent to the figure. Interactive hero elements are focusable controls and need accessible names, not just titles (R23).

---

### D9 — CSS strategy · **DECIDED: vanilla CSS with custom properties, no Tailwind**

**Rationale.**

1. Tailwind v4 was not a drop-in upgrade — configuration moved from JavaScript to CSS, the JS plugin API was deprecated, and utilities were renamed. A second dependency with its own churn on top of Astro's (C2, C10).
2. Utility-class markup is markedly harder for a non-frontend maintainer to read (C1).
3. **Custom properties are needed anyway** for the D5 theming pipeline. Vanilla CSS reaches the same place with zero added dependencies.

For a six-section page under a ~550-word budget, Tailwind's payoff never arrives. Note this is a decision about a *CSS framework* specifically; D1 permits visualization and interaction dependencies that earn their place.

---

### D10 — Typography · **DECIDED: three self-hosted families; the mono is shared with matplotlib**

**Revised by the design philosophy document (§5).** The original decision specified *one* self-hosted font for both page and figures. The design system needs three: **Space Grotesk** (display), **IBM Plex Sans** (text), **JetBrains Mono** (labels, captions, metadata, code). All open-licence variable fonts, self-hosted and subset.

**JetBrains Mono is the figure face.** Generated figures set labels, ticks, and annotations in it via matplotlib rcParams, so figure typography matches page typography exactly.

**The original constraint's intent survives.** D8 sets `svg.fonttype: 'none'`, so generated figures reference the font by name rather than embedding outlines — the browser must have that font or the panels render wrong. Designating one family as the shared figure face preserves that guarantee; the other two never appear in a figure. Self-hosting still avoids the third-party-request exposure that has made CDN-hosted fonts a liability for institutional sites in the EU, and removes a render-blocking dependency (R17).

---

### D11 — Citability and licensing · **DECIDED**

R5 makes this page a citable artifact, which implies more than a stable URL.

| Item | Decision |
|---|---|
| `CITATION.cff` | Include, consistent with the packages |
| Canonical URL tags | Required on both pages |
| Sitemap | `@astrojs/sitemap` |
| Social card | One well-made Open Graph image |
| Content licence | **CC-BY** for prose and figures, distinct from the code licence — the academic norm |
| Archival | Snapshot on publication (Software Heritage or Wayback) so a 2029 reader of the preprint finds what was cited |

---

## 5. Evaluation record — rejected stacks

Recorded so they are not re-proposed without new rationale.

| Candidate | Verdict |
|---|---|
| **Astro** | **Selected.** See D1 |
| **Eleventy (11ty)** | Strong runner-up, and the right answer if "survives total neglect" ever outranks page quality. 56 releases since 2017 with only two carrying breaking changes — roughly a 20× better record than Astro. Nunjucks templates are near-identical to Jinja2, making it the most legible Node stack to a Python team. Gives up schema-validated collections, a component model, and batteries |
| **MkDocs Material** | The v1 scaffold's front-runner. Eliminated by C5: with the reference page reduced to a link map, R3 evaporated and with it the reason to be inside a documentation framework. Building the hero means overriding `main.html`, suppressing sidebar and TOC chrome, and layering `extra_css` — and the theme's own documentation notes some parts cannot be overridden via template blocks at all. C11's interactivity requirement compounds this further |
| **Zola** | The strongest Node-free durable option and strictly better than Hugo for this team — single Rust binary, zero runtime dependencies, and **Tera templates are Jinja2-flavoured** rather than Go templates. Not costed further at the owner's direction once Astro was accepted. Revisit only if the Node toolchain proves a real burden |
| **Hugo** | Tempting on durability, and scverse.org is the closest analogue that exists. Eliminated by Go templates — the least legible templating language of any candidate to a Python team. Compounded by 2026 criticism over frequent breaking changes, which undercuts the durability story that was its whole case |
| **Quarto** | Reconsidered specifically because the artwork direction turned Python-generated, and Quarto executes Python natively. Still rejected: the hero would fight Quarto's Bootstrap theming exactly as it would fight MkDocs, and **Quarto 2 is a full Rust rewrite targeting late 2026** — adopting now means building on the version about to be superseded. Recorded explicitly because it is the option most likely to be re-proposed for a scientific site |
| **Sphinx / pydata-sphinx-theme** | The heaviest candidate, and none of what Sphinx exists for is needed. A bespoke hero means raw-HTML directives inside RST/MyST. Brand adjacency to PyMC (pymc.io runs this stack) was the only argument |
| **Plain HTML/CSS, no build** | Contradicts C6 — contributors would hand-edit HTML to add collection entries. A generator would have to be written anyway |
| **Next.js** | React SSR machinery for a two-page static site: more upkeep for less benefit |
| **Docusaurus** | React documentation framework. Some family precedent (scvi-tools uses it), but heavier and docs-shaped — the same mismatch as MkDocs without the Python-native consolation |
| **VitePress** | Vue-coupled and docs-shaped |
| **SvelteKit** | More framework for less benefit |
| **Jekyll** | Ruby, low momentum |
| **Pelican / Lektor / Nikola** | Python SSGs, all low-momentum in 2026 |

---

## 6. Explicitly skipped

| Item | Why |
|---|---|
| Site search | Two pages |
| Internationalisation | English-only is the norm for this audience |
| A component library / design system | A six-section page does not amortise one |
| Tailwind or any CSS framework | D9 |
| Model index generation from the registry | C12 |

---

## 7. Open dependencies on other documents

| Dependency | Where it lives | Blocks |
|---|---|---|
| ~~Content spec §13 conflict~~ | v3 §13 | **Resolved.** The content spec now specifies model families plus links out |
| ~~Hero hover content~~ | v3 §6.1a | **Resolved structurally** — the element table exists. The individual payload copy is now tracked in v3 §11 |
| Domain name, and institutional registration of it | v3 §1, §11; D2 | Launch, and R21 |
| HSSMSpine content ownership handoff | v3 §1, §11 | The reference page's content migration |
| Hero hover payload copy | v3 §11 | R22; blocks hero implementation |
| Hero mobile interaction (tap-to-reveal vs tap-to-follow) | v3 §11 | R9, R23; a design decision, not an implementation one |
| Upstream model-listing pages in HSSM and `ssm-simulators` | v3 §11, §13 | R26 — the outbound links are weak until these exist |
| Final tagline and subline | v3 §7, §11 | Copy |
| Hero mobile composition | v3 §6.1, §11 | R9; informs the hero component structure |
| Worked-example dataset confirmation | v3 §11 | D8 at pass 2 |

---

## 8. Non-goals

- Server-side rendering, a backend, or a database
- User accounts or authentication
- A CMS — content lives in the repository as source
- Hosting model artifacts (HuggingFace is their home)
- Rebuilding any of the three package documentation sites

---

## 9. Sources

Consulted during the 2026-08-13 evaluation.

**Astro:** [v6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/) · [real-world v5→v6 migration](https://harshil.dev/writings/migrating-astro-5-to-astro-6/) · [Cloudflare acquisition](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/) · [withastro/action](https://github.com/withastro/action) · [astro-icon](https://github.com/natemoo-re/astro-icon) · [integration hooks](https://docs.astro.build/en/reference/integrations-reference/)

**Alternatives:** [The Stability of Eleventy](https://www.11ty.dev/blog/stability/) · [Material for MkDocs customization](https://squidfunk.github.io/mkdocs-material/customization/) · [mkdocs-macros-plugin](https://mkdocs-macros-plugin.readthedocs.io/en/stable/) · [Zola](https://github.com/getzola/zola) · [Hugo breaking-changes criticism](https://biggo.com/news/202508311322_Hugo_Breaking_Changes_Criticism) · [pymc-sphinx-theme](https://github.com/pymc-devs/pymc-sphinx-theme)

**Precedents:** [scverse.github.io](https://github.com/scverse/scverse.github.io) · [scverse ecosystem-packages registry](https://github.com/scverse/ecosystem-packages)

**Assets, theming, accessibility:** [Figma SVG Variable Exporter](https://www.figma.com/community/plugin/1591175925553170372/svg-variable-exporter) · [light/dark SVG techniques](https://cassidyjames.com/blog/prefers-color-scheme-svg-light-dark/) · [matplotlib SVG backend](https://matplotlib.org/stable/api/backend_svg_api.html) · [fonts in matplotlib](https://matplotlib.org/stable/users/explain/text/fonts.html) · [accessible SVGs (Deque)](https://www.deque.com/blog/creating-accessible-svgs/) · [using ARIA to enhance SVG accessibility](https://www.tpgi.com/using-aria-enhance-svg-accessibility/) · [WCAG 2.1 SC 1.4.13 Content on Hover or Focus](https://www.w3.org/WAI/WCAG21/Understanding/content-on-hover-or-focus.html)

**CSS and analytics:** [Tailwind v4 migration](https://www.digitalapplied.com/blog/tailwind-css-v4-migration-new-features-guide) · [cookieless analytics compared](https://inimino.org/plausible-vs-umami-vs-goatcounter-privacy-first-analytics-compared-for-2026/)
