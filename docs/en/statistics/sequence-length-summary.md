# `get_sequence_length_summary()`

Returns descriptive summary statistics for sequence lengths.

## Function

```python
from sequenzo import get_sequence_length_summary
result = get_sequence_length_summary(seqdata, with_missing=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing positions when computing lengths.

## Returns

One-row `DataFrame` with `count`, `mean`, `median`, `min`, `q1`, `q3`, `max`.

## TraMineR Mapping

- Base TraMineR function used: `seqlength` (Sequenzo adds summary statistics wrapper).

## Author

Code and documentation: Yuqi Liang
