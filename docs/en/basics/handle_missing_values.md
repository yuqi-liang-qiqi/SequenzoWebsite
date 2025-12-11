# How to Handle Missing Values

Missing values are common in sequence data and can appear in various forms. This guide explains how Sequenzo handles missing values and how you can work with them effectively.

## Understanding Missing Values

Missing values in sequence data represent periods where information is not available for a particular individual at a specific time point. For example:

- A participant didn't respond to a survey
- Employment information was not recorded for certain years
- A person's status is unknown during a specific period

Sequenzo automatically detects and handles missing values, ensuring they are properly represented in your analysis and visualizations.

## Types of Missing Values

Sequenzo recognizes three main types of missing value representations:

### 1. **Pandas NaN (Not a Number)**
The standard way pandas represents missing data. Empty cells in CSV files are typically read as NaN.

```python
import pandas as pd
import numpy as np

# Example: DataFrame with NaN values
df = pd.DataFrame({
    'id': [1, 2, 3],
    't1': ['A', 'B', np.nan],  # NaN represents missing
    't2': ['B', np.nan, 'A'],
    't3': ['A', 'C', 'B']
})
```

### 2. **String "Missing"**
Some datasets use the literal string "Missing" (case-insensitive) to represent missing values.

```python
# Example: DataFrame with string "Missing"
df = pd.DataFrame({
    'id': [1, 2, 3],
    't1': ['A', 'B', 'Missing'],  # String "Missing" represents missing
    't2': ['B', 'Missing', 'A'],
    't3': ['A', 'C', 'B']
})
```

### 3. **Custom Hard-coded Values**
Many datasets use specific numeric codes to represent missing values, such as:
- `99` or `999` (common in survey data)
- `9`, `-1`, or `1000`
- Any user-defined code

```python
# Example: DataFrame with hard-coded missing values
df = pd.DataFrame({
    'id': [1, 2, 3],
    't1': ['A', 'B', 99],      # 99 represents missing
    't2': ['B', 9, 'A'],       # 9 also represents missing
    't3': ['A', 'C', 'B']
})
```

---

## Automatic Detection

By default (when `missing_values=None`), Sequenzo automatically detects:

- ✅ Pandas NaN values
- ✅ String "Missing" (case-insensitive: "missing", "Missing", "MISSING")

**Example: Auto-detection with NaN**

```python
from sequenzo import SequenceData

# Data with pandas NaN
df = pd.DataFrame({
    'id': [1, 2, 3],
    't1': ['Single', 'Married', np.nan],
    't2': ['Married', np.nan, 'Single'],
    't3': ['Single', 'Divorced', 'Married']
})

states = ['Single', 'Married', 'Divorced']
labels = ['Single', 'Married', 'Divorced']

seqdata = SequenceData(
    data=df,
    time=['t1', 't2', 't3'],
    id_col='id',
    states=states,
    labels=labels,
    missing_values=None  # Auto-detect (default)
)

# Output:
# [!] Detected missing values (NaN (pandas)) in the sequence data.
#     -> Automatically added np.nan to `states` and `labels` for compatibility.
```

**Example: Auto-detection with string "Missing"**

```python
# Data with string "Missing"
df = pd.DataFrame({
    'id': [1, 2, 3],
    't1': ['State-owned', 'Collective', 'Missing'],
    't2': ['Collective', 'Missing', 'State-owned'],
    't3': ['State-owned', 'Public', 'Collective']
})

seqdata = SequenceData(
    data=df,
    time=['t1', 't2', 't3'],
    id_col='id',
    states=['State-owned', 'Collective', 'Public'],
    labels=['State-owned Enterprise', 'Collective Enterprise', 'Public Institution']
    # missing_values=None by default
)

# Output:
# [!] Detected missing values ('Missing') in the sequence data.
#     -> Automatically added 'Missing' to `states` and `labels` for compatibility.
```

## Specifying Custom Missing Values

When your data uses hard-coded values (like `99`, `9`, `1000`) to represent missing data, you should specify them using the `missing_values` parameter.

### Single Missing Value

