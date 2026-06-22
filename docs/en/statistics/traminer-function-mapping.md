# Statistical Helpers: Sequenzo and TraMineR Mapping

This page maps Sequenzo statistics functions to their closest R counterparts for users migrating from R. Most sequence summaries align with TraMineR core; the general weighted helpers are not TraMineR-specific public APIs.

## What This Section Covers

The `statistics` section focuses on aggregation and reporting helpers after core sequence indicators are computed.

- `sequence-characteristics-indicators` asks: **"Which value does each sequence get?"**
- `statistics` asks: **"How do we summarize those values and distributions?"**

## Mapping Table

| Sequenzo function | R counterpart | Notes |
| --- | --- | --- |
| [`get_distinct_state_sequences`](./distinct-state-sequences) | `TraMineR::seqdss()` | In code, implemented via `TraMineR::seqdss()` (`sequence_statistics.py`). |
| [`get_state_spell_durations`](./state-spell-durations) | `TraMineR::seqdur()` | In code, implemented via `TraMineR::seqdur()` (`sequence_statistics.py`). |
| [`get_mean_time_by_state`](./mean-time-by-state) | `TraMineR::seqmeant()` | In code/docstring marked equivalent to `TraMineR::seqmeant()`. |
| [`get_individual_state_distribution`](./individual-state-distribution) | `TraMineR::seqistatd()` | In code/docstring marked equivalent to `TraMineR::seqistatd()`. |
| [`get_modal_state_sequence`](./modal-state-sequence) | `TraMineR::seqmodst()` | In code/docstring marked equivalent to `TraMineR::seqmodst()`. |
| [`get_sequence_length_summary`](./sequence-length-summary) | `TraMineR::seqlength()` (summary table added in Sequenzo) | Sequenzo computes `TraMineR::seqlength()`-style values, then returns summary stats (`count`, `mean`, `median`, `q1`, `q3`, etc.). |
| [`get_transition_count_summary`](./transition-count-summary) | `TraMineR::seqtransn()` (summary table added in Sequenzo) | Sequenzo computes `TraMineR::seqtransn()`-style values, then returns summary stats (`count`, `mean`, `median`, `q1`, `q3`, etc.). |
| [`get_weighted_mean`](./weighted-mean) | `stats::weighted.mean()` | In code/docstring marked equivalent to `stats::weighted.mean()` helper behavior. |
| [`get_weighted_variance`](./weighted-variance) | No TraMineR public counterpart; closest behavior is TraMineR internal `wtd.var()`-style weighted variance | General weighted numeric summary, not a TraMineR sequence-analysis entry point. |
| [`get_weighted_five_number_summary`](./weighted-five-number-summary) | No TraMineR public counterpart; general weighted quantile/five-number summary helper | General weighted descriptive summary, not a TraMineR sequence-analysis entry point. |

## Authors
