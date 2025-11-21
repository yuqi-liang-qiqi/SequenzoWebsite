# About `Sequenzo`

<p align="center">
  <img src="./img/fulllogo_transparent.png" alt="Sequenzo full logo" class="logo-light" />
  <img src="./img/squenzo_logo_dark_transparent_transition.png" alt="Sequenzo full logo dark" class="logo-dark" />
</p>

<style>
  .logo-light, .logo-dark { width: 60%; max-width: 320px; height: auto; }
  .logo-dark { display: none; }
  html.dark .logo-light { display: none; }
  html.dark .logo-dark { display: inline; }
</style>

`Sequenzo` is a fast, scalable, and intuitive Python package for social sequence analysis. It is designed specifically to handle big data and is applicable across all disciplines within the social sciences, making sequence analysis more accessible and efficient for both researchers and practitioners.

Despite gaining increasing attention, social sequence analysis is still an emerging method. Thus, before briefly introducing our package, here we will first walk you through some essential concepts of sequence analysis and highlight key challenges it currently faces.

## What is social sequence analysis, and why does it matter?

Sequence Analysis (SA) originated in biology for comparing DNA and protein sequences, but has since been adapted into the social sciences as a powerful method for analyzing sequences of events or states over time (Abbott, 1983; Liao et al., 2022). Because it is applied to life trajectories and social phenomena, it is often referred to as social sequence analysis. However, in the social sciences, it is also commonly called simply sequence analysis. 

It is especially useful for understanding how people's lives unfold, capturing transitions such as:

* Family transitions (single → married → having children)
* Career paths (graduation → first job → career changes)
* Migration journeys (moving from City A → City B → City A)

Unlike numeric time series such as stock prices or temperatures, the data used in social sequence analysis are typically categorical. This means that they represent distinct life events or stages, such as being single, married, or unemployed, rather than continuous numerical values. 

Moreover, these sequences often unfold at irregular time intervals, with the timing of transitions varying greatly from person to person. The categories themselves are also often unordered (such as being a software engineer or a user interface designer in different years), meaning there is no natural way to say one state is "greater" or "less than" another. 

Because of these characteristics, traditional statistical methods, which rely on regularly spaced numeric data and assume meaningful order or distance between values, are not suitable. Instead, SA requires specialized tools that can handle the unique structure of life course data for analyzing complex, non-numeric sequences.

As of 2025, sequence analysis is predominantly used in sociology and demography to study individual life trajectories. However, its potential application in broader fields, including economics, management, marketing, human resources, healthcare, education, and customer behavior, remains largely untapped.

## What kinds of questions can sequence analysis answer?

At the individual (micro) level:

* Career Patterns: How do career paths differ between men and women across different cultures?
* Family Formation: How have marriage and family formation patterns changed across generations?
* Migration Patterns: What typical migration journeys do people follow when moving to new countries?
* Health Research: How do patients move between different health conditions or symptoms over time?
* Customer Insights: What typical pathways do customers take before becoming loyal or disengaged?

Beyond individuals, sequence analysis can also be applied to analyze larger-scale entities, which has been understudied with few exceptions in economic geography which examines the trajectories and interactions of regions and cities as they evolve over time, revealing patterns of convergence, divergence, and agglomeration (Losacker & Kuebart, 2024). 

In general, in meso and macro-level analyses, entities can be cities, regions, companies, or countries. For instance:

* Urban Development: How do cities evolve in terms of economic status, population growth, and infrastructure development?
* Regional Economic Patterns: What trajectories do regions follow regarding employment structures or industrial composition over decades?
* Corporate Life-Cycles: What typical growth, stagnation, or innovation trajectories do companies experience throughout their existence?
* Country-Level Transitions: How do countries transition between political regimes, economic systems, or developmental stages over historical periods?

Sequenzo aims to empower researchers, decision-makers, and data analysts in the industry to answer these diverse questions efficiently and effectively.

## Introducing Sequenzo: A Fast, Intuitive, and Scalable Python Package for Sequence Analysis

Sequence analysis has enormous potential for understanding complex trajectories and patterns across many fields, but it faces significant challenges, particularly when dealing with large-scale datasets common in today's digital era. Existing tools, including R tools such as `TraMineR` and `WightedCluster`, often struggle with computational speed and efficiency, becoming slow and resource-intensive as datasets grow. This inefficiency limits the practical use of sequence analysis in real-world research scenarios and commercial applications.

To address these challenges, we've developed Sequenzo, a Python package specifically tailored for social sequence analysis in the age of big data. Compared to widely-used existing tools such as TraMineR in R (Gabadinho et al., 2011), Sequenzo offers remarkable improvements in speed, efficiency, and ease of use. 

<!-- For more information, please refer to [Performance Differences between TraMineR and Sequenzo](/en/traminer-and-sequenzo/performance-diff) and [Functions Comparison](/en/traminer-and-sequenzo/functions-comparison). -->

### Key features of Sequenzo include:

* **Comprehensive Sequence Data Handling:** Easily manage and convert various longitudinal data formats, and detect missing values.

* **Visualization Tools:** Create clear visualizations such as the state distribution plot and index plot to effectively illustrate sequence data.

* **Detailed Complexity Indicators (micro- and macro-level):** Compute extensive sequence metrics including sequence length, state durations, entropy, complexity, turbulence, and more.

