# Cluster Quality Indicators

After clustering a set of sequences, you still need to decide how many clusters to keep. Three clusters may be too coarse, six may be too detailed, and a dendrogram rarely answers the question on its own. Cluster quality indicators help you compare several candidate values of `k` with the same distance matrix.

## The Question They Answer

A clustering algorithm will return a solution for any `k` you ask for. A cluster quality indicator scores that solution so you can compare nearby options, such as `k = 3`, `k = 4`, and `k = 5`. The numbers should guide the decision, not replace substantive judgment. A good cluster solution should score reasonably well and produce groups that you can describe from plots and domain knowledge.

## Silhouette Width

Silhouette width is the indicator most often reported in sequence analysis. For each sequence, it compares two quantities:

- `a(i)`: the average distance from sequence `i` to the other sequences in its own cluster.
- `b(i)`: the smallest average distance from sequence `i` to any other cluster.

The silhouette value is:

$$
s(i) = \frac{b(i) - a(i)}{\max\{a(i), b(i)\}}.
$$

The value ranges from `-1` to `1`.

| Value | Interpretation |
| --- | --- |
| Close to `1` | The sequence is much closer to its own cluster than to the nearest alternative. |
| Around `0` | The sequence lies near a boundary between clusters. |
| Below `0` | The sequence is, on average, closer to another cluster than to its assigned cluster. |

The average silhouette width, often abbreviated as ASW, averages `s(i)` across all sequences. Sequenzo also reports ASWw, a weighted version that accounts for sequence weights.

Silhouette values in life-course sequence analysis are often lower than in numeric clustering. Real trajectories overlap, categorical distances are noisy, and clusters may be stretched rather than compact. Treat cutoffs as rough guidance: values above about `0.5` usually indicate clear structure, values around `0.25` to `0.5` can still be useful, and values near `0` suggest that the grouping is weak.

## Other Indicators

`ClusterQuality()` reports several indicators because each one looks at the clustering from a different angle.

| Indicator | What it checks | Preferred direction |
| --- | --- | --- |
| ASW | Whether sequences are closer to their own cluster than to neighboring clusters | Higher |
| ASWw | Weighted average silhouette width | Higher |
| PBC | Association between distances and same-cluster versus different-cluster pairs | Higher |
| HG | Rank association between the distance matrix and the cluster partition | Higher |
| CH | Ratio of between-cluster separation to within-cluster dispersion | Higher |
| R2 | Share of distance variation accounted for by the partition | Higher |
| HC | Deviation from an ideal partition at the same `k` | Lower |

These indicators often disagree. That disagreement is useful: it tells you when the data do not contain one obvious answer.

## A Practical Workflow

1. Compute indicators for a range of plausible cluster counts.
2. Use ASW as the first diagnostic, but inspect PBC, CH, R2, and HC as checks.
3. Plot state distributions or index plots for the best two or three candidate values of `k`.
4. Choose the solution that balances indicator scores, interpretability, cluster sizes, and your research question.

Avoid choosing a cluster count only because one indicator reaches a maximum. A two-cluster solution can have a higher ASW simply because it is broad, while a four-cluster solution may be more useful if it separates substantively different trajectories.

## Computing Indicators in Sequenzo

```python
from sequenzo import get_distance_matrix, Cluster, ClusterQuality

# seq is a SequenceData object; see the Quickstart for the full setup.
distance_matrix = get_distance_matrix(seqdata=seq, method="OM", sm="TRATE", indel="auto")

cluster = Cluster(
    matrix=distance_matrix,
    entity_ids=seq.ids,
    clustering_method="average",
)

quality = ClusterQuality(cluster, max_clusters=12)
quality.compute_cluster_quality_scores()

print(quality.get_cqi_table())
quality.plot_cqi_scores(norm="zscore")
```

The table lists the cluster count favored by each indicator. The plot shows how the indicators change as `k` increases. When the lines point to a small set of neighboring values, inspect those cluster solutions visually before deciding.

## See Also

- [`ClusterQuality()`](/en/function-library/cluster-quality) documents the API.
- [`Cluster()`](/en/function-library/hierarchical-clustering) builds the hierarchical clustering model.
- [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) explains the distance matrix these indicators evaluate.
- [State Distribution Plot](/en/visualization/state-distribution-plot) and [Index Plot](/en/visualization/index-plot) help inspect candidate cluster solutions.

## References

Rousseeuw, P. J. (1987). Silhouettes: A graphical aid to the interpretation and validation of cluster analysis. *Journal of Computational and Applied Mathematics*, 20, 53-65. [https://doi.org/10.1016/0377-0427(87)90125-7](https://doi.org/10.1016/0377-0427%2887%2990125-7)

Studer, M. (2013). WeightedCluster library manual: A practical guide to creating typologies of trajectories in the social sciences with R. *LIVES Working Papers*, 24. https://doi.org/10.12682/lives.2296-1658.2013.24
