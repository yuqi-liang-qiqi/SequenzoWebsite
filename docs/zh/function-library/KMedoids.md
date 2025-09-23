# `KMedoids()`

用于中心聚类的函数（每个簇的中心点都是真实存在的），支持三种 KMedoids、PAM（Partitioning Around Medoids）、PAMonce（PAM with a only-once）三种算法，三者原理、区别详见文档 [KMedoids v.s. PAM (PAMonce)](https://sequenzo.yuqi-liang.tech/en/tutorials/short-tutorial)<mark>待补充</mark>。`KMedoids` 的所有参数均遵从 [WeightedCluster::KMedoids](https://cran.r-project.org/web/packages/WeightedCluster/WeightedCluster.pdf)。

Sequenzo 也实现了层次聚类，相关学习资料见视频 [层次聚类的树状图如何看？序列分析和回归分析如何结合？](https://www.bilibili.com/video/BV1qyUwYhEc3/?spm_id_from=333.1387.collection.video_card.click&vd_source=11ad9be9a8cb39e0dcc112066c8cae70)。

## 函数使用

```python
clustering = KMedoids(
    diss,
    k,
    method='PAMonce',
    initialclust=None,
    npass=1,
    weights=None)
```

## 入口参数

### diss

即 “dissimilarity matrix”，必传，允许传入的数据类型是`DataFrame`，距离矩阵（由 [get_distance_matrix](https://sequenzo.yuqi-liang.tech/en/function-library/get-distance-matrix) 计算得到）。

### k

必传，允许传入的数据类型是`int`，想要聚类的簇的数量。

### method

可传，允许传入的数据类型是`String`，默认`'PAMonce'`，选择使用的聚类方法。

共支持三种方法：`KMedoids`、`PAM`（Partitioning Around Medoids）、`PAMonce`（PAM with a only-once），三种方法得到的簇中心都是真实存在的数据点。PAM 和 PAMonce 是 KMedoids 的一个变种，它们之间的区别见文档 <mark>[待补充]</mark>。

### initialclust

即 “initial_cluster_assignment”（表示 “初始化的簇结构” 或 “初始簇分配方案”），可传，允许传入的数据类型是`list、numpy.ndarray、linkage matrix`，默认`None`。

* 初始化的簇结构：即，指定簇中心。由于一般簇中心 ≥ 2，传入的是一个`list`或`numpy.ndarray`。既表明划分了几个簇，也表示这些簇的初始中心点都是什么。

* 初始簇分配方案：即，隶属矩阵。表明所有的数据点都分配在了哪些簇，因此传入的是`list/numpy.ndarray`或`linkage matrix`。

每个聚类算法开始前，都需要先通过某种策略确定初始中心点。如果提供了`initialclust`参数，将直接/间接使用其中的数据得到初始中心。

* 为`None`时，程序在 [1, number_of_elements] 之内随机选择`k`个点作为初始中心点。

* 为`list/numpy.ndarray`时，可以是（1）用户选定的用于初始化的簇中心（里面的每个元素都是真实存在的数据`id`），程序会用指定的中心点作为初始中心点，此时`list/numpy.ndarray`里的元素个数必须等于`k`。也可以是（2）每个数据点的隶属矩阵（此时元素个数必须等于序列总数），程序会利用权重从给定的簇中选择初始中心点。如何选择，见 *细节补充*。

* 为`linkage matrix`时，程序先通过层次聚类`cut_tree()`得到隶属矩阵，然后再利用权重从得到的簇中选择初始中心点，同见 *细节补充*。

三个参数的选择场景如下：

| 参数                   | 场景                                                                                                              |
| -------------------- |:--------------------------------------------------------------------------------------------------------------- |
| `None`               | 用户想把初始化全权交给程序去做（程序默认随机选择`k`个数据点作为中心点，没有默认的隶属矩阵）                                                                 |
| `list/numpy.ndarray` | 【场景1：初始化的簇结构，即指定中心点】用户想自己指定中心点作为初始点，而不是由程序随机选择<br/>【场景2：初始化簇分配方案，即有隶属矩阵】用户已经有比较好的隶属矩阵了，想利用这个隶属矩阵让程序找到比较合适的初始中心点 |
| `linkage matrix`     | 用户有表示层次聚类（Hierarchical Clustering）合并过程的连接矩阵，想利用连接矩阵让程序找到比较合适的初始中心点                                              |

我们发现，指定中心点用`list`表示的居多；隶属矩阵用`numpy.ndarray`表示的居多。

### npass

即 “number of passes”，可传，允许传入的数据类型是`int`，默认`1`，数据点分配的过程会重复多少次。

一次数据分配的过程指（以 PAM 为例）：遍历每个簇，试图为其找到更优的中心点（“更优”的评判规则见 *Details*）。一次簇的全遍历，就是一次数据点重分配的过程。

`npass`就是这个过程会重复进行多少次。

### weights

可传，允许传入的数据类型是`list/numpy.ndarray`，默认`None`，每个数据点的权重。

为`None`时，默认所有序列的权重均为 1。

## 返回值

`pandas.Series`，一个隶属矩阵，指示每个 id 属于哪个簇。

## 细节补充

程序利用权重优化初始中心点的过程如下：

1. 按照用户传入的中心点，使用`cut_tree`划分簇，得到初步的聚类结果。

2. 对于同一个簇内的所有数据点，计算其与其他数据点的距离和。
   
   $$
   D(x)=\sum_{i\not=x}^{N}w_{i}*diss(x_{i}, x)
   $$

3. 选择距离和最小的点，作为该簇的中心点。

4. 以此类推，得到所有簇的中心。

---

在算法的具体执行中，“更优”指的是：

1. 遍历所有数据点，尝试让每一个数据点当作新的中心点；

2. 比较新的中心点与当前簇的中心点：如果以 “新” 换 “旧” 的损失代价更小，则替换。计算损失代价的公式如下：
   
   $$
   Loss=\sum_{x\in{all}}^{N}\sum_{i\in{C_{j}}}^{N}w_{x}*(diss(i,x)-diss(i,M_{j}))
   $$

        其中，`x`表示新的中心点。

3. `Loss ＜ 0`，损失为负，说明簇内平均距离与上次相比在变小；`Loss ＞ 0`，损失为正，说明簇内平均距离与上次相比在变大。直到损失代价大于 0，终止循环，停止寻找。

## 样例

下面是给出的使用示例。数据来源 Gapminder，是各个国家（共194个）从1800年到2022年的二氧排放的数据。此数据集已经内置在 Sequenzo 里，详情 [移步](https://sequenzo.yuqi-liang.tech/zh/datasets/co2-emissions)。

我们对其进行聚类，并对输出进行了 t-SNE 可视化，以便更直观地看到聚类效果。

```Python
from sequenzo import *
from sequenzo.dissimilarity_measures import get_distance_matrix
from sequenzo.clustering.KMedoids import KMedoids

df = load_dataset('country_co2_emissions')

time = list(df.columns)[1:]
states = ['Very Low', 'Low', 'Middle', 'High', 'Very High']
sequence_data = SequenceData(df, time=time, id_col="country", states=states)
om = get_distance_matrix(sequence_data, method="OM", sm="TRATE", indel="auto")

centroid_indices = [0, 50, 100, 150, 190]
n_pass = 10

# 例1: 未指定中心点的 KMedoids 算法
clustering = KMedoids(diss=om,
                      k=5,
                      method='KMedoids',
                      npass=n_pass,
                      weights=weights)

# 例2: 指定中心点的 PAM 算法
clustering = KMedoids(diss=om,
                      k=5,
                      method='PAM',
                      initialclust=centroid_indices,
                      npass=n_pass,
                      weights=weights)
# 例3: 默认参数的 PAMonce 算法
clustering = KMedoids(diss=om,
                      k=5,
                      method='PAMonce',
                      npass=n_pass,
                      weights=weights)
```

## 输出
1. 例1:
```python
[>] SequenceData initialized successfully! Here's a summary:
[>] Number of sequences: 193
[>] Number of time points: 223
[>] Min/Max sequence length: 223 / 223
[>] States: ['Very Low', 'Low', 'Middle', 'High', 'Very High']
[>] Labels: ['Very Low', 'Low', 'Middle', 'High', 'Very High']
[>] Processing 193 sequences with 5 unique states.
[>] Transition-based substitution-cost matrix (TRATE) initiated...
  - Computing transition probabilities for: [Very Low, Low, Middle, High, Very High]
[>] Indel cost generated.

[>] Identified 175 unique sequences.
[>] Starting Optimal Matching(OM)...
[>] Computing all pairwise distances...
[>] Computed Successfully.
[>] Starting KMedoids...
[>] Computed successfully.
```
2. 例2:
```python
[>] Starting Partitioning Around Medoids (PAM)...
  - PAM loop over pass number  1
[>] Computed successfully.
```

3. 例3:
```python
[>] Starting Partitioning Around Medoids with a Once-Only Swap Pass (PAMonce)...
[>] Computed successfully.
```

## 作者

代码：李欣怡，邓诚

文档：李欣怡

编辑：梁彧祺

翻译、测试：曲思竹