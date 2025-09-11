<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-11 13:15:17
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-11 13:44:44
 * @FilePath: /SequenzoWebsite/docs/en/data-preprocessing/clean_time_column.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Cleaning time columns to pure numeric labels

This guide shows how to convert time columns such as `Y1, Y2, Y3, Y4` into clean numeric labels `1, 2, 3, 4`. Clean, numeric time labels make sequence visualizations neater and more intuitive.

## What do the example states mean?

Throughout this guide, we use small and readable state codes:

- `EDU` = Education/Schooling
- `FT` = Full-time employment
- `UNEMP` = Unemployment

These are just examples. In your data, states can be any categorical codes (e.g., `HOME`, `WORK`, `LEAVE`, or numeric codes). The cleaning steps here only rename **time columns**, not the state values.

## Example input

| Entity ID | Y1    | Y2    | Y3    | Y4    |
|-----------|-------|-------|-------|-------|
| 1         | EDU   | EDU   | FT    | FT    |
| 2         | EDU   | UNEMP | UNEMP | FT    |
| 3         | FT    | FT    | FT    | FT    |

Our goal in this guide: rename `Y1…Y4` → `1…4`.

## Method 1 — Specify time columns and strip non-digits (simple and safe)

**When to use**  
You already know which columns are time columns (e.g., `["Y1","Y2","Y3","Y4"]`).

**What it does**  
For each time column, remove all non-digit characters and normalize numbers (e.g., `"Y01"` → `"1"`).

**Code**

```python
import re
import pandas as pd

# Sample data
df = pd.DataFrame({
    "Entity ID": [1, 2, 3],
    "Y1": ["EDU", "EDU", "FT"],
    "Y2": ["EDU", "UNEMP", "FT"],
    "Y3": ["FT", "UNEMP", "FT"],
    "Y4": ["FT", "FT", "FT"]
})

time_cols = ["Y1", "Y2", "Y3", "Y4"]  # explicitly chosen by you

# Build a rename map: "Y1"->"1", "Y2"->"2", ...
rename_map = {}
for c in time_cols:
    digits = re.sub(r"\D+", "", c)     # keep digits only
    digits = str(int(digits))          # normalize "01" -> "1"
    rename_map[c] = digits

df_clean = df.rename(columns=rename_map).copy()
print(df_clean.columns.tolist())  # -> ['Entity ID', '1', '2', '3', '4']
````

**Line-by-line**

* `re.sub(r"\D+", "", c)`: remove one or more non-digit chars.
* `int(digits)`: convert extracted digits to an integer to remove leading zeros.
* `str(...)`: cast back to string for consistent column labels.
* `rename(...)`: actually renames the columns in the DataFrame.

**Pitfalls to avoid**

* Make sure every `time_cols` entry actually contains digits; otherwise `int(digits)` will fail.
* Keep non-time columns (like `Entity ID`) out of `time_cols`.

**Verify**
Check the order and uniqueness after renaming:

```python
assert len(set(df_clean.columns)) == len(df_clean.columns)
assert all(col == str(i) for i, col in enumerate(df_clean.columns[1:], start=1))
```

## Method 2 — Automatically detect and clean time columns (flexible)

**When to use**  
Your dataset uses mixed prefixes (`Y`, `T`, `Year`, etc.), or you don’t want to hard-code all time column names.

**What it does**  
Scans all columns (except protected ones), extracts the first group of digits as the new label, and leaves columns without digits unchanged.

**Copy-paste usage**  
You can copy the function below and use it directly.  
In most cases it will work out-of-the-box, but please check if you need to adjust:
- `protect` → list of columns never to be renamed (e.g., `"Entity ID"`).  
- `min_time`, `max_time` → optional range guard (e.g., only keep 1–120 as valid time labels).  
- Regex pattern → currently `(\d+)` (first group of digits).  

```python
import re
import pandas as pd

def clean_time_columns_auto(
    df: pd.DataFrame,
    protect=("Entity ID",),          # columns NEVER renamed
    min_time=1, max_time=None         # optional numeric range guard
) -> pd.DataFrame:
    rename_map = {}
    for c in df.columns:
        if c in protect:
            continue

        m = re.search(r"(\d+)", str(c))
        if not m:
            # No digits found: skip renaming
            continue

        new_label = str(int(m.group(1)))   # normalize "01" -> "1"

        # Optional guard
        if max_time is not None:
            t = int(new_label)
            if t < min_time or t > max_time:
                continue

        rename_map[c] = new_label

    # Safety check: prevent collisions
    if len(set(rename_map.values())) != len(rename_map.values()):
        raise ValueError(
            f"Name collision detected: {rename_map}. "
            f"Please adjust regex or time range."
        )

    return df.rename(columns=rename_map).copy()
````

**Example usage**

```python
# Example dataset
df = pd.DataFrame({
    "Entity ID": [1, 2, 3],
    "Y1": ["EDU", "EDU", "FT"],
    "T2": ["EDU", "UNEMP", "FT"],
    "Year3": ["FT", "UNEMP", "FT"],
    "Y4": ["FT", "FT", "FT"]
})

# Apply cleaner
df_clean = clean_time_columns_auto(df, protect=("Entity ID",))

print(df_clean.head())
```

**Output**

```text
   Entity ID    1      2      3     4
0          1  EDU    EDU     FT    FT
1          2  EDU  UNEMP  UNEMP    FT
2          3   FT     FT     FT    FT
```

This function is general-purpose and can be **pasted into your preprocessing script**.

But always double-check the results:

* Make sure all intended time columns were renamed.
* Confirm that no unrelated columns got renamed accidentally.
* Inspect the output with `df_clean.head()` before proceeding.

## Keep a mapping for traceability (recommended)

If you need to remember old vs new names (for logs or reproducibility), store the mapping:

```python
# Using Method 1 example
old_to_new = rename_map.copy()
# Save to disk
pd.Series(old_to_new).to_csv("time_col_rename_map.csv", header=["new_name"])
```

## Integrate with Sequenzo

After cleaning, pass the numeric time labels to `SequenceData`.
Use strings to avoid confusion between numeric vs string labels in pandas:

```python
from sequenzo import SequenceData

states = ["EDU", "FT", "UNEMP", "Missing"]
labels = ["Education", "Full-time", "Unemployed", "Missing"]

seq = SequenceData(
    data=df_clean,
    time_type="year",
    time=[str(i) for i in range(1, 5)],  # ['1','2','3','4']
    states=states,
    labels=labels,
    id_col="Entity ID"
)
```

## Quick checklist

* Identify your time columns and convert their labels to pure numbers.
* Ensure all renamed time labels are unique and ordered (`'1','2','3',...`).
* Do not rename non-time columns like `Entity ID`.
* Keep a rename map if you need auditability.
* Define your state codes clearly at the start of the document.