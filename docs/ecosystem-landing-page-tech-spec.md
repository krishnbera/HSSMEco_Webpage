# HSSM Ecosystem Landing Page — Technical Specification

**Version:** 2 (supersedes the v1 scaffold of 2026-08-13; v1 remains in git history at commit `df45898`)
**Status:** Stack decided. **D1 and D3–D11 are CLOSED. D2 (hosting) remains OPEN** pending the HSSMSpine ownership conversation.
**Last updated:** 2026-08-13
**Companion to:** [`ecosystem-landing-page-spec.md`](ecosystem-landing-page-spec.md) (v2 — content and design) · [`ecosystem-landing-page-future-features.md`](ecosystem-landing-page-future-features.md) (backlog)

**Source material:** technology evaluation session (2026-08-13); the v1 scaffold's research brief; web research into candidate stacks; inspection of the package CI conventions in `repos/` (local only).

---

## Purpose

The v2 content spec places technology stack out of scope. This document is where those decisions land.

The v1 scaffold was deliberately non-committal: it recorded requirements, listed candidates neutrally, and posed a research brief. This version answers that brief. Every closed decision records **why**, and §4 records what was rejected so it is not re-proposed.

**What changed in v2:** two requirements were revised after the evaluation surfaced facts the v1 scaffold had assumed rather than checked (R3 and R7 — see §1.5). Four new requirements were added (R18–R21), and three decisions that were not in the original register (D9–D11) were opened and closed. D1 and D3–D11 are decided. D2 is still open but no longer blocks anything, because every candidate platform serves the same static output.

---

## 0. Constraints gathered during evaluation

These came out of the evaluation session and were not recorded anywhere before. They drove the decisions more than the original requirement list did.

| # | Constraint | Consequence |
|---|---|---|
| C1 | Maintainers are **rotating lab members**: Python- and Markdown-literate, no Node experience | R16 stands as a hard constraint — but see C2 |
| C2 | Initial build is **AI-assisted**; build complexity ≠ maintenance complexity | The question is not "who runs the build" but **"who fixes CI when it breaks in two years"** |
| C3 | Schematic artwork is **Figma/Illustrator-authored**; data-bearing artwork is **Python-generated** | Splits R7 in two — see §1.5 |
| C4 | **One stack serves both pages** | The stack must handle a bespoke hero *and* a reference page |
| C5 | The reference sub-page is a **curated map of links** plus the generated model index — **not** API documentation or tutorials | Voids most of R3 — see §1.5 |
| C6 | Students must, unaided: **edit copy**, **add collection entries**, **deploy and verify**. Not: author reference prose, not edit artwork | Makes collections the dominant functional need |
| C7 | Three content structures are **collections**, not prose: model index, domain showcase, capability grid | The single most discriminating requirement between candidates |
| C8 | Hosting is a **standalone site**; replacing the HSSM docs root is off the table | Hosting is stack-neutral; MkDocs is not forced |
| C9 | The lab **already runs scheduled drift detection** with an automated healing queue (`drift.yml` in all three packages) | Materially de-risks a stack with a periodic upgrade cost — see D1 |

---

## 1. Requirements

Constraints, not preferences. A stack that cannot meet them is disqualified regardless of other merits.

### 1.1 Output and hosting

| # | Requirement | Source |
|---|---|---|
| R1 | **Static output.** No server-side runtime required to serve the page. | Hosting candidates; no dynamic data |
| R2 | Must serve **two pages**: the landing page and the Ecosystem reference sub-page. | v2 §1, §13 |
| R3 | **REVISED — see §1.5.** The reference sub-page needs *link-map* affordances, not documentation affordances. | v2 §13; C5 |
| R4 | Must be able to **own a redirect** from `lnccbrown.github.io/HSSM/ecosystem/`. Implemented on the *HSSM docs* side (`mkdocs-redirects`), not here. | v2 §1 |
| R5 | URLs must be stable and citable. This page becomes the canonical ecosystem reference and will be linked from papers and talks. | v2 §1 |

### 1.2 Visual assets

