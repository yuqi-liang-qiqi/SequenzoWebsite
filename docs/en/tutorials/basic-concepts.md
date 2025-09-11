<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-02-21 03:10:43
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-11 11:48:16
 * @FilePath: /SequenzoWebsite/docs/en/tutorials/basic-concepts.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Basic Concepts

Before we dive into the actual usage of the Sequenzo package, it is important to first get familiar with some basic sequence concepts. These are the building blocks we will use later when constructing sequences, calculating distances, and interpreting results. Think of this section as learning the “alphabet” before writing full sentences.

To make things concrete, we will use examples from the [German Family Panel *pairfam* dataset](https://www.gesis.org/en/services/finding-and-accessing-data/selected-german-research-projects/pairfam) (“Panel Analysis of Intimate Relationships and Family Dynamics”). This dataset provides a widely used coding scheme for life-course statuses such as education (`EDU`), full-time employment (`FT`), and unemployment (`UNEMP`). These categories are intuitive and easy to understand, so we will use them throughout this tutorial.

---

### Conceptual Comparison of Sequence Structures

| Concept      | Definition                                                                 | Example                                    |
|--------------|-----------------------------------------------------------------------------|--------------------------------------------|
| **State**    | A categorical value observed at a specific time point                      | `FT` at year 3                             |
| **Subsequence** | An ordered (possibly non-contiguous) subset of the full sequence         | `(EDU, FT, UNEMP)`                         |
| **Spell**    | A stretch of repeated, identical states with no interruptions              | `(EDU, EDU)`, `(FT, FT)`, `(UNEMP)`        |
| **Full sequence** | The complete observed trajectory from year 1 to *T*                   | `(EDU, EDU, FT, FT, UNEMP)`                |

## State

The simplest element of a sequence is a **state**. A state is just a label for what someone is doing or experiencing at a certain time. For example, in the sequence: 

`(EDU, EDU, FT, FT, UNEMP)`

- `EDU` means the person is in education,  
- `FT` means full-time employment,  
- `UNEMP` means unemployment or job search.  

Every year (or month, depending on the dataset) you record one state. Together, these states form the person’s trajectory. States are like the “letters” of our sequence alphabet—everything else is built on top of them.

## Subsequence

A **subsequence** is like picking out a few letters from a word while keeping their order. You don’t have to take every letter, and they don’t need to be next to each other, but you can’t rearrange them.

From the sequence `(EDU, EDU, FT, FT, UNEMP)`:

- `(EDU, FT, UNEMP)` skips the second `EDU` and second `FT`.  
- `(FT, UNEMP)` skips the first three years.  
- `(EDU, FT)` skips one `EDU` in between.

Subsequences are used in similarity measures like the **Longest Common Subsequence (LCS)**. This allows us to spot patterns even when two people’s paths don’t line up exactly year by year.  

But the downside is that subsequences ignore **when** things happen. For example, two people may both have `(EDU, FT, UNEMP)` in their lives, but one went through this at ages 18–20, while the other at ages 30–32. Subsequence methods will say they are similar, even though their broader life stories are very different. That’s why subsequences are powerful but sometimes too flexible.

## Spell or Episode

A **spell** (also called an episode) is just a run of the same state repeated without interruption. Think of it as a stable “block” of life.

From `(EDU, EDU, FT, FT, UNEMP)`, the spells are:

- `(EDU, EDU)` → two years of continuous education,  
- `(FT, FT)` → two years of full-time work,  
- `(UNEMP)` → one year of unemployment.  

Even a single year counts as a spell. Spells are useful for describing stable stages in life, such as “a three-year spell of unemployment” or “a five-year spell of full-time work.”

## Full Sequence

The **full sequence** is simply the whole trajectory of a person across all observed years.  

For example:  

`(EDU, EDU, FT, FT, UNEMP)`

This is the full record from year 1 to year 5. 

---

By keeping these concepts in mind, you’ll be ready to follow the later sections where we build prefix and suffix trees, measure divergence, and analyze collective patterns.

## Practice Exercises on Basic Sequence Concepts

### Exercise 1: Identify States

Consider the sequence:
`(EDU, EDU, FT, FT, UNEMP)`

Questions:

1. What is the state at year 1?
2. What is the state at year 4?
3. If year 5 is `UNEMP`, what does this mean for the person?

### Exercise 2: Build Subsequences

From the same sequence:
`(EDU, EDU, FT, FT, UNEMP)`

Questions:

1. Write a subsequence that contains `EDU` and `FT`.
2. Write a subsequence using only the last two years.
3. True or False: `(FT, EDU)` is a subsequence of the original sequence.

### Exercise 3: Recognize Spells (Episodes)

From the sequence:
`(EDU, EDU, FT, FT, UNEMP)`

Questions:

1. How many spells are there?
2. Which spell is the longest?
3. If someone claims to have a “three-year EDU spell,” does that match this sequence?


### Exercise 4: Understand the Full Sequence

Consider the sequence:
`(EDU, EDU, EDU, FT, FT, UNEMP, FT)`

Questions:

1. How many years does this sequence cover?
2. What is the spell for the first three years?
3. How many unique states appear in this sequence?

### Exercise 5: Reflection

Questions:

1. Why do subsequence methods sometimes “ignore time”?
2. If you only care whether someone stayed steadily employed for several years, would you focus on subsequences or spells?
3. If you want the entire trajectory of a person’s career, which concept would you use?

## Answers & Explanations

### Exercise 1

1. Year 1 → `EDU` (the person is in education).
2. Year 4 → `FT` (the person is in full-time employment).
3. Year 5 → `UNEMP` (the person is unemployed or looking for a job).

*A state is simply what the person is doing at that specific time point.*

### Exercise 2

1. `(EDU, FT)` is valid (order preserved, even if not contiguous).
2. `(FT, UNEMP)` is valid (taking years 4 and 5).
3. False → `(FT, EDU)` is not valid because in the original sequence all `EDU` states come before all `FT` states.

*A subsequence keeps the original order but doesn’t need to take every element.*

### Exercise 3

1. Three spells: `(EDU, EDU)`, `(FT, FT)`, `(UNEMP)`.
2. `(EDU, EDU)` and `(FT, FT)` are both the longest, with length 2.
3. No → here, the EDU spell is only 2 years, not 3.

*A spell is a continuous block of the same state without interruption.*

### Exercise 4

1. 7 years (7 states listed).
2. `(EDU, EDU, EDU)` → a three-year spell of education.
3. Three unique states: `EDU`, `FT`, and `UNEMP`.

*The full sequence is the entire trajectory across all observed time points.*

### Exercise 5

1. Because subsequences focus only on the order of events, not on when they happen (e.g., ages or calendar years).
2. Spells → since they capture continuous, uninterrupted periods of the same state.
3. Full sequence → because it records the entire path from start to end.

*Author: Yuqi Liang*