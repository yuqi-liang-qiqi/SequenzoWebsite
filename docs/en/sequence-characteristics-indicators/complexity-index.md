# `get_complexity_index()`

Computes complexity from transition intensity and within-sequence entropy.

## Function

```python
from sequenzo import get_complexity_index
result = get_complexity_index(seqdata, silent=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `silent`: suppress progress messages.

## Returns

`DataFrame` with complexity index values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqici`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
