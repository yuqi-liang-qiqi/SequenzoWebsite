<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-10-28 10:48:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-10-28 11:13:21
 * @FilePath: /SequenzoWebsite/docs/en/tutorials/sa-vs-regression.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->


Unlike numerical time series, categorical sequences involve discrete, unordered states with irregular time intervals, making conventional regression-based approaches, which assume numerical and independent observations, ill-suited for such categorical longitudinal data (see Liao et al., 2022). 

The question would be, how about panel regression? to what extent does it capture order of events and other things that sequence analysis is good at capturing? Let's unpack the conceptual boundary between panel regression and sequence analysis (SA).

### 1. What panel regression does well

Panel (or longitudinal) regression models, e.g. fixed-effects, random-effects, or growth-curve models, are designed to handle:

* repeated measurements over time,
* within-person correlation,
* and possibly time-varying covariates.

They estimate **average effects** of predictors on an outcome across time and units, controlling for unobserved heterogeneity.

So they are powerful if your research question is:

> “How does X affect Y over time?”
> or
> “Does Y change linearly or quadratically with age?”

### 2. What panel regression assumes (and therefore misses)

However, standard panel models make assumptions that limit their ability to capture *sequential or path-dependent dynamics*.

Let’s look more closely at **one key limitation of standard panel regression models** — they often **ignore the order of events, or what we call path dependence**.

#### Time as linear slices, not as a sequence of states

In panel regression (like fixed-effects or random-effects models), time is usually treated as a simple index, *t = 1, 2, 3…*, not as a meaningful chain of events.

Each time point is just one “slice” of data, assumed to be comparable across individuals.

The model can estimate how employment status at time *t* relates to income or well-being at time *t + 1*, but it doesn’t pay attention to **the order in which those statuses appear**.

It sees time passing, but not the storyline unfolding.

#### Example: Same ingredients, different stories

Imagine we study people’s employment histories, where
E = employed, U = unemployed.

| Person | Sequence | Story                            |
| ------ | -------- | -------------------------------- |
| A      | E–U–E    | Lost a job, then recovered       |
| B      | U–E–E    | Struggled early, then stabilized |

To a human eye, these are two very different life paths.

But in a panel regression dataset, they both simply show:

* 2 years employed, 1 year unemployed,
* similar employment values at each time.

When we reshape these sequences into a “long” panel table, the data look like this:

| Person | Time | Employment | Mental health |
| :----: | :--: | :--------: | :-----------: |
|    A   |   1  |      1     |       Y₁      |
|    A   |   2  |      0     |       Y₂      |
|    A   |   3  |      1     |       Y₃      |
|    B   |   1  |      0     |       Y₄      |
|    B   |   2  |      1     |       Y₅      |
|    B   |   3  |      1     |       Y₆      |

Then we estimate something like:

[
Y_{it} = \alpha_i + \beta , Employment_{it} + \gamma t + \epsilon_{it}
]

This model asks:

> “On average, how is employment related to mental health at each time point?”

But it **breaks apart** the life story into separate rows.

The sequence “E–U–E” or “U–E–E” disappears — what’s left are isolated dots on a timeline.

So, Person A’s “job loss and recovery” and Person B’s “early struggle then stability” are treated as statistically equivalent.

#### Why this happens mathematically

Panel regression can only see **immediate, local effects**, unless we explicitly give it “memory.”

For example, if we add a lag term:

[
Y_{it} = \alpha_i + \beta X_{it} + \rho Y_{i,t-1} + \epsilon_{it}
]

the model now knows what happened *one step earlier*.
But that’s all — it still forgets everything before *t−1*.

To make it remember longer sequences, you’d need to add many lag terms:
[
Y_{it} = \alpha_i + \beta_0 X_{it} + \beta_1 X_{i,t-1} + \beta_2 X_{i,t-2} + \ldots
]

This quickly becomes messy, especially for categorical states (like employment, marriage, or health categories).

It’s also unable to summarize the *overall pattern* whether a person’s path was cyclical, stable, or improving.

#### Why this matters

Life trajectories are often **path-dependent**:
what happens next depends not only on where you are now, but on *how you got there*.

* Losing a job after ten years of stability feels very different from being unemployed right after school.
* Having a child before marriage versus after marriage signals different life strategies.
* Migrating before finding a job versus migrating after securing one tells different stories.

Panel regression can tell you average effects at each point in time, but not these stories of timing, recovery, and turning points.

#### The bigger picture

So while panel models are excellent for estimating **effects over time**,
they see each year as an independent photo rather than part of a movie.

Sequence analysis, by contrast, reads the *whole film reel* —
it looks at the order, duration, and timing of transitions as a unified process.

Or in short:

> Panel regression “sees time,”
> but sequence analysis “sees the story.”

#### **Order irrelevance**

Panel regression models are powerful, but they see time in a very **linear and numeric** way. Time is treated simply as “year 1, year 2, year 3…”, like beads on a string, rather than as a meaningful *sequence of states or events*.

That means these models care about **when** something happens, but not **in what order** things happen.

Suppose we’re studying people’s employment histories, and we record for each year whether they’re *employed (E)* or *unemployed (U)*.

Now imagine two people:

* Person A: **E–U–E**
* Person B: **U–E–E**

Both spent two years employed and one year unemployed.

