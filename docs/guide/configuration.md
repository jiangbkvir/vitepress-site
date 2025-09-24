# 基本配置

本章节介绍 VitePress 的基本配置选项，帮助你自定义站点的外观和行为。

## 配置文件

VitePress 使用 `docs/.vitepress/config.ts` 作为配置文件：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  // 站点配置
  title: '我的文档',
  description: '文档站点的描述',
  
  // 主题配置
  themeConfig: {
    // 主题相关配置
  }
})
```

## 站点配置

### title
- **类型**: `string`
- **描述**: 站点的标题，会显示在导航栏和浏览器标签页

```typescript
export default defineConfig({
  title: 'VitePress 文档'
})
```

### description
- **类型**: `string`
- **描述**: 站点的描述，用于 SEO 和社交媒体分享

```typescript
export default defineConfig({
  description: '使用 VitePress 构建的现代化文档站点'
})
```

### base
- **类型**: `string`
- **描述**: 站点的根路径，用于部署到子路径

```typescript
export default defineConfig({
  base: '/my-docs/'
})
```

### head
- **类型**: `HeadConfig[]`
- **描述**: 要添加到页面 `<head>` 的标签

```typescript
export default defineConfig({
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'vitepress, docs' }]
  ]
})
```

### lang
- **类型**: `string`
- **描述**: 站点的语言，默认为 'en-US'

```typescript
export default defineConfig({
  lang: 'zh-CN'
})
```

## 主题配置

### logo
- **类型**: `string | { src: string; alt?: string }`
- **描述**: 导航栏的 logo

```typescript
export default defineConfig({
  themeConfig: {
    logo: '/logo.png'
  }
})
```

### nav
- **类型**: `NavItem[]`
- **描述**: 导航栏链接

```typescript
export default defineConfig({
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      {
        text: '更多',
        items: [
          { text: '关于', link: '/about/' },
          { text: '联系', link: '/contact/' }
        ]
      }
    ]
  }
})
```

### sidebar
- **类型**: `SidebarConfig`
- **描述**: 侧边栏配置

```typescript
export default defineConfig({
  themeConfig: {
    sidebar: {
      '/guide/': [
        {
          text: '入门指南',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' }
          ]
        }
      ]
    }
  }
})
```

### socialLinks
- **类型**: `SocialLink[]`
- **描述**: 社交链接，显示在页面右上角

```typescript
export default defineConfig({
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
```

### editLink
- **类型**: `EditLinkConfig`
- **描述**: 编辑链接配置

```typescript
export default defineConfig({
  themeConfig: {
    editLink: {
      pattern: 'https://github.com/user/repo/edit/main/docs/:path',
      text: '编辑此页面'
    }
  }
})
```

### footer
- **类型**: `FooterConfig`
- **描述**: 页脚配置

```typescript
export default defineConfig({
  themeConfig: {
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: '版权所有 © 2024-present'
    }
  }
})
```

### lastUpdated
- **类型**: `boolean | { text?: string; formatOptions?: Intl.DateTimeFormatOptions }`
- **描述**: 显示最后更新时间

```typescript
export default defineConfig({
  themeConfig: {
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  }
})
```

## 多语言配置

```typescript
export default defineConfig({
  locales: {
    root: {
      label: '简体中文',
      lang: 'zh-CN',
      title: 'VitePress 文档',
      description: 'VitePress 中文文档'
    },
    en: {
      label: 'English',
      lang: 'en-US',
      title: 'VitePress',
      description: 'VitePress Documentation'
    }
  }
})
```

## 构建配置

### vite
- **类型**: `ViteConfig`
- **描述**: 自定义 Vite 配置

```typescript
export default defineConfig({
  vite: {
    server: {
      port: 3000
    },
    build: {
      chunkSizeWarningLimit: 1600
    }
  }
})
```

### markdown
- **类型**: `MarkdownOptions`
- **描述**: Markdown 处理选项

```typescript
export default defineConfig({
  markdown: {
    lineNumbers: true,
    config: (md) => {
      // 添加自定义的 Markdown-it 插件
    }
  }
})
```

## 完整示例

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'VitePress 文档',
  description: '使用 VitePress 构建的现代化文档站点',
  base: '/my-docs/',
  lang: 'zh-CN',
  
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['meta', { name: 'keywords', content: 'vitepress, vue, docs' }]
  ],
  
  themeConfig: {
    logo: '/logo.png',
    
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: 'API', link: '/api/' }
    ],
    
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '简介', link: '/guide/' },
            { text: '快速开始', link: '/guide/getting-started' },
            { text: '配置', link: '/guide/configuration' }
          ]
        }
      ]
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],
    
    editLink: {
      pattern: 'https://github.com/user/repo/edit/main/docs/:path',
      text: '编辑此页面'
    },
    
    footer: {
      message: '基于 MIT 许可证发布',
      copyright: '版权所有 © 2024-present'
    }
  }
})
```

## 下一步

- 学习 [部署指南](./deployment)
- 了解 [主题定制](./theming)
- 查看 [所有配置选项](https://vitepress.dev/reference/site-config)

---

*配置完成！现在你的站点应该具有完整的外观和功能。* 🎨"}