# Sequence Analysis Multi-state Model

## 1. What problem does SAMM actually solve?

Sometimes you don’t care about a single “instant event” (e.g., “education → job this month”), you care about what unfolds for a while after a turning point (e.g., “after finishing school, do people quickly settle into a job, bounce between jobs and unemployment, or disappear from the labor force for years?”). Classic event history analysis (EHA) is great for instantaneous transitions but loses the shape of the path that follows. Classic sequence analysis (SA) sees the whole path, but it can’t cleanly relate that path to time-varying covariates without running into “future causes the past” problems.

Sometimes you don’t care about a single “instant event” (say, “education → job this month”). You care about what unfolds after a turning point: after finishing school, do people settle quickly into a stable job, bounce between jobs and unemployment, or step out of the labor market for a while? Classic event-history analysis (EHA) TODO 解释为什么叫做 event history，那就是the history of a particular event. is good at timing a jump from one state to another, but it compresses everything that follows into a single outcome and loses the shape of the path. -这句话讲得再清楚一点，有点过于抽象了。而且 multistate model 也能考虑到多次 events。 Classic sequence analysis (SA) preserves the full path, but when you try to link that path to factors that change over time, it’s easy to slip into using information from the future to explain the past. 

For example, suppose your research question is: “How does becoming a parent affect the way young people move from education into the labor market?” If you take the standard sequence-analysis approach, you might cluster whole 10-year career sequences into types and then ask whether “having a child” predicts belonging to one type or another. 但是being a parent可能十年内有变化的，这里怎么处理的？ But here’s the catch: many of those children are born years after graduation. If you include that information when explaining what happens at graduation, you’re letting the future leak into the past. In other words, you’re using post-graduation events to explain patterns that begin at the moment of graduation itself. That’s backwards.

This makes the results hard to interpret: are you really saying that parenthood influences the transition from education to work, or are you just noticing that people who later become parents tend to have different long-run trajectories? With classic sequence analysis it’s very easy to blur that line, because you’re working with whole trajectories at once. SAMM avoids this by taking the point of graduation as the anchor, cutting out the next stretch of months or years as a “mini-trajectory,” and then relating only the covariates that exist up to and during that window to the outcomes you observe. This way, your analysis reflects the actual unfolding of life in time, not a hindsight reconstruction that folds future information into the past.

SAMM fixes this by anchoring analysis at the moment of change and then looking forward over a fixed window. Imagine a student who graduates in June 2010. We take the next 36 months as a “mini-trajectory” and ask: does it look stable employment, choppy employment, or exit? At the same time, we only feed the model covariates as they are known up to and during those 36 months—month by month, in order—so we never let later facts (like having a child in 2013) leak back to explain choices in 2010. In short, EHA alone can’t tell stable versus temporary futures 太抽象了, SA alone can mix up time order, and SAMM keeps both the shape and the chronology straight.

SAMM stitches the two together. It studies medium-term “mini-trajectories” that start at a transition and last for a fixed window, and then uses multistate EHA to ask: “what raises or lowers the chance of following each kind of mini-trajectory when you exit a given state?” 

# 2) One-sentence core idea

Cut each long life-course into many short, aligned slices right after transitions (length ℓ you choose), cluster those slices into a few clear “typical next-paths,” then model the hazard of taking each next-path as a function of time-varying covariates. 

# 3) A concrete picture (employment example)

Suppose states are Education, Employed, Out-of-employment (OE). Each time someone changes state, grab the next ℓ months (say ℓ=60). Those ℓ-long pieces might look like:

• Edu → five years mostly Employed (“smooth entry to work”)
• Empl → months in OE then back to Empl (“short setback then recovery”)
• OE → brief Empl then OE again (“churn/volatile attachment”)

Cluster those pieces by shape into a small set of “typical next-paths.” Then, for every time someone sits in a given state (e.g., OE), model the competing risks of following each typical next-path, using covariates that can change over time (union status, having a child, a policy shock, etc.).  这里还是不清楚，讲的有问题，但是这三个clusters是没有什么问题的

# 4) Why not just EHA or just SA?

Only EHA: you see “this month’s jump” but you can’t separate “summer job then back to school” from “lasting employment”—both are Edu→Empl. You lose medium-term meaning. 

Only SA: you see whole trajectories, but you can’t legitimately plug in time-varying covariates measured during the trajectory without anticipatory bias; censoring is also awkward. 

SAMM keeps the medium-term shape and stays honest about time order. It also handles censoring naturally via EHA. 

# 5) The two SAMM steps, in plain terms

Step 1 — carve and name the “next-paths”
• Choose a window length ℓ (e.g., 12, 24, 36, 60 months).
• For every transition time t in a person’s sequence, take states from t to t+ℓ−1 (only if fully observed).
• Cluster these ℓ-long slices separately by their starting state (all slices that start at Edu clustered together, etc.).
• The cluster medoids become your human-readable “next-path” labels (e.g., “Edu→Empl (stable)”, “OE→Empl→OE (volatile)”). 

Step 2 — model who follows which next-path
• Build a multistate competing-risks setup where, from a given state, the “risks” are not target states but your next-path types.
• Use Cox (continuous time) or discrete-time logit/multinomial (if time is coarse). Use frailty/random intercepts if people can revisit the same state multiple times.
• Include time-varying covariates (e.g., union, children) and macro shocks (e.g., reunification) to estimate how they change the chance of each next-path. 

