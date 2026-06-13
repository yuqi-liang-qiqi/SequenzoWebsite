# `build_nhmm()`

`build_nhmm()` creates an unfitted Non-homogeneous HMM (NHMM). Transition and/or emission probabilities can depend on covariates or time through coefficient matrices and a softmax link.

## Function Usage

```python
build_nhmm(
    observations,
    n_states,
    X=None,
    X_pi=None,
    X_A=None,
    X_B=None,
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
| `X` | Shared covariate array (manual specification) |
| `X_pi`, `X_A`, `X_B` | Separate covariate arrays for initial, transition, and emission probabilities |
| `emission_formula`, `initial_formula`, `transition_formula` | Formula terms for each parameter block |
| `data`, `id_var`, `time_var` | Covariate data frame and index columns |
| `eta_pi`, `eta_A`, `eta_B` | Coefficient matrices for initial, transition, emission |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `observations` | ✓ | `SequenceData` | Observed sequences. |
| `n_states` | ✓ | `int` | Number of hidden states (`> 1`). |
| `X` | ✗* | `ndarray` / `None` | Shared covariate tensor `(n_sequences, n_timepoints, n_covariates)` used when separate matrices are not supplied. |
| `X_pi` | ✗* | `ndarray` / `None` | Covariate tensor for initial state probabilities. If using separate manual matrices, provide all of `X_pi`, `X_A`, and `X_B` together. |
| `X_A` | ✗* | `ndarray` / `None` | Covariate tensor for transition probabilities. |
| `X_B` | ✗* | `ndarray` / `None` | Covariate tensor for emission probabilities. |
| `emission_formula` | ✗* | `str` / `Formula` / `None` | Formula for emission probabilities, e.g. `"~ age + education"`. |
| `initial_formula` | ✗ | `str` / `Formula` / `None` | Formula for initial state probabilities. |
| `transition_formula` | ✗ | `str` / `Formula` / `None` | Formula for transition probabilities. |
| `data` | ✗* | `DataFrame` / `None` | Covariate table (required with formulas if `X` is omitted). |
| `id_var` | ✗* | `str` / `None` | Sequence ID column in `data`. |
| `time_var` | ✗* | `str` / `None` | Time index column in `data`. |
| `eta_pi`, `eta_A`, `eta_B` | ✗ | `ndarray` / `None` | Optional starting coefficients. |
| `state_names` | ✗ | `List[str]` / `None` | Hidden state labels. |
| `random_state` | ✗ | `int` / `None` | Seed for random coefficient initialization. |

\*Provide either a shared `X`, all three separate matrices (`X_pi`, `X_A`, `X_B`), or (`data` + `id_var` + `time_var` + at least one formula).

## Returns

An `NHMM` object with covariate matrix `X`, coefficient slots `eta_pi`, `eta_A`, `eta_B`, and `log_likelihood=None` until fitting.

## Example

### Method 1: Direct covariate tensor

```python
import numpy as np
from sequenzo import SequenceData, load_dataset
from sequenzo.seqhmm import build_nhmm, fit_nhmm

df = load_dataset("mvad")
time_cols = list(df.columns[14:])
states = ["employment", "FE", "HE", "joblessness", "school", "training"]
seq = SequenceData(df, time=time_cols, states=states)

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

rows = []
for row_index, sequence_id in enumerate(seq.ids):
    for time_index, time_label in enumerate(seq.time):
        rows.append({
            "id": sequence_id,
            "time": time_label,
            "time_index": time_index,
            "cohort_proxy": row_index % 2,
        })

covariate_df = pd.DataFrame(rows)

nhmm = build_nhmm(
    seq,
    n_states=4,
    transition_formula="~ time_index + cohort_proxy",
    emission_formula="~ time_index",
    data=covariate_df,
    id_var="id",
    time_var="time",
    random_state=42,
)
```

## R Counterpart

- **Closest R function:** seqHMM `build_nhmm()`
- **Mapping note:** Formula strings are passed through `patsy`. Interactions and inline transforms such as `np.log(...)` are supported. `lag()` is available for time-varying formula matrices, but should not be used in `initial_formula`.

## Notes

- Follow with [`fit_nhmm()`](./fit-nhmm.md).
- Use NHMM with one `SequenceData` object. For multichannel latent-dynamics workflows, see the HMM, MHMM, and MNHMM pages.
- Use `X` when the same covariates should drive initial, transition, and emission probabilities. Use `X_pi`, `X_A`, and `X_B` when each probability block needs its own covariate design.
- Builder formulas use `patsy`, so additive terms, interactions, and inline transforms accepted by `patsy` are supported. Use `lag()` only in time-varying formula contexts. Simulation formulas are more limited; see [`simulate_nhmm()`](./simulate-nhmm.md).

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
