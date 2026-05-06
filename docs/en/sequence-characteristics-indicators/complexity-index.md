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
