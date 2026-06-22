# `get_within_sequence_entropy()`

Computes entropy for each individual sequence.

## Function Usage

```python
from sequenzo import get_within_sequence_entropy
result = get_within_sequence_entropy(seqdata, norm=True, base=np.e, silent=True)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `norm`: normalize entropy by maximum entropy.
- `base`: logarithm base.
- `silent`: suppress progress messages.

## Returns

`DataFrame` with sequence-level entropy values.

## TraMineR Mapping

- Equivalent TraMineR function: `TraMineR::seqient()`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.

