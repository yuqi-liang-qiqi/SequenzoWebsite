<!--
 * @Author: Yuqi Liang dawson1900@live.com
 * @Date: 2025-09-12 10:17:49
 * @LastEditors: Yuqi Liang dawson1900@live.com
 * @LastEditTime: 2025-09-12 12:50:45
 * @FilePath: /SequenzoWebsite/docs/en/basics/if_you_cannot_render_ipynb_on_github.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
# How to View Jupyter Notebook Tutorials Online

TODO：Change it to CoLab

Many of our tutorials are available in this repository:
[https://github.com/Liang-Team/Sequenzo/tree/main/Tutorials](https://github.com/Liang-Team/Sequenzo/tree/main/Tutorials)

However, sometimes when you click on a notebook (`.ipynb`) file on GitHub, you may encounter a message like:

```
Unable to render code block
```

In such cases, you might see a screen like this:

![render_failure_example](./img/render_failure_github.png)

This happens because GitHub’s built-in notebook preview has limitations and may fail to display files with large data, complex outputs, or non-standard formatting.

To view the notebook properly, you have two options:

1. **Download and open locally:**
   You can download the `.ipynb` file from GitHub and open it using Jupyter Notebook, JupyterLab, or VS Code.

2. **Use nbviewer (recommended):**
   Go to [https://nbviewer.org](https://nbviewer.org) and paste the notebook’s GitHub URL, for example:

   ```
   https://github.com/Liang-Team/Sequenzo/blob/main/original_datasets_and_cleaning/country_co2_gdp_gapminder_data.ipynb
   ```

   Nbviewer will render the notebook as a static webpage, so you can read it directly in your browser without installing anything.
