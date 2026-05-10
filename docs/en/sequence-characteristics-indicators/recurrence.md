# `get_recurrence()`

Computes recurrence as DSS length divided by number of visited states.

## Function

```python
from sequenzo import get_recurrence
result = get_recurrence(seqdata, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing in DSS/visited calculations.

## Returns

`DataFrame` with recurrence values per sequence.

## TraMineR Mapping

- Equivalent TraMineR indicator: `seqindic(indic="recu")`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