```python
seqdata = SequenceData(
    data=df,
    time=time_list,
    id_col='id',
    states=states,
    labels=labels,
    missing_values=99  # Single value
)
```

### Multiple Missing Values

```python
seqdata = SequenceData(
    data=df,
    time=time_list,
    id_col='id',
    states=states,
    labels=labels,
    missing_values=[99, 9, 1000]  # List of values
)
```

### Mixed Types

```python
seqdata = SequenceData(
    data=df,
    time=time_list,
    id_col='id',
    states=states,
    labels=labels,
    missing_values=[99, "N/A", -1]  # Mix of numeric and string
)
```

### Complete Example: Hard-coded Missing Values

```python
import pandas as pd
from sequenzo import SequenceData

# Sample data with hard-coded missing values
df = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'year1': ['A', 'B', 99, 'A', 'C'],      # 99 = missing
    'year2': ['B', 9, 'A', 99, 'C'],        # 9 and 99 = missing
    'year3': ['A', 'C', 'B', 'A', 'C']
})

states = ['A', 'B', 'C']
labels = ['State A', 'State B', 'State C']

# Specify custom missing values
seqdata = SequenceData(
    data=df,
    time=['year1', 'year2', 'year3'],
    id_col='id',
    states=states,
    labels=labels,
    missing_values=[99, 9]  # Tell Sequenzo these represent missing
)

# Output:
# [!] Detected missing values (99, 9) in the sequence data.
#     You specified missing_values=[99, 9].
#     -> Automatically added 99 to `states` and `labels` for compatibility.
```

## Handling Mixed Missing Value Types

If your data contains both custom missing values (like `99`) AND other types (like pandas NaN or string "Missing"), Sequenzo will detect all of them and warn you:

**Example: Mixed Missing Values**

```python
import pandas as pd
import numpy as np
from sequenzo import SequenceData

df = pd.DataFrame({
    'id': [1, 2, 3, 4],
    't1': ['A', 'B', 99, np.nan],      # Both 99 and NaN
    't2': ['B', 99, 'A', 'Missing'],   # Both 99 and "Missing"
    't3': ['A', 'C', 'B', 'A']
})

seqdata = SequenceData(
    data=df,
    time=['t1', 't2', 't3'],
    id_col='id',
    states=['A', 'B', 'C'],
    labels=['State A', 'State B', 'State C'],
    missing_values=[99]  # You only specified 99
)

# Output:
# [!] Warning: Detected additional missing value indicators in your data beyond those you specified.
#     You specified: [99]
#     Additional missing values found: ['NaN', 'Missing']
#     Recommendation: Include these in the `missing_values` parameter for complete handling.
#     Example: missing_values=[99, 'NaN', 'Missing']
```

**Solution:** Include all missing value types:

```python
seqdata = SequenceData(
    data=df,
    time=['t1', 't2', 't3'],
    id_col='id',
    states=['A', 'B', 'C'],
    labels=['State A', 'State B', 'State C'],
    missing_values=[99, np.nan, 'Missing']  # All types
)
```

## Best Practices

### 1. **Always Check Your Data First**

Before creating a `SequenceData` object, examine your data to identify missing value representations:

```python
import pandas as pd

# Load your data
df = pd.read_csv('your_data.csv')

# Check for NaN
print("Has NaN:", df.isna().any().any())
print("NaN count:", df.isna().sum().sum())

# Check for specific values (e.g., 99, 9)
print("Has 99:", (df == 99).any().any())
print("Has 'Missing':", (df == 'Missing').any().any())

# See unique values
print("Unique values:", df[time_columns].stack().unique())
```

### 2. **Include Missing in States and Labels**

Although Sequenzo automatically adds missing values to `states` and `labels`, it's **strongly recommended** to include them explicitly:

```python
# Recommended approach
states = ['State-owned', 'Collective', 'Public', 'Missing']
labels = ['State-owned Enterprise', 'Collective Enterprise', 
          'Public Institution', 'Missing']

seqdata = SequenceData(
    data=df,
    time=time_list,
    id_col='id',
    states=states,  # Includes 'Missing'
    labels=labels,  # Includes 'Missing'
    missing_values=['Missing']  # Specify if using string
)
```

