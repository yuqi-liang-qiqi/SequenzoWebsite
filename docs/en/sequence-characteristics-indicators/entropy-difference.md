# `get_entropy_difference()`

Computes entropy difference indicator for each sequence.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_entropy_difference
result = get_entropy_difference(seqdata, norm=True)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `norm`: return normalized entropy-difference values.

## Returns

`DataFrame` with entropy-difference values by sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqientdiff`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
