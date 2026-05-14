# From Sequences to Variables: A Conceptual Guide

Sequence analysis often begins with a simple idea: people, firms, regions, or other units can be described by ordered trajectories. For example, a person may move through education, employment, unemployment, marriage, parenthood, and retirement. A city may move through different technological specializations over time. A patient may move through different health states.

Once we have these sequences, we often want to ask a further question:

> How are these trajectories related to another outcome?

For example:

* Do employment trajectories predict later income?
* Do family trajectories predict health or wellbeing?
* Do technological development paths predict future innovation?
* Do educational trajectories predict occupational attainment?
* Do patient treatment sequences predict recovery?

A common workflow in sequence analysis is:

1. Construct sequences.
2. Compute pairwise distances between sequences.
3. Cluster similar sequences into groups.
4. Use cluster membership as a variable in a regression model.

This workflow is intuitive and widely used. However, it can also be misleading. The main problem is that cluster membership is often treated as if it were a real, fixed, and certain characteristic of each case. In reality, sequence clusters are usually analytical summaries created by the researcher. They depend on the distance measure, clustering algorithm, number of clusters, and other modelling choices.

This guide explains why this matters and introduces several ways to turn sequences into variables for further modelling.

The discussion follows the main argument of Helske, Helske, and Chihaya (2024), who show that using sequence clusters as ordinary variables can lead to wrong conclusions when the relationship between sequences and outcomes is not truly cluster-based.

## The Traditional Approach: Cluster First, Regress Later

The most common approach is to cluster sequences and then use the cluster labels as a variable.

For example, suppose we study employment trajectories from age 18 to 40. After clustering, we may obtain five trajectory types:

* Mainly not working
* Unstable work
* Late entry into work
* Delayed entry into work
* Early stable work

Then we may use these cluster labels in a regression model:

```text
income = employment trajectory cluster + education + sex + family background + ...
```

This approach treats each cluster as a category, just like gender, region, or education level.

For example, everyone in the “early stable work” cluster receives the same cluster value. Everyone in the “unstable work” cluster receives another cluster value. The regression then estimates average outcome differences between these clusters.

This is simple and easy to interpret. But it relies on a strong assumption:

> The cluster assigned to each sequence is known, certain, and substantively meaningful.

This assumption is not always reasonable.

## Why Hard Cluster Membership Can Be Problematic

There are two main problems.

First, cluster membership is uncertain. A sequence may lie between two clusters. For example, a person may have a trajectory that is partly similar to “delayed entry” and partly similar to “unstable work.” If we force this person into only one cluster, we lose information.

Second, people within the same cluster may still be quite different. For example, consider three employment trajectories:

```text
A: Not working for all years
B: Mostly not working, with a few short employment spells
C: Working for several early years, then mostly not working
```

A clustering algorithm may place all three into a “mainly not working” cluster. But these trajectories may not imply the same later income, poverty risk, or wellbeing. Treating them as identical cluster members may hide important differences.

The issue is especially important when clusters are not very clear. In many social science applications, we do not observe natural, sharply separated groups. Instead, we observe gradual variation: some sequences are more similar to one ideal type, some are mixtures of several types, and some are not well represented by any cluster.

## Two Different Ways Sequences Can Relate to Outcomes

Before choosing a method, we need to think conceptually about how sequences are related to the outcome.

There are two broad possibilities.

### 1. Class-Dependent Outcomes

In a class-dependent situation, the outcome depends mainly on which type a sequence belongs to.

For example, suppose there are two clearly distinct groups of childhood family trajectories:

```text
Stable two-parent family
Long-term single-parent family
```

If we believe that what matters is simply whether a person belongs to one group or the other, then a cluster-based variable may be appropriate.

In this situation, within-cluster differences are treated as relatively unimportant. A person near the centre of the cluster and a person near the edge of the cluster are expected to have similar outcomes, as long as they belong to the same cluster.

This is the situation where hard cluster membership can work reasonably well, especially when the clusters are clear and well separated.

### 2. Similarity-Based Outcomes

In a similarity-based situation, the outcome depends on how similar a sequence is to certain trajectory patterns.

For example, suppose we study employment histories and later income. A person with a long, stable employment career may have high cumulative income. A person who was never employed may have low cumulative income. Someone who entered employment late may fall somewhere in between.

Here, the outcome is not determined only by cluster membership. Instead, it depends on relative position:

```text
How close is this sequence to a stable employment trajectory?
How close is this sequence to a long-term non-employment trajectory?
How close is this sequence to an unstable trajectory?
```

This is often more realistic in social science applications. Many trajectories do not belong cleanly to one type. They may be hybrids, intermediate cases, or outliers.

In such cases, similarity-based variables may be more appropriate than hard cluster labels.

## Four Ways to Create Variables from Sequences

There are several ways to turn sequences into variables for regression or other downstream models.

The four main approaches are:

1. Hard classification
2. Soft classification
3. Pseudoclass assignment
4. Representativeness

