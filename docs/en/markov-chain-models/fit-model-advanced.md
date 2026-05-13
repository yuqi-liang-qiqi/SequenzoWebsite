# `fit_model_advanced()`

`fit_model_advanced()` runs a multi-stage optimization pipeline: optional EM warm-start, global search, local refinement, and random restarts. Use it when standard [`fit_model()`](./fit-model.md) EM stalls in a poor local optimum.

## Function Usage

```python
fit_model_advanced(
    model,
    em_step=True,
    global_step=False,
    local_step=False,
    n_iter=100,
    tol=1e-2,
    n_restarts=0,
    verbose=False,
    random_state=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `fit_model(...)` |
| --- | --- |
| `em_step` | EM initialization / refinement |
| `global_step` | Global optimization (MLSL in R) |
| `local_step` | Local optimization (L-BFGS in R) |
| `n_restarts` | Random restarts with new initials |
| `n_iter`, `tol` | Iteration and tolerance controls |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` / `MHMM` / `NHMM` | Unfitted or partially fitted model. |
| `em_step` | ✗ | `bool` | Run EM first. Default `True`. |
| `global_step` | ✗ | `bool` | Global optimization after EM. Default `False`. |
| `local_step` | ✗ | `bool` | L-BFGS polish after EM/global. Default `False`. |
| `n_iter` | ✗ | `int` | Iteration cap for EM/local steps. Default `100`. |
| `tol` | ✗ | `float` | Convergence tolerance. Default `1e-2`. |
| `n_restarts` | ✗ | `int` | Extra random restarts; keeps best log-likelihood. Default `0`. |
| `verbose` | ✗ | `bool` | Print progress. |
| `random_state` | ✗ | `int` / `None` | Seed for restarts. |

## What It Returns

The fitted model object with the best log-likelihood found across restarts and stages.

## Example

```python
from sequenzo.seqhmm import build_hmm, fit_model_advanced

hmm = build_hmm(seq, n_states=4, random_state=42)

hmm = fit_model_advanced(
    hmm,
    em_step=True,
    global_step=True,
    local_step=True,
    n_restarts=5,
    verbose=True,
    random_state=42,
)

print(hmm.log_likelihood, hmm.converged)
```

## R Counterpart

- **Closest R function:** seqHMM `fit_model()` with `global_step` and `local_step` enabled
- **Mapping note:** R uses `nloptr` MLSL; Sequenzo uses `scipy.optimize` (differential evolution / L-BFGS).

## Notes

- Global and local steps are slower than EM alone; enable them when EM log-likelihood is unstable across `random_state` values.
- Works with `HMM`, `MHMM`, and `NHMM`, but runtime grows quickly for NHMM.
- For routine basic HMM work, [`fit_model()`](./fit-model.md) is usually sufficient.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
