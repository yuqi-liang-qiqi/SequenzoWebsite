# `get_positive_negative_indicators()`

Computes binary-state indicators from positive vs. negative state definitions.

## Function

```python
from sequenzo import get_positive_negative_indicators
result = get_positive_negative_indicators(seqdata, pos_states=[1, 2], neg_states=[3, 4])
```

## Parameters

- `seqdata`: `SequenceData` object.
- `pos_states`: states treated as positive.
- `neg_states`: states treated as negative (optional if complementary).
- additional keyword arguments follow the binary indicator implementation.

## Returns

`DataFrame` with binary sequence-quality indicators.

## TraMineR Mapping

- Equivalent TraMineR functions: `seqipos` and `seqindic` binary indicators.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
