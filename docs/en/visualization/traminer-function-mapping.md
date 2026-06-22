# Visualization Functions: Sequenzo and TraMineR Mapping

This page maps Sequenzo visualization functions to their closest R counterparts for users migrating from R. Most state-sequence plot aliases are in TraMineR core; `TraMineRextras::seqplot.rf()` is an optional extension-package relative-frequency plot.

## What This Section Covers

This section focuses on plotting sequence data: index plots, state distributions, modal states, mean-time views, representative patterns, and transition summaries.

For TraMineR users, this is the "visual interpretation" layer after you define sequences and compute distances/indicators.

Some rows are marked **No direct one-function equivalent**. This simply means the same analytical goal is usually reached in TraMineR through multiple steps or a slightly different plotting path, reflecting a different design style rather than a limitation.

## Mapping Table

| Sequenzo function | R counterpart | Notes |
| --- | --- | --- |
| [`plot_sequence_index`](./index-plot) | `TraMineR::seqiplot()` / `TraMineR::seqIplot()` | Direct conceptual match (index plot of sequences). |
| [`plot_state_distribution`](./state-distribution-plot) | `TraMineR::seqdplot()` | Direct conceptual match (state distribution over time). |
| [`plot_mean_time`](./plot-mean-time) | `TraMineR::seqmtplot()` | Direct conceptual match (mean time in states). |
| [`plot_modal_state`](./plot-modal-state) | `TraMineR::seqmsplot()` | Direct conceptual match (modal state sequence plot). |
| [`plot_most_frequent_sequences`](./plot-most-frequent-sequences) | `TraMineR::seqfplot()` | Closest match (top frequent sequences with frequencies). |
| [`plot_relative_frequency`](./plot-relative-frequency) | `TraMineR::seqplot(type="rf")` / `TraMineR::seqrf()`; related extension: `TraMineRextras::seqplot.rf()` | Conceptually aligned with relative-frequency style visualization. |
| [`plot_single_medoid`](./plot-single-medoid) | No direct one-function equivalent | Closest TraMineR workflow is `TraMineR::seqrep()` + `TraMineR::seqrplot()`, then choose one medoid manually. |
| [`plot_transition_matrix`](./plot-transition-matrix) | `TraMineR::seqtrate()` (matrix computation) | TraMineR computes transition rates; Sequenzo also provides a ready heatmap plot. |
| [`plot_cross_sectional_characteristics`](./plot-cross-sectional-characteristics) | `TraMineR::seqHtplot()` (and `TraMineR::seqstatd()` for underlying distribution statistics) | Cross-sectional entropy-over-time view is conceptually aligned. |
| [`plot_longitudinal_characteristics`](./plot-longitudinal-characteristics) | No direct one-function equivalent | Usually combined from `TraMineR::seqtransn()`, `TraMineR::seqient()`, `TraMineR::seqST()`, `TraMineR::seqici()` plus custom plotting. |

## Beginner Migration Tips

- Start with the **direct matches** (`TraMineR::seqiplot()`, `TraMineR::seqdplot()`, `TraMineR::seqmtplot()`, `TraMineR::seqmsplot()`) when porting old scripts.
- For rows marked **No direct one-function equivalent**, TraMineR usually reaches the same goal through multiple steps, while Sequenzo provides a dedicated plotting function for that goal.
- If you want an output style close to TraMineR, run the TraMineR function first, then tune Sequenzo plot parameters to get a similar look.

## Authors

Documentation: Yuqi Liang
