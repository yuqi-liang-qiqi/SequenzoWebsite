# Comparing Predefined Groups of Sequences with BIC and LRT

Sequence analysis is often used to describe and compare trajectories. In many applications, however, we are not only interested in what sequences typically look like. We also want to know whether sequences differ systematically between predefined groups, such as men and women, urban and rural populations, birth cohorts, regions, or treatment groups.

For example, we may ask:

- Do men and women follow different employment trajectories?
- Do birth cohorts differ in their family-formation pathways?
- Are patient trajectories different across treatment groups?
- Did life-course patterns become more similar after a major institutional change, such as the reunification of Germany in 1990?
- Are two groups of sequences different enough to be treated as substantively distinct?

The tools in `sequenzo.group_comparison` build on the BIC and LRT framework proposed by Liao and Fasang (2021) for assessing differences between **predefined** groups of life-course sequences. **This tutorial focuses on the two-group case:** the current Sequenzo functions compare exactly two predefined groups. Liao and Fasang discuss extensions to *G* groups in principle; multi-group comparison is not what these APIs implement yet. The purpose is not to discover clusters or search for subgroups, but to compare groups that are already defined by the research design.

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

## What is a sequence gravity centre?

The BIC/LRT comparison rests on the idea of a sequence gravity centre. A gravity centre is the centre of a set of sequences in the space defined by the chosen distance measure.

It should not be read as a simple average sequence. States are categorical, so we cannot average trajectories the way we average income, age, or test scores. It should also not be confused with a medoid. A medoid is an actually observed sequence chosen as most representative of a group. A gravity centre, by contrast, is a hypothetical centre defined so that the total distance from all sequences in the group to that centre is minimized, given the selected distance measure and any weighting or sampling procedure used in the comparison. It need not appear as any row in your dataset.

In simple terms, the gravity centre is the point around which a set of sequences is most tightly organized as “distance” is defined for your analysis.

For example, take one group of employment sequences. Some people move quickly from education to full-time work; others pass through unemployment, part-time work, or parental leave. The gravity centre summarizes the central tendency of those trajectories not by averaging states, but by locating the centre that minimizes summed distances from itself to every observed sequence.

Liao and Fasang (2021) report that an earlier medoid-based approach gave unstable results; they therefore adopt this gravity-centre formulation.

The BIC/LRT setup then contrasts two possibilities:

- In the one-group model, every sequence is referred to one common gravity centre.
- In the two-group model, each predefined group has its own gravity centre.

If the two groups are very similar, one common centre should describe the pooled data well. If they differ, letting each group have its own centre should substantially reduce the summed distances from sequences to their group-specific centre.

This is the core intuition. The LRT assesses whether that reduction is larger than would be expected by chance. Delta BIC asks whether the gain is large enough to justify the more complex two-centre representation.

A useful analogy is the mean for ordinary numerical outcomes. When comparing two income groups, we might ask whether one overall mean suffices or whether each group needs its own mean. Full sequence vectors cannot be averaged like scalars; nevertheless, the gravity centre plays a similar organisational role to the mean — it supplies a distance-based centre for a bundle of categorical trajectories. It is not “the mean trajectory” in a literal sense.

## The basic idea

The method compares two models.

The first model is a one-group model. It assumes that all sequences can be represented by one common sequence gravity centre.

The second model is a two-group model. It assumes that each predefined group has its own gravity centre.

The comparison asks whether the second model reduces summed distances enough (relative to the first) to justify treating the two groups as distinct under your distance definition.

The intuition is simple:

- If the two groups are similar, one common gravity centre should be enough.
- If they differ, separate group-specific gravity centres should fit the sequences better.
- The LRT and Delta BIC summarize how large that improvement is.

In plain terms, the procedure is asking: Is one centre enough, or do the two predefined groups truly need two centres?

## What the LRT tells you

The likelihood-ratio test (LRT) is a standard tool in statistics for comparing a simpler model with a more flexible version of the same model. Here, the simpler model assumes that all sequences share one common gravity centre, while the more flexible model allows each predefined group to have its own gravity centre. It is widely used in regression, generalized linear models, and other likelihood-based frameworks to ask whether the more flexible model improves the fit enough to justify its additional complexity.

The LRT asks whether the improvement from the one-group model to the two-group model is larger than we would expect by chance. A small p-value suggests that the two groups differ statistically in their sequence patterns.

However, statistical significance should not be interpreted alone. With large samples, even small differences can become statistically significant. This is why the BIC difference is also useful.

## What the BIC difference tells you

The Bayesian information criterion (BIC) is a widely used model-comparison criterion in statistics. It is commonly used in regression modelling, mixture models, latent class analysis, clustering, Markov models, and other settings where researchers need to compare alternative models. In ordinary applications, BIC helps assess whether a more complex model improves the fit enough to justify its additional complexity.

