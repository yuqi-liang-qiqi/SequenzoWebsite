# Feature Extraction and Selection

Sequence analysis is often used to describe and compare life-course trajectories, such as employment histories, family trajectories, educational pathways, or health trajectories. A common workflow is to compute distances between sequences, cluster similar sequences into a typology, and then use the resulting cluster labels in later analysis.

That workflow is useful when the goal is to describe broad trajectory types. However, it can be less informative when the research question is more specific:

> Which concrete aspects of earlier trajectories are associated with a later-life outcome?

For example, when studying the link between educational pathways and later income, we may want to know whether income is related to total time spent in tertiary education, delayed entry into upper secondary education, bridge programmes, repeated transitions, or specific subsequences such as vocational education followed by tertiary training. A cluster label may summarize the whole pathway, but it often does not tell us which particular trajectory features matter.

The `sequenzo.feature_extraction_and_selection` module is designed for this kind of question. It turns sequences into interpretable numeric features and then helps identify which of those features are relevant to an outcome.

In this module, feature extraction means constructing variables from sequences, such as:

- duration features: how long a person spent in each state;
- timing features: when spells started or ended;
- sequencing features: which ordered subsequences appeared in the trajectory.

Feature selection means using a statistical or machine-learning method to identify which extracted features are associated with an outcome. In this module, the implemented selection method is Boruta, an all-relevant feature selection procedure based on random forests. Selection can optionally be performed after adjusting the outcome for control variables.

This workflow follows the methodological logic of Bolano and Studer (2020) and Unterlerchner, Studer, and Gomensoro (2023): sequences are transformed into interpretable duration, timing, and sequencing features, and relevant features are then selected in relation to a later outcome.

Sequenzo implements this workflow in Python and keeps the feature-extraction logic close to the published approach. The main practical difference is in the Boruta selection step. The original R workflow uses R Boruta with a ranger-based random forest and permutation-based importance, whereas Sequenzo relies on the standard [Python BorutaPy package](https://github.com/scikit-learn-contrib/boruta_py), which uses scikit-learn random forests and Gini-based feature importance. Both follow the same Boruta principle of comparing real features with randomized shadow features, but the underlying importance scores are computed differently.

For this reason, Sequenzo and R may not always confirm exactly the same features, even when the same extracted feature matrix and outcome are used. This does not mean that the Python results are wrong; it means that the all-relevant selection step is implemented through a different, standard Boruta backend process. The substantive workflow remains the same: extract interpretable sequence features, select outcome-relevant features, and interpret the selected features carefully. See [Conceptual Guide: Boruta Python vs R](./conceptual-guide.md#boruta-python-vs-r) for details.

## When Should You Use This Module?

Use this module when your research question is about the relationship between previous sequences and a later outcome, and you want to interpret which aspects of the sequences matter.

Typical examples include:

- Which features of educational pathways are associated with income at age 30?
- Which aspects of work-family trajectories are linked to later health?
- Does time spent in unemployment matter more than the timing of unemployment?
- Are specific transitions or subsequences associated with later disadvantage?
- Does a sequence typology preserve the part of trajectory variation that is related to an outcome?

This module is especially useful when a sequence typology feels too coarse or difficult to interpret. Instead of saying only that “cluster 3 has lower income,” FES can help identify whether the association is driven by delayed transitions, long spells, bridge states, repeated interruptions, or other concrete sequence properties.

## How This Differs from Sequence Clustering

Feature extraction and selection is not a replacement for sequence clustering. It answers a different question.

Sequence clustering summarizes whole trajectories into a small number of broad types. This is useful when the goal is to describe common trajectory patterns. However, when the goal is to understand which concrete aspects of earlier trajectories are associated with a later outcome, a cluster label may be too coarse. FES addresses this problem by extracting interpretable features from sequences and then selecting the features that are most relevant to the outcome.

| Approach | Main question | Typical output |
| --- | --- | --- |
| Sequence clustering | What broad trajectory types exist? | A typology of sequences |
| Discrepancy analysis | Is a covariate associated with sequence dissimilarities? | Pseudo-R² and significance tests |
| Feature extraction and selection | Which concrete sequence properties are related to an outcome? | Selected interpretable features |

These approaches can be used together. For example, clustering can provide a descriptive typology, discrepancy analysis can test whether an external variable is associated with sequence dissimilarities, and FES can identify which specific duration, timing, or sequencing features are related to an outcome.

### Where `clustassoc_like_typology_validation()` Fits

`clustassoc_like_typology_validation()` is not a separate alternative to FES. It is a helper for validating sequence typologies.

Use it when you have already computed:

1. a sequence dissimilarity matrix;
2. one or more clustering solutions, such as labels for `k = 3`, `k = 5`, and `k = 8`;
3. a covariate or outcome whose association with the sequences you care about.

The function asks: after reducing the full sequence information to cluster labels, how much of the original sequence–covariate association is still captured by the typology?

For example, suppose income is associated with educational pathways when we look at the full sequence dissimilarity matrix. A six-cluster typology may or may not capture this association. `clustassoc_like_typology_validation()` checks how much of the original income–sequence association remains after adding the cluster labels. If little remains, the typology has captured most of the relevant association. If much remains, the typology may have compressed away important sequence differences related to income.

In practice, these approaches can be used together. For example, you might first build a typology for descriptive purposes, then use `clustassoc_like_typology_validation()` to check whether that typology captures the association with income, and finally use FES to identify the specific features that explain the relationship.

## What You Need Before You Start

Most pages assume that you already have:

1. A [`SequenceData`](../function-library/sequence-data.md) object with one row per case and one column per time point.
2. An outcome vector, and optionally control covariates, aligned with the sequence rows.
3. A clear sense of your time grid. `timing_bin_width` is always in the same unit as `seqdata.time` labels, such as months, years, or position indices. It is not automatically interpreted as calendar months.

New to this module? Start with the [step-by-step tutorial](./tutorial.md).

## Entry Points

| Function | Role |
| --- | --- |
| [`extract_sequence_features()`](./extract-sequence-features.md) | Feature extraction only: duration, timing, and sequencing matrices. No Boruta, no final model. |
| [`run_feature_extraction_and_selection_pipeline()`](./run-feature-extraction-and-selection-pipeline.md) | Full workflow: extract features, run Boruta, and optionally fit an exploratory final model. |
| [`select_relevant_features()`](./select-relevant-features.md) | Boruta selection on an existing feature matrix. |
| [`interpret_selected_features()`](./interpret-selected-features.md#interpret-selected-features-1) | Summarize confirmed Boruta features by name and index. |
| [`cluster_correlated_features()`](./interpret-selected-features.md#cluster-correlated-features) | Group correlated selected features before interpretation. |
| [`clustassoc_like_typology_validation()`](./clustassoc-like-typology-validation.md) | Check whether a clustering solution accounts for a covariate–sequence association, analogous to `WeightedCluster::clustassoc()`. |

Helper:

- [`get_feature_extraction_and_selection_config_preset()`](./run-feature-extraction-and-selection-pipeline.md#get-feature-extraction-and-selection-config-preset): load a named settings bundle from a published workflow. Currently available: `unterlerchner2023`.

## A Typical Workflow

### Paper-style workflow: extract features and run Boruta

```python
from sequenzo import run_feature_extraction_and_selection_pipeline

result = run_feature_extraction_and_selection_pipeline(
    seqdata=seqdata,
    outcome=outcome,
    controls=controls,
    preset="unterlerchner2023",
)

print(result["selected_feature_names"])
````

By default, this does not fit a final regression model. The published workflow usually inspects and groups selected features before interpreting them.

### Feature extraction only

```python
from sequenzo import extract_sequence_features

features = extract_sequence_features(
    seqdata,
    timing_bin_width=12.0,
    time_unit_hint="month",
    timing_include_end=True,
    end_time_mode="exit_time",
)

print(features["X_full"].shape)
```

Use this when you want to inspect the feature matrix or run your own selection method.

### After selection: cluster redundant features

```python
from sequenzo import cluster_correlated_features

clusters = cluster_correlated_features(
    result["X_selected"],
    result["selected_feature_names"],
    abs_corr_threshold=0.7,
)
```

Many extracted sequence features are correlated. For example, a subsequence feature may overlap with a duration or timing feature. Clustering correlated selected features helps avoid over-interpreting many redundant variables as separate findings.

## Named Settings Bundle: `unterlerchner2023`

`preset="unterlerchner2023"` loads a fixed bundle of options based on the workflow used by Unterlerchner et al. (2023). It sets:

* 12-unit timing bins for monthly grids;
* spell start and spell end timing;
* `end_time_mode="exit_time"`;
* `sequencing_max_k=3`;
* `sequencing_min_support=0.05`;
* control residualization before Boruta;
* no automatic final model.

Use this preset when your `seqdata.time` grid is monthly, or otherwise matches the paper’s time units. If your time labels are yearly ages, such as `15, 16, 17, ...`, use `timing_bin_width=1.0` instead of `12.0`.

## Method Notes

| Topic                 | Behavior                                                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Timing                | `START_*` features represent spell entry; `END_*` features represent spell exit.                                                                                    |
| Bin width             | `timing_bin_width` uses the same unit as `seqdata.time`. Monthly grids: `12.0`; yearly age labels: `1.0`.                                                           |
| `time_unit_hint`      | Metadata stored in results for reproducibility and self-documentation. It does not change bins by itself.                                                           |
| Duration              | Summed spell lengths in sequence-position steps (`duration_steps`), not necessarily calendar months.                                                                |
| Sequencing            | Mined on spell-state events, that is, the distinct successive state path, not the raw repeated panel.                                                               |
| Boruta                | Runtime dependency `boruta` (BorutaPy). Confirmed features are stored in `selected_*`; tentative features in `tentative_*`.                                         |
| Final model           | Off by default. Papers often cluster correlated Boruta features before regression.                                                                                  |
| Residualization       | OLS/WLS residuals for regression outcomes; binomial GLM deviance residuals for binary classification outcomes.                                                      |
| `problem_type="auto"` | Numeric outcomes default to regression. For binary `0/1` outcomes where you want classification and binomial residualization, pass `problem_type="classification"`. |

## Python ↔ R or Literature Mapping

There is no single R function that corresponds to the full Sequenzo FES pipeline. In the published R workflow, the analysis is usually assembled from several steps: feature extraction with `WeightedCluster::seqpropclust(..., prop.only=TRUE)`, feature selection with the R package `Boruta` using `Boruta::Boruta()`, and later regression modeling with standard R functions such as `stats::lm()` or `stats::glm()`.

Sequenzo provides a Python-native implementation of this workflow. Some functions correspond closely to specific R steps, while others are convenience wrappers or extensions designed to make the workflow easier to run and document in Python.

| Sequenzo function or option | Closest R / literature counterpart | Relationship |
| --- | --- | --- |
| `extract_sequence_features()` | `WeightedCluster::seqpropclust(..., prop.only=TRUE)` | Closest feature-extraction counterpart. Sequenzo implements duration, timing, and sequencing features explicitly in Python. |
| `select_relevant_features()` | `Boruta::Boruta()` from the R package `Boruta` | Same Boruta idea, but Sequenzo uses Python BorutaPy, so selected features may differ from R. |
| `run_feature_extraction_and_selection_pipeline()` | `WeightedCluster::seqpropclust()` + `Boruta::Boruta()` + optional `stats::lm()` / `stats::glm()` | Sequenzo convenience pipeline. There is no single R function for this whole workflow. |
| `preset="unterlerchner2023"` | Unterlerchner et al. (2023) parameterization | Sequenzo settings bundle for reproducing the published workflow logic more easily. |
| `cluster_correlated_features()` | Correlation-based interpretation step in Unterlerchner et al. (2023) | Python helper for grouping redundant selected features before interpretation. |
| `clustassoc_like_typology_validation()` | `WeightedCluster::clustassoc()` | Typology-validation helper, separate from the FES pipeline; used when sequence clustering is part of the design. |

TraMineR provides many of the underlying sequence-analysis concepts, such as state sequences, spell conversion, event subsequences, and dissimilarity analysis. However, TraMineR and TraMineRextras do not provide a single direct counterpart to the full FES workflow.

## Included Pages

* [Step-by-step tutorial](./tutorial.md): link trajectories to an outcome using the Unterlerchner (2023) settings bundle.
* [Conceptual Guide](./conceptual-guide.md): duration, timing, sequencing, Boruta, residualization, and common mistakes.
* [`extract_sequence_features()`](./extract-sequence-features.md)
* [`run_feature_extraction_and_selection_pipeline()`](./run-feature-extraction-and-selection-pipeline.md)
* [`select_relevant_features()`](./select-relevant-features.md)
* [`interpret_selected_features()`](./interpret-selected-features.md#interpret-selected-features-1) and [`cluster_correlated_features()`](./interpret-selected-features.md#cluster-correlated-features)
* [`clustassoc_like_typology_validation()`](./clustassoc-like-typology-validation.md)

## Out of Scope in This Module

* Stability selection (`stabs` / LASSO) from Bolano and Studer (2020).
* Complexity index (`seqici`, etc.).
* Weighted frequent subsequence mining, until event-sequence weights are passed through.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Bolano, D., & Studer, M. (2020). The link between previous life trajectories and a later life outcome: A feature selection approach.

Unterlerchner, L., Studer, M., & Gomensoro, A. (2023). Back to the features. Investigating the relationship between educational pathways and income using sequence analysis and feature extraction and selection approach. *Swiss Journal of Sociology*, 49(2), 417–446.

Kursa, M. B., & Rudnicki, W. R. (2010). Feature selection with the Boruta package. *Journal of Statistical Software*, 36, 1–13.
