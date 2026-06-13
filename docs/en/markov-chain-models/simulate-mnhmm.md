# `simulate_mnhmm()`

`simulate_mnhmm()` generates synthetic observed sequences and hidden-state paths from a Mixture Non-homogeneous Hidden Markov Model (MNHMM). You can simulate from supplied probability arrays, random parameters, or a fitted `MNHMM` object with fixed component probabilities.

## Function Usage

```python
simulate_mnhmm(
    n_sequences=None,
    n_clusters=None,
    n_states=None,
    initial_probs=None,
    transition_probs=None,
    emission_probs=None,
    cluster_probs=None,
    sequence_length=None,
    sequence_lengths=None,
    alphabet=None,
    n_symbols=None,
    state_names=None,
    cluster_names=None,
    coefs=None,
    model=None,
    random_state=None,
)
```

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `n_sequences` | Conditional | `int` / `None` | Number of sequences to simulate when `sequence_lengths` is not supplied. |
| `n_clusters` | Conditional | `int` / `None` | Number of mixture clusters. Required unless simulating from `model`. |
| `n_states` | Conditional | `int` / sequence of `int` / `None` | Hidden states per cluster. Required unless simulating from `model`. |
| `initial_probs` | No | sequence of arrays / `None` | Initial-state probabilities per cluster. Randomly generated if omitted with other probability arrays. |
| `transition_probs` | No | sequence of arrays / `None` | Transition matrices per cluster. |
| `emission_probs` | No | sequence of arrays / `None` | Emission matrices per cluster. |
| `cluster_probs` | No | `ndarray` / `None` | Mixture probabilities. Can be a vector or a sequence-specific matrix. |
| `sequence_length` | Conditional | `int` / `None` | Common sequence length when `sequence_lengths` is not supplied. |
| `sequence_lengths` | Conditional | sequence of `int` / `None` | Sequence-specific lengths. |
| `alphabet` | No | sequence of `str` / `None` | Observed-state labels. |
| `n_symbols` | No | `int` / `None` | Number of observed symbols when `alphabet` is omitted. |
| `state_names` | No | sequence / `None` | Hidden-state labels. |
| `cluster_names` | No | sequence of `str` / `None` | Cluster labels. |
| `coefs` | No | `dict` / `None` | Optional dictionary containing probability arrays. |
| `model` | No | `MNHMM` / `None` | Fitted or constructed MNHMM with fixed component probabilities. |
| `random_state` | No | `int` / `None` | Seed for reproducible simulation. |

## Example

```python
from sequenzo import simulate_mnhmm

sim = simulate_mnhmm(
    n_sequences=200,
    n_clusters=3,
    n_states=[3, 4, 3],
    sequence_length=12,
    alphabet=["A", "B", "C"],
    random_state=42,
)

observations = sim["observations_df"]
hidden_states = sim["states_df"]
```

## Simulating from a Model

If you already have an `MNHMM` object with fixed component probabilities, pass that object through `model`:

```python
# Replace `mnhmm_model` with your fitted or constructed MNHMM object.
sim = simulate_mnhmm(model=mnhmm_model, random_state=42)
```

When `model` is supplied, the model must be an `MNHMM` instance with fixed component probabilities available. For multichannel models, `simulate_mnhmm()` returns one observed sequence column set per channel.

## Returns

A dictionary containing simulated data and model metadata. The main entries are:

| Key | Availability | Description |
| --- | --- | --- |
| `observations` | All simulations | Simulated observed sequences. |
| `states` | All simulations | Simulated hidden-state paths. |
| `clusters` | All simulations | Simulated mixture-cluster assignment for each sequence. |
| `observations_df` | All simulations | Simulated observed sequences in tabular form. For multichannel simulations, this is a dictionary of channel-specific data frames. |
| `states_df` | All simulations | Simulated hidden states and cluster assignments. |
| `alphabet` | Single-channel simulations | Observed-state alphabet. |
| `alphabets` | Multichannel simulations | Observed-state alphabet by channel. |
| `channel_names` | Multichannel simulations | Channel labels. |
| `state_names` | All simulations | Hidden-state labels by cluster. |
| `cluster_names` | All simulations | Mixture-cluster labels. |
| `model` | All simulations | Dictionary of the probability parameters used for simulation. |

## Notes

- If probabilities are omitted, Sequenzo draws random categorical parameters.
- Provide `random_state` when you need reproducible simulated datasets.
- Use simulation to test analysis code, inspect whether parameters imply plausible trajectories, or build teaching examples.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors



## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1-32. https://doi.org/10.18637/jss.v088.i03
