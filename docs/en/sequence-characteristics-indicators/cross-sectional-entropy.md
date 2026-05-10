# `get_cross_sectional_entropy()`

Computes state distribution and entropy across time positions.

## Function

```python
from sequenzo import get_cross_sectional_entropy
result = get_cross_sectional_entropy(seqdata, weighted=True, norm=True, return_format="tidy")
```

## Parameters

- `seqdata`: `SequenceData` object.
- `weighted`: use sequence weights in frequency calculation.
- `norm`: return normalized entropy.
- `return_format`: `"tidy"`, `"wide"`, or `"dict"`.

## Returns

Time-wise cross-sectional distribution and entropy outputs.

## TraMineR Mapping

- Equivalent TraMineR function: `seqstatd`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
