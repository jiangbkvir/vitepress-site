# 快速开始

本指南将帮助你快速搭建和运行 VitePress 站点。

## 环境要求

- [Node.js](https://nodejs.org/) 版本 18 或更高
- 包管理器：[npm](https://npmjs.com/)、[yarn](https://yarnpkg.com/) 或 [pnpm](https://pnpm.io/)

## 创建项目

### 使用 npm 创建

```bash
npm create vitepress@latest
```

按照提示选择项目配置：

1. **项目名称**：输入你的项目名称
2. **框架选择**：选择 Vue 3
3. **主题选择**：选择默认主题
4. **添加 VitePress npm 脚本**：选择是

### 手动创建

1. **初始化项目**

```bash
mkdir my-docs
cd my-docs
npm init -y
```

2. **安装 VitePress**

```bash
npm install -D vitepress
```

3. **创建目录结构**

```bash
mkdir docs
echo '# Hello World' > docs/index.md
```

4. **添加 npm 脚本**

在 `package.json` 中添加：

```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  }
}
```

## 开发服务器

启动开发服务器：

```bash
npm run docs:dev
```

VitePress 将在 http://localhost:5173 启动开发服务器。

## 基本配置

创建 `docs/.vitepress/config.ts`：

```typescript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的文档',
  description: '使用 VitePress 构建的文档站点'
})
```

## 添加页面

1. **创建 Markdown 文件**

```bash
# 在 docs 目录下创建
mkdir guide
echo '# 指南' > guide/index.md
echo '# 快速开始' > guide/getting-started.md
```

2. **配置导航**

更新 `config.ts`：

```typescript
export default defineConfig({
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
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

## 部署到 GitHub Pages

1. **创建 GitHub 仓库**
2. **配置 GitHub Actions**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy
on:
  push:
    branches: [ main ]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
```

3. **推送代码**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

## 常用命令

| 命令 | 描述 |
|------|------|
| `npm run docs:dev` | 启动开发服务器 |
| `npm run docs:build` | 构建生产版本 |
| `npm run docs:serve` | 本地预览构建结果 |

## 下一步

- 学习 [基本配置](./configuration)
- 了解 [部署指南](./deployment)
- 探索 [主题定制](./configuration)

## 相关资源

- [VitePress 官方文档](https://vitepress.dev/)
- [配置参考](https://vitepress.dev/reference/site-config)
- [主题配置](https://vitepress.dev/reference/default-theme-config)

---

*恭喜！你已经成功搭建了第一个 VitePress 站点。* 🎉

## 常见问题

### Q: 构建失败怎么办？

A: 检查 Node.js 版本是否符合要求，清理缓存后重试：

```bash
rm -rf node_modules package-lock.json
npm install
```

### Q: 如何自定义主题？

A: 查看 [主题定制](./theming) 章节了解详情。

### Q: 支持哪些 Markdown 扩展？

A: VitePress 支持 GitHub 风格的 Markdown、代码高亮、表格、任务列表等。查看 [Markdown 扩展](https://vitepress.dev/guide/markdown) 获取完整列表。"}