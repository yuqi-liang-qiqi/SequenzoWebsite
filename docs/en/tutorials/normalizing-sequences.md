# Normalization in Sequence Analysis: A Comprehensive Guide

## Introduction

When comparing sequences, whether they represent career trajectories, family formation patterns, or health states, the raw distances you compute can be misleading. A distance of 10 between two short sequences might mean something very different than a distance of 10 between two long sequences. **Normalization** solves this problem by rescaling distances to a common, interpretable scale.

This tutorial explains what normalization is, why it matters, when to use it, and how different normalization methods work. We'll draw on key literature in sequence analysis and show how Sequenzo implements these methods, including the Elzinga & Studer (2019) method that TraMineR doesn't yet offer.

## What is Normalization?

**Normalization** is the process of rescaling distance values so they lie on a common, bounded scale (typically between 0 and 1). This makes distances comparable across sequences of different lengths and contexts.

### The Core Problem

Raw distances are **scale-dependent**. Consider these examples:

- **Sequence length**: A distance of 5 between sequences of length 10 is very different from a distance of 5 between sequences of length 100.
- **Alphabet size**: Sequences with 3 possible states have different maximum possible distances than sequences with 10 states.
- **Context**: Distances computed for one cohort or region may not be directly comparable to distances from another.

Without normalization, you can't meaningfully interpret whether two sequences are "very different" or "somewhat similar" just by looking at the raw distance number.

### The Goal of Normalization

Normalization transforms distances so that:

1. **They are bounded** (typically to [0, 1])
2. **They are comparable** across different sequence lengths and contexts
3. **They preserve the metric properties** (like the triangle inequality) when possible
4. **They can be directly interpreted as dissimilarity**, with similarity = 1 - normalized distance

## Why Normalize? The Theoretical Foundation

### Distance vs. Similarity: A Fundamental Relationship

In their 2019 paper, Elzinga and Studer explore a crucial insight: **distance and similarity are not simply opposites**. Raw distances don't automatically translate to meaningful similarity judgments.

They demonstrate this with a striking example (Figure 1 in their paper): when plotting raw distances against similarities for the same sequence pairs, the correlation is only -0.29. However, after proper normalization, the correlation jumps to 0.75. This shows that **normalization is essential for making distance interpretable as dissimilarity**.

### The Axiomatic Approach

Elzinga and Studer (2019) establish that proper normalization should satisfy the **metric axioms**:

- **D1**: $d(x,x) = 0$ (one location per object)
- **D2**: $d(x,y) > 0$ if $x \neq y$ (one object per location)
- **D3**: $d(x,y) = d(y,x)$ (symmetry)
- **D4**: $d(x,y) \leq d(x,z) + d(z,y)$ (triangle inequality)

The triangle inequality (D4) is particularly important: it ensures that the distance space is "smooth" and that new data points are constrained by existing observations. This makes the metric **generalizable** beyond the specific dataset.

### When Normalization Reveals Hidden Patterns

The 2019 paper provides a compelling real-world example. When studying destandardization of life courses across birth cohorts, the researchers found that:

- **Raw distances** decreased with cohort age (contradicting expectations)
- **Raw similarities** also decreased (also contradicting expectations)
- **Normalized distances** correctly increased with cohort age, revealing that younger cohorts were indeed more diverse

This happened because younger cohorts had longer, more complex sequences with more features overall. Normalization accounted for this complexity, revealing the true pattern of destandardization.

## When to Use Normalization

### 1. Sequences of Different Lengths

When your sequences vary in length, normalization is essential. For example:

- **DSS sequences** (Distinct Subsequent Subsequences): When analyzing sequences while ignoring durations, sequences can have dramatically different lengths. A sequence representing uninterrupted unemployment has only one element, while a sequence alternating between employment and unemployment may have many elements.

- **Censored data**: If sequences are censored at different time points, normalization helps account for these differences (though missing data should ideally be handled through imputation, not normalization).

### 2. Comparing Across Contexts

Normalization enables meaningful comparisons when:

