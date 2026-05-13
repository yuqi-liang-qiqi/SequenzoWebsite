# `fit_mhmm()`

`fit_mhmm()` estimates Mixture HMM parameters with EM. The E-step computes posterior cluster responsibilities; the M-step updates mixture weights and each cluster's HMM parameters.

## Function Usage

```python
fit_mhmm(
    model,
    n_iter=100,
    tol=1e-2,
    verbose=False
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM |
| --- | --- |
| `model` | `mhmm` object |
| `n_iter`, `tol`, `verbose` | `fit_model.mhmm` EM controls |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `MHMM` | Model from [`build_mhmm()`](./build-mhmm.md). |
| `n_iter` | ✗ | `int` | Maximum EM iterations. Default `100`. |
| `tol` | ✗ | `float` | Log-likelihood convergence tolerance. Default `1e-2`. |
| `verbose` | ✗ | `bool` | Print progress. Default `False`. |

## What It Returns

The same `MHMM` object, modified in place:

| Attribute | Meaning |
| --- | --- |
| `log_likelihood` | Fitted mixture log-likelihood |
| `cluster_probs` | Estimated mixture weights |
| `clusters[k].*` | Fitted parameters for cluster `k` |
| `n_iter`, `converged` | Optimization diagnostics |

## Example

```python
from sequenzo.seqhmm import build_mhmm, fit_mhmm, predict_mhmm

mhmm = build_mhmm(seq, n_clusters=3, n_states=4, random_state=42)
mhmm = fit_mhmm(mhmm, n_iter=100, tol=1e-2, verbose=True)

print(mhmm.log_likelihood, mhmm.cluster_probs)
clusters = predict_mhmm(mhmm)
```

## R Counterpart

- **Closest R function:** seqHMM `fit_model()` for `mhmm` objects
- **Mapping note:** Same EM structure; R may combine with global/local refinement via [`fit_model_advanced()`](./fit-model-advanced.md) in Sequenzo.

## Notes

- Cluster labels from EM can be **label-switching** sensitive across runs; compare solutions with BIC and interpret cluster-specific parameters, not just index order.
- Use [`compare_models()`](./model-comparison.md#compare_models) to choose `n_clusters` and `n_states`.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
