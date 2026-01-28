# Statistics Is More Than Models: A Beginner's Guide to Concepts, Models, and Assumptions

When people first learn statistics, they are often taught through models, such as inear regression, logistic regression, and multilevel models, etc. These quickly become the center of attention. As a result, many beginners walk away with the impression that:

**Statistics = models.**

This is understandable, but it is also incomplete.

Statistics is not just about models. It is a broader language for reasoning about uncertainty, data, and randomness. Models are only one part of that language.

This guide aims to clarify what *is* a model, what is *not* a model, and where concepts like probability, random processes, sequence analysis, and Markov chains fit in. We will build understanding step by step, starting with the basics and gradually moving to more complex ideas.

## Part 1: Understanding Statistical Models

### What Is a Statistical Model?

Let's start with the most fundamental question: What exactly is a statistical model?

A useful way to think about a statistical model is this:

**A statistical model is a simplified data-generating machine.**

Think of it like a recipe. Just as a recipe tells you what ingredients to use and how to combine them to make a dish, a statistical model tells you:
- What variables are involved
- How they relate to each other
- What randomness or uncertainty exists

Specifically, a proper statistical model must specify three things:

1. **What are the random variables we observe?**
   - These are the actual data points we collect and analyze.
   - For example, if we're studying student heights, the heights we measure (like 165 cm, 170 cm, 158 cm) are the random variables we observe.

2. **How are these variables generated probabilistically?**
   - This describes the mechanism that produces the data, including randomness.
   - We call this the **data-generating process**. 
   - For example, we might assume that student heights follow a normal distribution with some mean (average height) and variance (how spread out the heights are). This tells us not just what we observe, but how randomness creates variation in the data.

3. **What parameters control this process and can be estimated from data?**
   - These are the unknown quantities we want to learn from our observations.
   - We call this **parameter estimation**. 
   - For example, if we assume heights follow a normal distribution, we need to estimate the mean (average height) and variance (spread). Methods like maximum likelihood estimation (MLE) help us find the best values for these parameters based on the data we've collected.

#### A Concrete Example: Linear Regression

Let's look at a familiar example to make this concrete. In linear regression:

$$Y = X\beta + \varepsilon, \text{ where } \varepsilon \sim \text{Normal}(0, \sigma^2)$$

This is a model because:

* **It defines variables**: $(Y, X, \varepsilon)$
  - $Y$ is the outcome we are trying to predict
  - $X$ contains the predictors
  - $\varepsilon$ represents random error

* **It specifies a probabilistic mechanism**: The error term $\varepsilon$ follows a normal distribution with mean 0 and variance $\sigma^2$. This means that even when we know $X$ and $\beta$, our prediction won't be perfect as there will be random variation around the predicted value. The normal distribution tells us exactly how this randomness behaves: errors are centered around 0 (meaning they average out), and $\sigma^2$ controls how spread out these errors are.

* **It contains estimable parameters**: $(\beta, \sigma^2)$
  - $\beta$ tells us how $X$ relates to $Y$
  - $\sigma^2$ tells us how much variability there is

Models are tools for **fitting data**, making predictions, and testing hypotheses. They help us understand patterns and make informed decisions.

### Not Everything in Statistics Is a Model

Now that we understand what a model is, it is important to recognize that many important ideas in statistics are *not* models. They play different roles.

Examples include:

* **The Law of Large Numbers**: tells us that averages converge to expected values
* **The Central Limit Theorem**: explains why many distributions look normal when you average enough observations
* **Probability distributions**: describe patterns of randomness (like the normal distribution)
* **Random variables**: mathematical objects that represent uncertain quantities

These are **foundational principles and concepts**, not models.

For instance, the Central Limit Theorem does not describe how your data were generated. It tells you something about what happens *if* you repeatedly sample data under very general conditions. It is a guarantee about behavior, not a model of data generation.

Think of these as:

* **Rules of the game**: fundamental principles that govern how randomness works
* **Guarantees about behavior**: theoretical results that hold under certain conditions
* **Theoretical foundations**: building blocks that support models

They support models, but they are not models themselves. Understanding this distinction helps you see statistics as a layered system where concepts build on each other.

### Models vs. Assumptions vs. Methods

Before we go further, it is helpful to distinguish between three related but different concepts that are often confused:

#### 1. Probabilistic Models

These define a full data-generating process and include estimable parameters.

**Examples:**
* Linear and logistic regression
* Hidden Markov Models
* Bayesian hierarchical models

These models explicitly describe **uncertainty** (the randomness and variability in the data) and allow **statistical inference** (a broader process of learning from data that includes, but is not limited to, parameter estimation). 

Statistical inference encompasses:

* **Parameter estimation**: finding the best values for unknown parameters (e.g., estimating the slope $\beta$ in regression)
* **Confidence intervals**: quantifying how uncertain our estimates are (e.g., "we're 95% confident that $\beta$ is between 0.5 and 1.2")
* **Hypothesis testing**: making decisions based on data (e.g., "is there evidence that $\beta$ is different from zero?")

#### 2. Structural Assumptions (Assumptions About Dependence)

These are rules about **how variables depend on each other** or **how observations relate to each other**, but they do not define a full model on their own. Think of them as describing the "shape" or "pattern" of relationships, without specifying the exact probabilities or parameters.

**Examples:**
* Independence assumptions: observations are independent
* The Markov assumption: the future depends only on the present
* Stationarity: the process doesn't change over time

A Markov chain, before specifying transition probabilities to be estimated, belongs to this category. It tells us *how* states can depend on each other, but not *what* the probabilities are.

#### 3. Methods and Algorithms

These are procedures for analyzing data, not models of how data are generated.

**Examples:**
* EM and Baum–Welch algorithms: used to fit models
* Clustering algorithms: group similar observations
* Dissimilarity-based clustering approach in sequence analysis: compares and groups sequences

These methods can be applied to data or to the outputs of models, but they do not define probabilistic mechanisms themselves.

**Why does this matter?** Confusing these categories leads to confusion. If everything is called a "model", beginners may:
* Expect estimation where none is needed
* Miss foundational ideas such as probability theory
* Struggle to understand how algorithms relate to models

## Part 2: From Concepts to Models — Random Processes and Markov Chains

Now that we understand what models are, let's explore how concepts can gradually become models. This journey will help us see the difference between a framework for thinking and an actual statistical model.

### What Is a Random Process?

A random process (or stochastic process) is a way of describing randomness over time.

Up until now, we've mostly talked about single random variables or a few variables at once. But what if we want to understand how something changes randomly over time?

Instead of one random variable, we now consider a whole sequence:
$$X_1, X_2, X_3, \ldots$$

**Examples:**
* Daily stock prices: each day's price is a random variable (particularly, it is called numeric time series)
* A person's employment status over their life, such as employed, unemployed, retired, etc. It is called categorical time series 
* Weather conditions across days, e.g., sunny, rainy, cloudy

A random process answers this question:

> How does something evolve randomly over time?

By itself, a random process is not yet a model. It is a *framework* for thinking about time-dependent randomness. It tells us we're dealing with sequences of random variables, but it doesn't specify:
* What the probabilities are
* How states transition from one to another
* What parameters we need to estimate

Think of it as setting up the stage before writing the script.

### What Is a Markov Chain?

A Markov chain is a specific type of random process with a simple dependency rule:

> The future depends only on the present, not on the past.

In plain terms: If you know the current state, earlier history does not add extra information about what happens next.

This is called the **Markov property**.

#### A Simple Example

Imagine tracking someone's employment status:
- Today: Employed
- Tomorrow: Could be Employed or Unemployed
- The probability of tomorrow's state depends only on today's state

It doesn't matter if they were employed for 10 years or just started yesterday. What matters is their current state.

**At this level, a Markov chain is still not a full statistical model.**

It only tells us *how dependence works*, i.e., the future depends only on the present. But it does not tell us:
* What the actual transition probabilities are
* How likely it is to go from "Employed" to "Unemployed"
* What parameters we need to estimate

It answers: **How are states allowed to depend on each other?**

But it does not yet answer: **"What are the actual probabilities?"**

### When Does a Markov Chain Become a Model?

A Markov chain becomes a statistical model when we specify:

* **A concrete set of states**: e.g., `{Employed, Unemployed, Retired}`
* **A transition probability matrix**: probabilities of moving from one state to another
* **Parameters to be estimated from data**: unknown transition probabilities we want to learn

