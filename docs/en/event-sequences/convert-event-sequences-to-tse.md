# `convert_event_sequences_to_tse()`

`convert_event_sequences_to_tse()` converts event sequences into a tidy timestamped event table.

## Function Usage

```python
convert_event_sequences_to_tse(event_sequences)
```

## TraMineR Parameter Mapping

- `event_sequences` -> TraMineR `eseq`

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `event_sequences` (`event_sequences`) | ✓ | EventSequenceData / EventSequenceList | The event-sequence dataset to export as a table. |

## Output

A DataFrame with columns:

- `id`
- `timestamp`
- `event`

## Example

```python
tse_df = convert_event_sequences_to_tse(event_sequences)
print(tse_df.head())
```

## R Counterpart

- **Closest R function:** `seqe2tse`
- **Mapping note:** Both functions convert event-sequence objects back to a time-stamped event table.

## Notes

- This is a format conversion only; it does not change your original object.
- Output is sorted by `id`, `timestamp`, and `event`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.