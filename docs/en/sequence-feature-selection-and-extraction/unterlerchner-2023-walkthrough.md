# Tutorial: Linking Life Trajectories to an Outcome with FES

This tutorial shows how to go from life-course sequences to a smaller set of interpretable features that are associated with an outcome, following the workflow in Unterlerchner, Studer, and Gomensoro (2023). You will:

1. Prepare `SequenceData`, an outcome, and control covariates.
2. Load a named settings bundle, called a `preset` in the API (paper-style defaults in one argument).
3. Optionally extract features before selection.
4. Run the full pipeline (extract → residualize → Boruta).
5. Summarize and cluster selected features for interpretation.

The example uses a built-in Sequenzo dataset so it runs without external files. The original paper uses Swiss TREE educational data (access required). Swap in your own `seqdata`, `outcome`, and `controls` when you have them.

::: warning Mechanics demo vs full replication
This page walks through how to call each function in order. The built-in `dyadic_children` sample may not use a monthly time grid. The settings bundle below still runs, but 12-unit timing bins are not automatically “twelve calendar months” unless `seqdata.time` is monthly (e.g. month indices `1 … T`). For a true Unterlerchner-style analysis, use monthly TREE-style data or set `timing_bin_width` to match your time labels.
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

List built-in datasets, then load one with a numeric time grid:

```python
print(list_datasets())

df = load_dataset("dyadic_children")
time_cols = sorted([c for c in df.columns if str(c).isdigit()], key=int)
```

For a quick run, use a subset. With TREE or another full sample, skip the `head()` line.

```python
df_small = df.head(300).copy()
states = sorted(pd.unique(df_small[time_cols].values.ravel()))
states = [s for s in states if pd.notna(s)]

seqdata = SequenceData(df_small, time=time_cols, states=states)
print(seqdata)
```

Your own data: one row per person, one column per time point, plus a defined state alphabet. With monthly grids (month indices `1 … T`), `timing_bin_width=12.0` means twelve months per bin. With yearly age labels, use `timing_bin_width=1.0` instead.

The example below is meant to show you how to run the pipeline on sample data, not to replicate Unterlerchner (2023) on `dyadic_children`. If that dataset is not on a monthly grid, the preset will still run; just do not read twelve-unit timing bins as calendar years.

## Step 3: Define Outcome and Controls

The paper regresses income on trajectory features after residualizing on controls. Here we use a synthetic continuous outcome so the code runs out of the box. Replace with your real variables.

```python
rng = np.random.default_rng(42)
outcome = rng.normal(loc=5000, scale=1200, size=seqdata.n_sequences)

controls = pd.DataFrame({
    "sex": rng.integers(0, 2, size=seqdata.n_sequences),
    "track": rng.integers(0, 3, size=seqdata.n_sequences),
})
```

With TREE-style data, `outcome` might be log income and `controls` might include sex, parental education, etc. Row order must match `seqdata` rows.

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
| Data | TREE educational sequences | Built-in `dyadic_children` (replace with your data) |
| Time grid | Monthly month indices | Numeric columns from `dyadic_children` (may not be monthly) |
| Settings bundle | Custom R parameterization | `preset="unterlerchner2023"` |
| Outcome | Income (often log) | Synthetic Gaussian demo |
| Selection | Boruta on residualized outcome | Same workflow via BorutaPy |
| Interpretation | Correlation clustering | `cluster_correlated_features()` |
| Final regression | Manual on representatives | Off by default (`fit_final_model=False`) |

## Practical Notes

- This tutorial uses built-in demo data so that the code can run without external files. The original Unterlerchner et al. (2023) study used Swiss TREE educational trajectory data, which is not bundled with Sequenzo because access to TREE data is managed separately by the TREE team.
- The built-in demo data may not use a monthly time grid. The tutorial is therefore meant to demonstrate the API workflow, not to reproduce the empirical results of the paper.
- Boruta confirmed features may differ from R `Boruta()` with default settings because Sequenzo uses the Python BorutaPy backend. See [Conceptual Guide: Boruta Python vs R](./conceptual-guide.md#boruta-python-vs-r).
- `time_unit_hint="month"` is metadata only. The `unterlerchner2023` settings bundle also sets `timing_bin_width=12.0`, which is appropriate only when the time labels are monthly units.
- For binary outcomes with binomial residualization, pass `problem_type="classification"`.
- See [Things to keep in mind](./conceptual-guide.md#things-to-keep-in-mind-things-to-keep-in-mind) for additional usage tips.

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
