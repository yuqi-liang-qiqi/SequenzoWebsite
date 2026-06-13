# `get_visited_states()`

Counts how many distinct states are visited in each sequence.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_visited_states
result = get_visited_states(seqdata, with_missing=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `with_missing`: include missing state in visited count.

## Returns

`DataFrame` with visited-state counts per sequence.

## TraMineR Mapping

- Equivalent TraMineR indicator: `seqindic(indic="visited")`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.

