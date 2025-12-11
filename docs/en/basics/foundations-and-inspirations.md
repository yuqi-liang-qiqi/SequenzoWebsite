<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-12-11 20:27:23
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-12-11 20:42:15
 * @FilePath: /SequenzoWebsite/docs/en/basics/foundations-and-inspirations.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Foundations and Inspirations

Social sequence analysis has a rich methodological tradition. Sequenzo builds on this foundation and aims to extend it into the Python ecosystem with a focus on performance, scalability, and accessibility.

The core conceptual framework of Sequenzo draws upon the following three major R packages:

**1. The methodological foundations established by TraMineR**

[The TraMineR package (Gabadinho et al., 2011)](https://traminer.unige.ch/) provided the first unified and comprehensive software framework for social sequence analysis.

Many fundamental ideas widely used today, e.g., state encoding, optimal matching variants, visualization grammar, multichannel representation etc., were systematized through TraMineR.

Sequenzo would not exist without this intellectual lineage, and we gratefully acknowledge the foundational contribution of TraMineR to the entire field.

**2. Advances in clustering and typology from WeightedCluster**

[WeightedCluster (Studer, 2013)](https://mephisto.unige.ch/weightedcluster/) has been instrumental in bringing robust clustering, cluster quality metrics to sequence analysis. Sequenzo incorporates these methodological insights while focusing on high-performance implementations for large datasets.

**3. Extensions to probabilistic modeling through seqHMM**

[seqHMM (Helske & Helske, 2019)](https://www.jstatsoft.org/article/view/v088i03) demonstrated the value of hidden Markov models for sequence data.

While Sequenzo currently focuses on discrete sequence analysis, we view seqHMM as an inspiration for expanding probabilistic models within the Python environment.

Beyond these foundations, Sequenzo contributes:

* A new high-performance engine for large-scale sequence data
* Memory-efficient data structures for tens of thousands of sequences
* A modern and easy-to-use Pythonic API
* Pretty visualizations
* Seamless integration into scientific Python workflows

Sequenzo seeks to expand the social sequence analysis ecosystem by connecting long-standing methodological traditions with the computational practices of the Python data-science community, particularly in machine learning and deep learning.

We gratefully acknowledge the authors of TraMineR, WeightedCluster, seqHMM, and the broader community in social sequence analysis whose work enables everything we do.

## References

Gabadinho, A., Ritschard, G., Muller, N. S. & Studer, M. (2011), 'Analyzing and visualizing
state sequences in r with traminer', Journal of statistical software 40, 1–37.

Studer, M. (2013). WeightedCluster library manual. A practical guide to creating typologies of trajectories in the social sciences with, 2013(24), 33.

Helske, S., & Helske, J. (2019). Mixture hidden Markov models for sequence data: The seqHMM package in R. Journal of Statistical Software, 88, 1-32.