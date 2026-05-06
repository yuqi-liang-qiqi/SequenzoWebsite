# `get_transition_count_summary()`

Returns descriptive summary statistics for transition counts.

## Function

```python
from sequenzo import get_transition_count_summary
result = get_transition_count_summary(seqdata, normalize=False, probability_weighted=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `normalize`: summarize normalized transition values.
- `probability_weighted`: summarize probability-weighted transitions.

## Returns

One-row `DataFrame` with `count`, `mean`, `median`, `min`, `q1`, `q3`, `max`.

## TraMineR Mapping

- Base TraMineR function used: `seqtransn` (Sequenzo adds summary statistics wrapper).

## Author

Code and documentation: Yuqi Liang
