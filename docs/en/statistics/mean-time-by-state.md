# `get_mean_time_by_state()`

Computes average time spent in each state across sequences.

## Function

```python
from sequenzo import get_mean_time_by_state
result = get_mean_time_by_state(seqdata, weighted=True, as_proportion=False, show_standard_error=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `weighted`: use sequence weights when available.
- `as_proportion`: return proportion instead of absolute time.
- `show_standard_error`: include standard errors.
- `with_missing`: include missing as a state.

## Returns

`DataFrame` with mean time by state.

## TraMineR Mapping

- Equivalent TraMineR function: `seqmeant`.

## Author

Code and documentation: Yuqi Liang
