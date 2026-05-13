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
| `observations` | Single-channel `stslist` |
| `n_clusters` | Number of mixture components |
| `n_states` | Hidden states per cluster (scalar or vector) |
| `initial_probs`, `transition_probs`, `emission_probs` | Lists of per-cluster matrices |
| `cluster_probs` | Mixture weights |
| `cluster_names`, `state_names` | Labels |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `observations` | ✓ | `SequenceData` | Single-channel sequence data (not a list). |
| `n_clusters` | ✓ | `int` | Number of clusters (HMM submodels). |
| `n_states` | ✓ | `int` / `List[int]` | Hidden states per cluster. Use an `int` for equal sizes, or a list of length `n_clusters` for different sizes. |
| `initial_probs` | ✗ | `List[ndarray]` / `None` | Per-cluster initial distributions. |
| `transition_probs` | ✗ | `List[ndarray]` / `None` | Per-cluster transition matrices. |
| `emission_probs` | ✗ | `List[ndarray]` / `None` | Per-cluster emission matrices. |
| `cluster_probs` | ✗ | `ndarray` / `None` | Initial mixture weights `(n_clusters,)`. Uniform if omitted. |
| `cluster_names` | ✗ | `List[str]` / `None` | Cluster labels. |
| `state_names` | ✗ | `List[List[str]]` / `None` | Hidden state names per cluster. |
| `channel_names` | ✗ | `List[str]` / `None` | Reserved for future multichannel support. |
| `random_state` | ✗ | `int` / `None` | Seed for random initialization. |

## What It Returns

An `MHMM` object containing:

- `clusters`: list of unfitted `HMM` submodels
- `n_clusters`, `cluster_probs`, `observations`
- `log_likelihood` is `None` until [`fit_mhmm()`](./fit-mhmm.md)

## Example

```python
from sequenzo.seqhmm import build_mhmm, fit_mhmm

# Step 1: build 3 clusters, 4 hidden states each
mhmm = build_mhmm(seq, n_clusters=3, n_states=4, random_state=42)

# Different state counts per cluster
mhmm = build_mhmm(seq, n_clusters=3, n_states=[4, 4, 6], random_state=42)

# Step 2: fit
mhmm = fit_mhmm(mhmm, n_iter=100, verbose=True)
```

## R Counterpart

- **Closest R function:** seqHMM `build_mhmm()`
- **Mapping note:** R supports multichannel and covariate-dependent mixture weights; Sequenzo currently supports single-channel data without covariate formulas on `build_mhmm()`.

## Notes

- Always follow with [`fit_mhmm()`](./fit-mhmm.md).
- For cluster assignment after fitting, use [`predict_mhmm()`](./predict-mhmm.md) or [`posterior_probs_mhmm()`](./posterior-probs-mhmm.md).
- Covariate-dependent cluster probabilities are supported in [`simulate_mhmm()`](./simulate-mhmm.md) but not yet in `build_mhmm()` / `fit_mhmm()`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
