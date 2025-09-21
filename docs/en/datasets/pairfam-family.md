<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-21 14:41:01
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-21 14:57:27
 * @FilePath: /SequenzoWebsite/docs/en/datasets/pairfam-family.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Pairfam Family Trajectories Dataset

This dataset contains 1,866 individuals of family formation, observed monthly from ages 18 to 40 (264 months). It is derived from the **German Family Panel (pairfam, Release 14.2)** and was pre-processed by the authors of Sequence Analysis (Raab & Struffolino, 2022). It is designed for teaching and learning sequence analysis by providing ready-to-use monthly trajectories of family formation.

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

## References

Raab, M., & Struffolino, E. (2022). Sequence analysis (Vol. 190). Sage Publications.

*Author: Yuqi Liang*