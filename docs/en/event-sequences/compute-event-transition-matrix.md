# `compute_event_transition_matrix()`

`compute_event_transition_matrix()` summarizes how often one event is followed by another.

## Function Usage

```python
compute_event_transition_matrix(
    eseq,
    weighted=True,
    normalize=True
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

## What It Returns

A square DataFrame where:

- Rows = source event
- Columns = next event
- Values = transition count or transition probability

## Example

```python
tm = compute_event_transition_matrix(eseq, normalize=True)
print(tm)
```

## R Counterpart

- **Closest R function:** `seqetm`
- **Mapping note:** Both are transition-focused helpers in event-sequence workflows. Sequenzo returns event-to-event count/probability matrices for analysis and reporting.

## Notes

- When `normalize=True`, each non-empty row sums to 1.
- Use `normalize=False` to get raw weighted counts.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Burgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.