# `get_kob_decomposition()`

This function decomposes a two-group outcome gap into explained and unexplained
components, designed for SA + inequality workflows.

## Function Usage

Minimal usage:

```python
get_kob_decomposition(y=y, group=group, X=X)
```

Common usage:

```python
get_kob_decomposition(
    y=y,
    group=group,
    X=X,
    variable_names=["cluster_A", "cluster_B", "education"],
    reference="pooled",
)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `y` | ✓ | array-like | - | numeric outcome | Continuous outcome variable. |
| `group` | ✓ | array-like | - | exactly 2 groups | Two-group indicator. |
| `X` | ✓ | ndarray/DataFrame | - | n x p | Covariate matrix. |
| `variable_names` | ✗ | list[str] | `None` | length = p | Optional readable covariate names. |
| `term_ids` | ✗ | list[int] | `None` | length = p | Group coefficients by conceptual term. |
| `reference` | ✗ | str | `"group0"` | `"group0"`, `"group1"`, `"pooled"` | Reference coefficient rule. |
| `majority_owner` | ✗ | list[int] | `None` | one per term | Term-wise reference override. |

## What It Does

- Fits group-specific linear models.
- Builds a reference coefficient structure.
- Decomposes mean gap into explained and unexplained parts.
- Returns both totals and by-variable contributions.

## Notes and Tips

- Use sequence-derived typologies (cluster dummies, indicators) inside `X`.
- Keep careful interpretation: unexplained part is not automatically "discrimination".
- For full control of decomposition rules, use `get_oaxaca_blinder_decomposition()`.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import get_kob_decomposition
res = get_kob_decomposition(y=y, group=group, X=X)
```

### 2) Standard (pooled reference)

```python
res = get_kob_decomposition(
    y=income_gap_outcome,
    group=gender,
    X=covariates,
    reference="pooled",
)
print(res.total_gap, res.explained, res.unexplained_returns)
```

### 3) Advanced (term-aware decomposition)

```python
res = get_kob_decomposition(
    y=y,
    group=group,
    X=X,
    term_ids=term_ids,
    majority_owner=majority_owner,
)
```

### 4) Common pitfall

```python
# Wrong: group must contain exactly two distinct values
# get_kob_decomposition(y=y, group=three_groups, X=X)
```

## TraMineR Mapping

- **Closest R counterpart:** no single TraMineR core equivalent.
- **Mapping note:** intended as decomposition layer for sequence-informed inequality analysis.

## References

Rowold, C., Struffolino, E., & Fasang, A. E. (2025). Life-course-sensitive analysis of group inequalities: Combining sequence analysis with the Kitagawa–Oaxaca–blinder decomposition. Sociological Methods & Research, 54(2), 646-705.

## Key Features

- Decomposes total gap into explained/unexplained components.
- Supports term-wise coefficient ownership logic.
- Works naturally with sequence-derived covariates.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang
