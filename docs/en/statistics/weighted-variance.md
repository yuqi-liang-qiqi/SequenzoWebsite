# `get_weighted_variance()`

Computes weighted variance for numeric arrays.

## Function

```python
from sequenzo import get_weighted_variance
value = get_weighted_variance(values, weights=None, remove_missing=True, ddof=0)
```

## Parameters

- `values`: numeric array.
- `weights`: optional numeric weights.
- `remove_missing`: drop missing values before computing.
- `ddof`: delta degrees of freedom.

## Returns

A scalar weighted variance.

## TraMineR Mapping

- No direct single TraMineR counterpart (generic weighted utility in Sequenzo statistics).

## Author

Code and documentation: Yuqi Liang
