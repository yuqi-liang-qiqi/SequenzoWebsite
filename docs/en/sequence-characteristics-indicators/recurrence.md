# `get_recurrence()`

Computes recurrence as DSS length divided by number of visited states.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_recurrence
result = get_recurrence(seqdata, with_missing=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing in DSS/visited calculations.

## Returns

`DataFrame` with recurrence values per sequence.

## TraMineR Mapping

- Equivalent TraMineR indicator: `TraMineR::seqindic(indic="recu")`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
