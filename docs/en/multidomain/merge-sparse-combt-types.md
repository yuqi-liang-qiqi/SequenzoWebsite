# `merge_sparse_combt_types()`

`merge_sparse_combt_types()` merges rare or sparse combined typology types that have too few members. When you create combined typologies, some combinations of domain clusters may occur very rarely in your data. This function automatically merges these sparse types with similar types while maintaining cluster quality as measured by the silhouette score (average silhouette width, ASW).

The merging process follows an iterative algorithm that:
1. Identifies combined types with fewer members than a minimum threshold
2. Finds the best merge target (the type that, when merged with the sparse type, maintains the highest silhouette score)
3. Only performs the merge if the resulting silhouette score stays above a quality threshold
4. Repeats until no suitable merges can be found

This helps you avoid having too many rare types that might not be meaningful for further analysis, while ensuring that merged types still represent coherent groups.

## Function Usage

A minimal example with only the required parameters:

```python
merged_labels, merge_info = merge_sparse_combt_types(distance_matrix, labels)
```

A complete example with all available parameters:

```python
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix,                    # required: distance/dissimilarity matrix
    labels,                             # required: array of combined typology labels
    min_size=30,                        # optional: minimum samples per type
    asw_threshold=0.5,                  # optional: minimum silhouette score threshold
    verbose=True,                       # optional: print progress messages
    print_merge_details=True,           # optional: print detailed merge history
    visualize_process=True,             # optional: create visualization of merge process
    visualization_path="merge_progress.png"  # optional: path to save visualization
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `distance_matrix` | ✓ | `np.ndarray` or `pd.DataFrame` | A square distance or dissimilarity matrix between all sequences. Must be n×n where n is the number of sequences. |
| `labels` | ✓ | `array-like` | Array of combined typology labels (strings) for each sequence. Length must match the number of rows/columns in `distance_matrix`. |
| `min_size` | ✗ | `int` | Minimum number of samples required per combined type. Types with fewer members will be considered for merging. Default = `30`. |
| `asw_threshold` | ✗ | `float` | Minimum silhouette score threshold. Merges are only performed if they maintain a silhouette score above this threshold. Range: -1 to 1. Default = `0.5`. |
| `verbose` | ✗ | `bool` | Whether to print progress messages and merge information during execution. Default = `True`. |
| `print_merge_details` | ✗ | `bool` | Whether to print detailed merge history at the end. Default = `True`. |
| `visualize_process` | ✗ | `bool` | Whether to create a visualization showing how the silhouette score and cluster count change during merging. Default = `True`. |
| `visualization_path` | ✗ | `str` | File path to save the merge process visualization. Only used if `visualize_process=True`. Default = `"merge_progress.png"`. |

## What It Does

The function performs the following steps:

1. **Initial validation:** Checks that the distance matrix is square and that labels match the matrix dimensions.

2. **Identifies sparse types:** Counts how many sequences belong to each combined type and identifies types with fewer than `min_size` members.

3. **Iterative merging process:**
   - For each sparse type, tests merging it with every other type
   - Computes the silhouette score for each potential merge
   - Selects the merge that results in the highest silhouette score
   - Only performs the merge if the resulting score is at or above `asw_threshold`
   - Repeats until no more suitable merges can be found

4. **Tracks merge history:** Records each merge operation, including which types were merged, the resulting silhouette score, and iteration number.

5. **Generates visualization:** Creates a plot showing how silhouette scores and cluster counts change throughout the merging process (if requested).

6. **Returns results:**
   - `merged_labels`: Array of updated combined typology labels after merging
   - `merge_info`: Dictionary containing merge history and quality metrics

## Examples

### 1. Basic usage after creating combined typology

```python
from sequenzo.multidomain.combt import (
    get_interactive_combined_typology,
    merge_sparse_combt_types
)

# Create combined typology first
diss_matrices, membership_df = get_interactive_combined_typology(
    domains,
    method_params,
    domain_names=["Employment", "Family"]
)

# Get the combined typology labels
labels = membership_df["CombT"].values

# You need a distance matrix for merging
# Use one of the domain distance matrices, or compute a multidomain distance matrix
# For this example, we'll use the first domain's distance matrix
distance_matrix = diss_matrices[0]

# Merge sparse types
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix=distance_matrix,
    labels=labels,
    min_size=30,          # Merge types with fewer than 30 members
    asw_threshold=0.5     # Maintain silhouette score >= 0.5
)

# Update membership DataFrame
membership_df["CombT_Merged"] = merged_labels
```

### 2. Adjusting merge criteria

If you want to be more or less aggressive about merging:

```python
# More aggressive: merge types with fewer than 50 members
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix=distance_matrix,
    labels=labels,
    min_size=50,          # Higher threshold = more merging
    asw_threshold=0.4     # Lower threshold = more merging allowed
)
```

Or to be more conservative:

```python
# More conservative: only merge very small types, maintain high quality
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix=distance_matrix,
    labels=labels,
    min_size=20,          # Lower threshold = less merging
    asw_threshold=0.6     # Higher threshold = stricter quality requirement
)
```

### 3. Using multidomain distance matrix

For better merging decisions, use a distance matrix computed from multidomain sequences rather than a single domain:

```python
from sequenzo.multidomain.cat import compute_cat_distance_matrix

