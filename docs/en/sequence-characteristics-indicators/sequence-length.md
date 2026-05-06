# `get_sequence_length()`

Computes sequence length for each case.

## Function

```python
from sequenzo import get_sequence_length
result = get_sequence_length(seqdata, with_missing=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing positions in length.

## Returns

`DataFrame` with one row per sequence and a length column.

## TraMineR Mapping

- Equivalent TraMineR function: `seqlength`.

## Author

Code and documentation: Yuqi Liang
