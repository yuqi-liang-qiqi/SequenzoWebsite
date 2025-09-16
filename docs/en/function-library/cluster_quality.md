<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-11 17:40:10
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-15 21:38:46
 * @FilePath: /SequenzoWebsite/docs/en/function-library/cluster_quality.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `ClusterQuality()`: Choose the number of clusters `k` based on cluster quality indicators

Hierarchical clustering is rarely about producing “the one true tree.”
The key practical question is: where should we cut the tree, i.e., how many clusters `k` should we retain?

`ClusterQuality()` provides a systematic way to answer this.
It computes a panel of widely used cluster quality indicators (CQIs), such as silhouette scores (ASW and ASWw), homogeneity (HG), point-biserial correlation (PBC), pseudo R², pseudo Calinski–Harabasz (CH) and others, and helps you compare their suggestions side by side.

With these tools, you can move beyond intuition or visual inspection of dendrograms and make a more evidence-based choice of `k`.

## Function usage

```python
from sequenzo.clustering.hierarchical_clustering import Cluster, ClusterQuality

cluster = Cluster(matrix=distance_matrix, 
                  entity_ids=ids, 
                  clustering_method="ward")

# Pass a fitted Cluster instance
cluster_quality = ClusterQuality(cluster, max_clusters=20)

# Computing the scores that each CQI provides across clusters 
# (e.g., up to 20 as we have set max_cluster=20 in the previous line of code)
cluster_quality.compute_cluster_quality_scores()

# Organize the scores into a table (Pandas DataFrame)
table = cluster_quality.get_cqi_table()

# Visualize the scores
fig = cluster_quality.plot_cqi_scores(save_as="quality.png")
```

## Entry parameters

| Parameter           | Required | Type                       | Description                                                                                                        |
| ------------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `matrix_or_cluster` | ✓        | Cluster or array/DataFrame | Either a `Cluster` instance (highly recommended) or an `n×n` square-form distance matrix.                                 |
| `max_clusters`      | ✗        | int                        | Largest `k` to evaluate (loops from `2` to `k`). Default 20.                                                                |
| `clustering_method` | ✗        | str or None                | Only used when you pass a matrix directly. If None, inherit `clustering_method` from the `Cluster` instance. |

## What it does

* Accepts either a `Cluster` object or a full square distance matrix.

  * If you pass a `Cluster` (which is highly recommended), it pulls `full_matrix`, `clustering_method`, and the precomputed `linkage_matrix` directly.
  * If you pass a matrix/DataFrame, it stores it as `self.matrix` and sets `self.clustering_method` (default `"ward"`).
* Validates that the distance matrix is square.
* Prepares the input so that multiple cluster quality indicators (CQIs) can be computed and compared directly.

## Returned object

A `ClusterQuality` instance with:

* `matrix`: the validated full square distance matrix (`NumPy array`).
* `clustering_method`: a Python `str` (string) indicating the linkage method.
* `linkage_matrix`: the hierarchical linkage (present when constructed from `Cluster`).
* `max_clusters`: maximum `k` to evaluate.
* `scores`: a dictionary that saves the results of all quality metrics.  

For each metric (ASW, PBC, etc.), it keeps a list of values, e.g., one value for `k=2`, one for `k=3`, and so on, up to `max_clusters`.  

  * `ASW`: how well points fit within their assigned clusters (silhouette score)  
  * `ASWw`: like ASW, but gives more weight to larger clusters  
  * `HG`: whether clusters are balanced in size 
  * `PBC`: correlation between distances and cluster labels  
  * `CH`: compares separation between clusters vs. compactness within clusters  
  * `R2`: proportion of overall variation explained by the clustering  
  * `HC`: consistency of cluster splits in the hierarchy  

