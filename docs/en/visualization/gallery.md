# Visualization Gallery

<div class="gallery-intro">

Browse the main Sequenzo plots and the question each plot helps answer. Click any image to view it in full size.

</div>

<style>
.gallery-intro {
  padding: 1.5rem 0 1rem;
  margin-bottom: 1.5rem;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.7;
}

.visualization-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
  margin: 2rem 0;
}

.visualization-card {
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
  border: 1px solid var(--vp-c-divider);
  pointer-events: auto;
}

.visualization-card:hover {
  transform: translateY(-2px);
  border-color: var(--vp-c-brand-1);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.08);
}

.visualization-card-image {
  width: 100%;
  height: 220px;
  object-fit: cover;
  display: block;
  background: var(--vp-c-bg);
  cursor: zoom-in !important;
  transition: transform 0.2s ease;
  pointer-events: auto !important;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.visualization-card:hover .visualization-card-image {
  transform: scale(1.02);
}

.visualization-card-content {
  padding: 1rem 1.1rem 1.15rem;
}

.visualization-card-title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  margin: 0 0 0.45rem 0;
  line-height: 1.35;
}

.visualization-card-description {
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
  line-height: 1.55;
  margin: 0;
}

.visualization-card-description a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s ease;
}

.visualization-card-description a:hover {
  border-bottom-color: var(--vp-c-brand-1);
}

.section-header {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin: 2.5rem 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--vp-c-divider);
}


.tips-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1.5rem;
  background: var(--vp-c-bg-soft);
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
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
  border-bottom: 1px solid var(--vp-c-divider);
  transition: background-color 0.2s ease;
}

.tips-table tbody tr:hover {
  background-color: var(--vp-c-bg);
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
  color: var(--vp-c-text-2);
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
    border: 1px solid var(--vp-c-divider);
    border-radius: 8px;
    padding: 0.75rem;
    background: var(--vp-c-bg-soft);
  }
  
  .tips-table td {
    padding: 0.75rem 0;
    border: none;
  }
  
  .tips-table td:first-child {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--vp-c-divider);
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

In the sidebar these plots are grouped into longitudinal views (one element per trajectory) and cross-sectional views (summaries per time point); [How to Read Sequence Plots](/en/tutorials/reading-sequence-plots) explains how to choose between them.

<div class="visualization-grid">

<div class="visualization-card">
  <img src="./img/index_plot.png" alt="Index Plot showing all sequences over time" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Index Plot</h3>
    <p class="visualization-card-description">
      Shows one sequence per row across time. Best for inspecting individual trajectories, state changes, and group differences. <a href="./index-plot">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/state_distribution.png" alt="State Distribution Plot - Distribution of states across sequences" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">State Distribution Plot</h3>
    <p class="visualization-card-description">
      Shows how state shares change over time. Use it to compare overall composition or group-level trends. <a href="./state-distribution-plot">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/mean_time.png" alt="Mean Time Plot - Average time spent in each state" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Mean Time Plot</h3>
    <p class="visualization-card-description">
      Summarizes average time spent in each state. Optional error bars help show uncertainty. <a href="./plot-mean-time">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/modal_state.png" alt="Modal State Plot - Most frequent state at each time point" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Modal State Plot</h3>
    <p class="visualization-card-description">
      Shows the most common state at each time point and how dominant it is. Useful for reading the main trajectory pattern. <a href="./plot-modal-state">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/most_frequent_sequences.png" alt="Most Frequent Sequences - Common sequence patterns" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Most Frequent Sequences</h3>
    <p class="visualization-card-description">
      Displays the most common full trajectories. Use it to see which exact paths appear most often. <a href="./plot-most-frequent-sequences">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/relative_frequency_plot.png" alt="Relative Frequency Plot - Proportion of sequences in each state" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Relative Frequency Plot</h3>
    <p class="visualization-card-description">
      Groups sequences by typicality and shows central patterns plus distance spread. Requires a distance matrix. <a href="./plot-relative-frequency">Learn more →</a>
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/transition_matrix.png" alt="Transition Matrix - Probabilities of moving between states" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Transition Matrix</h3>
    <p class="visualization-card-description">
      Shows state-to-state transition probabilities. Darker cells mark more common moves, including staying in the same state. <a href="./plot-transition-matrix">Learn more →</a>
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
      Example of an index plot using a custom state palette.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/customize_colors_legend.png" alt="Customized Legend - Example of custom legend styling" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Customized Legend</h3>
    <p class="visualization-card-description">
      Example of a customized legend for publication-ready plots.
    </p>
  </div>
</div>

</div>

### Tips for Using These Visualizations

<table class="tips-table">
<thead>
<tr>
<th style="width: 20%;">Visualization</th>
<th style="width: 80%;">Best use</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Index Plot</strong></td>
<td>Inspect individual trajectories, switches, and within-group variation. Sort rows when you need structure to emerge.</td>
</tr>
<tr>
<td><strong>Mean Time Plot</strong></td>
<td>Answer "how long in each state?" at a glance. Add error bars when uncertainty matters.</td>
</tr>
<tr>
<td><strong>Modal State Plot</strong></td>
<td>Find the dominant state at each time point. Group it to compare modal patterns across categories.</td>
</tr>
<tr>
<td><strong>Most Frequent Sequences</strong></td>
<td>Identify exact trajectories that appear most often. Helpful before choosing a clustering strategy.</td>
</tr>
<tr>
<td><strong>Relative Frequency Plot</strong></td>
<td>Compare central patterns and distance spread across typicality groups. Requires a distance matrix.</td>
</tr>
<tr>
<td><strong>State Distribution Plot</strong></td>
<td>Read state composition over time. Use grouped versions to compare population-level trends.</td>
</tr>
<tr>
<td><strong>Transition Matrix</strong></td>
<td>Read transition dynamics. The diagonal shows persistence; off-diagonal cells show movement between states.</td>
</tr>
</tbody>
</table>

See each plot page for parameters and examples.
