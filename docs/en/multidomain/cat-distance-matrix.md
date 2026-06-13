# `compute_cat_distance_matrix()`

`compute_cat_distance_matrix()` combines multiple sequence domains into multidomain sequences and computes distances between them using the Cost Additive Trick (CAT). This technique allows you to analyze how sequences from different domains (like employment and family status) change together over time.

When you have multiple domains measured on the same individuals over the same time periods, this function:

1. **Builds multidomain sequences:** Combines states from each domain at each time point into composite states (for example, "Employed+Married").
2. **Computes CAT costs:** Derives substitution and indel costs for these composite states by adding up the costs from individual domains.
3. **Calculates distances:** Uses these costs to compute pairwise distances between multidomain sequences using optimal matching.

The additive trick (CAT) means that the cost of substituting one multidomain state for another is a weighted sum of substitution costs across domains. Similarly, indel costs are built additively from domain-level indel costs.

In the terminology used by Ritschard et al. (2023), CAT is specifically this additive construction of multidomain costs from domain-level costs. The "combined alphabet" itself belongs to the multidomain representation, not to CAT as an acronym.

## Function Usage

A compact distance-matrix example for two domains:

```python
result = compute_cat_distance_matrix(
    channels,
    method="OM",
    sm=["CONSTANT", "CONSTANT"],
    indel=1,
    what="diss",
)
```

A complete example with all available parameters (for advanced customization):

```python
result = compute_cat_distance_matrix(
    channels,                      # required: list of SequenceData objects
    method="OM",                   # optional: dissimilarity measure
    norm="none",                   # optional: normalization method
    indel="auto",                  # optional: insertion/deletion costs
    sm=["CONSTANT", "CONSTANT"],   # required for cost/distance output
    with_missing=None,             # optional: whether to consider missing values
    full_matrix=True,              # optional: return full distance matrix
    link="sum",                    # optional: method to link domains ("sum" or "mean")
    cval=2,                        # optional: constant substitution cost
    miss_cost=2,                   # optional: cost for missing values
    cweight=None,                  # optional: domain weights
    what="diss",                   # optional: what to return
    ch_sep="+"                     # optional: separator for composite states
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `channels` | ✓ | `list[SequenceData]` | A list of `SequenceData` objects, one for each domain. Must contain at least two domains. All domains should contain the same individuals, aligned in the same order, and observed over comparable time points. |
| `method` | ✗ | `str` | Dissimilarity measure to use when `what="diss"`. Options: `"OM"` (optimal matching), `"LCS"` (longest common subsequence), `"DHD"` (dynamic Hamming distance), `"HAM"` (Hamming distance). Required when `what="diss"`. |
| `norm` | ✗ | `str` | Normalization method for distances. Options: `"none"`, `"maxlength"`, `"gmean"`, `"maxdist"`. Only used when `what="diss"`. Default = `"none"`. |
| `indel` | ✗ | `float`, `np.ndarray`, or `list` | Insertion/deletion costs. Can be a single value (applied to all domains and states), a list of values (one per domain), or a list of lists (state-dependent costs per domain). Use `"auto"` to compute automatically. Default = `"auto"`. |
| `sm` | ✗* | `list[str]` or `list[np.ndarray]` | Substitution cost matrices. Can be a list of method names (e.g., `["TRATE", "CONSTANT"]`) or a list of matrices (2D or 3D arrays for time-varying costs). Required when `what="cost"` or `what="diss"`. |
| `with_missing` | ✗ | `bool` or `list[bool]` | Whether to treat missing values as valid states for each domain. Can be a single value or a list with one value per domain. Default = `None` (automatically detected). |
| `full_matrix` | ✗ | `bool` | Whether to return the full distance matrix or only the upper triangle. Default = `True`. |
| `link` | ✗ | `str` | Method to combine costs across domains. Options: `"sum"` (additive) or `"mean"` (average). Default = `"sum"`. |
| `cval` | ✗ | `float` | Constant substitution cost used when `sm` method is `"CONSTANT"`. Default = `2`. |
| `miss_cost` | ✗ | `float` | Cost to substitute missing values at the domain level. Default = `2`. |
| `cweight` | ✗ | `list[float]` | Weights for each domain. Used to weight the contribution of each domain to the total cost. If `None`, all domains have equal weight (1.0). Default = `None`. |
| `what` | ✗ | `str` | What output to return. Options: `"MDseq"` (multidomain sequences), `"cost"` (cost matrices), `"diss"` (distance matrix). Default = `"MDseq"`. |
| `ch_sep` | ✗ | `str` | Separator used to join states from different domains when building composite state names. Must not appear in any domain's alphabet. Default = `"+"`. |

\*In current Sequenzo releases, provide `sm` explicitly whenever you request CAT costs or distances.

## What It Does

The function performs the following steps:

1. **Validation:** Checks multidomain alignment assumptions (same individuals in the same order across domains, observed over comparable time points) and ensures the separator doesn't appear in any domain's alphabet.

2. **Building multidomain sequences:** For each time point, combines states from all domains into composite states. For example, if at time T1 domain 1 has state "A" and domain 2 has state "B", the multidomain state becomes "A+B" (using the default separator).

3. **Computing domain-level costs:**
   - For each domain, generates or uses the provided substitution cost matrix.
   - Sets indel costs for each domain (either provided or automatically computed).
   - Applies domain weights if specified.

4. **Computing CAT costs:**
   - **Substitution costs:** In the original CAT formulation, multidomain substitution costs are computed as a weighted sum of domain-level substitution costs.
   - **Indel costs:** Multidomain indel costs are also obtained through the same additive weighted construction from domain-level indel costs.
   - **`link="mean"` option in Sequenzo:** `link="mean"` provides a rescaled additive variant that averages additive costs across domains, which can help keep the cost scale comparable as the number of domains changes.

5. **Returning results:** Depending on the `what` parameter:
   - `"MDseq"`: Returns the multidomain sequences as a NumPy array.
   - `"cost"`: Returns a dictionary with substitution matrix, indel costs, alphabet, and domain weights.
   - `"diss"`: Computes and returns the pairwise distance matrix between all multidomain sequences.

## Examples

### 1. Getting multidomain sequences

To see what the combined sequences look like:

```python
import pandas as pd
from sequenzo import SequenceData, compute_cat_distance_matrix

