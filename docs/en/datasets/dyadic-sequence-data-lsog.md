# Dyadic Sequence Data on Intergenerational Family Formation: Parent–Child Dyads in the United States

[**Polyadic sequence analysis** (Liao 2021)](https://sociologicalscience.com/articles-v8-3-48/) is an approach that quantifies how strongly life courses are linked. As Liao puts it, dyadic or polyadic life-course sequences can be more similar *within* the same dyad or group than between randomly paired sequences, a reflection of the life-course principle of **linked lives**. 

We provide **dyadic** sequence data for studying such linked lives and intergenerational patterns of marriage and childbearing in middle-class American families. Because our data contain only parent–child **dyads** (one parent and one child per pair), we use the term *dyadic* when describing them. For how to run the analysis in practice, see [Linked polyadic sequence analysis](../multidomain/linked-polyadic-sequence-analysis.md).

## What are these datasets, and where do they come from?

The data come from the **Longitudinal Study of Generations (LSOG)** (Bengtson et al. 2002), a long-running study of American families in California. Sequenzo’s built-in version is prepared from LSOG following the coding and dyadic setup in **Liao and Lin (Forthcoming in 2026)**.

We are very grateful to Prof. Tim Liao for allowing us to include these data in Sequenzo 🫰.

The built-in files look like the following (first two rows of each file). **Parents** first, then **children**; the same `dyadID` (e.g. 16, 19) links a parent row to a child row. Columns are ages **15, 16, …, 39**; only the first and last few are shown below (codes 1–6; see “Numeric codes and their labels”).

**Parents** (`dyadic_parents.csv`):

| dyadID | sex | 15 | 16 | 17 | … | 37 | 38 | 39 |
|--------|-----|---|---|---|---|---|---|---|
| 16 | 1 | 1 | 1 | 1 | … | 5 | 5 | 5 |
| 19 | 1 | 1 | 1 | 1 | … | 5 | 5 | 5 |

**Children** (`dyadic_children.csv`):

| dyadID | sex | 15 | 16 | 17 | … | 37 | 38 | 39 |
|--------|-----|---|---|---|---|---|---|---|
| 16 | 1 | 1 | 1 | 1 | … | 4 | 4 | 4 |
| 19 | 1 | 1 | 1 | 1 | … | 4 | 4 | 4 |

In short, those two tables are our two wide-format sequence files; the table below summarizes what each file contains.

| File | Description |
|------|-------------|
| `dyadic_parents.csv`  | One row per parent–child dyad. Columns: `dyadID`, `sex`, then **15, 16, …, 39** — the **parent’s** family formation state at each age, numeric codes 1–6. |
| `dyadic_children.csv` | One row per parent–child dyad. Columns: `dyadID`, `sex` (of child), then **15, 16, …, 39** — the **child’s** family formation state at each age, same numeric codes 1–6. |

Each row is one **dyad**; each column (after `dyadID` and `sex`) is an **age** (15–39). So each file gives one sequence per dyad (child in one file, parent in the other). The same `dyadID` links the two files, so you can analyze parent and child trajectories together. Both files store **numeric state codes** only; the table in the next section gives the **labels** (single, married by parity, divorced) for each code.

**Data cleaning.** We apply additional cleaning so that time columns are simple age labels: in the original source files the columns are named `status15`, `status16`, … (children) and `pstatus15`, `pstatus16`, … (parents). We rename them to **15, 16, …, 39** using the `clean_time_columns_auto` function from `sequenzo.data_preprocessing`. This keeps the built-in files consistent and easier to use. The cleaning script is available in the Sequenzo repository: [clean_dyadic_columns.py](https://github.com/Liang-Team/Sequenzo/blob/main/original_datasets_and_cleaning/dyadic_sequence_data_lsog/code/clean_dyadic_columns.py).

## What is this dataset for?

The data are **dyadic life-course sequences**: for each parent–child dyad, you have one sequence for the **parent** (e.g. family formation between roughly the 1935–1960 period) and one for the **child** (e.g. 1955–1990), covering ages **15–39**. Each position in the sequence is the **family formation state** in that year (single, married with 0/1/2/3+ children, or divorce).

Typical uses in the literature include:

- **Linked lives**: Quantifying how much parent and child trajectories resemble each other *within* dyads compared with *randomly* paired parent–child sequences (e.g., Liao 2021). This addresses the life-course principle that “lives are lived interdependently” (Elder et al. 2003).
- **Intergenerational patterns beyond transmission**: Identifying holistic patterns—strong transmission, moderated transmission, or intergenerational contrast—in how parents’ and children’s family formation are linked, rather than focusing on single events (Fasang & Raab 2014).

The state space is the same for both generations: **single**, **married by parity** (0, 1, 2, or 3+ children), and **divorced**. So the same code–label mapping applies to both `dyadic_children.csv` and `dyadic_parents.csv`.

## Numeric codes and their labels

The time columns **15, 16, …, 39** in both files contain **numeric codes** 1–6. The following table gives the **meaning** of each code. Use it to convert codes to substantive labels when interpreting or plotting sequences.

| Code | Label | Meaning |
|------|--------|---------|
| 1 | **S**  | Single (not married) |
| 2 | **M0** | Married, 0 children |
| 3 | **M1** | Married, 1 child |
| 4 | **M2** | Married, 2 children |
| 5 | **M3+**| Married, 3 or more children |
| 6 | **D**  | Divorced (union dissolved, e.g. separation/divorce) |

Note that, in the LSOG data, **cohabitation** (unmarried coresidential partnership) and **living-apart-together (LAT)** (romantic relationship without shared residence) cannot be reliably identified; both are subsumed under **single** rather than under a union/married state (Fasang & Raab 2014).

## References

Bengtson, V.L., Biblarz, T.J. and Roberts, R.E., 2002. How families still matter: A longitudinal study of youth in two generations. Cambridge University Press.

Elder Jr, G.H., Johnson, M.K. and Crosnoe, R., 2003. The emergence and development of life course theory. In *Handbook of the life course* (pp. 3-19). Boston, MA: Springer US.

Fasang, A.E. and Raab, M., 2014. Beyond transmission: Intergenerational patterns of family formation among middle-class American families. *Demography*, 51(5), pp.1703-1728.

Liao, T.F., 2021. Using sequence analysis to quantify how strongly life courses are linked. *Sociological Science*, 8, pp.48-72.

Liao, T.F., and Lin, T.-S., Forthcoming in 2026. "Using Sequence Analysis in Social Science Research." Chapter in *Handbook on Data Modelling and Data Analysis*, edited by David Weakliem. Northampton, MA: Edward Elgar.

---
*Author: Yuqi Liang*