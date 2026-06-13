# `get_number_of_transitions()`

Counts transitions (state changes) for each sequence.

## Function Usage

```python
from sequenzo import get_number_of_transitions
result = get_number_of_transitions(seqdata, norm=False, pwight=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `norm`: normalize by sequence length minus one.
- `pwight`: apply probability-based transition weighting.

## Returns

`DataFrame` with transition counts (or normalized/weighted values).

## TraMineR Mapping

- Equivalent TraMineR function: `seqtransn`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
