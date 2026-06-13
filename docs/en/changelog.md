# What's New

### 22 May 2026

**Sequenzo v0.1.40** has been released on PyPI (includes changes since v0.1.39).

**Highlights**
- **seqHMM / model-based sequence analysis**: added MNHMM support, multichannel MHMM fixed-parameter inference, richer seqHMM-style utility coverage, and upgraded NHMM formula handling.
- **Performance and reliability**: improved KMedoids/PAM performance, hardened C++ distance/release boundaries, and refined CLARA accuracy.
- **Multidomain and event-history workflows**: updated multidomain sequence analysis and visualization, improved sequence history analysis, and added spell survival analysis in the event-history module.
- **Packaging**: strengthened Windows and macOS wheel handling, including OpenMP loading and bundled-library fixes.
- **Distance methods and indicators**: updated OMspell, OMtspell, OMspellRS, LCPspell, and Elzinga-Studer normalization work.

### 14 May 2026

**Sequenzo v0.1.39** has been released on PyPI (includes changes since v0.1.38).

**Highlights**
- **Feature extraction and decomposition**: updated the feature extraction and selection workflow and decomposition modules.
- **Discrepancy and group comparison**: aligned discrepancy analysis, event sequences, and group-comparison helpers more closely with the original papers and R implementations.
- **Clustering**: added/refined fuzzy clustering, property-based clustering, and KMedoids helper functions.
- **Packaging**: improved Python dependency handling, Windows OpenMP compilation, and wheel build reliability across Python versions.

### 27 Apr 2026

**Sequenzo v0.1.38** has been released on PyPI (includes changes since v0.1.37).

**Highlights**
- **Dissimilarity measures**: optimized OMspell, OMtspell, OMslen, OMloc, and TWED C++ implementations; fixed TWED normalization behavior.
- **Dependency compatibility**: added `statsmodels` as a package dependency and adjusted version constraints for older Python versions.
- **Documentation and benchmarks**: added ablation and extended benchmark visualizations.

### 29 Mar 2026

**Sequenzo v0.1.37** has been released on PyPI (includes changes since v0.1.36).

**Highlights**
- **Feature extraction & selection**: new pipeline (Boruta-style + clustassoc-like workflow) with tests.
- **Distances & indicators**: faster OM/LCS/LCP/Euclidean distance matrices; **KOB decomposition** and distance-based indicators with TraMineR-alignment tests; optional condensed distance matrix output from `get_distance_matrix`, with plotting helpers updated for condensed inputs.
- **Clustering**: further hierarchical-clustering performance (including full-matrix cases), ClusterQuality/ClusterResults in C++, benchmarking and consistency checks; OpenMP handling and macOS/Jupyter OpenMP conflicts addressed; MSVC/Windows compatibility fixes.
- **TraMineR alignment**: broader consistency work for event, distance, and tree-related workflows.
- **seqHMM**: new tutorials (mvad, biofam, pairfam scenarios).
- **Data & docs**: `seqdss` read-only fix; SequenceData missing-value validation; hierarchical vs PAM clustering tutorial on pairfam activity; README/tutorial updates; academic-style plot labels (e.g. 1,000 instead of “k”).
- **Packaging & CI**: sdist includes `.pyx` files for reliable Cython builds from source; workflow and PR checks refined.

### 9 Mar 2026

**Sequenzo v0.1.36** has been released on PyPI (includes changes since v0.1.35).

**Highlights**
- **Clustering**: more hierarchical clustering logic in C++; better numerical stability for Ward with large distances; preprocessing improvements.
- **Plots & data**: safer relative-frequency plots when distance scales are extreme; `define_sequence_data` accepts state definitions that are a superset of observed states.
- **seqHMM**: bug fixes and consistency tests.
- **Tutorials & docs**: Pairfam materials, stress-data R tutorials, tutorial cleanup; README update.
- **Build & CI**: wheel/Windows toolchain and cibuildwheel fixes; workflow robustness (e.g. rate limits, parallelism).

**Bug fixes**
- LCP distance edge case; assorted packaging and CI issues.

### 2 Mar 2026

**Sequenzo v0.1.35** has been released on PyPI (includes changes since v0.1.34).

**Highlights**
- **Sequences to variables**: added a workflow for deriving sequence-based covariates, with tests.
- **Plots**: improved layout for relative frequency plots.
- **Stress workflow**: updated tutorials; stress module updates (e.g. lazy imports, extended modeling and inference).
- **Packaging**: fixed import failure involving `importlib.util`.

### 24 Feb 2026

**Sequenzo v0.1.34** has been released on PyPI (includes changes since v0.1.33).

