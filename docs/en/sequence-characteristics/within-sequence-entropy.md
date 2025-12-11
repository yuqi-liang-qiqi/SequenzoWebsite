# `get_within_sequence_entropy()`

`get_within_sequence_entropy()` measures how diverse the states are within each sequence.

**Entropy** measures the uncertainty or diversity in a sequence. Higher entropy means states are more evenly distributed (more diversity). Lower entropy means one state dominates (less diversity).

For example:
- Sequence `[A, A, A, A]` has very low entropy (one state dominates)
- Sequence `[A, B, A, B]` has higher entropy (states are more evenly distributed)
- Sequence `[A, B, C, D]` has maximum entropy if all states are equally frequent (maximum diversity)

This function is useful for identifying which sequences have diverse patterns versus which sequences are dominated by a single state.

## Function Usage

A minimal example with only the required parameters (sufficient for most use cases):

```python
result = get_within_sequence_entropy(sequence_data)
```

A complete example with all available parameters (for advanced customization):

```python
result = get_within_sequence_entropy(
    sequence_data,
    norm=True,        # optional, default = True
    base=np.e,        # optional, default = np.e
    silent=True       # optional, default = True
)
```

## Entry Parameters

| Parameter | Required | Type           | Description                                                           |
| --------- | -------- | -------------- | --------------------------------------------------------------------- |
| `seqdata` | ✓        | `SequenceData` | A `SequenceData` object containing the sequences you want to analyze. |
| `norm`    | ✗        | bool           | If `True`, normalizes entropy by maximum possible entropy (log(number of states)), giving values between 0 and 1. Default = `True`. |
| `base`    | ✗        | float          | Base of the logarithm for entropy calculation. Common values: `np.e` (natural log), `2` (binary log), `10` (decimal log). Default = `np.e`. |
| `silent`  | ✗        | bool           | If `False`, prints progress messages. Default = `True` (quiet mode). |

## What It Does

* For each sequence, calculates the frequency (proportion) of each state:
  - Counts how often each state appears in the sequence
  - Converts counts to proportions (percentages)

* Computes entropy for each sequence based on the state distribution:
  - Higher entropy = states are more evenly distributed (more diversity)
  - Lower entropy = one state dominates (less diversity)

* If `norm=True`, normalizes entropy by dividing by maximum possible entropy (log(number of states)):
  - Normalized entropy ranges from 0 to 1
  - `0` = fully concentrated (one state dominates)
  - `1` = evenly distributed (all states equally frequent)

* Returns a Pandas DataFrame with one entropy value per sequence.

## Examples

### 1. Basic example (with normalization)

```python
import pandas as pd
import numpy as np
from sequenzo.define_sequence_data import SequenceData
from sequenzo.characteristics.within_sequence_entropy import get_within_sequence_entropy

# Example dataset
df = pd.DataFrame({
    "ID": [1, 2, 3],
    "Y1": ["A", "A", "A"],
    "Y2": ["A", "A", "B"],
    "Y3": ["B", "B", "B"],
    "Y4": ["B", "C", "C"]
})

time_list = ["Y1", "Y2", "Y3", "Y4"]
states = ["A", "B", "C"]

sequence_data = SequenceData(df, time=time_list, states=states, id_col="ID")

# Calculate within-sequence entropy
result = get_within_sequence_entropy(sequence_data)
print(result)
```

Output:

```
   ID    Entropy
0   1  0.693147
1   2  1.039721
2   3  0.549306
```

**Explanation:**
- Sequence 1: `[A, A, B, B]` - Two states (A, B), evenly distributed → moderate entropy (0.693)
- Sequence 2: `[A, A, B, C]` - Three states (A, B, C), with some imbalance → higher entropy (1.040)
- Sequence 3: `[A, B, B, C]` - Three states, but B dominates → lower entropy (0.549)

### 2. With normalized entropy (`norm=True`, default)

```python
result = get_within_sequence_entropy(sequence_data, norm=True)
print(result)
```

Output:

```
   ID    Entropy
0   1  0.630930
1   2  0.946395
2   3  0.500278
```

When normalized, entropy values range from 0 to 1:
- Sequence 1: 0.631 (moderate diversity)
- Sequence 2: 0.946 (very diverse, close to maximum)
- Sequence 3: 0.500 (less diverse, one state dominates more)

### 3. Without normalization (`norm=False`)

```python
result = get_within_sequence_entropy(sequence_data, norm=False)
print(result)
```

Output:

```
   ID    Entropy
0   1  0.693147
1   2  1.039721
2   3  0.549306
```

When not normalized, entropy values are in raw units (nats for base=e):
- These values can be compared within the same dataset but are harder to interpret across different datasets with different numbers of states.

### 4. With different base (`base=2`)

```python
result = get_within_sequence_entropy(sequence_data, base=2)
print(result)
```

When `base=2`, entropy is calculated using binary logarithm (bits instead of nats):
- Useful for certain applications where bits are preferred
- Normalized values still range from 0 to 1

### 5. With progress messages (`silent=False`)

```python
result = get_within_sequence_entropy(sequence_data, silent=False)
```

Output:

```
  - computing within sequence entropy for 3 sequences and 3 states ...
   ID    Entropy
0   1  0.693147
1   2  1.039721
2   3  0.549306
```

### 6. With real dataset (employment sequences)

```python
result = get_within_sequence_entropy(sequence_data)
print(result.head())
```

Output:

```
   ID    Entropy
0   1  0.823456
1   2  0.745321
2   3  0.912345
...
```

**Interpretation:**

**Normalized entropy** (when `norm=True`) helps you understand sequence diversity:

- **Low entropy (0.0-0.3)**: One state dominates strongly. Example: Employment sequence with 90% full-time employment, 10% other states.

- **Medium entropy (0.3-0.7)**: Moderate diversity. Example: Employment sequence with 50% full-time, 30% part-time, 20% unemployed.

- **High entropy (0.7-1.0)**: States are evenly distributed. Example: Employment sequence with roughly equal proportions of multiple states.

**Use cases:**

- **Identify diverse sequences**: High entropy sequences have diverse patterns, experiencing many different states.

- **Identify concentrated sequences**: Low entropy sequences are dominated by one state, showing stable patterns.

- **Compare sequences**: Normalized entropy allows you to compare sequences across different datasets with different numbers of states.

**Example questions answered:**

- "Which individuals have diverse employment patterns?" → Look for high entropy sequences
- "Which individuals have stable, concentrated patterns?" → Look for low entropy sequences
- "How diverse are life course sequences compared to employment sequences?" → Compare normalized entropy values

## Notes and Tips

* Normalized entropy (`norm=True`) is recommended for most use cases because it makes results comparable across sequences with different numbers of states.

* The default base is `np.e` (natural logarithm, units: nats). You can use `base=2` for binary logarithm (units: bits) or `base=10` for decimal logarithm.

* Entropy is calculated based on state frequencies (proportions), so sequences with the same state distribution will have the same entropy, regardless of the order of states.

* This function uses `get_state_freq_and_entropy_per_seq()` internally to calculate state frequencies, which may print progress messages if not suppressed.

* Within-sequence entropy is different from cross-sectional entropy:
  - **Within-sequence entropy** (this function): How diverse each individual sequence is
  - **Cross-sectional entropy** (`get_cross_sectional_entropy`): How diverse the population is at each time point

## Author
Code: Xinyi Li

Documentation: Yuqi Liang

## References

Ritschard, G. (2021). Measuring the Nature of Individual Sequences. Sociological Methods & Research, 52(4), 2016-2049. https://doi.org/10.1177/00491241211036156 (Original work published 2023)