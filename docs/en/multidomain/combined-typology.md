# `get_interactive_combined_typology()`

`get_interactive_combined_typology()` creates combined typologies from multiple sequence domains using a two-step approach. First, it performs separate cluster analysis on each domain. Then, it combines the cluster labels from all domains to create composite types that describe patterns across multiple life domains simultaneously.

For example, if you cluster employment sequences into 3 groups (A, B, C) and family sequences into 2 groups (1, 2), the combined typology might include types like "A+1", "B+2", "C+1", etc. Each individual gets assigned to one of these combined types based on their cluster membership in each domain.

This approach is useful when you want to understand how patterns across different life domains relate to each other, and it can reveal cross-domain associations that might not be visible when analyzing domains separately.

## Function Usage

A minimal example with only the required parameters:

```python
diss_matrices, membership_df = get_interactive_combined_typology(domains, method_params)
```

A complete example with all available parameters:

```python
diss_matrices, membership_df = get_interactive_combined_typology(
    domains,                          # required: list of SequenceData objects
    method_params,                    # required: list of parameter dicts for distance computation
    domain_names=None,                # optional: custom names for domains
    norm="zscore",                    # optional: normalization for cluster quality plots
    interactive=True,                 # optional: whether to prompt for cluster numbers
    predefined_clusters=None          # optional: list of cluster numbers for each domain
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `domains` | ✓ | `list[SequenceData]` | A list of `SequenceData` objects, one for each domain you want to combine. Must contain at least two domains. All domains must have the same number of sequences and the same IDs. |
| `method_params` | ✓ | `list[dict]` | A list of parameter dictionaries, one for each domain. Each dictionary must contain at least a `"method"` key specifying the distance measure (e.g., `"OM"`). Other keys can include `"sm"`, `"indel"`, `"norm"`, etc., as used in `get_distance_matrix()`. |
| `domain_names` | ✗ | `list[str]` or `None` | Custom names for each domain. If `None`, domains are automatically named as `Domain_1`, `Domain_2`, etc. Default = `None`. |
| `norm` | ✗ | `str` | Normalization method for cluster quality plots shown during interactive mode. Options: `"zscore"`, `"minmax"`, `"none"`. Default = `"zscore"`. |
| `interactive` | ✗ | `bool` | If `True`, the function will show cluster quality plots and prompt you to enter the number of clusters for each domain. If `False`, you must provide `predefined_clusters`. Default = `True`. |
| `predefined_clusters` | ✗ | `list[int]` or `None` | A list of integers specifying the number of clusters for each domain. Required when `interactive=False`. The length must match the number of domains. Default = `None`. |

## What It Does

The function performs the following steps:

1. **Computes distance matrices:** For each domain, computes a pairwise distance matrix using the parameters specified in `method_params`.

2. **Clusters each domain separately:** Performs hierarchical clustering on each domain's distance matrix. The number of clusters can be determined either:
   - Interactively: The function displays cluster quality plots and asks you to choose the optimal number of clusters.
   - Automatically: You provide `predefined_clusters` when `interactive=False`.

3. **Assembles combined typology:** For each individual, combines their cluster labels from all domains using a separator (default: "+"). For example, if someone belongs to cluster 1 in domain A and cluster 2 in domain B, their combined type is "1+2".

4. **Creates membership table:** Generates a DataFrame showing:
   - Individual IDs
   - Cluster membership for each domain
   - Combined typology label

5. **Saves outputs:**
   - Saves membership table as `combt_membership_table.csv`
   - Saves frequency table showing how many individuals belong to each combined type
   - Saves a bar plot visualizing the frequency distribution
   - Saves cluster quality plots for each domain (if interactive mode)

6. **Returns results:**
   - `diss_matrices`: List of distance matrices (one per domain)
   - `membership_df`: DataFrame with domain clusters and combined typology

## Examples

### 1. Basic interactive usage

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.multidomain.combt import get_interactive_combined_typology

# Prepare domain 1: Employment sequences
df1 = pd.DataFrame({
    "ID": [1, 2, 3, 4, 5],
    "Y1": ["Employed", "Employed", "Unemployed", "Employed", "Unemployed"],
    "Y2": ["Employed", "Unemployed", "Unemployed", "Employed", "Employed"],
    "Y3": ["Unemployed", "Unemployed", "Employed", "Employed", "Employed"]
})

# Prepare domain 2: Family sequences
df2 = pd.DataFrame({
    "ID": [1, 2, 3, 4, 5],
    "Y1": ["Single", "Married", "Single", "Married", "Single"],
    "Y2": ["Single", "Married", "Married", "Married", "Married"],
    "Y3": ["Married", "Married", "Married", "Married", "Married"]
})

time_list = ["Y1", "Y2", "Y3"]
seq_employment = SequenceData(
    df1, time=time_list, states=["Employed", "Unemployed"], id_col="ID"
)
seq_family = SequenceData(
    df2, time=time_list, states=["Single", "Married"], id_col="ID"
)

domains = [seq_employment, seq_family]

# Define distance computation parameters for each domain
method_params = [
    {"method": "OM", "sm": "TRATE", "indel": "auto"},  # For employment domain
    {"method": "OM", "sm": "TRATE", "indel": "auto"}   # For family domain
]

# Run interactive combined typology
diss_matrices, membership_df = get_interactive_combined_typology(
    domains,
    method_params,
    domain_names=["Employment", "Family"]
)
```