Once we say:

**These transition probabilities are unknown and will be learned from data**

we now have:

* **Variables**: the states we observe
* **A probabilistic structure**: how states transition
* **Estimable parameters**: the transition probabilities

At this point, the Markov chain is no longer just a concept; instead, now it becomes a model.

#### Example: Employment Status Model

Let's say we want to model employment transitions. We might specify:

- States: {Employed, Unemployed}
- Transition probabilities:
  - $P(\text{Employed} \rightarrow \text{Employed}) = p_{11}$ (unknown, to be estimated)
  - $P(\text{Employed} \rightarrow \text{Unemployed}) = p_{12}$ (unknown, to be estimated)
  - $P(\text{Unemployed} \rightarrow \text{Employed}) = p_{21}$ (unknown, to be estimated)
  - $P(\text{Unemployed} \rightarrow \text{Unemployed}) = p_{22}$ (unknown, to be estimated)

Now we have a model! We can estimate these probabilities from data and make predictions.

### Hidden Markov Models: From Dependency Assumptions to Full Model

Hidden Markov Models (HMMs) take one more step. They add another layer of complexity that makes them powerful tools for many applications.

They assume:

* **There is an underlying Markov chain**: these are called "hidden states" because we don't observe them directly
* **We do not observe these states directly**: we only see indirect evidence
* **Observed data are generated from the hidden states**: each hidden state produces observations according to some probability distribution

#### A Concrete Example

Imagine you're trying to understand someone's true employment status, but you can only observe their daily spending patterns:

- **Hidden states**: {Employed, Unemployed}
- **Observations**: {High spending, Low spending}

The model assumes:
- If someone is Employed (hidden), they're more likely to have High spending (observed)
- If someone is Unemployed (hidden), they're more likely to have Low spending (observed)

But there's uncertainty. For instance, sometimes employed people spend little, and sometimes unemployed people spend a lot.

HMMs clearly define:

* **How states evolve**: via the Markov chain transition probabilities
* **How observations are produced**: via emission probabilities (e.g., $P(\text{High spending} | \text{Employed})$)
* **Which parameters need to be estimated**: both transition probabilities and emission probabilities

This is why HMMs are unambiguously statistical models. They specify a complete data-generating process with estimable parameters.

## Part 3: Sequence Analysis — A Special Case Study

Now that we understand how concepts become models, let's examine sequence analysis. This is a perfect case study because it's often confused with modeling, but it's actually something quite different.

### What Is Sequence Analysis?

Sequence analysis is a way of studying ordered trajectories over time.

Instead of focusing on a single outcome or a small number of summary variables, sequence analysis treats the entire sequence of states as the main object of interest.

**Examples of sequences include:**

* A person's employment status over their life: `[Student, Student, Employed, Employed, Unemployed, Employed, Retired]`
* Family states: `[Single, Single, Married, Married, Divorced, Single]`
* Organizational careers or migration histories
* Educational trajectories: `[High School, High School, College, College, Graduate School]`

The key idea is simple: **order, timing, and duration matter.**

Two people might both be employed at age 30, but one might have been employed continuously since age 20, while the other might have had multiple job changes. Sequence analysis captures these differences.

### Is Dissimilarity-based Clustering in Sequence Analysis a Statistical Model?

**No. It is not a statistical model.**

This is a crucial point that many beginners find confusing. Dissimilarity-based clustering in sequence analysis is best understood as a **descriptive and exploratory framework**, not a data-generating model.

It does not assume:

* **How the data were generated**: it doesn't specify a probabilistic mechanism
* **A probabilistic mechanism behind the sequences**: it doesn't model transitions
* **Parameters to be estimated**: there are no unknown parameters to learn

Instead, it asks:

**"How similar or different are these observed sequences?"**

This makes it fundamentally different from models like regression or Hidden Markov Models, which assume how data are generated and estimate parameters.

### Dissimilarity-Based Sequence Analysis

At the core of most sequence analysis methods is the idea of **dissimilarity** (or distance).

The workflow is typically:

1. **Define a distance or dissimilarity measure** between sequences
   - How do we measure how different two sequences are?

2. **Compute pairwise distances** between all sequences
   - Create a distance matrix showing how different each pair of sequences is

3. **Use these distances** for clustering, visualization, or classification
   - Group similar sequences together
   - Visualize patterns
   - Classify new sequences

The most well-known example is **Optimal Matching (OM)**.

OM measures how different two sequences are by calculating the minimum "cost" of transforming one sequence into the other through operations such as:

* **Substitution**: changing one state to another (e.g., changing "Employed" to "Unemployed")
* **Insertion**: adding a state (e.g., inserting "Unemployed" into a sequence)
* **Deletion**: removing a state (e.g., deleting "Unemployed" from a sequence)

**Importantly, these costs are user-defined or heuristic, not estimated from a probabilistic model.**

For example, you might decide that:
- Substituting "Employed" with "Unemployed" costs 2 points
- Inserting or deleting a state costs 1 point

These are choices you make based on your research question, not probabilities estimated from data.

### Why Dissimilarity-Based Clustering Is Not a Model

Dissimilarity-based clustering does **not** specify how sequences are generated.

There is:

* **No likelihood function**: we're not modeling the probability of observing sequences
* **No stochastic process assumption**: we're not assuming sequences follow a Markov chain or any other process
* **No parameters that describe a data-generating mechanism**: there's nothing to estimate

Clustering is performed **after** distances are computed, treating the distance matrix as given.

In this sense:

* **Distance → input** — we compute distances first
* **Clusters → descriptive summaries** — clustering summarizes patterns in the distances

The clusters represent **patterns in the data**, not latent states generated by a model. They're descriptive, not generative.

### What Dissimilarity-based Clustering in Sequence Analysis Is Good At

This approach excels at:

* **Describing complex trajectories**: capturing the full complexity of sequences
* **Revealing typical patterns and career paths**: finding common sequences in data
* **Comparing large numbers of sequences** visually and structurally: seeing the forest, not just the trees

It is particularly useful when:

* **The goal is exploration rather than prediction**: you want to understand patterns, not predict future states
* **The data are complex and heterogeneous**: sequences vary widely
* **Strong modeling assumptions are hard to justify**: you can't assume a simple Markov process

This is why dissimilarity-based clustering in sequence analysis is especially popular in sociology, demography, and life-course research, where sequences are complex and the goal is often understanding patterns rather than making predictions.

### Dissimilarity-based Clustering in Sequence Analysis vs. Model-Based Approaches

It is helpful to contrast sequence analysis with model-based approaches such as Hidden Markov Models.

**Dissimilarity-based clustering in sequence analysis:**
* Starts from observed sequences
* Compares them directly using dissimilarities
* Produces descriptive clusters or typologies
* Asks: "What patterns do we see in the data?"

**Hidden Markov Models:**
* Assume an underlying stochastic process
* Introduce latent states
* Estimate parameters via likelihood-based methods
* Ask: "What process could have generated the data?"

**Neither approach is better in general as they answer different questions.**

Sequence analysis focuses on **pattern similarity**, i.e., finding groups of similar sequences.
HMMs focus on **process inference**, i.e.,understanding the mechanism that generates sequences.

They can be complementary. You might use sequence analysis to explore patterns, then use HMMs to model the processes that generate those patterns.

### Why This Distinction Matters

If sequence analysis is mistaken for a model, learners may:

* **Look for parameters that do not exist**: searching for transition probabilities that aren't there
* **Expect probabilistic interpretations of clusters**: thinking clusters represent latent states
* **Confuse typologies with latent states**: mixing up descriptive groups with model-based hidden states

Understanding sequence analysis as a **descriptive framework** helps avoid these misunderstandings.

It also clarifies why sequence analysis and model-based approaches are often complementary rather than competing. They serve different purposes and can be used together effectively.

### Summary: Where Sequence Analysis Fits

Sequence analysis sits in between raw data and statistical models.

It provides:

* **A structured way to summarize trajectories**: organizing complex sequences
* **Insight into temporal patterns**: revealing structure in sequences
* **A bridge between descriptive analysis and modeling**: preparing data for modeling or serving as an alternative

But it does not, by itself, explain how data are generated. It describes patterns; it doesn't model processes.

## Part 4: Probabilistic Models vs. Other Types of Models

Now that we've explored various concepts and methods, let's address a common source of confusion: the word "model" itself.

### Are All Models Probabilistic Models?

