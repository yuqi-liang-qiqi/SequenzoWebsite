# `get_individual_state_distribution()`

Returns per-sequence state distribution table.

## Function

```python
from sequenzo import get_individual_state_distribution
result = get_individual_state_distribution(seqdata, as_proportion=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `as_proportion`: return proportions instead of counts.

## Returns

`DataFrame` with sequence-wise state distributions.

## TraMineR Mapping

- Equivalent TraMineR function: `seqistatd`.

## Author

Code and documentation: Yuqi Liang
