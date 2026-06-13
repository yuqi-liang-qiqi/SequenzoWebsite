# Markov Chain Models: Sequenzo and seqHMM Mapping

This page maps Sequenzo `sequenzo.seqhmm` functions to their closest **seqHMM** (R) counterparts.

## What This Section Covers

This section focuses on building, fitting, predicting, comparing, and simulating hidden Markov models for sequence data. For R users, the workflow mirrors seqHMM's `build_*` to `fit_*` to `predict` / `posterior_probs` pattern, with `SequenceData` replacing TraMineR `stslist` objects.

## Main Workflow Mapping

| Sequenzo function | seqHMM counterpart | Notes |
| --- | --- | --- |
| [`build_hmm()`](./build-hmm.md) | `build_hmm()` | Creates an unfitted HMM; supports single-channel and multichannel input. |
| [`fit_model()`](./fit-model.md) | `fit_model()` | EM fitting for a basic HMM. |
| [`fit_model_advanced()`](./fit-model-advanced.md) | `fit_model(..., global_step, local_step)` | Optional EM, global search, and local optimization with restarts. |
| [`predict()`](./predict.md) | `hidden_paths()` / `predict.hmm` | Viterbi decoding of the most likely hidden-state path. |
| [`posterior_probs()`](./posterior-probs.md) | `posterior_probs()` | Forward-backward state probabilities at each time point. |
| [`plot_hmm()`](./plot-hmm.md) | `plot.hmm()` | Transition and emission matrices plus network graph. |
| [`build_mhmm()`](./build-mhmm.md) | `build_mhmm()` | Mixture HMM structure; supports single-channel and multichannel `SequenceData` input. |
| [`fit_mhmm()`](./fit-mhmm.md) | `fit_model.mhmm` | EM fitting for mixture HMMs. |
| [`predict_mhmm()`](./predict-mhmm.md) | `most_probable_cluster()` | Hard cluster assignment per sequence. |
| [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md) | `posterior_cluster_probabilities()` | Soft cluster membership probabilities. |
| [`plot_mhmm()`](./plot-mhmm.md) | `plot.mhmm()` | Cluster weights and per-cluster parameters. |
| [`build_nhmm()`](./build-nhmm.md) | `build_nhmm()` | Covariate-dependent NHMM; accepts formula strings or covariate arrays. |
| [`fit_nhmm()`](./fit-nhmm.md) | `fit_nhmm()` | Numerical optimization of NHMM coefficients. |
| [`build_mnhmm()`](./build-mnhmm.md) | `build_mnhmm()` | Mixture non-homogeneous HMM; supports component and cluster covariates. |
| [`estimate_mnhmm()`](./estimate-mnhmm.md) | `fit_model.mnhmm` / `estimate_mnhmm()` style workflow | Builds and estimates an MNHMM in one call. |
| [`aic()`](./model-comparison.md#aic) / [`bic()`](./model-comparison.md#bic) | `stats::AIC(logLik())` / `stats::BIC(logLik())` | Information criteria after fitting. |
| [`compare_models()`](./model-comparison.md#compare-models) | Manual comparison of fitted models | Ranks fitted models by AIC or BIC. |
| [`simulate_hmm()`](./simulate-hmm.md) | `simulate_hmm()` | Generate synthetic sequences from HMM parameters. |
| [`simulate_mhmm()`](./simulate-mhmm.md) | `simulate_mhmm()` | Generate synthetic MHMM sequences; supports formula-based mixture weights. |
| [`simulate_nhmm()`](./simulate-nhmm.md) | `simulate_nhmm()` | Generate synthetic NHMM sequences from formulas. |
| [`simulate_mnhmm()`](./simulate-mnhmm.md) | `simulate_mnhmm()` | Generate synthetic MNHMM sequences from fixed parameters or a fitted MNHMM. |
| [`bootstrap_model()`](./bootstrap-model.md) | `bootstrap_coefs()` | Nonparametric bootstrap confidence intervals for HMM, MHMM, and NHMM. |

## Utility Mapping

Sequenzo also exports seqHMM-style helpers for decoding, model inspection, state reordering, data conversion, and plotting.

| Sequenzo utility | seqHMM counterpart | Notes |
| --- | --- | --- |
| `hidden_paths()` | `hidden_paths()` | Works with HMM, MHMM, NHMM, and MNHMM objects. |
| `get_initial_probs()` | Probability getter utilities | Returns defensive copies of fitted or fixed initial probabilities. |
| `get_transition_probs()` | Probability getter utilities | Returns transition matrices for HMM-family models. |
| `get_emission_probs()` | Probability getter utilities | Returns emission probabilities, including nested structures for multichannel models. |
| `trim_model()` | `trim_model()` | Removes unused or structurally irrelevant model parts when supported by the fitted object. |
| `permute_states()` | `permute_states()` | Reorders hidden states for interpretation. |
| `separate_mhmm()` | `separate_mhmm()` | Separates a mixture model into component HMMs. |
| `data_to_stslist()` / `stslist_to_data()` | `data_to_stslist()` / `stslist_to_data()` | Conversion helpers for seqHMM-style data interchange. |
| `create_model_matrix()` | `model.matrix`-style formula expansion | Builds `(n_sequences, n_timepoints, n_covariates)` covariate arrays for NHMM/MNHMM builders. |
| `stacked_sequence_plot()`, `ssplot()`, `gridplot()` | seqHMM plotting helpers | Lightweight plotting helpers for sequence and model displays. |

## Input Type Mapping

| Concept | seqHMM (R) | Sequenzo |
| --- | --- | --- |
| Sequence input | TraMineR `stslist` (`seqdef`) | `SequenceData` |
| Multichannel input | List of `stslist` | List or tuple of `SequenceData` objects |
| Covariates | Formula plus `data.frame` | Formula strings plus `pandas.DataFrame`, or NumPy covariate arrays |
| Fitted model class | `hmm`, `mhmm`, `nhmm`, `mnhmm` | `HMM`, `MHMM`, `NHMM`, `MNHMM` |

## Scope Notes

Sequenzo now covers the main HMM, MHMM, NHMM, and MNHMM workflow in Python. A few implementation details differ from R seqHMM:

- Covariate-dependent mixture weights belong to MNHMM (`cluster_formula` or `X_cluster`), not to `build_mhmm()` / `fit_mhmm()`.
- NHMM and MNHMM builder formula strings are passed through `patsy`, so interactions and inline transforms such as `np.log(...)` are supported in design-matrix construction. `lag()` is available for time-varying formula matrices, with restrictions such as no lag terms in `initial_formula`; `cluster_formula` must be time-constant. Simulation helpers such as `simulate_nhmm()` use simpler formula parsing and should use plain column names.
- MNHMM does not support missing observations because the implementation keeps sequences, channels, and covariate arrays aligned over time.
- Multichannel MHMM and MNHMM estimation may be slower on large samples than single-channel models.

## Authors

Code: Yuqi Liang and Yapeng Wei 

Documentation: Yuqi Liang


## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1-32. https://doi.org/10.18637/jss.v088.i03
