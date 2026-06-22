# `get_cross_sectional_entropy()`

Computes state distribution and entropy across time positions.

## Function Usage

```python
from sequenzo import get_cross_sectional_entropy
result = get_cross_sectional_entropy(seqdata, weighted=True, norm=True, return_format="tidy")
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `weighted`: use sequence weights in frequency calculation.
- `norm`: return normalized entropy.
- `return_format`: `"tidy"`, `"wide"`, or `"dict"`.

## Returns

Time-wise cross-sectional distribution and entropy outputs.

## TraMineR Mapping

- Equivalent TraMineR function: `TraMineR::seqstatd()`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
