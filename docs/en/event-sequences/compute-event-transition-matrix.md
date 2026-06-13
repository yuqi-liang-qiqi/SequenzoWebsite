# `compute_event_transition_matrix()`

`compute_event_transition_matrix()` summarizes how often one event is immediately followed by another in event order.

## Function Usage

```python
compute_event_transition_matrix(
    eseq,
    weighted=True,
    normalize=True,
    use_weights=None
)
```

## TraMineR Parameter Mapping

- `event_sequences` -> TraMineR `eseq`
- `weighted` -> TraMineR `weighted`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `event_sequences` (`event_sequences`) | ✓ | EventSequenceData / EventSequenceList | The full event-sequence dataset to summarize. |
| `weighted` | ✗ | bool | Use sequence weights if available. |
| `normalize` | ✗ | bool | If `True`, convert counts to row-wise probabilities. |
| `use_weights` | ✗ | bool / None | Backward-compatible alias for `weighted`. If provided, it overrides `weighted`. |

## Returns

A square DataFrame where:

- Rows = source event
- Columns = next event in order
- Values = adjacent event-order count or row-wise probability

## Example

```python
tm = compute_event_transition_matrix(eseq, normalize=True)
print(tm)
```

## R Counterpart

- **Closest R function:** `seqetm`
- **Mapping note:** This is a practical Sequenzo helper for summarizing adjacent event-to-event movements. It is related to transition-focused event-sequence workflows, but it should not be confused with the formal event-sequence definition of a transition, where a transition may contain several simultaneous events.

## Notes

- When `normalize=True`, each non-empty row sums to 1.
- Use `normalize=False` to get raw weighted counts.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
