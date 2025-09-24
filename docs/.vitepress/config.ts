import { defineConfig } from 'vitepress'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  base: '/vitepress-site/',
  title: 'VitePress 站点',
  description: '一个完整的VitePress文档站点示例',
  
  // 主题配置
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/' },
      { text: 'API', link: '/api/' },
      {
        text: '更多',
        items: [
          { text: '关于', link: '/about/' },
          { text: '联系', link: '/contact/' }
        ]
      }
    ],

    // 侧边栏
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '基本配置', link: '/guide/configuration' },
            { text: '部署指南', link: '/guide/deployment' }
          ]
        },
        {
          text: '进阶使用',
          items: [
            { text: '主题定制', link: '/guide/theming' },
            { text: '插件开发', link: '/guide/plugins' },
            { text: '最佳实践', link: '/guide/best-practices' }
          ]
        }
      ],
      '/components/': [
        {
          text: '组件文档',
          items: [
            { text: '组件总览', link: '/components/' },
            { text: '按钮组件', link: '/components/button' },
            { text: '表单组件', link: '/components/form' },
            { text: '布局组件', link: '/components/layout' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'API 参考',
          items: [
            { text: 'API 总览', link: '/api/' },
            { text: '配置选项', link: '/api/config' },
            { text: '命令行', link: '/api/cli' },
            { text: '钩子函数', link: '/api/hooks' }
          ]
        }
      ]
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/jiangbkvir/vitepress-site' }
    ],

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/jiangbkvir/vitepress-site/edit/master/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 最后更新时间
    lastUpdated: true,
    lastUpdatedText: '最后更新',

    // 文档页脚
    docFooter: {
      prev: '上一页',
      next: '下一页'
    }
  },

  // 站点配置
  head: [
    ['link', { rel: 'icon', href: '/vitepress-site/favicon.ico' }]
  ],

  // 国际化
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN'
    }
  }
})