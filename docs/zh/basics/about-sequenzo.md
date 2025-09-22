# 关于 Sequenzo

<p align="center">
  <img src="./img/fulllogo_transparent.png" alt="Sequenzo full logo" class="logo-light" />
  <img src="./img/squenzo_logo_dark_transparent_transition.png" alt="Sequenzo full logo dark" class="logo-dark" />
</p>

<style>
  .logo-light, .logo-dark { width: 60%; max-width: 320px; height: auto; }
  .logo-dark { display: none; }
  html.dark .logo-light { display: none; }
  html.dark .logo-dark { display: inline; }
</style>

`Sequenzo` 是一个数据处理和分析速度很快、大数据分析能力强且简单易懂的 Python 包，专为社会序列分析（Sequence Analysis）而设计。它能够高效处理大数据，适用于社会科学的各个领域，让研究人员和实践者能够更便捷、高效地进行序列分析。

虽然社会序列分析正受到越来越多的关注，但它仍是一个新兴的研究方法。因此，在介绍我们的软件包之前，先让我们了解一下序列分析的基本概念和当前面临的主要挑战。

## 什么是社会序列分析，为什么它很重要？

序列分析（SA）最初起源于生物学，用于比较 DNA 和蛋白质序列，后来被引入社会科学领域，成为分析事件或状态时间序列的有力工具（Abbott, 1983; Liao et al., 2022）。由于主要用于研究生活轨迹和社会现象，因此通常被称为社会序列分析，在社会科学中也常简称为序列分析。

这种方法特别适合理解人们的生命历程，能够捕捉各种生活转变，比如：

*  家庭变化（单身 → 结婚 → 生孩子）
*  职业发展（毕业 → 初入职场 → 转换工作）
*  迁移轨迹（城市 A → 城市 B → 回到城市 A）

与股价、温度等数值型时间序列不同，社会序列分析处理的通常是分类数据，这些数据代表的是不同的生活事件或状态，如单身、已婚、失业等，而不是连续的数字。

此外，每个人经历转变的时机都不相同，这些序列通常以不规则的时间间隔发生。这些类别本身也往往是无序的（比如某人在不同年份分别从事软件工程师和 UI 设计师工作），我们无法说某个状态比另一个状态"更高"或"更低"。
正是由于这些特点，那些依赖等间隔数值数据、假设数值之间存在有意义排序或距离关系的传统统计方法就不再适用了。序列分析需要专门的工具来处理生命历程数据的特殊结构，以便分析这些复杂的非数值序列。

截至 2025 年，序列分析主要用于社会学和人口学领域，研究个体的生活轨迹。但是，它在经济学、管理学、营销学、人力资源、医疗保健、教育和客户行为等更广泛领域的应用潜力还没有得到充分发掘。

## 序列分析能够回答哪些问题？

在个体（微观）层面：

* 职业发展：不同文化背景下，男性和女性的职业路径有什么差异？
* 家庭构成：各代人的婚姻和家庭形成模式发生了怎样的变化？
* 迁移规律：人们移居新国家时通常遵循什么样的迁移路径？
* 健康研究：患者的健康状况或症状如何随时间发生转变？
* 客户分析：客户在成为忠实用户或流失之前通常经历什么样的路径？

除了个体层面，序列分析还能用于分析更大规模的实体。目前这方面的研究相对较少，主要集中在经济地理学领域，研究地区和城市的演变轨迹及其相互作用，从而揭示趋同、分化和集聚等发展模式（Losacker & Kuebart, 2024）。

在中观和宏观层面的分析中，研究对象可以是城市、地区、企业或国家。例如：

* 城市发展：城市在经济地位、人口增长和基础设施建设方面如何演变？
* 区域经济：各地区在就业结构或产业组成方面几十年来遵循什么样的发展轨迹？
* 企业生命周期：公司在整个发展过程中经历哪些典型的增长、停滞或创新阶段？
* 国家转型：各国在历史进程中如何在不同政治制度、经济体系或发展阶段间转换？

Sequenzo 旨在帮助研究人员、决策者和数据分析师高效地回答这些多样化的问题。

## 介绍 Sequenzo：快速、直观、可扩展的Python序列分析包

