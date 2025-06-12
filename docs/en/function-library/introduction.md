# Functions and Classes in Sequenzo

This page lists all the tools (functions) and building blocks (classes) available in Sequenzo. Think of it as a complete catalog of everything you can do with the package. Click on any item to see detailed instructions and examples.

## Core Building Blocks
- [`SequenceData`](/en/function-library/sequence-data) - The foundation class for working with your sequence data

## Data Preparation Tools
- Data Format Conversion
  - [`wide_to_long_format_data()`](/en/data-preprocessing/wide-long-format) and [`long_to_wide_format_data()`](/en/data-preprocessing/wide-long-format) - Convert between wide and long data formats
- [`handle_missing_values()`](/en/data-preprocessing/missing-values) - Deal with missing data points

## Sequence Analysis

### Visualization
- [`plot_sequence_index()`](/en/function-library/get-distance-matrix) - Create visual timeline of sequences
- [`plot_state_distribution()`](/en/function-library/get-distance-matrix) - Show how states change over time
- [`plot_transition_network()`](/en/function-library/get-distance-matrix) - Visualize how states connect to each other

### Measuring Dissimilarities Between Sequences
- [`get_distance_matrix()`](/en/function-library/get-distance-matrix) - Calculate how different sequences are from each other

### Understanding Sequence Characteristics
- [`calculate_entropy()`](/en/function-library/get-distance-matrix) - Measure how diverse states are in a sequence
- [`calculate_complexity()`](/en/function-library/get-distance-matrix) - Measure how complex a sequence is
- [`get_transition_matrix()`](/en/function-library/get-distance-matrix) - See how often states change into other states

## Clustering Analysis: Grouping Similar Sequences
- [`cluster_sequences()`](/en/function-library/get-distance-matrix) - Group similar sequences together
- [`evaluate_clusters()`](/en/function-library/get-distance-matrix) - Check how good your grouping is
- [`extract_representative_sequences()`](/en/function-library/get-distance-matrix) - Find typical sequences in each group

## Tools for Large Datasets
- [`parallel_distance_computation()`](/en/function-library/get-distance-matrix) - Speed up calculations using multiple processors
- [`chunk_processor()`](/en/function-library/get-distance-matrix) - Handle very large datasets piece by piece