* **Dissimilarity Measures:** Offers a variety of distance measures (Optimal Matching, Hamming, Longest Common Subsequence, Chi-squared, Euclidean, etc.) for robust sequence comparisons.

* **Clustering Analysis:** Efficiently groups similar trajectories into meaningful clusters to identify representative patterns by hierarchical clustering, k-medoids, and partitioning around medoids (PAM).

* **Representative Sequence Identification:** Determines medoid/referencing sequences.

* **Big Data:** Drawing upon the CLARA algorithm (Studer et al., 2024), Sequenzo can handle large datasets efficiently.

Thanks to optimized algorithms and parallel computation, Sequenzo is at least 6 times faster than traditional tools in R, significantly reducing computational burden and enabling sequence analysis to be practically applied at scale. Whether for academic research, business analytics, or policy insights, Sequenzo makes sequence analysis accessible, efficient, and insightful in an increasingly data-driven world.

## Team

**Paper Authors**
* [Yuqi Liang, University of Oxford](https://www.yuqi-liang.tech/)
* [Xinyi Li, Northeastern University](https://github.com/Fantasy201)
* [Jan Heinrich Ernst Meyerhoff-Liang, Institute for New Economic Thinking Oxford](https://www.linkedin.com/in/jan-meyerhoff-liang-97999a170/)

**Package Contributors**

Coding contributors:
* [Sebastian Daza](https://sdaza.com/)
* [Cheng Deng](https://github.com/de-de-de-de-de)
* [Liangxingyun He, Stockholm School of Economics, Sweden](https://www.linkedin.com/in/liangxingyun-he-6aa128304/)

Documentation contributors:
* [Liangxingyun He, Stockholm School of Economics, Sweden](https://www.linkedin.com/in/liangxingyun-he-6aa128304/)
* [Yukun Ming, Universidad Carlos III de Madrid (Spain)](https://www.linkedin.com/in/yukun)
* [Sizhu Qu, Northeastern University (US)](https://www.linkedin.com/in/sizhuq)
* [Ziting Yang, Rochester Wniversity (US)](https://www.linkedin.com/in/ziting-yang-7b33832bb)

Others
* With special thanks to our initial testers (alphabetically ordered): [Joji Chia](https://sociology.illinois.edu/directory/profile/jbchia2), [Kass Gonzalez](https://www.linkedin.com/in/kass-gonzalez-72a778276/), [Sinyee Lu](https://sociology.illinois.edu/directory/profile/qianyil4), [Sohee Shin](https://sociology.illinois.edu/directory/profile/sohees2)
* Website and related technical support: [Mactavish](https://github.com/mactavishz)
* Sequence data sources compilation - History: Jingrui Chen
* Visual design consultant: Changyu Yi

**Acknowledgements**

* Methodological advisor in sequence analysis: [Professor Tim Liao (University of Illinois Urbana-Champaign)](https://sociology.illinois.edu/directory/profile/tfliao)
* Yuqi's PhD advisor [Professor Ridhi Kashyap (University of Oxford)](https://www.nuffield.ox.ac.uk/people/profiles/ridhi-kashyap/), and mentor [Charles Rahal (University of Oxford)](https://crahal.com/)
* Helpful discussions and comments: 
  * [Gilbert Ritschard](https://mephisto.unige.ch/Gilbert/)
  * [Emanuela Struffolino](https://emastruffolino.github.io/)
  * [Heyi Zhang](https://profiles.ucl.ac.uk/100967-heyi-zhang)
* Yuqi's original programming mentor: [JiangHuShiNian](https://github.com/jianghushinian)

*Yuqi Liang:* 
> I am profoundly grateful for all the effort and dedication poured into Sequenzo by every one of my team members. Without your nurturing care, Sequenzo could never have grown into what it is today — becoming an integral part of my PhD journey and taking a humble step forward within the community of social sequence analysis as well as computational and quantitative social science. Many thanks for the great support from my mentor Tim Liao, and my PhD advisor Ridhi Kashyap.

> I'm endlessly grateful to my family. Your love and understanding since I was a small kid have been the foundation of my courage to push boundaries, discover new worlds, and take risks. Grandparents watching from the stars, please continue guiding me, and I will always walk forward with your love in my heart.

> Let's continue to walk this path together, for our story has only just begun.

## References

Abbott, A. (1983). Sequences of social events: Concepts and methods for the analysis of order in social processes. Historical Methods: A Journal of Quantitative and Interdisciplinary History, 16(4), 129-147.

Liao, T. F., Bolano, D., Brzinsky-Fay, C., Cornwell, B., Fasang, A. E., Helske, S., Piccarreta, R., Raab, M., Ritschard, G., Struffolino, E. et al. (2022), 'Sequence analysis: Its past, present, and future', Social science research 107, 102772.

Losacker, S., & Kuebart, A. (2024). Introducing sequence analysis to economic geography. Progress in Economic Geography, 2(1), 100012.

Gabadinho, A., Ritschard, G., Muller, N. S. & Studer, M. (2011), 'Analyzing and visualizing
state sequences in r with traminer', Journal of statistical software 40, 1–37.

Studer, M., Sadeghi, R., & Tochon, L. (2024). Sequence analysis for large databases (Vol. 104, pp. 1–42). LIVES Working Papers.


*Content writer of this webpage: Yuqi Liang*