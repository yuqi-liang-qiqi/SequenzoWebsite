# `get_duration_standard_deviation()`

Computes standard deviation of spell durations for each sequence.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_duration_standard_deviation
result = get_duration_standard_deviation(seqdata, type=1, with_missing=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `type`: `1` observed durations, `2` with zero-length for nonvisited states.
- `with_missing`: include missing state or not.

## Returns

`DataFrame` with duration standard deviation (`Dustd` or `Dustd2`).

## TraMineR Mapping

- Equivalent TraMineR functions: `seqivardur` and `seqindic` (`dustd` / `dustd2`).

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
