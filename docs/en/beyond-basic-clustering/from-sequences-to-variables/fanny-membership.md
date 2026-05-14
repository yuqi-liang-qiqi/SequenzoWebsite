# `fanny_membership()`

`fanny_membership()` computes a fuzzy membership matrix on a dissimilarity matrix using FANNY (Fuzzy Analysis Clustering). In the Helske et al. (2024) workflow, this matrix feeds **soft classification** or **pseudoclass regression**.

The underlying `fanny()` implementation is a Python port of R `cluster::fanny` (`fanny.c`), including deterministic default initialization and the `caddy` column-reordering step.

## Function Usage

```python
fanny_membership(
    diss,
    k,
    *,
    m=1.4,
    max_iter=500,
    tol=1e-15,
    ini_mem_p=None,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| `fanny_membership()` | `cluster::fanny(diss, k, diss=TRUE, memb.exp=m)` | Python port of R `cluster::fanny`; validated in Sequenzo unit tests |
| `m` | `memb.exp` in `fanny` | Helske et al. (2024) use `1.4` |
| `max_iter`, `tol` | `maxit`, `tol` in `fanny` | Default `tol=1e-15`, same as R |
| `ini_mem_p` | `iniMem.p` in `cluster::fanny` | Rows must sum to 1 |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `diss` | ✓ | `ndarray` | Square `(n, n)` distance matrix. |
| `k` | ✓ | `int` | Number of clusters. Sequenzo follows the R `cluster::fanny` convention: `1 <= k <= n // 2 - 1`. This is an R implementation constraint, not a general fuzzy-clustering bound. For small `n` it is tight — e.g. `n = 4` allows at most `k = 1`; `n = 10` allows at most `k = 4`. |
| `m` | ✗ | `float` | Fuzziness exponent (`memb_exp` in `fanny`). Must be `> 1`. Default `1.4` (Helske et al. 2024). |
| `max_iter` | ✗ | `int` | Maximum FANNY iterations. Default `500`. |
| `tol` | ✗ | `float` | Relative convergence tolerance on the objective. Default `1e-15` (R default). |
| `ini_mem_p` | ✗ | `ndarray` / `None` | Optional initial `(n, k)` membership matrix with nonnegative entries and rows summing to 1. If `None`, R-style deterministic initialization is used. |

There is **no** `random_state` parameter: FANNY initialization is deterministic unless you supply `ini_mem_p`, matching R `cluster::fanny`.

## What It Returns

A tuple `(U, highest_membership_indices)`:

| Element | Type | Description |
| --- | --- | --- |
| `U` | `ndarray`, shape `(n, k)` | Row-stochastic membership matrix. Each row sums to 1. |
| `highest_membership_indices` | `ndarray`, shape `(k,)` | Row index with highest membership in each cluster column after R-style column reordering. These are **not** PAM medoids. |

Pass `U` to [`soft_classification_variables()`](./soft-classification-variables.md) or [`pseudoclass_regression()`](./pseudoclass-regression.md).

Do **not** pass `highest_membership_indices` to [`representativeness_matrix()`](./representativeness-matrix.md). Use PAM medoid indices from [`medoid_indices_from_kmedoids_result()`](./medoid-indices-from-kmedoids-result.md) instead.

The same index vector can be obtained from a membership matrix with [`highest_membership_indices_from_membership()`](./fanny-membership.md#highest_membership_indices_from_membership).

## Example

```python
from sequenzo import fanny_membership, soft_classification_variables

U, hi_idx = fanny_membership(diss, k=5, m=1.4)
X_soft = soft_classification_variables(U, reference=0, as_dataframe=True, ids=seqdata.ids)

print(U.shape, U.sum(axis=1)[:3])
```

## R Counterpart

- **Closest R function:** `cluster::fanny(diss, k, diss=TRUE, memb.exp=m)`
- **Mapping note:** Sequenzo's underlying `fanny()` follows R `cluster` `fanny.c`, including the `caddy` column-reordering step and the same `k` bound, default `tol`, and convergence reporting.

## Lower-Level FANNY API

Advanced users can call `fanny()` directly from `sequenzo.clustering.sequences_to_variables` (or `sequenzo.clustering`). It returns a `FannyResult` dataclass:

| Field | Description |
| --- | --- |
| `membership` | `(n, k)` membership matrix |
| `clustering` | `(n,)` crisp cluster ids after reordering |
| `memb_exp` | Fuzziness exponent used |
| `objective` | Final objective value |
| `converged` | Whether the algorithm converged within `max_iter` and `tol` |
| `iterations` | Iteration count when converged; `-1` if not converged (R convention) |
| `k_crisp` | Number of crisp clusters after reordering |
| `partition_coefficient`, `normalized_coefficient` | Fuzzy partition quality measures |

If the algorithm does not converge, `fanny()` emits a warning (as R does) and sets `iterations = -1`.

`medoid_membership_approximation()` is a fast heuristic: it runs PAM once, sets `u_ik ∝ (1/d_ik)^(1/(m−1))`, normalizes rows, then forces each medoid row to hard membership in its own cluster column. It is **not** exact FANNY and is not the Helske soft-classification default.

## `highest_membership_indices_from_membership()` {#highest_membership_indices_from_membership}

```python
highest_membership_indices_from_membership(membership)
```

Returns the row index with highest membership in each column of a membership matrix. These indices are **not** PAM medoids. `fanny_membership()` calls this helper on the FANNY result before returning.

## Notes

- Default FANNY initialization follows R when `ini_mem_p` is `None`; there is no random seed to set.
- For `k == 1`, `fanny()` runs the same iterative routine as R (no Python shortcut). In practice Helske-style workflows use `k >= 2`.
- Use PAM medoids for representativeness; use FANNY membership for soft classification.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.

Kaufman, L., & Rousseeuw, P. J. (1990). *Finding Groups in Data: An Introduction to Cluster Analysis*. Wiley.