- **Comparing cohorts**: As in the Elzinga & Studer (2019) example, you want to compare average distances between sequences from different birth cohorts.
- **Comparing regions**: Analyzing sequences from different countries or regions where sequence lengths or complexity might differ.
- **Comparing epochs**: Studying how sequence patterns change over time periods.

### 3. Focusing on Deviations from a Template

You can use normalization to emphasize how sequences deviate from a particular reference:

- **Template sequences**: For example, comparing all sequences to an "ideal" career path (e.g., uninterrupted employment) or a normative life course pattern.
- **Medoid sequences**: Using a medoid (the sequence with minimum average distance to all others) as a reference point.

### 4. Making Distances Interpretable as Similarity

If you want to interpret distances as dissimilarity (where similarity = 1 - distance), proper normalization is required. This is particularly useful for:

- **Visualization**: Creating plots where proximity directly represents similarity
- **Clustering**: Using normalized distances in clustering algorithms
- **Interpretation**: Communicating results to non-technical audiences

## Normalization Methods: A Historical Overview

Different normalization methods have been proposed over the years, each with different properties and use cases. Let's explore the main approaches.

### Early Approaches: Simple but Problematic

#### Abbott's Normalization (maxlength)

**Proposed by**: Abbott and Forrest (1986), popularized in TraMineR (Gabadinho et al. 2011)

**Formula**: 
$$D(x,y) = \frac{d(x,y)}{\max\{|x|, |y|\}}$$

**How it works**: Divides the distance by the length of the longest sequence.

**Properties**:
- Simple and intuitive
- **Problem**: Does not map to [0, 1] in general
- **Problem**: May violate the triangle inequality (TI)
- **Problem**: Maximum normalized distance can exceed 1 (e.g., for OM with indel=1 and substitution=2, max distance = 2)

**Used for**: OM, HAM, DHD in TraMineR

**Example**: If sequence x has length 10 and sequence y has length 20, and their distance is 15, the normalized distance is 15/20 = 0.75.

#### Elzinga's Geometric Mean Normalization (gmean)

**Proposed by**: Elzinga (2007b), implemented in TraMineR

**Formula**: For similarity-based measures, first normalize similarity:
$$s_A(x,y) = \frac{A(x,y)}{\sqrt{A(x,x) \cdot A(y,y)}}$$

Then convert to normalized distance:
$$D_A(x,y) = 1 - s_A(x,y)$$

**How it works**: Uses the geometric mean of self-similarities to normalize.

**Properties**:
- Maps to [0, 1]
- Works well for common-prefix measures (LCP, RLCP, LCS)
- **Problem**: May violate triangle inequality in some cases

**Used for**: LCS, LCP, RLCP and their variants in TraMineR

#### Maximum Distance Normalization (maxdist)

**Proposed by**: Various authors, implemented in TraMineR

**Formula**: 
$$D(x,y) = \frac{d(x,y)}{d_{max}(x,y)}$$

where $d_{max}(x,y)$ is the theoretical maximum distance between sequences x and y.

**How it works**: Divides by the theoretical maximum possible distance for that pair.

**Properties**:
- Maps to [0, 1] in theory
- **Problem**: May violate triangle inequality
- Requires computing theoretical maximum, which can be complex

**Used for**: LCPspell, RLCPspell (where gmean can yield negative distances)

**Example**: For OM, the theoretical maximum is:
$$d_{max} = \min(\ell_x, \ell_y) \cdot \min(2c_I, \max(S)) + c_I |\ell_x - \ell_y|$$

where $c_I$ is the indel cost and $\max(S)$ is the maximum substitution cost.

### The Yujian-Bo Correction

**Proposed by**: Yujian and Bo (2007)

**How it works**: A mathematical correction specifically designed for edit distances to preserve metric properties better than simple division.

**Properties**:
- Better preserves metric properties than maxlength
- Designed specifically for edit-based distances

**Used for**: Various OM variants (OMloc, OMslen, OMspell, etc.) in Sequenzo

