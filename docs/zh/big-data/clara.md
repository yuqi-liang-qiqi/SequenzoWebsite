# `clara()`：大体量序列数据也能跑得快的 k-medoids 聚类

CLARA 是 Clustering LARge Applications 的缩写（Kaufman & Rousseeuw，1990 年）。它的核心想法：在大数据里，把 PAM（k-medoids）放到多个子样本上跑，再把最好的那个方案扩展到全体数据。它的基本思路是：

1. 从数据中抽取子样本；
2. 在每个子样本上运行 PAM；
3. 用得到的 medoid 将全体样本进行分类；
4. 重复多次，保留最优解。

`clara()` 在此基础上做了由具体的，个别的数据进行了一般化处理（基于采样的 PAM／k-medoids），并针对社会序列数据做了优化。它会反复抽取带权子样本，进行快速 medoid 搜索，评估多种质量指标，并为每个簇数 `k` 返回最优划分。

## 使用方法

```python
result = clara(
seqdata,                    # SequenceData 对象
R=100,                      # 子采样迭代次数（轮次）
kvals=range(2, 11),         # 备选的簇数
sample_size=None,           # 每次子样本的大小
method="crisp",             # 聚类模式（当前仅支持 "crisp"）
dist_args=None,             # 传给 get_distance_matrix() 的参数
criteria=["distance"],      # 优化目标："distance","db","xb","pbm","ams"
stability=False,            # 若为 True，计算 ARI/Jaccard 稳定性
parallel=False,             # 若为 True，内部循环并行
max_dist=None               # 预留参数（"crisp" 不使用）
)
```
## 入口参数

| 参数            | 必填 | 类型             | 说明                                                                                                                        |
| ------------- | -- | -------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `seqdata`     | ✓  | SequenceData   | 输入序列，`SequenceData` 对象。                                                                                                   |
| `R`           | ✗  | int            | 子采样的迭代次数（轮次）。`R` 表示 Round。`R` 越大，鲁棒性越好。默认 `100`。                                                                          |
| `kvals`       | ✗  | iterable\[int] | 要评估的簇数集合。默认 `range(2, 11)`。                                                                                               |
| `sample_size` | ✗  | int 或 None     | 每次子样本的大小（有放回）。为 None 时使用 `40 + 2*max(kvals)`。                                                                             |
| `method`      | ✗  | str            | 聚类模式。目前支持 `"crisp"`。                                                                                                      |
| `dist_args`   | ✓  | dict           | 传给 `get_distance_matrix()` 的参数。例如：`{"method":"OM","sm":"CONSTANT","indel":1}`。                                            |
| `criteria`    | ✗  | list\[str]     | 优化目标。可选：`"distance"`（簇内平均不相似度）、`"db"`（Davies–Bouldin）、`"xb"`（Xie–Beni）、`"pbm"`（PBM）、`"ams"`（类似轮廓系数的均值）。默认 `["distance"]`。 |
| `stability`   | ✗  | bool           | 若为 True，则以最优迭代为参照计算 ARI 与 Jaccard，用于稳定性汇总。默认 `False`。                                                                     |
| `parallel`    | ✗  | bool           | 若为 True，使用 `joblib` 并行迭代。默认 `False`。                                                                                      |
| `max_dist`    | ✗  | float 或 None   | 为其他模式预留；`"crisp"` 不使用。                                                                                                    |

## 它会做什么
1. 将重复序列聚合并赋予权重，避免重复轨迹被重复计数。

2. 重复执行 `R` 次：

   * 以权重有放回抽取大小为 `sample_size` 的子样本；
   * 通过 `get_distance_matrix(dist_args)` 计算两两不相似度矩阵；
   * 用一次快速层次聚类的过程初始化 medoid，并运行带权 k-medoids；
   * 在 `kvals` 的每个 `k` 上计算所选 `criteria`。

3. 对每个 `k`，按目标函数选出最优迭代（distance／DB／XB 取最小，PBM／AMS 取最大）。

4. 如果 `stability=True`，则将所有迭代与该 k 的最优解比较，计算 ARI 与 Jaccard（基于聚合列联表）。

5. 将最优的聚合划分还原到原始个体并返回结果。

它不会原地改你的数据。运行时会打印简明进度，让你心里有数。

## 主要特性

* 通过子采样扩展到大数据集（CLARA 思路），同时正确处理重复序列的权重。
* 直接对接 Sequenzo 的序列不相似度（例如 Optimal Matching）。
* 支持多种质量指标，便于对比与选择。
* 可选的稳定性诊断（ARI、Jaccard）。
* 可用 Python 包 joblib 并行计算，充分利用多核加速。

## 返回值

函数返回一个字典，其结构取决于你选择优化的指标个数。

当 `criteria` 只有一个指标时：

