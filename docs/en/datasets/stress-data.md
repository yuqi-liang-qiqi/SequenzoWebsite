# Stress Sequences Dataset (DEPRESS)

This dataset contains weekly stress trajectories of 76 college students during the COVID-19 pandemic. Each student has a sequence of stress levels over 8 weeks (Low, Medium, or High), and demographic variables (gender, income group, race, study time). The data come from the DEPRESS study (Guo et al., 2026) and were cleaned and prepared by the Sequenzo team for use in Sequenzo.

## Where does this dataset come from?

The data are drawn from DEPRESS (Dataset on Emotions, Performance, Responses, Environment, and Satisfaction during COVID-19), a longitudinal study published in *Scientific Data* (2026). The full reference is:

- **Paper**: Guo, X., Incollingo Rodriguez, A.C., Wang, C. *et al.* DEPRESS: Dataset on Emotions, Performance, Responses, Environment, and Satisfaction during COVID-19. *Sci Data* (2026). The further details of the paper are shown [here](https://doi.org/10.1038/s41597-026-06682-w).
- **Data**: Collected at Worcester Polytechnic Institute, Massachusetts, from June 2020 to June 2021, during the COVID-19 pandemic. The data source can be downloaded [here](https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/SJ8ILQ&version=1.2). 

## What does the paper cover?

The DEPRESS study aimed to understand how **college students’ mental health and learning** were affected by the pandemic. Originally, it enrolled about **180 undergraduate students** and collected:

- **Mental health**: stress (PSS), positive/negative affect (PANAS), depression (CES-D), anxiety (STAI)
- **Learning**: online student engagement (OSE), computer/internet performance, GPA
- **Context**: demographics, daily activity diaries, indoor environment satisfaction, Fitbit data, indoor air quality (AWAIR sensors), and (for a subset) facial expressions during online classes

Surveys were administered at different frequencies: stress and affect **weekly**; depression and anxiety **monthly**; daily diaries **daily**. The paper describes the design, measures, preprocessing, and validation of the full dataset.

## What data did we use?

We use only a subset of DEPRESS and the selected datasets are stored [here](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/stress/data_source):

| What we use | Details |
| ----------- | ------- |
| **Source files** | `PANAS_PSS.csv` (Mental Health Outcomes) for weekly PSS; `Demographic and socioeconomic status.xlsx` for demographics; `Daily_Activity_Diary.csv` for study time. |
| **Cohorts** | **Fall 2020** (≈83 participants in raw data) and **Spring 2021** (≈65 participants). Summer 2020 (≈36 participants) was excluded because it had a much smaller sample and a different academic calendar (June–August); keeping only Fall and Spring ensures comparable semester structure across all included participants. |
| **Measure** | The **4-item Perceived Stress Scale (PSS-4)**. Each week, participants answer 4 questions; responses are coded 0–4 and averaged, so the **PSS score ranges from 0 to 4** per week. |
| **Time window** | We keep only participants who have **at least 8 consecutive valid weekly PSS observations**. Each person is then represented by exactly **8 weeks** of data (weeks 1–8) even though a typical U.S. university semester lasts for more than eight weeks. |
| **Demographic filter** | Only participants with a record in the demographic file are kept. This drops 13 of 89 eligible participants. Final N = 76, all with non-missing gender, income_group, race. |

So the cleaned sequence data is a typical wide format dataset (one row per person), with stress (and optionally dates) for 8 weeks, plus demographics and study time. No other DEPRESS variables (PANAS, CES-D, STAI, Fitbit, IEQ, etc.) are included.

## What does the current data look like?

After cleaning, the dataset has:

- **76 participants** (50 Fall 2020, 26 Spring 2021).
- **One row per participant** (wide format).
- **8 time points** (weeks 1–8). Each week has a **stress state**: **L** (Low), **M** (Medium), or **H** (High).
- **Demographic variables** merged from the DEPRESS demographic file and daily diary: `gender`, `income_group`, `race`, `avg_study_time`.

### Main variables

| Variable | Description | Source |
| -------- | ----------- | ------ |
| `participant_id` | Anonymous ID (e.g. "Fall 100", "Spring 15"). | `PANAS_PSS.csv` (ID) |
| `cohort` | Semester: "Fall" or "Spring". | Derived from `participant_id` prefix in `PANAS_PSS.csv` |
| `1`, `2`, … `8` | Stress state in week 1, 2, … 8. Values: **L**, **M**, **H**. | `PANAS_PSS.csv` (PSS column), discretized by pipeline |
| `gender` | Sex (e.g. female, male). | `Demographic and socioeconomic status.xlsx` (Sex) |
| `income_group` | Recoded: Lower (&lt;$60k), Middle ($60k–$150k), Higher ($150k+), Unknown. | `Demographic and socioeconomic status.xlsx` (Income), recoded by pipeline |
| `race` | Self-reported race/ethnicity. | `Demographic and socioeconomic status.xlsx` (Race) |
| `avg_study_time` | Tertiles: Lower (T1), Middle (T2), Higher (T3). NaN if no diary data. | `Daily_Activity_Diary.csv` (school-related activity columns), averaged and discretized by tertiles |

So each row is one **stress sequence** of length 8 plus demographics, e.g. `M, L, L, L, L, L, H, L` with `gender=female`, `income_group=Middle ($60k–$150k)`, etc.

### How the states (L / M / H) are defined

PSS-4 scores (0–4) are turned into three states using fixed thresholds:

- **L (Low)**: PSS &lt; 1.5  
- **M (Medium)**: 1.5 ≤ PSS &lt; 2.5  
- **H (High)**: PSS ≥ 2.5  

So the data you see are discretized weekly stress levels, not the raw PSS numbers (though the cleaning pipeline also produces a version with PSS and dates; see below).

## Is this weekly data? How do I read it?

Yes. Each column 1–8 is one week in time order:

- **Week 1** = first week in that person’s 8-week window (date varies by participant and cohort).  
- **Week 8** = eighth week.

So you get weekly snapshots of stress state. The exact calendar date for each week is not in the main sequence dataset; it is in the “PSS and dates” variant (see [Loading the data](#loading-the-data-in-sequenzo)).

## Loading the data in Sequenzo

In Sequenzo, the main dataset for stress state sequences (L/M/H per week) plus demographics is loaded with:

```python
from sequenzo import load_dataset

df = load_dataset('students_stress_states_by_week')
```

- **Parameter to use**: `'students_stress_states_by_week'`.
- **Result**: A DataFrame with `participant_id`, `cohort`, columns `1`–`8` (stress states **L**, **M**, **H**), and demographics: `gender`, `income_group`, `race`, `avg_study_time`.
- **Data shape**: 76 rows × 14 columns.

If you need numeric PSS scores and the survey dates for each week, use `students_perceived_stress_and_dates_by_week.csv` (also includes demographics) even though this is not included in our built-in datasets. The pipeline also produces `stress_sequence_wide_with_demographics.csv`. See the [data cleaning repository](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/stress) for all output files.

## Who is this dataset for?

The content is useful for researchers and students in:

- **Psychology** – perceived stress, mental health trajectories, coping.  
- **Education** – student well-being during remote learning, stress and academic context.  
- **Public health / health sciences** – population stress during a crisis, longitudinal patterns.

Because the data are **sequences of ordered states** (L/M/H over 8 weeks), they are a good fit for **sequence analysis**, clustering of trajectories, and similar methods in the social and health sciences.

## How was the data analyzed?

We run a cleaning and preparation pipeline on the raw DEPRESS data. Inputs live in `data_source/` (e.g. `PANAS_PSS.csv`, `Demographic and socioeconomic status.xlsx`, `Daily_Activity_Diary.csv`). The pipeline:

1. Loads `PANAS_PSS.csv` and keeps Fall and Spring cohorts.  
2. Parses dates and removes duplicates and invalid PSS values.  
3. Keeps only participants with at least 8 valid weekly PSS observations and builds 8-week windows.  
4. Discretizes PSS into L / M / H using the thresholds above.  
5. Filters to participants with demographic data (13 dropped → final N = 76).  
6. Exports wide and long sequence files, plus readable outputs.  
7. Merges demographics (gender, income_group, race, avg_study_time from Excel and daily diary) into all outputs.  
8. Validates outputs.

**Output files** (in `cleaned_data/`): `stress_sequence_wide.csv`, `stress_sequence_long.csv`, `stress_thresholds.json`, `students_stress_states_by_week.csv`, `students_perceived_stress_and_dates_by_week.csv`, `stress_sequence_wide_with_demographics.csv`, `cleaning_report.csv`.

For exact steps, code, and file descriptions, see:

**[Original datasets and cleaning: stress](https://github.com/Liang-Team/Sequenzo/tree/main/original_datasets_and_cleaning/stress)**

There you will find the pipeline scripts, config (e.g. PSS boundaries, minimum weeks, demographic filter), and the logic for building the 8-week sequences. On this site, the [stress analysis folder](./stress/) contains a typical workflow (e.g. loading `students_stress_states_by_week`, building sequence objects, clustering); for full analytical details and reproducibility, refer to the GitHub link above.

---

*Author: Yuqi Liang*