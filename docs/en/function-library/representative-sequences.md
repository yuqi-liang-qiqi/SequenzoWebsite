# Representative Sequences

Representative-sequence tools help you summarize a set of trajectories without forcing every sequence into a hard cluster. They answer questions such as:

- Which sequence is closest to the center of a group?
- Which observed objects can represent the main regions of a distance space?
- Which medoids summarize relative-frequency groups?
- Which sequences are poorly represented by any chosen representative?

This page covers the TraMineR-style representative-sequence API exported by Sequenzo.

## Public API

| Function | TraMineR counterpart | Main role |
| --- | --- | --- |
| `get_distance_center()` | `disscenter()` | Compute distance-to-center values and optional medoid indices |
| `get_relative_frequency_groups()` | `dissrf()` | Partition a distance space into relative-frequency groups |
| `get_relative_frequency_representatives()` | `seqrf()` | Return representative sequences for relative-frequency groups |
| `get_representative_objects()` | `dissrep()` | Select representative objects using density or score criteria |
| `get_representative_sequences()` | `seqrep()` | Select representative observed sequences from `SequenceData` |

## Import

```python
from sequenzo import (
    get_distance_center,
    get_relative_frequency_groups,
    get_relative_frequency_representatives,
    get_representative_objects,
    get_representative_sequences,
)
```

## Distance Center and Medoids

`get_distance_center()` computes, for each object, its weighted distance-to-center within a group. You can also request the medoid index.

```python
from sequenzo import get_distance_center

center_scores = get_distance_center(diss)
medoid_index = get_distance_center(diss, medoids_index="first")
group_medoids = get_distance_center(diss, group=cluster_labels, medoids_index="first")
```

Use this when you need a representative object for the full sample or for each cluster. Returned indices are zero-based Python indices.

## Relative-Frequency Representatives

Relative-frequency representatives divide a distance space into ordered groups and choose a medoid for each group.

```python
from sequenzo import get_relative_frequency_groups

rf = get_relative_frequency_groups(
    diss,
    k=10,
    sortv="mds",
    weights=weights,
    grp_meth="prop",
)

print(rf["medoids"])
print(rf["R2"], rf["Fstat"])
```

To return the representative sequences themselves:

```python
from sequenzo import get_relative_frequency_representatives

representatives = get_relative_frequency_representatives(
    seqdata,
    diss,
    k=10,
    weighted=True,
)
```

This is useful for visual summaries where a small number of observed trajectories should stand in for the full distance space.

## Representative Objects and Sequences

`get_representative_objects()` and `get_representative_sequences()` select representatives by coverage. The common choice is `criterion="density"`, which favors objects that cover many nearby cases.

```python
from sequenzo import get_representative_sequences

rep = get_representative_sequences(
    seqdata,
    criterion="density",
    coverage=0.25,
    pradius=0.10,
    diss=diss,
)

print(rep["indices"])
print(rep["sequences"])
print(rep["quality"])
```

Use `nrep` when you want an exact number of representatives, or `coverage` when the goal is to cover a target share of the sample.

## Representative Sequences vs. Representativeness Matrix

These functions select or describe representative observed sequences. They are related to, but not the same as, the [representativeness matrix](/en/beyond-basic-clustering/from-sequences-to-variables/representativeness-matrix), which turns closeness to medoids into regression-ready variables.

| Need | Use |
| --- | --- |
| Pick representative observed objects | `get_representative_sequences()` or `get_representative_objects()` |
| Get medoids for relative-frequency groups | `get_relative_frequency_representatives()` |
| Create variables measuring closeness to medoids | `representativeness_matrix()` |
| Plot one medoid visually | [`plot_single_medoid()`](/en/visualization/plot-single-medoid) |

## Practical Notes

- Representative indices are zero-based.
- Provide `weights` when the sample has survey weights or frequency weights.
- For large datasets, compute the distance matrix with an aggregation or CLARA workflow first, then apply representative tools to a manageable distance space.
- A representative sequence is not automatically a cluster label. It is an observed case chosen to summarize a region of the distance space.

## See Also

- [Single Medoid Plot](/en/visualization/plot-single-medoid) visualizes a representative sequence.
- [Relative Frequency Plot](/en/visualization/plot-relative-frequency) shows group medoids at scale.
- [From Sequences to Variables](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) builds regression variables from representativeness.

## Authors

Code: Yuqi Liang

