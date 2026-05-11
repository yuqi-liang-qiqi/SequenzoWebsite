<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 13:29:59
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 13:35:07
 * @FilePath: /SequenzoWebsite/docs/en/data-preprocessing/replace_cluster_id_by_labels.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# `replace_cluster_id_by_labels()`

`replace_cluster_id_by_labels()` is a helper function that lets you replace numeric cluster IDs in a DataFrame with custom labels and optionally rename the identifier and cluster columns.

This is especially useful after running clustering, when you want to give clusters meaningful names (e.g., "Group A", "Group B") instead of numeric IDs.

## Function Usage

```python
new_df = replace_cluster_id_by_labels(
    df,
    mapping={1: "A", 2: "B", 3: "C"},  # optional
    new_cluster_column_name="Cluster",  # optional
    new_id_column_name="Entity ID"      # optional
)
```

## Entry Parameters

| Parameter                 | Required | Type      | Description                                                                                   |
| ------------------------- | -------- | --------- | --------------------------------------------------------------------------------------------- |
| `df`                      | ✓        | DataFrame | Input DataFrame containing at least `"Entity ID"` and `"Cluster"` columns.                    |
| `mapping`                 | ✗        | dict      | Dictionary mapping cluster IDs (keys) to labels (values). Unmapped clusters remain unchanged. |
| `new_cluster_column_name` | ✗        | str       | New name for the cluster column. Default = `"Cluster"`.                                       |
| `new_id_column_name`      | ✗        | str       | New name for the entity ID column. Default = `"Entity ID"`.                                   |

## What It Does

* Checks that your DataFrame contains both `"Entity ID"` and `"Cluster"` columns.
* Validates that all keys in `mapping` exist in the cluster IDs of your DataFrame.
* Replaces cluster IDs with custom labels based on the provided `mapping`.

  * Unmapped clusters remain as their original numeric values.
* Renames the identifier and cluster columns if you provide new names.
* Returns the updated DataFrame.

## Key Features

* **Custom labels**: turn numeric cluster IDs into interpretable names.
* **Validation**: warns you if a mapping key does not exist in your DataFrame.
* **Flexible renaming**: lets you rename `"Entity ID"` and `"Cluster"` columns to fit your workflow.
* **Safe handling**: unmapped clusters stay untouched instead of breaking the DataFrame.

## Examples

### 1. Replace cluster IDs with labels

```python
import pandas as pd

original_df = pd.DataFrame({
    "Entity ID": [1, 2, 3],
    "Cluster": [1, 2, 3]
})

mapping = {1: "A", 2: "B", 3: "C"}

new_df = replace_cluster_id_by_labels(original_df, mapping)
print(new_df)
```

Output:

```
   Entity ID Cluster
0          1       A
1          2       B
2          3       C
```

### 2. Replace IDs and rename columns

```python
new_df = replace_cluster_id_by_labels(original_df,
                                      mapping={1: "A", 2: "B", 3: "C"},
                                      new_cluster_column_name="Group",
                                      new_id_column_name="Person")
print(new_df)
```

Output:

```
   Person Group
0       1     A
1       2     B
2       3     C
```

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

Edited by: Yuqi Liang
