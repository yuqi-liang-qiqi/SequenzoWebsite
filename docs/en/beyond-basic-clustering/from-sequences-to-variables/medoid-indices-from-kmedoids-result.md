# KMedoids Result Helpers

`KMedoids` returns a length-`n` vector in which each entry is the **1-based row index of that observation's cluster medoid** (WeightedCluster convention). The two helpers below convert that vector into forms used by representativeness and hard-classification builders.

Both accept `input_base` to control whether the input indices are 1-based (default, raw `KMedoids` output) or already 0-based.

## `medoid_indices_from_kmedoids_result()`

### Function Usage

```python
medoid_indices_from_kmedoids_result(assigned_medoid_indices, input_base=1)
```

### Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `assigned_medoid_indices` | ✓ | `ndarray` | Return value of `KMedoids` — medoid row index assigned to each observation. |
| `input_base` | ✗ | `0` / `1` | Indexing base of `assigned_medoid_indices`. Default `1` for raw `KMedoids` output; use `0` if indices are already 0-based. |

### What It Returns

`np.ndarray` of shape `(K,)`: sorted **0-based** medoid row indices.

### Example

```python
from sequenzo import KMedoids, medoid_indices_from_kmedoids_result, representativeness_matrix

kmed = KMedoids(diss, k=5, method="PAMonce", verbose=False)
medoids = medoid_indices_from_kmedoids_result(kmed)  # input_base=1 by default
R = representativeness_matrix(diss, medoids)
```

---

## `cluster_labels_from_kmedoids_result()` {#cluster-labels-from-kmedoids-result}

### Function Usage

```python
cluster_labels_from_kmedoids_result(assigned_medoid_indices, input_base=1)
```

### Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `assigned_medoid_indices` | ✓ | `ndarray` | Return value of `KMedoids`. |
| `input_base` | ✗ | `0` / `1` | Indexing base of `assigned_medoid_indices`. Default `1` for raw `KMedoids` output; use `0` if indices are already 0-based. |

### What It Returns

`np.ndarray` of shape `(n,)`: cluster labels `0 … K−1`, ordered by increasing medoid index.

Observations sharing the same medoid receive the same label. Label order follows sorted unique medoid indices.

### Example

```python
from sequenzo import KMedoids, cluster_labels_from_kmedoids_result, hard_classification_variables

kmed = KMedoids(diss, k=5, method="PAMonce", verbose=False)
labels = cluster_labels_from_kmedoids_result(kmed)
dummies = hard_classification_variables(labels, k=5, reference=0)
```

Pass the raw `KMedoids` return vector directly. Do **not** subtract 1 manually — the helpers convert from 1-based to 0-based when `input_base=1` (the default). If your vector is already 0-based, pass `input_base=0` instead.

## R / Literature Parameter Mapping

| Sequenzo | R / packages | Notes |
| --- | --- | --- |
| `KMedoids` return vector | `wcKMedoids` medoid-index output | 1-based medoid row indices per case |
| `input_base=1` | Default for raw `KMedoids` / WeightedCluster output | Converts to 0-based medoid rows |
| `medoid_indices_from_kmedoids_result()` | Unique sorted medoids from PAM result | Used for representativeness columns |
| `cluster_labels_from_kmedoids_result()` | Cluster id derived from medoid assignment | Used for hard dummies |

## Notes

- Both helpers accept an empty vector and return an empty array unchanged.
- These functions only **interpret** a `KMedoids` result; they do not rerun clustering.
- For representativeness, always pass the output of `medoid_indices_from_kmedoids_result`, not `highest_membership_indices` from `fanny_membership()`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., Helske, J., & Chihaya, G. K. (2024). From sequences to variables: Rethinking the relationship between sequences and outcomes. *Sociological Methodology*, 54(1), 27–51.