| # | Requirement | Source |
|---|---|---|
| R6 | **Four substantial bespoke visuals**, inlined as SVG: hero commons, four-panel worked example, four-step chain, capability iconography. Inlining is mandatory — an `<img>` is a sealed box that page CSS cannot theme. | v2 §8; D5 |
| R7 | **REVISED — see §1.5.** Artwork must stay editable in source, where "source" differs by visual type. | v2 §6.1; future-features §1.2 |
| R8 | Hero model tiles must be **clickable links** into the model index. | v2 §6.1 |
| R9 | The hero needs a **defined mobile composition** — flanks stack beneath the core or degrade to captions. Not a post-hoc responsive fix. | v2 §6.1 |
| R10 | **Animation-ready but static-first.** Every visual must communicate fully in a screenshot; `prefers-reduced-motion` must fall back to static. | v2 §8; future-features §1.2 |

### 1.3 Content and correctness

| # | Requirement | Source |
|---|---|---|
| R11 | One **syntax-highlighted Python code block**, three lines. | v2 §6.3 |
| R12 | The **model index is generated from the `ssm-simulators` registry**, not hand-maintained. | v2 §13 |
| R13 | No **model counts** anywhere in the build output. If reintroduced they must be generated at build time, never hand-written. | v2 §10 |

### 1.4 Quality bars

| # | Requirement |
|---|---|
| R14 | Accessible: semantic landmarks, keyboard-navigable, sufficient contrast, SVG visuals given text alternatives, `prefers-reduced-motion` honoured. Enforced as a **CI gate**, not a review item — see D6. |
| R15 | Light and dark treatment decided **before** the four SVGs are authored. |
| R16 | **Low maintenance burden for a Python-centric team.** Read precisely: contributors must never install Node, run a build, or debug a dependency. See C2 for what this does and does not disqualify. |
| R17 | Fast on a poor connection. A slow first paint defeats a pitch page. |

### 1.5 Requirement revisions

Two requirements were written on assumptions the evaluation disproved. Both are recorded rather than silently edited, because both changed the outcome.

**R3 — downgraded.** The v1 scaffold specified "conventional documentation affordances — dense tables, deep headings, stable anchors, code blocks," and its research brief stated that if MkDocs Material could carry the hero, "R3 and R16 make it very hard to beat."

The reference sub-page is a **curated map of links into the package documentation**, plus the generated model index. It hosts no API reference and no tutorials. MkDocs Material's decisive advantage — free TOC, anchors, and search over deep prose — therefore buys nothing that is needed. The question the v1 brief expected to settle the evaluation no longer settles anything.

**R7 — split in two.** The original text — "Any pipeline that converts artwork to an opaque binary is disqualified" — assumed a single authoring path. There are two, and they satisfy R7 differently:

| Visual | Source of truth | How R7 is met |
|---|---|---|
| Worked example panels 0, 2, 3 (RT distributions, posteriors, PPC) | **Python script in this repo** | Fully — the source is versioned code, not a design file |
| Hero model tiles (~6 cartoons) | **Python script**, via `hssm.plotting.plot_model_cartoon` | Fully — regenerates as models change |
| Hero composition (flanks, arrows, captions) | **Figma → SVG**, inlined | Conditionally — requires the discipline in D8 |
| Four-step chain | **Astro component**, HTML/CSS — likely no SVG at all | Fully |
| Capability iconography | **Figma → SVG**, inlined | Conditionally — requires the discipline in D8 |

HSSM already generates most of the data-bearing artwork: `repos/HSSM/src/hssm/plotting/` contains `plot_model_cartoon` ([`model_cartoon.py:488`](../repos/HSSM/src/hssm/plotting/model_cartoon.py)), plus `predictive.py` and `quantile_probability.py`. The v2 spec's "thin line-art model cartoon — boundaries plus stochastic trajectory" describes `plot_model_cartoon` output literally.

This also strengthens v2 §0's **"show, don't assert"** principle: the figures become genuine output of the toolchain being pitched, and cannot silently go stale.

