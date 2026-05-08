# Comparing Predefined Groups of Sequences with BIC and LRT

Sequence analysis is often used to describe and compare trajectories. In many applications, however, we are not only interested in what sequences typically look like. We also want to know whether sequences differ systematically between predefined groups, such as men and women, urban and rural populations, birth cohorts, regions, or treatment groups.

For example, we may ask:

- Do men and women follow different employment trajectories?
- Do birth cohorts differ in their family-formation pathways?
- Are patient trajectories different across treatment groups?
- Did life-course patterns become more similar after a major institutional change, such as the reunification of Germany in 1990?
- Are two groups of sequences different enough to be treated as substantively distinct?

The two-group comparison tools in Sequenzo build on the BIC and LRT framework proposed by Liao and Fasang (2021) for assessing differences between predefined groups of life-course sequences. The purpose is not to discover clusters or search for subgroups, but to compare groups that are already defined by the research design.

## Why comparing sequence groups is difficult

A sequence is not a single value. It contains several kinds of information at once:

- which states appear;
- when states occur;
- how long states last;
- in what order states are arranged;
- how transitions unfold over time.

This makes group comparison more difficult than comparing ordinary numerical variables. If we compare income between two groups, we can start with a difference in means. If we compare the timing of a single event, we can compare average ages or durations. But if we compare full trajectories, there is no single obvious value that represents the whole sequence.

This is why group comparison in sequence analysis usually starts from sequence dissimilarities. We first compute how different sequences are from one another, and then ask whether the sequences in two predefined groups are sufficiently different to justify treating the groups as distinct.

In simple terms, this method asks:

> Do two predefined groups have different sequence patterns, and how strong is the evidence for that difference?

## From visual comparison to statistical assessment

It is usually helpful to inspect the sequences visually. Index plots, state distribution plots, modal state plots, and representative sequence plots can reveal broad patterns. They help us see whether one group enters a state earlier, remains in a state longer, or follows a different order of states.

However, visual comparison alone is not enough. Two groups may look different in a plot because of random variation, sample size, or visual scaling. Conversely, two groups may look broadly similar while still differing in specific temporal features.

Thus, it is important to provide a statistical complement to visualization. It helps answer two related questions:

1. Is there statistical evidence that the two groups differ?
2. How strong is the evidence for treating them as different sequence groups?

## The basic idea

The method compares two models:
* The first model is a **one-group** model. It assumes that all sequences share one common sequence centre.
* The second model is a **two-group** model. It assumes that each group has its own sequence centre.

If the two-group model fits the sequence data much better than the one-group model, this suggests that the two predefined groups have meaningfully different trajectories.

The intuition is simple:

- If the two groups are similar, using one common centre should be enough.
- If the two groups are different, using separate group-specific centres should improve the fit.
- The LRT (likelihood-ratio test) and BIC (Bayesian information criterion) summarize how large this improvement is.

## What the LRT tells you

The likelihood-ratio test (LRT) is a standard tool in statistics for comparing a simpler model with a more flexible version of the same model. Here, the simpler model assumes that all sequences share one common centre, while the more flexible model allows each group to have its own sequence centre. It is widely used in regression, generalized linear models, and other likelihood-based frameworks to ask whether the more flexible model improves the fit enough to justify its additional complexity.

The LRT asks whether the improvement from the one-group model to the two-group model is larger than we would expect by chance. A small p-value suggests that the two groups differ statistically in their sequence patterns.

However, statistical significance should not be interpreted alone. With large samples, even small differences can become statistically significant. This is why the BIC difference is also useful.

## What the BIC difference tells you

The Bayesian information criterion (BIC) is a widely used model-comparison criterion in statistics. It is commonly used in regression modelling, mixture models, latent class analysis, clustering, Markov models, and other settings where researchers need to compare alternative models. In ordinary applications, BIC helps assess whether a more complex model improves the fit enough to justify its additional complexity.

BIC and likelihood-ratio tests (LRTs) are both commonly used in model comparison, but they answer different questions. The LRT is usually used to test whether a more flexible model fits significantly better than a simpler version of the same model. BIC is usually used to compare alternative models by balancing model fit against model complexity. They can be reported together, but they should not be understood as a single combined test.

Liao and Fasang (2021) adapt this general model-comparison logic to sequence analysis by comparing a one-group sequence model with a two-group sequence model. In this setting, the one-group model assumes that all sequences share one common sequence centre, while the two-group model allows each predefined group to have its own centre. The LRT tells us whether the two-group model improves the fit significantly, while the BIC difference indicates how strong the evidence is for treating the two groups as distinct.

Compared with a p-value, the BIC difference is closer to an effect-size-like interpretation. A p-value mainly asks whether the observed difference is unlikely to occur by chance. The BIC difference asks a slightly different question: does allowing the two groups to have separate sequence centres improve the model enough to justify treating them as different groups?

This is why the BIC difference is useful for substantive interpretation. It does not only reward better fit. It also penalizes unnecessary complexity. In this setting, the two-group model is more complex than the one-group model because it uses separate centres for the two groups. If the two-group model improves the fit only slightly, the BIC difference will remain small. If it improves the fit substantially, the BIC difference becomes larger.

In other words, the BIC difference helps us avoid over-interpreting tiny but statistically detectable differences. A statistically significant LRT result may tell us that the two groups are not identical. A large BIC difference gives stronger evidence that the difference is large enough to matter analytically and substantively.

