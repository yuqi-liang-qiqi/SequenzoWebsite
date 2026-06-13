# `get_weighted_five_number_summary()`

`get_weighted_five_number_summary()` computes a weighted five-number summary: min, Q1, median, Q3, and max.

## Function Usage

```python
from sequenzo import get_weighted_five_number_summary
summary = get_weighted_five_number_summary(values, weights=None, remove_missing=True)
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
- Computes weighted quantiles and returns a five-number summary array in the order: min, Q1, median, Q3, max.

## Returns

`np.ndarray`.

## Examples

```python
from sequenzo import get_weighted_five_number_summary

values = [2, 4, 8, 10]
weights = [1, 1, 2, 1]

summary = get_weighted_five_number_summary(values, weights=weights)
print(summary)
```

## R Counterpart

- **Closest R function:** `weighted.fivenum`
- **Mapping note:** Sequenzo marks this as equivalent helper behavior in code and returns weighted five-number statistics.

## Notes

- This is a general weighted descriptive statistics function.
- It is not specific to TraMineR, but is useful in sequence-analysis summaries.

## See Also

- [Sequence Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
