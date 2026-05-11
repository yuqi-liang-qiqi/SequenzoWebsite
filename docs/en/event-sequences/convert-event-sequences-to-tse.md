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

- **Closest R function:** No direct one-function equivalent found in TraMineR core docs.
- **Mapping note:** This Sequenzo helper is a practical export step to a tidy TSE table (`id`, `timestamp`, `event`). In TraMineR workflows, related format conversion is typically handled through `seqformat` and object constructors rather than a dedicated `seqe2tse` user-facing function.

## Notes

- This is a format conversion only; it does not change your original object.
- Output is sorted by `id`, `timestamp`, and `event`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Burgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.