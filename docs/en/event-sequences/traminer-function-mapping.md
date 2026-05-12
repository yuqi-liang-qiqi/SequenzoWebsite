# Event Sequences: Sequenzo and TraMineR Mapping

This page maps Sequenzo event-sequence functions to their closest TraMineR counterparts.

## What This Section Covers

This section focuses on event-sequence workflows: creating event-sequence objects, mining subsequences, comparing groups, and plotting event-pattern results.

For TraMineR users, this is the event-sequence analysis layer (`seqe*` family and related plot methods).

## Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`EventSequenceData.from_tse()/from_state_sequences()`](./create-event-sequences) | `seqecreate` | Build event-sequence objects from TSE input or from state sequences. |
| [`find_frequent_subsequences`](./find-frequent-subsequences) | `seqefsub` | Direct conceptual match for frequent subsequence mining. |
| [`count_subsequence_occurrences`](./count-subsequence-occurrences) | `seqeapplysub` | Count subsequence matches per sequence; counting rules align with `countMethod` in `seqeconstraint()`. |
| [`compare_groups`](./compare-groups) | `seqecmpgroup` | Direct conceptual match for discriminant subsequences across groups. |
| [`check_event_subsequence_containment`](./check-event-subsequence-containment) | `seqecontain` | Check whether a target subsequence appears in each sequence. |
| [`plot_subsequence_frequencies`](./plot-subsequence-frequencies) | `plot.subseqelist` | Plot support/frequency for mined subsequences. |
| [`plot_event_parallel_coordinates`](./plot-event-parallel-coordinates) | `seqpcplot` / `plot.seqelist(type="pc")` | Parallel-coordinate view of event sequencing. |
| [`plot_subsequence_group_contrasts`](./plot-subsequence-group-contrasts) | `plot.subseqelistchisq` | Plot group contrasts using frequency or residual views. |
| [`plot_event_dynamics`](./plot-event-dynamics) | TraMineRextras `seqedplot` | Survival-style or binned event-rate views of event timing. |
| [`compute_event_transition_matrix`](./compute-event-transition-matrix) | `seqetm` | Practical helper for adjacent event-order summaries; not the same as a simultaneous-event transition in TraMineR. |
| [`convert_event_sequences_to_tse`](./convert-event-sequences-to-tse) | `seqe2tse` | Convert event-sequence objects to TSE-style table format. |
| [`event_sequence_helpers`](./event-sequence-helpers) (`is_event_sequence`, `is_event_sequence_collection`, `get_event_sequence_lengths`, `get_event_sequence_weights`) | `is.eseq`, `is.seqelist`, `seqelength`, `seqeweight` | Helper functions for object checks and metadata access. |

## Author

Code and documentation: Yuqi Liang

## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
