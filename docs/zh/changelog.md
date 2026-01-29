<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:40:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-10-07 18:26:50
 * @FilePath: /SequenzoWebsite/docs/zh/changelog.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 最新动态

### 2026 年 1 月 28 日

Sequenzo v0.1.30 版本已发布。

**问题修复：**

* 修复了在为 Ubuntu Python 3.10/3.11 构建 wheel 时，scipy 缺失 OpenBLAS 的问题
* 修复了 `cat.py` 与 R 版本输出结果不一致的问题
* 更新了 `tutorials/01_quickstart.ipynb`

---

### 2026 年 1 月 6 日

Sequenzo v0.1.29 版本已发布。

**问题修复：**

* 修复了 `plot_relative_frequency` 的 y 轴与序列未正确对齐的问题
* 修复了 SequenceData 在存在缺失值时参数检查不正确的问题
* 修复了 `plot_sequence_index` 在绘制聚类结果时键值不匹配的问题
* 修复了示例数据中状态匹配错误的问题
* 修复了 01_quickstart 教程中绘制聚类序列索引时出现 KeyError 的问题
* 修复了 `seqMD.R` 与 `cat.py` 之间计算结果不一致的问题
* 修复了在绘制平均时间并处理 `NaN` 值时的一个缺陷
* 修复了 `cat.py` 中 dataframe 索引不一致的问题

**改进：**

* 重新组织了文件夹结构和文档，提高了可读性

---

### 2025 年 12 月 30 日

Sequenzo v0.1.28 版本已发布。

**新功能：**

* 在 SequenceData 类中新增 `show_default_color_palette()` 和 `get_default_color_palette()` 方法

**改进：**

* 增强了 SequenceData 的数据校验机制：

    * 版本检查在升级提示中会显示具体版本号（例如：`pip install --upgrade sequenzo==0.1.27`）
    * 增加了完整状态空间校验：检查数据中的所有取值是否都包含在 `states` 参数中
    * 改进了标签校验的错误信息，详细指出缺失或多余的标签
* 改进了 `plot_sequence_index` 的布局间距：

    * 修复了列布局下子图间距导致 x 轴标签重叠的问题
    * 优化了 x 轴标签显示策略：在列布局下仅在最底部子图显示 x 轴标签
* 增强了 SequenceData 中与颜色相关的功能

**问题修复：**

* 修复了在 `compute_cat_distance_matrix` 中计算序列长度（seqlength）时的问题

**文档：**

* 增强了 README，补充了参考文献与致谢内容
* 修正了多域序列分析教程中的错误引用

---

### 2025 年 12 月 11 日

Sequenzo v0.1.27 版本已发布。

**新功能：**

* 为 `plot_sequence_index` 新增 `proportional_scaling` 参数：

    * 根据组内样本数量按比例缩放子图高度
    * 在 `layout='column'` 时使用 gridspec 创建比例高度布局
    * 根据各组序列数量计算高度比例
    * 设置最小高度比例为 0.3，以避免子图过小
    * 适用于组间规模差异较大的对比场景
* 为 `plot_sequence_index` 新增 `hide_y_axis` 参数：

    * 隐藏 y 轴刻度、标签和边框
    * 在使用 `proportional_scaling` 时可获得更简洁的可视化效果
* 为 `plot_sequence_index` 和 `plot_state_distribution` 新增 `show_title` 参数：

    * 允许用户独立控制标题的显示与否，而不影响标题内容本身
    * 默认值为 True，以保持向后兼容
* 为 `plot_sequence_index` 新增 `sort_by_ids` 和 `return_sorted_ids` 参数：

    * 支持基于自定义 ID 的排序，以对齐多个图形
    * 通过跨图 ID 对齐，支持多域序列分析

**改进：**

* 增强了 `SequenceData` 类对缺失值的处理能力：

    * 新增 `missing_values` 参数，用于支持自定义缺失值标识（如 99、9、1000）
    * 加强了对缺失值的自动检测（pandas NaN、字符串 `'Missing'` 以及自定义取值）
    * 改进了检测逻辑，可识别并提示用户存在额外类型的缺失值
    * 自动处理 states、labels 和颜色映射中的缺失值
    * 改进了颜色映射逻辑：当提供 `custom_colors` 时，会自动为缺失值添加灰色
* 修复了在缺失标签存在且状态被自动添加时出现的长度不匹配问题
* 为 `plot_mean_time` 添加了图例

**问题修复：**

* 修复了状态分布图与序列索引图未能与对应聚类分组正确对齐的问题
* 针对一个案例研究，对 `cat.py` 进行了调试

**文档：**

* 新增了用于调试 CAT 多域序列分析的相关材料

---

### 2025 年 11 月 26 日

Sequenzo v0.1.26 版本已发布。

**问题修复：**

* 修复了 aic 等指标无法导入的问题

**依赖项：**

* 在 pyproject.toml 和 requirements 中添加了 hmmlearn 的相关配置


### 2025 年 11 月 25 日：

Sequenzo 新版本 v0.1.25 已经发布。

在此版本中，我们实现了 [seqHMM](https://github.com/helske/seqHMM) 的 Python 版本。这是该功能的首次发布，我们将在后续版本中继续优化。此外，我们还优化了一些可视化功能。

---

### 2025 年 11 月 21 日

Sequenzo 新版本 v0.1.24已经发布。

此次更新修复并精进了 fastcluster、CLARA 等聚类方法及其环境依赖，让用户下载和使用 Sequenzo 更加方便。

同时，本次更新也进一步优化了 index plot 和 state distribution plot，使其更加用户友好。

---

### 2025 年 10 月 7 日：

我们发布了 Sequenzo 的新版本 v0.1.19，修复了部分用户在 v0.1.18 中通过 pip install sequenzo 遇到的安装问题。

本次更新还修正了转移矩阵的计算，并引入了一些不太常用的新方法，包括“序列历史分析”和“序列分析多状态模型”。

---

### 2025 年 10 月 4 日： 

🎉 令人振奋的里程碑：Sequenzo 迎来了首位外部贡献者！

开放式协作意味着项目正在稳步成形——非常感谢 [Sebastian Daza](https://sdaza.com/) 对关键问题的调试和对 README 的改进。这标志着 Sequenzo 迈向更广泛开源社区的第一步。

---

### 2025 年 10 月 3 日：
将 Sequenzo 升级至 0.1.18 版本。此次增强包括：

- 新增熵等复杂度度量；
- 引入序列历史分析与序列分析多状态模型等高级模型；
- 支持来自 R 的层次聚类 Ward.D 方法。

---

### 2025 年 9 月 18 日：
更新了大部分中英文文档，并将 Sequenzo 升级至 0.1.17 版本。