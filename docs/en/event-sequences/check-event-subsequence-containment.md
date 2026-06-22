# `check_event_subsequence_containment()`

`check_event_subsequence_containment()` tells you whether each sequence contains a target subsequence.

## Function Usage

```python
check_event_subsequence_containment(
    event_sequences,
    target_subsequence,
    search_constraint=None
)
```

## TraMineR Parameter Mapping

- `event_sequences` -> TraMineR `eseq` object
- `target_subsequence` -> `TraMineR::seqecontain()` `subseq`
- `search_constraint` -> `TraMineR::seqecontain()` `constraint`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `event_sequences` (`event_sequences`) | ✓ | EventSequenceData / EventSequenceList | The full event-sequence dataset you want to scan. |
| `target_subsequence` (`target_pattern`) | ✓ | EventSequence / str | The pattern to look for, either as an object or a string like `"(A)-(B,C)"`. |
| `search_constraint` | ✗ | EventSequenceConstraint | Time and counting constraints. |

## Returns

A boolean pandas Series:

- `True` = subsequence appears in that sequence.
- `False` = subsequence does not appear.

## Example

```python
contains = check_event_subsequence_containment(
    event_sequences,
    target_subsequence="(Graduate)-(FindJob)"
)
```

## R Counterpart

- **Closest R function:** `TraMineR::seqecontain()`
- **Mapping note:** Both functions check whether event sequences contain specified subsequence patterns. In Sequenzo, the target pattern can be provided as a string or an event-sequence object.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
