# Beyond Clustering: Explaining Sequence Differences and Inequalities

## Introduction

Sequence analysis is often introduced as a way to describe and cluster life-course trajectories. This is useful when the goal is to identify typical patterns. However, many research questions go beyond typology construction. Researchers often want to know whether trajectories differ across social groups, whether these differences are associated with covariates, whether the differences are statistically and substantively meaningful, and whether life-course patterns help explain later inequalities. This module brings together three families of methods that address these questions in a sequence-sensitive way.

This module is designed for researchers who already know how to construct and visualize sequences, and now want to ask explanatory questions about group differences, covariates, and later-life inequalities.

## Why not simply cluster sequences and run a regression?

A common workflow in sequence analysis is to compute pairwise distances, cluster the sequences, and then relate cluster membership to covariates. This approach is intuitive, but it also compresses rich trajectory information into a small number of types. Once sequences are reduced to clusters, differences within clusters are no longer directly represented. Two individuals assigned to the same cluster may still have quite different trajectories, and two clusters may be close or far apart in the original distance space.

This module therefore starts from a different idea: instead of treating clusters as the only outcome of sequence analysis, we can analyze the sequence distance structure itself. In other words, the pairwise dissimilarity matrix becomes the bridge between sequence analysis and statistical group comparison.

## Discrepancy analysis: How much of sequence variation is associated with covariates?

Discrepancy analysis asks a simple question:

Do people with different values of a covariate also have different trajectories?

For example:

* Do employment trajectories differ by gender?
* Do family trajectories differ by education?
* Do school-to-work transitions differ by region?

The method uses the pairwise dissimilarities between sequences to measure overall sequence discrepancy. This is similar in spirit to analysis of variance: total discrepancy can be decomposed into between-group and within-group components. If a covariate explains a large share of the discrepancy, then sequences are more similar within covariate-defined groups than across them.

In practice, discrepancy analysis provides several useful tools:

* pseudo-R2: how much sequence discrepancy is explained by the covariate;
* pseudo-F test: whether the association between sequences and the covariate is stronger than expected by chance;
* Levene-like test: whether some groups have more internally diverse trajectories than others;
* multifactor discrepancy analysis: how multiple covariates jointly relate to sequence differences;
* tree-structured discrepancy analysis: which covariates best split the sequence data into distinct trajectory groups.

## Interpretation

A high pseudo-R2 means that the covariate captures an important part of the sequence structure. A significant pseudo-F test suggests that the observed association is unlikely to be random. A significant Levene-like test means that groups differ not only in their typical trajectories, but also in how internally heterogeneous their trajectories are.

### Example

Suppose we compare school-to-work trajectories by educational qualification. If qualified young people follow relatively similar paths into further education, while less-qualified young people follow more diverse routes into training, unemployment, and employment, discrepancy analysis can capture both patterns. It can show that qualification is associated with trajectory differences, and it can also show that one group has more diverse trajectories than the other.

## BIC and LRT for sequence-group comparison: Are predefined groups meaningfully different?

Discrepancy analysis is useful when we want to assess sequence-covariate associations. But sometimes the research question is more direct:

Are two predefined groups of trajectories different?

For example:
* Do men and women have different employment life courses?
* Do East and West German cohorts converge after reunification?
* Do birth cohorts differ in the timing, ordering, or duration of states?

The BIC/LRT approach compares group-specific sequence structures with an overall sequence structure. Conceptually, it asks whether the data are better represented by one common gravity center or by separate group-specific gravity centers. If separate group centers fit the sequence data much better, this supports the interpretation that the groups differ.

This method is useful because it gives two kinds of evidence:
* BIC difference: the degree or strength of group difference;
* LRT: the statistical significance of the group difference.

This distinction matters. A group difference can be statistically significant but substantively small. The BIC difference is therefore especially helpful because it provides a graded assessment of how strong the evidence is for meaningful group differences.

### Interpretation

A small BIC difference suggests that the groups are not meaningfully different in their trajectories. A larger BIC difference suggests stronger evidence that the groups follow distinct sequence patterns. The LRT complements this by testing whether the observed difference is statistically significant.

