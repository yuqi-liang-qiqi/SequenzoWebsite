<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 09:38:53
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 11:35:53
 * @FilePath: /SequenzoWebsite/docs/en/basics/if_you_have_numeric_data.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Converting Numeric Data to Categorical Data

In sequence analysis, we usually work with **categorical states** (e.g., "Education", "Employment", "Unemployed").
But many datasets contain **numeric values** (e.g., income, CO₂ emissions, examnination scores).

To use such data in sequence analysis, we need to convert numeric values into categories (states).

## Why Do We Need Categories?

* Sequence analysis is about comparing **paths of states**.
* Numeric values can be too fine-grained (e.g., CO₂ emissions = 0.71 vs 0.72) and make no sense to treat as separate “states.”
* Categories make it possible to study categorical patterns, trajectories, and transitions instead of focusing on tiny numeric differences.

## What Can We Study Once Numeric Data Is Categorized?

By converting them into categorical states, we can treat them as categorical trajectories and ask the following sequence-based questions:

### 1. Income Trajectories

* **Numeric variable**: annual income (in USD).
* **Categorical conversion**: income deciles (bottom 10%, 10–20%, … top 10%).
* **Research questions**:

  * How do individuals move across income brackets over their careers?
  * Are there “sticky floors” (people remaining in the bottom deciles) or “glass ceilings” (barriers to reaching top deciles)?
  * How do income trajectories differ by gender, education, or region?

### 2. CO₂ Emissions per Capita

* **Numeric variable**: annual CO₂ emissions per capita (metric tons).
* **Categorical conversion**: global deciles (very low → very high).
* **Research questions**:

  * How do countries move between emission categories over time?
  * Which regions show convergence (becoming similar) vs divergence (becoming more unequal) in their emission trajectories?
  * Are there typical “paths” countries follow (e.g., from low → middle → high emissions as they industrialize)?

### 3. Examination Scores (e.g., students across school years)

* **Numeric variable**: standardized test scores (0–100).
* **Categorical conversion**: performance groups (Low, Average, High).
* **Research questions**:

  * What are the typical learning trajectories students follow? (e.g., consistently high, late improvement, early decline)
  * Do certain groups of students converge toward similar performance categories over time?
  * How do interventions (e.g., tutoring programs) change the sequence of performance states?

## Common Methods for Conversion

1. **Fixed Thresholds (Domain Knowledge)**

   * You set cutoffs based on meaningful criteria.
   * Example: Body Mass Index (BMI) → Underweight (<18.5), Normal (18.5–24.9), Overweight (25–29.9), Obese (30+).
   * Advantage: Easy to interpret.
   * Limitation: Requires expert knowledge; may not reflect the data distribution.

2. **Quantiles (Data-Driven Binning)**

   * Split data into equal-sized groups using percentiles, quartiles, quintiles, or deciles.
   * Example: Income → Bottom 20% = “Low”, 20–40% = “Lower-Middle”, …, Top 20% = “High”.
   * Advantage: Balanced group sizes; good for comparisons.
   * Limitation: Categories are relative to the dataset, not absolute values.

3. **Standard Deviation from Mean (Z-Scores)**

   * Define categories based on how far a value is from the mean.
   * Example: Test Scores → Below −1σ = “Low Performer”, −1σ to +1σ = “Average”, Above +1σ = “High Performer”.
   * Advantage: Good when data is approximately normal.
   * Limitation: Harder for non-technical audiences to interpret.

## Step-by-Step Example: CO₂ Emissions

Suppose we have **per capita CO₂ emissions** (in metric tons):

| Country | Year | CO₂ per capita |
| ------- | ---- | -------------- |
| A       | 2000 | 0.8            |
| B       | 2000 | 2.5            |
| C       | 2000 | 7.2            |
| D       | 2000 | 15.0           |

### Using Quantiles (Deciles)

1. Collect all values: \[0.8, 2.5, 7.2, 15.0].
2. Compute decile cutoffs (10 equally sized bins). For simplicity:

   * 0–10% = 0.8
   * 10–20% = 1.5
   * 20–30% = 2.5
   * …
   * 90–100% = 15.0
3. Assign states:

   * Country A = 1st decile (very low)
   * Country B = 3rd decile (low-middle)
   * Country C = 7th decile (high)
   * Country D = 10th decile (very high)

