'use client'

import { Provider } from 'react-redux'
import { store } from '@/store'
import MainLayout from './MainLayout'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <MainLayout>{children}</MainLayout>
    </Provider>
  )
}
