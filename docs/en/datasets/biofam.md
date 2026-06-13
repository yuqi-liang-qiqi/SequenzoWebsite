# Biofam Family Life Trajectories Dataset

The `biofam` dataset contains family life trajectories for 2,000 individuals in Switzerland. It describes how people moved through different family-life states between ages 15 and 30, such as living with parents, leaving home, getting married, having children, or becoming divorced.

This dataset is a classic teaching dataset in social sequence analysis. It was constructed by Müller, Studer, and Ritschard (2007) from the retrospective biographical survey carried out by the Swiss Household Panel (SHP) in 2002. The same dataset is also distributed with the R package TraMineR as `biofam`. Our version follows the TraMineR version and is provided here so that Sequenzo users can learn sequence analysis with a well-known benchmark dataset in Python.

## What does this dataset describe?

The dataset follows family life courses from age 15 to age 30. Each person is observed for 16 yearly time points.

In simple terms, each row is one person, and the yearly columns describe that person’s family-life situation at each age.

For example, one person may live with their parents for several years, then leave home, get married, and later have children:

```text
Parent → Parent → Left → Left+Marr → Left+Marr+Child
```

Another person may remain living with their parents for the whole observed period:

```text
Parent → Parent → Parent → Parent → Parent
```

This makes the dataset useful for learning how sequence analysis can describe family trajectories, compare life-course patterns, and study how family transitions differ across birth cohorts, gender, nationality, language groups, religion, or social background.

## Data origin

* Source survey: Swiss Household Panel (SHP), retrospective biographical survey conducted in 2002.

* Dataset construction: The `biofam` dataset was constructed by Müller, Studer, and Ritschard (2007).

* TraMineR version: The dataset is included in TraMineR as `biofam`. According to the TraMineR documentation, it contains 2,000 rows, 16 state variables, 1 ID variable, 7 covariates, and 2 weight variables.

## State sequence structure

The main sequence part of the dataset consists of 16 yearly family-life state columns.

These columns represent ages:

```text
15, 16, 17, ..., 30
```

Each column records the person’s family-life state at that age.

For example, the sequence columns:

```text
15, 16, 17, 18, ..., 30
```

should be read as:

```text
family state at age 15, family state at age 16, family state at age 17, ..., family state at age 30
```

## Family life states

The family-life states are coded from `0` to `7`. These states are built from combinations of five basic family events or statuses:

```text
Living with parents, left home, married, having children, divorced
```

The resulting state alphabet is:

| Numeric Code | State Label     | Description                                                |
| -----------: | --------------- | ---------------------------------------------------------- |
|            0 | Parent          | Living with parents                                        |
|            1 | Left            | Left parental home                                         |
|            2 | Married         | Married, not yet left parental home in the combined coding |
|            3 | Left+Marr       | Left parental home and married                             |
|            4 | Child           | Having children                                            |
|            5 | Left+Child      | Left parental home and having children                     |
|            6 | Left+Marr+Child | Left parental home, married, and having children           |
|            7 | Divorced        | Divorced                                                   |

In sequence analysis, these eight states form the alphabet of the dataset. An alphabet simply means the set of possible states that can appear in a sequence.

For example, the sequence:

```text
0, 0, 0, 1, 1, 3, 6, 6
```

can be read as:

```text
Parent → Parent → Parent → Left → Left → Left+Marr → Left+Marr+Child → Left+Marr+Child
```

This describes a gradual transition from living with parents, to leaving home, to marriage, and then to having children.

## File structure

File: `biofam.csv`

The dataset contains:

| Column type      | Description                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------------- |
| `idhous`         | Individual or household identifier                                                                        |
| Covariates       | Background variables such as sex, birth year, nationality, language, religion, and parental social status |
| `15` … `30`      | Yearly family-life states from age 15 to age 30                                                           |
| Weight variables | Two illustrative weight variables from the TraMineR version                                               |

A simplified structure looks like this:

| idhous | sex   | birthyr | nat_1_02    | plingu02 | 15 | 16 | 17 | ... | 30 | wp00tbgp | wp00tbgs |
| -----: | ----- | ------: | ----------- | -------- | -: | -: | -: | --- | -: | -------: | -------: |
|  66891 | man   |    1943 | Switzerland | german   |  0 |  0 |  0 | ... |  6 |  1053.37 |     0.93 |
|  28621 | man   |    1935 | Switzerland | german   |  0 |  1 |  1 | ... |  6 |   855.43 |     0.76 |
|  57711 | woman |    1946 | Switzerland | french   |  0 |  0 |  0 | ... |  6 |   575.21 |     0.51 |

Here, columns `15` to `30` are the actual sequence columns. They describe each person’s family-life state at each age.

## Covariates

Besides the sequence columns, the dataset also includes background variables. These variables can be used to compare family trajectories across different social groups.

| Column     | Description                              |
| ---------- | ---------------------------------------- |
| `idhous`   | Individual or household identifier       |
| `sex`      | Sex of the respondent                    |
| `birthyr`  | Birth year                               |
| `nat_1_02` | First nationality                        |
| `plingu02` | Language of the questionnaire            |
| `p02r01`   | Religion                                 |
| `p02r04`   | Religious participation                  |
| `cspfaj`   | Father’s social status                   |
| `cspmoj`   | Mother’s social status                   |
| `wp00tbgp` | Weight inflating to the Swiss population |
| `wp00tbgs` | Weight respecting sample size            |

::: warning Note on weights
The two weight variables are included for illustrative purposes only. Because `biofam` is a subsample of the original Swiss Household Panel data, these weights are not fully adapted to the actual dataset used here.
:::

## How to read the data

Suppose one row contains the following sequence from age 15 to age 30:

```text
0, 0, 0, 0, 1, 1, 1, 3, 6, 6, 6, 6, 6, 6, 6, 6
```

Using the state table above, this means:

```text
Parent → Parent → Parent → Parent → Left → Left → Left → Left+Marr → Left+Marr+Child → ...
```

Substantively, this person lived with their parents until early adulthood, then left home, then became married, and then entered the combined state of having left home, being married, and having children.

Another person may have the sequence:

```text
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
```

This means that the person remained in the `Parent` state from age 15 to age 30.

These examples show why sequence analysis is useful. Instead of looking only at whether someone eventually married or had children, we can study the timing and order of multiple family-life transitions.

## Why is this dataset useful?

The `biofam` dataset is useful because it is small, clear, and easy to interpret. It is especially suitable for beginners who want to learn the basic logic of state sequence analysis.

It can be used to learn how to:

* create a state sequence object;
* define a sequence alphabet;
* visualize individual family trajectories;
* plot state distributions by age;
* compare trajectories across birth cohorts or gender;
* compute sequence distances;
* cluster similar family-life courses;
* study how family transitions vary by social background.

For beginners, the key idea is that this dataset does not only record single events such as marriage or childbirth. It records a whole trajectory of family-life states from age 15 to 30. This allows us to study life courses as ordered sequences rather than isolated outcomes.

## Typical research questions

With this dataset, we can ask questions such as:

* What are the most common family-life trajectories between ages 15 and 30?
* At what ages do people typically leave the parental home?
* Do men and women follow different family-life trajectories?
* Do family trajectories differ across birth cohorts?
* Are language, religion, nationality, or parental social status associated with different life-course patterns?
* Which trajectories involve early marriage or early parenthood?
* How common is the combined state of leaving home, marriage, and having children?

These questions are about the timing, sequencing, and duration of family-life states. This is exactly the kind of question that sequence analysis is designed to answer.

## Relationship to TraMineR

In TraMineR, the dataset can be loaded as:

```r
data(biofam)
```

The spell-format version can be loaded as:

```r
data(bfspell)
```

The standard `biofam` data are in wide format: each row is one individual, and each age from 15 to 30 is represented by a separate column.

The `bfspell` version represents the same type of information in spell format, where each row corresponds to a spell or episode rather than a full individual sequence. For most introductory sequence-analysis tasks, the wide-format `biofam` dataset is easier to use. In Sequenzo, we currently only have the wide-format version for simplicity; please do not hesitate to contact us if you would like us to incorporate more datasets in different formats on our [GitHub Issue](https://github.com/Liang-Team/Sequenzo/issues).

## Reference

Müller, N. S., Studer, M., & Ritschard, G. (2007). Classification de parcours de vie à l'aide de l'optimal matching. In *XIVe Rencontre de la Société francophone de classification (SFC 2007)*, Paris, 5–7 September 2007, pp. 157–160.

Swiss Household Panel: [https://forscenter.ch/projects/swiss-household-panel/](https://forscenter.ch/projects/swiss-household-panel/)

TraMineR documentation: `biofam`, Example data set: Family life states from the Swiss Household Panel biographical survey.

## Loading the Data in Sequenzo

```python
from sequenzo import load_dataset

df = load_dataset('biofam')
```

## See Also

- [Datasets Overview](/en/datasets/introduction) helps choose a dataset by research question.
- [`SequenceData`](/en/function-library/sequence-data) shows how to define sequences from a dataset.
- [Quickstart](/en/basics/quickstart) runs a complete analysis on a bundled dataset.

*Author: Yuqi Liang*
