# Cluster Analysis Methods

After you compute a sequence distance matrix, clustering methods use those distances to group similar trajectories. The distance matrix answers "how different are these two sequences?" The clustering method answers "which sequences should be placed in the same type?"

These are separate decisions. A clustering algorithm cannot repair a distance measure that does not match the research question, and a good distance measure can still be summarized badly by the wrong grouping strategy. This page explains the two main method families in Sequenzo, how to read their output, and how to choose between them.

## Before You Start

You should already have a distance matrix from [`get_distance_matrix()`](/en/function-library/get-distance-matrix) and know roughly what your distance measure emphasizes. See [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) if not.

By the end, you should be able to choose between hierarchical and medoid-based clustering, justify a linkage method, and know which diagnostics to inspect before interpreting clusters.

## Hierarchical Clustering

Hierarchical clustering builds a tree, also called a dendrogram. At the start, each sequence is its own cluster. The algorithm repeatedly merges the two closest clusters until all sequences belong to one tree. You then cut the tree at a chosen number of clusters `k`.

The definition of "closest" between two clusters is the linkage method. Sequenzo's [`Cluster()`](/en/function-library/hierarchical-clustering) supports six linkage methods:

| Method | How it compares two clusters | Typical behavior |
| --- | --- | --- |
| `average` | Average distance between all cross-cluster pairs | Balanced clusters; a good first choice for sequence distance matrices |
| `complete` | Largest cross-cluster distance | Tighter, more compact clusters |
| `single` | Smallest cross-cluster distance | Can produce long chained clusters; rarely useful for typologies |
| `ward` | Merges clusters to limit within-cluster dispersion | Even-sized clusters; assumes Euclidean distances |
| `centroid` | Distance between cluster centroids | Sensitive to cluster size differences |
| `median` | Distance between cluster medians | Similar caveats to `centroid` |

Two practical notes on `ward`. First, Ward's criterion is defined for squared Euclidean distances, and OM-style sequence distances are not Euclidean in general. Ward linkage still runs and is widely used in published sequence analysis, but treat it as an approximation and compare its solution against `average` linkage (Studer, 2013). Second, Ward tends to produce clusters of similar size, which can be either a feature or a distortion depending on whether your data really contain balanced groups.

### Reading a Dendrogram

A dendrogram shows the merge history. The height at which two branches join is the distance at which those clusters were merged. Long vertical stretches without merges suggest well-separated groups; cutting just below a long stretch gives a natural partition. Short, dense merges near the top suggest that the data do not separate cleanly at that level.

Do not choose `k` from the dendrogram alone. Use it to form candidate values of `k`, then compare them with [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators) and with plots of the resulting clusters.

### The Sequenzo Workflow

```python
from sequenzo import Cluster, ClusterQuality, ClusterResults

cluster = Cluster(
    matrix=distance_matrix,
    entity_ids=seq.ids,
    clustering_method="average",
)

quality = ClusterQuality(cluster, max_clusters=10)
quality.compute_cluster_quality_scores()
print(quality.get_cqi_table())

results = ClusterResults(cluster)
members = results.get_cluster_memberships(num_clusters=5)
```

[`Cluster()`](/en/function-library/hierarchical-clustering) fits the tree, [`ClusterQuality()`](/en/function-library/cluster-quality) compares candidate values of `k`, and [`ClusterResults()`](/en/function-library/cluster-results) exports the final membership table.

## Medoid-Based Clustering

Medoid-based methods choose real observed sequences as cluster centers. This is useful in sequence analysis because the medoid can be plotted and interpreted as a representative trajectory, while an averaged center of categorical sequences would not correspond to any real path.

| Method | Main idea | When to use |
| --- | --- | --- |
| PAM | Searches for `k` medoids on the full distance matrix | Moderate datasets where the full matrix fits in memory |
| k-medoids | General medoid-based partitioning | When you want representative observed sequences |
| CLARA | Runs medoid clustering on repeated subsamples, then assigns the full dataset | Large datasets where full PAM is too expensive |

Unlike hierarchical clustering, medoid methods fit each `k` separately, so the solution for `k = 5` is not a refinement of the solution for `k = 4`. They also start from initial medoids, which means results can depend on initialization; Sequenzo's [`KMedoids()`](/en/function-library/KMedoids) accepts explicit initial medoids or a hierarchical solution as a warm start.

Sequenzo documents medoid tools in [`KMedoids()`](/en/function-library/KMedoids) and [`clara()`](/en/big-data/clara).

## Beyond Hard Partitions

Both families above assign each sequence to exactly one cluster. Two extensions matter when that is too rigid:

- **Fuzzy clustering** gives each sequence a degree of membership in every cluster. This is useful when many trajectories sit between types. See [FANNY Membership](/en/beyond-basic-clustering/from-sequences-to-variables/fanny-membership) and the surrounding [From Sequences to Variables](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) module.
- **Representativeness measures** score how well each sequence is described by each medoid, which helps identify poorly represented sequences and outliers. See [Representativeness Matrix](/en/beyond-basic-clustering/from-sequences-to-variables/representativeness-matrix).

## Choosing a Method

Start with hierarchical clustering when your dataset is small or moderate and you want to inspect a dendrogram. For OM, LCS, and related sequence distance matrices, `average` linkage is a safer default than `ward`, and a comparison between the two is an easy robustness check. Start with CLARA when the dataset is large, the full distance matrix is expensive, or you mainly need a scalable typology. Use medoid-based results when representative observed sequences are important for interpretation.

Whichever method you choose, the distance measure still matters first. A poor distance measure can produce a clean-looking cluster solution that answers the wrong question.

## What to Check Before Interpreting

1. Compare two or three candidate values of `k` with [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators), not just one indicator at its maximum.
2. Plot each candidate solution with a [State Distribution Plot](/en/visualization/state-distribution-plot) or [Index Plot](/en/visualization/index-plot) and check that the clusters are describable.
3. Check cluster sizes. Very small clusters may be outlier groups; decide whether to keep, merge, or report them separately.
4. Rerun with a different linkage method or with k-medoids and check whether the substantive story survives. Agreement across methods is reassuring; disagreement tells you the typology is method-dependent and should be reported as such.

## See Also

- [Typical Workflow](/en/basics/typical-workflow)
- [Dissimilarity Measures](/en/tutorials/dissimilarity-measures)
- [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators)
- [Understanding CLARA](/en/tutorials/understanding-clara)
- [Reporting Results of the Typical Workflow](/en/tutorials/reporting-sequence-analysis)

## References

Kaufman, L., & Rousseeuw, P. J. (2009). *Finding groups in data: An introduction to cluster analysis.* John Wiley & Sons.

Studer, M. (2013). WeightedCluster library manual: A practical guide to creating typologies of trajectories in the social sciences with R. *LIVES Working Papers*, 24. https://doi.org/10.12682/lives.2296-1658.2013.24