A common interpretation is:

| BIC difference | Interpretation |
| --- | --- |
| 0 to 2 | Weak or negligible evidence |
| 2 to 6 | Positive evidence |
| 6 to 10 | Strong evidence |
| Greater than 10 | Very strong evidence |

In practice, the LRT p-value and the BIC difference should be read together. The LRT tells us whether the group difference is statistically detectable, while the BIC difference tells us how strong the evidence is for treating the two sequence groups as substantively distinct.

## The role of the distance measure

Before comparing two groups, we first need to decide what it means for two sequences to be different. This is the role of the distance measure.

Different distance measures capture different aspects of sequence difference. Some measures are more sensitive to timing, some to duration, some to sequencing, and some to state substitution. As a result, the same BIC/LRT procedure can answer slightly different substantive questions depending on the distance measure used.

For example:

- A timing-sensitive distance asks whether groups experience states at different time points.
- A duration-sensitive distance asks whether groups spend different amounts of time in states.
- An order-sensitive distance asks whether groups arrange states in different sequences.

Therefore, the BIC/LRT comparison should always be interpreted together with the chosen distance measure. A significant LRT or a large BIC difference tells us that the two groups differ according to the selected distance measure. It does not, by itself, tell us whether the difference is mainly about timing, duration, order, or state composition.

The same two groups may appear different under one distance measure but similar under another. This is not a problem. It simply means that the groups differ in some sequence dimensions more than others.

## When to use this method

Use this method when you have two predefined groups and want to assess whether their sequence patterns are different.

Typical examples include:

- comparing men and women;
- comparing two birth cohorts;
- comparing two countries or regions;
- comparing treatment and control groups;
- comparing groups before and after an institutional change;
- comparing two theoretically meaningful populations.

This method is not designed to discover groups automatically. If your goal is to find unknown sequence types, clustering methods are more appropriate.

## A minimal workflow

A typical workflow has four steps.

### Step 1: Define the state sequences

Start by creating a `SequenceData` object. This defines the sequence data, time, and state labels.

```python
from sequenzo import SequenceData

seqdata = SequenceData(
    data=df,
    time=["T1", "T2", "T3", "T4", "T5"],
    id_col="id"
)
```

### Step 2: Choose the distance setup and compare two predefined groups

The BIC/LRT comparison computes distances internally from `seqdata`.  
You should still decide the distance method and parameters because they define what "difference" means.

Suppose the dataset contains a grouping variable called `group`. A similar column in a dataset might be "gender" or "region".

```python
from sequenzo.group_comparison import get_group_differences_overall

result = get_group_differences_overall(
    seqdata=seqdata,
    group=df["group"],
    stat="all",      # returns both LRT and BIC outputs
    method="OM",     # we choose the most standard optimal matching configuration
    indel=1,
    sm="CONSTANT"
)

print(result)
```

The returned result contains numeric test outputs (returned as an array-like table):

- `LRT`
- `p-value`
- `Delta BIC`
- `Bayes Factor` (or Bayes-factor variants, depending on sampling options)

### Step 3: Interpret the result

A careful interpretation should include three elements:

1. whether the LRT is statistically significant;
2. how large the BIC difference is;
3. what type of difference your chosen distance is designed to emphasize.

For example:

> The LRT is statistically significant and Delta BIC indicates strong evidence for a two-group model. This means the two predefined groups differ in sequence patterns under the chosen distance definition. To claim whether the difference is mainly timing, order, or duration, you should add supporting evidence from sensitivity checks with alternative distances and sequence visualizations.

### Step 4: Report clearly and check robustness

When writing up results, report both significance and evidence strength, and make your modeling choices explicit.

At minimum, include:

1. the group definition used in `group`;
2. the distance setup (for example, `method="OM"`, `indel`, and substitution-cost settings);
3. the key outputs (`LRT`, `p-value`, `Delta BIC`, Bayes factor columns);
4. at least one sensitivity check (for example, trying another distance setup).

This keeps your conclusions transparent and makes it easier for readers to understand what kind of sequence difference your test captured.

## Interpreting results carefully

The BIC/LRT comparison should not be read mechanically.

First, statistical significance is not the same as substantive importance. A significant LRT result may still correspond to a small BIC difference.

Second, the result depends on the distance measure. Always explain what kind of sequence difference the distance measure is designed to capture.

Third, this method compares predefined groups. The grouping variable should come from a clear research question or theoretical design.

Finally, the statistical result should be interpreted together with visualizations. The BIC and LRT can tell us whether groups differ and how strong the evidence is, but sequence plots are still needed to understand how the groups differ.

## Summary

The BIC/LRT group comparison method in Sequenzo helps researchers assess whether two predefined groups of sequences are statistically and substantively different.

It is useful when the research question is not simply “What types of sequences exist?”, but rather:

> Are these two theoretically meaningful groups different in their trajectories?

The method works by comparing a one-group model with a two-group model. The LRT provides a significance test, while the BIC difference provides a measure of the strength of evidence for group difference.

In practice, a good analysis should combine:

1. a theoretically meaningful grouping variable;
2. a sequence distance measure aligned with the research question;
3. BIC/LRT results;
4. sequence visualizations for substantive interpretation.

