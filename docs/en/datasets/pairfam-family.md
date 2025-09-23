<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-21 14:41:01
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-21 14:57:27
 * @FilePath: /SequenzoWebsite/docs/en/datasets/pairfam-family.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Pairfam Family Trajectories Dataset

This dataset contains German 1,866 individuals of family formation, observed monthly from ages 18 to 40 (264 months). It is derived from the **German Family Panel (pairfam, Release 14.2)** and was pre-processed by the authors of Sequence Analysis (Raab & Struffolino, 2022). It is designed for teaching and learning sequence analysis by providing ready-to-use monthly trajectories of family formation.

## Data origin and processing

* **Source**: pairfam ([www.pairfam.de](http://www.pairfam.de)), a large-scale longitudinal survey on partnership and family dynamics in Germany.

* **Processing by book authors**:

  1. Partnership status (single, LAT, cohabiting, married) was combined with parental status (number of children).
  2. For non-married statuses, only the distinction between “with children” vs. “without children” was kept.
  3. For married statuses, an additional distinction between one child vs. two or more children was made.
  4. Rare combinations (e.g., single with 2+ children) were collapsed into the broader “with children” category.


* **Result**: A simplified **9-state alphabet**, recoded numerically (1–9) in `family.csv`.

## Family states (numeric coding)

| Numeric code | Abbreviation | Description                  |
| ------------ | ------------ | ---------------------------- |
| 1            | S            | Single, no child             |
| 2            | LAT          | LAT, no child                |
| 3            | COH          | Cohabiting, no child         |
| 4            | MAR          | Married, no child            |
| 5            | Sc           | Single, with child\[ren]     |
| 6            | LATc         | LAT, with child\[ren]        |
| 7            | COHc         | Cohabiting, with child\[ren] |
| 8            | MARc1        | Married, 1 child             |
| 9            | MARc2+       | Married, 2+ children         |

## Other columns

Besides the state sequences, the dataset includes several other variables:

| Column                   | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `id`                     | Individual identifier                                                   |
| `weight40`               | Survey weight at age 40 (design weight)                                 |
| `sex`                    | Sex (1 = male, 0 = female)                                              |
| `doby_gen`               | Year of birth (generation year)                                         |
| `dob`                    | Month-year of birth (numerical encoding)                                |
| `ethni`                  | Ethnicity indicator                                                     |
| `migstatus`              | Migration background status                                             |
| `yeduc`                  | Years of education                                                      |
| `sat1i4`, `sat5`, `sat6` | Selected satisfaction indicators from the survey                        |
| `highschool`             | High school graduation status                                           |
| `church`                 | Church attendance indicator                                             |
| `biosib`                 | Number of biological siblings                                           |
| `stepsib`                | Number of step-siblings                                                 |
| `east`                   | Region indicator (East vs. West Germany)                                |
| `famstructure18`         | Family structure at age 18                                              |
| `state1 … state264`      | Monthly family trajectory states from age 15 onward, coded 1–9 as above |

## Sample data

Below is a small extract of the dataset:

| id      | weight40 | sex | doby\_gen | dob | ethni | migstatus | yeduc | highschool | church | biosib | east | state1 | state2 | state3 | state4 | state5 | … |
| ------- | -------- | --- | --------- | --- | ----- | --------- | ----- | ---------- | ------ | ------ | ---- | ------ | ------ | ------ | ------ | ------ | - |
| 111000  | 0.344    | 1   | 1971      | 855 | 1     | 1         | 11.5  | 0          | 0      | 1      | 1    | 5      | 5      | 5      | 5      | 5      | … |
| 1624000 | 1.467    | 1   | 1973      | 880 | 1     | 1         | 11.5  | 0          | 1      | 1      | 1    | 1      | 1      | 1      | 1      | 1      | … |
| 2767000 | 0.464    | 1   | 1971      | 853 | 1     | 1         | 9.0   | 0          | 0      | 3      | 0    | 1      | 1      | 1      | 1      | 1      | … |
| 2931000 | 1.767    | 0   | 1973      | 881 | 5     | 3         | 10.5  | 0          | 1      | 1      | 0    | 1      | 1      | 1      | 1      | 1      | … |
| 3167000 | 0.885    | 1   | 1973      | 883 | 1     | 1         | 11.5  | 0          | 0      | 1      | 0    | 3      | 3      | 3      | 3      | 3      | … |

Here `state1`–`state5` show the first five months of the trajectory, coded as 1–9 according to the state table above.

## Data preprocessing
To make the data more convenient to use, we performed a minor preprocessing step, converting `state1 ... state264` to `1 ... 264` before adding it to our prepared dataset.

The data preprocessing function we use is `clean_time_columns_auto()`. Simply put, it is a smart tool for cleaning column names.
Its main purpose is to automatically scan a DataFrame, identify columns with names containing numbers (e.g., `state1`, `wave2`, `year2023`), and then simplify these names to just the numbers they contain (becoming `1`, `2`, `2023`).
This feature is particularly useful when processing time-series or panel data, as it allows for the quick standardization of column names that represent different points in time.

Related parameters:

* `df`: The DataFrame you want to process.
* `protect`: A list of protected column names. The names written here (for instance, 'id', 'sex', 'age', etc.) will not be automatically changed by the function and will be kept in their original form. 
* `min_time` and `max_time` (Optional): A time range for filtering. You can use it to tell the function to only handle columns where the number in the name falls within a specific range.

Here are the detailed steps. You can also refer to the tutorial of [clean_time_columns](https://sequenzo.yuqi-liang.tech/en/data-preprocessing/clean_time_columns).

```python
# import dependencies

import re
import pandas as pd

#load the data and preview it

df = pd.read_csv('D:\\sequenzo\\family.csv')

df
```
```python
# check all the columns name
columns_name_list = df.columns.to_list()

columns_name_list
```
```python
def clean_time_columns_auto(
    df: pd.DataFrame,
    protect=('id',
 'weight40',
 'sex',
 'doby_gen',
 'dob',
 'ethni',
 'migstatus',
 'yeduc',
 'sat1i4',
 'sat5',
 'sat6',
 'highschool',
 'church',
 'biosib',
 'stepsib',
 'east',
 'famstructure18',),                     # Keep these column names as they are
    min_time=1, max_time=None            # Define the time range for selection
) -> pd.DataFrame:
    rename_map = {}
    for c in df.columns:
        if c in protect:
            continue

        m = re.search(r"(\d+)", str(c))
        if not m:
            # No digits found: skip renaming
            continue

        new_label = str(int(m.group(1))) # Standarization "01" --> "1"

        # Optional constraints (if needed)
        if max_time is not None:
            t = int(new_label)
            if t < min_time or t > max_time:
                continue

        rename_map[c] = new_label

    # Defensive measure: Avoid duplicate column names
    if len(set(rename_map.values())) != len(rename_map.values()):
        raise ValueError(
            f"Name collision detected: {rename_map}. "
            f"Please adjust regex or time range."
        )

    return df.rename(columns=rename_map).copy(),rename_map
```
```python
df_clean,rename_map = clean_time_columns_auto(df,protect=('id',
 'weight40',
 'sex',
 'doby_gen',
 'dob',
 'ethni',
 'migstatus',
 'yeduc',
 'sat1i4',
 'sat5',
 'sat6',
 'highschool',
 'church',
 'biosib',
 'stepsib',
 'east',
 'famstructure18',))

print(df_clean.head())
```
If you need to log the "old column name -> new column name" mapping (for logging or to ensure future reproducibility), you can do it as follows:

```python

old_to_new = rename_map.copy()
# Save to a local file
pd.Series(old_to_new).to_csv("time_col_rename_map.csv", header=["new_name"])

print("\nColumn name mapping has been successfully saved to 'time_col_rename_map.csv'!")
```
Below is a small extract of the dataset after preprocessing:

| id      | weight40 | sex | doby\_gen | dob | ethni | migstatus | yeduc | highschool | church | biosib | east | 1 | 2 | 3 | 4 | 5 | … |
| ------- | -------- | --- | --------- | --- | ----- | --------- | ----- | ---------- | ------ | ------ | ---- | ------ | ------ | ------ | ------ | ------ | - |
| 111000  | 0.344    | 1   | 1971      | 855 | 1     | 1         | 11.5  | 0          | 0      | 1      | 1    | 5      | 5      | 5      | 5      | 5      | … |
| 1624000 | 1.467    | 1   | 1973      | 880 | 1     | 1         | 11.5  | 0          | 1      | 1      | 1    | 1      | 1      | 1      | 1      | 1      | … |
| 2767000 | 0.464    | 1   | 1971      | 853 | 1     | 1         | 9.0   | 0          | 0      | 3      | 0    | 1      | 1      | 1      | 1      | 1      | … |
| 2931000 | 1.767    | 0   | 1973      | 881 | 5     | 3         | 10.5  | 0          | 1      | 1      | 0    | 1      | 1      | 1      | 1      | 1      | … |
| 3167000 | 0.885    | 1   | 1973      | 883 | 1     | 1         | 11.5  | 0          | 0      | 1      | 0    | 3      | 3      | 3      | 3      | 3      | … |

## Reference

Raab, M., & Struffolino, E. (2022). Sequence analysis (Vol. 190). Sage Publications.

*Author: Yuqi Liang*