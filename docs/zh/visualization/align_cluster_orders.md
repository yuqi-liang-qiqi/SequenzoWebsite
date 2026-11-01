# `align_cluster_orders()`

当你把多种聚类方法并排比较时（例如 LCP、LCPmst、LCPspell），每种方法自己的 cluster 编号是**各自独立**的。LCP 的 cluster `1` 并不等于 LCPmst 的 cluster `1`。如果按原始 PAM 编号直接画图，相似的 medoid 会在各行之间左右乱跳，图很难读。

`align_cluster_orders()` 只解决**展示顺序**问题：

1. 你为每种方法准备「每个 cluster 一条 medoid 状态序列」。
2. 函数用 Hamming 距离 + 匈牙利算法，把相似的 medoid 对齐到同一列。
3. 返回每种方法的一个**置换**：第 1、2、3… 列应分别放原来的哪个 cluster。

再用 `apply_cluster_order()` 重排表格 / 子图，使各行的 `C1`…`Ck` 尽量对应同一类路径。

::: tip 重要
它**不会**重新算距离，也**不会**重跑 PAM。每个人属于哪个 cluster、`n` 和权重都不变。变的只是图上**从左到右的面板顺序**，方便对比。
:::

## 什么时候需要用

适合这些情况：

- 你有**两种及以上**方法（或划分），且 cluster 数 `k` 相同。
- 每种方法每个 cluster 都有一条代表序列（通常是 PAM medoid）。
- 你希望图上**相似路径尽量落在同一列**。

如果只画一种方法，不需要这个函数。

## 一步一步怎么做

### 第 1 步 — 为每种方法准备一个 `(k, T)` 矩阵

每一行是一个 cluster 的 medoid：长度为 `T` 的状态码向量（与 `SequenceData` 中的编码一致）。

```python
import numpy as np

# 示例：k=4 个 cluster，T=10 个时间点（玩具数据）
medoids_lcp = np.array([
    [1, 1, 1, 3, 3, 5, 5, 5, 5, 5],  # cluster 1 的 medoid
    [1, 1, 3, 3, 3, 3, 7, 7, 7, 7],  # cluster 2
    [1, 5, 5, 5, 5, 5, 5, 5, 5, 5],  # cluster 3
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],  # cluster 4
])

medoids_lcmpst = np.array([
    [1, 1, 3, 3, 3, 3, 7, 7, 7, 7],  # 更像上面的 LCP cluster 2
    [1, 1, 1, 3, 3, 5, 5, 5, 5, 5],  # 更像上面的 LCP cluster 1
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 5, 5, 5, 5, 5, 5, 5, 5, 5],
])

# 列表顺序 = 你多方法图中各行的顺序
mats = [medoids_lcp, medoids_lcmpst]
```

实际项目里，矩阵通常来自 PAM 结果：对每个 cluster，取出 medoid 个体在 `seqdata.values` 中的那一行。

### 第 2 步 — 调用 `align_cluster_orders`

```python
from sequenzo.visualization import align_cluster_orders, apply_cluster_order

orders = align_cluster_orders(
    mats,
    reference=0,            # 以哪一种方法为锚（从 0 开始编号）
    mode="to_reference",    # 其他方法都对齐到这个锚
    sort_reference=True,    # 先把锚方法内部相似的 medoid 排到相邻列
)
```

返回值怎么读：

- `orders` 是一个列表，每种方法一个数组。
- `orders[i][j]` 表示：**展示时第 `j` 列应放方法 `i` 原来的 cluster `orders[i][j]`**。

```python
print(orders[0])  # 例如 [3, 0, 1, 2] → 展示 C1 = 原 cluster 3，C2 = 原 0，…
print(orders[1])  # 第二种方法的置换
```

### 第 3 步 — 重排 medoid 汇总表（常用）

如果你有一张 pandas 表，每行一个 cluster（含 `Cluster`、medoid id、`n`、权重等）：

```python
aligned_tables = [
    apply_cluster_order(tab, order, renumber=True)
    for tab, order in zip(tables, orders)
]
```

- `renumber=True` 会把 `Cluster` 列改成展示顺序下的 `1…k`，标题就可以写成从左到右的 `C1`、`C2`…
- 若完整 index plot 也要同一列顺序，对 membership 用同一套 `orders` 重映射即可。

### 第 4 步 — 按新列顺序画图

从左到右画 `C1 → C2 → … → Ck`，使用对齐后的表。个体归属没有变，变的只是列位置。

## 函数说明

### `align_cluster_orders`

