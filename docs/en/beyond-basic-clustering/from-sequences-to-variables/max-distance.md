# `max_distance()`

`max_distance()` returns the maximum **off-diagonal** dissimilarity in a distance matrix. It is used to normalize representativeness: `R_i^k = 1 − d(i, k) / d_max`.

## Function Usage

```python
max_distance(diss)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| `max_distance(diss)` | `max(diss[upper.tri(diss)])` | Helske et al. (2024) "maximum distance between two sequences" |
| Condensed input | `as.dist` / `squareform` | SciPy condensed vectors are accepted |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `diss` | ✓ | `ndarray` | Square `n × n` distance matrix, or a 1D condensed distance vector (SciPy layout). |

## Returns

| Type | Description |
| --- | --- |
| `float` | Maximum off-diagonal distance. Returns `0.0` when `n < 2`. |

## Example

```python
from sequenzo import max_distance, representativeness_matrix

d_max = max_distance(diss)
R = representativeness_matrix(diss, medoids, d_max=d_max)
```

When `d_max=None`, [`representativeness_matrix()`](./representativeness-matrix.md) calls `max_distance` internally.

## Notes

- Only the upper triangle (pairs `i < j`) is considered; the diagonal is ignored.
- Square matrices are validated with the same checks as other distance-matrix functions (symmetry, zero diagonal, no `NA`, nonnegative entries). Condensed vectors are also checked for `NA` and negative values before conversion.
- If all sequences are identical, `d_max` is `0` and `representativeness_matrix()` sets representativeness to `1` for all entries. Passing `d_max=0` with nonzero distances, or passing a positive `d_max` smaller than the observed maximum distance, is rejected.

## See Also

- [Section overview](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.