In statistics, the word *model* is used very frequently, but it is not always used carefully. This often leads to confusion, especially for beginners.

In most statistical contexts, when people say "model" without further clarification, they are referring to a **probabilistic (statistical) model**. However, the term *model* itself is broader than probabilistic modeling.

Understanding this distinction is essential for learning statistics properly.

### What Does "Model" Usually Mean in Statistics?

In statistics, a model usually means a **probabilistic data-generating model**.

Such a model specifies:

1. **What random variables are involved**: what we observe
2. **How these variables are generated probabilistically**: the mechanism including randomness
3. **Which parameters control this process and can be estimated from data**: what we want to learn

For example, regression models, generalized linear models, Hidden Markov Models, and Bayesian hierarchical models all belong to this category.

These models explicitly describe uncertainty and allow statistical inference, such as:
* Parameter estimation
* Confidence intervals
* Hypothesis testing

Because probability is the core language of statistics, this meaning of "model" is the default in statistical education.

### Is Model Always Probabilistic?

**No.**

In a broader scientific sense, a model is simply a **simplified representation of reality**. Under this broader definition, many things can be called models, including:

* **Mathematical models**: equations describing relationships
* **Mechanistic or process-based models**: models based on understanding of mechanisms
* **Simulation models**: computer programs that simulate processes
* **Algorithmic or computational models**: procedures that process data

However, in statistics, using the word *model* without qualification almost always implies a probabilistic model.

This difference in usage is a major source of confusion for beginners. When a statistician says "model," they usually mean a probabilistic model. When a computer scientist or engineer says "model," they might mean something else.

### Where Does Dissimilarity-based Clustering in Sequence Analysis Fit?

Dissimilarity-based clustering is **not a probabilistic model**.

It does not specify:

* **A data-generating process**: how sequences are produced
* **A likelihood function**: he probability of observing sequences
* **Parameters to be estimated** — unknown quantities to learn

Instead, it provides a structured way to compare and summarize observed sequences based on their similarity or dissimilarity.

For this reason, sequence analysis is best understood as a **descriptive and exploratory framework**, rather than a statistical model.

## Part 5: Putting It All Together

### A Simple Rule of Thumb

When encountering a new technique in statistics, ask:

1. **Does it describe how data are generated probabilistically?**
   - Does it specify a mechanism that includes randomness?

2. **Does it include unknown parameters?**
   - Are there quantities we need to estimate from data?

3. **Can these parameters be estimated from data?**
   - Can we learn these parameters using statistical methods?

**If the answer to all three is yes, it is a probabilistic model.**

**If not, it is likely:**
* An assumption (like the Markov property)
* A method or algorithm (like clustering)
* A descriptive framework (like sequence analysis)
* A foundational concept (like the Central Limit Theorem)

This simple checklist can help you navigate the landscape of statistical ideas.

### The Layered Structure of Statistics

Understanding these distinctions helps learners see statistics as a layered system:

**Layer 1: Foundations**
* Probability theory
* Random variables
* Distributions
* Theorems (Law of Large Numbers, Central Limit Theorem)

**Layer 2: Structures**
* Random processes
* Dependence structures (like Markov property)
* Assumptions about how things relate

**Layer 3: Models**
* Probabilistic data-generating models
* With estimable parameters
* Examples: regression, HMMs, Bayesian models

**Layer 4: Methods and Algorithms**
* Tools for fitting models
* Descriptive techniques
* Computational procedures

Each layer builds on the previous one. You can't understand models without understanding foundations. You can't use algorithms effectively without understanding what models they're designed for.

### Final Takeaway

Statistics is not just a collection of models.

It is a way of thinking about uncertainty.

Models are important, but they sit on top of deeper ideas:
* **Probability**: the language of uncertainty
* **Randomness**: the nature of variability
* **Relationships and dependencies**: how variables relate to each other over time, and the specific rules that govern these relationships (e.g., Markov property is about "future depends only on present", independence assumptions indicates "observations are independent")

Learning statistics well means understanding all of these layers not just the models.

Descriptive approaches like sequence analysis play an important complementary role, even though they are not models themselves. They help us explore data, understand patterns, and prepare for modeling.

