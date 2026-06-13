# `simulate_nhmm()`

`simulate_nhmm()` generates sequences from a Non-homogeneous HMM specified with formulas and coefficient matrices. Probabilities can vary over time and covariates.

## Function Usage

```python
simulate_nhmm(
    n_states,
    emission_formula,
    data,
    id_var,
    time_var,
    initial_formula=None,
    transition_formula=None,
    coefs=None,
    init_sd=None,
    random_state=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `simulate_nhmm()` |
| --- | --- |
| `n_states` | Number of hidden states |
| `emission_formula`, `initial_formula`, `transition_formula` | Formula specification per parameter block |
| `data`, `id_var`, `time_var` | Long-format covariate and response scaffold |
| `coefs` | Dictionary of coefficient matrices (`initial_probs`, `transition_probs`, `emission_probs`) |
| `init_sd` | SD for random coefficient draws when `coefs` is `None` |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `n_states` | ✓ | `int` | Hidden states (`> 1`). |
| `emission_formula` | ✓ | `str` | Formula for emissions, preferably with a response column on the left-hand side, e.g. `"y ~ x1 + x2"`. |
| `data` | ✓ | `DataFrame` | Must include response columns (values replaced during simulation), IDs, and covariates. |
| `id_var` | ✓ | `str` | Sequence ID column. |
| `time_var` | ✓ | `str` | Time index column. |
| `initial_formula` | ✗ | `str` / `None` | Initial probabilities. Default intercept-only `"~ 1"`. |
| `transition_formula` | ✗ | `str` / `None` | Transition probabilities. Default `"~ 1"`. |
| `coefs` | ✗ | `dict` / `None` | Known coefficients; random if omitted. |
| `init_sd` | ✗ | `float` / `None` | SD for random `coefs`. Default `2.0` when `coefs` is `None`. |
| `random_state` | ✗ | `int` / `None` | RNG seed. |

## Returns

A `dict`:

| Key | Description |
| --- | --- |
| `observations` | List of simulated observed sequences |
| `states` | List of hidden-state sequences |
| `data` | Long-format data frame with simulated response values |
| `states_df` | Long-format data frame of hidden states |
| `model` | Simulation metadata, including alphabet, state names, and coefficient blocks |

## Example

```python
import pandas as pd
import numpy as np
from sequenzo.seqhmm import simulate_nhmm

# Long-format scaffold: one row per person × time
rows = []
for sid in range(5):
    for t in range(1, 11):
        rows.append({"id": sid, "time": t, "y": "A", "x1": t, "x2": sid % 2})
data = pd.DataFrame(rows)

sim = simulate_nhmm(
    n_states=3,
    emission_formula="y ~ x1 + x2",
    data=data,
    id_var="id",
    time_var="time",
    random_state=42,
)

print(sim["observations"][:2])
```

## R Counterpart

- **Closest R function:** seqHMM `simulate_nhmm()`

## Notes

- `data` defines sequence structure (IDs, times, alphabet from response columns); observed values in response columns are overwritten.
- A left-hand side in `emission_formula`, such as `"y ~ x1 + x2"`, is the clearest way to identify the response/alphabet column. If omitted, Sequenzo tries to infer a categorical response column from `data`.
- Use plain column names in `simulate_nhmm()` formulas. Formula transforms such as `np.log(...)` are supported in NHMM builder design matrices, but the simulation helper uses a simpler formula parser.
- Pair with [`build_nhmm()`](./build-nhmm.md) + [`fit_nhmm()`](./fit-nhmm.md) to test recovery of known parameters.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
