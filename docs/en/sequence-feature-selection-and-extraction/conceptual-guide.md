# Feature Extraction and Selection: Conceptual Guide

This guide explains what the Feature Extraction and Selection (FES) module does conceptually, why it is useful in sequence analysis, and how it relates to the published literature. 

## Why Feature Extraction and Selection?

Sequence analysis is often used to describe life-course trajectories, such as educational pathways, work histories, family trajectories, or health trajectories. A common workflow is to compute dissimilarities between sequences, cluster similar sequences into a typology, and then use the resulting cluster labels in later analysis.

This is useful when the goal is to describe broad trajectory types. However, it can be less informative when the research question is more specific:

> Which concrete aspects of earlier trajectories are associated with a later-life outcome?

For example, when studying the relationship between educational pathways and later income, a cluster label may tell us that one group follows a “long tertiary education” pathway or a “secondary vocational education” pathway. But it may not tell us whether the outcome is linked to delayed entry into upper secondary education, time spent in tertiary education, bridge programmes, repeated transitions, or a specific subsequence such as vocational education followed by tertiary training.

Feature extraction and selection (FES) addresses this problem by changing the unit of analysis. Instead of summarizing a whole sequence as a cluster label, it turns each sequence into many interpretable features and then asks which of those features are associated with the outcome.

In this sense, FES is a general workflow with two parts:

1. **Feature extraction**: convert sequences into interpretable variables.
2. **Feature selection**: identify which of those variables are relevant to an outcome.

In sequence analysis, feature extraction means building variables such as:

- how long a person spent in each state;
- when a spell started or ended;
- whether a certain ordered subsequence appeared in the trajectory.

Feature selection means identifying which extracted features are associated with an outcome. In this module, this step is implemented with **Boruta**, an all-relevant feature selection method based on random forests. Other selection methods can also be used in principle. For example, **LASSO** (Least Absolute Shrinkage and Selection Operator) selects a smaller, more parsimonious set of predictors by shrinking some regression coefficients to zero (Tibshirani, 1996; Hastie, 2009), and **stability selection** (Meinshausen & Bühlmann, 2010) repeats this process across subsamples to identify features that are selected consistently. These methods are discussed by Bolano and Studer (2020), but they are not currently implemented in this module.

The workflow is especially useful when you want a substantively readable link between earlier life-course patterns and a later outcome, such as income, health status, employment condition, or another downstream variable.

## FES Is a Workflow, Not a Single Algorithm

It is useful to keep the distinction between FES and Boruta clear.

FES is the overall workflow:

```text
Sequences
→ extracted features
→ selected outcome-relevant features
→ substantive interpretation
````

Boruta is one possible method for the selection step:

```text
Feature Extraction and Selection
├── Feature extraction
│   ├── duration features
│   ├── timing features
│   └── sequencing features
└── Feature selection
    ├── Boruta
    ├── LASSO
    ├── stability selection
    ├── elastic net
    └── other feature selection methods
