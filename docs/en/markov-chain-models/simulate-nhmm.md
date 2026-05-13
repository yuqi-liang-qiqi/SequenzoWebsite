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
| `emission_formula` | ✓ | `str` | Formula for emissions, e.g. `"~ x1 + x2"`. |
| `data` | ✓ | `DataFrame` | Must include response columns (values replaced during simulation), IDs, and covariates. |
| `id_var` | ✓ | `str` | Sequence ID column. |
| `time_var` | ✓ | `str` | Time index column. |
| `initial_formula` | ✗ | `str` / `None` | Initial probabilities. Default intercept-only `"~ 1"`. |
| `transition_formula` | ✗ | `str` / `None` | Transition probabilities. Default `"~ 1"`. |
| `coefs` | ✗ | `dict` / `None` | Known coefficients; random if omitted. |
| `init_sd` | ✗ | `float` / `None` | SD for random `coefs`. Default `2.0` when `coefs` is `None`. |
| `random_state` | ✗ | `int` / `None` | RNG seed. |

## What It Returns

A `dict` with simulated `observations`, `states`, and a long-format `data` frame.

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
    emission_formula="~ x1 + x2",
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
- Pair with [`build_nhmm()`](./build-nhmm.md) + [`fit_nhmm()`](./fit-nhmm.md) to test recovery of known parameters.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