To a panel regression, they look *almost identical*:

the same number of employment spells, the same total duration in work and unemployment.

But substantively, these stories are very different:

* Person A lost a job and then recovered.
* Person B struggled at the start but then found stability.

In a regression dataset, these differences are flattened. Once you summarize each person by variables like “total years employed” or “employment in year t,” the *order* of events disappears. The model no longer knows which came first — the crisis or the recovery.

#### **Why this matters**

Order matters because life processes are often *path-dependent*:
what happens next depends on *where you’ve been*, not just where you are.

For example:

* Being unemployed after a long stable job might have different psychological and financial effects than being unemployed early in one’s career.
* Getting married after having a child might not mean the same thing as having a child after marriage.
* Migrating before getting a job versus getting a job before migrating could reflect very different strategies.

Panel regression can include “lagged variables” (like unemployment at t−1), but that only looks one step back. It can’t easily capture the full chain — the longer storyline of transitions and turning points.

#### **The consequence**

So while panel models are excellent for quantifying *effects at each time point*, they treat each year as a separate data row rather than part of a narrative.

Sequence analysis, by contrast, keeps the story intact — it reads each person’s timeline as a single sentence, not a list of unrelated words.

Excellent — here’s a continuation written in the same explanatory, beginner-friendly tone as the previous section. These two points naturally follow and help readers see the deeper conceptual difference between panel regression and sequence analysis.

---

#### **Fixed functional form**

Panel regression assumes that change over time follows a **specific mathematical shape** — most often *linear* (“each year adds the same effect”) or sometimes *quadratic* (“the effect speeds up or slows down”).

That’s a strong assumption. It means the model expects everyone’s trajectory to bend in roughly the same way — like fitting a single curve through all people’s lives.

For example, suppose we study how health changes with age. A panel regression might estimate:

[
Health_{it} = \alpha_i + \beta_1 Age_{it} + \beta_2 Age_{it}^2 + \epsilon_{it}
]

This model will give you a neat, smooth curve — maybe health rises in youth and falls later in life.
But real life rarely behaves that neatly: some people decline early, some stay stable for years, others recover after a setback.

Those “ups and downs,” “turning points,” and “zigzag paths” get smoothed out by the regression line.
The model only tells you the **average direction**, not the **diversity of patterns** underneath.

Sequence analysis, by contrast, is **non-parametric** — it doesn’t assume a fixed shape or function.
It takes each person’s actual timeline as it is, compares them, and then groups people with similar *trajectories*, no matter how irregular.

So instead of forcing everyone into one average curve, sequence analysis lets the data reveal *how many different shapes of life paths* actually exist.

---

#### **No holistic temporal structure**

Panel regression sees time as a series of separate moments.
It can tell you whether employment this year predicts income next year,
but it doesn’t consider the *entire structure of someone’s life course* — how long they stayed in each state, when transitions occurred, and in what order.

Think of it this way:

* Panel regression studies the **frames** of a movie, one by one.
* Sequence analysis watches the **whole movie** and compares plots.

In panel models, you could add lagged terms (like (X_{i,t-1}), (X_{i,t-2})), but that only creates a chain of short-term dependencies. The model still never sees the *overall pattern* — whether someone’s life is “mostly stable,” “interrupted but recovered,” or “continuously unstable.”

Sequence analysis, on the other hand, treats the **entire sequence as the unit of analysis**.
It measures similarity between complete life trajectories — taking into account:

* **Timing** (when transitions happen),
* **Duration** (how long each state lasts),
* and **Order** (the specific sequence of states).

That’s why sequence analysis is especially suited for questions about **process, rhythm, and structure** — things like career mobility, family formation, or health progression — where *the path itself* is the phenomenon of interest.

### 3. What sequence analysis captures instead

Sequence analysis can capture:

* **Timing** (when transitions occur),
* **Duration** (how long states last), and
* **Order** (which state follows which).

It’s particularly suited for categorical, unordered states (e.g., employment status, family type) and for identifying *typical trajectories* or *divergent pathways* without imposing parametric constraints.

---

### 4. Middle ground

There are some **hybrid approaches** that bridge the two:

* **Markov and hidden Markov models** (explicitly model transition probabilities over time);
* **Sequence analysis followed by regression**, where cluster memberships or trajectory types become predictors or outcomes;
* **Sequence Analysis Multistate Models** (Studer et al. 2018), which combine event-history modeling with SA’s trajectory perspective.

---

### 5. Summary comparison

| Aspect                    | Panel Regression                      | Sequence Analysis                 |
| ------------------------- | ------------------------------------- | --------------------------------- |
| Data type                 | Usually numeric (can include dummies) | Categorical sequences             |
| Unit of analysis          | Observation or individual × time      | Whole trajectory                  |
| Temporal structure        | Linear time trend                     | Order, timing, duration jointly   |
| Model assumption          | Parametric (linear, FE, RE, etc.)     | Non-parametric / algorithmic      |
| Captures path dependence? | Limited                               | Central                           |
| Typical questions         | “What affects Y over time?”           | “What kinds of life paths exist?” |

---

In short:
**Panel regression captures level and trend over time; sequence analysis captures form and structure of life trajectories.**
If the *ordering of events itself* is substantively meaningful, panel regression will miss it.
