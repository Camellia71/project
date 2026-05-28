import { Metadata } from 'next'
import Link from 'next/link'
import { FiMessageSquare } from 'react-icons/fi'

export const metadata: Metadata = {
  title: '短信服务',
  description: '短信发送管理',
}

export default function SMSPage() {
  return (
    <div className="container-fluid g-0">
      <div className="text-center py-5">
        <FiMessageSquare size={64} className="text-primary mb-4" />
        <h1 className="h2 fw-bold mb-3">短信服务</h1>
        <p className="text-muted">短信发送功能请在首页使用</p>
        <Link href="/" className="btn btn-primary mt-3">
          返回首页
        </Link>
      </div>
    </div>
  )
}