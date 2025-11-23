# Check Uniqueness Rate

In our framework of big sequence data analysis, we highlight **four key elements** that determine computational complexity:

1. **Number of sequences** - How many individuals/entities you're analyzing
2. **Number of time points** - The length of each sequence
3. **Number of states** - The variety of possible states at each time point
4. **Uniqueness rate** - The proportion of distinct trajectories (unique sequences)

The first three elements are straightforward: each contributes directly to the combinatorial growth of pairwise comparisons and the dynamic programming steps involved in computing dissimilarities.

The fourth element, **uniqueness rate**, is less widely recognized but proves **crucial in practice**. Understanding uniqueness rate helps you estimate the computational cost of analyzing your dataset and optimize your analysis workflow.

## Why Uniqueness Rate Matters

Sequence analysis software, including both TraMineR and Sequenzo, does **not** compute distances across all sequences one by one. Instead, to increase computational efficiency, it:

1. **First identifies the set of unique sequences** - Groups sequences that are identical
2. **Computes pairwise dissimilarities only among this reduced set** - Only calculates distances for unique sequences
3. **Expands the resulting distance matrix back to the full dataset** - Reuses computed distances for identical sequences

This means that when many individuals share identical trajectories, the effective workload can be **dramatically smaller** than what the nominal sample size would suggest.

## How It Works: Example

Consider three individuals with three-year sequences:
- Individual 1: `AAB`
- Individual 2: `AAB` (identical to Individual 1)
- Individual 3: `BBC`

The uniqueness rate is **2/3 = 0.667** (2 unique sequences out of 3 total).

Although we have three individuals, the software only needs to compute distances for the **two distinct trajectories**: `AAB` and `BBC`. The distance between the two identical `AAB` sequences does not need to be computed twice. Instead, the algorithm:

- Computes the distance once for `AAB → BBC`
- Computes the distance once for `BBC → AAB` (because most distance metrics are symmetric)

After that, both individuals who follow the `AAB` pattern will inherit the same set of distances. In other words, the algorithm does not spend extra time on duplicates; they are handled by reusing the distance results that have already been calculated.

## Computational Impact in Large Datasets

In large datasets, the implications are **much more substantial**.

### Low Uniqueness Rate (High Efficiency)

A dataset with **50,000 individuals** might appear computationally heavy, but if only **4,000 distinct trajectories** exist (uniqueness rate = 0.08), the algorithm only needs to perform dynamic programming on these 4,000 unique sequences.

**Calculation reduction:**
- **Naive approach:** 50,000 × 50,000 = 2.5 billion comparisons
- **Optimized approach:** ~4,000 × 4,000 = 16 million comparisons
- **Reduction factor:** Almost **150 times fewer operations**

The computational cost drops by an order of magnitude because repeated trajectories do not require repeated calculations; once the distances for each unique sequence have been computed, the results are expanded back to all individuals who share that same trajectory, without any additional computation.

**When this happens:**
- Short sequences with few states (e.g., 3-year employment sequences with 3 states)
- Populations with common life patterns (e.g., most people follow similar career trajectories)
- Categorical sequences with limited variety (e.g., marital status over time)

### High Uniqueness Rate (High Computational Cost)

Conversely, datasets with **very high uniqueness rates** provide little opportunity for this reduction. If almost every individual has a different trajectory, then nearly all sequences must be compared with nearly all others.

**Example:**
- **50,000 sequences** with **48,000 unique trajectories** (uniqueness rate = 0.96)
- The algorithm must essentially compute distances among all 48,000 unique trajectories
- This requires roughly **48,000 × 48,000** dynamic programming operations (2.3 billion comparisons)
- This is computationally intensive and can exceed the memory capacity of standard personal computers

**When this happens:**
- Long sequences with many states (e.g., 20-year sequences with 10+ states)
- Highly diverse populations (e.g., each person has a unique career path)
- Continuous or near-continuous state spaces that create many unique patterns

## Function Usage

The `check_uniqueness_rate()` method is available on any `SequenceData` object. It computes uniqueness statistics for your sequence dataset.

A minimal example with only the required parameters (sufficient for most use cases):

```python
stats = sequence_data.check_uniqueness_rate()
```

A complete example with all available parameters (for advanced customization):

```python
stats = sequence_data.check_uniqueness_rate(
    weighted=False   # optional, default = False
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `weighted` | ✗        | bool           | If `True`, uses sequence weights to calculate weighted frequencies and uniqueness rates. If `False`, uses simple counts. Default = `False`. |

## What It Does

* Identifies unique sequence patterns in your dataset.

* Counts:
  - **n_sequences**: Total number of sequences (unweighted count)
  - **n_unique**: Number of unique sequence patterns
  - **uniqueness_rate**: Proportion of distinct sequences (n_unique / n_sequences)

* If `weighted=True`, also calculates:
  - **weighted_total**: Total weighted count
  - **weighted_uniqueness_rate**: Proportion of distinct sequences weighted by sequence weights

* Returns a dictionary with these statistics.

## Examples

### 1. Basic example (unweighted)

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData

# Example dataset
df = pd.DataFrame({
    "ID": [1, 2, 3, 4, 5],
    "Y1": ["A", "A", "A", "B", "B"],
    "Y2": ["A", "A", "B", "B", "B"],
    "Y3": ["B", "B", "B", "C", "C"]
})

time_list = ["Y1", "Y2", "Y3"]
states = ["A", "B", "C"]

sequence_data = SequenceData(df, time=time_list, states=states, id_col="ID")

# Check uniqueness rate
stats = sequence_data.check_uniqueness_rate()
print(stats)
```

Output:

```
{
    'n_sequences': 5,
    'n_unique': 4,
    'uniqueness_rate': 0.8
}
```

**Explanation:**
- 5 total sequences: `AAB`, `AAB`, `ABB`, `BBC`, `BBC`
- 4 unique sequences: `AAB`, `ABB`, `BBC` (and duplicates)
- Uniqueness rate = 4/5 = 0.8

This means only 4 unique sequences need distance calculations, not all 5.

### 2. With weighted data (`weighted=True`)

```python
# Define weights for sequences
weights = np.array([1.0, 1.0, 2.0, 1.5, 1.5])

sequence_data = SequenceData(
    df, 
    time=time_list, 
    states=states, 
    id_col="ID",
    weights=weights
)

# Check uniqueness rate with weights
stats = sequence_data.check_uniqueness_rate(weighted=True)
print(stats)
```

Output:

```
{
    'n_sequences': 5,
    'n_unique': 4,
    'uniqueness_rate': 0.8,
    'weighted_total': 7.0,
    'weighted_uniqueness_rate': 0.5714
}
```

**Explanation:**
- Total weighted count: 1.0 + 1.0 + 2.0 + 1.5 + 1.5 = 7.0
- Weighted uniqueness rate: 4 / 7.0 = 0.5714
- This accounts for the fact that some sequences (with higher weights) are more important

### 3. Real dataset example (employment sequences)

```python
stats = sequence_data.check_uniqueness_rate()
print(f"Total sequences: {stats['n_sequences']}")
print(f"Unique sequences: {stats['n_unique']}")
print(f"Uniqueness rate: {stats['uniqueness_rate']:.3f}")
```

Output:

```
Total sequences: 50000
Unique sequences: 4000
Uniqueness rate: 0.080
```

**Interpretation:**
- Your dataset has 50,000 sequences
- Only 4,000 are unique (uniqueness rate = 0.08 = 8%)
- This means distance calculations will be approximately **150 times faster** than if all sequences were unique
- The effective computational cost is closer to analyzing 4,000 sequences rather than 50,000

## Interpreting Results

### Low Uniqueness Rate (< 0.2)
- **Efficiency:** Very high - Most sequences are duplicates
- **Computation:** Dramatically reduced (e.g., 10-150× fewer operations)
- **Recommendation:** Standard distance matrix computation is feasible even for large datasets

### Medium Uniqueness Rate (0.2 - 0.7)
- **Efficiency:** Moderate - Some duplicate sequences
- **Computation:** Meaningful reduction (e.g., 2-10× fewer operations)

### High Uniqueness Rate (> 0.7)
- **Efficiency:** Low - Few duplicate sequences
- **Computation:** Minimal reduction (close to full matrix)
- **Recommendation:** Consider CLARA or other sampling-based methods for datasets with > 10,000 sequences

**Note:** For data with medium and high uniqueness rates, specific recommendations depend on the combination of all four key elements (number of sequences, time points, states, and uniqueness rate). For example, a dataset with 10,000 sequences and a uniqueness rate of 0.8 may still be manageable, while a dataset with 100,000 sequences and the same uniqueness rate would likely require sampling-based methods such as CLARA or running the analysis on a server, such as Google Cloud Platform (GCP) or Amazon Web Services (AWS). 

## Best Practices

1. **Always check uniqueness rate before large analyses** - It helps you estimate computational cost

2. **Monitor uniqueness rate across different subsets** - Different groups (e.g., by gender, region) may have different uniqueness rates

3. **Use weighted uniqueness rate** when working with survey weights - This gives you a better sense of effective computational cost

## Notes and Tips

* The uniqueness rate is computed using efficient NumPy operations, so it's fast even for large datasets (millions of sequences).

* Missing values are handled automatically - Sequences with missing values at different positions are considered unique.

* The function returns both weighted and unweighted statistics when `weighted=True`, allowing you to compare both perspectives.

## Author
Code: Yuqi Liang

Documentation: Yuqi Liang
