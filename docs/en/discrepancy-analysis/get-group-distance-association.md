# `single_factor_association()`

`single_factor_association()` tests whether group membership explains part of the discrepancy among sequences, as measured by a pairwise dissimilarity matrix. It runs a pseudo-ANOVA on distances and can attach permutation p-values for TraMineR-compatible statistics.

## Function Usage

```python
single_factor_association(
    distance_matrix,
    group,
    weights=None,
    R=1000,
    weight_permutation=None,
    squared=False
)
```

## TraMineR Parameter Mapping

- `distance_matrix` -> TraMineR `diss`
- `group` -> TraMineR `group` / `fac`
- `weights` -> TraMineR `weights`
- `R` -> TraMineR `R`
- `weight_permutation` -> TraMineR `weight.perm`
- `squared` -> TraMineR `squared`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `distance_matrix` | ✓ | `np.ndarray` / `pd.DataFrame` | Square symmetric distance matrix with shape `(n, n)`. |
| `group` | ✓ | array-like | Group label for each sequence. One value per row of the distance matrix. Missing labels are dropped together with the corresponding rows and columns. |
| `weights` | ✗ | `np.ndarray` | Optional sequence weights with shape `(n,)`. If omitted, all sequences receive equal weight and permutations use `"none"`. |
| `R` | ✗ | `int` | Number of permutations. Use `R <= 1` to compute point estimates only. Default: `1000`. |
| `weight_permutation` | ✗ | `str` / `None` | How weights enter permutation sampling: `"replicate"`, `"diss"`, `"group"`, or `"none"`. Default: `None` (resolved to `"none"` without weights, otherwise `"replicate"`). |
| `squared` | ✗ | `bool` | If `True`, use exponent v = 2 on dissimilarities before analysis. Default: `False` (v = 1). |

## What It Returns

A dictionary with the main association summaries and supporting tables.

| Key | Type | Description |
| --- | --- | --- |
| `pseudo_f` | `float` | Pseudo F statistic. |
| `pseudo_fbf` | `float` | Brown-Forsythe-type pseudo F included for TraMineR compatibility; useful as a cautious companion statistic when within-group discrepancies differ. |
| `pseudo_r2` | `float` | Pseudo R², the share of total discrepancy explained by groups. |
| `bartlett` | `float` | Legacy discrepancy-homogeneity statistic; use cautiously, especially with weights. |
| `levene` | `float` | Generalized Levene statistic based on distances to group centers. |
| `pseudo_f_pval` | `float` | Permutation p-value for pseudo F. |
| `stat` | `pd.DataFrame` | Table of the five statistics with observed values and p-values. |
| `groups` | `pd.DataFrame` | Weighted group size and group discrepancy for each level, plus a `Total` row. |
| `anova_table` | `pd.DataFrame` | Explained, residual, and total sums of squares with degrees of freedom and mean squares. |
| `R` | `int` | Number of permutations used. |
| `weight_permutation` | `str` | Permutation mode actually used. |

## Examples

### Step 1: Build a distance matrix

```python
from sequenzo import SequenceData, load_dataset
from sequenzo.dissimilarity_measures import get_distance_matrix

df = load_dataset("mvad")
time_list = [c for c in df.columns if str(c).isdigit()]
seqdata = SequenceData(df, time=time_list, states=sorted(df[time_list].stack().unique()))

dist = get_distance_matrix(seqdata=seqdata, method="OM", norm="auto")
```

### Step 2: Run the association test

```python
from sequenzo.discrepancy_analysis import single_factor_association

group = df["male"].values  # example binary grouping variable

result = single_factor_association(
    distance_matrix=dist,
    group=group,
    R=1000,
)
```

### Step 3: Run a weighted test with survey weights

```python
weights = df["weight"].values

result_weighted = single_factor_association(
    distance_matrix=dist,
    group=group,
    weights=weights,
    R=1000,
    weight_permutation="diss",
)
```

### Step 4: Read the main results

```python
print(result["pseudo_r2"])
print(result["pseudo_f_pval"])
print(result["stat"])
print(result["groups"])
```

## R Counterpart

- **Closest R function:** `dissassoc`
- **Mapping note:** Sequenzo returns the five-statistic setup used in TraMineR's weighted permutation workflow, including pseudo F, pseudo Fbf, pseudo R², Bartlett, and Levene.

## Notes

- Import from `sequenzo.discrepancy_analysis`, not from internal subfolders.
- If `weights` is omitted, Sequenzo resolves `weight_permutation` to `"none"`.
- If `weights` is supplied and `weight_permutation` is omitted, Sequenzo resolves to `"replicate"`, matching TraMineR `dissassoc()`.
- For survey or calibration weights, pass `weight_permutation="diss"` explicitly, as recommended by Studer et al. (2011).
- Use `weight_permutation="replicate"` only when weights are integer frequency counts from aggregated cases.
- By default, Sequenzo follows Studer et al. (2011) and uses nonsquared dissimilarities (v = 1). Set `squared=True` mainly when the dissimilarity is Euclidean, or as a sensitivity check. Squaring can break the triangle inequality for some sequence distances and change discrepancy contributions.
- Pseudo R² is a descriptive effect-size summary. Use the permutation p-values when you need inferential guidance.
- Rows with missing group labels are removed before the analysis.

## Authors

Code: Sequenzo contributors

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

McArdle, B. H., & Anderson, M. J. (2001). Fitting multivariate models to community data: A comment on distance-based redundancy analysis. *Ecology*, 82(1), 290–297.

Mielke, P. W., & Berry, K. J. (2007). *Permutation Methods: A Distance Function Approach* (2nd ed.). Springer.

Anderson, M. J. (2001). A new method for non-parametric multivariate analysis of variance. *Austral Ecology*, 26, 32–46.
