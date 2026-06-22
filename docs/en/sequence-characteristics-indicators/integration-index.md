# `get_integration_index()`

Computes integration scores with position weights (later positions can get higher weight).

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_integration_index
result = get_integration_index(seqdata, state=None, pow=1.0, with_missing=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `state`: specific state index, or `None` for all states.
- `pow`: exponent for position weights.
- `with_missing`: include missing positions in denominator.

## Returns

`DataFrame` with integration values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `TraMineR::seqintegr()`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
