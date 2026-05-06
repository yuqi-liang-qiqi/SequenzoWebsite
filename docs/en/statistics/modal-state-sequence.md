# `get_modal_state_sequence()`

Computes modal state at each time position.

## Function

```python
from sequenzo import get_modal_state_sequence
result = get_modal_state_sequence(seqdata, weighted=True, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `weighted`: use sequence weights.
- `with_missing`: include missing state in modal computation.

## Returns

`DataFrame` describing modal state sequence over time.

## TraMineR Mapping

- Equivalent TraMineR function: `seqmodst`.

## Author

Code and documentation: Yuqi Liang
