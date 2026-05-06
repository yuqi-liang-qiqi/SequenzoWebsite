# `get_spell_duration_variance()`

Computes variance of spell durations for each sequence.

## Function

```python
from sequenzo import get_spell_duration_variance
result = get_spell_duration_variance(seqdata, type=1)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `type`: `1` standard spell-variance, `2` variant including nonvisited states.

## Returns

A dictionary with DataFrames: mean duration, variance, and maximum variance.

## TraMineR Mapping

- Equivalent TraMineR function: `seqivardur`.

## Author

Code and documentation: Yuqi Liang