Understanding these distinctions helps avoid confusion and leads to more thoughtful and transparent data analysis. When you know what something is, and what it isn't, you can use it more effectively and communicate your work more clearly.

## Exercises: Test Your Understanding

The following exercises will help you solidify your understanding of the key concepts covered in this guide. Try to answer them without looking at the solutions first!

### Part 1: Fill in the Blanks

**Exercise 1.1: Components of a Statistical Model**

A proper statistical model must specify three things:

1. **What are the random variables we observe?**
   - These are the actual ________ we collect and analyze.
   - Example: If we're studying student heights, the heights we measure (like 165 cm, 170 cm) are the ________ we observe.

2. **How are these variables generated probabilistically?**
   - This describes the ________ that produces the data, including randomness.
   - We call this the ________.
   - Example: We might assume that student heights follow a ________ distribution with some mean and variance.

3. **What parameters control this process and can be estimated from data?**
   - These are the unknown ________ we want to learn from our observations.
   - We call this ________.
   - Example: Methods like ________ help us find the best values for these parameters.

**Exercise 1.2: Statistical Inference**

Statistical inference is a broader process of learning from data that includes, but is not limited to, parameter estimation. It encompasses:

- **Parameter estimation**: finding the best values for unknown ________
- **Confidence intervals**: quantifying how ________ our estimates are
- **Hypothesis testing**: making ________ based on data

**Exercise 1.3: When Does a Markov Chain Become a Model?**

A Markov chain becomes a statistical model when we specify:

- A concrete set of ________
- A transition ________ matrix
- Parameters to be ________ from data

Before this, a Markov chain only tells us *how* states can depend on each other (e.g., "future depends only on present"), but not *what* the actual ________ are.

### Part 2: Multiple Choice Questions

**Exercise 2.1: What Is a Model?**

Which of the following is a statistical model?

A) The Central Limit Theorem  
B) Linear regression: $Y = X\beta + \varepsilon$ where $\varepsilon \sim \text{Normal}(0, \sigma^2)$  
C) The Law of Large Numbers  
D) A clustering algorithm

**Exercise 2.2: Structural Assumptions**

Which of the following is a structural assumption (assumption about dependence)?

A) A Hidden Markov Model with estimated transition probabilities  
B) The Markov property: "the future depends only on the present"  
C) Maximum likelihood estimation  
D) A normal distribution with mean 170 and variance 25

**Exercise 2.3: Sequence Analysis**

Dissimilarity-based clustering in sequence analysis is:

A) A probabilistic model that estimates transition probabilities  
B) A descriptive framework that compares sequences based on similarity  
C) A method that assumes sequences follow a Markov chain  
D) A model that specifies how sequences are generated

**Exercise 2.4: Random Process**

A random process (stochastic process) is:

A) Always a statistical model  
B) A framework for thinking about time-dependent randomness  
C) A method for estimating parameters  
D) The same as a Markov chain

**Exercise 2.5: Statistical Inference**

Which of the following is NOT part of statistical inference?

A) Parameter estimation  
B) Confidence intervals  
C) Hypothesis testing  
D) Data collection

### Part 3: Thought Questions

**Exercise 3.1: Identifying Models**

Consider the following scenarios. For each, determine whether it describes a statistical model, a structural assumption, a method/algorithm, or a foundational concept. Explain your reasoning.

a) "We assume that daily stock prices follow a random walk, where today's price equals yesterday's price plus a random error term that follows a normal distribution with mean 0 and variance $\sigma^2$. We want to estimate $\sigma^2$ from historical data."

b) "We assume that observations are independent of each other."

c) "We use k-means clustering to group similar sequences together."

d) "The Central Limit Theorem tells us that sample means converge to a normal distribution under certain conditions."

**Exercise 3.2: From Concept to Model**

Explain the difference between:
- A Markov chain as a concept (just the dependency rule: "future depends only on present")
- A Markov chain as a statistical model (with specified states and transition probabilities to be estimated)

Give a concrete example of each.

**Exercise 3.3: Sequence Analysis vs. Models**

Why is dissimilarity-based clustering in sequence analysis NOT a statistical model? What makes it different from Hidden Markov Models?

**Exercise 3.4: The Three Components**

Imagine you want to model how students' test scores relate to their study hours. Design a simple statistical model by specifying:

