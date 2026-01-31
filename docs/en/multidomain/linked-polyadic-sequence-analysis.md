# `linked_polyadic_sequence_analysis()`

`linked_polyadic_sequence_analysis()` implements **linked polyadic sequence analysis**
(Liao 2021), a randomization-based framework for assessing whether sequences that
belong to the same social unit (a “polyad”) are more similar to each other than would
be expected under random pairing.

The method is designed for settings where multiple sequences are structurally linked,
such as family members (parents and children, siblings), couples, teams, organizations,
or ego-centered networks, and where these sequences are observed over comparable
time spans.

The function compares observed within-polyad distances to a reference distribution
constructed by repeatedly randomizing polyad membership. It reports two statistics
proposed by Liao (2021):

1. **U statistic:** The difference between the mean distance of randomized polyads
   and the observed distance within each polyad. Larger values indicate stronger
   within-polyad similarity relative to chance.

2. **V statistic:** The proportion of randomizations in which the observed polyad
   distance is smaller than the randomized distance. This statistic can be interpreted
   as a randomization-based confidence measure of linkedness, with values close to 1
   indicating strong evidence against random association.

By benchmarking observed polyads against randomized counterparts, this analysis
allows researchers to quantify the degree of linkage among sequences without relying
on parametric assumptions. It is applicable not only to family and couple trajectories,
but also to linked sequences in organizational careers, coordinated life events, and
networked or group-based processes more broadly.

## Function Usage

A minimal example with only the required parameters:

```python
result = linked_polyadic_sequence_analysis(seqlist, return_df=True)
```

A complete example with all available parameters:

```python
result = linked_polyadic_sequence_analysis(
    seqlist,                          # required: list of SequenceData objects
    a=1,                              # optional: randomization type
    method="OM",                      # optional: distance measure method
    distance_parameters=None,         # optional: additional distance parameters
    weights=None,                     # optional: sampling weights for sequences
    rand_weight_type=1,               # optional: randomization weight strategy
    role_weights=None,                # optional: role-specific weights
    pair_weights=None,                # optional: pairwise weights for averaging
    T=1000,                           # optional: number of randomizations
    random_seed=36963,                # optional: random seed for reproducibility
    replace=True,                     # optional: sample with replacement
    n_jobs=1,                         # optional: number of parallel workers
    verbose=True,                     # optional: show progress bar
    return_df=True,                   # optional: return DataFrame format
    return_merged_seqdata=False       # optional: return merged sequence data
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `seqlist` | ✓ | `list[SequenceData]` | A list of `SequenceData` objects, one for each role/position in the polyad. For example, for family analysis: [father_sequences, mother_sequences, child_sequences]. All sequences must have the same number of individuals (polyads) and the same sequence length (time points). |
| `a` | ✗ | `int` | Randomization type. `1` = resample sequences (keeps sequences intact but shuffles which sequences are grouped together). `2` = resample states within sequences (shuffles states within each sequence). Default = `1`. |
| `method` | ✗ | `str` | Distance measure method to use for computing dissimilarities. Options: `"OM"` (optimal matching), `"HAM"` (Hamming distance), `"CHI2"`, etc. Default = `"OM"`. |
| `distance_parameters` | ✗ | `dict` or `None` | Dictionary of additional keyword arguments to pass to `get_distance_matrix()`. Can include parameters like `sm`, `indel`, `norm`, etc. Default = `None`. |
| `weights` | ✗ | `np.ndarray` or `None` | Sampling weights for sequences when generating random polyads. Should be an array of length equal to the number of sequences (polyads). If `None`, uniform weights are used. Default = `None`. |
| `rand_weight_type` | ✗ | `int` | Strategy for computing randomization weights. `1` = uniform weights. `2` = sample-weight-based weights. Default = `1`. |
| `role_weights` | ✗ | `list[float]` or `None` | Role-specific importance weights for different sequence sources. Should be a list with one weight per role, summing to 1.0. If `None`, equal weights are assigned. Default = `None`. |
| `pair_weights` | ✗ | `np.ndarray` or `None` | Pairwise weights for distance averaging within polyads. Used when computing the average distance among all pairs within a polyad. If `None`, all pairs are weighted equally. Default = `None`. |
| `T` | ✗ | `int` | Number of randomizations to perform. More randomizations give more reliable results but take longer to compute. Default = `1000`. |
| `random_seed` | ✗ | `int` | Seed for the random number generator to ensure reproducibility. Default = `36963`. |
| `replace` | ✗ | `bool` | Whether to sample with replacement during randomization. If `True`, the same sequence can appear multiple times in a random polyad. Default = `True`. |
| `n_jobs` | ✗ | `int` | Number of parallel workers for randomization. Set to `-1` to use all available CPUs, or `1` to run sequentially. Default = `1`. |
| `verbose` | ✗ | `bool` | Whether to display a progress bar during randomization. Default = `True`. |
| `return_df` | ✗ | `bool` | If `True`, returns results as a pandas DataFrame with columns: `ObservedDist`, `U`, `V`, `V>0.95`. If `False`, returns a dictionary. At least one of `return_df` or `return_merged_seqdata` must be `True`. Default = `False`. |
| `return_merged_seqdata` | ✗ | `bool` | If `True`, also returns the merged `SequenceData` object used internally. This merged object contains all sequences from all roles concatenated together, which can be useful for further analysis like clustering or visualization. At least one of `return_df` or `return_merged_seqdata` must be `True`. Default = `False`. |

## What It Does

The function performs the following steps:

1. **Validates input:** Checks that all sequences in `seqlist` have the same number of individuals (polyads) and the same sequence length.

2. **Constructs merged sequence data:** Combines sequences from all roles into a single sequence object for efficient distance computation. Sequences are tagged with role identifiers (e.g., "R0_1", "R1_1" for role 0, polyad 1 and role 1, polyad 1).

3. **Computes pairwise dissimilarities:** Calculates a full distance matrix between all sequences (across all roles and all polyads).

4. **Performs randomizations:** Generates `T` random polyads by either:
   - **Type 1 (a=1):** Randomly selecting sequences from each role (preserving sequence structure)
   - **Type 2 (a=2):** Randomly shuffling states within sequences (breaking sequence structure)

5. **Computes observed distances:** For each real polyad, calculates the average distance among all pairs of sequences within that polyad.

6. **Computes randomized distances:** For each random polyad, calculates the same average distance.

7. **Calculates statistics:**
   - **U:** Mean randomized distance minus observed distance (higher = more similarity within polyads)
   - **V:** Proportion of randomizations where observed distance < randomized distance (higher = more significant)
   - **V>0.95:** Binary indicator of whether V exceeds 0.95 (conventionally used as a significance threshold)

8. **Returns results:** Depending on parameter settings, returns either a DataFrame, a dictionary, or a tuple containing results and merged sequence data.

## Examples

### 1. Basic family analysis

Analyze whether family members (father, mother, child) follow similar trajectories:

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.multidomain.linked_polyad import linked_polyadic_sequence_analysis

# Load sequence data for each family member
# Assume you have three SequenceData objects already prepared
father_sequences = SequenceData(...)  # Sequences for fathers
mother_sequences = SequenceData(...)  # Sequences for mothers
child_sequences = SequenceData(...)   # Sequences for children

# Each should have the same number of families and same time points
seqlist = [father_sequences, mother_sequences, child_sequences]

# Run analysis
result_df = linked_polyadic_sequence_analysis(
    seqlist,
    method="OM",
    sm="TRATE",
    indel="auto",
    T=1000,
    return_df=True
)

print(result_df.head())
```

Output:

```
       ObservedDist         U         V  V>0.95
PolyadID                                      
1              2.45   -1.23    0.85       0
2              1.98   -2.10    0.98       1
3              3.12   -0.45    0.62       0
...
```

### 2. Couple analysis with custom distance parameters

Analyze couple synchronization:

```python
# Prepare couple sequences
husband_sequences = SequenceData(...)
wife_sequences = SequenceData(...)

seqlist = [husband_sequences, wife_sequences]

# Use custom distance parameters
distance_params = {
    "sm": "CONSTANT",
    "indel": 1,
    "norm": "maxlength"
}

result_df = linked_polyadic_sequence_analysis(
    seqlist,
    method="OM",
    distance_parameters=distance_params,
    T=2000,  # More randomizations for better precision
    n_jobs=-1,  # Use all available CPUs
    return_df=True
)

# Find couples with significant synchronization (V > 0.95)
significant_couples = result_df[result_df["V>0.95"] == 1]
print(f"Significant couples: {len(significant_couples)} / {len(result_df)}")
```

### 3. Using state-level randomization

To test whether sequences are more similar than expected even after accounting for state distributions:

```python
result_df = linked_polyadic_sequence_analysis(
    seqlist,
    a=2,  # Resample states within sequences
    method="OM",
    T=1000,
    return_df=True
)
```

Type 2 randomization (a=2) preserves the overall distribution of states but breaks the sequential structure, testing whether the observed similarity is due to shared state distributions rather than shared sequences.

### 4. Getting merged sequence data for further analysis

If you want to perform clustering or visualization on the merged sequences:

```python
result_df, merged_seqdata = linked_polyadic_sequence_analysis(
    seqlist,
    method="OM",
    return_df=True,
    return_merged_seqdata=True
)

# Use merged_seqdata for clustering
from sequenzo.clustering.hierarchical_clustering import Cluster
from sequenzo.dissimilarity_measures import get_distance_matrix

distance_matrix = get_distance_matrix(merged_seqdata, method="OM")
cluster_result = Cluster(matrix=distance_matrix, entity_ids=merged_seqdata.ids)
labels = cluster_result.get_cluster_labels(num_clusters=5)

# Or for visualization
from sequenzo.visualization import plot_index_plot
plot_index_plot(merged_seqdata, group=labels)
```

### 5. Using weighted sampling

If your sample includes survey weights:

```python
import numpy as np

# Assume you have survey weights for each family
family_weights = np.array([1.5, 0.8, 1.2, ...])  # One weight per family

result_df = linked_polyadic_sequence_analysis(
    seqlist,
    weights=family_weights,
    rand_weight_type=2,  # Use sample-weight-based randomization weights
    return_df=True
)
```

### 6. Using role weights

If different roles should have different importance:

```python
# Give more weight to parent sequences than child sequences
role_weights = [0.4, 0.4, 0.2]  # Father, Mother, Child

result_df = linked_polyadic_sequence_analysis(
    seqlist,
    role_weights=role_weights,
    return_df=True
)
```

### 7. Using pair weights

To weight some pairs within polyads more heavily:

```python
import numpy as np

# For 3 roles, there are 3*(3-1)/2 = 3 pairs
# Weight parent-parent pairs more than parent-child pairs
pair_weights = np.array([0.5, 0.3, 0.2])  # Weights for pairs (R0-R1, R0-R2, R1-R2)

result_df = linked_polyadic_sequence_analysis(
    seqlist,
    pair_weights=pair_weights,
    return_df=True
)
```

## Understanding the Output

### DataFrame Format (when `return_df=True`)

The DataFrame contains one row per polyad with the following columns:

- **`ObservedDist`:** The average distance among all pairs of sequences within this polyad
- **`U`:** Mean randomized distance minus observed distance. Positive values indicate that observed distances are smaller than expected by chance (more similarity within polyads)
- **`V`:** Proportion of randomizations where the observed distance was smaller than the randomized distance. Values range from 0 to 1. Values close to 1 indicate strong evidence that the observed pattern is unlikely to occur by chance
- **`V>0.95`:** Binary indicator (0 or 1) showing whether V exceeds 0.95, which is often used as a significance threshold

### Dictionary Format (when `return_df=False`)

The dictionary contains:

- **`mean.dist`:** Dictionary with keys `"Obs"` and `"Rand"` showing mean observed and mean randomized distances
- **`U`:** Array of U values (one per polyad)
- **`V`:** Array of V values (one per polyad)
- **`V.95`:** Binary array indicating V > 0.95 (one per polyad)
- **`observed.dist`:** Array of observed distances (one per polyad)
- **`random.dist`:** Array of randomized distances (one per randomization, length = T)

## Interpreting Results

1. **U statistic:**
   - Positive U: Observed distances are smaller than random expectations → more similarity within polyads than expected
   - Negative U: Observed distances are larger than random expectations → less similarity within polyads than expected
   - Larger positive U values indicate stronger within-polyad similarity

2. **V statistic:**
   - V = 0.95 means that in 95% of randomizations, the observed distance was smaller than the randomized distance
   - V values near 1 indicate strong evidence that the observed pattern is unlikely to occur by chance
   - Conventionally, V > 0.95 is considered significant

3. **Mean distances:**
   - Compare mean observed distance to mean randomized distance
   - If mean observed < mean randomized, polyads are more similar than expected by chance

## Important Notes

1. **Data structure requirements:**
   - All sequences in `seqlist` must have the same number of individuals (same number of polyads)
   - All sequences must have the same length (same number of time points)
   - The order of individuals must match across all roles (family 1 in father data should correspond to family 1 in mother data, etc.)

2. **Randomization type selection:**
   - **a=1 (resample sequences):** Tests whether observed polyads are more similar than random groupings. Preserves sequence structure but breaks real groupings.
   - **a=2 (resample states):** Tests whether observed similarity is due to sequential patterns (beyond just state distributions). Breaks sequence structure but preserves state distributions.

3. **Number of randomizations (T):**
   - More randomizations (higher T) give more reliable results but take longer to compute
   - T=1000 is usually sufficient for most purposes
   - For publication-quality results, consider T=5000 or more

4. **Parallel processing:**
   - Set `n_jobs=-1` to use all available CPUs for faster computation
   - Be aware that some IDEs (like PyCharm) may show errors related to multiprocessing; these are harmless and don't affect results

5. **Reproducibility:**
   - Always set `random_seed` if you need reproducible results
   - Different seeds will produce slightly different randomized distances (but conclusions should be similar)

6. **Return format:**
   - At least one of `return_df` or `return_merged_seqdata` must be `True`
   - Use `return_merged_seqdata=True` if you plan to do further analysis (clustering, visualization) on the merged sequences

7. **Computational considerations:**
   - This function can be computationally intensive, especially with many polyads and many randomizations
   - Consider starting with smaller T (e.g., 100) for testing, then increasing for final analysis
   - Using `n_jobs=-1` significantly speeds up computation on multi-core machines

## Author

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Liao, T. F. (2021). Using sequence analysis to quantify how strongly life courses are linked. Sociological Science, 8, 48-72.