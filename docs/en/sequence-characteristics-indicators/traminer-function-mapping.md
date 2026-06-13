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
| [`get_sequence_length`](./sequence-length) | `seqlength` | Direct match for sequence length. |
| [`get_spell_durations`](./spell-durations) | `seqdur` | Direct match for spell durations. |
| [`get_visited_states`](./visited-states) | `seqindic(indic="visited")` | Counts how many states each sequence visits. |
| [`get_recurrence`](./recurrence) | `seqindic(indic="recu")` | Recurrence-style indicator. |
| [`get_mean_spell_duration`](./mean-spell-duration) | `seqivardur` / `seqindic(meand, meand2)` | Mean spell duration (variant controlled by `type`). |
| [`get_duration_standard_deviation`](./duration-standard-deviation) | `seqivardur` / `seqindic(dustd, dustd2)` | Spell-duration standard deviation variants. |
| [`get_subsequences_all_sequences`](./number-of-subsequences) | `seqsubsn` | Number of distinct subsequences. |
| [`get_number_of_transitions`](./number-of-transitions) | `seqtransn` | Number of transitions (including normalized/weighted options). |
| [`get_spell_duration_variance`](./spell-duration-variance) | `seqivardur` | Spell-duration variance (type 1 / type 2). |
| [`get_state_freq_and_entropy_per_seq`](./state-frequencies-and-entropy-per-sequence) | `seqistatd` | Per-sequence state distribution and related entropy view. |
| [`get_within_sequence_entropy`](./within-sequence-entropy) | `seqient` | Within-sequence entropy. |
| [`get_entropy_difference`](./entropy-difference) | `seqientdiff` | Entropy-difference indicator. |
| [`get_cross_sectional_entropy`](./cross-sectional-entropy) | `seqstatd` | Cross-sectional distribution/entropy by time position. |
| [`get_volatility`](./volatility) | `seqivolatility` | Volatility indicator. |
| [`get_complexity_index`](./complexity-index) | `seqici` | Complexity index. |
| [`get_turbulence`](./turbulence) | `seqST` | Turbulence indicator. |
| [`get_positive_negative_indicators`](./positive-negative-indicators) | `seqipos` / `seqindic(binary)` | Binary-state indicator family. |
| [`get_integration_index`](./integration-index) | `seqintegr` | Integration indicator. |
| [`get_badness_index`](./badness-index) | `seqibad` | Ranked indicator. |
| [`get_degradation_index`](./degradation-index) | `seqidegrad` | Ranked indicator. |
| [`get_precarity_index`](./precarity-index) | `seqprecarity` | Ranked indicator. |
| [`get_insecurity_index`](./insecurity-index) | `seqinsecurity` | Ranked indicator. |

## Authors

Code and documentation: Yuqi Liang

## References

Gabadinho, A., G. Ritschard, N. S. Müller and M. Studer (2011). Analyzing and Visualizing State Sequences in R with TraMineR. Journal of Statistical Software 40(4), 1-37.

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.

