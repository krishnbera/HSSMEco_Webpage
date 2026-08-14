# HSSM Ecosystem Landing Page

Homepage for the [HSSM ecosystem](https://lnccbrown.github.io/HSSM/ecosystem/) — a high-level pitch for computational scientists on what the toolchain enables, with links into package documentation for the details.

## Status

Pass 1 implementation is planned. Content, design, and technology (Astro, GitHub Pages) are settled. Copy is draft until sign-off. Hosting domain is still an owner decision.

| Document | Contents |
|---|---|
| [`docs/ecosystem-landing-page-spec.md`](docs/ecosystem-landing-page-spec.md) | Content spec (v3) — purpose, audience, budget, section-by-section design, hero interaction |
| [`docs/ecosystem-landing-page-design-philosophy.md`](docs/ecosystem-landing-page-design-philosophy.md) | Design philosophy (v1) — the visual system: colour law, palette, typography, layout, plates, iconography, light/dark, motion |
| [`docs/ecosystem-landing-page-tech-spec.md`](docs/ecosystem-landing-page-tech-spec.md) | Technical spec (v3) — requirements and decision register. Stack is **Astro**; hosting is GitHub Pages with a custom domain still to register |
| [`docs/ecosystem-landing-page-future-features.md`](docs/ecosystem-landing-page-future-features.md) | Backlog — domain application showcase, animated visualizations, and features deferred from v2 |
| [`docs/superpowers/plans/2026-08-14-ecosystem-landing-page-pass-1.md`](docs/superpowers/plans/2026-08-14-ecosystem-landing-page-pass-1.md) | Pass 1 implementation plan |

## This repository is Node-only

**Do not install Python, HSSM, or any scientific Python stack here.** There is no figure-generation pipeline in this repo: no `requirements.txt`, no venv, no MCMC. Worked-example plots and other data-bearing figures are **supplied as PNG (or SVG) files** and committed. Until they arrive, placeholders are fine. Logos are in [`assets/logos/`](assets/logos/).

## Local reference material (not in git)

Optional, for humans reading specs. Both folders are **gitignored** and are not a build dependency.

| Path | Contents |
|---|---|
| `repos/` | Local clones of ecosystem packages (`HSSM`, `ssm-simulators`, `LANfactory`) |
| `HSSM-preprint/` | Ecosystem preprint PDF (`HSSM_Ecosystem_paper.pdf`) |

## Paper

Fengler et al. (2026). *HSSM: A Widely Applicable Toolbox for Hierarchical Bayesian Neurocognitive Modeling.* bioRxiv. https://doi.org/10.64898/2026.06.05.730398

See [`CITATION.cff`](CITATION.cff) for machine-readable citation metadata.

## Licence

Two licences, on purpose (D11):

| Licence | Covers |
|---|---|
| [`LICENSE`](LICENSE) — MIT | Site code (Astro components, scripts, config, tests) |
| [`LICENSE-CONTENT`](LICENSE-CONTENT) — CC BY 4.0 | Prose, figures, and other content assets |

Code may be reused under MIT; content requires attribution under CC BY 4.0.
