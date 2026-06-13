# `get_sa_kob_decomposition()`

`get_sa_kob_decomposition()` combines **sequence-analysis cluster typologies** with **KOB decomposition** (Rowold, Struffolino, and Fasang, 2025). You pass cluster labels; Sequenzo builds regression dummies, applies a practical majority-rule implementation of option III, and returns cluster-level explained and returns contributions for all `k` clusters.

Read the [conceptual guide](./sa-kob-conceptual-guide) for workflow and interpretation before running this function.

## Function Usage

```python
get_sa_kob_decomposition(
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
    warn_common_support=True,
    min_group_count_per_cluster=1,
    cluster_name_prefix="cluster_",
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `y` | ✓ | `np.ndarray` | 1D continuous outcome. |
| `group` | ✓ | `np.ndarray` | Binary grouping variable. |
| `cluster_labels` | ✓ | `np.ndarray` | 1D cluster assignment per person. |
| `X_controls` | ✗ | `np.ndarray` | Extra covariates (non-cluster controls). |
| `control_variable_names` | ✗ | `list[str]` | Names for control columns. |
| `k` | ✗ | `int` | Number of clusters. Inferred from unique labels when omitted. |
| `categories` | ✗ | `sequence` | Fixed cluster label universe (`0 .. k-1` internally). |
| `reference_category_index` | ✗ | `int` | Baseline cluster index in `categories`. Default: `0`. |
| `reference_cluster_label` | ✗ | any | Baseline cluster by original label. |
| `reference_cluster` | ✗ | `int` | Deprecated alias for `reference_category_index`. |
| `cluster_coefficient_reference` | ✗ | `str` | `"majority"`, `"group0"`, `"group1"`, or `"pooled"`. Default: `"majority"`. `"majority"` implements the cluster-specific reference strategy discussed by Rowold et al.; `"pooled"` implements pooled reference coefficients (option II). |
| `majority_gap_threshold` | ✗ | `float` | Row-share gap (%) to assign a group-specific owner. Default: `50.0`. |
| `neutral_cluster_owner` | ✗ | `int` / `None` | Owner for neutral clusters: `0`, `1`, or `None` (use `fallback_reference`). Default: `0`. |
| `cluster_owner_overrides` | ✗ | `dict` | Manual owner per cluster label or category id. |
| `group0_value` | ✗ | any | Group 0 label. |
| `group1_value` | ✗ | any | Group 1 label. |
| `fallback_reference` | ✗ | `str` | KOB fallback for non-cluster controls and owner `-1`: `"group0"`, `"group1"`, or `"pooled"`. Automatically set to `"pooled"` when `cluster_coefficient_reference="pooled"`. |
| `normalize_categorical` | ✗ | `bool` | Must be `True` (required for full `by_cluster` output). |
| `drop_missing` | ✗ | `bool` | Drop non-finite `y`, controls, or silhouette. |
| `silhouette` | ✗ | `np.ndarray` | Per-row silhouette widths for filtering. |
| `silhouette_threshold` | ✗ | `float` | Keep rows with `silhouette >= threshold`. |
| `warn_common_support` | ✗ | `bool` | Warn when a cluster has few members in either group. Default: `True`. |
| `min_group_count_per_cluster` | ✗ | `int` | Threshold for common-support warnings. Default: `1`. |
| `cluster_name_prefix` | ✗ | `str` | Prefix for dummy column names. Default: `"cluster_"`. |

## Returns

A `SAKOBDecompositionResult`:

| Field | Type | Description |
| --- | --- | --- |
| `kob` | `KOBDecompositionResult` | Full generic KOB result |
| `cluster_composition` | `pd.DataFrame` | Cluster-by-group counts and shares |
| `cluster_owners` | `pd.DataFrame` | Coefficient owner per cluster |
| `by_cluster` | `pd.DataFrame` | Explained and returns for all `k` clusters |
| `cluster_covariates` | `ClusterCovariates` | Dummy matrix and metadata |
| `common_support_table` | `pd.DataFrame` | Common-support diagnostics |

Convenience properties mirror `kob` fields (`total_gap`, `explained`, `by_column`, …) plus:

| Property | Description |
| --- | --- |
| `explained_detailed` | Sum of `by_cluster["explained"]` (Yun-normalized) |
| `returns_detailed` | Sum of `by_cluster["returns"]` |
| `explained_difference` | `explained_detailed - explained` |
| `returns_difference` | `returns_detailed - unexplained_returns` |

## Examples

### Step 1: Prepare outcome, group, and cluster labels

Assume `clusters` comes from pooled sequence clustering (see [conceptual guide](./sa-kob-conceptual-guide)).

```python
import numpy as np