1. What random variables you observe
2. How these variables are generated probabilistically
3. What parameters you want to estimate

**Exercise 3.5: Real-World Application**

You're analyzing employment trajectories (sequences of employment status over time) for a group of people. You have two options:

- Option A: Use dissimilarity-based clustering to find groups of similar employment patterns
- Option B: Use a Hidden Markov Model to estimate transition probabilities between employment states

When would you choose Option A? When would you choose Option B? What are the key differences in what each approach tells you?

## Answers to Exercises

### Part 1: Fill in the Blanks

**Exercise 1.1: Components of a Statistical Model**

1. **What are the random variables we observe?**
   - These are the actual **data points** we collect and analyze.
   - Example: If we're studying student heights, the heights we measure (like 165 cm, 170 cm) are the **random variables** we observe.

2. **How are these variables generated probabilistically?**
   - This describes the **mechanism** that produces the data, including randomness.
   - We call this the **data-generating process**.
   - Example: We might assume that student heights follow a **normal** distribution with some mean and variance.

3. **What parameters control this process and can be estimated from data?**
   - These are the unknown **quantities** we want to learn from our observations.
   - We call this **parameter estimation**.
   - Example: Methods like **maximum likelihood estimation (MLE)** help us find the best values for these parameters.

**Exercise 1.2: Statistical Inference**

Statistical inference encompasses:

- **Parameter estimation**: finding the best values for unknown **parameters**
- **Confidence intervals**: quantifying how **uncertain** our estimates are
- **Hypothesis testing**: making **decisions** based on data

**Exercise 1.3: When Does a Markov Chain Become a Model?**

A Markov chain becomes a statistical model when we specify:

- A concrete set of **states**
- A transition **probability** matrix
- Parameters to be **estimated** from data

Before this, a Markov chain only tells us *how* states can depend on each other (e.g., "future depends only on present"), but not *what* the actual **probabilities** are.

### Part 2: Multiple Choice Questions

#### Exercise 2.1: What Is a Model?

**Answer: B) Linear regression: $Y = X\beta + \varepsilon$ where $\varepsilon \sim \text{Normal}(0, \sigma^2)$**

- **A)** The Central Limit Theorem is a foundational theorem, not a model. It describes behavior under certain conditions but doesn't specify a data-generating process.
- **B)** ✓ This is a statistical model because it specifies: (1) random variables $(Y, X, \varepsilon)$, (2) a probabilistic mechanism (normal distribution for errors), and (3) estimable parameters $(\beta, \sigma^2)$.
- **C)** The Law of Large Numbers is a foundational theorem, not a model.
- **D)** A clustering algorithm is a method/algorithm, not a model. It doesn't specify how data are generated.

#### Exercise 2.2: Structural Assumptions

**Answer: B) The Markov property: "the future depends only on the present"**

- **A)** A Hidden Markov Model with estimated transition probabilities is a full statistical model, not just an assumption.
- **B)** ✓ This is a structural assumption about dependence. It describes *how* states depend on each other (future depends only on present) without specifying the actual probabilities.
- **C)** Maximum likelihood estimation is a method for parameter estimation, not an assumption.
- **D)** A normal distribution with specific parameters is part of a model specification, not a structural assumption.

#### Exercise 2.3: Sequence Analysis

**Answer: B) A descriptive framework that compares sequences based on similarity**

- **A)** Sequence analysis does NOT estimate transition probabilities. That would be a model-based approach.
- **B)** ✓ Correct! Dissimilarity-based clustering in sequence analysis is a descriptive framework that compares sequences based on their similarity or dissimilarity.
- **C)** Sequence analysis does NOT assume sequences follow a Markov chain. It makes no assumptions about how sequences are generated.
- **D)** Sequence analysis does NOT specify how sequences are generated. It only compares observed sequences.

#### Exercise 2.4: Random Process

**Answer: B) A framework for thinking about time-dependent randomness**

- **A)** A random process is NOT always a model. By itself, it's just a framework for thinking about sequences of random variables over time.
- **B)** ✓ Correct! A random process is a framework for thinking about time-dependent randomness. It becomes a model only when we specify probabilities and parameters.
- **C)** A random process is not a method for estimation.
- **D)** A Markov chain is a specific type of random process, but not all random processes are Markov chains.