<div style="
  border-left: 6px solid #d4715d;
  background: #d4715d10;
  padding: 14px 16px;
  margin: 18px 0;
  border-radius: 10px;
  font-family: system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,Helvetica,Arial,'Apple Color Emoji','Segoe UI Emoji',sans-serif;
  color: #2a2a2a;">

  <div style="display:flex; align-items:center; gap:10px; margin-bottom:8px;">
    <div style="
      width:26px; height:26px; flex:0 0 auto;
      display:flex; align-items:center; justify-content:center;
      border-radius:50%;
      background:#d4715d;
      color:white; font-weight:700;">
      k
    </div>
    <div style="font-weight:700; font-size:16px; color:#613a33;">
      How to choose the number of clusters (k)?
    </div>
  </div>

  <div style="line-height:1.55; font-size:14.5px;">
    <ul style="margin:0 0 0 1.1em; padding:0;">
      <li>Prioritize ASW (silhouette) as the main indicator.</li>
      <li>If uncertain, also inspect the raw numbers (not standardized) to understand scale. You can do so by (1) checking the legend in a normalized CQI plot as it contains raw mean and standard deviation for each CQI, or (2) setting norm="none" in plot_cqi_scores() to have a purely raw-number-based plot in details. </li>
      <li>When you read CQI tables or plots to choose the optimal number of clusters, don’t put too much weight on those numbers.</li>
      <li>Anchor decisions in your <strong>research questions and theories</strong>. It is very important to visualize several plausible clusters (e.g., compare how clusters look when k = 3, 4, 5 if you think that these three options are plausible) using the state distribution plot or index plot.</li>
    </ul>
    <div style="margin-top:10px; font-size:13.5px; color:#613a33;">
      CQIs are guides — not the final verdict.
    </div>
  </div>
</div>

Details of each metric are explained in [the separate CQI tutorial](../tutorials/cluster-quality-indicators.md).

## Function method 1: `compute_cluster_quality_scores()`

Compute all CQIs for `k = 2 … max_clusters`.

### Function usage

```python
cluster_quality = ClusterQuality(cluster, max_clusters=20)
cluster_quality.compute_cluster_quality_scores()
```

### What it does

* For each `k`, obtains labels via `fcluster(linkage_matrix, k, "maxclust")`.
* Computes and appends each CQI into `self.scores`.

### Returns

None. Instead, the results are stored in the object itself (under `self.scores`), so you can access them later.

### Notes

* Requires `self.linkage_matrix`. This is automatically set when you pass a `Cluster` to the constructor. This means that you don't need to worry about passing this into `ClusterQuality()` by youself as long as you have a `Cluster()` instance as one of the parameters. 
* If you pass a distance matrix directly, you must ensure `self.linkage_matrix` exists before calling this method (e.g., by building it elsewhere and assigning it). Otherwise, label extraction cannot proceed.

## Function method 2: `get_cqi_table()`

Summarize each metric’s optimal `k` and its normalized values.

### Function usage

```python
cluster_quality.compute_cluster_quality_scores()
table = cluster_quality.get_cqi_table()
print(table)
```

### What it does

* Keeps a temporary copy of raw scores.
* Computes per-metric z-score and min-max normalizations (without overwriting raw values).
* For each metric, looks across `k = 2, 3, …, max_clusters` and picks the `k` that gives the optimal score.
* Returns a tidy table:

| Column          | Meaning                                                            |
| --------------- | ------------------------------------------------------------------ |
| `Metric`        | Metric name (ASW, ASWw, HG, PBC, CH, R2, HC).                      |
| `Opt. Clusters` | `k` that maximizes the raw statistic for that metric.                |
| `Opt. Value`    | The raw optimal value at that cluster `k`.                                   |
| `Z-Score Norm.` | The z-score at that `k` (computed across the metric’s full `k` range). It is more frequently used than `Min-Max Norm`. |
| `Min-Max Norm.` | The \[0,1] range-normalized value at that `k`.                       |

### Returns

`pandas.DataFrame`

## Function method 3: `plot_cqi_scores(...)`

Plot multiple CQIs across k on the same chart, with **normalized y-values** but **legend showing raw mean/std for context**.

### Function usage

```python
fig = cluster_quality.plot_cqi_scores(
    metrics_list=None,   # or ["ASW", "PBC", "CH"]
    norm="zscore",       # "zscore" | "range" | "none"
    palette="husl",
    line_width=2,
    style="whitegrid",
    title=None,
    xlabel="Number of Clusters",
    ylabel="Normalized Score",
    grid=True,
    save_as=None,        # e.g., "quality.png"
    dpi=200,
    figsize=(12, 8),
    show=True
)
```

### Entry parameters

