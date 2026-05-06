# `get_distinct_state_sequences()`

Returns DSS (distinct successive states) representation for each sequence.

## Function

```python
from sequenzo import get_distinct_state_sequences
result = get_distinct_state_sequences(seqdata, fill_value=-999)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `fill_value`: value used for empty trailing spell slots.

## Returns

`DataFrame` with DSS spells by sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqdss`.

## Author

Code and documentation: Yuqi Liang
