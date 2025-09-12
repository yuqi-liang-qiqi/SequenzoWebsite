# Understanding Dissimilarity Measures in Sequence Analysis

When we study life trajectories, such as careers, family lives, or health histories, we often want to compare people’s paths. But how do we decide how “different” two life paths are? That’s where dissimilarity measures come in.

A dissimilarity measure is just a way of putting a number on “how far apart” two sequences are (not how close, which would be similarity). The bigger the number, the more different the sequences.

Think of comparing two people’s careers:

* Person A: *Education → Job → Marriage → Parenthood*
* Person B: *Education → Job → Parenthood → Marriage*

Both share the same states, but the **order** differs. A good dissimilarity measure should capture that.

## What Aspects Can Sequences Differ In?

According to the review, differences between sequences usually boil down to three aspects:

1. **Sequencing** – the order of events (marriage before kids, or kids before marriage).
2. **Timing** – *when* something happens (marrying at 22 vs. at 35).
3. **Duration** – *how long* a state lasts (10 years in a job vs. 2 years).

Different measures emphasize one or more of these aspects.

## The Main Families of Measures

### 1. Distribution-based measures

These look only at *how much time is spent in each state*, not at the order.

* **Example:** Two people who each spent 10 years married and 10 years single will look *identical*, even if one married early and the other late.
* **Common algorithms:**

  * **Euclidean distance (EUCLID):** compares raw differences in time spent.
  * **Chi-squared distance (CHI2):** gives more weight to rare states (e.g., long unemployment spells).

**Focus:** Duration and overall exposure, not sequencing.

### 2. Attribute-matching measures

These count how many elements match directly.

* **Hamming distance (HAM):** compares sequences position by position. If at age 25 one is married and the other single, that’s a mismatch. Requires equal-length sequences.
* **Longest Common Subsequence (LCS):** looks for the longest sequence of states that appears in both, in the same order (but not necessarily at the same time).
* **Number of Matching Subsequences (NMS):** more flexible, counts all ordered subsequences in common.
* **SVRspell:** an advanced version that also considers spell length.

**Focus:** Sequencing (order), sometimes timing, but less on exact durations.

### 3. Edit distances

These treat differences as “operations” needed to turn one sequence into another.

* **Optimal Matching (OM):** the most famous. It uses three operations:

  1. Insert a state
  2. Delete a state
  3. Substitute one state for another
     Each has a “cost,” and the total minimal cost to turn one sequence into the other is the distance.
* **Variants of OM:**

  * **OMspell:** works with whole spells (runs of the same state) instead of individual states.
  * **OMloc:** makes costs depend on the local context.
  * **OMslen:** makes costs depend on spell length.
  * **OMstran:** compares sequences of transitions rather than states.
* **Dynamic Hamming Distance (DHD):** a variant of HAM with time-varying costs.

**Focus:** Can balance sequencing, timing, and duration depending on how costs are set.

## How They Differ and Connect

* **Distribution-based vs. Edit-based:**
  Distribution looks only at “how much time” in each state (ignoring order). Edit distances care a lot about order and timing.

* **HAM vs. OM:**
  HAM = OM with very high insertion/deletion costs (so you can’t shift states).
  OM generalizes HAM by allowing shifts, so it’s more flexible.

* **LCS vs. OM:**
  LCS is like OM where substitution costs are high and indels are cheap. Both come from the same “edit” family.

* **NMS vs. SVRspell:**
  NMS counts subsequences; SVRspell refines it by weighting long subsequences and durations.

## How to Choose a Measure

There’s no universal “best.” It depends on your research question:

* **If you care about sequencing (order):** use OMstran, OMspell (with low expansion cost), or SVRspell.
* **If you care about timing (when events happen):** use Hamming distance or CHI2 with many time slices.
* **If you care about duration (how long states last):** use OMspell (with high expansion cost) or CHI2/EUCLID with few slices.
* **If you care about small perturbations (e.g., short unemployment spells):** SVRspell is good.
* **If you want a balance:** OM, with carefully set costs, is still a solid general-purpose choice.

## A Simple Analogy

Think of comparing two songs:

* **Distribution-based:** Compare how many minutes of jazz vs. rock are in each song. (Ignores order.)
* **Hamming:** Compare them second by second. (Exact alignment, very timing-sensitive.)
* **LCS/NMS:** Compare common melodies or riffs, no matter when they appear.
* **Optimal Matching:** Count how many edits (cut, paste, replace notes) to turn one song into the other.

## References

TODO: add 

*Author: Yuqi Liang*