### 1.6 Requirements added in v2

| # | Requirement | Rationale |
|---|---|---|
| R18 | **Reproducible builds.** Committed lockfile, `npm ci`, pinned CI runtime. A contributor's copy-edit PR must never fail for reasons unrelated to their change. | C1, C6; the site's edit cycle is slower than the packages', so reproducibility outranks early drift signal in the default build |
| R19 | **Link integrity is a CI gate.** Because the reference page is a map of links (C5), link rot is the primary way this site silently degrades. | C5 |
| R20 | **Instrumentable but uninstrumented at launch.** CTAs carry stable hooks so analytics is a one-line addition later. | D7 |
| R21 | **No billing dependency required to keep the site reachable**, or if one exists, it must be institutionally held rather than personal. | C1; a lapsed personal card 404-ing a paper-cited URL is a likelier failure than any technical rot considered here |

---

## 2. Decision register

### D1 — Build stack · **DECIDED: Astro**

**Decision.** Astro, with vanilla CSS (see D9), content in Markdown, and collections defined by schema (see D4).

**Rationale.** Three of the four dominant needs are what Astro is built for:

1. **Collections (C7)** — content collections with schema validation are the best-in-class fit, and the most discriminating requirement.
2. **Inline SVG (R6)** — native `?raw` imports and `astro-icon` (which runs svgo automatically) make a Figma export or a matplotlib output into a component whose fills are CSS variables and whose elements are addressable animation targets.
3. **Performance (R17)** — zero JavaScript by default, with islands available later if the Tier-2 parameter widget ever returns, without a rewrite.

Plus: students edit Markdown and YAML and never touch Node (R16, C6), and the official `withastro/action` handles the build.

**The cost, stated plainly.** Astro ships annual majors with genuine breaking changes. v6 dropped Node 18/20 (22.12 minimum), moved to Vite 7 and Zod 4, removed `Astro.glob()`, and relocated `content.config.ts`. Practitioners describe v5→v6 as a few hours of work, not a rewrite.

**Why that cost is acceptable here — C9.** The evaluation's original objection was "an annual breaking change owned by nobody." Inspection of the packages showed that objection is already answered institutionally: all three repos run a scheduled `drift.yml` that re-runs the gates against a fresh dependency resolve, files one deduped `drift`-labelled issue, and feeds an automated healing queue. Adopting Astro adds one repo to an existing, already-staffed process rather than creating an unowned risk. This finding changed the recommendation from "Astro, with a caveat" to "Astro."

**Residual risk and its mitigation.** Content is **not framework-locked** — Markdown, YAML, and SVG port to any other generator. If Astro ever stops being worth its upkeep, the migration cost is templates only.

**Governance note.** Cloudflare acquired Astro in January 2026, with MIT licensing, open governance, a public roadmap, and vendor-neutral deployment publicly committed. Recorded as a fact to monitor, not as a present concern.

**Rejected alternatives:** see §4.

---

### D2 — Hosting and URL · **OPEN**

Unchanged in status, but **no longer blocking**: Astro emits plain static files that every candidate serves identically. This is precisely what R1 exists to guarantee. The decision can be made on identity and governance grounds alone, whenever the HSSMSpine ownership conversation concludes.

| Option | For | Against |
|---|---|---|
| **GitHub Pages + custom domain** | Best ecosystem identity; citable in talks and papers; no billing dependency (R21) | Someone must buy and administer the domain; PR previews require a third-party action |
| **GitHub Pages, `lnccbrown.github.io` subpath** | No purchase, no new administration, same org as the packages; no billing dependency | Weaker identity; reads as a fourth package rather than the front door |
| **Cloudflare Pages** | Unlimited automatic PR previews free on public repos — satisfies C6's "verify unaided" with zero extra machinery; no billing dependency | A third-party account outside GitHub for the lab to administer |
| **AWS Amplify Hosting** | The AWS-native equivalent: git-integrated, per-PR preview URLs, managed TLS and domains | Billing dependency (R21); an AWS account someone must own |
| **AWS S3 + CloudFront** | Canonical serverless static pattern; cheap and fast | No native PR previews; you own IAM/OIDC, cache invalidation, and ACM certs. More assembly |
| **AWS Lightsail** | — | **Not recommended.** Lightsail is a VPS: running and patching a server to serve static files. Contradicts R1 and inverts R16 — an unpatched host owned by a departed lab member is a larger risk than any technical rot considered in this document |
| ~~Replace the HSSM docs site root~~ | — | **Ruled out** (C8). Couples the ecosystem front door to one package's release cycle — the entanglement v2 was written to avoid |

