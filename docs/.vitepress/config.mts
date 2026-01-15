import { defineConfig } from "vitepress";
import { nav, sidebar } from "./configs";

const basePath = process.env.BASE_URL || "/blog/";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "学习思考的人机",
  description: "记录思考, 分享知识",
  head: [["link", { rel: "icon", href: "/blog/favicon.ico" }]],

  base: basePath,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },
    nav,
    socialLinks: [{ icon: "github", link: "https://github.com/demonraychen" }],

    sidebar,
    outline: {
      label: "目录",
      level: "deep",
    },

    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "short",
        timeStyle: "medium",
      },
    },

    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present",
    },
  },
});
