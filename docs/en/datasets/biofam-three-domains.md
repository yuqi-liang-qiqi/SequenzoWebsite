# Biofam Three-Domain Family Life Dataset

The `biofam` dataset is originally a single-channel sequence dataset. In the original version, each person has one family-life sequence from age 15 to age 30. Each yearly state combines several aspects of family life into one code, such as whether the person lives with their parents, has left home, is married, has children, or is divorced.

For multidomain sequence analysis, we also provide a three-domain version of the `biofam` dataset. Instead of storing family life as one combined state, this version separates family life into three simpler domains:

1. marriage domain
2. residence / leaving-home domain
3. parenthood / child domain

This structure follows the multichannel representation used in the `seqHMM` package (Helske and Helske, 2019), where the original `biofam` data are split into three parallel life domains: marriage, parenthood, and residence. In `seqHMM`, the three channels are used to represent whether someone is single/married/divorced, childless/has children, and living with parents/left home. 

## Why do we split `biofam` into three domains?

The original `biofam` states are combined states.

For example, in the original `biofam` dataset:

| Code | State           |
| ---: | --------------- |
|    0 | Parent          |
|    1 | Left            |
|    2 | Married         |
|    3 | Left+Marr       |
|    4 | Child           |
|    5 | Left+Child      |
|    6 | Left+Marr+Child |
|    7 | Divorced        |

A state such as `Left+Marr+Child` contains three pieces of information at the same time:

```text
Left+Marr+Child
= left parental home
+ married
+ has children
```

This is compact, but it can be difficult for beginners to see which part of the trajectory comes from which life domain.

The three-domain version makes this easier. It separates the same information into three parallel sequences:

```text
Residence domain:   whether the person has left home
Marriage domain:    whether the person is married
Child domain:       whether the person has children
```

So instead of reading one combined state, we can read three simpler sequences side by side.

## Files included

We provide three domain-specific files:

| File                        | Domain            | Meaning                                       |
| --------------------------- | ----------------- | --------------------------------------------- |
| `biofam_married_domain.csv` | Marriage domain   | Whether the person is married                 |
| `biofam_left_domain.csv`    | Residence domain  | Whether the person has left the parental home |
| `biofam_child_domain.csv`   | Parenthood domain | Whether the person has children               |

Each file has the same basic structure:

```text
id, 15, 16, 17, ..., 30
```

The `id` column identifies the person. The columns `15` to `30` represent ages 15 to 30. Each cell records the person’s state in that domain at that age.

## Important idea: one person, three parallel sequences

The same person appears in all three files with the same `id`.

For example, person `1` has one sequence in the marriage domain, one sequence in the residence domain, and one sequence in the child domain.

Together, these three sequences describe the person’s family-life trajectory.

```text
Person 1
Marriage domain:   not married → married
Residence domain:  with parents → left home
Child domain:      no children → has children
```

This is why the dataset is called multidomain or multichannel sequence data: each person has several parallel sequences observed over the same ages.

## Marriage domain

File: `biofam_married_domain.csv`

This file records whether each person is married at each age.

### State coding

| Code | Meaning     |
| ---: | ----------- |
|    0 | Not married |
|    1 | Married     |

### Example

```csv
id,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1
2,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1
3,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1
4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
5,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1
```

For person `1`, the sequence is:

```text
0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1
```

This means that the person was not married from age 15 to age 23, and was married from age 24 onward.

In a more readable form:

```text
Not married → Not married → ... → Married → Married
```

## Residence / leaving-home domain

File: `biofam_left_domain.csv`

This file records whether each person has left the parental home.

### State coding

| Code | Meaning             |
| ---: | ------------------- |
|    0 | Living with parents |
|    1 | Left parental home  |

### Example

```csv
id,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
1,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1
2,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
3,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1
4,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1
5,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1
```

For person `2`, the sequence is:

```text
0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
```

This means that the person was living with their parents at age 15, but had left the parental home by age 16 and remained in the `left home` state afterwards.

In a more readable form:

```text
With parents → Left home → Left home → ... → Left home
```

## Child / parenthood domain

File: `biofam_child_domain.csv`

This file records whether each person has children.

The file name uses `child` for simplicity. Substantively, this is the parenthood domain: it tells us whether the person is childless or has children at each age.

### State coding

| Code | Meaning      |
| ---: | ------------ |
|    0 | No children  |
|    1 | Has children |

### Example

```csv
id,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30
1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1
2,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1
3,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1
4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
5,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1
```

