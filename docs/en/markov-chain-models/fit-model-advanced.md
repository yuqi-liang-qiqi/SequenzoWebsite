# `fit_model_advanced()`

`fit_model_advanced()` runs an advanced fitting workflow with optional EM warm-start, random restarts, and model-family-specific refinement. Use it when standard [`fit_model()`](./fit-model.md) EM stalls in a poor local optimum.

For basic HMM and MHMM objects, the practical benefit is mainly random restarts and additional EM refinement. Global and L-BFGS-style local optimization are mainly relevant to NHMM-style coefficient models.

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
| `global_step` | Global optimization when supported by the model family |
| `local_step` | Local refinement when supported by the model family |
| `n_restarts` | Random restarts with new initials |
| `n_iter`, `tol` | Iteration and tolerance controls |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` / `MHMM` / `NHMM` | Unfitted or partially fitted model. |
| `em_step` | ✗ | `bool` | Run EM first. Default `True`. |
| `global_step` | ✗ | `bool` | Global optimization after EM when implemented for the model family. Default `False`. |
| `local_step` | ✗ | `bool` | Local refinement after EM/global. For HMM/MHMM this is additional EM-style refinement; for NHMM it can use coefficient optimization. Default `False`. |
| `n_iter` | ✗ | `int` | Iteration cap for EM/local steps. Default `100`. |
| `tol` | ✗ | `float` | Convergence tolerance. Default `1e-2`. |
| `n_restarts` | ✗ | `int` | Extra random restarts; keeps best log-likelihood. Default `0`. |
| `verbose` | ✗ | `bool` | Print progress. |
| `random_state` | ✗ | `int` / `None` | Seed for restarts. |

## Returns

The fitted model object with the best log-likelihood found across restarts and stages.

## Example

Assume `seq` is a prepared [`SequenceData`](../function-library/sequence-data.md) object with the observed sequences you want to model.

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
- **Mapping note:** R uses `nloptr` MLSL for supported global/local optimization paths. In Sequenzo, global and L-BFGS-style behavior is mainly NHMM-oriented; HMM/MHMM workflows rely on EM refinement and restarts.

## Notes

- Extra optimization stages are slower than EM alone; enable them when log-likelihood is unstable across `random_state` values.
- Works with `HMM`, `MHMM`, and `NHMM`, but the meaning of `global_step` and `local_step` depends on the model family. Runtime grows quickly for NHMM.
- For routine basic HMM work, [`fit_model()`](./fit-model.md) is usually sufficient.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
