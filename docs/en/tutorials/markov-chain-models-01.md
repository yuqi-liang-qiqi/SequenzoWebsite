# Markov Chain Models: A Beginner’s Guide (1)

## 1. What is a Markov chain?

A Markov chain is one of the simplest ways to describe how something **moves from one situation to another over time**.

The key idea is:

**The future depends only on the present, not on the past.**

This is called the **Markov property**.

In everyday language:

> “Where you will go next depends only on where you are now.”

This makes Markov chains simple, powerful, and surprisingly useful for modeling many real-world processes.

## 2. What is a “state”?

A *state* is just a label for a situation.

Examples of states:

* Weather:
  Sunny, Cloudy, Rainy
* Employment:
  Unemployed, Temporary Job, Full-Time Job
* Health:
  Healthy, Sick
* Website behavior:
  Homepage, Product Page, Cart, Checkout

At each time step, the system is in **one state**.

## 3. Moving between states: the transition probability

A Markov chain describes how likely it is to move from one state to another.

For example: Suppose today is Sunny.

A simple Markov chain for weather might say:

* Tomorrow will stay Sunny with probability 0.7
* Become Cloudy with probability 0.2
* Become Rainy with probability 0.1

These numbers are called **transition probabilities**.

We usually write them in a table (a “transition matrix”):

| From \ To | Sunny | Cloudy | Rainy |
| --------- | ----- | ------ | ----- |
| Sunny     | 0.7   | 0.2    | 0.1   |
| Cloudy    | 0.4   | 0.4    | 0.2   |
| Rainy     | 0.3   | 0.3    | 0.4   |

Each row adds up to 1.
Because from one state, you must go somewhere.

## 4. A simple example: Weather model

Imagine a very simple world with only these states:

Sunny → Cloudy → Rainy

If it is Sunny today:

* Most likely it stays Sunny
* Sometimes it becomes Cloudy
* Rarely it becomes Rainy directly

Using the transition matrix above, we can simulate:

Day 1: Sunny
Day 2: Sunny
Day 3: Cloudy
Day 4: Cloudy
Day 5: Rainy
… and so on.

A Markov chain tells us how the *pattern* evolves over time.

## 5. Why is the Markov assumption useful?

Because it makes modeling extremely easy.

Instead of tracking the entire history:

Sunny → Sunny → Cloudy → Rainy → Cloudy → ?

We only need the current state:

If today = Cloudy,
we look at the row for “Cloudy” and choose the next state using the probabilities.

This is why Markov chains are widely used:

* They are simple
* They need few assumptions
* They can describe many dynamic processes
* They are easy to simulate and understand

## 6. A real-life example 1: Job market transitions

Imagine tracking a group of workers each year.
Their states:

1. Unemployed
2. Temporary Job
3. Full-Time Job

A Markov chain can describe how people move between these states:

Example:

| From \ To  | Unemployed | Temp Job | Full-Time |
| ---------- | ---------- | -------- | --------- |
| Unemployed | 0.6        | 0.3      | 0.1       |
| Temp Job   | 0.2        | 0.5      | 0.3       |
| Full-Time  | 0.1        | 0.2      | 0.7       |

This table answers important questions:

* Are unemployed people likely to get a job next year?
* Do temporary jobs act as stepping stones?
* How stable is full-time employment?

This is how labor economists use Markov chains.

## 7. A real-life example 2: Customer behavior on a website

States:

* Home
* Product Page
* Cart
* Checkout

A Markov chain can tell us:

* How likely visitors go from Home → Product
* How many abandon their Cart
* What fraction reaches Checkout

This is widely used in marketing and ecommerce.

## 8. A real-life example 3: Health transitions

States:

* Healthy
* Mild Symptoms
* Hospital

A Markov chain helps understand:

* How fast symptoms progress
* At what rate people recover
* Long-term probabilities (e.g., “expected days healthy”)

Doctors and public health researchers use these models all the time.

## 9. Simulating a Markov chain (intuitive idea)

To simulate, you repeat these steps:

1. Start in an initial state (e.g., Sunny).
2. Randomly choose the next state using the probabilities in the row.
3. Move to that state.
4. Repeat.

For example:

If today is “Temp Job”
and the row says:

* Unemployed: 0.2
* Temp Job: 0.5
* Full-Time: 0.3

You draw a random number:

* If between 0 and 0.2 → Unemployed
* If between 0.2 and 0.7 → Temp Job
* If between 0.7 and 1.0 → Full-Time

This is how all Markov chain simulations work.

## 10. Summary: Key ideas to remember

Markov chain = system that moves between states with fixed probabilities.

Essential concepts:

1. **States** = categories (e.g., Sunny, Cloudy)
2. **Transition probabilities** = chances of moving to other states
3. **Markov property** = future depends only on the present
4. **Transition matrix** = table of probabilities
5. Markov chains model many real processes:

   * weather
   * job mobility
   * health
   * customer navigation
   * machine behavior
   * biological sequences

They are simple, powerful, and a foundation for more advanced models like:

* Hidden Markov models (HMMs)
* Latent Markov models
* Deep Markov models

