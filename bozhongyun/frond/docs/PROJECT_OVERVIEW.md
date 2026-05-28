# 短信服务平台项目文档

## 目录
1. [项目概述](#项目概述)
2. [技术架构](#技术架构)
3. [快速开始](#快速开始)
4. [文档导航](#文档导航)
5. [开发指南](#开发指南)

---

## 项目概述

### 项目简介

这是一个企业级短信服务平台，提供短信发送、模板管理、历史记录和数据分析功能。项目采用响应式设计，参考了 https://cn.textboostsms.com 的布局风格。

### 核心功能

- 📱 短信发送
- 📝 模板管理
- 📊 数据统计
- 📈 历史记录
- 👥 联系人管理
- ⚙️ 系统设置

### 参考网站分析

参考网站 https://cn.textboostsms.com 具有以下特点：

- 清晰的视觉层次结构
- 渐变色为主的配色方案
- 卡片式模块化布局
- 完善的响应式设计
- 丰富的交互动画效果

---

## 技术架构

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Next.js | 15+ | React 框架 |
| React | 18+ | UI 库 |
| TypeScript | 5+ | 类型系统 |
| Bootstrap | 5+ | UI 框架 |
| SCSS | - | 样式预处理器 |
| Redux Toolkit | - | 状态管理 |
| react-icons | - | 图标库 |

### 项目结构

```
frond/
├── docs/                          # 文档目录
│   ├── PROJECT_OVERVIEW.md        # 项目概述（本文件）
│   ├── FRONTEND_LAYOUT.md         # 响应式布局文档
│   └── ASSETS_GUIDE.md            # 资源指南
├── fonts/                         # Nioicon 字体
│   ├── Nioicon.eot
│   ├── Nioicon.svg
│   ├── Nioicon.ttf
│   └── Nioicon.woff
├── plus-jakarta-sans/             # Plus Jakarta Sans 字体
│   ├── PlusJakartaSans-Bold.ttf
│   ├── PlusJakartaSans-Regular.svg
│   ├── PlusJakartaSans-Regular.ttf
│   ├── PlusJakartaSans-Regular.woff
│   ├── PlusJakartaSans-SemiBold.ttf
│   └── PlusJakartaSans-SemiBold.woff
└── images/                        # 图片资源
    ├── header/                    # 头部图片
    └── index/                     # 首页图片
```

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
cd frond
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

---

## 文档导航

### 📚 文档列表

| 文档 | 说明 |
|------|------|
| [PROJECT_OVERVIEW.md](./PROJECT_OVERVIEW.md) | 项目概述（本文档） |
| [FRONTEND_LAYOUT.md](./FRONTEND_LAYOUT.md) | 响应式布局设计文档 |
| [ASSETS_GUIDE.md](./ASSETS_GUIDE.md) | 静态资源文件指南 |

### 📁 资源文件位置

```
字体文件:
├── fonts/              # Nioicon 图标字体
└── plus-jakarta-sans/  # Plus Jakarta Sans 主字体

图片文件: images/
├── header/             # 头部图片（logo、promo）
└── index/              # 首页图片（功能图标、banner等）
```

详细说明请参考 [ASSETS_GUIDE.md](./ASSETS_GUIDE.md)

### 🎨 布局设计说明

- 响应式设计：适配移动设备、平板、桌面
- 断点配置：xs, sm, md, lg, xl, xxl
- 栅格系统：Bootstrap 5 Grid
- 详细说明请参考 [FRONTEND_LAYOUT.md](./FRONTEND_LAYOUT.md)

---

## 开发指南

### 代码规范

#### 1. TypeScript

- 严格类型检查
- 避免使用 `any`
- 定义 Props 接口

```tsx
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  // ...
};
```

#### 2. React 组件

- 使用函数组件
- 使用 Hooks
- 客户端组件标记 `'use client'`

#### 3. 样式规范

- 优先使用 Bootstrap 类
- 自定义样式使用 SCSS
- 避免内联样式

### Git 工作流

```bash
git checkout -b feature/your-feature-name
git add .
git commit -m "feat: add new feature"
git push origin feature/your-feature-name
```

### 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式
refactor: 重构
test: 测试
chore: 构建/工具
```

---

## 常见问题

### Q: 如何添加新的页面？

A: 在 `src/app/` 下创建新目录和 `page.tsx` 文件。

### Q: 如何使用静态资源？

A: 使用 Next.js Image 组件，参考 [ASSETS_GUIDE.md](./ASSETS_GUIDE.md)。

### Q: 如何修改全局样式？

A: 修改 `src/app/globals.scss` 文件。

---

**最后更新**: 2026-05-27
