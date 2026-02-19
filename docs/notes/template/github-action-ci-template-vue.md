# 基于 Vue3 的 GitHub Action 持续集成模板

```yaml
name: Deploy VitePress site to Pages

on:
  # 在针对 `main` 分支的推送上运行。如果你
  # 使用 `master` 分支作为默认分支，请将其更改为 `master`
  push:
    branches: [main]

  # 允许你从 Actions 选项卡手动运行此工作流程
  workflow_dispatch:

# 设置 GITHUB_TOKEN 的权限
permissions:
  contents: read

# 只允许同时进行一次部署，跳过正在运行和最新队列之间的运行队列
# 但是，不要取消正在进行的运行，因为我们希望允许这些生产部署完成
concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  # 构建工作
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v5
        with:
          fetch-depth: 0 # 如果未启用 lastUpdated，则不需要
      - uses: pnpm/action-setup@v4 # 如果使用 pnpm，请取消此区域注释
        with:
          version: 10
      - name: Setup Node
        uses: actions/setup-node@v6
        with:
          node-version: 24
          cache: pnpm # 或 pnpm / yarn
      - name: Install dependencies
        run: pnpm install # 或 pnpm install / yarn install / bun install
      - name: Build with VitePress
        run: pnpm build # 或 pnpm docs:build / yarn docs:build / bun run docs:build
      - name: Deploy to Remote Server via SSH
        uses: appleboy/scp-action@v1.0.0
        with:
          host: ${{ secrets.REMOTE_HOST }}
          username: ${{ secrets.REMOTE_USER }}
          key: ${{ secrets.REMOTE_KEY }}
          source: "dist"
          target: ${{ secrets.REMOTE_TARGET_PATH }}
          strip_components: 1 # 可以避免 dist 整个文件夹被上传
        #   rm: true # 上传前删除目标目录下的所有文件
```
