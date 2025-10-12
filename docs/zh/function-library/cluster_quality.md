# `ClusterQuality()`：用聚类质量指标选择簇数 `k`

在层次聚类（hierarchical clustering）里，我们发现很少会有唯一“正确”的树（the one true tree）。更实际的问题是：我们需要把树切在哪里？也就是我们打算保留多少个簇 `k`？

`ClusterQuality()` 提供了一套系统化的做法。它会计算一组常用的聚类质量指标（cluster quality indicators，CQI），例如：轮廓系数（silhouette scores，ASW／ASWw）、均衡性（homogeneity，HG）、点二列相关（point-biserial correlation，PBC）、伪 R²（pseudo R²）、伪 Calinski–Harabasz（pseudo CH）等，并把它们的建议放在一张图中，方便我们横向比较。

有了这些工具，你就不用只凭借直觉或看树状图（dendrogram）来定`k`，而是可以用更有依据的方式选出更合适的`k`。

## 函数用法（Function usage）

仅具有必需参数的最小示例（足以满足大多数用例）：

```python
cluster_quality = ClusterQuality(cluster)
cluster_quality.compute_cluster_quality_scores()
cluster_quality.plot_cqi_scores()
```

具有所有可用参数的完整示例（用于高级定制）：

```python
from sequenzo.clustering.hierarchical_clustering import Cluster, ClusterQuality

# 步骤 1：拟合层次聚类模型
cluster = Cluster(
  matrix=distance_matrix,
  entity_ids=ids,
  clustering_method="ward"
)

# 步骤 2：评估集群质量
cluster_quality = ClusterQuality(
  matrix_or_cluster=cluster,   # 或直接使用方阵
  max_clusters=20,             # 评估最多 k=20
  clustering_method="ward"     # 仅在直接传递矩阵时使用
)

# 步骤 3：计算、检查和可视化 CQI
cluster_quality.compute_cluster_quality_scores()
table = cluster_quality.get_cqi_table()
cluster_quality.plot_cqi_scores(
  metrics_list=["ASW", "PBC", "CH"],   # 可选：指定要绘制的指标
  norm="zscore",                       # z 分数、范围或无
  save_as="quality.png",
  style="whitegrid"
)
```

## 入口参数（Entry parameters）
| 参数                  | 必填 | 类型                        | 说明                                                           |
| ------------------- | -- | ------------------------- |--------------------------------------------------------------|
| `matrix_or_cluster` | ✓  | Cluster 或 array/DataFrame | 传入 `Cluster` 实例，或一个 `n×n` 的距离矩阵。                             |
| `max_clusters`      | ✗  | int                       | 评估的最大 `k` 值（从 `2` 一直到 `K` 值）。默认 20。                            |
| `clustering_method` | ✗  | str 或 None                | 只有在直接传矩阵时使用。为 `None` 时，从 `Cluster` 实例沿用 `clustering_method`。 |

## 它做了什么
* 本函数既可以接受 `Cluster`实例，也可以是完整的距离矩阵（square distance matrix）。

    * 如果你传的是 `Cluster`，它会直接读取完整距离矩阵（`full_matrix`）、聚类方法（`clustering_method`）和已经计算好的的链接矩阵（`linkage_matrix`）。
    * 如果你传的是矩阵或数据表（DataFrame）的时候，它会把矩阵存到实例的矩阵属性（`self.matrix`），并设置实例的聚类方法属性（`self.clustering_method`，默认 `"ward"`）
* 它会校验距离矩阵是否为方形的矩阵。
* 它会把输入整理好，方便一次性计算并对比多种聚类质量指标（cluster quality indicators，CQI）。

## 返回对象（Returned object）

返回一个 `ClusterQuality` 实例，包含：

- `matrix`：校验后的完整的方形距离矩阵（full square distance matrix，`NumPy 数组`）。
- `clustering_method`：链接方法（linkage method，Python `str`）。
- `linkage_matrix`：层次聚类的链接矩阵（hierarchical linkage；从 `Cluster` 构建时会提供）。
- `max_clusters`：要评估的最大簇数 `k`。
- `scores`：保存所有质量指标结果的字典。

对每个指标（如 `ASW`、`PBC` 等），会存一串数值：`k=2` 一个、`k=3` 一个……一直到 `max_clusters`。

