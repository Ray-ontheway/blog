# Github Action 第一次记录

> 最近开始学习使用 Github Actions，记录一下第一次使用的经验。
> 学习 github actions 是因为我的个人网站感觉没有必要使用 jenkins 来实现 CI/CD(很没必要，还占空间)。

## Github Actions 的基本操作步骤如下：

1. github 仓库配置：
   - 创建 github 仓库之后，需要在仓库的 `Settings` 选项卡中，针对项目进行配置
     - Pages: 如果是静态网站，需要在 Pages 选项卡中，选择部署的分支(默认是 `gh-pages` 分支，新建项目没有这个分支，建议选择)。
     - Actions: 主要需要配置一些需要在项目中使用的的环境变量，例如 `GITHUB_TOKEN` 等。
2. 项目文件配置:

   - 新增 `.github/workflows` 目录，用于存放 workflow 文件。

     - 在 `workflows` 目录下，新增一个 YAML 文件，用于定义 workflow。
     - 在 YAML 文件中，定义 workflow 的触发条件和 job 的执行步骤。这里以 vitepress 作为示例：

```yaml
# 构建 VitePress 站点并将其部署到 GitHub Pages 的示例工作流程
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限，以允许部署到 GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v4 # 如果使用 pnpm，请取消此区域注释
        # with:
        #   version: 10
      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: pnpm # 或 pnpm / yarn
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Install dependencies
        run: pnpm install # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: pnpm docs:build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: docs/.vitepress/dist

  # 部署工作
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    needs: build
    runs-on: ubuntu-latest
    name: Deploy
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

3. 提交并推送该文件到 Github 仓库。
4. 当触发条件满足时，Github Actions 会自动创建一个新的运行实例，执行定义的 job 步骤。

## 一些说明

- 关于 PAT(Person Access Token): 在 github actions 的使用过程中，大概率是不需要这个的(官方默认提供了一个 GITHUB_TOKEN, 配合 permissions 配置即可)，我看的一些博客的示例中有(可能是因为是前几年写的)关于需要使用到的权限等问题，可以直接在 permissions 中配置。这部分可以知己查看 [Github Actions 官方文档](https://docs.github.com/zh/actions/tutorials/create-an-example-workflow)

- 没事可以查看一下有没有自己用得上的 Action: [Github Actions Maker](https://github.com/marketplace)
