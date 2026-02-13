# Working with Weighted Data

In some social science datasets, you will find a column called `weight`. This column provides survey or design weights, which adjust the contribution of each individual to the analysis. If your dataset does not include such a variable, you can safely ignore this feature. However, understanding how weights work will give you a deeper grasp of social sequence analysis.

## What are weights?

In many datasets in social sciences, each row does not represent the same fraction of the population. For example:

* In a **survey dataset**, some respondents may carry higher sampling weights to correct for unequal probabilities of selection.

**Example:** In the [pairfam-family dataset](../datasets/pairfam-family.md), the variable `weight40` is provided so that trajectories at age 40 are representative of the German population. If you ignore it, some social groups may be over- or under-represented.

For instance:

```
id = 111000
weight40 = 0.343964278697968
```

This does not mean the person is “one-third of a person.” Instead, Pairfam used a complex sampling design (stratification, unequal selection probabilities), and over time there is also attrition (dropout).

To make the sample representative of the German population at age 40, the survey team provides a calibration weight. The value tells us how much this person should count when computing population estimates.

Thus, if `weight40 < 1` (like 0.34), this respondent comes from a group that is **overrepresented** in the raw sample, so their influence must be down-weighted.

If `weight40 > 1` (like 1.7), this respondent comes from a group that is **underrepresented**, so their influence must be boosted.

In practice, using weights means that descriptive statistics and sequence distributions reflect the **population structure**, not just the raw sample.

* In an **administrative dataset**, some individuals may represent many others (e.g., when rows are aggregated by groups).

  * Example: If each row corresponds to a municipality’s unemployment trajectory, and the dataset also contains the size of the municipality, using that size as a weight ensures large municipalities count more than small ones.

* In a **simulated dataset**, you may want to emphasize certain cases more than others.

  * Example: Suppose you simulate 10 “rare” career paths but want them to contribute as much as 100 “common” ones. You can give the rare paths weight = 10 each, so that they have equal influence when computing descriptive statistics or substitution costs.

Overall, a weight is simply a non-negative number attached to each sequence that tells you how much that sequence should count in descriptive statistics and cost estimation.

By default, `Sequenzo` assumes all sequences are equally weighted (`weight = 1` in `SequenceData()`).

## Why use weights?

Weights allow your results to reflect the **true population structure**, not just the raw sample.
For example:

* **Without weights:** A small oversampled subgroup may dominate the transition rates used to compute substitution costs.
* **With weights:** Substitution costs reflect the intended population frequencies.

This is especially important if you are analyzing survey data or data that have been stratified, clustered, or aggregated.

## How to provide weights with `Sequenzo`

When you define your dataset, pass an array of weights:

```python
from sequenzo import SequenceData

seq = SequenceData(
    data=df,
    time=list(df.columns)[1:],   # Sequence columns
    states=["A", "B", "C"],
    id_col="ID",
    weights=df["survey_weight"].values   # One weight per sequence
)
```

If no weights are given, Sequenzo automatically sets them to 1.

## How weights change the sequence analysis workflow

Most of the workflow is unchanged: you still compute distances, cluster, and visualize as usual.
But weights are integrated throughout Sequenzo in four main areas. Understanding how weights work in each area will help you use them effectively:

### 1. SequenceData Objects

**How weights are stored:**

The `SequenceData` class stores weights as an attribute that can be accessed and used throughout the analysis:

```python
from sequenzo import SequenceData
import numpy as np
import pandas as pd

# Create sequence data with weights
data = pd.DataFrame({
    'ID': [1, 2, 3],
    'T1': ['A', 'B', 'A'],
    'T2': ['B', 'B', 'A']
})
weights = np.array([1.5, 2.0, 0.5])  # Different weights for each sequence

seqdata = SequenceData(
    data=data,
    time=['T1', 'T2'],
    states=['A', 'B'],
    weights=weights  # Pass weights during initialization
)

# Access weights
print(seqdata.weights)  # [1.5, 2.0, 0.5]

# Flatten weights for time-point level analysis
flattened = seqdata.flatten_weights()  # Repeats each weight for each time point
```

**Where weights are used in SequenceData:**

1. **Initialization**: Weights can be provided when creating a `SequenceData` object
2. **Property access**: `seqdata.weights` returns the weight array
3. **Flattening**: `flatten_weights()` method repeats weights across sequence length for time-point level analysis
4. **Descriptive statistics and cross-tabs**: `get_xtabs(other, weighted=True)` uses weights when counting co-occurrences. Weighted counts affect transition probabilities and derived summaries.
5. **Uniqueness statistics**: `check_uniqueness_rate(weighted=True)` reports uniqueness rates after accounting for weights. If a rare sequence has a very large weight, it contributes proportionally.

**Example:**
```python
# Create weighted sequence data
seqdata = SequenceData(
    data=df,
    time=['Year1', 'Year2', 'Year3'],
    states=['Employed', 'Unemployed'],
    weights=np.array([1.2, 0.8, 1.5, 1.0])  # 4 sequences with different weights
)

# Check weighted uniqueness
stats = seqdata.check_uniqueness_rate(weighted=True)
print(f"Weighted uniqueness rate: {stats['weighted_uniqueness_rate']}")
```

### 2. Visualization Functions

**How weights are used in visualization:**

Most visualization functions in Sequenzo support weights through the `weights="auto"` parameter, which automatically uses `seqdata.weights` if available:

**Functions with weight support:**

1. **`plot_mean_time()`** - Weighted mean time spent in each state
2. **`plot_state_distribution()`** - Weighted state distributions over time
3. **`plot_modal_state()`** - Weighted modal state at each time point
4. **`plot_most_frequent_sequences()`** - Weighted sequence frequencies
5. **`plot_relative_frequency()`** - Weighted representative sequences
6. **`plot_sequence_index()`** - Sorting and grouping by weights
7. **`plot_transition_matrix()`** - Weighted transition rates

**Usage pattern:**

```python
from sequenzo import plot_mean_time, plot_state_distribution

# Automatic weight detection (recommended)
plot_mean_time(seqdata, weights="auto")  # Uses seqdata.weights if available

# Explicit weights
custom_weights = np.array([1.0, 2.0, 1.5])
plot_mean_time(seqdata, weights=custom_weights)

# No weights (unweighted)
plot_mean_time(seqdata, weights=None)
```

**How weights work in visualization:**

* Plots that summarize frequencies or means (state-distribution, modal-state, most-frequent sequences, mean time, transition matrix, relative frequency plot) compute weighted tallies and divide by the total weight.
* Pure “row-rendering” plots (sequence index) do not replicate rows by weight; instead, we offer weight-aware sorting and labeling.
* Error bars for proportions use an effective sample size $Neff = (Σw)² / Σ(w²)$ to approximate $SE ≈ √(p(1−p)/Neff)$.

This keeps pictures faithful to population structure when weights are present, while preserving backward-compatible behavior when weights are absent.

5. **Downstream analysis**

   * Pairwise distances (OM, HAM, DHD, etc.) are not directly weighted per sequence.
   * Instead, weights shape the cost matrix, which then affects distances indirectly.

For K-Medoids / PAM / PAMonce, weights are used explicitly in the objective: **each point’s distance to its medoid is multiplied by its weight when computing the total cost**.

In other words, with weights, the chosen medoids and the final cluster assignments can differ from the equal-weight case; with extreme weights, a few sequences may even dominate the solution.

Unlike K-Medoids, the sequence weights of hierarchical clustering are not applied during the linkage construction itself, but only in the evaluation of cluster quality. Details follow below.

**Example:**
```python
# Create sequence data with weights
seqdata = SequenceData(
    data=df,
    time=['T1', 'T2', 'T3'],
    states=['A', 'B', 'C'],
    weights=np.array([1.0, 2.0, 1.5, 0.5])  # 4 sequences
)

# Visualizations automatically use weights
plot_state_distribution(seqdata, weights="auto")  # Weighted distributions
plot_mean_time(seqdata, weights="auto")  # Weighted mean times
plot_most_frequent_sequences(seqdata, weights="auto")  # Weighted frequencies
```

### 3. Distance Matrix Computation

**How weights are used in distance calculations:**

The `get_distance_matrix()` function uses weights in two main ways:

1. **Substitution cost matrix calculation**: When `weighted=True` (default), state distributions used to compute substitution costs account for sequence weights
2. **CHI2 and EUCLID methods**: These methods use weighted state distributions

**Usage:**

```python
from sequenzo import get_distance_matrix

# Create sequence data with weights
seqdata = SequenceData(
    data=df,
    time=['T1', 'T2', 'T3'],
    states=['A', 'B', 'C'],
    weights=np.array([1.0, 2.0, 1.5])
)

# Compute distance matrix with weighted substitution costs
distance_matrix = get_distance_matrix(
    seqdata=seqdata,
    method="OM",
    sm="TRATE",  # Transition rates computed with weights
    weighted=True  # Use weights in state distribution calculations
)

# For CHI2 method, weights affect state distributions
chi2_distances = get_distance_matrix(
    seqdata=seqdata,
    method="CHI2",
    weighted=True  # Weighted chi-square distances
)
```

**How weights affect distance calculations:**

1. **Substitution cost matrices** (`get_substitution_cost_matrix()`):
   * If you choose `sm="TRATE"` (transition-rate based), Sequenzo uses weighted transition rates.
   * This means substitution costs reflect population-weighted transitions rather than raw frequencies.
   * With `sm="CONSTANT"`, weights have no effect.

2. **Insertion/deletion costs (`indel`)**:
   * When `indel="auto"`, its value may be derived from the substitution matrix.
   * If the substitution matrix was built using weights, the indel cost is indirectly weight-dependent.

3. **CHI2 distance**: Uses weighted state distributions to compute chi-square statistics

4. **EUCLID distance**: Uses weighted state distributions for Euclidean distance calculation

**Note:** Pairwise distances (OM, HAM, DHD, etc.) are not directly weighted per sequence. Instead, weights shape the cost matrix, which then affects distances indirectly.

**Example:**
```python
# Weighted substitution cost matrix
from sequenzo import get_substitution_cost_matrix

sm = get_substitution_cost_matrix(
    seqdata=seqdata,
    method="TRATE",
    weighted=True  # Transition rates account for weights
)

# Weighted distance matrix
dist = get_distance_matrix(
    seqdata=seqdata,
    method="OM",
    sm=sm,
    weighted=True
)
```

### 4. Tree Analysis and Clustering

**How weights are used in tree analysis:**

1. **Sequence trees** (`build_sequence_tree()`):
   * Extracts weights from `seqdata.weights` when `weighted=True`
   * Uses weights in distance association tests and tree splitting

2. **Distance trees** (`build_distance_tree()`):
   * Accepts weights as parameter
   * Uses weights in pseudo-variance calculations and permutation tests

3. **Distance association** (`compute_distance_association()`):
   * Computes weighted inertia (sum of weighted squared distances)
   * Formula: `SCtot = sum(w_i * w_j * d_ij)` for all pairs (i,j)

**Example:**
```python
from sequenzo.tree_analysis import build_sequence_tree

# Build tree with weighted analysis
tree_result = build_sequence_tree(
    seqdata=seqdata,
    predictors=predictors_df,
    weighted=True  # Uses seqdata.weights automatically
)
```

**How weights work in clustering:**

1. **Cluster quality**: Weighted cluster quality indices (ASWw, etc.)
2. **Medoid selection**: Weighted medoid computation considers sequence weights
3. **Pseudo-variance**: Weighted pseudo-variance for distance matrices:
   ```python
   # Formula: sum(w_i * w_j * d_ij) / (sum(weights))^2
   ```

For K-Medoids / PAM / PAMonce, weights are used explicitly in the objective: **each point's distance to its medoid is multiplied by its weight when computing the total cost**.

In other words, with weights, the chosen medoids and the final cluster assignments can differ from the equal-weight case; with extreme weights, a few sequences may even dominate the solution.

### Summary: Weight Usage Patterns

Throughout Sequenzo, weights are used in consistent patterns:

**Pattern 1: Automatic weight detection (`weights="auto"`)**
```python
# Most visualization and analysis functions support this
function(seqdata, weights="auto")  # Uses seqdata.weights if available
```

**Pattern 2: Explicit weights**
```python
# Pass weights directly
function(seqdata, weights=np.array([1.0, 2.0, 1.5]))
```

**Pattern 3: Weighted parameter**
```python
# Boolean flag to enable/disable weighting
function(seqdata, weighted=True)  # Uses seqdata.weights when True
```

**Pattern 4: No weights (unweighted)**
```python
# Explicitly disable weights
function(seqdata, weights=None)
# or
function(seqdata, weighted=False)
```

### Best Practices

1. **Store weights in SequenceData**: Always provide weights when creating `SequenceData` objects, then use `weights="auto"` in functions
2. **Consistent weighting**: Use the same weights throughout your analysis pipeline
3. **Weight normalization**: Weights don't need to sum to 1, but be aware of how this affects interpretations
4. **Missing weights**: If weights are not provided, functions default to equal weights (all sequences weighted equally)

## Weighted Statistics Utilities

**Now that we understand how weights are used throughout Sequenzo, let's examine the utility functions that standardize weighted statistical calculations.**

### Background: Previous Implementation

Before the creation of this module, weighted statistical calculations were implemented **inline** within various functions throughout Sequenzo. For example:

**In `sequenzo/sequence_characteristics/cross_sectional_indicators.py`:**
- The `get_mean_time_in_states()` function calculated weighted means directly:
  ```python
  # Line 82: Inline weighted mean calculation
  mtime = np.sum(istatd_values * weights[:, np.newaxis], axis=0) / wtot
  
  # Lines 94-95: Inline weighted variance calculation
  var = np.sum(weights[:, np.newaxis] * (vcent ** 2), axis=0) * wtot / (wtot ** 2 - w2tot)
  ```

**In `sequenzo/visualization/plot_mean_time.py`:**
- The `_compute_mean_time()` function used `np.average()` with weights for weighted calculations

**In other modules:**
- Various functions implemented weighted calculations using NumPy operations directly
- Each implementation had slight variations and potential inconsistencies
- No centralized place to update or maintain weighted calculation logic

### Current Implementation: Unified Utility Functions

The `weighted_stats.py` module provides **standardized, reusable functions** that match TraMineR's implementation exactly. These functions can be used throughout Sequenzo to ensure consistency and maintainability.

**Why this matters:**

Given that weights are used extensively across SequenceData, visualization, distance matrices, and tree analysis (as described above), having standardized weighted statistics functions ensures:

1. **Consistency**: All weighted calculations use the same implementation
2. **Maintainability**: Changes to weighted calculation logic only need to be made in one place
3. **TraMineR Compatibility**: These functions match TraMineR's implementation exactly
4. **Code Reusability**: Avoid duplicating weighted calculation code throughout the codebase

### Available Functions

#### 1. `weighted_mean()`

Computes the weighted mean of a vector.

**Corresponds to R function:** `wtd.mean()` in TraMineR-wtd-stats.R

**Usage:**
```python
from sequenzo import weighted_mean
import numpy as np

x = np.array([1, 2, 3, 4, 5])
weights = np.array([1, 2, 1, 2, 1])
mean = weighted_mean(x, weights=weights)
```

**Parameters:**
- `x`: Input vector of values
- `weights`: Optional weights for each observation. If None, computes unweighted mean.
- `normwt`: Normalization flag (kept for API compatibility, but ignored)
- `na_rm`: If True, remove NA/NaN values before computation (default: True)

**Returns:** Weighted mean as a float

#### 2. `weighted_variance()`

Computes the weighted variance of a vector.

**Corresponds to R function:** `wtd.var()` in TraMineR-wtd-stats.R

**Usage:**
```python
from sequenzo import weighted_variance
import numpy as np

x = np.array([1, 2, 3, 4, 5])
weights = np.array([1, 2, 1, 2, 1])
variance = weighted_variance(x, weights=weights, method='unbiased')
```

**Parameters:**
- `x`: Input vector of values
- `weights`: Optional weights for each observation. If None, computes unweighted variance.
- `normwt`: If True, normalize weights so they sum to length(x) (default: False)
- `na_rm`: If True, remove NA/NaN values before computation (default: True)
- `method`: Method for variance calculation:
  - `'unbiased'`: Unbiased frequency weights (uses n-1 denominator) - **default**
  - `'ML'`: Maximum likelihood (uses n denominator)

**Returns:** Weighted variance as a float

#### 3. `weighted_five_number_summary()`

Computes the weighted five-number summary (minimum, Q1, median, Q3, maximum).

**Corresponds to R function:** `wtd.fivenum.tmr()` in TraMineR-wtd-stats.R

**Usage:**
```python
from sequenzo import weighted_five_number_summary
import numpy as np

x = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
weights = np.array([1, 1, 2, 2, 1, 1, 2, 2, 1, 1])
fivenum = weighted_five_number_summary(x, weights=weights)
# Returns: [min, Q1, median, Q3, max]
```

**Parameters:**
- `x`: Input vector of values
- `weights`: Optional weights for each observation. If None, uses equal weights.
- `na_rm`: If True, remove NA/NaN values before computation (default: True)

**Returns:** NumPy array of length 5 containing [min, Q1, median, Q3, max]

### Why Use These Functions?

#### Benefits

1. **Consistency**: All weighted calculations use the same implementation, ensuring consistent results across Sequenzo
2. **Maintainability**: Changes to weighted calculation logic only need to be made in one place
3. **TraMineR Compatibility**: These functions match TraMineR's implementation exactly, ensuring compatibility with R-based workflows
4. **Code Reusability**: Avoid duplicating weighted calculation code throughout the codebase
5. **Documentation**: Centralized documentation makes it easier for users to understand weighted calculations

#### Migration from Inline Calculations

If you're working with code that uses inline weighted calculations, consider refactoring to use these utility functions:

**Before (inline):**
```python
# Inline weighted mean
wtot = np.sum(weights)
mtime = np.sum(values * weights[:, np.newaxis], axis=0) / wtot
```

**After (using utility function):**
```python
from sequenzo.utils import weighted_mean
mtime = weighted_mean(values, weights=weights)
```

## TraMineR Reference

These functions are based on TraMineR's weighted statistics implementation:

- **Source File**: `TraMineR-wtd-stats.R`
- **Original Package**: Based on Hmisc package functions (included in TraMineR to avoid dependencies)
- **GitHub**: https://github.com/cran/TraMineR/blob/master/R/TraMineR-wtd-stats.R

The Python implementations match the R functions' behavior exactly, including:
- Handling of missing values
- Weight normalization options
- Variance calculation methods
- Five-number summary interpolation for unequal weights

## Usage Examples

### Example 1: Basic Weighted Mean

```python
from sequenzo import weighted_mean
import numpy as np

# Sample data
values = np.array([10, 20, 30, 40, 50])
weights = np.array([1, 2, 3, 2, 1])

# Calculate weighted mean
result = weighted_mean(values, weights=weights)
print(f"Weighted mean: {result}")
# Output: Weighted mean: 30.0
```

### Example 2: Weighted Variance with Different Methods

```python
from sequenzo import weighted_variance
import numpy as np

values = np.array([1, 2, 3, 4, 5])
weights = np.array([1, 2, 1, 2, 1])

# Unbiased variance (default)
var_unbiased = weighted_variance(values, weights=weights, method='unbiased')

# Maximum likelihood variance
var_ml = weighted_variance(values, weights=weights, method='ML')

print(f"Unbiased variance: {var_unbiased}")
print(f"ML variance: {var_ml}")
```

### Example 3: Weighted Five-Number Summary

```python
from sequenzo import weighted_five_number_summary
import numpy as np

# Sample data with unequal weights
values = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
weights = np.array([1, 1, 2, 2, 1, 1, 2, 2, 1, 1])

# Calculate five-number summary
summary = weighted_five_number_summary(values, weights=weights)
print(f"Five-number summary: {summary}")
print(f"Min: {summary[0]}, Q1: {summary[1]}, Median: {summary[2]}, Q3: {summary[3]}, Max: {summary[4]}")
```

### Example 4: Handling Missing Values

```python
from sequenzo import weighted_mean
import numpy as np

# Data with missing values
values = np.array([1, 2, np.nan, 4, 5])
weights = np.array([1, 2, 1, 2, 1])

# Automatically handles NaN (na_rm=True by default)
result = weighted_mean(values, weights=weights, na_rm=True)
print(f"Weighted mean (NaN removed): {result}")

# Or keep NaN
result_with_nan = weighted_mean(values, weights=weights, na_rm=False)
print(f"Weighted mean (with NaN): {result_with_nan}")
```

## Import Options

You can import these functions in several ways:

```python
# Option 1: Direct import from sequenzo (recommended)
from sequenzo import weighted_mean, weighted_variance, weighted_five_number_summary

# Option 2: Import from utils submodule
from sequenzo.utils import weighted_mean, weighted_variance, weighted_five_number_summary

# Option 3: Wildcard import
from sequenzo import *
```

## Implementation Details

### Weighted Mean Formula

The weighted mean is calculated as:
```
weighted_mean = sum(weights * x) / sum(weights)
```

### Weighted Variance Formula

For unbiased frequency weights:
```
xbar = sum(weights * x) / sum(weights)
variance = sum(weights * (x - xbar)^2) / (sum(weights) - 1)
```

For maximum likelihood:
```
variance = sum(weights * (x - xbar)^2) / sum(weights)
```

### Weighted Five-Number Summary

The five-number summary uses weighted quantile interpolation for unequal weights:
- For equal weights: Uses standard fivenum positions
- For unequal weights: Uses interpolated index calculation based on cumulative weights

## Notes

- All functions handle edge cases such as:
  - Zero weights
  - All weights equal to zero
  - Single observation
  - Missing values (when `na_rm=True`)
  
- The functions are designed to match TraMineR's behavior exactly, ensuring compatibility with R-based sequence analysis workflows.

- These functions are used internally throughout Sequenzo, but are also available for direct use by users who need weighted statistical calculations.

## See Also

- `sequenzo/sequence_characteristics/cross_sectional_indicators.py` - Example of functions that could use these utilities
- `sequenzo/visualization/plot_mean_time.py` - Example of weighted calculations in visualization
- `sequenzo/define_sequence_data.py` - SequenceData class with weights support
- `sequenzo/dissimilarity_measures/get_distance_matrix.py` - Weighted distance calculations
- `sequenzo/dissimilarity_measures/get_substitution_cost_matrix.py` - Weighted substitution costs
- TraMineR documentation: https://cran.r-project.org/package=TraMineR

## Weighted data in hierarchical clustering

### Why weights are applied to cluster quality indicators (CQIs) but not to the linkage function

In Sequenzo, weights are supported in **clustering quality indicators** (e.g., ASWw, R², HG) and in **K-Medoids / PAM variants**, but not in hierarchical linkage computation (which is under the hood of the `method=ward` parameter for `Cluster()`). This is intentional and follows both methodological and practical considerations.

**1. Quality metrics are naturally weightable.**

Most evaluation statistics are defined as averages over cases (e.g., average silhouette width, explained variance). Extending these to weighted versions is straightforward: each case contributes proportionally to its weight. This ensures that the assessment of clustering solutions correctly reflects sample design or population importance.

**2. Hierarchical linkage is more complicated.**

Many popular linkage rules, such as Ward (frequently used in sequence analysis), centroid, or median, are rooted in **geometric interpretations that only hold in Euclidean feature spaces**. 

When applied to non-Euclidean dissimilarities such as Optimal Matching or other sequence dissimilarity distances, these formulas are already approximations. Adding weights on top does not have a clear or widely accepted definition, and may produce unstable or misleading dendrograms.

**3. Limited applicability of weighted linkage.**

Among the common linkage methods, only **average linkage (UPGMA)** can be safely extended to incorporate weights: the distance between clusters is defined as the weighted average of all pairwise dissimilarities. 

For single or complete linkage, weights are irrelevant (they always use min/max). For Ward and centroid-based methods, a valid weighted version requires access to Euclidean coordinates, which are not available for general sequence distances.

**4. Design choice in Sequenzo.**

Because of these limitations, Sequenzo does not attempt to provide weighted linkage. Instead, users who require weighted clustering should rely on:

* evaluating hierarchical partitions using the weighted quality metrics, or
* the weighted K-Medoids / PAM / PAMonce implementations. 

This approach ensures that weights are respected where the theory is sound, while avoiding methods that would give a false sense of rigor.

## Weighted data in K-Medoids and its variants

Sequenzo implements K-Medoids clustering along with two common variants: **PAM** (Partitioning Around Medoids) and **PAMonce**. All three methods group sequences by minimizing the total dissimilarity between each sequence and its assigned medoid (the most representative sequence of the cluster). Unlike hierarchical clustering, which produces a full tree, K-Medoids directly returns a flat partition of the data.

### How the algorithms differ

* **KMedoids (standard)**

  This version follows the classic algorithm: it repeatedly swaps candidate medoids with non-medoids until no further improvement is possible.
  It guarantees the optimal partition given enough passes, but can be computationally demanding on large datasets.

* **PAM (Partitioning Around Medoids)**

  PAM also seeks optimal medoids but typically explores a broader set of swaps and refinements in each iteration. It tends to give more stable results than KMedoids, but at higher computational cost.

* **PAMonce**

  This is a faster, approximate variant. Instead of repeatedly updating medoids, it performs only one refinement pass from the initial selection.
  PAMonce is much faster on large datasets and often yields results close to the full PAM algorithm, though sometimes at the expense of cluster quality.

### Role of weights

All three methods accept a `weights` argument. By default, each sequence has equal weight (`weights = 1`).
When you supply a weight vector, the clustering objective changes:

* Distances from each sequence to its assigned medoid are **multiplied by its weight**.
* Heavier weights make a sequence more influential when choosing medoids and forming clusters.
* In extreme cases, a single sequence with a very large weight can dominate cluster formation.

This makes weighted K-Medoids especially useful when working with survey data, stratified samples, or aggregated sequences where some units represent larger populations than others.

### Practical guidance

* If you want **population-representative clusters**, always pass the survey or design weights.
* If you only care about the **structure of your sample**, you can ignore weights and treat all sequences equally.
* For large datasets, try **PAMonce** first for speed, and switch to **PAM** if you need more precise partitions.
* Use the `npass` parameter to control how many random restarts are attempted. More passes increase stability at the cost of runtime.

### K-Medoids / PAM / PAMonce: Weighted vs. unweighted (toy example)

Below is a minimal, self-contained example that you can run without computing sequence distances first (we use a small hand-crafted dissimilarity matrix). It demonstrates three things:

1. How to call KMedoids, PAM, and PAMonce
2. How to pass a weight vector
3. How weights can change the chosen medoids and assignments

#### Setup

```python
import numpy as np
from sequenzo.clustering.KMedoids import KMedoids

# For reproducible random initializations
np.random.seed(42)
```

#### A tiny distance matrix with two natural groups

We build an 8×8 distance matrix with two tight groups:

* Group A: indices 0–3
* Group B: indices 4–7

And we place a mild cross-group separation so that, without weights, both groups are equally plausible.

```python
# 8 objects, 2 natural groups of size 4
n = 8
D = np.zeros((n, n), dtype=float)

# Intra-group distances are small
for i in range(4):
    for j in range(4):
        if i != j:
            D[i, j] = 0.3  # Group A (0-3)

for i in range(4, 8):
    for j in range(4, 8):
        if i != j:
            D[i, j] = 0.3  # Group B (4-7)

# Cross-group distances are larger, but not huge
for i in range(4):
    for j in range(4, 8):
        D[i, j] = D[j, i] = 1.0

# Sanity: zero diagonal
np.fill_diagonal(D, 0.0)

print("Distance matrix D:\n", np.round(D, 2))
```

#### Case 1: PAMonce (fast), unweighted

```python
k = 2
labels_unweighted = KMedoids(
    diss=D,
    k=k,
    method="PAMonce",  # fast one-pass refinement
    npass=10,          # 10 random restarts; increase for extra stability
    weights=None       # None -> all ones (equal weights)
)

print("\n[PAMonce | unweighted] cluster labels:", labels_unweighted)
```

#### Case 2: PAMonce, weighted

Now we give one object a very large weight, making it represent a much bigger share of the population. This often changes which medoids are optimal and can flip some assignments.

```python
# Everyone weight=1, except object #6 (index 6) is very heavy
w = np.ones(n, dtype=float)
w[6] = 50.0

labels_weighted = KMedoids(
    diss=D,
    k=k,
    method="PAMonce",
    npass=10,
    weights=w
)

print("[PAMonce | weighted]   cluster labels:", labels_weighted)
print("Weights:", w)
```

**What to expect:**

* Unweighted: two balanced clusters (0–3) vs. (4–7).
* Weighted: the algorithm prefers solutions that keep the heavy object (#6) close to its medoid; the chosen medoids and the final partition can shift accordingly (e.g., the medoid inside 4–7 might move closer to #6, or #6 can “pull” a borderline case across the split).

#### Case 3: Full PAM (more thorough), weighted

`PAM` explores more swaps/refinements than `PAMonce`. It’s slower but can yield higher-quality partitions. If you have time, compare:

```python
labels_pam_weighted = KMedoids(
    diss=D,
    k=k,
    method="PAM",   # more thorough than PAMonce
    npass=5,        # a few restarts (increase for large datasets)
    weights=w
)
print("[PAM | weighted]        cluster labels:", labels_pam_weighted)
```

#### Case 4: Classic KMedoids, weighted

This is the textbook variant; it iterates swaps until no improvement is possible (given the current run), typically between `PAMonce` and `PAM` in cost/speed profile depending on implementation details.

```python
labels_kmedoids_weighted = KMedoids(
    diss=D,
    k=k,
    method="KMedoids",
    npass=5,
    weights=w
)
print("[KMedoids | weighted]   cluster labels:", labels_kmedoids_weighted)
```

#### Interpreting results

* All three variants **accept weights** and **use them in the objective** (each object’s dissimilarity to its medoid is multiplied by its weight).
* If you set one or a few **very large weights**, those objects will **strongly influence** the medoid choice and the final partition.
* For **large datasets**, start with **PAMonce** for speed. If needed, validate with **PAM** on a subset or with fewer passes.
* If your downstream analysis requires population-representative clusters (e.g., survey data), pass the **survey/design weights** here. If you care only about the sample’s internal structure, you can safely omit weights.

> Tip: For reproducibility, set `np.random.seed(...)` and use a non-zero `npass` (multiple restarts) to reduce sensitivity to initialization.

#### Using initial medoids (optional)

If you already have good candidate medoids (e.g., from domain knowledge or a warm start), you can pass them via `initialclust`:

```python
# Suppose we want to start from medoids at indices [1, 6]
labels_from_init = KMedoids(
    diss=D,
    k=2,
    method="PAMonce",
    initialclust=[1, 6],  # medoid indices (0-based)
    npass=0,              # skip random restarts when you trust the init
    weights=w
)
print("[PAMonce | weighted | init=[1,6]] labels:", labels_from_init)
```

When `initialclust` is provided as a **membership vector** (one label per object) or as a **hierarchical linkage** matrix, Sequenzo will convert it to starting medoids internally (see the docstring for details). This is handy when you want to “lift” a solution found on a subsample to the full dataset.

*Author: Yuqi Liang*,
*Translate: Sizhu Qu*