**Highlights**
- **Data & utilities**: `utils` helpers for weighted summaries; three built-in datasets (child mortality, life expectancy, GDP per capita); utilities for comparing sequences.
- **Dissimilarity**: **OMloc** / **OMstran** fixes for TraMineR alignment, including missing values in `get_distance_matrix()`; additional TraMineR comparison tests.
- **Clustering**: Ward correction in fast hierarchical clustering (consistent with standard `hclust`); streamlined preprocessing and tests.

### 13 Feb 2026

Sequenzo version v0.1.33 has been released (includes changes from v0.1.32).

**New Features & Data:**
- **Event sequence analysis**: added `with_event_history_analysis` module with functions such as `create_event_sequences`, `find_frequent_subsequences`, `count_subsequence_occurrences`, `compare_groups`, and visualizations (`plot_event_sequences`, `plot_subsequence_frequencies`), plus tutorials and unit tests.
- **Sequence characteristics**: added functions to capture sequence characteristics (e.g., subsequences, transitions, turbulence, complexity index, within-sequence entropy, spell duration variance, cross-sectional entropy) and corresponding tutorials and unit tests.
- **Dissimilarity measures**: added new distance methods `OMloc`, `OMslen`, `OMstran`, `TWED`, `LCS`, `NMS`, `NMSMST`, soft NMS via `method="NMS"` with `prox`, and `SVRspell` to `get_distance_matrix()`.
- **LCP-related**: added LCP-related functions; `matrix_display` option for LCP/LCPspell; improved documentation and notebook demos.
- **Tree analysis** (v0.1.33): added `tree_analysis` module with regression tree analysis for sequence data (TraMineR-style `disstree` / `seqtree`), including `build_distance_tree`, `build_sequence_tree`, `compute_pseudo_variance`, `compute_distance_association`, and visualization helpers.
- **Elzinga & Studer (2019) normalization**: added reference-based normalization method from Elzinga & Studer (2019).
- **Visualization**: added color transparency support in `SequenceData()` and improved spacing in index plots.
- **Data utilities**: standardized column cleaning and dataset listing; refactored data preprocessing helpers.
- **Weighted statistics**: added `utils` module with `weighted_mean`, `weighted_variance`, and `weighted_five_number_summary` to align with TraMineR’s weighted behavior.

**Bug Fixes:**
- Fixed OM normalization alignment with TraMineR; corrected DP segment length (m/n = mSuf-prefix-1).
- Fixed OMloc compilation and OMslen/OMstran execution issues.
- Fixed numpy matrix in `get_distance_matrix()` not being writeable.
- Fixed LCPspell `norm=auto` to use maxdist and avoid negative distances; fixed `norm=none` behavior.
- Fixed pytest bugs in dissimilarity measures; all 29 tests now pass for various configurations.

**Other:**
- Updated seqhmm component.
- Translated Chinese comments in dissimilarity measures module to English.
- Improved xsimd submodule initialization to auto-fix commit mismatch.
- Expanded docstrings and documentation for data-cleaning and tree analysis scripts.

### 1 Feb 2026

Sequenzo version v0.1.31 has been released.

**New Features & Data:**
- Added cleaned **biofam** datasets to the package so you can load them directly from `sequenzo.datasets`.
- Added **polyadic** sample datasets (Liao and Lin, forthcoming in 2026) and cleaned polyadic children/parents CSV files.
- New helper **`clean_time_columns_auto()`** for automatically cleaning time columns in your data.
- **pairfam** data: updated how the original pairfam data are cleaned and pre-processed; added **pairfam-activity** and **pairfam-family** at both month and year levels.
- **Prefix and suffix trees**: added spell version and improved speed.
- Updated **aid** datasets from political science.
- Terminology: wording changed from "polyadic" to "dyadic" where appropriate for accuracy.

**Bug Fixes:**
- Fixed the Sequenzo version shown incorrectly in a Jupyter notebook.
- Updated the notebook example for handling very large distance matrix outputs (`get_distance_matrix_example_for_handling_outputs_too_large`).
- Minor updates to `spell_individual_level_indicators.py` and LCP-related code.

**Other:**
- Reorganized files under `original_datasets_and_cleaning` and removed duplicate/unrelated files in the developer folder.
- Improved docstrings and documentation for the data-cleaning scripts.

### 28 Jan 2026

Sequenzo version v0.1.30 has been released.

**Bug Fixes:**
- Fixed missing OpenBLAS on scipy when building wheels for Ubuntu Python 3.10/3.11
- Fixed an inconsistency between the output of `cat.py` and R version
- Updated `tutorials/01_quickstart.ipynb`

### 6 Jan 2026

Sequenzo version v0.1.29 has been released.

