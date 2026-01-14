import type { DefaultTheme } from "vitepress";

export const notesSidebar: DefaultTheme.Sidebar = [
  {
    text: "笔记",
    link: "/notes/",
    items: [{ text: "学习笔记", link: "/notes/test" }],
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
        items: [{ text: "测试", link: "/bugs/android/test" }],
      },
    ],
  },
];

export const sidebar: DefaultTheme.Config["sidebar"] = {
  "/notes/": notesSidebar,
  "/bugs/": bugsSidebar,
};