y = df["pension_income"].to_numpy()
group = df["sex"].to_numpy()
cluster_labels = df["lc_cluster"].to_numpy()
```

### Step 2: Inspect composition (optional)

```python
from sequenzo.decomposition import cluster_group_composition_table

composition = cluster_group_composition_table(
    group=group,
    cluster_labels=cluster_labels,
    group0_value="men",
    group1_value="women",
)
print(composition)
```

### Step 3: Fit SA–KOB

```python
from sequenzo.decomposition import get_sa_kob_decomposition

result = get_sa_kob_decomposition(
    y=y,
    group=group,
    cluster_labels=cluster_labels,
    k=8,
    reference_category_index=0,
    cluster_coefficient_reference="majority",
    majority_gap_threshold=50.0,
    fallback_reference="group0",
    group0_value="men",
    group1_value="women",
)
```

### Step 4: Summarize gap and cluster contributions

```python
print(f"Total gap:  {result.total_gap:.2f}")
print(f"Explained:  {result.explained:.2f}")
print(f"Returns:    {result.unexplained_returns:.2f}")

print(result.cluster_owners)
print(result.by_cluster[["cluster", "explained", "returns", "is_reference_category"]])
```

### Step 5 (optional): Filter ambiguous cluster memberships

```python
result_filtered = get_sa_kob_decomposition(
    y=y,
    group=group,
    cluster_labels=cluster_labels,
    k=8,
    silhouette=df["silhouette"].to_numpy(),
    silhouette_threshold=0.3,
    group0_value="men",
    group1_value="women",
)
```

Set `drop_missing=True` only when `y`, controls, or silhouette values contain non-finite values.

## Helper Functions

These are exported for advanced workflows; `get_sa_kob_decomposition()` calls them internally.

### `build_cluster_covariates()`

Builds `k-1` cluster dummies and metadata (`ClusterCovariates`).

```python
from sequenzo.decomposition import build_cluster_covariates

cov = build_cluster_covariates(
    cluster_labels,
    k=8,
    reference_category_index=0,
)
cov.X                 # design matrix
cov.column_names      # dummy names
cov.reference_label   # omitted baseline
```

### `detect_cluster_coefficient_owners()`

Implements a practical majority-rule version of option III before decomposition.

```python
from sequenzo.decomposition import detect_cluster_coefficient_owners

owner_table, owners_by_category = detect_cluster_coefficient_owners(
    group,
    cluster_labels,
    k=8,
    category_id_to_label=cov.category_id_to_label,
    group0_value="men",
    group1_value="women",
    majority_gap_threshold=50.0,
)
```

### `cluster_group_composition_table()`

Rowold et al., Table 2 style cluster-by-group table.

## Notes

- Cluster typologies should be built on a **pooled** sample so both groups share the same categories.
- `normalize_categorical` must stay `True`; SA–KOB always reports all `k` clusters in `by_cluster`.
- `cluster_coefficient_reference="majority"` (default) implements option III via a practical majority-rule; `"group0"` / `"group1"` fix all cluster owners to one group (option I); `"pooled"` codes all cluster owners as `-1` and forces `fallback_reference="pooled"` (option II).
- `fallback_reference` applies to non-cluster controls and coefficients whose owner is `-1`. Neutral clusters use `neutral_cluster_owner` (`0`/`1`) by default, or `None` to route through `fallback_reference`.
- Scalar `explained` / `unexplained_returns` keep the twofold identity; `by_cluster` uses Yun-normalized attribution.
- For uncertainty, use [`get_sa_kob_decomposition_bootstrap()`](./get-sa-kob-decomposition-bootstrap).

## See Also

- [Section overview](/en/decomposition/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Rowold, C., Struffolino, E., & Fasang, A. E. (2025). Life-course-sensitive analysis of group inequalities: Combining sequence analysis with the Kitagawa–Oaxaca–Blinder decomposition. *Sociological Methods & Research*, 54(2), 646–705.

Yun, M.-S. (2005). A simple solution to the identification problem in detailed wage decompositions. *Economic Inquiry*, 43(4), 766–772.
