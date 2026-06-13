# Matrices in Dissimilarity Measures

Sequence analysis uses several matrices with similar names. This page separates the three that readers most often confuse: the substitution-cost matrix, the transition-rate matrix, and the distance matrix. It also shows how Sequenzo builds each one, so you can check intermediate results instead of treating the pipeline as a black box.

## The Three Matrices at a Glance

| Matrix | Shape | Where it appears | What it means |
| --- | --- | --- | --- |
| Substitution-cost matrix | states x states | `sm` in edit-based distances | Cost of replacing one state with another |
| Transition-rate matrix | states x states | Used to build `sm="TRATE"` | Observed transition probabilities in the data |
| Distance matrix | sequences x sequences | Output of `get_distance_matrix()` | Pairwise dissimilarities between sequences |

The first two are inputs that define what "different" means. The third is the output that downstream analyses consume.

## Substitution-Cost Matrix

A substitution-cost matrix tells an edit-distance method how expensive it is to replace one state with another. In Optimal Matching, for example, replacing `Education` with `Employment` may be cheaper than replacing `Education` with `Retirement` if the states are substantively closer.

In Sequenzo, the `sm` parameter controls substitution costs:

```python
distance_matrix = get_distance_matrix(
    seqdata=seq,
    method="OM",
    sm="TRATE",
    indel="auto",
)
```

You can pass a built-in method such as `"CONSTANT"` or `"TRATE"`, or supply your own square matrix whose rows and columns follow the order of `seq.states`.

With `sm="CONSTANT"`, every substitution between two different states costs the same value (`2` by default). This treats all states as equally far apart, which is a reasonable neutral choice when you have no theory about state proximity.

Internally, the cost matrix has one extra row and column for the missing-value state, so a five-state alphabet produces a `6 x 6` table. The diagonal is zero, because replacing a state with itself costs nothing.

## Transition-Rate Matrix

`"TRATE"` is a data-driven way to build substitution costs. Sequenzo first computes a transition-rate matrix from your data: for each pair of states `i` and `j`, the entry `p(i, j)` is the observed probability that state `i` at time `t` is followed by state `j` at time `t + 1`.

The substitution cost between two states is then:

$$
cost(i, j) = 2 - p(i \rightarrow j) - p(j \rightarrow i)
$$

States that frequently follow each other in the data receive low substitution costs because the data treat them as close. States that almost never follow each other receive costs near `2`, the same as the constant default. This is the same convention as TraMineR's `seqsubm(method = "TRATE")`.

Two practical consequences follow. First, TRATE costs are a description of your sample, so the same alphabet can produce different cost matrices in different datasets. Second, rare states have unstable transition estimates, so check the printed cost matrix when some states occur only a handful of times.

The transition-rate matrix is not the final distance matrix. It is an intermediate table used to define costs while comparing two sequences.

## Indel Costs and Their Relation to `sm`

Edit-based measures also need an insertion or deletion cost, the `indel` parameter. With `indel="auto"`, Sequenzo derives the value from the substitution costs: it uses half of the maximum substitution cost. With `sm="TRATE"` and the default scale, this gives an indel close to `1`, which matches the common rule of thumb of setting indel at half the substitution cost.

The ratio between indel and substitution costs shapes what the distance is sensitive to. Cheap indels let the algorithm shift sequences in time, which makes the distance more tolerant of timing differences. Expensive indels force substitutions, which makes the distance more timing-sensitive. The [Dissimilarity Measures](/en/tutorials/dissimilarity-measures) tutorial discusses this trade-off.

## Distance Matrix

The distance matrix is the final output of [`get_distance_matrix()`](/en/function-library/get-distance-matrix). It has one row and one column per sequence. Each cell is the distance between a pair of sequences.

```text
              person_1  person_2  person_3
person_1         0.00      2.40      5.10
person_2         2.40      0.00      3.70
person_3         5.10      3.70      0.00
```

Three properties are worth checking when you inspect one:

1. The diagonal is zero, because every sequence has zero distance to itself.
2. The matrix is symmetric, because the distance from A to B equals the distance from B to A.
3. The scale depends on the method, the costs, the sequence length, and the normalization. A raw OM distance of `5.1` is not comparable across studies unless those settings match. See [Normalizing Sequences](/en/tutorials/normalizing-sequences).

For `n` sequences the full matrix holds `n x n` values, which grows quickly. Ten thousand sequences already produce one hundred million cells. This is why large-data workflows such as [CLARA](/en/tutorials/understanding-clara) avoid materializing the full matrix.

This matrix is the input for clustering, discrepancy analysis, group comparison, and many downstream workflows.

## A Worked Example

The following snippet builds all three matrices for a small dataset and prints the intermediate cost table, so you can see the chain from data to costs to distances:

```python
from sequenzo import SequenceData, get_distance_matrix, load_dataset
from sequenzo.dissimilarity_measures import get_substitution_cost_matrix

df = load_dataset("country_co2_emissions_global_deciles")
time_cols = [col for col in df.columns if col != "country"]
states = [
    "D1 (Very Low)", "D2", "D3", "D4", "D5",
    "D6", "D7", "D8", "D9", "D10 (Very High)",
    "Missing",
]

seq = SequenceData(df, time=time_cols, id_col="country", states=states, labels=states)

# Inspect the substitution costs that TRATE would generate.
costs = get_substitution_cost_matrix(seq, method="TRATE")
print(costs["sm"])      # substitution-cost matrix
print(costs["indel"])   # derived indel cost

# The distance matrix uses the same construction internally.
distance_matrix = get_distance_matrix(seqdata=seq, method="OM", sm="TRATE", indel="auto")
print(distance_matrix.shape)
```

If a downstream result looks surprising, printing the substitution-cost matrix is often the fastest diagnostic. It shows directly which state pairs your distance treats as close.

## See Also

- [Dissimilarity Measures](/en/tutorials/dissimilarity-measures)
- [`get_distance_matrix()`](/en/function-library/get-distance-matrix)
- [Normalizing Sequences](/en/tutorials/normalizing-sequences)
- [Computational Complexity of Dissimilarity Measures](/en/tutorials/computational-complexity-of-dissimilarity-measures)

## References

Gabadinho, A., Ritschard, G., Muller, N. S., & Studer, M. (2011). Analyzing and visualizing state sequences in R with TraMineR. *Journal of Statistical Software*, 40(4), 1-37. https://doi.org/10.18637/jss.v040.i04

Studer, M., & Ritschard, G. (2016). What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures. *Journal of the Royal Statistical Society: Series A*, 179(2), 481-511. https://doi.org/10.1111/rssa.12125
