# 短信服务平台 - 快速开始

## 项目已创建完成！

### 技术栈

- **前端**: Next.js 16 + React 19 + TypeScript
- **状态管理**: Redux Toolkit + React-Redux
- **UI 框架**: Bootstrap 5 + React Bootstrap
- **后端**: Node.js + Express
- **样式**: SCSS + TailwindCSS

### 项目结构

```
my-nextjs-site/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # 首页
│   │   └── layout.tsx      # 根布局
│   ├── components/
│   │   ├── layout/         # 布局组件
│   │   └── sms/            # 短信相关组件
│   │       ├── SendSMSForm.tsx    # 发送表单
│   │       └── SMSHistory.tsx     # 历史记录
│   └── store/              # Redux Store
│       ├── index.ts
│       └── slices/
│           ├── authSlice.ts
│           └── smsSlice.ts
├── server/                 # Express 后端
│   ├── index.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   └── sms.ts
│   └── controllers/
│       ├── authController.ts
│       └── smsController.ts
├── TECHNICAL_DOCUMENTATION.md  # 详细技术文档
└── QUICKSTART.md               # 本文件
```

## 启动项目

### 首次启动（依赖已安装）

```bash
# 在 my-nextjs-site 目录下运行
npm run dev
```

### 或者分别启动

```bash
# 终端 1 - 启动前端 (端口 3000)
npm run dev:next

# 终端 2 - 启动后端 (端口 3001)
cd server
npm run dev
```

### 访问应用

- **前端**: http://localhost:3000
- **后端健康检查**: http://localhost:3001/api/health

## 功能说明

### 短信发送

- 支持输入手机号和短信内容
- 支持使用模板快速填写
- 发送成功后自动添加到历史记录

### 历史记录

- 显示所有发送记录
- 支持刷新最新记录
- 显示发送状态（已发送/失败/待发送）

### 模板管理

- 内置验证码和营销两个默认模板
- 点击模板即可填充内容

## 后续开发建议

1. **接入真实短信服务商**: 阿里云、腾讯云等
2. **用户认证**: 实现真实的登录/注册功能
3. **数据库**: 连接 SQLite/PostgreSQL 持久化数据
4. **更多功能**: 批量发送、定时发送、数据统计等

详细技术文档请参考 [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)
