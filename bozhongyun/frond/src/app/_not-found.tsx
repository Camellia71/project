'use client'

import { FiSearch } from 'react-icons/fi'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FiSearch className="w-12 h-12 text-indigo-600" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-lg text-gray-600 mb-8">页面未找到</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
