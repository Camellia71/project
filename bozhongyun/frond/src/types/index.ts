export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  role: 'admin' | 'user'
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  token: string
  refreshToken: string
  expiresIn: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
}

export type LoadingState = 'idle' | 'loading' | 'succeeded' | 'failed'

export interface AsyncState<T = any> {
  data: T | null
  status: LoadingState
  error: string | null
}
