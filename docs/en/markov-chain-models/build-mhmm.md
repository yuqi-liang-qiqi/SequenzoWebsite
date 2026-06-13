# `build_mhmm()`

`build_mhmm()` creates an unfitted Mixture Hidden Markov Model (MHMM). Each cluster is its own HMM submodel; sequences are assumed to come from one cluster with unknown membership.

## Function Usage

```python
build_mhmm(
    observations,
    n_clusters,
    n_states,
    initial_probs=None,
    transition_probs=None,
    emission_probs=None,
    cluster_probs=None,
    cluster_names=None,
    state_names=None,
    channel_names=None,
    random_state=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `build_mhmm()` |
| --- | --- |
| `observations` | Single-channel `stslist` or list of `stslist` objects |
| `n_clusters` | Number of mixture components |
| `n_states` | Hidden states per cluster (scalar or vector) |
| `initial_probs`, `transition_probs`, `emission_probs` | Lists of per-cluster matrices |
| `cluster_probs` | Mixture weights |
| `cluster_names`, `state_names` | Labels |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `observations` | ✓ | `SequenceData` / `List[SequenceData]` | Single-channel sequence data, or a list of aligned `SequenceData` objects for multichannel MHMMs. |
| `n_clusters` | ✓ | `int` | Number of clusters (HMM submodels). |
| `n_states` | ✓ | `int` / `List[int]` | Hidden states per cluster. Use an `int` for equal sizes, or a list of length `n_clusters` for different sizes. |
| `initial_probs` | ✗ | `List[ndarray]` / `None` | Per-cluster initial distributions. |
| `transition_probs` | ✗ | `List[ndarray]` / `None` | Per-cluster transition matrices. |
| `emission_probs` | ✗ | `List[ndarray]` / `List[List[ndarray]]` / `None` | Per-cluster emission matrices. For multichannel input, each cluster entry contains one emission matrix per channel. |
| `cluster_probs` | ✗ | `ndarray` / `None` | Initial mixture weights `(n_clusters,)`. Uniform if omitted. |
| `cluster_names` | ✗ | `List[str]` / `None` | Cluster labels. |
| `state_names` | ✗ | `List[List[str]]` / `None` | Hidden state names per cluster. |
| `channel_names` | ✗ | `List[str]` / `None` | Optional names for channels in multichannel input. |
| `random_state` | ✗ | `int` / `None` | Seed for random initialization. |

## Returns

An `MHMM` object containing:

- `clusters`: list of unfitted `HMM` submodels
- `n_clusters`, `cluster_probs`, `observations`
- `log_likelihood` is `None` until [`fit_mhmm()`](./fit-mhmm.md)

## Example

```python
from sequenzo import SequenceData, load_dataset
from sequenzo.seqhmm import build_mhmm, fit_mhmm

df = load_dataset("mvad")
time_cols = list(df.columns[14:])
states = ["employment", "FE", "HE", "joblessness", "school", "training"]
seq = SequenceData(df, time=time_cols, states=states)

# Step 1: build 3 clusters, 4 hidden states each
mhmm = build_mhmm(seq, n_clusters=3, n_states=4, random_state=42)

# Different state counts per cluster
mhmm = build_mhmm(seq, n_clusters=3, n_states=[4, 4, 6], random_state=42)

# Step 2: fit
mhmm = fit_mhmm(mhmm, n_iter=100, verbose=True)
```

## R Counterpart

- **Closest R function:** seqHMM `build_mhmm()`
- **Mapping note:** Sequenzo supports single-channel and multichannel MHMM input. Covariate-dependent mixture weights are handled by [`build_mnhmm()`](./build-mnhmm.md) / [`estimate_mnhmm()`](./estimate-mnhmm.md), not by `build_mhmm()` / `fit_mhmm()`.

## Notes

- Always follow with [`fit_mhmm()`](./fit-mhmm.md).
- For cluster assignment after fitting, use [`predict_mhmm()`](./predict-mhmm.md) or [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md).
- Use MNHMM when mixture weights or component probabilities should depend on covariates.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
