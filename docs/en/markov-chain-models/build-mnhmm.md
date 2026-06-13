# `build_mnhmm()`

`build_mnhmm()` creates an unfitted Mixture Non-homogeneous Hidden Markov Model (MNHMM). An MNHMM combines two ideas: mixture HMMs, where each sequence belongs probabilistically to a latent cluster, and non-homogeneous HMMs, where initial, transition, emission, or cluster probabilities can depend on covariates.

Use this builder when you want to define an MNHMM object first, inspect its structure, or pass it into lower-level methods. If you want to build and fit the model in one step, use [`estimate_mnhmm()`](./estimate-mnhmm.md).

## Function Usage

```python
build_mnhmm(
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
    eta_pi=None,
    eta_A=None,
    eta_B=None,
    eta_omega=None,
    eta_pi_reduced=None,
    eta_A_reduced=None,
    eta_B_reduced=None,
    eta_omega_reduced=None,
    initial_probs=None,
    transition_probs=None,
    emission_probs=None,
    cluster_probs=None,
    cluster_names=None,
    state_names=None,
    random_state=None,
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `observations` | Yes | `SequenceData` / sequence of `SequenceData` | Observed sequences. Pass a list or tuple for multichannel models. |
| `n_states` | Yes | `int` / sequence of `int` | Hidden-state count per mixture cluster. A single integer applies to all clusters. |
| `n_clusters` | Yes | `int` | Number of mixture clusters. Must be at least 2. |
| `X` | No | `ndarray` / `None` | Shared covariate array used by the model when probability-family-specific arrays are not supplied. |
| `X_pi` | No | `ndarray` / `None` | Covariates for initial-state probabilities. |
| `X_A` | No | `ndarray` / `None` | Covariates for transition probabilities. |
| `X_B` | No | `ndarray` / `None` | Covariates for emission probabilities. |
| `X_cluster` | No | `ndarray` / `None` | Time-constant covariates for mixture-cluster probabilities. |
| `emission_formula` | No | `str` / `Formula` / `None` | Formula used to build `X_B` from `data`. |
| `initial_formula` | No | `str` / `Formula` / `None` | Formula used to build `X_pi` from `data`. |
| `transition_formula` | No | `str` / `Formula` / `None` | Formula used to build `X_A` from `data`. |
| `cluster_formula` | No | `str` / `Formula` / `None` | Formula used to build `X_cluster`; covariates must be time-constant. |
| `data` | No | `pandas.DataFrame` / `None` | Covariate data used with formula inputs. Initial, transition, and emission formulas require one row per sequence-time combination; `cluster_formula` may use ID-level data when covariates are time-constant. |
| `id_var` | No | `str` / `None` | ID column in `data`. Required for formula-based construction. |
| `time_var` | No | `str` / `None` | Time column in `data`. Required for time-varying formulas. |
| `eta_pi` | No | sequence of arrays / `None` | Full coefficient arrays for initial-state probabilities, one per cluster. |
| `eta_A` | No | sequence of arrays / `None` | Full coefficient arrays for transition probabilities, one per cluster. |
| `eta_B` | No | sequence of arrays / `None` | Full coefficient arrays for emission probabilities. For multichannel data, use one coefficient array per channel within each cluster. |
| `eta_omega` | No | `ndarray` / `None` | Full coefficient array for mixture-cluster probabilities. |
| `eta_pi_reduced` | No | sequence of arrays / `None` | Reduced coefficient arrays for initial-state probabilities, excluding the reference category. |
| `eta_A_reduced` | No | sequence of arrays / `None` | Reduced coefficient arrays for transition probabilities, excluding the reference category in each transition row. |
| `eta_B_reduced` | No | sequence of arrays / `None` | Reduced coefficient arrays for emission probabilities, excluding the reference observed category. |
| `eta_omega_reduced` | No | `ndarray` / `None` | Reduced coefficient array for mixture-cluster probabilities, excluding the reference cluster. |
| `initial_probs` | No | sequence of arrays / `None` | Fixed initial probabilities per cluster. |
| `transition_probs` | No | sequence of arrays / `None` | Fixed transition matrices per cluster. |
| `emission_probs` | No | nested arrays / `None` | Fixed emission probabilities. For multichannel data, use `emission_probs[cluster][channel]`. |
| `cluster_probs` | No | `ndarray` / `None` | Fixed mixture probabilities. |
| `cluster_names` | No | sequence of `str` / `None` | Labels for mixture clusters. |
| `state_names` | No | sequence / `None` | Hidden-state labels, usually one list per cluster. |
| `random_state` | No | `int` / `None` | Seed for randomized starts. |

## Returns

An unfitted `MNHMM` object. The object stores the observations, cluster structure, covariate design matrices or formulas, fixed probability arrays, and coefficient starting values. It does not estimate parameters until you call a fitting method or use [`estimate_mnhmm()`](./estimate-mnhmm.md).

## Example

```python
import pandas as pd
from sequenzo import SequenceData, build_mnhmm, load_dataset

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

model = build_mnhmm(
    observations=seq,
    n_clusters=3,
    n_states=4,
    transition_formula="~ time_index",
    cluster_formula="~ cohort_proxy",
    data=covariates,
    id_var="id",
    time_var="time",
    random_state=42,
)
```

For multichannel data, pass aligned `SequenceData` objects. The following block is schematic: replace `employment_seq` and `family_seq` with prepared `SequenceData` objects that share the same IDs and time grid.

```python
model = build_mnhmm(
    observations=[employment_seq, family_seq],
    n_clusters=2,
    n_states=[3, 4],
    cluster_formula="~ cohort",
    data=covariates,
    id_var="id",
    time_var="time",
)
```

## Notes

- `cluster_formula` covariates must be time-constant. If the data contain repeated rows per ID, Sequenzo checks that the resulting values do not vary over time.
- `initial_formula`, `transition_formula`, and `emission_formula` require `data`, `id_var`, and `time_var` arranged on the sequence-time grid.
- `cluster_formula` can use ID-level data with one row per sequence ID, or long data if the resulting covariates are constant within each ID.
- MNHMM does not support missing sequence observations because the model preserves alignment across sequences, channels, and covariate arrays.
- Use either full `eta_*` arrays or reduced `eta_*_reduced` arrays for a probability family, not both.
- Supplied probability arrays are treated as fixed probabilities by `build_mnhmm()`. In [`estimate_mnhmm()`](./estimate-mnhmm.md), set `probability_parameters_as_starts=True` when you want supplied probabilities to initialize covariate parameters instead.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors



## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1-32. https://doi.org/10.18637/jss.v088.i03
