# `sequence_tree()`

`sequence_tree()` fits the same distance-based regression tree as `distance_tree()`, but starts from a `SequenceData` object. If you do not supply a distance matrix, Sequenzo computes one for you and then grows a tree that partitions the sample into subgroups with lower within-node sequence discrepancy.

## Function Usage

```python
sequence_tree(
    seqdata,
    predictors,
    distance_matrix=None,
    distance_method="LCS",
    distance_params=None,
    weighted=True,
    min_size=0.05,
    max_depth=5,
    R=1000,
    pval=0.01,
    weight_permutation=None,
    squared=False,
    first_split=None
)
```

## TraMineR Parameter Mapping

- `seqdata` -> TraMineR `seqdata`
- `predictors` -> TraMineR `formula` predictors
- `distance_matrix` -> optional precomputed `diss`
- `distance_method` -> distance function name used when `distance_matrix` is `None`
- `distance_params` -> extra arguments to the distance function
- `weighted` -> whether to use `seqdata.weights`
- `min_size` -> TraMineR `min.size`
- `max_depth` -> TraMineR `maxdepth`
- `R` -> TraMineR `R`
- `pval` -> TraMineR `pval`
- `weight_permutation` -> TraMineR `weight.perm`
- `squared` -> TraMineR `squared`
- `first_split` -> TraMineR `first.split`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Sequence object created with `SequenceData()`. |
| `predictors` | ✓ | `pd.DataFrame` | Covariates with one row per sequence. |
| `distance_matrix` | ✗ | `np.ndarray` | Optional precomputed distance matrix. If omitted, Sequenzo calls `get_distance_matrix()`. |
| `distance_method` | ✗ | `str` | Distance method used when `distance_matrix` is `None`. Default: `"LCS"`. |
| `distance_params` | ✗ | `dict` | Extra arguments forwarded to `get_distance_matrix()`. |
| `weighted` | ✗ | `bool` | If `True`, use `seqdata.weights` when available. Default: `True`. |
| `min_size` | ✗ | `float` / `int` | Minimum node size. Values below `1` are treated as a fraction of total weight. Default: `0.05`. |
| `max_depth` | ✗ | `int` | Maximum tree depth. Default: `5`. |
| `R` | ✗ | `int` | Number of permutations for split significance. Default: `1000`. |
| `pval` | ✗ | `float` | Maximum p-value required to keep a split. Default: `0.01`. |
| `weight_permutation` | ✗ | `str` / `None` | Permutation mode passed to the underlying tree fitter. Default: `None` (resolved to `"none"` without weights, otherwise `"replicate"`). |
| `squared` | ✗ | `bool` | If `True`, use exponent v = 2 on dissimilarities before tree fitting. Default: `False` (v = 1). |
| `first_split` | ✗ | `str` | Optional predictor name forced at the root split. |

## What It Returns

The return object has the same structure as `distance_tree()`, with two sequence-specific additions:

| Key | Type | Description |
| --- | --- | --- |
| `root` | `DissTreeNode` | Root node of the fitted tree. |
| `fitted` | `pd.DataFrame` | Leaf membership for each sequence in column `(fitted)`. |
| `info` | `dict` | Tree metadata. `info["method"]` is set to `"seqtree"`. |
| `data` | `pd.DataFrame` | Predictor data frame used for fitting. |
| `weights` | `np.ndarray` | Weights used during fitting. |
| `seqdata` | `SequenceData` | Reference to the original sequence object. |

## Examples

### Step 1: Build `SequenceData`

```python
from sequenzo import SequenceData, load_dataset

df = load_dataset("mvad")
time_list = [c for c in df.columns if str(c).isdigit()]
seqdata = SequenceData(df, time=time_list, states=sorted(df[time_list].stack().unique()))
```

### Step 2: Prepare predictors

```python
import pandas as pd

predictors = df[["male", "fmpr", "emp97"]].copy()
```

### Step 3: Fit the sequence tree

```python
from sequenzo.discrepancy_analysis import sequence_tree

tree = sequence_tree(
    seqdata=seqdata,
    predictors=predictors,
    distance_method="LCS",
    distance_params={"norm": "auto"},
    R=1000,
    pval=0.05,
    weighted=True,
)
```

### Step 4: Summarize and visualize the tree

```python
from sequenzo.discrepancy_analysis import (
    get_leaf_membership,
    print_tree,
    plot_tree,
)

print(tree["info"]["method"])
print_tree(tree)
print(get_leaf_membership(tree, label=True).head())
plot_tree(tree)
```

## R Counterpart

- **Closest R function:** `seqtree`
- **Mapping note:** `seqtree` in TraMineR is a sequence-facing wrapper around the same distance-tree logic implemented by `disstree`.

## Notes

- `seqdata` must be a real `SequenceData` object. A plain `DataFrame` is not enough for this function.
- If you already computed a distance matrix for other parts of the project, pass it through `distance_matrix=` to avoid recomputation.
- When `weighted=True` and `seqdata.weights` is missing, Sequenzo falls back to equal weights.
- All helper functions documented for `distance_tree()` also work on the object returned here.
- By default, Sequenzo uses nonsquared dissimilarities (v = 1). Set `squared=True` mainly when the dissimilarity is Euclidean, or as a sensitivity check.
- Use `weight_permutation="diss"` for survey or calibration weights. The default `"replicate"` matches TraMineR and is appropriate only for integer frequency weights.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

Batagelj, V. (1988). Generalized Ward and related clustering problems. In H. H. Bock (Ed.), *Classification and Related Methods of Data Analysis* (pp. 67–74). North-Holland.
