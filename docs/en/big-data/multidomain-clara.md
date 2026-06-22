# Scaling Multidomain Workflows

Large multidomain projects need extra care because each person may have several aligned trajectories, such as work, family, and education. Sequenzo currently supports multidomain distances and combined-domain representations, while the CLARA shortcut is stable for single-domain `SequenceData` objects.

Use this page as a planning guide before starting a large multidomain analysis.

## At a Glance

| Question | Guidance |
| --- | --- |
| Single-domain data too large for a full distance matrix? | Use [`clara()`](/en/big-data/clara). |
| Multiple aligned domains? | Build CAT, DAT, or IDCD representations first. |
| Need clustering after IDCD? | Treat the IDCD result as the working sequence representation, then use the usual distance and clustering workflow. |
| Need CAT or DAT on very large data? | Start with uniqueness checks, sampling, and memory tests before computing full matrices. |

## Recommended Order

1. **Check duplication first.** Run [`check_uniqueness_rate()`](/en/big-data/check-uniqueness-rate) for each domain. Repeated trajectories can make full distance computation much cheaper than the raw sample size suggests.
2. **Choose a multidomain representation.** Use [IDCD](/en/multidomain/idcd-sequence) for a combined-state sequence, [CAT](/en/multidomain/cat-distance-matrix) for aligned domain comparison, or [DAT](/en/multidomain/dat-distance-matrix) when each domain needs its own distance specification.
3. **Pilot on a subset.** Estimate memory, runtime, and cluster stability before scaling to the full sample.
4. **Cluster only after the representation is clear.** For IDCD-style workflows, continue with the standard distance matrix and clustering pages. For CAT or DAT, confirm that the full multidomain distance matrix is feasible.
5. **Report the constraint.** In large multidomain studies, document sample size, number of time points, states per domain, uniqueness rates, and the scaling strategy.

## Practical Choices

| Situation | Suggested path |
| --- | --- |
| One domain, many observations | [`clara()`](/en/big-data/clara) |
| Several domains with interpretable joint states | [IDCD Sequence](/en/multidomain/idcd-sequence), then ordinary clustering |
| Several domains compared at the same time points | [CAT Distance Matrix](/en/multidomain/cat-distance-matrix) |
| Several domains with different distance settings | [DAT Distance Matrix](/en/multidomain/dat-distance-matrix) |
| Many rare combined states | [Merge Sparse CombT Types](/en/multidomain/merge-sparse-combt-types) before interpretation |

## Important Limit

Do not import `md_clara()` or `sequenzo.multidomain.clara` in the current public package. Those names are not part of the released API. If you need a large multidomain analysis today, use the supported multidomain pages above and validate feasibility with a pilot run.

## Related Pages

- [`CLARA`](/en/big-data/clara)
- [`Check Uniqueness Rate`](/en/big-data/check-uniqueness-rate)
- [`IDCD Sequence`](/en/multidomain/idcd-sequence)
- [`CAT Distance Matrix`](/en/multidomain/cat-distance-matrix)
- [`DAT Distance Matrix`](/en/multidomain/dat-distance-matrix)
- [`Combined Typology`](/en/multidomain/combined-typology)

## See Also

- [Big Data Tools](/en/big-data/introduction) maps nearby scalability tools.
- [Multidomain Overview](/en/multidomain/introduction) explains the multidomain workflow.

## Authors

