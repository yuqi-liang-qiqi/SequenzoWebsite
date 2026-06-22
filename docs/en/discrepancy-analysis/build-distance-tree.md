# `distance_tree()`

`distance_tree()` builds a regression tree that partitions the sample into subgroups with lower within-node sequence discrepancy. Each split is chosen to maximize pseudo-R² and is kept only when a pseudo-F permutation test supports it.

## Function Usage

```python
distance_tree(
    distance_matrix,
    predictors,
    weights=None,
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

- `distance_matrix` -> TraMineR `diss`
- `predictors` -> TraMineR `formula` predictors
- `weights` -> TraMineR `weights`
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
| `distance_matrix` | ✓ | `np.ndarray` / `pd.DataFrame` | Square symmetric distance matrix with shape `(n, n)`. |
| `predictors` | ✓ | `pd.DataFrame` | Covariates with one row per sequence and one column per predictor. |
| `weights` | ✗ | `np.ndarray` | Optional sequence weights with shape `(n,)`. If omitted, equal weights are used. |
| `min_size` | ✗ | `float` / `int` | Minimum node size. Values below `1` are treated as a fraction of total weight. Default: `0.05`. |
| `max_depth` | ✗ | `int` | Maximum tree depth. Default: `5`. |
| `R` | ✗ | `int` | Number of permutations for split significance. Default: `1000`. |
| `pval` | ✗ | `float` | Maximum p-value required to keep a split. Default: `0.01`. |
| `weight_permutation` | ✗ | `str` / `None` | Permutation mode: `"replicate"`, `"diss"`, `"group"`, or `"none"`. Default: `None` (resolved to `"none"` without weights, otherwise `"replicate"`). |
| `squared` | ✗ | `bool` | If `True`, use exponent v = 2 on dissimilarities before tree fitting. Default: `False` (v = 1). |
| `first_split` | ✗ | `str` | Optional predictor name forced at the root split. |

## Returns

A dictionary with the fitted tree and supporting metadata.

| Key | Type | Description |
| --- | --- | --- |
| `root` | `DissTreeNode` | Root node of the fitted tree. |
| `fitted` | `pd.DataFrame` | Leaf membership for each sequence in column `(fitted)`. |
| `info` | `dict` | Method name, sample size, tree parameters, global adjustment statistics, and permutation settings. |
| `data` | `pd.DataFrame` | Copy of the predictor data frame used for fitting. |
| `weights` | `np.ndarray` | Weights used during fitting. |

The `info["adjustment"]` entry stores a global `single_factor_association()` result computed on the final leaf labels. Use it as a compact summary of how well the tree partitions total discrepancy.

## Examples

### Step 1: Compute a distance matrix

```python
import pandas as pd
from sequenzo import SequenceData, load_dataset
from sequenzo.dissimilarity_measures import get_distance_matrix

df = load_dataset("mvad")
time_list = [c for c in df.columns if str(c).isdigit()]
seqdata = SequenceData(df, time=time_list, states=sorted(df[time_list].stack().unique()))

dist = get_distance_matrix(seqdata=seqdata, method="LCS", norm="auto")
```

### Step 2: Prepare predictors

```python
predictors = df[["male", "fmpr", "emp97"]].copy()
```

### Step 3: Fit the tree

```python
from sequenzo.discrepancy_analysis import distance_tree

tree = distance_tree(
    distance_matrix=dist,
    predictors=predictors,
    R=1000,
    pval=0.05,
    max_depth=4,
)
```

### Step 4: Inspect leaves and rules

```python
from sequenzo.discrepancy_analysis import (
    get_leaf_membership,
    get_classification_rules,
    print_tree,
    plot_tree,
)

print_tree(tree)
leaf_ids = get_leaf_membership(tree)
rules = get_classification_rules(tree)
plot_tree(tree, filename="distance_tree.png")
```

## R Counterpart

- **Closest R function:** `TraMineR::disstree()`
- **Mapping note:** Sequenzo uses the same pseudo-R² split criterion, medoid labeling, and permutation-gated splitting strategy as the TraMineR distance-tree workflow.

## Notes

- `predictors` must contain exactly one row per sequence represented in `distance_matrix`.
- If `R <= 1`, split retention is effectively permissive because no permutation threshold is applied.
- `min_size` is interpreted on total weight, not only raw row count.
- The tree is binary because pseudo-R² does not penalize the number of groups.
- Use `export_tree_to_dot()` when you need a Graphviz representation.
- Use `assign_to_leaves()` when you want to classify new rows with the fitted tree rules.
- By default, Sequenzo uses nonsquared dissimilarities (v = 1). Set `squared=True` mainly when the dissimilarity is Euclidean, or as a sensitivity check.
- Use `weight_permutation="diss"` for survey or calibration weights. The default `"replicate"` matches TraMineR and is appropriate only for integer frequency weights.

## See Also

- [Section overview](/en/discrepancy-analysis/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

Batagelj, V. (1988). Generalized Ward and related clustering problems. In H. H. Bock (Ed.), *Classification and Related Methods of Data Analysis* (pp. 67–74). North-Holland.
