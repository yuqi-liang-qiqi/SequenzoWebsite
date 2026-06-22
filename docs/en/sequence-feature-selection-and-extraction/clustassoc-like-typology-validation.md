# `clustassoc_like_typology_validation()`

`clustassoc_like_typology_validation()` checks whether sequence cluster solutions at different `k` values account for the association between a covariate and sequence dissimilarities. It is analogous to `WeightedCluster::clustassoc()`.

Intuitively: if adding cluster labels **greatly reduces** the remaining pseudo-R² of the covariate, the typology has captured much of the sequence variation associated with that covariate. If little changes, the clustering has not absorbed that association.

## Function Usage

```python
clustassoc_like_typology_validation(
    diss,
    covariate,
    clustering_labels_by_k,
    *,
    sample_weights=None,
    covariate_is_categorical=False,
    verbose=False,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R | Notes |
| --- | --- | --- |
| `diss` | Distance matrix input to `clustassoc` | Square `n × n` |
| `covariate` | Covariate tested for association | Numeric or categorical |
| `clustering_labels_by_k` | Cluster labels at each `k` | Dict keyed by number of clusters |
| Pseudo-R² computation | `TraMineR::dissmfacw()` via `distance_multifactor_anova` | Multifactor distance ANOVA |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `diss` | ✓ | `ndarray` | Square symmetric distance matrix (`n × n`). |
| `covariate` | ✓ | array-like | Length-`n` covariate aligned with `diss` rows/columns. |
| `clustering_labels_by_k` | ✓ | `dict` | Map `k` → length-`n` cluster label vector. |
| `sample_weights` | ✗ | array-like / `None` | Optional 1D weights of length `n`. |
| `covariate_is_categorical` | ✗ | `bool` | If `True`, one-hot encode the covariate. |
| `verbose` | ✗ | `bool` | Print progress per `k`. |

## Returns

A `DataFrame` with one row per `k` in `clustering_labels_by_k` (sorted by `k`):

| Column | Description |
| --- | --- |
| `k` | Number of clusters. |
| `pseudoR2_original` | Pseudo-R² of covariate on distances (no clustering in model). |
| `pseudoR2_remaining_after_clustering` | Pseudo-R² of covariate after adding cluster dummies. |
| `association_unaccounted_share` | `pseudoR2_remaining / pseudoR2_original`. |
| `association_accounted_share` | `1 - association_unaccounted_share`. Higher values suggest the typology explains more of the covariate–sequence association. |

If `pseudoR2_original` is 0, unaccounted/accounted shares are `NaN`.

`association_accounted_share` can be **slightly negative** if the covariate pseudo-R² increases after adding clustering, usually from numerical error, model order, weights, or a poor cluster solution. Treat such cases as **no evidence** that the typology accounts for the association.

## Example

```python
from sequenzo import clustassoc_like_typology_validation

validation = clustassoc_like_typology_validation(
    diss=distance_matrix,
    covariate=education,
    clustering_labels_by_k={
        3: labels_k3,
        5: labels_k5,
        8: labels_k8,
    },
    covariate_is_categorical=True,
)

print(validation)
```

## R Counterpart

- **Closest R function:** `WeightedCluster::clustassoc()`
- **Mapping note:** Uses Sequenzo `distance_multifactor_anova` (`dissmfacw`-style) for pseudo-R² terms.

## Notes

- `diss` must be square; `covariate` and each label vector must have length `n = diss.shape[0]`.
- Cluster labels are one-hot encoded with `drop_first=True`.
- Useful after sequence clustering when you need to know how much of a covariate–sequence association is explained by the typology.

## See Also

- [Section overview](/en/sequence-feature-selection-and-extraction/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. Swiss journal of sociology, 49(2), 417-446.