Each approach answers a slightly different question.

### Hard Classification

Hard classification is the traditional approach.

Each sequence is assigned to exactly one cluster.

Example:

```text
Sequence ID    Cluster
1              Early stable work
2              Unstable work
3              Mainly not working
4              Early stable work
```

In a regression model, this becomes a categorical variable, usually represented by dummy variables.

The interpretation is straightforward:

> Compared with the reference cluster, how different is the average outcome for members of this cluster?

For example:

```text
Compared with early stable workers, people in the unstable work cluster have lower predicted income.
```

This approach is easy to explain, but it ignores uncertainty and within-cluster variation.

It is most appropriate when:

* clusters are clearly separated;
* the researcher believes that clusters approximate real types;
* the outcome is expected to depend mainly on type membership;
* within-cluster variation is not central to the research question.

It is less appropriate when:

* clusters overlap;
* many sequences are hybrid cases;
* many sequences are far from their assigned cluster centre;
* the outcome changes gradually with sequence similarity.

### Soft Classification

Soft classification allows each sequence to belong partly to several clusters.

Instead of assigning each sequence to only one cluster, we assign membership probabilities or membership degrees.

Example:

```text
Sequence ID    Early stable work    Unstable work    Mainly not working
1              0.80                 0.15             0.05
2              0.30                 0.60             0.10
3              0.05                 0.25             0.70
```

Here, sequence 1 is mostly similar to early stable work, but it also has some similarity to unstable work. Sequence 2 is mainly unstable, but not purely so.

In a regression model, these membership values can be used as continuous predictors.

The interpretation becomes less direct than hard classification, but the approach preserves more information. It recognises that people or cases may be mixtures of different trajectory types.

Soft classification is useful when:

* clusters exist but are not perfectly separated;
* many sequences are intermediate cases;
* the researcher wants to account for uncertainty in cluster allocation;
* the outcome may vary with degree of membership.

However, soft classification still focuses on cluster membership. It may not fully solve the problem of outliers: a sequence can receive high membership in one cluster simply because it is closer to that cluster than to others, even if it is not actually well represented by any cluster.

### Pseudoclass Assignment

The pseudoclass approach also starts from soft membership probabilities.

Instead of using the probabilities directly, it repeatedly assigns each sequence to a cluster based on those probabilities. A model is then estimated many times, and the results are combined.

For example, suppose a sequence has the following probabilities:

```text
Early stable work: 0.60
Unstable work:    0.30
Mainly no work:   0.10
```

Across repeated draws, this sequence will usually be assigned to early stable work, sometimes to unstable work, and rarely to mainly no work.

This approach tries to account for classification uncertainty while keeping the interpretation close to hard classification.

However, Helske et al. (2024) find that the pseudoclass method does not perform especially well in their simulation and empirical examples. It is also computationally more demanding than the other approaches.

For this reason, pseudoclass assignment is usually not the first method to recommend in applied sequence analysis.

### Representativeness

Representativeness takes a different view.

Instead of asking:

```text
Which cluster does this sequence belong to?
```

it asks:

```text
How well is this sequence represented by each ideal type or representative sequence?
```

A representative sequence may be a medoid from a cluster solution, a theoretically defined ideal sequence, or another meaningful reference sequence.

For example, suppose we choose three representative employment trajectories:

```text
Representative 1: Always working
Representative 2: Never working
Representative 3: Unstable work
```

Then each sequence can be described by how close it is to each representative.

Example:

```text
Sequence ID    Rep. 1: Always working    Rep. 2: Never working    Rep. 3: Unstable work
1              0.90                      0.10                     0.30
2              0.40                      0.30                     0.80
3              0.05                      0.95                     0.20
```

The values can be interpreted as degrees of representativeness. A higher value means that the representative sequence is a better description of the observed sequence.

This approach is especially useful when the outcome is similarity-based.

For example:

```text
The closer a person’s trajectory is to stable employment, the higher their expected cumulative income.
The closer a person’s trajectory is to long-term non-employment, the higher their risk of poverty.
```

Representativeness has an important advantage over soft classification: it can distinguish between mixed cases and outliers.

A mixed case may be close to two different representative sequences. An outlier may be far from all representatives. Soft classification may not clearly separate these two situations, because membership probabilities usually have to sum to one. Representativeness values do not have to sum to one, so they can better express whether a sequence is well represented at all.

## A Simple Example

Suppose we study three employment sequences:

```text
M: Mostly not working, with a few employment spells
A: Never working
B: Working early, then mostly not working
```

A hard clustering algorithm may assign all three to the same cluster: “mainly not working.”

If we use hard classification, all three sequences receive the same cluster value. The regression model treats them as the same type of trajectory.

But substantively, these three cases are not identical.

Sequence A may be very close to a “never working” representative. Sequence B may still show meaningful attachment to employment, especially early in the sequence. Sequence M may be the medoid or typical member of the cluster.