常见指标的含义（）：
- `ASW`：轮廓系数（silhouette scores），看样本在各自簇里“贴合”得怎么样。
- `ASWw`：加权版轮廓系数；按簇大小（cluster size）加权，样本数（实体数）更多的簇权重更高。
- `HG`：簇规模是否均衡（homogeneity）。
- `PBC`：距离与簇标签之间的点二列相关（point-biserial correlation）。
- `CH`：簇间分离 vs. 簇内紧凑的对比（Calinski–Harabasz 的距离近似）。
- `R2`：聚类解释的总体变异比例（pseudo R²）。
- `HC`：层次结构中切分的一致性（hierarchical consistency）。

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
      如何选择簇数（k）?
    </div>
  </div>

  <div style="line-height:1.55; font-size:14.5px;">
    <ul style="margin:0 0 0 1.1em; padding:0;">
      <li>优先参考 ASW（silhouette）作为主指标。</li>
      <li>拿不准时，也看看未标准化的原始数值，理解量级。做法：① 查看标准化 CQI 图的图例，其中有每个指标的原始均值与标准差；② 在 `plot_cqi_scores()` 中把 `norm="none"`，直接绘制原始数值。 </li>
      <li>阅读 CQI 表或图来选最优簇数时，别把那些分数看得过重。</li>
      <li>把决策锚定在你的研究问题与理论上。把几个可能的 `k` 都可视化比较很重要（例如认为 `k=3、4、5` 都有可能，就分别看看它们的结果），可以用状态分布图（state distribution plot）或索引图（index plot）。</li>
    </ul>
    <div style="margin-top:10px; font-size:13.5px; color:#613a33;">
      CQI 是参谋，不是最终裁决。
    </div>
  </div>
</div>

各指标的详细说明见[《CQI 教程》](../tutorials/cluster-quality-indicators.md)。

## 函数方法 1：`compute_cluster_quality_scores()`

计算 `k = 2 … max_clusters` 的所有 CQI。

### 用法

```python
cluster_quality = ClusterQuality(cluster, max_clusters=20)
cluster_quality.compute_cluster_quality_scores()
```

### 它做了什么

* 对每个 `k`，用 `fcluster(linkage_matrix, k, "maxclust")` 取标签。
* 计算各个 CQI，并追加到 `self.scores`。

### 返回值
无。结果保存在对象内部（`self.scores`），你可以随后访问。

### 说明

* 这个方法需要 `self.linkage_matrix`。如果你在创建 `ClusterQuality` 的时候上传的是 `Cluster()` 实例，系统会自动把链接矩阵带过来，你就不用额外操心。
* 如果你是直接上传的距离矩阵，请在调用这个方法之前先准备好 `self.linkage_matrix`（比如先在别处算好 `linkage`，再赋值给它）。否则就没法提取标签。

## 函数方法 2：`get_cqi_table()`

这个方法汇总各指标的最佳 `k` 及其标准化数值。

### 用法

```python
cluster_quality.compute_cluster_quality_scores()
table = cluster_quality.get_cqi_table()
print(table)
```

### 它做了什么

* 备份原始得分。
* 计算每个指标的 z-score 与 min-max 标准化（不覆盖原始值）。
* 在 `k = 2 … max_clusters` 中，为每个指标选出得分最佳的 `k`。
* 返回一张整洁表，列含义如下：

| 列名              | 含义                                                        |
| --------------- | --------------------------------------------------------- |
| `Metric`        | 指标名（ASW、ASWw、HG、PBC、CH、R2、HC）。                            |
| `Opt. Clusters` | 使该指标原始统计量最大的 `k`。                                         |
| `Opt. Value`    |  `k` 下的原始最佳分数。                                            |
| `Z-Score Norm.` |  `k` 的 z-score（在该指标的完整 `k` 范围内计算）。通常比 `Min-Max Norm.` 更常用。 |
| `Min-Max Norm.` |  `k` 的 \[0,1] 区间标准化值。                                     |

### 返回值

`pandas.DataFrame`

## 函数方法 3：`plot_cqi_scores(...)`

把多种 CQI 放到同一张图里对比。图中所展示的曲线是用标准化后的数值（纵轴），图例也会保留每个指标的原始均值（mean）和标准差（standard deviation），这样你不会丢掉对量级（scale）的感觉。

### 用法

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

