# A Small Worked Example of Event Sequence Analysis

This page gives a small, beginner-friendly example of event sequence analysis in Sequenzo.

The goal is not to cover every function in detail. Instead, the goal is to show the basic logic:

1. What the raw event data look like
2. How to create event sequences
3. How to find frequent subsequences
4. How to compare groups
5. How to read the plots

We use a deliberately small example with only three people.

```text
Person A: Education -> Full-time work -> Marriage
Person B: Education -> Full-time work -> Part-time work
Person C: Education -> Unemployment -> Full-time work
````

Even this tiny example already shows the key idea of event sequence analysis: we are not only interested in whether events happen, but also in the order in which they happen.

## 1. Raw Time-Stamped Event Data

Event sequence analysis usually starts from time-stamped event data.

In Sequenzo, this is called TSE format: Time-Stamped Event format.

Each row describes one event for one individual.

| id | timestamp | event          | group       |
| -- | --------- | -------------- | ----------- |
| A  | 18        | Education      | Traditional |
| A  | 22        | Full-time work | Traditional |
| A  | 27        | Marriage       | Traditional |
| B  | 18        | Education      | Flexible    |
| B  | 22        | Full-time work | Flexible    |
| B  | 25        | Part-time work | Flexible    |
| C  | 18        | Education      | Flexible    |
| C  | 21        | Unemployment   | Flexible    |
| C  | 23        | Full-time work | Flexible    |

In this table:

* `id` identifies the person.
* `timestamp` records when the event happened.
* `event` records what happened.
* `group` is an external variable used later for group comparison.

For example, Person A first enters education at age 18, then starts full-time work at age 22, and later marries at age 27.

## 2. Create Event Sequences

We can create an event-sequence object from the TSE table using `EventSequenceData.from_tse()`.

```python
import pandas as pd

from sequenzo.event_sequences import EventSequenceData

tse_df = pd.DataFrame({
    "id": ["A", "A", "A", "B", "B", "B", "C", "C", "C"],
    "timestamp": [18, 22, 27, 18, 22, 25, 18, 21, 23],
    "event": [
        "Education", "Full-time work", "Marriage",
        "Education", "Full-time work", "Part-time work",
        "Education", "Unemployment", "Full-time work"
    ],
    "group": [
        "Traditional", "Traditional", "Traditional",
        "Flexible", "Flexible", "Flexible",
        "Flexible", "Flexible", "Flexible"
    ]
})

eseq = EventSequenceData.from_tse(
    data=tse_df[["id", "timestamp", "event"]]
)

eseq
```

Conceptually, Sequenzo turns the table into a collection of event sequences:

```text
A: (Education) -> (Full-time work) -> (Marriage)
B: (Education) -> (Full-time work) -> (Part-time work)
C: (Education) -> (Unemployment) -> (Full-time work)
```

The original table is useful for storing data. The event-sequence object is useful for analyzing ordered event patterns.

## 3. Find Frequent Subsequences

A subsequence is an ordered pattern that appears inside a longer sequence.

For example:

```text
(Education) -> (Full-time work)
```

is a subsequence of Person A and Person B, because both experience education before full-time work.

It is also a subsequence of Person C, because Person C experiences education and later full-time work, even though unemployment happens in between:

```text
Person C: Education -> Unemployment -> Full-time work
```

This is important. A subsequence does not always have to be consecutive. It only needs to preserve the order of events.

We can find frequent subsequences using `find_frequent_subsequences()`.

```python
from sequenzo.event_sequences import find_frequent_subsequences

fsubseq = find_frequent_subsequences(
    eseq,
    min_support_ratio=0.5
)

fsubseq.data
```

Here, `min_support_ratio=0.5` means that a pattern must appear in at least 50% of the sequences.

Since we have three people, a subsequence must appear in at least two people to be considered frequent.

In this toy example, frequent patterns include:

| Subsequence                       | Interpretation                                                     |
| --------------------------------- | ------------------------------------------------------------------ |
| `(Education)`                     | Everyone starts with education.                                    |
| `(Full-time work)`                | Everyone eventually enters full-time work.                         |
| `(Education) -> (Full-time work)` | Education is followed by full-time work in all three trajectories. |

Other patterns are less frequent:

| Subsequence                            | Appears in    |
| -------------------------------------- | ------------- |
| `(Marriage)`                           | Person A only |
| `(Part-time work)`                     | Person B only |
| `(Unemployment)`                       | Person C only |
| `(Full-time work) -> (Marriage)`       | Person A only |
| `(Full-time work) -> (Part-time work)` | Person B only |
| `(Unemployment) -> (Full-time work)`   | Person C only |

So the most general pattern in this small dataset is:

```text
(Education) -> (Full-time work)
```

This tells us that all three people eventually move from education into full-time work, although they do not all follow the same path.

## 4. Count Subsequence Occurrences

After finding subsequences, we may want to know which person contains which pattern.

For this, we can use `count_subsequence_occurrences()`.

```python
from sequenzo.event_sequences import count_subsequence_occurrences

counts = count_subsequence_occurrences(
    fsubseq,
    counting_method="presence"
)

