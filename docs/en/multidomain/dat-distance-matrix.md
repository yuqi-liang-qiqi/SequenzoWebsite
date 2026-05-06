# `compute_dat_distance_matrix()`

`compute_dat_distance_matrix()` computes a combined distance matrix for multidomain sequence analysis using the Distance Additive Trick (DAT). Unlike CAT (Cost Additive Trick), which derives multidomain substitution/indel costs by additively combining domain costs, DAT simply adds together the distance matrices computed separately for each domain.

This approach is simpler and more computationally efficient than CAT, because it doesn't require building multidomain sequences or computing new substitution costs. It assumes that the total dissimilarity between two individuals across multiple domains is the sum of their dissimilarities in each domain separately.

Central point (Ritschard et al., 2023): DAT assumes independence of domain-level dissimilarities across domains. CAT assumes independence in domain state occurrences through additive costs. IDCD differs because it does not derive multidomain dissimilarities from domain costs (CAT) or from domain distances (DAT), and therefore does not impose these additive independence assumptions.

## Function Usage

A minimal example with only the required parameters:

```python
distance_matrix = compute_dat_distance_matrix(sequence_objects, method_params)
```

A complete example with all available parameters:

```python
distance_matrix = compute_dat_distance_matrix(
    sequence_objects,    # required: list of SequenceData objects
    method_params        # required: list of parameter dictionaries
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `sequence_objects` | ✓ | `list[SequenceData]` | A list of `SequenceData` objects, one for each domain you want to combine. Must contain at least two domains. All domains must have the same number of sequences and the same IDs in the same order. |
| `method_params` | ✓ | `list[dict]` | A list of parameter dictionaries, one for each domain. Each dictionary contains parameters that will be passed directly to `get_distance_matrix()` for that domain. Must have the same length as `sequence_objects`. |

## What It Does

The function performs the following steps:

1. **Validates input:** Checks that the number of `method_params` dictionaries matches the number of domains in `sequence_objects`.

2. **Computes domain-specific distance matrices:** For each domain, computes a pairwise distance matrix using `get_distance_matrix()` with the parameters specified in the corresponding `method_params` dictionary. Each domain can use different distance computation methods, substitution costs, indel costs, etc.

3. **Adds distance matrices:** Sums all the domain-specific distance matrices element-wise to create the combined DAT distance matrix.

4. **Returns result:** Returns the combined distance matrix as a NumPy array.

The key insight of DAT is that if two individuals are very similar in all domains, their distances will be small in all domains, and the sum will also be small. Conversely, if they differ substantially in one or more domains, those differences will contribute to a larger total distance.

## Examples

### 1. Basic usage with two domains

```python
import pandas as pd
import numpy as np
from sequenzo.define_sequence_data import SequenceData
from sequenzo.multidomain.dat import compute_dat_distance_matrix

# Domain 1: Employment sequences
df1 = pd.DataFrame({
    "ID": [1, 2, 3, 4],
    "Y1": ["Employed", "Employed", "Unemployed", "Employed"],
    "Y2": ["Employed", "Unemployed", "Unemployed", "Employed"],
    "Y3": ["Unemployed", "Unemployed", "Employed", "Employed"]
})

# Domain 2: Family sequences
df2 = pd.DataFrame({
    "ID": [1, 2, 3, 4],
    "Y1": ["Single", "Married", "Single", "Married"],
    "Y2": ["Single", "Married", "Married", "Married"],
    "Y3": ["Married", "Married", "Married", "Married"]
})

time_list = ["Y1", "Y2", "Y3"]
seq_employment = SequenceData(
    df1, time=time_list, states=["Employed", "Unemployed"], id_col="ID"
)
seq_family = SequenceData(
    df2, time=time_list, states=["Single", "Married"], id_col="ID"
)

sequence_objects = [seq_employment, seq_family]

# Define distance computation parameters for each domain
method_params = [
    {"method": "OM", "sm": "TRATE", "indel": "auto"},  # For employment domain
    {"method": "OM", "sm": "CONSTANT", "indel": 1}     # For family domain
]

# Compute DAT distance matrix
dat_matrix = compute_dat_distance_matrix(sequence_objects, method_params)
print(dat_matrix)
```

The resulting matrix is the sum of the two domain-specific distance matrices.

### 2. Three domains with different methods

```python
# Add a third domain: Education
df3 = pd.DataFrame({
    "ID": [1, 2, 3, 4],
    "Y1": ["High", "High", "Low", "High"],
    "Y2": ["High", "High", "Low", "High"],
    "Y3": ["High", "High", "Low", "High"]
})

seq_education = SequenceData(
    df3, time=time_list, states=["Low", "High"], id_col="ID"
)

sequence_objects = [seq_employment, seq_family, seq_education]

# Each domain can use different distance computation methods
method_params = [
    {"method": "OM", "sm": "TRATE", "indel": "auto"},      # Optimal matching for employment
    {"method": "OM", "sm": "CONSTANT", "indel": "auto"},   # Optimal matching for family
    {"method": "DHD"}                                       # Dynamic Hamming distance for education
]

dat_matrix = compute_dat_distance_matrix(sequence_objects, method_params)
```

### 3. Using with Hamming distance

Some distance measures like Hamming distance don't require substitution cost matrices or indel costs:

```python
method_params = [
    {"method": "OM", "sm": "TRATE", "indel": "auto"},
    {"method": "HAM"}  # Hamming distance - no sm or indel needed
]

dat_matrix = compute_dat_distance_matrix(sequence_objects, method_params)
```

### 4. Using DAT with Combined Typology analysis

DAT distance matrices are commonly used with Combined Typology (CombT) analysis:

```python
from sequenzo.multidomain.combt import get_interactive_combined_typology
from sequenzo.multidomain.dat import compute_dat_distance_matrix
from sequenzo.multidomain.combt import merge_sparse_combt_types

# First, create combined typology
diss_matrices, membership_df = get_interactive_combined_typology(
    sequence_objects,
    method_params,
    domain_names=["Employment", "Family"]
)

# Get combined typology labels
labels = membership_df["CombT"].values

# Compute DAT distance matrix for merging sparse types
dat_matrix = compute_dat_distance_matrix(sequence_objects, method_params)

# Merge sparse types using DAT distance matrix
merged_labels, merge_info = merge_sparse_combt_types(
    distance_matrix=dat_matrix,
    labels=labels,
    min_size=30,
    asw_threshold=0.5
)
```

## Understanding the Output

The function returns a NumPy array representing the combined distance matrix. The shape is `(n, n)` where `n` is the number of sequences (which must be the same across all domains).

Each entry `[i, j]` in the matrix represents the sum of distances between sequence `i` and sequence `j` across all domains:

```
DAT_distance[i, j] = domain1_distance[i, j] + domain2_distance[i, j] + ... + domainN_distance[i, j]
```

## DAT vs CAT: When to Use Which?

Both DAT and CAT (`compute_cat_distance_matrix()`) combine distances across multiple domains, but they use different approaches:

**DAT (Distance Additive Trick):**
- Simply adds domain-specific distance matrices
- More computationally efficient
- Doesn't consider interactions between domains
- Faster to compute
- Relies on an independence assumption between domain-level dissimilarities

**CAT (Cost Additive Trick):**
- Usually applied after representing sequences with combined states (e.g., "Employed+Married")
- Computes multidomain substitution/indel costs by summing domain-level costs
- Imposes an additive structure equivalent to a state-independence assumption across domains
- More computationally intensive
- Useful when additive cost interpretation is theoretically justified

In practice:
- Use **DAT** when a linear additive combination of domain dissimilarities is substantively justified
- Use **CAT** when additive multidomain costs derived from domain costs match your intended cost interpretation
- If you want to avoid additive-independence assumptions from both CAT and DAT, use the IDCD approach described by Ritschard et al. (2023)

## Important Notes

1. **Same individuals required:** All domains must have the same individuals (same IDs in the same order). The function assumes this and doesn't explicitly check, so make sure your data is aligned.

2. **Parameter matching:** The number of dictionaries in `method_params` must exactly match the number of domains in `sequence_objects`. Each dictionary should contain valid parameters for `get_distance_matrix()`.

3. **Distance scale:** Since distances are added, domains with larger distance values will have more influence on the final combined distance. If your domains have very different distance scales, you might want to normalize them first or consider weighting (which would require modifying the function or preprocessing).

4. **Symmetric matrices:** The resulting distance matrix is symmetric if all input distance matrices are symmetric (which they should be for standard distance measures).

5. **Method flexibility:** Each domain can use a completely different distance computation method. This flexibility allows you to choose the most appropriate method for each domain's characteristics.

6. **Computational efficiency:** DAT is more efficient than CAT because it doesn't need to build composite states or compute new substitution cost matrices. However, it also provides less modeling flexibility.

## Author

Code: Yuqi Liang

Documentation: Yuqi Liang

## Acknowledgements

We gratefully acknowledge Professor Gilbert Ritschard for clarifications on multidomain strategy terminology and assumptions.

## References

Ritschard, G., Liao, T. F., & Struffolino, E. (2023). Strategies for multidomain sequence analysis in social research. Sociological Methodology, 53(2), 288-322.