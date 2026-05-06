# Statistical Helpers: Sequenzo and TraMineR Mapping

This page maps Sequenzo statistics functions to their closest TraMineR counterparts for users migrating from R.

## What This Section Covers

This section contains statistical helpers for aggregation, reporting, and compact description of sequence outputs (for example, summaries, mean-time tables, modal-state summaries, and weighted descriptive helpers).

For TraMineR users, this is typically the step after computing indicators: organize results, summarize patterns, and prepare comparison-ready tables.

## How It Relates to `sequence-characteristics-indicators`

`sequence-characteristics-indicators` is where you compute sequence measures themselves; `statistics` is where you summarize and inspect those measures (or related distributions) in a cleaner analytical form.

In short:

- `sequence-characteristics-indicators` answers: **"Which indicator value does each sequence get?"**
- `statistics` answers: **"What is the overall picture of these values/distributions?"**

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`get_distinct_state_sequences`](./distinct-state-sequences) | `seqdss` | Direct conceptual match (distinct successive states). |
| [`get_state_spell_durations`](./state-spell-durations) | `seqdur` | Direct conceptual match (spell durations). |
| [`get_mean_time_by_state`](./mean-time-by-state) | `seqmeant` | Direct conceptual match (mean time in each state). |
| [`get_individual_state_distribution`](./individual-state-distribution) | `seqistatd` | Direct conceptual match (state distribution per sequence). |
| [`get_modal_state_sequence`](./modal-state-sequence) | `seqmodst` | Direct conceptual match (modal state at each time position). |
| [`get_sequence_length_summary`](./sequence-length-summary) | `seqstatl` (or `seqlength` + summary) | Direct practical mapping for sequence-length summaries. |
| [`get_transition_count_summary`](./transition-count-summary) | `seqtransn` + summary | Direct practical mapping for transition-count summaries. |
| [`get_weighted_mean`](./weighted-mean) | `weighted.mean` | Standard weighted statistics function in R (not specific to TraMineR). |
| [`get_weighted_variance`](./weighted-variance) | `weighted.var` | Standard weighted statistics function in R-style workflows (not specific to TraMineR). |
| [`get_weighted_five_number_summary`](./weighted-five-number-summary) | `weighted.fivenum` | Standard weighted descriptive summary function (not specific to TraMineR). |

## Reading the Table (Beginner Guide)

- **Direct conceptual match**: you can usually translate your workflow almost 1:1 from TraMineR.
- **Direct practical mapping**: TraMineR often provides the core metric function, and Sequenzo provides a summary-oriented function based on the same idea.
- **General statistics function**: this function is commonly used in weighted analyses in R and can also be used in sequence-analysis workflows.

## Author

Code and documentation: Yuqi Liang
