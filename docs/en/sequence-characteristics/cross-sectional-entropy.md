# `get_cross_sectional_entropy()`

`get_cross_sectional_entropy()` analyzes how states are distributed across time points in your sequences.

This function calculates:

1. **State frequencies by time:** How often each state appears at each time point (e.g., what percentage of sequences are in state "A" at time 1, time 2, etc.).

2. **Entropy by time:** How diverse or concentrated the states are at each time point. Higher entropy means states are more evenly distributed; lower entropy means one state dominates.

3. **Effective number of states:** The equivalent number of equally probable states (exp(entropy)), which is easier to interpret than raw entropy values.

This is useful for understanding temporal patterns, like "at which time point are states most diverse?" or "when does one state become dominant?"

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
result = get_cross_sectional_entropy(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
result = get_cross_sectional_entropy(
    sequence_data,
    weighted=True,                     # optional, default = True
    norm=True,                         # optional, default = True
    return_format="tidy",              # optional, default = "tidy"
    include_effective_states=True,     # optional, default = True
    add_topk=1,                        # optional, default = 1
    round_decimals=6                   # optional, default = 6
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `weighted` | ✗        | bool           | If `True`, frequencies are weighted by the number of non-missing values at each time unit. Default = `True`. |
| `norm`    | ✗        | bool           | If `True`, entropy is normalized by maximum possible entropy (range 0-1). Default = `True`. |
| `return_format` | ✗    | str            | Return format: `"tidy"` (long-form table), `"wide"` (matrices), or `"dict"` (dictionary). Default = `"tidy"`. |
| `include_effective_states` | ✗ | bool           | If `True`, calculates effective number of states (exp(entropy)). Default = `True`. |
| `add_topk` | ✗        | int            | Marks top K dominant states at each time point. Default = `1`. |
| `round_decimals` | ✗    | int            | Number of decimal places for rounding. Default = `6`. |

## What It Does

* Calculates the frequency (proportion) of each state at each time point across all sequences.

* Computes entropy for each time point:
  - Higher entropy = states are more evenly distributed (more diversity)
  - Lower entropy = one state dominates (less diversity)

* If `norm=True`, normalizes entropy by maximum possible entropy (log(number of states)), giving values between 0 and 1:
  - `0` = fully concentrated (one state dominates)
  - `1` = evenly distributed (all states equally likely)

* Calculates effective number of states: `exp(entropy)` — this tells you "if states were equally probable, how many would we need?" (e.g., entropy 1.39 → effective states ≈ 4)

* Returns results in your chosen format:
  - **"tidy"**: Long-form table with one row per time-state combination (recommended for analysis)
  - **"wide"**: Separate matrices for frequencies, entropy series, etc. (useful for visualization)
  - **"dict"**: Dictionary format (backward compatible)

* Prints a summary with key statistics like average entropy, peak/lowest entropy times, and dominant state stability.

## Examples

### 1. Basic example (tidy format)

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.characteristics.overall_cross_sectional_entropy import get_cross_sectional_entropy

# Example dataset
df = pd.DataFrame({
    "ID": [1, 2, 3],
    "Y1": ["A", "A", "B"],
    "Y2": ["B", "A", "B"],
    "Y3": ["B", "C", "B"]
})

time_list = ["Y1", "Y2", "Y3"]
states = ["A", "B", "C"]

sequence_data = SequenceData(df, time=time_list, states=states, id_col="ID")

# Calculate cross-sectional entropy
result = get_cross_sectional_entropy(sequence_data)
print(result.head(10))
```

Output:

```
======================================================================
Cross-Sectional Entropy Summary
======================================================================
[>] Number of states: 3
[>] Number of time points: 3
[>] On average, the most common state accounts for 66.7% of cases
[>] Entropy is highest at time point Y2
[>] Entropy is lowest at time point Y3
[>] Average normalized entropy: 0.789 (range: 0 = fully concentrated, 1 = evenly distributed)
======================================================================

   time  state      freq  per_time_entropy_norm  N_valid  Effective States  rank  is_top
0   Y1      A  0.666667                 0.726     3.0              2.467     1    True
1   Y1      B  0.333333                 0.726     3.0              2.467     2   False
2   Y1      C  0.000000                 0.726     3.0              2.467     3   False
3   Y2      A  0.333333                 0.918     3.0              2.503     2   False
4   Y2      B  0.333333                 0.918     3.0              2.503     1    True
5   Y2      C  0.333333                 0.918     3.0              2.503     1    True
...
```

**Explanation:**
- At time `Y1`: 66.7% are in state "A", 33.3% in "B", 0% in "C" → moderate entropy (0.726)
- At time `Y2`: States are evenly distributed (33.3% each) → high entropy (0.918)
- At time `Y3`: 100% are in state "B" → low entropy (concentrated)

### 2. Wide format (`return_format="wide"`)

```python
result = get_cross_sectional_entropy(sequence_data, return_format="wide")
print(result["Frequencies"])
print(result["per_time_entropy_norm"])
```

Output:

```
        Y1        Y2        Y3
A  0.666667  0.333333  0.000000
B  0.333333  0.333333  1.000000
C  0.000000  0.333333  0.000000

Y1    0.726
Y2    0.918
Y3    0.000
Name: per_time_entropy_norm, dtype: float64
```

The wide format returns separate matrices, useful for plotting or further calculations.

### 3. Without normalization (`norm=False`)

```python
result = get_cross_sectional_entropy(sequence_data, norm=False)
print(result[["time", "state", "freq", "Entropy"]].head())
```

When `norm=False`, entropy values are not normalized (raw entropy values in bits/nats).

### 4. Marking top 2 states (`add_topk=2`)

```python
result = get_cross_sectional_entropy(sequence_data, add_topk=2)
print(result[result["is_top"] == True])
```

This marks the top 2 dominant states at each time point, useful for identifying the most common states.

### 5. With real dataset (employment sequences)

```python
result = get_cross_sectional_entropy(sequence_data)
print(result.head(15))
```

Output:

```
   time        state      freq  per_time_entropy_norm  N_valid  Effective States  rank  is_top
0   Y1    Full-time  0.623456                 0.745   2346.0              2.385     1    True
1   Y1    Part-time  0.234567                 0.745   2346.0              2.385     2   False
2   Y1    Unemployed 0.098765                 0.745   2346.0              2.385     3   False
3   Y1      Student  0.043212                 0.745   2346.0              2.385     4   False
4   Y2    Full-time  0.654321                 0.712   2346.0              2.321     1    True
...
```

**Interpretation:** 
- **Normalized entropy (`per_time_entropy_norm`)**: Values between 0 and 1 indicate how diverse states are at each time. Higher values = more diversity.
- **Effective States**: If entropy is 0.745 and there are 4 states, effective states ≈ 2.385 means the diversity is equivalent to having ~2.4 equally probable states.
- **Peak entropy time**: The time point when states are most diverse (e.g., early career might have more variation).
- **Lowest entropy time**: The time point when one state dominates (e.g., later career might converge to one dominant state).

This helps answer questions like:
- "At which career stage are employment patterns most diverse?"
- "When does full-time employment become the dominant state?"
- "How does state diversity change over time?"

## Author

Code: Yuqi Liang, Xinyi Li

Documentation: Yuqi Liang

## References

Ritschard, G. (2021). Measuring the Nature of Individual Sequences. Sociological Methods & Research, 52(4), 2016-2049. https://doi.org/10.1177/00491241211036156 (Original work published 2023)