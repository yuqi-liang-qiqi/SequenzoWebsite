# About Sequenzo

`Sequenzo` is a fast, scalable, and intuitive Python package for social sequence analysis. It is designed specifically to handle big data and is applicable across all disciplines within the social sciences, making sequence analysis more accessible and efficient for both researchers and practitioners.

As social sequence analysis is still an emerging method, before briefly introducing our package, here we will first walk you through some essential concepts of sequence analysis and highlight key challenges it currently faces.

## What is Sequence Analysis, and why does it matter?

Sequence Analysis (SA) is a powerful method for analyzing sequences of events or states over a period of time. It is especially useful for understanding how people's lives unfold, capturing transitions such as:

* Family transitions (single → married → having children)
* Career paths (graduation → first job → career changes)
* Migration journeys (moving from City A → City B → City A)

Unlike numeric time series (such as stock prices or temperatures), data used in Sequence Analysis are typically categorical. This means they describe distinct events or life stages rather than continuous numeric values. Additionally, these sequences often have irregular intervals and unordered categories, which makes conventional numeric statistical methods unsuitable.

As of 2024, sequence analysis is predominantly used in sociology and demography to study individual life trajectories. However, its potential application in broader fields—including economics, management, marketing, human resources, healthcare, education, and customer behavior—remains largely untapped.

## What kinds of questions can sequence analysis answer?

At the individual (micro) level:

* Career Patterns: How do career paths differ between men and women across different cultures?
* Family Formation: How have marriage and family formation patterns changed across generations?
* Migration Patterns: What typical migration journeys do people follow when moving to new countries?
* Health Research: How do patients move between different health conditions or symptoms over time?
* Customer Insights: What typical pathways do customers take before becoming loyal or disengaged?

Beyond individuals, sequence analysis can also be applied to analyze larger-scale entities, which has been understudied with few exceptions (TODO cite economic geography). Such entities can be cities, regions, companies, or countries (meso and macro-level analyses). For instance:

* Urban Development: How do cities evolve in terms of economic status, population growth, and infrastructure development?
* Regional Economic Patterns: What trajectories do regions follow regarding employment structures or industrial composition over decades?
* Corporate Life-Cycles: What typical growth, stagnation, or innovation trajectories do companies experience throughout their existence?
* Country-Level Transitions: How do countries transition between political regimes, economic systems, or developmental stages over historical periods?

Sequenzo aims to empower researchers and decision-makers to answer these diverse questions efficiently and effectively.

## Introducing Sequenzo: A Faster, Easier Python Package for Sequence Analysis

Sequence analysis has enormous potential for understanding complex trajectories and patterns across many fields, but it faces significant challenges—particularly when dealing with large-scale datasets common in today's digital era. Existing tools often struggle with computational speed and efficiency, becoming slow and resource-intensive as datasets grow. This inefficiency limits the practical use of sequence analysis in real-world research scenarios and commercial applications.

To address these challenges, we've developed Sequenzo, a Python package specifically tailored for social sequence analysis in the age of big data. Compared to widely-used existing tools like TraMineR in R (Gabadinho et al., 2011), Sequenzo offers remarkable improvements in speed, efficiency, and ease of use.

### Key features of Sequenzo include:

* **Comprehensive Sequence Data Handling:** Easily manage and convert various longitudinal data formats.

* **Visualization Tools:** Create clear visualizations such as density plots, frequency plots, and index plots to effectively illustrate sequence data.

* **Detailed Individual-Level Analysis:** Compute extensive individual longitudinal metrics including sequence length, state durations, entropy, complexity, turbulence, and more.

* **Cross-Sectional Analysis:** Analyze state distributions at specific time points, modal states, and transversal entropy.

* **Aggregate Sequence Metrics:** Calculate transition rates, average state durations, sequence frequencies, and other aggregated characteristics.

* **Dissimilarity Measures:** Offers a variety of distance measures (Optimal Matching, Hamming, Longest Common Subsequence, Chi-squared, Euclidean, etc.) for robust sequence comparisons.

* **Hierarchical Clustering:** Efficiently group similar trajectories into meaningful clusters to identify representative patterns.

* **Representative Sequence Identification:** Determine medoid sequences and assess heterogeneity within sequence sets.

Thanks to optimized algorithms and parallel computation, Sequenzo is at least 10 times faster than traditional tools in R, significantly reducing computational burden and enabling sequence analysis to be practically applied at scale. Whether for academic research, business analytics, or policy insights, Sequenzo makes sequence analysis accessible, efficient, and insightful in an increasingly data-driven world.

## Team

**Authors**
* Yuqi Liang, University of Oxford
* Xinyi Li, Heilongjiang University
* Jan Heinrich Ernst Meyerhoff-Liang, Institute for New Economic Thinking Oxford

**Contributors**
* Technical advisor in sequence analysis: Tim Liao, University of Illinois Urbana-Champaign
* Website and related technical support: Mactavish
* Logo and color design: Changyu Yi
* Sequence data sources compilation
  * Economics: Jan Meyerhoff-Liang
  * History: Jingrui Chen
  * Public health: Yuelu Yin
* Testing

**Acknowledgements**

*Yuqi Liang:* 
> I am profoundly grateful for all the effort and dedication poured into Sequenzo by every one of my team members. Without your nurturing care, Sequenzo could never have grown into what it is today — becoming an integral part of my PhD journey and taking a humble step forward within the community of social sequence analysis as well as computational and quantitative social science. Many thanks for the great support from my mentor Tim Liao, and my PhD advisor Ridhi Kashyap.

> I'm endlessly grateful to my family. Your love and understanding since I was a small kid have been the foundation of my courage to push boundaries, discover new worlds, and take risks. Grandparents watching from the stars, please continue guiding me, and I will always walk forward with your love in my heart.

> Let's continue to walk this path together, for our story has only just begun.

## References

Gabadinho, A., Ritschard, G., Muller, N. S. & Studer, M. (2011), 'Analyzing and visualizing
state sequences in r with traminer', Journal of statistical software 40, 1–37.


*Content writer of this webpage: Yuqi Liang*