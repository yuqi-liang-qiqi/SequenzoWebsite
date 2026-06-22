# `get_sequence_length()`

Computes sequence length for each case.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_sequence_length
result = get_sequence_length(seqdata, with_missing=True)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing positions in length.

## Returns

`DataFrame` with one row per sequence and a length column.

## TraMineR Mapping

- Equivalent TraMineR function: `TraMineR::seqlength()`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
