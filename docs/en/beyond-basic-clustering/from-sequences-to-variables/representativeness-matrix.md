# `representativeness_matrix()`

`representativeness_matrix()` builds Helske-style representativeness variables from a distance matrix and a set of representative sequences (typically PAM medoids). Each column measures how closely one observed sequence resembles one representative.

## Function Usage

```python
representativeness_matrix(
    diss,
    medoid_indices,
    *,
    d_max=None,
    ids=None,
    as_dataframe=False,
    representative_names=None,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| `diss` | Distance matrix used for PAM / clustering | Square `n × n` |
| `medoid_indices` | Medoid row indices from `wcKMedoids` / PAM | 0-based in Sequenzo |
| `d_max` | `max.dist` in `seqclararange(..., method="representativeness")` | Off-diagonal maximum of `diss` |
| Formula `R_i^k = 1 − d(i,k)/d_max` | Helske et al. (2024) representativeness | Not a TraMineR export |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `diss` | ✓ | `ndarray` / `DataFrame` | Square `n × n` distance matrix. Must be symmetric, nonnegative, with zero diagonal and no `NA`. |
| `medoid_indices` | ✓ | array-like | Length `K`. Row indices of the `K` representatives in `diss` (0-based). |
| `d_max` | ✗ | `float` / `None` | Normalizing maximum distance. If `None`, computed with `max_distance(diss)`. |
| `ids` | ✗ | list / `Index` / `None` | Row index for the output DataFrame when `as_dataframe=True`. If `diss` is a DataFrame and `ids` is `None`, the DataFrame index is used. |
| `as_dataframe` | ✗ | `bool` | If `True`, return a `DataFrame`; otherwise a NumPy array. |
| `representative_names` | ✗ | `list` / `None` | Optional length-`K` column names. Default: `R_1`, `R_2`, … |

## What It Returns

`np.ndarray` of shape `(n, K)` or `pd.DataFrame` when `as_dataframe=True`.

| Column / value | Description |
| --- | --- |
| `R_j` or custom name | Representativeness of sequence `i` to representative `j`. |
| Range | Values in `[0, 1]` after clipping as a numerical safeguard; when `d_max` is the maximum pairwise distance, the formula already lies in this range. `1` = same row as the medoid; `0` = at or beyond `d_max` from that medoid. |

Representativeness values **do not sum to 1** across columns. A sequence can be highly represented by more than one medoid, or poorly represented by all medoids.

If `d_max <= 0`, all entries are set to `1.0`.

## Example

```python
from sequenzo import (
    get_distance_matrix,
    KMedoids,
    representativeness_matrix,
    medoid_indices_from_kmedoids_result,
)

diss = get_distance_matrix(seqdata, method="OM", sm="TRATE", indel="auto")
kmed = KMedoids(diss, k=5, method="PAMonce", verbose=False)
medoids = medoid_indices_from_kmedoids_result(kmed)

R = representativeness_matrix(
    diss,
    medoids,
    d_max=None,
    as_dataframe=True,
    ids=seqdata.ids,
)

print(R.shape)
print(R.columns.tolist()[:3])
```

## R Counterpart

- **Closest R bundle:** WeightedCluster `seqclararange(..., method="representativeness")` when representativeness is computed inside CLARA.
- **Mapping note:** Sequenzo exposes the same normalization idea as a standalone function on fixed medoid indices. There is no direct TraMineR equivalent.

## Notes

- The second output of `fanny_membership()` is `highest_membership_indices`: the row with the highest fuzzy membership in each FANNY column. These are **not** PAM medoids and should not be used as the representative set for this function.
- `medoid_indices` must lie in `[0, n − 1]`.
- For regression interpretation, Helske et al. (2024) recommend considering all representativeness columns together rather than interpreting one coefficient in isolation.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.
