# `check_event_subsequence_containment()`

`check_event_subsequence_containment()` tells you whether each sequence contains a target subsequence.

## Function Usage

```python
check_event_subsequence_containment(
    event_sequences,
    target_subsequence,
    search_search_constraint=None
)
```

## TraMineR Parameter Mapping

- `event_sequences` -> TraMineR `eseq`
- `target_subsequence` -> TraMineR `subseq`
- `search_constraint` -> TraMineR `constraint`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `event_sequences` (`event_sequences`) | ✓ | EventSequenceData / EventSequenceList | The full event-sequence dataset you want to scan. |
| `target_subsequence` (`target_pattern`) | ✓ | EventSequence / str | The pattern to look for, either as an object or a string like `"(A)-(B,C)"`. |
| `search_constraint` | ✗ | EventSequenceConstraint | Time and counting constraints. |

## What It Returns

A boolean pandas Series:

- `True` = subsequence appears in that sequence.
- `False` = subsequence does not appear.

## Example

```python
contains = check_event_subsequence_containment(
    event_sequences,
    subseq="(Graduate)-(FindJob)"
)
```

## R Counterpart

- **Closest R function:** `seqecontain`
- **Mapping note:** Both functions check containment. Sequenzo uses a subsequence target (string or object), while TraMineR `seqecontain` focuses on event-list containment semantics.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Burgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
