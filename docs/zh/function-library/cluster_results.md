# `ClusterResults()`：导出、汇总与可视化

当你用 `Cluster()` 拟合好层次聚类（hierarchical clustering），并用 `ClusterQuality()` 选择了合适的簇数之后，下一步就是解读与展示结果。`ClusterResults()` 是一个小巧的辅助类，帮你快速完成：

* 导出任意簇数 k 的成员归属表。

* 汇总各簇的样本分布。

* 用清晰的柱状图可视化这些分布。

这样你就能把簇标签回填到原始数据、检查簇是否均衡，并为后续模型，比如为回归做准备。

## 使用方法

仅具有必需参数的最小示例（足以满足大多数用例）：

```python
cluster_results = ClusterResults(cluster)
```

具有所有可用参数的完整示例（用于高级定制）：

```python
# 首先拟合一个层次聚类模型
cluster = Cluster(
  matrix=distance_matrix,      # 方阵距离矩阵 (n×n)
  entity_ids=ids,              # 与矩阵行对齐的唯一 ID
  clustering_method="ward"     # 链接方法
)

# 然后包装结果
cluster_results = ClusterResults(
  cluster=cluster              # 必需：一个适合的 Cluster 对象
)

# 示例用法
memberships = cluster_results.get_cluster_memberships(num_clusters=4)
distribution = cluster_results.get_cluster_distribution(num_clusters=4)
cluster_results.plot_cluster_distribution(
  num_clusters=4,
  save_as="distribution.png",
  style="whitegrid",
  figsize=(10, 6)
)
```

## 入口参数
| 参数        | 必填 | 类型      | 说明                                                    |
| --------- | -- | ------- | ----------------------------------------------------- |
| `cluster` | ✓  | Cluster | 已拟合的 `Cluster` 对象，包含 `linkage_matrix` 与 `entity_ids`。 |

## 它会做什么

* 校验输入是否为 `Cluster` 对象。

* 保存以下信息：

    * `linkage_matrix`（层次聚合的树）

    * `entity_ids`（原始行或实体的标识）

在此基础上，类提供三组方法，把层次树映射成可解释的簇结果。

## 函数方法 1: `get_cluster_memberships(num_clusters)`

导出一张整洁的表，将每个实体映射到所属簇。

### 用法

```python
df = cluster_results.get_cluster_memberships(num_clusters=4)
print(df.head())
```

### 返回值

返回 `pandas.DataFrame`，包含两列：

| 列名          | 含义            |
| ----------- | ------------- |
| `Entity ID` | 原始实体标识        |
| `Cluster`   | 分配的簇编号（1 … k） |

这张表非常适合回并到你的原始数据集当中。



## 函数方法 2: `get_cluster_distribution(num_clusters)`

汇总各簇的实体分布。

### 用法

```python
dist = cluster_results.get_cluster_distribution(num_clusters=4)
print(dist)
```

### 返回值
返回 `pandas.DataFrame`，包含：

| 列名           | 含义                 |
| ------------ | ------------------ |
| `Cluster`    | 簇编号                |
| `Count`      | 该簇中的实体数量           |
| `Percentage` | 占全部实体的比例，四舍五入到两位小数 |



## 函数方法 3: `plot_cluster_distribution(...)`

用条形图可视化各簇的规模。

### 用法

```python
cluster_results.plot_cluster_distribution(
    num_clusters=4,
    save_as="distribution.png",
    style="whitegrid",
    figsize=(10, 6)
)
```

### 入口参数

| 参数             | 必填 | 类型                  | 说明                                                    |
| -------------- | -- | ------------------- | ----------------------------------------------------- |
| `num_clusters` | ✓  | int                 | 簇的数量 `k`。                                             |
| `save_as`      | ✗  | str 或 None          | 图片保存路径（如 `"clusters.png"`）。为 None 时仅显示不保存。            |
| `title`        | ✗  | str 或 None          | 自定义图题。默认等于 `"N = (number of entities)"`。              |
| `style`        | ✗  | str                 | Seaborn 风格主题（如 `"whitegrid"`、`"darkgrid"`、`"ticks"`）。 |
| `dpi`          | ✗  | int                 | 保存时的分辨率。默认 `200`。                                     |
| `figsize`      | ✗  | tuple(float, float) | 图像尺寸（英寸）。默认 `(10, 6)`。                                |

### 它会做什么

*  以簇编号为横轴、实体数量为纵轴，绘制条形图。
*  在条形上方添加百分比标签，方便理解。
*  使用浅色网格线与柔和配色，增强可读性。
*  如果提供 `save_as`，则将图片保存到本地路径；否则直接显示。

### 返回值
无。图像会显示或被保存。


## 示例流程

```python
# 拟合模型
cluster = Cluster(distance_matrix, ids, "ward")
cluster_results = ClusterResults(cluster)

# 导出成员表
memberships = cluster_results.get_cluster_memberships(3)

# 查看分布是否均衡
print(cluster_results.get_cluster_distribution(3))

# 可视化
cluster_results.plot_cluster_distribution(3, save_as="k3_distribution.png")
```

## 注意与提醒

* 本类中的 `num_clusters` 对应 `SciPy` 的 `fcluster()` 函数里的参数 `t`。不要和 `k-means` 里的 `k` 混淆，这里只是簇的数量。
* 请确认你的 `Cluster` 对象中包含 `linkage_matrix`。缺少它将无法提取成员关系。
* 分布图适合用来检查均衡性，比如是否存在某个簇占比过大。更深入的评估可结合 `ClusterQuality()` 一起使用。

## 
_代码：梁彧祺_

_文档：梁彧祺_

_编辑：梁彧祺，曲思竹_

_翻译：明煜坤，曲思竹_