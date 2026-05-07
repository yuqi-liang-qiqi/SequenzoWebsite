# `build_sequence_tree()`

This is the practical tree API when your input is `SequenceData`.
It computes distances (if needed) and then builds a discrepancy-based tree.

## Function Usage

Minimal usage:

```python
build_sequence_tree(seqdata, predictors)
```

With explicit distance options:

```python
build_sequence_tree(
    seqdata=seqdata,
    predictors=predictors,
    distance_method="LCS",
    R=999,
    pval=0.01,
)
```

## Entry Parameters

| Parameter | Required | Type | Default | Typical Range / Options | Description |
| --- | --- | --- | --- | --- | --- |
| `seqdata` | ✓ | SequenceData | - | state sequences | Input sequence object. |
| `predictors` | ✓ | DataFrame | - | p covariates | Covariates used for tree splits. |
| `distance_matrix` | ✗ | ndarray | `None` | n x n | Optional precomputed distances. |
| `distance_method` | ✗ | str | `"LCS"` | `"OM"`, `"LCS"`, `"HAM"`, `"DHD"` | Distance method if matrix is not provided. |
| `distance_params` | ✗ | dict | `None` | valid distance args | Extra distance-computation arguments. |
| `weighted` | ✗ | bool | `True` | `True` / `False` | Whether to use sequence weights. |
| `min_size` | ✗ | float/int | `0.05` | proportion or absolute | Minimum node size. |
| `max_depth` | ✗ | int | `5` | positive integers | Maximum tree depth. |
| `R` | ✗ | int | `1000` | `0` or `>=2` | Permutations for split significance. |
| `pval` | ✗ | float | `0.01` | `(0,1)` | Split retention threshold. |
| `weight_permutation` | ✗ | str | `"replicate"` | `"replicate"`, `"diss"`, `"group"`, `"none"` | Weighted permutation strategy. |
| `squared` | ✗ | bool | `False` | `True` / `False` | Whether distances are squared. |
| `first_split` | ✗ | str | `None` | predictor name | Force first split variable. |

## What It Does

- Validates sequence and predictor dimensions.
- Computes distance matrix if not supplied.
- Extracts sequence weights when requested.
- Calls distance-tree engine internally.
- Returns tree output plus a reference to original sequence data.

## Notes and Tips

- Use this function unless you already maintain your own distance matrix.
- For reproducible benchmarking, keep the same `distance_method` and parameters across runs.
- Interpret tree leaves as subgroup partitions in discrepancy space.

## Examples

### 1) Minimal

```python
from sequenzo.group_comparison import build_sequence_tree
tree = build_sequence_tree(seqdata=seqdata, predictors=predictors)
```

### 2) Standard

```python
tree = build_sequence_tree(
    seqdata=seqdata,
    predictors=predictors,
    distance_method="LCS",
    R=499,
    pval=0.05,
)
```

### 3) Advanced (precomputed distances)

```python
tree = build_sequence_tree(
    seqdata=seqdata,
    predictors=predictors,
    distance_matrix=precomputed_dmat,
    first_split="cohort",
)
```

### 4) Common pitfall

```python
# Wrong: predictors and seqdata row counts must match
# build_sequence_tree(seqdata=seqdata, predictors=predictors.iloc[:-1])
```

## TraMineR Mapping

- **Closest R function:** `seqtree()`
- **Mapping note:** Wrapper-level equivalent built on top of dissimilarity tree logic.

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences.

## Key Features

- End-to-end seqtree API from `SequenceData`.
- Optional automatic distance computation.
- Weighted and permutation-aware tree inference.
- Output format aligned with distance tree results.

## Authors

- Code: Yuqi Liang
- Documentation: Yuqi Liang