**Blocked on:** the HSSMSpine ownership conversation (v2 §1, §11).

**Note for whoever closes this:** the choice mainly decides whether PR previews are free and automatic (C6) and whether R21 is satisfied. Every option meets R1 and R5.

---

### D3 — Animation technique · **DECIDED: CSS and native SVG only**

**Decision.** CSS animations and transitions plus native SVG features, with a small `IntersectionObserver` for scroll-triggered sequencing. **No motion library, no Lottie.**

**Rationale.** Everything future-features §1.2 describes — streams pulsing along paths, posteriors blooming, a tile docking at the "+" slot, four-step sequencing on scroll — is reachable in CSS. A motion library would add a dependency and a JS payload (against R17) for effects that do not need one. Lottie is disqualified outright by R7: it converts artwork into an opaque JSON blob.

**Animation targets come free from D8.** Generated figures get ids via matplotlib's `set_gid()`; authored figures get them from deliberate Figma layer naming. Both are free if done from the start and expensive as a retrofit.

**Gated on `prefers-reduced-motion`** (R10, R14), falling back to the static composition.

**Still open (deferred to build):** whether the hero animates on load, on scroll into view, or on loop; whether motion loops indefinitely; whether mobile animates at all. All are design questions, recorded in future-features §1.2.

---

### D4 — Model index and collections · **DECIDED**

**Decision.** Three collections, all rendered by Astro from structured data with schema validation in CI. **Both live in this repository** — no separate registry repo.

| Collection | Authoring | Refresh |
|---|---|---|
| **Model index** | Generated from the `ssm-simulators` registry by a Python script, committed as YAML | Scheduled job; drift against upstream releases surfaces via the D6 drift workflow |
| **Domain showcase** (future-features §1.1) | Hand-authored YAML, one file per entry, PR-contributed | On contribution |
| **Capability grid** (v2 §6.5) | Hand-authored YAML | On edit |

**Rationale for committed artifacts over build-time generation.** Keeps the Astro build Node-only. Contributors never need a Python environment (R16, C6), and the build cannot fail because a scientific dependency did.

**Rationale for one repo, not two.** The scverse ecosystem — the closest analogue, a scientific ecosystem front door with a package registry — keeps its registry in a separate repo (`scverse/ecosystem-packages`, `packages/*/meta.yaml` validated against `schema.json` in CI). That separation exists because their registry is **community-contributed**. The model index here is **derived** from `ssm-simulators` and has no external contributors, so a second repo would be ceremony without benefit. The scverse *contribution model* — one file per entry, schema-validated in CI, submitted by PR — is adopted for the domain showcase; the second repository is not.

**Determinism.** Generation must be seeded, or the artwork and index churn in git diffs on every refresh.

---

### D5 — Theming · **DECIDED: light and dark, system preference plus persisted toggle**

**Decision.** Full light and dark treatment. Follow `prefers-color-scheme` by default; offer an explicit toggle that persists. Semantic design tokens as CSS custom properties throughout.

**Rationale.** Matches all three package documentation sites (MkDocs Material ships a toggle), so the ecosystem feels consistent. Settled **now**, before any artwork is authored, per R15 — retrofitting theme awareness across four bespoke SVGs is the expensive path.

**Mechanics, which differ by visual type (see D8):**

