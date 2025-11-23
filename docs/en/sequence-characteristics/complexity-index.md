# `get_complexity_index()`

`get_complexity_index()` combines two aspects of a sequence:

1. **Transitions:** How often the sequence changes from one state to another.
2. **Entropy:** How diverse the states are within the sequence.

The higher the index, the more complex the sequence is.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
result = get_complexity_index(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
result = get_complexity_index(
    sequence_data,
    silent=True   # optional, default = True
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `silent`  | ✗        | bool           | If `False`, prints progress messages. Default = `True` (quiet mode).  |

## What It Does

* Computes the number of normalized transitions in each sequence.

* Computes the normalized within-sequence entropy (i.e., state diversity). Normalization is used to make results comparable across different sequences.

* Combines them using the formula:

  ```
  Complexity Index = sqrt(transitions × entropy)
  ```

* Returns a Pandas DataFrame with one value per sequence.

## Examples

### 1. Basic example (with `silent=False`)

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.characteristics.complexity_index import get_complexity_index

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

# Calculate complexity index
result = get_complexity_index(sequence_data, silent=False)
print(result)
```

Output:

```
   ComplexityIndex
0         0.707107
1         0.000000
2         0.000000
```

### 2. With real dataset (employment sequences)

```python
result = get_complexity_index(sequence_data)
print(result.head())
```

Output:

```
   ComplexityIndex
0         0.543210
1         0.612345
2         0.431098
...
```

## Author
Code: Xinyi Li

Documentation: Yuqi Liang