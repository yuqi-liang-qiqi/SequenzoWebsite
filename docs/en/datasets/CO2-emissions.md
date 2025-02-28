# CO₂ Emissions Dataset (1800-2022) 🌍

TODO: change as I have changed the data sources

## What is this dataset, and where does it come from?

The dataset used in this analysis tracks country-level CO₂ emissions per capita over multiple years. 
It originates from the publicly available [Kaggle CO₂ Emissions dataset](https://www.kaggle.com/datasets/ravindrasinghrana/carbon-co2-emissions), which compiles CO₂ emission data for various countries. 

The dataset includes:

* CO₂ emissions in kilotons
* CO₂ emissions per capita (metric tons per person)
* Country and region information
* Annual records covering multiple decades

* For our analysis, we focus on CO₂ emissions per capita, as it provides a more accurate comparison of a country’s emissions relative to its population size.

## How is the Overall CO₂ Emissions Data calculated?

To make the dataset suitable for social sequence analysis, we classify each country's per capita CO₂ emissions into five quintile-based categories. The classification is based on all available years' data combined, ensuring a standardized comparison across different time periods.

Step-by-Step Calculation Process:

1. Collect all per capita CO₂ emissions values from all years and all countries.
Determine the quintile thresholds (using `qcut()` in Python), which divide the data into five equal-sized groups:

* Very Low (Bottom 20%)
* Low (20-40%)
* Middle (40-60%)
* High (60-80%)
* Very High (Top 20%)

2. Assign each country's CO₂ per capita value for each year into one of the quintile groups.
3. Convert the data into a wide format where each country has a sequence of quintile states over time.

4. This classification ensures that a country's emission status is evaluated relative to the global distribution rather than changing dynamically each year. 

As a result, the quintile-based approach allows for meaningful cross-country and longitudinal comparisons.

## **Example: Pakistan's CO₂ Emissions Classification**  

To illustrate, let's look at Pakistan:  

| Year | CO₂ Per Capita (Metric Tons) | Classification |
|------|-------------------------------|---------------|
| 2015 | 0.78                          | Low          |
| 2016 | 0.85                          | Low          |
| 2017 | 0.92                          | Low          |
| 2018 | 0.85                          | Low          |
| 2019 | 0.85                          | Low          |

Since Pakistan’s per capita CO₂ emissions consistently ranked in the bottom 20%-40% of all countries' emissions across all years, it falls into the "Low" category.

*Data compiler and writer of this document: Yuqi Liang*
