# `get_subsequences_all_sequences()`

Counts the number of distinct subsequences for each sequence.

## Function

```python
from sequenzo import get_subsequences_all_sequences
result = get_subsequences_all_sequences(seqdata, dss=True, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `dss`: remove consecutive duplicates before counting.
- `with_missing`: include missing states during counting.

## Returns

`DataFrame` with subsequence counts per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqsubsn`.

## Author

Code and documentation: Yuqi Liang