#### Exercise 2.5: Statistical Inference

**Answer: D) Data collection**

- **A)** Parameter estimation is part of statistical inference.
- **B)** Confidence intervals are part of statistical inference.
- **C)** Hypothesis testing is part of statistical inference.
- **D)** ✓ Data collection happens BEFORE statistical inference. Inference is what we do with the data after collecting it.

### Part 3: Thought Questions

#### Exercise 3.1: Identifying Models

a) **This is a statistical model.** It specifies: (1) random variables (daily stock prices), (2) a probabilistic mechanism (random walk with normal errors), and (3) estimable parameters ($\sigma^2$).

b) **This is a structural assumption (assumption about dependence).** It describes how observations relate to each other (they are independent) but doesn't specify a full data-generating process or parameters to estimate.

c) **This is a method/algorithm.** K-means clustering is a procedure for analyzing data, not a model of how data are generated.

d) **This is a foundational concept (a theorem).** The Central Limit Theorem describes behavior under certain conditions but doesn't specify a data-generating process or parameters to estimate.

#### Exercise 3.2: From Concept to Model

**Markov chain as a concept:**
- Only specifies the dependency rule: "the future depends only on the present"
- Example: "A person's employment status tomorrow depends only on their status today, not on their past history."
- This is just a rule about how states can depend on each other, without specifying probabilities.

**Markov chain as a statistical model:**
- Specifies concrete states, transition probabilities, and parameters to be estimated
- Example: States = {Employed, Unemployed}; Transition probabilities like $P(\text{Employed} \rightarrow \text{Unemployed}) = p_{12}$ (unknown, to be estimated from data)
- Now we have a complete model with estimable parameters.

#### Exercise 3.3: Sequence Analysis vs. Models

Dissimilarity-based clustering in sequence analysis is NOT a statistical model because:

1. **It doesn't specify a data-generating process**: It doesn't describe how sequences are probabilistically generated.
2. **It has no likelihood function**: We're not modeling the probability of observing sequences.
3. **It has no estimable parameters**: There are no unknown parameters describing a data-generating mechanism to estimate from data.
4. **It's descriptive, not generative**: It compares observed sequences but doesn't model how they were created.

**Hidden Markov Models**, in contrast:
- Specify a complete data-generating process (hidden states evolve via Markov chain, observations generated from hidden states)
- Have a likelihood function
- Include estimable parameters (transition probabilities and emission probabilities)
- Are generative models that can simulate new sequences

#### Exercise 3.4: The Three Components

A simple model for test scores and study hours:

1. **Random variables we observe:**
   - $Y$ = test score (e.g., 85, 90, 78)
   - $X$ = study hours (e.g., 5, 8, 3)

2. **Probabilistic mechanism:**
   - $Y = \beta_0 + \beta_1 X + \varepsilon$
   - Where $\varepsilon \sim \text{Normal}(0, \sigma^2)$
   - This means test scores are linearly related to study hours, plus random error

3. **Parameters to estimate:**
   - $\beta_0$ = intercept (expected score with 0 study hours)
   - $\beta_1$ = slope (how much score increases per hour of study)
   - $\sigma^2$ = variance of the error term (how much variability there is)

#### Exercise 3.5: Real-World Application

**Choose Option A (dissimilarity-based clustering) when:**
- Your goal is **exploration and description**: You want to understand what patterns exist in the data
- The sequences are **complex and heterogeneous**: Employment patterns vary widely and don't follow simple rules
- You want to **identify typical career paths**: Find groups of people with similar employment trajectories
- You're not trying to **predict future states** or understand the underlying process
- Strong modeling assumptions (like Markov property) are **hard to justify**

**Choose Option B (Hidden Markov Model) when:**
- Your goal is **process inference**: You want to understand the mechanism that generates employment transitions
- You want to **estimate transition probabilities**: How likely is someone to move from employed to unemployed?
- You want to **make predictions**: Predict future employment states based on current state
- You can **justify the Markov assumption**: Future employment depends mainly on current employment
- You want **probabilistic interpretations**: Understand uncertainty in transitions

**Key differences:**
- **Option A** answers: "What patterns do we see?" (descriptive)
- **Option B** answers: "What process could have generated these patterns?" (generative)

---

*Author: Yuqi Liang*
