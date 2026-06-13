# `get_volatility()`

Computes objective volatility using visited-state proportion and transition proportion.

## Function Usage

```python
from sequenzo.sequence_characteristics_indicators import get_volatility
result = get_volatility(seqdata, w=0.5, with_missing=False, adjust=True)
```

## Entry Parameters

- `seqdata`: `SequenceData` object.
- `w`: weight between visited-state and transition components.
- `with_missing`: include missing as state or ignore.
- `adjust`: use TraMineR-style adjusted visited proportion.

## Returns

`DataFrame` with `Volat` for each sequence.

## TraMineR Mapping

- Equivalent TraMineR function: `seqivolatility`.

## Authors

Code and documentation: Yuqi Liang

## See Also

- [Sequence Indicators Overview](/en/sequence-characteristics-indicators/introduction) maps all indicator families.
- [Sequence Indicators and Statistics](/en/tutorials/sequence-indicators-and-statistics) explains when to use indicators versus statistics or distances.

## References

Ritschard, G. (2023), "Measuring the nature of individual sequences", Sociological Methods and Research, 52(4), 2016-2049. doi:10.1177/00491241211036156.

