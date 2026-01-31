# Political Science Aid Datasets: Aid Shocks and Donor Fragmentation

This document explains two sequence datasets used for political science analysis: **aid shocks** and **donor fragmentation**. 

They come from the same underlying study but are stored as two separate wide-format tables so each dimension can be analyzed on its own. The goal is to make it clear where the data come from, what the two concepts mean, and how the public replication data were cleaned and turned into these two files.

## What are these datasets, and where do they come from?

Both datasets are built from the replication data of the paper:

**Gutting, R., & Steinwand, M. C. (2017). Donor fragmentation, aid shocks, and violent political conflict. Journal of Conflict Resolution, 61(3), 643-670.**

We are very grateful to the authors for allowing redistribution of these data.

The authors provide publicly available replication files. The main data file is [`ReplicationData.csv`](https://github.com/Liang-Team/Sequenzo/blob/main/original_datasets_and_cleaning/political_science_aid_datasets/data_sources/ReplicationData.csv) transformed from `ReplicationData.tab` on [Harvard Dataverse](https://dataverse.harvard.edu/dataset.xhtml;jsessionid=764218729ccce2732e1cbafb6e46?persistentId=doi%3A10.7910%2FDVN%2F29466&version=&q=&fileTypeGroupFacet=&fileTag=&fileSortField=&fileSortOrder=), which contains country–year (panel) data on aid, donor concentration, conflict, and controls.

From that replication data we create two **wide-format** sequence files:

| Dataset name | Description |
|----------------------------------------|--------|
| **political_science_aid_shock.csv**    | For each country and year: whether the country experienced a **negative aid shock** (0 = no, 1 = yes). |
| **political_science_donor_fragmentation.csv** | For each country and year: **donor concentration** expressed as one of three states (1 = fragmented, 2 = moderate, 3 = concentrated). |

Each row is a **country**, each column (after the country column) is a **year** (e.g. 1972, 1973, … 2007). So each country has a **sequence** of states across time, which is why these are called sequence datasets.

After data cleaning, we have 156 countries and the time period ranges from 1972 to 2007. 

## What do “aid shock” and “donor fragmentation” mean?

### Donor fragmentation (donor concentration)

**Donor fragmentation** is about *how spread out* a country’s aid is across different donor countries.

- **High fragmentation** = aid comes from **many** donors (no single donor dominates).  
- **Low fragmentation** = aid is **concentrated** in few donors (one or a few donors provide most of the aid).

In the paper, this is measured with the **Herfindahl–Hirschman Index (HHI)**. The HHI is a standard measure of “concentration”:

- For each donor’s share of that country’s total (bilateral) aid, you take the square of that share and sum over all donors.
- **HHI close to 0** → very fragmented (many small shares).
- **HHI close to 1** → very concentrated (one donor has almost 100% of aid).

So:

- **Donor fragmentation** = aid is spread across many vs. few donors
- **HHI** = the number used to measure it (higher HHI = less fragmentation, more concentration)

In the **paper**, the authors use HHI as a **continuous** variable (0–1) and do *not* split it into categories. For our **sequence** dataset we chose to group HHI into three states (see below) so it can be used in sequence analysis; the cutoffs 0.3 and 0.6 are **our** choice, not from the paper. That three-state sequence is what `political_science_donor_fragmentation.csv` stores.

### Aid shock

An **aid shock** here means a **sharp drop** in aid (relative to what the country usually gets).

In the replication data this is captured by a variable like **AidgdpDrop5_15**:

- The paper uses **bilateral net ODA** (aid) as a share of the recipient’s GDP. In short: 
  * *ODA* = official development assistance (government aid for development); 
  * *bilateral* = aid from one donor country directly to one recipient (not through multilateral agencies like the World Bank); 
  * *net* = after subtracting repayments on past loans, so it is the net flow of aid in that year.
- For each country and year, they compare **this year’s aid/GDP** to the **average aid/GDP over the previous 5 years**. So it’s not simply “how much aid dropped over 5 years,” but “how far **below** (or above) the recent average” the current level is, i.e., a **deviation from the 5-year average**.
- This deviation is **lagged by one year** (so the shock in a given year is based on data up to the previous year).
- The **bottom 15%** of these deviations (the largest drops below the 5-year average) are coded as **aid shock = 1**; the rest are 0.

So:

- **Aid shock** = this country experienced an unusually large negative change in aid
- In our dataset it is stored as **0** (no shock) or **1** (shock), year by year.

That 0/1 sequence is what `political_science_aid_shock.csv` contains.

## How were the data cleaned and built?

Once we have the public replication data `ReplicationData.csv`, we clean the data.

### Step 1: Use the right variables and time window

- We keep the variables we need: country identifier (`name` / `ccode`), `year`, **HHI** (donor concentration), and the aid-shock variable (**AidgdpDrop5_15**), plus any others used in the script (e.g. moving average of aid).
- We restrict the **year range** to **1972–2007** (as in the paper’s main analysis).

### Step 2: Standardize country IDs and drop bad rows

- Country is taken from `name` (or `ccode` if name is missing).
- We drop rows where **both** donor concentration (HHI) and aid shock are missing for that country–year.
- We drop countries that look like **donors rather than recipients**: e.g. where HHI is missing in every year and aid shock is 0 in every year (such countries are not aid recipients in the sense of the paper). This removes a small set of donor countries from the recipient-level analysis.

### Step 3: Donor fragmentation (HHI) → three states

The **paper** keeps HHI as a **continuous** variable (0–1) throughout; it does not use a 0.3/0.6 three-way split. For our **sequence** file we turn the continuous HHI into **three states** so it can be used in sequence analysis. The cutoffs below are **our** discretization, not from the original paper:

| State code | Meaning                | Rule (HHI value)      |
|------------|------------------------|------------------------|
| 1          | Highly fragmented      | HHI < 0.3             |
| 2          | Moderately concentrated| 0.3 ≤ HHI < 0.6       |
| 3          | Highly concentrated    | HHI ≥ 0.6             |

- **Fragmented** (1): aid comes from many donors.
- **Concentrated** (3): aid comes from few donors.
- Missing HHI in the raw data stays **missing** in the wide table (e.g. empty cell or NA). That usually means no bilateral aid or only multilateral aid in that year, so concentration is not defined.

This three-state sequence is what goes into `political_science_donor_fragmentation.csv`.

### Step 4: Aid shock → 0/1

- The replication variable for “aid shock” (e.g. **AidgdpDrop5_15**) is already or is converted to a **binary** indicator: **0** = no shock, **1** = shock (bottom 15% of *deviations from the 5-year average* aid/GDP, lagged one year).
- No extra categorization is applied; we just ensure the values are 0 and 1 (and missing where appropriate).

This 0/1 sequence is what goes into `political_science_aid_shock.csv`.

### Step 5: Long to wide format

- The script converts **long** format (one row per country–year) to **wide** format:
  - One row per **country**.
  - One column per **year** (1972, 1973, … 2007).
  - Cell values = state in that year (for fragmentation: 1, 2, or 3; for aid shock: 0 or 1; or missing).

So each of the two datasets is a **country × year** matrix of states, suitable for sequence analysis.

## Summary table

| Concept              | Measure in replication data | In our cleaned datasets                                      | File                    |
|----------------------|-----------------------------|--------------------------------------------------------------|---------------------------------------------|
| Donor fragmentation  | HHI (continuous, 0–1)       | 3 states: 1 = fragmented, 2 = moderate, 3 = concentrated     | political_science_donor_fragmentation.csv   |
| Aid shock            | AidgdpDrop5_15 (binary)     | 0 = no shock, 1 = shock (bottom 15% of *deviation from 5-yr avg* aid/GDP, lagged) | political_science_aid_shock.csv            |

## References

Gutting, R., & Steinwand, M. C. (2017). Donor fragmentation, aid shocks, and violent political conflict. Journal of Conflict Resolution, 61(3), 643-670.

---

*Author: Yuqi Liang*