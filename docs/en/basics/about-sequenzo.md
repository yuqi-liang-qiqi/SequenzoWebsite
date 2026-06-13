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

`Sequenzo` is a Python package for social sequence analysis. It is designed for categorical trajectories, large datasets, and the everyday workflow of researchers who prepare data, compare sequences, build typologies, visualize patterns, and fit probabilistic sequence models in Python.

Use Sequenzo when you need to:

- turn longitudinal categorical data into a validated `SequenceData` object;
- compare trajectories with one of 24 distance methods;
- build and evaluate sequence typologies;
- visualize sequence patterns for papers, slides, or reports;
- scale clustering with CLARA when full distance matrices become too large;
- move into group comparison, multidomain analysis, event histories, or HMM-style models.

## Foundations and Inspirations

Its methodological foundations build upon prior work in the R software tradition, especially
[the TraMineR (Gabadinho et al. 2011) R package](https://traminer.unige.ch/), which
established many of the core concepts, representations, and analytical tools in
sequence analysis, as well as subsequent methodological extensions developed within
[TraMineRextras (Gabadinho et al. 2021)](https://cran.r-project.org/web/packages/TraMineRextras/index.html).

Sequenzo also draws inspiration from
[WeightedCluster (Studer, 2013)](https://mephisto.unige.ch/weightedcluster/) for
typology construction,
[seqHMM (Helske & Helske, 2019)](https://www.jstatsoft.org/article/view/v088i03) for
probabilistic modeling using hidden Markov models,
and [ggseqplot (Raab, 2022)](https://maraab23.github.io/ggseqplot/) for the design of
relative frequency sequence visualizations (Fasang & Liao, 2013).

We gratefully acknowledge these pioneering contributions and the broader community in social sequence analysis. Sequenzo connects long-standing methodological traditions with the computational practices of the Python data science community, including machine learning and large-scale data workflows.

Many users first meet sequence analysis through concrete data problems. This page gives the context: what sequence data look like, which questions the method answers, and where Sequenzo fits.

## What is social sequence analysis, and why does it matter?

Sequence Analysis (SA) compares ordered categorical states or events. It began in biology, then moved into the social sciences for studying life courses and other trajectories (Abbott, 1983; Liao et al., 2022). On this website, sequence analysis and social sequence analysis refer to that social-science use.

It is especially useful for understanding how people's lives unfold, capturing transitions such as:

* Family transitions (single → married → having children)
* Career paths (graduation → first job → career changes)
* Migration trajectories (moving from City A → City B → City A)

Unlike numeric time series such as stock prices or temperatures, social sequence data are usually categorical. They represent stages such as being single, married, unemployed, studying, or working.

These states are often unordered, and transitions can happen at different moments for different people. Standard numeric time-series tools are therefore a poor fit. Sequence analysis uses distances, alignments, state summaries, and models built for categorical trajectories.

Sequence analysis is predominantly used in sociology and demography to study individual life trajectories. However, its potential application in broader fields, including economics, management, marketing, human resources, healthcare, education, and customer behavior, remains largely untapped.

## What kinds of questions can sequence analysis answer?

At the individual (micro) level:

* Career Patterns: How do career paths differ between men and women across different cultures?
* Family Formation: How have marriage and family formation patterns changed across generations?
* Migration Patterns: What typical migration trajectories do people follow when moving to new countries?
* Health Research: How do patients move between different health conditions or symptoms over time?
* Customer Insights: What typical pathways do customers take before becoming loyal or disengaged?

Beyond individuals, sequence analysis can also study larger entities. Economic geography, for example, uses trajectories of regions and cities to examine convergence, divergence, and agglomeration (Losacker & Kuebart, 2024).

In general, in meso and macro-level analyses, entities can be cities, regions, companies, or countries. For instance:

* Urban Development: How do cities evolve in terms of economic status, population growth, and infrastructure development?
* Regional Economic Patterns: What trajectories do regions follow regarding employment structures or industrial composition over decades?
* Corporate Life-Cycles: What typical growth, stagnation, or innovation trajectories do companies experience throughout their existence?
* Country-Level Transitions: How do countries transition between political regimes, economic systems, or developmental stages over historical periods?

Sequenzo helps researchers, policy analysts, and industry data teams answer these questions with reproducible Python workflows.

## Introducing Sequenzo: A Fast Python Package for Sequence Analysis

Sequence analysis has enormous potential for understanding complex trajectories and patterns across many fields, but it faces significant scaling challenges. Large samples, long observation windows, and multidomain designs can make full pairwise distance matrices expensive in time and memory.

Sequenzo brings this methodological tradition into the scientific Python stack, with an emphasis on pandas-friendly data handling, scalable computation, and workflows that fit naturally with NumPy, scikit-learn, matplotlib, and modern research pipelines.

For R users, see [Functions Comparison](/en/traminer-and-sequenzo/functions-comparison) and [Performance Differences](/en/traminer-and-sequenzo/performance-diff).

### Key features

* **Sequence Data Handling:** Manage and convert longitudinal data formats, define categorical state spaces, and detect missing values.

* **Visualization Tools:** Create clear visualizations such as the state distribution plot and index plot to effectively illustrate sequence data.

* **Sequence Characteristics Indicators:** Compute sequence length, state durations, entropy, complexity, turbulence, and related measures.

* **Dissimilarity Measures:** Compute Optimal Matching, Hamming, Longest Common Subsequence, prefix-based, Chi-squared, Euclidean, and related sequence distances.

* **Clustering Analysis:** Efficiently groups similar trajectories into meaningful clusters to identify representative patterns by hierarchical clustering, k-medoids, and partitioning around medoids (PAM).

* **Representative Sequence Identification:** Identify medoids and representative observed trajectories.

* **Probabilistic Modeling with Hidden Markov Models:** Fit HMM, MHMM, NHMM, and MNHMM models to recover latent dynamics behind observed sequences.

* **Big Data:** Use CLARA-style workflows (Studer et al., 2024) when full pairwise distance matrices become too expensive.

With optimized algorithms and parallel computation, Sequenzo reduces computational burden and makes sequence analysis practical at larger scales. Whether for academic research, business analytics, or policy work, Sequenzo brings sequence analysis into the Python data-science stack.

Now Sequenzo is available on macOS, Windows, and Linux. It can be installed directly via `pip install sequenzo` with no compiler or build tools required for the platform/Python combinations listed below.

| Platform         |Python Versions                   |
|------------------|-----------------------------------|
| **macOS**        | 3.9, 3.10, 3.11, 3.12, 3.13, 3.14 |
| **Windows**      | 3.9, 3.10, 3.11, 3.12, 3.13       |
| **Linux (glibc)**| 3.9, 3.10, 3.11, 3.12, 3.13, 3.14 |
| **Linux (musl)** | 3.9, 3.10, 3.11, 3.12, 3.13, 3.14 |

### Coming from R?

Many Sequenzo users have worked with R packages such as TraMineR, WeightedCluster, and seqHMM. Sequenzo does not replace those packages. It extends the same methodological tradition into Python, with a focus on performance, scale, and integration with pandas, NumPy, scikit-learn, and matplotlib.

If you are moving from R, start with [Installing](/en/basics/installing), run the [Quickstart](/en/basics/quickstart), and use the [Typical Workflow](/en/basics/typical-workflow) to see how sequence definition, distance computation, clustering, visualization, and model-based analysis connect.

## Team

**Paper Authors**
* [Yuqi Liang, University of Oxford](https://www.yuqi-liang.tech/)
* [Xinyi Li, Northeastern University](https://github.com/Fantasy201)
* [Yapeng Wei, University of Oxford](https://github.com/YapengWei)
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
* [Ziting Yang, Rochester University (US)](https://www.linkedin.com/in/ziting-yang-7b33832bb)

Others
* With special thanks to our initial testers (alphabetically ordered): [Joji Chia](https://sociology.illinois.edu/directory/profile/jbchia2), [Kass Gonzalez](https://www.linkedin.com/in/kass-gonzalez-72a778276/), [Sinyee Lu](https://sociology.illinois.edu/directory/profile/qianyil4), [Sohee Shin](https://sociology.illinois.edu/directory/profile/sohees2)
* Website and related technical support: [Mactavish](https://github.com/mactavishz)
* Sequence data sources compilation - History: Jingrui Chen
* Visual design consultant: Changyu Yi
* Assistance with early-stage performance testing of Sequenzo: Qian Wang, Ruxin Xue, Min Zhao, Tia (Qi Dai).

**Acknowledgements**

* Amazing authors of R packages in social sequence analysis, including [TraMineR (Gabadinho et al. 2011)](https://traminer.unige.ch/), [WeightedCluster (Studer, 2013)](https://mephisto.unige.ch/weightedcluster/), and [seqHMM (Helske & Helske, 2019)](https://cran.r-project.org/web/packages/seqHMM/index.html)
* Methodological advisor in sequence analysis: [Professor Tim Liao (University of Illinois Urbana-Champaign)](https://sociology.illinois.edu/directory/profile/tfliao)
* Yuqi's PhD advisor [Professor Ridhi Kashyap (University of Oxford)](https://www.nuffield.ox.ac.uk/people/profiles/ridhi-kashyap/), and mentor [Charles Rahal (University of Oxford)](https://crahal.com/)
* [Social Sequence Analysis Association](https://sequenceanalysis.org/)
* Helpful discussions and comments:
  * [Gilbert Ritschard](https://mephisto.unige.ch/Gilbert/)
  * [Matthias Studer](https://www.unige.ch/sciences-societe/ideso/membres/matthias-studer)
  * [Emanuela Struffolino](https://emastruffolino.github.io/)
  * [Marcel Raab](https://marcelraab.de/)
  * [Heyi Zhang](https://profiles.ucl.ac.uk/100967-heyi-zhang)
* Yuqi's original programming mentor: [JiangHuShiNian](https://github.com/jianghushinian)

## References

Abbott, A. (1983). Sequences of social events: Concepts and methods for the analysis of order in social processes. Historical Methods: A Journal of Quantitative and Interdisciplinary History, 16(4), 129-147.

Fasang, A. E., & Liao, T. F. (2013). Visualizing Sequences in the Social Sciences: Relative Frequency Sequence Plots: Relative Frequency Sequence Plots. Sociological Methods & Research, 43(4), 643-676. https://doi.org/10.1177/0049124113506563 (Original work published 2014)

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. Journal of Statistical Software, 88, 1-32.

Liao, T. F., Bolano, D., Brzinsky-Fay, C., Cornwell, B., Fasang, A. E., Helske, S., Piccarreta, R., Raab, M., Ritschard, G., Struffolino, E. et al. (2022), 'Sequence analysis: Its past, present, and future', Social science research 107, 102772.

Losacker, S., & Kuebart, A. (2024). Introducing sequence analysis to economic geography. Progress in Economic Geography, 2(1), 100012.

Gabadinho, A., Ritschard, G., Muller, N. S. & Studer, M. (2011), 'Analyzing and visualizing
state sequences in r with traminer', Journal of statistical software 40, 1–37.

Ritschard, G., Studer, M., Buergin, R., Liao, T.F., Gabadinho, A., Fonta, P.A., Muller, N.S. and Rousset, P. (2021). Package ‘TraMineRextras’. Comprehensive R Archive Network (CRAN).

Raab, M. (2022). ggseqplot: Render Sequence Plots using ‘ggplot2’. https://doi.org/10.32614/CRAN.package.ggseqplot

Studer, M. (2013). WeightedCluster library manual. A practical guide to creating typologies of trajectories in the social sciences with, 2013(24), 33.

Studer, M., Sadeghi, R., & Tochon, L. (2024). Sequence analysis for large databases (Vol. 104, pp. 1–42). LIVES Working Papers.


*Content writer of this webpage: Yuqi Liang*
