# Markov Chain Models: Sequenzo and seqHMM Mapping

This page maps Sequenzo `sequenzo.seqhmm` functions to their closest **seqHMM** (R) counterparts.

## What This Section Covers

This section focuses on building, fitting, predicting, comparing, and simulating hidden Markov models for sequence data. For R users, the workflow mirrors seqHMM's `build_*` → `fit_*` → `predict` / `posterior_probs` pattern, with `SequenceData` replacing TraMineR `stslist` objects.

## Mapping Table

| Sequenzo function | seqHMM counterpart | Notes |
| --- | --- | --- |
| [`build_hmm()`](./build-hmm.md) | `build_hmm()` | Creates an unfitted HMM; supports single- and multichannel input. |
| [`fit_model()`](./fit-model.md) | `fit_model()` | EM fitting for basic HMM. Sequenzo's default wrapper uses EM only; use [`fit_model_advanced()`](./fit-model-advanced.md) for global/local steps. |
| [`fit_model_advanced()`](./fit-model-advanced.md) | `fit_model(..., global_step, local_step)` | Optional EM + global (MLSL-style) + local (L-BFGS) optimization with restarts. |
| [`predict()`](./predict.md) | `hidden_paths()` / `predict.hmm` | Viterbi decoding of the most likely hidden-state path. |
| [`posterior_probs()`](./posterior-probs.md) | `posterior_probs()` | Forward–backward state probabilities at each time point. |
| [`plot_hmm()`](./plot-hmm.md) | `plot.hmm()` | Transition/emission matrices and network graph. |
| [`build_mhmm()`](./build-mhmm.md) | `build_mhmm()` | Mixture HMM structure. Sequenzo: single-channel only for now. |
| [`fit_mhmm()`](./fit-mhmm.md) | `fit_model.mhmm` | EM for mixture HMM. |
| [`predict_mhmm()`](./predict-mhmm.md) | `most_probable_cluster()` | Hard cluster assignment per sequence. |
| [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md) | `posterior_cluster_probabilities()` | Soft cluster membership probabilities. |
| [`plot_mhmm()`](./plot-mhmm.md) | `plot.mhmm()` | Cluster weights and per-cluster parameters. |
| [`build_nhmm()`](./build-nhmm.md) | `build_nhmm()` | Covariate-dependent NHMM; formula or `X` matrix. |
| [`fit_nhmm()`](./fit-nhmm.md) | `fit_nhmm()` | Numerical optimization of NHMM coefficients. |
| [`aic()`](./model-comparison.md#aic) / [`bic()`](./model-comparison.md#bic) | `stats::AIC(logLik())` / `stats::BIC(logLik())` | Information criteria after fitting. |
| [`compare_models()`](./model-comparison.md#compare_models) | Manual comparison of fitted models | Ranks models by AIC or BIC. |
| [`simulate_hmm()`](./simulate-hmm.md) | `simulate_hmm()` | Generate synthetic sequences from HMM parameters. |
| [`simulate_mhmm()`](./simulate-mhmm.md) | `simulate_mhmm()` | Generate synthetic MHMM sequences; supports formula-based mixture weights. |
| [`simulate_nhmm()`](./simulate-nhmm.md) | `simulate_nhmm()` | Generate synthetic NHMM sequences from formulas. |
| [`bootstrap_model()`](./bootstrap-model.md) | `bootstrap_coefs()` | Nonparametric bootstrap confidence intervals (partial parity). |

## Not Yet Mapped in Sequenzo

The R package also exports utilities that do not yet have a direct Sequenzo equivalent:

| seqHMM (R) | Status in Sequenzo |
| --- | --- |
| `build_mnhmm()`, `estimate_mnhmm()` | Not implemented |
| `hidden_paths()` as standalone export | Use [`predict()`](./predict.md) instead |
| `get_initial_probs()`, `get_transition_probs()`, `get_emission_probs()` | Read attributes on fitted model objects |
| `stacked_sequence_plot()`, `ssplot()`, `gridplot()` | Not implemented |
| `trim_model()`, `permute_states()`, `separate_mhmm()` | Not implemented |
| `data_to_stslist()` / `stslist_to_data()` | Use `SequenceData` directly |

## Input Type Mapping

| Concept | seqHMM (R) | Sequenzo |
| --- | --- | --- |
| Sequence input | TraMineR `stslist` (`seqdef`) | `SequenceData` |
| Multichannel input | List of `stslist` | `List[SequenceData]` in `build_hmm()` only |
| Covariates | Formula + `data.frame` | Formula strings + `pandas.DataFrame`, or NumPy `X` tensor |
| Fitted model class | `hmm`, `mhmm`, `nhmm`, `mnhmm` | `HMM`, `MHMM`, `NHMM` |

## Authors

Code: Yuqi Liang and Yapeng Wei 

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32. https://doi.org/10.18637/jss.v088.i03
