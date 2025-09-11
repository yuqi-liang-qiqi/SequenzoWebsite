<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-11 12:30:19
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-11 13:14:39
 * @FilePath: /SequenzoWebsite/docs/en/data-preprocessing/uniqueid.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `assign_unique_ids()`

`assign_unique_ids()` is a helper function used to add an ID column to your dataset if it does not already have one, before creating a `SequenceData` object.

## Function Usage

```python
df_with_ids = assign_unique_ids(df,
                                id_col_name="Entity ID"  # optional, default = "Entity ID"
                                )
```

## Entry Parameters

| Parameter     | Required | Type      | Description                                                                 |
| ------------- | -------- | --------- | --------------------------------------------------------------------------- |
| `df`          | ✓        | DataFrame | Input dataset. Each row represents an entity (e.g., a person, a case, etc.) |
| `id_col_name` | ✗        | str       | Name of the new ID column. Default = `"Entity ID"`.                         |

## What It Does

* Creates a new column at the **first position** of your DataFrame.
* Fills it with **unique integer IDs**, starting from 0 up to number of rows − 1.
* Raises an error if a column with the same name already exists (to avoid overwriting).
* Returns a **copy** of your DataFrame with the new ID column included.

## Key Features

* **Automatic IDs**: no need to provide IDs yourself.
* **Safe design**: prevents overwriting if the column name is already present.
* **Customizable**: you can rename the ID column via `id_col_name`.
* **Beginner-friendly**: ensures your dataset always has a proper unique identifier, which is especially useful before creating `SequenceData`.

## Examples

### 1. Add IDs to a dataset without identifiers

```python
import pandas as pd

data = pd.DataFrame({
    "Y1": ["EDU", "EDU", "FT"],
    "Y2": ["EDU", "UNEMP", "FT"]
})

df_with_ids = assign_unique_ids(data)
print(df_with_ids)
```

Output:

```
   Entity ID    Y1     Y2
0          0   EDU    EDU
1          1   EDU  UNEMP
2          2    FT     FT
```

### 2. Use a custom column name

```python
df_with_ids = assign_unique_ids(data, id_col_name="Person")
print(df_with_ids)
```

Output:

```
   Person    Y1     Y2
0       0   EDU    EDU
1       1   EDU  UNEMP
2       2    FT     FT
```

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang