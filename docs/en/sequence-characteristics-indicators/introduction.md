# Sequence Characteristics Indicators

Sequence characteristics indicators summarize the shape of each individual trajectory. They are useful before clustering, when describing typologies, or when turning sequences into variables for downstream models.

## Choose an Indicator Family

| Question | Useful pages |
| --- | --- |
| How long are the observed trajectories? | [Sequence Length](/en/sequence-characteristics-indicators/sequence-length) |
| How long do states or spells last? | [Spell Durations](/en/sequence-characteristics-indicators/spell-durations), [Mean Spell Duration](/en/sequence-characteristics-indicators/mean-spell-duration), [Duration Standard Deviation](/en/sequence-characteristics-indicators/duration-standard-deviation) |
| How many states or subsequences appear? | [Visited States](/en/sequence-characteristics-indicators/visited-states), [Number of Subsequences](/en/sequence-characteristics-indicators/number-of-subsequences) |
| How complex or unstable is a trajectory? | [Within-Sequence Entropy](/en/sequence-characteristics-indicators/within-sequence-entropy), [Complexity Index](/en/sequence-characteristics-indicators/complexity-index), [Turbulence](/en/sequence-characteristics-indicators/turbulence), [Volatility](/en/sequence-characteristics-indicators/volatility) |
| How do states change over time? | [Number of Transitions](/en/sequence-characteristics-indicators/number-of-transitions), [Cross-Sectional Entropy](/en/sequence-characteristics-indicators/cross-sectional-entropy) |
| Do trajectories move toward better or worse states? (requires a ranked state order) | [Positive-Negative Indicators](/en/sequence-characteristics-indicators/positive-negative-indicators), [Integration Index](/en/sequence-characteristics-indicators/integration-index), [Badness Index](/en/sequence-characteristics-indicators/badness-index), [Degradation Index](/en/sequence-characteristics-indicators/degradation-index), [Precarity Index](/en/sequence-characteristics-indicators/precarity-index), [Insecurity Index](/en/sequence-characteristics-indicators/insecurity-index) |
| How do I translate familiar TraMineR indicators? | [Sequenzo and TraMineR Mapping](/en/sequence-characteristics-indicators/traminer-function-mapping) |

## How to Use Indicators

Sequence characteristics indicators can be reported descriptively, plotted by group, used to interpret clusters, or passed into feature-selection and regression workflows. Use distance-based methods when the research question is about the whole sequence structure, and use indicators when a smaller number of interpretable sequence features is enough.

## Authors
