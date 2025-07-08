# KMedoids

Function for center clustering (the center point of each cluster is real), supports: KMedoids, PAM (Partitioning Around Medoids), PAMonce (PAM with a only-once). The three algorithms, their principles and differences are detailed in the document: [KMedoids v.s. PAM (PAMonce)](https://sequenzo.yuqi-liang.tech/en/tutorials/short-tutorial)<mark>待补充</mark>。All parameters of `KMedoids` follow [WeightedCluster::KMedoids](https://cran.r-project.org/web/packages/WeightedCluster/WeightedCluster.pdf)。

Sequenzo also implements hierarchical clustering. For related learning materials, see the video [How to interpret a hierarchical clustering dendrogram? How to combine sequence analysis with regression analysis?](https://www.bilibili.com/video/BV1qyUwYhEc3/?spm_id_from=333.1387.collection.video_card.click&vd_source=11ad9be9a8cb39e0dcc112066c8cae70).

## Function Usage

```python
clustering = KMedoids(
    diss,
    k,
    method='PAMonce',
    initialclust=None,
    npass=1,
    weights=None)
```

## Entry parameters

### diss

That is, “dissimilarity matrix”, required, allowed data types are`DataFrame`, distance matrix（calculated by [get_distance_matrix](https://sequenzo.yuqi-liang.tech/en/function-library/get-distance-matrix) ).

### k

Required. The allowed data type is `int`, the number of clusters you want to cluster.

### Method

Can be passed in. The allowed data type is`String`, the default value is `'PAMonce'`, Select the clustering method to use.

Three methods are supported: `KMedoids`, `PAM`(Partitioning Around Medoids), and `PAMonce`(PAM with a only-once). The cluster centers obtained by the three methods are all real data points. PAM and PAMonce are variants of KMedoids. The differences between them are shown in the document <mark>[待补充]</mark>。

### Initialclust

That is, “initial_cluster_assignment”(which means "initialized cluster structure" or "initial cluster allocation scheme"), which can be passed in. The allowed data types are `list`, `numpy.ndarray`, and `linkage matrix`. The default value is `None`.

* Initialized cluster structure: that is, specify the cluster center. Since the cluster center is generally ≥ 2, a `list` or `numpy.ndarray` is passed in. It indicates how many clusters are divided and what the initial center points of these clusters are.

* Initial cluster allocation scheme: that is, membership matrix. It indicates which clusters all data points are assigned to, so the passed in is `list/numpy.ndarray` or `linkage matrix`.

Before each clustering algorithm starts, it is necessary to determine the initial center point through some strategy. If the `initialclust` parameter is provided, the data in it will be used directly/indirectly to get the initial center.

* If set to `None`, the program randomly selects `k` initial medoid points from the range [1, number_of_elements].

* If set to `list/numpy.ndarray`, it can be either: (1) A user-defined list of initial cluster centers (each element must be a valid data point `id`), The specified points will be used as the initial medoids. In this case, the number of elements in the `list/numpy.ndarray` must be equal to `k`. or (2) A membership matrix (the number of elements must match the number of data points). The program will use the weights to select one initial center from each given cluster. For how to choose, see *Supplementary Details*.

* If set to `linkage matrix`, the program first uses hierarchical clustering via `cut_tree()` to obtain a membership matrix, and then selects initial medoids from the resulting clusters based on weights. See Supplementary Details for more information.

The selection scenarios for the three parameter types are as follows:

| parameter                  | scenario                                                                                                                                                                                                                                                                                                                                                                                      |
| -------------------- |:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `None`               | If the user wants to leave initialization entirely to the program (the program by default randomly selects `k` data points as medoids, with no default membership matrix).                                                                                                                                                                                                                    |
| `list/numpy.ndarray` | [Scenario 1: Initial cluster structure, i.e., specifying medoids] The user wants to manually specify the medoids as the initial centers, instead of letting the program select them randomly.<br/>[Scenario 2: Initial cluster assignment, i.e., with membership matrix] The user already has a good membership matrix and wants the program to use it to find suitable initial medoids.      |
| `linkage matrix`     | The user has a linkage matrix representing the merging process of hierarchical clustering and wants the program to use it to find suitable initial medoids.                                                                                                                                                                                                                                   |

We found that specified medoids are most often represented using `list`, while membership matrices are more commonly represented using `numpy.ndarray`.

### npass

This refers to “number of passes”, which can be passed as a parameter. The accepted data type is `int`, with a default value of `1`. It determines how many times the data point assignment process will be repeated.

One data assignment process (taking PAM as an example)refers to: iterating through each cluster and attempting to find a better medoid (see *Details* for the evaluation criterion of “better”). A full traversal of all clusters constitutes one round of data point reassignment.

`npass` specifies how many times this process will be repeated.

### Weights

This parameter is optional and accepts input of type `list/numpy.ndarray`, the default is`None`, representing the weight of each data point.

If set to`None`, all sequences are assigned a default weight of 1.

## Return Value

`pandas.Series`, a membership matrix indicating which cluster each ID belongs to.

## Supplementary Details

The program uses the following process to optimize the initial medoids based on weights:

1. Based on the user-provided input, `cut_tree` is used to divide the data into clusters, resulting in an initial clustering result.

2. For each data point within the same cluster, the sum of distances to all other points in that cluster is calculated.
   
   $$
   D(x)=\sum_{i\not=x}^{N}w_{i}*diss(x_{i}, x)
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

3. If `Loss ＜ 0`, the cost is negative, indicating that the average intra-cluster distance has decreased compared to the previous iteration. If `Loss ＞ 0`, the cost is positive, indicating that the average intra-cluster distance has increased. The search stops when the loss becomes greater than 0, and the loop terminates.

## Authors

Code: Xinyi Li，Cheng Deng

Edit: Xinyi Li，Yuqi Liang

## Examples

The following is a usage example. The dataset comes from Gapminder and contains CO₂ emissions data for 194 countries from 1800 to 2022. This dataset is built into Sequenzo. For more details, [Click here](https://sequenzo.yuqi-liang.tech/zh/datasets/co2-emissions)。

We perform clustering on the dataset and visualize the output using t-SNE to provide a more intuitive view of the clustering results.

```Python
from sequenzo import *
from sequenzo.dissimilarity_measures import get_distance_matrix
from sequenzo.clustering.KMedoids import KMedoids

df = load_dataset('country_co2_emissions')

time = list(df.columns)[1:]
states = ['Very Low', 'Low', 'Middle', 'High', 'Very High']
sequence_data = SequenceData(df, time_type="age", time=time, id_col="country", states=states)
om = get_distance_matrix(sequence_data, method="OM", sm="TRATE", indel="auto")

centroid_indices = [0, 50, 100, 150, 190]
n_pass = 10

# Example 1: KMedoids algorithm without specifying the center point
clustering = KMedoids(diss=om,
                      k=5,
                      method='KMedoids',
                      npass=n_pass,
                      weights=weights)

# Example 2: PAM algorithm with a specified center point
clustering = KMedoids(diss=om,
                      k=5,
                      method='PAM',
                      initialclust=centroid_indices,
                      npass=n_pass,
                      weights=weights)

# Example 3: PAMonce algorithm with default parameters
clustering = KMedoids(diss=om,
                      k=5,
                      method='PAMonce',
                      npass=n_pass,
                      weights=weights)
```

## Output

