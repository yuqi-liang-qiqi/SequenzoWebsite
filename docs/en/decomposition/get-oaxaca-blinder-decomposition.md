# `get_oaxaca_blinder_decomposition()`

`get_oaxaca_blinder_decomposition()` is the **low-level twofold decomposition engine** in Sequenzo. It fits separate OLS models in each group and returns explained and unexplained components plus detailed contribution tables.

Most users should call [`get_kob_decomposition()`](./get-kob-decomposition) instead. The two names point to the same implementation.

Use this name when you want terminology closer to the Oaxaca–Blinder literature; use `get_kob_decomposition()` when working with the broader Kitagawa–Oaxaca–Blinder framing used in this module.

## Function Usage

```python
get_oaxaca_blinder_decomposition(
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
)
```

## Parameter Notes

This function accepts the same arguments as `get_kob_decomposition()`. See the [KOB page](./get-kob-decomposition) for the full parameter table and examples.

Differences worth noting at the engine level:

- `majority_owner` is deprecated; prefer `coefficient_owner_by_column`.
- When `normalize_categorical=True`, categorical terms use Yun normalization and populate `by_category`.
- `owner_by_category_by_term` implements cluster-specific reference coefficients (Rowold et al., option III).

## Returns

A `KOBDecompositionResult` with:

| Field | Type | Description |
| --- | --- | --- |
| `total_gap` | `float` | `group0_mean - group1_mean` |
| `explained` | `float` | Composition / endowment component |
| `unexplained_returns` | `float` | Coefficient / returns component |
| `unexplained_intercept` | `float` | Intercept difference |
| `by_column` | `pd.DataFrame` | Per-column explained and returns |
| `by_term` | `pd.DataFrame` | Aggregated by `term_id` |
| `by_category` | `pd.DataFrame` | Category-level detail when normalized |
| `group0_mean`, `group1_mean` | `float` | Group means of `y` |
| `group0_label`, `group1_label` | any | Resolved group labels |
| `gap_direction` | `str` | Human-readable gap definition |
| `diagnostics` | `dict` | OLS rank, reference mode, normalization notes |

## Examples

### Step 1: Prepare arrays

```python
import numpy as np
import pandas as pd

y = df["income"].to_numpy()
group = df["sex"].to_numpy()
X = df[["age", "edu_years"]].to_numpy()
```

### Step 2: Call the engine

```python
from sequenzo.decomposition import get_oaxaca_blinder_decomposition

result = get_oaxaca_blinder_decomposition(
    y=y,
    group=group,
    X=X,
    variable_names=["age", "edu_years"],
    reference="group0",
    group0_value="men",
    group1_value="women",
)
```

### Step 3: Summarize

```python
print(result.gap_direction)
print(result.total_gap, result.explained, result.unexplained_returns)
print(result.by_column)
```

## Notes

- `group` must contain exactly two distinct values.
- Provide both `group0_value` and `group1_value`, or neither (labels are taken from sorted unique values).
- Positive `total_gap` means `group0` has the higher mean outcome.
- With `reference="pooled"`, reference coefficients come from OLS on the pooled sample without a group indicator.
- Scalar `explained` and `unexplained_returns` always satisfy the twofold identity; normalized `by_category` sums may differ slightly.

## See Also

- [Section overview](/en/decomposition/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Blinder, A. S. (1973). Wage discrimination: Reduced form and structural estimates. *Journal of Human Resources*, 8(4), 436–455.

Oaxaca, R. (1973). Male–female wage differentials in urban labor markets. *International Economic Review*, 14(3), 693–709.

Kitagawa, E. M. (1955). Components of a difference between two rates. *Journal of the American Statistical Association*, 50(272), 1168–1194.

Jann, B. (2008). The Blinder–Oaxaca decomposition for linear regression models. *The Stata Journal*, 8(4), 453–479.
