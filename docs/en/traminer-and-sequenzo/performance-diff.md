# Performance Differences between TraMineR and Sequenzo

Sequenzo is designed for Python-native sequence analysis, with optimized distance computation, clustering helpers, and workflows that integrate with pandas, NumPy, scikit-learn, and matplotlib.

Benchmarks in the project materials show 8× faster processing than R-based workflows in tested distance-computation examples. Treat that as a practical signal, not a universal constant: performance depends strongly on the data and workflow.

- The number of sequences.
- The number of unique sequences.
- The sequence length.
- The number of states.
- The distance measure and normalization method.
- Whether the workflow requires a full pairwise distance matrix.

## Practical Guidance

For small and medium datasets, the standard workflow is usually:

1. Define sequences with [`SequenceData`](/en/function-library/sequence-data).
2. Compute distances with [`get_distance_matrix()`](/en/function-library/get-distance-matrix).
3. Cluster with [hierarchical clustering](/en/function-library/hierarchical-clustering) or [`KMedoids`](/en/function-library/KMedoids).
4. Validate and visualize the solution.

For larger datasets, inspect whether many trajectories are repeated. If the full distance matrix becomes too large, use:

- [If You Have Big Data](/en/basics/if-you-have-big-data) for decision guidance.
- [`check_uniqueness_rate()`](/en/big-data/check-uniqueness-rate) to assess repetition and uniqueness.
- [`clara()`](/en/big-data/clara) for large-scale medoid-style clustering.

## Interpreting Performance Claims

R packages such as TraMineR, WeightedCluster, and TraMineRextras remain foundational tools in social sequence analysis. Sequenzo aims to make similar workflows practical in Python and to improve scalability where optimized kernels, compiled code, or sampling-based methods are available.

Avoid treating a single speed number as universal. Runtime comparisons should specify the dataset size, sequence length, state alphabet, distance method, normalization, hardware, and whether the output is a full or condensed distance matrix.

See [What's New](/en/changelog) for release-specific performance and packaging updates.
