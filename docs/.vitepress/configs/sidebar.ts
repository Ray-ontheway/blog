import type { DefaultTheme } from "vitepress";

export const notesSidebar: DefaultTheme.Sidebar = [
  {
    text: "笔记",
    link: "/notes/",
    items: [],
  },
  {
    text: "CI/CD",
    collapsed: false,
    items: [
      { text: "GitHub Actions Pages 部署", link: "/notes/github-actions" },
      {
        text: "Vue3 基于 GitHub Actions 的持续集成模板",
        link: "/notes/template/github_action_ci_template_vue",
      },
    ],
  },
];

const bugsSidebar: DefaultTheme.Sidebar = [
  {
    text: "都是坑",
    link: "/bugs/",
    items: [
      {
        text: "Android",
        collapsed: false,
        link: "/bugs/android/",
        items: [
          { text: "Android SAF 踩的坑", link: "/bugs/android/AndroidSAF" },
        ],
      },
      {
        text: "CI/CD",
        collapsed: false,
        items: [{ text: "GitHub Actions", link: "/bugs/cd-cd/github-action" }],
      },
    ],
  },
];

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/notes/": notesSidebar,
  "/bugs/": bugsSidebar,
};
