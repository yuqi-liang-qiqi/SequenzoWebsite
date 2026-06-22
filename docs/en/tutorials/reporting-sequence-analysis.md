# Reporting Results of the Typical Workflow

A sequence analysis involves many small decisions: the state alphabet, the distance measure, the cost settings, the clustering method, and the number of clusters. Each decision can change the resulting typology. Readers and reviewers can only evaluate your findings if those decisions are stated, and the long-running debate about optimal matching in sociology was, in large part, a debate about undocumented and unjustified settings (Abbott & Tsay, 2000; Aisenbrey & Fasang, 2010).

This page lists what to report at each stage of a distance-and-clustering workflow, gives a methods-paragraph template, and collects the questions reviewers ask most often.

## Before You Start

This page assumes you have run the workflow from [Typical Workflow](/en/basics/typical-workflow): a `SequenceData` object, a distance matrix, a cluster solution, and cluster quality indicators.

Use this page to write a methods section that another researcher could reimplement without asking you for missing details.

## What to Report at Each Stage

### Data and Sequence Construction

| Item | Why it matters |
| --- | --- |
| Sample size and selection rules | Determines who the typology describes |
| Observation window and time granularity | Yearly and monthly data support different conclusions about timing |
| The full state alphabet, with definitions | The alphabet is the measurement instrument; collapsing states changes results |
| Handling of missing values | Gaps can be real states, censoring, or noise; say which |
| Weights, if any | Weighted analyses answer population-level questions |

If you converted numeric data into categorical states, report the binning rule. If sequences were truncated or aligned to an event, report the rule and how many cases it affected.

### Distance Measure

| Item | Example statement |
| --- | --- |
| Method | Optimal Matching |
| Substitution costs | Constant cost `2`, or transition-rate-based (`sm="TRATE"`) |
| Indel cost | `1`, or derived as half the maximum substitution cost (`indel="auto"`) |
| Normalization | `norm="auto"`, or the specific option used |
| Justification | Which aspect of trajectories the measure emphasizes, and why that fits the research question |

The justification matters more than the labels. State whether your research question is about timing, duration, or order, and why the chosen measure matches it. The [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) tutorial maps questions to measures, and Studer and Ritschard (2016) provide the systematic comparison worth citing for this choice.

### Clustering and the Number of Clusters

| Item | Example statement |
| --- | --- |
| Algorithm | Hierarchical clustering with average linkage, PAM, or CLARA |
| Candidate range of `k` | `k` from 2 to 10 |
| Quality indicators | ASW and other indicators from `ClusterQuality()` |
| Final choice and rationale | Indicator scores plus interpretability of the resulting groups |
| Cluster sizes | Report the size of each cluster, including small ones |

Report the indicator values for the chosen solution and its nearest competitors, not just the winner. If you chose a `k` that was not the indicator optimum, say so and explain why; that is a legitimate, common decision when a slightly lower-scoring solution separates substantively different trajectories.

### Robustness

A single solution is a fragile basis for substantive claims. Common checks:

- Recompute with a different linkage method or with k-medoids and compare the cluster assignments.
- Vary the cost settings (for example, constant costs versus TRATE) and check whether the typology survives.
- For CLARA, report the stability statistics (ARI and Jaccard agreement across iterations).
- If the alphabet involved judgment calls, rerun with the alternative coding.

One or two sentences stating that the main typology was robust to these variations, or describing how it changed, is usually enough in the paper, with details in an appendix.

### Figures and Tables

The standard presentation of a sequence typology is one panel per cluster, using a [State Distribution Plot](/en/visualization/state-distribution-plot) or an [Index Plot](/en/visualization/index-plot), with cluster sizes in the panel titles. Add the medoid sequence when representative trajectories matter for the argument. Readers misread state distribution plots as individual pathways surprisingly often, so caption them precisely: they show the share of each state at each time point, not trajectories. [How to Read Sequence Plots](./reading-sequence-plots.md) covers what each plot type shows and hides.

### Software

Report the package and version, for example `sequenzo 0.1.39`, and cite the software and methods sources you relied on. See [How to Cite](/en/basics/how-to-cite). Reporting the version matters because defaults can change between releases.

## A Methods-Paragraph Template

> We analyzed [N] sequences covering [time span] at [granularity], with an alphabet of [k] states: [list]. Missing values were [handled how]. Pairwise dissimilarities were computed with [method] using [substitution costs], indel cost [value], and [normalization], because the research question concerns [timing / duration / order]. We clustered the distance matrix with [algorithm and linkage], compared solutions for k = [range] using average silhouette width and additional quality indicators, and retained k = [chosen] because [rationale]. The typology was robust to [checks performed]. Analyses used sequenzo [version].

Replace every bracket; each one is something a reviewer may ask about.

## Common Reviewer Questions

| Question | Where this site helps |
| --- | --- |
| Why these substitution costs? | [Dissimilarity Measures](/en/tutorials/dissimilarity-measures), [Matrices in Dissimilarity Measures](/en/tutorials/matrix-in-dissimilarity-measures) |
| Are the distances comparable across groups or cohorts? | [Normalizing Sequences](/en/tutorials/normalizing-sequences) |
| Why this number of clusters? | [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators) |
| Is the typology an artifact of the clustering method? | [Cluster Analysis Methods](/en/tutorials/cluster-analysis-methods) |
| Do the clusters explain anything? | [Discrepancy Analysis](/en/discrepancy-analysis/introduction), [From Sequences to Variables](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) |
| How were time-varying covariates handled without using future information? | [Sequence Analysis Multi-state Model](/en/tutorials/multi-state-model), [Sequence History Analysis](/en/tutorials/sequence-history-analysis) |

## Reporting Checklist

1. Sample, window, granularity, alphabet, missing-value rule, weights.
2. Distance method, substitution costs, indel, normalization, and a question-based justification.
3. Clustering algorithm, candidate `k` range, indicator values, final `k` rationale, cluster sizes.
4. Robustness checks performed and their outcome.
5. One figure per cluster with precise captions; medoids if used.
6. Software name and version; citations for methods and software.

## See Also

- [Typical Workflow](/en/basics/typical-workflow)
- [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators)
- [How to Cite](/en/basics/how-to-cite)

## References

Abbott, A., & Tsay, A. (2000). Sequence analysis and optimal matching methods in sociology: Review and prospect. *Sociological Methods & Research*, 29(1), 3-33.

Aisenbrey, S., & Fasang, A. E. (2010). New life for old ideas: The "second wave" of sequence analysis bringing the "course" back into the life course. *Sociological Methods & Research*, 38(3), 420-462.

Liao, T. F., Bolano, D., Brzinsky-Fay, C., Cornwell, B., Fasang, A. E., Helske, S., Piccarreta, R., Raab, M., Ritschard, G., Struffolino, E., et al. (2022). Sequence analysis: Its past, present, and future. *Social Science Research*, 107, 102772.

Studer, M. (2013). WeightedCluster library manual: A practical guide to creating typologies of trajectories in the social sciences with R. *LIVES Working Papers*, 24. https://doi.org/10.12682/lives.2296-1658.2013.24

Studer, M., & Ritschard, G. (2016). What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures. *Journal of the Royal Statistical Society: Series A*, 179(2), 481-511. https://doi.org/10.1111/rssa.12125

*Author: Yapeng Wei*
