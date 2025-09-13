<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 17:28:43
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-13 09:58:46
 * @FilePath: /SequenzoWebsite/docs/en/tutorials/dissimilarity-measures.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Understanding Dissimilarity Measures in Sequence Analysis

Dissimilarity measures quantify how far apart two sequences are, regardless of the unit (e.g., individuals, firms, regions). But how do we decide how “different” two paths are? That’s where dissimilarity measures come in. 

A dissimilarity measure is just a way of putting a number on “how far apart” two sequences are (not how close, otherwise it would be similarity). The bigger the number, the more different the sequences.

## What Aspects Can Sequences Differ In?

Think of it as creating a “map of differences” across your entire dataset:

* If two people have very similar trajectories, their distance is close to 0.
* If they lived very different lives, their distance is larger.

There are several important aspects to understand, because there are multiple aspects of dissimilarity to consider:

1. **How are differences measured? (Choice of method)**

   Different dissimilarity measures capture different aspects of sequences:

   * Some focus on **timing** (exact ages or years when things happen).
   * Some focus on **duration** (how long states last).
   * Some focus on **sequencing** (the order of events).
     
    For example:
   * Optimal Matching (OM) treats differences as “edit operations” (insert/delete/substitute) needed to turn one sequence into another.
   * Hamming distance (HAM) compares positions one by one (very timing-sensitive).
   * OMspell compares sequences of spells (runs of states), emphasizing duration.
     
    Each method has its own strengths, so the choice depends on what matters in your research (e.g., your research questions and theories that you use in your research).

2. **Normalization (making distances comparable)**

   Raw distances can be influenced by sequence length or by the set of possible states (e.g., having 3 states vs. 10 states can change the maximum possible distance). To make them comparable, you can normalize them. This means rescaling distances so they lie on a common scale (often between 0 and 1). It is an important point but many studies have neglected it. 

   You can choose from `"none"`, `"maxlength"`, `"gmean"`, `"maxdist"`, `"YujianBo"`, or let the function decide automatically with `"auto"`.
   For example:

   * `"maxlength"` divides by the maximum possible distance for the longest sequence.
   * `"gmean"` uses the geometric mean (often for common-prefix measures).
   * `"YujianBo"` applies a mathematical correction for edit distances.
   * `"auto"` selects the most sensible default based on the chosen method.
     
    In this way, users don’t need to know the formulas — they just get distances that are comparable across their dataset.

3. **Substitution and indel costs (how much a change “costs”)**
   
   For edit-based measures (like OM), the distance depends on how costly it is to insert, delete, or substitute states.

   * You can set them manually (e.g., indel=1, sm="CONSTANT", and when sm is set to "CONSTANT", sm = 2).
   * Or you can let the function derive them automatically (e.g., `sm="TRATE"`, `indel="auto"`, we will explain what they mean later in this guide).

    Automatic costs are calculated from your data: for example, frequent transitions get lower substitution costs, while rare transitions get higher costs. Similarly, the indel cost can be set as half of the maximum substitution cost, which is a common rule of thumb.
    
    This makes the function practical even if you don’t want to decide the numbers yourself. 

4. **Output format**
   
   By default, you get a full `n×n` DataFrame with distances between all sequences. For large datasets, you can also request a reduced matrix over unique sequences only, which saves memory. And if you used `refseq`, you’ll get a rectangular `|A|×|B|` DataFrame comparing just those two groups.

So in short:

* **You feed in sequences** (`SequenceData` object).
* **You choose a method** (OM, HAM, etc.), which defines what “difference” means.
* **You decide on normalization and costs** (or let the function handle them automatically).
* **You get back a matrix** that quantifies differences between every pair (or between two groups).

This distance matrix is the starting point for many other analyses, including clustering, visualization, typologies, or regression models on sequence data.

Here’s a clean, beginner-friendly rewrite of “The Main Families of Measures” with the TODOs resolved and the categories clarified. I’ve also fixed the dangling link by referencing your quick-defaults note instead.

## The Main Families of Measures

### 1) Edit distances (most commonly used)

These treat differences as “operations” needed to turn one sequence into another, then find the minimum total cost.

* **Optimal Matching (OM):** uses three operations with user-set (or data-driven) costs:

  1. insert a state, 2) delete a state, 3) substitute one state for another.
     The minimal total edit cost between the two sequences is the distance.

* OM variants:

  * **OMspell:** operates on spells (runs) rather than single positions, so durations can matter more naturally.
  * **OMloc:** lets costs depend on local context.
  * **OMslen:** lets costs depend on spell length.
  * **OMstran:** compares sequences of transitions (changes) rather than states.

Focus: Depending on costs, OM can balance sequencing (order), timing (alignment), and duration (via spells).

Beginner baseline: If you don’t have a strong prior, a safe starting point is OM with sm="CONSTANT" (substitution cost = 2 for any state change) and indel = 1 (insert/delete cost).