A representativeness approach can express these differences. It allows the model to say:

```text
A is highly represented by the “never working” pattern.
B is partly represented by the “working early” pattern.
M is typical of the “mainly not working” pattern.
```

This can lead to more realistic predictions.

## Choosing the Right Approach

There is no single best method for all research questions. The best choice depends on how you think sequences and outcomes are related.

Use hard classification when your goal is to compare a small number of clear trajectory types and you believe that the outcome mainly depends on type membership.

Use soft classification when you believe that clusters are meaningful but membership is uncertain or mixed.

Use representativeness when you believe that outcomes depend on similarity to certain trajectory patterns rather than fixed membership in discrete groups.

Avoid relying only on hard classification when clusters are weak, overlapping, or mainly used as a convenient summary of complex trajectories.

### Which Approach Should I Choose?

| Situation | Recommended approach |
| --- | --- |
| Clusters are clear, well separated, and substantively meaningful | Hard classification |
| Clusters are meaningful but overlapping | Soft classification |
| The outcome varies gradually with similarity to ideal trajectories | Representativeness |
| You want a sensitivity check for uncertain class assignment | Pseudoclass regression |
| You want interpretable timing, duration, or sequencing features instead of cluster-based variables | [Feature extraction and selection](../../sequence-feature-selection-and-extraction/introduction.md) |

A useful practical question is:

> Do I believe that my clusters are real groups, or are they only summaries of gradual variation?

If you believe they are real groups, classification-based approaches may be reasonable.

If you believe they are summaries of gradual variation, similarity-based approaches are often more appropriate.

## Practical Recommendations

When using sequence-derived variables in downstream models, we recommend the following workflow.

First, inspect the clustering structure. Do not assume that clusters are meaningful just because a clustering algorithm produced them. Use sequence plots, medoids, silhouette values, cluster sizes, and substantive interpretation.

Second, think about the sequence–outcome relationship. Ask whether the outcome is likely to depend on discrete type membership or on gradual similarity to certain patterns.

Third, compare methods when possible. It can be useful to estimate models using hard classification, soft classification, and representativeness, then examine whether the conclusions change.

Fourth, be careful with interpretation. Hard classification coefficients can be interpreted as differences between clusters. Soft classification and representativeness coefficients are less straightforward and are often better interpreted through predicted values, average marginal predictions, or representative cases.

Fifth, remember that clustering is not always the final goal. Sometimes clusters are useful for description, but not ideal as explanatory variables. A typology that is helpful for visualizing trajectories may still be too crude for modelling outcomes.

## Interpretation in Regression Models

When hard cluster membership is used in regression, interpretation is familiar:

```text
The coefficient for cluster k shows the expected difference between cluster k and the reference cluster.
```

When soft classification is used, interpretation changes:

```text
The coefficient for cluster k describes how the outcome changes with the degree of membership in cluster k, relative to the omitted reference membership.
```

When representativeness is used, individual coefficients are harder to interpret alone because all representativeness values should be considered together. In this case, it is often better to report predicted outcomes for meaningful representative sequences.

For example, instead of saying:

```text
The coefficient for representativeness to the early-employment medoid is 12.5.
```

it is clearer to say:

```text
Predicted income is highest for trajectories close to early stable employment and lowest for trajectories close to long-term non-employment.
```

This makes the results easier to understand for applied readers.

## What This Means for Applied Sequence Analysis

The main lesson is simple:

> Do not automatically treat sequence clusters as real, fixed categories.

Clusters are useful. They help summarize complex longitudinal patterns. They make sequence data easier to visualize and communicate. But when clusters are used as variables in regression models, stronger assumptions are being made.

In many applications, especially in the social sciences, trajectories are not neatly divided into true groups. People and places often follow hybrid, gradual, or intermediate paths. In these cases, the relationship between sequences and outcomes may be better captured by similarity, representativeness, or soft membership than by hard cluster labels.

This does not mean that clustering is wrong. It means that the researcher should be clear about what clustering is doing.

Sometimes clustering identifies meaningful types.

Sometimes clustering provides representative patterns.

Sometimes clustering is only a descriptive simplification.

These are different uses, and they imply different ways of creating variables from sequences.

## Summary

Sequence analysis often moves from trajectories to clusters, and then from clusters to regression models. This workflow is useful but can be misleading if cluster membership is treated as certain and fixed.

Hard classification is simple and interpretable, but it ignores uncertainty and within-cluster variation.

Soft classification allows sequences to have partial membership in several clusters.

Pseudoclass assignment tries to adjust for classification uncertainty, but it is more complex and not always effective.

Representativeness describes how close each sequence is to selected ideal or representative sequences, making it especially useful when outcomes depend on similarity rather than discrete group membership.

For many applied research questions, especially where trajectories vary gradually, representativeness and soft classification are often better choices than hard cluster membership.

The key is to align the method with the theory of the sequence–outcome relationship.
