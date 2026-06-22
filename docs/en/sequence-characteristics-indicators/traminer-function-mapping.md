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
| [`get_sequence_length`](./sequence-length) | `TraMineR::seqlength()` | Direct match for sequence length. |
| [`get_spell_durations`](./spell-durations) | `TraMineR::seqdur()` | Direct match for spell durations. |
| [`get_visited_states`](./visited-states) | `TraMineR::seqindic(indic="visited")` | Counts how many states each sequence visits. |
| [`get_recurrence`](./recurrence) | `TraMineR::seqindic(indic="recu")` | Recurrence-style indicator. |
| [`get_mean_spell_duration`](./mean-spell-duration) | `TraMineR::seqivardur()` / `TraMineR::seqindic()` (`meand`, `meand2`) | Mean spell duration (variant controlled by `type`). |
| [`get_duration_standard_deviation`](./duration-standard-deviation) | `TraMineR::seqivardur()` / `TraMineR::seqindic()` (`dustd`, `dustd2`) | Spell-duration standard deviation variants. |
| [`get_subsequences_all_sequences`](./number-of-subsequences) | `TraMineR::seqsubsn()` | Number of distinct subsequences. |
| [`get_number_of_transitions`](./number-of-transitions) | `TraMineR::seqtransn()` | Number of transitions (including normalized/weighted options). |
| [`get_spell_duration_variance`](./spell-duration-variance) | `TraMineR::seqivardur()` | Spell-duration variance (type 1 / type 2). |
| [`get_state_freq_and_entropy_per_seq`](./state-frequencies-and-entropy-per-sequence) | `TraMineR::seqistatd()` | Per-sequence state distribution and related entropy view. |
| [`get_within_sequence_entropy`](./within-sequence-entropy) | `TraMineR::seqient()` | Within-sequence entropy. |
| [`get_entropy_difference`](./entropy-difference) | TraMineR internal `seqientdiff()` | Entropy-difference indicator. |
| [`get_cross_sectional_entropy`](./cross-sectional-entropy) | `TraMineR::seqstatd()` | Cross-sectional distribution/entropy by time position. |
| [`get_volatility`](./volatility) | `TraMineR::seqivolatility()` | Volatility indicator. |
| [`get_complexity_index`](./complexity-index) | `TraMineR::seqici()` | Complexity index. |
| [`get_turbulence`](./turbulence) | `TraMineR::seqST()` | Turbulence indicator. |
| [`get_positive_negative_indicators`](./positive-negative-indicators) | `TraMineR::seqipos()` / `TraMineR::seqindic()` binary indicators | Binary-state indicator family. |
| [`get_integration_index`](./integration-index) | `TraMineR::seqintegr()` | Integration indicator. |
| [`get_badness_index`](./badness-index) | `TraMineR::seqibad()` | Ranked indicator. |
| [`get_degradation_index`](./degradation-index) | `TraMineR::seqidegrad()` | Ranked indicator. |
| [`get_precarity_index`](./precarity-index) | `TraMineR::seqprecarity()` | Ranked indicator. |
| [`get_insecurity_index`](./insecurity-index) | `TraMineR::seqinsecurity()` | Ranked indicator. |

## Authors

Code and documentation: Yuqi Liang

## References

Gabadinho, A., G. Ritschard, N. S. Müller and M. Studer (2011). Analyzing and Visualizing State Sequences in R with TraMineR. Journal of Statistical Software 40(4), 1-37.

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
