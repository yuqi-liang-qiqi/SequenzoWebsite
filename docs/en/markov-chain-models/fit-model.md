# `fit_model()`

`fit_model()` estimates HMM parameters (initial, transition, and emission probabilities) from the observations attached at build time. It uses the Expectation–Maximization (EM) algorithm.

## Function Usage

```python
fit_model(
    model,
    n_iter=100,
    tol=1e-2,
    verbose=False
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `fit_model()` |
| --- | --- |
| `model` | Fitted object target (`hmm` class in R) |
| `n_iter` | Maximum EM iterations (`maxit`-style control) |
| `tol` | Log-likelihood convergence threshold |
| `verbose` | Print iteration progress |

For global/local optimization steps available in R's `fit_model()`, use [`fit_model_advanced()`](./fit-model-advanced.md) instead.

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` | Model created by [`build_hmm()`](./build-hmm.md). |
| `n_iter` | ✗ | `int` | Maximum EM iterations. Default `100`. |
| `tol` | ✗ | `float` | Stop when the gain in log-likelihood falls below this value. Default `1e-2`. |
| `verbose` | ✗ | `bool` | Print iteration log. Default `False`. |

## Returns

The same `HMM` object, modified in place. After fitting, inspect:

| Attribute | Meaning |
| --- | --- |
| `log_likelihood` | Fitted log-likelihood |
| `n_iter` | Number of EM iterations run |
| `converged` | Whether the tolerance criterion was met |
| `initial_probs`, `transition_probs`, `emission_probs` | Estimated parameters |

## Example

```python
from sequenzo import SequenceData, load_dataset
from sequenzo.seqhmm import build_hmm, fit_model

df = load_dataset("mvad")
time_cols = list(df.columns[14:])
states = ["employment", "FE", "HE", "joblessness", "school", "training"]
seq = SequenceData(df, time=time_cols, states=states)

hmm = build_hmm(seq, n_states=4, random_state=42)
hmm = fit_model(hmm, n_iter=100, tol=1e-2, verbose=True)

print(hmm.log_likelihood, hmm.converged, hmm.n_iter)
```

## R Counterpart

- **Closest R function:** seqHMM `fit_model()` with EM step only
- **Mapping note:** R also supports `global_step` and `local_step`; in Sequenzo use [`fit_model_advanced()`](./fit-model-advanced.md).

## Notes

- The model must be built with [`build_hmm()`](./build-hmm.md) before fitting.
- If EM stalls below tolerance, increase `n_iter` or try [`fit_model_advanced()`](./fit-model-advanced.md) with random restarts.
- Multichannel fitting uses a pure-Python EM implementation and may be slower on large samples.

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
