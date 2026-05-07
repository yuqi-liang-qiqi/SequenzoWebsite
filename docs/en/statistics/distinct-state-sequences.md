# `get_distinct_state_sequences()`

`get_distinct_state_sequences()` returns the DSS (distinct successive states) representation for each sequence.

## Function Usage

```python
from sequenzo import get_distinct_state_sequences
result = get_distinct_state_sequences(seqdata, fill_value=-999)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `fill_value` | ✗ | numeric | Value used for trailing empty DSS slots. |

## What It Does

- Converts each sequence into distinct successive states (collapsing repeated consecutive states).
- Returns a tabular DSS output for all sequences.

## Examples

```python
from sequenzo import get_distinct_state_sequences

dss = get_distinct_state_sequences(seqdata, fill_value=-999)
print(dss.head())
```

## R Counterpart

- **Closest TraMineR function:** `seqdss`
- **Mapping note:** This is a direct conceptual and implementation match in Sequenzo (`sequence_statistics.py` calls `seqdss`).

## Notes

- Useful when you want spell order without repeated consecutive states.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
