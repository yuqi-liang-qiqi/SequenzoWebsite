# `get_complexity_index()`

Computes complexity from transition intensity and within-sequence entropy.

## Function Usage

```python
from sequenzo import get_complexity_index
result = get_complexity_index(seqdata, silent=True)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `silent`: suppress progress messages.

## Returns

`DataFrame` with complexity index values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqici`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
