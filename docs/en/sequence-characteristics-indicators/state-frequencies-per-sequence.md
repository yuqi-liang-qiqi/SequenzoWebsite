# `get_state_freq_and_entropy_per_seq()`

Builds per-sequence state distributions (counts or proportions) plus entropy.

## Function

```python
from sequenzo import get_state_freq_and_entropy_per_seq
result = get_state_freq_and_entropy_per_seq(seqdata, prop=False)
```

## Parameters

- `seqdata`: `SequenceData` object.
- `prop`: return proportions instead of counts.

## Returns

`DataFrame` with state columns and entropy per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqistatd`.

## Author

Code and documentation: Yuqi Liang

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.

