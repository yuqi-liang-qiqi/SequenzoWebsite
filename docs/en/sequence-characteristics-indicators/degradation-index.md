# `get_degradation_index()`

Computes transition penalty based on state order and transition direction.

## Function

```python
from sequenzo import get_degradation_index
result = get_degradation_index(seqdata, method="RANK", penalized="BOTH")
```

## Parameters

- `seqdata`: `SequenceData` object.
- `method`: transition-weight method (`FREQ`, `TRATE`, `TRATEDSS`, `RANK`, ...).
- `penalized`: `NEG`, `POS`, `BOTH`, or `NO`.
- optional: `weight_type`, `pow`, `spell_integr`, `state_order`, `state_equiv`, `stprec`.

## Returns

`DataFrame` with `Degrad` values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqidegrad`.

## Author

Code and documentation: Yuqi Liang
