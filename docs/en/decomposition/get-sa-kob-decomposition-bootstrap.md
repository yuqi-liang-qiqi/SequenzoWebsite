# `get_sa_kob_decomposition_bootstrap()`

`get_sa_kob_decomposition_bootstrap()` adds **bootstrap uncertainty** to [`get_sa_kob_decomposition()`](./get-sa-kob-decomposition). It returns percentile confidence intervals and standard errors for the total gap, aggregate components, and **per-cluster** explained and returns contributions.

## Function Usage

```python
get_sa_kob_decomposition_bootstrap(
    y,
    group,
    cluster_labels,
    X_controls=None,
    control_variable_names=None,
    k=None,
    categories=None,
    reference_category_index=None,
    reference_cluster_label=None,
    reference_cluster=None,
    cluster_coefficient_reference="majority",
    majority_gap_threshold=50.0,
    neutral_cluster_owner=0,
    cluster_owner_overrides=None,
    group0_value=None,
    group1_value=None,
    fallback_reference="group0",
    normalize_categorical=True,
    drop_missing=False,
    silhouette=None,
    silhouette_threshold=None,
    warn_common_support=False,
    min_group_count_per_cluster=1,
    cluster_name_prefix="cluster_",
    n_boot=500,
    random_state=None,
    confidence_level=0.95,
    recompute_owners_each_draw=True,
    stratified=True,
)
```

## Entry Parameters

All parameters from [`get_sa_kob_decomposition()`](./get-sa-kob-decomposition) apply, including:

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `cluster_coefficient_reference` | ✗ | `str` | `"majority"`, `"group0"`, `"group1"`, or `"pooled"`. Same options as the point-estimate function; bootstrap redraws owners each draw when `recompute_owners_each_draw=True`. |
| `neutral_cluster_owner` | ✗ | `int` / `None` | `0`, `1`, or `None` to route neutral clusters through `fallback_reference`. Default: `0`. |
| `fallback_reference` | ✗ | `str` | `"group0"`, `"group1"`, or `"pooled"`. Automatically set to `"pooled"` when `cluster_coefficient_reference="pooled"`. |

Plus bootstrap-specific parameters:

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `n_boot` | ✗ | `int` | Bootstrap draws. Must be ≥ 2. Default: `500`. |
| `random_state` | ✗ | `int` | RNG seed. |
| `confidence_level` | ✗ | `float` | CI coverage in `(0, 1)`. Default: `0.95`. |
| `recompute_owners_each_draw` | ✗ | `bool` | Re-run owner assignment each draw (`majority`, `pooled`, etc.). Default: `True`. |
| `stratified` | ✗ | `bool` | Stratified resampling by group. Default: `True`. |

`warn_common_support` defaults to `False` during bootstrap to avoid repeated warnings.

See the [SA–KOB page](./get-sa-kob-decomposition) for the full parameter table (`y`, `group`, `cluster_labels`, `k`, silhouette filtering, …).

## What It Returns

A `SAKOBBootstrapResult`:

| Field | Type | Description |
| --- | --- | --- |
| `point_estimate` | `SAKOBDecompositionResult` | Full-sample SA–KOB result |
| `standard_errors` | `dict` | SE for scalar gap components |
| `confidence_intervals` | `dict` | Percentile CIs for scalar components |
| `by_cluster_standard_errors` | `pd.DataFrame` | `by_cluster` plus `explained_se`, `returns_se` |
| `by_cluster_confidence_intervals` | `pd.DataFrame` | `by_cluster` plus CI columns |
| `n_boot` | `int` | Number of draws |
| `confidence_level` | `float` | CI level |
| `recompute_owners_each_draw` | `bool` | Whether owners were recomputed each draw |

## Examples

### Step 1: Point estimate

```python
from sequenzo.decomposition import get_sa_kob_decomposition

point = get_sa_kob_decomposition(
    y=y,
    group=group,
    cluster_labels=cluster_labels,
    k=8,
    group0_value="men",
    group1_value="women",
)
print(point.by_cluster[["cluster", "explained", "returns"]])
```

### Step 2: Bootstrap

```python
from sequenzo.decomposition import get_sa_kob_decomposition_bootstrap

boot = get_sa_kob_decomposition_bootstrap(
    y=y,
    group=group,
    cluster_labels=cluster_labels,
    k=8,
    group0_value="men",
    group1_value="women",
    n_boot=500,
    random_state=42,
    recompute_owners_each_draw=True,
    stratified=True,
)
```

### Step 3: Cluster-level intervals

```python
ci = boot.by_cluster_confidence_intervals
cols = [
    "cluster",
    "explained",
    "explained_ci_lower",
    "explained_ci_upper",
    "returns",
    "returns_ci_lower",
    "returns_ci_upper",
]
print(ci[cols])
```

### Step 4: Scalar gap uncertainty

```python
lo, hi = boot.confidence_intervals["explained"]
print(f"Explained: {boot.point_estimate.explained:.4f} [{lo:.4f}, {hi:.4f}]")
```

## Notes

- Bootstrap fixes the **category universe** from the point estimate (`k` and `categories`) so rare clusters still produce valid dummies when absent from a resample.
- With `recompute_owners_each_draw=False`, coefficient owners are frozen from the point estimate; faster but ignores owner uncertainty.
- Stratified bootstrap keeps original group sizes per draw.
- For generic (non-cluster) KOB bootstrap, use [`get_kob_decomposition_bootstrap()`](./get-kob-decomposition-bootstrap).

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Rowold, C., Struffolino, E., & Fasang, A. E. (2025). Life-course-sensitive analysis of group inequalities: Combining sequence analysis with the Kitagawa–Oaxaca–Blinder decomposition. *Sociological Methods & Research*, 54(2), 646–705.

Efron, B., & Tibshirani, R. J. (1993). *An Introduction to the Bootstrap*. Chapman & Hall/CRC.