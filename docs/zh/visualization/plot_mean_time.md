# `plot_mean_time()`

`plot_mean_time()` 会绘制一个水平条形图，显示每个状态在所有序列中在该状态下所花费的**平均时间**。它还可以选择添加**标准误差**条形图，以便判断不确定性。

例如：如果序列涵盖 10 年，平均每个人在“教育”方面花费 2.8 年，则“教育”的条形图为 2.8（在 x 轴上）。单位与数据一致（年、月、波等）。

## 函数用法

```python
plot_mean_time(
    seqdata,
    show_error_bar=True,                 # 添加标准误差（SE）误差线
    title=None,                          # 可选图形标题
    x_label="Mean Time (Years)",         # 根据需要更改为"Months" / "Waves"
    y_label="State",
    save_as=None,                        # e.g., "mean_time.png"
    dpi=200
)
```

## 入口参数

| 参数               | 是否必需 | 类型           | 描述                                                                                          |
|------------------|----|--------------|---------------------------------------------------------------------------------------------|
| `seqdata`        | ✓  | SequenceData | 使用`Sequence Data`创建的序列数据集。                                                                   |
| `show_error_bar` | ✗  | bool         | 如果为 `True`，则显示各州平均时间的标准误差线。默认值为 `True`。                                                     |
| `title`          | ✗  | str          | 图表标题。默认值 = `None`（无标题）。                                                |
| `x_label`        | ✗  | str          | X 轴标签。默认值为“平均时间（年）”。请将其更改为与您的时间单位匹配。       |
| `y_label`        | ✗  | str          | Y 轴标签。默认值 =“State”。                                                 |
| `save_as`        | ✗  | str          | 保存图表的文件路径（例如，“mean_time.png”）。如果省略，则仅显示图表。|
| `dpi`            | ✗  | int          | 保存时的输出分辨率。默认值为“200”。为了达到出版质量，请使用“300+”。       |

## 它的作用

* 计算每个状态在所有序列中在该状态下所花费的**平均总时间**。
* 可选地计算并绘制每个条形的**标准误差**须线。
* 按平均时间对状态进行排序（小 → 大），使图表易于阅读。
* 使用 `SequenceData` 颜色图，使状态颜色与您在其他地方的图例相匹配。
* 在环境中显示图表（Notebook 单元格输出或脚本中的窗口），并可以通过 `save_as` 保存。

## 主要特点

* 直观的“每个状态持续多长时间？”摘要，一目了然。
* 误差线用于表示不确定性（使用 `show_error_bar` 切换）。
* 简洁的默认设置（浅色网格、可读标签），配置极简。
* 使用 `save_as` 和 `dpi` 导出，方便发布。

## 例子

### 1. 基本平均时间图

```python
plot_mean_time(seqdata)
```

显示每个州的平均时间（带有 SE 条）并按平均时间对州进行排序。

### 2. 自定义标签并隐藏误差线

```python
plot_mean_time(
    seqdata,
    show_error_bar=False,
    x_label="Mean Time (Months)",
    y_label="Life-course State",
    title="Average Time Spent by State (Months)"
)
```

### 3. 保存高分辨率图形

```python
plot_mean_time(
    seqdata,
    save_as="mean_time_by_state.png",
    dpi=300
)
```

将“mean_time_by_state.png”保存在当前的工作目录（或您指定的路径）中。

## 小记

* 单位取决于您的数据。如果序列时间点是月，请设置`x_label="Mean Time (Months)"`。
* 此处的“标准误差”反映了不同序列间平均时间的变异性；条形越宽，不确定性越大。

## 作者

代码: Yuqi Liang

文档: Yuqi Liang

编辑: Yuqi Liang

翻译、测试：Sizhu Qu