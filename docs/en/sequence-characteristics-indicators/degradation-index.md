# `get_degradation_index()`

Computes transition penalty based on state order and transition direction.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_degradation_index
result = get_degradation_index(seqdata, method="RANK", penalized="BOTH")
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `method`: transition-weight method (`FREQ`, `TRATE`, `TRATEDSS`, `RANK`, ...).
- `penalized`: `NEG`, `POS`, `BOTH`, or `NO`.
- optional: `weight_type`, `pow`, `spell_integr`, `state_order`, `state_equiv`, `stprec`.

## Returns

`DataFrame` with `Degrad` values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqidegrad`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
