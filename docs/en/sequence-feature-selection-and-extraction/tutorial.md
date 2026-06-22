# Tutorial: Linking Life Trajectories to an Outcome with FES

This workflow turns life-course sequences into a smaller set of interpretable features associated with an outcome, following Unterlerchner, Studer, and Gomensoro (2023). The worked example covers five steps:

1. Prepare `SequenceData`, an outcome, and control covariates.
2. Load a named settings bundle, called a `preset` in the API (paper-style defaults in one argument).
3. Optionally extract features before selection.
4. Run the full pipeline (extract → residualize → Boruta).
5. Summarize and cluster selected features for interpretation.

The example uses the built-in [Pairfam activity trajectories (month-level)](../datasets/pairfam-activity.md) dataset: 264 monthly observations per person (ages 18 to 40). The original Unterlerchner et al. (2023) paper uses Swiss TREE educational data (access required). Swap in TREE or your own `seqdata`, `outcome`, and `controls` when you have them.

::: warning Demo vs full replication
The code calls each function in order on monthly pairfam activity sequences. That matches the monthly time grid assumed by `preset="unterlerchner2023"` (`timing_bin_width=12.0` = twelve months per bin). It is still not a replication of Unterlerchner (2023): the paper uses TREE educational pathways and income, not pairfam employment states and years of education.
:::

## What Is a “Named Settings Bundle”?

A named settings bundle, or `preset`, is a shortcut for loading a fixed configuration from a published workflow. Instead of passing dozens of arguments one by one, you can pass a single name:

```python
preset="unterlerchner2023"
```

Think of it as: *“use the main analysis choices from Unterlerchner et al. (2023).”* Under the hood this sets timing bins, spell start/end features, sequencing mining limits, Boruta defaults, and control residualization. You can inspect or copy the bundle with `get_feature_extraction_and_selection_config_preset("unterlerchner2023")`.

## What `unterlerchner2023` Sets

| Setting | Value |
| --- | --- |
| `time_unit_hint` | `"month"` (metadata for results; does not change bins by itself) |
| `timing_bin_width` | `12.0` (twelve time-label units per bin) |
| `timing_include_start` / `timing_include_end` | `True` / `True` |
| `end_time_mode` | `"exit_time"` |
| `sequencing_max_k` | `3` |
| `sequencing_min_support` | `0.05` |
| `residualize_target_with_controls` | `True` |
| `fit_final_model` | `False` (no automatic final regression) |
| Boruta | `n_iter=50`, `perc=100`, `alpha=0.01`, `two_step=False` |

See [`run_feature_extraction_and_selection_pipeline()`](./run-feature-extraction-and-selection-pipeline.md) for the full config field list.

## Step 1: Imports

```python
import numpy as np
import pandas as pd

from sequenzo import (
    SequenceData,
    load_dataset,
    list_datasets,
    extract_sequence_features,
    run_feature_extraction_and_selection_pipeline,
    get_feature_extraction_and_selection_config_preset,
    interpret_selected_features,
    cluster_correlated_features,
)
```

## Step 2: Load and Inspect Data

