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

## What It Returns

The same `NHMM` object, modified in place:

| Attribute | Meaning |
| --- | --- |
| `log_likelihood` | Fitted log-likelihood |
| `eta_pi`, `eta_A`, `eta_B` | Estimated coefficient matrices |
| `n_iter`, `converged` | Optimization diagnostics |

## Example

```python
from sequenzo.seqhmm import build_nhmm, fit_nhmm

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

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
