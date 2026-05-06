# `get_volatility()`

Computes objective volatility using visited-state proportion and transition proportion.

## Function

```python
from sequenzo import get_volatility
result = get_volatility(seqdata, w=0.5, with_missing=False, adjust=True)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `w`: weight between visited-state and transition components.
- `with_missing`: include missing as state or ignore.
- `adjust`: use TraMineR-style adjusted visited proportion.

## Returns

`DataFrame` with `Volat` for each sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqivolatility`.

## Author

Code and documentation: Yuqi Liang
