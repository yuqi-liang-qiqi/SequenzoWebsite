<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 17:50:24
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 21:25:52
 * @FilePath: /SequenzoWebsite/docs/en/basics/how_sequenzo_handle_missing_values.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Handling Missing Values

TODO: 
1. 缺失值有的话，可以看preprocessing
2. 什么情况下保留缺失值，什么情况下不保留
3. 是否有 missing imputation python 包
4. 如果状态为 missing 的话，在 sequence data 的时候是怎么进去的，是否需要手动传进去，还是自动就行，还是二者都行？举例子。以及也要提到，sequenzo 还会检测 missing value，在 sequencedata 产生之后 summary 里面写哪里有缺失值。所以这个就不仅是我那个preprocessing
5. 在 dissimilarity measures 的时候是如何处理缺失值的？
具体再看看欣怡给的云文档，做确认

One important detail is how **missing values** are treated in Sequenzo when computing the distance matrix.

* When you create a `SequenceData` object, all states are internally converted into **numeric codes**, starting from `1`.

  * For example, if your states are `["EDU", "EMP", "UNEMP"]`, they will be encoded as `1`, `2`, `3`.

* If a sequence contains a **missing value**, it is automatically encoded as `len(states) + 1`.

  * In the example above, there are 3 defined states, so the missing value will be encoded as `4`.

* This means that **missing values are treated as an additional valid state**, not as `NaN`. They are included in the sequence alphabet, just like any other state.

* As a result, when a **substitution cost matrix** is built, it will include costs for replacing the missing state with every other state.

  * In our example, the cost matrix will have rows and columns for `EDU`, `EMP`, `UNEMP`, and also for `MISSING`.

#### Example

Suppose we have the following sequences:

```
Person A: EDU → EMP → UNEMP  
Person B: EDU → MISSING → UNEMP
```

* After encoding:

  * A = \[1, 2, 3]
  * B = \[1, 4, 3] (`4` = missing value)

* The substitution-cost matrix will look like this (simplified):

|          | EDU (1) | EMP (2) | UNEMP (3) | MISSING (4) |
| -------- | ------- | ------- | --------- | ----------- |
| EDU (1)  | 0       | c12     | c13       | c1M         |
| EMP (2)  | c21     | 0       | c23       | c2M         |
| UNEMP(3) | c31     | c32     | 0         | c3M         |
| MISSING  | cM1     | cM2     | cM3       | 0           |

Here the `cXY` are substitution costs between state X and Y.
For example, `c2M` is the cost of substituting “EMP” with “MISSING”.

---

#### Why is this important?

* **Without this rule:** missing values would be dropped or ignored, which could distort the trajectory.
* **With this rule:** missing values are consistently integrated as one more state. This makes the distances well-defined and ensures the algorithms (like OM or HAM) run smoothly without special cases.