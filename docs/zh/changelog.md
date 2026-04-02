<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:40:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-10-07 18:26:50
 * @FilePath: /SequenzoWebsite/docs/zh/changelog.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# 最新动态

### 2026 年 3 月 29 日
**Sequenzo v0.1.37** 已在 PyPI 发布（包含自 v0.1.36 以来的变更）。

**核心亮点：**
* **特征提取与选择**：新增流水线（类 Boruta 式 + 类 clustassoc 式工作流）并配备测试用例。
* **距离与指标**： 提高了 OM/LCS/LCP/欧几里得距离矩阵的计算速度。新增 KOB 分解及基于距离的指标，并通过了 TraMineR 一致性测试。`get_distance_matrix` 函数支持可选的压缩距离矩阵输出，并同步更新了绘图辅助工具。
* **聚类功能**： 进一步优化了层次聚类性能（包括全矩阵情况）。在 C++ 中实现了 `ClusterQuality` / `ClusterResults`；增加了基准测试与一致性检查。解决了 OpenMP 处理问题以及 macOS/Jupyter 环境下的 OpenMP 冲突；修复了 MSVC/Windows 的兼容性。
* **TraMineR 对齐**：针对事件、距离和树相关的整个工作流进行了更广泛的一致性优化。
* **seqHMM**：新增教程（涵盖 mvad、biofam、pairfam 等应用场景）。
* **数据与文档**：修复了 `seqdss` 的只读问题；增加了 `SequenceData` 缺失值校验。新增关于 pairfam 活动数据的层次聚类 vs PAM 聚类教程。更新了 README 和教程；绘图标签采用学术风格（例如使用 1,000 而非 “k”）。
* **打包与 CI**：`sdist`（源码包）现包含 `.pyx` 文件，确保能够从源码可靠地进行 Cython 构建；精简了工作流与 PR 检查。

---

### 2026 年 3 月 9 日
**Sequenzo v0.1.36** 已在 PyPI 发布（包含自 v0.1.35 以来的变更）。

**核心亮点：**
* **聚类功能**：将更多层次聚类逻辑移至 C++；提升了 Ward 算法在大距离情况下的数值稳定性；改进了预处理流程。
* **绘图与数据**： 针对极端距离尺度，优化了相对频率图（Relative-frequency plots）的安全性。`define_sequence_data` 现在接受包含观测状态超集的“状态定义”。
* **seqHMM**：修复了部分 Bug 并增加了一致性测试。
* **教程与文档**：新增 Pairfam 材料和压力数据（stress-data）的 R 语言教程；清理了既有教程并更新了 README。
* **构建与 CI**：修复了 Wheel 轮子包/Windows 工具链及 `cibuildwheel` 的问题；增强了工作流鲁棒性（如应对速率限制和并行问题）。

**Bug 修复：**
* 修复了 LCP 距离的边界情况，并处理了若干打包与 CI 相关的问题。

---

### 2026 年 3 月 2 日
**Sequenzo v0.1.35** 已在 PyPI 发布（包含自 v0.1.34 以来的变更）。

**核心亮点：**
* **序列转变量**：新增从序列中提取协变量的工作流功能，并附带测试。
* **绘图**：改进了相对频率图的布局。
* **压力分析工作流**：更新了教程；升级了 `stress` 模块（如支持延迟导入、扩展建模与推断）。
* **打包**：修复了涉及 `importlib.util` 的导入失败问题。

---

### 2026 年 2 月 24 日
**Sequenzo v0.1.34** 已在 PyPI 发布（包含自 v0.1.33 以来的变更）。

**核心亮点：**
* **数据与工具**：在 `utils` 中增加了加权汇总辅助工具。内置了三个数据集（儿童死亡率、预期寿命、人均 GDP）。增加了用于序列对比的工具函数。
* **差异性度量**：修复了 `OMloc` / `OMstran` 以对齐 TraMineR，包括 `get_distance_matrix()` 中对缺失值的处理；增加了额外的 TraMineR 对比测试。
* **聚类功能**：修正了快速层次聚类中的 Ward 算法（现与标准 `hclust` 保持一致）；精简了预处理流程与测试。

### 2026 年 2 月 13 日

