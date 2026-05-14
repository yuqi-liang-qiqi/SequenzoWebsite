# `cluster_labels_to_dummies()`

`cluster_labels_to_dummies()` is the low-level dummy encoder behind [`hard_classification_variables()`](./hard-classification-variables.md). It maps cluster labels to a `(n, K − 1)` matrix with one reference category omitted.

## Function Usage

```python
cluster_labels_to_dummies(labels, k=None, reference=0)
```

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| Omitted-reference dummies | `model.matrix(~ factor(labels))` with contrast coding | Helske Table 1 hard classification |
| Used inside | `hard_classification_variables` | Low-level omitted-reference encoding for hard classification |
| Related to | `pseudoclass_regression` | Pseudoclass builds fixed-`K` dummies internally because some drawn classes may be absent in a replication |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `labels` | ✓ | array-like | Cluster assignment per observation. 0-based or 1-based integers. |
| `k` | ✗ | `int` / `None` | Number of clusters. Default: `len(unique(labels))`. |
| `reference` | ✗ | `int` | Reference category in sorted unique-label order (0 = first). Omitted from output. |

## What It Returns

`np.ndarray` of shape `(n, K − 1)`.

Column `j` is `1` when the observation belongs to the `j`-th retained non-reference category after sorting the unique labels and dropping the reference category, and `0` otherwise.

## Example

```python
from sequenzo import cluster_labels_to_dummies

dummies = cluster_labels_to_dummies(labels, k=5, reference=0)
print(dummies.shape)
```

For named DataFrame output, use `hard_classification_variables(..., as_dataframe=True)` or `dummy_column_names()` from the same submodule.

## Related Helper

`dummy_column_names(labels, k=None, reference=0, prefix="C")` returns column names for the retained non-reference categories. Names are based on the **original label values** after sorting and dropping the reference category — for example, if sorted labels are `[1, 2, 3, 4, 5]` and `reference=0`, the columns are `C_2`, `C_3`, `C_4`, `C_5`. It is called internally when `hard_classification_variables(..., as_dataframe=True)`.

## Notes

- `len(unique(labels))` must equal `k`.
- Categories are mapped to `0 … K−1` by sorting unique label values before encoding.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.
