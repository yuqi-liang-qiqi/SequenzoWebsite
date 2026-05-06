# `get_precarity_index()`

Computes precarity from start-state cost, complexity, and degradation correction.

## Function

```python
from sequenzo import get_precarity_index
result = get_precarity_index(seqdata, otto=0.2, a=1.0, b=1.2, method="TRATEDSS")
```

## Parameters

- `seqdata`: `SequenceData` object.
- `otto`, `a`, `b`: combination and power parameters.
- `method`: method used when correction is computed internally.
- optional: `correction`, `state_order`, `state_equiv`, `stprec`, `with_missing`, `pow`.

## Returns

`DataFrame` with `Prec` values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqprecarity`.

## Author

Code and documentation: Yuqi Liang
