# `get_individual_state_distribution()`

`get_individual_state_distribution()` returns the per-sequence state distribution table.

## Function Usage

```python
from sequenzo import get_individual_state_distribution
result = get_individual_state_distribution(seqdata, as_proportion=False)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `as_proportion` | ✗ | bool | Return proportions instead of counts. |

## What It Does

- Computes state frequencies for each sequence.
- Returns either counts or proportions, depending on `as_proportion`.

## Returns

`pd.DataFrame`.

## Examples

```python
from sequenzo import get_individual_state_distribution

dist = get_individual_state_distribution(seqdata, as_proportion=True)
print(dist.head())
```

## R Counterpart

- **Closest TraMineR function:** `seqistatd`
- **Mapping note:** This is a direct conceptual match; Sequenzo computes per-sequence state frequency/distribution output with optional proportions.

## See Also

- [Sequence Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
