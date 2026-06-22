# Event Sequences: Sequenzo and TraMineR Mapping

This page maps Sequenzo event-sequence functions to their closest R counterparts. Most event-sequence functions are in TraMineR core; event-dynamics plotting is in TraMineRextras.

## What This Section Covers

This section focuses on event-sequence workflows: creating event-sequence objects, mining subsequences, comparing groups, and plotting event-pattern results.

For TraMineR users, this is the event-sequence analysis layer (`seqe*` family and related plot methods). Package namespaces are shown explicitly so you can distinguish TraMineR core from extension-package functions.

## Mapping Table

| Sequenzo function | R counterpart | Notes |
| --- | --- | --- |
| [`EventSequenceData.from_tse()/from_state_sequences()`](./create-event-sequences) | `TraMineR::seqecreate()` | Build event-sequence objects from TSE input or from state sequences. |
| [`find_frequent_subsequences`](./find-frequent-subsequences) | `TraMineR::seqefsub()` | Direct conceptual match for frequent subsequence mining. |
| [`count_subsequence_occurrences`](./count-subsequence-occurrences) | `TraMineR::seqeapplysub()` | Count subsequence matches per sequence; counting rules align with `countMethod` in `TraMineR::seqeconstraint()`. |
| [`compare_groups`](./compare-groups) | `TraMineR::seqecmpgroup()` | Direct conceptual match for discriminant subsequences across groups. |
| [`check_event_subsequence_containment`](./check-event-subsequence-containment) | `TraMineR::seqecontain()` | Check whether a target subsequence appears in each sequence. |
| [`plot_subsequence_frequencies`](./plot-subsequence-frequencies) | `plot()` on a TraMineR `subseqelist` object | Plot support/frequency for mined subsequences; TraMineR registers this as an S3 method. |
| [`plot_event_parallel_coordinates`](./plot-event-parallel-coordinates) | `TraMineR::seqpcplot()` / `TraMineR::seqplot(type="pc")` | Parallel-coordinate view of event sequencing. |
| [`plot_subsequence_group_contrasts`](./plot-subsequence-group-contrasts) | `plot()` on a TraMineR `subseqelistchisq` object | Plot group contrasts using frequency or residual views; TraMineR registers this as an S3 method. |
| [`plot_event_dynamics`](./plot-event-dynamics) | `TraMineRextras::seqedplot()` | Survival-style or binned event-rate views of event timing. |
| [`compute_event_transition_matrix`](./compute-event-transition-matrix) | `TraMineR::seqetm()` | Practical helper for adjacent event-order summaries; not the same as a simultaneous-event transition in TraMineR. |
| [`convert_event_sequences_to_tse`](./convert-event-sequences-to-tse) | `TraMineR::seqformat(..., to = "TSE")` | Public TraMineR conversion path. TraMineR also has an internal helper named `seqe2TSE`; avoid relying on undocumented casing variants. |
| [`event_sequence_helpers`](./event-sequence-helpers) (`is_event_sequence`, `is_event_sequence_collection`, `get_event_sequence_lengths`, `get_event_sequence_weights`) | `TraMineR::is.eseq()`, `TraMineR::is.seqelist()`, `TraMineR::seqelength()`, `TraMineR::seqeweight()` | Helper functions for object checks and metadata access. |

## Authors

Code and documentation: Yuqi Liang

## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
