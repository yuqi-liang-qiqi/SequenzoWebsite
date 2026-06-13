# Markov Chain Models

Hidden Markov models (HMMs) treat observed life-course sequences as emissions from unobserved latent states. Instead of comparing whole trajectories with a distance matrix, you specify a generative model: how likely each hidden state is at the start, how likely transitions between hidden states are, and how each hidden state produces observed states.

These pages document `sequenzo.seqhmm`, Sequenzo's Python implementation inspired by the R **seqHMM** package (Helske & Helske, 2019). The API follows seqHMM's workflow of building, fitting, predicting, and visualizing models while using Python conventions and `SequenceData` as the main input type.

## What You Need Before You Start

Most pages assume that you already have:

1. A [`SequenceData`](../function-library/sequence-data.md) object with one row per case and one column per time point (or a list of `SequenceData` objects for multichannel HMM).

2. A clear research question about **latent dynamics**: recurring hidden regimes, mixture clusters with different dynamics, or covariate-dependent transition/emission probabilities.

If you are new to HMMs, start with the [Conceptual Guides](./markov-chain.md):

- [Markov Chain](./markov-chain.md)
- [Hidden Markov Model (HMM)](./hmm.md)
- [Mixture Hidden Markov Model (MHMM)](./mhmm.md)

## Model Types in This Module

| Model | Main build function | Typical question |
| --- | --- | --- |
| Basic HMM | [`build_hmm()`](./build-hmm.md) | What latent regimes generate the observed sequences? |
| Mixture HMM (MHMM) | [`build_mhmm()`](./build-mhmm.md) | Are there distinct subgroups, each with its own HMM? |
| Non-homogeneous HMM (NHMM) | [`build_nhmm()`](./build-nhmm.md) | Do transition or emission probabilities depend on covariates or time? |
| Mixture non-homogeneous HMM (MNHMM) | [`build_mnhmm()`](./build-mnhmm.md), [`estimate_mnhmm()`](./estimate-mnhmm.md) | Are there latent subgroups whose HMM probabilities also depend on covariates? |

All fitted models share the same high-level workflow:

1. **Build** the model structure (`build_hmm`, `build_mhmm`, `build_nhmm`, or `build_mnhmm`).
2. **Fit** parameters with EM or numerical optimization (`fit_model`, `fit_mhmm`, `fit_nhmm`, `estimate_mnhmm`, or `fit_model_advanced`).
3. **Predict** latent states or cluster membership (`predict`, `predict_mhmm`, `posterior_probs`, `posterior_probs_mhmm`, or `hidden_paths`).
4. **Evaluate** with AIC/BIC (`aic`, `bic`, `compare_models`). For HMM, MHMM, and NHMM, optional bootstrap summaries are available through `bootstrap_model()`.
5. **Visualize** estimated parameters (`plot_hmm`, `plot_mhmm`).

## Basic HMM Workflow

1. **Prepare sequence data.** Build `SequenceData` with the correct state alphabet and time columns.
2. **Choose the number of hidden states.** Start with a small range (for example 3–6) and compare models with BIC.
3. **Build and fit.** Call `build_hmm()` then `fit_model()`. Set `random_state` for reproducible initialization.
4. **Inspect fit quality.** Check `model.log_likelihood`, `model.converged`, and `model.n_iter`.
5. **Decode latent paths.** Use `predict()` for the Viterbi path or `posterior_probs()` for state probabilities at each time point.
6. **Plot parameters.** Use `plot_hmm(model, which='network')` for a seqHMM-style graph, or `which='all'` for matrix views.

## How This Differs from Distance-Based Analysis

Distance-based tools (clustering, discrepancy analysis, group comparison with LRT/BIC on distances) summarize how **different** observed sequences are. HMMs instead estimate a **generative mechanism**: latent states, transitions, and emissions.

Use HMMs when you want interpretable latent dynamics or mixture clusters defined by Markov structure. Use distance-based methods when your substantive question is about overall trajectory dissimilarity without a latent-state story.

## Included Pages

- [Conceptual Guides](./markov-chain.md): Markov chain, HMM, and MHMM in plain language
- [Sequenzo–seqHMM Mapping](./seqhmm-function-mapping.md): correspondence with the R seqHMM package
- **Basic HMM:** [`build_hmm()`](./build-hmm.md), [`fit_model()`](./fit-model.md), [`predict()`](./predict.md), [`posterior_probs()`](./posterior-probs.md), [`plot_hmm()`](./plot-hmm.md)
- **Mixture HMM:** [`build_mhmm()`](./build-mhmm.md), [`fit_mhmm()`](./fit-mhmm.md), [`predict_mhmm()`](./predict-mhmm.md), [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md), [`plot_mhmm()`](./plot-mhmm.md)
- **Non-homogeneous HMM:** [`build_nhmm()`](./build-nhmm.md), [`fit_nhmm()`](./fit-nhmm.md)
- **Mixture non-homogeneous HMM:** [`build_mnhmm()`](./build-mnhmm.md), [`estimate_mnhmm()`](./estimate-mnhmm.md)
- **Model comparison:** [`aic()`](./model-comparison.md#aic), [`bic()`](./model-comparison.md#bic), [`compare_models()`](./model-comparison.md#compare-models)
- **Simulation:** [`simulate_hmm()`](./simulate-hmm.md), [`simulate_mhmm()`](./simulate-mhmm.md), [`simulate_nhmm()`](./simulate-nhmm.md), [`simulate_mnhmm()`](./simulate-mnhmm.md)
- **Advanced tools:** [`bootstrap_model()`](./bootstrap-model.md) for HMM, MHMM, and NHMM; [`fit_model_advanced()`](./fit-model-advanced.md)

## Implementation Notes and Scope

- Covariate-dependent mixture weights are handled by MNHMM through `cluster_formula` / `X_cluster`; use `build_mhmm()` / `fit_mhmm()` for mixture HMMs without mixture-weight covariates.
- NHMM and MNHMM builder formula strings are passed through `patsy`, so interactions and inline transforms such as `np.log(...)` are supported in design-matrix construction. `lag()` is available for time-varying formula matrices, with restrictions such as no lag terms in `initial_formula`; `cluster_formula` must be time-constant. Simulation helpers such as `simulate_nhmm()` use simpler formula parsing and should use plain column names.
- Multichannel MHMM and MNHMM estimation is computationally demanding on large samples because parts of the EM workflow are implemented in Python.
- MNHMM expects complete sequence observations so that time, channel, and covariate arrays remain aligned.

## See Also

- [Markov Chain](/en/markov-chain-models/markov-chain), [HMM](/en/markov-chain-models/hmm), and [MHMM](/en/markov-chain-models/mhmm) are the conceptual guides.
- [Sequence Analysis vs. LCA vs. HMM](/en/tutorials/sa-lca-and-hmm) helps decide whether an HMM fits the research question.
- [Model Comparison](/en/markov-chain-models/model-comparison) compares fitted models with AIC and BIC.

## Authors

Code: Yuqi Liang, Yapeng Wei

Documentation: Yuqi Liang


## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32. https://doi.org/10.18637/jss.v088.i03
