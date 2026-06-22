# A Beginner’s Guide to Sequence History Analysis (SHA)

## Before You Start

This page explains the intuition behind sequence history analysis. It connects sequence data to person-period event-history models.

Read this page to see why one person-level sequence can become many risk-set rows, what the event indicator means, and where Sequenzo's event-history tools fit.

Imagine you want to study **when people first get married** and what shapes that timing.
Most datasets give you a row per person, showing their whole life-course trajectory (for example, their family or relationship status each year). That’s useful for description, but it makes it hard to answer a time-based question like:

> “At each age, what is the chance this person gets married for the first time, and how does that depend on their background and past history?”

Sequence History Analysis (SHA) is designed to solve exactly this problem. It does so by **turning one row per person into many rows per person, one for each time period they are at risk.**

## Step 1. From person-level to person-period

* Original format:
  One person = one row. Columns = states at different ages (e.g., 1 = single, 4 = married, etc.).

* SHA format:
  One person = many rows. Each row = one observation interval in which the person is still at risk of the event (or until the data ends if the event never happens).

For example:

* If Anna is observed yearly from age 18 and first marries during the interval ending at age 27, the person-period table covers the risk intervals from age 18 through the event interval. The event row has `event=True`.
* If Ben is observed from age 18 through age 40 and never marries, his person-period rows cover those observed risk intervals, all with `event=False`.

This “person-period” dataset is like each person writing a **diary page for every year of their life** up until the event happens.

## Step 2. What each column means

In the result table, you will see:

* **id**: the person’s identifier.
* **time**: which diary page this is (year 1, year 2, …).
* **event**: whether the event of interest (first marriage) happens on this page. It will only be True once (the first marriage), or never if the person stays single.
* **state history columns (1, 2, 3, …)**: a record of the person’s trajectory up to this point. These columns let the model “look back” at what the person has experienced so far.
* **covariates (sex, education, ethnicity, etc.)**: personal background characteristics that don’t change over time (or are measured at baseline).

## Step 3. Why this format matters

By reshaping the data, you can now ask:

> “Given someone’s age, background, and past history, what is the probability that they marry for the first time this year?”

This is a **discrete-time event history analysis**. It’s just a logistic regression where the outcome is “did the event happen on this page, yes or no.”

## Step 4. How to use the table in practice

1. **Baseline model**
   Run a logistic regression:
   `event ~ time`
   This gives you the age-specific risk of first marriage (a “hazard curve”).

2. **Add covariates**
   Include variables such as sex, education, or migration background:
   `event ~ time + sex + education`
   Now you can see whether, for example, women or higher-educated people marry earlier.

3. **Add history**
   Use the state-history columns to represent past trajectories. For example:

   * Was the person cohabiting last year?
   * How many transitions between relationships so far?
   * Which “typical trajectory cluster” they belong to?

   These features let you answer:
   “Do people who lived together before marriage marry earlier?”
   “Does a history of frequent breakups delay marriage?”

4. **Interpret results**

   * Positive coefficients = higher chance of marrying at that time.
   * Negative coefficients = lower chance.
   * You can plot predicted hazards to visualize how risks vary by group or history.

## Step 5. Example: First marriage

Suppose you define marriage states as [4, 8, 9]. For each person, you mark the first time these appear. SHA then creates a person-period dataset where:

* All rows before the first marriage have `event=False`.
* The row of the first marriage has `event=True`.
* People who never marry have only `False` rows.

With this dataset, you can directly model:

* The average age at first marriage.
* Differences by gender or education.
* The effect of cohabitation or family background on the risk of first marriage.

## The intuition

Think of SHA as turning your life-course dataset into a **movie reel**:

* Original data is like a single snapshot (a photo album).
* SHA expands it into a frame-by-frame movie.
* Then we can ask: “At each frame, what’s the chance that the big event happens?”

That frame-by-frame view is what makes it possible to study timing, risk, and the impact of both background and history on major life events.

---

## See Also

- [Sequence History, SAMM, and Spell Survival](/en/event-history-analysis/samm-emlt-and-survival) maps this idea to Sequenzo functions.
- [`get_sequence_history_data()`](/en/event-history-analysis/samm-emlt-and-survival#sequence-history-data) prepares person-period sequence-history data.
- [Sequence Analysis Multi-state Model](./multi-state-model.md) explains the related SAMM workflow.

## References

Rossignon, F., Studer, M., Gauthier, J. A., & Le Goff, J. M. (2018). Sequence history analysis (SHA): Estimating the effect of past trajectories on an upcoming event. In G. Ritschard & M. Studer (Eds.), *Sequence analysis and related approaches: Innovative methods and applications* (pp. 83-100). Cham: Springer International Publishing.

*Author: Yuqi Liang*
