---
title: Version compatibility
order: 8
---

The packages are released independently, in dependency order:
`ssm-simulators` → `LANfactory` → HSSM. Install floors, rather than pins, are
what the ecosystem guarantees:

| Consumer | Requires |
|---|---|
| HSSM | `ssm-simulators>=0.13.1` |
| LANfactory | `ssm-simulators>=0.13.1` |
| LAN_pipeline_minimal | `ssm-simulators>=0.13.2`, `lanfactory>=0.8` |

All released packages require Python 3.12 or newer. `pip install hssm` pulls a
compatible `ssm-simulators` automatically; you only need to think about this
when you are pinning an environment or building networks yourself.
