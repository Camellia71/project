# 静态资源文件指南

## 目录
1. [资源文件概览](#资源文件概览)
2. [字体资源](#字体资源)
3. [图片资源](#图片资源)
4. [资源使用规范](#资源使用规范)

---

## 资源文件概览

### 资源目录结构

```
frond/
├── fonts/                          # Nioicon 图标字体
│   ├── Nioicon.eot
│   ├── Nioicon.svg
│   ├── Nioicon.ttf
│   └── Nioicon.woff
├── plus-jakarta-sans/              # Plus Jakarta Sans 字体
│   ├── PlusJakartaSans-Bold.ttf
│   ├── PlusJakartaSans-Regular.svg
│   ├── PlusJakartaSans-Regular.ttf
│   ├── PlusJakartaSans-Regular.woff
│   ├── PlusJakartaSans-SemiBold.ttf
│   └── PlusJakartaSans-SemiBold.woff
└── images/                         # 图片资源
    ├── header/                     # 头部图片
    │   ├── logo.png
    │   ├── logo2.png
    │   ├── logo3.png
    │   └── promo-1.png
    └── index/                      # 首页图片
        ├── 106-icon.png
        ├── a-light.png
        ├── b-light.png
        ├── banner-cover-a.png
        ├── banner-cover.png
        ├── c-light.png
        ├── d-light.png
        ├── dashboard.png
        ├── dots-row-14.png
        ├── e-light.png
        ├── f-light.png
        ├── flag-1.png
        ├── flag-2.png
        ├── flag-3.png
        ├── flag-4.png
        ├── flag-5.png
        ├── inter-icon.png
        ├── inter-wu-icon.png
        ├── section-cover-1-a.png
        ├── section-cover-1-b.png
        ├── section-cover-1.png
        ├── section-cover-2-a.png
        ├── section-cover-2-b.png
        ├── section-cover-2-c.png
        ├── section-cover-2-d.png
        ├── shape_x.png
        └── wu-icon.png
```

---

## 字体资源

### 1. Plus Jakarta Sans

**位置**: `frond/plus-jakarta-sans/`

**字体文件清单**:

| 文件名 | 格式 | 字重 | 用途 |
|--------|------|------|------|
| PlusJakartaSans-Regular.ttf | TTF | 400 | 常规文本 |
| PlusJakartaSans-Regular.woff | WOFF | 400 | 常规 (Web优化) |
| PlusJakartaSans-Regular.svg | SVG | 400 | 常规 (备用) |
| PlusJakartaSans-SemiBold.ttf | TTF | 600 | 半粗体 |
| PlusJakartaSans-SemiBold.woff | WOFF | 600 | 半粗体 (Web优化) |
| PlusJakartaSans-Bold.ttf | TTF | 700 | 粗体标题 |

**SCSS 定义**:

```scss
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('/plus-jakarta-sans/PlusJakartaSans-Regular.woff') format('woff'),
       url('/plus-jakarta-sans/PlusJakartaSans-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('/plus-jakarta-sans/PlusJakartaSans-SemiBold.woff') format('woff'),
       url('/plus-jakarta-sans/PlusJakartaSans-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('/plus-jakarta-sans/PlusJakartaSans-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**全局字体设置**:

```scss
body {
  font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}
```

### 2. Nioicon

**位置**: `frond/fonts/`

**字体文件清单**:

| 文件名 | 格式 | 用途 |
|--------|------|------|
| Nioicon.eot | EOT | IE8- 支持 |
| Nioicon.svg | SVG | 图标字体 |
| Nioicon.ttf | TTF | 标准字体 |
| Nioicon.woff | WOFF | Web优化 |

**SCSS 定义**:

```scss
@font-face {
  font-family: 'Nioicon';
  src: url('/fonts/Nioicon.woff') format('woff'),
       url('/fonts/Nioicon.ttf') format('truetype'),
       url('/fonts/Nioicon.eot') format('embedded-opentype'),
       url('/fonts/Nioicon.svg') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

### 字体性能优化

1. **font-display: swap**
   - 确保字体加载时显示备用字体
   - 避免 FOIT (Flash of Invisible Text)

2. **WOFF 优先**
   - WOFF 格式体积更小，加载更快
   - TTF 作为降级方案

3. **预加载关键字体** (可选):

```html
<link
  rel="preload"
  href="/plus-jakarta-sans/PlusJakartaSans-Regular.woff"
  as="font"
  type="font/woff"
  crossorigin
/>
```

---

## 图片资源

### 头部图片 (Header Images)

**位置**: `frond/images/header/`

| 文件名 | 用途 | 推荐尺寸 | 说明 |
|--------|------|----------|------|
| logo.png | 主Logo | 200x60 | 深色背景版本 |
| logo2.png | 备用Logo | 200x60 | 浅色背景版本 |
| logo3.png | 第三Logo | 200x60 | 其他场景版本 |
| promo-1.png | 推广图 | 600x450 | Hero区域展示图 |

**使用示例**:

```tsx
import Image from 'next/image'

<Image
  src="/images/header/logo.png"
  alt="Logo"
  width={200}
  height={60}
  priority
/>

<Image
  src="/images/header/promo-1.png"
  alt="Promotion"
  width={600}
  height={450}
  className="rounded-4 shadow-lg"
/>
```

### 首页图片 (Index Images)

**位置**: `frond/images/index/`

#### 功能特性图标

| 文件名 | 功能 | 推荐尺寸 | 对应特性 |
|--------|------|----------|----------|
| a-light.png | 功能图标1 | 80x80 | 快速发送 |
| b-light.png | 功能图标2 | 80x80 | 全国覆盖 |
| c-light.png | 功能图标3 | 80x80 | 安全稳定 |
| d-light.png | 功能图标4 | 80x80 | 实时监控 |
| e-light.png | 功能图标5 | 80x80 | 模板管理 |
| f-light.png | 功能图标6 | 80x80 | 数据分析 |

**使用示例**:

```tsx
const features = [
  { 
    title: '快速发送', 
    image: '/images/index/a-light.png' 
  },
  // ...
]

features.map((feature, idx) => (
  <Image
    key={idx}
    src={feature.image}
    alt={feature.title}
    width={60}
    height={60}
    loading="lazy"
  />
))
```

#### 旗帜/合作伙伴图片

| 文件名 | 用途 | 推荐尺寸 |
|--------|------|----------|
| flag-1.png | 合作伙伴1 | 120x80 |
| flag-2.png | 合作伙伴2 | 120x80 |
| flag-3.png | 合作伙伴3 | 120x80 |
| flag-4.png | 合作伙伴4 | 120x80 |
| flag-5.png | 合作伙伴5 | 120x80 |

**使用示例**:

```tsx
<div className="row">
  {[1, 2, 3, 4, 5].map((i) => (
    <div key={i} className="col">
      <Image
        src={`/images/index/flag-${i}.png`}
        alt={`Partner ${i}`}
        width={80}
        height={50}
        className="opacity-75"
      />
    </div>
  ))}
</div>
```

#### Banner 图片

| 文件名 | 用途 | 推荐尺寸 |
|--------|------|----------|
| banner-cover.png | 主Banner | 1200x600 |
| banner-cover-a.png | 备用Banner | 1200x600 |

#### 区域封面图

| 文件名 | 用途 |
|--------|------|
| section-cover-1.png | 区域1封面 |
| section-cover-1-a.png | 区域1封面变体A |
| section-cover-1-b.png | 区域1封面变体B |
| section-cover-2-a.png | 区域2封面变体A |
| section-cover-2-b.png | 区域2封面变体B |
| section-cover-2-c.png | 区域2封面变体C |
| section-cover-2-d.png | 区域2封面变体D |

#### Dashboard 截图

| 文件名 | 用途 | 推荐尺寸 |
|--------|------|----------|
| dashboard.png | 控制台截图 | 800x500 |

#### 其他图标

| 文件名 | 用途 |
|--------|------|
| 106-icon.png | 106通道图标 |
| inter-icon.png | 国际短信图标 |
| inter-wu-icon.png | 国际无图标 |
| wu-icon.png | 无图标 |
| dots-row-14.png | 装饰点 |
| shape_x.png | X形状装饰 |

---

## 资源使用规范

### 1. 图片使用规范

#### Next.js Image 组件

**必须使用 Next.js Image 组件**:

```tsx
import Image from 'next/image'

// ✅ 推荐
<Image
  src="/images/header/logo.png"
  alt="Logo"
  width={200}
  height={60}
  priority  // 关键图片优先加载
/>

// ❌ 避免
<img src="/images/header/logo.png" alt="Logo" />
```

#### 图片属性配置

```tsx
<Image
  src="/images/feature.png"
  alt="功能描述"
  width={400}
  height={300}
  className="img-fluid"
  loading="lazy"           // 懒加载
  priority={false}         // 非关键图片
  sizes="(max-width: 768px) 100vw, 50vw"
  quality={85}
/>
```

#### Alt 属性规范

- 描述图片内容
- 包含关键词
- 简洁明了

```tsx
// ✅ 好的 alt
alt="短信服务平台控制台界面"
alt="快速发送功能图标"

// ❌ 不好的 alt
alt="图片"
alt=""
```

### 2. 响应式图片

```scss
img {
  max-width: 100%;
  height: auto;
}
```

### 3. 性能优化

#### 图片格式选择

- **照片**: WebP > JPEG
- **图标/图形**: WebP > PNG > SVG
- **矢量图**: SVG

#### 图片尺寸优化

- 提供合适的尺寸
- 避免大尺寸小显示
- 使用 `sizes` 属性

```tsx
<Image
  src="/images/banner.png"
  alt="Banner"
  width={1200}
  height={600}
  sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
/>
```

### 4. SVG 使用

```tsx
// 内联 SVG
import Globe from '@/public/globe.svg'

<Globe className="w-6 h-6" />

// 或使用 Image 组件
<Image src="/globe.svg" alt="Globe" width={24} height={24} />
```

### 5. 资源清单检查

- [ ] 所有字体文件存在
- [ ] 所有图片文件存在
- [ ] 图片尺寸正确
- [ ] Alt 属性完整
- [ ] loading 属性设置
- [ ] priority 属性设置
- [ ] sizes 属性设置
