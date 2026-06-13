# `get_mean_time_by_state()`

`get_mean_time_by_state()` computes the average time spent in each state across sequences. It answers the duration question that usually comes first in a descriptive analysis: out of the observation window, how much time does a typical trajectory spend in education, employment, or any other state?

Use it before clustering to understand the overall time budget of your sample, and after clustering to compare time budgets across clusters. Because it averages over the whole window, it deliberately ignores order and timing; see [Mean Time Plot](/en/visualization/plot-mean-time) for the visual version and [Timing, Duration, and Order](/en/tutorials/timing-duration-order) for why order can still matter.

## Function Usage

```python
from sequenzo import get_mean_time_by_state
result = get_mean_time_by_state(seqdata, weighted=True, as_proportion=False, show_standard_error=False, with_missing=False)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `seqdata` | ✓ | `SequenceData` | Input sequence dataset. |
| `weighted` | ✗ | bool | Use sequence weights when available. Default = `True`. With weights, each sequence contributes proportionally to its weight. |
| `as_proportion` | ✗ | bool | If `True`, return time as a fraction of the sequence length instead of absolute time units. Default = `False`. |
| `show_standard_error` | ✗ | bool | If `True`, add variance, standard deviation, and standard error columns. Default = `False`. |
| `with_missing` | ✗ | bool | If `True`, treat missing as a valid state with its own row. Default = `False`. |

## What It Does

- Computes average time spent in each state.
- Supports weighted computation.
- Optionally returns proportions and standard errors.

## Returns

A `pandas.DataFrame` with one row per state. With default settings it contains the mean time per state. With `show_standard_error=True` it has four columns: `Mean`, `Var`, `Stdev`, and `SE`. With `as_proportion=True` the values are fractions of the sequence length instead of time units.

For example, on the bundled CO₂ deciles dataset (194 countries, 223 yearly time points), the row `D1 (Very Low)` has `Mean = 26.36`, meaning the average country spends about 26 of the 223 years in the lowest global decile.

## Examples

```python
from sequenzo import get_mean_time_by_state

mt = get_mean_time_by_state(seqdata, weighted=True, as_proportion=False)
print(mt)
```

## R Counterpart

- **Closest TraMineR function:** `seqmeant`
- **Mapping note:** This is a direct conceptual match; Sequenzo forwards to `get_mean_time_in_states(...)` with equivalent options.

## See Also

- [Sequence Statistics Overview](/en/statistics/introduction) maps all summary functions.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use statistics versus indicators or distances.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang
