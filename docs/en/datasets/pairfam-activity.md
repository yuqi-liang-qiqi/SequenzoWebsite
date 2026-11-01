# Pairfam Activity Trajectories Dataset

This dataset contains German employment/activity trajectories for **1,027** individuals (month-level extract). It is derived from the teaching data accompanying [Sequence Analysis (Raab & Struffolino, 2022)](https://sa-book.github.io/). The companion site documents that those teaching examples come from the **German Family Panel (pairfam), Release 10.0**, shared with permission for instructional use (GESIS ZA5678, DOI [10.4232/pairfam.5678.10.0.0](https://doi.org/10.4232/pairfam.5678.10.0.0)).

We provide two versions of the dataset:
- **Year-level data**: 22 yearly observations with state abbreviations
- **Month-level data**: 264 monthly observations (ages 18 to 40) with numeric state codes

::: warning Important Notes
- **The IDs are different** between year-level and month-level data and cannot be directly linked.
- **State encoding differs**: Year-level uses text abbreviations (e.g., "EDU", "FT"), while month-level uses numeric codes (1–8).
- The month-level **activity** and **family** files share the same 1,027 respondent IDs and can be aligned for multidomain analysis; year-level IDs cannot.
:::

## Data origin and processing

* **Source**: Companion teaching extract (`Activitybio` / multichannel materials) based on pairfam Release 10.0. The shipped month-level file has **1,027** respondents (identical IDs to `pairfam_family_by_month`).

* **Processing by book authors**: Employment and activity status was categorized into eight states (see encoding table).

* **Our preprocessing**: Column renaming only (`activity1`…`activity264` or `state1`…`state264` → `1`…`264`). **State integers were not recoded.**

  Cleaning code: [pairfam_and_little_green_book/code](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/pairfam_and_little_green_book/code).

* **Verification**: Against companion text-label activity sequences, numeric codes 1–8 map one-for-one to EDU, MIL/CS, PT, FT, SELF, PLEAVE, MARGINAL, UNEMP over all 264 months (crosstab diagonal). Some older Sequenzo tutorials used a different eight-label wording; prefer this table.

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

This dataset contains **1,027** individuals observed over 22 years. The states are encoded directly as **text abbreviations** (e.g., "EDU", "FT", "PT", "PLEAVE").

::: warning No Covariates
Unlike the month-level data, the year-level data **does not include any covariates**. The `id` column contains randomly generated identifiers created during our preprocessing and **cannot be linked** to other datasets or the month-level data.
:::

### Structure

| Column       | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| `id`         | Individual identifier (simple sequential integers; cannot be linked to other datasets) |
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

## Reference

Raab, M., & Struffolino, E. (2022). Sequence analysis (Vol. 190). Sage Publications.

## See Also

- [pairfam family trajectories](./pairfam-family.md) — family channel for the same month-level IDs.
- [Datasets Overview](/en/datasets/introduction) helps choose a dataset by research question.
- [`SequenceData`](/en/function-library/sequence-data) shows how to define sequences from a dataset.
- [Quickstart](/en/basics/quickstart) runs a complete analysis on a bundled dataset.

*Author: Yuqi Liang*
