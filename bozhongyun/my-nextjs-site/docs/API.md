# API 接口文档

短信服务平台 API 接口说明，基于 RESTful 设计风格。

## 基础信息

- **基础 URL**: `http://localhost:3001`
- **数据格式**: JSON
- **认证方式**: JWT Token（在 Authorization header 中传递）

## 通用响应格式

### 成功响应

```json
{
  "id": 1,
  "phone": "13800138000",
  "message": "您的验证码是：123456",
  "status": "sent",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

### 错误响应

```json
{
  "error": "错误信息"
}
```

## 认证接口

### 1. 用户登录

**端点**: `POST /api/auth/login`

**请求头**:

```
Content-Type: application/json
```

**请求参数**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | ✅ | 用户邮箱 |
| password | string | ✅ | 用户密码 |

**成功响应** (200 OK):

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "用户名"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**错误响应**:

```json
{
  "error": "邮箱或密码错误"
}
```

**可能错误**:
- 400: 邮箱和密码不能为空
- 401: 邮箱或密码错误
- 500: 服务器内部错误

---

### 2. 用户注册

**端点**: `POST /api/auth/register`

**请求头**:

```
Content-Type: application/json
```

**请求参数**:

```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "用户名"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| email | string | ✅ | 用户邮箱 |
| password | string | ✅ | 用户密码（至少6位） |
| name | string | ❌ | 用户名称 |

**成功响应** (201 Created):

```json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "用户名"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**错误响应**:

```json
{
  "error": "该邮箱已被注册"
}
```

**可能错误**:
- 400: 邮箱和密码不能为空
- 400: 密码长度至少为6位
- 409: 该邮箱已被注册
- 500: 服务器内部错误

---

## 短信接口

### 1. 发送短信

**端点**: `POST /api/sms/send`

**请求头**:

```
Content-Type: application/json
```

**请求参数**:

```json
{
  "phone": "13800138000",
  "message": "您的验证码是：123456，请在5分钟内使用。"
}
```

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| phone | string | ✅ | 手机号码（中国大陆手机号，1开头的11位数字） |
| message | string | ✅ | 短信内容 |

**成功响应** (201 Created):

```json
{
  "id": 1,
  "phone": "13800138000",
  "message": "您的验证码是：123456，请在5分钟内使用。",
  "status": "sent",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

**错误响应**:

```json
{
  "error": "手机号格式不正确"
}
```

**可能错误**:
- 400: 手机号和短信内容不能为空
- 400: 手机号格式不正确（必须是1开头的11位数字）
- 500: 服务器内部错误

**手机号格式验证规则**:

```typescript
const phoneRegex = /^1[3-9]\d{9}$/;
// 匹配: 13800138000, 15912345678, 18812345678 等
// 不匹配: 12345678901, 1380013800, 23800138000 等
```

---

### 2. 获取发送历史

**端点**: `GET /api/sms/history`

**成功响应** (200 OK):

```json
[
  {
    "id": 2,
    "user_id": 1,
    "phone": "13900139000",
    "message": "尊敬的用户，您的订单已发货。",
    "status": "sent",
    "created_at": "2024-01-01T11:30:00.000Z"
  },
  {
    "id": 1,
    "user_id": 1,
    "phone": "13800138000",
    "message": "您的验证码是：123456，请在5分钟内使用。",
    "status": "sent",
    "created_at": "2024-01-01T12:00:00.000Z"
  }
]
```

**响应说明**:

- 数组按 `created_at` 降序排列（最新的在前）
- 包含该用户的所有短信发送记录
- 状态字段：`sent`（已发送）、`failed`（失败）、`pending`（待发送）

**可能错误**:
- 500: 服务器内部错误

---

### 3. 获取短信模板

**端点**: `GET /api/sms/templates`

**成功响应** (200 OK):

```json
[
  {
    "id": 1,
    "user_id": null,
    "name": "验证码",
    "content": "您的验证码是：{code}，请在5分钟内使用。",
    "category": "验证码",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 2,
    "user_id": null,
    "name": "营销",
    "content": "尊敬的客户，感谢您的支持！",
    "category": "营销",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  {
    "id": 3,
    "user_id": null,
    "name": "通知",
    "content": "您好，您的订单已发货，请注意查收。",
    "category": "通知",
    "created_at": "2024-01-01T00:00:00.000Z"
  }
]
```

**模板说明**:

- 包含3个默认模板（验证码、营销、通知）
- `user_id` 为 null 表示系统默认模板
- 可直接在短信内容中使用或修改

**可能错误**:
- 500: 服务器内部错误

---

## 健康检查接口

### 1. 服务健康检查

**端点**: `GET /api/health`

**成功响应** (200 OK):

```json
{
  "status": "ok",
  "message": "SMS Service is running"
}
```

---

## 认证中间件

部分接口需要 JWT Token 认证。

### 请求头格式

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Token 生成

登录或注册成功后返回的 `token` 字段即为 JWT Token，有效期为 7 天。

### 认证失败响应

```json
{
  "error": "未提供认证令牌"
}
```

**可能错误**:
- 401: 未提供认证令牌
- 401: 无效的认证令牌
- 401: 用户不存在

---

## 使用示例

### 前端调用示例

#### 使用 axios

```typescript
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 登录
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post('/api/auth/login', { email, password });
  return response.data;
};

// 发送短信
export const sendSMS = async (phone: string, message: string) => {
  const response = await axiosInstance.post('/api/sms/send', { phone, message });
  return response.data;
};

// 获取历史
export const getHistory = async () => {
  const response = await axiosInstance.get('/api/sms/history');
  return response.data;
};

// 获取模板
export const getTemplates = async () => {
  const response = await axiosInstance.get('/api/sms/templates');
  return response.data;
};
```

#### 使用 fetch

```typescript
// 登录
const login = async (email: string, password: string) => {
  const response = await fetch('http://localhost:3001/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
};

// 发送短信
const sendSMS = async (phone: string, message: string) => {
  const response = await fetch('http://localhost:3001/api/sms/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, message }),
  });
  return response.json();
};
```

### cURL 示例

```bash
# 用户登录
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123"}'

# 用户注册
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "password": "password123", "name": "Test User"}'

# 发送短信
curl -X POST http://localhost:3001/api/sms/send \
  -H "Content-Type: application/json" \
  -d '{"phone": "13800138000", "message": "测试短信"}'

# 获取历史
curl http://localhost:3001/api/sms/history

# 获取模板
curl http://localhost:3001/api/sms/templates

# 健康检查
curl http://localhost:3001/api/health
```

### Postman 示例

1. 创建新请求
2. 选择请求方法（POST/GET）
3. 输入 URL
4. 选择 Body 选项卡，选择 raw 和 JSON
5. 输入请求参数
6. 点击 Send

---

## 错误码说明

| HTTP 状态码 | 说明 |
|-------------|------|
| 200 | 请求成功 |
| 201 | 创建成功 |
| 400 | 请求参数错误 |
| 401 | 认证失败 |
| 409 | 资源冲突 |
| 500 | 服务器内部错误 |

---

## 后续扩展

### 待实现的接口

- `DELETE /api/sms/history/:id` - 删除历史记录
- `POST /api/sms/batch` - 批量发送
- `GET /api/sms/templates/:id` - 获取单个模板
- `POST /api/sms/templates` - 创建模板
- `PUT /api/sms/templates/:id` - 更新模板
- `DELETE /api/sms/templates/:id` - 删除模板
- `GET /api/user/profile` - 获取用户信息
- `PUT /api/user/profile` - 更新用户信息
- `DELETE /api/auth/logout` - 用户登出