BIC and likelihood-ratio tests (LRTs) are both commonly used in model comparison, but they answer different questions. The LRT is usually used to test whether a more flexible model fits significantly better than a simpler version of the same model. BIC is usually used to compare alternative models by balancing model fit against model complexity. They can be reported together, but they should not be understood as a single combined test.

Liao and Fasang (2021) adapt this logic to sequence analysis by comparing a one-group model with a two-group model framed around*gravity centres. The LRT speaks to statistical significance (whether the two-group representation improves fit beyond chance). Delta BIC speaks to degrees of difference or levels of evidence for preferring the two-group model over the one-group model — closer to how they discuss substantive versus statistical significance in their overview.

Compared with a p-value, Delta BIC is more useful for assessing the strength of evidence for treating the groups as distinct. It is not an effect size in the conventional sense (such as Cohen’s *d*). It plays an effect-size-like role in interpretation only insofar as larger positive values indicate stronger support for separate group gravity centres.

Delta BIC rewards improved fit but penalizes complexity. Here the two-group model is more complex because it estimates separate gravity centres per group. Small improvements in fit yield small Delta BIC; large improvements yield larger Delta BIC.

The BIC difference helps guard against over-reading tiny but statistically detectable differences. A statistically significant LRT means the groups are not identical under the test; a large positive Delta BIC adds that there is stronger evidence that the two-group representation is warranted.

Following Kass and Raftery (1995) and the scale used by Liao and Fasang (2021, Table 1), a common reading of Delta BIC is:

| Delta BIC | Interpretation |
| --- | --- |
| 0–2 | Negligible evidence (“not worth more than a bare mention”) |
| 2–6 | Positive evidence |
| 6–10 | Strong evidence |
| Greater than 10 | Very strong evidence |

**Negative Delta BIC** can appear in empirical tables (for example, values such as −0.6 or −1.2). That is not an error: it means evidence favours the one-group model — under this distance setup, there is little support for treating the two predefined groups as distinct sequence populations.

In practice, read LRT and Delta BIC together: statistical detectability (LRT) and strength of evidence for the two-group model (Delta BIC).

## The role of the distance measure

Before comparing two groups, we first need to decide what it means for two sequences to be different. This is the role of the distance measure.

Different distance measures capture different aspects of sequence difference. Some measures are more sensitive to timing, some to duration, some to sequencing, and some to state substitution.

It is important to note that, in Liao and Fasang’s applications, timing, duration, and ordering are approached by choosing distance measures that emphasize those aspects not by having BIC or LRT decompose group differences into timing versus duration versus order. `get_group_differences()` does not extract those dimensions automatically. It answers: *under this distance definition, is there evidence that the two predefined groups differ?*

The test result inherits the meaning of the distance measure. Therefore, changing the distance measure changes the substantive question being tested. For example, a timing-sensitive setup asks about group differences as timing-sensitive distances define them; a duration-sensitive setup asks a different question.

For example:

- A timing-sensitive distance asks whether groups experience states at different time points in the sense captured by that distance.
- A duration-sensitive distance asks whether groups spend different amounts of time in states as that distance encodes duration.
- An order-sensitive distance asks whether groups arrange states in different sequences according to that ordering-sensitive metric.

Therefore, always interpret BIC/LRT results together with the chosen distance and its parameters. A significant LRT or a large positive Delta BIC means the groups differ according to that definition of difference, not that the procedure has separately identified “how much” is timing versus duration versus order.

The same two groups may appear different under one distance measure but similar under another. That is informative: it suggests group differences along some sequence dimensions more than others as revealed by your distance choices, not by an automatic decomposition inside the test.

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

The `sequenzo.group_comparison` module exposes three functions:

- **`get_group_differences()`** — main entry: choose `stat="all"` for both LRT and BIC, or `"LRT"` / `"BIC"` for one side.
- **`get_lrt_test()`** — shortcut that runs the same comparison but returns only the LRT and p-value columns.
- **`get_bic_test()`** — shortcut that returns only the BIC-related columns (delta BIC and Bayes-factor outputs).

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

**The grouping variable must encode exactly two categories** among non-missing rows (Sequenzo’s implementation matches this two-group setup). If you have three or more cohorts or regions, compare **theoretically meaningful pairs**, recode into two groups, or use another framework designed for multi-group analysis.

```python
from sequenzo.group_comparison import get_group_differences

result = get_group_differences(
    seqdata=seqdata,
    group=df["group"],
    stat="all",      # returns both LRT and BIC outputs
    method="OM",     # we choose the most standard optimal matching configuration
    indel=1,
    sm="CONSTANT"
)

print(result)
```

The returned object is typically a **numeric table** (column names such as `LRT`, `p-value`, `Delta BIC`, and Bayes-factor outputs; exact columns can depend on `stat`, resampling, and `BFopt`). Below is a **fabricated illustration** only — your numbers will differ:

```text
       LRT  p-value  Delta BIC  Bayes Factor
0     9.42    0.002       4.81         11.08
```

