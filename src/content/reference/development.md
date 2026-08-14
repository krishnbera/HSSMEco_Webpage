---
title: Development and coordination
order: 6
---

Repositories exist for people working *on* the ecosystem rather than with
it. You never need them to fit models, and they are not Python packages you
install alongside HSSM. Auxiliary repositories sit beside the coordination and
capability layers — cluster orchestration today, and future tooling.

| Repository | Role |
|---|---|
| [HSSMSpine](https://github.com/lnccbrown/HSSMSpine) | The coordination repository. It holds no library code — it carries cross-repo context, shared development workflows, the release playbook, and the shared documentation brand. Contributors working across two or more packages start here. |
| [HSSMCortex](https://github.com/lnccbrown/HSSMCortex) | The capability layer: a knowledge base of papers, modeling taxonomies, and curated guides, plus tooling that makes that knowledge queryable during development. |
| [LAN_pipeline_minimal](https://github.com/lnccbrown/LAN_pipeline_minimal) | Orchestration on a cluster: data generation and network training as scheduled jobs. Install it when you produce networks at scale rather than one at a time. |
| [HSSMeister](https://github.com/lnccbrown/HSSMeister) | Future. Planned tooling for the ecosystem; not yet published. |

If you are contributing to a single package, its own contributing guide is the
place to start; the spine matters when a change spans packages, such as adding
a model that needs a simulator, a trained network, and an HSSM configuration.
