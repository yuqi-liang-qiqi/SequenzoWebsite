# `get_transition_count_summary()`

`get_transition_count_summary()` returns descriptive summary statistics for transition counts.

## Function Usage

```python
from sequenzo import get_transition_count_summary
result = get_transition_count_summary(seqdata, normalize=False, probability_weighted=False)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `normalize` | ✗ | bool | Summarize normalized transition values. |
| `probability_weighted` | ✗ | bool | Summarize probability-weighted transitions. |

## What It Does

- Computes transition counts according to the selected options.
- Returns a one-row summary table with `count`, `mean`, `median`, `min`, `q1`, `q3`, `max`.

## Returns

`pd.DataFrame`.

## Examples

```python
from sequenzo import get_transition_count_summary

summary = get_transition_count_summary(seqdata, normalize=False)
print(summary)
```

## R Counterpart

- **Closest TraMineR function(s):** `TraMineR::seqtransn()` (often summarized with `summary(...)` in R workflows)
- **Mapping note:** Sequenzo first computes transition counts with `TraMineR::seqtransn()`-style logic, then returns a one-row summary table (`count`, `mean`, `median`, `min`, `q1`, `q3`, `max`).

## See Also

- [Sequence Summary Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
