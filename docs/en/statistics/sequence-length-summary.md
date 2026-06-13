# `get_sequence_length_summary()`

`get_sequence_length_summary()` returns descriptive summary statistics for sequence lengths.

## Function Usage

```python
from sequenzo import get_sequence_length_summary
result = get_sequence_length_summary(seqdata, with_missing=True)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `with_missing` | ✗ | bool | Include missing positions when computing lengths. |

## What It Does

- Computes sequence lengths.
- Builds a one-row summary table with `count`, `mean`, `median`, `min`, `q1`, `q3`, `max`.

## Returns

`pd.DataFrame`.

## Examples

```python
from sequenzo import get_sequence_length_summary

summary = get_sequence_length_summary(seqdata, with_missing=True)
print(summary)
```

## R Counterpart

- **Closest TraMineR function(s):** `seqlength` (often summarized with `summary(...)` in R workflows)
- **Mapping note:** Sequenzo first computes sequence lengths with `seqlength`-style logic, then returns a one-row summary table (`count`, `mean`, `median`, `min`, `q1`, `q3`, `max`).

## See Also

- [Sequence Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