# Domain 1: Employment status
df1 = pd.DataFrame({
    "ID": [1, 2, 3],
    "Y1": ["Employed", "Employed", "Unemployed"],
    "Y2": ["Employed", "Unemployed", "Employed"],
    "Y3": ["Unemployed", "Unemployed", "Employed"]
})

# Domain 2: Family status
df2 = pd.DataFrame({
    "ID": [1, 2, 3],
    "Y1": ["Single", "Married", "Single"],
    "Y2": ["Single", "Married", "Married"],
    "Y3": ["Married", "Married", "Married"]
})

time_list = ["Y1", "Y2", "Y3"]
seqdata_employment = SequenceData(
    df1, time=time_list, states=["Employed", "Unemployed"], id_col="ID"
)
seqdata_family = SequenceData(
    df2, time=time_list, states=["Single", "Married"], id_col="ID"
)

# Get multidomain sequences
md_sequences = compute_cat_distance_matrix(
    [seqdata_employment, seqdata_family],
    sm=["CONSTANT", "CONSTANT"],
    what="MDseq"
)
print(md_sequences)
```

Output:

```
[['Employed+Single' 'Employed+Single' 'Unemployed+Married']
 ['Employed+Married' 'Unemployed+Married' 'Unemployed+Married']
 ['Unemployed+Single' 'Employed+Married' 'Employed+Married']]
```

Each row represents one individual's multidomain sequence across time points.

### 2. Computing distance matrix

To compute pairwise distances between multidomain sequences:

```python
# Compute distance matrix using optimal matching
distance_matrix = compute_cat_distance_matrix(
    [seqdata_employment, seqdata_family],
    method="OM",
    sm=["TRATE", "TRATE"],  # Use transition rates for both domains
    what="diss"
)
print(distance_matrix)
```

This will automatically:
- Build the multidomain sequences
- Compute CAT costs (sum of costs from both domains)
- Calculate pairwise distances using optimal matching

### 3. Using custom substitution costs

You can provide your own substitution cost matrices for each domain:

```python
import numpy as np

# Custom substitution matrix for employment domain
sm_employment = np.array([
    [0, 1],  # Employed -> Unemployed costs 1
    [1, 0]   # Unemployed -> Employed costs 1
])