- **Authored SVG** — build the Figma file on semantic variables with Light and Dark modes, then export via a plugin that emits CSS custom properties rather than baked hex.
- **Generated SVG** — matplotlib writes inline `style=` attributes that page CSS cannot cleanly override. Do not fight this: **emit light and dark variants and swap them with CSS.** More files, zero post-processing fragility.
- Note that SVG `fill` attributes cannot use `light-dark()`; fills must become CSS classes.

---

### D6 — CI, deployment, and preview · **DECIDED (except the preview mechanism, which follows D2)**

**Build.** GitHub Actions, `npm ci` against a **committed lockfile**, pinned Node version (R18).

**Drift.** A `drift.yml` on the packages' existing pattern runs a **separate, unpinned dependency resolve** on a schedule. Rot surfaces as a `drift`-labelled issue for the healing queue rather than in a contributor's PR.

> **Deliberate divergence from the package convention.** The packages run without a committed lockfile *so that* drift surfaces early. That is correct for a library. For this site the edit cycle is far slower and contributors are non-specialists, so reproducibility outranks early signal in the default build. Running both — pinned by default, unpinned on schedule — gets both properties.

**Gates.**

| Gate | Tool | Why |
|---|---|---|
| Link integrity | **lychee** | R19. Already used in all three packages' docs workflows — reuse the configuration |
| Accessibility | axe or Lighthouse CI | R14, as a gate rather than a review item |
| Collection schemas | Astro/Zod schema validation | D4 — a malformed entry must fail CI, not render broken |
| Performance budget | Lighthouse CI | R17 |

**PR previews.** Required by C6 ("deploy and verify unaided"). The mechanism depends on D2: native on Cloudflare Pages and Amplify, a third-party action on GitHub Pages.

---

### D7 — Instrumentation · **DECIDED: defer, but build instrumentable**

**Decision.** Ship without analytics. Give both CTAs stable hooks and a data layer so instrumentation is a one-line addition later (R20).

**Rationale.** Keeps the launch free of third-party requests and of any privacy-policy or consent question. v2 §11's concern — that the success criteria are unmeasurable without it — is acknowledged and accepted.

**Recorded risk.** "Later" often means never, and deferring forfeits the launch-window baseline, which is the most informative data the page will ever produce. If it is adopted, use a **cookieless** tool (GoatCounter, Plausible, Umami, or Cloudflare Web Analytics) — these fall outside the consent-banner requirement, and a cookie banner on a pitch page is exactly the friction v2 §11 warns about. GA4 is ruled out on banner-friction grounds.

---

### D8 — Asset pipeline · **DECIDED: hybrid**

**Decision.** Generate the data; author the design.

| Stage | Treatment |
|---|---|
| **Data-bearing visuals** | Python script → SVG, light and dark variants, committed. Set `svg.fonttype: 'none'` so labels remain real `<text>` (R14) rather than outlined paths. Name elements with `set_gid()` for D3 animation targets. Seed for determinism |
| **Authored visuals** | Figma built on semantic variables → SVG export preserving CSS custom properties → inlined. Name layers deliberately; they become the animation-target ids |
| **Four-step chain** | Astro component in HTML/CSS. Responsive, themeable, and translatable for free — no SVG needed |
| **Icons** | Shared symbol set via `astro-icon`, svgo-optimized automatically |

**The trap to avoid.** Do not generate the hero *composition* programmatically. Laying out flanks, arrows, and captions in code means writing a bespoke layout engine for a single image: high effort, worse result, never looks art-directed.

**Accessibility per visual (R14).** `role="img"` plus `<title>` and `<desc>` referenced by `aria-labelledby`; decorative sub-elements `aria-hidden="true"`. The hero carries the page's central argument and needs more than a `<desc>` string — give it a **visually-hidden text equivalent** adjacent to the figure.

---

### D9 — CSS strategy · **DECIDED: vanilla CSS with custom properties, no Tailwind**

**Rationale.**

1. Tailwind v4 was not a drop-in upgrade — configuration moved from JavaScript to CSS, the JS plugin API was deprecated, and utilities were renamed. That is a second dependency with its own churn on top of Astro's, against C1 and C2.
2. Utility-class markup is markedly harder for a non-frontend maintainer to read (C1).
3. **Custom properties are needed anyway** for the D5 SVG theming pipeline. Vanilla CSS reaches the same place with zero added dependencies.