# 6) How to choose ℓ (the window length)

Short ℓ (12–24): captures quick moves; under-detects volatility that plays out slowly.
Medium ℓ (36–60): a good “process” view for careers/education.
Long ℓ (72+): closer to whole-trajectory SA; fewer slices are fully observed.

In the original application, results were robust across several ℓ values (12–72). Patterns stayed similar; frequencies and some significance changed as expected (shorter ℓ finds fewer “back-and-forth” patterns). This is a good sensitivity check to report. 

# 7) What kinds of questions can SAMM answer?

• After unemployment, who goes into stable jobs vs. churns vs. exits? Effects of union/childbirth? 
• Did a macro shock (policy reform, reunification) push people toward volatility or stability—and in which starting states? 
• Are “returns to education” becoming more common over time, net of age/period effects? 

# 8) What the German reunification example showed (in spirit)

Using SAMM, the authors could distinguish “summer-job blips” from genuine medium-term exits/entries, include censored cases, and detect that East German women faced more post-reunification volatility (e.g., OE–Empl–OE, Empl–OE–Empl) while some stable paths shifted in expected directions. A standard transition-only MM missed parts of this picture. 

# 9) Limits and gotchas (say it plainly)

• Garbage in, garbage out: if your ℓ is way off your process timescale, your “next-paths” won’t mean much.
• Clustering needs to be decent quality; don’t cram wildly different slices into one type. Check silhouette/ASW and visuals. 
• Interpret carefully: “risk of following a next-path” is not “causal effect.” You still need identification logic if you want causal claims.
• Keep time order clean: covariates must be measured up to the start and during the risk period—not after the slice you’re predicting.

# 10) How Sequenzo maps this logic into objects

Keep this mental map; names match your Python module so users can orient themselves without reading function docs first.

• sequence_analysis_multi_state_model(...) → makes a person-period dataset with, for each person-time, the ℓ-long subsequence columns s.1 … s.ℓ, a transition flag, and spell timing helpers. This is the “slice factory.”
• plot_samm(samm, ...) → shows, for each starting state, the actual colored bars of next-paths when a transition happens. Your Python design uses one subplot per starting state (clearer side-by-side inspection than TraMineR’s grouped single plot).
• seqsammseq(samm, spell=...) → quickly pull all next-paths that start at a given state (for eyeballing, ad-hoc tabulations, prototype rules).
• set_typology(...) → let users assign human labels or cluster labels to those next-paths (e.g., “stable job,” “volatile,” “exit”).
• seqsammeha(...) → produce the exact analysis dataset for EHA (person-period by default, with last-observation flags and one column per next-path type as binary outcomes). That’s the ready-to-model frame.

This mirrors the original two-step logic while adopting a subplot-based visualization that preserves individual patterns and scales better to many sequences.

# 11) Practical workflow (checklist you can follow today)

1. Define the process and states clearly. Keep the alphabet small for starting states; it helps model complexity. You can be more detailed for the next-paths if needed (e.g., separate parental leave vs. unemployment in T). 
2. Pick a first ℓ grounded in your science (e.g., 36 or 60 months for early-career dynamics).
3. Build the SAMM person-period data; confirm that “transition==True” rows make sense.
4. Explore visually with plot_samm. Do the slices you see match your intuition (stable entry, churn, exit)?
5. Create a typology: either cluster elsewhere and map labels in, or hand-label with simple rules for a pilot.
6. Generate the EHA dataset (seqsammeha). Decide continuous-time (Cox) vs discrete-time (logit). Add random effects if people revisit states. 
7. Fit competing-risk models: one model per next-path type (cause-specific hazards), or a multinomial discrete-time model if you prefer. Include time-varying covariates and sensible controls (age polynomials, period, season). 
8. Robustness: vary ℓ; check that big qualitative claims survive. 
9. Compare with a classic transition-only MM to show what SAMM newly reveals. 

# 12) How to report SAMM results so readers “get it”

• One clean figure per starting state showing the next-paths (state distribution or index plots), with short, concrete labels.
• A small table listing each next-path type with a one-line narrative (“Edu→Empl stable within 3 months; n=...”).
• A cause-specific hazard table (or multinomial logit) with covariate effects on each next-path. Interpret in plain language: “Having a child increases the chance that an employment spell ends in a long OE path, and reduces the chance of immediate stable re-employment,” etc. 
• A brief “why SAMM vs. standard MM/SA” paragraph, plus a short robustness note (other ℓ’s, similar story). 

# 13) FAQs you might have

Q: Isn’t this just “clustering then modeling the cluster label”?
A: Kind of, but with two crucial twists: (1) the units are aligned slices after transitions, not whole careers; (2) the outcome is a medium-term path type, estimated via competing-risk hazards from a specific starting state. That keeps time order and makes the meaning of “risk” substantive. 

Q: How many next-path types should I keep?
A: Enough to separate substantively different futures (stable entry, churn, exit), but not so many that types become muddy. Use quality diagnostics and pictures; err on the side of interpretability. 

Q: Can I mix alphabets (coarser for starting states, finer for next-paths)?
A: Yes. Keep starting states simple (fewer hazard functions), and use a richer alphabet in the slices if it clarifies dynamics (e.g., differentiate part-time vs full-time only in the next-paths). 

Q: Is SAMM causal?
A: Not by itself. It’s descriptive/associational with clean time ordering. If you want causality, bring identification (designs, instruments, policy discontinuities) on top.

