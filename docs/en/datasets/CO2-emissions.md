# CO₂ Emissions Dataset (1800–2022)

In most existing studies, sequence analysis is used based on individual-level sequence data such as education, employment, or family histories. But sequence analysis is not limited to social or demographic trajectories. It can also be applied to **countries, organizations, technologies, or even ecological processes**.

This is why we use the CO₂ emissions dataset as a quickstart example: it demonstrates how sequence analysis can be extended beyond human life-course data. Our hope is that this example helps you both understand the core ideas of sequence analysis and imagine how it could inspire research in other fields.

## What is this dataset, and where does it come from?

The dataset records country-level CO₂ emissions per capita across multiple years.
It originates from the public Gapminder data, which compiles CO₂ data for countries worldwide.
(See raw data sources that we have saved in our Sequenzo GitHub repository: [Gapminder CO₂ data sources](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/gapminder/co2_per_capita/data_sources))

The dataset contains:

* CO₂ emissions in kilotons
* CO₂ emissions per capita (metric tons per person)
* Country and region identifiers
* Annual records spanning two centuries

For our purposes, we focus on **per capita emissions** instead of emissions. This measure allows fairer cross-country comparison than raw emissions, since it accounts for population size.

## How is the CO₂ Emissions Data Classified?

To make the data suitable for social sequence analysis (which is based on categorical data instead of numeric data), **we transform continuous emission values into categorical states**. Specifically, we classify each country’s per capita emissions into decile groups (10 equally sized categories).

The classification is calculated across the **entire dataset (all years × all countries)** to ensure that comparisons are standardized across time.

### Global vs. Local Deciles

When we say “deciles”, there are actually two different ways to compute them:

1. **Global deciles (what we use here):**

   * We pool together **all countries and all years** into one big dataset.
   * Then we compute the 10 cut-points once, and apply them to every country and every year.
   * This way, the categories are **globally comparable**.
   * Example:

     * Suppose the 2nd decile cutoff is **1.2 tons per person**.
     * Any country-year with emissions between 0.8–1.2 will always be classified as “2nd decile”, no matter if it’s Pakistan in 2015 or Brazil in 1980.

2. **Local deciles (not used here):**

   * We compute deciles **separately within each year** (or within each region).
   * This means cutoffs can change over time (or across groups).
   * Example:

     * In 1960, the 2nd decile cutoff might be 0.3 tons because emissions were generally low.
     * In 2020, the 2nd decile cutoff might be 1.5 tons because emissions rose worldwide.
     * As a result, a country with 1.0 tons in 1960 could be in a very high decile locally, but the same 1.0 tons in 2020 might fall into a low decile.

### Why Global Deciles?

We choose global deciles because:

* They make comparisons across time possible. You can track whether a country is moving up or down in the **same global ranking system**.
* Local deciles would always “reshuffle” categories year by year, so even if a country’s absolute emissions never changed, its classification could jump around depending on how other countries changed.

### Step-by-Step Process

1. Gather all per capita CO₂ values across all years and countries.
2. Use `qcut()` in Python to split the values into deciles (10 equal-sized groups).
3. Assign each country’s yearly CO₂ per capita to the corresponding decile group.
4. Convert the dataset into wide **format**, where each country is represented as a sequence of decile states over time.

This approach evaluates each country’s emissions **relative to the global distribution** and enables both cross-country and longitudinal sequence comparisons.

> **Note:**
> In the source notebook, we implemented **both quantile (quintiles, 5 groups)** and **decile (10 groups)** classifications.
> After testing, we chose deciles for the final analysis because they provide finer granularity and highlight more subtle differences between countries.
> You are encouraged to compare the two versions in the notebook to see how the level of grouping changes your interpretation.

See the full preprocessing steps and code:
[Gapminder CO₂ + GDP notebook](https://github.com/Liang-Team/Sequenzo/blob/main/original_datasets_and_cleaning/gapminder/co2_per_capita/code/country_co2_gdp_gapminder_data.ipynb)

## Example: Pakistan's CO₂ Emissions Classification

To illustrate, here is Pakistan’s classification:

| Year | CO₂ Per Capita (Metric Tons) | Decile Group |
| ---- | ---------------------------- | ------------ |
| 2015 | 0.78                         | 2nd decile   |
| 2016 | 0.85                         | 2nd decile   |
| 2017 | 0.92                         | 2nd decile   |
| 2018 | 0.85                         | 2nd decile   |
| 2019 | 0.85                         | 2nd decile   |

Because Pakistan’s per capita CO₂ emissions consistently ranked in the **second-lowest 10–20%** of the global distribution, all years fall into the **2nd decile group**.

---

### Why Deciles Instead of Quintiles?

If we had used quintiles (5 groups) instead, Pakistan’s emissions during these years would all be classified simply as “Low” (20–40%).

By switching to deciles (10 groups), we gain greater granularity: instead of a broad “Low” label, we see that Pakistan is specifically in the 2nd decile, not the 1st or 3rd.

This finer resolution helps us distinguish between countries that are all “Low” but not equally low, which is particularly important when analyzing patterns across many sequences.

## Loading the Data in Sequenzo

```python
from sequenzo import load_dataset

# Categorical global deciles, ready for sequence analysis (used by the Quickstart):
df = load_dataset('country_co2_emissions_global_deciles')

# Raw numeric emissions, if you want to build your own states:
raw = load_dataset('country_co2_emissions')
```

Related bundled variants include `country_co2_emissions_global_quintiles`, `country_co2_emissions_local_deciles`, and `country_co2_emissions_local_quintiles`.

## See Also

- [Datasets Overview](/en/datasets/introduction) helps choose a dataset by research question.
- [`SequenceData`](/en/function-library/sequence-data) shows how to define sequences from a dataset.
- [Quickstart](/en/basics/quickstart) runs a complete analysis on a bundled dataset.

## References

Gapminder. (2025). https://www.gapminder.org/data/documentation/.

---

*Author: Yuqi Liang*
