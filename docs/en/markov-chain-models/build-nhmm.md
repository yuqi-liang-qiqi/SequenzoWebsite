# `build_nhmm()`

`build_nhmm()` creates an unfitted Non-homogeneous HMM (NHMM). Transition and/or emission probabilities can depend on covariates or time through coefficient matrices and a softmax link.

## Function Usage

```python
build_nhmm(
    observations,
    n_states,
    X=None,
    emission_formula=None,
    initial_formula=None,
    transition_formula=None,
    data=None,
    id_var=None,
    time_var=None,
    eta_pi=None,
    eta_A=None,
    eta_B=None,
    state_names=None,
    random_state=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `build_nhmm()` |
| --- | --- |
| `observations` | `stslist` |
| `n_states` | Number of hidden states |
| `X` | Covariate array (manual specification) |
| `emission_formula`, `initial_formula`, `transition_formula` | Formula terms for each parameter block |
| `data`, `id_var`, `time_var` | Covariate data frame and index columns |
| `eta_pi`, `eta_A`, `eta_B` | Coefficient matrices for initial, transition, emission |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `observations` | ✓ | `SequenceData` | Observed sequences. |
| `n_states` | ✓ | `int` | Number of hidden states (`> 1`). |
| `X` | ✗* | `ndarray` / `None` | Covariate tensor `(n_sequences, n_timepoints, n_covariates)`. |
| `emission_formula` | ✗* | `str` / `Formula` / `None` | Formula for emission probabilities, e.g. `"~ age + education"`. |
| `initial_formula` | ✗ | `str` / `Formula` / `None` | Formula for initial state probabilities. |
| `transition_formula` | ✗ | `str` / `Formula` / `None` | Formula for transition probabilities. |
| `data` | ✗* | `DataFrame` / `None` | Covariate table (required with formulas if `X` is omitted). |
| `id_var` | ✗* | `str` / `None` | Sequence ID column in `data`. |
| `time_var` | ✗* | `str` / `None` | Time index column in `data`. |
| `eta_pi`, `eta_A`, `eta_B` | ✗ | `ndarray` / `None` | Optional starting coefficients. |
| `state_names` | ✗ | `List[str]` / `None` | Hidden state labels. |
| `random_state` | ✗ | `int` / `None` | Seed for random coefficient initialization. |

\*Provide either `X` **or** (`data` + `id_var` + `time_var` + at least one formula).

## What It Returns

An `NHMM` object with covariate matrix `X`, coefficient slots `eta_pi`, `eta_A`, `eta_B`, and `log_likelihood=None` until fitting.

## Example

### Method 1: Direct covariate tensor

```python
import numpy as np
from sequenzo.seqhmm import build_nhmm, fit_nhmm

n_sequences = len(seq.sequences)
n_timepoints = max(len(s) for s in seq.sequences)

X = np.zeros((n_sequences, n_timepoints, 1))
for i in range(n_sequences):
    for t in range(len(seq.sequences[i])):
        X[i, t, 0] = t  # time covariate

nhmm = build_nhmm(seq, n_states=4, X=X, random_state=42)
nhmm = fit_nhmm(nhmm, verbose=True)
```

### Method 2: Formula interface

```python
import pandas as pd

covariate_df = pd.DataFrame({
    "id": range(len(seq.sequences)),
    "time": [...],  # long-format rows per id × time
    "age": [...],
    "education": [...],
})

nhmm = build_nhmm(
    seq,
    n_states=4,
    emission_formula="~ age + education",
    data=covariate_df,
    id_var="id",
    time_var="time",
    random_state=42,
)
```

## R Counterpart

- **Closest R function:** seqHMM `build_nhmm()`
- **Mapping note:** Formula syntax follows R-style additive terms; interactions and lags are not yet supported in Sequenzo.

## Notes

- Follow with [`fit_nhmm()`](./fit-nhmm.md).
- Multichannel NHMM is not yet supported.
- Supported formulas are additive (e.g. `"~ x1 + x2"`); no `*`, `lag()`, or transforms yet.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