For a six-section page under a ~550-word budget, Tailwind's payoff never arrives.

---

### D10 — Typography · **DECIDED: one self-hosted font**

**Decision.** A single self-hosted, subset variable font, used in **both** the page CSS and the matplotlib rcParams.

**Rationale.** D8 sets `svg.fonttype: 'none'`, so generated figures reference the font by name rather than embedding outlines — the browser must have the same font or the panels render wrong. Self-hosting (rather than the Google Fonts CDN) also avoids the third-party-request exposure that has made CDN-hosted fonts a liability for institutional sites in the EU, and removes a render-blocking third-party dependency (R17).

---

### D11 — Citability and licensing · **DECIDED**

R5 makes this page a citable artifact, which implies more than a stable URL.

| Item | Decision |
|---|---|
| `CITATION.cff` | Include, consistent with the packages |
| Canonical URL tags | Required on both pages |
| Sitemap | `@astrojs/sitemap` |
| Social card | One well-made Open Graph image — cheap, and this audience shares on Bluesky/Mastodon/X |
| Content licence | **CC-BY** for prose and figures, distinct from the code licence — the academic norm |
| Archival | Snapshot on publication (Software Heritage or Wayback) so a 2029 reader of the preprint finds what was cited |

---

## 3. Explicitly skipped

| Item | Why |
|---|---|
| Site search | Two pages |
| Internationalisation | English-only is the norm for this audience |
| A component library / design system | A six-section page does not amortise one |
| Tailwind or any CSS framework | D9 |
| A motion library | D3 |

---

## 4. Evaluation record — rejected stacks

Recorded so they are not re-proposed without new rationale.

| Candidate | Verdict |
|---|---|
| **Astro** | **Selected.** See D1 |
| **Eleventy (11ty)** | Strong runner-up, and the right answer if "survives total neglect" ever outranks page quality. 56 releases since 2017 with only two carrying breaking changes — roughly a 20× better record than Astro. Nunjucks templates are near-identical to Jinja2, making it the most legible Node stack to a Python team. Gives up schema-validated collections, a component model, and batteries (CSS/image handling wired by hand) |
| **MkDocs Material** | The v1 scaffold's front-runner. Eliminated by C5: with the reference page reduced to a link map, R3 evaporated and with it the entire reason to be inside a documentation framework. Building the hero means overriding `main.html`, suppressing sidebar and TOC chrome, and layering `extra_css` — and the theme's own documentation notes some parts cannot be overridden via template blocks at all. Every future visual change would fight the theme, for no remaining benefit |
| **Zola** | The strongest Node-free durable option and strictly better than Hugo for this team — single Rust binary, zero runtime dependencies, and **Tera templates are Jinja2-flavoured** rather than Go templates. Not costed further at the owner's direction once Astro was accepted. Revisit only if the Node toolchain proves a real burden |
| **Hugo** | Tempting on durability, and the scverse.org precedent is the closest analogue that exists. Eliminated by Go templates — the least legible templating language of any candidate to a Python team, so the only person who could debug it is whoever built it. Compounded by 2026 criticism over frequent breaking changes, which undercuts the durability story that was its whole case |
| **Quarto** | Reconsidered specifically because the artwork direction turned Python-generated, and Quarto executes Python natively. Still rejected, for two reasons: the hero would fight Quarto's Bootstrap theming exactly as it would fight MkDocs, and **Quarto 2 is a full Rust rewrite targeting late 2026** — adopting now means building on the version about to be superseded. Recorded explicitly because it is the option most likely to be re-proposed for a scientific site |
| **Sphinx / pydata-sphinx-theme** | The heaviest candidate, and none of what Sphinx exists for is needed — no API docs, no autodoc, no cross-references. A bespoke hero means raw-HTML directives inside RST/MyST. Brand adjacency to PyMC (pymc.io runs this stack) was the only argument |
| **Plain HTML/CSS, no build** | Contradicts C6 — students would hand-edit HTML to add showcase and model-index entries. A generator would have to be written anyway |
| **Next.js** | React SSR machinery for a two-page static site: strictly more upkeep than Astro for strictly less benefit |
| **Docusaurus** | React documentation framework. Some family precedent (scvi-tools uses it), but heavier and docs-shaped — the same mismatch as MkDocs without the Python-native consolation |
| **VitePress** | Vue-coupled and docs-shaped |
| **SvelteKit** | More framework for less benefit |
| **Jekyll** | Ruby, low momentum |
| **Pelican / Lektor / Nikola** | Python SSGs, all low-momentum in 2026 |

