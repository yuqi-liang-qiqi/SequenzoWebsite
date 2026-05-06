# `get_entropy_difference()`

Computes entropy difference indicator for each sequence.

## Function

```python
from sequenzo import get_entropy_difference
result = get_entropy_difference(seqdata, norm=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `norm`: return normalized entropy-difference values.

## Returns

`DataFrame` with entropy-difference values by sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqientdiff`.

## Author

Code and documentation: Yuqi Liang
