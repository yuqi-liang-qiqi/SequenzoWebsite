# `get_positive_negative_indicators()`

Computes binary-state indicators from positive vs. negative state definitions.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_positive_negative_indicators
result = get_positive_negative_indicators(seqdata, pos_states=[1, 2], neg_states=[3, 4])
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `pos_states`: states treated as positive.
- `neg_states`: states treated as negative (optional if complementary).
- additional keyword arguments follow the binary indicator implementation.

## Returns

`DataFrame` with binary sequence-quality indicators.

## TraMineR Mapping

- Equivalent TraMineR functions: `TraMineR::seqipos()` and `TraMineR::seqindic()` binary indicators.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
