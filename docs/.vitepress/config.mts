import { defineConfig } from "vitepress";
import { nav, sidebar } from "./configs";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "学习思考的人机",
  description: "记录思考, 分享知识",

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },

    nav,
    sidebar,
    lastUpdated: {
      text: "最后更新",
      formatOptions: {
        dateStyle: "full",
        timeStyle: "medium",
      },
    },
    docFooter: {
      prev: "上一页",
      next: "下一页",
    },

    socialLinks: [{ icon: "github", link: "https://github.com/demonraychen" }],

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2021-present",
    },
  },
});
