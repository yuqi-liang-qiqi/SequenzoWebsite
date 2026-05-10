# `get_sequence_length()`

Computes sequence length for each case.

## Function

```python
from sequenzo import get_sequence_length
result = get_sequence_length(seqdata, with_missing=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing positions in length.

## Returns

`DataFrame` with one row per sequence and a length column.

## TraMineR Mapping

- Equivalent TraMineR function: `seqlength`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
