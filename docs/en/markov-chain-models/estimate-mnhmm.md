# `estimate_mnhmm()`

`estimate_mnhmm()` builds and fits a Mixture Non-homogeneous Hidden Markov Model (MNHMM) in one call. It is the main entry point when you want latent clusters and covariate-dependent HMM probabilities in the same model.

## Function Usage

```python
estimate_mnhmm(
    observations,
    n_states,
    n_clusters,
    X=None,
    X_pi=None,
    X_A=None,
    X_B=None,
    X_cluster=None,
    emission_formula=None,
    initial_formula=None,
    transition_formula=None,
    cluster_formula=None,
    data=None,
    id_var=None,
    time_var=None,
    initial_probs=None,
    transition_probs=None,
    emission_probs=None,
    cluster_probs=None,
    eta_pi_reduced=None,
    eta_A_reduced=None,
    eta_B_reduced=None,
    eta_omega_reduced=None,
    cluster_names=None,
    state_names=None,
    random_state=None,
    n_iter=100,
    tol=1e-2,
    lambda_penalty=0.0,
    verbose=False,
    probability_parameters_as_starts=False,
    compress=False,
)
```

## Entry Parameters

Most structure and covariate parameters are the same as [`build_mnhmm()`](./build-mnhmm.md). The parameters below control estimation.

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `eta_pi_reduced` | No | sequence of arrays / `None` | Reduced coefficient starts for initial-state probabilities. |
| `eta_A_reduced` | No | sequence of arrays / `None` | Reduced coefficient starts for transition probabilities. |
| `eta_B_reduced` | No | sequence of arrays / `None` | Reduced coefficient starts for emission probabilities. For multichannel data, provide channel-specific arrays within each cluster. |
| `eta_omega_reduced` | No | `ndarray` / `None` | Reduced coefficient starts for mixture-cluster probabilities. |
| `n_iter` | No | `int` | Maximum number of estimation iterations. Default is `100`. |
| `tol` | No | `float` | Convergence tolerance. Default is `1e-2`. |
| `lambda_penalty` | No | `float` | L2 penalty for direct covariate likelihood optimization. Default is `0.0`. |
| `verbose` | No | `bool` | Print fitting progress when `True`. |
| `probability_parameters_as_starts` | No | `bool` | Treat supplied probabilities as starting values for covariate parameters. Default `False` keeps supplied probability arrays fixed where appropriate. |
| `compress` | No | `bool` | Use repeated-pattern compression where supported. This can speed up some fixed-probability or fixed-component fits. |

## How Estimation Works

The fitting strategy depends on the model structure:

- Intercept-only MNHMMs with unfixed component probabilities use weighted Baum-Welch EM.
- Single-channel covariate MNHMMs use direct observed-likelihood optimization.
- Multichannel MNHMMs support fixed component inference, non-covariate component EM, fixed-component cluster-covariate optimization, and direct component-covariate likelihood fits.

This means that `estimate_mnhmm()` chooses the fitting path from the model you specify. You usually do not need to choose the optimizer manually.

## Example

```python
import pandas as pd
from sequenzo import SequenceData, estimate_mnhmm, load_dataset

df = load_dataset("mvad")
time_cols = list(df.columns[14:])
states = ["employment", "FE", "HE", "joblessness", "school", "training"]
seq = SequenceData(df, time=time_cols, states=states)

rows = []
for row_index, sequence_id in enumerate(seq.ids):
    for time_index, time_label in enumerate(seq.time):
        rows.append({
            "id": sequence_id,
            "time": time_label,
            "time_index": time_index,
            "cohort_proxy": row_index % 2,
        })

covariates = pd.DataFrame(rows)

fitted = estimate_mnhmm(
    observations=seq,
    n_clusters=3,
    n_states=4,
    transition_formula="~ time_index",
    cluster_formula="~ cohort_proxy",
    data=covariates,
    id_var="id",
    time_var="time",
    random_state=42,
    n_iter=200,
    tol=1e-4,
    verbose=True,
)

print(fitted.log_likelihood)
```

## Using Probability Parameters as Starts

By default, supplied probability arrays are treated as fixed probabilities in model families where that interpretation is appropriate. This is consistent with [`build_mnhmm()`](./build-mnhmm.md). If you are translating an R seqHMM workflow where supplied probabilities initialize covariate-model coefficients, prepare the probability arrays first and set:

```python
fitted = estimate_mnhmm(
    observations=seq,
    n_clusters=3,
    n_states=4,
    transition_formula="~ time_index",
    data=covariates,
    id_var="id",
    time_var="time",
    initial_probs=initial_probs,
    transition_probs=transition_probs,
    emission_probs=emission_probs,
    probability_parameters_as_starts=True,
)
```

This flag matters when the model uses a direct covariate-fitting path, such as a model with `transition_formula`, `emission_formula`, `initial_formula`, `cluster_formula`, or the corresponding `X_*` arrays. For plain fixed-probability EM, supplied probabilities remain fixed.

## Returns

A fitted `MNHMM` object. After fitting, use model attributes and utility functions such as `hidden_paths()`, `get_initial_probs()`, `get_transition_probs()`, `get_emission_probs()`, [`aic()`](./model-comparison.md#aic), and [`bic()`](./model-comparison.md#bic) to interpret and compare the result.

## Notes

- MNHMM estimation is more computationally demanding than HMM, MHMM, or NHMM estimation. Start with a small number of clusters and hidden states.
- Use `random_state` for reproducible starts.
- Use `lambda_penalty` when covariate models are large or unstable.
- Reduced coefficient arrays follow the same reference-category convention as [`build_mnhmm()`](./build-mnhmm.md).
- `compress=True` can help when many complete observation patterns repeat, but it is not used for every fitting path.
- MNHMM expects complete sequence observations so that time, channel, and covariate arrays remain aligned.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors



## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1-32. https://doi.org/10.18637/jss.v088.i03
