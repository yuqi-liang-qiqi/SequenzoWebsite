# `plot_hmm()`

`plot_hmm()` visualizes fitted HMM parameters: transition matrix, emission matrix, initial probabilities, or a seqHMM-style network graph with pie-chart nodes.

## Function Usage

```python
plot_hmm(
    model,
    which="transition",
    figsize=None,
    ax=None,
    vertex_size=50,
    vertex_label_dist=1.5,
    edge_curved=0.5,
    edge_label_cex=0.8,
    vertex_label="initial.probs",
    loops=False,
    trim=1e-15,
    combine_slices=0.05,
    with_legend="bottom",
    layout="horizontal",
    **kwargs
)
```

## seqHMM Parameter Mapping

| Sequenzo | seqHMM `plot.hmm()` |
| --- | --- |
| `model` | Fitted `hmm` object |
| `which="network"` | Default graph view in R |
| `which="transition"` / `"emission"` / `"initial"` | Matrix-style parameter plots |
| `vertex_size`, `edge_curved`, `loops`, `trim`, `combine_slices`, `with_legend`, `layout` | Network layout controls (R `plot.hmm` arguments) |

## Entry Parameters

| Parameter | Required | Type | Description |
| --- | --- | --- | --- |
| `model` | ✓ | `HMM` | Fitted HMM object. |
| `which` | ✗ | `str` | `"transition"`, `"emission"`, `"initial"`, `"network"`, or `"all"`. Default `"transition"`. |
| `figsize` | ✗ | `tuple` / `None` | Matplotlib figure size `(width, height)`. |
| `ax` | ✗ | `Axes` / `None` | Existing axes to draw on. |
| `vertex_size` | ✗ | `float` | Node size for `which="network"`. |
| `vertex_label_dist` | ✗ | `float` | Label offset for network nodes. |
| `edge_curved` | ✗ | `bool` / `float` | Curved transition arrows in network plot. |
| `edge_label_cex` | ✗ | `float` | Font scale for edge labels. |
| `vertex_label` | ✗ | `str` | `"initial.probs"`, `"names"`, or custom labels. |
| `loops` | ✗ | `bool` | Draw self-loop transitions. |
| `trim` | ✗ | `float` | Hide transitions below this probability. |
| `combine_slices` | ✗ | `float` | Combine small emission slices into "others" in pie nodes. |
| `with_legend` | ✗ | `bool` / `str` | Legend placement: `True`, `False`, or `"bottom"` / `"top"` / `"left"` / `"right"`. |
| `layout` | ✗ | `str` | `"horizontal"` or `"vertical"` network layout. |
| `**kwargs` | ✗ | any | Extra arguments passed to the network plot. |

## Returns

A matplotlib `Figure` object. Call `plt.show()` in scripts, or display in a notebook.

## Example

Assume `seq` is a prepared [`SequenceData`](../function-library/sequence-data.md) object with the observed sequences you want to model.

```python
from sequenzo.seqhmm import build_hmm, fit_model, plot_hmm
import matplotlib.pyplot as plt

hmm = build_hmm(seq, n_states=4, random_state=42)
hmm = fit_model(hmm)

# seqHMM-style network graph
plot_hmm(hmm, which="network", vertex_size=50, edge_curved=0.5)
plt.show()

# All matrix panels
plot_hmm(hmm, which="all")
plt.show()
```

## R Counterpart

- **Closest R function:** seqHMM `plot.hmm()`
- **Mapping note:** Network view mirrors R's default parameter graph; matrix heatmaps are Sequenzo extensions via `which`.

## Notes

- Best used after fitting so plotted values reflect estimated parameters.
- Network plots require optional `networkx` for layout; matrix plots work without it.
- For mixture models, use [`plot_mhmm()`](./plot-mhmm.md).

## See Also

- [Markov Chain Models Introduction](/en/markov-chain-models/introduction) maps the full HMM-family workflow.
- [Model Comparison](/en/markov-chain-models/model-comparison) helps choose between fitted models.
- [Sequenzo and seqHMM Mapping](/en/markov-chain-models/seqhmm-function-mapping) gives the R correspondence.

## Authors

Code: Yuqi Liang

Documentation: Yuqi Liang

## References

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. *Journal of Statistical Software*, 88(3), 1–32.
