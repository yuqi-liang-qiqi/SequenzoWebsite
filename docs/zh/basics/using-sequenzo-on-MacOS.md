# 如何在 MacOS 上使用 Sequenzo

<div style="padding:8px; background-color:#fff9d6; border:1px solid #f5e200; border-radius:5px;">
<h3>前置条件：</h3>
  <ul style="list-style-type: none; padding-left: 0; margin: 0;">
    <li><input type="checkbox"> Python3.12 版本（3.9～3.12 均可）</li>
    <li><input type="checkbox"> IDE（VS Code 或 PyCharm）</li>
    <li><input type="checkbox"> 下载 Sequenzo</li>
    <li><input type="checkbox"> 下载 quickstart.ipynb</li>
  </ul>
</div>

---
# 食用指南
| 如果你（是）  | 跳转                                          |
|---|---------------------------------------------|
|  纯小白 | [这里](#如果你是纯小白)                              |
|  已经有 Python，但是没有指定的 Python 版本 | [这里](#如果你已经有-Python，但没有指定版本的-Python)        |
| 已经有了指定 Python，且用 VS Code  | [这里](#如果你已经有了指定-Python，且用-VS-Code)          |
| 之前下载了 Sequenzo  | [这里](#如果你之前下载了-Sequenzo)                    |
| 打算用 PyCharm  | [这里](#如果你打算用-PyCharm)                       |
| 使用的是 conda/pyenv/virtualenv  | [这里](#如果你使用的是-conda/pyenv/virtualenv-Python) |

我们建议先通读一遍教程，然后再开始实操。先通读教程，可以帮助你知道整个流程大概是怎么回事：知道大概的步骤都有哪些、配置的环境是什么样子、可能出现哪些问题以及常见的解决方案。遇到问题时，也能更快在教程的 [Q&As](#Q&As) 里找到答案。

也同样建议学习 [多Python版本管理](#多-Python-管理)，这样你可以知道 Python 究竟安装到了哪里，虚拟环境在哪里，下载的包又去了哪里，以及如何管理多个不同版本的 Python 项目。

---

# 如果你是纯小白

## Step 1：下载 Python 解释器

进入 Python 官网，滚轮滚到页面最下面，选择 MacOS 平台上的 Python 解释器：

![图1](./img/MacOS_tutorial_img/m1.png)

![图2](./img/MacOS_tutorial_img/m2.png)

![图3](./img/MacOS_tutorial_img/m3.png)

MacOS 会自动配置和管理 Python，所以一路默认即可。

![图4](./img/MacOS_tutorial_img/m4.png)

![图5](./img/MacOS_tutorial_img/m5.png)

![图6](./img/MacOS_tutorial_img/m6.png)

![图7](./img/MacOS_tutorial_img/m7.png)

点击“安装”后，需要输入密码或触控 ID。

![图8](./img/MacOS_tutorial_img/m8.png)

安装好后，会弹出来它的文件夹，不用在意。

![图9](./img/MacOS_tutorial_img/m9.png)


安装完成后，关闭安装程序。

![图10](./img/MacOS_tutorial_img/m10.png)

验证 Python 是否安装成功。打开终端，输入`python3.12 --version`，如果输出如下，则成功。

![图11](./img/MacOS_tutorial_img/m11.png)

## Step 2：下载 VS Code
<div style="padding:8px; background-color:#fff9d6; border:1px solid #f5e200; border-radius:5px;">
如果你已经下载了 VS Code，跳过此步。
</div>

官方下载地址为：VS Code 官网。

![图12](./img/MacOS_tutorial_img/m12.png)

![图13](./img/MacOS_tutorial_img/m13.png)

![图14](./img/MacOS_tutorial_img/m14.png)

![图15](./img/MacOS_tutorial_img/m15.png)

然后直接点击`.app`，你就可以使用 VS Code 了🎉<br>
PS：你可以将 VS Code.app 移到 Application 喔～

---

下面是 VS Code 的欢迎界面：

![图16](./img/MacOS_tutorial_img/m16.png)

因为是第一次下载 VS Code，所以 VS Code 也会提供熟悉其界面的新手教程，建议不要跳过。

## Step 3：下载 Extension 拓展
为保证 VS Code 顺利运行 Sequenzo，我们需要在 VS Code 里下载：
- Python
- Jupyter

由于 Python 和 Jupyter 扩展的文件体积较大，下载时间可能会久一点。如果微软 CDN 恰好不稳定，而且 VS Code 也没走代理的话，大概需要 5-10mins 左右。

<div style="padding:8px; background-color:#fff9d6; border:1px solid #f5e200; border-radius:5px;">即使你已经下载或使用过了 VS Code，也请检查是否已经下载了这两个扩展。
</div>

![图17](./img/MacOS_tutorial_img/m10.png)

![图18](./img/MacOS_tutorial_img/m18.png)

这步最容易遇到的错误，是由网络原因导致的下载慢或者下载失败。如果遇到了这种情况，移步 [Q&As](#Q&As)。

## Step 4：配置项目环境

### 1. 创建项目并打开

由于 VS Code 是一款轻量级的 IDE，它本身并不提供直接创建新项目的功能，因此我们需要先在本地手动创建项目文件夹。

![图19](./img/MacOS_tutorial_img/m19.png)

创建好后，回到 VS Code：

![图20](./img/MacOS_tutorial_img/m20.png)

![图21](./img/MacOS_tutorial_img/m21.png)

### 2. 创建虚拟环境

我们这里使用 venv 创建虚拟环境，如果你想用 conda/pyenv/virtualenv，请移步 [这里](#如果你用的是-conda/pyenv/virtualenv)。

打开终端，在项目根目录下，创建虚拟环境：

```powershell
python3.12 -m venv .venv
```

![图22](./img/MacOS_tutorial_img/m22.png)

激活终端的虚拟环境（即项目根目录下的 .venv）：

```powershell
source .venv/bin/activate
```

![图23](./img/MacOS_tutorial_img/m23.png)

配置 VS Code 的解释器：按`⌘ + Shift + P`，然后输入并回车：

```bash
Python: Select Interpreter
```

同样选择项目根目录下的 .venv：

![图24](./img/MacOS_tutorial_img/m24.png)

这样就可以确保 VS Code 解释器里的虚拟环境和终端里的虚拟环境是一致的，从而避免依赖混乱。

### 3. 下载 Sequenzo

```powershell
pip install sequenzo
```

![图25](./img/MacOS_tutorial_img/m25.png)

![图26](./img/MacOS_tutorial_img/m26.png)

下载 Sequenzo 时，Sequenzo 也会检查当前环境里是否有它依赖的包，如果没有，则一并下载。

因为 .venv 是我们刚刚创建的崭新的虚拟环境，里面什么都没有，因此才会看到这么多包都被下载了。

## Step 5：运行quickstart.ipynb

![图27](./img/MacOS_tutorial_img/m27.png)

![图28](./img/MacOS_tutorial_img/m28.png)

![图29](./img/MacOS_tutorial_img/m29.png)

如果此次是当前虚拟环境第一次运行 Jupyter，则 VS Code 会提醒你在当前虚拟环境里下载运行 Jupyter Notebook 文件，点击“Install”即可。

![图30](./img/MacOS_tutorial_img/m30.png)

⭕️ 下载完成后，运行文件：（R 接口待解决 ⬇️  ---> 已解决，待发包）

![图31](./img/MacOS_tutorial_img/m31.png)

---

# 如果你之前下载了 Sequenzo

因为我们又优化了一版 Sequenzo 包，包括简便了环境配置，加速了 CLARA 计算等等。

所以请`pip uninstall sequenzo`卸载，然后`pip install sequenzo`重新下载。

---

# 如果你已经有 Python，但没有指定版本的 Python

为了延续你现有的风格，我们考虑了所有可用于管理 Python 的工具（如果想了解这些工具，请移步这里）。按照自己当前的风格选择即可。

1. 如果你现在的 Python 是从官网上下载的：请看 [这里](#Step-1：下载-Python-解释器)

---

2. 如果你现在的 Python 是在 conda 里，则创建一个新的虚拟环境：

```powershell
conda activate    # 激活 conda 环境
conda create -n python310 python=3.10    # 创建指定版本的 python
```

然后配置虚拟环境。如果你是 VS Code，按`⌘ + Shift + P`，然后输入并回车：

```bash
Python: Select Interpreter
```

![图32](./img/MacOS_tutorial_img/m32.png)

---

如果你是 PyCharm，打开“Settings”-->“Python”-->“Interpreter”-->“Add Interpreter”-->“Add Local Interpreter”：

![图33](./img/MacOS_tutorial_img/m33.png)

---

3. 如果你现在的 Python 是在 pyvenv 里：pyvenv 在 Python 3.8+ 已弃用，推荐使用 venv（教程里使用的就是 venv），即 [这里](#Step-1：下载-Python-解释器) 。

在 VS Code 或 PyCharm 里配置虚拟环境，与本节 第2点 里的操作一致，只是在选择时有所不同。

---

4. 如果你现在的 Python 是在 virtualenv 里：

```powershell
virtualenv -p python3.10 venv
```

在 VS Code 或 PyCharm 里配置虚拟环境，与本节 第2点 里的操作一致，只是在选择时有所不同。

---

# 如果你已经有了指定 Python，且用 VS Code

1. 如果你打算在已经打开的项目里使用 Sequenzo：

![图34](./img/MacOS_tutorial_img/m34.png)

---

2. 如果你打算新建项目，然后使用 Sequenzo，请移步 [这里](#Step-4：配置项目环境)。

---

# 如果你打算用 PyCharm

我们不推荐小白使用 PyCharm，因为 PyCharm 很重，不容易上手。而且如果不是专业版（付费），是社区版（免费），功能也会被阉割的很严重。加之申请学生资质有点小麻烦，而且还要等审核。

如果你是小白，而且仍然选择用 PyCharm，请确保：你已经有了相应版本的 Python。如果没有，请看 [这里](#Step-1：下载-Python-解释器)。

---

1. 如果你打算在已经打开的项目里使用 Sequenzo：

![图35](./img/MacOS_tutorial_img/m35.png)

---

2. 如果你打算新建项目，然后使用 Sequenzo：

![图36](./img/MacOS_tutorial_img/m36.png)

![图37](./img/MacOS_tutorial_img/m37.png)

![图38](./img/MacOS_tutorial_img/m38.png)

![图39](./img/MacOS_tutorial_img/m39.png)

![图40](./img/MacOS_tutorial_img/m40.png)

![图41](./img/MacOS_tutorial_img/m41.png)

⭕️ 这里也要更新

![图42](./img/MacOS_tutorial_img/m42.png)

---

# 如果你用的是 conda/pyenv/virtualenv Python

我们以 conda 举例，因为其他均是一样的操作。

1. 如果你在 VS Code 里：

![图43](./img/MacOS_tutorial_img/m43.png)

然后接下来的流程继续看 [Step-4：配置项目环境](#Step-4：配置项目环境)。

---

2. 如果你在 PyCharm 里：

如果你是在已有项目里：

![图44](./img/MacOS_tutorial_img/m44.png)

![图45](./img/MacOS_tutorial_img/m45.png)

---

如果你是新建项目：

![图46](./img/MacOS_tutorial_img/m46.png)

---

# Q&As

## 1. pip install 失败或太慢

因为pip install需要联网，所以大概率是网络被卡掉了。因此用镜像下载即可：

```powershell
pip install sequnezo -i https://mirrors.aliyun.com/pypi/simple/
```

## 2. Jupyter Extension下载失败

如果出现了 Jupyter 下载失败的情况：

![图47](./img/MacOS_tutorial_img/m47.png)

【原因分析】如果点击“log”后显示的内容如下：

```powershell
2025-11-13 09:25:49.791 [info] [Window] Auto updating outdated extensions. ms-python.debugpy
2025-11-13 09:28:05.330 [info] [Window] Auto updating outdated extensions. ms-python.debugpy
2025-11-13 09:32:21.772 [error] [Window] Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.c6c4f6cb-189b-42c5-9f50-ee0149297eb7' (Error: net::ERR_CONNECTION_CLOSED): DownloadFailedWriting: Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.c6c4f6cb-189b-42c5-9f50-ee0149297eb7' (Error: net::ERR_CONNECTION_CLOSED)
at Eh.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:65:97879)
at async _h.z (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52439)
at async file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51486
at async _h.C (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52917)
at async _h.w (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51454)
at async _h.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:50821)
at async qh.Cb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:65275)
at async qh.Bb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:64518)
2025-11-13 09:35:04.945 [error] [Network] #81: https://ms-toolsai.gallerycdn.vsassets.io/extensions/ms-toolsai/jupyter-renderers/1.3.0/1752018976557/Microsoft.VisualStudio.Services.Content.Details - error GET Failed to fetch
2025-11-13 09:38:46.436 [error] [Window] Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.812fb1c3-bb8f-40d7-b7c1-fafa0f255e30' (Error: net::ERR_CONNECTION_CLOSED): DownloadFailedWriting: Unable to write file '/Users/xinyi/Library/Application Support/Code/CachedExtensionVSIXs/.812fb1c3-bb8f-40d7-b7c1-fafa0f255e30' (Error: net::ERR_CONNECTION_CLOSED)
at Eh.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:65:97879)
at async _h.z (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52439)
at async file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51486
at async _h.C (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:52917)
at async _h.w (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:51454)
at async _h.download (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:50821)
at async qh.Cb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:65275)
at async qh.Bb (file:///Applications/Visual%20Studio%20Code.app/Contents/Resources/app/out/vs/code/electron-utility/sharedProcess/sharedProcessMain.js:74:64518)
```

可以发现，Jupyter 报了net::ERR_CONNECTION_CLOSED的错误，说明在网络层面被卡住了，大概率是因为微软扩展 CDN 被墙了，国内访问微软 CDN 确实不太稳定。

---

**【方案 1】直接多试几次**

因为这只是网络的原因，因此说不定第四次、第五次就成功了，简单粗暴。

---

**【方案 2】可以根据 VS Code 的建议，手动下载 Jupyter Extension 的文件包**

手动下载（1）既可以直接点击 VS Code 给出的链接，这会自动跳转到浏览器下载；

![图48](./img/MacOS_tutorial_img/m48.png)

下载完成后，你可以直接点击 VS Code 提供的配置链接，然后选择你刚刚下载的文件；

![图49](./img/MacOS_tutorial_img/m49.png)

（2）也可以直接到 VS Code Marketplace 官网下载。

![图50](./img/MacOS_tutorial_img/m50.png)

然后选择在 VS Code 里打开即可。

![图51](./img/MacOS_tutorial_img/m51.png)

---

如果你忘记及时跳转了，没关系。<br>
你可以打开 Finder，找到刚刚下载的文件包，选择用其他方式打开。

![图52](./img/MacOS_tutorial_img/m52.png)

然后选择用 VS Code 打开即可。

![图53](./img/MacOS_tutorial_img/m53.png)

---

**【方案 3】为 VS Code 设置系统代理（如果你是小白，不推荐用这个方案）**

如果你本地有代理（如 Clash / Surge / V2Ray / Shadowsocks 等），在 VS Code 设置中手动配置：
打开命令面板 → “Preferences: Open Settings (JSON)”，添加：
```JavaScripts
"http.proxy": "http://127.0.0.1:7890",    // 将端口号 7890 替换为你自己的代理监听端口
"https.proxy": "http://127.0.0.1:7890",
"http.systemCertificates": false
```
然后重启 VS Code，再下载 Jupyter。

⚠️ 注意：
- 部分代理由于保密技术或协议不同，不会向用户提供代理端口号。
- 你的代理实际上可能只能代理浏览器流量，无法单独设置让特定软件或服务走代理。

---

# 延伸学习

## 1. 多 Python 版本管理

MacOS 不需要配置，原生就支持在系统里同时安装多个 Python 版本。

系统会自动帮你创建指令python3.9、python3.10、python3.11、pip3.10 等等，不需要再手动区分。

MacOS 多 Python 之间不会覆盖，因为存储 Python 的路径都是不同的，如：

| Intel      | Apple Silicon |
| ----------- | ----------- |
| `/usr/local/bin/python3.9`<br>`/usr/local/bin/python3.10`<br>`/Library/Frameworks/Python.framework/...`      | `/opt/homebrew/bin/python3.9`<br>`/opt/homebrew/bin/python3.10`       |

## 2. 电脑终端、VS Code 里的终端、Jupyter Notebook 里的 Kernel

电脑终端 = 原生系统命令行<br>
VS Code 终端 = 路径更好的系统终端<br>
Jupyter Kernel = 一个持续运行的 Python 环境，不是终端

---

**1. 电脑终端（System Terminal）**

比如 Windows Terminal / PowerShell / CMD / macOS Terminal / Linux shell。它直接与操作系统交互的命令行工具，运行的是系统级 Shell（bash、zsh、PowerShell …）。

它能访问整个系统的文件、程序、环境变量，能启动任意程序（Python、git、conda、docker…）。

当你运行 python 时，会调用系统认定的 Python 解释器（或者你激活的虚拟环境）。

---

**2. VS Code 内置终端（VS Code Integrated Terminal）**

VS Code 只是把 电脑终端嵌进 IDE 里了，本质上仍然是系统终端，使用系统的 Shell。

打开 VS Code 终端，就像在打开一个系统终端窗口，只是“嵌在编辑器里”。路径通常自动设为当前项目目录。

使用的 Python、conda 环境仍然取决于你在 VS Code 中选择的 interpreter（或你手动激活的虚拟环境）。

在项目目录下执行命令更方便（`pip install`、`python script.py`、`git`操作），但没有改变运行环境的本质。

---

**3. Jupyter Notebook 的 Kernel（内核）**

是运行 Python（或其他语言）解释器的独立进程，不是一个“终端”。每个 Notebook 的执行都依赖于一个特定的 kernel（例如 Python3 kernel）。

一个 kernel 对应一个虚拟环境。可以有多个 kernel（不同 pyenv、conda、virtualenv）。

执行代码是在同一个持久进程里：
- 变量会保留
- 内存会保留
- 顺序错乱会导致状态不同（不像脚本每次都要从头来）

---

暂时无法在飞书文档外展示此内容

## 3. CMD vs PowerShell
推荐：[windows为什么有两个命令行工具？命令提示符与PowerShell有什么区别？](https://www.bilibili.com/video/BV1Nx4y147n3/?share_source=copy_web&vd_source=f5a787d66053e1da88bd20e1453aff9f)。

## 4. VS Code 的详细使用教程
详见：[VS Code 使用官方教程](https://code.visualstudio.com/docs/introvideos/basics)