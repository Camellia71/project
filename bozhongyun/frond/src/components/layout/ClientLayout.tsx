'use client'

import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { store } from '@/store'
import MainLayout from './MainLayout'

interface ClientLayoutProps {
  children: ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <Provider store={store}>
      <MainLayout>{children}</MainLayout>
    </Provider>
  )
}
