# `get_weighted_variance()`

`get_weighted_variance()` computes the weighted variance of a numeric vector.

## Function Usage

```python
from sequenzo import get_weighted_variance
value = get_weighted_variance(values, weights=None, remove_missing=True, method="unbiased")
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `values` | ✓ | array-like | Numeric values to summarize. |
| `weights` | ✗ | array-like or `None` | Optional weights. If `None`, all values are equally weighted. |
| `remove_missing` | ✗ | bool | If `True`, remove missing values before computing. |
| `method` | ✗ | str | Variance estimation method, default `unbiased`. |

## What It Does

- Validates inputs and aligns `values` and `weights`.
- Optionally removes missing values.
- Computes weighted variance using the selected `method`.

## Returns

`float`.

## Examples

```python
from sequenzo import get_weighted_variance

values = [2, 4, 8]
weights = [1, 1, 2]

result = get_weighted_variance(values, weights=weights, method="unbiased")
print(result)
```

## R Counterpart

- **Closest R counterpart:** No TraMineR public function. The closest TraMineR source-level behavior is its internal `wtd.var()` helper; in general R workflows, weighted variance is usually supplied by a helper package or custom function.
- **Mapping note:** Sequenzo exposes this as a documented Python helper with method-based estimation, rather than as a wrapper around a TraMineR public API.

## Notes

- This is a general weighted statistics function commonly used in R-style workflows.
- It is not specific to TraMineR, but is useful in sequence-analysis summaries.

## See Also

- [Sequence Summary Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
