<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-11-23 20:06:58
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-02-08 18:03:34
 * @FilePath: /SequenzoWebsite/docs/en/data-preprocessing/clean_time_columns.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Cleaning time columns to pure numeric labels

Time columns like `Y1`, `status1`, `pstatus15` are easier to use in Sequenzo when renamed to plain numbers: `1`, `2`, `15`. This guide shows the simplest way first, then an optional manual method.

## Recommended: use the helper function

Sequenzo provides **`clean_time_columns_auto`**: it renames time columns to the number inside the name (e.g. `status15` → `15`). Other columns (e.g. `id`, `sex`) are left unchanged.

**One-line idea:**  
Import the function, call it on your DataFrame, optionally tell it which column names to treat as time columns (by prefix).

### Basic usage

```python
from sequenzo.data_preprocessing import clean_time_columns_auto

# Your data: columns like status1, status2, status3, status4
df_clean = clean_time_columns_auto(df, prefix_patterns=["status"])
# Result: those columns become 1, 2, 3, 4
```

- **`df`**: your DataFrame.
- **`prefix_patterns`**: list of prefixes. Only columns whose name **starts with** one of these are renamed.  
  Example: `["status"]` renames `status1`, `status2`, … to `1`, `2`, …  
  Example: `["status", "pstatus"]` also renames `pstatus15` → `15`, etc.

If you don’t pass `prefix_patterns` (or pass `None`), the function will process any column whose name contains both letters and digits. Use `prefix_patterns` when you have other columns that contain numbers (e.g. `id`, `year_birth`) and you only want to rename time columns like `status1`, `status2`.

### Example

```python
import pandas as pd
from sequenzo.data_preprocessing import clean_time_columns_auto

df = pd.DataFrame({
    "id": [1, 2, 3],
    "status1": ["EDU", "EDU", "FT"],
    "status2": ["EDU", "UNEMP", "FT"],
    "status3": ["FT", "UNEMP", "FT"],
    "status4": ["FT", "FT", "FT"]
})

df_clean = clean_time_columns_auto(df, prefix_patterns=["status"])
print(df_clean.columns.tolist())   # ['id', '1', '2', '3', '4']
```

After cleaning, use `df_clean` with `SequenceData` and pass the numeric time labels (e.g. `time=['1','2','3','4']`). See [Integrate with Sequenzo](#integrate-with-sequenzo) below.

## Integrate with Sequenzo

After you have numeric time column names (e.g. `1`, `2`, `3`, `4`), create your sequence data like this:

```python
from sequenzo import SequenceData

seq = SequenceData(
    data=df_clean,
    time=["1", "2", "3", "4"],   # match your cleaned column names
    states=states,
    labels=labels,
    id_col="id"
)
```

Use string time labels (e.g. `"1"`, `"2"`) to avoid confusion with pandas column types.

## Optional: manual method (explicit column list)

If you prefer to specify exactly which columns are time columns (e.g. `["Y1","Y2","Y3","Y4"]`) and rename them yourself:

```python
import re
import pandas as pd

time_cols = ["Y1", "Y2", "Y3", "Y4"]
rename_map = {}
for c in time_cols:
    digits = re.sub(r"\D+", "", c)
    rename_map[c] = str(int(digits))

df_clean = df.rename(columns=rename_map)
```

This turns `Y1` → `1`, `Y2` → `2`, etc. Do not include non-time columns (e.g. `Entity ID`) in `time_cols`.

---

*Code Author: Yuqi Liang*

*Document Author: Yuqi Liang, Liangxingyun He*