| 参数 | 是否必传 | 类型 | 说明 |
| ---- | -------- | ---- | ---- |
| `partitions` | ✓ | 数组列表 | 每种方法一个元素。每个元素形状为 `(k, T)`，或 `k` 条长度为 `T` 的向量。 |
| `reference` | ✗ | int 或 `"first"` | `mode="to_reference"` 时的锚方法下标。默认 `0`。 |
| `mode` | ✗ | str | `"to_reference"`（默认）：都对齐到锚。`"progressive"`：第 `i` 种对齐到已经排好的第 `i-1` 种。 |
| `sort_reference` | ✗ | bool | 默认 `True`：先重排锚方法，让相似 medoid 相邻，再匹配其他方法。 |
| `normalize` | ✗ | bool | 默认 `True`：Hamming 代价除以 `T`，落在 `[0, 1]`。 |

**返回：** 长度为方法数的列表；每个元素是长度为 `k` 的整数置换。

### `apply_cluster_order`

| 参数 | 是否必传 | 类型 | 说明 |
| ---- | -------- | ---- | ---- |
| `medoids` | ✓ | DataFrame | 每个 cluster 一行。 |
| `order` | ✓ | 整数序列 | 来自 `align_cluster_orders` 的置换。 |
| `cluster_col` | ✗ | str | 应用置换前用来排序的列名。默认 `"Cluster"`。 |
| `renumber` | ✗ | bool | 默认 `True`：把 `cluster_col` 改成展示顺序的 `1…k`。 |

**返回：** 按展示顺序排好的新 DataFrame。

## 如何选 `reference` 和 `mode`

**`mode="to_reference"`（论文图常用）**  
选一个概念上清楚的方法当锚（例如 LCPmst / RLCPmst）。其他行都对齐到同一套列布局，整张图共用一种「列语言」。

```python
orders = align_cluster_orders(mats, reference=1, mode="to_reference")
```

**`mode="progressive"`**  
适合「相邻方法最可比」的情况（方法 2 ≈ 方法 1，方法 3 ≈ 方法 2…）。匹配沿着列表依次传递，而不是每次都跳回同一个锚。

```python
orders = align_cluster_orders(mats, mode="progressive", sort_reference=True)
```

## 完整最小例子

```python
import numpy as np
import pandas as pd
from sequenzo.visualization import align_cluster_orders, apply_cluster_order

# --- 1. 每种方法一个 medoid 状态矩阵（一行 = 一个 cluster）---
mats = [medoids_method_a, medoids_method_b, medoids_method_c]  # 每个都是 (k, T)

# --- 2. 以方法 B（下标 1）为锚对齐列 ---
orders = align_cluster_orders(
    mats,
    reference=1,
    mode="to_reference",
    sort_reference=True,
)

# --- 3. 重排汇总表，准备画图 ---
tables = [table_a, table_b, table_c]  # 都有 "Cluster" 列
aligned = [
    apply_cluster_order(tab, order, renumber=True)
    for tab, order in zip(tables, orders)
]

# --- 4. 按 aligned 从左到右画 C1..Ck ---
# （你的画图代码：第 i 种方法的第 j 个面板用 aligned[i].iloc[j]）
```

## 匹配在做什么（简短版）

1. 对两种方法，算 `k × k` 代价矩阵：每对 medoid 的 Hamming 不一致比例（默认）。
2. 用匈牙利算法做一对一匹配，使总代价最小。
3. 得到的匹配就是非锚方法的置换。

因此对齐依据的是 **medoid 路径像不像**，而不是强迫同一批人拥有同一个 cluster 编号。

## 常见错误

1. **以为对齐后的 `C1` 在所有方法里是“同一个真实 cluster”**  
   `renumber=True` 之后，`C1` 是**展示标签**。图注里写清楚即可（例如 “columns are display-aligned to …”）。

2. **不同方法的 `k` 不一致**  
   并排对齐假定你要对齐的列数相同。请对相同的 `k` 使用本函数。

3. **medoid 图对齐了，index plot 还用原始 PAM 编号**  
   两张图会错位。对 membership 使用同一套 `orders` 重映射。

4. **建 `(k, T)` 矩阵时 cluster 行顺序乱了**  
   应用置换之前，每一行应与表中原始 `Cluster` 1…k 顺序一致（通常先按 `Cluster` 排序）。

## 相关文档

- [`plot_sequence_index()`](./index-plot.md) — 簇内完整索引图；多行图可用 `x_tick_labels="bottom"`。
- [`plot_single_medoid()`](./plot_single_medoid.md) — 全体样本的一条 medoid。
- 颜色自定义：[如何自定义颜色](./how-to-customize-colors.md)。
