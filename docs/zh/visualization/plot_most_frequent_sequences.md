<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:49:18
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 13:49:50
 * @FilePath: /SequenzoWebsite/docs/en/visualization/plot_most_frequent_sequences.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_most_frequent_sequences()`

`plot_most_frequent_sequences()` 绘制数据中前 N 个最常见的完整序列（例如，10个最常观察到的状态路径）。每个水平条代表一个随时间变化的序列模式；条的高度等于该序列在整个数据集中的百分比。颜色遵循 `SequenceData` 的状态颜色映射，因此片段与图例匹配。

这类似于 R 语言 TraMineR 中的 `seqfplot`。

## 函数用法

```python
plot_most_frequent_sequences(
    seqdata,
    top_n=10,         # 展示多少条序列
    save_as=None,     # 例如："top_sequences.png"
    dpi=200
)
```

## 输入的参数

| 参数        | 是否必要参数 | 类型           | 描述                                                                                                                               |
|-----------|--------|--------------|----------------------------------------------------------------------------------------------------------------------------------|
| `seqdata` | ✓      | SequenceData | 使用 `SequenceData` 创建的序列数据集。颜色和图例来自此对象。 |
| `top_n`   | ✗      | int          | 要显示的最频繁序列的数量。默认为 10。                                                                      |
| `save_as` | ✗      | str          | 保存图形的文件路径（例如，`"top_sequences.png"`）。如果未设置，则仅在屏幕上显示绘图。                        |
| `dpi`     | ✗      | int          | 保存图像时的分辨率。默认为 200。如果您的机器性能允许，建议在出版物中使用 300+ 的分辨率。                       |

## 功能说明

* 统计每个唯一的完整序列出现的频率。
* 选择前 N 个序列并计算它们的份额（占所有序列的百分比）。
* 将每个序列绘制为堆叠的水平条：每个时间点一个色块。
* 将 x 轴标记为时间，y 轴标记为累积百分比，以便您可以看到：

    * 排名第一的序列的百分比，
    * 前 N 个序列所覆盖的累积份额。

## 主要特点

* 清晰、紧凑地展示数据中最典型的轨迹。
* 颜色和图例自动与 `SequenceData` 匹配（无需手动调色）。
* 适应不同的 `top_n` 值，而无需更改您的工作流程。
* 可通过 `save_as` 和 `dpi` 导出。

## 示例

### 1. 显示默认的前 10 个序列

```python
plot_most_frequent_sequences(seqdata)
```

### 2. 显示前 5 个序列并使用更高分辨率

```python
plot_most_frequent_sequences(
    seqdata,
    top_n=5,
    dpi=300
)
```

### 3. 将图形保存到文件

```python
plot_most_frequent_sequences(
    seqdata,
    top_n=15,
    save_as="top15_sequences.png"
)
```

这会将 `top15_sequences.png` 保存到您当前的工作目录（或您指定的文件夹）中。

## 注意事项

* 条形图沿时间堆叠，因此您可以从左到右读取序列模式。
* y 轴显示百分比。顶部的刻度等于前 N 个序列的累积份额（因此条形图填充到该值，不一定到 100%）。
* 图例取自 `SequenceData`，以确保不同图表之间状态颜色的一致性。

## 作者

代码：梁彧祺

文档：梁彧祺

编辑：梁彧祺

翻译：何梁星云
