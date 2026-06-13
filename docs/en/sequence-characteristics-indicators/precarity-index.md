# `get_precarity_index()`

Computes precarity from start-state cost, complexity, and degradation correction.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_precarity_index
result = get_precarity_index(seqdata, otto=0.2, a=1.0, b=1.2, method="TRATEDSS")
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `otto`, `a`, `b`: combination and power parameters.
- `method`: method used when correction is computed internally.
- optional: `correction`, `state_order`, `state_equiv`, `stprec`, `with_missing`, `pow`.

## Returns

`DataFrame` with `Prec` values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqprecarity`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
