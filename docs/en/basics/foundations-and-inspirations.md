# Sequence Foundations and Inspirations

Social sequence analysis has a rich methodological tradition. Sequenzo builds on this foundation and brings it into the scientific Python stack with a focus on performance, scale, and accessible workflows.

Where Sequenzo provides accelerated versions of established sequence-analysis workflows, speed is not meant to change the analytical definition of the method. The goal is to preserve the corresponding reference result while making the computation more practical in Python, especially for larger datasets.

The core conceptual framework of Sequenzo draws on several major R packages:

**1. The methodological foundations established by `TraMineR`**

[The TraMineR package (Gabadinho et al., 2011)](https://traminer.unige.ch/) provided the first unified software framework for social sequence analysis.

Many fundamental ideas widely used today, including state encoding, optimal matching variants, visualization grammar, and multichannel representation, were systematized through TraMineR.

Sequenzo would not exist without this intellectual lineage, and we gratefully acknowledge the foundational contribution of TraMineR to the entire field.

In addition, the TraMineR family of tools has been extended through [`TraMineRextras` (Ritschard et al., 2021)](https://cran.r-project.org/web/packages/TraMineRextras/index.html), which provides advanced methodological tools for sequence analysis, including sequence history analysis (Rossignon et al., 2018), sequence analysis multistate models (Studer et al., 2018), and polyadic sequence analysis (Liao, 2021).

These extensions represent important methodological developments that further 
broaden the scope of social sequence analysis and serve as key references for 
ongoing and future methodological work within Sequenzo.

**2. Advances in clustering and typology from `WeightedCluster`**

[WeightedCluster (Studer, 2013)](https://mephisto.unige.ch/weightedcluster/) has been instrumental in bringing medoid-based clustering and cluster quality metrics to sequence analysis. Sequenzo incorporates these methodological insights while focusing on high-performance implementations for large datasets.

**3. Extensions to probabilistic modeling through `seqHMM`**

[seqHMM (Helske & Helske, 2019)](https://www.jstatsoft.org/article/view/v088i03) demonstrated the value of hidden Markov models for sequence data.

Sequenzo now implements this family of models natively in Python. The `seqhmm` module covers HMM, MHMM, NHMM, and MNHMM models, along with model comparison, simulation, bootstrap tools, hidden-path decoding, and plotting utilities. The implementation follows the methodology of seqHMM while using Python conventions and `SequenceData` inputs.

**4. Visualization of relative frequency plots from `ggseqplot`**

[ggseqplot (Raab, 2022)](https://maraab23.github.io/ggseqplot/) is an R package that brings
`ggplot2`-based visualization principles to sequence data. In Sequenzo, the design of relative frequency sequence plots (Fasang & Liao, 2013) is inspired by the `ggseqrfplot` function in ggseqplot. 

Beyond these foundations, Sequenzo contributes:

* A high-performance engine for large-scale sequence data
* A Pythonic API that fits scientific Python workflows
* Publication-oriented visualizations
* Interoperability with pandas, NumPy, matplotlib, and scikit-learn-oriented workflows

Sequenzo broadens social sequence analysis by connecting long-standing methodological traditions with the computational practices of the Python data-science community, particularly machine learning and large-scale data workflows.

We gratefully acknowledge the authors of TraMineR, WeightedCluster, seqHMM, and the broader community in social sequence analysis whose work made this project possible.

## References

Gabadinho, A., Ritschard, G., Muller, N. S. & Studer, M. (2011), 'Analyzing and visualizing
state sequences in r with traminer', Journal of statistical software 40, 1–37.

Ritschard, G., Studer, M., Buergin, R., Liao, T.F., Gabadinho, A., Fonta, P.A., Muller, N.S. and Rousset, P. (2021). Package ‘TraMineRextras’. Comprehensive R Archive Network (CRAN).

Rossignon, F., Studer, M., Gauthier, J. A., & Goff, J. M. L. (2018). Sequence history analysis (SHA): Estimating the effect of past trajectories on an upcoming event. In Sequence analysis and related approaches: Innovative methods and applications (pp. 83-100). Cham: Springer International Publishing.

Studer, M., Struffolino, E., & Fasang, A. E. (2018). Estimating the relationship between time-varying covariates and trajectories: The sequence analysis multistate model procedure. Sociological Methodology, 48(1), 103-135.

Liao, T. F. (2021). Using sequence analysis to quantify how strongly life courses are linked. Sociological Science, 8, 48-72.

Studer, M. (2013). WeightedCluster library manual. A practical guide to creating typologies of trajectories in the social sciences with, 2013(24), 33.

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. Journal of Statistical Software, 88, 1-32.

Raab, M. (2022). ggseqplot: Render Sequence Plots using ‘ggplot2’. https://doi.org/10.32614/CRAN.package.ggseqplot

Fasang, A. E., & Liao, T. F. (2013). Visualizing Sequences in the Social Sciences: Relative Frequency Sequence Plots: Relative Frequency Sequence Plots. Sociological Methods & Research, 43(4), 643-676. https://doi.org/10.1177/0049124113506563 (Original work published 2014)

*Author: Yuqi Liang*
