# Visualization Functions: Sequenzo and TraMineR Mapping

This page maps Sequenzo visualization functions to their closest TraMineR (or TraMineRextras) counterparts for users migrating from R.

## What This Section Covers

This section focuses on plotting sequence data: index plots, state distributions, modal states, mean-time views, representative patterns, and transition summaries.

For TraMineR users, this is the "visual interpretation" layer after you define sequences and compute distances/indicators.

## How to Read "No Direct Equivalent"

If a row says **No direct one-function equivalent**, it means TraMineR can usually do something similar, but not with a single built-in function that matches Sequenzo's exact output and defaults.

## Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`plot_sequence_index`](./index-plot) | `seqiplot` / `seqIplot` | Direct conceptual match (index plot of sequences). |
| [`plot_state_distribution`](./state-distribution-plot) | `seqdplot` | Direct conceptual match (state distribution over time). |
| [`plot_mean_time`](./plot_mean_time) | `seqmtplot` | Direct conceptual match (mean time in states). |
| [`plot_modal_state`](./plot_modal_state) | `seqmsplot` | Direct conceptual match (modal state sequence plot). |
| [`plot_most_frequent_sequences`](./plot_most_frequent_sequences) | `seqfplot` | Closest match (top frequent sequences with frequencies). |
| [`plot_relative_frequency`](./plot_relative_frequency) | `seqplot(type="rf")` (TraMineR) / related RF tooling in TraMineRextras | Conceptually aligned with relative-frequency style visualization. |
| [`plot_single_medoid`](./plot_single_medoid) | No direct one-function equivalent | Closest TraMineR workflow is `seqrep` + `seqrplot`, then choose one medoid manually. |
| [`plot_transition_matrix`](./plot_transition_matrix) | `seqtrate` (matrix computation) | TraMineR computes transition rates; Sequenzo also provides a ready heatmap plot. |
| [`plot_cross_sectional_characteristics`](./plot_cross_sectional_characteristics) | `seqHtplot` (and `seqstatd` for underlying distribution stats) | Cross-sectional entropy-over-time view is conceptually aligned. |
| [`plot_longitudinal_characteristics`](./plot_longitudinal_characteristics) | No direct one-function equivalent | Usually combined from `seqtransn`, `seqient`, `seqST`, `seqici` plus custom plotting. |

## Beginner Migration Tips

- Start with the **direct matches** (`seqiplot`, `seqdplot`, `seqmtplot`, `seqmsplot`) when porting old scripts.
- For rows marked **No direct one-function equivalent**, TraMineR usually needs multiple steps; Sequenzo gives you one clearer plotting function.
- If you need strict TraMineR-style output, run the TraMineR function first, then tune Sequenzo plot parameters to get a similar look.

## Author

Code and documentation: Yuqi Liang

