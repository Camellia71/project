import type { Metadata, Viewport } from 'next'
import ClientLayout from '@/components/layout/ClientLayout'
import './globals.scss'

export const metadata: Metadata = {
  title: '短信服务平台 - 企业级短信解决方案',
  description: '专业的企业级短信服务平台，提供短信发送、模板管理、数据统计等功能',
  keywords: '短信服务,企业短信,短信平台,短信API',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}
