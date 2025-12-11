# `get_subsequences_all_sequences()`

`get_subsequences_all_sequences()` counts how many distinct subsequences exist in each sequence.

A **subsequence** is any sequence that can be derived by deleting some (or no) elements without changing the order of the remaining elements. For example, from sequence `[A, B, A]`, we can get subsequences like `[]`, `[A]`, `[B]`, `[A, A]`, `[A, B]`, `[B, A]`, and `[A, B, A]`.

This function helps you understand the **complexity and diversity** of your sequences. Higher numbers mean more possible subsequences, indicating more complex patterns.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
result = get_subsequences_all_sequences(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
result = get_subsequences_all_sequences(
    sequence_data,
    dss=True,           # optional, default = True
    with_missing=False  # optional, default = False
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `dss`     | ✗        | bool           | If `True`, removes consecutive duplicate states before counting (e.g., `[A, A, B, B]` becomes `[A, B]`). Default = `True`. |
| `with_missing` | ✗    | bool           | If `True`, includes missing values in the calculation. Default = `False`. |

## What It Does

* Processes each sequence in your dataset.

* If `dss=True`, applies distinct state sequence preprocessing: removes consecutive duplicate states (e.g., `[A, A, B, B, A]` → `[A, B, A]`).

* Counts distinct subsequences using a dynamic programming algorithm.

* Handles empty sequences (returns 1, representing the empty subsequence).

* Returns a Pandas DataFrame with one value per sequence.

## Examples

### 1. Basic example

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.characteristics.simple_characteristics import get_subsequences_all_sequences

# Example dataset
df = pd.DataFrame({
    "ID": [1, 2, 3],
    "Y1": ["A", "A", "B"],
    "Y2": ["B", "A", "B"],
    "Y3": ["C", "C", "B"]
})

time_list = ["Y1", "Y2", "Y3"]
states = ["A", "B", "C"]

sequence_data = SequenceData(df, time=time_list, states=states, id_col="ID")

# Calculate number of subsequences
result = get_subsequences_all_sequences(sequence_data)
print(result)
```

Output:

```
   Subseq.
0        7
1        3
2        4
```

### 2. Without DSS preprocessing (`dss=False`)

```python
result = get_subsequences_all_sequences(sequence_data, dss=False)
print(result)
```

When `dss=False`, consecutive duplicates are preserved, which may result in different counts:

```
   Subseq.
0        7
1        4
2        4
```

### 3. With real dataset (employment sequences)

```python
result = get_subsequences_all_sequences(sequence_data)
print(result.head())
```

Output:

```
   Subseq.
0       15
1       23
2        8
...
```

**Interpretation:** Higher values indicate more complex sequences with more possible subsequences. This can help identify sequences with diverse patterns and structures.

## Author
Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Ritschard, G. (2021). Measuring the Nature of Individual Sequences. Sociological Methods & Research, 52(4), 2016-2049. https://doi.org/10.1177/00491241211036156 (Original work published 2023)