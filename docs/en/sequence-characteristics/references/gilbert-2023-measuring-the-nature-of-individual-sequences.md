## Page 1

<header>Article</header>

# Measuring the Nature of Individual Sequences

Gilbert Ritschard¹

Sociological Methods & Research
2023, Vol. 52(4) 2016–2049
© The Author(s) 2021

Article reuse guidelines:
sagepub.com/journals-permissions
DOI: 10.1177/00491241211036156
journals.sagepub.com/home/smr

&lt;img&gt;Sage&lt;/img&gt;

## Abstract

This study reviews and compares indicators that can serve to characterize numerically the nature of state sequences. It also introduces several new indicators. Alongside basic measures such as the length, the number of visited distinct states, and the number of state changes, we shall consider composite measures such as turbulence and the complexity index, and measures that take account of the nature (e.g., positive vs. negative or ranking) of the states. The discussion points out the strange behavior of some of the measures—Elzinga’s turbulence and the precarity index of Ritschard, Bussi, and O’Reilly in particular—and propositions are made to avoid these flaws. The usage of the indicators is illustrated with two applications using data from the Swiss Household Panel. The first application tests the U-shape hypothesis about the evolution of life satisfaction along the life course, and the second one examines the scarring effect of earlier employment sequences.

## Keywords

sequence analysis, complexity, sequence quality, within diversity, sequence characteristics, precarity, insecurity

---

¹ Institute of Demography and Socioeconomics, University of Geneva, Switzerland

**Corresponding Author:**
Gilbert Ritschard, Institute of Demography and Socioeconomics, University of Geneva,
40, bd du Pont d’Arve, CH-1211 Geneva 4, Switzerland.
Email: gilbert.ritschard@unige.ch

---


## Page 2

<header>Ritschard</header>
&lt;page_number&gt;2017&lt;/page_number&gt;

When considering individual state sequences describing, for instance, time use, spatial development, course of health and well-being, or life trajectories such as occupational careers and cohabitation pathways, it is of interest to quantitatively describe the nature of the sequences. For example, we may want to distinguish smooth careers from more chaotic ones, stable from unpredictable family trajectories, and improving from deteriorating health pathways. Quantitative characteristics that can easily be summarized with means and standard deviations, for example, are also useful for synthetically describing sets of sequences.

Summary indicators of individual sequences have been used in many different studies. To mention just a few, Brzinsky-Fay (2007) uses individual indicators to study school-to-work transitions, Biemann et al. (2011) investigate career complexity over time, Manzoni and Mooi-Reci (2018) examine the quality of professional careers after an initial spell of unemployment, Christensen (2021) compares the stability of the careers among different groups of elite tax professionals, Elzinga and Liefbroer (2007) study the destandardization of family-life trajectories across different countries, Widmer and Ritschard (2009) study the destandardization of cohabitational and occupational trajectories across birth cohorts, Van Winkle (2020) studies family-life course complexity across twentieth-century Europe, Hiekel and Vidal (2020) study the complexity in partnership life courses, and Mattioli, Anable, and Vrotsou (2016) study the occurrences of activities linked with car use in time-use sequences.

Here, we review the individual sequence indicators used in these works and make some new propositions. We compare the indicators and stress what aspect of the nature of the sequence they attempt to catch.

In sequence analysis, the conventional approach to characterize individual sequences employs comparison with the other sequences in the data set. Typically, pairwise dissimilarities between sequences are first computed. These dissimilarities are then used to cluster the sequences; this allows to characterize each individual sequence by the group to which it belongs. In contrast, this study focuses on intrinsic individual characteristics of the sequences, that is, characteristics that can be computed regardless of the other sequences.

Table 1 lists the indicators addressed. Sequences are typically represented as a succession of states, for example, FFPPPU. It is also common to represent sequences as a succession of spells in different states. For example, FFPPPU can equivalently be represented as F/2-P/3-U/1 where F/2 indicates a spell of length 2 in F. The table indicates for each indicator whether it focuses on the characteristics of state representation or spell representation.

---


## Page 3

&lt;page_number&gt;2018&lt;/page_number&gt;
<header>Sociological Methods & Research 52(4)</header>

<table>
  <caption>Table I. Individual Characteristics of Sequences.</caption>
  <thead>
    <tr>
      <th>Indicator</th>
      <th>Symbol</th>
      <th>Short Name<sup>a</sup></th>
      <th>Source Citation<sup>b</sup></th>
      <th>Focus on</th>
    </tr>
    <tr>
      <th></th>
      <th></th>
      <th></th>
      <th></th>
      <th>States</th>
      <th>Spells</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="6"><strong>Basic</strong></td>
    </tr>
    <tr>
      <td>Length</td>
      <td>l</td>
      <td>Lgth</td>
      <td></td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Number of nonmissing elements</td>
      <td>l<sub>v</sub></td>
      <td>Nonm</td>
      <td></td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Number of visited states</td>
      <td>v<sub>n</sub></td>
      <td>Visited</td>
      <td></td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Proportion of visited states</td>
      <td>v<sub>p</sub></td>
      <td>Visitp</td>
      <td>CBF</td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Number of transitions</td>
      <td>t<sub>n</sub></td>
      <td>Trans</td>
      <td></td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>Proportion of transitions</td>
      <td>t<sub>p</sub></td>
      <td>Transp</td>
      <td>AG, CBF</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>Number of spells</td>
      <td>l<sub>d</sub></td>
      <td>Dlgh</td>
      <td></td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Mean spell duration</td>
      <td>d̄</td>
      <td>Meand</td>
      <td></td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>including 0-length spells</td>
      <td>d̄*</td>
      <td>Meand2</td>
      <td>new</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>Recurrence index</td>
      <td>ψ</td>
      <td>Recu</td>
      <td>PBS</td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td colspan="6"><strong>Diversity</strong></td>
    </tr>
    <tr>
      <td>Normalized entropy</td>
      <td>h<sub>norm</sub></td>
      <td>Entr</td>
      <td>CS</td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Spell duration standard deviation</td>
      <td>s<sub>d</sub></td>
      <td>Dustd</td>
      <td>CE</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>including 0-length spells</td>
      <td>s<sub>d</sub>*</td>
      <td>Dustd2</td>
      <td>new</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td colspan="6"><strong>Complexity</strong></td>
    </tr>
    <tr>
      <td>Number of subsequences of the DSS sequence</td>
      <td>φ</td>
      <td>Nsubs</td>
      <td>CE</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>Objective volatility</td>
      <td>v</td>
      <td>Volat</td>
      <td>CBF</td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Complexity index</td>
      <td>c</td>
      <td>Cplx</td>
      <td>AG</td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Turbulence</td>
      <td>T</td>
      <td>Turb</td>
      <td>CE</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>including 0-length spells</td>
      <td>T*</td>
      <td>turb2</td>
      <td>new</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>Normalized turbulence</td>
      <td>T<sub>n</sub></td>
      <td>Turbn</td>
      <td>new</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>including 0-length spells</td>
      <td>T<sub>n</sub>*</td>
      <td>Turb2n</td>
      <td>new</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td colspan="6"><strong>Binary</strong></td>
    </tr>
    <tr>
      <td>Proportion of elements of interest</td>
      <td>l<sub>ppos</sub></td>
      <td>Ppos</td>
      <td></td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Normative volatility</td>
      <td>l<sub>nvolt</sub></td>
      <td>Nvolat</td>
      <td>CBF</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>Integrative potential</td>
      <td>l<sub>integr</sub></td>
      <td>Integr</td>
      <td>CBF, MM</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td colspan="6"><strong>State undesirableness</strong></td>
    </tr>
    <tr>
      <td>Degradation index</td>
      <td>l<sub>degrad</sub></td>
      <td>Degrad</td>
      <td>new</td>
      <td></td>
      <td>×</td>
    </tr>
    <tr>
      <td>Badness</td>
      <td>l<sub>bad</sub></td>
      <td>Bad</td>
      <td>new</td>
      <td>×</td>
      <td></td>
    </tr>
    <tr>
      <td>Precarity index</td>
      <td>l<sub>prec</sub></td>
      <td>Prec</td>
      <td>RBO</td>
      <td>×</td>
      <td>×</td>
    </tr>
    <tr>
      <td>Insecurity index</td>
      <td>l<sub>insec</sub></td>
      <td>Insec</td>
      <td>new</td>
      <td>×</td>
      <td>×</td>
    </tr>
  </tbody>
</table>

Note: DSS = distinct successive states.
<sup>a</sup>Names used by the seqindic function of the TraMineR R package.
<sup>b</sup>AG: Gabadinho et al. (2010); CBF: Brzinsky-Fay (2007, 2018); CE: Elzinga and Liefbroer (2007); CS: Shannon (1948); MM: Manzoni and Mooi-Reci (2018); PBS: Pelletier, Bignami-Van Assche, and Simard-Gendron (2020); RBO: Ritschard, Bussi, and O’Reilly (2018).

---


## Page 4

<header>Ritschard</header>
&lt;page_number&gt;2019&lt;/page_number&gt;

We distinguish four types of measures:

*   basic sequence characteristics,
*   measures of diversity within the sequence,
*   measures of complexity of the sequence, and
*   measures of (un)favorableness of the sequence.

Basic measures are essentially simple counts such as sequence length, number of visited states, and number of state changes. Within-sequence diversity concerns the diversity of not only the states but also spell durations. Complexity refers primarily to the arrangement of the states within the sequence.

State sequences are successions of elements taken from a finite alphabet A (set of possible states). The first three types of measures apply irrespective of the states. For example, the value of the measures will be the same for the sequences FFFUU and PPPFF where F stands for full-time work, P for part-time work, and U for unemployment. The last group of measures (unfavorableness), on contrary, requires additional information on the nature of the states either as a distinction between positive and negative states, for example, {F, P} versus U, or as a preference order among the states such as F > P > U. Some unfavorableness indicator can even exploit degrees of undesirableness of the states such as 0, 1, and 5 for F, P, and U, respectively.

The scope of the measures is demonstrated through two applications to data from the Swiss Household Panel (SHP). The first application compares the life satisfaction over 19 years reported annually by younger, middle-aged, and elder adults and shows how the indicators can serve to study the U-shape issue of the evolution of satisfaction along the life course (Bartram 2021; Blanchflower and Oswald 2008; Frijters and Beatton 2012). The second application uses monthly work statuses to illustrate how individual indicators can serve to study the scarring effect of earlier employment trajectories (Abebe et al. 2016; Manzoni and Mooi-Reci 2011).

Alongside the description of indicators, the discussion provides, when necessary, indications of interest for the interpretation of measures such as the range of possible values and characterization of configurations corresponding to the minimum and maximum values. In addition, a small set of 16 toy sequences is used to illustrate how the measures rank the sequences. These examples permit to highlight unexpected behaviors of, in particular, the turbulence of Elzinga and Liefbroer (2007) and the precarity index of Ritschard et al. (2018). Alternatives are proposed to avoid these unwanted behaviors. The newly proposed measures include the mean and standard

---


## Page 5

&lt;page_number&gt;2020&lt;/page_number&gt;
Sociological Methods & Research 52(4)

