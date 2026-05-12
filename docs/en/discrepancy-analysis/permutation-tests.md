# Permutation Tests

Permutation tests are the inferential backbone of `sequenzo.discrepancy_analysis`. Distance-based pseudo-ANOVA does not rely on the same assumptions as ordinary ANOVA, so Sequenzo estimates p-values by shuffling labels and recomputing test statistics many times.

## When Permutation Is Used

| Workflow | Public entry point | What is permuted |
| --- | --- | --- |
| Single-factor association | `single_factor_association(..., R=...)` | Group labels attached to sequences |
| Tree split significance | `test_tree_split()` and the internal logic behind `distance_tree()` | Predictor labels or weights, depending on mode |
| Custom analysis | `permutation_test()` | Any label vector you pass to the statistic callback |

Most users only need to set `R` in `single_factor_association()` or `distance_tree()`. The lower-level functions are documented here for advanced workflows and TraMineR parity.

## `association_permutation_test()`

This internal engine powers the five-statistic output of `single_factor_association()` when `R > 1`.

It recomputes these observed statistics on every permutation:

- Pseudo F
- Pseudo Fbf
- Pseudo R²
- Bartlett
- Levene

For each statistic, the p-value is usually computed as the proportion of permuted values at least as large as the observed value.

You do not need to call this function directly unless you are extending the module. In normal use, call `single_factor_association()` and read `result["stat"]` or `result["pseudo_f_pval"]`.

## `permutation_test()`

`permutation_test()` is a generic TraMineR-style permutation wrapper.

```python
permutation_test(
    data,
    R,
    statistic,
    **kwargs
)
```

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `data` | ✓ | `np.ndarray` | Data to permute, usually group assignments. |
| `R` | ✓ | `int` | Number of permutations. |
| `statistic` | ✓ | callable | Function with signature `statistic(data, permuted_indices, **kwargs)`. |
| `**kwargs` | ✗ | any | Extra arguments forwarded to `statistic`. |

The return dictionary contains:

| Key | Description |
| --- | --- |
| `R` | Number of permutations requested. |
| `t0` | Observed statistic value or vector of observed values. |
| `t` | Matrix of permuted statistics with shape `(R, n_tests)`. |
| `pval` | Permutation p-value for each test. |

If `R <= 1`, the function returns observed values only and leaves p-values as `NaN`.

## Weight Permutation Modes

The `weight_permutation` argument controls how weights enter permutation sampling. Studer et al. (2011) distinguish aggregated count weights from survey or calibration weights.

| Mode | Use it when | Important constraint |
| --- | --- | --- |
| `"none"` | You have no weights or want an unweighted permutation test. | Automatically selected when `weights=None`. |
| `"replicate"` | Each integer weight is a frequency count of aggregated cases. | Default when weights are supplied and `weight_permutation=None`, matching TraMineR `dissassoc()`, `disstree()`, and `seqtree()`. Weights must be integers. |
| `"diss"` | Weights should enter the statistic, but permutations ignore weights. | Used by TraMineR `seqdiff` and by `compare_groups_across_positions()` for weighted window scans. Recommended for survey or calibration weights when you call `single_factor_association()` or tree functions directly. |
| `"group"` | Weights are permuted together with group labels. | Useful when the sampling design ties weights to group structure. |

Choose the mode that matches your weight interpretation. If you are unsure and your data are unweighted, leave `weights=None`.

## Practical Workflow for Beginners

### Step 1: Start with a moderate `R`

Use `R=999` or `R=1000` for routine analysis. Very small values such as `R=10` are useful only for debugging.

### Step 2: Set `R=0` or `R=1` when you only need point estimates

`compare_groups_across_positions()` uses `R=0` internally because the scan already recomputes many local statistics. In that workflow the page output is descriptive unless you add a separate permutation layer.

### Step 3: Read both effect size and p-value

Pseudo R² tells you how much total discrepancy is explained by the grouping variable. The permutation p-value tells you whether that explained share is larger than expected under random label shuffles.

### Step 4: Respect the minimum attainable p-value

With `R` permutations, the smallest possible p-value is about `1 / R`. `distance_tree()` warns and adjusts `pval` when you request a threshold smaller than that minimum.

## Tree Split Permutation

`test_tree_split()` wraps the tree-split permutation engine used while growing `distance_tree()` and `sequence_tree()`. It evaluates whether a candidate split reduces within-node discrepancy more than would be expected after permuting predictor assignments.

In practice you usually let the tree functions call this logic for you. Use `test_tree_split()` only when you are validating one split outside the full tree fit.

## R Counterpart

- **Closest R functions:** `dissassocweighted.*`, `TraMineR.permutation`, and the permutation logic behind `disstree`
- **Mapping note:** Sequenzo follows the same weight modes and reproduces the five-statistic `dissassoc` permutation output.

## Notes

- Permutation tests are stochastic unless you fix the random seed before calling the function.
- Larger `R` improves p-value stability but increases runtime.
- Association tests and tree fitting can use different `weight_permutation` values on purpose. Check the argument you pass in each call.
- Bartlett p-values from weighted permutations should be interpreted cautiously. Studer et al. (2011) treat the generalized Levene statistic as the preferred discrepancy-homogeneity tool.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

Mielke, P. W., & Berry, K. J. (2007). *Permutation Methods: A Distance Function Approach* (2nd ed.). Springer.

McArdle, B. H., & Anderson, M. J. (2001). Fitting multivariate models to community data: A comment on distance-based redundancy analysis. *Ecology*, 82(1), 290–297.

Anderson, M. J. (2001). A new method for non-parametric multivariate analysis of variance. *Austral Ecology*, 26, 32–46.