### 入口参数
| 参数             | 必填 | 类型                  | 说明                                                                                                                                                          |
| -------------- | -- | ------------------- |-------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `metrics_list` | ✗  | list\[str] 或 None   | 要绘制哪些指标。默认绘制 `scores` 中的所有指标（如 `["ASW","PBC","CH","R2","ASWw","HG","HC"]`）。                                                                                 |
| `norm`         | ✗  | str                 | 绘图前对数值的标准化方式：`"zscore"` 或 `"range"` 会把不同指标的数值拉到相近刻度，便于同图比较（`"zscore"` 指“减去均值、再除以标准差”；`"range"` 指把数值映射到 0–1 区间）。`"none"` 则直接使用原始值（raw values）。默认 `"zscore"`。 |
| `palette`      | ✗  | str                 | Seaborn 的配色方案（如 `"husl"`、`"tab10"`、`"deep"`）。默认 `"husl"`。                                                                                                   |
| `line_width`   | ✗  | int 或 float         | 控制折线图每根折线的宽度。默认 `2`。                                                                                                                                        |
| `style`        | ✗  | str                 | Seaborn 风格主题（`"whitegrid"`、`"darkgrid"`、`"white"`、`"dark"`、`"ticks"`）。默认 `"whitegrid"`。                                                                     |
| `title`        | ✗  | str 或 None          | 图标题。默认 `"Cluster Quality Metrics"`。                                                                                                                         |
| `xlabel`       | ✗  | str                 | X 轴标题。默认 `"Number of Clusters"`。                                                                                                                            |
| `ylabel`       | ✗  | str                 | Y 轴标题。默认 `"Normalized Score"`。                                                                                                                              |
| `grid`         | ✗  | bool                | 是否显示网格线。会覆盖 `style` 的默认网格设定。默认 `True`。                                                                                                                      |
| `save_as`      | ✗  | str 或 None          | 保存路径（如 `"quality.png"`）。为 `None` 时不保存，只展示。                                                                                                                  |
| `dpi`          | ✗  | int                 | 保存分辨率。默认 `200`。                                                                                                                                             |
| `figsize`      | ✗  | tuple(float, float) | 图尺寸（英寸）。默认 `(12, 8)`。                                                                                                                                       |
| `show`         | ✗  | bool                | 是否显示图像。若只保存不显示，设为 `False`。默认 `True`。                                                                                                                        |

说明

* 图例里的“原始均值或标准差”来自未标准化的分数，哪怕你的折线图展示的是 `norm`标准化结果，也可以通过图列保留对各个指标的原始尺度的直觉。
* `metrics_list=None` 的时候，会绘制 `self.scores` 里能找到的所有指标。
* `grid` 的设定优先于 `style` 的默认网格。

### 它做了什么

* 它先从未标准化的分数里分别计算出每个指标的均值和标准差，并把它们显示在图例中，这样你能保留对数值量级（scale）的直觉。
* 它可以选择是否先对 CQI 在每个簇的值进行标准化。
* 它可以生成一张图，你可以根据研究需要选择是否保存到你的电脑硬盘。

### 返回值

`Matplotlib` 的图对象。

## 例子

### 1) 用 `Cluster` 实例来选 `k`

```python
cluster = Cluster(distance_matrix, ids, "ward")

cluster_quality = ClusterQuality(cluster, max_clusters=20)

cluster_quality.compute_cluster_quality_scores()
print(cluster_quality.get_cqi_table())

cluster_quality.plot_cqi_scores(
    metrics_list=["ASW", "PBC", "CH"],    #注意在这里我们只选择了三个指标
    norm="zscore", 
    save_as="cqi.png"
)
```

### 2) 比较不同标准化

```python
cluster_quality.plot_cqi_scores(norm="zscore", title="CQIs (z-score)")
cluster_quality.plot_cqi_scores(norm="range",  title="CQIs (min–max)")
cluster_quality.plot_cqi_scores(norm="none",   title="CQIs (raw)")
```

### 3）仅有矩阵的流程（较少用）

```python
#  如果你在别处已计算出 linkage：
cluster_quality = ClusterQuality(
    distance_matrix, 
    max_clusters=12, 
    clustering_method="ward"
)

cluster_quality.linkage_matrix = precomputed_linkage  # 需要你自行提供

cluster_quality.compute_cluster_quality_scores()

cluster_quality.plot_cqi_scores(save_as="quality_avg.png")
```

## 说明与警告

* 建议用 `Cluster` 实例来创建 `ClusterQuality`，这样 `linkage_matrix` 已经就位，你就少操一步心。
* 如果直接传的是矩阵，先把 `self.linkage_matrix` 准备好（比如先算好 linkage 再赋值），再调用 `compute_cluster_quality_scores()`，否则取不了标签。
* 轮廓系数（Silhouette scores）和点二列相关（PBC）的前提是：距离越小，越相似。请确认你的距离度量符合这个习惯。
* 伪 CH 和伪 R² 都是基于距离的近似，更适合横向比较不同的 `k`，别把它们当成绝对分数（absolute benchmarks）。
* 样本量 `n` 很大时，针对多个 `k` 重复计算标签会变慢。可以把 `max_clusters` 调小，或者只评估几个你候选的 `k`。


## 
_代码：梁彧祺_

_文档：梁彧祺_

_编辑：梁彧祺，曲思竹_

_翻译：明煜坤，曲思竹_