deviation of spell durations that take account of nonvisited states, revised turbulence, degradation index, badness index, and insecurity index, the latter being a revised precarity index.

All addressed indicators including the newly proposed ones have been implemented in the latest release (version 2.2-2) of the TraMineR R package (Gabadinho et al. 2011) and can be obtained with the seqindic function. The short names shown in Table 1 are those used by seqindic.

## Individual Sequence Measures

The section successively reviews indicators of basic features, within-sequence diversity, complexity, and (un)favorableness. For the latter group, we distinguish between measures based on a dichotomization of the state space and a preference order of the states or possibly on the undesirableness degrees of the states.

To illustrate the addressed measures, we consider the 16 sequences of length 8 displayed in the first column of Table 2. The alphabet comprises four work statuses: F, full-time work; P, part-time work; T, training; and U,

<table>
  <thead>
    <tr>
      <th>Sequence</th>
      <th>Dlgh</th>
      <th>Visited</th>
      <th>Visitp</th>
      <th>Entr</th>
      <th>Dustd</th>
      <th>Dustd2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1: U/2-P/2-F/2-P/I-T/I</td>
      <td>5</td>
      <td>4</td>
      <td>1.00</td>
      <td>0.95</td>
      <td>0.49</td>
      <td>0.49</td>
    </tr>
    <tr>
      <td>2: U/2-P/2-F/2-T/2</td>
      <td>4</td>
      <td>4</td>
      <td>1.00</td>
      <td>1.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>3: F/I-P/I-T/I-U/5</td>
      <td>4</td>
      <td>4</td>
      <td>1.00</td>
      <td>0.77</td>
      <td>1.73</td>
      <td>1.73</td>
    </tr>
    <tr>
      <td>4: F/4-P/I-U/2-F/I</td>
      <td>4</td>
      <td>3</td>
      <td>0.75</td>
      <td>0.65</td>
      <td>1.22</td>
      <td>1.36</td>
    </tr>
    <tr>
      <td>5: F/2-T/2-U/4</td>
      <td>3</td>
      <td>3</td>
      <td>0.75</td>
      <td>0.75</td>
      <td>0.94</td>
      <td>1.41</td>
    </tr>
    <tr>
      <td>6: U/2-T/2-F/4</td>
      <td>3</td>
      <td>3</td>
      <td>0.75</td>
      <td>0.75</td>
      <td>0.94</td>
      <td>1.41</td>
    </tr>
    <tr>
      <td>7: F/2-P/4-T/2</td>
      <td>3</td>
      <td>3</td>
      <td>0.75</td>
      <td>0.75</td>
      <td>0.94</td>
      <td>1.41</td>
    </tr>
    <tr>
      <td>8: U/I-F/5-T/2</td>
      <td>3</td>
      <td>3</td>
      <td>0.75</td>
      <td>0.65</td>
      <td>1.70</td>
      <td>1.87</td>
    </tr>
    <tr>
      <td>9: U/2-P/4-U/2</td>
      <td>3</td>
      <td>2</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.94</td>
      <td>1.50</td>
    </tr>
    <tr>
      <td>10: T/4-U/4</td>
      <td>2</td>
      <td>2</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.00</td>
      <td>2.00</td>
    </tr>
    <tr>
      <td>11: F/4-U/4</td>
      <td>2</td>
      <td>2</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.00</td>
      <td>2.00</td>
    </tr>
    <tr>
      <td>12: F/4-P/4</td>
      <td>2</td>
      <td>2</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.00</td>
      <td>2.00</td>
    </tr>
    <tr>
      <td>13: T/4-F/4</td>
      <td>2</td>
      <td>2</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.00</td>
      <td>2.00</td>
    </tr>
    <tr>
      <td>14: F/6-U/2</td>
      <td>2</td>
      <td>2</td>
      <td>0.50</td>
      <td>0.41</td>
      <td>2.00</td>
      <td>2.45</td>
    </tr>
    <tr>
      <td>15: U/8</td>
      <td>1</td>
      <td>1</td>
      <td>0.25</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>3.46</td>
    </tr>
    <tr>
      <td>16: F/8</td>
      <td>1</td>
      <td>1</td>
      <td>0.25</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>3.46</td>
    </tr>
  </tbody>
</table>

Note: Dlgh = Number of spells; Visited = number of visited states; Visitp = proportion of visited states; Entr = normalized entropy; Dustd = standard deviation of observed spell durations; Dustd2 = standard deviation of spell durations taking account of nonvisited states.

---


## Page 6

<header>Ritschard</header>
&lt;page_number&gt;2021&lt;/page_number&gt;

unemployment. The sequences are roughly sorted from the most complicated to the simplest ones. For measures based on a dichotomization, we oppose the positive states F and P to the others, and for indicators based on a preference order, we assume F > P > T > U.

### Basic Features

Basic characteristics of a sequence include the length $\ell$, number of nonmissing elements $\ell_v$, number $vn$ of distinct visited states, and number $tn$ of transitions (state changes). The proportion $vp$ of visited states among all possible states forming the alphabet $A$ and the proportion $tp = tn/(\ell - 1)$ of transitions out of the maximum possible $\ell - 1$ are variants of the latter two that can be more suitable for comparison purposes. As will be shown below, the latter $tp$ is used in Gabadinho et al. (2010) for defining the complexity index and both $vp$ and $tp$ are used in Brzinsky-Fay (2018) in the definition of objective volatility.

When the interest is in spells (in a same state) rather than states, we may consider the sequence of distinct successive states (DSS) where we ignore the successive repetition of states. For example, the DSS of the sequence FFUUUP is FUP. The length $\ell_d$ of the DSS sequence corresponds to the number of spells and is equal to $tn + 1$. The mean spell duration is another indicator that can help characterize a sequence. We can consider the mean $\bar{d}$ of the observed spell durations. In some circumstances, it could make sense to take account of the zero time spent in nonvisited states. For these situations, we propose an alternative mean $\bar{d}^*$ computed by augmenting the set of observed spells with a 0-length spell for each nonvisited state.

The average number of visits to visited states proposed by Pelletier et al. (2020) that we denote here $\psi$ measures the degree of recurrence in the sequence. It is formally obtained by dividing the number of spells by the number of states visited, that is, $\psi = \ell_d/vn$. As can be seen from the $\ell_d$ (Dlgh) and $vn$ (Visited) values in Table 2, only sequences 1, 4, and 9 would get a $\psi$ value higher than 1.

### Within-Sequence Diversity

The diversity within a sequence refers to either the diversity of states visited or the diversity of spell durations. The number $vn$ and proportion $vp$ of visited states are elementary measures of the diversity of states within a sequence. However, these rough measures do not take the time spent in the states into account and, for example, provide the same value for FPPP and FFPP. The

---


## Page 7

&lt;page_number&gt;2022&lt;/page_number&gt;
<header>Sociological Methods & Research 52(4)</header>

longitudinal entropy described hereafter takes account of the total number of occurrences of the states (time in the states) and, in that sense, is a better indicator of the state diversity.

**Longitudinal entropy.** The entropy considered here is a statistical measure borrowed from information science (Shannon 1948) where it serves to measure the average amount of bits necessary to unambiguously encode a message. In statistics, entropy reflects the level of uncertainty or unpredictability of an outcome. The higher the diversity of possible outcomes, the higher is the uncertainty. Typically, entropy is applied to a discrete distribution. In our case, it is the state distribution within the sequence, and the entropy measures the diversity of states in the sequence. The state distribution can also be seen as the time distribution among the different states. Let $p_1, \ldots, p_a$ be this distribution with $a$ the alphabet size. Shannon’s entropy is

$$
h(p_i, \ldots, p_a) = -\sum_{i=1}^{a} p_i \log_2 p_i.
\quad (1)
$$

The diversity (uncertainty) is null and the entropy is zero when a same state, say $j$, is observed all along the sequence in which case $p_j = 1$ and $p_i = 0$ for all $i \neq j$. Diversity is maximal when no state is more probable than the others, that is, when each state occurs the same proportion of times ($p_i = p$, for all $i$). This maximum is $h_{\text{max}} = h(A)$ the entropy of the alphabet. For comparison purposes, the longitudinal entropy is generally normalized for the alphabet size, that is, as $h_{\text{norm}}(p_i, \ldots, p_a) = h(p_i, \ldots, p_a)/h(A)$. This normalized entropy takes its values in the range $[0, 1]$.

Shannon’s entropy is the most commonly used diversity measure for categorical outcomes. However, there exist other diversity measures such as the Gini–Simpson index $\sum_i p_i(1 - p_i)$ (Ceriani and Verme 2012; Gini 1912; Simpson 1949) that could also be used. Nevertheless, we do not retain these alternatives because their behavior is very similar to Shannon’s entropy.

In Table 2, we can observe how the entropy nuances the proportion of visited states. Sequences 11 and 14, for example, have the same proportion $vp$ (Visitp) of visited states while sequence 14 has a lower entropy because of its less balanced state distribution.

**Variance of spell length.** While entropy and proportion of visited states measure the diversity of the states, this third measure focuses on spell durations. Elzinga and Liefbroer (2007) use the inverse of this variance in the definition

---


## Page 8

<header>Ritschard</header> &lt;page_number&gt;2023&lt;/page_number&gt;

of their turbulence index (see Complexity of the State Arrangement subsection) as a measure of the unpredictability of spell duration. However, the variance considered by these authors, that is, $s_d^2 = \frac{1}{\ell_d} \sum_{i=1}^{\ell_d} (d_i - \bar{d})^2$ with $d_i$ the duration of the $i$th observed spell and $\bar{d}$ the mean duration, can reach a zero value irrespective of the number of states visited, for example, assuming an alphabet {F, P, U}, for FFF, FU, and FPU! This is because it ignores the zero time spent in nonvisited states, and as a consequence, it would assign maximal duration unpredictability to a sequence with a single long spell. This is counterintuitive. To avoid this possibly unwanted behavior, we propose here a variant that takes account of one 0-length spell for each nonvisited state. This variance reads as follows:

$$
s_d^{*2} = \frac{1}{\ell_d + n_{nv}} \left( \sum_{i=1}^{\ell_d} (d_i - \bar{d}^*)^2 + \sum_{i=1}^{n_{nv}} \bar{d}^{*2} \right),
\quad (2)
$$

where $d_i$ is the duration of the $i$th spell, $n_{nv}$ the number of nonvisited states, and $\bar{d}^*$ the mean of the observed and zero durations, that is, $\bar{d}^* = \sum_{i=1}^{\ell_d} d_i / (\ell_d + n_{nv})$.

The variance $s_d^{*2}$ of the spell duration is zero only when all spells have the same length and all states are visited. Its maximum for the same number $\ell_d$ of spells is $s_{d,max}^{*2} = [(\ell_d - 1)(1 - \bar{d}_{max}^*)^2 + (\ell - \ell_d + 1 - \bar{d}_{max}^*)^2 + \max_{nv} \bar{d}_{max}^{*2}] / (\ell_d + \max_{nv})$, where $\max_{nv}$ is the maximum number of nonvisited states, which, letting $a$ be the alphabet size, is $a - 1$ when $\ell_d = 1$, and $a - 2$ otherwise. The mean $\bar{d}_{max}^*$ is the adjusted mean duration $\bar{d}_{max}^* = \bar{d}^* (\ell_d + n_{nv}) / (\ell_d + \max_{nv})$. The maximum variance $s_{d,max}^{*2}$ is attained when one spell has a duration of $\ell - \ell_d + 1$ and the $\ell_d - 1$ other nonzero spells have a duration of 1.

