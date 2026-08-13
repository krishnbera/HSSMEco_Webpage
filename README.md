# HSSM Ecosystem Landing Page

Homepage for the [HSSM ecosystem](https://lnccbrown.github.io/HSSM/ecosystem/) — a high-level pitch for computational scientists on what the toolchain enables, with links into package documentation for the details.

## Status

Early planning. See the content spec:

- [`docs/ecosystem-landing-page-spec.md`](docs/ecosystem-landing-page-spec.md)

## Local reference material (not in git)

For local brainstorming and copy work, keep reference material in these folders. Both are **gitignored** and will not be pushed to GitHub.

| Path | Contents |
|---|---|
| `repos/` | Local clones of ecosystem packages (`HSSM`, `ssm-simulators`, `LANfactory`) |
| `HSSM-preprint/` | Ecosystem preprint PDF (`HSSM_Ecosystem_paper.pdf`) |

Clone upstream packages into `repos/` as needed:

```bash
mkdir -p repos
git clone https://github.com/lnccbrown/HSSM.git repos/HSSM
git clone https://github.com/lnccbrown/ssm-simulators.git repos/ssm-simulators
git clone https://github.com/lnccbrown/LANfactory.git repos/LANfactory
```

## Paper

Fengler et al. (2026). *HSSM: A Widely Applicable Toolbox for Hierarchical Bayesian Neurocognitive Modeling.* bioRxiv. https://doi.org/10.64898/2026.06.05.730398
