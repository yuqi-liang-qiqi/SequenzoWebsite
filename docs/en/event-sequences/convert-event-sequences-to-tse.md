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

## Returns

`pandas.core.frame.DataFrame`.

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

- **Closest R workflow:** `TraMineR::seqformat(..., to = "TSE")`
- **Mapping note:** TraMineR also has an internal helper named `seqe2TSE`, but the documented public conversion path is `seqformat(..., to = "TSE")`. Avoid relying on undocumented casing variants.

## Notes

- This is a format conversion only; it does not change your original object.
- Output is sorted by `id`, `timestamp`, and `event`.

## See Also

- [Event Sequences Introduction](/en/event-sequences/introduction) explains the workflow and data structures.
- [Quickstart Example](/en/event-sequences/example) shows a complete event-mining run.
- [Helper Functions](/en/event-sequences/event-sequence-helpers) lists supporting utilities.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), *Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences* (pp. 221-253). Routledge.