Since this is a variance, it may be more suitable for interpretation purposes to look at its square root, that is, at the standard deviation. These are the values reported in Table 2. The standard deviations Dustd ($s_d$) that does not take account of nonvisited states and Dustd2 ($s_d^*$) that takes them into account differ for all sequences but the first three that include all the states. The difference is especially important for the last two sequences made of a single spell where $s_d$ is zero while $s_d^*$ gets the highest value. We may also observe that the standard deviation $s_d^*$ (Dustd2) that takes account of nonvisited states is negatively correlated with the proportion of visited states (Visitp) and entropy (Entr). This relationship is much less clear for the standard deviation $s_d$ (Dustd) that ignores nonvisited states.

---


## Page 9

&lt;page_number&gt;2024&lt;/page_number&gt;
Sociological Methods & Research 52(4)

## Complexity of the State Arrangement

Complexity of the sequence refers to the instability or unpredictability of state arrangement in the sequence. It involves multiple aspects, and complexity increases with, for example, the number of state changes, number of visited states, and unpredictability of the time spent in the states or of the spell durations.

The number of spells $l_d$ and equivalently the number of transitions $tn = l_d - 1$ are rough indicators of the complexity of the sequence. The higher these indicators, the more complex is the state arrangement.

Another rough characteristic of interest suggested by Elzinga (2010) (see also Elzinga and Liefbroer 2007) is the number of distinct subsequences that can be extracted from the sequence. For example, sequence FFU contains six subsequences $\{\}$, F, U, FF, FU, FFU while the more simple sequence FFF contains only four subsequences $\{\}$, F, FF, FFF. Elzinga considers the number $\phi$ of subsequences from the DSS sequence, and this is the Nsubs indicator shown in Table 3. The number of subsequences measures the complexity of arrangement of the DSS. It is sensitive to the number of transitions and recurrence. For example, sequence 4 with two spells in F gets a lower $\phi$ than sequences 2 and 3 in which no recurrence occurs.

At least three refined measures of complexity attempt to capture simultaneously several aspects by combining one of the above rough measures of arrangement with a measure of within-sequence diversity.

**Objective volatility.** Brzinsky-Fay (2018) distinguishes normative volatility (first introduced in Brzinsky-Fay 2007) and objective volatility. Normative volatility requires to distinguish between positive and negative states and will, therefore, be addressed in Taking the Nature of the States Into Account subsection.

The objective volatility $v$ combines the proportion of states visited with the proportion of transitions. It is defined as the (possibly weighted) average between the proportion $vp$ of states visited and the proportion $tp$ of transitions (state changes). Formally,
$$
v(x) = w \cdot vp(x) + (1 - w) \cdot tp(x), \quad (3)
$$
with $0 \le w \le 1$. Here, the proportion of states visited is computed as $vp = (vn - 1)/(a - 1)$ where $a$ is the alphabet size. This is to make this proportion zero when a single state is visited. By construction, $0 \le v(x) \le 1$.

From the complexity point of view, $v$ is an adjusted proportion of transitions $tp$. Among two sequences with the same number of transitions (e.g.,

---


## Page 10

<header>Ritschard</header>
&lt;page_number&gt;2025&lt;/page_number&gt;

**Table 3. Example Sequences: Complexity Indicators.**

<table>
  <thead>
    <tr>
      <th>Sequence</th>
      <th>Transp</th>
      <th>Nsubs</th>
      <th>Volat</th>
      <th>Cplx</th>
      <th>Turbn</th>
      <th>Turb2n</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1: U/2-P/2-F/2-P/I-T/I</td>
      <td>.57</td>
      <td>28</td>
      <td>.79</td>
      <td>.74</td>
      <td>.70</td>
      <td>.69</td>
    </tr>
    <tr>
      <td>2: U/2-P/2-F/2-T/2</td>
      <td>.43</td>
      <td>16</td>
      <td>.71</td>
      <td>.65</td>
      <td>.73</td>
      <td>.71</td>
    </tr>
    <tr>
      <td>3: F/I-P/I-T/I-U/5</td>
      <td>.43</td>
      <td>16</td>
      <td>.71</td>
      <td>.58</td>
      <td>.44</td>
      <td>.42</td>
    </tr>
    <tr>
      <td>4: F/4-P/I-U/2-F/I</td>
      <td>.43</td>
      <td>15</td>
      <td>.55</td>
      <td>.53</td>
      <td>.53</td>
      <td>.48</td>
    </tr>
    <tr>
      <td>5: F/2-T/2-U/4</td>
      <td>.29</td>
      <td>8</td>
      <td>.48</td>
      <td>.46</td>
      <td>.56</td>
      <td>.43</td>
    </tr>
    <tr>
      <td>6: U/2-T/2-F/4</td>
      <td>.29</td>
      <td>8</td>
      <td>.48</td>
      <td>.46</td>
      <td>.56</td>
      <td>.43</td>
    </tr>
    <tr>
      <td>7: F/2-P/4-T/2</td>
      <td>.29</td>
      <td>8</td>
      <td>.48</td>
      <td>.46</td>
      <td>.56</td>
      <td>.43</td>
    </tr>
    <tr>
      <td>8: U/I-F/5-T/2</td>
      <td>.29</td>
      <td>8</td>
      <td>.48</td>
      <td>.43</td>
      <td>.40</td>
      <td>.35</td>
    </tr>
    <tr>
      <td>9: U/2-P/4-U/2</td>
      <td>.29</td>
      <td>7</td>
      <td>.31</td>
      <td>.38</td>
      <td>.53</td>
      <td>.39</td>
    </tr>
    <tr>
      <td>10: T/4-U/4</td>
      <td>.14</td>
      <td>4</td>
      <td>.24</td>
      <td>.27</td>
      <td>.63</td>
      <td>.27</td>
    </tr>
    <tr>
      <td>11: F/4-U/4</td>
      <td>.14</td>
      <td>4</td>
      <td>.24</td>
      <td>.27</td>
      <td>.63</td>
      <td>.27</td>
    </tr>
    <tr>
      <td>12: F/4-P/4</td>
      <td>.14</td>
      <td>4</td>
      <td>.24</td>
      <td>.27</td>
      <td>.63</td>
      <td>.27</td>
    </tr>
    <tr>
      <td>13: T/4-F/4</td>
      <td>.14</td>
      <td>4</td>
      <td>.24</td>
      <td>.27</td>
      <td>.63</td>
      <td>.27</td>
    </tr>
    <tr>
      <td>14: F/6-U/2</td>
      <td>.14</td>
      <td>4</td>
      <td>.24</td>
      <td>.24</td>
      <td>.29</td>
      <td>.21</td>
    </tr>
    <tr>
      <td>15: U/8</td>
      <td>.00</td>
      <td>2</td>
      <td>.00</td>
      <td>.00</td>
      <td>.00</td>
      <td>.00</td>
    </tr>
    <tr>
      <td>16: F/8</td>
      <td>.00</td>
      <td>2</td>
      <td>.00</td>
      <td>.00</td>
      <td>.00</td>
      <td>.00</td>
    </tr>
  </tbody>
</table>

Note: Transp = Proportion of transition; Nsubs = number of subsequences of the DSS; Volat = objective volatility (w = .5); Cplx = complexity index; Turbn = normalized turbulence; Turb2n = normalized revised turbulence; DSS = distinct successive states.

FPFU and FPFP), the sequence with the higher number of visited states (FPFU) gets higher volatility. From the diversity point of view, v can also be seen as a proportion of visited states $v_p$ adjusted for the arrangement of the states. Among two sequences with the same number of visited states (e.g., FPFP and FFPP), the sequence with more transitions (FPFP) gets higher volatility.

**Complexity index.** The complexity index of Gabadinho et al. (2010, 2011) adjusts the proportion of transitions to take account of the diversity of visited states, the latter reflecting the unpredictability of elements in the sequence. Formally, the index is defined as the geometric mean between the proportion $t_p$ of transitions and the normalized within-sequence entropy $h_{norm}$. The index reads as follows:

$$
c(x) = \sqrt{t_p(x) h_{norm}(x)}.
\quad (4)
$$

The complexity is normalized by construction, $0 \le c(x) \le 1$. Similar to volatility, the complexity index introduced above as a proportion of transitions adjusted for state diversity can also be seen as a state

---


## Page 11

&lt;page_number&gt;2026&lt;/page_number&gt;
<header>Sociological Methods & Research 52(4)</header>

diversity, measured here by entropy, adjusted for the state arrangement (the proportion of transitions). Through entropy and unlike volatility, the complexity index also takes into account the number of occurrences of each state.

**Turbulence.** Turbulence (Elzinga and Liefbroer 2007) is based on the number $\phi(x)$ of distinct subsequences that can be extracted from the DSS of sequence $x$ and the inverse of the variance of spell durations. The first term measures the complexity of state arrangement while the latter reflects the unpredictability of spell duration. Formally, the turbulence is
$$
T(x) = \log_2 \left( \phi(x) \frac{s_{d,\max}^2(x) + 1}{s_d^2(x) + 1} \right), \quad (5)
$$
where $s_{d,\max}^2(x)$ is the maximum duration variance for the number of spells in $x$. As already mentioned, Elzinga and Liefbroer (2007) only consider the variance of the duration of the observed spells and ignore nonvisited states. Since the term $(s_{d,\max}^2(x) + 1)/(s_d^2(x) + 1)$ is used here as an indicator of the unpredictability of state duration, this leads to unexpected effects in case of nonvisited states. In particular, we would get a high turbulence for a simple sequence with two equal long spells irrespective of the alphabet size. To avoid this unwanted effect, we propose a turbulence $T^*(x)$ of type 2 obtained by using the duration variances $s_d^{*2}$ and $s_{d,\max}^{*2}$ that take account for nonvisited states in place of $s_d^2$ and $s_{d,\max}^2$:
$$
T^*(x) = \log_2 \left( \phi(x) \frac{s_{d,\max}^{*2}(x) + 1}{s_d^{*2}(x) + 1} \right). \quad (6)
$$

We have $1 \leq T(x) \leq T_{\max}$, where the maximum value depends on the sequence length $l$ and size $a$ of the alphabet $A$. The maximum $T_{\max}$ is reached, in particular, by the sequence $x_A$ obtained by juxtaposing $\lfloor l/a \rfloor$ times the alphabet and then the $l - a\lfloor l/a \rfloor$ first elements of the alphabet, $\lfloor l/a \rfloor$ standing for the integer part of $l/a$. For example, if the alphabet is $\{F, P, T, U\}$, the maximum turbulence for a sequence of length 10 is reached for FPTUFPTUFP. The maximum value is, thus, obtained by computing the turbulence of this particular sequence $x_A$. This applies also to the turbulence of type 2 for which the maximum is the turbulence of type 2 of $x_A$, that is, $T_{\max}^* = T^*(x_A)$.

---


## Page 12