### 3. **Handle Custom Missing Values Explicitly**

If your data uses hard-coded values, always specify them:

```python
# For data with 99 and 9 as missing
seqdata = SequenceData(
    data=df,
    time=time_list,
    id_col='id',
    states=states,
    labels=labels,
    missing_values=[99, 9]  # Always specify
)
```

### 4. **Custom Colors for Missing Values**

When providing custom colors, you have two options:

**Option A: Include color for missing state**
```python
# 7 states including Missing, provide 7 colors
colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', 
          '#FF00FF', '#00FFFF', '#E0E0E0']  # Last one for Missing

seqdata = SequenceData(
    data=df,
    time=time_list,
    id_col='id',
    states=states_with_missing,
    labels=labels_with_missing,
    custom_colors=colors  # All 7 colors including Missing
)
```

**Option B: Let Sequenzo add gray automatically**
```python
# 6 states (without Missing), provide 6 colors
colors = ['#FF0000', '#00FF00', '#0000FF', 
          '#FFFF00', '#FF00FF', '#00FFFF']

seqdata = SequenceData(
    data=df,
    time=time_list,
    id_col='id',
    states=states_without_missing,
    labels=labels_without_missing,
    custom_colors=colors  # 6 colors, Missing gray will be added automatically
)
# Sequenzo will automatically add gray (#cfcccc) for Missing
```

## Examples

### Example 1: Survey Data with Hard-coded Missing Values

```python
import pandas as pd
from sequenzo import SequenceData

# Survey data where 99 = "Don't know" and 9 = "Refused"
df = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'q1': [1, 2, 99, 1, 3],  # 99 = missing
    'q2': [2, 9, 1, 99, 3],  # 9 and 99 = missing
    'q3': [1, 3, 2, 1, 3]
})

states = [1, 2, 3]
labels = ['Option 1', 'Option 2', 'Option 3']

seqdata = SequenceData(
    data=df,
    time=['q1', 'q2', 'q3'],
    id_col='id',
    states=states,
    labels=labels,
    missing_values=[99, 9]
)
```

### Example 2: Employment Data with String "Missing"

```python
# Employment sequences where "Missing" indicates unknown employment status
df = pd.DataFrame({
    'id': [1, 2, 3],
    'year1': ['Employed', 'Unemployed', 'Missing'],
    'year2': ['Unemployed', 'Missing', 'Employed'],
    'year3': ['Employed', 'Employed', 'Employed']
})

states = ['Employed', 'Unemployed', 'Missing']
labels = ['Employed', 'Unemployed', 'Missing']

seqdata = SequenceData(
    data=df,
    time=['year1', 'year2', 'year3'],
    id_col='id',
    states=states,
    labels=labels
    # missing_values=None will auto-detect "Missing"
)
```

### Example 3: Complex Dataset with Multiple Missing Types

```python
# Data with pandas NaN, string "Missing", and hard-coded 999
df = pd.DataFrame({
    'id': [1, 2, 3, 4],
    't1': ['A', 'B', 999, np.nan],
    't2': ['B', 'Missing', 'A', 999],
    't3': ['A', 'C', 'B', 'A']
})

states = ['A', 'B', 'C']
labels = ['State A', 'State B', 'State C']

seqdata = SequenceData(
    data=df,
    time=['t1', 't2', 't3'],
    id_col='id',
    states=states,
    labels=labels,
    missing_values=[999, np.nan, 'Missing']  # All types
)
```

## Summary

- **Auto-detection**: Sequenzo automatically detects pandas NaN and string "Missing"
- **Custom values**: Use `missing_values` parameter for hard-coded missing codes (99, 9, etc.)
- **Best practice**: Always explicitly include missing in `states` and `labels`
- **Warnings**: Sequenzo warns if additional missing types are detected beyond what you specified
- **Visualization**: Missing values are automatically assigned gray color (#cfcccc) in visualizations

