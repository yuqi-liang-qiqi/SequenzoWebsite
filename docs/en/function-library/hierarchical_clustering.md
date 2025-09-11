# `Cluster` (Hierarchical Clustering)

Once you’ve built a precomputed distance matrix (n×n, square form) with `get_distance_matrix()`, you’re ready to cluster. In sequence analysis, hierarchical clustering is a straightforward way to uncover typical trajectory patterns. 

As with `SequenceData`, you’ll work through a simple object: create a `Cluster` instance, compute the hierarchy (as the name indicates), and choose the number of clusters and present the results. In other words, the process is: cluster → pick k → export labels → analyze.

`Cluster` focuses on three tasks you usually need in one place:

1. run hierarchical clustering efficiently (`Cluster`)
2. decide how many clusters to keep (`ClusterQuality`)
3. turn results into clean tables and simple plots (`ClusterResults`)

Think of `Cluster` as the clustering engine, with two small companions that help you pick k and export results. You can use only `Cluster` if that’s all you need; the other two are optional.

Under the hood, this object uses `fastcluster`, which is typically faster and more memory, efficient than the standard SciPy approach, especially helpful for large datasets.

## Typical workflow

1. Prepare a square distance matrix `D` (shape n×n) from `get_distance_matrix()` and a list/array of `entity_ids` (length n, all unique).
2. Create a `Cluster` and (optionally) plot a dendrogram.
3. Get cluster labels for a chosen `k`.
4. Use `ClusterQuality` to compare different `k`s with standard metrics.
5. Use `ClusterResults` to export a membership table and a simple cluster size plot. The downstream analysis after this step would be fitting a regression model in which you use every individual's membership as either an explanatory variable, or an outcome variable. 

## Quick start 

You only need two things to start: a distance matrix and IDs.

```python
from sequenzo.clustering.hierarchical_clustering import Cluster, ClusterQuality, ClusterResults

# distance_matrix: square distance matrix (n x n), 
# ids: list/array of length n (unique)
# "ward" is usually the recommended way
cluster = Cluster(
    matrix=distance_matrix, 
    entity_ids=ids, 
    clustering_method="ward"
)  

# Optional: dendrogram (for very large n, labels are hidden automatically)
# If you are a newbie, it would be good to try out this function to see the hierarchical structure
cluster.plot_dendrogram(
    # If you don't want to save it, simply remove this paramter
    save_as="dendrogram.png",  
    # The title of the graph
    title="Dendrogram" 
)

# Help choose k
cluster_quality = ClusterQuality(cluster, max_clusters=20)
cluster_quality.compute_cluster_quality_scores()
# one-line summary of "best k" per metric
print(cluster_quality.get_metrics_table())     
# Change the name of the saved figure if you want
cluster_quality.plot_combined_scores(save_as="quality.png") 

# Get labels for k clusters
labels_k6 = cluster.get_cluster_labels(num_clusters=6)

# Export results
cluster_results = ClusterResults(cluster)
# Entity ID → Cluster
members = cluster_results.get_cluster_memberships(num_clusters=6)     
# counts and %
dist = cluster_results.get_cluster_distribution(num_clusters=6)       
cluster_results.plot_cluster_distribution(num_clusters=6, save_as="cluster_sizes.png")
```

## `Cluster` — the clustering engine

### What it does

* Checks and cleans your distance matrix:

  * replaces NaN/Inf with the largest finite value found
  * makes the matrix symmetric if needed
* Computes the linkage (with `fastcluster`, a Python package)
* Lets you:

  * plot a dendrogram
  * get labels for k clusters via `fcluster(..., criterion="maxclust")`

### Constructor

```python
Cluster(matrix, entity_ids, clustering_method="ward")
```

| Parameter          | Required | Type                 | Meaning                                                                           |
| ------------------ | -------: | -------------------- | --------------------------------------------------------------------------------- |
| matrix             |        ✓ | ndarray or DataFrame | Square distance matrix (n×n). If DataFrame, it’s converted to NumPy.          |
| entity\_ids        |        ✓ | list/array           | Unique IDs, length = n, in the same order as matrix rows/cols.                    |
| clustering\_method |        ✗ | str                  | "ward", "single", "complete", "average", "centroid", or "median". Default "ward". |

Notes for beginners: “Distance” means “bigger = more different”, which is different from similarity.

### Main methods

```python
cluster.plot_dendrogram(save_as=None, title="Dendrogram", figsize=(12,8), dpi=200, ...)
```

Draws a dendrogram. For large n, x-axis labels are hidden to avoid clutter.
If `save_as` is provided, the figure is saved; otherwise it shows on screen.

```python
labels = cluster.get_cluster_labels(num_clusters=K)
```

Returns a 1D integer array of cluster IDs (1..K), aligned with `entity_ids`.

For `ClusterQuality` and `ClusterResults`, please refer to the next two guides. 

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang