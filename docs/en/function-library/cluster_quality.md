<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-11 17:40:10
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-11 17:44:38
 * @FilePath: /SequenzoWebsite/docs/en/function-library/cluster_quality.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `ClusterQuality` — help pick the number of clusters (k)

You can pass either:

* a `Cluster` object (recommended), or
* a square distance matrix plus a method.

## Constructor

```python
ClusterQuality(matrix_or_cluster, max_clusters=20, clustering_method=None)
```

| Parameter           | Required | Type                           | Meaning                                                          |
| ------------------- | -------: | ------------------------------ | ---------------------------------------------------------------- |
| matrix\_or\_cluster |        ✓ | `Cluster` or ndarray/DataFrame | If `Cluster`, it reuses the linkage; if matrix, it computes one. |
| max\_clusters       |        ✗ | int                            | Evaluate k = 2..max\_clusters.                                   |
| clustering\_method  |        ✗ | str                            | Needed only if you passed a matrix (defaults to "ward").         |

## What it computes (for k = 2..max\_clusters)

Below are plain-text, copy-pasteable formulas (no LaTeX). Use the “ASCII” versions if your site doesn’t render symbols like Σ.

### ASW — average Silhouette (larger is better)

Definition: for each item i,
* `a(i) = average distance to points in the same cluster`
* `b(i) = smallest average distance to points in any other cluster`
* `s(i) = ( b(i) - a(i) ) / max{ a(i), b(i) }`
* Overall: `ASW = (1/N) * sum_{i=1..N} s(i)`

### ASWw — weighted Silhouette (weights = cluster sizes)

Let `C_k` be cluster k, `n_k = |C_k|`, and `N = sum_k n_k`.

`ASWw = sum_{k=1..K} (n_k / N) * ( (1/n_k) * sum_{i in C_k} s(i) )`

### HG — homogeneity (watch the trend, not the absolute value)

ASCII: `HG = sum_{k=1..K} (n_k / N)^2`

Unicode: `HG = Σ (n_k / N)^2`

### PBC — point–biserial correlation (distance-based; larger is better)

Intuition: correlates pairwise distances with an indicator of “same cluster vs different cluster.”

One common form for two groups is:
`r_pb = ((mean_d_1 - mean_d_0) / s_d) * sqrt( (n1 * n0) / (n1 + n0) )`

Here it’s generalized to multiple clusters using a distance-based variant.

### CH — (distance-based) Calinski–Harabasz approximation (relative use)

`CH(K) = ( B_K / (K - 1) ) / ( W_K / (N - K) )`

where `W_K` = within-cluster dispersion (from distances),

`B_K` = between-cluster dispersion (from distances).

### R2 — distance-based “explained variance” approximation (larger is better)

`R2 = 1 - ( W_K / T )`
where `T` = total dispersion based on all pairwise distances.

#### HC — simple hierarchical criterion

`HC = Var( μ_1, μ_2, ..., μ_K )`
where `μ_k` = average within-cluster pairwise distance of cluster k.

Beginner tip: no single metric is perfect. Look for peaks or plateaus that several metrics agree on, then pick the smallest K that still gives a clear structure and makes sense for your study.

### Main methods

```python
cluster_quality.compute_cluster_quality_scores()
```

Computes all metrics for each k.

```python
table = cluster_quality.get_metrics_table()
```

One line per metric: the best k (by max value), the raw best value, and the normalized values (z-score and min-max).

```python
fig = cluster_quality.plot_combined_scores(metrics_list=None, norm="zscore", save_as=None, ...)
```

Plots multiple metrics vs k on the same chart (normalized for easy visual comparison).
The legend shows each metric’s raw mean and standard deviation so you keep a sense of scale.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang