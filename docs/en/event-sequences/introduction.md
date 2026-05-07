# Event Sequences

Event sequence analysis studies **what happens, in what order, and when**.

If you are new, think of it this way:

- A **state sequence** tells you "what state someone is in" at each time point.
- An **event sequence** tells you "what changed" (the event), and optionally the event time.

Both describe trajectories, but they answer different questions.

## Why This Matters

In many real studies, the key question is not only duration, but **ordering of changes**:

- Do people usually graduate before first full-time job?
- Which events tend to appear together?
- Which event patterns are more common in one group than another?

This is exactly the problem setting discussed in:

- Ritschard, G., Burgin, R., & Studer, M. (2013). *Exploratory Mining of Life Event Histories*

That chapter is one of the core foundations for event-sequence mining workflows used in TraMineR and now mirrored in Sequenzo.

## Event Sequences vs State Sequences

| Topic | State Sequences | Event Sequences |
| --- | --- | --- |
| Basic unit | Ongoing state (has duration) | Discrete event (a change point) |
| Typical question | "How long in each state?" | "Which events happen, in what order?" |
| Position meaning | Time position itself | Event order (time can be added via timestamps) |
| Simultaneous changes | Not natural (one state at a time) | Natural (multiple events can happen at same time) |
| Typical outputs | Duration, distribution, turbulence, etc. | Frequent subsequences, discriminant patterns, event transitions |

## How This Section Relates to the 2013 Chapter

This section follows the same practical logic as the chapter:

1. Build event-sequence data
2. Discover frequent subsequences
3. Compare groups with discriminant patterns
4. Summarize and visualize results

### Function-level Relation to the Chapter

| Sequenzo function | Relation to the 2013 chapter |
| --- | --- |
| [`EventSequenceData.from_tse()` / `EventSequenceData.from_state_sequences()`](./create_event_sequences.md) | Build event-sequence objects from TSE input or from state sequences. |
| [`find_frequent_subsequences()`](./find_frequent_subsequences.md) | Core method in the chapter: mine frequent event subsequences. |
| [`count_subsequence_occurrences()`](./count_subsequence_occurrences.md) | Operational step after mining: quantify how often each subsequence occurs. |
| [`compare_groups()`](./compare_groups.md) | Core chapter goal: find subsequences that discriminate groups. |
| [`check_event_subsequence_containment()`](./check_event_subsequence_containment.md) | Conceptually aligned helper: test whether a target pattern appears in each sequence. |
| [`plot_subsequence_frequencies()`](./plot_subsequence_frequencies.md) | Result-communication layer aligned with chapter outputs on frequent patterns. |
| [`plot_event_parallel_coordinates()`](./plot_event_parallel_coordinates.md) | Parallel-coordinate visualization of event-order structures. |
| [`plot_subsequence_group_contrasts()`](./plot_subsequence_group_contrasts.md) | Group contrast view for discriminating subsequences. |
| [`plot_event_dynamics()`](./plot_event_dynamics.md) | Survival/hazard-style event dynamics visualization. |
| [`convert_event_sequences_to_tse()`](./convert_event_sequences_to_tse.md) | Workflow helper for tidy tabular export/import. |
| [`compute_event_transition_matrix()`](./compute_event_transition_matrix.md) | Additional summary view of event-to-event movement patterns. |
| [`is_event_sequence()`, `is_event_sequence_collection()`, `get_event_sequence_lengths()`, `get_event_sequence_weights()`](./event_sequence_helpers.md) | API helper utilities for object checks and metadata access. |

## Quick Start

```python
from sequenzo.event_sequences import (
    EventSequenceData,
    find_frequent_subsequences,
    compare_groups,
    plot_subsequence_frequencies,
)

# 1) Build event sequences (recommended)
eseq = EventSequenceData.from_tse(data=tse_df)

# 2) Mine frequent patterns
fsubseq = find_frequent_subsequences(event_sequences, min_support_ratio=0.05)

# 3) Compare groups (example)
discr = compare_groups(fsubseq, group=df["group"], pvalue_threshold=0.05)

# 4) Plot frequent-pattern summary
plot_subsequence_frequencies(fsubseq)
```

## Learning Path for Beginners

- [`EventSequenceData.from_tse()` / `EventSequenceData.from_state_sequences()`](./create_event_sequences.md) is conceptually similar to [`SequenceData()`](../function-library/sequence-data.md) in terms of workflow usage.
- Use [`find_frequent_subsequences()`](./find_frequent_subsequences.md) to see common event patterns.
- Use [`compare_groups()`](./compare_groups.md) when your question is "which patterns differ by group?".
- Use [`plot_subsequence_frequencies()`](./plot_subsequence_frequencies.md) to communicate top findings clearly.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Burgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.