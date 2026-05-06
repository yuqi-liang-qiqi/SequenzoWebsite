# `get_within_sequence_entropy()`

Computes entropy for each individual sequence.

## Function

```python
from sequenzo import get_within_sequence_entropy
result = get_within_sequence_entropy(seqdata, norm=True, base=np.e, silent=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `norm`: normalize entropy by maximum entropy.
- `base`: logarithm base.
- `silent`: suppress progress messages.

## Returns

`DataFrame` with sequence-level entropy values.

## TraMineR Mapping

- Equivalent TraMineR function: `seqient`.

## Author

Code and documentation: Yuqi Liang
