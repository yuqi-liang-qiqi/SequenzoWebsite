<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-10-02 13:39:00
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-10-03 17:35:23
 * @FilePath: /SequenzoWebsite/docs/en/traminer-and-sequenzo/use_R_in_python_environment.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# Combining Sequenzo (Python) with R-based Analyses inside One Jupyter Notebook

Sometimes, even if you’ve done all the heavy lifting in Python, you might still want to use R for the last part of your analysis. Maybe it’s because your collaborators are R users, or maybe because some specialized models or plots are only available there. Instead of exporting CSVs back and forth between the R and Python working environments, we can make Python and R talk directly inside the same Jupyter Notebook.

Special thanks to [Unchitta Kan](https://unchitta.com/), a PhD candidate in computational social science at George Mason University, who suggested using the Python package `rpy2` for this workflow.

Before jumping into [our coding tutorial on Google Colab](https://colab.research.google.com/github/Liang-Team/Sequenzo/blob/main/Tutorials/use_R_in_python_environment/example_pairfam_family.ipynb), you may find it helpful to first read through the background sections below. We’ll cover the key packages you’ll need, the dataset we use, and why some advanced regression models are easier to run in R than in Python for now.

## What is `rpy2`?

`rpy2` is a bridge between Python and R. You can think of it as a **translator** inside your Jupyter notebook: it allows you to pass a `pandas` DataFrame to R, run R code directly, and bring the results back into Python. This is the package we use in our coding tutorial.

For further details, see the [official rpy2 documentation](https://rpy2.github.io/doc/latest/html/index.html).

### What should you keep in mind?

* You must have both Python and R installed, since `rpy2` connects the two.
* In Jupyter, load the extension once with `%load_ext rpy2.ipython`.
* Use `%%R` at the top of a cell to run R code.
* Use `%%R -i df` to send a Python object (`df`) into R.
* Use `%%R -o results` to bring results back into Python.
* Always remember which side of the bridge your object is currently on.

### What is an R Callback?

Sometimes you may see output like this in your Python console:

```python
R callback write-console: In addition:   
R callback write-console: Warning message:
  
R callback write-console: In eval(slot(family, "initialize")) :  
R callback write-console: 
   
R callback write-console:  response should be ordinal---see ordered()
```

This is how `rpy2` handles communication with R:

* **R callback write-console** is the normal way `rpy2` prints R’s output (from `cat()`, `print()`, `warning()`, etc.) into Python.
* These messages are not errors. They are simply R’s messages being “relayed” through the callback so you can see them in your Python environment.

### Troubleshooting R Package Installation for the Coding Tutorial

If you encounter issues installing R packages, here are a few approaches:

**Option 1: Install via conda (recommended if you use Anaconda/Miniconda)**

```bash
conda install -c conda-forge r-vgam r-nnet r-mass
```

**Option 2: Install directly in R**

```r
install.packages(c("VGAM", "nnet", "MASS"), repos = "https://cran.r-project.org/")
```

Change `"VGAM", "nnet", "MASS"` to other packages that you need if you are working with `rpy2` outside of this coding tutorial.

**Option 3: Use Python alternatives**

If integration with R remains problematic, you can use equivalent Python packages:

* `statsmodels` for multinomial logistic regression
* `scikit-learn` for general classification models
* `patsy` for formula-style model specification

Common Issues and Fixes

1. **Working directory errors:** make sure R has access to the working directory.
2. **Package installation fails:** try using conda instead of R for easier dependency management.
3. **Memory issues:** test with a smaller dataset if you run into memory errors.

## The dataset we use

In the tutorial, we use the built-in [pairfam-family dataset](../datasets/pairfam-family.md). 

Why?
* It is common in social science empirical settings (almost 2,000 individuals, observed monthly).
* It has rich variables about family and partnership transitions.

Thus, it’s a good representative of the kind of social science data people actually analyze. We use it to show how to conduct the most common practice in sequence analysis with Python, and then how we can continue modeling in R with `VGAM`.

## What is `VGAM` and why do we use it in the coding tutorial?

[VGAM](https://cran.r-project.org/package=VGAM) stands for *Vector Generalized Linear and Additive Models* (Yee, 2015). It’s an R package that unifies many categorical regression models, such as multinomial logit, proportional odds, adjacent category models, continuation ratio models, etc.

Why do we use it here for illustration?

* Because some of these advanced categorical models (such as adjacent category models and continuation ratio models) are not available yet in Python.
* After Sequenzo gives you a cluster membership table (who belongs to which trajectory type), you often want to run regressions to see what predicts cluster membership or vice versa. This is the most common practices in social sequence analysis. 

> **Note:**  
> In this tutorial, we demonstrate the model using multinomial regression in R for convenience, but actually you can already use Python to do it with ease (for instance with the `statsmodels` package). 
>
> R offers additional packages and model families that may be useful for more advanced analyses, but here we only showcase the R version for demonstration purposes.  
> 
> For a Python-based walkthrough of multinomial regression, see [Multinomial Logistic Regression in Python and Statsmodels](https://medium.com/@rajeshneupane7/multinomial-logistic-regression-in-python-and-statsmodels-a674c890fe1c).

## Final note

Sequenzo now makes sequence analysis much smoother in Python. With `rpy2`, you don’t have to choose between working environments of Python or R as you can use both inside one notebook.

And if you have other favorite R packages or workflows that you think are useful for sequence scholars, please feel free to let us know. We will be very happy to add more tutorials showing how to integrate them.

## References

Yee, T. W. (2015). Vector generalized linear and additive models: with an implementation in R (Vol. 10, pp. 978-1). New York, NY: springer.

---
*Author: Yuqi Liang*