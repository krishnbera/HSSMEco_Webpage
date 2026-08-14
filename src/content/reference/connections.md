---
title: How the pieces connect
order: 2
---

The chain runs in one direction, and the handoffs are files rather than
imports:

```text
ssm-simulators ──simulated training data──> LANfactory ──ONNX network──> HuggingFace
                                                                             │
                                                                             ▼
                                                                           HSSM
                                                          (downloads networks at run time)
```

**Networks are artifacts, not code.** Many SSMs have no analytical likelihood.
For those, a neural network is trained once — offline, on simulated data — to
approximate the likelihood, and HSSM calls that network during sampling. The
trained networks live on
[HuggingFace](https://huggingface.co/franklab/HSSM); HSSM downloads what a
model needs on first use. You do not need LANfactory installed to use a
network someone else trained.