<header>Ritschard</header>
&lt;page_number&gt;2027&lt;/page_number&gt;

Now that we have the maximum value, to get an index within the [0, 1] range, we can normalize the turbulence as $T_n = (T - 1)/(T_{max} - 1)$ or $T_n^* = (T^* - 1)/(T_{max}^* - 1)$ for the type 2 form.

Table 3 reports these normalized turbulence values for our example together with the other complexity indexes. We see that all measures are positively correlated. We also observe that the complexity index and turbulence exhibit more different values than volatility and Elzinga’s $\phi$ (Nsubs), which in turn exhibit more nuances than the proportion of transitions (Transp). Turb2n, the revised turbulence $T_n^*$, behaves much more similar to the complexity index Cplx than to Turbn, the normalized original Turbulence $T_n$. The two turbulence measures differ quite strongly for sequences 10–13 where the duration variance of the sole visited states is zero.

It is instructive to look at Figure 1 that displays the sequences sorted in decreasing order according to the complexity, turbulence, and revised turbulence indexes, respectively. On the one hand, the order defined by the original turbulence strongly differs from the other two. In particular, we observe the strange behavior of the turbulence that ranks the quite simple sequences 10–13 among the most turbulent sequences. On the other hand, the plot confirms that the revised turbulence and complexity index behave similarly. The most noticeable difference is sequence 3 that gets a lower revised turbulence value despite its three transitions than sequences 5–7 that have only two transitions. This is due to the relatively high duration variance in sequence 3 (see Dustd2 in Table 2).

## Taking the Nature of the States Into Account

In some situations, we can qualify states in the alphabet as good or bad, positive or negative, desired or unwanted, or success or failure. Typically, “employed” is positively qualified and “unemployed” is considered as a negative state. More generally, we may want to oppose states of interest to the other states. In other cases, we may have an order of preference or at least a partial order of preference of states, for example, full-time work preferred to part-time work, which in turn is preferred to unemployment. The latter example would be a partial order if an additional state that we do not know how to rank—inactivity, for example—would come into play or if some states would be considered as equivalent. The measures considered so far ignore such information. However, there exists a series of indexes specifically designed to take account of a

---


## Page 13

2028
*Sociological Methods & Research 52(4)*

---

### Complexity, Turbulence, and Revised Turbulence Sequences

