# `plot_state_distribution()`

`plot_state_distribution()` 创建的图表可以展示**不同状态下的人群份额如何随时间变化。**

例如，在某一年，你可能会看到 10% 的人在“教育”状态，30% 在“就业”状态，60% 在“失业”状态。该函数会追踪这些百分比随时间的变化并绘制成图。

你还可以在不同群体之间比较这些变化（例如，男性 vs 女性，国家 A vs 国家 B）。

当你想要可视化**谁在什么时间处于何种状态，以及状态的占比如何变化**时，这个函数非常有用。

If you run it in a Jupyter Notebook, the figure appears under the cell. If you run it as a Python script, a window will pop up. You can also save the figure to a file with `save_as`.
如果你在 Jupyter Notebook 中运行它，图表会显示在单元格下方。如果你作为 Python 脚本运行，则会弹出一个窗口。你也可以使用 `save_as` 将图像保存到文件。

## 函数用法

仅包含必需参数的最小示例（足以满足大多数用例）：

```python
plot_state_distribution(sequence_data)
```
`plot_state_distribution` 函数提供了两种基于数据结构的分组方法：

**1. 直接分组**（当分组信息已经在序列数据中时）：

```python
plot_state_distribution(sequence_data, 
                        group_by_column="Cluster", 
                        group_labels=cluster_labels)
```

**2. 外部分组**（当分组信息位于单独的数据框中时）：

```python
plot_state_distribution(sequence_data, 
                        group_dataframe=membership_table, 
                        group_column_name="Cluster", 
                        group_labels=cluster_labels)
```
如果您想自定义可视化，请参阅下表中的附加参数。

## 入口参数

| 参数     | 是否必须参数 | 数据类型         | 描述                                                                     |
| -------- |--------|--------------|------------------------------------------------------------------------|
| `seqdata` | ✓      | SequenceData | 你的序列数据集（使用 `SequenceData` 创建）。                                         |
| `id_group_df` | ✗      | DataFrame    | 一个将 ID 与分组（如性别、国家）关联的 DataFrame。如果为 `None`，则只绘制一个总图。                   |
| `categories` | ✗      | str          | `id_group_df` 中用于指定分组变量的列名。                                            |
| `figsize` | ✗      | tuple        | 每个子图的尺寸（宽，高）。默认值为 `(12, 7)`。                                           |
| `title`  | ✗      | str          | 整个图表的标题。                                                               |
| `xlabel` | ✗      | str          | x轴的标签。                                                                 |
| `ylabel` | ✗      | str          | y轴的标签。                                                                 |
| `save_as` | ✗      | str          | 保存图表的文件路径（例如 `"output.png"`）。                                          |
| `dpi`    | ✗      | int          | 保存图像的分辨率。默认值为 `200`。                                                   |
| `layout` | ✗      | str          | 如何排列多个子图：`"column"`（垂直堆叠）或 `"grid"`。                                   |
| `stacked` | ✗      | bool         | 如果为 `True`，绘制堆叠面积图。如果为 `False`，绘制折线图。                                  |
| `group_order` | ✗      | list         | 手动指定分组的顺序（会覆盖自动排序）。                                                    |
| `sort_groups` | ✗      | str          | 排序方法：`"auto"`（智能数字排序）、`"numeric"`（数字排序）、`"alpha"`（字母排序）、`"none"`（不排序）。 |
| `show`   | ✗      | bool         | 是否在创建后立即显示图表。如果为 `True`，图表将在你当前的环境中弹出；如果为 `False`，图表不会显示，但你仍然可以保存下来。   |

## 它的作用是什么呢

* 计算每个时间点上各个状态的百分比。
* 创建图表来展示这些百分比如何随时间变化。
* 如果提供了分组信息，则为每个组创建一个子图。
* 支持两种可视化样式：

    * 堆叠面积图（默认）：将各个状态堆叠起来以显示 100% 的总和。
    * 折线图：每个状态显示为一条独立的线。
* 以智能方式自动对分组进行排序（例如，`1st year`, `2nd year`, ...）。
* 确保每个时间点的总和为 100% ，以避免数据缺失。
* 可以保存和/或显示最终的图表。

## 主要特性

* **单个或多个分组**：适用于整体数据或子组比较。
* **灵活的布局**：以列或网格形式显示图表。
* **简洁的美学**：内置颜色、网格线、坐标轴标签。
* **自动分组排序**：数字优先、字母顺序或自定义顺序。
* **可导出**：为出版物或报告保存高分辨率的图表。

## 示例

### 1. 单一总体分布（无分组）

```python
plot_state_distribution(seqdata,
                        title="Overall State Distribution",
                        stacked=True)
```

这将创建一个堆叠面积图，显示各状态（例如，EDU、FT、UNEMP）如何随时间演变。

### 2. 跨组比较分布

```python
plot_state_distribution(seqdata,
                        id_group_df=id_group_df,
                        categories="Gender",
                        layout="grid",
                        stacked=False,
                        title="State Distribution by Gender")
```

This will generate **one subplot for each gender**, using line plots instead of stacked areas.
This will generate **one subplot for each gender**, using line plots instead of stacked areas.

### 3. 保存图表

```python
plot_state_distribution(seqdata,
                        id_group_df=id_group_df,
                        categories="Country",
                        save_as="country_comparison.png")
```

这会将最终的图表保存为 `country_comparison.png` 到你的工作目录中。

## 作者

代码：梁彧祺

文档：梁彧祺

编辑：梁彧祺

翻译：何梁星云，曲思竹