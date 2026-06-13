# Hidden Markov Models: A Beginner’s Guide (2)

## Before You Start

Read [Part 1](./markov-chain-models-01.md) first if you are new to transition matrices and the Markov property.

This part explains why HMMs separate latent states from observed categories, and when HMM/MHMM/NHMM/MNHMM workflows in Sequenzo become more appropriate than an observed-state Markov chain.

## 1. From Markov Chains to Hidden Markov Models

In [Part 1](./markov-chain-models-01.md), we learned that a Markov chain is a model where:

* A system moves between states
* The state is **directly observable in the data**
* The future depends only on the present

Example:

* Weather today → Weather tomorrow
* Employment this year → Employment next year

However, here is the critical problem:

**In most real scientific settings, we cannot directly observe the true state of the system.**

This means ordinary Markov chains, where states are visible, can be too restrictive for many latent-state questions.

This is why Hidden Markov Models (HMM) were invented.

## 2. What does “hidden” mean?

A Hidden Markov Model assumes two layers:

1. A **hidden state** $Zₜ$
   (we assume that there is the "true" underlying condition, which we cannot observe)

2. An **observed outcome** $Yₜ$
   (what we actually measure, often noisy)

The structure looks like this:

```
Hidden:  Z1 → Z2 → Z3 → Z4
          ↓    ↓    ↓    ↓
Observed: Y1   Y2   Y3   Y4
```

* The hidden states follow a Markov chain
* The observations are generated from the hidden states

Put simply:

> We do not observe the real process directly.
> We only observe its symptoms.

## 3. Why do we need hidden states?

### Real-World Measurements Are Noisy, Imperfect, and Incomplete

### Example 1: Employment trajectories in social science

Suppose we observe a person’s job status each year:

Observed sequence:
Unemployed → Temporary Job → Unemployed → Full-Time Job → Temporary Job

But these surface categories do not capture the "true" underlying life-course stages, such as:

* Persistent instability
* Upward transition
* Stable employment

Hidden states let us model:

* unobserved career stages
* misreporting (part of measurement errors)
* temporary fluctuations
* deeper mechanisms behind the observed categories

This is why HMMs (and latent Markov models) are widely used in social sciences particularly sociology.

### Example 2: DNA and protein sequences in bioinformatics

We observe letters:

A C G T G A …

But the **true biological state** is something like:

* “part of a binding site”
* “in a conserved region”
* “in a coding segment”
* “in a motif”

HMMs allow us to infer these hidden roles.

This is why HMMs are historically important and still widely used in:

* gene finding
* protein domain detection
* sequence alignment

Ordinary Markov chains cannot do this, because they assume the letters *are* the true states.

## 4. Where simple Markov chains become limited

Although the theory of Markov chains is elegant, they require a strong assumption:

> The observed categories *are* the true underlying states of the process.

This is often only partly true in scientific data.

### Reason 1. Real states are **not directly observable**

In social science:

* Employment "categories" ≠ true career stages
* Health codes ≠ true disease progression
* Survey answers ≠ true attitudes of participants

In biology:

* Nucleotides ≠ functional states
* Amino acids ≠ protein domains

Ordinary Markov chains assume you directly observe the state. That assumption becomes difficult when the recorded categories are proxies for a deeper process.

### Reason 2. Real measurements contain **noise, error, misreporting**

Examples include:

* Survey misclassification
* Data entry errors
* Biological mutations
* Temporary fluctuations that do not reflect true state changes

An ordinary observed-state Markov chain does not separate measurement noise from the state process. HMMs add that separation through emission probabilities.

### Reason 3. The “true” state is usually **latent**, not observable

Almost every field studies hidden processes:

* **Biology:** functional regions behind DNA letters
* **Ecology:** animal behavioral states behind movement patterns
* **Economics:** market regimes behind noisy indicators
* **Social science:** life-course stages behind messy categories
* **Linguistics/speech:** phoneme states behind sound waves

An ordinary observed-state Markov chain represents transitions among observed categories. HMMs add a latent state layer for questions where the process of interest is not directly observed.

### Reason 4. Real Sequences Often Involve Multiple Channels

Simple observed-state Markov chains can become hard to estimate and interpret when several channels are combined into one large observed state space.

#### (1) What does “multiple channels” mean?

In many real-world datasets, a person or system is not described by **one** time-varying variable but **several** variables at the same time.