# Compute multidomain distance matrix using CAT
md_distance_matrix = compute_cat_distance_matrix(
    domains,
    method_params=method_params,
    what="diss"
)

# Merge using the multidomain distance matrix
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix=md_distance_matrix,
    labels=labels,
    min_size=30,
    asw_threshold=0.5
)
```

This is often preferred because the multidomain distance matrix better captures similarities across all domains simultaneously.

### 4. Examining merge information

The `merge_info` dictionary contains useful information about what happened:

```python
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix=distance_matrix,
    labels=labels,
    min_size=30,
    asw_threshold=0.5,
    verbose=False  # Turn off printing to examine results manually
)

print(f"Initial clusters: {merge_info['initial_cluster_count']}")
print(f"Final clusters: {merge_info['final_cluster_count']}")
print(f"Initial ASW: {merge_info['initial_silhouette']:.4f}")
print(f"Final ASW: {merge_info['final_silhouette']:.4f}")
print(f"Total merges: {merge_info['total_merges']}")

# Examine merge history
for merge in merge_info['merge_history']:
    print(f"Iteration {merge['iteration']}: "
          f"{merge['source']} (size={merge['source_size']}) -> {merge['target']} "
          f"| New ASW: {merge['new_asw']:.4f}")
```

### 5. Without visualization

If you don't want to generate the visualization:

```python
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix=distance_matrix,
    labels=labels,
    min_size=30,
    asw_threshold=0.5,
    visualize_process=False
)
```

## Understanding the Output

### Return Values

1. **`merged_labels`:** A numpy array of the same length as the input `labels`, containing the updated combined typology labels after merging. Types that were merged now share the same label.

2. **`merge_info`:** A dictionary containing:
   - `"initial_cluster_count"`: Number of unique combined types before merging
   - `"final_cluster_count"`: Number of unique combined types after merging
   - `"initial_silhouette"`: Silhouette score before any merging
   - `"final_silhouette"`: Silhouette score after all merging
   - `"total_merges"`: Total number of merges performed
   - `"small_clusters_merged"`: Number of small clusters that were merged
   - `"merge_history"`: List of dictionaries, each containing details about one merge operation

### Visualization

If `visualize_process=True`, the function creates a plot with two panels:
- **Top panel:** Shows how the silhouette score changes with each merge iteration
- **Bottom panel:** Shows how the number of clusters decreases as merges occur

Reference lines show the initial and final values for both metrics.

## Important Notes

1. **Distance matrix choice:** The quality of merging depends on using an appropriate distance matrix. Using a multidomain distance matrix (computed with `compute_cat_distance_matrix()`) generally gives better results than using a distance matrix from a single domain, because it reflects similarities across all domains simultaneously.

2. **Minimum size selection:** The `min_size` parameter should be chosen based on your sample size and research goals. For a sample of ~2,000, `min_size=30` is often reasonable (about 1.5% of the sample). For larger samples, you might use a higher threshold; for smaller samples, a lower one.

3. **ASW threshold interpretation:**
   - Values > 0.5: Good cluster structure
   - Values 0.25-0.5: Reasonable cluster structure
   - Values < 0.25: Weak cluster structure

Setting `asw_threshold=0.5` means the function will only merge if it can maintain "good" cluster quality.

4. **Merge order:** The algorithm processes sparse types one at a time and may not find the globally optimal solution. It's a greedy algorithm that makes locally optimal choices.

5. **No guarantees:** Not all sparse types will necessarily be merged. If merging a sparse type would cause the silhouette score to drop below the threshold, it will remain unmerged. This means you might still have some small types in your final result.

6. **Label format:** The function preserves the format of your input labels. If your combined types are strings like "1+2+1", the merged labels will also be strings, though some types may now share labels after merging.

## When to Use This Function

Use `merge_sparse_combt_types()` when:

- Your combined typology has many rare types (types with very few members)
- You want to simplify the typology for further analysis (e.g., regression, comparing groups)
- You want to ensure that each type in your final typology represents a meaningful number of individuals
- You need to balance between having enough detail (many types) and having enough data per type (larger groups)

However, be cautious about merging if:

- The sparse types are theoretically meaningful and you want to preserve them
- You're doing exploratory analysis and want to see all possible combinations
- The merging would combine types that are conceptually very different

## Author

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Liao, T. F., & Struffolino, E. (2023). Strategies for multidomain sequence analysis in social research. Sociological Methodology, 53(2), 288-322.