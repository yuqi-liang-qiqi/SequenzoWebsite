# GDP per capita from Gapminder (1800-2022)

This dataset records country-level GDP per capita over time using public Gapminder data. In Sequenzo, it is prepared as a categorical sequence dataset so that countries can be compared by long-run economic-development trajectories rather than by one year at a time.

## Income (GDP per capita)

GDP per capita is a country-level measure of average economic output per person. It is often used as a broad indicator of economic development, while recognizing that it does not directly measure inequality, well-being, or household income.

For sequence analysis, the numeric GDP-per-capita values are converted into ordered categorical states. This makes it possible to study questions such as:

- Which countries follow similar long-run development trajectories?
- Which countries move steadily upward, remain stable, or fluctuate across income categories?
- How do country trajectories compare across historical periods or regions?

## Built-in Dataset

The package includes a built-in file named `country_gdp_per_capita_quintiles`.

```python
from sequenzo import load_dataset

gdp = load_dataset("country_gdp_per_capita_quintiles")
print(gdp.head())
```

The states represent quintile groups derived from the GDP-per-capita distribution. Use this dataset when you want a compact country-level example; use the CO₂ emissions dataset if you want the same style of workflow with environmental indicators.

## Related Pages

- [CO₂ Emissions Dataset](./CO2-emissions.md)
- [Quickstart](/en/basics/quickstart)
- [Converting Numeric Data to Categorical Data](/en/basics/if-you-have-numeric-data)

## See Also

- [Datasets Overview](/en/datasets/introduction) helps choose a dataset by research question.
- [`SequenceData`](/en/function-library/sequence-data) shows how to define sequences from a dataset.
- [Quickstart](/en/basics/quickstart) runs a complete analysis on a bundled dataset.

## References

Gapminder. (2025). https://www.gapminder.org/data/documentation/.

---

*Author: Yuqi Liang*
