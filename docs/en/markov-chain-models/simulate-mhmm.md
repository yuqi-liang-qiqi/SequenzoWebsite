# `simulate_mhmm()`

`simulate_mhmm()` draws sequences from a Mixture HMM. Each sequence is first assigned to a cluster, then generated from that cluster's HMM parameters.

## Function Usage

```python
simulate_mhmm(
    n_sequences,
    n_clusters,
    initial_probs,
    transition_probs,
    emission_probs,
    cluster_probs=None,
    sequence_length=None,
    alphabet=None,
    state_names=None,
    cluster_names=None,
    formula=None,
    data=None,
    coefficients=None,
    random_state=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `simulate_mhmm()` |
| --- | --- |
| Per-cluster `initial_probs`, `transition_probs`, `emission_probs` | Lists of cluster-specific matrices |
| `cluster_probs` | Fixed mixture weights |
| `formula`, `data`, `coefficients` | Covariate-dependent cluster probabilities (multinomial logit) |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `n_sequences` | ✓ | `int` | Number of sequences. |
| `n_clusters` | ✓ | `int` | Number of mixture components. |
| `initial_probs` | ✓ | `List[ndarray]` | One initial distribution per cluster. |
| `transition_probs` | ✓ | `List[ndarray]` | One transition matrix per cluster. |
| `emission_probs` | ✓ | `List[ndarray]` | One emission matrix per cluster. |
| `cluster_probs` | ✗* | `ndarray` / `None` | Fixed weights `(n_clusters,)`. |
| `sequence_length` | ✓ | `int` | Length of each sequence. |
| `alphabet` | ✗ | `List[str]` / `None` | Observed symbols. |
| `state_names` | ✗ | `List[List[str]]` / `None` | Hidden state names per cluster. |
| `cluster_names` | ✗ | `List[str]` / `None` | Cluster labels. |
| `formula` | ✗* | `str` / `None` | Formula for covariate-dependent mixture, e.g. `"~ x1 + x2"`. |
| `data` | ✗* | `DataFrame` / `None` | Covariate data (one row per sequence). |
| `coefficients` | ✗* | `ndarray` / `None` | Multinomial logit coefficients for cluster assignment. |
| `random_state` | ✗ | `int` / `None` | RNG seed. |

\*Provide **either** `cluster_probs` **or** (`formula` + `data` + `coefficients`).

## Returns

A `dict`:

| Key | Description |
| --- | --- |
| `observations` | List of observed state sequences |
| `states` | List of hidden-state sequences |
| `clusters` | Cluster label or name for each sequence |
| `observations_df` | Wide DataFrame with one row per sequence and a `cluster` column |
| `alphabet` | Observed symbols used in the simulation |
| `state_names` | Hidden-state labels per cluster |
| `cluster_names` | Cluster labels used in the simulation |

## Example

### Fixed mixture weights

```python
import numpy as np
from sequenzo.seqhmm import simulate_mhmm

initial_probs = [np.array([0.5, 0.5]), np.array([0.3, 0.7])]
transition_probs = [
    np.array([[0.7, 0.3], [0.3, 0.7]]),
    np.array([[0.8, 0.2], [0.2, 0.8]]),
]
emission_probs = [
    np.array([[0.9, 0.1], [0.1, 0.9]]),
    np.array([[0.7, 0.3], [0.3, 0.7]]),
]

sim = simulate_mhmm(
    n_sequences=20,
    n_clusters=2,
    initial_probs=initial_probs,
    transition_probs=transition_probs,
    emission_probs=emission_probs,
    cluster_probs=np.array([0.6, 0.4]),
    sequence_length=20,
    alphabet=["A", "B"],
    random_state=42,
)
```

### Covariate-dependent clusters

```python
import numpy as np
import pandas as pd

data = pd.DataFrame({
    "covariate_1": np.random.rand(30),
    "covariate_2": np.random.choice(["A", "B"], size=30),
})

coefs = np.array([
    [0, -1.5],
    [0, 3.0],
    [0, -0.7],
])

sim = simulate_mhmm(
    n_sequences=30,
    n_clusters=2,
    initial_probs=initial_probs,
    transition_probs=transition_probs,
    emission_probs=emission_probs,
    sequence_length=20,
    formula="~ covariate_1 + covariate_2",
    data=data,
    coefficients=coefs,
    alphabet=["A", "B"],
    random_state=42,
)
```

## R Counterpart

- **Closest R function:** seqHMM `simulate_mhmm()`

## Notes

- Covariate-based mixture simulation is available here even though [`build_mhmm()`](./build-mhmm.md) estimates mixture weights from sequence likelihoods rather than from covariates.
- First cluster is the reference level in the coefficient matrix (first column typically zero).

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