### The Breakthrough: Elzinga & Studer (2019) Normalization

**Proposed by**: Elzinga and Studer (2019) in "Normalization of Distance and Similarity in Sequence Analysis"

**Formula**:
$$D_r(x,y) = \frac{d(x,y)}{(d(x,y) + d(x,r) + d(y,r))/2}$$

where $r$ is a reference object (often the empty sequence $\lambda$).

**How it works**: 
- Projects all objects onto an $r$-centered unit sphere
- Controls for variation in distances to the reference object
- For all $x \neq r$, we have $D_r(x,r) = 1$

**Key Properties**:
- **Maps to [0, 1]** for all pairs
- **Preserves all metric axioms** (D1-D4), including triangle inequality
- **Direct interpretability**: Similarity = 1 - normalized distance
- **Theoretical foundation**: Based on axiomatic similarity theory

**Geometric Interpretation**: Normalization projects all objects onto a unit sphere centered at the reference object $r$. This geometric transformation ensures that distances are measured in a normalized space where they can be directly interpreted as dissimilarity.

**When to use**:
- When you need proper metric properties preserved
- When comparing across cohorts/contexts (as in the destandardization example)
- When analyzing DSS sequences (use empty sequence as reference)
- When you want similarity = 1 - distance to hold exactly

**Important Note**: This method requires choosing a reference object. Common choices:
- **Empty sequence** ($\lambda$): Useful for DSS analysis, accounts for sequence complexity
- **Medoid sequence**: The sequence with minimum average distance to all others
- **Template sequence**: A specific sequence representing an ideal or normative pattern

## Normalization in Sequenzo

Sequenzo implements all the normalization methods discussed above, plus the Elzinga & Studer (2019) method that TraMineR doesn't yet offer.

### Available Normalization Methods

| Method | Code | When Used (auto) | Properties |
|--------|------|------------------|------------|
| None | `"none"` | Never (manual only) | Raw distances, no normalization |
| Max Length | `"maxlength"` | OM, HAM, DHD | Simple, may violate TI |
| Geometric Mean | `"gmean"` | LCS, LCP, RLCP variants | Good for prefix measures |
| Max Distance | `"maxdist"` | LCPspell, RLCPspell | Theoretical maximum |
| Yujian-Bo | `"YujianBo"` | OM variants (OMspell, etc.) | Edit distance correction |
| **Elzinga-Studer** | `"ElzingaStuder"` | Manual only | **Preserves all metric axioms** ✅ |
| Auto | `"auto"` | Default | Selects best method per distance measure |

### Using Normalization in Sequenzo

#### Basic Usage

```python
from sequenzo import SequenceData, get_distance_matrix

# Load your sequences
seqdata = SequenceData.from_dataframe(df, id_col='id', state_cols=['t1', 't2', ...])

# Automatic normalization (recommended for most users)
dist_matrix = get_distance_matrix(
    seqdata=seqdata,
    method="OM",
    norm="auto"  # Sequenzo selects the best normalization method
)
```

#### Using Elzinga-Studer Normalization

```python
# Use the 2019 Elzinga & Studer method (not available in TraMineR)
dist_matrix = get_distance_matrix(
    seqdata=seqdata,
    method="OM",
    norm="ElzingaStuder",
    normalization_reference_index=0  # Use first sequence as reference
    # Or use empty sequence: normalization_reference_index=None (defaults to 0 if empty exists)
)

# For DSS analysis, use empty sequence as reference
dss_sequences = seqdata.to_dss()  # Convert to distinct subsequent subsequences
dist_matrix_dss = get_distance_matrix(
    seqdata=dss_sequences,
    method="OM",
    norm="ElzingaStuder",
    normalization_reference_index=0  # Assuming first sequence is empty
)
```

#### Manual Method Selection

```python
# Use maxlength normalization (like TraMineR's default for OM)
dist_matrix = get_distance_matrix(
    seqdata=seqdata,
    method="OM",
    norm="maxlength"
)

# Use geometric mean (like TraMineR's default for LCS)
dist_matrix = get_distance_matrix(
    seqdata=seqdata,
    method="LCS",
    norm="gmean"
)
```

