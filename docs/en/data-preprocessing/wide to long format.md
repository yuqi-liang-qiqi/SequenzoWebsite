---
title: Sequence Data Reshaping - Wide vs Long Format
description: 
pubDate: 2025-05-01
lastModDate: 2025-05-01
toc: true
share: true
ogImage: true
---

# Sequence Data Reshaping - Wide vs Long Format

Many social sequence analysis tools work with data in **wide format**, where each time step is a separate column. However, for plotting, merging, or statistical modeling, **long format** is often more convenient.

This guide explains how to convert between wide and long formats using helper functions.

---

### Wide Format

Each row represents **one entity**, and each column represents a **time point**:

```python
# Wide-format example
import pandas as pd

df = pd.DataFrame({
    "Entity ID": ["A", "B"],
    "2000": ["M", "L"],
    "2001": ["H", "M"],
    "2002": ["H", "H"]
})
```

| Entity ID | 2000 | 2001 | 2002 |
|-----------|------|------|------|
| A         |  M   |  H   |  H   |
| B         |  L   |  M   |  H   |

---

### Convert to Long Format

Use `wide_to_long_format_data()`:

```python
from sequenzo.utils import wide_to_long_format_data

df_long = wide_to_long_format_data(
    df,
    id_col="Entity ID",
    time_cols=["2000", "2001", "2002"],
    var_name="year",
    value_name="state"
)
```

| Entity ID | year | state |
|-----------|------|-------|
| A         | 2000 | M     |
| A         | 2001 | H     |
| A         | 2002 | H     |
| B         | 2000 | L     |
| B         | 2001 | M     |
| B         | 2002 | H     |

- `id_col`: the column identifying entities (e.g. "Entity ID")
- `time_cols`: list of columns representing time steps
- `var_name`: name of the new time column (default: `"time"`)
- `value_name`: name of the column holding state values (default: `"state"`)

---

### Convert Back to Wide Format

Use `long_to_wide_format_data()` if you need to go back:

```python
from sequenzo.utils import long_to_wide_format_data

df_wide = long_to_wide_format_data(
    df_long,
    id_col="Entity ID",
    time_col="year",
    state_col="state"
)
```

This returns the original wide format DataFrame.

Sure! Here's the **English explanation** for the two parameters `var_name` and `value_name` in the context of wide-to-long format conversion:

---

## Understanding `var_name` and `value_name` in Wide-to-Long Conversion

When reshaping sequence data from **wide format** to **long format** using `pandas.melt()` or `wide_to_long_format_data()`, the parameters `var_name` and `value_name` control the names of the new columns in the long-format output.

---

### `var_name="time"`

This sets the name of the **new column** that holds the **original column names** from the wide-format data (typically the time steps).

#### Example:

```plaintext
# Wide-format input
ID     2000    2001    2002
A      M       H       H
B      L       M       H
```

After conversion to long format:

```plaintext
ID     time    state
A      2000    M
A      2001    H
A      2002    H
B      2000    L
B      2001    M
B      2002    H
```

In this example, `"time"` is the new column name, and it holds the former column names `2000`, `2001`, `2002`. You can change `"time"` to anything more relevant to your data, such as `"year"` or `"age"`.

---

### `value_name="state"`

This sets the name of the **new column** that holds the **actual cell values** from the original wide-format table — in other words, the states observed at each time point.

You can rename it to suit your research topic.

#### Example:

If your data represents **marital status** over time, you might do:

```python
df_long = wide_to_long_format_data(
    df,
    id_col="person_id",
    time_cols=["2000", "2001", "2002"],
    var_name="year",
    value_name="marital_status"
)
```

This will result in:

```plaintext
person_id   year    marital_status
A           2000    Single
A           2001    Married
A           2002    Married
B           2000    Single
...
```

---

### Summary

| Parameter     | Meaning                                      | Typical Value        |
|---------------|----------------------------------------------|-----------------------|
| `var_name`    | Name for the time column (from old headers)  | `"time"`, `"year"`    |
| `value_name`  | Name for the state column (from cell values) | `"state"`, `"status"` |

These parameters just control the **column names** in the long-format DataFrame — you can customize them based on context.