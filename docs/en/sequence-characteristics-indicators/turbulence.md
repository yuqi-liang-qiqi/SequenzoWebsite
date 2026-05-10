# `get_turbulence()`

Computes turbulence for each sequence from subsequence diversity and spell-duration variance.

## Function

```python
from sequenzo import get_turbulence
result = get_turbulence(seqdata, norm=False, silent=True, type=1, id_as_column=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `norm`: normalize turbulence value.
- `silent`: suppress progress messages.
- `type`: spell-variance type (`1` or `2`).
- `id_as_column`: return ID as a regular column.

## Returns

`DataFrame` with turbulence values by sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqST`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.

