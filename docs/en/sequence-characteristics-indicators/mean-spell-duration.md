# `get_mean_spell_duration()`

Computes mean spell duration for each sequence.

## Function

```python
from sequenzo import get_mean_spell_duration
result = get_mean_spell_duration(seqdata, type=1, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `type`: `1` for observed spells, `2` including zero-length nonvisited states.
- `with_missing`: include missing as regular state.

## Returns

`DataFrame` with mean spell duration (`MeanD` or `MeanD2`).

## TraMineR Mapping

- Equivalent TraMineR functions: `seqivardur` and `seqindic` (`meand` / `meand2`).

## Author

Code and documentation: Yuqi Liang