Load the month-level pairfam dataset. Time columns are month indices `1` through `264`; states are numeric codes `1` to `8` (see [Pairfam activity dataset](../datasets/pairfam-activity.md#activity-states-encoding)).

```python
print(list_datasets())

df = load_dataset("pairfam_activity_by_month")
time_cols = sorted([c for c in df.columns if str(c).isdigit()], key=int)
states = list(range(1, 9))
```

For a quicker first run, use a subset. For publication-style analysis, use the full sample.

```python
df_small = df.head(300).copy()
print(df_small[time_cols[:5]].head())
```

Your own data: one row per person, one column per time point, plus a defined state alphabet. Here the monthly grid (`1 … 264`) aligns with `timing_bin_width=12.0` as twelve months per bin under `preset="unterlerchner2023"`.

## Step 3: Define Outcome and Controls

The paper regresses income on trajectory features after residualizing on controls. Here we use `yeduc` (years of education) from pairfam as a continuous outcome and a few demographic controls. This is a teaching stand-in, not the paper’s income measure.

```python
outcome = df_small["yeduc"].to_numpy()
controls = df_small[["sex", "east", "highschool"]].astype(float)

valid = outcome == outcome  # drop missing outcome
for col in controls.columns:
    valid &= controls[col].notna().to_numpy()

df_analysis = df_small.loc[valid].reset_index(drop=True)
outcome = df_analysis["yeduc"].to_numpy()
controls = df_analysis[["sex", "east", "highschool"]].astype(float)

seqdata = SequenceData(df_analysis, time=time_cols, states=states)
print(seqdata.n_sequences, "sequences after dropping missing values")
```

With TREE-style data, `outcome` might be log income and `controls` might include sex, parental education, etc. Row order must match `seqdata` rows. Optional survey weights (`weight40` in pairfam) can be passed as `sample_weights` in the pipeline.

## Step 4: Inspect the Settings Bundle (Optional)

```python
cfg = get_feature_extraction_and_selection_config_preset("unterlerchner2023")
print(cfg)
```

This prints a frozen `FeatureExtractionAndSelectionConfig`. If you want to modify one field while keeping the rest, use `dataclasses.replace()`:

```python
from dataclasses import replace

cfg = get_feature_extraction_and_selection_config_preset("unterlerchner2023")
cfg_yearly = replace(cfg, timing_bin_width=1.0, time_unit_hint="year")
```

You can then pass the modified configuration with `config=cfg_yearly` instead of `preset="unterlerchner2023"`.

## Step 5: Feature Extraction Only (Optional)

Inspect candidate features before Boruta. This step does not use the outcome.

```python
features = extract_sequence_features(
    seqdata,
    timing_bin_width=12.0,
    time_unit_hint="month",
    timing_include_end=True,
    end_time_mode="exit_time",
    sequencing_max_k=3,
    sequencing_min_support=0.05,
)

print("n_features:", len(features["all_feature_names"]))
print(features["X_full"].shape)
features["X_full"].head()
```

You get separate blocks: `X_duration`, `X_timing`, `X_sequencing`, and the combined `X_full`.

## Step 6: Run the Full Pipeline

Boruta can take some time when many features are extracted. For a quick test, keep the subset small; for real analysis, use the full sample and consider adjusting `sequencing_top_mined_subsequences` or Boruta iterations.

This step extracts features, residualizes the outcome on `controls`, and runs Boruta. No final regression is fitted by default.

```python
result = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=outcome,
    controls=controls,
    preset="unterlerchner2023",
    problem_type="regression",
    verbose=True,
)

print("n_selected:", len(result["selected_feature_names"]))
print("n_tentative:", len(result["tentative_feature_names"]))
print(result["selected_feature_names"][:10])
```

What happens internally:

1. Sequences → spells with start/end times (`exit_time` mode).
2. Duration, timing (12-unit bins, start + end), and sequencing features are built.
3. Outcome is residualized on controls (OLS).
4. Boruta selects all-relevant features on the residualized outcome.
5. Confirmed features are in `selected_*`; weaker positives in `tentative_*`.

If Boruta confirms zero features, the pipeline raises `RuntimeError`: try relaxing `sequencing_min_support` or Boruta settings via a custom `config`.

## Step 7: Summarize Selected Features

```python
summary = interpret_selected_features(result)
print(summary.head(15))
```

Columns: `feature`, `index`, and `hit_count` when the Boruta backend exposes it. With BorutaPy, `hit_count` is usually empty (`None`). That is expected. Use `result["boruta_ranking"]`, `result["selected_feature_names"]`, and `result["tentative_feature_names"]` for diagnostics.

## Step 8: Cluster Correlated Features

Unterlerchner et al. (2023) group redundant Boruta features before interpretation. Here, selected features are grouped by hierarchical clustering on `1 - |corr|`; `abs_corr_threshold=0.7` controls how strongly features must be correlated to be merged. Each cluster gets a representative feature.

```python
clusters = cluster_correlated_features(
    result["X_selected"],
    result["selected_feature_names"],
    abs_corr_threshold=0.7,
)

print(clusters[["feature", "cluster_id", "representative_feature"]].head(20))
```

Use `representative_feature` per cluster when you move to substantive interpretation or a final regression: not every confirmed column at once.

## Step 9: Optional Exploratory Final Model

The paper’s main interpretive step is feature selection + clustering, not an automatic pipeline regression. If you want a quick exploratory fit:

```python
result_explore = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=outcome,
    controls=controls,
    preset="unterlerchner2023",
    fit_final_model=True,
)

print("R2:", result_explore.get("r2"))
print("BIC:", result_explore.get("bic"))
```

Prefer clustering representatives first for analysis that follows the published workflow.

## Step 10: Optional Typology Validation (`clustassoc`)

If your design includes sequence clustering and you need to check whether typologies account for a covariate–sequence association, use [`clustassoc_like_typology_validation()`](./clustassoc-like-typology-validation.md) with a distance matrix and cluster labels at several `k` values. This step is separate from the Boruta pipeline above.

```python
from sequenzo import clustassoc_like_typology_validation

# distance_matrix: n x n; covariate_of_interest: length-n vector aligned with diss rows
# labels_k3, labels_k5: length-n cluster label vectors
validation = clustassoc_like_typology_validation(
    diss=distance_matrix,
    covariate=covariate_of_interest,
    clustering_labels_by_k={3: labels_k3, 5: labels_k5},
    covariate_is_categorical=True,
)
print(validation)
```

## Checklist: Paper Logic vs This Demo

| Step | Unterlerchner (2023) | This walkthrough |
| --- | --- | --- |
| Data | TREE educational sequences | `pairfam_activity_by_month` (employment activity, ages 18–40) |
| Time grid | Monthly month indices | Monthly columns `1 … 264` |
| Settings bundle | Custom R parameterization | `preset="unterlerchner2023"` |
| Outcome | Income (often log) | `yeduc` (years of education) |
| Controls | Paper covariates | `sex`, `east`, `highschool` |
| Selection | Boruta on residualized outcome | Same workflow via BorutaPy |
| Interpretation | Correlation clustering | `cluster_correlated_features()` |
| Final regression | Manual on representatives | Off by default (`fit_final_model=False`) |

## Practical Notes

- This tutorial uses built-in pairfam month-level data so the code runs without external files. Unterlerchner et al. (2023) used Swiss TREE data, which is not bundled with Sequenzo.
- The monthly pairfam grid matches the timing assumptions of `preset="unterlerchner2023"`; substantive results still differ from the paper because the domain and outcome are not the same.
- Boruta confirmed features may differ from R `Boruta::Boruta()` with default settings because Sequenzo uses the Python BorutaPy backend. See [Conceptual Guide: Boruta Python vs R](./conceptual-guide.md#boruta-python-vs-r).
- `time_unit_hint="month"` is metadata only. The `unterlerchner2023` settings bundle also sets `timing_bin_width=12.0`, which is appropriate for this monthly grid.
- For binary outcomes with binomial residualization, pass `problem_type="classification"`.
- See [Things to keep in mind](./conceptual-guide.md#things-to-keep-in-mind) for additional usage tips.

## Next Steps

- [Introduction](./introduction.md): module overview and list of functions
- [`extract_sequence_features()`](./extract-sequence-features.md): extraction-only functions
- [`run_feature_extraction_and_selection_pipeline()`](./run-feature-extraction-and-selection-pipeline.md): full pipeline parameters
- [Conceptual Guide](./conceptual-guide.md): duration, timing, sequencing, residualization

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. *Swiss Journal of Sociology*, 49(2), 417-446.
