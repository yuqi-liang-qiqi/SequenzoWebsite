# Big Data Tools

Large sequence datasets require choices about scalability and sampling. This section covers tools for deciding whether a full distance matrix is feasible and when to use CLARA-style clustering instead.

## Choose a Tool

| Question | Start with |
| --- | --- |
| Are many sequences duplicated, and can that help computation? | [Check Uniqueness Rate](/en/big-data/check-uniqueness-rate) |
| How do I cluster a large single-domain sequence dataset? | [CLARA](/en/big-data/clara) |
| How do I scale multidomain sequence data? | [Scaling Multidomain Workflows](/en/big-data/multidomain-clara) |

## Recommended Order

Check uniqueness first, then choose whether a full distance matrix is realistic. If a full matrix is too expensive, use CLARA for single-domain workflows. For multidomain data, use the scaling guide to choose IDCD, CAT, or DAT, then pilot memory and runtime before full analysis.

## Authors
