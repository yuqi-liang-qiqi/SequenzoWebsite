# `get_duration_standard_deviation()`

Computes standard deviation of spell durations for each sequence.

## Function

```python
from sequenzo import get_duration_standard_deviation
result = get_duration_standard_deviation(seqdata, type=1, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `type`: `1` observed durations, `2` with zero-length for nonvisited states.
- `with_missing`: include missing state or not.

## Returns

`DataFrame` with duration standard deviation (`Dustd` or `Dustd2`).

## TraMineR Mapping

- Equivalent TraMineR functions: `seqivardur` and `seqindic` (`dustd` / `dustd2`).

## Author

Code and documentation: Yuqi Liang
