# Sequenzo 的函数与类

本页汇总了 Sequenzo 提供的所有工具（函数）与基石（类）。点击任意条目可查看详细说明与示例。

## 核心构件
- [`SequenceData`](/zh/function-library/sequence-data) - 标准化的序列数据结构

## 数据处理工具
- 数据格式转换
  - [`wide_to_long_format_data()`](/zh/data-preprocessing/wide-long-format) 与 [`long_to_wide_format_data()`](/zh/data-preprocessing/wide-long-format) - 宽、长格式互转
- [`handle_missing_values()`](/zh/data-preprocessing/missing-values) - 处理缺失值
- [`assign_unique_ids()`](/zh/data-preprocessing/assign_unique_ids) - 为序列生成稳定的唯一 ID
- [`clean_time_columns()`](/zh/data-preprocessing/clean_time_columns) - 解析并规范化时间相关列
- [`replace_cluster_id_by_labels()`](/zh/data-preprocessing/replace_cluster_id_by_labels) - 将数值簇 ID 替换为标签

## 序列分析

### 可视化
- [`plot_sequence_index()`](/zh/visualization/index-plot) - 绘制序列时间线
- [`plot_state_distribution()`](/zh/visualization/state-distribution-plot) - 展示状态随时间的变化
- [`plot_modal_state()`](/zh/visualization/plot_modal_state) - 展示每个时间点最常见状态
- [`plot_most_frequent_sequences()`](/zh/visualization/plot_most_frequent_sequences) - 展示最频繁出现的序列
- [`plot_mean_time()`](/zh/visualization/plot_mean_time) - 展示各状态的平均停留时间
- [`plot_transition_matrix()`](/zh/visualization/plot_transition_matrix) - 展示状态转移关系
- [`plot_relative_frequency()`](/zh/visualization/plot_relative_frequency) - 展示状态的相对频率
- [`plot_single_medoid()`](/zh/visualization/plot_single_medoid) - 绘制某簇的代表性序列

### 序列间非相似度
- [`get_distance_matrix()`](/zh/function-library/get-distance-matrix) - 计算序列之间的差异

## 聚类分析：相似序列分组
- [`KMedoids`](/zh/function-library/KMedoids) - 基于划分的序列聚类方法
- [`hierarchical_clustering`](/zh/function-library/hierarchical_clustering) - 层次聚类方法
- [`cluster_quality`](/zh/function-library/cluster_quality) - 评估聚类质量
- [`cluster_results`](/zh/function-library/cluster_results) - 查看聚类结果并提取代表序列

## 大数据工具
- [`CLARA（面向大数据的 KMedoids）`](/zh/big-data/clara) - 在大规模数据上高效聚类

