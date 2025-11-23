# `get_association_between_domains()`

`get_association_between_domains()` measures how strongly different domains of sequence data are related to each other. When you have multiple sequence domains (for example, employment status and family status measured over the same time periods), this function helps you understand whether changes in one domain tend to occur together with changes in another.

The function computes two statistical measures:

1. **Cramer's V:** A value between 0 and 1 that indicates the strength of association. Values closer to 1 mean stronger association.
2. **Likelihood Ratio Test (LRT):** A statistical test that tells you whether the association is statistically significant.

The function compares sequences position by position, meaning it looks at what state each sequence is in at each time point and measures how these states co-occur across domains.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
result = get_association_between_domains(seqdata_dom)
```

A complete example with all available parameters (for advanced customization):

```python
result = get_association_between_domains(
    seqdata_dom,              # required: list of SequenceData objects
    assoc=("LRT", "V"),       # optional: which measures to compute
    rep_method="overall",     # optional: comparison method
    p_value=True,             # optional: whether to compute p-values
    struct_zero=True,         # optional: adjust for structural zeros
    cross_table=False,        # optional: include cross-tabulations
    with_missing=False,       # optional: include missing/void states
    weighted=True,            # optional: apply sequence weights
    dnames=None,              # optional: custom domain names
    explain=True              # optional: add interpretation columns
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `seqdata_dom` | ✓ | `list[SequenceData]` | A list of `SequenceData` objects, one for each domain you want to compare. Must contain at least two domains. |
| `assoc` | ✗ | `tuple` | Which association measures to compute. Options: `"LRT"`, `"V"`, or both `("LRT", "V")`. Default = `("LRT", "V")`. |
| `rep_method` | ✗ | `str` | Method for determining which sequences to compare. Currently only `"overall"` is supported (position-by-position comparison). Default = `"overall"`. |
| `wrange` | ✗ | `tuple` or `None` | Not yet implemented. Intended for time window comparisons. Default = `None`. |
| `p_value` | ✗ | `bool` | Whether to compute p-values for the statistical tests. Default = `True`. |
| `struct_zero` | ✗ | `bool` | Whether to adjust degrees of freedom for structural zeros (cells with zero counts). Default = `True`. |
| `cross_table` | ✗ | `bool` | If `True`, stores cross-tabulation matrices in the result's attributes. Default = `False`. |
| `with_missing` | ✗ | `bool` | Whether to include rows or columns that contain only missing or void states. Default = `False`. |
| `weighted` | ✗ | `bool` | Whether to apply sequence weights from the first domain to all comparisons. Default = `True`. |
| `dnames` | ✗ | `list` or `None` | Custom names for the domains. If `None`, domains are automatically named as `Dom1`, `Dom2`, etc. Default = `None`. |
| `explain` | ✗ | `bool` | If `True`, adds a `strength` column with qualitative labels and formats p-values with significance stars. Default = `True`. |

## What It Does

The function performs the following steps:

1. **Pairwise comparison:** For each pair of domains in your list, it creates a cross-tabulation table showing how states from one domain co-occur with states from another domain.

2. **Statistical calculations:**
   - **Likelihood Ratio Test (LRT):** Computes a test statistic that measures how much the observed joint distribution of states differs from what would be expected if the two domains were independent. Larger values indicate stronger dependence.
   - **Cramer's V:** Calculates a normalized measure of association strength ranging from 0 (no association) to 1 (perfect association). This value is easier to interpret than raw chi-square statistics because it accounts for the size of your contingency table.

3. **Interpretation:** When `explain=True`, the function automatically classifies association strength:
   - **None:** Cramer's V < 0.1 (very weak or no association)
   - **Weak:** 0.1 ≤ Cramer's V < 0.3
   - **Moderate:** 0.3 ≤ Cramer's V < 0.5
   - **Strong:** Cramer's V ≥ 0.5

4. **Output formatting:** The results are presented as a DataFrame with one row per domain pair. P-values are marked with significance stars: `*` (p < 0.05), `**` (p < 0.01), `***` (p < 0.001).

## Examples

### 1. Basic example: Comparing two domains

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.multidomain.association_between_domains import get_association_between_domains

# Create data for domain 1: employment status
df1 = pd.DataFrame({
    "ID": [1, 2, 3, 4],
    "Y1": ["Employed", "Employed", "Unemployed", "Employed"],
    "Y2": ["Employed", "Unemployed", "Unemployed", "Employed"],
    "Y3": ["Unemployed", "Unemployed", "Employed", "Employed"]
})

# Create data for domain 2: family status
df2 = pd.DataFrame({
    "ID": [1, 2, 3, 4],
    "Y1": ["Single", "Married", "Single", "Married"],
    "Y2": ["Single", "Married", "Single", "Married"],
    "Y3": ["Married", "Married", "Single", "Married"]
})

time_list = ["Y1", "Y2", "Y3"]
states1 = ["Employed", "Unemployed"]
states2 = ["Single", "Married"]

# Create SequenceData objects
seqdata_employment = SequenceData(
    df1, time=time_list, states=states1, id_col="ID"
)
seqdata_family = SequenceData(
    df2, time=time_list, states=states2, id_col="ID"
)

# Calculate associations
result = get_association_between_domains(
    [seqdata_employment, seqdata_family],
    dnames=["Employment", "Family"]
)
```

Output:

```
📜 Full results table:
                    df        LRT    p(LRT)        v    p(v)   strength
Dom1 vs Dom2       1.0  2.345678  0.125 *  0.342105  0.089 *    Weak

📘 Column explanations:
  - df       : Degrees of freedom for the test (typically 1 for binary state sequences).
  - LRT      : Likelihood Ratio Test statistic (higher = stronger dependence).
  - p(LRT)   : p-value for LRT + significance stars: * (p<.05), ** (p<.01), *** (p<.001)
  - v        : Cramer's V statistic (0 to 1, measures association strength).
  - p(v)     : p-value for Cramer's V (based on chi-squared test) + significance stars: * (p<.05), ** (p<.01), *** (p<.001)
  - strength : Qualitative label for association strength based on Cramer's V:
               0.00-0.09 -> None, 0.10-0.29 -> Weak, 0.30-0.49 -> Moderate, >=0.50 -> Strong
```

### 2. Comparing three domains

```python
# Create a third domain: education level
df3 = pd.DataFrame({
    "ID": [1, 2, 3, 4],
    "Y1": ["High", "High", "Low", "High"],
    "Y2": ["High", "High", "Low", "High"],
    "Y3": ["High", "High", "Low", "High"]
})

seqdata_education = SequenceData(
    df3, time=time_list, states=["Low", "High"], id_col="ID"
)

# Compare all three domains
result = get_association_between_domains(
    [seqdata_employment, seqdata_family, seqdata_education],
    dnames=["Employment", "Family", "Education"]
)
```

When comparing three domains, the function automatically computes associations for all pairs:
- Employment vs Family
- Employment vs Education
- Family vs Education

### 3. Getting cross-tabulation tables

If you want to see the actual contingency tables that were used for the calculations:

```python
result = get_association_between_domains(
    [seqdata_employment, seqdata_family],
    cross_table=True
)

# Access cross-tabulations
cross_tables = result.attrs.get("cross.tables", {})
print(cross_tables["Dom1 vs Dom2"])
```

This returns the raw cross-tabulation matrix showing how many times each combination of states from the two domains occurred together.

### 4. Computing only Cramer's V

If you only need Cramer's V and not the likelihood ratio test:

```python
result = get_association_between_domains(
    [seqdata_employment, seqdata_family],
    assoc=("V",)  # Only compute Cramer's V
)
```

## Understanding the Results

The output DataFrame contains several columns that help you interpret the relationships between domains:

- **df (degrees of freedom):** The number of independent pieces of information used in the test. For binary sequences (2 states), this is typically 1.

- **LRT (Likelihood Ratio Test statistic):** A measure of how much the observed data deviates from independence. Higher values indicate stronger dependence, but the exact meaning depends on your sample size and degrees of freedom.

- **p(LRT):** The probability of observing this LRT value (or higher) if the two domains were truly independent. Smaller p-values (typically < 0.05) suggest the association is statistically significant.

- **v (Cramer's V):** A normalized measure of association strength, ranging from 0 to 1. This is often easier to interpret than raw test statistics because it accounts for the size of your contingency table.

- **p(v):** The p-value for Cramer's V, based on the chi-square test. Like p(LRT), smaller values indicate stronger evidence for an association.

- **strength:** A qualitative label that helps you quickly understand the practical importance of the association, regardless of statistical significance.

It's important to note that a statistically significant association (low p-value) doesn't always mean a practically important association. A large sample size can make even very weak associations statistically significant. That's why Cramer's V and the strength label are useful: they tell you about the magnitude of the association, not just whether it exists.

## Author

Code: Yuqi Liang

Documentation: Yuqi Liang
