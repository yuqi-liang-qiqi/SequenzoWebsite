# `get_group_distance_association()`

This function is the core discrepancy-based group comparison test in Sequenzo.
It checks whether sequences from different groups are systematically different in
their pairwise dissimilarities.

## Function Usage

Minimal usage:

```python
get_group_distance_association(distance_matrix, group)
```

With permutation p-values (recommended for inference):

```python
get_group_distance_association(
    distance_matrix=distance_matrix,
    group=group_labels,
    weights=weights,
    R=999,
    weight_permutation="diss",
)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `distance_matrix` | ✓ | ndarray/DataFrame | - | n x n square matrix | Pairwise dissimilarity matrix between sequences. |
| `group` | ✓ | array-like | - | 2+ groups | Group label for each sequence. |
| `weights` | ✗ | array-like | `None` | non-negative values | Optional case weights. |
| `R` | ✗ | int | `1000` | `0` or `>=2` | Number of permutations. `R<=1` disables permutation p-values. |
| `weight_permutation` | ✗ | str | `"replicate"` (or `"none"` if no weights) | `"replicate"`, `"diss"`, `"group"`, `"none"` | Weighted permutation mode. |
| `squared` | ✗ | bool | `False` | `True` / `False` | If `True`, uses squared dissimilarities. |

## What It Does

- Decomposes total discrepancy into between-group and within-group parts.
- Computes pseudo statistics (`Pseudo F`, `Pseudo R²`).
- Optionally runs permutation tests for significance.
- Returns per-group discrepancy summaries and ANOVA-like diagnostics.

## Notes and Tips

- Start here before tree analysis; it gives the baseline group effect size.
- `Pseudo R²` is an explained-discrepancy ratio (not identical to OLS R² interpretation).
- If weights are present, choose a `weight_permutation` mode explicitly.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import get_group_distance_association
res = get_group_distance_association(distance_matrix=dmat, group=group)
print(res["pseudo_r2"])
```

### 2) Standard (recommended inference)

```python
res = get_group_distance_association(
    distance_matrix=dmat,
    group=group,
    R=999,
    weight_permutation="diss",
)
print(res["pseudo_f"], res["pseudo_f_pval"])
```

### 3) Advanced (weighted + squared sensitivity check)

```python
res_sq = get_group_distance_association(
    distance_matrix=dmat,
    group=group,
    weights=weights,
    R=999,
    weight_permutation="group",
    squared=True,
)
```

### 4) Common pitfall

```python
# Wrong: group length does not match matrix size
# get_group_distance_association(distance_matrix=dmat, group=group[:-1])
```
Make sure `len(group) == distance_matrix.shape[0]`.

## TraMineR Mapping

- **Closest R function:** `dissassoc()`
- **Mapping note:** Direct conceptual and computational counterpart for discrepancy-based association tests.

## Key Features

- Direct discrepancy-based group effect size (`pseudo-R2`).
- Permutation-based significance without strong distribution assumptions.
- Supports weighted and unweighted designs.
- Compatible with downstream tree and position-wise analyses.

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang