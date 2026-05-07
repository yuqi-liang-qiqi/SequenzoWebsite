# Permutation Tests

Permutation tests are the inference backbone for discrepancy-based sequence methods.
They avoid strong distributional assumptions and work directly with distance objects.

## Function Usage

Most users call permutation through higher-level functions. If needed, direct usage:

```python
from sequenzo.group_comparison import get_discrepancy_permutation_test

perm = get_discrepancy_permutation_test(
    distance_matrix=dmat,
    group_int=group_int,
    weights=weights,
    R=999,
    weight_permutation="diss",
)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `distance_matrix` | ✓ | ndarray | - | n x n | Pairwise sequence dissimilarity matrix. |
| `group_int` / `group` | ✓ | array-like | - | labels or integer groups | Group assignment to permute. |
| `weights` | ✗ | array-like | `None` | non-negative values | Optional weights. |
| `R` | ✓ | int | (no fixed global default) | `>=2`, often 199-4999 | Number of random permutations. |
| `weight_permutation` | ✗ | str | method-specific | `"none"`, `"replicate"`, `"diss"`, `"group"` | Weighted permutation strategy. |
| `squared` | ✗ | bool | `False` | `True` / `False` | Whether squared distances are used. |

## What It Does

- Computes observed test statistic(s) on original group labels.
- Repeats computation on permuted labels.
- Estimates p-values as empirical proportions.
- Supports both global discrepancy tests and tree split tests.

## Notes and Tips

- `R=999` is a practical default; increase for more stable p-values.
- Weighted data require careful `weight_permutation` choice.
- For tree building, permutation is often used as a stopping rule at each split.

## Examples

### 1) Minimal (dissassoc permutation)

```python
from sequenzo.group_comparison import get_discrepancy_permutation_test
perm = get_discrepancy_permutation_test(distance_matrix=dmat, group_int=group_int, weights=weights, R=199, weight_permutation="diss")
print(perm["pval"])
```

### 2) Standard (split significance in trees)

```python
from sequenzo.group_comparison import test_tree_split
pval = test_tree_split(
    distance_matrix=dmat,
    group=split_mask,
    indices=node_indices,
    weights=weights,
    R=999,
    weight_permutation="diss",
)
```

### 3) Advanced (custom permutation statistic)

```python
from sequenzo.group_comparison import get_permutation_test
res = get_permutation_test(data=group_labels, R=999, statistic=my_statistic_func)
```

### 4) Common pitfall

```python
# Too few permutations gives unstable p-values
# perm = get_discrepancy_permutation_test(..., R=9, ...)
```
Use at least a few hundred permutations for publication-grade inference.

## TraMineR Mapping

- **Closest R functions:** `dissassocweighted.*()`, `DTNdissassocweighted()`
- **Mapping note:** Same permutation-testing principle for discrepancy and tree split significance.

## References

- Anderson, M. J. (2001). *A new method for non-parametric multivariate analysis of variance*.
- Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). *Discrepancy analysis of state sequences*.

## Key Features

- Unified nonparametric inference utilities.
- Works for both discrepancy tests and tree split decisions.
- Supports weighted permutations.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang
