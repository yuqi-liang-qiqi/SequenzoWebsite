# `get_kob_decomposition()`

`get_kob_decomposition()` performs a **twofold Kitagawa–Oaxaca–Blinder (KOB)** decomposition of a mean outcome gap between two groups. It splits the gap into a composition (**explained**) part and coefficient (**unexplained returns**) part, plus an intercept component.

Positive `total_gap` means `group0` has a higher mean outcome than `group1`. Control the mapping with `group0_value` and `group1_value`.

## Function Usage

```python
get_kob_decomposition(
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

## Reference Coefficients

| `reference` | Meaning |
| --- | --- |
| `"group0"` | Use group 0 coefficients when owner is `-1` |
| `"group1"` | Use group 1 coefficients when owner is `-1` |
| `"pooled"` | Use coefficients from pooled OLS without a group indicator when owner is `-1` |

These choices correspond to common twofold decomposition references (Jann, 2008). SA–KOB uses them as fallbacks for non-cluster controls and unspecified owners, and adds cluster-specific owners for Rowold et al.'s option III via `owner_by_category_by_term`. For manual category-level references in generic KOB, set `normalize_categorical=True` and pass `owner_by_category_by_term`; see [`get_sa_kob_decomposition()`](./get-sa-kob-decomposition).

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `y` | ✓ | `np.ndarray` | 1D continuous outcome. |
| `group` | ✓ | `np.ndarray` | Binary grouping variable (exactly two values). |
| `X` | ✓ | `np.ndarray` | 2D design matrix, one row per observation. |
| `variable_names` | ✗ | `list[str]` | Column labels for reporting. Default: `X1`, `X2`, … |
| `term_ids` | ✗ | `array-like` | Group columns into terms (e.g., all dummies of one factor share an id). Default: one term per column. |
| `reference` | ✗ | `str` | `"group0"`, `"group1"`, or `"pooled"`. Default: `"group0"`. |
| `coefficient_owner_by_column` | ✗ | `array-like` | Per-column owner: `0`, `1`, or `-1` (use `reference`). |
| `majority_owner` | ✗ | `array-like` | Deprecated. Per-term owners expanded to columns. |
| `group0_value` | ✗ | any | Label treated as group 0. |
| `group1_value` | ✗ | any | Label treated as group 1. |
| `normalize_categorical` | ✗ | `bool` | Yun-normalized category contributions. Default: `False`. |
| `categorical_terms` | ✗ | `list[int]` | Which `term_id` values are categorical. If omitted and `normalize_categorical=True`, Sequenzo treats terms with more than one column as categorical; pass this explicitly when using non-dummy multi-column terms. |
| `category_ids` | ✗ | `array-like` | Internal category id per column. |
| `n_categories_by_term` | ✗ | `dict` | Total categories per term (including omitted baseline). |
| `owner_by_category_by_term` | ✗ | `dict` | Per-category coefficient owners for categorical terms. |
| `drop_missing` | ✗ | `bool` | Drop rows with non-finite `y` or `X`. Default: `False`. |

## Returns

A `KOBDecompositionResult`:

| Field | Type | Description |
| --- | --- | --- |
| `total_gap` | `float` | `group0_mean - group1_mean` |
| `explained` | `float` | Composition effect |
| `unexplained_returns` | `float` | Returns / coefficient effect |
| `unexplained_intercept` | `float` | Intercept difference |
| `by_column` | `pd.DataFrame` | Explained and returns per column |
| `by_term` | `pd.DataFrame` | Aggregated contributions by `term_id` |
| `by_category` | `pd.DataFrame` | Category detail when `normalize_categorical=True` |
| `group0_mean`, `group1_mean` | `float` | Outcome means |
| `group0_label`, `group1_label` | any | Resolved labels |
| `gap_direction` | `str` | e.g. `"men minus women"` |
| `diagnostics` | `dict` | OLS diagnostics and normalization notes |

`by_variable` is an alias for `by_column`.

## Examples

### Step 1: Prepare data

```python
from sequenzo import load_dataset

df = load_dataset("mvad")
y = df["funemp"].to_numpy()  # example numeric outcome
group = df["male"].map({0: "women", 1: "men"}).to_numpy()
X = df[["fmpr", "emp97"]].to_numpy()
```

### Step 2: Fit KOB decomposition

```python
from sequenzo.decomposition import get_kob_decomposition

result = get_kob_decomposition(
    y=y,
    group=group,
    X=X,
    variable_names=["fmpr", "emp97"],
    group0_value="men",
    group1_value="women",
    reference="group0",
)
```

### Step 3: Read components

```python
print(result.gap_direction)
print(f"Total gap:    {result.total_gap:.4f}")
print(f"Explained:    {result.explained:.4f}")
print(f"Returns:      {result.unexplained_returns:.4f}")
print(f"Intercept:    {result.unexplained_intercept:.4f}")
print(result.by_column)
```

### Step 4 (optional): Categorical dummies with normalization

```python
import pandas as pd

dummies = pd.get_dummies(df["emp97"], prefix="emp", drop_first=True)
X_cat = dummies.to_numpy()
term_ids = [0] * X_cat.shape[1]

result_cat = get_kob_decomposition(
    y=y,
    group=group,
    X=X_cat,
    variable_names=list(dummies.columns),
    term_ids=term_ids,
    normalize_categorical=True,
    categorical_terms=[0],
    n_categories_by_term={0: df["emp97"].nunique()},
    group0_value="men",
    group1_value="women",
)
print(result_cat.by_category)
```

## R / Stata Counterparts

- **Closest R approach:** `oaxaca` package (twofold decomposition)
- **Mapping note:** Sequenzo follows the standard twofold decomposition setup discussed by Jann (2008), using separate group-specific OLS fits and an explicit reference-coefficient vector.

## Notes

- `group` must have exactly two distinct values.
- Provide both `group0_value` and `group1_value`, or neither.
- `by_category` is empty unless `normalize_categorical=True`.
- Scalar totals keep the raw twofold identity; normalized category tables may sum differently in mixed-reference settings.
- With `normalize_categorical=True` and omitted `categorical_terms`, Sequenzo auto-detects multi-column terms and emits a warning; pass `categorical_terms` explicitly for non-dummy multi-column terms.
- For bootstrap uncertainty, use [`get_kob_decomposition_bootstrap()`](./get-kob-decomposition-bootstrap).

## See Also

- [Section overview](/en/decomposition/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Jann, B. (2008). The Blinder–Oaxaca decomposition for linear regression models. *The Stata Journal*, 8(4), 453–479.

Rowold, C., Struffolino, E., & Fasang, A. E. (2025). Life-course-sensitive analysis of group inequalities: Combining sequence analysis with the Kitagawa–Oaxaca–Blinder decomposition. *Sociological Methods & Research*, 54(2), 646–705.
