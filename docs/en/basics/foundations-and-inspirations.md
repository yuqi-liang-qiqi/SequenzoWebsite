<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-12-11 20:27:23
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-12-25 10:43:47
 * @FilePath: /SequenzoWebsite/docs/en/basics/foundations-and-inspirations.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Foundations and Inspirations

Social sequence analysis has a rich methodological tradition. Sequenzo builds on this foundation and aims to extend it into the Python ecosystem with a focus on performance, scalability, and accessibility.

The core conceptual framework of Sequenzo draws upon the following a set of major R packages:

**1. The methodological foundations established by `TraMineR`**

[The TraMineR package (Gabadinho et al., 2011)](https://traminer.unige.ch/) provided the first unified and comprehensive software framework for social sequence analysis.

Many fundamental ideas widely used today, e.g., state encoding, optimal matching variants, visualization grammar, multichannel representation etc., were systematized through TraMineR.

Sequenzo would not exist without this intellectual lineage, and we gratefully acknowledge the foundational contribution of TraMineR to the entire field.

In addition, the TraMineR ecosystem has been extended through [`TraMineRextras` (Ritschard et al., 2021)](https://cran.r-project.org/web/packages/TraMineRextras/index.html), which provides a collection of advanced methodological tools for sequence analysis, including but not limited to sequence history analysis (Rossignon et al., 2018), sequence analysis multistate models (Studer et al., 2018), and polyadic sequence analysis (Liao, 2021).

These extensions represent important methodological developments that further 
broaden the scope of social sequence analysis and serve as key references for 
ongoing and future methodological work within Sequenzo.

**2. Advances in clustering and typology from `WeightedCluster`**

[WeightedCluster (Studer, 2013)](https://mephisto.unige.ch/weightedcluster/) has been instrumental in bringing robust clustering, cluster quality metrics to sequence analysis. Sequenzo incorporates these methodological insights while focusing on high-performance implementations for large datasets.

**3. Extensions to probabilistic modeling through `seqHMM`**

[seqHMM (Helske & Helske, 2019)](https://www.jstatsoft.org/article/view/v088i03) demonstrated the value of hidden Markov models for sequence data.

While Sequenzo currently focuses on discrete sequence analysis, we view seqHMM as an inspiration for expanding probabilistic models within the Python environment.

**4. Visualization of relative frequency plots from `ggseqplot`**

[ggseqplot (Raab, 2022)](https://maraab23.github.io/ggseqplot/) is an R package that brings
`ggplot2`-based visualization principles to sequence data. In Sequenzo, the design of relative frequency sequence plots (Fasang & Liao, 2013) is inspired by the `ggseqrfplot` function in ggseqplot. 

Beyond these foundations, Sequenzo contributes:

* A new high-performance engine for large-scale sequence data
* An easy-to-use Pythonic API
* Publication-oriented visualizations
* Seamless integration into scientific Python workflows

Sequenzo seeks to expand the social sequence analysis ecosystem by connecting long-standing methodological traditions with the computational practices of the Python data-science community, particularly in machine learning and deep learning.

We gratefully acknowledge the authors of TraMineR, WeightedCluster, seqHMM, and the broader community in social sequence analysis whose work enables everything we do.

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
