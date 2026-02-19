# 前端项目常用辅助配置

这里所有的配置，基于Vue3 + Vite + TS 的环境进行配置。

## Eslint 配置

1. eslint 安装

```shell
pnpm add -D eslint
```

2. eslint 初始化

```shell
pnpm dlx @eslint/create-config
```

3. 安装插件

```shell
pnpm add -D @vitest/eslint-plugin eslint-config-prettier eslint-plugin-vue
```

配置文件根据 [官方文档](https://zh-hans.eslint.org/docs/latest/use/getting-started#%E9%85%8D%E7%BD%AE) 进行修改即可, 需要安装上面插件一般也都配有文档

## Prettier 配置

1. 安装prettier

```shell
pnpm add -D prettier
```

2. 添加配置文件(.prettierrc.json)

**_Vue项目一般推荐使用Vue 官方的 cli 创建新项目，这样默认就已经会配置好Eslint 和 Prettier 相关的配置_**

## Lint-Staged 配置

用来配置 husky 来实现对 git 的暂存区文件实现格式验证的工具

1. 安装 lint-staged

```shell
pnpm add -D lint-staged
```

2. 添加 package.json 的配置

```json
{
  "lint-staged": {
    // 这里的每一条对应一个linter 的指令和针对的文件类型，可以根据自己的需求进行修改
    "*.{js,ts}": ["eslint --fix", "prettier --write"],
    "*.{mjs,json}": "prettier --write",
    "*.{vue, html}": ["eslint --fix", "prettier --write"],
    "*.md": "prettier --write"
  },
  "scripts": {
    "lint:lint-staged": "lint-staged"
  }
}
```

## Husky 配置

husky 本身是利用git 原有的钩子函数，是一个git 钩子函数的管理工具，用来辅助实现其他的功能，这里用来做最基础的代码的样式的格式和样式检查，避免出现不符合规范的代码。

1. 安装husky

```shell
pnpm add -D husky
```

2. husky 初始化

```shell
pnpm exec husky init
```

3. Husky 配置
   - **_pre-commit_** 初始化完成后，会创建一个默认的 `pre-commit` 文件，这个文件的基本作用是用来进行 `linter`，如果进阶，可以实现一些test的工作，我目前还没用过。

   ```shell
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    pnpm lint:lint-staged
   ```

   - **_commit-msg_** 需要手动添加，用来进行 `commit` 信息的格式检查

   ```shell
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"

    pnpm exec commitlint --edit $1

   ```

## Commitlint + cz-git

1. 安装需要的依赖

```shell
# 全局安装commitizen
npm install -g commitizen

pnpm add -D cz-git @commitlint/cli @commitlint/config-conventional
```

2. commitlint 配置文件

```typescript
export default {
  // 继承规则
  extends: ["@commitlint/config-conventional"],
  // 自定义规则
  rules: {
    // subject 不能为空
    "subject-empty": [2, "never"],
    // subject 以小写字母开头
    "subject-case": [0],
    // type 类型定义，表示提交的类型必须是以下类型之一
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能
        "fix", // 修复 bug
        "docs", // 文档变更
        "style", // 代码格式（不影响功能，例如空格、分号等）
        "refactor", // 重构（既不是新增功能，也不是修复 bug）
        "perf", // 性能优化
        "test", // 添加或修改测试用例
        "chore", // 构建过程或辅助工具的变动
        "revert", // 回滚到上一个版本
        "ci", // 持续集成相关的变动
      ],
    ],
  },

  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixesSelect: "选择关联issue前缀（可选）:",
      customFooterPrefix: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      generatingByAI: "正在通过 AI 生成你的提交简短描述...",
      generatedSelectByAI: "选择一个 AI 生成的简短描述:",
      confirmCommit: "是否提交或修改commit ?",
    },
    // prettier-ignore
    types: [
      { value: "feat",     name: "特性:     ✨  新增功能", emoji: ":sparkles:" },
      { value: "fix",      name: "修复:     🐛  修复缺陷", emoji: ":bug:" },
      { value: "docs",     name: "文档:     📝  文档变更", emoji: ":memo:" },
      { value: "style",    name: "格式:     💄  代码格式（不影响功能，例如空格、分号等格式修正）", emoji: ":lipstick:" },
      { value: "refactor", name: "重构:     ♻️  代码重构（不包括 bug 修复、功能新增）", emoji: ":recycle:" },
      { value: "perf",     name: "性能:     ⚡️  性能优化", emoji: ":zap:" },
      { value: "test",     name: "测试:     ✅  添加疏漏测试或已有测试改动", emoji: ":white_check_mark:"},
      { value: "ci",       name: "集成:     🎡  修改 CI 配置、脚本",  emoji: ":ferris_wheel:"},
      { value: "revert",   name: "回退:     ⏪️  回滚 commit",emoji: ":rewind:"},
      { value: "chore",    name: "其他:     🔨  对构建过程或辅助工具和库的更改（不影响源文件、测试用例）", emoji: ":hammer:"},
    ],
    useEmoji: true,
    emojiAlign: "center",
    useAI: false,
    aiNumber: 1,
    themeColorCode: "",
    scopes: [],
    allowCustomScopes: true,
    allowEmptyScopes: true,
    customScopesAlign: "bottom",
    customScopesAlias: "custom",
    emptyScopesAlias: "empty",
    upperCaseSubject: false,
    markBreakingChangeMode: false,
    allowBreakingChanges: ["feat", "fix"],
    breaklineNumber: 100,
    breaklineChar: "|",
    skipQuestions: [],
    issuePrefixes: [
      { value: "closed", name: "closed:   ISSUES has been processed" },
    ],
    customIssuePrefixAlign: "top",
    emptyIssuePrefixAlias: "skip",
    customIssuePrefixAlias: "custom",
    allowCustomIssuePrefix: true,
    allowEmptyIssuePrefix: true,
    confirmColorize: true,
    maxHeaderLength: Infinity,
    maxSubjectLength: Infinity,
    minSubjectLength: 0,
    scopeOverrides: undefined,
    defaultBody: "",
    defaultIssues: "",
    defaultScope: "",
    defaultSubject: "",
  },
};
```

3. 在 `scripts` 中添加 新的指令

```json
{
  "scripts": {
    "commit": "git add . && git-cz"
  }
}
```

## 总结

这里只是一些简单的记录，每一个工具的功能其实都有点复杂，可以根据自己的需求进行调整。
