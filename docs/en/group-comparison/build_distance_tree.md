# `build_distance_tree()`

This function builds a tree that explains sequence discrepancy with covariates.
Each split is chosen to maximize discrepancy reduction, and can be validated by permutation tests.

## Function Usage

Minimal usage:

```python
build_distance_tree(distance_matrix, predictors)
```

Common usage:

```python
build_distance_tree(
    distance_matrix=dmat,
    predictors=predictors,
    min_size=0.05,
    max_depth=5,
    R=999,
    pval=0.01,
)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `distance_matrix` | ✓ | ndarray/DataFrame | - | n x n | Pairwise sequence dissimilarity matrix. |
| `predictors` | ✓ | DataFrame | - | p covariates | Covariates used for recursive splitting. |
| `weights` | ✗ | array-like | `None` | non-negative values | Optional case weights. |
| `min_size` | ✗ | float/int | `0.05` | `0-1` (proportion) or integer | Minimum node size. |
| `max_depth` | ✗ | int | `5` | positive integers | Maximum tree depth. |
| `R` | ✗ | int | `1000` | `0` or `>=2` | Permutations for split significance. |
| `pval` | ✗ | float | `0.01` | `(0,1)` | Split retention threshold. |
| `weight_permutation` | ✗ | str | `"replicate"` | `"replicate"`, `"diss"`, `"group"`, `"none"` | Weighted permutation strategy. |
| `squared` | ✗ | bool | `False` | `True` / `False` | Whether distances are squared. |
| `first_split` | ✗ | str | `None` | predictor name | Force first split variable. |

## What It Does

- Computes root discrepancy from the full distance matrix.
- Searches the best binary split over predictors.
- Optionally tests split significance by permutation.
- Repeats recursively until stopping criteria are met.
- Returns tree structure, fitted leaf memberships, and metadata.

## Notes and Tips

- Tree analysis is discrepancy-based: same conceptual core, tree as recursive extension.
- Start with conservative `max_depth` and `min_size` to avoid unstable small leaves.
- Use `first_split` only when you have strong theory for first partition.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import build_distance_tree
tree = build_distance_tree(distance_matrix=dmat, predictors=X)
```

### 2) Standard

```python
tree = build_distance_tree(
    distance_matrix=dmat,
    predictors=X,
    min_size=0.05,
    max_depth=4,
    R=499,
    pval=0.05,
)
print(tree["fitted"].head())
```

### 3) Advanced (force first split)

```python
tree = build_distance_tree(
    distance_matrix=dmat,
    predictors=X,
    first_split="gender",
    weight_permutation="diss",
)
```

### 4) Common pitfall

```python
# Wrong: predictor rows must equal matrix size
# build_distance_tree(distance_matrix=dmat, predictors=X.iloc[:-1])
```
Keep `len(predictors) == distance_matrix.shape[0]`.

## TraMineR Mapping

- **Closest R function:** `disstree()`
- **Mapping note:** Direct counterpart of distance-based tree-structured discrepancy analysis.

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences.

## Key Features

- Recursive discrepancy-reduction splitting.
- Optional permutation-based split validation.
- Handles numeric and categorical predictors.
- Returns interpretable leaf assignments.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang
