# Discrepancy Analysis Conceptual Guide

This guide explains the ideas behind `sequenzo.discrepancy_analysis` in plain language. Read it before the function pages if you are new to distance-based sequence comparison.

## What Is Discrepancy?

In this module, discrepancy means the overall variability or spread of a set of sequences.

If all individuals follow almost the same trajectory, the discrepancy is low. If their trajectories differ greatly from one another, the discrepancy is high. In this sense, discrepancy is similar to variance: it tells us how much variation there is in the data.

The difference is that ordinary variance is defined for numeric variables, such as income, age, or test scores. State sequences are not ordinary numeric values. A sequence such as:

```text
Education → Education → Employment → Employment
```

does not have a simple arithmetic mean in the same way that incomes or ages do. We therefore cannot directly compute the usual variance of sequences.

Discrepancy analysis solves this problem by using distances between sequences. Instead of asking how far each observation is from a numeric mean, it asks how far sequences are from one another. The overall discrepancy is then computed from all pairwise dissimilarities in the distance matrix.

Studer et al. (2011) use this idea to generalize the logic of analysis of variance (ANOVA) to sequence data. Once we can measure how much sequences differ overall, we can ask whether groups or covariates explain part of that difference.

## The Core Question

Discrepancy analysis asks a simple question:

> Do sequences differ systematically across groups or covariates?

For example:

* Do men and women follow different employment trajectories?
* Do people with different educational backgrounds have different family trajectories?
* Do treatment and control groups show different health-state sequences?
* Which covariates explain the largest share of trajectory differences?

The important point is that discrepancy analysis treats each sequence as a whole trajectory. It does not compare one state at one time point in isolation. For example, it does not only ask whether two groups differ in employment status at age 25. Instead, it asks whether the full employment trajectories of the two groups are more different than we would expect by chance, given the chosen sequence distance.

In other words, this is not a cell-by-cell comparison of state distributions at each time point. It is a trajectory-level comparison based on distances between complete sequences or sub-sequences.

This is why the distance matrix is central. The distance matrix defines what it means for two trajectories to be similar or different.

## Why Distances Are Needed

A categorical state sequence is a structured object. It contains information about:

* which states occur,
* when they occur,
* in what order they occur,
* and how long each state lasts.

Because of this, there is no single natural way to subtract one sequence from another. For numeric variables, the difference between 30 and 20 is clearly 10. For sequences, the difference between:

```text
Education → Education → Employment → Employment
```

and

```text
Education → Unemployment → Employment → Employment
```

depends on what kind of difference the researcher considers important.

A distance measure makes this choice explicit. It turns each pair of sequences into a number: small values mean that two sequences are similar, and large values mean that they are different.

Your substantive conclusions therefore depend on the distance measure. Two analyses using the same sequences and the same grouping variable may lead to different results if their distance measures emphasize different aspects of the trajectories, such as timing, sequencing, or spell duration.

This is not a technical detail. A distance measure defines what kind of difference matters. A timing-sensitive distance may find strong group differences when groups experience the same states at different ages. A duration-sensitive distance may find strong group differences when groups enter the same states in the same order but stay in them for different lengths of time. Therefore, discrepancy analysis always inherits the substantive assumptions built into the chosen dissimilarity measure.

## Why This Is a Pseudo-ANOVA

In ordinary ANOVA, we have a numeric outcome and a grouping variable. ANOVA asks whether the variation in the outcome can be partly explained by group membership.

For example, suppose the outcome is income and the grouping variable is education. ANOVA decomposes the total variation in income into:

1. variation between education groups, and
2. variation remaining within education groups.

If the between-group part is large relative to the within-group part, we say that education explains part of the variation in income.

Discrepancy analysis applies the same logic to sequences. The outcome is no longer a numeric variable such as income. The outcome is a set of trajectories. Because trajectories do not have an ordinary numeric variance, we first compute pairwise sequence distances and use them to define total discrepancy. We can then decompose this discrepancy into between-group and within-group parts.

This is why the method is called a **pseudo-ANOVA**: it follows the logic of ANOVA, but the sums of squares are computed from a distance matrix rather than from a standard numeric outcome.

## Step 1: Turn Sequences into Distances

Every discrepancy method in this module starts from an `n × n` distance matrix `D`, where `n` is the number of sequences.

* Entry `D[i, j]` is the dissimilarity between sequence `i` and sequence `j`.
* The matrix is symmetric and has zeros on the diagonal.
* You usually compute it with `get_distance_matrix()` from `sequenzo.dissimilarity_measures`.

For example, if you have 100 sequences, the distance matrix contains the pairwise dissimilarities among all 100 trajectories. Discrepancy analysis then uses this matrix as its input.

The distance matrix should be understood as the foundation of the analysis. The pseudo-R², pseudo-F statistic, permutation test, Levene statistic, and tree splits are all computed from the dissimilarities in this matrix.

## Step 2: Measure Overall Discrepancy

`overall_discrepancy()` computes the overall discrepancy of the sequence set from pairwise dissimilarities. TraMineR users know this as `dissvar()`.

You can think of this as the sequence-analysis counterpart of variance. It answers:

> How much do the trajectories vary from one another overall?

If all sequences are nearly identical, most pairwise distances are small, and the overall discrepancy is low. If sequences follow very different paths, many pairwise distances are large, and the overall discrepancy is high.

The term discrepancy is used instead of variance because the input is not a standard numeric variable and the distances need not be Euclidean. In other words, we are measuring trajectory variability in a generalized distance space, not variance around an ordinary arithmetic mean.

Tree methods use this quantity as the total sum of squares at the root node. Association tests use the same inertia logic to split total discrepancy into explained and residual parts.

## Step 3: Decompose Discrepancy with a Pseudo-ANOVA

`single_factor_association()` performs a pseudo-ANOVA on dissimilarities. TraMineR users know this as `dissassoc()`.

The function asks whether a grouping variable explains part of the overall discrepancy among sequences.

For example, suppose we compare employment trajectories by gender. The method first measures the total discrepancy among all sequences. It then asks how much of this discrepancy lies between gender groups and how much remains within gender groups.

The decomposition is:

1. **Total discrepancy**: how different all sequences are from one another.
2. **Between-group discrepancy**: the part associated with differences between group centers.
3. **Within-group discrepancy**: the part that remains among individuals inside the same group.

The group center does not need to be an observed sequence. It plays the same conceptual role as a group mean in ordinary ANOVA. The center is never constructed explicitly: following Studer et al. (2011), the sums of squared distances to this implicit center are computed directly from the pairwise dissimilarities, so the method works for any distance matrix.

Pseudo R² is the share of total discrepancy explained by the grouping variable. A larger pseudo R² means that group membership accounts for a larger share of trajectory differences.

Pseudo F compares between-group discrepancy with within-group discrepancy. A large pseudo F means that sequences from different groups are relatively far apart compared with sequences within the same groups.

The key output statistics are:

| Statistic  | Plain-language meaning                                                                                                                                                                                                                             |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Pseudo F   | Main test statistic for whether group membership explains part of total discrepancy.                                                                                                                                                               |
| Pseudo Fbf | Brown-Forsythe-type pseudo F included for TraMineR compatibility; useful as a cautious companion statistic when within-group discrepancies differ. Studer et al. (2011) focus mainly on pseudo F, pseudo R², and the generalized Levene statistic. |
| Pseudo R²  | Share of total discrepancy explained by the grouping variable.                                                                                                                                                                                     |
| Bartlett   | Legacy discrepancy-homogeneity statistic included for TraMineR compatibility; use cautiously, especially with weights.                                                                                                                             |
| Levene     | Preferred generalized discrepancy-homogeneity statistic in Studer et al. (2011), based on distances to group centers.                                                                                                                              |

The function also returns an ANOVA-like table with explained sum of squares, residual sum of squares, and total sum of squares.

## Step 4: Decide Whether the Association Is Stronger Than Chance

In ordinary ANOVA, the F statistic is usually compared with a theoretical F distribution. This relies on assumptions that are not appropriate for sequence objects and distance matrices.

Sequenzo therefore uses permutation tests. The idea is simple:

