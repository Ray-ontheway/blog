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
        link: "/notes/template/github-action-ci-template-vue",
      },
    ],
  },
  {
    text: "tauri 相关",
    collapsed: false,
    items: [
      { text: "Tauri + Vue 初始化", link: "/notes/tauri/vue-tauri-initialize" },
      {
        text: "Tauri + Vue 集成 Cpp 的依赖库",
        link: "/notes/tauri/vue-tauri-c++-migration",
      },
    ],
  },
  {
    text: "前端一般配置",
    collapsed: false,
    items: [{ text: "前端配置示例", link: "/notes/template/frontend-config" }],
  },
  {
    text: "Spring Boot 相关",
    collapsed: false,
    items: [
      { text: "自定义校验器", link: "/notes/spring-boot/custom-validation" },
      {
        text: "Spring Boot 全局异常处理",
        link: "/notes/spring-boot/MethodArgumentNotValidExceptionHandler",
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
