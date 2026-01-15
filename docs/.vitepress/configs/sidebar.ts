import type { DefaultTheme } from "vitepress";

export const notesSidebar: DefaultTheme.Sidebar = [
  {
    text: "笔记",
    link: "/notes/",
    items: [],
  },
  {
    text: "CI/CD",
    items: [{ text: "GitHub Actions", link: "/notes/github-actions" }],
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
        items: [],
      },
    ],
  },
];

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/notes/": notesSidebar,
  "/bugs/": bugsSidebar,
};