During interactive mode, you'll see:
- Cluster quality plots for each domain
- Prompts asking how many clusters you want for each domain
- Progress messages as the analysis proceeds

### 2. Non-interactive usage with predefined clusters

If you already know how many clusters you want for each domain:

```python
diss_matrices, membership_df = get_interactive_combined_typology(
    domains,
    method_params,
    domain_names=["Employment", "Family"],
    interactive=False,
    predefined_clusters=[3, 2]  # 3 clusters for employment, 2 for family
)
```

This skips the interactive prompts and uses your specified cluster numbers directly.

### 3. Three-domain example

```python
# Add a third domain: Education
df3 = pd.DataFrame({
    "ID": [1, 2, 3, 4, 5],
    "Y1": ["High", "High", "Low", "High", "Low"],
    "Y2": ["High", "High", "Low", "High", "Low"],
    "Y3": ["High", "High", "Low", "High", "Low"]
})

seq_education = SequenceData(
    df3, time=time_list, states=["Low", "High"], id_col="ID"
)

domains = [seq_employment, seq_family, seq_education]

method_params = [
    {"method": "OM", "sm": "TRATE", "indel": "auto"},
    {"method": "OM", "sm": "TRATE", "indel": "auto"},
    {"method": "OM", "sm": "CONSTANT", "indel": 1}
]

diss_matrices, membership_df = get_interactive_combined_typology(
    domains,
    method_params,
    domain_names=["Employment", "Family", "Education"],
    predefined_clusters=[3, 2, 2]  # When interactive=False
)
```

This creates combined types like "1+2+1", "2+1+2", etc., representing all combinations of cluster memberships across the three domains.

### 4. Understanding the output

The membership DataFrame contains:

```python
print(membership_df.head())
```

Output:

```
      Employment_Cluster  Family_Cluster  CombT
ID
1                      1               1    1+1
2                      1               2    1+2
3                      2               1    2+1
4                      1               2    1+2
5                      2               1    2+1
```

The frequency table shows how common each combined type is:

```
   CombT  Frequency  Proportion (%)
0   1+2        2           40.0
1   2+1        2           40.0
2   1+1        1           20.0
```

## Understanding Combined Typologies

Combined typologies allow you to:

1. **Identify cross-domain patterns:** See which combinations of patterns across domains are common or rare in your data.

2. **Reduce complexity:** Instead of analyzing multiple domains separately, you get a single categorical variable (the combined type) that summarizes an individual's pattern across all domains.

3. **Enable further analysis:** You can use combined types as grouping variables for other analyses, such as examining differences in outcomes across combined types.

4. **Reveal associations:** Rare combined types might indicate that certain cross-domain transitions are uncommon (e.g., transitioning from employed+married to unemployed+single might be rare).

## Important Notes

1. **Domain order matters:** The order of domains in your `domains` list determines how combined types are labeled. Make sure `domain_names` (if provided) matches this order.

2. **Same individuals required:** All domains must have the same individuals (same IDs in the same order). The function will check this and raise an error if they don't match.

3. **Interactive mode requirements:** When using interactive mode, make sure you're in an environment where plots can be saved. The function saves plots but doesn't display them interactively to avoid display issues on servers.

4. **Combined type proliferation:** With many domains and many clusters per domain, the number of possible combined types can grow quickly (e.g., 3 domains with 3, 2, 2 clusters = 3×2×2 = 12 possible types). Some types may have very few members. Consider using `merge_sparse_combt_types()` to merge rare types.

5. **Distance computation:** Each domain uses its own distance computation parameters. This allows you to tailor the analysis to each domain's characteristics (e.g., different substitution costs or normalization methods).

## Author

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G., Liao, T. F., & Struffolino, E. (2023). Strategies for multidomain sequence analysis in social research. Sociological Methodology, 53(2), 288-322.