How you might read this toy row:

- **LRT / p-value:** *p* = 0.002 suggests a statistically detectable improvement when moving from one pooled gravity centre to two group-specific centres — **under this distance setup**.
- **Delta BIC = 4.81:** falls in the **positive evidence** band (2–6), but **not** yet “strong” (6–10): groups look distinguishable, but evidence is **moderate**, not overwhelming — **still under this distance definition**.
- **Next steps:** inspect plots and run **robustness checks** (alternative distances, sensitivity of substitution costs, etc.).

### Step 3: Interpret the result

Read the output in three layers: statistical detectability, strength of evidence, and substantive meaning tied to the distance measure.

First, look at the LRT and its p-value. The LRT contrasts the one-group model with the two-group model framed around sequence gravity centres. A small p-value means that allowing the two predefined groups to have separate sequence gravity centres improves the fit more than would be expected by chance. In other words, the two predefined groups are statistically distinguishable under the chosen distance measure.

Second, look at Delta BIC. Delta BIC summarizes the strength of evidence for the two-group model relative to the one-group model. A positive Delta BIC favours the two-group model. Negative values favour the one-group model — see [What the BIC difference tells you](#what-the-bic-difference-tells-you) above for a fuller reading. Larger positive values indicate stronger support for treating the groups as distinct sequence populations (still under that distance).

The interpretation scale aligned with Kass and Raftery (1995) and Table 1 in Liao and Fasang (2021) is:

| Delta BIC | Interpretation |
| --- | --- |
| 0–2 | Negligible evidence (“not worth more than a bare mention”) |
| 2–6 | Positive evidence |
| 6–10 | Strong evidence |
| Greater than 10 | Very strong evidence |

Third, tie the result to the distance measure. The procedure does not automatically report whether differences are driven by timing, duration, ordering, or state composition. It tells you whether groups differ as defined by the distance and its parameters. For instance, if you deliberately use a timing-sensitive distance, a large positive Delta BIC supports evidence of group differences in that timing-sensitive sense; with a duration-sensitive distance, you address group contrasts as duration is encoded in that metric.

Read LRT and Delta BIC together. A significant LRT with a small Delta BIC suggests the gap is detectable but evidence for a distinct two-group gravity-centre structure may remain modest. A significant LRT with a large Delta BIC supports a stronger claim that the two predefined populations differ as captured by this distance. If the LRT is not significant and Delta BIC is near zero or negative, there is little reason — under this specification — to treat the groups as substantively distinct.

Worked wording example:

> The LRT is statistically significant, indicating that the two-group model improves fit relative to the one-group model. Delta BIC is 7.8, which falls in the **strong evidence** range on the conventional scale. Because the comparison uses optimal matching with the specified substitution and indel costs, this should be read as evidence of group difference **under that distance definition**. Additional plots and sensitivity analyses with **alternative distances** are needed before claiming whether contrasts reflect timing, duration, ordering, or compositional aspects.

### Step 4: Report clearly and check robustness

When writing up results, report both significance and evidence strength, and make your modeling choices explicit.

At minimum, include:

1. the group definition used in `group`;
2. the distance setup (for example, `method="OM"`, `indel`, and substitution-cost settings);
3. the key outputs (`LRT`, `p-value`, `Delta BIC`, Bayes factor columns as applicable);
4. at least one sensitivity check (for example, trying another distance setup).

A concise reporting template might read:

> We compared the two predefined groups using the BIC/LRT sequence comparison procedure with [distance method and parameters]. The LRT indicated [statistical / no statistical] evidence of group difference; Delta BIC indicated [negligible / positive / strong / very strong] evidence for the two-group model relative to the one-group model under this distance definition. Thus the groups appear [not clearly / moderately / strongly] distinguishable as that distance defines difference; we supplemented this with sequence visualizations and [briefly list robustness checks].

This keeps conclusions transparent and aligns statistical claims with both evidence strength and the meaning of the chosen distance.

## Interpreting results carefully

The BIC/LRT comparison should not be read mechanically. Statistical significance (LRT) is not the same as strength of evidence for separate group gravity centres (Delta BIC). Predefined groups and an explicit distance story should anchor every analysis; plots and robustness checks remain essential because the test never substitutes for inspecting how sequences differ.

## Summary

The BIC/LRT group comparison is best understood as a confirmatory complement to sequence visualization. It does not discover sequence types. Instead, under a chosen distance measure, it asks whether two theoretically predefined groups differ enough to justify separate sequence gravity centres rather than a single pooled centre. The LRT targets statistical detectability of that improvement; Delta BIC summarizes how strongly the data support the two-group representation — not an effect size in the classical sense, but a graded measure of evidence. Because results inherit the meaning of the distance, interpretation should always combine test output with the distance specification, visual inspection, and sensitivity analyses.

*Author: Yuqi Liang*

## References

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.