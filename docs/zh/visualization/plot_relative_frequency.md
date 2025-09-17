<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:02:27
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:14:51
 * @FilePath: /SequenzoWebsite/docs/en/visualization/plot_relative_frequency.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_relative_frequency()`

`plot_relative_frequency()`  通过一个双面板图形，按频率组总结序列的“典型性”：

* 左侧：每个频率组的**中心序列**（medoid，即最居中的序列），以序列索引条的形式展示。
* 右侧：该组内各序列与组中心序列（medoid）的相异度（距离）的**箱线图**（box plot）。
  该函数还会打印一行摘要，包含**伪R²**、**F统计量**和**p值**，用以量化组间区分度的好坏。

## 函数用法

```python
plot_relative_frequency(
    seqdata,
    distance_matrix,     # N×N 的序列间成对距离矩阵
    num_groups=12,       # 频率组的数量
    save_as=None,        # 例如："seqrf.png"
    dpi=200
)
```

## 输入参数

| 参数         | 是否必须 | 类型                     | 描述                                                                            |
| -------- |------|------------------------|-------------------------------------------------------------------------------|
| `seqdata` | ✓    | SequenceData           | 使用 `SequenceData` 创建的序列数据集。提供时间轴、状态标签和颜色。                                     |
| `distance_matrix` | ✓    | np.ndarray / DataFrame | 一个 `N×N` 的对称成对序列距离矩阵（顺序必须与 `seqdata.values` 匹配）。接受 pandas DataFrame，并会在内部进行转换 |
| `num_groups` | ✗    | int                    | 沿一维MDS轴形成等大小的频率组数量。默认为 `12`。                                                  |
| `save_as` | ✗    | str                    | 保存图像的文件路径（例如 `"seqrf.png"`）。如果省略，则仅显示图像。                                      |
| `dpi`    | ✗    | int                    | 保存时的输出分辨率。默认为 `200`。如果机器性能允许，建议在出版物中使用 `300+`。                                |

## 函数功能

* 通过对距离矩阵进行**一维经典多维尺度分析**（cmdscale）投影来对序列进行排序，然后将它们分成 `num_groups` 个大小相等的**频率组**（frequency groups）。
* 对于每个组，找到其**中心序列**（medoid）（即组内加权距离总和最小的序列），并以彩色条带形式显示在左侧面板。
* 对于每个组，计算其内部各序列**与中心序列的相异度**（dissimilarities to the medoid），并以**水平箱线图**（horizontal box plot）的形式显示在右侧面板。
* 在图例下方报告**代表性质量**（representation quality）：基于伪/中心序列（medoid-based）的**R²**、**F统计量**和带显著性星号（`*`, `**`, `***`）的**p值**。
* 使用 `seqdata` 中定义的状态颜色方案，以确保颜色与其他图表保持一致。
* 根据组的数量自动调整图形高度，以保持标签的可读性。

## 主要特点

* 一目了然：“典型”（中心）序列 + 序列围绕其聚集的紧密程度。
* 与距离类型无关：适用于任何有效的 `N×N` 序列距离（如OM、LCP、Hamming等）。
* 自动布局和图例，可根据状态数量进行调整。
* 通过 `save_as` 和 `dpi` 参数可导出用于出版的图像。
  
## 示例

### 1. 使用默认参数绘制基本的seqrf图

```python
plot_relative_frequency(
    seqdata,
    distance_matrix
)
```

### 2. 减少分组数量、提高分辨率并保存

```python
plot_relative_frequency(
    seqdata,
    distance_matrix,
    num_groups=8,
    save_as="seqrf_8groups.png",
    dpi=300
)
```

## Notes注意事项

* `distance_matrix` must match the sequence order in `seqdata.values` (`N×N`, symmetric, non-negative).
* distance_matrix 的顺序必须与 seqdata.values 中的序列顺序匹配（N×N，对称，非负）。
* 分组是沿MDS轴使用等大小的区间进行的（内部使用 `"first"` 方法）。
* 中心序列（medoid）是通过最小化每个组内的（加权）距离总和来计算的。
* 左侧的y轴表示组的编号（1 = 最底部的组）。右侧面板使用您提供的距离单位。
* 如果您的时间标签过于密集，为了可读性，只会显示一部分x轴刻度。

## Authors作者

代码：梁彧祺

文档：梁彧祺

编辑：梁彧祺

翻译：何梁星云