For example, for a person we may observe:

* Employment (Unemployed / Temp / Full-time)
* Family (Single / Married / Divorced)
* Health (Healthy / Minor illness / Chronic condition)

These are three observed channels or domains, each evolving over time.

A real sequence looks like:

Year 1: (Temp, Single, Healthy)
Year 2: (Temp, Married, Minor illness)
Year 3: (Full-time, Married, Chronic condition)
…

Each time point consists of *multiple* observed components.

#### (2) How would a simple Markov chain model this?

A Markov chain assumes **one** observed state at each time point.

But with three channels, the “state” becomes the **combination** of all variables:

For example:

Employment × Family × Health
= 3 × 3 × 3 = 27 combined states

If you add:

* housing (5 levels)
* income (6 categories)
* education (4 levels)

Your combined state space becomes:

3 × 3 × 3 × 5 × 6 × 4 = **3240 distinct states**

This is already unmanageable.

And many social science datasets have **20+ categories in each domain**,
which leads to hundreds of thousands of possible combined states, often more than your sample size.

A Markov chain *on the observed states* can become hard to estimate or interpret under this explosion.

#### (3) Why does this state explosion make Markov chains difficult to use?

Because:

* the transition matrix must be 3240 × 3240
* you must estimate millions of transition probabilities
* most transitions will never be observed
* the model loses any meaningful interpretation
* the data cannot support the number of parameters

A huge transition matrix can be:

* difficult to estimate
* difficult to interpret
* sensitive to sparse transitions
* weakly supported by the available data

This is why analysts often avoid building one large Markov chain over all channel combinations unless the sample is large and the combined states remain interpretable.

#### (4) How do HMMs solve this?

HMMs separate:

1. **the hidden state** (low-dimensional, interpretable)
2. **the observed channels** (employment, family, health)

The hidden state $Zₜ$ might have only **3 or 4 categories**, for example:

* $Zₜ$ = “Stable life stage”
* $Zₜ$ = “Transition stage”
* $Zₜ$ = “High instability stage”

Then all observed variables (employment, family, health) are generated from this *single* hidden state using **emission probabilities**.

This means:

* The hidden layer remains small
* Multiple channels do NOT cause a combinatorial explosion
* The model is scalable and interpretable
* Each channel can include measurement noise, and HMM-family workflows can model this uncertainty when the data meet the model's missing-data requirements

Instead of 3240 observed-state combinations, you may only need a small number of hidden states. This is the main modeling advantage of HMMs.

A simple example:

Hidden state = “overall life situation”

Observed channels:

* Employment: U, T, F
* Family: S, M
* Health: H, I

Instead of 3 × 2 × 2 = 12 combined states, an HMM might use:

$Zₜ ∈ {Stable, Transition, Unstable}$
and define:

$P(Employment | Zₜ)$,
$P(Family | Zₜ)$,
$P(Health | Zₜ)$.

This keeps the model small, meaningful, and realistic.

### Reason 5. Ordinary Markov chains cannot separate signal (true state) from noise (observed data), but HMMs can

#### (1) Real-world observations are noisy

This is true across disciplines:

Social science:

* People misreport employment
* Income is top-coded
* Survey answers are inconsistent
* Temporary fluctuations do not reflect true long-term state

Biology:

* DNA letters mutate
* Sequencing errors occur
* Functional regions vary even across species

Speech:

* Sound waves include noise
* People pronounce differently
* Microphone quality varies

In all of these examples, the thing we observe (the “data”) is not the “true state”.

#### (2) What does a simple Markov chain assume?

A Markov chain assumes:

> “The observed category **is** the true state of the system.”

Meaning:

Unemployed → Part-time → Full-time → Part-time

is treated as the real underlying life-course process.

But what if this person:

* briefly held a temporary job only for 2 days?
* reported the wrong category?
* had an illness causing a temporary dip?
* experienced a misclassification?

An ordinary observed-state Markov chain does not distinguish actual changes from
* measurement errors
* short-term noise
* inconsistent reporting

It takes everything literally.

This leads to wildly unstable models.

#### (3) How does an HMM handle noise?

HMMs explicitly model:

* hidden states (true underlying signal)
* emission probabilities (how noisy observations arise from hidden states)

For example:

Hidden state $Zₜ$ = “Stable employment stage”
Observed state $Yₜ$:

* Full-time (0.8)
* Temp (0.15)
* Unemployed (0.05)

