# `get_weighted_five_number_summary()`

Computes weighted five-number summary (min, Q1, median, Q3, max).

## Function

```python
from sequenzo import get_weighted_five_number_summary
summary = get_weighted_five_number_summary(values, weights=None, remove_missing=True)
```

## Parameters

- `values`: numeric array.
- `weights`: optional numeric weights.
- `remove_missing`: drop missing values before computation.

## Returns

A dictionary with weighted `min`, `q1`, `median`, `q3`, `max`.

## TraMineR Mapping

- No direct single TraMineR counterpart (generic weighted utility in Sequenzo statistics).

## Author

Code and documentation: Yuqi Liang
