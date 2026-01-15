# Github Action 第一次记录

> 最近开始学习使用 Github Actions，记录一下第一次使用的经验。
> 学习 github actions 是因为我的个人网站感觉没有必要使用 jenkins 来实现 CI/CD(很没必要，还占空间)。

Github Actions 的基本操作步骤如下：

1. github 仓库配置：
   - 在 Github 仓库中，点击 "Settings" 选项卡。
   - 在左侧导航栏中，选择 "Actions"。
   - 确保 "Actions" 选项卡下的 "General" 部分，"Workflow permissions" 选项设置为 "Read and write permissions"。
2. 在该目录下创建一个 YAML 文件，文件名可以自定义，例如 `ci.yml`。
3. 在 YAML 文件中定义 workflow 的触发条件和 job 的执行步骤。
4. 提交并推送该文件到 Github 仓库。
5. 当触发条件满足时，Github Actions 会自动创建一个新的运行实例，执行定义的 job 步骤。
