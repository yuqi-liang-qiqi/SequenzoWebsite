# `get_state_spell_durations()`

Returns spell durations per sequence in tabular form.

## Function

```python
from sequenzo import get_state_spell_durations
result = get_state_spell_durations(seqdata, fill_value=0)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `fill_value`: value for missing trailing duration slots.

## Returns

`DataFrame` with duration columns (`Duration1`, `Duration2`, ...).

## TraMineR Mapping

- Equivalent TraMineR function: `seqdur`.

## Author

Code and documentation: Yuqi Liang