### Default Normalization per Method

When using `norm="auto"`, Sequenzo selects normalization methods based on the distance measure:

| Method Family | Default Normalization | Rationale |
|---------------|----------------------|-----------|
| OM, HAM, DHD | `maxlength` | Simple division by max length |
| LCS, LCP, RLCP variants | `gmean` | Geometric mean works well for prefix measures |
| LCPspell, RLCPspell | `maxdist` | gmean can yield negative distances; maxdist is safer |
| OM variants (OMspell, etc.) | `YujianBo` | Edit distance correction preserves metric properties |
| CHI2, EUCLID | Internal normalization | Uses $\sqrt{n_{breaks}}$ internally |

### Why Sequenzo Implements Elzinga-Studer (2019)

The Elzinga & Studer (2019) normalization method represents a significant theoretical advance:

1. **Preserves Metric Properties**: Unlike earlier methods, it maintains the triangle inequality, ensuring the distance space is well-behaved.

2. **Direct Interpretability**: After normalization, similarity = 1 - distance holds exactly, making results intuitive.

3. **Proven in Practice**: The method successfully revealed hidden patterns (like destandardization) that were obscured by raw distances.

4. **Not Yet in TraMineR**: As of 2019, this method was published but not yet implemented in TraMineR. Sequenzo provides this cutting-edge capability.

## Common Pitfalls and Best Practices

### Pitfall 1: Using Normalization to Mask Missing Data

**Don't**: Use normalization to compensate for unequal censoring or missing data.

**Do**: Handle missing data through proper imputation methods (see Halpin 2012). Normalization should account for sequence complexity, not missingness.

### Pitfall 2: Assuming All Normalizations Are Equivalent

**Don't**: Assume that `maxlength`, `gmean`, and `ElzingaStuder` will give similar results.

**Do**: Understand that different normalization methods can produce different orderings of sequence pairs. Choose based on your needs:
- Need metric properties? Use `ElzingaStuder`
- Simple and fast? Use `maxlength` or `gmean`
- Working with spell-based measures? Use `maxdist` for LCPspell/RLCPspell

### Pitfall 3: Ignoring the Reference Object

**Don't**: Use `ElzingaStuder` normalization without thinking about the reference object.

**Do**: Choose your reference thoughtfully:
- **Empty sequence**: For DSS analysis, accounts for complexity
- **Medoid**: For general analysis, represents the "center" of your data
- **Template**: For specific research questions about deviations from a norm

### Pitfall 4: Normalizing When It's Not Needed

**Don't**: Always normalize without considering whether it's necessary.

**Do**: Consider normalizing when:
- Sequences have different lengths
- Comparing across contexts (cohorts, regions, epochs)
- You need interpretable similarity scores
- You're analyzing DSS sequences

You might skip normalization if:
- All sequences have the same length
- You're doing exploratory analysis and want raw distances
- The specific distance measure has built-in normalization (like CHI2, EUCLID)

### Best Practice: Start with "auto"

For most users, `norm="auto"` is the best choice. Sequenzo selects the most appropriate normalization method based on:
- The distance measure you're using
- Theoretical properties of the method
- Common practices in the literature

You can always override with a specific method if you have a good reason.

## Real-World Example: Destandardization of Life Courses

Let's walk through the example from Elzinga & Studer (2019) to see normalization in action.

### The Research Question

Are life courses becoming more diverse (destandardized) across birth cohorts?

### The Data

- 5,287 Dutch individuals born 1945-1989
- Household histories encoded as sequences
- Three birth cohorts: <1955, 1955-1964, 1965-1974

### Without Normalization

| Cohort | Average Distance | Average Similarity |
|--------|------------------|-------------------|
| <1955 | 2.24 | 4.90 |
| 1955-1964 | 2.93 | 4.95 |
| 1965-1974 | 3.44 | 5.21 |

**Problem**: Both distances AND similarities increase with younger cohorts. This contradicts expectations—if life courses are more diverse, distances should increase but similarities should decrease.

### With Normalization (Elzinga-Studer)

| Cohort | Average Normalized Distance |
|--------|----------------------------|
| <1955 | 0.43 |
| 1955-1964 | 0.51 |
| 1965-1974 | 0.54 |

**Solution**: Normalized distances correctly increase, revealing destandardization. The normalization accounts for the fact that younger cohorts have longer, more complex sequences with more features overall.

### Why This Happened

Younger cohorts had:
- More complex sequences (higher complexity index)
- More features overall (both common and non-common)
- Longer sequences due to new phenomena (unmarried cohabitation, divorce)

Raw distances were confounded by sequence complexity. Normalization controlled for this, revealing the true pattern of increasing diversity.

## Summary: Key Takeaways

1. **Normalization rescales distances** to a common, interpretable scale (typically [0, 1])

2. **Why normalize?**
   - Makes distances comparable across different sequence lengths
   - Enables direct interpretation as dissimilarity (similarity = 1 - distance)
   - Preserves metric properties (with proper methods)
   - Reveals hidden patterns obscured by raw distances

3. **When to normalize?**
   - Sequences of different lengths
   - Comparing across contexts (cohorts, regions, epochs)
   - Analyzing DSS sequences
   - When you need interpretable similarity scores

4. **Different methods have different properties:**
   - **maxlength**: Simple but may violate triangle inequality
   - **gmean**: Good for prefix measures
   - **maxdist**: Safe for spell-based measures
   - **YujianBo**: Edit distance correction
   - **ElzingaStuder (2019)**: Preserves all metric axioms ✅

5. **Sequenzo implements the 2019 method** that TraMineR doesn't yet offer, giving you access to the latest theoretical advances.

6. **Best practice**: Start with `norm="auto"` and let Sequenzo choose, then override if needed.

## Further Reading

### Key Papers

1. **Elzinga, C. H., & Studer, M. (2019)**. "Normalization of Distance and Similarity in Sequence Analysis." *Sociological Methods & Research*, 48(4), 877-904.
   - The foundational paper on proper normalization
   - Establishes axiomatic framework
   - Demonstrates real-world application

2. **Gabadinho, A., Ritschard, G., Müller, N. S., & Studer, M. (2011)**. "Analyzing and Visualizing State Sequences in R with TraMineR." *Journal of Statistical Software*, 40(4), 1-37.
   - TraMineR's normalization methods
   - Practical implementation details

3. **Studer, M., & Ritschard, G. (2016)**. "What Matters in Differences between Life Trajectories: A Comparative Review of Sequence Dissimilarity Measures." *Journal of the Royal Statistical Society: Series A*, 179(2), 481-511.
   - Comprehensive review of distance measures
   - Discusses normalization in context

4. **Elzinga, C. H., & Studer, M. (2015)**. "Spell Sequences, State Proximities, and Distance Metrics." *Sociological Methods & Research*, 44(1), 3-47.
   - Discusses normalization for spell-based measures
   - Introduces SVRspell metric

### Sequenzo Documentation

- [Dissimilarity Measures Guide](./dissimilarity-measures.md): Overview of distance measures and normalization
- [get_distance_matrix()](../function-library/get-distance-matrix.md): Complete function reference with normalization options

## Conclusion

Normalization is not just a technical detail—it's fundamental to making sequence distances interpretable and comparable. The field has evolved from simple division methods to theoretically grounded approaches that preserve metric properties. The 2019 Elzinga & Studer method represents the current state of the art, and Sequenzo makes it accessible to researchers.

By understanding what normalization is, why it matters, and when to use it, you can make more informed choices in your sequence analysis and avoid common pitfalls. Start with `norm="auto"` for most cases, but don't hesitate to explore the Elzinga-Studer method when you need proper metric properties or are comparing across contexts.

Happy analyzing! 🎯

---

*Author: Yuqi Liang*