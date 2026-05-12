# Discrepancy Analysis Conceptual Guide

This guide explains the ideas behind `sequenzo.discrepancy_analysis` in plain language. Read it before the function pages if you are new to distance-based group comparison.

## The Core Question

You observe categorical state sequences over time, such as employment, family, or health states. You also have a grouping variable, covariates, or both. Discrepancy analysis asks:

> After I measure how different sequences are from one another, does group membership explain part of the discrepancy among sequences, as measured by the chosen dissimilarity matrix?

The analysis never compares states one cell at a time in isolation. It always works from a **pairwise distance matrix** that summarizes how far apart entire trajectories are.

## Step 1: Turn Sequences into Distances

Every discrepancy method in this module starts from an `n × n` distance matrix `D`, where `n` is the number of sequences.

- Entry `D[i, j]` is the dissimilarity between sequence `i` and sequence `j`.
- The matrix is symmetric and has zeros on the diagonal.
- You usually compute it with `get_distance_matrix()` from `sequenzo.dissimilarity_measures`.

Your substantive conclusions depend on this choice. Two analyses that differ only in distance method can disagree because they emphasize different aspects of timing, order, and spell length.

## Step 2: Measure Overall Discrepancy

`overall_discrepancy()` computes the overall discrepancy of the sequence set from pairwise dissimilarities. TraMineR users know this as `dissvar()`.

This quantity plays the role of a generalized variance or inertia, but it is called **discrepancy** because the input distances need not be Euclidean.

- If all sequences are very similar, overall discrepancy is small.
- If sequences are widely scattered in distance space, overall discrepancy is large.

Tree methods use this quantity as the total sum of squares at the root node. Association tests use the same inertia logic to split total discrepancy into explained and residual parts.

## Step 3: Decompose Discrepancy with a Pseudo-ANOVA

`single_factor_association()` performs a **pseudo-ANOVA** on dissimilarities. TraMineR users know this as `dissassoc()`.

The function decomposes total discrepancy into:

1. **Between-group discrepancy** — the part linked to group membership.
2. **Within-group discrepancy** — the residual part left inside groups.

Pseudo R² is the share of total discrepancy explained by the grouping variable. Pseudo F tests whether between-group separation is large relative to within-group discrepancy.

The key output statistics are:

| Statistic | Plain-language meaning |
| --- | --- |
| Pseudo F | Main test of whether group membership explains part of total discrepancy. |
| Pseudo Fbf | Brown-Forsythe-type pseudo F included for TraMineR compatibility; useful as a cautious companion statistic when within-group discrepancies differ. Studer et al. (2011) focus mainly on pseudo F, pseudo R², and the generalized Levene statistic. |
| Pseudo R² | Share of total discrepancy explained by the grouping variable. |
| Bartlett | Legacy discrepancy-homogeneity statistic included for TraMineR compatibility; use cautiously, especially with weights. |
| Levene | Preferred generalized discrepancy-homogeneity statistic in Studer et al. (2011), based on distances to group centers. |

The function also returns an ANOVA-like table with explained sum of squares, residual sum of squares, and total sum of squares.

## Step 4: Decide Whether the Association Is Real

Distance matrices break ordinary ANOVA assumptions. That is why Sequenzo uses **permutation tests** instead of relying only on asymptotic theory.

When you set `R > 1` in `single_factor_association()`, the package shuffles group labels many times and recomputes the test statistics. The p-value is the share of permuted statistics at least as extreme as the observed value.

With weights supplied and `weight_permutation=None`, Sequenzo defaults to `"replicate"`, matching TraMineR `dissassoc()`. For survey or calibration weights, pass `weight_permutation="diss"` explicitly, as recommended by Studer et al. (2011). See [Permutation Tests](./permutation-tests.md).

## Step 5: Localize Differences Along Time

A global association test can be significant even when groups differ only in a short window, such as early career or the transition to parenthood.

`compare_groups_across_positions()` repeats the association logic on **moving sub-sequence windows**. For each anchor position, it builds a local distance matrix and runs the same pseudo-ANOVA summaries. This is window-wise local discrepancy analysis, not a cell-by-cell cross-tabulation of states at each time point unless the window length is effectively one.

Use this when your research question is not only *whether* groups differ, but **when** they differ.

## Step 6: Explain Heterogeneity with Trees

When you have several covariates and want a compact partition of trajectory discrepancy, use a **distance tree**:

- `distance_tree()` takes a distance matrix plus a predictor data frame.
- `sequence_tree()` is the same method, but it can compute the distance matrix for you from `SequenceData`.

At each node the algorithm searches for the binary covariate split with the highest pseudo-R². A split is kept only if a pseudo-F permutation test shows that the reduction in within-node discrepancy is stronger than chance. Leaf nodes describe subpopulations with lower within-node sequence discrepancy.

## Multifactor and Marginal Association

Do not mix up these two ideas:

- `marginal_factor_association()` tests **raw** single-factor association one variable at a time.
- `multifactor_association()` measures **conditional** contribution after other covariates are included, using Type II logic: remove one factor from the fuller model and observe how much explained discrepancy is lost.

## What to Read Next

| If you want to… | Read |
| --- | --- |
| Test one grouping variable | [`single_factor_association()`](./get-group-distance-association.md) |
| Scan differences by time window | [`compare_groups_across_positions()`](./get-group-differences-by-position.md) |
| Understand permutation options | [Permutation Tests](./permutation-tests.md) |
| Build a distance tree | [`distance_tree()`](./build-distance-tree.md) |
| Build a tree from `SequenceData` | [`sequence_tree()`](./build-sequence-tree.md) |

## Authors

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

Batagelj, V. (1988). Generalized Ward and related clustering problems. In H. H. Bock (Ed.), *Classification and Related Methods of Data Analysis* (pp. 67–74). North-Holland.

McArdle, B. H., & Anderson, M. J. (2001). Fitting multivariate models to community data: A comment on distance-based redundancy analysis. *Ecology*, 82(1), 290–297.

Mielke, P. W., & Berry, K. J. (2007). *Permutation Methods: A Distance Function Approach* (2nd ed.). Springer.

Anderson, M. J. (2001). A new method for non-parametric multivariate analysis of variance. *Austral Ecology*, 26, 32–46.
