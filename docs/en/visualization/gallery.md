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

.section-header {
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  margin: 3rem 0 1.5rem 0;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #3b82f6;
}

.tips-section {
  background: #f0f9ff;
  border-left: 4px solid #3b82f6;
  padding: 2rem;
  border-radius: 8px;
  margin: 3rem 0;
}

.tips-section h3 {
  margin-top: 0;
  color: #1e40af;
  font-size: 1.5rem;
}

.tips-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.tip-item {
  background: white;
  padding: 1rem;
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tip-item strong {
  color: #1e40af;
  display: block;
  margin-bottom: 0.5rem;
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
      Provides a comprehensive view of all sequences over time, where each row represents a sequence and each column represents a time point. Perfect for exploring individual sequence patterns and identifying outliers.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/state_distribution.png" alt="State Distribution Plot - Distribution of states across sequences" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">State Distribution Plot</h3>
    <p class="visualization-card-description">
      Visualizes how states are distributed across your sequences, offering a snapshot of the overall state composition and helping identify dominant states.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/mean_time.png" alt="Mean Time Plot - Average time spent in each state" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Mean Time Plot</h3>
    <p class="visualization-card-description">
      Shows the average time spent in each state, helping you understand the typical duration patterns in your sequence data. Useful for analyzing temporal characteristics.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/modal_state.png" alt="Modal State Plot - Most frequent state at each time point" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Modal State Plot</h3>
    <p class="visualization-card-description">
      Displays the most frequent state at each time point, revealing the dominant patterns across your sequences. Ideal for identifying prevalent states over time.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/most_frequent_sequences.png" alt="Most Frequent Sequences - Common sequence patterns" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Most Frequent Sequences</h3>
    <p class="visualization-card-description">
      Highlights the most common sequence patterns in your dataset, making it easy to identify prevalent trajectories and understand typical sequence behaviors.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/relative_frequency_plot.png" alt="Relative Frequency Plot - Proportion of sequences in each state" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Relative Frequency Plot</h3>
    <p class="visualization-card-description">
      Shows the proportion of sequences in each state over time, providing insights into state distribution dynamics and temporal changes in state prevalence.
    </p>
  </div>
</div>

<div class="visualization-card">
  <img src="./img/transition_matrix.png" alt="Transition Matrix - Probabilities of moving between states" class="visualization-card-image" width="800" height="600" loading="eager" />
  <div class="visualization-card-content">
    <h3 class="visualization-card-title">Transition Matrix</h3>
    <p class="visualization-card-description">
      Reveals the probabilities of moving between different states, helping you understand state transition patterns and the dynamics of sequence evolution.
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

<div class="tips-section">

### Tips for Using These Visualizations

<div class="tips-grid">

<div class="tip-item">
  <strong>Index Plot</strong>
  Best for exploring individual sequence patterns and identifying outliers or unusual trajectories.
</div>

<div class="tip-item">
  <strong>Mean Time Plot</strong>
  Useful for understanding average durations in each state and temporal characteristics.
</div>

<div class="tip-item">
  <strong>Modal State Plot</strong>
  Ideal for identifying dominant patterns at each time point across your dataset.
</div>

<div class="tip-item">
  <strong>Most Frequent Sequences</strong>
  Great for discovering common trajectories and understanding typical sequence behaviors.
</div>

<div class="tip-item">
  <strong>Relative Frequency Plot</strong>
  Perfect for analyzing state distribution over time and temporal changes in prevalence.
</div>

<div class="tip-item">
  <strong>State Distribution Plot</strong>
  Excellent for understanding overall state composition and identifying dominant states.
</div>

<div class="tip-item">
  <strong>Transition Matrix</strong>
  Essential for analyzing state transition probabilities and sequence evolution dynamics.
</div>

</div>

</div>

For detailed information about each visualization type and how to use them, please refer to the individual documentation pages for each plot function.