**Bug Fixes:**
- Fixed the issue where the y-axis of `plot_relative_frequency` was misaligned with the sequence
- Fixed an incorrect parameter check when missing values were present in SequenceData
- Fixed a key mismatch issue in `plot_sequence_index` when plotting clusters
- Fixed sample data states matching issue
- Fixed KeyError for plotting sequence index for clusters in 01_quickstart tutorial
- Fixed the dissimilarity between `seqMD.R` and `cat.py`
- Fixed a bug for plotting mean time and dealing with 'NaN' values
- Fixed the issue of inconsistent indexing in dataframe in `cat.py`

**Improvements:**
- Organized folders and documents for better readability

### 30 Dec 2025

Sequenzo version v0.1.28 has been released.

**New Features:**
- Added `show_default_color_palette()` and `get_default_color_palette()` methods in SequenceData class

**Improvements:**
- Enhanced SequenceData validation:
  - Version check now shows specific version in upgrade command (e.g., `pip install --upgrade sequenzo==0.1.27`)
  - Added complete state space validation: checks that all data values are included in states parameter
  - Improved labels validation error messages with detailed information about missing/extra labels
- Improved `plot_sequence_index` layout spacing:
  - Fixed subplot spacing for column layout to prevent x-axis label overlap
  - Optimized x-axis label display: only show xlabel on bottom subplot for column layout
- Enhanced color-related features in SequenceData

**Bug Fixes:**
- Fixed the issue of seqlength when working on `compute_cat_distance_matrix`

**Documentation:**
- Enhanced README with additional references and acknowledgments
- Corrected the wrong reference in the multidomain sequence analysis tutorial

### 11 Dec 2025

Sequenzo version v0.1.27 has been released.

**New Features:**
- Added `proportional_scaling` parameter to `plot_sequence_index`:
  - Scales subplot heights based on group sizes
  - Uses gridspec to create proportional heights when layout='column'
  - Calculates height ratios from sequence counts in each group
  - Minimum height ratio of 0.3 to prevent extremely small subplots
  - Useful for comparing groups with very different sizes
- Added `hide_y_axis` parameter to `plot_sequence_index`:
  - Hides y-axis ticks, labels, and spine
  - Useful when using proportional_scaling for cleaner visualizations
- Added `show_title` parameter to `plot_sequence_index` and `plot_state_distribution`:
  - Allows users to control title visibility separately from providing title string
  - Default value is True to maintain backward compatibility
- Added `sort_by_ids` and `return_sorted_ids` parameters to `plot_sequence_index`:
  - Allows custom ID-based sorting for aligning multiple plots
  - Supports multidomain sequence analysis by enabling ID alignment across plots

**Improvements:**
- Enhanced missing value handling in the `SequenceData` class:
  - Added `missing_values` parameter to support custom missing value indicators (e.g., 99, 9, 1000)
  - Enhanced automatic detection of missing values (pandas NaN, string 'Missing', and custom values)
  - Improved logic to detect and warn users about additional missing value types
  - Automatic handling of missing values in states, labels, and color mapping
  - Better color mapping: automatically adds gray color for missing values when `custom_colors` provided
- Fixed length mismatch bug when missing label exists but state is auto-added
- Added legend to `plot_mean_time`

**Bug Fixes:**
- Fixed the issue in which the state distribution plot and the sequence index plot failed to correctly align with the corresponding cluster membership groups
- Debugged `cat.py` for a case study

**Documentation:**
- Added materials for debugging cat multidomain sequence analysis

### 26 Nov 2025

Sequenzo version v0.1.26 has been released.

**Bug Fixes:**
- Fixed an import issue involving `aic` and related helpers.

**Dependencies:**
- Added hmmlearn settings in pyproject.toml and requirements

### 25 Nov 2025

Sequenzo version v0.1.25 has been released.

This version introduced the Python implementation of seqHMM. It was the first release of this feature; further optimization is planned for future updates. This release also improved several visualization features.

### 11 Nov 2025

Sequenzo version v0.1.24 has been released.

This update fixed and improved the fastcluster and CLARA clustering methods and their environment dependencies,
making it easier for users to download and use Sequenzo.

This update also further improved the index plot and state distribution plot,
making them more user-friendly.

### 7 Oct 2025

Sequenzo v0.1.19 fixed the `pip install sequenzo` issue introduced in v0.1.18. It also corrected transition-matrix calculations and added less common methods, including Sequence History Analysis and the Sequence Analysis Multi-State Model.

### 3 Oct 2025

Sequenzo version v0.1.18 has been released.

This release added entropy and other complexity measures, introduced sequence history analysis and sequence analysis multi-state models, and added support for Ward's D hierarchical clustering method from R.

### 18 Sep 2025

Sequenzo version v0.1.17 has been released.

This release updated most of the documentation in both English and Chinese.
