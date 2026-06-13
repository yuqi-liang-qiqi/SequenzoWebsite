# Event Sequence Analysis

Event sequence analysis studies trajectories as ordered changes.

Instead of asking what state is a person in at each time point?, it asks:

- What events happened?
- In what order did they happen?
- Did some events happen at the same time?
- Are some event patterns more common in one group than another?

This makes event sequence analysis especially useful when the main object of interest is the ordering of life events, career events, educational transitions, medical episodes, customer actions, or other discrete changes.

## A First Intuition

Suppose we observe a person from age 18 to 30.

A state sequence may look like this:

| Age | 18 | 19 | 20 | 21 | 22 | 23 |
| --- | --- | --- | --- | --- | --- | --- |
| State | Education | Education | Education | Full-time work | Full-time work | Married |

This tells us what state the person occupies at each age.

The corresponding event sequence may look like this:

```text
(Start education) -> (Start full-time work) -> (Marry)
````

This tells us what changed, and in what order.

Both representations describe the same trajectory, but they highlight different aspects of it. A state sequence is often better for studying duration, such as how long someone stays in education or employment. An event sequence is often better for studying ordering, such as whether people usually leave education before entering work, or whether marriage tends to occur before or after childbirth.

## State Sequences and Event Sequences

The key difference is the meaning of a position.

In a state sequence, position usually means time. For example, position 5 may mean the fifth month, fifth year, or fifth observation wave.

In an event sequence, position means event order. Position 5 means the fifth event, not necessarily the fifth year. If the timing of events matters, timestamps need to be stored explicitly.

This distinction is central to event sequence analysis. Events do not last; they occur at particular points and may cause changes in states. Several events can also occur at the same time. For example, a person may leave the parental home and move in with a partner in the same year:

```text
(Leaving home, Union)
```

Here, the comma means that the two events are simultaneous. The arrow means that one transition comes after another:

```text
(Leaving home, Union) -> (Marriage) -> (Childbirth)
```

This notation makes event sequence analysis well suited for studying ordered and possibly simultaneous changes.

## What Can We Learn from Event Sequences?

Event sequence analysis is useful when the research question is about patterns of change rather than only time spent in states.

Typical questions include:

* What are the most common event patterns?
* Which events tend to occur together?
* Which event usually follows a given event or subsequence?
* Which subsequences distinguish one group from another?
* Do different cohorts, genders, countries, or organizations follow different event patterns?
* Does a theoretically important pattern appear in each sequence?

For example, in life course research, we may ask whether people tend to leave home before entering a union, whether childbirth follows marriage, or whether part-time work tends to appear after childbirth. In career research, we may ask whether education is followed by full-time employment, whether unemployment interrupts work trajectories, or whether promotion tends to occur after job changes.

## How This Section Is Organized

The sidebar groups this section by task. [Mine Event Patterns](/en/event-sequences/create-event-sequences) covers building event sequences and finding, counting, and comparing frequent subsequences. [Convert and Inspect](/en/event-sequences/convert-event-sequences-to-tse) covers format conversion and transition checks. [Visualize Event Patterns](/en/event-sequences/plot-event-sequences) covers the five event plots. The same order is expanded step by step below.

## The Basic Workflow

A typical event-sequence workflow in Sequenzo has four steps.

### 1. Build event sequences

You can create event sequences from time-stamped event data:

```python
from sequenzo.event_sequences import EventSequenceData

eseq = EventSequenceData.from_tse(data=tse_df)
```

The input data should usually contain one row per event, with at least three columns:

| id | timestamp | event             |
| -- | --------- | ----------------- |
| 1  | 18        | EnterEducation    |
| 1  | 22        | StartFullTimeWork |
| 1  | 27        | Marry             |
| 2  | 19        | EnterEducation    |
| 2  | 21        | StartFullTimeWork |

You can also create event sequences from existing state sequences:

```python
eseq = EventSequenceData.from_state_sequences(seqdata)
```

This is useful when your data are originally stored as state sequences, but you want to analyze the changes behind those states.

### 2. Find frequent subsequences

Once the event sequences are created, you can search for common event patterns:

```python
from sequenzo.event_sequences import find_frequent_subsequences