1. Keep the sequences and distance matrix fixed.
2. Randomly shuffle the group labels.
3. Recompute the pseudo-F statistic.
4. Repeat this many times.
5. Compare the observed pseudo-F with the pseudo-F values obtained after shuffling.

If the observed pseudo-F is larger than most values obtained from random shuffling, the group difference is unlikely to be due to chance.

For example, if only 2% of the permuted pseudo-F values are as large as the observed pseudo-F, the permutation p-value is approximately 0.02.

When you set `R > 1` in `single_factor_association()`, the package performs this permutation procedure. Larger values of `R` give more stable p-values but require more computation.

With weights supplied and `weight_permutation=None`, Sequenzo defaults to `"replicate"`, matching TraMineR `dissassoc()`. For survey or calibration weights, pass `weight_permutation="diss"` explicitly, as recommended by Studer et al. (2011). See [Permutation Tests](./permutation-tests.md).

## Step 5: Test Whether Groups Differ in Internal Heterogeneity

A grouping variable can matter in two different ways.

First, groups may have different average trajectory patterns. For example, one group may be closer to higher-education trajectories while another group may be closer to employment-dominated trajectories. This is what pseudo F and pseudo R² mainly capture.

Second, groups may differ in how internally diverse they are. One group may have very homogeneous trajectories, while another group may contain many different pathways.

This is the purpose of the generalized Levene statistic. It asks whether within-group discrepancies differ across groups.

For example, suppose students from grammar schools tend to follow relatively similar trajectories, while students from non-grammar schools follow more diverse pathways. The pseudo-F test may tell us whether the two groups differ overall. The Levene statistic tells us whether one group is more internally heterogeneous than the other.

This distinction is important because a significant group difference may reflect both:

1. separation between group trajectory patterns, and
2. unequal diversity within the groups.

## Step 6: Localize Differences Along Time

A global association test can be significant even when groups differ only in a short period, such as early career, the transition to parenthood, or the period immediately after treatment.

`compare_groups_across_positions()` repeats the association logic on moving sub-sequence windows. For each anchor position, it builds a local distance matrix and runs the same pseudo-ANOVA summaries.

This is window-wise local discrepancy analysis. It is not a cell-by-cell cross-tabulation of states at each time point unless the window length is effectively one.

Use this when your research question is not only whether groups differ, but **when** they differ.

For example, two groups may have similar early trajectories but diverge later. Alternatively, they may differ strongly at the beginning but converge over time. Window-wise discrepancy analysis helps identify where along the sequence axis the association is strongest.

## Step 7: Explain Heterogeneity with Trees

When you have several covariates and want a compact partition of trajectory discrepancy, use a distance tree.

* `distance_tree()` takes a distance matrix plus a predictor data frame.
* `sequence_tree()` is the same method, but it can compute the distance matrix for you from `SequenceData`.

At each node, the algorithm searches for the binary covariate split with the highest pseudo-R². A split is kept only if a pseudo-F permutation test shows that the reduction in within-node discrepancy is stronger than chance.

Leaf nodes describe subpopulations with lower within-node sequence discrepancy. In substantive terms, the tree tries to find groups of individuals whose trajectories are more similar within the group and more different across groups.

Distance trees are useful when the association between trajectories and covariates is not well described by one variable alone. They can reveal interactions. For example, educational background may matter more among one gender than another, or parental unemployment may matter mainly among individuals with lower qualifications.

## Multifactor and Marginal Association

When you have several covariates, Sequenzo offers two different summaries. Do not mix them up.

`marginal_factor_association()` tests **raw** single-factor association one variable at a time. Each test ignores the other covariates, so the result for one predictor does not tell you what that predictor adds once the others are already in the model.

For example, if parental education and school type are strongly related, both may show strong marginal associations with trajectories. But this does not tell us whether each still matters after adjusting for the other.

`multifactor_association()` follows Type II logic from multifactor ANOVA (Shaw & Mitchell-Olds, 1993). Start from the model with all covariates included. Then, for each predictor, remove only that covariate while keeping the rest, and measure how much of the explained discrepancy is lost. Each reported contribution is therefore conditional on the remaining predictors.

