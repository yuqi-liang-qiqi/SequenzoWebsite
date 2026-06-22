# `get_badness_index()`

Computes badness as a precarity-weighted integration across states.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_badness_index
result = get_badness_index(seqdata, pow=1.0, with_missing=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `pow`: integration weighting exponent.
- `with_missing`: include missing as regular state.
- optional ranking inputs: `state_order`, `state_equiv`, `stprec`.

## Returns

`DataFrame` with `Bad` values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `TraMineR::seqibad()`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