| Parameter      | Required | Type               | Description                                                                                                                       |
| -------------- | -------- | ------------------ |-----------------------------------------------------------------------------------------------------------------------------------|
| `metrics_list` | ✗        | list\[str] or None | Which metrics to plot. Default = all metrics present in `scores` (e.g., `["ASW","PBC","CH","R2","ASWw","HG","HC"]`).              |
| `norm`         | ✗        | str                | Normalization applied to plotted values: `"zscore"` or `"range"` rescales lines; `"none"` plots raw values. Default = `"zscore"`. |
| `palette`      | ✗        | str                | Seaborn palette name used to color lines (e.g., `"husl"`, `"tab10"`, `"deep"`). Default = `"husl"`.                               |
| `line_width`   | ✗        | int or float       | Sets the stroke width of each metric line in the plot. Default = `2`.                                                             |
| `style`        | ✗        | str                | Seaborn style theme (`"whitegrid"`, `"darkgrid"`, `"white"`, `"dark"`, `"ticks"`). Default = `"whitegrid"`.                       |
| `title`        | ✗        | str or None        | Figure title. Default = `"Cluster Quality Metrics"`.                                                                              |
| `xlabel`       | ✗        | str                | X-axis label. Default = `"Number of Clusters"`.                                                                                   |
| `ylabel`       | ✗        | str                | Y-axis label. Default = `"Normalized Score"`.                                                                                     |
| `grid`         | ✗        | bool               | Show grid lines on the axes. Overrides the style’s default grid behavior. Default = `True`.                                       |
| `save_as`      | ✗        | str or None        | File path to save the figure (e.g., `"quality.png"`). If `None`, the plot is not saved.                                           |
| `dpi`          | ✗        | int                | Resolution used when saving to file. Default = `200`.                                                                             |
| `figsize`      | ✗        | tuple(float,float) | Figure size in inches. Default = `(12, 8)`.                                                                                       |
| `show`         | ✗        | bool               | Whether to display the figure. If saving only, set `show=False`. Default = `True`.                                                |

Notes

* The legend shows raw mean/std for each metric (computed before normalization), so readers keep scale intuition even when `norm` is applied.
* If `metrics_list` is `None`, the method plots every metric found in `self.scores`.
* `grid` takes precedence over the grid behavior implied by `style`.

### What it does

* Computes raw per-metric mean/std from unnormalized scores and uses them in the legend (so readers retain scale intuition).
* Optionally standardizes each CQI’s values across different k before plotting to make visual comparison easier.
* Produces a single figure and optionally writes it to disk.

### Returns

The `Matplotlib` figure object.

## Examples

### 1) Pick `k` with a `Cluster` object

```python
cluster = Cluster(distance_matrix, ids, "ward")

cluster_quality = ClusterQuality(cluster, max_clusters=20)

cluster_quality.compute_cluster_quality_scores()
print(cluster_quality.get_cqi_table())

cluster_quality.plot_cqi_scores(
    metrics_list=["ASW", "PBC", "CH"],    #we only selected three metrics here.
    norm="zscore", 
    save_as="cqi.png"
)
```

### 2) Compare several normalizations

```python
cluster_quality.plot_cqi_scores(norm="zscore", title="CQIs (z-score)")
cluster_quality.plot_cqi_scores(norm="range",  title="CQIs (min–max)")
cluster_quality.plot_cqi_scores(norm="none",   title="CQIs (raw)")
```

### 3) Matrix-only workflow (rarely used)

```python
# If you already computed a linkage elsewhere:
cluster_quality = ClusterQuality(
    distance_matrix, 
    max_clusters=12, 
    clustering_method="ward"
)

cluster_quality.linkage_matrix = precomputed_linkage  # You must provide this

cluster_quality.compute_cluster_quality_scores()

cluster_quality.plot_cqi_scores(save_as="quality_avg.png")
```

## Notes and warnings

* Always prefer constructing `ClusterQuality` from a `Cluster` instance. It guarantees `linkage_matrix` is present.
* If you pass a matrix directly, `compute_cluster_quality_scores()` requires `self.linkage_matrix`. Provide it before calling.
* Silhouette/PBC assume smaller distances = greater similarity. Ensure your distance measure follows this convention.
* Pseudo CH and pseudo R² are distance-based approximations; use them comparatively across `k` rather than as absolute benchmarks.
* For very large n in data, computing labels for many `k` can be time-consuming. Consider narrowing `max_clusters` or evaluating a subset of `k` if needed.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang