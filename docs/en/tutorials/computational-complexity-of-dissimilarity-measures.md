# Computational Complexity of Dissimilarity Measures: A Comprehensive Guide

## Introduction

When comparing sequences, whether they represent career trajectories, family formation patterns, or health states, you need efficient algorithms that can scale to relatively large datasets. **Computational complexity** tells you how the runtime of an algorithm grows as your data grows, helping you choose the right dissimilarity measure for your problem size.

This tutorial explains what computational complexity is, why it matters (especially for big data), and provides a detailed breakdown of the complexity of different dissimilarity measures implemented in Sequenzo. We'll start with the fundamentals and then dive into specific algorithms, showing you exactly how to analyze their performance.

## What is Computational Complexity?

**Computational complexity** (also called **time complexity**) describes how the runtime of an algorithm increases as the size of the input increases. It's expressed using **Big O notation**, which focuses on the dominant term and ignores constants and lower-order terms.

### Key Concepts

#### Big O Notation

Big O notation describes the **worst-case** or **average-case** behavior of an algorithm:

- **O(1)**: Constant time—runtime doesn't depend on input size
- **O(log n)**: Logarithmic time—runtime grows slowly (e.g., binary search)
- **O(n)**: Linear time—runtime grows proportionally with input size
- **O(n log n)**: Linearithmic time—common in efficient sorting algorithms
- **O(n²)**: Quadratic time—runtime grows with the square of input size
- **O(n³)**: Cubic time—runtime grows with the cube of input size
- **O(2ⁿ)**: Exponential time—runtime doubles with each additional input element

#### Space Complexity

**Space complexity** describes how much memory an algorithm needs. It's also expressed in Big O notation and follows the same principles as time complexity.

### What Complexity Includes

When analyzing dissimilarity measures, complexity includes:

1. **Per-pair computation**: The cost of comparing two sequences
2. **Pairwise matrix construction**: The cost of computing all pairwise distances
3. **Preprocessing**: Any setup costs (e.g., building substitution cost matrices)
4. **Memory usage**: Storage requirements for intermediate results

### Why Complexity Matters: The Big Data Perspective

Understanding complexity becomes **critical** when working with large datasets:

#### The Scaling Problem

Consider computing a distance matrix for sequences:

- **Small dataset** (100 sequences): ~5,000 pairwise comparisons
- **Medium dataset** (1,000 sequences): ~500,000 pairwise comparisons  
- **Large dataset** (10,000 sequences): ~50,000,000 pairwise comparisons

If each comparison takes 1 millisecond:
- Small: 5 seconds
- Medium: 8.3 minutes
- Large: **13.9 hours**

But if the algorithm is O(n²) per pair instead of O(n), and sequences average 50 elements:
- Small: 5 seconds × 50 = 4.2 minutes
- Medium: 8.3 minutes × 50 = **6.9 hours**
- Large: 13.9 hours × 50 = **29 days**

#### Real-World Impact

1. **Resource constraints**: Memory and CPU limits become bottlenecks
2. **User experience**: Long wait times make interactive analysis impossible
3. **Cost**: Cloud computing costs scale with runtime
4. **Feasibility**: Some algorithms become impractical for large datasets

#### Choosing the Right Algorithm

Understanding complexity helps you:

- **Select appropriate measures** for your dataset size
- **Estimate runtime** before starting computation
- **Optimize workflows** by choosing faster alternatives when possible
- **Plan infrastructure** (e.g., parallelization, distributed computing)

## Classification of Dissimilarity Measures

Dissimilarity measures in Sequenzo can be classified into several categories based on their algorithmic approach:

### 1. **Edit Distance Measures**
These measures compute the minimum cost to transform one sequence into another through insertions, deletions, and substitutions.

**Examples**: OM (Optimal Matching), OMloc, OMslen, OMspell, OMstran, TWED

### 2. **Prefix/Suffix Matching Measures**
These measures compare sequences position-by-position from the start (prefix) or end (suffix).

**Examples**: LCP (Longest Common Prefix), RLCP (Reverse LCP), LCPspell, RLCPspell

### 3. **Subsequence Matching Measures**
These measures find the longest common subsequence (not necessarily contiguous).

**Examples**: LCS (Longest Common Subsequence)

### 4. **Distribution-Based Measures**
These measures compare state distributions or feature vectors rather than sequence structure.

**Examples**: CHI2 (Chi-square), EUCLID (Euclidean)

### 5. **Position-Based Measures**
These measures compare sequences element-by-element at corresponding positions.

**Examples**: HAM (Hamming distance), DHD (Dynamic Hamming Distance)

### 6. **Spell-Based Measures**
These measures operate on spell representations (consecutive state occurrences).

**Examples**: OMspell, LCPspell, NMS (Number of Matching Spells), NMSMST, SVRspell

## Complexity Summary Table

The following table summarizes the computational complexity of different dissimilarity measures. Here, **n** is the number of sequences, **m** is the average sequence length, and **k** is the number of features (for distribution-based measures).

| Measure | Per-Pair Complexity | Full Matrix Complexity | Space Complexity | Notes |
|---------|---------------------|------------------------|------------------|-------|
| **LCP / RLCP** | O(min(m₁, m₂)) | O(n² × m) | O(n²) | Linear scan, very fast |
| **HAM** | O(m) | O(n² × m) | O(n²) | Simple element-wise comparison |
| **CHI2 / EUCLID** | O(k) | O(n² × k) | O(n² + n×k) | k = number of features/columns |
| **LCS** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | Dynamic programming, quadratic per pair |
| **OM** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | Dynamic programming with substitution costs |
| **OMloc** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | OM with local spell transformation |
| **OMslen** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | OM with sequence length normalization |
| **OMspell** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | OM on spell representation |
| **OMstran** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | OM with spell transformation |
| **TWED** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | Time Warp Edit Distance |
| **DHD** | O(m₁ × m₂) | O(n² × m²) | O(n² + m²) | Dynamic Hamming Distance |
| **LCPspell / RLCPspell** | O(min(s₁, s₂)) | O(n² × s) | O(n²) | s = number of spells |
| **LCPmst / RLCPmst** | O(min(s₁, s₂)) | O(n² × s) | O(n²) | MST variant |
| **LCPprod / RLCPprod** | O(min(s₁, s₂)) | O(n² × s) | O(n²) | Product variant |
| **NMS** | O(s₁ × s₂) | O(n² × s²) | O(n² + s²) | Spell matching |
| **NMSMST** | O(s₁ × s₂) | O(n² × s²) | O(n² + s²) | MST variant |
| **SVRspell** | O(s₁ × s₂) | O(n² × s²) | O(n² + s²) | Spell-based variant |

**Key observations:**
- **Fastest**: LCP/RLCP and HAM are linear per pair
- **Moderate**: CHI2/EUCLID depend on feature count (often smaller than sequence length)
- **Slower**: Edit distance measures (OM, LCS, TWED) are quadratic per pair
- **Spell-based**: Complexity depends on number of spells, which is typically ≤ sequence length

## Detailed Algorithm Analysis

Let's examine each category of algorithms in detail, understanding why they have their specific complexities.

### Category 1: Prefix/Suffix Matching (LCP, RLCP)

**Algorithm**: Compare sequences position-by-position from the start (LCP) or end (RLCP) until finding the first mismatch.

**Complexity Analysis**:

```python
# Pseudocode for LCP
def compute_lcp(seq1, seq2):
    length = 0
    min_len = min(len(seq1), len(seq2))
    
    # Linear scan: O(min(len(seq1), len(seq2)))
    while length < min_len and seq1[length] == seq2[length]:
        length += 1
    
    return length
```

**Why O(min(m₁, m₂))?**
- We scan at most `min(len(seq1), len(seq2))` positions
- Each comparison is O(1)
- We stop at the first mismatch

**Real Implementation** (from `LCPdistance.cpp`):

```cpp
double compute_distance(int is, int js) {
    int m = len;
    int n = len;
    int minimum = m;
    if(n < m) minimum = n;
    
    int length = 0;
    auto ptr_seq = sequences.unchecked<2>();
    
    if(sign > 0){  // LCP: forward
        while(ptr_seq(is, length) == ptr_seq(js, length) && length < minimum){
            length++;
        }
    } else{  // RLCP: backward
        length = 1;
        while(ptr_seq(is, (m - length)) == ptr_seq(js, (n - length)) && length <= minimum){
            length++;
        }
        length--;
    }
    
    return normalize_distance(n+m-2.0*length, n+m, m, n, norm);
}
```

**Performance Characteristics**:
- **Best case**: O(1) if first elements differ
- **Average case**: O(min(m₁, m₂)/2) for random sequences
- **Worst case**: O(min(m₁, m₂)) if sequences are identical or differ only at the end

**When to Use**: Very fast, good for quick comparisons or when prefix/suffix similarity is most important.

### Category 2: Element-Wise Comparison (HAM)

**Algorithm**: Compare sequences element-by-element at corresponding positions, counting mismatches.

**Complexity Analysis**:

```python
# Pseudocode for Hamming distance
def compute_hamming(seq1, seq2):
    if len(seq1) != len(seq2):
        raise ValueError("Sequences must have same length")
    
    distance = 0
    # Linear scan: O(m)
    for i in range(len(seq1)):
        if seq1[i] != seq2[i]:
            distance += 1
    
    return distance
```

**Why O(m)?**
- We examine each of the m positions exactly once
- Each comparison and increment is O(1)
- Total: m × O(1) = O(m)

**Note**: HAM requires sequences of equal length. For sequences of different lengths, DHD (Dynamic Hamming Distance) is used, which has O(m₁ × m₂) complexity due to dynamic programming alignment.

**Performance Characteristics**:
- **Best/Worst/Average**: O(m) - always linear
- **Very predictable** runtime

**When to Use**: Fastest option when sequences have equal length and you want simple position-wise comparison.

### Category 3: Distribution-Based Measures (CHI2, EUCLID)

**Algorithm**: Convert sequences to feature vectors (state distributions), then compute distance between vectors.

**Complexity Analysis**:

```python
# Pseudocode for CHI2/EUCLID
def compute_chi2(seq1_features, seq2_features, pdotj):
    """
    seq1_features: vector of length k (feature counts/proportions)
    seq2_features: vector of length k
    pdotj: marginal weights of length k
    """
    distance = 0.0
    
    # Linear scan over features: O(k)
    for i in range(k):
        diff = seq1_features[i] - seq2_features[i]
        if pdotj[i] > 0:
            distance += (diff * diff) / pdotj[i]
    
    return sqrt(distance)
```

**Why O(k)?**
- k is the number of features (columns in the feature matrix)
- We iterate through k features once
- Each operation (subtraction, multiplication, division) is O(1)
- Total: k × O(1) = O(k)

**Real Implementation** (from `CHI2distance.cpp`):

```cpp
double compute_distance(int i, int j) const {
    auto am = allmat_.unchecked<2>();
    auto pj = pdotj_.unchecked<1>();
    double sum = 0.0;
    
    // O(k) loop over features
    for (int c = 0; c < n_cols_; c++) {
        double d = am(i, c) - am(j, c);
        double m = pj(c);
        if (m > 0.0)
            sum += (d * d) / m;
    }
    return std::sqrt(sum);
}
```

**Preprocessing Cost**:
- Building feature matrix: O(n × m × k) - one-time cost
- Often k << m (fewer features than sequence length), making this efficient

**Performance Characteristics**:
- **Per-pair**: O(k) where k is typically much smaller than m
- **Preprocessing**: O(n × m × k) but done once
- **Very efficient** when k is small (e.g., k = number of states)

**When to Use**: Excellent for large datasets when you care about state distributions rather than exact sequence structure.

### Category 4: Dynamic Programming Edit Distances (OM, LCS, TWED)

**Algorithm**: Use dynamic programming to find the minimum cost alignment between two sequences.

**Complexity Analysis**:

#### Optimal Matching (OM)

```python
# Pseudocode for OM (simplified)
def compute_om(seq1, seq2, sm, indel):
    m, n = len(seq1), len(seq2)
    
    # DP table: dp[i][j] = min cost to align seq1[0:i] with seq2[0:j]
    dp = [[0] * (n+1) for _ in range(m+1)]
    
    # Initialize: cost of aligning empty prefixes
    for i in range(1, m+1):
        dp[i][0] = dp[i-1][0] + indel  # deletions
    for j in range(1, n+1):
        dp[0][j] = dp[0][j-1] + indel  # insertions
    
    # Fill DP table: O(m × n)
    for i in range(1, m+1):
        for j in range(1, n+1):
            # Three operations:
            # 1. Substitute: dp[i-1][j-1] + sm[seq1[i-1]][seq2[j-1]]
            # 2. Delete: dp[i-1][j] + indel
            # 3. Insert: dp[i][j-1] + indel
            dp[i][j] = min(
                dp[i-1][j-1] + sm[seq1[i-1]][seq2[j-1]],  # substitution
                dp[i-1][j] + indel,                        # deletion
                dp[i][j-1] + indel                         # insertion
            )
    
    return dp[m][n]
```

**Why O(m₁ × m₂)?**
- We fill a DP table of size (m+1) × (n+1)
- Each cell requires O(1) computation (three comparisons)
- Total: (m+1) × (n+1) × O(1) = O(m × n)

**Real Implementation** (from `OMdistance.cpp`):

The actual implementation includes optimizations:
- **Common prefix/suffix skipping**: Reduces effective m and n
- **Two-row DP**: Uses O(min(m,n)) space instead of O(m×n) by keeping only previous and current rows
- **State-dependent indel costs**: Adds O(1) overhead per cell

```cpp
double compute_distance(int is, int js, double* prev, double* curr) {
    // ... prefix/suffix skipping ...
    
    // Fill DP table: O(m × n) where m, n are effective lengths
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            // Three-way minimum computation
            double sub_cost = prev[j-1] + get_substitution_cost(...);
            double del_cost = prev[j] + get_indel(...);
            double ins_cost = curr[j-1] + get_indel(...);
            curr[j] = std::min({sub_cost, del_cost, ins_cost});
        }
        // Swap prev and curr
    }
    
    return normalize_distance(...);
}
```

#### Longest Common Subsequence (LCS)

LCS uses the same DP structure but simpler costs:

```python
# Pseudocode for LCS
def compute_lcs(seq1, seq2):
    m, n = len(seq1), len(seq2)
    dp = [[0] * (n+1) for _ in range(m+1)]
    
    # O(m × n) DP table fill
    for i in range(1, m+1):
        for j in range(1, n+1):
            if seq1[i-1] == seq2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1  # match
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])  # skip one
    
    # Distance = m + n - 2 * LCS_length
    return m + n - 2 * dp[m][n]
```

**Complexity**: O(m₁ × m₂) - same as OM, but slightly faster due to simpler operations (no substitution cost lookup).

**Real Implementation** (from `LCSdistance.cpp`):

```cpp
int compute_LCS_length(int is, int js) {
    const int m = ptr_len(is);
    const int n = ptr_len(js);
    if (m == 0 || n == 0) return 0;
    
    // Two-row DP: O(min(m,n)) space
    std::vector<int> prev(n + 1, 0);
    std::vector<int> curr(n + 1, 0);
    
    // O(m × n) time
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (si == sj) {
                curr[j] = 1 + prev[j - 1];
            } else {
                curr[j] = std::max(prev[j], curr[j - 1]);
            }
        }
        prev = curr;  // Move to next row
    }
    
    return prev[n];
}
```

#### Time Warp Edit Distance (TWED)

TWED extends OM with time warping, adding a stiffness parameter:

**Complexity**: O(m₁ × m₂) - same DP structure as OM, but with additional time warping calculations per cell.

**Real Implementation** (from `TWEDdistance.cpp`):

The implementation follows the same DP pattern but includes:
- Time warping constraints
- Stiffness parameter (ν)
- Gap penalty (λ)

**Performance Characteristics** (for all DP-based measures):
- **Best case**: O(min(m₁, m₂)) with aggressive prefix/suffix skipping
- **Average case**: O(m₁ × m₂)
- **Worst case**: O(m₁ × m₂) when sequences are completely different
- **Space**: Can be optimized to O(min(m₁, m₂)) using two-row DP

**When to Use**: 
- **OM**: Most flexible, handles insertions, deletions, substitutions
- **LCS**: Faster than OM when you only care about subsequence matching
- **TWED**: When temporal alignment matters (e.g., time series)

---

### Category 5: Spell-Based Measures

**Algorithm**: Convert sequences to spell representation (consecutive state occurrences), then compare spells.

**Complexity Analysis**:

#### LCPspell / RLCPspell

```python
# Pseudocode for LCPspell
def compute_lcp_spell(seq1_spells, seq2_spells):
    """
    seq1_spells: list of (state, duration) tuples
    seq2_spells: list of (state, duration) tuples
    """
    length = 0
    min_spells = min(len(seq1_spells), len(seq2_spells))
    
    # Linear scan: O(min(s₁, s₂)) where s = number of spells
    while length < min_spells and seq1_spells[length][0] == seq2_spells[length][0]:
        length += 1
    
    return length
```

**Why O(min(s₁, s₂))?**
- s₁, s₂ are the number of spells (typically ≤ sequence length)
- Same linear scan as LCP, but on spells instead of positions
- Often faster than position-based LCP because s ≤ m

#### OMspell

```python
# Pseudocode for OMspell
def compute_om_spell(seq1_spells, seq2_spells, sm, indel):
    s1, s2 = len(seq1_spells), len(seq2_spells)
    
    # DP table: O(s₁ × s₂)
    dp = [[0] * (s2+1) for _ in range(s1+1)]
    
    # Same DP structure as OM, but on spells
    for i in range(1, s1+1):
        for j in range(1, s2+1):
            # Spell substitution, deletion, insertion
            dp[i][j] = min(
                dp[i-1][j-1] + spell_substitution_cost(...),
                dp[i-1][j] + spell_deletion_cost(...),
                dp[i][j-1] + spell_insertion_cost(...)
            )
    
    return dp[s1][s2]
```

**Why O(s₁ × s₂)?**
- Same DP structure as OM, but operating on spells
- Typically faster than OM because s ≤ m (fewer spells than positions)

**Performance Characteristics**:
- **Spell conversion**: O(m) one-time cost per sequence
- **LCPspell**: O(min(s₁, s₂)) per pair - very fast
- **OMspell**: O(s₁ × s₂) per pair - faster than OM when s << m

**When to Use**: 
- When spell structure matters more than exact positions
- Often faster than position-based measures
- Good for sequences with long runs of the same state

## Full Distance Matrix Complexity

When computing a full distance matrix for n sequences, you need to compute **n(n-1)/2** pairwise distances (since the matrix is symmetric).

### General Formula

For an algorithm with per-pair complexity **O(f(m))**, the full matrix complexity is:

**O(n² × f(m))**

### Examples

1. **LCP**: O(n² × m)
   - n² pairs × O(m) per pair

2. **OM**: O(n² × m²)
   - n² pairs × O(m²) per pair

3. **CHI2**: O(n² × k + n × m × k)
   - n² pairs × O(k) per pair + O(n × m × k) preprocessing

### Parallelization

Many algorithms can be parallelized:
- **Independent pairs**: Each pairwise comparison is independent
- **Parallel speedup**: Up to P× faster with P processors
- **Complexity remains**: O(n² × f(m) / P) with P processors

## Practical Considerations

### Memory Usage

**Space complexity** matters as much as time complexity:

| Measure | Space for Full Matrix | Additional Space |
|---------|----------------------|------------------|
| LCP/RLCP | O(n²) | O(1) |
| HAM | O(n²) | O(1) |
| CHI2/EUCLID | O(n²) | O(n × k) for feature matrix |
| OM/LCS/TWED | O(n²) | O(m²) for DP table (can be O(m)) |
| Spell-based | O(n²) | O(s²) for DP table |

**Memory optimization**: 
- Use `full_matrix=False` to get a `dist` object (stores only lower triangle)
- Reduces memory by ~50%

### Optimization Techniques

1. **Prefix/Suffix Skipping**: OM variants skip common prefixes/suffixes
   - Reduces effective m, n
   - Can provide 2-10× speedup for similar sequences

2. **Early Termination**: LCP stops at first mismatch
   - Best case: O(1) instead of O(m)

3. **Two-Row DP**: OM/LCS use O(m) space instead of O(m²)
   - Enables processing longer sequences

4. **Vectorization**: C++ implementations use SIMD (xsimd) for parallel operations
   - 2-4× speedup on modern CPUs

### Choosing the Right Measure

**For small datasets** (n < 100):
- Any measure works
- Choose based on interpretability

**For medium datasets** (100 < n < 1,000):
- Prefer LCP/RLCP, HAM, or CHI2/EUCLID
- OM variants are acceptable but slower

**For large datasets** (n > 1,000):
- **Strongly prefer**: LCP/RLCP, CHI2/EUCLID
- **Avoid**: Full OM matrix computation (consider reference sequences instead)
- **Consider**: Parallelization, distributed computing

**For very long sequences** (m > 100):
- Prefer spell-based measures (s << m)
- Consider CHI2/EUCLID (k << m)

