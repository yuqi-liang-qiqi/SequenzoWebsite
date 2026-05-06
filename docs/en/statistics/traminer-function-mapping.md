# Statistical Helpers: Sequenzo and TraMineR Mapping

This page maps Sequenzo statistics functions to their closest TraMineR counterparts.

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
| [`get_distinct_state_sequences`](./distinct-state-sequences) | `seqdss` | Distinct successive states representation. |
| [`get_state_spell_durations`](./state-spell-durations) | `seqdur` | Spell durations by sequence. |
| [`get_mean_time_by_state`](./mean-time-by-state) | `seqmeant` | Mean time in states. |
| [`get_individual_state_distribution`](./individual-state-distribution) | `seqistatd` | Per-sequence state distribution. |
| [`get_modal_state_sequence`](./modal-state-sequence) | `seqmodst` | Modal state sequence. |
| [`get_sequence_length_summary`](./sequence-length-summary) | `seqlength` + summary | Sequenzo adds a summary wrapper. |
| [`get_transition_count_summary`](./transition-count-summary) | `seqtransn` + summary | Sequenzo adds a summary wrapper. |
| [`get_weighted_mean`](./weighted-mean) | No direct single TraMineR wrapper | Generic weighted utility. |
| [`get_weighted_variance`](./weighted-variance) | No direct single TraMineR wrapper | Generic weighted utility. |
| [`get_weighted_five_number_summary`](./weighted-five-number-summary) | No direct single TraMineR wrapper | Generic weighted utility. |

## Author

Code and documentation: Yuqi Liang
