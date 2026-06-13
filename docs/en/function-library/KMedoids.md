# `KMedoids()`

Center-based clustering where each cluster center is a real data point. It supports three algorithms: `KMedoids`, `PAM` (Partitioning Around Medoids), and `PAMonce` (a PAM variant that uses a single, once-only swap pass). All parameters follow [WeightedCluster::wcKMedoids](https://cran.r-project.org/web/packages/WeightedCluster/WeightedCluster.pdf).

Sequenzo also implements hierarchical clustering. For related learning materials, see the video [How to interpret a hierarchical clustering dendrogram? How to combine sequence analysis with regression analysis?](https://www.bilibili.com/video/BV1qyUwYhEc3/?spm_id_from=333.1387.collection.video_card.click&vd_source=11ad9be9a8cb39e0dcc112066c8cae70).

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
clustering = KMedoids(
   diss=om,      # dissimilarity matrix (DataFrame or ndarray)
   k=5           # number of clusters
)
```
A fuller example showing the most commonly used parameters (for more control):

```python
clustering = KMedoids(
    diss=om,                # dissimilarity matrix, from get_distance_matrix()
    k=5,                    # number of clusters
    method='PAMonce',       # clustering algorithm: 'KMedoids', 'PAM', or 'PAMonce'
    initialclust=None,      # optional: medoid IDs / membership matrix / linkage matrix
    npass=1,                # number of passes (repeat optimization loops)
    weights=None            # optional: weight for each sequence (defaults to 1)
)
```

## Entry Parameters

### diss

The dissimilarity matrix. Required. It accepts a `DataFrame` or NumPy array, for example the distance matrix returned by [get_distance_matrix](/en/function-library/get-distance-matrix). Either a square `(n, n)` matrix or a 1D condensed vector of length `n(n-1)/2` is accepted.

### k

Required. An `int` giving the number of clusters to form.

### method

Optional. A `str` with default `'PAMonce'`. It selects the clustering algorithm.

Three methods are supported: `KMedoids`, `PAM` (Partitioning Around Medoids), and `PAMonce` (PAM with a single, once-only swap pass). All three return real data points as cluster centers. PAM and PAMonce are variants of KMedoids.

### initialclust

Optional. Controls how the initial medoids are chosen before the algorithm starts refining them. It accepts a `list`, a `numpy.ndarray`, or a SciPy linkage matrix. The default is `None`.

The value can describe the starting point in two different ways:

* As an initial cluster structure: a `list` or `numpy.ndarray` of length `k` whose elements are the indices of the sequences to use as initial medoids.
* As an initial cluster assignment: a membership vector with one entry per sequence (or a linkage matrix from hierarchical clustering), from which the function derives one initial medoid per cluster.

How each input is handled:

* `None`: initialization depends on `npass`. When `npass > 0`, the implementation starts from the first `k` sequence indices before running the requested refinement passes. When `npass=0`, it randomly selects `k` initial medoid points from the available sequence indices.

* `list` or `numpy.ndarray` of length `k`: the listed sequence indices are used directly as initial medoids.

* `list` or `numpy.ndarray` with one entry per sequence: treated as a membership vector. The function selects one initial medoid from each cluster using the weights; see *Supplementary Details*.

* Linkage matrix: the function first cuts the tree with `cut_tree()` to obtain a membership vector, then selects initial medoids from the resulting clusters based on weights, as above.

When to use which input:

| Input | Use it when |
| --- | --- |
| `None` | You want to leave initialization entirely to the function. |
| Length-`k` vector of indices | You want to specify the initial medoids yourself instead of letting the function choose. |
| Membership vector | You already have a reasonable partition and want the function to derive initial medoids from it. |
| Linkage matrix | You have a hierarchical clustering result and want to use it as a warm start. |

### npass

Optional. An `int` with default `1`. It sets how many times the medoid refinement loop runs.

One pass iterates through each cluster and tries to find a better medoid (see *Supplementary Details* for what counts as better). A full traversal of all clusters is one pass; `npass` repeats it.

### weights

Optional. A `list` or `numpy.ndarray` giving one weight per sequence. The default is `None`, which assigns every sequence a weight of 1.

### cluster_only

Optional. A `bool` with default `False`. Accepted for API compatibility; in the current implementation the return value is the same either way.

### verbose

Optional. A `bool` with default `True`. When `True`, the function prints progress messages such as the selected algorithm and completion notices.

### random_state

Optional. An `int` or `None` (default). Seeds the random selection of initial medoids in the `npass=0` case, making that initialization reproducible. It has no effect when `initialclust` is given or `npass > 0`.

## Returns

A length-`n` NumPy array of 1-based medoid row indices, following the same convention as WeightedCluster's `wcKMedoids`. Each element is the 1-based row index of the medoid that the corresponding sequence is assigned to, so sequences sharing the same value belong to the same cluster.

To convert this result into other forms, use `medoid_indices_from_kmedoids_result()` for 0-based medoid indices, or `cluster_labels_from_kmedoids_result()` for 0..K-1 cluster labels.

## Supplementary Details

The program uses the following process to optimize the initial medoids based on weights:

1. Based on the user-provided input, `cut_tree` is used to divide the data into clusters, resulting in an initial clustering result.

2. For each data point within the same cluster, the sum of distances to all other points in that cluster is calculated.

$$
D(x) = \sum_{i \neq x}^{N} w_i * diss(x_i, x)
$$

3. The point with the smallest total distance is selected as the medoid of the cluster.

4. Repeat this process for all clusters to determine their medoids.

---

In the actual execution of the algorithm, “better” refers to the following:

1. Iterate through all data points, attempting to treat each one as a potential new medoid;

2. Compare the new candidate medoid with the current cluster medoid: if replacing the old medoid with the new one results in a lower cost, the replacement is made.
   
   $$
   Loss=\sum_{x\in{all}}^{N}\sum_{i\in{C_{j}}}^{N}w_{x}*(diss(i,x)-diss(i,M_{j}))
   $$

   Here, `x` denotes the new candidate medoid.

3. If `Loss < 0`, the cost is negative, indicating that the average intra-cluster distance has decreased compared to the previous iteration. If `Loss > 0`, the cost is positive, indicating that the average intra-cluster distance has increased. The search stops when the loss becomes greater than 0, and the loop terminates.

## Examples

The following is a usage example. The dataset comes from Gapminder and contains CO₂ emissions data for 194 countries from 1800 to 2022. This dataset is built into Sequenzo. For more details, see [CO₂ Emissions (1800-2022)](/en/datasets/CO2-emissions).

We define the sequences, compute OM distances, and run each of the three algorithms on the resulting distance matrix.

```python
from sequenzo import *

df = load_dataset('country_co2_emissions')

time = list(df.columns)[1:]
states = ['Very Low', 'Low', 'Middle', 'High', 'Very High']
sequence_data = SequenceData(df,time=time, id_col="country", states=states)
om = get_distance_matrix(sequence_data, method="OM", sm="TRATE", indel="auto")

centroid_indices = [0, 50, 100, 150, 190]
n_pass = 10

# Example 1: KMedoids algorithm without specifying the center point
clustering = KMedoids(diss=om,
                      k=5,
                      method='KMedoids',
                      npass=n_pass,
                      weights=None)

# Example 2: PAM algorithm with a specified center point
clustering = KMedoids(diss=om,
                      k=5,
                      method='PAM',
                      initialclust=centroid_indices,
                      npass=n_pass,
                      weights=None)

# Example 3: PAMonce algorithm with default parameters
clustering = KMedoids(diss=om,
                      k=5,
                      method='PAMonce',
                      npass=n_pass,
                      weights=None)
```

## Output
1. Example 1:
```text
[>] SequenceData initialized successfully! Here's a summary:
[>] Number of sequences: 193
[>] Number of time points: 223
[>] Min/Max sequence length: 223 / 223
[>] States: ['Very Low', 'Low', 'Middle', 'High', 'Very High']
[>] Labels: ['Very Low', 'Low', 'Middle', 'High', 'Very High']
[>] Processing 193 sequences with 5 unique states.
[>] Transition-based substitution-cost matrix (TRATE) initiated...
  - Computing transition probabilities for: [Very Low, Low, Middle, High, Very High]
[>] Indel cost generated.

[>] Identified 175 unique sequences.
[>] Starting Optimal Matching(OM)...
[>] Computing all pairwise distances...
[>] Computed Successfully.
[>] Starting KMedoids...
[>] Computed successfully.
```
2. Example 2:
```text
[>] Starting Partitioning Around Medoids (PAM)...
  - PAM loop over pass number  1
[>] Computed successfully.
```

3. Example 3:
```text
[>] Starting Partitioning Around Medoids with a Once-Only Swap Pass (PAMonce)...
[>] Computed successfully.
```

## See Also

- [`Cluster()`](/en/function-library/hierarchical-clustering) is the hierarchical alternative.
- [KMedoids Result Helpers](/en/beyond-basic-clustering/from-sequences-to-variables/medoid-indices-from-kmedoids-result) convert the returned medoid indices.
- [CLARA](/en/big-data/clara) scales medoid clustering to large datasets.

## Authors

Code: Xinyi Li, Cheng Deng

Documentation: Xinyi Li, Sizhu Qu

Edited by: Yuqi Liang

Translation and testing by: Sizhu Qu
