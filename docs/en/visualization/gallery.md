# Visualization Gallery

<div class="gallery-intro">

Welcome to the Sequenzo visualization gallery. This page showcases the various types of plots and visualizations available in Sequenzo, providing a comprehensive overview of the visualization capabilities.

The gallery below displays examples of different visualization types, each designed to reveal different aspects of sequence data. **Click on any image to view it in full size** and explore the details.

</div>

<style>
.gallery-intro {
  padding: 2rem 0;
  margin-bottom: 3rem;
  font-size: 1.1rem;
  line-height: 1.8;
}

.visualization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.visualization-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  pointer-events: auto;
}

.visualization-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.visualization-card-image {
  width: 100%;
  height: 280px;
  object-fit: cover;
  display: block;
  background: #f9fafb;
  cursor: zoom-in !important;
  transition: transform 0.3s ease;
  pointer-events: auto !important;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.visualization-card:hover .visualization-card-image {
  transform: scale(1.05);
}

.visualization-card-content {
  padding: 1.5rem;
}

.visualization-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.visualization-card-description {
  color: #6b7280;
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.visualization-card-description a {
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.visualization-card-description a:hover {
  border-bottom-color: #3b82f6;
  color: #2563eb;
}

.section-header {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 3rem 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #3b82f6;
}


.tips-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.tips-table thead {
  background: transparent;
}

.tips-table th {
  padding: 1rem 1.25rem;
  text-align: left;
  font-weight: 600;
  font-size: 1rem;
  color: var(--vp-c-text-1);
  background: transparent;
}

.tips-table tbody tr {
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s ease;
}

.tips-table tbody tr:hover {
  background-color: #f9fafb;
}

.tips-table tbody tr:last-child {
  border-bottom: none;
}

.tips-table td {
  padding: 1.25rem;
  vertical-align: top;
  line-height: 1.6;
}

.tips-table td:first-child {
  font-weight: 600;
  color: var(--vp-c-brand-1);
  font-size: 1rem;
}

.tips-table td:last-child {
  color: #4b5563;
  font-size: 0.95rem;
}

@media (max-width: 768px) {
  .tips-table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  
  .tips-table thead,
  .tips-table tbody,
  .tips-table tr,
  .tips-table td,
  .tips-table th {
    display: block;
  }
  
  .tips-table thead {
    display: none;
  }
  
  .tips-table tr {
    margin-bottom: 1rem;
    border: 1px solid #e5e7eb;
    border-radius: 6px;
    padding: 0.75rem;
    background: white;
  }
  
  .tips-table td {
    padding: 0.75rem 0;
    border: none;
  }
  
  .tips-table td:first-child {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e5e7eb;
  }
}

@media (max-width: 768px) {
  .visualization-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .gallery-intro {
    padding: 1.5rem 0;
    font-size: 1rem;
  }
}
</style>

## Core Visualizations

<div class="visualization-grid">

<div class="visualization-card">
  <img src="./img/index_plot.png" alt="Index Plot - Comprehensive view of all sequences over time" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Index Plot</h3>
    <p class="visualization-card-description">
      A "barcode-like" visualization where each row is one sequence and each column is a time point. Reveals when sequences switch states, how stable they are, and how they differ across groups. Supports multiple sorting methods (lexicographic, MDS, distance-based) and flexible grouping options. <a href="./index-plot">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/state_distribution.png" alt="State Distribution Plot - Distribution of states across sequences" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">State Distribution Plot</h3>
    <p class="visualization-card-description">
      Shows how the share of entities in each state changes over time. Each time point displays the percentage of sequences in each state. Supports both stacked area plots and line plots, with flexible grouping for cross-group comparisons. <a href="./state-distribution-plot">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/mean_time.png" alt="Mean Time Plot - Average time spent in each state" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Mean Time Plot</h3>
    <p class="visualization-card-description">
      A horizontal bar chart showing the average amount of time spent in each state across all sequences. Optionally includes standard error bars to assess uncertainty. States are automatically sorted by mean time for easy interpretation. <a href="./plot_mean_time">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/modal_state.png" alt="Modal State Plot - Most frequent state at each time point" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Modal State Plot</h3>
    <p class="visualization-card-description">
      Shows the most common state (modal state) at each time point, along with its relative frequency (percentage). Highlights dominant patterns across sequences and supports grouping to compare modal trends across different categories. <a href="./plot_modal_state">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/most_frequent_sequences.png" alt="Most Frequent Sequences - Common sequence patterns" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Most Frequent Sequences</h3>
    <p class="visualization-card-description">
      Displays the Top-N most common full sequences in your data. Each horizontal bar represents one sequence pattern across time, with height showing that sequence's percentage in the dataset. Colors automatically match your SequenceData state color map. <a href="./plot_most_frequent_sequences">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/relative_frequency_plot.png" alt="Relative Frequency Plot - Proportion of sequences in each state" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Relative Frequency Plot</h3>
    <p class="visualization-card-description">
      A two-panel figure summarizing sequence "typicality" by frequency groups. Left panel shows the medoid (most central) sequence for each group; right panel shows box plots of dissimilarities to the medoid. Reports pseudo R², F-statistic, and p-value for group separation quality. <a href="./plot_relative_frequency">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/transition_matrix.png" alt="Transition Matrix - Probabilities of moving between states" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Transition Matrix</h3>
    <p class="visualization-card-description">
      A heatmap showing state-to-state transition rates. Rows represent the state at time t, columns represent the state at time t+1, and cell values show transition probabilities (0-1). The diagonal shows stay-in-the-same-state probabilities. Row-normalized so each row sums to 1.0. <a href="./plot_transition_matrix">Learn more →</a>
    </p>
  </div>
</div>

</div>

## Customization Examples

<div class="visualization-grid">

<div class="visualization-card">
  <img src="./img/customize_colors_index_plot.png" alt="Customized Index Plot - Example of custom color schemes" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Customized Index Plot</h3>
    <p class="visualization-card-description">
      Sequenzo allows you to customize colors to match your preferences or publication requirements. This example shows an index plot with a custom color palette.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/customize_colors_legend.png" alt="Customized Legend - Example of custom legend styling" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Customized Legend</h3>
    <p class="visualization-card-description">
      Customize legend appearance and colors to create publication-ready visualizations that match your style guide or branding requirements.
    </p>
  </div>
</div>

</div>

### Tips for Using These Visualizations

<table class="tips-table">
<thead>
<tr>
<th style="width: 20%;">Visualization</th>
<th style="width: 80%;">Best Use Cases & Key Features</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Index Plot</strong></td>
<td>Best for exploring individual sequence patterns, identifying when sequences switch states, assessing sequence stability, and comparing sequences across groups. Supports multiple sorting methods (lexicographic, MDS, distance-based) to reveal structure. Use sequence selection for large datasets.</td>
</tr>
<tr>
<td><strong>Mean Time Plot</strong></td>
<td>Provides an intuitive "how long in each state?" summary. Shows the average time spent in each state across all sequences with optional standard error bars for uncertainty assessment. Automatically sorts states by mean time for easy interpretation.</td>
</tr>
<tr>
<td><strong>Modal State Plot</strong></td>
<td>Highlights the dominant state at each time point along with its relative frequency. Ideal for identifying prevalent patterns over time. Supports grouping to compare modal trends across different categories (e.g., by gender, region, country type).</td>
</tr>
<tr>
<td><strong>Most Frequent Sequences</strong></td>
<td>Displays the Top-N most common full sequences, showing each as a stacked horizontal bar with percentage labels. Great for discovering typical trajectories and understanding what sequence patterns are most prevalent in your dataset. Similar to TraMineR's seqfplot.</td>
</tr>
<tr>
<td><strong>Relative Frequency Plot</strong></td>
<td>Summarizes sequence "typicality" by frequency groups using a two-panel layout: medoid sequences (left) and dissimilarity distributions (right). Reports statistical measures (pseudo R², F-statistic, p-value) for group separation quality. Requires a distance matrix.</td>
</tr>
<tr>
<td><strong>State Distribution Plot</strong></td>
<td>Shows how the percentage of sequences in each state changes over time. Supports both stacked area plots (showing composition) and line plots (comparing individual state trends). Excellent for understanding overall state composition and comparing distributions across groups.</td>
</tr>
<tr>
<td><strong>Transition Matrix</strong></td>
<td>A heatmap of state-to-state transition probabilities from time t to t+1. Dark cells indicate common transitions; light cells indicate rare transitions. The diagonal shows stay probabilities. Essential for understanding sequence evolution dynamics and transition patterns.</td>
</tr>
</tbody>
</table>

For detailed information about each visualization type and how to use them, please refer to the individual documentation pages for each plot function.
