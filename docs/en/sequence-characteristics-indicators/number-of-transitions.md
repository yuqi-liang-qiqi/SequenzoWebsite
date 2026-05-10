# `get_number_of_transitions()`

Counts transitions (state changes) for each sequence.

## Function

```python
from sequenzo import get_number_of_transitions
result = get_number_of_transitions(seqdata, norm=False, pwight=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `norm`: normalize by sequence length minus one.
- `pwight`: apply probability-based transition weighting.

## Returns

`DataFrame` with transition counts (or normalized/weighted values).

## TraMineR Mapping

- Equivalent TraMineR function: `seqtransn`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
