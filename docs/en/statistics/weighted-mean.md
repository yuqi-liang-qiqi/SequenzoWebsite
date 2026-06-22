# `get_weighted_mean()`

`get_weighted_mean()` computes the weighted mean of a numeric vector.

## Function Usage

```python
from sequenzo import get_weighted_mean
value = get_weighted_mean(values, weights=None, remove_missing=True)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `values` | ✓ | array-like | Numeric values to summarize. |
| `weights` | ✗ | array-like or `None` | Optional weights. If `None`, all values are equally weighted. |
| `remove_missing` | ✗ | bool | If `True`, remove missing values before computing. |

## What It Does

- Validates inputs and aligns `values` and `weights`.
- Optionally removes missing values.
- Computes the weighted mean as a single scalar output.

## Returns

`float`.

## Examples

```python
from sequenzo import get_weighted_mean

values = [2, 4, 8]
weights = [1, 1, 2]

result = get_weighted_mean(values, weights=weights)
print(result)
```

## R Counterpart

- **Closest R function:** `stats::weighted.mean()`
- **Mapping note:** Sequenzo marks this as equivalent helper behavior in code and exposes the same core weighted-mean intent.

## Notes

- This is a general weighted statistics function commonly used in R workflows.
- It is not specific to TraMineR, but is useful in sequence-analysis summaries.

## See Also

- [Sequence Summary Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