---

## 5. Open dependencies on other documents

| Dependency | Where it lives | Blocks |
|---|---|---|
| HSSMSpine content ownership handoff | v2 §1, §11 | **D2** |
| Final tagline and subline | v2 §7, §11 | Nothing technical; blocks copy |
| Hero mobile composition | v2 §6.1, §11 | R9; informs D8 |
| Worked-example dataset confirmation | v2 §11 | D8 — the generation script cannot be written until the dataset is confirmed |

---

## 6. Non-goals

- Server-side rendering, a backend, or a database
- User accounts or authentication
- A CMS — content lives in the repository as source
- Hosting model artifacts (HuggingFace is their home)
- Rebuilding any of the three package documentation sites

---

## 7. Sources

Consulted during the 2026-08-13 evaluation.

**Astro:** [v6 upgrade guide](https://docs.astro.build/en/guides/upgrade-to/v6/) · [real-world v5→v6 migration](https://harshil.dev/writings/migrating-astro-5-to-astro-6/) · [Cloudflare acquisition](https://www.cloudflare.com/press/press-releases/2026/cloudflare-acquires-astro-to-accelerate-the-future-of-high-performance-web-development/) · [withastro/action](https://github.com/withastro/action) · [astro-icon](https://github.com/natemoo-re/astro-icon) · [integration hooks](https://docs.astro.build/en/reference/integrations-reference/)

**Alternatives:** [The Stability of Eleventy](https://www.11ty.dev/blog/stability/) · [Material for MkDocs customization](https://squidfunk.github.io/mkdocs-material/customization/) · [MkDocs custom hero walkthrough](https://medium.com/@wishula/implementing-a-left-sidebar-theme-toggle-and-custom-hero-in-mkdocs-material-b2d5d71a1278) · [mkdocs-macros-plugin](https://mkdocs-macros-plugin.readthedocs.io/en/stable/) · [Zola](https://github.com/getzola/zola) · [Hugo breaking-changes criticism](https://biggo.com/news/202508311322_Hugo_Breaking_Changes_Criticism) · [pymc-sphinx-theme](https://github.com/pymc-devs/pymc-sphinx-theme)

**Precedents:** [scverse.github.io](https://github.com/scverse/scverse.github.io) · [scverse ecosystem-packages registry](https://github.com/scverse/ecosystem-packages)

**Assets and theming:** [Figma SVG Variable Exporter](https://www.figma.com/community/plugin/1591175925553170372/svg-variable-exporter) · [light/dark SVG techniques](https://cassidyjames.com/blog/prefers-color-scheme-svg-light-dark/) · [matplotlib SVG backend](https://matplotlib.org/stable/api/backend_svg_api.html) · [fonts in matplotlib](https://matplotlib.org/stable/users/explain/text/fonts.html) · [accessible SVGs (Deque)](https://www.deque.com/blog/creating-accessible-svgs/) · [using ARIA to enhance SVG accessibility](https://www.tpgi.com/using-aria-enhance-svg-accessibility/)

**CSS and analytics:** [Tailwind v4 migration](https://www.digitalapplied.com/blog/tailwind-css-v4-migration-new-features-guide) · [cookieless analytics compared](https://inimino.org/plausible-vs-umami-vs-goatcounter-privacy-first-analytics-compared-for-2026/)

**Hosting:** [Cloudflare Pages git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
