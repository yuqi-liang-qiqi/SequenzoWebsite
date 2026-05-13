# Model Comparison: `aic()`, `bic()`, and `compare_models()`

After fitting one or more HMMs, use information criteria to compare specifications (for example different numbers of hidden states or clusters). Lower AIC or BIC generally indicates a better trade-off between fit and complexity.

## `aic()`

### Function Usage

```python
aic(model, log_likelihood=None)
```

### seqHMM Mapping

Equivalent to `stats::AIC(logLik(model))` in R after fitting a seqHMM object.

### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` / `MHMM` / `NHMM` | Fitted model. |
| `log_likelihood` | ✗ | `float` / `None` | Override log-likelihood; default uses `model.log_likelihood`. |

### Returns

`float`: AIC = −2 × log-likelihood + 2 × n_parameters.

---

## `bic()`

### Function Usage

```python
bic(model, log_likelihood=None)
```

### seqHMM Mapping

Equivalent to `stats::BIC(logLik(model))` in R.

### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` / `MHMM` / `NHMM` | Fitted model. |
| `log_likelihood` | ✗ | `float` / `None` | Override log-likelihood. |

### Returns

`float`: BIC = −2 × log-likelihood + log(n_observations) × n_parameters.

BIC penalizes complexity more strongly than AIC when the sample is large.

---

## `compare_models()`

### Function Usage

```python
compare_models(models, criterion="BIC")
```

### seqHMM Mapping

No single exported R function; typical workflow compares `logLik`, `AIC`, and `BIC` across fitted models manually.

### Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `models` | ✓ | `list` | List of fitted `HMM`, `MHMM`, or `NHMM` objects. |
| `criterion` | ✗ | `str` | `"AIC"` or `"BIC"`. Default `"BIC"`. |

### Returns

A `dict`:

| Key | Description |
| --- | --- |
| `criterion` | `"AIC"` or `"BIC"` |
| `models` | Sorted list of dicts with `model`, `log_likelihood`, `n_parameters`, `n_observations`, and criterion value |
| `best_model` | Label of the lowest-criterion model (`"Model 1"`, …) |

---

## Helper Functions

### `compute_n_parameters(model)`

Counts free parameters (accounting for simplex constraints on probability rows). Used internally by `aic()` and `bic()`.

### `compute_n_observations(model)`

Counts effective observations. For multichannel HMM, each fully observed time point counts as one observation (channels are pooled per seqHMM convention).

---

## Example: Choose the Number of Hidden States

```python
from sequenzo.seqhmm import build_hmm, fit_model, aic, bic, compare_models

models = []
for n in [3, 4, 5, 6]:
    hmm = build_hmm(seq, n_states=n, random_state=42)
    hmm = fit_model(hmm, verbose=False)
    models.append(hmm)

comparison = compare_models(models, criterion="BIC")
print(comparison["best_model"])

for i, m in enumerate(models):
    print(f"n_states={3+i}: AIC={aic(m):.1f}, BIC={bic(m):.1f}")
```

## Notes

- All models must be fitted before comparison.
- Compare models fit on the **same data** and intended for the **same question** (do not mix HMM and MHMM unless you have a clear reason).
- BIC is often preferred for choosing the number of states/clusters; AIC can be less conservative.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
