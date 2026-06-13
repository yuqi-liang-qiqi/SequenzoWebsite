# Prefix and Suffix Trees

Prefix and suffix trees describe how sequence paths branch apart or merge together over time.

- A **prefix tree** reads trajectories from the beginning and studies divergence.
- A **suffix tree** reads trajectories from the end and studies convergence.

These tools complement distance measures such as `LCP`, `RLCP`, `LCPspell`, and `RLCPspell`: the distance tells you how similar two sequences are, while the tree shows where collective branching or merging happens.

## Conceptual Use

| Research question | Direction | Main functions |
| --- | --- | --- |
| When do trajectories start to diverge? | Forward | `build_prefix_tree()`, `compute_prefix_count()`, `IndividualDivergence` |
| When do trajectories converge toward common endings? | Backward | `build_suffix_tree()`, `compute_suffix_count()`, `IndividualConvergence` |
| Are spell patterns more informative than calendar positions? | Spell-based | `build_spell_prefix_tree()`, `build_spell_suffix_tree()` |
| Which individuals follow rare paths? | Individual level | `SpellIndividualDivergence`, `SpellIndividualConvergence` |

## Import

```python
from sequenzo import (
    build_prefix_tree,
    build_suffix_tree,
    compute_prefix_count,
    compute_suffix_count,
    IndividualDivergence,
    IndividualConvergence,
    SpellIndividualDivergence,
    SpellIndividualConvergence,
)
```

For clarity, helper names shared by prefix and suffix modules can also be imported from the subpackages:

```python
from sequenzo.prefix_tree import get_depth_stats as get_prefix_depth_stats
from sequenzo.suffix_tree import get_depth_stats as get_suffix_depth_stats
```

## Prefix Trees: Divergence

```python
from sequenzo import (
    build_prefix_tree,
    compute_prefix_count,
    compute_branching_factor,
    compute_js_divergence,
    IndividualDivergence,
)

tree = build_prefix_tree(seqdata, mode="position")
prefix_counts = compute_prefix_count(tree, max_depth=len(seqdata.time))
branching = compute_branching_factor(tree, max_depth=len(seqdata.time))

divergence = IndividualDivergence(tree.sequences)
rarity = divergence.compute_prefix_rarity_score()
```

Use prefix trees when early pathway differences matter: for example, early educational sorting, early career divergence, or early transitions into care responsibilities.

## Suffix Trees: Convergence

```python
from sequenzo import (
    build_suffix_tree,
    compute_suffix_count,
    compute_merging_factor,
    compute_js_convergence,
    IndividualConvergence,
)

tree = build_suffix_tree(seqdata, mode="position")
suffix_counts = compute_suffix_count(tree, max_depth=len(seqdata.time))
merging = compute_merging_factor(tree, max_depth=len(seqdata.time))

convergence = IndividualConvergence(tree.sequences)
typical_endings = convergence.compute_suffix_rarity_score()
```

Use suffix trees when shared endings matter: for example, convergence into stable employment, repeated retirement endpoints, or common late-life family states.

## Position Mode vs. Spell Mode

| Mode | Level means | Best for |
| --- | --- | --- |
| `position` | Calendar or panel time index | Fixed observation windows with meaningful time columns |
| `spell` | Ordered spell index | Comparing state runs when duration and calendar alignment differ |

Spell mode requires `SequenceData` so Sequenzo can recover state runs and durations.

```python
from sequenzo import (
    SpellPrefixTree,
    SpellSuffixTree,
    build_spell_prefix_tree,
    build_spell_suffix_tree,
    compute_js_divergence_spell,
    compute_js_convergence_spell,
)

prefix_spell_tree = build_spell_prefix_tree(seqdata, expcost=0)
suffix_spell_tree = build_spell_suffix_tree(seqdata, expcost=0)
```

Set `expcost > 0` when longer spells should influence spell-level divergence or convergence indicators.

## Individual-Level Indicators

Prefix and suffix trees expose individual-level rarity indicators:

```python
from sequenzo import SpellIndividualDivergence, SpellIndividualConvergence

div = SpellIndividualDivergence(prefix_spell_tree)
conv = SpellIndividualConvergence(suffix_spell_tree)

divergence_scores = div.compute_prefix_rarity_score()
convergence_scores = conv.compute_suffix_rarity_score()
```

These scores are useful for identifying unusually early divergence, unusually typical endings, and cases that should be inspected before clustering.

## Advanced Helpers and Plots

| Helper | Use |
| --- | --- |
| `extract_sequences()` | Convert a DataFrame and time columns into list-of-list sequences for tree construction |
| `get_state_space()` | Derive the observed state space from extracted sequences |
| `convert_to_prefix_tree_data()` | Prepare DataFrame input for prefix-tree analysis |
| `convert_to_suffix_tree_data()` | Prepare DataFrame input for suffix-tree analysis |
| `plot_system_indicators()` | Plot prefix-tree system indicators for one group |
| `plot_system_indicators_multiple_comparison()` | Compare prefix-tree system indicators across groups |
| `plot_prefix_rarity_distribution()` | Plot individual prefix-rarity score distributions |
| `plot_suffix_rarity_distribution()` | Plot individual suffix-rarity score distributions |
| `plot_individual_indicators_correlation()` | Plot correlations among individual-level indicators |

The low-level Jensen-Shannon helpers `compute_js_divergence()` and `compute_js_convergence()` operate on extracted sequences and state sets. The spell-level variants `compute_js_divergence_spell()` and `compute_js_convergence_spell()` are used with `SpellPrefixTree` and `SpellSuffixTree`.

## Relationship to Distance Measures

| Tree tool | Related distance |
| --- | --- |
| Prefix tree in position mode | `LCP` |
| Suffix tree in position mode | `RLCP` |
| Spell prefix tree | `LCPspell` |
| Spell suffix tree | `RLCPspell` |

Use [`get_distance_matrix()`](/en/function-library/get-distance-matrix) when the output should be a pairwise distance matrix. Use trees when the output should explain collective branching, convergence, or individual rarity.

## Authors

Code: Yuqi Liang