* sm="CONSTANT" (=2): every substitution between two different states costs 2.
* indel=1: inserting or deleting a state costs 1.
* Intuition: indel is half the substitution cost, so small timing misalignments can be fixed by insert/delete rather than forcing a substitution.
* Example: turning \[A, B, C] into \[A, C] by deleting B costs 1; substituting B→C would cost 2, so deletion is preferred for brief misalignment.

### 2) Attribute-matching (positionwise) measures

These compare sequences position by position or by the order of shared subsequences; there are no insert/delete operations.

* **Hamming distance (HAM):** position-by-position comparison. If at time t one sequence is MARRIED and the other is SINGLE, that’s a mismatch. Requires equal-length sequences.

* **Dynamic Hamming Distance (DHD):** a variant of Hamming with time-varying substitution costs across positions (e.g., early vs. late differences can be weighted differently).

* **Longest Common Subsequence (LCS):** finds the longest ordered subsequence shared by both sequences (states must appear in the same order but not at the same time index).

* **Number of Matching Subsequences (NMS):** counts all ordered subsequences in common (a more exhaustive version than LCS).

* **SVRspell:** extends subsequence matching with attention to spell length.

Focus: Strong on sequencing (order). HAM is also timing-sensitive because it compares aligned positions. These methods are less about exact durations unless the specific variant (e.g., SVRspell) encodes them.

When to use:

* You care about exact timing at each position → HAM / DHD (equal lengths required).
* You care about ordering but not exact timing → LCS / NMS / SVRspell.
* You want early vs. late positions to matter differently → DHD.

### 3) Distribution-based measures (rarely used)

These ignore order and timing and compare only how much time each sequence spends in each state.

* **Euclidean distance (EUCLID):** compares exposure vectors (time in each state).
* **Chi-squared distance (CHI2):** like EUCLID but gives relatively more weight to rarer states.

Focus: Durations/exposures only. Two sequences can look identical here even if one married early and the other late, as long as total time in each state is the same.

When to use:

* You explicitly want to compare “time budgets” across states and don’t want order/timing to influence the result.

## How They Differ and Connect

* **Distribution-based vs. Edit-based:**
  Distribution looks only at “how much time” in each state (ignoring order). Edit distances care a lot about order and timing.

* **HAM vs. OM:**
  
  HAM is equivalent to OM with prohibitively large insert/delete costs (so no shifting is allowed). 

  OM generalizes HAM by allowing shifts as it can realign sequences via insert/delete when appropriate, so it’s more flexible.

* **LCS vs. OM:**
  LCS is like OM where substitution costs are high and indels are cheap. Both come from the same family of edit distance.

* **NMS vs. SVRspell:**
  NMS counts subsequences; SVRspell refines it by weighting long subsequences and durations.

## How to Choose a Measure

There’s no universal “best.” It depends on your research question:

* **If you care about sequencing (order):** use OMstran, OMspell (with low expansion cost), or SVRspell.
* **If you care about timing (when events happen):** use Hamming distance or CHI2 with many time slices.
* **If you care about duration (how long states last):** use OMspell (with high expansion cost) or CHI2/EUCLID with few slices.
* **If you care about small perturbations (e.g., short unemployment spells):** SVRspell is good.
* **If you want a balance:** OM, with carefully set costs (especially indel=1 and sm=2), is still a solid general-purpose choice.

## A Simple Analogy

Think of comparing two songs:

* **Distribution-based:** Compare how many minutes of jazz vs. rock are in each song. (Ignores order.)
* **Hamming:** Compare them second by second. (Exact alignment, very timing-sensitive.)
* **LCS/NMS:** Compare common melodies or riffs, no matter when they appear.
* **Optimal Matching:** Count how many edits (cut, paste, replace notes) to turn one song into the other.

---
*Note:

By default, the function computes distances between *all sequences* in your dataset, returning an `n×n` matrix.

But sometimes you only want to compare two groups (e.g., men vs. women, treated vs. control). In that case, you can pass `refseq=[idxs_A, idxs_B]`, where each element is a list of row indices. The result will be an `|A|×|B|` table comparing only those two groups.

> ⚡ **About the `refseq` parameter**
>
> The parameter `refseq` already exists in TraMineR (the R library for sequence analysis). Its original meaning is reference sequence (as the name indicates):
>
> * If `refseq` is a single sequence (or its index), distances are computed **from all sequences to this reference.
>
> In Sequenzo, we extend this idea:
>
> * If `refseq` is a list of two sets of indices `[A, B]`, the function computes all pairwise distances between the two groups.
>
>   * The output is a rectangular `|A| × |B|` distance table.
>   * This is especially useful when directly comparing two populations (e.g., treated vs. control, men vs. women).

## References

Studer, Matthias, and Gilbert Ritschard. "What matters in differences between life trajectories: A comparative review of sequence dissimilarity measures." Journal of the Royal Statistical Society Series A: Statistics in Society 179, no. 2 (2016): 481-511.

*Author: Yuqi Liang*