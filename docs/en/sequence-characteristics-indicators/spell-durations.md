# `get_spell_durations()`

Returns spell durations for each sequence (TraMineR-like `seqdur` behavior).

## Function

```python
from sequenzo import get_spell_durations
result = get_spell_durations(seqdata, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: treat missing as a state or ignore.

## Returns

`DataFrame` where each column is a spell duration position.

## TraMineR Mapping

- Equivalent TraMineR function: `seqdur`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
