# `fit_nhmm()`

`fit_nhmm()` estimates NHMM coefficients that link covariates to initial, transition, and emission probabilities via softmax transformations.

## Function Usage

```python
fit_nhmm(
    model,
    n_iter=100,
    tol=1e-4,
    verbose=False
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `fit_nhmm()` |
| --- | --- |
| `model` | `nhmm` object from `build_nhmm()` |
| `n_iter` | Optimization iteration limit |
| `tol` | Convergence tolerance |
| `verbose` | Progress output |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `NHMM` | Model from [`build_nhmm()`](./build-nhmm.md). |
| `n_iter` | ✗ | `int` | Maximum optimization iterations. Default `100`. |
| `tol` | ✗ | `float` | Convergence tolerance. Default `1e-4`. |
| `verbose` | ✗ | `bool` | Print progress. Default `False`. |

## Returns

The same `NHMM` object, modified in place:

| Attribute | Meaning |
| --- | --- |
| `log_likelihood` | Fitted log-likelihood |
| `eta_pi`, `eta_A`, `eta_B` | Estimated coefficient matrices |
| `n_iter`, `converged` | Optimization diagnostics |

## Example

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
        X[i, t, 0] = t

nhmm = build_nhmm(seq, n_states=4, X=X, random_state=42)
nhmm = fit_nhmm(nhmm, n_iter=100, tol=1e-4, verbose=True)

print(nhmm.log_likelihood, nhmm.converged)
```

## R Counterpart

- **Closest R function:** seqHMM `fit_nhmm()`
- **Mapping note:** R uses analytical gradients and specialized optimizers; Sequenzo uses numerical optimization with forward–backward likelihood evaluation.

## Notes

- NHMM fitting is more demanding than basic HMM EM; start with simpler specifications (few covariates, fewer states).
- For difficult convergence, try [`fit_model_advanced()`](./fit-model-advanced.md) on an `NHMM` object.
- Low-level likelihood and gradient helpers (`forward_backward_nhmm`, `compute_gradient_nhmm`) exist for advanced use but are not part of the standard user workflow.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
