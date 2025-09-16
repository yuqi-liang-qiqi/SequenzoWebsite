<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:21:00
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 14:21:44
 * @FilePath: /SequenzoWebsite/docs/en/visualization/introduction.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 通用参数及绘图工作原理

所有 Sequenzo 可视化函数都共享一些核心理念。如果你深入理解了本页内容，你就可以更好的掌握我们可视化的功能，在序列分析之外的 Python 绘图也能更有理解，也不再仅仅只是一个调包侠。

## 图表显示位置

* Jupyter Notebook → 图表会显示在单元格下方。
* Python 脚本 → 会弹出一个窗口（具体取决于你的环境）。
* 如果一个函数包含 ` show ` 参数，设置 ` show=False ` 将禁止在屏幕上显示图；你仍然可以通过 ` save_as ` 来保存它。

## 保存图表

```python
save_as="figure.png"   # 或 "figure.pdf", "figure.jpg"
dpi=200                # 如果用于出版，建议设置为 300+（如果你的计算机可以处理）
```

* 如果你省略了文件扩展名，将默认使用 `.png`。
* 除非你提供了绝对路径，否则这个文件将保存到当前工作目录。

## 图表尺寸

`figsize=(width, height)` 单位为英寸。

* 分组较多或时间跨度较长 → 使用更大的图表（例如： `(14, 8)`）。
* 快速预览 → 使用更小的图表渲染速度更快。

## 颜色和图例

* 颜色来自你的 `SequenceData` 对象，并在不同图表中保持一致。
* 图例也来自 `SequenceData`（标签和颜色都相同）。
* 想要微调颜色？在绘图前编辑调色板，例如：

  ```python
  # 示例：更改 "Education" 状态的颜色
  seqdata.color_map_by_label["Education"] = "#1f77b4"     # "#1f77b4" 是一个十六进制颜色代码，代表一种特定的颜色。
  ```

## 时间轴和单位

* 时间标签取自 `SequenceData`（例如，年/月/阶段）。
* 确保坐标轴标签与你的单位匹配（例如，“年份”，“月份”，“阶段”）。
* 一些函数使用百分比（0 – 100%），另一些使用比例（0 – 1）。坐标轴标签会告诉你具体是哪一种。

## 分组到面板

* `id_group_df` 必须将每个“ 实体 ID ”映射到一个分组。
* `categories` 是 `id_group_df` 中用于命名分组变量的列。

* 布局：

    * `layout="column"` 将分组垂直堆叠。
    * `layout="grid"` 将分组排列成网格；可以任选设置 `nrows` / `ncols`。
* 顺序：

    * `group_order` 固定面板的顺序。
    * `sort_groups` 控制自动排序（' auto '自动，' numeric '数字，' alpha '字母，' none '' 无）。

## 序列排序（如适用）

* 一些图表通过对行进行排序来揭示结构：

    * 按时间进行字典序排序（默认）， 或按 `"transition_count"`（转换次数）、 `"final_state"`（最终状态）等规则排序。

* 排序只改变显示顺序，不改变你的数据。

## 性能提示

* 大型数据集（序列多/时间点多）→ 使用 `show=False` 并保存到文件；稍后再打开图像。
* 当索引图过于密集时，可以优先使用聚合图（例如，众数状态图、分布图）。
* 打印时使用矢量格式（`.pdf`, `.svg`）；幻灯片和文档中使用 `.png`。

## 快速预设（复制/粘贴）

```python
# 用于出版的高质量 PNG
save_as="figure.png"; dpi=300; figsize=(14, 8)

# 在 Notebook 中快速预览
save_as=None; dpi=150; figsize=(10, 6)

# 批量导出且不弹出窗口
show=False; save_as="figure.png"
```

## 问题排查

* 图表空白或过小：

    * 数据可能与分组不匹配；检查 `id_group_df["Entity ID"]` 是否与 `seqdata.ids`对齐。
* 颜色错误或不一致：

    * 确保你的数据中的状态标签与 `SequenceData` 中的标签匹配； 在绘图前调整 `color_map_by_label` 。
* 没有图例或图例被截断：

    * 一些函数会将图例放置在坐标轴之外；增加图表的宽度/高度或保存为 PDF。
* “未保存任何内容”：

    * 检查 `save_as` 的路径和扩展名；如果没有扩展名，会自动添加 `.png`。

*作者：梁彧祺*
<br>
*翻译：何梁星云*