Sequenzo 版本 v0.1.33 已发布（包含 v0.1.32 的变更）。

**新功能与数据：**

- **事件序列分析**：新增 `with_event_history_analysis` 模块，提供 `create_event_sequences`、`find_frequent_subsequences`、`count_subsequence_occurrences`、`compare_groups` 等函数，以及可视化功能（`plot_event_sequences`、`plot_subsequence_frequencies`），并附带教程与单元测试。
- **序列特征**：新增用于刻画序列特征的函数（如子序列、转移、turbulence、复杂度指数、序列内熵、片段持续时间方差、横截面熵），并提供相应教程与单元测试。
- **相异度度量**：在 `get_distance_matrix()` 中新增距离方法 `OMloc`、`OMslen`、`OMstran`、`TWED`、`LCS`、`NMS`、`NMSMST`、`NMSSTSSoft` 和 `SVRspell`。
- **LCP 相关**：新增 LCP 相关函数；为 LCP/LCPspell 添加 `matrix_display` 选项；改进文档与 Notebook 演示。
- **树分析**（v0.1.33）：新增 `tree_analysis` 模块，用于序列数据的回归树分析（TraMineR 风格 `disstree` / `seqtree`），包括 `build_distance_tree`、`build_sequence_tree`、`compute_pseudo_variance`、`compute_distance_association` 以及可视化辅助函数。
- **Elzinga & Studer (2019) 归一化**：新增基于 Elzinga & Studer (2019) 的参考归一化方法。
- **可视化**：`SequenceData()` 新增颜色透明度支持，并改进索引图的间距。
- **数据工具**：统一列清洗与数据集列举方式；重构数据预处理辅助函数。
- **加权统计**：新增 `utils` 模块，提供 `weighted_mean`、`weighted_variance`、`weighted_five_number_summary`，以对齐 TraMineR 的加权行为。

**错误修复：**

- 修复 OM 归一化与 TraMineR 不一致的问题；修正动态规划片段长度（m/n = mSuf - prefix - 1）。
- 修复 OMloc 编译问题以及 OMslen / OMstran 无法运行的问题。
- 修复 `get_distance_matrix()` 返回的 numpy 矩阵不可写的问题。
- 修复 LCPspell 在 `norm=auto` 时使用 maxdist 并避免负距离；修复 `norm=none` 的行为。
- 修复相异度度量中的 pytest 问题；现在在多种配置下 29 个测试全部通过。

**其他：**

- 更新 seqhmm 组件。
- 将相异度度量模块中的中文注释翻译为英文。
- 改进 xsimd 子模块初始化，可自动修复提交不匹配问题。
- 扩展数据清洗与树分析脚本的文档字符串与说明文档。

### 2026 年 2 月 1 日

Sequenzo 版本 v0.1.31 已发布。

**新功能与数据：**
- 向包中新增了已清洗的 **biofam** 数据集，可直接通过 `sequenzo.datasets` 加载。
- 新增 **多元（polyadic）** 示例数据集（Liao 和 Lin，预计于 2026 年发表），以及已清洗的多元儿童/父母 CSV 文件。
- 新增辅助函数 **`clean_time_columns_auto()`**，用于自动清洗数据中的时间列。
- **pairfam** 数据：更新了原始 pairfam 数据的清洗与预处理方式；在月度和年度两个层级新增 **pairfam-activity** 和 **pairfam-family** 数据集。
- **前缀树与后缀树**：新增 spell 版本并提升了运行速度。
- 更新了政治学领域的 **aid** 数据集。
- 术语调整：在适用场景下，将用词从 “polyadic” 改为 “dyadic”，以提高准确性。

**错误修复：**
- 修复了在 Jupyter Notebook 中显示的 Sequenzo 版本号不正确的问题。
- 更新了用于处理超大距离矩阵输出的 Notebook 示例（`get_distance_matrix_example_for_handling_outputs_too_large`）。
- 对 `spell_individual_level_indicators.py` 以及与 LCP 相关的代码进行了小幅更新。

**其他：**
- 重新组织了 `original_datasets_and_cleaning` 目录下的文件，并移除了开发者文件夹中重复或无关的文件。
- 改进了数据清洗脚本的 docstring 和相关文档。

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