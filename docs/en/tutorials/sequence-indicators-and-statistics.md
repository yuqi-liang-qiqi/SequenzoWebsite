# Sequence Indicators and Statistics

After you create a `SequenceData` object, the first question is often descriptive. You may want to know which states dominate, how often people switch states, whether some trajectories are more fragmented than others, or whether one cluster contains longer spells than another. These questions do not always require a distance matrix.

Sequenzo separates three kinds of quantities. **Sequence statistics** summarize a dataset, a time point, or a distribution of states. **Sequence indicators** summarize each individual sequence as a numeric value. **Distances** compare pairs of sequences. They are connected, but they answer different questions.

This tutorial explains when to use statistics, when to use indicators, and how both support clustering, group comparison, regression, and interpretation.

## What These Numbers Answer

Sequence statistics answer questions about the sample. For example, a state distribution tells you the share of people in each state at each time point. A modal state sequence tells you the most frequent state at each position. Mean time by state tells you how much time, on average, people spend in education, employment, unemployment, or another state.

Sequence indicators answer questions about individual trajectories. A within-sequence entropy value describes how diverse one person’s sequence is. A transition count describes how often that person changes state. A turbulence or complexity score summarizes several aspects of change and diversity into one number.

Distances answer pairwise comparison questions. They ask how different sequence A is from sequence B under a chosen dissimilarity measure. You need distances for clustering, medoids, discrepancy analysis, and many group-comparison workflows. You do not need distances to compute basic descriptive statistics or many individual indicators.

| Question | Use | Example page |
| --- | --- | --- |
| What states are common at each time point? | Sequence statistics | [State distribution](/en/statistics/individual-state-distribution) |
| How much time is spent in each state? | Sequence statistics | [Mean time by state](/en/statistics/mean-time-by-state) |
| How diverse is each individual sequence? | Individual indicators | [Within-sequence entropy](/en/sequence-characteristics-indicators/within-sequence-entropy) |
| How unstable is each trajectory? | Individual indicators | [Number of transitions](/en/sequence-characteristics-indicators/number-of-transitions), [volatility](/en/sequence-characteristics-indicators/volatility) |
| Which sequences are close to each other? | Distances | [`get_distance_matrix()`](/en/function-library/get-distance-matrix) |

## Reading Common Indicators

Entropy measures diversity within a sequence. A sequence that remains in one state has low entropy. A sequence that spends similar amounts of time in several states has higher entropy. Entropy does not tell you whether the states are desirable, ordered, or substantively close. It only summarizes how the observed time is spread across states.

Transition-based indicators focus on movement. The number of transitions counts how often a sequence changes state. Volatility and related indicators build on transition structure, often with normalization or additional information about states. These indicators are useful when you care about instability, fragmentation, or repeated movement between states.

Spell-based indicators focus on duration. Mean spell duration, spell-duration variance, recurrence, and related measures describe how long people remain in states and whether states return after interruption. These indicators are often easier to interpret alongside plots because the same score can arise from different temporal arrangements.

| Indicator family | What it captures | What to check before interpreting |
| --- | --- | --- |
| Entropy and diversity | How time is distributed across states | Whether high diversity is substantively good, bad, or neutral |
| Transitions and volatility | How often state changes occur | Whether short interruptions should count as meaningful change |
| Spell duration | How long states persist | Whether long spells are expected by design or reflect real stability |
| Complexity and turbulence | Combined diversity and arrangement | Which components drive the score |
| Ranked or quality indicators | Directional information about ordered states | Whether the state ranking is theoretically justified |

## How Statistics and Indicators Support Interpretation

Statistics are useful before clustering. They show whether the data contain enough variation to justify more complex analysis. If nearly everyone follows the same state distribution over time, a distance matrix and clustering may still run, but the substantive payoff may be limited.

Indicators are useful after clustering. They help describe clusters without relying only on medoid plots or state distribution plots. For example, two clusters may have similar employment shares but different transition counts. Another cluster may have long spells and low entropy, while a visually similar one may contain repeated short interruptions.

Indicators also help when sequences enter regression-style workflows. Instead of using a whole distance matrix, you can use individual indicators as predictors, outcomes, controls, or descriptive variables. This is useful when the research question concerns instability, diversity, or time spent in states rather than full pairwise similarity.

## A Practical Workflow

Start with statistics. Check state distributions, sequence lengths, spell durations, and mean time by state. This tells you whether the dataset has enough variation, whether missing values or rare states need attention, and whether the time scale is sensible.

Then compute a small set of indicators tied to the research question. If the question is about instability, start with transitions, volatility, and spell duration. If the question is about diversity, start with entropy, complexity, and turbulence. If the question involves ordered states such as good to bad, use ranked indicators only after justifying the ordering.

Use distances when the question is relational. Clustering, medoids, discrepancy analysis, and group comparison need a definition of difference between pairs of sequences. Statistics and indicators can then help explain what the resulting distances and clusters mean.

## See Also

- [Sequence Indicators](/en/sequence-characteristics-indicators/introduction) lists every indicator function.
- [Sequence Statistics](/en/statistics/introduction) lists every summary function.
- [How to Read Sequence Plots](./reading-sequence-plots.md) covers the visual counterparts.

## References

Gabadinho, A., Ritschard, G., Muller, N. S., & Studer, M. (2011). Analyzing and visualizing state sequences in R with TraMineR. *Journal of Statistical Software*, 40(4), 1-37. https://doi.org/10.18637/jss.v040.i04

Studer, M., & Ritschard, G. (2016). What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures. *Journal of the Royal Statistical Society: Series A*, 179(2), 481-511. https://doi.org/10.1111/rssa.12125

*Author: Yapeng Wei*
