# Large Data and Robustness

Large sequence datasets require choices about scalability, sampling, and sensitivity checks. This section covers tools for deciding whether a full distance matrix is feasible, running CLARA-style clustering, and checking robustness to timing uncertainty.

## Choose a Tool

| Question | Start with |
| --- | --- |
| Are many sequences duplicated, and can that help computation? | [Check Uniqueness Rate](/en/big-data/check-uniqueness-rate) |
| How do I cluster a large single-domain sequence dataset? | [CLARA](/en/big-data/clara) |
| How do I scale multidomain sequence data? | [Scaling Multidomain Workflows](/en/big-data/multidomain-clara) |
| How sensitive are distance matrices to transition-timing error? | [Timing Uncertainty](/en/uncertainty/timing-uncertainty) |

## Recommended Order

Check uniqueness first, then choose whether a full distance matrix is realistic. If a full matrix is too expensive, use CLARA. If timing measurement error is a concern, use timing uncertainty diagnostics before making strong claims about distance-based results.

## Authors

