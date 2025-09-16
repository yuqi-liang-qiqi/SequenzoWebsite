<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 14:40:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-16 14:01:54
 * @FilePath: /SequenzoWebsite/docs/en/function-library/introduction.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Functions and Classes in Sequenzo

This page lists all the tools (functions) and building blocks (classes) available in Sequenzo. Think of it as a complete catalog of everything you can do with the package. Click on any item to see detailed instructions and examples.

## Core Building Blocks
- [`SequenceData`](/en/function-library/sequence-data) - The foundation class for working with your sequence data

## Data Preparation Tools
- Data format conversion
  - [`wide_to_long_format_data()`](/en/data-preprocessing/wide-long-format) and [`long_to_wide_format_data()`](/en/data-preprocessing/wide-long-format) - Convert between wide and long data formats
- [`handle_missing_values()`](/en/data-preprocessing/missing-values) - Check missing data points
- [`assign_unique_ids()`](/en/data-preprocessing/assign_unique_ids) - Generate stable identifiers for sequences
- [`clean_time_columns()`](/en/data-preprocessing/clean_time_columns) - Parse and normalize time-related columns
- [`replace_cluster_id_by_labels()`](/en/data-preprocessing/replace_cluster_id_by_labels) - Replace numeric cluster IDs with labels

## Sequence Analysis

### Visualization
- [`plot_sequence_index()`](/en/visualization/index-plot) - Create visual timeline of sequences
- [`plot_state_distribution()`](/en/visualization/state-distribution-plot) - Show how states change over time
- [`plot_modal_state()`](/en/visualization/plot_modal_state) - Visualize the most common state at each time
- [`plot_most_frequent_sequences()`](/en/visualization/plot_most_frequent_sequences) - Display the most common sequences
- [`plot_mean_time()`](/en/visualization/plot_mean_time) - Average time spent in each state
- [`plot_transition_matrix()`](/en/visualization/plot_transition_matrix) - Visualize transitions between states
- [`plot_relative_frequency()`](/en/visualization/plot_relative_frequency) - Relative frequency of states
- [`plot_single_medoid()`](/en/visualization/plot_single_medoid) - Plot a representative sequence for a cluster

### Measuring Dissimilarities Between Sequences
- [`get_distance_matrix()`](/en/function-library/get-distance-matrix) - Calculate how different sequences are from each other

## Clustering Analysis: Grouping Similar Sequences
- [`KMedoids`](/en/function-library/KMedoids) - Partitioning-based clustering for sequences
- [`Cluster()`](/en/function-library/hierarchical_clustering) - Overview of hierarchical clustering for sequences, and `Cluster()`
- [`ClusterQuality()`](/en/function-library/cluster_quality) - Evaluate clustering quality
- [`ClusterResults()`](/en/function-library/cluster_results) - Inspect results and extract representatives

## Tools for Large Datasets
- [`CLARA (KMedoids for large datasets)`](/en/big-data/clara) - Efficient clustering on large datasets