Now we can represent each country’s emission history as a **sequence of categorical states** instead of raw numbers.

* With categories, we can say:

  * Country A stayed in “very low” for 20 years.
  * Country C moved from “middle” to “high” after 1990.
* Without categories, comparing 0.71 vs 0.72 would not give meaningful patterns.

If you would like to learn further how it is computed in Python, we have a complete guide with code in [`CO₂ Emissions Dataset (1800–2022) 🌍`](/en/datasets/CO2-emissions). 

## Key Takeaways

* Sequence analysis requires categorical states → numeric values must be grouped.
* You can choose thresholds (expert-defined), quantiles (data-driven), or statistical cutoffs.
* Deciles are often a good balance: enough granularity to see differences, but not too many categories to overwhelm the analysis.

## Exercises: Converting Numeric Data to Categorical Data

### Exercise 1: Why Categories?
Suppose you measure daily step counts from wearable devices (e.g., 9,950 vs 10,020).  
Why might it be unhelpful to treat each exact number as a separate state in sequence analysis?  

### Exercise 2: Household Electricity Use
Four households report their **monthly electricity consumption (kWh)**:

| Household | Consumption |
|-----------|-------------|
| A         | 120         |
| B         | 220         |
| C         | 350         |
| D         | 800         |

1. Convert these values into **quartiles** (4 equal-sized groups).  
2. Assign each household to a quartile category (`Q1 = Very Low`, `Q2 = Low-Medium`, `Q3 = Medium-High`, `Q4 = Very High`).  

### Exercise 3: Blood Pressure Categories
A health survey records systolic blood pressure: 110, 125, 138, 162.  
Use the standard clinical thresholds:

- Normal: <120  
- Elevated: 120–129  
- Hypertension Stage 1: 130–139  
- Hypertension Stage 2: ≥140  

Assign each person to a category.  

### Exercise 4: Student Attendance (Z-Scores)
Absences from school (days per year) are: 2, 4, 6, 8, 12.  
The mean = 6.4, standard deviation = 3.4.  
Define categories:  

- Below −1σ → "Very Low Absence"  
- −1σ to +1σ → "Typical Absence"  
- Above +1σ → "High Absence"  

Classify each student.  

### Exercise 5: Water Pollution Levels
Average river nitrate concentration (mg/L) is reported for two regions:

| Region | 2000 | 2010 | 2020 |
|--------|------|------|------|
| A      | 0.5  | 1.2  | 2.8  |
| B      | 6.0  | 6.5  | 7.5  |

1. Define three categories using **equal-width binning**:  
   - Low: 0–2  
   - Medium: 2–5  
   - High: >5  
2. Represent each region’s trajectory as a sequence of categorical states.  

## Answers and Explanations

### Exercise 1
Tiny numeric differences (e.g., 9,950 vs 10,020 steps) don’t indicate meaningful differences in behavior.  
Sequence analysis is about **paths of discrete states** (e.g., “Sedentary,” “Moderately Active,” “Highly Active”). Categorization allows us to focus on interpretable patterns.  

### Exercise 2
Sorted consumption: [120, 220, 350, 800].  
Quartile assignment:  
- Q1 = 120 → Very Low  
- Q2 = 220 → Low-Medium  
- Q3 = 350 → Medium-High  
- Q4 = 800 → Very High  

### Exercise 3
- 110 → Normal (<120)  
- 125 → Elevated (120–129)  
- 138 → Hypertension Stage 1 (130–139)  
- 162 → Hypertension Stage 2 (≥140)  

### Exercise 4
Z-scores = (value − mean)/σ:  
- 2 → (2−6.4)/3.4 ≈ −1.29 → Very Low Absence  
- 4 → −0.70 → Typical Absence  
- 6 → −0.12 → Typical Absence  
- 8 → 0.47 → Typical Absence  
- 12 → 1.65 → High Absence  

### Exercise 5
Using bins: Low (0–2), Medium (2–5), High (>5).  

- Region A: 0.5 (Low) → 1.2 (Low) → 2.8 (Medium) → Sequence = [Low, Low, Medium]  
- Region B: 6.0 (High) → 6.5 (High) → 7.5 (High) → Sequence = [High, High, High]  

Interpretation:  
- Region A shows a shift from Low to Medium pollution.  
- Region B remains consistently High.  

*Author: Yuqi Liang*