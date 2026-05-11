# Visualization Functions: Sequenzo and TraMineR Mapping

This page maps Sequenzo visualization functions to their closest TraMineR (or TraMineRextras) counterparts for users migrating from R.

## What This Section Covers

This section focuses on plotting sequence data: index plots, state distributions, modal states, mean-time views, representative patterns, and transition summaries.

For TraMineR users, this is the "visual interpretation" layer after you define sequences and compute distances/indicators.

Some rows are marked **No direct one-function equivalent**. This simply means the same analytical goal is usually reached in TraMineR through multiple steps or a slightly different plotting path, reflecting a different design style rather than a limitation.

## Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`plot_sequence_index`](./index-plot) | `seqiplot` / `seqIplot` | Direct conceptual match (index plot of sequences). |
| [`plot_state_distribution`](./state-distribution-plot) | `seqdplot` | Direct conceptual match (state distribution over time). |
| [`plot_mean_time`](./plot-mean-time) | `seqmtplot` | Direct conceptual match (mean time in states). |
| [`plot_modal_state`](./plot-modal-state) | `seqmsplot` | Direct conceptual match (modal state sequence plot). |
| [`plot_most_frequent_sequences`](./plot-most-frequent-sequences) | `seqfplot` | Closest match (top frequent sequences with frequencies). |
| [`plot_relative_frequency`](./plot-relative-frequency) | `seqplot(type="rf")` (TraMineR) / related RF tooling in TraMineRextras | Conceptually aligned with relative-frequency style visualization. |
| [`plot_single_medoid`](./plot-single-medoid) | No direct one-function equivalent | Closest TraMineR workflow is `seqrep` + `seqrplot`, then choose one medoid manually. |
| [`plot_transition_matrix`](./plot-transition-matrix) | `seqtrate` (matrix computation) | TraMineR computes transition rates; Sequenzo also provides a ready heatmap plot. |
| [`plot_cross_sectional_characteristics`](./plot-cross-sectional-characteristics) | `seqHtplot` (and `seqstatd` for underlying distribution stats) | Cross-sectional entropy-over-time view is conceptually aligned. |
| [`plot_longitudinal_characteristics`](./plot-longitudinal-characteristics) | No direct one-function equivalent | Usually combined from `seqtransn`, `seqient`, `seqST`, `seqici` plus custom plotting. |

## Beginner Migration Tips

- Start with the **direct matches** (`seqiplot`, `seqdplot`, `seqmtplot`, `seqmsplot`) when porting old scripts.
- For rows marked **No direct one-function equivalent**, TraMineR usually reaches the same goal through multiple steps, while Sequenzo provides a dedicated plotting function for that goal.
- If you want an output style close to TraMineR, run the TraMineR function first, then tune Sequenzo plot parameters to get a similar look.

## Author

Documentation: Yuqi Liang

