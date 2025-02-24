# About Sequenzo

`Sequenzo` is a fast, scalable, and intuitive Python package for social sequence analysis. It is built for big data, designed for every discipline.

## What is Sequence Analysis, and why does it matter?
Sequence Analysis (SA) is a powerful method for analyzing sequences of events or states over a period of time. It’s especially useful when studying how people’s lives change, capturing shifts like:

* Family transitions (single → married → having children)
* Career paths (graduation → first job → career changes)
* Migration journeys (moving from city A → city B → city C)

Unlike numeric time series (such as stock prices or temperatures), the data analyzed by Sequence Analysis are usually categorical—meaning they describe distinct life events or states rather than numeric values. These sequences often have irregular intervals and unordered categories, making standard statistical methods unsuitable.

Currently, Sequence Analysis is primarily used in sociology and demography to understand life trajectories, but its full potential across fields like economics, marketing, human resources, health care, education, and even customer behavior analysis remains largely untapped.

## What kinds of questions can Sequence Analysis answer?

* Career Patterns: How do career paths differ between men and women across different cultures?
* Family Formation: How have marriage and family-formation patterns changed across generations?
* Migration Patterns: What typical migration journeys do people follow when moving to new countries?
* Health Research: How do patients move between different health states over time?
* Customer Insights: What typical pathways do customers take before becoming loyal or dropping out?

## Introducing Sequenzo: A Faster, Easier Python Package for Sequence Analysis
To address existing limitations, we've developed Sequenzo, a Python package tailored specifically for social sequence analysis. Compared to existing tools like the widely-used TraMineR in R (Gabadinho et al., 2011), Sequenzo is significantly faster, more efficient, and user-friendly, especially when dealing with large datasets.

Sequenzo provides essential sequence analysis methods, including:

* Sequence
* Visualization: 
* Optimal Matching: Finding similarities and differences between sequences.
* Hierarchical Clustering: Grouping similar life trajectories into meaningful categories.

Thanks to parallel computing and optimized algorithms, Sequenzo is at least 10 times faster than traditional tools while maintaining high accuracy, making it perfect for both academic research and practical business analysis.

## Team

**Authors**
* Yuqi Liang, University of Oxford
* Xinyi Li, Heilongjiang University
* Jan Meyerhoff-Liang, Institute for New Economic Thinking Oxford

**Contributors**
* Website and related technical support: Mactavish
* Logo and color design: Changyu Yi
* Technical advisor in sequence analysis: Tim Liao, University of Illinois Urbana-Champaign
* Sequence data sources complilation
  * Jingrui Chen (history)
  * Yuelu Yin (public health)
* Testing

**Acknowledgements**

*Yuqi Liang:* 
> I am profoundly grateful for all the effort and dedication poured into Sequenzo by every one of my team members. Without your nurturing care, Sequenzo could never have grown into what it is today — becoming an integral part of my PhD journey and taking a humble step forward within the community of social sequence analysis as well as computational and quantitative social science. Many thanks for the great support from my mentor Tim Liao, and my PhD advisor Ridhi Kashyap.

> I'm endlessly grateful to my family. Your love and understanding since I was a small kid have been the foundation of my courage to push boundaries, discover new worlds, and take risks. Grandparents watching from the stars, please continue guiding me, and I will always walk forward with your love in my heart.

> Let's continue to walk this path together, for our story has only just begun.

## References

Gabadinho, A., Ritschard, G., M¨uller, N. S. & Studer, M. (2011), ‘Analyzing and visualizing
state sequences in r with traminer’, Journal of statistical software 40, 1–37.