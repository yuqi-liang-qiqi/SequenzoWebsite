# `get_insecurity_index()`

Computes insecurity index (type-2 precarity formulation).

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_insecurity_index
result = get_insecurity_index(seqdata, method="RANK", pow=1.0, bound=False)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `method`: correction method (default `RANK`).
- `pow`: spell integration exponent.
- `spow`: exponent for first-spell integration (defaults to `pow`).
- `bound`: whether to clamp by sequence-specific min/max state cost.
- optional: `correction`, `state_order`, `state_equiv`, `stprec`, `with_missing`.

## Returns

`DataFrame` with `Insec` values per sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `TraMineR::seqinsecurity()`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Characteristics Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Summary Statistics vs Sequence Characteristics Indicators](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.
