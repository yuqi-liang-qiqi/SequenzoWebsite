# Sequence Analysis vs. Regression

Regression and sequence analysis answer different questions about longitudinal data. Regression is usually designed to estimate effects, associations, or trends. Sequence analysis is designed to compare complete categorical trajectories as ordered objects.

This distinction matters because categorical life-course data often contain information in the order, timing, and duration of states. A regression model can use some of that information if you engineer the right variables, but sequence analysis keeps the trajectory itself as the unit of analysis.

## Before You Start

You should already know the basic terms from [Basic Concepts](./basic-concepts.md): state, spell, subsequence, and full sequence.

The practical goal is to decide whether a research question belongs closer to regression, sequence analysis, or a hybrid workflow.

## What Panel Regression Does Well

Panel or longitudinal regression models are useful when the research question is about an outcome measured over time:

- How does education predict income growth?
- Does health decline faster after job loss?
- How does a policy change affect employment rates?

These models can handle repeated observations, within-person correlation, fixed or random effects, time-varying covariates, and nonlinear time trends. They are strong tools when the target is an average association or causal estimand.

## What Regression Tends To Lose

Standard panel regression treats the data as rows such as person by year. That format is well suited to many outcome questions, but it often separates the full life path into local observations.

Consider two employment sequences:

| Person | Sequence | Interpretation |
| --- | --- | --- |
| A | `E-U-E` | Job loss followed by recovery |
| B | `U-E-E` | Early unemployment followed by stability |

Both people spend two years employed and one year unemployed. A model using only counts or year-specific states may treat them as nearly equivalent. Substantively, the ordering is different.

You can add lagged terms:

```text
Y_it = alpha_i + beta X_it + rho Y_i,t-1 + error_it
```

This gives the model short-term memory, but it still does not automatically summarize the whole trajectory as a single ordered pattern. Longer memory requires many lags, interactions, or handcrafted features, especially when the states are categorical.

## What Sequence Analysis Adds

Sequence analysis keeps each person's trajectory intact. It compares complete sequences by asking how similar their states, timings, spells, and orders are.

It is especially useful when the research question is about pathway structure:

- What types of careers appear in the data?
- Do two cohorts follow similar family-formation trajectories?
- Which groups have more unstable or fragmented life courses?
- Are there typical pathways before or after a focal transition?

The usual Sequenzo workflow is:

1. Build a [`SequenceData`](/en/function-library/sequence-data) object.
2. Compute distances with [`get_distance_matrix()`](/en/function-library/get-distance-matrix).
3. Cluster or summarize trajectories.
4. Use the resulting typologies, distances, or indicators in interpretation or downstream models.

## Where Hybrid Workflows Fit

The choice is not regression or sequence analysis forever. Many strong designs combine them:

| Research design | Typical workflow |
| --- | --- |
| Sequence types as predictors | Cluster trajectories, then use cluster membership in a regression model. |
| Outcomes after trajectories | Build representativeness or pseudoclass variables, then model later outcomes. |
| Group differences in trajectories | Use discrepancy analysis or group comparison before outcome modeling. |
| Event-history questions | Convert sequence histories into person-period data, then model event risk. |
| Latent dynamics | Use HMM, MHMM, NHMM, or MNHMM when the question is about latent states or transition probabilities. |

## Practical Decision Rule

Use regression when the main question is about an outcome and a set of predictors. Use sequence analysis when the main question is about the structure of the pathway itself. Use a hybrid design when whole trajectories need to become predictors, outcomes, controls, or mechanisms in a larger model.

| Aspect | Regression | Sequence Analysis |
| --- | --- | --- |
| Main unit | Observation, person, or person-time row | Whole trajectory |
| Typical target | Effect, association, trend, prediction | Pathway structure, similarity, typology |
| Temporal information | Included through time variables, lags, or features | Built into the sequence representation |
| Categorical state order | Must be engineered into predictors | Central to the method |
| Best used for | Outcomes and covariate effects | Timing, duration, order, and trajectory types |

## See Also

- [Typical Workflow](/en/basics/typical-workflow) shows where regression-adjacent workflows fit in Sequenzo.
- [From Sequences to Variables](/en/beyond-basic-clustering/from-sequences-to-variables/introduction) explains hard labels, soft memberships, representativeness, and pseudoclass regression.
- [Sequence History, SAMM, and Spell Survival](/en/event-history-analysis/samm-emlt-and-survival) covers event-history-oriented workflows.

## References

Abbott, A., & Tsay, A. (2000). Sequence analysis and optimal matching methods in sociology: Review and prospect. *Sociological Methods & Research*, 29(1), 3-33.

Aisenbrey, S., & Fasang, A. E. (2010). New life for old ideas: The "second wave" of sequence analysis bringing the "course" back into the life course. *Sociological Methods & Research*, 38(3), 420-462.

*Author: Yuqi Liang*