Even if someone reports “Temp” occasionally,
the model still knows they are most likely in “Stable employment”.

This helps HMMs absorb some observation noise, which is useful when recorded states are imperfect measurements of an underlying process.

#### (4) A simple intuitive analogy

Think of an HMM as:

**True state (the signal):**
your “actual fitness level”

**Observed behavior (the noise):**
your daily steps
your calories
your heart rate
your sleep hours

Any one day may be inconsistent, but the hidden state (your real fitness condition) changes more slowly.

A Markov chain would treat every daily number as the “truth”.
An HMM infers the underlying condition **behind** the noisy measures.

#### (5) Why this matters scientifically

Almost every scientific measurement is:

* noisy
* incomplete
* surrogate, not direct
* subject to error

This means:

**Observed-state Markov chains take recorded categories at face value.
HMMs allow you to model a latent structure behind imperfect observations.**

This is why HMMs became the practical standard.

## 5. What exactly does an HMM add to a Markov chain?

A simple Markov chain says:

> observed state at time t → observed state at time t+1

An HMM says:

> hidden state at time t → hidden state at time t+1
> hidden state at time t → observed data at time t

So an HMM contains:

1. **transition probabilities** (how hidden states evolve)
2. **emission probabilities** (how observations arise from hidden states)

This extra layer allows HMMs to model real-world processes that are imperfectly measured.

## 6. Real-life example of an HMM

### Hidden career stages

(unobserved)

1. Stable career
2. Transition
3. Unstable

### Observed categories

(what we actually see)

Unemployed, Temp Job, Part-time, Full-Time

Let’s say the observed data look like:

Temp → Unemployed → Temp → Full-Time → Temp

An ordinary Markov chain sees messy jumps.
It cannot say *why* these jumps happen.

An HMM infers:

* early years: hidden “unstable” state
* mid period: transition to “stable”
* observed temp/full-time variations are just noise around the hidden state

You get a **mechanistic** explanation instead of a **surface** description.

## 7. Why HMMs are widely used in practice

### In social science

Used for:

* life-course trajectories
* employment instability
* health progression
* criminal careers
* educational attainment patterns

Why?
Because the underlying “state” (career stage, health stage) is never directly observed.

### In bioinformatics

Used for:

* protein family detection
* motif discovery
* gene prediction
* DNA binding sites

Because biological function is hidden behind noisy sequences.

### In speech recognition

Used for decades as the core technology.

Because phonemes are hidden behind sound waves.

### In economics and time series

Used as **regime-switching** models.

Because market conditions are hidden.

## 8. Summary: the key message

Markov chains:

* assume the observed state is the true state
* do not separate measurement noise from the state process
* are useful when the observed states are substantively meaningful
* often serve as a baseline or building block for richer models

Hidden Markov Models:

* separate hidden process from noisy observations
* model measurement error
* handle complex sequences
* infer plausible latent dynamics
* widely used across biology, social science, speech, economics

**Simple Markov chains are often a useful starting point. HMMs become more appropriate when the scientific question involves unobserved stages, measurement error, or several observed channels.**

## See Also

- [Markov Chain Models](/en/markov-chain-models/introduction) shows the current Sequenzo HMM, MHMM, NHMM, and MNHMM workflow.
- [`build_hmm()`](/en/markov-chain-models/build-hmm) and [`fit_model()`](/en/markov-chain-models/fit-model) document a basic HMM.
- [`build_mhmm()`](/en/markov-chain-models/build-mhmm) and [`fit_mhmm()`](/en/markov-chain-models/fit-mhmm) document mixture HMMs for latent subgroups.
- [`build_nhmm()`](/en/markov-chain-models/build-nhmm) and [`fit_nhmm()`](/en/markov-chain-models/fit-nhmm) document covariate-dependent NHMM workflows.
- [`build_mnhmm()`](/en/markov-chain-models/build-mnhmm) and [`estimate_mnhmm()`](/en/markov-chain-models/estimate-mnhmm) document mixture non-homogeneous HMM workflows.

## References

Singer, B., & Spilerman, S. (1976). The representation of social processes by Markov models. American journal of sociology, 82(1), 1-54.

Krogh, A. (1998). An introduction to hidden Markov models for biological sequences. In New comprehensive biochemistry (Vol. 32, pp. 45-63). Elsevier.

---

*Author: Yuqi Liang*