counts
```

With `counting_method="presence"`, the result records whether each subsequence appears in each person’s sequence.

Conceptually, the output is a person-by-pattern matrix:

| Person | `(Education)` | `(Full-time work)` | `(Education) -> (Full-time work)` |
| ------ | ------------- | ------------------ | --------------------------------- |
| A      | 1             | 1                  | 1                                 |
| B      | 1             | 1                  | 1                                 |
| C      | 1             | 1                  | 1                                 |

Here, `1` means that the pattern appears in the sequence.

This matrix is useful because it turns event patterns into variables. We can then compare groups, build summaries, or use the patterns in further analysis.

## 5. Compare Groups

Suppose we divide the three people into two groups:

| id | group       |
| -- | ----------- |
| A  | Traditional |
| B  | Flexible    |
| C  | Flexible    |

This grouping is artificial, but it helps illustrate the logic.

Person A follows:

```text
Education -> Full-time work -> Marriage
```

Persons B and C follow:

```text
Education -> Full-time work -> Part-time work
Education -> Unemployment -> Full-time work
```

Now we can ask:

```text
Which event patterns distinguish the Traditional group from the Flexible group?
```

In Sequenzo, this is done with `compare_groups()`.

```python
from sequenzo.event_sequences import compare_groups

group_labels = (
    tse_df[["id", "group"]]
    .drop_duplicates()
    .set_index("id")
    .loc[[seq.id for seq in eseq.sequences], "group"]
)

discr = compare_groups(
    fsubseq,
    group_labels=group_labels,
    pvalue_threshold=1.0
)

discr.data
```

In a real dataset, this function helps identify subsequences that are much more common in one group than another.

In this tiny example, we should not interpret p-values seriously because there are only three people. The purpose is only to understand the workflow.

Conceptually, the comparison asks:

| Pattern                           | Traditional | Flexible    | Interpretation                            |
| --------------------------------- | ----------- | ----------- | ----------------------------------------- |
| `(Marriage)`                      | Common      | Rare        | More characteristic of Person A’s group   |
| `(Part-time work)`                | Rare        | More common | More characteristic of the Flexible group |
| `(Unemployment)`                  | Rare        | More common | More characteristic of the Flexible group |
| `(Education) -> (Full-time work)` | Common      | Common      | Not useful for distinguishing groups      |

This shows an important point: a frequent subsequence is not always a discriminating subsequence.

A pattern can be very common in the whole dataset but not helpful for separating groups. Conversely, a pattern can be less common overall but still useful for characterizing a specific group.

## 6. Plot Frequent Subsequences

We can visualize the most frequent subsequences using `plot_subsequence_frequencies()`.

```python
from sequenzo.event_sequences import plot_subsequence_frequencies

plot_subsequence_frequencies(
    fsubseq,
    x_label="Support",
    y_label="Subsequence",
    show=True
)
```

The plot should be read as follows:

* Each bar is one subsequence.
* The bar length shows how many sequences contain that subsequence.
* Longer bars indicate more common patterns.
* Single-event patterns are often the most frequent, but multi-event patterns are usually more informative for sequence analysis.

In this example, we would expect `(Education)`, `(Full-time work)`, and `(Education) -> (Full-time work)` to have high support.

## 7. Plot Group Contrasts

If we have compared groups, we can visualize which subsequences are more characteristic of which group.

```python
from sequenzo.event_sequences import plot_subsequence_group_contrasts

plot_subsequence_group_contrasts(
    discr,
    plot_type="freq",
    x_label="Frequency",
    y_label="Subsequence",
    show=True
)
```

The plot should be read as follows:

* Each row is a subsequence.
* Each group has its own frequency for that subsequence.
* A large difference between groups suggests that the subsequence is more characteristic of one group.

For example, if `(Marriage)` appears only in the Traditional group, it will have a higher frequency for that group. If `(Part-time work)` or `(Unemployment)` appears only in the Flexible group, those patterns will have higher frequencies for the Flexible group.

## 8. Plot Event-Order Structures

Event sequences can also be visualized using parallel coordinates.

```python
from sequenzo.event_sequences import plot_event_parallel_coordinates

plot_event_parallel_coordinates(
    eseq,
    group_labels=group_labels,
    x_label="Event order",
    y_label="Event",
    show=True
)
```

This kind of plot helps show the order of events across individuals.

The x-axis represents event order:

```text
1st event -> 2nd event -> 3rd event
```

The y-axis represents event types:

```text
Education
Full-time work
Marriage
Part-time work
Unemployment
```

Each line represents one person’s event sequence.

In this example:

* All three lines begin with `Education`.
* Two lines go directly from `Education` to `Full-time work`.
* One line goes from `Education` to `Unemployment`, and then to `Full-time work`.
* The final event differs across people: `Marriage`, `Part-time work`, or no additional event after full-time work.

This plot is useful for seeing whether trajectories share a common structure or branch into different pathways.

## 9. What This Example Teaches

This small example shows the basic logic of event sequence analysis.

First, we start from time-stamped event data:

```text
id + timestamp + event
```

Second, we create event sequences:

```text
Person A: Education -> Full-time work -> Marriage
```

Third, we search for frequent subsequences:

```text
Education -> Full-time work
```

Fourth, we compare groups:

```text
Which patterns are more common in one group than another?
```

Fifth, we visualize the results:

```text
Which patterns are common?
Which patterns distinguish groups?
How do event orders differ across people?
```

The key idea is that event sequence analysis focuses on ordered changes.

It is especially useful when the research question is not simply “how long did people stay in each state?”, but rather:

```text
What happened, in what order, and for whom?
```

To recap, the workflow is:

```text
Data -> Event sequences -> Frequent patterns -> Group comparison -> Visualization
```


## Reference

Ritschard, G., Bürgin, R., & Studer, M. (2013). Exploratory Mining of Life Event Histories. In J. J. McArdle & G. Ritschard (Eds.), Contemporary Issues in Exploratory Data Mining in the Behavioral Sciences (pp. 221–253). Routledge.