```

Bolano and Studer (2020) discuss both Boruta and LASSO with stability selection. Boruta represents an all-relevant selection strategy: it tries to identify all features that are relevant to the outcome, including features that may be weak, non-linear, or involved in interactions. LASSO and stability selection represent a more parsimonious or predictive strategy: they aim to find a smaller set of features that predicts the outcome well.

Sequenzo currently implements the Boruta path because it is useful for exploratory and substantive interpretation: it helps reveal a broader set of sequence properties that may matter for the outcome. However, Boruta-selected features can be redundant, so interpretation should usually be followed by correlation clustering or other grouping steps.

## How This Differs from Sequence Clustering

Feature extraction and selection is not a replacement for sequence clustering. It answers a different question.

Sequence clustering summarizes whole trajectories into a small number of broad types. This is useful when the goal is to describe common trajectory patterns. However, when the goal is to understand which concrete aspects of earlier trajectories are associated with a later outcome, a cluster label may be too coarse. FES addresses this problem by extracting interpretable features from sequences and then selecting the features that are most relevant to the outcome.

| Approach                         | Main question                                                 | Typical output                   |
| -------------------------------- | ------------------------------------------------------------- | -------------------------------- |
| Sequence clustering              | What broad trajectory types exist?                            | A typology of sequences          |
| Discrepancy analysis             | Is a covariate associated with sequence dissimilarities?      | Pseudo-R² and significance tests |
| Feature extraction and selection | Which concrete sequence properties are related to an outcome? | Selected interpretable features  |

These approaches can be used together. For example, clustering can provide a descriptive typology, discrepancy analysis can test whether an external variable is associated with sequence dissimilarities, and FES can identify which specific duration, timing, or sequencing features are related to an outcome.

## Three Feature Families

The current FES module focuses on three major families of sequence features: duration, timing, and sequencing. These correspond to core dimensions of life-course sequence analysis.

### Duration

Duration features measure the total time spent in each state or state group, summed over spells.

For example:

```text
DUR_Unemployed
DUR_TertiaryEducation
DUR_WithPartner
```

These features are useful when the substantive mechanism is exposure. For example, time spent unemployed may matter for later income or health; time spent in tertiary education may matter for later earnings; time spent in a partnership may matter for later family or economic outcomes.

In Sequenzo, duration is measured in **sequence-position steps** (`duration_steps`). This follows the spirit of TraMineR `seqistatd()` and WeightedCluster `seqpropclust` with `properties="duration"`.

Duration is not automatically measured in calendar months unless your sequence time grid is monthly.

### Timing

Timing features measure when spells start or end. They are useful when the same state may have different implications depending on when it occurs.

For example, early unemployment may have different consequences from unemployment later in the career. Early parenthood may have a different relationship with later health or income than later parenthood. A bridge programme immediately after compulsory schooling may carry a different signal from a transition that occurs much later.

Sequenzo creates timing features by counting spell start and end events falling into equal-width time bins:

* `START_*` features count spell entries in each bin.
* `END_*` features count spell exits in each bin.

Examples:

```text
START_TertiaryEducation_BIN3
END_BridgeProgramme_BIN2
START_Unemployed_BIN1
```

`timing_bin_width` is in the same unit as `seqdata.time` labels. For a monthly position grid, such as months `1–172`, use `12.0` for one-year bins. For age in years, such as `15, 16, 17, ...`, use `1.0` for one-year bins, not `12.0`.

Unterlerchner et al. (2023) use both start and end timing with `end_time_mode="exit_time"`. The settings bundle `unterlerchner2023` sets these options for you.

### Sequencing

Sequencing features measure whether ordered subsequences appear in a trajectory. They are useful when the order of states matters, not just their duration or timing.

For example:

```text
SEQ_SECII_VET→TER_VET
SEQ_TransitionalSolution→SECII_VET
SEQ_FullTime→PartTime
```

These features capture the presence of specific ordered patterns, such as bridge education followed by vocational education, vocational education followed by tertiary education, or full-time work followed by part-time work.

Sequencing features are mined on the distinct successive state (DSS) spell path, not on the raw repeated state panel. For example, a raw sequence such as:

```text
A A A B B C
```

is treated as the spell-state path:

```text
A B C
```

for sequencing feature extraction. This prevents long durations from being counted as repeated sequencing information.

This follows the logic of TraMineR `seqecreate` → `seqefsub` → `seqeapplysub` and WeightedCluster `properties="pattern"`.

Parameters `sequencing_max_k` and `sequencing_min_support` control the maximum subsequence length and the minimum prevalence required for a subsequence to be retained.

## From Sequences to Spells

Internally, `SequenceData` is converted to spells with numeric start and end times using `extract_spells_with_times()`.

Spell end times depend on `end_time_mode`:

| Mode            | Meaning                                                                                 |
| --------------- | --------------------------------------------------------------------------------------- |
| `last_observed` | End at the last observed time point of the spell. This is the default.                  |
| `exit_time`     | End at the time when the state changes. This is the Unterlerchner (2023)-style setting. |

The difference matters for timing features. Suppose a spell occupies months 1–12 and the next state begins at month 13. Under `last_observed`, the spell end time is 12. Under `exit_time`, the spell end time is 13.

Use `exit_time` when you want `END_*` features to represent transition timing rather than the last occupied position.

## Boruta: All-Relevant Feature Selection

After feature extraction, the module can use Boruta to select relevant features.

Boruta works by comparing each real feature against randomized “shadow” features. Shadow features are permuted copies of the original features. If a real feature consistently performs better than the best shadow features across many random-forest iterations, it is treated as relevant.

Boruta classifies features into three broad groups:

| Category  | Meaning in Sequenzo                                            |
| --------- | -------------------------------------------------------------- |
| Confirmed | Strongly supported features; returned in `selected_*` fields.  |
| Tentative | Weak or uncertain positives; returned in `tentative_*` fields. |
| Rejected  | Features not selected by Boruta.                               |

Boruta is called an all-relevant selection method because it tries to identify all features that contain relevant information for the outcome, rather than selecting only the smallest predictive subset. This is useful for substantive interpretation, but it also means that confirmed features may be numerous and correlated.

For that reason, selected features should not automatically be interpreted as independent explanations. Use `cluster_correlated_features()` to group redundant selected features before moving to interpretation or regression.

## Residualization Before Boruta

In many applications, the goal is not simply to find sequence features associated with an outcome, but to find sequence features associated with the outcome after accounting for controls.

For example, in an educational pathway study, you may want to adjust for sex, social origin, or school track before asking which trajectory features are associated with later income. In a health study, you may want to adjust for age or cohort before selecting features.

When `residualize_target_with_controls=True`, the outcome is residualized on control covariates before Boruta:

| Outcome type          | Residualization                                                                    |
| --------------------- | ---------------------------------------------------------------------------------- |
| Regression            | OLS or WLS residuals                                                               |
| Binary classification | Binomial GLM deviance residuals; Boruta then runs as regression on those residuals |

This follows the logic of Bolano and Studer (2020), where the feature selection step is applied to the part of the outcome not already explained by controls.

For multi-class outcomes, set `residualize_target_with_controls=False`, because the current residualization path supports binary classification only.

## Optional Final Model

`fit_final_model=False` by default.

This is intentional. Published workflows usually do not treat the automatic final model as the main interpretive step. Instead, they first inspect selected features, examine redundancy, group correlated features, and then decide which representatives to include in a final regression or substantive interpretation.

The reason is that Boruta may select many overlapping features. For example, the following may all describe related information:

```text
DUR_TertiaryEducation
START_TertiaryEducation_BIN3
SEQ_SECII_VET→TERTIARY
```

Entering all selected features directly into one regression may create multicollinearity and make interpretation difficult. A better workflow is:

```text
Boruta-selected features
→ cluster correlated features
→ choose representative features
→ fit and interpret a final model if needed
```

Use `fit_final_model=True` only for quick exploratory modeling, not as a substitute for careful post-selection interpretation.

## Boruta: Python vs R {#boruta-python-vs-r}

The FES papers use [R Boruta](https://github.com/cran/Boruta/tree/master) with ranger and permutation-based importance, also known as mean decrease accuracy. Sequenzo uses [BorutaPy](https://github.com/scikit-learn-contrib/boruta_py), the standard Python Boruta package, with [scikit-learn](https://scikit-learn.org/stable/) random forests and Gini-based feature importance.

This does not mean that the Python results are wrong. It means that the Boruta backend is different.

Both R Boruta and BorutaPy follow the same general Boruta idea: compare real features against randomized shadow features over repeated random-forest runs. However, they compute feature importance differently.

| Layer                                                              | Match?         |
| ------------------------------------------------------------------ | -------------- |
| Algorithm idea: shadow features and iterative confirm/reject logic | Yes            |
| Testing defaults: `alpha=0.01`, `two_step=False` in Sequenzo       | Mostly aligned |
| Exact confirmed feature set on identical `X`, `y`                  | Not guaranteed |

The key difference is the importance score:

| Implementation                     | Random forest backend   | Feature importance           |
| ---------------------------------- | ----------------------- | ---------------------------- |
| R Boruta in the published workflow | `ranger`                | Permutation-based importance |
| Sequenzo                           | BorutaPy + scikit-learn | Gini-based importance        |

Therefore, Sequenzo and R may not always confirm exactly the same features, even when the same extracted feature matrix and outcome are used. This should be understood as a backend difference in the Boruta implementation, not as a problem with the feature-extraction workflow or the validity of the Python results.

For methodology reproduction, the relevant workflow is:

```text
extract sequence features
→ adjust outcome if needed
→ run all-relevant feature selection
→ inspect, group, and interpret selected features
```

For bitwise-identical R Boruta output, compare feature overlap rather than expecting exact equality, or run the original R Boruta backend directly.

Sequenzo sets `boruta_alpha=0.01` and `boruta_two_step=False` to align BorutaPy’s testing path with R as far as the Python library allows.

## Typology Validation (`clustassoc`)

`clustassoc_like_typology_validation()` is separate from the core FES workflow. It is useful when sequence clustering is part of your design.

Sequence clustering reduces the full sequence information to a small number of cluster labels. This can be useful, but it also raises a question:

> If I use this typology in later analysis, does it preserve the sequence variation that is associated with my covariate or outcome?

`clustassoc_like_typology_validation()` addresses this question. It requires:

1. a sequence dissimilarity matrix;
2. a covariate or outcome;
3. one or more clustering solutions, such as labels for `k = 3`, `k = 5`, and `k = 8`.

The function first measures the original association between the covariate and the sequence dissimilarities. It then adds the cluster labels and asks how much of the covariate’s pseudo-R² remains. If little remains, the cluster solution has captured much of the original sequence–covariate association. If much remains, the typology may have compressed away important sequence differences related to the covariate.

For example, suppose income is associated with educational pathways when we look at the full sequence dissimilarity matrix. A six-cluster typology may or may not capture this association. `clustassoc_like_typology_validation()` checks how much of the original income–sequence association remains after adding the cluster labels. If little remains, the typology has captured most of the relevant association. If much remains, the typology may be too coarse for that research question.

This is why the original R method belongs to WeightedCluster: it validates clustering solutions. It does not extract sequence features and is not a replacement for FES.

## Step-by-Step Mental Model

A typical FES analysis follows this logic:

1. **Prepare** `SequenceData`, an outcome, and controls if needed.
2. **Check your time grid** and choose `timing_bin_width` explicitly.
3. **Extract** duration, timing, and sequencing features.
4. **Residualize** the outcome on controls if your design requires it.
5. **Select** relevant features with Boruta.
6. **Inspect** confirmed and tentative features.
7. **Cluster** highly correlated selected features before interpretation.
8. **Fit** a final regression only after deciding which features or representatives to include.
9. Optionally **validate sequence typologies** with `clustassoc_like_typology_validation()` when clustering is part of the design.

## Things to Keep in Mind {#things-to-keep-in-mind}

* `timing_bin_width` uses the same unit as `seqdata.time`. Use `12.0` for monthly grids when you want yearly bins, but use `1.0` for yearly age labels.
* `time_unit_hint="month"` is metadata for reproducibility and self-documentation. It does not automatically change the bin width.
* FES is the overall workflow; Boruta is the current feature-selection method implemented in this module.
* Boruta-confirmed features can be correlated or redundant. Use `cluster_correlated_features()` before interpreting them as separate findings.
* Confirmed features may differ from R `Boruta()` with default settings because Sequenzo uses the Python BorutaPy backend.
* Numeric `0/1` outcomes default to regression under `problem_type="auto"`. Pass `problem_type="classification"` when binary classification and binomial residualization are intended.
* `fit_final_model=True` is an exploratory convenience option, not the main published workflow. Cluster correlated features before a final regression.
* Empty `hit_count` values in `interpret_selected_features()` are expected with BorutaPy. Use `boruta_ranking`, `selected_*`, and `tentative_*` for diagnostics.
* `preset="unterlerchner2023"` is designed for monthly time grids. For non-monthly grids, adjust `timing_bin_width` to match your time labels.
* `clustassoc_like_typology_validation()` is a typology-validation helper for clustering-based workflows. It is separate from feature extraction.

## Authors

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. *Swiss Journal of Sociology*, 49(2), 417–446.

Kursa, M. B., & Rudnicki, W. R. (2010). Feature selection with the Boruta package. *Journal of Statistical Software*, 36, 1–13.

Tibshirani, R. (1996). Regression shrinkage and selection via the lasso. Journal of the Royal Statistical Society Series B: Statistical Methodology, 58(1), 267-288.

Hastie, T. (2009). The elements of statistical learning: data mining, inference, and prediction.

Meinshausen, N., & Bühlmann, P. (2010). Stability selection. Journal of the Royal Statistical Society Series B: Statistical Methodology, 72(4), 417-473.