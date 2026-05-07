# `get_oaxaca_blinder_decomposition()`

This is the full-control decomposition backend behind `get_kob_decomposition()`.
Use it when you need explicit control over reference-coefficient construction.

## Function Usage

```python
get_oaxaca_blinder_decomposition(y=y, group=group, X=X)
```

Advanced usage:

```python
get_oaxaca_blinder_decomposition(
    y=y,
    group=group,
    X=X,
    term_ids=term_ids,
    reference="pooled",
    majority_owner=majority_owner,
)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `y` | ✓ | array-like | - | numeric outcome | Continuous outcome variable. |
| `group` | ✓ | array-like | - | exactly 2 groups | Two-group indicator. |
| `X` | ✓ | ndarray/DataFrame | - | n x p | Covariate matrix. |
| `variable_names` | ✗ | list[str] | `None` | length = p | Optional labels for X columns. |
| `term_ids` | ✗ | list[int] | `None` | length = p | Groups coefficients into conceptual terms. |
| `reference` | ✗ | str | `"group0"` | `"group0"`, `"group1"`, `"pooled"` | Global reference rule. |
| `majority_owner` | ✗ | list[int] | `None` | one per term | Term-level reference override. |

## What It Does

- Fits OLS models separately by group (and pooled when requested).
- Constructs a reference coefficient vector (`beta*`).
- Computes explained and unexplained decomposition components.
- Returns aggregate and variable-level breakdown.

## Notes and Tips

- `term_ids` is useful for grouped categorical blocks (e.g., cluster dummies).
- `majority_owner` enables variable-specific reference logic.
- Start with `get_kob_decomposition()` unless you need this level of control.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import get_oaxaca_blinder_decomposition
res = get_oaxaca_blinder_decomposition(y=y, group=group, X=X)
```

### 2) Standard

```python
res = get_oaxaca_blinder_decomposition(
    y=y,
    group=group,
    X=X,
    reference="group0",
)
print(res.total_gap, res.explained)
```

### 3) Advanced (pooled + term ownership)

```python
res = get_oaxaca_blinder_decomposition(
    y=y,
    group=group,
    X=X,
    reference="pooled",
    term_ids=term_ids,
    majority_owner=majority_owner,
)
```

### 4) Common pitfall

```python
# Wrong: variable_names length must match number of X columns
# get_oaxaca_blinder_decomposition(y, group, X, variable_names=["a", "b"])
```

## TraMineR Mapping

- **Closest R counterpart:** none in TraMineR core.
- **Mapping note:** statistical decomposition layer used with sequence-derived covariates.

## References

Rowold, C., Struffolino, E., & Fasang, A. E. (2025). Life-course-sensitive analysis of group inequalities: Combining sequence analysis with the Kitagawa–Oaxaca–blinder decomposition. Sociological Methods & Research, 54(2), 646-705.

## Key Features

- Full control over reference-coefficient construction.
- Variable-level and total decomposition outputs.
- Explicit term-wise modeling support.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang
