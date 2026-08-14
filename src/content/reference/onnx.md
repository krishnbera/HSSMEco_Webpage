---
title: The ONNX likelihood contract
order: 4
---

**The boundary is a contract, not a convention.** Any ONNX file HSSM loads
must expose one per-trial forward pass with every input dimension concrete;
HSSM batches across trials itself. That rule is stated once, with runnable
checks, in [The ONNX likelihood
contract](https://lnccbrown.github.io/HSSM/how_to/custom_onnx_likelihoods/).
It is also what makes the ecosystem open at the edges: a network trained in
[sbi](https://github.com/sbi-dev/sbi) or
[BayesFlow](https://github.com/bayesflow-org/bayesflow) becomes usable in HSSM
by exporting it to ONNX with LANfactory's exporters, after which HSSM loads it
with the same `loglik="model.onnx"` gesture it uses for its own networks — no
library-specific glue on the HSSM side.
