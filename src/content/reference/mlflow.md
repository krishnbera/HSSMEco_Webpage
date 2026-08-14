---
title: Tracking runs with MLflow
order: 7
---

Data generation (`ssms`) and network training (LANfactory) both log to
[MLflow](https://mlflow.org/). Point them at the same tracking store and the
two halves of a network's history end up in one place.

Two environment variables are the interface:

```bash
export MLFLOW_TRACKING_URI="sqlite:////absolute/path/to/tracking.db"
export MLFLOW_ARTIFACT_LOCATION="/absolute/path/to/artifacts"
```

`ssms` records each generation run — the generator and model configuration,
the `data_output_folder`, the number of files produced and their total size,
and tags for the run phase and any SLURM job it ran under. LANfactory records
each training run's configuration and metrics.

The two are linked explicitly rather than by convention: pass the data
generation run's experiment id to the trainer with
`--data-generation-experiment-id`, and LANfactory records the lineage — it can
also discover the training-data folder from MLflow instead of being told where
it is.

Per-package details — CLI flags, what exactly is logged, how to query it —
live with the packages:
[ssm-simulators](https://lnccbrown.github.io/ssm-simulators/core_tutorials/using_mlflow/)
and [LANfactory](https://lnccbrown.github.io/LANfactory/using_mlflow/).
