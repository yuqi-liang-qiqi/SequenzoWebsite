<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-21 14:41:01
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2026-01-30 17:15:48
 * @FilePath: /SequenzoWebsite/docs/en/datasets/pairfam-activity.md
 * @Description: Pairfam Activity Trajectories Dataset documentation
-->
# Pairfam Activity Trajectories Dataset

This dataset contains German 1,027 individuals of employment/activity trajectories. It is derived from the **German Family Panel (pairfam, Release 14.2)** and was pre-processed by the authors of [Sequence Analysis (Raab & Struffolino, 2022)](https://sa-book.github.io/). It is designed for teaching and learning sequence analysis by providing ready-to-use trajectories of employment status.

We provide two versions of the dataset:
- **Year-level data**: 22 yearly observations with state abbreviations
- **Month-level data**: 264 monthly observations (ages 18 to 40) with numeric state codes

::: warning Important Notes
- **The IDs are different** between year-level and month-level data and cannot be directly linked.
- **State encoding differs**: Year-level uses text abbreviations (e.g., "EDU", "FT"), while month-level uses numeric codes (1–8).
- The underlying state definitions remain the same across both versions.
:::

## Data origin and processing

* **Source**: [pairfam](http://www.pairfam.de), a large-scale longitudinal survey on partnership and family dynamics in Germany.

* **Processing by book authors**: Employment and activity status was categorized into 8 distinct states representing different types of labor market participation and non-participation.

* **Our preprocessing**: To make the data more convenient to use, we performed a minor preprocessing step, converting `state1 ... state264` to `1 ... 264` before adding it to our prepared dataset.

  The data preprocessing function we use is `clean_time_columns_auto()`. Simply put, it is a smart tool for cleaning column names. Its main purpose is to automatically scan a DataFrame, identify columns with names containing numbers (e.g., `state1`, `wave2`, `year2023`), and then simplify these names to just the numbers they contain (becoming `1`, `2`, `2023`). This feature is particularly useful when processing time-series or panel data, as it allows for the quick standardization of column names that represent different points in time.

  For more details on how we cleaned and prepared the data, see the [data cleaning code repository](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/pairfam_and_little_green_book/code).

* **Result**: An **8-state alphabet**.

## Activity states encoding

| Numeric Code | Abbreviation | Description              |
| ------------ | ------------ | ------------------------ |
| 1            | EDU          | Education                |
| 2            | MIL/CS       | Military/Civil Service   |
| 3            | PT           | Part-time Employment     |
| 4            | FT           | Full-time Employment     |
| 5            | SELF         | Self-employed            |
| 6            | PLEAVE       | Parental Leave           |
| 7            | MARGINAL     | Marginal Employment      |
| 8            | UNEMP        | Unemployed               |

## Year-level data

**File**: `pairfam_activity_by_year.csv`

This dataset contains 1,029 individuals observed over 22 years. The states are encoded directly as **text abbreviations** (e.g., "EDU", "FT", "PT", "PLEAVE").

### Structure

| Column       | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| `id`         | Individual identifier (simple sequential integers: 194, 896, 284, ...)            |
| `1` … `22`   | Yearly activity trajectory states, encoded as **abbreviations** (e.g., "EDU", "FT") |

### Sample data

| id  | 1   | 2   | 3      | 4      | 5     | 6   | 7   | 8   | 9   | 10  | … |
| --- | --- | --- | ------ | ------ | ----- | --- | --- | --- | --- | --- | - |
| 194 | FT  | PLEAVE | FT   | FT     | FT    | FT  | PLEAVE | PLEAVE | PLEAVE | FT | … |
| 896 | EDU | EDU | MIL/CS | FT     | UNEMP | FT  | FT  | FT  | FT  | FT  | … |
| 284 | EDU | EDU | EDU    | EDU    | EDU   | EDU | FT  | FT  | FT  | FT  | … |
| 886 | EDU | EDU | EDU    | EDU    | EDU   | EDU | EDU | EDU | EDU | UNEMP | … |

## Month-level data

**File**: `pairfam_activity_by_month.csv`

This dataset contains 1,027 individuals observed monthly from ages 18 to 40 (264 months). The states are encoded as **numeric codes** (1–8) according to the encoding table above.

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
| `1` … `264`              | Monthly activity trajectory states, coded 1–8 as above                  |

### Sample data

| id      | weight40 | sex | doby\_gen | dob | ethni | migstatus | yeduc | highschool | church | biosib | east | 1 | 2 | 3 | 4 | 5 | … |
| ------- | -------- | --- | --------- | --- | ----- | --------- | ----- | ---------- | ------ | ------ | ---- | - | - | - | - | - | - |
| 111000  | 0.344    | 1   | 1971      | 855 | 1     | 1         | 11.5  | 0          | 0      | 1      | 1    | 4 | 4 | 4 | 4 | 4 | … |
| 2931000 | 1.767    | 0   | 1973      | 881 | 5     | 3         | 10.5  | 0          | 1      | 1      | 0    | 1 | 1 | 1 | 1 | 1 | … |
| 3491000 | 0.727    | 1   | 1971      | 857 | 1     | 1         | 18.0  | 1          | 1      | 3      | 0    | 1 | 1 | 1 | 1 | 1 | … |

Here columns `1`–`5` show the first five months of the trajectory, coded as 1–8 according to the state table above.

## Multichannel data (reference only)

For multichannel sequence analysis combining both family and activity trajectories, see the `MultiChannel.csv` file documented in the [Pairfam Family Trajectories](./pairfam-family.md#multichannel-data) page. 

Note that `MultiChannel.csv` is **not supported** by `load_dataset()` and is provided for reference only. You can download it manually from the [month-level data sources](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/pairfam_and_little_green_book/data_sources/month_level) repository.

## Reference

Raab, M., & Struffolino, E. (2022). Sequence analysis (Vol. 190). Sage Publications.

*Author: Yuqi Liang*