fsubseq = find_frequent_subsequences(
    eseq,
    min_support_ratio=0.05
)
```

If timestamps are available, `search_constraint` can restrict which subsequences count as matches, for example by requiring events to occur within a maximum time span.

A frequent subsequence is an ordered event pattern that appears in many sequences. For example:

```text
(Education) -> (Full-time work)
(Leaving home, Union) -> (Childbirth)
```

The first pattern says that education is followed by full-time work. The second says that leaving home and entering a union happen together, followed later by childbirth.

### 3. Compare groups

You can then ask which subsequences distinguish groups:

```python
from sequenzo.event_sequences import compare_groups

discr = compare_groups(
    fsubseq,
    group_labels=df["group"],
    pvalue_threshold=0.05
)
```

This helps answer questions such as:

```text
Which event patterns are more common among women than men?
Which patterns are more common in younger cohorts than older cohorts?
Which career sequences distinguish two occupational groups?
```

### 4. Visualize the results

Sequenzo provides several plotting functions for communicating event-sequence results:

```python
from sequenzo.event_sequences import plot_subsequence_frequencies

plot_subsequence_frequencies(fsubseq)
```

You can also visualize group contrasts, event-order structures, and event dynamics.

## Main Functions

| Task                                                | Sequenzo function                          |
| --------------------------------------------------- | ------------------------------------------ |
| Create event sequences from time-stamped event data | `EventSequenceData.from_tse()`             |
| Create event sequences from state sequences         | `EventSequenceData.from_state_sequences()` |
| Find frequent subsequences                          | `find_frequent_subsequences()`             |
| Count subsequence occurrences                       | `count_subsequence_occurrences()`          |
| Compare groups                                      | `compare_groups()`                         |
| Check whether a target pattern appears              | `check_event_subsequence_containment()`    |
| Convert event sequences back to TSE format          | `convert_event_sequences_to_tse()`         |
| Summarize adjacent event-order movements            | `compute_event_transition_matrix()`        |
| Plot frequent subsequences                          | `plot_subsequence_frequencies()`           |
| Plot group contrasts                                | `plot_subsequence_group_contrasts()`       |
| Plot event parallel coordinates                     | `plot_event_parallel_coordinates()`        |
| Plot event dynamics                                 | `plot_event_dynamics()`                    |

## For TraMineR Users

This module mirrors the practical logic of TraMineR’s event-sequence tools, while using Python-style names.

| TraMineR         | Sequenzo                                                                    |
| ---------------- | --------------------------------------------------------------------------- |
| `seqecreate()`   | `EventSequenceData.from_tse()` / `EventSequenceData.from_state_sequences()` |
| `seqefsub()`     | `find_frequent_subsequences()`                                              |
| `seqeapplysub()` | `count_subsequence_occurrences()`                                           |
| `seqecmpgroup()` | `compare_groups()`                                                          |
| `seqecontain()`  | `check_event_subsequence_containment()`                                     |
| `seqe2tse()`     | `convert_event_sequences_to_tse()`                                          |
| `seqetm()`       | `compute_event_transition_matrix()`                                         |
| `seqelist`       | `EventSequenceList`                                                         |
| `eseq`           | `EventSequence`                                                             |

## Relationship with Other Sequenzo Modules

Use `sequenzo.event_sequences` when your question is about patterns of events:

```text
Which events happen, in what order, and for whom?
```

Use `sequenzo.with_event_history_analysis` when your question is about event-history or sequence-history modeling:

```text
What is the risk or hazard of a transition, given previous history?
```

In short:

```text
Patterns of events -> event_sequences
Modeling transitions or hazards -> with_event_history_analysis
```

## See Also

- [Quickstart Example](/en/event-sequences/example) runs a complete event-mining analysis.
- [Create Event Sequences](/en/event-sequences/create-event-sequences) is the first function in the workflow.
- [Basic Concepts](/en/tutorials/basic-concepts) explains the state-sequence side of the comparison.

## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.