| Complexity | Turbulence | Revised Turbulence |
| :--- | :--- | :--- |
| ![Complexity Sequence 1](https://example.com/complexity_1.png) 1 | ![Turbulence Sequence 2](https://example.com/turbulence_2.png) 2 | ![Revised Turbulence Sequence 2](https://example.com/revised_turbulence_2.png) 2 |
| ![Complexity Sequence 2](https://example.com/complexity_2.png) 2 | ![Turbulence Sequence 1](https://example.com/turbulence_1.png) 1 | ![Revised Turbulence Sequence 1](https://example.com/revised_turbulence_1.png) 1 |
| ![Complexity Sequence 3](https://example.com/complexity_3.png) 3 | ![Turbulence Sequence 13](https://example.com/turbulence_13.png) 13 | ![Revised Turbulence Sequence 4](https://example.com/revised_turbulence_4.png) 4 |
| ![Complexity Sequence 4](https://example.com/complexity_4.png) 4 | ![Turbulence Sequence 12](https://example.com/turbulence_12.png) 12 | ![Revised Turbulence Sequence 7](https://example.com/revised_turbulence_7.png) 7 |
| ![Complexity Sequence 7](https://example.com/complexity_7.png) 7 | ![Turbulence Sequence 11](https://example.com/turbulence_11.png) 11 | ![Revised Turbulence Sequence 6](https://example.com/revised_turbulence_6.png) 6 |
| ![Complexity Sequence 6](https://example.com/complexity_6.png) 6 | ![Turbulence Sequence 10](https://example.com/turbulence_10.png) 10 | ![Revised Turbulence Sequence 5](https://example.com/revised_turbulence_5.png) 5 |
| ![Complexity Sequence 5](https://example.com/complexity_5.png) 5 | ![Turbulence Sequence 7](https://example.com/turbulence_7.png) 7 | ![Revised Turbulence Sequence 3](https://example.com/revised_turbulence_3.png) 3 |
| ![Complexity Sequence 8](https://example.com/complexity_8.png) 8 | ![Turbulence Sequence 6](https://example.com/turbulence_6.png) 6 | ![Revised Turbulence Sequence 9](https://example.com/revised_turbulence_9.png) 9 |
| ![Complexity Sequence 9](https://example.com/complexity_9.png) 9 | ![Turbulence Sequence 5](https://example.com/turbulence_5.png) 5 | ![Revised Turbulence Sequence 8](https://example.com/revised_turbulence_8.png) 8 |
| ![Complexity Sequence 13](https://example.com/complexity_13.png) 13 | ![Turbulence Sequence 9](https://example.com/turbulence_9.png) 9 | ![Revised Turbulence Sequence 13](https://example.com/revised_turbulence_13.png) 13 |
| ![Complexity Sequence 12](https://example.com/complexity_12.png) 12 | ![Turbulence Sequence 4](https://example.com/turbulence_4.png) 4 | ![Revised Turbulence Sequence 12](https://example.com/revised_turbulence_12.png) 12 |
| ![Complexity Sequence 11](https://example.com/complexity_11.png) 11 | ![Turbulence Sequence 3](https://example.com/turbulence_3.png) 3 | ![Revised Turbulence Sequence 11](https://example.com/revised_turbulence_11.png) 11 |
| ![Complexity Sequence 10](https://example.com/complexity_10.png) 10 | ![Turbulence Sequence 8](https://example.com/turbulence_8.png) 8 | ![Revised Turbulence Sequence 10](https://example.com/revised_turbulence_10.png) 10 |
| ![Complexity Sequence 14](https://example.com/complexity_14.png) 14 | ![Turbulence Sequence 14](https://example.com/turbulence_14.png) 14 | ![Revised Turbulence Sequence 14](https://example.com/revised_turbulence_14.png) 14 |
| ![Complexity Sequence 15](https://example.com/complexity_15.png) 15 | ![Turbulence Sequence 15](https://example.com/turbulence_15.png) 15 | ![Revised Turbulence Sequence 15](https://example.com/revised_turbulence_15.png) 15 |
| ![Complexity Sequence 16](https://example.com/complexity_16.png) 16 | ![Turbulence Sequence 16](https://example.com/turbulence_16.png) 16 | ![Revised Turbulence Sequence 16](https://example.com/revised_turbulence_16.png) 16 |

**Legend:**
■ F □ O ■ P □ T □ U

**Figure 1.** Sequences sorted by decreasing order of complexity measures.

---

binary distinction between states, a preference order of the states, or even levels of undesirableness of the states. We start with measures based on a binary distinction between states.

---


## Page 14

<header>Ritschard</header>
&lt;page_number&gt;2029&lt;/page_number&gt;

**Distinguishing positive and negative states.** When some states can be qualified as positive, we can associate a binary sequence of positive (good, of interest) and nonpositive (bad, not of interest) states to each sequence. In particular when the focus is on a specific state of interest such as having a job or having a child, for example, we can qualify this state as positive and oppose it to all other states. From such binary sequences, we can derive the following indicators:

*   $I_{ppos}$, proportion of positive elements;
*   $I_{nvolat}$, normative volatility (proportion of positive spells); and
*   $I_{integr}$, integrative potential or capability.

The *proportion of positive elements* $I_{ppos}$ is a straightforward indicator that, when computed on the full sequence, informs about the tendency to be in states of interest, for example, in good situation. We can also compute this proportion on the DSS sequence, in which case it reflects the *proportion of positive spells*. Brzinsky-Fay (2007) named the proportion of positive spells *volatility* and retained this indicator to measure the flexibility acquired, thanks to the accumulated positive experience. The higher the index, the higher is the accumulated experience and, hence, the flexibility. Later, in Brzinsky-Fay (2018), the volatility was renamed *normative volatility* to distinguish it from the objective volatility discussed in Complexity of the State Arrangement subsection.

The *integrative potential or capability* is another indicator introduced by Brzinsky-Fay (2007). It measures the tendency to integrate a positive state (employment in Brzinsky-Fay 2007), that is, reach a positive state and then stay in a positive state. Formally, letting $is.pos(x_i)$ be 1 when the $i$th element $x_i$ in the sequence is a positively qualified state and 0 otherwise, it is defined as

$$
I_{integr}(x) = \frac{\sum_{i=1}^l is.pos(x_i) i^\omega}{\sum_{i=1}^l i^\omega}, \quad (7)
$$

where $\omega$ is a power parameter that allows to control the importance given to recency. The higher the $\omega$, the higher is the importance given to the end of the sequence. Interestingly, the integrative potential is equal to the proportion of positive states $I_{ppos}$ when $\omega = 0$. This same indicator $I_{integr}$ has been

---


## Page 15

&lt;page_number&gt;2030&lt;/page_number&gt;
<header>Sociological Methods & Research 52(4)</header>

**Table 4. Indicators Based on State Dichotomization, Positive States {F, P}.**

<table>
  <thead>
    <tr>
      <th>Sequence</th>
      <th>Ppos</th>
      <th>Nvolat</th>
      <th>Integr</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1: U/2-P/2-F/2-P/I-T/I</td>
      <td>0.62</td>
      <td>0.60</td>
      <td>0.69</td>
    </tr>
    <tr>
      <td>2: U/2-P/2-F/2-T/2</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.50</td>
    </tr>
    <tr>
      <td>3: F/I-P/I-T/I-U/5</td>
      <td>0.25</td>
      <td>0.50</td>
      <td>0.08</td>
    </tr>
    <tr>
      <td>4: F/4-P/I-U/2-F/I</td>
      <td>0.75</td>
      <td>0.75</td>
      <td>0.64</td>
    </tr>
    <tr>
      <td>5: F/2-T/2-U/4</td>
      <td>0.25</td>
      <td>0.33</td>
      <td>0.08</td>
    </tr>
    <tr>
      <td>6: U/2-T/2-F/4</td>
      <td>0.50</td>
      <td>0.33</td>
      <td>0.72</td>
    </tr>
    <tr>
      <td>7: F/2-P/4-T/2</td>
      <td>0.75</td>
      <td>0.67</td>
      <td>0.58</td>
    </tr>
    <tr>
      <td>8: U/I-F/5-T/2</td>
      <td>0.62</td>
      <td>0.33</td>
      <td>0.56</td>
    </tr>
    <tr>
      <td>9: U/2-P/4-U/2</td>
      <td>0.50</td>
      <td>0.33</td>
      <td>0.50</td>
    </tr>
    <tr>
      <td>10: T/4-U/4</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>11: F/4-U/4</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.28</td>
    </tr>
    <tr>
      <td>12: F/4-P/4</td>
      <td>1.00</td>
      <td>1.00</td>
      <td>1.00</td>
    </tr>
    <tr>
      <td>13: T/4-F/4</td>
      <td>0.50</td>
      <td>0.50</td>
      <td>0.72</td>
    </tr>
    <tr>
      <td>14: F/6-U/2</td>
      <td>0.75</td>
      <td>0.50</td>
      <td>0.58</td>
    </tr>
    <tr>
      <td>15: U/8</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>16: F/8</td>
      <td>1.00</td>
      <td>1.00</td>
      <td>1.00</td>
    </tr>
  </tbody>
</table>

Note: Ppos = Proportion of positive states; Nvolat = normative volatility; Integr = integrative potential (ω = 1).

developed independently by Manzoni and Mooi-Reci (2018) under the name of quality index.

By construction, the proportion of positive elements, normative volatility, and integrative potential $I_{integr}$ take their values in the range [0, 1].

By dichotomizing one state s against all other states, we can compute the integrative potential for any state s. We shall denote this index as $I_{integr}(x, s)$.

Table 4 exhibits the values of the potential $I_{integr}(x)$ (Integr) to integrate work, that is, {F, P}. The values were obtained with ω = 1. We observe that we get the highest values for sequences ending in F or P and the lowest values for sequences ending with a long spell in U. We can also notice in this table that the proportion of positive elements, Ppos, and the normative volatility, Nvolat, which is the proportion of positive spells, get the same values when the same time is spent in all states.

**State undesirableness levels.** Instead of a simple dichotomization between positive and other states, we may dispose of finer information about the (un)desirableness level of the states. The simplest such information would be a preference order among the elements of the alphabet or at least a partial preference order, that is, an order on a subset only of the states. The first

---


## Page 16

<header>Ritschard</header>
&lt;page_number&gt;2031&lt;/page_number&gt;

<table>
  <caption>Table 5. Indicators Based on State Undesirableness (0, 1, 2, 5) for (F, P, T, U).</caption>
  <thead>
    <tr>
      <th>Sequence</th>
      <th>Degrad</th>
      <th>Bad</th>
      <th>Prec</th>
      <th>Insec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1: U/2-P/2-F/2-P/I-T/I</td>
      <td>-.13</td>
      <td>0.25</td>
      <td>0.75</td>
      <td>0.85</td>
    </tr>
    <tr>
      <td>2: U/2-P/2-F/2-T/2</td>
      <td>-.05</td>
      <td>0.29</td>
      <td>0.56</td>
      <td>0.85</td>
    </tr>
    <tr>
      <td>3: F/I-P/I-T/I-U/5</td>
      <td>.53</td>
      <td>0.88</td>
      <td>1.06</td>
      <td>1.10</td>
    </tr>
    <tr>
      <td>4: F/4-P/I-U/2-F/I</td>
      <td>.09</td>
      <td>0.39</td>
      <td>0.57</td>
      <td>0.62</td>
    </tr>
    <tr>
      <td>5: F/2-T/2-U/4</td>
      <td>.51</td>
      <td>0.80</td>
      <td>0.85</td>
      <td>0.97</td>
    </tr>
    <tr>
      <td>6: U/2-T/2-F/4</td>
      <td>-.41</td>
      <td>0.16</td>
      <td>0.20</td>
      <td>0.31</td>
    </tr>
    <tr>
      <td>7: F/2-P/4-T/2</td>
      <td>.18</td>
      <td>0.27</td>
      <td>0.85</td>
      <td>0.65</td>
    </tr>
    <tr>
      <td>8: U/I-F/5-T/2</td>
      <td>-.39</td>
      <td>0.19</td>
      <td>0.55</td>
      <td>0.17</td>
    </tr>
    <tr>
      <td>9: U/2-P/4-U/2</td>
      <td>-.07</td>
      <td>0.60</td>
      <td>0.57</td>
      <td>0.56</td>
    </tr>
    <tr>
      <td>10: T/4-U/4</td>
      <td>.43</td>
      <td>0.83</td>
      <td>0.57</td>
      <td>0.90</td>
    </tr>
    <tr>
      <td>11: F/4-U/4</td>
      <td>.72</td>
      <td>0.72</td>
      <td>0.49</td>
      <td>0.99</td>
    </tr>
    <tr>
      <td>12: F/4-P/4</td>
      <td>.14</td>
      <td>0.14</td>
      <td>0.49</td>
      <td>0.41</td>
    </tr>
    <tr>
      <td>13: T/4-F/4</td>
      <td>-.29</td>
      <td>0.11</td>
      <td>0.08</td>
      <td>0.18</td>
    </tr>
    <tr>
      <td>14: F/6-U/2</td>
      <td>.42</td>
      <td>0.42</td>
      <td>0.44</td>
      <td>0.66</td>
    </tr>
    <tr>
      <td>15: U/8</td>
      <td>.00</td>
      <td>1.00</td>
      <td>0.20</td>
      <td>1.00</td>
    </tr>
    <tr>
      <td>16: F/8</td>
      <td>.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
    </tr>
  </tbody>
</table>

Note: Degrad = Degradation ($\omega = 1$); Bad = badness ($\omega = 1$); Prec = precarity ($\lambda = .2$, $\alpha = 1$, and $\beta = 1.2$); Insec = insecurity ($\omega = 1$).

ranked state would be the preferred state, and the last one would be the most undesirable. The rank can serve as undesirableness degree of the states. Sometimes, however, we may dispose of richer information on the undesirableness of the states. For example, the values reported in Table 5 were obtained by specifying the undesirableness degrees (0, 1, 2, 5) for the states (F, P, T, U) to reflect that the difference of desirability between U and T is greater than that between P and F. From such information, we can derive different indexes.

First, considering only the preference order, we can count the number of upward and downward state changes and compute the proportions $q^+$ of upward changes and $q^-$ of downward changes. The difference between these upward and downward proportions defines the degradation index:

$$I_{\text{degrad}}(x) = q^-(x) - q^+(x). \quad (8)$$

In case of a partial state order, transitions to and from noncomparable states—states that cannot be ranked—and transitions between states belonging to a same equivalence class will be ignored.

By construction, $-1 \leq I_{\text{degrad}}(x) \leq 1$. The index is $-1$ when there are only upward changes, 1 when only downward changes, and 0 in case of no

---


## Page 17

&lt;page_number&gt;2032&lt;/page_number&gt;
Sociological Methods & Research 52(4)

change or when there is the same proportion of upward and downward changes.

The index can be tuned by using transition weights in the calculation of the downward and upward proportions $q^-$ and $q^+$. Ritschard et al. (2018) who use these proportions for their precarity index propose several variants for determining these weights from transition probabilities or the state ranking.

Here, in addition, we suggest to weight each transition by the potential to integrate the spell that follows the transition. The potential $I_{integr}(x, sp(s))$ to integrate a spell $sp(s)$ in a state $s$ is the integrative potential for this state $s$ obtained by considering only the occurrences of $s$ in the spell $sp(s)$, that is, by treating multiple spells in the same state $s$ as if they were spells in different states. Using such weighting, a transition, for example, from employed to unemployed will get a higher weight when the resulting unemployment spell lasts long and is near the end of the sequence.

A second index, $badness$, attempts to measure the overall badness degree of the sequence. We define it as the sum of the undesirableness degrees of the visited states each weighted by the potential to integrate the state. This way, the weight of each state increases with the number of occurrences and recency, that is, states occurring near the end of the sequence contribute more to the overall badness degree of the sequence. Formally, letting $\pi(s)$ be the undesirableness degree of state $s$ normalized such that $\min_s \pi(s) = 0$ and $\max_s \pi(s) = 1$, the index reads as follows:

$$
I_{bad}(x) = \sum_{s \in A} \pi(s) I_{integr}(x, s).
\quad (9)
$$

We have $0 \le I_{bad}(x) \le 1$ and the index $I_{bad}(x)$ takes value 0 for a sequence made of a single spell in the preferred state and value 1 for a single spell in the worst state. For our example, the undesirableness degrees (0, 1, 2, 5) for (F, P, T, U) are normalized as (0, .2, .4, 1), and the badness of sequence 14, for instance, is simply $I_{integr}(x14, U) = (7+8)/(1+2+ \dots + 8) = .42$ because $\pi(F) = 0$ and $\pi(U) = 1$.

The $precarity\ index$ proposed by Ritschard et al. (2018) is based on the idea that precarity has to do with the instability of the sequence and that this instability can be measured by the complexity index. Complexity in itself is a rough precarity indicator that should be amplified when complexity results from deteriorating events (downward transitions) and reduced in case of improving events (upward transitions). This amplification/reduction mechanism is operationalized multiplicatively, that is, by multiplying the complexity index by a correction factor that should be greater than 1 when

---


## Page 18

<header>Ritschard</header>
&lt;page_number&gt;2033&lt;/page_number&gt;

there is a majority of downward transitions and lesser than 1 in case of a majority of upward transitions. In addition, the index takes account of the undesirableness of the start state so that, among two sequences with similar corrected complexity, the sequence with the less favorable start state gets the higher precarity value.

Typically, the multiplicative correction factor of the complexity is defined as $1 + I_{\text{degrad}}(x)$, in which case the precarity index reads as follows:
$$
I_{\text{prec}}(x) = \lambda \pi(x_1) + (1 - \lambda)c(x)^\alpha (1 + I_{\text{degrad}}(x))^\beta,
\quad (10)
$$
where $\pi(x_1)$ stands for the normalized undesirableness of the starting state in the sequence $x$. The index can be tuned not only by means of the parameters $\lambda$ (importance of the start state), $\alpha$ (importance of complexity), and $\beta$ (importance of the correction factor) but also by the undesirableness of the states and use of transition weights in the calculation of the degradation index. When some states are considered as equivalent (no order between them), all members of the equivalence class get the average undesirableness level of the class. Noncomparable states, that is, states that cannot be ranked with respect to the other states in the alphabet—which could, for instance, be the case if we had a state “inactivity” in our example—get the overall average undesirableness level. For more details, see Ritschard et al. (2018). The precarity $I_{\text{prec}}$ is bounded below by 0 but has an upper bound that depends on the values of the parameters. For example, for $\lambda = 0$ and $\beta = 1$, the upper bound is 2.

The (too) many tuning possibilities may hamper the usage of the precarity index. In addition, by mixing additively the undesirableness of the start state and corrected complexity, that is, two quantities that are not measured on the same scale, the index becomes very hard to interpret. It also has some strange behavior. With a low $\lambda$, a sequence with a single spell—that is, zero complexity in the worst state (e.g., sequence 15) would get a low precarity value, while with a $\lambda$ close to 1, the precarity level would be almost solely determined by the undesirableness of the start state.

We propose insecurity as an alternative and simpler index. We postulate that insecurity results from instability, tendency to degradation, and high undesirableness. As for the precarity, we use complexity as an indicator of instability and adjust it with the degradation index to distinguish complexity resulting from improving changes from complexity resulting from degradation. In addition, we need a level component to distinguish between complexity occurring among undesirable states and complexity among more favorable states. We fix this level by means of the undesirableness of the

---


## Page 19

&lt;page_number&gt;2034&lt;/page_number&gt;
<header>Sociological Methods & Research 52(4)</header>

first spell. Unlike the multiplicative form in the definition of $I_{prec}$, we use an additive correction of the complexity:
$$I_{insec}(x) = \pi(x_1)I_{integr}(x, sp(x_1)) + I_{degrad}(x) + c(x). \quad (11)$$

In the first term—undesirableness of the first spell—the undesirableness $\pi(x_1)$ of the start state is adjusted by the capability $I_{integr}(x, sp(x_1))$ to integrate the first spell. This way, when $I_{degrad}(x)$ is computed using the spell integration weights, the start situation can be interpreted as an additional initial transition from the most favorable state to the start state. In the particular case of integrative potentials computed with $\omega = 0$, the weight $I_{integr}(x, sp(x_1))$ would be the proportion of the sequence covered by the first spell.

For sequence 14 and $\omega = 1$, for instance, we have $\pi(F) = 0$, $I_{degrad}(x14) = .42$ (Table 5), and $c(x14) = .24$ (Table 3). Summing these values, we get $I_{insec}(x14) = .66$. The weight $I_{integr}(x14, F)$ is $(1 + 2 + \dots + 6)/36 = 21/36 = .58$, but we do not need this value here because $\pi(F) = 0$.

Simply summing the complexity index, degradation index (that takes negative values in case of improving changes), and undesirableness of the first spell facilitates the interpretation of the index because differences in insecurity values can then be straightforwardly expressed in terms of any of the three components. Looking for example at sequences 7 and 8, the difference in insecurity is $.65 - .17 = .48$. This difference corresponds approximately to their complexity (.46 and .43) and half the undesirableness range. It is also a bit higher than the degradation value .43 of sequence 10 (T/4-U/4), for example.

For sequences made of a single spell such as sequences 15 and 16, the complexity and degradation indexes are 0, and the potential to integrate the first spell is 1. In such cases, the insecurity $I_{insec}(x)$ is equal to the undesirableness degree of the single visited state. If we do not want the index to exceed the insecurity of a full sequence in the worst state or to take values below the insecurity of a full sequence in the best state, we should bound it by the undesirableness values $\pi(best(x))$ and $\pi(worst(x))$ of the best and worst states in the sequence. Thus, we propose to optionally use
$$I_{insec}^*(x) = \begin{cases} \pi(worst(x)) & \text{when } I_{insec}(x) > \pi(worst(x)) \\ \pi(best(x)) & \text{when } I_{insec}(x) < \pi(best(x)) \\ I_{insec}(x) & \text{otherwise} \end{cases} \quad (12)$$

For example, sequence 7, whose worst state is T, gets an insecurity value $I_{insec}$ of .65, while the undesirability degree of T and hence of a full

---


## Page 20

*Ritschard* | **2035**

---

### Degradation, Badness, and Insecurity Visualizations

The following charts represent sequences sorted by decreasing order of unfavorableness indicators.

#### Legend
*   ⬛ **F**
*   ⬜ **O**
*   ⬛ **P**
*   ⬜ **O**
*   ⬛ **T**
*   ⬜ **O**
*   ⬛ **U**

---

#### Data Visualization Tables

| Degradation | Badness | Insecurity |
| :--- | :--- | :--- |
| ![Degradation Chart](https://example.com/degradation_chart) | ![Badness Chart](https://example.com/badness_chart) | ![Insecurity Chart](https://example.com/insecurity_chart) |
| **11** | **15** | **3** |
| **3** | **3** | **15** |
| **5** | **10** | **11** |
| **10** | **5** | **5** |
| **14** | **11** | **10** |
| **7** | **9** | **2** |
| **12** | **14** | **1** |
| **4** | **4** | **14** |
| **16** | **2** | **7** |
| **15** | **7** | **4** |
| **2** | **1** | **9** |
| **9** | **8** | **12** |
| **1** | **6** | **6** |
| **13** | **12** | **13** |
| **8** | **13** | **8** |
| **6** | **16** | **16** |

---

**Figure 2.** Sequences sorted by decreasing order of unfavorableness indicators.

sequence in T is .4. We would get .4 for sequence 7 with the bounded form $I^*_{insec}$. Likewise, for sequence 3, the bounded form value would be 1 instead of 1.1.

---


## Page 21

&lt;page_number&gt;2036&lt;/page_number&gt;
<header>Sociological Methods & Research 52(4)</header>

&lt;img&gt;
<figure>
  &lt;img&gt;Figure 3. Index plots of life satisfaction by birth cohort.&lt;/img&gt;
  <caption>Figure 3. Index plots of life satisfaction by birth cohort.</caption>
</figure>
&lt;/img&gt;

While the bounded insecurity $I_{insec}(x)$ takes its values in $[0, 1]$, the unbounded insecurity $I_{insec}(x)$ can possibly be negative or exceed 1 when the absolute value of $I_{degrad}(x)$ is close to 1. However, values outside the $[0, 1]$ range should be rare and not too far from the bounds because the start state $\pi(x_1)$ must be low for $I_{degrad}(x)$ to be close to 1 and, conversely, high for $I_{degrad}(x)$ to be close to $-1$.

Looking at Figure 2 that displays the sequences sorted according to the degradation, badness, and insecurity indexes, we see that the three indexes behave quite differently. As expected, badness essentially summarizes the undesirableness of the elements of the sequence and the degradation index summarizes the tendency to deterioration. The behavior of the insecurity index

---


## Page 22

<header>Ritschard</header>
&lt;page_number&gt;2037&lt;/page_number&gt;

&lt;img&gt;Scatter plots between quality measures for sequences of life satisfaction of elder people.&lt;/img&gt;

Figure 4. Scatter plots between quality measures for sequences of life satisfaction of elder people.

---


## Page 23

&lt;page_number&gt;2038&lt;/page_number&gt;
Sociological Methods & Research 52(4)

resembles more badness than degradation. The most noticeable differences between badness and insecurity concern the most complex sequences 1 and 2 that appear among the upper half of the most insecure sequences and in the lower half regarding badness. Although the three indexes behave differently, they are generally positively correlated as can be seen in Figures 4 and 5 based on values from the two applications below. Another point worth mentioning is that sequences with a similar structure such as sequences 5–7 or 10–13 get the same values for all indicators in Tables 2 and 3 while they get different values once we take account of the nature of the states in Tables 4 and 5.

## Life Satisfaction in Switzerland

As a first application, we show how individual indicators could be invoked to address the controversial issue of whether the evolution of life satisfaction along the life is U-shaped or not (Bartram 2021; Blanchflower and Oswald 2008; Frijters and Beatton 2012). We consider for that the variable “Satisfaction in general with Life” from the SHP. This is a scale variable with 11 possible values ranging from 0 to 10, 0 meaning “not at all satisfied” and 10 “completely satisfied.” Data on this variable are available since wave 2 (2000), and we use data up to wave 20 (2018). However, because of attrition and the introduction of additional samples in 2004 and 2013, the data for most of the individuals cover only shorter periods. Here, we retain 19-year-long life satisfaction sequences with at least 10 valid values among the 19. This leaves us with 6,002 individuals, of which 864 are youngsters (born after 1980), 2,072 are middle-aged people (born between 1961 and 1980), and 3,066 are elder people (born in 1960 or earlier). The sequences were aligned on the first valid state and then truncated at length 15 to drastically reduce the number of ending missing elements.

The index plots in Figure 3 show that the sequences look quite complex with many transitions for all three groups. There is no clear difference between the groups, except the slightly higher proportion of youngsters who start their observed satisfaction trajectory in one of the top two response categories (dark blue). The plots do not exhibit any obvious improving or deteriorating tendency for any group.

Table 6 reports mean values of a selection of indicators. The first five—that is, Visitp, Transp, Entr, Cplx, and Turb2n—have been retained only for illustration while the last four serve for commenting the U-shape hypothesis. The integrative potential (Integr) was computed by considering the top two categories as positive and measures based on the state order (Bad, Degrad,

---


## Page 24

<header>Ritschard</header>
&lt;page_number&gt;2039&lt;/page_number&gt;

**Table 6. Mean Values of Indicators for Life Satisfaction Trajectories and Student t of Pairwise Differences.**

<table>
  <thead>
    <tr>
      <th>Cohort</th>
      <th>Visitp</th>
      <th>Transp</th>
      <th>Entr</th>
      <th>Cplx</th>
      <th>Turb2n</th>
      <th>Integr</th>
      <th>Degrad</th>
      <th>Bad</th>
      <th>Insec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Younger</td>
      <td>0.31</td>
      <td>0.51</td>
      <td>0.42</td>
      <td>0.46</td>
      <td>0.41</td>
      <td>0.29</td>
      <td>0.001</td>
      <td>0.203</td>
      <td>0.48</td>
    </tr>
    <tr>
      <td>Middle-aged</td>
      <td>0.31</td>
      <td>0.48</td>
      <td>0.40</td>
      <td>0.44</td>
      <td>0.43</td>
      <td>0.28</td>
      <td>-0.007</td>
      <td>0.213</td>
      <td>0.46</td>
    </tr>
    <tr>
      <td>Older</td>
      <td>0.31</td>
      <td>0.48</td>
      <td>0.39</td>
      <td>0.43</td>
      <td>0.43</td>
      <td>0.35</td>
      <td>-0.007</td>
      <td>0.196</td>
      <td>0.45</td>
    </tr>
    <tr>
      <td>Young – Middle</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>t</td>
      <td>0.55</td>
      <td>2.69</td>
      <td>2.61</td>
      <td>2.80</td>
      <td>2.64</td>
      <td>1.21</td>
      <td>2.779</td>
      <td>2.325</td>
      <td>3.03</td>
    </tr>
    <tr>
      <td>p-value</td>
      <td>0.29</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.00</td>
      <td>0.11</td>
      <td>0.003</td>
      <td>0.010</td>
      <td>0.00</td>
    </tr>
    <tr>
      <td>Middle – Old</td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
      <td></td>
    </tr>
    <tr>
      <td>t</td>
      <td>1.96</td>
      <td>0.87</td>
      <td>2.29</td>
      <td>1.69</td>
      <td>1.32</td>
      <td>8.38</td>
      <td>0.365</td>
      <td>5.573</td>
      <td>2.18</td>
    </tr>
    <tr>
      <td>p-value</td>
      <td>0.02</td>
      <td>0.19</td>
      <td>0.01</td>
      <td>0.05</td>
      <td>0.09</td>
      <td>0.00</td>
      <td>0.357</td>
      <td>0.000</td>
      <td>0.01</td>
    </tr>
  </tbody>
</table>

Note: Visitp = proportion of states visited; Transp = proportion of transitions; Entr = normalized entropy; Cplx = complexity; Turb2n = normalized revised turbulence; Integr = integrative potential; Bad = badness; Degrad = degradation; Insec = insecurity. The three latters were computed with recency exponent ω = 1.

and Insec) by assuming equidistant undesirableness degrees for the 11 life satisfaction values. The recency exponent was set as ω = 1.

Since some sequences are shorter than others, it is worth mentioning that because the indexes are all either proportions or derived from proportions, none of them depends on the sequence length. It is, thus, legitimate to average and compare index values of sequences of different lengths. Regarding the gaps remaining in the sequences, there are two options: either treat the gap as a noncomparable element of the alphabet or simply ignore it. Here, we retained the latter option. However, the results are almost identical to those of the first option. We also obtain very similar results when deleting all sequences containing gaps.

As we could expect from the index plots, the reported mean values do not reveal drastic differences between groups. Nevertheless, at least one difference between age groups is statistically significant for each indicator. Thus, the individual indicators prove useful to point out relevant nonobvious differences.

Interestingly, when looking at the complexity and revised turbulence indexes, we see that while trajectories of youngsters tend to be slightly more complex than those of the other two groups, trajectories of middle-aged and elder persons tend to be more turbulent. This seemingly contradicting outcome is possibly due to the different ways complexity and turbulence take time into account. The turbulence index depends on the distribution of spell

---


## Page 25

&lt;page_number&gt;2040&lt;/page_number&gt;
Sociological Methods & Research 52(4)

durations while the complexity index depends on the distribution of total time spent in each of the states. These may be quite different when there are multiple spells in the same state, as is the case here with an average recurrence index of 2.3 for youngsters and 2.5 for middle-aged and elder people.
Ideally, to test the U-shape hypothesis, we should be able to follow up with people along the whole life course. However, we follow individuals over periods of 15 years only with our data. In compensation, we have data for three age groups. From the U-shape hypothesis, we expect the following:
**Hypothesis 1:** Degradation of satisfaction for youngsters and improvement for elder people.
**Hypothesis 2:** Higher badness for middle-aged persons than for youngsters and elder people.
**Hypothesis 3:** Best capability to integrate favorable satisfaction states for elder people and worst capability for middle-aged people.
**Hypothesis 4:** Decreasing insecurity values across the three age groups.

The results in Table 6 confirm such tendencies with some nuances. Although the degradation index suggests more a reversed-L-shape (flat for youngsters and improving for the other two groups) than a U-shape, there is no evidence against Hypothesis 1. The mean badness values behave as expected across age groups. Since the differences are statistically significant, this provides evidence in favor of Hypothesis 2. The values for integrating favorable states confirm Hypothesis 3 only partially. Like the degradation index, they suggest a reversed-L-shape but with improvement only for the older group. Finally, the insecurity values support Hypothesis 4 with statistically significant decreases between youngsters and middle-aged people and between middle-aged and elder people.
In conclusion, the average values of the indicators provide some evidence of increasing average satisfaction for aged people but no clear evidence of decreasing satisfaction during early life. As such, they do not contradict the U-shape hypothesis. However, if this is true as a tendency at the aggregate level, there is relatively high variability among individuals as can be seen in Figure 4. In particular, most of the degradation values of elder people range between -.2 and .2. We also see that a significant proportion of elder individuals have degrading satisfaction sequences and, therefore, do not follow a U-shaped trajectory.

**Monthly Employment Statuses**
This second application illustrates how the indicators of individual sequences can serve in the analysis of employment trajectories. Employment

---


## Page 26

<header>Ritschard</header>
&lt;page_number&gt;2041&lt;/page_number&gt;

&lt;img&gt;
A 4x4 grid of scatter plots, each labeled with a quality measure: "Insec", "Bad", "Degrad", and "Integr". The plots show sequences of monthly work statuses between 2009-2012. The x-axis and y-axis are labeled with values from -1.0 to 1.0. The data points are represented by light blue circles.
&lt;/img&gt;

Figure 5. Scatter plots between quality measures for sequences of monthly work statuses between 2009-2012.

---


## Page 27

&lt;page_number&gt;2042&lt;/page_number&gt;
Sociological Methods & Research 52(4)

trajectories constitute a privileged domain of application of sequence indicators. Diversity and complexity indicators have already been used in several researches to measure instability or insecurity of work trajectories (see for instance Antonini and Bühlmann 2015; Bussi 2016; Struffolino 2019; Widmer and Ritschard 2009), and the indicators that take account of the nature of the states have all been developed with the aim to analyze entry in the labor market and employment trajectories (Brzinsky-Fay 2007; Manzoni and Mooi-Reci 2018; Ritschard et al. 2018). Here, we are interested in the scarring effect of work trajectories (Abebe et al. 2016; Manzoni and Mooi-Reci 2011) and study the five-years-after impact of 36-months-long employment pathways with monthly data.

We use data from the activity calendar built from the SHP (Voorpostel et al. 2020:35-37). These are monthly data, and we consider the calendar activity sequences from September 2009 to September 2018. More specifically, to study the scarring effect, we retain the trajectories followed between September 2009 and September 2012 (three years) and look at their impact on the employment paths between October 2017 and September 2018. We restrict the study to people born after 1954 so as to exclude people who reached the legal retirement age—64 for women and 65 for men—before the end of September 2018 and retain only sequences with no missing values on the two considered periods. This leaves us with 2,407 individuals. The alphabet comprises four states: F, P, I, and U.

Table 7 reports the mean values of a selection of indicators for each of the two periods considered, that is, September 2009 to September 2012 and October 2017 to September 2018. See also Figure 5 that reports scatter plots for values of the first period. The integrative capability was computed with $\omega = 1$ for the integration into {F, P}, that is, into any of the two work categories. For measures based on state undesirableness, we retained the order (F, P, I, U) with undesirableness levels (0, 1, 2, 5). The reported mean values are not much different for the two periods except for the degradation index that indicates a clear tendency to improvement for the first period but is not significantly different from zero for the target period.

To investigate the relationship between the employment trajectory followed during the first period (September 2009–September 2012) and the path during the last observed year (October 2017–September 2018), we have regressed the capability to integrate a working status—F or P—during the last observed year on the insecurity index for the first period. The idea is to measure how the quality of the working path over 36 months impacts the degree of implication in the labor market five years later. We chose the

---


## Page 28

<header>Ritschard</header>
&lt;page_number&gt;2043&lt;/page_number&gt;

**Table 7. Employment Sequences: Mean Values of a Selection of Indicators.**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Integr</th>
      <th>Degrad</th>
      <th>Bad</th>
      <th>Insec</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>September 2009–September 2012</td>
      <td>.88</td>
      <td>−.017</td>
      <td>.138</td>
      <td>.130</td>
    </tr>
    <tr>
      <td>Standard error</td>
      <td>.01</td>
      <td>.003</td>
      <td>.003</td>
      <td>.004</td>
    </tr>
    <tr>
      <td>October 2017–September 2018</td>
      <td>.89</td>
      <td>−.003</td>
      <td>.142</td>
      <td>.148</td>
    </tr>
    <tr>
      <td>Standard error</td>
      <td>.01</td>
      <td>.002</td>
      <td>.003</td>
      <td>.004</td>
    </tr>
  </tbody>
</table>

Note: All indicators were computed with recency exponent ω = 1. Integr = integrative potential; Bad = badness; Degrad = degradation; Insec = insecurity.

**Table 8. Regression of Potential to Integrate {F, P} in 2018 on Insecurity Degree in 2009–2012 (n = 2, 407, R² = .12).**

<table>
  <thead>
    <tr>
      <th></th>
      <th>Estimate</th>
      <th>Standard Error</th>
      <th>t Value</th>
      <th>Pr(> |t|)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>(Intercept)</td>
      <td>.89</td>
      <td>.019</td>
      <td>46.01</td>
      <td>.0000</td>
    </tr>
    <tr>
      <td>Insecurity</td>
      <td>−.30</td>
      <td>.033</td>
      <td>−9.12</td>
      <td>.0000</td>
    </tr>
    <tr>
      <td>Woman</td>
      <td>−.04</td>
      <td>.013</td>
      <td>−2.97</td>
      <td>.0030</td>
    </tr>
    <tr>
      <td>Younger</td>
      <td>.04</td>
      <td>.012</td>
      <td>3.41</td>
      <td>.0007</td>
    </tr>
  </tbody>
</table>

insecurity index as an independent variable because of the multiple dimensions—complexity, degrading tendency, and undesirableness level—that it takes into account. We have introduced the sex and the age-group—youngsters born after 1975 versus elder people—as control variables. Results, given in Table 8, show a strong significant scarring effect (−.3). The effect is negative, meaning that individuals who followed an insecure trajectory during the first period will be less strongly implicated in the labor market five years later. An increase of .1 of insecurity—whose standard deviation is .19—leads on average to a decrease of .03 of the potential to integrate {F, P}. This is a 10th of the standard deviation (= .3) of the integrative potential. The insecurity index is by far the most significant among the three considered variables. Age and sex also have a significant effect with younger people and men having better chances to integrate working positions after an insecure path. The regression reproduces only about 12 percent of the variance of Integr, meaning that the strong relationship between insecurity and later integration capability is far from being deterministic. It should also be mentioned that the strong observed relationship is largely due to the many people with a stable working position between September 2009 and September 2018.

---


## Page 29

&lt;page_number&gt;2044&lt;/page_number&gt;
Sociological Methods & Research 52(4)

## Conclusion

We have distinguished four types of sequence characteristics that can be quantitatively measured: basic features, within diversity, complexity, and quality (positiveness or badness of the sequence). Indicators of the first three types ignore the nature of the states, while quality measures require either a dichotomization of the states, for example, between states of interest and other states, or information on the undesirableness degree of the states such as a preference order. In an effort to overcome the weaknesses of some of the reviewed indicators, we have proposed novel solutions. These include a standard deviation of the spell durations that takes account of the zero time spent in nonvisited states, a revised turbulence that likewise takes nonvisited states into consideration, and three complementary quality measures—degradation, badness, and insecurity—to properly take account of the undesirableness degrees of states.

In total, we have reviewed 27 different indicators. Most of them are proportions, normalized values, or composite indexes derived from proportions and normalized values. This means that, if we exclude the nonnormalized turbulence and counts such as the length $l$, the number of transitions $t_n$, and Elzinga’s $\phi$, values of individual indicators can be compared between sequences of different lengths. However, when the sequence length $l$ is shorter than the size $a$ of the alphabet, the range of possible values may be reduced for some indicators. In particular, the proportion of visited states $v_p$ and the normalized entropy $h_{norm}$ will not reach their maximum 1, and as a consequence, composite indicators based on $v_p$ or $h_{norm}$ will have their range of possible values restricted. This includes the objective volatility $v$, complexity $c$, precarity $I_{prec}$, and insecurity $I_{insec}$. Likewise, the variance of spell durations taking account of nonvisited states cannot be zero when $l < a$, which impacts the range of possible values of the normalized revised turbulence $T_n^*$. It is also worth mentioning that the values of the indexes depend on the alphabet, and it would not make sense to compare, for example, the complexity of a sequence distinguishing four states F, P, I, and U with the complexity of a sequence where the two states F and P are merged into a single state.

An important issue in sequence analysis—which has no definite solution so far (Ritschard and Studer 2018b)—concerns the treatment of missing elements in the sequences. As seen above, indicators based on proportions or normalized values can straightforwardly be used with censored sequences as long as their length exceeds the alphabet size. For gaps within a sequence, two simple options can be used: treat “missing state” as a state of the alphabet

---


## Page 30

<header>Ritschard</header>
&lt;page_number&gt;2045&lt;/page_number&gt;

or ignore the missing elements when computing the indexes. With the latter option, for instance, the integrative potential would be computed by dividing the sum of positions of the positive elements by the sum of positions of all nonmissing elements.

We will now provide some guidance for selecting indexes. The final choice will obviously depend on the data and our interest. Basic and diversity measures prove especially useful at the exploratory stage. Looking first at $l$ and the number of valid elements $l_v$, we can know whether there are sequences of different length and missing elements in the sequences. Subsequently, we should have a glance at the distribution of other basic and diversity indicators to enlighten the following four aspects: proportion and diversity of visited states ($v_p$, $h_{norm}$), recurrence ($\psi$), transition frequencies ($t_p$, $l_d$), and mean and variance of spell durations ($\bar{d}$, $s_d^2$). The choice between taking nonvisited states into account in the mean and variance of state durations or not will be dictated by circumstances. For example, taking nonvisited states into account makes sense when using the variance as a predictability indicator of the state duration while ignoring nonvisited states is the choice for measuring the variance of the observed spells.

For advanced studies of the arrangement within sequences, we may consider one of the composite complexity indicators—objective volatility, complexity, and revised turbulence—that combine several dimensions. Among the two indexes based on the proportion of transitions, the complexity index $c$ is richer than the objective volatility $v$ because it takes account of the time spent in different states. The turbulence, more focused on spells and sensitive to recurrence, may be preferred for measuring the complexity of the arrangement of sequences with recurrent elements. However, the computation complexity of the turbulence is much greater than that of the volatility and complexity indexes, which could be a concern for large data sets and very long sequences. If opting for the turbulence, we strongly suggest to use the normalized revised form $T_n^*$ to avoid the flaws of the original version.

Regarding the quality measures, the choice depends on the assumptions we are ready to make on the state undesirableness. Among the three indicators based on a dichotomization between positive and negative states, the integrative potential $I_{integr}$ that takes account of recency is the richer and the volatility $I_{volat}$ that ignores spell durations is the cruder. As for the indicators that exploit information on the undesirableness level of the states, the degradation $I_{degrad}$ measures the tendency toward deterioration and the badness $I_{bad}$ measures the overall sequence undesirableness. Precarity $I_{prec}$ and insecurity $I_{insec}$ are richer indexes that combine complexity, degradation,

---


## Page 31

&lt;page_number&gt;2046&lt;/page_number&gt;
Sociological Methods & Research 52(4)

and undesirableness level. Among the latter two, we recommend $I_{insec}$, which is easier to interpret and avoids the possible strange behavior of the precarity $I_{prec}$.

Individual indicators have several advantages. First, they provide features of a sequence that do not depend on other sequences unlike the traditional sequence analysis approach that proceeds with typologies constructed from the whole set of sequences. Second, they are quantitative, as such (i) they can easily be summarized for a set of sequences, with mean and standard deviation, for example, and used to compare groups; (ii) they can straightforwardly serve as dependent or independent variables in regression analyses; and (iii) they are well suited for time evolution analysis by means of sliding or incremental windows as shown in Pelletier et al. (2020). Here, we have illustrated the usage of individual indicators with two applications using data from the SHP. The first application compares the evolution of 15-year-long life satisfaction sequences of three age groups, and results provide some evidence of a U-shaped evolution of satisfaction along the life course. An interesting aspect of the application is that by looking at individual indicators, we were able to uncover statistically significant effects that could not be seen from index plots. The second application demonstrates how the quality measures can be used in regressions to investigate the scarring effect of earlier employment trajectories. It is important to note that these small applications only have an illustrative purpose. The research questions addressed would need a more detailed examination that is beyond the scope of this study.

Although the review has pointed out the main characteristics and compared the ranking behavior of the indicators, there remains room to further improve our understanding of the indicators in at least two directions. First, it is not always clear whether the indicator increases linearly between its minimum and maximum, and it could be very instructive to explore this by means of simulation studies in the vein of what Olszak and Ritschard (1995) have done for association measures. Second, it would also be enlightening to study how the indicators can evolve with the sequence length by exploring typical scenarios of successive sequence extensions.

**Author's Note**

This study has been realized using data collected in the “Living in Switzerland” project, conducted by the Swiss Household Panel (SHP), which is based at the Swiss Foundation for Research in Social Sciences FORS, University of Lausanne. The project is financed by the Swiss National Science Foundation.

---


## Page 32

<header>Ritschard</header>
&lt;page_number&gt;2047&lt;/page_number&gt;

## Acknowledgment
The author is very grateful to the three anonymous reviewers. The article has largely benefited from their careful reading and constructive comments.

## Declaration of Conflicting Interests
The author(s) declared no potential conflicts of interest with respect to the research, authorship, and/or publication of this article.

## Funding
The author(s) received no financial support for the research, authorship, and/or publication of this article.

## ORCID iD
Gilbert Ritschard &lt;img&gt;ORCID logo&lt;/img&gt; https://orcid.org/0000-0001-7776-0903

## References
Abebe, D. S., M. Bussi, D. Buttler, C. Hyggen, C. Imdorf, P. Michoń, J. O’Reilly, and L. P. Shi. 2016. “Explaining Consequences of Employment Insecurity: The Dynamics of Scarring in the United Kingdom, Poland and Norway.” NEGOTIATE Working Paper No. 6.2, NOVA, Oslo Metropolitan Univeristy, Oslo, Norway.
Antonini, M. and F. Bühlmann. 2015. “Towards a Multidimensional Theory of Post-unemployment Scarring: Recurrence, Instability and Downgrading.” LIVES Working Paper No. 37, NCCR LIVES, Lausanne, Switzerland.
Bartram, D. 2021. “Age and Life Satisfaction: Getting Control Variables under Control.” Sociology 55(2):421-437.
Biemann, T., A. E. Fasang, and D. Grunow. 2011. “Do Economic Globalization and Industry Growth Destabilize Careers? An Analysis of Career Complexity and Career Patterns over Time.” Organization Studies 32(12):1639-63.
Blanchflower, D. G. and A. J. Oswald. 2008. “Is Well-being U-shaped over Life Cycle?” Social Sciences and Medicine 66(8):1733-49.
Brzinsky-Fay, C. 2007. “Lost in Transition? Labour Market Entry Sequences of School Leavers in Europe.” European Sociological Review 23(4):409-22.
Brzinsky-Fay, C. 2018. “Unused Resources: Sequence and Trajectory Indicators.” International Symposium on Sequence Analysis and Related Methods, October 10–12, Monte Verita, TI, Switzerland.
Bussi, M. 2016. “Strait-jackets or Stepping Stones? Exploring Institutional Ability to Develop Employability of Young People.” PhD dissertation, School of social sciences, University of Geneva, Switzerland.

---


## Page 33

&lt;page_number&gt;2048&lt;/page_number&gt;
Sociological Methods & Research 52(4)

Ceriani, L. and P. Verme. 2012. “The Origins of the Gini Index: Extracts From VARIABILITÀ e Mutabilità (1912) by Corrado Gini.” *The Journal of Economic Inequality* 10(3):421-43.

Christensen, R. C. (2021). “Elite Professionals in Transnational Tax Governance.” *Global Networks A Journal of Transnational Affairs* 21:265-93.

Elzinga, C. H. 2010. “Complexity of Categorical Time Series.” *Sociological Methods & Research* 38(3):463-81.

Elzinga, C. H. and A. C. Liefbroer. 2007. “De-standardization of Family-life Trajectories of Young Adults: A Cross-national Comparison Using Sequence Analysis.” *European Journal of Population* 23:225-50.

Frijters, P. and T. Beatton. 2012. “The Mystery of the U-shaped Relationship between Happiness and Age.” *Journal of Economic Behavior and Organization* 82(2-3): 525-42.

Gabadinho, A., G. Ritschard, N. S. Müller, and M. Studer. 2011. “Analyzing and Visualizing State Sequences in R with TraMineR.” *Journal of Statistical Software* 40(4):1-37.

Gabadinho, A., G. Ritschard, M. Studer, and N. S. Müller. 2010. “Indice de Complexité Pour le tri et la Comparaison de Séquences Catégorielles.” *Revue des nouvelles technologies de l'information RNTI* 19:61-66.

Gini, C. (1912). “Variabilità e Mutabilità. In *Memorie di Metodologica Statistica*. Liberia Eredi Virgilio Veschi, Roma, Italy.

Hiekel, N. and S. Vidal. 2020. “Childhood Family Structure and complexity in Partnership Life Courses.” *Social Science Research* 87(102400):1-17.

Manzoni, A. and I. Mooi-Reci. 2011. “Early Unemployment and Subsequent Career Complexity: A Sequence-based Perspective.” *Schmollers Jahrbuch* 131(2): 339-48.

Manzoni, A. and I. Mooi-Reci. 2018. Measuring sequence quality. Pp. 261-78 in *Sequence Analysis and Related Approaches*, edited by G. Ritschard and M. Studer

Mattioli, G., J. Anable, and K. Vrotsou. 2016. “Car Dependent Practices: Findings from a Sequence Pattern Mining Study of UK Time Use Data.” *Transportation Research Part A* 89:56-72.

Olszak, M. and G. Ritschard. 1995. “The Behaviour of Nominal and Ordinal Partial Association Measures.” *The Statistician* 44(2):195-212.

Pelletier, D., S. Bignami-Van Assche, and A. Simard-Gendron. 2020. “Measuring Life Course Complexity with Dynamic Sequence Analysis.” *Social Indicators Research* 152:1127-51.

Ritschard, G. and M. Studer, eds. 2018a. *Sequence Analysis and Related Approaches: Innovative Methods and Applications. Vol. 10, Life course Research and Social Policies*. Cham, Switzerland: Springer.

---


## Page 34

<header>Ritschard</header>
&lt;page_number&gt;2049&lt;/page_number&gt;

Ritschard, G. and M. Studer. 2018b. “Sequence Analysis: Where Are We, Where Are We Going?” Pp. 1-11 in *Sequence Analysis and Related Approaches*, edited by G. Ritschard and M. Studer, .

Ritschard, G., M. Bussi, and J. O’Reilly. 2018. “An Index of Precarity for Measuring Early Employment Insecurity.” Pp. 279-95 in *Sequence Analysis and Related Approaches*, edited by G. Ritschard and M. Studer

Shannon, C. E. 1948. “A Mathematical Theory of communication.” *Bell System Technical Journal* 27(3):379-423.

Simpson, E. H. 1949. “Measurement of Diversity.” *Nature* 163:688.

Struffolino, E. 2019. “Navigating the Early Career: The Social Stratification of Young Workers’ Employment Trajectories in Italy. *Research in Social Stratification and Mobility* 63:1-17.

Van Winkle, Z. 2020. “Family Policies and Family Life Course Complexity across 20th-century Europe.” *Journal of European Social Policy* 30(3):320-38.

Voorpostel, M., R. Tillmann, F. Lebert, U. Kuhn, O. Lipps, V.-A. Ryser, E. Antal, G. Monsch, N. Dasoki, H. S. Klaas, and B. Wernli. 2020. *Swiss Household Panel user guide (1999-2018), Wave 20*. Lausanne, Switzerland: FORS.

Widmer, E. and G. Ritschard. 2009. “The De-standardization of the Life Course: Are Men and Women Equal?” *Advances in Life Course Research* 14(1-2):28-39.

## Author Biography

**Gilbert Ritschard** is Professor Emeritus of Statistics at the Geneva School of Social Sciences, University of Geneva, Switzerland. His current research is centered on methods for studying life courses and, in particular, sequence analysis and related approaches. With his team he has developed the worldwidely used TraMineR tool kit for sequence analysis.