序列分析在理解各领域复杂轨迹和模式方面潜力巨大，但也面临着重大挑战，尤其是在处理当今数字时代常见的大规模数据集的时候。现有工具，包括R语言的 [TraMineR](https://traminer.unige.ch/index.shtml) 和 [WeightedCluster](https://mephisto.unige.ch/weightedcluster/) 等，在计算速度和效率方面存在不足，随着数据量的增长会变得缓慢且占用大量资源。这种效率问题限制了序列分析在实际研究和商业应用中的使用。

为了解决这些问题，我们开发了 Sequenzo ，一个专门为大数据时代社会序列分析设计的 Python 包。与广泛使用的现有工具（如R语言的 TraMineR ）相比（Gabadinho et al., 2011），Sequenzo 在速度、效率和易用性方面都有显著提升。

<!-- 更多信息请参考[TraMineR 与 Sequenzo 性能对比](/en/traminer-and-sequenzo/performance-diff) 和 [功能对比](/en/traminer-and-sequenzo/functions-comparison)。 -->

### Sequenzo 的核心功能：
* **全面的序列数据处理：** 轻松管理和转换各种纵向数据格式，自动检测缺失值。
* **丰富的可视化工具：** 提供状态分布图、索引图等清晰的可视化图表，直观展示序列数据。
* **详尽的复杂性指标（微观和宏观层面）：** 计算序列长度、状态持续时间、熵、复杂性、波动性等多种序列度量指标。
* **多样的相似性度量：** 提供最优匹配（Optimal matching）、汉明距离（Hamming）、最长公共子序列（Longest Common Subsequence）、卡方距离（Chi-squared）、欧氏距离（Euclidean）等多种距离度量方法，确保序列比较的准确性。
* **强大的聚类分析：**  支持层次聚类、k-中心点聚类和 PAM（围绕中心点分割）等方法，能够有效识别相似轨迹并形成有意义的聚类模式。
* **代表性序列识别：** 自动确定中心点/参考序列。
* **大数据支持：** 基于 CLARA 算法（Studer et al., 2024），能够高效处理大规模数据集。
通过算法优化和并行计算，Sequenzo 的运行速度比R语言传统工具快至少6倍，大幅降低了计算成本，真正实现了序列分析的大规模应用。无论是学术研究、商业分析还是政策制定，Sequenzo 都能在这个数据驱动的时代让序列分析变得更加便捷、高效和富有洞察力。
## 团队介绍
**论文作者**
* [梁彧祺 , 牛津大学](https://www.yuqi-liang.tech/)
* [李欣怡, 东北大学（中国）](https://github.com/Fantasy201)
* [Jan Heinrich Ernst Meyerhoff-Liang（马杨杨），牛津新经济思想研究所](https://www.inet.ox.ac.uk/people/jan-meyerhoff-liang)

**项目贡献者**
* [何梁星云,斯德哥尔摩经济学院 (瑞典)](https://www.linkedin.com/in/liangxingyun-he-6aa128304/)
* [明煜坤,马德里卡洛斯三世大学 (西班牙)](https://www.linkedin.com/in/yukun%EF%BC%88stephan%EF%BC%89-ming-a13878298/)
* [杨子婷,罗切斯特大学 (美国)](https://www.linkedin.com/in/ziting-yang-7b33832bb)
* [曲思竹,东北大学 (美国)](https://www.linkedin.com/in/sizhuq)

* 特别感谢早期测试用户（按姓名字母顺序排序）：[Joji Chia](https://sociology.illinois.edu/directory/profile/jbchia2)， [Kass Gonzalez](https://www.linkedin.com/in/kass-gonzalez-72a778276/)， [Sinyee Lu](https://sociology.illinois.edu/directory/profile/qianyil4)，[Sohee Shin](https://sociology.illinois.edu/directory/profile/sohees2)
* 网站开发及技术支持：[Mactavish](https://github.com/mactavishz)
* PAM 聚类算法开发：邓诚
* 序列数据源整理-历史：陈敬瑞
* 视觉设计顾问：易昌宇

**特别致谢** 

* 序列分析方法指导：[Tim Liao教授, 伊利诺伊大学厄巴纳-香槟分校](https://sociology.illinois.edu/directory/profile/tfliao)
* 彧祺的博士导师：[Ridhi Kashyap教授, 牛津大学](https://www.nuffield.ox.ac.uk/people/profiles/ridhi-kashyap/)
* 彧祺的编程启蒙老师：[江湖十年](https://github.com/jianghushinian)

*梁彧祺的个人致谢*
> 感谢团队每一位成员为 Sequenzo 付出的心血和努力。正是有了大家的悉心呵护，Sequenzo 才能成长为今天的模样，不仅成为我博士求学历程中的重要见证，也为社会序列分析及计算社会科学领域贡献了微薄之力。特别感谢我的导师 Tim Liao 教授和博士导师 Ridhi Kashyap 教授给予的大力支持。
> 我对家人的感激之情无以言表。自幼时起，你们的爱与理解就是我最坚实的后盾，让我有勇气敢于冒险、突破边界、探索未知。在星空中守望的爷爷奶奶，请继续指引着我，我会带着你们的爱一路前行。

> 让我们继续携手前进，因为我们的故事才刚刚开始。

## 参考文献

Abbott, A. (1983). Sequences of social events: Concepts and methods for the analysis of order in social processes. Historical Methods: A Journal of Quantitative and Interdisciplinary History, 16(4), 129-147.

Liao, T. F., Bolano, D., Brzinsky-Fay, C., Cornwell, B., Fasang, A. E., Helske, S., Piccarreta, R., Raab, M., Ritschard, G., Struffolino, E. et al. (2022), 'Sequence analysis: Its past, present, and future', Social science research 107, 102772.

Losacker, S., & Kuebart, A. (2024). Introducing sequence analysis to economic geography. Progress in Economic Geography, 2(1), 100012.

Gabadinho, A., Ritschard, G., Muller, N. S. & Studer, M. (2011), 'Analyzing and visualizing
state sequences in r with traminer', Journal of statistical software 40, 1–37.

Studer, M., Sadeghi, R., & Tochon, L. (2024). Sequence analysis for large databases (Vol. 104, pp. 1–42). LIVES Working Papers.


*网页内容英文撰写：梁彧祺，中文翻译：何梁星云*