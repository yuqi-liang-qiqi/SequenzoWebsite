# Indicator Functions: Sequenzo and TraMineR Mapping

This page maps Sequenzo indicator functions to their closest TraMineR counterparts for users migrating from R.

## What This Section Covers

This section focuses on sequence-level indicators: functions that describe the internal structure of each sequence, such as transitions, entropy, complexity, turbulence, and quality-related scores.

For TraMineR users, you can think of this as the place to compute your core individual indicators first.

## How It Relates to `statistics`

After computing indicators here, the `statistics` section helps you summarize and compare results (for example, descriptive summaries, state-time aggregates, and helper statistics).

In short:

- `sequence-characteristics-indicators` answers: **"What is the structure/quality of each sequence?"**
- `statistics` answers: **"How do we summarize or compare those outputs?"**

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`get_sequence_length`](./sequence-length) | `seqlength` | Supports missing handling. |
| [`get_spell_durations`](./spell-durations) | `seqdur` | Spell duration extraction. |
| [`get_visited_states`](./visited-states) | `seqindic(indic="visited")` | Visited-state count indicator. |
| [`get_recurrence`](./recurrence) | `seqindic(indic="recu")` | Recurrence indicator. |
| [`get_mean_spell_duration`](./mean-spell-duration) | `seqivardur` / `seqindic(meand, meand2)` | Uses `type` to switch variants. |
| [`get_duration_standard_deviation`](./duration-standard-deviation) | `seqivardur` / `seqindic(dustd, dustd2)` | SD derived from spell-duration variance. |
| [`get_subsequences_all_sequences`](./number-of-subsequences) | `seqsubsn` | Number of distinct subsequences. |
| [`get_number_of_transitions`](./number-of-transitions) | `seqtransn` | Raw/normalized/weighted variants. |
| [`get_spell_duration_variance`](./spell-duration-variance) | `seqivardur` | Type 1 and type 2 variants. |
| [`get_state_freq_and_entropy_per_seq`](./state-frequencies-and-entropy-per-sequence) | `seqistatd` | State distribution per sequence. |
| [`get_within_sequence_entropy`](./within-sequence-entropy) | `seqient` | Within-sequence entropy. |
| [`get_entropy_difference`](./entropy-difference) | `seqientdiff` | Entropy-difference indicator. |
| [`get_cross_sectional_entropy`](./cross-sectional-entropy) | `seqstatd` | Time-wise cross-sectional distribution/entropy. |
| [`get_volatility`](./volatility) | `seqivolatility` | Objective volatility. |
| [`get_complexity_index`](./complexity-index) | `seqici` | Complexity index. |
| [`get_turbulence`](./turbulence) | `seqST` | Turbulence index. |
| [`get_positive_negative_indicators`](./positive-negative-indicators) | `seqipos` / `seqindic(binary)` | Binary-state indicator family. |
| [`get_integration_index`](./integration-index) | `seqintegr` | Integration potential. |
| [`get_badness_index`](./badness-index) | `seqibad` | Ranked indicator. |
| [`get_degradation_index`](./degradation-index) | `seqidegrad` | Ranked indicator. |
| [`get_precarity_index`](./precarity-index) | `seqprecarity` | Ranked indicator. |
| [`get_insecurity_index`](./insecurity-index) | `seqinsecurity` | Ranked indicator. |

## Author

Code and documentation: Yuqi Liang
