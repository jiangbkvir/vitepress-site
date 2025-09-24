# 部署指南

本指南介绍如何将 VitePress 站点部署到各种平台。

## GitHub Pages

### 使用 GitHub Actions（推荐）

1. **创建仓库**
   - 在 GitHub 上创建新仓库
   - 将代码推送到仓库

2. **创建工作流文件**

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run docs:build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
          publish_branch: gh-pages
```

3. **配置站点基础路径**

在 `docs/.vitepress/config.ts` 中：

```typescript
export default defineConfig({
  base: '/your-repo-name/',
  // 其他配置...
})
```

4. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "Deploy from a branch"
   - Branch 选择 "gh-pages" / "root"
   - 点击 Save

### 手动部署

1. **构建项目**

```bash
npm run docs:build
```

2. **推送到 gh-pages 分支**

```bash
# 创建并切换到 gh-pages 分支
git checkout --orphan gh-pages

# 删除所有文件
git rm -rf .

# 复制构建结果
cp -r docs/.vitepress/dist/* .

# 添加并提交
git add .
git commit -m "Deploy to GitHub Pages"

# 推送到远程
git push origin gh-pages

# 返回主分支
git checkout master
```

## Netlify

1. **登录 [Netlify](https://netlify.com)**
2. **连接 Git 仓库**
   - 点击 "New site from Git"
   - 选择 GitHub 并授权
   - 选择你的仓库

3. **配置构建设置**
   - Build command: `npm run docs:build`
   - Publish directory: `docs/.vitepress/dist`

4. **部署**
   - 点击 "Deploy site"
   - 等待构建完成

## Vercel

1. **登录 [Vercel](https://vercel.com)**
2. **导入项目**
   - 点击 "New Project"
   - 选择 GitHub 仓库

3. **配置项目**
   - Framework Preset: 选择 "Other"
   - Build Command: `npm run docs:build`
   - Output Directory: `docs/.vitepress/dist`

4. **部署**
   - 点击 "Deploy"
   - 等待构建完成

## GitLab Pages

创建 `.gitlab-ci.yml`：

```yaml
image: node:20

pages:
  script:
    - npm ci
    - npm run docs:build
    - mkdir public
    - cp -r docs/.vitepress/dist/* public/
  artifacts:
    paths:
      - public
  only:
    - master
```

## Firebase Hosting

1. **安装 Firebase CLI**

```bash
npm install -g firebase-tools
```

2. **初始化 Firebase**

```bash
firebase init hosting
```

3. **配置 firebase.json**

```json
{
  "hosting": {
    "public": "docs/.vitepress/dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ]
  }
}
```

4. **构建并部署**

```bash
npm run docs:build
firebase deploy
```

## 阿里云 OSS

1. **安装阿里云 CLI**

```bash
npm install -g @alicloud/cli
```

2. **配置凭证**

```bash
aliyun configure
```

3. **创建部署脚本**

创建 `deploy.js`：

```javascript
const OSS = require('ali-oss')
const path = require('path')
const fs = require('fs')

const client = new OSS({
  region: 'your-region',
  accessKeyId: 'your-access-key-id',
  accessKeySecret: 'your-access-key-secret',
  bucket: 'your-bucket'
})

async function deploy() {
  const distPath = path.join(__dirname, 'docs/.vitepress/dist')
  
  // 上传文件
  const files = fs.readdirSync(distPath)
  for (const file of files) {
    const filePath = path.join(distPath, file)
    await client.put(file, filePath)
  }
  
  console.log('部署完成！')
}

deploy()
```

4. **运行部署**

```bash
npm run docs:build
node deploy.js
```

## 腾讯云 COS

1. **安装 COS SDK**

```bash
npm install cos-nodejs-sdk-v5
```

2. **创建部署脚本**

```javascript
const COS = require('cos-nodejs-sdk-v5')
const path = require('path')
const fs = require('fs')

const cos = new COS({
  SecretId: 'your-secret-id',
  SecretKey: 'your-secret-key'
})

async function deploy() {
  const distPath = path.join(__dirname, 'docs/.vitepress/dist')
  
  // 上传文件
  const files = fs.readdirSync(distPath)
  for (const file of files) {
    const filePath = path.join(distPath, file)
    await cos.putObject({
      Bucket: 'your-bucket-1250000000',
      Region: 'your-region',
      Key: file,
      Body: fs.createReadStream(filePath)
    })
  }
  
  console.log('部署完成！')
}

deploy()
```

## Docker 部署

创建 `Dockerfile`：

```docker
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run docs:build

FROM nginx:alpine
COPY --from=builder /app/docs/.vitepress/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

创建 `nginx.conf`：

```nginx
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ $uri.html /index.html;
        }
    }
}
```

构建并运行：

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

## 性能优化

### 1. 启用 CDN

将静态资源上传到 CDN，加速全球访问。

### 2. 配置缓存

设置适当的缓存头：

```yaml
# GitHub Pages 的 _config.yml
plugins:
  - jekyll-sitemap
  - jekyll-feed

# 缓存控制
cache_control:
  - path: "*.css"
    max_age: 31536000
  - path: "*.js"
    max_age: 31536000
```

### 3. 压缩资源

在构建时启用压缩：

```typescript
export default defineConfig({
  vite: {
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true
        }
      }
    }
  }
})
```

### 4. 使用 WebP 图片

转换图片格式：

```bash
# 安装 imagemin
npm install -D imagemin imagemin-webp

# 转换脚本
const imagemin = require('imagemin')
const imageminWebp = require('imagemin-webp')

imagemin(['docs/public/images/*.{jpg,png}'], {
  destination: 'docs/public/images',
  plugins: [
    imageminWebp({ quality: 75 })
  ]
})
```

## 自动化部署

### 多环境部署

```yaml
name: Deploy

on:
  push:
    branches: [ master, develop ]

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
      
      - name: Deploy to staging
        if: github.ref == 'refs/heads/develop'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
          publish_branch: gh-pages-staging
      
      - name: Deploy to production
        if: github.ref == 'refs/heads/master'
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
          publish_branch: gh-pages
```

### 自动发布

```yaml
name: Release and Deploy

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run docs:build
      
      - name: Create Release
        uses: actions/create-release@v1
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        with:
          tag_name: ${{ github.ref }}
          release_name: Release ${{ github.ref }}
          draft: false
          prerelease: false
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./docs/.vitepress/dist
```

## 监控和统计

### 添加分析工具

```typescript
// docs/.vitepress/config.ts
export default defineConfig({
  head: [
    ['script', { async: '', src: 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'GA_MEASUREMENT_ID');
    `]
  ]
})
```

### 性能监控

```typescript
export default defineConfig({
  head: [
    ['script', {}, `
      (function() {
        var perf = performance.timing;
        var pageLoadTime = perf.loadEventEnd - perf.navigationStart;
        console.log('页面加载时间:', pageLoadTime + 'ms');
      })();
    `]
  ]
})
```

## 故障排除

### 404 错误

1. 检查 `base` 配置是否正确
2. 确认部署分支设置
3. 验证文件是否上传到正确位置

### 构建失败

1. 检查 Node.js 版本
2. 清理缓存重新安装依赖
3. 查看构建日志

### 样式丢失

1. 检查静态资源路径
2. 确认 `base` 配置
3. 验证 CDN 设置

---

*选择合适的部署方式，让你的文档站点上线吧！* 🚀"}

## 下一步

- 学习 [主题定制](./theming)
- 了解 [插件开发](./plugins)
- 查看 [最佳实践](./best-practices)

---

*部署完成！你的文档站点现在应该可以正常访问了。* 🎉"}