# Pairfam Family Formation Trajectories Dataset

This dataset contains German family-formation trajectories for **1,027** individuals (month-level extract). It is derived from the family-history teaching data accompanying [Sequence Analysis (Raab & Struffolino, 2022)](https://sa-book.github.io/). The companion site documents that those teaching examples come from the **German Family Panel (pairfam), Release 10.0**, shared with permission for instructional use.

We provide two versions of the dataset:
- **Year-level data**: 22 yearly observations with state abbreviations
- **Month-level data**: 264 monthly observations (ages 18 to 40) with numeric state codes

::: warning Important Notes
- **The IDs are different** between year-level and month-level data and cannot be directly linked.
- **State encoding differs**: Year-level uses text abbreviations (e.g., "S", "LAT"), while month-level uses numeric codes (1–9).
- The underlying state definitions remain the same across both versions.
- The month-level **family** and **activity** files share the same 1,027 respondent IDs and can be aligned for multidomain analysis; year-level IDs cannot.
:::

## Data origin and processing

* **Source**: Teaching extract accompanying Raab & Struffolino (2022), based on [pairfam](http://www.pairfam.de) **Release 10.0** (GESIS ZA5678, DOI [10.4232/pairfam.5678.10.0.0](https://doi.org/10.4232/pairfam.5678.10.0.0)). The companion Overview & Downloads page states that the example data come from pairfam release 10.0 and were shared with permission for the book’s teaching materials.

* **Sample size**: The published companion `PartnerBirthbio` file has 1,866 records. The Sequenzo month-level file ships the smaller **1,027**-respondent teaching extract already used in the book’s multichannel / age-18-to-40 materials (the same IDs as `Activitybio` / `MultiChannel`). Sequenzo did not re-derive that sample filter in the packaging scripts linked below.

* **Processing by book authors**: Partnership and parental status were coded into nine family states (see encoding table below).

* **Our preprocessing**: For this prepared extract, Sequenzo retains the original state integers and renames the 264 time columns (`family1`…`family264` or `state1`…`state264` → `1`…`264`) with `clean_time_columns_auto()`. **State integers were not recoded.**

  Cleaning code: [pairfam_and_little_green_book/code](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/pairfam_and_little_green_book/code).

* **Verification**: Against companion `PartnerBirthbio` state codes, **1,027 matched respondent IDs** show **identical state codes in all 264 monthly positions** (aggregated crosstab is diagonal; agreement rate = 1.0).

* **Result**: A **9-state alphabet** with the green-book numeric coding.

## Family states encoding

Numeric codes follow the Raab & Struffolino companion data (original Stata value labels). Pass labels to `SequenceData` in this same order.

| Numeric Code | Abbreviation | Description |
| ------------ | ------------ | ---------------------------- |
| 1            | S            | Single, no child             |
| 2            | Sc           | Single, with child(ren)      |
| 3            | LAT          | Living apart together, no child |
| 4            | LATc         | LAT, with child(ren)         |
| 5            | COH          | Cohabiting, no child         |
| 6            | COHc         | Cohabiting, with child(ren)  |
| 7            | MAR          | Married, no child            |
| 8            | MARc1        | Married, 1 child             |
| 9            | MARc2+       | Married, 2+ children         |

---

## Year-level data

**File**: `pairfam_family_by_year.csv`

This dataset contains **1,027** individuals observed over 22 years. The states are encoded directly as **text abbreviations** (e.g., "S", "LAT", "COH", "MAR", "Sc", "LATc", "COHc", "MARc1", "MARc2+").

::: warning No Covariates
Unlike the month-level data, the year-level data **does not include any covariates**. The `id` column contains randomly generated identifiers created during our preprocessing and **cannot be linked** to other datasets or the month-level data.
:::

| Column       | Description |
| ------------ | ----------- |
| `id`         | Random teaching ID (not linkable to month-level) |
| `1` … `22`   | Yearly family trajectory states, encoded as **abbreviations** (e.g., "S", "LAT") |

---

## Month-level data

**File**: `pairfam_family_by_month.csv`

This dataset contains 1,027 individuals observed monthly from ages 18 to 40 (264 months). The states are encoded as **numeric codes** (1–9) according to the encoding table above.

Besides the state sequences, the dataset includes several covariates:

| Column                   | Description                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `id`                     | Original respondent identifier from the teaching extract            |
| `weight40`               | Survey weight                                                       |
| `sex`                    | Sex                                                                 |
| `doby_gen` / `dob`       | Birth-year / date-of-birth fields from the teaching extract         |
| `ethni` / `migstatus`    | Ethnicity / migration-status fields                                 |
| `yeduc` / `highschool`   | Education-related covariates                                        |
| `sat1i4`, `sat5`, `sat6` | Satisfaction items from the teaching extract                        |
| `1` … `264`              | Monthly family trajectory states, coded 1–9 as above                |

## Loading the data in Sequenzo

```python
from sequenzo import load_dataset, SequenceData

df = load_dataset("pairfam_family_by_month")

time_list = [str(i) for i in range(1, 265)]
states = list(range(1, 10))
labels = [
    "Single, no child",
    "Single, with child(ren)",
    "Living apart together, no child",
    "LAT, with child(ren)",
    "Cohabiting, no child",
    "Cohabiting, with child(ren)",
    "Married, no child",
    "Married, 1 child",
    "Married, 2+ children",
]

seq = SequenceData(
    df,
    time=time_list,
    id_col="id",
    states=states,
    labels=labels,
    weights=df["weight40"].to_numpy(),
)
```

## Related datasets

- [pairfam activity trajectories](./pairfam-activity.md) — employment/activity channel for the same 1,027 month-level IDs.
