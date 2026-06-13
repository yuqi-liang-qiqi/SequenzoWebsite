# `soft_classification_variables()`

`soft_classification_variables()` prepares a FANNY membership matrix for regression by dropping one reference cluster column. The remaining `K − 1` columns are continuous membership-degree predictors (Helske et al. 2024 **soft classification**).

## Function Usage

```python
soft_classification_variables(
    U,
    *,
    reference=0,
    ids=None,
    as_dataframe=False,
    cluster_names=None,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| `U` | `cluster::fanny` membership matrix | From [`fanny_membership()`](./fanny-membership.md) |
| Omitted reference column | Baseline cluster in regression | Helske Table 1: one membership column omitted |
| Predictor type | "Membership degree", continuous | Not dummies |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `U` | ✓ | `ndarray` | Membership matrix of shape `(n, K)`. Rows must be nonnegative and sum to 1. |
| `reference` | ✗ | `int` | 0-based index of the reference cluster to omit. Default `0`. |
| `ids` | ✗ | list / `Index` / `None` | Row index when `as_dataframe=True`. |
| `as_dataframe` | ✗ | `bool` | If `True`, return a `DataFrame`; otherwise a NumPy array. |
| `cluster_names` | ✗ | `list` / `None` | Optional length-`K` names; reference name is omitted. Default columns: `P_1`, `P_2`, … |

## Returns

`np.ndarray` of shape `(n, K − 1)` or `pd.DataFrame` when `as_dataframe=True`.

Each retained column is the membership degree for one non-reference cluster.

## Example

```python
from sequenzo import fanny_membership, soft_classification_variables

U, _ = fanny_membership(diss, k=5, m=1.4)
X_soft = soft_classification_variables(
    U,
    reference=0,
    as_dataframe=True,
    ids=seqdata.ids,
    cluster_names=["stable", "unstable", "inactive", "late_entry", "mixed"],
)

print(X_soft.shape)
```

## R Counterpart

- **Closest R workflow:** use `fanny` membership columns directly in regression after dropping a reference column.
- **Mapping note:** No WeightedCluster wrapper; Sequenzo validates row sums and builds omitted-reference predictors explicitly.

## Notes

- Rows of `U` must sum to 1 within floating-point tolerance.
- The omitted reference column is not ignored conceptually; it is represented implicitly because all membership columns sum to 1. One column is dropped only to avoid perfect collinearity in regression.
- Coefficients describe how the outcome changes with membership in each non-reference cluster relative to the omitted reference.
- Soft membership still forces probabilities to sum to 1 across clusters, so it may not separate mixed cases from poor cluster fit as clearly as representativeness.

## See Also

- [Section overview](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.
