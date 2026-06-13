# `get_state_spell_durations()`

`get_state_spell_durations()` returns spell durations for each sequence in tabular form.

## Function Usage

```python
from sequenzo import get_state_spell_durations
result = get_state_spell_durations(seqdata, fill_value=0)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `fill_value` | ✗ | numeric | Value used for trailing empty duration slots. |

## What It Does

- Splits each sequence into spells.
- Computes each spell duration.
- Returns a `DataFrame` with duration columns (`Duration1`, `Duration2`, ...).

## Returns

`pd.DataFrame`.

## Examples

```python
from sequenzo import get_state_spell_durations

dur = get_state_spell_durations(seqdata, fill_value=0)
print(dur.head())
```

## R Counterpart

- **Closest TraMineR function:** `seqdur`
- **Mapping note:** This is a direct conceptual and implementation match in Sequenzo (`sequence_statistics.py` calls `seqdur`).

## See Also

- [Sequence Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
