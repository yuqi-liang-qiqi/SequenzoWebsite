# Sequence Analysis Multi-state Model

Sequence Analysis Multi-state Models (SAMM) connect sequence analysis with event history analysis. They are useful when a research question is not only about whether a transition happens, but also about what kind of short trajectory follows that transition.

## The Problem SAMM Solves

Classic event history analysis models transitions as point events. For example, it can estimate the hazard of moving from education into employment. That is useful, but it treats two very different futures as the same event if both begin with the same first transition.

Classic sequence analysis can describe the whole path after graduation, but whole-trajectory clustering can blur time order. If a child is born several years after graduation, using that later event to explain the whole post-graduation trajectory can accidentally let future information explain earlier outcomes.

SAMM addresses this problem by anchoring the analysis at a transition and looking forward over a fixed window. The unit becomes a short aligned subsequence after the transition, not the whole life course.

## Core Idea

For every transition time, SAMM extracts a window of length `l` after the transition. These windows are then grouped into typical next paths. Event history models can then estimate who is more or less likely to follow each next path.

For example, after leaving education, the next 36 months might show:

- A stable move into employment.
- A short employment spell followed by unemployment.
- A return to education.
- A longer period outside employment.

Instead of modeling only "education to employment," SAMM lets the outcome be "which kind of next path followed the transition?"

## The Two Steps

### Step 1. Build Next-path Types

Choose a window length `l`, such as 12, 24, 36, or 60 months. For each transition, extract the `l` observations that begin at that transition. Then group these windows, usually separately by starting state, so that windows beginning in education are compared with other windows beginning in education.

The result is a typology of next paths. Each type should be interpretable from plots and representative sequences.

### Step 2. Model the Next-path Outcome

Turn the next-path type into an event history outcome. From a given starting state, each next-path type becomes a competing risk. Covariates can then explain the hazard of entering one next-path type rather than another.

This keeps the time order clear. Covariates should be measured before or during the window being modeled, not after the future path has already unfolded.

## Choosing the Window Length

The window length should match the process you study.

| Window length | What it captures | Tradeoff |
| --- | --- | --- |
| Short, such as 12 to 24 months | Immediate consequences of a transition | May miss slower instability or recovery |
| Medium, such as 36 to 60 months | Medium-term process after a transition | Often a good starting point for early-career questions |
| Long, such as 72 months or more | A fuller trajectory after the transition | Fewer complete windows and more overlap with whole-trajectory sequence analysis |

Report sensitivity checks when possible. If the main interpretation survives several plausible values of `l`, the result is easier to trust.

## How Sequenzo Represents the Workflow

The SAMM functions in Sequenzo follow the two-step logic:

- `sequence_analysis_multi_state_model()` builds the transition-centered person-period data and the `l`-long subsequence columns.
- `plot_samm()` visualizes the extracted next paths by starting state.
- `seqsammseq()` retrieves next paths that begin from a selected state.
- `set_typology()` lets you attach cluster labels or human-readable labels to next paths.
- `seqsammeha()` turns the typology into an event-history analysis dataset.

These tools help you prepare the sequence side of the analysis. The final event history model can then be fitted with the statistical modeling tools appropriate for your design.

The handoff from sequence analysis to event history analysis usually looks like this:

```python
from sequenzo.with_event_history_analysis import seqsammeha

eha_data = seqsammeha(
    samm,
    spell="unemployed",
    typology=typology,
    persper=True,
)
```

Here, `spell` selects the starting state or transition context, `typology` supplies the next-path labels, and `persper=True` returns a person-period table for event history modeling.

## Practical Checklist

1. Define a compact state alphabet for the starting states.
2. Choose a first window length based on the process you study.
3. Extract next paths and inspect whether transition rows make sense.
4. Plot next paths by starting state.
5. Build a typology of next paths through clustering or substantive labels.
6. Use `seqsammeha()` to create the event-history analysis table.
7. Fit the event history model using the next-path types as competing outcomes.
8. Repeat the analysis with one or two alternative window lengths.

## Common Questions

### Is SAMM Just Clustering and Then Regression?

Not quite. The clustered units are transition-centered windows, not whole careers. The outcome is a medium-term path type from a specific starting state, which keeps the temporal interpretation closer to event history analysis.

### How Many Next-path Types Should I Keep?

Keep enough types to separate substantively different futures, but not so many that each type becomes hard to describe. Use cluster quality indicators, visual inspection, and substantive interpretation together.

### Is SAMM Causal?

No. SAMM gives a time-ordered descriptive or associational framework. Causal claims still require a research design that supports identification.

## See Also

- [Sequence History Analysis](/en/tutorials/sequence-history-analysis)
- [Cluster Quality Indicators](/en/tutorials/cluster-quality-indicators)
- [State Distribution Plot](/en/visualization/state-distribution-plot)
- [Index Plot](/en/visualization/index-plot)

## References

Studer, M., Struffolino, E., & Fasang, A. E. (2018). Estimating the relationship between time-varying covariates and trajectories: The sequence analysis multistate model procedure. *Sociological Methodology*, 48(1), 103-135.

