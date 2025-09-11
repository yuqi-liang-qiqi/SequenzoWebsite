<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-02-21 03:10:43
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-11 10:46:21
 * @FilePath: /SequenzoWebsite/docs/en/tutorials/video-tutorial.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Timing, Duration, and Order in Sequences

A sequence is simply the list of states a person goes through over time (e.g., Education → Employment → Unemployment → Employment). But how do we compare sequences between people or groups?  

Researchers usually focus on three key aspects: **timing**, **duration**, and **order**. These terms often appear in methodological papers, but they are less commonly explained in classrooms or applied studies—even though they are the foundation for understanding dissimilarity measures.

*Note:* Although I mostly use people and life-course examples here, the same concepts apply in many other fields. For instance, firms moving through growth, decline, and renewal stages in management, organizations transitioning across governance structures, industries shifting between boom and crisis in economics, or historical empires rising, fragmenting, and unifying again in history.

### 1. Timing: *When things happen*

* **Definition:** Timing refers to the age or calendar time (e.g., year, month, or date) at which an event or state occurs.
* **Example:** Person A has their first child at age 22. Person B has their first child at age 35. Both experience the same event, becoming a parent, but the timing is very different.
* **Why it matters:** Timing might reflect age norms and life-stage expectations. For instance, marrying in your twenties may be seen differently from marrying in your forties.

### 2. Duration: *How long things last*

* **Definition:** Duration captures the length of time a person stays in a state before moving on.
* **Example:** Two people may both experience unemployment. One is unemployed for 2 months, the other for 3 years. Their sequences share the same states, but the **durations** differ sharply.
* **Why it matters:** Duration helps us distinguish between stable and unstable lives. A short spell of unemployment may have different consequences than long-term unemployment.  

> 💡 **Quick check:** Why do we say “a short spell of unemployment” here instead of using “state,” “subsequence,” or “sequence”?  
> **Answer:** Because a *spell* refers to a continuous block of the same state without interruption. Two months or three years of uninterrupted unemployment each form a spell. A *state* is just one time point, a *subsequence* can skip around, and a *full sequence* covers the entire trajectory. Duration always refers to the length of a spell.

### 3. Order (Sequencing): *In what sequence things happen*

* **Definition:** Order refers to the arrangement of states — the sequence in which life events occur.
* **Example:** Person A: Education → Job → Marriage → Parenthood.
  Person B: Education → Parenthood → Job → Marriage.
  Both may spend the same total time in each state, but the **order** tells a very different life story .
* **Why it matters:** Order captures social norms about “what should come first.” For example, in many societies, marriage before parenthood is considered the “norm,” while reversing the order signals a different trajectory.

### How They Work Together

Timing, duration, and order are not independent. Changing one often affects the others:

* If you delay marriage (timing), you may also shorten the duration of childrearing before retirement.
* If you spend longer in education (duration), this shifts the timing of entering full-time work and may change the order of later milestones  .

### A Simple Analogy

Think of a **movie**:

* **Order** is the storyline — which scenes happen first, second, last.
* **Timing** is when each scene occurs on the clock — at minute 5, minute 20, or minute 90.
* **Duration** is how long each scene lasts — a quick 30-second shot vs. a 15-minute sequence.

The same “movie” can feel very different if the order of scenes is shuffled, if certain scenes are delayed, or if they drag on too long.

### Why Researchers Care

Scholars use these three aspects to understand how societies change:

* Did East and West Germans enter jobs at the **same timing** after reunification?
* Did men and women spend different **durations** in parental leave?
* Did younger cohorts reverse the **order** of marriage and childbirth compared to older cohorts?

By analyzing timing, duration, and order, we can see not just *whether* lives differ, but *how* they differ.

## Practice Exercises

### Exercise 1: Identify the Concept

For each situation below, decide whether the difference between two people’s trajectories is mainly about **timing**, **duration**, or **order**.

1. Person A finishes education at age 18, Person B at age 30.
2. Person A and Person B both experience unemployment, but Person A is unemployed for 3 months and Person B for 4 years.
3. Person A marries before becoming a parent, Person B becomes a parent before marrying.

### Exercise 2: Spell or State?

Consider the sequence:
`(EDU, EDU, EDU, FT, FT, UNEMP, UNEMP, FT)`

1. How many **spells** does this sequence contain?
2. Which spell is the longest?
3. What is the **state** at year 6?

### Exercise 3: Apply the Analogy

Think of a movie:

1. Which aspect (timing, duration, or order) corresponds to the fact that the “big reveal” scene happens at minute 15 in one version of the movie and at minute 80 in another?
2. Which aspect corresponds to one version where the fight scene lasts 30 seconds and another where it lasts 15 minutes?
3. Which aspect corresponds to rearranging the scenes so the ending comes first?

### Exercise 4: Reflection Question

Why might researchers want to analyze timing, duration, and order separately, instead of just looking at whether people experienced the same states in their lives?

## Answers and Explanations

### Exercise 1

1. **Timing** — both complete education, but at very different ages.
2. **Duration** — both are unemployed, but the length of unemployment differs.
3. **Order** — both marry and become parents, but in different sequences.

### Exercise 2

1. Five spells: `(EDU, EDU, EDU)`, `(FT, FT)`, `(UNEMP, UNEMP)`, `(FT)`.
2. The longest spell is `(EDU, EDU, EDU)` (three years).
3. Year 6 → `UNEMP` (the state at that single time point).

*Note:* Duration refers to spells (continuous runs of the same state), not single states or subsequences.

### Exercise 3

1. **Timing** — the reveal scene occurs earlier or later.
2. **Duration** — the fight scene lasts a short or long time.
3. **Order** — the scenes are shown in a different sequence.

### Exercise 4

Because timing, duration, and order each capture a different dimension of how lives unfold. Two people may experience the same events, but at different ages (timing), for different lengths (duration), or in different sequences (order). Looking at only one aspect risks missing important differences in life trajectories.

## References

Liao, Tim Futing, and Anette Eva Fasang. 2020. Comparing Groups of Life-Course Sequences Using the Bayesian Information Criterion and the Likelihood-Ratio Test. Sociological Methodology 51(1):44–85. https://doi.org/10.1177/0081175020959401

Studer, Matthias, and Gilbert Ritschard. 2016. What Matters in Differences between Life Trajectories: A Comparative Review of Sequence Dissimilarity Measures. Journal of the Royal Statistical Society: Series A (Statistics in Society) 179(2):481–511. https://doi.org/10.1111/rssa.12125

*Author: Yuqi Liang*