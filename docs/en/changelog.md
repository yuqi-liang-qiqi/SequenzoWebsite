# What's New

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
- Fixed aic etc. can't be imported issue

**Dependencies:**
- Added hmmlearn settings in pyproject.toml and requirements

### 25 Nov 2025

Sequenzo version v0.1.25 has been released.

In this version, we have implemented the Python version of seqHMM. This is the first release of this feature, and we will continue to optimize it in future updates. Additionally, we have improved various visualization features.

### 11 Nov 2025

Sequenzo version v0.1.24 has been released.

This update fixed and improved the fastcluster and CLARA clustering methods and their environment dependencies,
making it easier for users to download and use Sequenzo.

This update also further improved the index plot and state distribution plot,
making them more user-friendly.

### 7 Oct 2025

We have just released a new version of Sequenzo (v0.1.19), which fixes the installation issue that some users experienced with pip install sequenzo in v0.1.18.

This update also corrects the transition matrix calculation and introduces a few new but less frequently used methods, including Sequence History Analysis and the Sequence Analysis Multi-State Model.

### 4 Oct 2025

🎉 Exciting milestone: Sequenzo has just welcomed its first external contributor!

Open collaboration means the project is truly taking shape — huge thanks to [Sebastian Daza](https://sdaza.com/) for debugging key issues and improving README. This marks Sequenzo’s first step toward a broader open-source community.

### 3 Oct 2025

Upgraded Sequenzo to version 0.1.18. Enhanced Sequenzo by (1) adding entropy and other complexity measures, (2) incorporating advanced models such as sequence history analysis and sequence analysis multi-stte model, as well as (3) supporting the hierarchical clustering Ward D method from R. 

### 18 Sep 2025

Updated most of the documentation in both English and Chinese, and upgraded Sequenzo to version 0.1.17.