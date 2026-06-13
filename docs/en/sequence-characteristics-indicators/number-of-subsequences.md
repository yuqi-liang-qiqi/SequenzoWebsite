# `get_subsequences_all_sequences()`

Counts the number of distinct subsequences for each sequence.

## Function Usage

```python
from sequenzo import get_subsequences_all_sequences, get_subsequences_in_single_sequence
result = get_subsequences_all_sequences(seqdata, dss=True, with_missing=False)
```

For one already encoded sequence row, `get_subsequences_in_single_sequence()` is the lower-level helper used by the all-sequences function.

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `dss`: remove consecutive duplicates before counting.
- `with_missing`: include missing states during counting.

## Returns

`DataFrame` with subsequence counts per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqsubsn`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
