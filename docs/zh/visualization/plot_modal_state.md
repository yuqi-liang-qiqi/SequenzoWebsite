<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:58:00
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:00:01
 * @FilePath: /SequenzoWebsite/docs/en/visualization/plot_mean_time.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_mean_time()`

`plot_mean_time()`绘制了一个横向条形图，用于展示在所有序列中，每个状态所花费的**平均时间**。您也可以选择添加标准误差条来判断不确定性。

例如：如果您的序列涵盖10年，而个体在“教育”状态平均花费2.8年，那么“教育”状态的条形长度即为2.8（在x轴上）。时间单位（年、月、波次等）与您的数据一致。

## 函数用法

```python
plot_mean_time(
    seqdata,
    show_error_bar=True,                 # 添加标准误差线（SE whiskers）
    title=None,                          # 可选的图表标题
    x_label="Mean Time (Years)",         # 根据需要可改为 "Months" / "Waves"
    y_label="State",
    save_as=None,                        # 例如 "mean_time.png"
    dpi=200
)
```

## 输入参数

| 参数               | 是否必须参数 | 类型         | 描述                                                                                 |
|------------------|  | ------------ | ------------------------------------------------------------------------------------------- |
| `seqdata`        | ✓ | SequenceData | 您使用 `SequenceData` 创建的序列数据集。                                         |
| `show_error_bar` | ✗ | bool         | 若为 `True`，则显示各状态平均时间的标准误差条。默认为 `True`。         |
| `title`          | ✗ | str          | Figure title. Default = `None` (no title). 图表标题。默认为 `None` (无标题)。                                                 |
| `x_label`        | ✗ | str          | X轴标签。默认为 `"Mean Time (Years)"`。请根据您的时间单位进行修改。        |
| `y_label`        | ✗ | str          | Y轴标签。默认为 `"State"`。                                                          |
| `save_as`        | ✗ | str          | 保存图表的文件路径 (例如 `"mean_time.png"`)。如果省略，则仅显示图表。 |
| `dpi`            | ✗ | int          | 保存时的输出分辨率。默认为 `200`。若用于发表，建议使用 `300+`。         |

## 功能说明

* 计算在所有序列中，每个状态所花费的**平均总时间**。
* 可选择为每个条形计算并绘制**标准误差线**（standard error whiskers）。
* 按平均时间（从小到大）对状态进行排序，使图表更易于阅读。
* 使用您 `SequenceData` 中的颜色映射，确保状态颜色与其他图例一致。
* 在您的环境中（Notebook单元格输出或脚本窗口）显示图表，并可通过 `save_as` 保存。

## 主要特点

* Intuitive “how long in each state?” summary at a glance.
* 
* Error bars for uncertainty (toggle with `show_error_bar`).
* 
* Clean defaults (light grid, readable labels) with minimal configuration.
* 
* Publication-ready export with `save_as` and `dpi`.
* 

## Examples示例

### 1. 基础平均时间图

```python
plot_mean_time(seqdata)
```

显示每个状态的平均时间（带标准误差条），并按平均时间对状态进行排序。

### 2. 自定义标签并隐藏误差条（error bars）

```python
plot_mean_time(
    seqdata,
    show_error_bar=False,
    x_label="Mean Time (Months)",
    y_label="Life-course State",
    title="Average Time Spent by State (Months)"
)
```

### 3. 保存高分辨率图表

```python
plot_mean_time(
    seqdata,
    save_as="mean_time_by_state.png",
    dpi=300
)
```

将 `mean_time_by_state.png` 保存到您当前的工作目录（或您指定的路径）。

## 注意事项

* 单位取决于您的数据。如果您的序列时间点是月份，请设置 `x_label="Mean Time (Months)"`。
* 此处的“标准误差”反映了序列间平均时间的变异性；更宽的误差条意味着更高的不确定性。

## 作者

代码：梁彧祺

文档：梁彧祺

编辑：梁彧祺

翻译：何梁星云