## Code Examples

### Example 1: Comparing Complexity in Practice

```python
from sequenzo import SequenceData, get_distance_matrix
import time

# Load your sequences
seqdata = SequenceData.from_dataframe(df, id_col='id', state_cols=['t1', 't2', ...])

# Fast: LCP (O(n² × m))
start = time.time()
dist_lcp = get_distance_matrix(seqdata, method="LCP", norm="auto")
time_lcp = time.time() - start
print(f"LCP took {time_lcp:.2f} seconds")

# Moderate: CHI2 (O(n² × k))
start = time.time()
dist_chi2 = get_distance_matrix(seqdata, method="CHI2", norm="auto")
time_chi2 = time.time() - start
print(f"CHI2 took {time_chi2:.2f} seconds")

# Slower: OM (O(n² × m²))
start = time.time()
dist_om = get_distance_matrix(seqdata, method="OM", sm="TRATE", norm="auto")
time_om = time.time() - start
print(f"OM took {time_om:.2f} seconds")

print(f"\nSpeedup: LCP is {time_om/time_lcp:.1f}× faster than OM")
```

### Example 2: Estimating Runtime

```python
def estimate_runtime(n_seqs, avg_seq_len, method):
    """
    Rough runtime estimates (in seconds) for different methods.
    These are approximations - actual runtime depends on hardware, 
    sequence similarity, and implementation optimizations.
    """
    n_pairs = n_seqs * (n_seqs - 1) / 2
    
    # Per-pair time estimates (microseconds) on modern hardware
    estimates = {
        "LCP": 0.1 * avg_seq_len,      # O(m)
        "HAM": 0.1 * avg_seq_len,      # O(m)
        "CHI2": 0.05 * 10,              # O(k), assume k≈10
        "LCS": 0.5 * avg_seq_len ** 2, # O(m²)
        "OM": 1.0 * avg_seq_len ** 2,  # O(m²), more complex
    }
    
    per_pair_us = estimates.get(method, 1.0 * avg_seq_len ** 2)
    total_seconds = (n_pairs * per_pair_us) / 1_000_000
    
    return total_seconds

# Estimate for 1000 sequences of length 50
n = 1000
m = 50

print(f"Estimated runtime for {n} sequences (avg length {m}):")
for method in ["LCP", "CHI2", "LCS", "OM"]:
    est = estimate_runtime(n, m, method)
    print(f"  {method:4s}: {est:6.1f} seconds ({est/60:5.1f} minutes)")
```

### Example 3: Using Reference Sequences for Large Datasets

Instead of computing the full matrix, compute distances to a reference:

```python
# Instead of full matrix: O(n² × m²)
# dist_matrix = get_distance_matrix(seqdata, method="OM", ...)  # Slow!

# Use reference sequence: O(n × m²)
dist_to_ref = get_distance_matrix(
    seqdata, 
    method="OM", 
    refseq=0,  # Compare all sequences to first sequence
    sm="TRATE",
    norm="auto"
)
# Much faster for large n!
```

## Summary

Understanding computational complexity helps you:

1. **Choose appropriate algorithms** for your dataset size
2. **Estimate runtime** before starting computations
3. **Optimize workflows** by selecting faster alternatives
4. **Plan infrastructure** (parallelization, cloud resources)

**Key Takeaways**:

- **Fastest**: LCP/RLCP, HAM (O(m) per pair)
- **Moderate**: CHI2/EUCLID (O(k) per pair, often k << m)
- **Slower**: OM, LCS, TWED (O(m²) per pair)
- **Spell-based**: Often faster than position-based (s ≤ m)

**For big data**: Prefer LCP/RLCP or CHI2/EUCLID, or use reference sequences instead of full matrices.

## Further Reading

- **Algorithm Design**: Cormen, Leiserson, Rivest, & Stein - "Introduction to Algorithms"
- **Sequence Analysis**: Gabadinho et al. (2011) - "Analyzing and Visualizing State Sequences in R with TraMineR"
- **Complexity Theory**: Sipser - "Introduction to the Theory of Computation"

For implementation details, see the source code in:
- `/sequenzo/dissimilarity_measures/src/` (C++ implementations)
- `/sequenzo/dissimilarity_measures/get_distance_matrix.py` (Python interface)

---

*Author: Yuqi Liang*