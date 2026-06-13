# `plot_mhmm()`

`plot_mhmm()` visualizes mixture weights and per-cluster transition or emission matrices for a fitted MHMM.

## Function Usage

```python
plot_mhmm(
    model,
    which="clusters",
    figsize=None,
    ax=None
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `plot.mhmm()` |
| --- | --- |
| `model` | Fitted `mhmm` object |
| `which="clusters"` | Mixture weight bar chart |
| `which="transition"` / `"emission"` | Per-cluster parameter panels |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `MHMM` | Fitted mixture model. |
| `which` | ✗ | `str` | `"clusters"`, `"transition"`, `"emission"`, or `"all"`. Default `"clusters"`. |
| `figsize` | ✗ | `tuple` / `None` | Figure size. |
| `ax` | ✗ | `Axes` / `None` | Existing matplotlib axes. |

## Returns

A matplotlib `Figure`.

## Example

Assume `seq` is a prepared [`SequenceData`](../function-library/sequence-data.md) object with the observed sequences you want to model.

```python
from sequenzo.seqhmm import build_mhmm, fit_mhmm, plot_mhmm
import matplotlib.pyplot as plt

mhmm = build_mhmm(seq, n_clusters=3, n_states=4, random_state=42)
mhmm = fit_mhmm(mhmm)

plot_mhmm(mhmm, which="all")
plt.show()
```

## R Counterpart

- **Closest R function:** seqHMM `plot.mhmm()`
- **Mapping note:** Sequenzo uses matplotlib heatmaps; R uses igraph-based layouts per cluster.

## Notes

- Model must be fitted before plotting.
- For single HMM graphs, use [`plot_hmm()`](./plot-hmm.md).

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