# Custom substitution matrix for family domain
sm_family = np.array([
    [0, 2],  # Single -> Married costs 2
    [2, 0]   # Married -> Single costs 2
])

# Compute distances with custom costs
distance_matrix = compute_cat_distance_matrix(
    [seqdata_employment, seqdata_family],
    method="OM",
    sm=[sm_employment, sm_family],
    indel=[1, 1],  # Indel cost of 1 for both domains
    what="diss"
)
```

When substituting "Employed+Single" with "Unemployed+Married", the cost will be 1 (employment change) + 2 (family change) = 3.

### 4. Getting cost matrices

To inspect the computed CAT costs before computing distances:

```python
costs = compute_cat_distance_matrix(
    [seqdata_employment, seqdata_family],
    sm=["TRATE", "TRATE"],
    what="cost"
)

print("Substitution matrix shape:", costs["sm"].shape)
print("Indel costs:", costs["indel"])
print("Alphabet:", costs["alphabet"])
```

This is useful for understanding how costs are combined before running the distance computation.

### 5. Using domain weights

If some domains should contribute more to the total cost:

```python
# Give employment domain twice the weight of family domain
distance_matrix = compute_cat_distance_matrix(
    [seqdata_employment, seqdata_family],
    method="OM",
    sm=["TRATE", "TRATE"],
    cweight=[2.0, 1.0],  # Employment weighted 2x, family weighted 1x
    what="diss"
)
```

With these weights, changes in employment status will contribute twice as much to the total substitution cost as changes in family status.

### 6. Using the rescaled `link="mean"` variant

To use the rescaled additive variant in Sequenzo:

```python
distance_matrix = compute_cat_distance_matrix(
    [seqdata_employment, seqdata_family],
    method="OM",
    sm=["TRATE", "TRATE"],
    link="mean",  # Rescale additive costs by averaging across domains
    what="diss"
)
```

This can be useful when you want costs to remain on a comparable scale as the number of domains changes.

## Understanding the Output

### When `what="MDseq"`

Returns a NumPy array of shape `(num_sequences, max_length)` containing strings representing composite states. Each composite state combines states from all domains using the separator (default: "+").

### When `what="cost"`

Returns a dictionary with:
- **`sm`:** Substitution cost matrix. Shape depends on whether costs are time-varying: `(alphabet_size, alphabet_size)` or `(max_length, alphabet_size, alphabet_size)`.
- **`indel`:** Indel cost vector of length `alphabet_size`.
- **`alphabet`:** List of all unique multidomain states.
- **`cweight`:** Domain weights that were applied.

### When `what="diss"`

Returns a pandas DataFrame with pairwise distances between all sequences. The index and columns are sequence IDs from the first domain's `SequenceData` object.

## Important Notes

1. **Same sequence length:** While sequences can have different lengths within a domain, it's recommended that all sequences in all domains have the same length for meaningful multidomain analysis.

2. **Separator choice:** Make sure your `ch_sep` doesn't appear in any domain's alphabet. If it does, the function will raise an error.

3. **Missing values:** If your domains have missing values, specify `with_missing` appropriately. The function will automatically detect missing values, but you can override this behavior.

4. **Assumption behind CAT:** CAT imposes an additive cost structure across domains. As discussed by Ritschard et al. (2023), this implies an independence assumption for state occurrences across domains at a given time point. Use CAT when this modeling assumption is acceptable for your research question.

5. **Performance:** Computing distances for multidomain sequences can be computationally intensive, especially with many domains and many sequences. The expanded multidomain alphabet can grow quickly as the number of domains and states increases, especially when many state combinations are observed.

## See Also

- [Multidomain Overview](/en/multidomain/introduction) maps the multidomain and polyadic workflows.
- [Typical Workflow](/en/basics/typical-workflow) shows where multidomain analysis fits in the full analysis.

## Authors

Code: Xinyi Li

Documentation: Yuqi Liang

## Acknowledgements

We gratefully acknowledge Professor Gilbert Ritschard for clarifications on multidomain strategy terminology and assumptions.

## References

Ritschard, G., Liao, T. F., & Struffolino, E. (2023). Strategies for multidomain sequence analysis in social research. Sociological Methodology, 53(2), 288-322.
