# `plot_sequence_index()`
在序列索引图中，每行代表一个人/公司/地区/国家，每列代表一个时间点，颜色表示该人当时所处的状态。这可以让你看到各种模式，例如人们何时切换状态、稳定序列的外观以及不同组别（例如，男性 vs 女性、国家 A vs 国家 B）的序列差异。

如果你在 Jupyter Notebook 中运行它，该图会显示在单元格下方。如果你以 Python 脚本的形式运行它，则会弹出一个窗口。你也可以使用 `save_as` 将图保存到文件中。

## 函数用法

仅包含必需参数的最小示例（足以满足大多数的使用场景）：

```python
plot_sequence_index(sequence_data)
```
`plot_sequence_index` 函数根据数据结构提供了两种分组方法：

**1. 直接分组**（当分组信息已经在序列数据中时）：

```python
plot_sequence_index(sequence_data, 
                    group_by_column="Cluster", 
                    group_labels=cluster_labels)
```

**2. 外部分组**（当分组信息位于单独的数据框中时）：

```python
plot_sequence_index(sequence_data, 
                    group_dataframe=membership_table, 
                    group_column_name="Cluster", 
                    group_labels=cluster_labels)
```

如果你想自定义可视化，请参阅下表里的附加参数。

## 输入参数

| 参数       | 是否必传 | 类型         | 描述                                                                                                                                                                         |
| --------------- |------| ------------ |----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `seqdata`       | ✓    | SequenceData | 经过 `SequenceData` 创建出来的序列数据。行是不同的个体，列是时间点，值是 `1` 到 `K` 个状态。                                                                                                                |
| `group_by_column` | ✗        | str          | **直接分组**：从 `seqdata.data` 中选择用于分组的列名。当分组信息已经在你的数据中时，使用此参数。比如你的数据中已经有列 “Cluster”、“sex” 或 “education”。                                                                       |
| `group_dataframe` | ✗        | DataFrame    | **外部分组**：包含分组信息的独立的数据框。当分组信息位于单独的数据框中（例如，聚类结果）时使用此参数。该数据框必须包含 ID 列和分组列。                                                                                                    |
| `group_column_name` | ✗        | str          | `group_dataframe` 中分组列的列名。在使用 `group_dataframe` 时必须传入此参数。                                                                                                                  |
| `group_labels`  | ✗        | dict         | 为分组值自定义标签。例如：`{1: "Late Family Formation", 2: "Early Partnership"}`。用于将原始值映射为展示用的标签。                                                                                       |
| `sort_by`       | ✗    | str          | 每个子图中的序列如何排序。选项：`"unsorted"` 或者 `"None"`（按序列原来的顺序），`"lexicographic"`（按字典序对序列进行排序），`"mds"`（按第一个 MDS 维度排序），`"distance_to_most_frequent"`（按最常见序列的距离排序）。默认值是 `"lexicographic"。 
| `sort_by_weight` | ✗        | bool         | 如果是 `True`，则按权重（从高到低）对序列进行排序，并覆盖 `sort_by` 的设置。默认值是 `False`。                                                                                                               |
| `weights`       | ✗        | array/str    | 序列的权重。如果是 `"auto"`，则在可用情况下使用 `seqdata.weights`。默认值是 `"auto"`。                                                                                                              |
| `figsize`       | ✗    | tuple        | 每个子图的大小（宽，高）。只有当 `plot_style="custom"` 时使用此参数。默认值是 `(10, 6)`。                                                                                                              |
| `plot_style`    | ✗        | str          | 绘图外观风格：`"standard"` （标准，平衡视图），`"compact"` （紧凑，视图更方形），`"wide"` （宽的，更强调时间轴）, `"narrow"` （窄的，适度的竖向）, `"custom"` （自定义，用 figsize）。默认值是 `"standard"`。                            |
| `title`         | ✗    | str          | 整个图表的标题。                                                                                                                                                                   |
| `xlabel`        | ✗    | str          | x 轴的标签。默认值是 `"Time"`。                                                                                                                                                      |
| `ylabel`        | ✗    | str          | y 轴的标签。默认值是 `"Sequences"`。                                                                                                                                                 |
| `save_as`       | ✗    | str          | 保存最终合并图片的文件路径（例如 `"index.png"`）。除非提供完整路径，否则图像将保存在当前工作目录中。                                                                                                                  |
| `dpi`           | ✗    | int          | 保存图像时的分辨率。默认值是 `200`。                                                                                                                                                      |
| `layout`        | ✗    | str          | 如何排列多个分组子图：`"column"`（垂直堆叠）或 `"grid"`（行 × 列）。默认值是 `"column"`。                                                                                                              |
| `nrows`/`ncols` | ✗    | int          | 当 `layout="grid"` 时，手动设置网格大小。如果未设置，将自动确定。                                                                                                                                  |
| `group_order`   | ✗    | list         | 自定义分组顺序。如果此参数被提供，将覆盖自动排序。                                                                                                                                                  |
| `sort_groups`   | ✗    | str          | 分组面板的排序方式：`"auto"`（智能排序），`"numeric"`（按数字排序），`"alpha"`（按字典序排序），或 `"none"`（原始顺序）。默认值是 `"auto"`。                                                                              |
| `fontsize`      | ✗        | int          | 文本的基础字体大小（标题大小是 `fontsize`+ 2，刻度大小是 `fontsize` - 2）。默认值是 `12`.                                                                                                             |
| `show_group_titles` | ✗    | bool         | 是否展示各分组的标题。默认值是 `True`。                                                                                                                                                    |
| `include_legend` | ✗       | bool         | 是否在图中包含图例。默认值是 `True`。                                                                                                                                                     |
| `sequence_selection` | ✗   | str/list     | 选择显示哪些序列的方法：`"all"`（展示全部序列），`"first_n"` （显示前 `n` 个序列），`"last_n"` （显示最后 `n` 个序列），或者显示指定特定 ID 的序列 。默认值是 `"all"`。                                                             |
| `n_sequences`   | ✗        | int          | 当使用参数 `"first_n"` 或者 `"last_n"` 时展示的序列数目。默认值是 `10`。                                                                                                                        |
| `show_sequence_ids` | ✗    | bool         | 如果是 `True`，在 y 轴上展示实际的序列 ID，而不是序列编号。此参数在传入的 `sequence_selection` 是序列 ID 的列表时最有用。默认值是 `False`。                                                                              |


## 功能说明

* 将序列值转换为颜色矩阵，其中行是序列，列是时间点。
* 对序列进行排序，使视觉模式更易于观察。如果 `sort_by=None`，则使用基于时间的字典序排序；否则会使用选定的结构化规则。
* 如果提供了分组信息，则为每个组创建一个子图，并按 `layout` 排列。
* 使用 `seqdata` 的颜色映射添加图例，使颜色与你的状态标签匹配。
* 在你当前的环境中显示图表，如果设置了 `save_as`，也可以将其保存到文件中。

## 注意事项与提示

* 状态值必须是从 1 开始的整数编码。颜色图与 `1..K` 对齐，其中 K 是状态的数量。
* 缺失值在内部进行排序处理；在视觉上，它们仍然通过你在 `SequenceData` 中设置的颜色图进行映射。
* `"first_marriage"` 当前在辅助函数内部使用 `target_state=3`。如果你的“婚姻”状态有不同的代码，请在你的代码中进行调整，或在 `SequenceData` 中相应地映射状态。
* 非常大的 N（许多行）会使图表变得很大。可以考虑绘制一个子集或通过分组将图表拆分为多个面板。

## 主要特性

* 清晰的“条形码式”可视化，展示随时间变化的完整序列。
* 在一个图表中展示多个分组，便于比较。
* 多种内置排序规则以揭示结构（首次事件时间、转换次数、最终状态、简单斜率）。
* 通过 `save_as` 和 `dpi` 导出可供出版的图表。

## 示例

### 1. 总体索引图（无分组）

```python
plot_sequence_index(
    seqdata,
    title="Sequence Index Plot: Overall",
    xlabel="Time",
    ylabel="Sequences"
)
```

这将绘制一个面板，其中每一行是一个序列，颜色显示随时间变化的状态。

### 2. 在网格中比较分组

```python
plot_sequence_index(
    seqdata,
    id_group_df=id_group_df,
    categories="Gender",
    layout="grid",
    title="Sequence Index Plot by Gender"
)
```

这将为每个性别创建一个子图，并将它们排列在网格中。

### 3. 按转换次数排序（稳定的在顶部 → 不稳定的在底部）

```python
plot_sequence_index(
    seqdata,
    sort_by="transition_count",
    title="Index Plot Sorted by Transition Count"
)
```

状态变化较少的序列出现在顶部；转换次数多的序列沉到底部。

### 4. 保存图表

```python
plot_sequence_index(
    seqdata,
    id_group_df=id_group_df,
    categories="Country",
    save_as="index_by_country.png",
    dpi=300
)
```

这将一个高分辨率的图表保存到你工作目录下的 `index_by_country.png` 文件中。

## 作者

代码: 梁彧祺

文档: 梁彧祺

编辑: 梁彧祺

翻译：何梁星云，曲思竹