### Example

Suppose two regions have employment trajectories that look different in an index plot. The BIC/LRT method helps us move beyond visual impression. It asks whether the observed difference is large enough, relative to within-group variability, to support the conclusion that the two regions have distinct life-course patterns.

## Sequence analysis and decomposition: Do life-course patterns explain later inequalities?

The third method asks a different kind of question. Instead of asking whether groups differ in their sequences, it asks whether sequence patterns help explain inequalities in a later outcome.

For example:
* How much of the gender pension gap is related to different work-family life courses?
* Do men and women receive different returns to similar life-course trajectories?
* Does inequality arise because groups experience different trajectories, or because similar trajectories are rewarded differently?

This is where sequence analysis is combined with Kitagawa–Oaxaca–Blinder decomposition. The sequence analysis step identifies life-course types. The decomposition step then uses these life-course types to explain a group gap in an outcome, such as pension income, wealth, health, or earnings.

The key distinction is between two components:

* Compositional differences: groups are distributed differently across life-course types.
* Return differences: groups receive different outcomes even when they have similar life-course types.

### Interpretation

If the compositional component is large, inequality is mainly related to the fact that groups experience different trajectories. If the return component is large, inequality is related to the fact that similar trajectories are rewarded differently across groups.

### Example

Suppose women are more likely than men to follow care-dominated work-family trajectories, and these trajectories lead to lower pensions. This contributes to the gender pension gap through compositional differences. But if men and women in the same work-family trajectory type still receive different pension income, this points to differential returns to similar life courses.

## How the three methods fit together

These methods answer related but different questions.

Discrepancy analysis asks:

Which covariates are associated with sequence differences?

BIC/LRT group comparison asks:

Are predefined groups of sequences meaningfully different, and how strong is the evidence?

SA–KOB decomposition asks:

Do sequence patterns explain later group inequalities, and are inequalities due to different life courses or different returns to similar life courses?

Together, they form a coherent workflow. A researcher may first use discrepancy analysis to identify which covariates are associated with trajectory differences. They may then use BIC/LRT to assess whether theoretically important groups differ in a statistically and substantively meaningful way. Finally, if the research question concerns later outcomes, they may use SA–KOB decomposition to examine whether trajectory differences help account for group inequalities.

## A practical decision guide

Use discrepancy analysis when your main question is:
* Are sequences associated with covariates?
* Which covariates explain more sequence variation?
* Do groups differ in within-group trajectory diversity?

Use BIC/LRT group comparison when your main question is:

* Are two or more predefined groups of sequences meaningfully different?
* How strong is the evidence for group differences?
* Do groups converge or diverge across cohorts or periods?

Use SA–KOB decomposition when your main question is:
* Do life-course trajectories explain later inequalities?
* Is the inequality due to different trajectories or different returns to similar trajectories?
* How much of the outcome gap is life-course-sensitive?

### Suggested tutorial example

For documentation, I strongly suggest using one running example across the whole page. For example:

Imagine we observe individuals from age 18 to 35. Each year, they can be in education, full-time work, part-time work, unemployment, or care work. We want to compare trajectories by gender and education and then examine whether these trajectories help explain income at age 40.

Then each method answers a natural next question:

* Discrepancy analysis: Do gender and education explain differences in trajectories from age 18 to 35?

* BIC/LRT: Are men’s and women’s trajectories meaningfully different?

* SA–KOB: How much of the gender income gap at age 40 is due to men and women following different trajectories, and how much is due to different returns to similar trajectories?

## References

Studer, M., Ritschard, G., Gabadinho, A., & Müller, N. S. (2011). Discrepancy analysis of state sequences.

Liao, T. F., & Fasang, A. E. (2021). Comparing groups of life-course sequences using the Bayesian information criterion and the likelihood-ratio test. Sociological Methodology, 51(1), 44-85.

Rowold, C., Struffolino, E., & Fasang, A. E. (2025). Life-course-sensitive analysis of group inequalities: Combining sequence analysis with the Kitagawa–Oaxaca–blinder decomposition. Sociological Methods & Research, 54(2), 646-705.