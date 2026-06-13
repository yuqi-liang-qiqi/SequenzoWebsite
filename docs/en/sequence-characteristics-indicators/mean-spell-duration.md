# `get_mean_spell_duration()`

Computes mean spell duration for each sequence.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_mean_spell_duration
result = get_mean_spell_duration(seqdata, type=1, with_missing=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `type`: `1` for observed spells, `2` including zero-length nonvisited states.
- `with_missing`: include missing as regular state.

## Returns

`DataFrame` with mean spell duration (`MeanD` or `MeanD2`).

## TraMineR Mapping

- Equivalent TraMineR functions: `seqivardur` and `seqindic` (`meand` / `meand2`).

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
