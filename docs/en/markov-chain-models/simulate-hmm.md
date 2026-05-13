# `simulate_hmm()`

`simulate_hmm()` generates synthetic observed and hidden-state sequences from known HMM parameters. Use it for method checks, power studies, or teaching.

## Function Usage

```python
simulate_hmm(
    n_sequences,
    initial_probs,
    transition_probs,
    emission_probs,
    sequence_length,
    alphabet=None,
    state_names=None,
    random_state=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `simulate_hmm()` |
| --- | --- |
| `n_sequences` | Number of sequences to draw |
| `initial_probs` | Initial distribution |
| `transition_probs` | Transition matrix |
| `emission_probs` | Emission matrix |
| `sequence_length` | Length of each sequence |
| `alphabet` | Observed state symbols |
| `state_names` | Hidden state labels |
| `random_state` | RNG seed |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `n_sequences` | ✓ | `int` | How many sequences to simulate. |
| `initial_probs` | ✓ | `ndarray` | Shape `(n_states,)`, sums to 1. |
| `transition_probs` | ✓ | `ndarray` | Shape `(n_states, n_states)`, rows sum to 1. |
| `emission_probs` | ✓ | `ndarray` | Shape `(n_states, n_symbols)`, rows sum to 1. |
| `sequence_length` | ✓ | `int` | Number of time points per sequence. |
| `alphabet` | ✗ | `List[str]` / `None` | Observed symbols. Default: `"0"`, `"1"`, … |
| `state_names` | ✗ | `List[str]` / `None` | Hidden state names. |
| `random_state` | ✗ | `int` / `None` | Reproducibility seed. |

## What It Returns

A `dict`:

| Key | Description |
| --- | --- |
| `observations` | List of observed state sequences |
| `states` | List of hidden state sequences |
| `observations_df` | DataFrame suitable for building `SequenceData` |

## Example

```python
import numpy as np
from sequenzo.seqhmm import simulate_hmm

initial_probs = np.array([0.5, 0.5])
transition_probs = np.array([[0.7, 0.3], [0.3, 0.7]])
emission_probs = np.array([[0.9, 0.1], [0.1, 0.9]])

sim = simulate_hmm(
    n_sequences=10,
    initial_probs=initial_probs,
    transition_probs=transition_probs,
    emission_probs=emission_probs,
    sequence_length=20,
    alphabet=["A", "B"],
    random_state=42,
)

print(sim["observations"][0])
```

## R Counterpart

- **Closest R function:** seqHMM `simulate_hmm()`

## Notes

- Validate matrix shapes before calling; mismatched dimensions raise explicit errors.
- To recover parameters with estimation, wrap `observations` in `SequenceData` and run [`build_hmm()`](./build-hmm.md) + [`fit_model()`](./fit-model.md).

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
