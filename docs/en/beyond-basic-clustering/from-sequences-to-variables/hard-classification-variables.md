# `hard_classification_variables()`

`hard_classification_variables()` converts cluster membership labels into `K − 1` dummy variables for regression, with one reference category omitted. This is the Helske et al. (2024) **hard classification** approach.

## Function Usage

```python
hard_classification_variables(
    labels,
    *,
    k=None,
    reference=0,
    ids=None,
    as_dataframe=False,
)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| `labels` | Cluster vector from PAM / hierarchical cut | 0-based or 1-based labels accepted |
| `reference` | Omitted baseline category in regression | Helske Table 1: one category omitted |
| Dummy encoding | `model.matrix(~ factor(cluster))` with reference level | Sequenzo uses explicit omitted-reference encoding |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `labels` | ✓ | array-like | Cluster assignment per observation. Can be 0-based (`0 … K−1`) or 1-based (`1 … K`). |
| `k` | ✗ | `int` / `None` | Number of clusters. If `None`, inferred from `len(unique(labels))`. |
| `reference` | ✗ | `int` | Reference category index in **sorted** unique-label order (0 = first category). That column is omitted from the output. For example, if the sorted labels are `[1, 3, 5]`, then `reference=0` omits label `1`, `reference=1` omits label `3`, and `reference=2` omits label `5`. |
| `ids` | ✗ | list / `Index` / `None` | Row index when `as_dataframe=True`. |
| `as_dataframe` | ✗ | `bool` | If `True`, return a `DataFrame` with columns `C_<label>`; otherwise a NumPy array. |

## Returns

`np.ndarray` of shape `(n, K − 1)` or `pd.DataFrame` when `as_dataframe=True`.

Each column is `1` when the observation belongs to the corresponding non-reference cluster and `0` otherwise.

## Example

```python
from sequenzo import (
    KMedoids,
    cluster_labels_from_kmedoids_result,
    hard_classification_variables,
)

kmed = KMedoids(diss, k=5, method="PAMonce", verbose=False)
labels = cluster_labels_from_kmedoids_result(kmed)

dummies = hard_classification_variables(
    labels,
    k=5,
    reference=0,
    as_dataframe=True,
    ids=seqdata.ids,
)

print(dummies.shape)
```

## R Counterpart

- **Closest R workflow:** manual dummy construction after PAM or `cutree`.
- **Mapping note:** WeightedCluster does not export a dedicated hard-classification helper; Sequenzo wraps `cluster_labels_to_dummies()` with optional DataFrame output.

## Notes

- The number of unique labels must equal `k`.
- Categories are ordered by `np.sort(unique(labels))` before applying `reference`.
- For low-level control over dummy encoding, use [`cluster_labels_to_dummies()`](./cluster-labels-to-dummies.md).

## See Also

- [Section overview](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.
