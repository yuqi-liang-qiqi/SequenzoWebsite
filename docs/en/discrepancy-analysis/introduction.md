# Discrepancy Analysis

Discrepancy analysis asks whether groups or covariates explain part of the discrepancy among trajectories, and whether this association changes across time windows, when sequences are summarized by a **pairwise dissimilarity matrix**. Instead of comparing one number per person, you compare whole trajectories in the space defined by your chosen dissimilarity measure.

This section documents the public API in `sequenzo.discrepancy_analysis`. The workflow follows the TraMineR `diss*` family described in Studer et al. (2011). 

## What You Need Before You Start

Most pages in this section assume that you already have:

1. A `SequenceData` object with one row per case and one column per time point.
2. A square symmetric distance matrix from `get_distance_matrix()` in `sequenzo.dissimilarity_measures`.

If you are new to distance matrices, please read the dissimilarity-measures tutorial first. Your substantive conclusions depend on the distance method you choose, so keep that choice consistent across the analysis.

## How This Section Is Organized

| Topic | Main Sequenzo function | Typical question |
| --- | --- | --- |
| Overall trajectory spread | `overall_discrepancy()` | How much discrepancy is there among all sequences? |
| One grouping variable | `single_factor_association()` | Does group membership explain part of the discrepancy among sequences? |
| Several covariates at once | `multifactor_association()` | After other covariates are included, how much discrepancy does each factor explain? |
| One factor at a time | `marginal_factor_association()` | What is each factor's raw association with discrepancy when tested alone? |
| Window-wise comparison along time | `compare_groups_across_positions()` | At which time windows does between-group separation stand out? |
| Distance-based tree | `distance_tree()` | Which covariates partition the sample into subgroups with lower within-node discrepancy? |
| Sequence-based tree | `sequence_tree()` | Same tree workflow, starting from `SequenceData` |
| Permutation inference | `permutation_test()`, `association_permutation_test()` | Are observed associations larger than chance? |

`multifactor_association()` uses Type II logic: it measures the reduction in explained discrepancy when a covariate is removed from a fuller model. `marginal_factor_association()` repeats single-factor tests one variable at a time. Do not treat those two summaries as interchangeable.

The pages below focus on the most common workflow functions. The package also exports helpers such as `get_leaf_membership()`, `plot_tree()`, and `plot_group_differences_across_positions()`.

## A Beginner-Friendly Workflow

Follow these steps when you compare predefined groups:

1. **Prepare sequence data.** Build `SequenceData` with the correct state alphabet, time columns, and optional survey weights.
2. **Choose a distance measure.** Call `get_distance_matrix()` with the same method you would use for clustering or visualization. By default, keep `squared=False` so the analysis uses nonsquared dissimilarities (exponent v = 1), as Studer et al. (2011) recommend for OM, LCS, and other non-Euclidean sequence distances.
3. **Run a single-factor association test.** Pass the distance matrix and group labels to `single_factor_association()`.
4. **Read pseudo R² and permutation p-values.** Pseudo R² is the share of total discrepancy explained by the grouping variable. The permutation p-value asks whether that explained share is larger than expected under random label shuffles.
5. **Localize differences if needed.** Use `compare_groups_across_positions()` when you want to know *where* along the time axis groups separate in window-wise local discrepancy.
6. **Explore covariate structure if needed.** Use `distance_tree()` or `sequence_tree()` when you want a regression-tree summary of which predictors split the sample into more homogeneous trajectory subgroups.

## How This Differs from Group Comparison (BIC / LRT)

Sequenzo also provides **group comparison** tools based on the BIC and LRT framework in Liao and Fasang (2021). That workflow compares two predefined groups with a different statistical setup.

Discrepancy analysis is the TraMineR-style pseudo-ANOVA on dissimilarities. It decomposes total discrepancy into between-group and within-group parts, supports more than two groups, and extends to trees, multifactor models, and window-wise scans.

Use discrepancy analysis when you want TraMineR-compatible `dissassoc`, `disstree`, and `seqdiff`-style inference. Use group comparison when your research design matches the two-group BIC/LRT framework.

## Included Pages

- [Conceptual Guide](./conceptual-guide.md) — core ideas in plain language
- [Sequenzo-TraMineR Mapping](./traminer-function-mapping.md) — function correspondence with TraMineR
- [`single_factor_association()`](./get-group-distance-association.md) — test association between distances and one grouping variable
- [`compare_groups_across_positions()`](./get-group-differences-by-position.md) — scan group differences along moving time windows
- [Permutation Tests](./permutation-tests.md) — how randomization is used in this module
- [`distance_tree()`](./build-distance-tree.md) — build a distance-based regression tree
- [`sequence_tree()`](./build-sequence-tree.md) — build the same tree from `SequenceData`

## Authors

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

Batagelj, V. (1988). Generalized Ward and related clustering problems. In H. H. Bock (Ed.), *Classification and Related Methods of Data Analysis* (pp. 67–74). North-Holland.

McArdle, B. H., & Anderson, M. J. (2001). Fitting multivariate models to community data: A comment on distance-based redundancy analysis. *Ecology*, 82(1), 290–297.

Mielke, P. W., & Berry, K. J. (2007). *Permutation Methods: A Distance Function Approach* (2nd ed.). Springer.