* `kvals`：本次评估过的 k 值。
* `clustering`：形状为 `(n_entities, len(kvals))` 的数据表（DataFrame）。每一列是对应 k 的 1 起始簇标签。
* `stats`：按 k 汇总的一张表，含下列列：

  * `Number of Clusters`：如 “Cluster 2” 这样的标签。
  * `Avg dist`：该 k 的最优迭代中，簇内平均不相似度。
  * `PBM`、`DB`、`XB`、`AMS`：该 k 的最优迭代的各指标值。
  * `ARI>0.8`、`JC>0.8`：与最优解一致度 ≥ 0.8 的迭代次数（仅当 `stability=True`；否则为 `NaN`）。
  * `Best iter`：获胜迭代的索引（从 0 开始）。

* `clara`：以 k 的索引为键的字典（0 对应 `k=2`，1 对应 `k=3`，…）。每个条目包含：

  * `medoids`：选出的 medoid 在原始数据中的索引；
  * `clustering`：所有原始个体的 1 起始簇标签；
  * `iter_objective`：各迭代的目标函数取值；
  * `evol_diss`：迭代过程中当前最优目标的轨迹（按最小或最大）；
  * `objective`：最终获胜的目标函数值；
  * `avg_dist`、`pbm`、`db`、`xb`、`ams`：获胜迭代的各指标值；
  * `arimatrix`：如果 `stability=True`，为每次迭代的 ARI 与 Jaccard 两列的数据表（DataFrame）；否则为 `NaN`；
  * `R`、`k`、`criteria`、`method`：记录信息。

当 `criteria` 含多个指标时：

* 顶层字典会为每个指标各给出一个子结果（结构同上）。
* `allstats`：跨指标拼接的汇总表。
* `param`：记录你的入口参数的设置。

## 实用提示

* `dist_args` 为必填。一个稳妥的起点是 `{"method":"OM","sm":"CONSTANT","indel":1}`。
* 不确定 `sample_size` 的时候，可先用默认值；如果想要更稳定，可以增大它（以及或者增大 `R`）。
* `R` 越大结果越可靠，但耗时也更长。建议在多核机器上设置 `parallel=True`。
* `kvals` 应覆盖你真实想比较的范围（例如 `range(2, 8)`）。

## 示例

```python
from sequenzo.define_sequence_data import SequenceData
from sequenzo.dissimilarity_measures.get_distance_matrix import get_distance_matrix
from sequenzo.big_data.clara.clara import clara   # 路径依你的包结构而定
import pandas as pd

# 1) 准备 SequenceData
df = pd.read_csv("data.csv")

# 清理时间列：本数据集中相关列都以 "C" 开头，例如 C1, C2, ..., C10
time = [c for c in df.columns if c.startswith("C")]
states = ['data', 'data science', 'hardware', 'research',
          'software', 'systems & infrastructure', 'support & test']

sequence_data = SequenceData(
    df[['worker_id'] + time],
    time=time,
    id_col="worker_id",
    states=states
)

# 2) 用 OM 距离运行 CLARA
result = clara(
    sequence_data,
    R=50,
    kvals=range(2, 7),
    sample_size=3000,
    criteria=["distance"],
    # 常用的序列不相似度设置
    dist_args={"method":"OM", "sm":"CONSTANT", "indel":1},
    # 开启并行：使用多核而非单核
    parallel=True,
    stability=True
)

# 3) 查看输出
print(result["stats"])               # 按 k 的汇总表
print(result["clustering"].head())   # 各个 k 的簇成员标签
```

## 如何理解这些指标

* `distance`（越小越好）：到所属 medoid 的平均不相似度，衡量紧致度。
* `DB`（越小越好）：Davies–Bouldin 指数，综合簇内离散与簇间分离。
* `XB`（越小越好）：Xie–Beni 指数，相对最小 medoid 间距惩罚重叠。
* `PBM`（越大越好）：PBM 指数，强调全局分离与簇内紧致的权衡。
* `AMS`（越大越好）：类似轮廓系数的比值的均值，基于两个最近的 medoid。

## 稳定性汇总
当 `stability=True` 时，函数会把每次迭代的划分与该 k 的最优划分进行比较：

* ARI（Adjusted Rand Index）：1 表示完全一致，0 表示随机一致；
* Jaccard 系数：对“是否同簇”这一关系的成对一致度。
  `ARI>0.8` 与 `JC>0.8` 能直观告诉你“同一结构”在多轮里出现得有多频繁。

### 内部使用的辅助函数（供参考）

* `adjustedRandIndex(tab_or_xy)`：返回两个划分之间或由列联表计算的 ARI。
* `jaccardCoef(tab)`：基于列联表计算的 Jaccard 一致度。

这些仅在 `stability=True` 时使用。

## 参考文献

Kaufman, L., & Rousseeuw, P. J. (2009). Finding groups in data: an introduction to cluster analysis. John Wiley & Sons.

Studer, M., Sadeghi, R., & Tochon, L. (2024). Sequence Analysis for large databases (Vol. 104, pp. 1-42). LIVES Working papers.

## 
_代码：李欣怡_

_文档：梁彧祺_

_编辑：梁彧祺_

_翻译：明煜坤_