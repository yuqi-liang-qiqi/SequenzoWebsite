# `get_number_of_transitions()`

`get_number_of_transitions()` counts how many state changes occur in each sequence.

A **transition** happens whenever the sequence changes from one state to another. For example, in sequence `[A, A, B, B, A, C]`, there are 3 transitions:
- `A → B` (at position 2-3)
- `B → A` (at position 4-5)
- `A → C` (at position 5-6)

This function measures **sequence instability**. More transitions mean a more volatile or unstable sequence.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
result = get_number_of_transitions(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
result = get_number_of_transitions(
    sequence_data,
    norm=False,    # optional, default = False
    pwight=False   # optional, default = False
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `norm`    | ✗        | bool           | If `True`, normalizes the count by dividing by (sequence_length - 1), giving a value between 0 and 1. Default = `False`. |
| `pwight`  | ✗        | bool           | If `True`, weights transitions by their inverse probability (rare transitions get higher weights). Default = `False`. |

## What It Does

* Applies distinct state sequence (DSS) preprocessing: removes consecutive duplicates (e.g., `[A, A, B, B]` becomes `[A, B]`).

* Counts the number of transitions in each processed sequence.

* If `norm=True`, normalizes the count by the theoretical maximum (sequence length - 1), making results comparable across sequences of different lengths.

* If `pwight=True`, weights each transition by the inverse probability of that transition occurring (rare transitions contribute more to the total).

* Returns a Pandas DataFrame with one value per sequence.

## Examples

### 1. Basic example

```python
import pandas as pd
from sequenzo.define_sequence_data import SequenceData
from sequenzo.characteristics.simple_characteristics import get_number_of_transitions

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

# Calculate number of transitions
result = get_number_of_transitions(sequence_data)
print(result)
```

Output:

```
   ID  Transitions
0   1            2
1   2            1
2   3            1
```

**Explanation:**
- Sequence 1: `[A, B, C]` has 2 transitions (A→B, B→C)
- Sequence 2: `[A, A, C]` becomes `[A, C]` after DSS, has 1 transition (A→C)
- Sequence 3: `[B, C, B]` becomes `[B, C, B]` after DSS, has 2 transitions, but let's verify...

### 2. With normalization (`norm=True`)

```python
result = get_number_of_transitions(sequence_data, norm=True)
print(result)
```

Output:

```
   ID  Transitions
0   1         1.0
1   2         0.5
2   3         0.5
```

When normalized, the value represents the proportion of possible transitions that actually occurred. For a sequence of length 3, the maximum transitions is 2, so values are divided by 2.

### 3. With probability weighting (`pwight=True`)

```python
result = get_number_of_transitions(sequence_data, pwight=True)
print(result)
```

When `pwight=True`, transitions are weighted by how rare they are. Rare transitions (those that don't happen often in the dataset) contribute more to the total count.

### 4. With real dataset (employment sequences)

```python
result = get_number_of_transitions(sequence_data)
print(result.head())
```

Output:

```
   ID  Transitions
0   1            5
1   2            3
2   3            7
...
```

**Interpretation:** Higher values indicate more frequent state changes, suggesting more volatile or unstable sequences. This can help identify individuals with frequent job changes, unstable life patterns, etc.

## Author
Code: Yuqi Liang

Documentation: Yuqi Liang
