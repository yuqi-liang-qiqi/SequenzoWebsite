# Clustering Extensions

This page collects clustering tools that go beyond the basic `Cluster`, `KMedoids`, `ClusterQuality`, and `ClusterResults` workflow. Use these tools when you need to compare a range of cluster solutions, validate partitions, work with fuzzy memberships, or build property-based typologies.

## At a Glance

| Question | Guidance |
| --- | --- |
| Use this when | A single hard clustering solution is not enough: you need range search, fuzzy membership, validation, or property-based interpretation. |
| You need before starting | A distance matrix, a candidate partition, or a `SequenceData` object depending on the tool. |
| Do not use this when | You only need a first standard partition; start with [`KMedoids`](/en/function-library/KMedoids) or [`Cluster`](/en/function-library/hierarchical-clustering). |
| Next step | Use [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators) and the tool-specific result tables together. |

## Cluster Ranges and Method Comparison

| Function or class | Role |
| --- | --- |
| `k_medoids_range()` | Run weighted PAM/k-medoids for several values of `k` |
| `hierarchical_cluster_range()` | Evaluate hierarchical clustering solutions across `k` |
| `compare_cluster_methods()` | Compare multiple hierarchical and PAM-style methods on one distance matrix |
| `ClusterRangeResult` | Result object for one family of partitions |
| `ClusterRangeFamilyResult` | Result object for multiple clustering methods |

```python
from sequenzo.clustering import compare_cluster_methods

comparison = compare_cluster_methods(
    diss,
    maxcluster=10,
    weights=weights,
    methods="all",
    random_state=42,
)

print(comparison.allstats)
```

Use this when your question is "which clustering method and number of clusters are plausible?" rather than "fit this one chosen clustering solution."

## Partition Validation

| Function | Purpose |
| --- | --- |
| `compute_partition_quality()` | Compute partition quality indicators for one clustering |
| `cluster_range_from_partitions()` | Evaluate a table of candidate partitions |
| `boot_cluster_range()` | Bootstrap partition quality over resamples |
| `observation_silhouette()` | Observation-level silhouette diagnostics |
| `cluster_association()` | Association between cluster labels and covariates |
| `plot_cluster_association()` | Visualize cluster-covariate association summaries |
| `rarcat()` | Typology regression validation following the RARCAT idea |

```python
from sequenzo.clustering import compute_partition_quality, observation_silhouette

quality = compute_partition_quality(diss, cluster_labels, weights=weights)
sil = observation_silhouette(diss, cluster_labels)
```

## Fuzzy Clustering and Memberships

| Function or class | Role |
| --- | --- |
| `wfcmdd()` | Weighted fuzzy clustering for distance data |
| `WfcmddResult` | Result object returned by `wfcmdd()` |
| `crispness()` | Crispness score for membership matrices |
| `get_fuzzy_clusters()` | Run fuzzy clustering through a unified FANNY or `wfcmdd` interface |
| `membership_summary()` | Summarize membership strength |
| `most_typical_members()` | Identify high-membership cases |
| `fuzzy_sequence_plot()` | Plot fuzzy sequence groups |
| `dirichlet_regression()` | Model fuzzy memberships with covariates |
| `beta_regression()` | Model one membership dimension |

```python
from sequenzo.clustering import get_fuzzy_clusters, membership_summary

fuzzy = get_fuzzy_clusters(
    diss,
    n_clusters=4,
    method="wfcmdd",
    weights=weights,
)
summary = membership_summary(fuzzy.membership)
```

Fuzzy clustering is useful when many cases sit between ideal trajectory types and hard cluster assignment hides that ambiguity.

## Property-Based Clustering

Property-based clustering uses sequence-derived features to build interpretable typologies.

| Function | Purpose |
| --- | --- |
| `extract_sequence_properties()` | Extract state, duration, transition, pattern, and complexity properties |
| `property_based_clustering()` | Build a discrepancy tree from extracted properties |
| `seqpropclust()` | `WeightedCluster::seqpropclust()`-compatible alias |
| `cluster_split_schedule()` | Order tree splits by global relevance |
| `cut_tree()` | Cut a property tree into groups |
| `prune_property_tree()` | Prune the tree to a simpler typology |
| `tree_labels()` | Generate readable labels for terminal groups |
| `plot_property_tree()` | Visualize the property tree |
| `property_clustering_quality()` | Evaluate property-clustering quality |

```python
from sequenzo.clustering import property_based_clustering, plot_property_tree

tree = property_based_clustering(
    seqdata,
    diss,
    properties=("state", "duration", "transition", "Complexity"),
    max_clusters=6,
)

plot_property_tree(tree)
```

Use this approach when interpretability of the splitting variables matters as much as distance-based compactness.

## Relationship to Core Clustering Pages

- Start with [`Hierarchical Clustering`](/en/function-library/hierarchical-clustering) or [`KMedoids`](/en/function-library/KMedoids) for a standard partition.
- Use [`Cluster Quality`](/en/function-library/cluster-quality) to inspect one selected solution.
- Use this page when you need range search, method comparison, fuzzy memberships, bootstrap validation, or property-based typologies.

## Authors

Code: Yuqi Liang
