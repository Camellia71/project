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

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | 18+ | 运行时 |
| Express | - | Web 框架 |
| TypeScript | 5+ | 类型系统 |
| SQLite | - | 数据库 |

### 项目结构

```
my-nextjs-site/
├── docs/                          # 文档目录
│   ├── API.md                     # API 文档
│   ├── COMPONENTS.md              # 组件文档
│   ├── DEPLOYMENT.md              # 部署指南
│   ├── FRONTEND_LAYOUT.md         # 响应式布局文档
│   ├── ASSETS_GUIDE.md            # 资源指南
│   └── PROJECT_OVERVIEW.md        # 项目概述（本文件）
├── public/                        # 静态资源
│   ├── fonts/                     # 字体文件
│   │   ├── plus-jakarta-sans/     # Plus Jakarta Sans 字体
│   │   └── Nioicon.*              # Nioicon 图标字体
│   └── images/                    # 图片资源
│       ├── header/                # 头部图片
│       └── index/                 # 首页图片
├── server/                        # 后端代码
│   ├── controllers/               # 控制器
│   ├── middleware/                # 中间件
│   ├── routes/                    # 路由
│   ├── db/                        # 数据库
│   └── index.ts                   # 入口文件
├── src/                           # 前端代码
│   ├── app/                       # App Router
│   │   ├── globals.scss           # 全局样式
│   │   ├── layout.tsx             # 根布局
│   │   ├── page.tsx               # 首页
│   │   ├── sms/                   # 短信页面
│   │   ├── templates/             # 模板页面
│   │   ├── contacts/              # 联系人页面
│   │   ├── analytics/             # 数据分析页面
│   │   └── settings/              # 设置页面
│   ├── components/                # 组件
│   │   ├── layout/                # 布局组件
│   │   └── sms/                   # 短信相关组件
│   ├── store/                     # Redux Store
│   │   └── slices/                # Redux Slices
│   └── lib/                       # 工具库
├── package.json                   # 依赖配置
├── tsconfig.json                  # TypeScript 配置
└── next.config.ts                 # Next.js 配置
```

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
cd my-nextjs-site
npm install

# 安装后端依赖
cd server
npm install
cd ..
```

### 开发模式

```bash
# 同时启动前端和后端
npm run dev

# 或者分别启动
npm run dev:next    # 前端 (http://localhost:3000)
npm run dev:server  # 后端 (http://localhost:3001)
```

### 构建生产版本

```bash
# 构建前端
npm run build

# 构建后端
cd server
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
| [COMPONENTS.md](./COMPONENTS.md) | 组件使用文档 |
| [API.md](./API.md) | API 接口文档 |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | 部署指南 |

### 📁 资源文件位置

```
字体文件: public/fonts/
  ├── plus-jakarta-sans/  # 主字体
  └── Nioicon.*           # 图标字体

图片文件: public/images/
  ├── header/             # 头部图片
  └── index/              # 首页图片
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
// ✅ 推荐
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button = ({ label, onClick, variant = 'primary' }: ButtonProps) => {
  // ...
};

// ❌ 避免
const Button = ({ label, onClick, variant }: any) => {
  // ...
};
```

#### 2. React 组件

- 使用函数组件
- 使用 Hooks
- 客户端组件标记 `'use client'`

```tsx
'use client'

import { useState } from 'react'

export default function Counter() {
  const [count, setCount] = useState(0)
  
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}
```

#### 3. 样式规范

- 优先使用 Bootstrap 类
- 自定义样式使用 SCSS
- 避免内联样式

```tsx
// ✅ 推荐
<div className="card shadow-sm hover-shadow">
  <h3 className="mb-3">标题</h3>
</div>

// ❌ 避免
<div style={{ 
  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
  marginBottom: '1rem'
}}>
  <h3 style={{ marginBottom: '1rem' }}>标题</h3>
</div>
```

### Git 工作流

```bash
# 创建功能分支
git checkout -b feature/your-feature-name

# 提交更改
git add .
git commit -m "feat: add new feature"

# 推送到远程
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

### Q: API 接口在哪里定义？

A: 后端在 `server/` 目录，参考 [API.md](./API.md)。

---

## 联系方式

- 项目地址：[待补充]
- 问题反馈：[待补充]

---

**最后更新**: 2026-05-27
