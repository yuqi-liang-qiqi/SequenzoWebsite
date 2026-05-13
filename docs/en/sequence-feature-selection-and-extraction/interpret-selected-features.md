# Interpret Selected Features

After Boruta selection, use `interpret_selected_features()` to summarize confirmed features and `cluster_correlated_features()` to group redundant ones before final interpretation (Unterlerchner et al. 2023).

## `interpret_selected_features()`

Builds a ranked table of confirmed features from a selection result dict (from `select_relevant_features()` or `run_feature_extraction_and_selection_pipeline()`).

### Function Usage

```python
interpret_selected_features(selection_result)
```

### Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `selection_result` | ✓ | `dict` | Dict with `selected_feature_names`, `selected_indices`, and optionally `hit_counts` / `selected_mask`. |

### What It Returns

A `DataFrame` sorted by `hit_count` (descending, when available), then `feature` (ascending), with columns:

| Column | Description |
| --- | --- |
| `feature` | Feature name. |
| `index` | Column index in the original `X` matrix. |
| `hit_count` | Boruta hit count vs shadows when the backend exposes it; usually `None` with BorutaPy. |

With BorutaPy, `hit_count` is usually `None`—this is expected, not a bug. Use `boruta_ranking`, `selected_*`, and `tentative_*` from the selection result for diagnostics.

### Example

```python
from sequenzo import (
    run_feature_extraction_and_selection_pipeline,
    interpret_selected_features,
)

result = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=outcome,
    controls=controls,
    preset="unterlerchner2023",
)

summary = interpret_selected_features(result)
print(summary)
```

---

## `cluster_correlated_features()`

Groups selected features by hierarchical clustering on distance `1 - |corr|`. Features with absolute Pearson correlation at or above `abs_corr_threshold` are merged into the same cluster.

### Function Usage

```python
cluster_correlated_features(
    X,
    feature_names,
    *,
    abs_corr_threshold=0.7,
)
```

### Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `X` | ✓ | `ndarray` / `DataFrame` | Matrix of **selected** features only (`n` × `p_selected`). |
| `feature_names` | ✓ | sequence | Names matching columns of `X`. |
| `abs_corr_threshold` | ✗ | `float` | Merge features with \|corr\| ≥ threshold (default `0.7`). |

### What It Returns

A `DataFrame` with columns:

| Column | Description |
| --- | --- |
| `feature` | Feature name. |
| `cluster_id` | Cluster assignment (0-based). |
| `mean_abs_corr_with_cluster` | Mean absolute correlation with other cluster members. |
| `representative_feature` | Feature chosen as cluster representative (highest mean link within cluster). |

Sorted by `cluster_id`, then `mean_abs_corr_with_cluster` (descending), then `feature`.

### Example

```python
from sequenzo import (
    run_feature_extraction_and_selection_pipeline,
    cluster_correlated_features,
)

result = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=outcome,
    controls=controls,
    preset="unterlerchner2023",
)

clusters = cluster_correlated_features(
    result["X_selected"],
    result["selected_feature_names"],
    abs_corr_threshold=0.7,
)

print(clusters[["feature", "cluster_id", "representative_feature"]])
```

## R / Literature Mapping

| Sequenzo | Literature |
| --- | --- |
| `cluster_correlated_features()` | Unterlerchner et al. (2023) correlation clustering before interpretation |
| `interpret_selected_features()` | Post-Boruta summary (no direct R function) |

## Notes

- Pass **selected** features only to `cluster_correlated_features()`—typically `result["X_selected"]` and `result["selected_feature_names"]`.
- With BorutaPy, `interpret_selected_features()` may list `hit_count` as empty for every row; sort by `boruta_ranking` in the original selection result if you need a strength ordering.
- Average linkage on `1 - |corr|`; distance criterion `t = 1 - abs_corr_threshold`.
- Empty input (`p = 0`) returns an empty DataFrame with the expected columns.
- Single-feature input returns one row with `cluster_id = 0`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. Swiss journal of sociology, 49(2), 417-446.
