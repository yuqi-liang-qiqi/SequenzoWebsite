# `get_kob_decomposition_bootstrap()`

`get_kob_decomposition_bootstrap()` wraps [`get_kob_decomposition()`](./get-kob-decomposition) with bootstrap resampling to obtain standard errors and percentile confidence intervals for the total gap and its components.

By default, resampling is stratified by group so each bootstrap draw keeps the original group sizes.

## Function Usage

```python
get_kob_decomposition_bootstrap(
    y,
    group,
    X,
    variable_names=None,
    term_ids=None,
    reference="group0",
    majority_owner=None,
    coefficient_owner_by_column=None,
    group0_value=None,
    group1_value=None,
    normalize_categorical=False,
    categorical_terms=None,
    category_ids=None,
    n_categories_by_term=None,
    owner_by_category_by_term=None,
    drop_missing=False,
    n_boot=500,
    random_state=None,
    confidence_level=0.95,
    stratified=True,
)
```

## Entry Parameters

All parameters from `get_kob_decomposition()` apply, plus:

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `n_boot` | ✗ | `int` | Number of bootstrap draws. Must be ≥ 2. Default: `500`. |
| `random_state` | ✗ | `int` | Seed for `numpy.random.Generator`. |
| `confidence_level` | ✗ | `float` | CI coverage in `(0, 1)`. Default: `0.95`. |
| `stratified` | ✗ | `bool` | Resample within each group separately. Default: `True`. |

See the [KOB page](./get-kob-decomposition) for `y`, `group`, `X`, and reference parameters.

## What It Returns

A `KOBBootstrapResult`:

| Field | Type | Description |
| --- | --- | --- |
| `point_estimate` | `KOBDecompositionResult` | Decomposition on the full sample |
| `standard_errors` | `dict` | SE for `total_gap`, `explained`, `unexplained_returns`, `unexplained_intercept` |
| `confidence_intervals` | `dict` | Percentile CIs for the same scalars |
| `by_column_standard_errors` | `pd.DataFrame` | SE per column for explained and returns |
| `by_column_confidence_intervals` | `pd.DataFrame` | CI per column |
| `by_term_standard_errors` | `pd.DataFrame` | SE per term |
| `by_term_confidence_intervals` | `pd.DataFrame` | CI per term |
| `n_boot` | `int` | Draws used |
| `confidence_level` | `float` | CI level |

## Examples

### Step 1: Point decomposition (optional preview)

```python
from sequenzo.decomposition import get_kob_decomposition

point = get_kob_decomposition(
    y=y,
    group=group,
    X=X,
    group0_value="men",
    group1_value="women",
)
print(point.explained)
```

### Step 2: Bootstrap

```python
from sequenzo.decomposition import get_kob_decomposition_bootstrap

boot = get_kob_decomposition_bootstrap(
    y=y,
    group=group,
    X=X,
    group0_value="men",
    group1_value="women",
    n_boot=500,
    random_state=42,
    confidence_level=0.95,
    stratified=True,
)
```

### Step 3: Report uncertainty

```python
se = boot.standard_errors["explained"]
lo, hi = boot.confidence_intervals["explained"]
print(f"Explained: {boot.point_estimate.explained:.4f} [{lo:.4f}, {hi:.4f}], SE={se:.4f}")

print(boot.by_column_confidence_intervals.head())
```

## Notes

- Stratified bootstrap requires both groups to be non-empty.
- With `stratified=False`, draws are simple row resamples of the full data.
- Bootstrap recomputes the full decomposition on each draw, including categorical normalization settings.
- For sequence-cluster typologies, prefer [`get_sa_kob_decomposition_bootstrap()`](./get-sa-kob-decomposition-bootstrap).

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Jann, B. (2008). The Blinder–Oaxaca decomposition for linear regression models. *The Stata Journal*, 8(4), 453–479.

Efron, B., & Tibshirani, R. J. (1993). *An Introduction to the Bootstrap*. Chapman & Hall/CRC.