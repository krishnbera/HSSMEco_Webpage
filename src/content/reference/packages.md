---
title: The packages you install
order: 1
---

HSSM is the user-facing package of a four-part toolchain. Most users never
leave it: install HSSM, fit models, publish. You end up here when a question
crosses a package boundary — where does a likelihood network come from, which
version pairs with which, why does an ONNX file have to look a certain way.

| Package | Owns | Start here if you want to... |
|---|---|---|
| [HSSM](https://lnccbrown.github.io/HSSM/) | Bayesian inference on sequential sampling models — model specification, priors, sampling, diagnostics, model comparison | ...fit a model to behavioral data. This is the default answer. |
| [ssm-simulators](https://lnccbrown.github.io/ssm-simulators/) (`ssms`) | The generative models: simulators for the SSM family, task environments and learning rules for RLSSMs, and the training-data generators | ...simulate from a model, add a new model to the family, or generate training data. |
| [LANfactory](https://lnccbrown.github.io/LANfactory/) | Training likelihood approximation networks on simulated data, and exporting them to ONNX | ...train your own likelihood network, or export one trained elsewhere. |
| [LAN_pipeline_minimal](https://github.com/lnccbrown/LAN_pipeline_minimal) | Orchestration on a cluster: data generation and network training as scheduled jobs | ...produce networks at scale rather than one at a time. |
