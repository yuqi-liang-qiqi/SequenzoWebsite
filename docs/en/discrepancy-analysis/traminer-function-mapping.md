# Discrepancy Analysis: Sequenzo and TraMineR Mapping

This page maps Sequenzo discrepancy-analysis functions to their closest TraMineR counterparts. The R names below are taken from TraMineR core (`dissassoc`, `dissvar`, `disstree`, `seqtree`, `seqdiff`, and related helpers).

## What This Section Covers

This section focuses on discrepancy-based sequence analysis: overall discrepancy, pseudo-ANOVA on dissimilarities, weighted permutation tests, multifactor models, regression trees, and window-wise group comparisons along the time axis.

For TraMineR users, this is the `diss*` family plus the `seqdiff` and `seqtree` workflows described in Studer et al. (2011). Distance matrices are usually built first with `seqdist()` in TraMineR or `get_distance_matrix()` in Sequenzo.

## Main Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`overall_discrepancy`](./conceptual-guide.md) | `dissvar` | Overall discrepancy from a distance matrix; `squared=False` uses v = 1 and `squared=True` uses v = 2. |
| [`single_factor_association`](./get-group-distance-association.md) | `dissassoc` | Single-factor pseudo-ANOVA on distances; returns pseudo F, pseudo Fbf, pseudo R², Bartlett, and Levene summaries. |
| [`marginal_factor_association`](./conceptual-guide.md) | repeated `dissassoc` | One `dissassoc()` per covariate column; raw marginal association, not Type II partial effects. |
| [`multifactor_association`](./conceptual-guide.md) | `dissmfacw` | Multifactor model with Type II-style partial contributions after other covariates are included. |
| [`distance_multifactor_anova`](./conceptual-guide.md) | `dissmfacw` | Lower-level multifactor engine behind `multifactor_association()`. |
| [`gower_matrix`](./conceptual-guide.md) | internal Gower-centering step in `dissmfacw` | Centered Gower matrix used for distance-based multifactor ANOVA. |
| [`individual_indicators`](./conceptual-guide.md) | TraMineRextras `dissindic` | Individual marginality and gain indicators; not exported from TraMineR core. |
| [`merge_cluster_groups`](./conceptual-guide.md) | `dissmergegroups` | Greedy merging of cluster labels by partition-quality loss. |
| [`compare_groups_across_positions`](./get-group-differences-by-position.md) | `seqdiff` | Window-wise local discrepancy scan along the time axis. |
| [`print_group_differences_across_positions`](./get-group-differences-by-position.md) | `print.seqdiff` | Text summary of a `seqdiff` object. |
| [`plot_group_differences_across_positions`](./get-group-differences-by-position.md) | `plot.seqdiff` | Plot statistics or discrepancy profiles across anchor positions. |
| [`distance_tree`](./build-distance-tree.md) | `disstree` | Distance-based regression tree on a distance matrix plus predictors. |
| [`sequence_tree`](./build-sequence-tree.md) | `seqtree` | Sequence-facing wrapper that can compute the distance matrix before calling the tree fitter. |
| [`test_tree_split`](./build-distance-tree.md) | internal split-significance logic behind `disstree` | Permutation test for one candidate tree split. |
| [`get_leaf_membership`](./build-distance-tree.md) | `disstreeleaf` | Leaf ID or readable path label for each sequence. |
| [`get_classification_rules`](./build-distance-tree.md) | `disstree.get.rules` | Human-readable rules for terminal nodes. |
| [`assign_to_leaves`](./build-distance-tree.md) | `disstree.assign` | Assign new profiles to fitted leaves using tree rules. |
| [`print_tree`](./build-distance-tree.md) | `print.disstree` / `print.seqtree` | Text display of a fitted tree. |
| [`plot_tree`](./build-distance-tree.md) | `plot.disstree` / `plot.seqtree` | Graphical tree display. |
| [`export_tree_to_dot`](./build-distance-tree.md) | `disstree2dot` / `seqtree2dot` | Export a tree to Graphviz DOT format. |
| [`permutation_test`](./permutation-tests.md) | `TraMineR.permutation` | Generic permutation wrapper. |
| [`association_permutation_test`](./permutation-tests.md) | `dissassocweighted.*` | Five-statistic `dissassoc` permutation engine used by `single_factor_association()`. |

