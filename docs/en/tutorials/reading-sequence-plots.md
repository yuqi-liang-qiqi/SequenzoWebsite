# How to Read Sequence Plots

Sequence visualizations carry most of the interpretive weight in a sequence analysis paper, and they are also where readers make the most mistakes. The most common one is reading a state distribution plot as if its colored bands were individual people. This page explains what each major plot type shows, what it hides, and which plot answers which question.

The function pages in [Visualization Tools](/en/visualization/introduction) document parameters and code. This page is about reading the figures.

## Before You Start

You should know the basic terms from [Basic Concepts](./basic-concepts.md): state, spell, and full sequence.

After this page, you should be able to match a research question to a plot type and describe precisely what a figure does, and does not, show.

## Two Families of Plots

Sequence plots answer one of two kinds of questions:

- **Longitudinal views** keep individual trajectories intact. One visual element corresponds to one sequence. Examples: index plot, most frequent sequences plot, medoid plot, relative frequency plot.
- **Cross-sectional views** summarize the sample at each time point and discard individual continuity. Examples: state distribution plot, modal state plot, cross-sectional entropy.

Most misreadings come from treating a cross-sectional view as a longitudinal one. Keeping the two families separate prevents that.

## Index Plot: Individuals as Rows

In a [sequence index plot](/en/visualization/index-plot), each row is one entity, each column is a time point, and the color shows the state. Because rows are real trajectories, you can trace any individual from left to right.

What to look for:

- Large blocks of one color indicate long, stable spells.
- Frequent color changes within rows indicate fragmented or turbulent trajectories.
- Vertical color boundaries shared by many rows indicate synchronized transitions, such as a school-leaving age or a policy date.

Two caveats. First, the visual impression depends on how rows are sorted. Sequenzo sorts lexicographically by default (rows are ordered alphabetically by their state sequence, which groups identical and near-identical trajectories together) and also supports sorting by the first dimension of multidimensional scaling, which orders rows by overall similarity, or by distance to the most frequent sequence. Different sortings make different patterns salient, so report the sorting you used. Second, with thousands of sequences, rows are thinner than a pixel and overplotting hides minority patterns. At that scale, switch to a [relative frequency plot](/en/visualization/plot-relative-frequency) or sample rows.

## State Distribution Plot: Shares, Not People

A [state distribution plot](/en/visualization/state-distribution-plot) shows, at each time point, the percentage of entities in each state. It answers "how common is each state at time t?"

It does not show transitions, and you cannot follow anyone across the figure. If the employment band is 60 percent at time 5 and 60 percent at time 6, it does not follow that the same people are employed at both points; large opposite flows can cancel out exactly. This is the single most common misreading of sequence graphics, so caption these plots precisely: shares of states at each time point, not trajectories.

Use it to see aggregate change, such as the decline of education and rise of employment across ages. Pair it with an index plot whenever individual-level continuity matters for the argument.

## Modal State Plot: The Most Common State per Time Point

A [modal state plot](/en/visualization/plot-modal-state) shows the single most frequent state at each time point, with bar height giving its share. It is a compact summary of the dominant pattern.

Its limitation follows from its construction: the sequence of modal states is assembled column by column and may correspond to no real person in the data. A sample where each individual changes state once can still produce a smooth-looking modal sequence. Treat it as a summary statistic per time point, not as a typical trajectory. When you need a real representative trajectory, use a [medoid plot](/en/visualization/plot-single-medoid) instead.

## Mean Time Plot: Time Budgets

A [mean time plot](/en/visualization/plot-mean-time) shows the average time spent in each state across the observation window, optionally with standard errors. It answers duration questions: how many years does a typical trajectory spend in education, employment, or unemployment?

It deliberately ignores order and timing. Two groups can have identical mean times while one experiences unemployment early and the other late. If order or timing matters for the question, complement it with longitudinal views.

## Relative Frequency Plot: Structure at Scale

A [relative frequency plot](/en/visualization/plot-relative-frequency) handles datasets too large for a readable index plot (Fasang & Liao, 2014). Sequenzo sorts sequences along a one-dimensional multidimensional scaling axis, splits them into equal-size frequency groups, and shows the medoid sequence of each group alongside a box plot of distances from group members to that medoid. A printed pseudo R² and F statistic summarize how well the medoids represent their groups.

Read the medoid strips as a gallery of real, representative trajectories ordered along the main axis of variation, and the box plots as a quality check: wide boxes mean the medoid represents its group loosely.

## Transition Matrix Plot: Where Flows Go

A [transition matrix plot](/en/visualization/plot-transition-matrix) shows the probability of moving from each state (row) to each state (column) between adjacent time points. The diagonal holds persistence probabilities; large diagonal values mean stable states. It aggregates over the whole window, so a transition that is common early and absent late appears as a moderate average; compute period-specific matrices when timing matters.

## Choosing a Plot

| Question | Plot |
| --- | --- |
| What does each individual trajectory look like? | [Index plot](/en/visualization/index-plot) |
| How common is each state at each time point? | [State distribution plot](/en/visualization/state-distribution-plot) |
| What is the dominant state over time? | [Modal state plot](/en/visualization/plot-modal-state) |
| How much time is spent in each state? | [Mean time plot](/en/visualization/plot-mean-time) |
| What are the typical trajectories in a large dataset? | [Relative frequency plot](/en/visualization/plot-relative-frequency) |
| Which states flow into which? | [Transition matrix plot](/en/visualization/plot-transition-matrix) |
| What is the most frequent exact sequence? | [Most frequent sequences plot](/en/visualization/plot-most-frequent-sequences) |
| What does a cluster's representative look like? | [Single medoid plot](/en/visualization/plot-single-medoid) |

## Reading Cluster Panels

After clustering, the standard presentation is one panel per cluster, using the same plot type and the same color legend in every panel. Read the panels in two passes. First, within each panel, describe the cluster in one sentence ("early stable employment", "late transition with long education"). If you cannot, the cluster solution may be too fine or the plot type wrong. Second, across panels, check that the clusters differ in ways the cluster labels claim. State distribution panels show how clusters differ on average; index plot panels show whether members of a cluster are actually homogeneous. Showing both is often worth the space.

## See Also

- [Visualization Gallery](/en/visualization/gallery) shows every plot type with code.
- [Sequence Indicators and Statistics](./sequence-indicators-and-statistics.md) covers the numeric counterparts of these visual summaries.
- [Cluster Quality Indicators](./cluster-quality-indicators.md) complements visual inspection of cluster solutions.
- [Reporting Sequence Analysis](./reporting-sequence-analysis.md) explains how to present plots in a paper.

## References

Fasang, A. E., & Liao, T. F. (2014). Visualizing sequences in the social sciences: Relative frequency sequence plots. *Sociological Methods & Research*, 43(4), 643-676. https://doi.org/10.1177/0049124113506563

Gabadinho, A., Ritschard, G., Muller, N. S., & Studer, M. (2011). Analyzing and visualizing state sequences in R with TraMineR. *Journal of Statistical Software*, 40(4), 1-37. https://doi.org/10.18637/jss.v040.i04

*Author: Yapeng Wei*
