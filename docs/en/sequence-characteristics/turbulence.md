# `get_turbulence()`

`get_turbulence()` measures how turbulent (irregular, unpredictable, or unstable) a sequence is. It captures two main aspects:

1. **Diversity of subsequences (φ):** How many distinct subsequences appear in the sequence.
2. **Variance of spell durations (s²):** How unevenly the lengths of consecutive spells (runs of the same state) are distributed.

The formula is:

```
Turbulence = log2( φ × (s²_max + 1) / (s² + 1) )
```

where `s²_max` is the maximum possible variance given the sequence length.

Higher values mean the sequence has more irregularities and structural instability.

## Function Usage

Minimal example (sufficient for most use cases):

```python
result = get_turbulence(sequence_data)
```

Full example with all available options:

```python
result = get_turbulence(
    sequence_data,
    norm=False,   # optional, normalize values (default=False)
    silent=True,  # optional, suppress progress messages (default=True)
    type=1        # optional, method for spell variance: 1 or 2 (default=1)
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                                |
| --------- | -------- | -------------- | -------------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences to analyze.               |
| `norm`    | ✗        | bool           | If `True`, turbulence values are normalized relative to a theoretical max. |
| `silent`  | ✗        | bool           | If `False`, prints progress updates. Default = `True` (quiet mode).        |
| `type`    | ✗        | int            | Type of spell duration variance: `1` or `2`. Default = `1`.                |

## What It Does

* Extracts spells (runs of identical states) from each sequence.
* Computes:

  * **φ (phi):** Number of distinct subsequences.
  * **s² (spell variance):** Variance in spell lengths.
  * **s²_max:** Maximum possible variance given the sequence.
* Calculates turbulence with the logarithmic formula.
* If `norm=True`, values are rescaled between 0 and 1 for comparability.
* Returns a Pandas DataFrame with one value per sequence.

## Examples

### 1. Basic example (with `silent=False`)

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.characteristics.seqST import get_turbulence

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

# Calculate turbulence
result = get_turbulence(sequence_data, silent=False)
print(result)
```

Output:

```
   Turbulence
0    1.584963
1    0.000000
2    0.918296
```

### 2. With normalization (`norm=True`)

```python
result = get_turbulence(sequence_data, norm=True)
print(result)
```

Output:

```
   Turbulence
0    0.743210
1    0.000000
2    0.431098
```

### 3. With a real dataset (e.g., employment histories)

```python
result = get_turbulence(sequence_data)
print(result.head())
```

Output:

```
   Turbulence
0    1.234567
1    0.987654
2    0.876543
...
```

## Authors

Code: Xinyi Li, Yuqi Liang

Documentation: Yuqi Liang

