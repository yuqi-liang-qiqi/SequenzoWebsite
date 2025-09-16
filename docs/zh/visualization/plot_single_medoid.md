# `plot_single_medoid()`

`plot_single_medoid()` 函数识别**单个中心点序列**（即与所有其他序列总距离最小的最中心序列），并将其绘制为随时间变化的彩色条带。标题还报告了中心点的**覆盖率**：位于该中心点较小距离阈值内的序列所占的份额。

## 函数用法

```python
# 假设你已经计算了一个名为“distance_matrix”的 NxN 距离矩阵
plot_single_medoid(
    seqdata,
    show_legend=True,     # 在右侧显示状态图例
    title=None,           # 自定义标题；如果没有，则显示 ID 和覆盖范围
    save_as=None          # e.g., "medoid.png"
)
```

## 入口参数

| 参数          | 需要&nbsp;    | 类型         | 描述                                                                |
|---------------|-------------| ------------ |-------------------------------------------------------------------|
| `seqdata`     | ✓           | SequenceData | 使用 `SequenceData` 创建的序列数据集。提供时间标签、状态标签和颜色。                        |
| `show_legend` | ✗           | bool         | 如果为 `True`，则显示状态图例。默认值 = `True`。                                  |
| `title`       | ✗           | str          | 图形标题。如果为`None`, 则显示自动标题: `Medoid Sequence (ID: …, Coverage: …%)`. |
| `save_as`     | ✗           | str          | 保存图形的文件路径（例如，‘medoid.png’）。如果省略，则仅显示图形。                           |

重要的外部输入（调用前必须存在）：

* `distance_matrix` (np.ndarray): 一个 `N×N` 对称成对距离矩阵，其行顺序与 `seqdata.values` 一致。
  当前实现从周围作用域读取此变量。

## 它的作用

* 找到与所有其他序列（中心点）具有**最小总距离**的序列。
* 计算中心点的**覆盖率** = 到中心点的距离 ≤ `0.10 × max(distance_matrix)` 的序列比例。
* 将中心点绘制为一个水平条，每个时间点一个彩色块（颜色来自 `SequenceData`）。
* 可选择显示图例并保存图形。

## 主要特点

* 数据集中**最具代表性**序列的一次性视图。
* **覆盖率**可让您立即了解有多少序列接近该中心点。
* 整个项目中的颜色和图例与 `SequenceData` 保持一致。
* 可通过 `save_as` 导出（函数内部默认 DPI 为 200）。

## 例子

### 1. 基本用法

```python
# 首先计算或加载你的 NxN 距离矩阵
distance_matrix = my_distance_function(seqdata.values)

plot_single_medoid(seqdata)
```

### 2. 保存为具有自定义标题且无图例的文件

```python
distance_matrix = my_distance_function(seqdata.values)

plot_single_medoid(
    seqdata,
    show_legend=False,
    title="Most Representative Sequence",
    save_as="single_medoid.png"
)
```

## 小记

* 覆盖阈值默认为 `0.10 × max(distance_matrix)`（参见 `_compute_individual_medoid_coverage`）。
* 如果您需要不同的阈值，请修改辅助函数或在包装器中公开参数。
* 确保 `distance_matrix` 的行/列与 `seqdata.values` 的顺序相同。

## 作者

代码: Yuqi Liang

文档: Yuqi Liang

编辑: Yuqi Liang

翻译、测试：Sizhu Qu
