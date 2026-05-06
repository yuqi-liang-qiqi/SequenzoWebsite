# `get_visited_states()`

Counts how many distinct states are visited in each sequence.

## Function

```python
from sequenzo import get_visited_states
result = get_visited_states(seqdata, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing state in visited count.

## Returns

`DataFrame` with visited-state counts per sequence.

## TraMineR Mapping

- Equivalent TraMineR indicator: `seqindic(indic="visited")`.

## Author

Code and documentation: Yuqi Liang