For person `1`, the sequence is:

```text
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1
```

This means that the person had no children from age 15 to age 24, and had children from age 25 onward.

In a more readable form:

```text
No children → No children → ... → Has children → Has children
```

## Reading the three domains together

The real value of the three-domain version is that the three files can be read together.

For example, suppose person `1` has the following three sequences:

```text
Marriage domain:
0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1

Residence domain:
0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1

Child domain:
0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1
```

This can be interpreted as:

```text
Age 15–23:
not married, living with parents, no children

Age 24:
married, left parental home, no children

Age 25–30:
married, left parental home, has children
```

So the person first remained in the parental home and was not married, then left home and got married around age 24, and then had children around age 25.

This example shows why multidomain sequence data are useful. They allow us to see not only whether life events happened, but also how different life domains changed together over time.

## Relationship to the original `biofam` states

The three-domain files are derived from the original combined `biofam` states.

The logic is simple: each original state is decomposed into separate pieces of information.

| Original biofam state | Marriage domain                                   | Residence domain  | Child domain                      |
| --------------------- | ------------------------------------------------- | ----------------- | --------------------------------- |
| `Parent`              | Not married                                       | With parents      | No children                       |
| `Left`                | Not married                                       | Left home         | No children                       |
| `Married`             | Married                                           | With parents      | No children                       |
| `Left+Marr`           | Married                                           | Left home         | No children                       |
| `Child`               | Not married                                       | With parents      | Has children                      |
| `Left+Child`          | Not married                                       | Left home         | Has children                      |
| `Left+Marr+Child`     | Married                                           | Left home         | Has children                      |
| `Divorced`            | Not married / divorced depending on coding choice | Usually left home | May depend on the original coding |

In our simplified three-domain files, each domain is represented as a binary sequence using `0` and `1`.

This makes the files easy to understand and convenient for teaching multidomain sequence analysis.

## Difference between single-channel and three-domain data

The original `biofam` dataset stores family life as one combined sequence.

For example:

```text
Parent → Parent → Left → Left+Marr → Left+Marr+Child
```

The three-domain version stores the same kind of information as three parallel sequences:

```text
Residence:
With parents → With parents → Left home → Left home → Left home

Marriage:
Not married → Not married → Not married → Married → Married

Child:
No children → No children → No children → No children → Has children
```

Both formats describe family life courses. The difference is in how the information is represented.

The single-channel version is compact because all dimensions are combined into one state. The three-domain version is more explicit because each life domain has its own sequence.

## Why is this useful?

The three-domain version is useful when we want to study several life-course dimensions at the same time.

It can help us ask questions such as:

* Do people usually leave home before marriage?
* How often do marriage and leaving home happen around the same age?
* Do people tend to have children soon after marriage?
* Are there different patterns of family formation across men and women?
* Do birth cohorts differ in the timing of leaving home, marriage, and parenthood?
* Are some trajectories more synchronized across domains than others?

These questions are difficult to answer if we only look at one final outcome. They require us to observe the order and timing of changes across several domains.

## File structure

Each domain file has the same structure:

| Column | Description           |
| ------ | --------------------- |
| `id`   | Individual identifier |
| `15`   | State at age 15       |
| `16`   | State at age 16       |
| `17`   | State at age 17       |
| `...`  | Yearly states         |
| `30`   | State at age 30       |

The sequence length is 16 because the data cover ages 15 to 30.

## Summary

The three-domain `biofam` dataset is a multidomain version of the original `biofam` family-life sequence data.

Instead of representing family life as one combined state sequence, it separates family life into three parallel domains:

```text
Marriage domain:    not married / married
Residence domain:   with parents / left home
Child domain:       no children / has children
```

This representation is especially helpful for beginners because it makes the structure of family-life trajectories easier to see. It is also useful for multidomain sequence analysis, where the goal is to study how several life domains unfold together over time.

## Reference

Müller, N. S., Studer, M., & Ritschard, G. (2007). Classification de parcours de vie à l'aide de l'optimal matching. In *XIVe Rencontre de la Société francophone de classification (SFC 2007)*, Paris, 5–7 September 2007, pp. 157–160.

Helske, S., & Helske, J. (2019). Mixture Hidden Markov Models for Sequence Data: The seqHMM Package in R. *Journal of Statistical Software*.

TraMineR documentation: `biofam`, Example data set: Family life states from the Swiss Household Panel biographical survey.

*Author: Yuqi Liang*
