<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:59:06
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:14:56
 * @FilePath: /SequenzoWebsite/docs/en/visualization/plot_transition_matrix.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `plot_transition_matrix()`

`plot_transition_matrix()` 绘制状态间转换率的热图：对于每个"起始"状态（行），它显示在下一个时间步转移到每个"目标"状态（列）的概率。对角线单元格是保持在相同状态的概率。

在底层实现中，转换矩阵是按行标准化的，所以每行的和为 1.0（即概率）。

## 函数用法

```python
plot_transition_matrix(
    seqdata,
    title=None,            # 函数用法
    save_as=None,          # 例如，"transitions.png"
    dpi=200                # 保存时的图像分辨率
)
```

## 入口参数

| 参数 | 是否是必须的参数 | 类型   | 描述                                                                                       |
|  | -------- | ------------ | ------------------------------------------------------------------------------------------------- |
| `seqdata` | ✓        | SequenceData |  使用 `SequenceData` 创建的序列数据集。该对象的标签用于坐标轴。 |
| `title` | ✗        | str          | 图表标题。默认为 `None`（无标题）。                                                        |
| `save_as` | ✗        | str          |  保存图表的文件路径（例如，`"transitions.png"`）。如果省略，图表只会显示。 |
| `dpi` | ✗        | int          | 保存时的输出分辨率。默认为 `200`。使用 `300+` 可获得出版级质量。               |

## 它的作用

* 计算所有序列从时间 `t` 到 `t+1` 的转换率矩阵（按行概率）。
* 绘制热图，其中：

    * rows（行） = 时间 `t` 的状态
    * columns（列） = 时间 `t+1` 的状态
    * 单元格值 = 转换概率（0-1），显示两位小数。
* 显示对角线（保持概率）和下三角形；上三角形被屏蔽以避免重复。

## 主要特性

* **一目了然**：深色单元格 = 常见转换；浅色单元格 = 罕见转换。
* **一致的标签**：在两个坐标轴上都使用 `seqdata.labels`。
* **出版就绪**：使用 `save_as` 和 `dpi` 导出。
* **控制台打印助手**（可选）：使用 `print_transition_matrix()` 以对齐的列格式打印矩阵。


## 示例

### 1. 基本热图

```python
plot_transition_matrix(seqdata)
```

在你当前的环境中显示转换率热图。

### 2. 添加标题并保存

```python
plot_transition_matrix(
    seqdata,
    title="State Transition Rates (t → t+1)",
    save_as="transition_matrix.png",
    dpi=300
)
```

将高分辨率 PNG 保存到你的工作目录。

### 3. 获取并打印数值矩阵（可选）

```python
from your_module import compute_transition_matrix, print_transition_matrix

tm = compute_transition_matrix(seqdata)   # 返回按行标准化率的 NumPy 数组
print_transition_matrix(seqdata, tm)      # 格式良好的控制台输出
```

## 注意事项

* 行的和为 1.0（四舍五入范围内）。如果某行没有观察到的出向转换，会安全处理以避免除零错误。
* 对角线显示 `p(保持在相同状态)`；非对角线单元格显示 `p(转换到另一个状态)`。
* 如果你需要完整的矩阵而不进行屏蔽，可以修改绘图代码来移除上三角形屏蔽。

## 作者

代码：梁彧祺

文档：梁彧祺

编辑：梁彧祺

翻译：何梁星云

