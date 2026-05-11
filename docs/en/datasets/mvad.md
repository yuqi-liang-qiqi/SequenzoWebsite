# MVAD School-to-Work Transitions Dataset

The `mvad` dataset contains school-to-work transition trajectories for 712 young people in Northern Ireland. It records what each person was doing month by month after reaching the end of compulsory education, such as staying in school, entering further education, receiving training, moving into employment, or becoming jobless.

This dataset is a classic example dataset in social sequence analysis. It comes from the study by McVicar and Anyadike-Danes (2002), *Predicting Successful and Unsuccessful Transitions from School to Work by Using Sequence Methods*. The same dataset is also distributed with the R package TraMineR as `mvad`. Our version is consistent with the TraMineR version and is provided here so that Sequenzo users can easily reproduce standard sequence analysis examples in Python.

## What does this dataset describe?

The dataset follows 712 young people from July 1993 to June 1999. Each person is observed for 72 months. At each month, the dataset records the person’s main labour-market or education-related activity.

In simple terms, each row is one person, and the monthly columns describe that person’s trajectory after compulsory education.

For example, one person may move from school to further education and then to employment:

```text
school → school → FE → FE → employment → employment → ...
```

Another person may move from training into employment, or experience periods of joblessness:

```text
training → training → employment → joblessness → employment → ...
```

This makes the dataset useful for learning how sequence analysis can describe pathways, compare trajectories, and identify typical school-to-work transition patterns.

## Data origin

* Source paper: McVicar, D., & Anyadike-Danes, M. (2002). *Predicting Successful and Unsuccessful Transitions from School to Work by Using Sequence Methods*. Journal of the Royal Statistical Society: Series A, 165(2), 317–334.

* Original study context: The data come from a cohort survey of young people in Northern Ireland. The paper uses sequence methods, especially optimal matching and cluster analysis, to identify different types of school-to-work transitions.

## State sequence structure

The main sequence part of the dataset consists of 72 monthly activity columns, and these monthly columns run from:

```text
Jul.93, Aug.93, Sep.93, ..., Jun.99
```

Each monthly column records one of six possible states.

## Activity states

| State         | Meaning                                       |
| ------------- | --------------------------------------------- |
| `employment`  | Employment                                    |
| `FE`          | Further education                             |
| `HE`          | Higher education                              |
| `joblessness` | Joblessness                                   |
| `school`      | School                                        |
| `training`    | Government-supported or work-related training |

These six states form the sequence alphabet of the dataset. In sequence analysis, an alphabet simply means the set of possible states that can appear in a trajectory.

For example, if a person’s first six months are:

```text
school, school, FE, FE, FE, employment
```

this means that the person first remained in school, then entered further education, and later moved into employment.

## Covariates

Besides the monthly sequence columns, the dataset also includes background variables. These variables can be used to compare trajectories across social groups or to study which individual, family, or school characteristics are associated with different transition patterns.

| Column      | Description                                                                  |
| ----------- | ---------------------------------------------------------------------------- |
| `id`        | Individual identifier                                                        |
| `weight`    | Sample weight                                                                |
| `male`      | Gender indicator, where 1 = male                                             |
| `catholic`  | Community background indicator, where 1 = Catholic                           |
| `Belfast`   | School located in the Belfast Education and Library Board area               |
| `N.Eastern` | School located in the North Eastern area                                     |
| `Southern`  | School located in the Southern area                                          |
| `S.Eastern` | School located in the South Eastern area                                     |
| `Western`   | School located in the Western area                                           |
| `Grammar`   | Type of secondary education, where 1 = grammar school                        |
| `funemp`    | Father unemployed at the time of the survey                                  |
| `gcse5eq`   | Achieved five or more GCSEs at grades A–C, or equivalent                     |
| `fmpr`      | Father’s current or most recent job was professional, managerial, or related |
| `livboth`   | Living with both parents at the first survey wave                            |

## File structure

File: `mvad.csv`

The dataset contains:

| Column type              | Description                                                                             |
| ------------------------ | --------------------------------------------------------------------------------------- |
| `id`                     | Individual identifier                                                                   |
| Covariates               | Background variables such as gender, school type, qualifications, and family background |
| Monthly sequence columns | 72 monthly activity states from July 1993 to June 1999                                  |

A simplified structure looks like this:

| id | weight | male | catholic | Grammar | gcse5eq | Jul.93     | Aug.93     | Sep.93   | ... | Jun.99      |
| -- | -----: | ---: | -------: | ------: | ------: | ---------- | ---------- | -------- | --- | ----------- |
| 1  |    ... |  ... |      ... |     ... |     ... | employment | employment | training | ... | employment  |
| 2  |    ... |  ... |      ... |     ... |     ... | FE         | FE         | FE       | ... | employment  |
| 3  |    ... |  ... |      ... |     ... |     ... | training   | training   | training | ... | joblessness |

The exact values above are illustrative. They show how the dataset is organized: one row per person, with monthly activity states arranged from left to right.

## Why is this dataset useful?

The `mvad` dataset is useful because it gives a clear and compact example of sequence data.

It can be used to learn how to:

* create a state sequence object;
* visualize individual trajectories;
* plot state distributions over time;
* compute sequence distances;
* cluster similar school-to-work pathways;
* compare trajectories across groups, such as by gender, school type, qualifications, or family background.

For beginners, the most important idea is that this dataset does not only tell us whether someone eventually found employment. It tells us how they moved through different states over time. This is exactly what sequence analysis is designed to study.

## Typical research questions

With this dataset, we can ask questions such as:

* What are the most common school-to-work transition pathways?
* Do some young people move quickly into employment while others remain in education or training for longer?
* Which trajectories involve repeated or prolonged joblessness?
* Are transition patterns different between men and women?
* Are educational qualifications associated with more stable transitions into employment?
* Do family background and school characteristics help explain different transition pathways?

These questions are not only about final outcomes. They are about the order, timing, and duration of states across the whole transition process.

## Reference

McVicar, D., & Anyadike-Danes, M. (2002). Predicting successful and unsuccessful transitions from school to work by using sequence methods. *Journal of the Royal Statistical Society: Series A (Statistics in Society), 165*(2), 317–334.

TraMineR documentation: `mvad`, Example data set: Transition from school to work.

*Author: Yuqi Liang*
