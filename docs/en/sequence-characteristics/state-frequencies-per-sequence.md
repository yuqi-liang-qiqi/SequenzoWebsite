# `get_state_freq_and_entropy_per_seq()`

`get_state_freq_and_entropy_per_seq()` calculates how often each state appears in each sequence.

This function creates a **state distribution table** showing the frequency (count) or proportion of each state for every sequence in your dataset. It's useful for understanding which states are most common for each individual sequence.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
result = get_state_freq_and_entropy_per_seq(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
result = get_state_freq_and_entropy_per_seq(
    sequence_data,
    prop=False   # optional, default = False
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `prop`    | ✗        | bool           | If `True`, returns proportions (percentages between 0 and 1) instead of counts. Default = `False`. |

## What It Does

* Processes each sequence in your dataset.

* Counts how many times each state appears in each sequence (e.g., how many times state "A" appears, how many times state "B" appears, etc.).

* If `prop=True`, converts counts to proportions by dividing each count by the sequence length, giving values between 0 and 1.

* Returns a Pandas DataFrame with:
  - One row per sequence (identified by ID)
  - One column per state (showing the frequency or proportion)
  - An "ID" column containing the sequence identifiers

## Examples

### 1. Basic example (with counts)

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.characteristics.state_frequencies_and_entropy_per_sequence import get_state_freq_and_entropy_per_seq

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

# Calculate state frequencies
result = get_state_freq_and_entropy_per_seq(sequence_data)
print(result)
```

Output:

```
[>] Computing state distribution for 3 sequences and 3 states ...
   ID  A  B  C
0   1  1  2  0
1   2  2  0  1
2   3  0  3  0
```

**Explanation:**
- Sequence 1: Contains 1 "A", 2 "B", and 0 "C"
- Sequence 2: Contains 2 "A", 0 "B", and 1 "C"
- Sequence 3: Contains 0 "A", 3 "B", and 0 "C"

### 2. With proportions (`prop=True`)

```python
result = get_state_freq_and_entropy_per_seq(sequence_data, prop=True)
print(result)
```

Output:

```
[>] Computing state distribution for 3 sequences and 3 states ...
   ID    A    B    C
0   1  0.33  0.67  0.00
1   2  0.67  0.00  0.33
2   3  0.00  1.00  0.00
```

When `prop=True`, values represent the proportion of each state in the sequence:
- Sequence 1: 33% "A", 67% "B", 0% "C"
- Sequence 2: 67% "A", 0% "B", 33% "C"
- Sequence 3: 0% "A", 100% "B", 0% "C"

### 3. With real dataset (employment sequences)

```python
result = get_state_freq_and_entropy_per_seq(sequence_data)
print(result.head())
```

Output:

```
   ID  Full-time  Part-time  Unemployed  Student
0   1          5          2           1        0
1   2          3          4           1        0
2   3          8          0           0        0
...
```

**Interpretation:** 
- **Counts** (`prop=False`): Show the absolute number of time periods spent in each state. Useful for understanding raw patterns.
- **Proportions** (`prop=True`): Show the percentage of time spent in each state. Useful for comparing sequences of different lengths.

This helps identify patterns like "which individuals spent most of their time in full-time employment?" or "what proportion of their career was spent unemployed?"

## Author
Code: Xinyi Li

Documentation: Yuqi Liang

## References

Ritschard, G. (2021). Measuring the Nature of Individual Sequences. Sociological Methods & Research, 52(4), 2016-2049. https://doi.org/10.1177/00491241211036156 (Original work published 2023)