import type { Metadata, Viewport } from 'next'
import './globals.scss'
import ClientLayout from '@/components/layout/ClientLayout'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export const metadata: Metadata = {
  title: {
    default: '短信服务平台',
    template: '%s | 短信服务平台'
  },
  description: '企业级短信发送服务平台，支持模板管理、发送历史和数据统计',
  keywords: ['短信服务', '短信平台', '企业短信', '短信验证码', '营销短信', 'Next.js', 'React'],
  authors: [{ name: 'SMS Platform Team' }],
  creator: 'SMS Platform',
  publisher: 'SMS Platform',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://your-domain.com',
    siteName: '短信服务平台',
    title: '短信服务平台',
    description: '企业级短信发送服务平台，支持模板管理、发送历史和数据统计',
    images: [
      {
        url: '/images/index/banner-cover.png',
        width: 1200,
        height: 630,
        alt: '短信服务平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '短信服务平台',
    description: '企业级短信发送服务平台',
    images: ['/images/index/banner-cover.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}