Type II differs from Type I incremental sums of squares. In a Type I breakdown, covariates are added one after another, and the contribution of each variable depends on the order in which you enter them. Type II does not use that ordering: every covariate is evaluated against the same full model. Studer et al. (2011) adopt Type II because it is more stable when interaction effects are weak or absent.

In short:

| Function                        | What it measures                                                           | Adjusts for other covariates? |
| ------------------------------- | -------------------------------------------------------------------------- | ----------------------------- |
| `marginal_factor_association()` | Raw association, one factor at a time                                      | No                            |
| `multifactor_association()`     | Type II partial contribution after dropping one factor from the full model | Yes                           |

## How to Interpret Results

A discrepancy analysis result should usually be interpreted in three steps.

First, check the pseudo-R². This tells you the size of the association: how much of the total trajectory discrepancy is explained by the grouping variable or model.

Second, check the permutation p-value. This tells you whether the observed association is stronger than expected under random group assignment.

Third, inspect plots, window-wise results, or trees to understand what the difference means substantively. A significant pseudo-F only tells you that groups differ under the chosen distance measure. It does not by itself tell you whether the difference is mainly about timing, sequencing, duration, or internal heterogeneity.

A useful interpretation should therefore mention:

* the chosen distance measure,
* the size of the association,
* the statistical evidence from permutation tests,
* and the substantive trajectory pattern behind the result.

For example:

> Using an OM distance, educational group explains 8% of the total discrepancy in employment trajectories. The permutation test suggests that this association is unlikely under random group assignment. Window-wise results show that the difference is strongest in the early transition from education to work, suggesting that the educational groups mainly differ in the timing and stability of labor-market entry.

## Common Misunderstandings

### Discrepancy is not within-sequence complexity

Discrepancy measures variation between sequences. It does not measure how complex a single sequence is.

A person who moves through many states may have a complex trajectory, but discrepancy analysis asks whether that trajectory is similar or dissimilar to the trajectories of others.

### A significant pseudo-F does not identify the exact source of difference

A significant pseudo-F tells you that group membership explains part of the total discrepancy under the chosen distance measure. It does not automatically tell you whether the groups differ in timing, order, duration, or state composition.

To understand the source of the difference, inspect sequence plots, representative sequences, window-wise results, and the substantive meaning of the distance measure.

### Pseudo R² is not a conventional regression R²

Pseudo R² is the share of distance-based discrepancy explained by the grouping variable or model. It is analogous to R² in spirit, but it is computed from a dissimilarity matrix rather than from squared deviations around a numeric mean.

### Different distance measures can produce different conclusions

This does not mean that one result is necessarily wrong. It means that each distance measure defines trajectory difference in a particular way. The choice of distance should match the research question.

## What to Read Next

| If you want to…                  | Read                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------- |
| Test one grouping variable       | [`single_factor_association()`](./get-group-distance-association.md)          |
| Scan differences by time window  | [`compare_groups_across_positions()`](./get-group-differences-by-position.md) |
| Understand permutation options   | [Permutation Tests](./permutation-tests.md)                                   |
| Build a distance tree            | [`distance_tree()`](./build-distance-tree.md)                                 |
| Build a tree from `SequenceData` | [`sequence_tree()`](./build-sequence-tree.md)                                 |

## Authors

Documentation: Yuqi Liang

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences. *Sociological Methods & Research*, 40(3), 471–510.

Batagelj, V. (1988). Generalized Ward and related clustering problems. In H. H. Bock (Ed.), *Classification and Related Methods of Data Analysis* (pp. 67–74). North-Holland.

McArdle, B. H., & Anderson, M. J. (2001). Fitting multivariate models to community data: A comment on distance-based redundancy analysis. *Ecology*, 82(1), 290–297.

Mielke, P. W., & Berry, K. J. (2007). *Permutation Methods: A Distance Function Approach* (2nd ed.). Springer.

Anderson, M. J. (2001). A new method for non-parametric multivariate analysis of variance. *Austral Ecology*, 26, 32–46.

Shaw, R. G., & Mitchell-Olds, T. (1993). ANOVA for unbalanced data: an overview. *Ecology*, 74(6), 1638–1645.
