# `get_badness_index()`

Computes badness as a precarity-weighted integration across states.

## Function

```python
from sequenzo import get_badness_index
result = get_badness_index(seqdata, pow=1.0, with_missing=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `pow`: integration weighting exponent.
- `with_missing`: include missing as regular state.
- optional ranking inputs: `state_order`, `state_equiv`, `stprec`.

## Returns

`DataFrame` with `Bad` values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqibad`.

## Author

Code and documentation: Yuqi Liang
