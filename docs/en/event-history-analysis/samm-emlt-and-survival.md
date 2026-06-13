# Sequence History, EMLT, SAMM, and Spell Survival

This page covers event-history-oriented tools that connect sequence analysis with transition modeling, local trajectory windows, and survival-style summaries.

These tools are different from [Event Sequences](/en/event-sequences/introduction). Event-sequence pages focus on mining event patterns. This page focuses on modeling sequence histories, extracting transition-centered windows, and connecting sequence structure to event-history questions.

## At a Glance

| Question | Guidance |
| --- | --- |
| Use this when | The question is about transition histories, local windows after a state, or spell duration. |
| You need before starting | A `SequenceData` object and a clear focal state, event, or spell-duration question. |
| Do not use this when | You want frequent event-pattern mining; use [Event Sequences](/en/event-sequences/introduction). |
| Next step | Choose EMLT for coordinates, SAMM for post-transition windows, or spell survival for duration. |

## Public API Map

| Task | Functions or classes |
| --- | --- |
| Estimate EMLT sequence coordinates | `compute_emlt()`, `seqemlt()`, `EMLTResult` |
| Build sequence-history data | `get_sequence_history_data()`, `person_level_to_person_period()` |
| Run Sequence Analysis Multi-State Models | `SAMM`, `sequence_analysis_multi_state_model()`, `seqsamm()` |
| Prepare SAMM sequence windows | `seqsammseq()`, `set_typology()` |
| Connect SAMM to event-history analysis | `seqsammeha()` |
| Analyze spell survival | `get_spell_survival_analysis()`, `plot_spell_survival_analysis()`, `SpellSurvivalResult` |

## EMLT: Time-Localized Sequence Coordinates

EMLT follows the TraMineRextras `seqemlt()` workflow. It builds time-stamped situation profiles, applies a time-discounted transformation, and returns PCA-style sequence coordinates.

```python
from sequenzo import compute_emlt

result = compute_emlt(seqdata, a=1, b=1, weighted=True)

print(result.coord)
print(result.sit_cor)
```

Use EMLT when you need continuous coordinates that preserve time-localized sequence structure and can be used for clustering, visualization, or downstream modeling.

## Sequence-History Data

Sequence-history tools convert person-level sequence data into person-period data, where each row represents a time point and its preceding trajectory context.

```python
import numpy as np
from sequenzo import get_sequence_history_data, person_level_to_person_period

time = np.full(seqdata.n_sequences, seqdata.n_steps)
event = np.zeros(seqdata.n_sequences, dtype=bool)

history = get_sequence_history_data(seqdata, time=time, event=event)
period = person_level_to_person_period(history)
```

This format is useful when the outcome is a transition at a time point and the predictor is the sequence history leading up to it.

## SAMM: Sequence Analysis Multi-State Models

SAMM anchors analysis at transitions and extracts the next `l` states after each transition. Those local windows can then be grouped into typologies and modeled.

```python
from sequenzo import seqsamm, sequence_analysis_multi_state_model, seqsammseq

samm = sequence_analysis_multi_state_model(seqdata, sublength=4)
employment_windows = seqsammseq(samm, spell="employment")
```

The alias `seqsamm()` is provided for TraMineRextras compatibility. Prefer `sequence_analysis_multi_state_model()` in new Python code when readability matters.

## Void vs. Missing Values

SAMM is sensitive to the distinction between **void** and **missing**:

| Concept | Meaning | SAMM behavior |
| --- | --- | --- |
| Void | Outside the observation window, usually padding | Transition windows containing void are dropped |
| Missing | Unknown state inside the observation window | Kept unless the workflow explicitly filters it |

When your data contain padding, define the void symbol in `SequenceData` consistently with your TraMineR workflow:

```python
seqdata = SequenceData(data, time=time_cols, states=states, void="%")
```

## Spell Survival

Spell survival tools summarize how long individuals remain in a state or spell before exiting.

```python
from sequenzo import get_spell_survival_analysis, plot_spell_survival_analysis

survival = get_spell_survival_analysis(seqdata, state=["employment"])
plot_spell_survival_analysis(survival)
```

Use this when the duration of a spell is the main object of interest, rather than the whole-sequence dissimilarity.

## Choosing Among These Tools

| Question | Use |
| --- | --- |
| How can I represent local time-stamped sequence structure as coordinates? | `compute_emlt()` |
| How does previous sequence history predict later transitions? | `get_sequence_history_data()` |
| What short paths follow a focal transition? | `sequence_analysis_multi_state_model()` / `seqsamm()` |
| How long do spells last before exit? | `get_spell_survival_analysis()` |
| What event patterns occur in unordered or timestamped event histories? | [Event Sequences](/en/event-sequences/introduction) |

## See Also

- [Section overview](/en/event-sequences/introduction) maps the surrounding workflow and related functions.
- [Typical Workflow](/en/basics/typical-workflow) shows where this method fits in the full analysis.

## Authors

Code: Yuqi Liang

