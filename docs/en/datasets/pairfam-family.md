<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-21 14:41:01
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-01-30 16:58:50
 * @FilePath: /SequenzoWebsite/docs/en/datasets/pairfam-family.md
 * @Description: Pairfam Family Trajectories Dataset documentation
-->
# Pairfam Family Trajectories Dataset

This dataset contains German 1,027 individuals of family formation trajectories. It is derived from the **German Family Panel (pairfam, Release 14.2)** and was pre-processed by the authors of [Sequence Analysis (Raab & Struffolino, 2022)](https://sa-book.github.io/). It is designed for teaching and learning sequence analysis by providing ready-to-use trajectories of family formation.

We provide two versions of the dataset:
- **Year-level data**: 22 yearly observations with state abbreviations
- **Month-level data**: 264 monthly observations (ages 18 to 40) with numeric state codes

::: warning Important Notes
- **The IDs are different** between year-level and month-level data and cannot be directly linked.
- **State encoding differs**: Year-level uses text abbreviations (e.g., "S", "LAT"), while month-level uses numeric codes (1–9).
- The underlying state definitions remain the same across both versions.
:::

## Data origin and processing

* **Source**: [pairfam](http://www.pairfam.de), a large-scale longitudinal survey on partnership and family dynamics in Germany.

* **Processing by book authors**:

  1. Partnership status (single, LAT, cohabiting, married) was combined with parental status (number of children).
  2. For non-married statuses, only the distinction between "with children" vs. "without children" was kept.
  3. For married statuses, an additional distinction between one child vs. two or more children was made.
  4. Rare combinations (e.g., single with 2+ children) were collapsed into the broader "with children" category.

* **Our preprocessing**: To make the data more convenient to use, we performed a minor preprocessing step, converting `state1 ... state264` to `1 ... 264` before adding it to our prepared dataset.

  The data preprocessing function we use is `clean_time_columns_auto()`. Simply put, it is a smart tool for cleaning column names. Its main purpose is to automatically scan a DataFrame, identify columns with names containing numbers (e.g., `state1`, `wave2`, `year2023`), and then simplify these names to just the numbers they contain (becoming `1`, `2`, `2023`). This feature is particularly useful when processing time-series or panel data, as it allows for the quick standardization of column names that represent different points in time.

  For more details on how we cleaned and prepared the data, see the [data cleaning code repository](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/pairfam_and_little_green_book/code).

* **Result**: A simplified **9-state alphabet**.

## Family states encoding

| Numeric Code | Abbreviation | Description                  |
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

---

## Year-level data

**File**: `pairfam_family_by_year.csv`

This dataset contains 1,029 individuals observed over 22 years. The states are encoded directly as **text abbreviations** (e.g., "S", "LAT", "COH", "MAR", "Sc", "LATc", "COHc", "MARc1", "MARc2+").

::: warning No Covariates
Unlike the month-level data, the year-level data **does not include any covariates**. The `id` column contains randomly generated identifiers created during our preprocessing and **cannot be linked** to other datasets or the month-level data.
:::

### Structure

| Column       | Description                                                                 |
| ------------ | --------------------------------------------------------------------------- |
| `id`         | Randomly generated identifier (simple sequential integers: 
194, 896, 284, ..., cannot be linked to other datasets)          |
| `1` … `22`   | Yearly family trajectory states, encoded as **abbreviations** (e.g., "S", "LAT") |

### Sample data

| id  | 1   | 2     | 3    | 4    | 5    | 6    | 7   | 8   | 9   | 10  | … |
| --- | --- | ----- | ---- | ---- | ---- | ---- | --- | --- | --- | --- | - |
| 194 | COH | MARc1 | LATc | LATc | LATc | LATc | Sc  | Sc  | Sc  | Sc  | … |
| 896 | S   | S     | S    | S    | S    | S    | S   | LAT | LAT | LAT | … |
| 284 | S   | S     | LAT  | LAT  | S    | S    | S   | LAT | S   | S   | … |
| 886 | LAT | S     | LAT  | LAT  | S    | S    | LAT | LAT | LAT | LAT | … |

---

## Month-level data

**File**: `pairfam_family_by_month.csv`

This dataset contains 1,027 individuals observed monthly from ages 18 to 40 (264 months). The states are encoded as **numeric codes** (1–9) according to the encoding table above.

### Structure

Besides the state sequences, the dataset includes several covariates:

| Column                   | Description                                                             |
| ------------------------ | ----------------------------------------------------------------------- |
| `id`                     | Individual identifier (original pairfam IDs, e.g., 111000, 2931000)     |
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
| `1` … `264`              | Monthly family trajectory states, coded 1–9 as above                    |

### Sample data

| id      | weight40 | sex | doby\_gen | dob | ethni | migstatus | yeduc | highschool | church | biosib | east | 1 | 2 | 3 | 4 | 5 | … |
| ------- | -------- | --- | --------- | --- | ----- | --------- | ----- | ---------- | ------ | ------ | ---- | - | - | - | - | - | - |
| 111000  | 0.344    | 1   | 1971      | 855 | 1     | 1         | 11.5  | 0          | 0      | 1      | 1    | 5 | 5 | 5 | 5 | 5 | … |
| 2931000 | 1.767    | 0   | 1973      | 881 | 5     | 3         | 10.5  | 0          | 1      | 1      | 0    | 1 | 1 | 1 | 1 | 1 | … |
| 3491000 | 0.727    | 1   | 1971      | 857 | 1     | 1         | 18.0  | 1          | 1      | 3      | 0    | 1 | 1 | 1 | 1 | 1 | … |

Here columns `1`–`5` show the first five months of the trajectory, coded as 1–9 according to the state table above.

---

## Multichannel data (reference only)

**File**: `MultiChannel.csv`

This file combines both family and activity trajectories in a single dataset, with columns prefixed by `family` and `activity` respectively. This is useful for multichannel sequence analysis.

::: tip Note
`MultiChannel.csv` is **not supported** by `load_dataset()` and is provided for reference only. You can download it manually from the [month-level data sources](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/pairfam_and_little_green_book/data_sources/month_level) repository.
:::

### Structure

| Column                       | Description                                                    |
| ---------------------------- | -------------------------------------------------------------- |
| `id`                         | Individual identifier (original pairfam IDs)                   |
| Covariates                   | Same as month-level data above                                 |
| `family1` … `family264`      | Monthly family trajectory states (numeric codes 1–9)           |
| `activity1` … `activity264`  | Monthly activity trajectory states (numeric codes 1–8)         |

---

## Reference

Raab, M., & Struffolino, E. (2022). Sequence analysis (Vol. 190). Sage Publications.

*Author: Yuqi Liang*
