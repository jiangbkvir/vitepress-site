# 组件总览

本章节介绍常用的 UI 组件和使用方法。

## 组件分类

### 基础组件
- [按钮组件](./button) - 各种样式的按钮
- [表单组件](./form) - 输入框、选择器等
- [布局组件](./layout) - 网格、卡片等

### 复合组件
- [导航组件](./navigation) - 菜单、面包屑
- [数据展示](./data-display) - 表格、列表
- [反馈组件](./feedback) - 提示、确认框

## 使用示例

### 按钮组件

```vue
<template>
  <div>
    <Button type="primary">主要按钮</Button>
    <Button type="secondary">次要按钮</Button>
    <Button type="outline">边框按钮</Button>
  </div>
</template>
```

### 表单组件

```vue
<template>
  <Form @submit="handleSubmit">
    <FormItem label="用户名">
      <Input v-model="form.username" />
    </FormItem>
    <FormItem label="密码">
      <Input type="password" v-model="form.password" />
    </FormItem>
    <Button type="primary" html-type="submit">提交</Button>
  </Form>
</template>
```

## 设计原则

### 一致性
- 保持视觉风格统一
- 交互行为一致
- 命名规范统一

### 可用性
- 清晰的视觉层次
- 直观的操作反馈
- 完善的文档说明

### 可访问性
- 支持键盘导航
- 提供屏幕阅读器支持
- 符合 WCAG 标准

## 主题定制

组件支持主题定制，可以通过 CSS 变量或配置项进行自定义：

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --success-color: #28a745;
  --danger-color: #dc3545;
}
```

## 响应式设计

所有组件都支持响应式设计，在不同设备上自动适配：

- **桌面端**: 完整功能展示
- **平板端**: 优化布局和交互
- **移动端**: 触摸友好的操作

## 浏览器兼容性

- Chrome >= 60
- Firefox >= 60
- Safari >= 12
- Edge >= 79

## 性能优化

- 组件按需加载
- 最小化打包体积
- 优化的渲染性能

## 相关链接

- [组件设计规范](./design-guide)
- [主题配置](./theme-config)
- [API 文档](../api/)

---

*开始使用这些组件构建你的应用界面吧！* 🎨

## 下一步

- 查看 [按钮组件](./button)
- 了解 [表单组件](./form)
- 学习 [布局组件](./layout)

---

*组件库文档持续更新中...* 📚"