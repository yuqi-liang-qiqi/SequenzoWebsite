# Event Sequences: Sequenzo and TraMineR Mapping

This page maps Sequenzo event-sequence functions to their closest TraMineR counterparts.

## What This Section Covers

This section focuses on event-sequence workflows: creating event-sequence objects, mining subsequences, comparing groups, and plotting event-pattern results.

For TraMineR users, this is the event-sequence analysis layer (`seqe*` family and related plot methods).

## Mapping Table

| Sequenzo function | TraMineR counterpart | Notes |
| --- | --- | --- |
| [`EventSequenceData.from_tse()/from_state_sequences()`](./create_event_sequences) | `seqecreate` | Build event-sequence objects from TSE input or from state sequences. |
| [`find_frequent_subsequences`](./find_frequent_subsequences) | `seqefsub` | Direct conceptual match for frequent subsequence mining. |
| [`count_subsequence_occurrences`](./count_subsequence_occurrences) | `seqeapplysub` | Direct conceptual match for counting subsequence matches. |
| [`compare_groups`](./compare_groups) | `seqecmpgroup` | Direct conceptual match for discriminant subsequences across groups. |
| [`check_event_subsequence_containment`](./check_event_subsequence_containment) | `seqecontain` | Check whether a target subsequence appears in each sequence. |
| [`plot_subsequence_frequencies`](./plot_subsequence_frequencies) | `plot.subseqelist` | Plot support/frequency for mined subsequences. |
| [`plot_event_parallel_coordinates`](./plot_event_parallel_coordinates) | `seqpcplot` / `plot.seqelist(curve_type="pc")` | Parallel-coordinate view of event sequencing. |
| [`plot_subsequence_group_contrasts`](./plot_subsequence_group_contrasts) | `plot.subseqelistchisq` | Plot group contrasts using frequency or residual views. |
| [`plot_event_dynamics`](./plot_event_dynamics) | `seqedplot` | Plot survival-style or hazard-style event dynamics. |
| [`compute_event_transition_matrix`](./compute_event_transition_matrix) | `seqetm` | Closest transition-related counterpart in event-sequence workflows. |
| [`convert_event_sequences_to_tse`](./convert_event_sequences_to_tse) | `seqe2tse` | Convert event-sequence objects to TSE-style table format. |
| [`event_sequence_helpers`](./event_sequence_helpers) (`is_event_sequence`, `is_event_sequence_collection`, `get_event_sequence_lengths`, `get_event_sequence_weights`) | `is.eseq`, `is.seqelist`, `seqelength`, `seqeweight` | Helper functions for object checks and metadata access. |

## Author

Code and documentation: Yuqi Liang