## Parameter Mapping for Core Entry Points

| Sequenzo argument | TraMineR argument | Applies to |
| --- | --- | --- |
| `distance_matrix` | `diss` | `overall_discrepancy`, `single_factor_association`, `distance_tree`, multifactor helpers |
| `group` | `group` / `fac` | `single_factor_association` |
| `weights` | `weights` | All weighted discrepancy functions |
| `R` | `R` | Association tests, trees, and multifactor routines that support permutation |
| `weight_permutation` | `weight.permutation` | `single_factor_association`, `distance_tree`, `sequence_tree` |
| `squared` | `squared` | All routines that accept a nonsquared (v = 1) versus squared (v = 2) dissimilarity transform |
| `predictors` | `formula` right-hand predictors | `distance_tree`, `sequence_tree` |
| `min_size` | `min.size` | `distance_tree`, `sequence_tree` |
| `max_depth` | `maxdepth` | `distance_tree`, `sequence_tree` |
| `pval` | `pval` | `distance_tree`, `sequence_tree` |
| `first_split` | `first.split` | `distance_tree`, `sequence_tree` |
| `seqdata` | left-hand `formula` term in `seqtree` | `sequence_tree`, `compare_groups_across_positions` |
| `distance_method` / `distance_params` | `seqdist.args` | `sequence_tree` |
| `seqdist_args` | `seqdist.args` | `compare_groups_across_positions` |
| `cmprange` | `cmprange` | `compare_groups_across_positions` |
| `with_missing` | `with.missing` | `compare_groups_across_positions` |
| `weighted` | `weighted` | `sequence_tree`, `compare_groups_across_positions` |
| `factors` | `formula` predictors in `dissmfacw` | `multifactor_association`, `marginal_factor_association` |
| `gower` | `gower` | `multifactor_association`, `individual_indicators` |

TraMineR tree functions also accept `max.depth` and `first` as formal argument names. This guide uses `maxdepth` and `first.split` to match the Studer et al. (2011) examples and the other pages in this section.

## Important Workflow Differences

- **Import surface.** Import discrepancy functions from `sequenzo.discrepancy_analysis` only. Internal folders such as `stats/`, `trees/`, `positionwise/`, and `internal/` are for maintainers.
- **Distance input.** TraMineR often passes a `dist` object or matrix through a `formula`. Sequenzo usually takes an explicit `distance_matrix`, except in `sequence_tree()` and `compare_groups_across_positions()`.
- **Weighted permutation default.** Sequenzo resolves `weight_permutation=None` the same way TraMineR does for `dissassoc()`, `disstree()`, and `seqtree()`: `"none"` without weights and `"replicate"` when weights are supplied. Unweighted calls also resolve to `"none"` inside TraMineR `dissassocweighted()` and `DTNdisstree()`. For survey or calibration weights, pass `weight_permutation="diss"` explicitly, as recommended by Studer et al. (2011). The `seqdiff` workflow calls `dissassoc(..., weight.permutation = "diss")` for local window scans, and `compare_groups_across_positions()` follows that path.
- **Marginal versus multifactor.** `marginal_factor_association()` is not a substitute for `dissmfacw`. Use `multifactor_association()` when you need conditional Type II-style contributions after other covariates are included.
- **Position-wise scan.** `compare_groups_across_positions()` rebuilds local distance matrices inside a moving window. It is not a cell-by-cell state composition comparison unless the window length is effectively one.
- **Representative and factor plots.** TraMineR also provides `disscenter`, `dissrep`, `dissrf`, `dissdomassoc`, `disstreedisplay`, and `seqtreedisplay`. Sequenzo does not expose one-to-one public wrappers for those helpers in this module.

## Related TraMineR Functions Without a Direct Sequenzo Wrapper Here

| TraMineR function | Typical role |
| --- | --- |
| `disscenter` | Gravity center / medoid search from a distance matrix |
| `dissrep` | Representative sequence selection from distances |
| `dissrf` | Random forest on distances |
| `dissdomassoc` | Association between domain-specific distance matrices |
| `disstreedisplay` / `seqtreedisplay` | Rich tree displays beyond the basic `plot_tree()` helper |

## Authors

Code and documentation: Yuqi Liang

## Reference

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.
