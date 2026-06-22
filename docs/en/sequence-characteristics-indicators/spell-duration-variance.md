# `get_spell_duration_variance()`

Computes variance of spell durations for each sequence.

## Function Usage

```python
from sequenzo import get_spell_duration_variance
result = get_spell_duration_variance(seqdata, type=1)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `type`: `1` standard spell-variance, `2` variant including nonvisited states.

## Returns

A dictionary with DataFrames: mean duration, variance, and maximum variance.

## TraMineR Mapping

- Equivalent TraMineR function: `TraMineR::seqivardur()`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
