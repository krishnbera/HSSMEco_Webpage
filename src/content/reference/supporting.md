---
title: Supporting components
order: 5
---

These are not packages you choose — they arrive with HSSM, or hold artifacts
it fetches. They are listed here because their names show up in tracebacks,
lockfiles, and download logs.

| Component | What it is |
|---|---|
| [`hddm-wfpt`](https://github.com/lnccbrown/hddm-wfpt) | The Cython implementation of the Wiener first-passage-time likelihood, inherited from HDDM. Installed with HSSM, and used for the analytical DDM likelihoods. |
| [`franklab/HSSM`](https://huggingface.co/franklab/HSSM) | The HuggingFace repository holding trained likelihood networks. HSSM downloads from it on first use of a model without an analytical likelihood. |
| [`franklab/ssms_gui`](https://huggingface.co/spaces/franklab/ssms_gui) | A HuggingFace Space for exploring SSM behaviour interactively, built on `ssm-simulators`. Useful for building intuition about what a parameter does. |
| conda-forge feedstocks | `hssm` and `ssm-simulators` are also published on conda-forge; the feedstock repositories carry the recipes. |

Third-party libraries that do real work under the hood — PyMC, Bambi, ArviZ,
JAX, PyTensor, ONNX Runtime — are dependencies rather than ecosystem
components, and their own documentation is the right reference for them.
