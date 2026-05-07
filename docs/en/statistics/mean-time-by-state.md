# `get_mean_time_by_state()`

`get_mean_time_by_state()` computes average time spent in each state across sequences.

## Function Usage

```python
from sequenzo import get_mean_time_by_state
result = get_mean_time_by_state(seqdata, weighted=True, as_proportion=False, show_standard_error=False)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `weighted` | ✗ | bool | Use sequence weights when available. |
| `as_proportion` | ✗ | bool | Return proportions instead of absolute time. |
| `show_standard_error` | ✗ | bool | Include standard error columns. |
| `with_missing` | ✗ | bool | Include missing as a valid state. |

## What It Does

- Computes average time spent in each state.
- Supports weighted computation.
- Optionally returns proportions and standard errors.

## Examples

```python
from sequenzo import get_mean_time_by_state

mt = get_mean_time_by_state(seqdata, weighted=True, as_proportion=False)
print(mt)
```

## R Counterpart

- **Closest TraMineR function:** `seqmeant`
- **Mapping note:** This is a direct conceptual match; Sequenzo forwards to `get_mean_time_in_states(...)` with equivalent options.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
