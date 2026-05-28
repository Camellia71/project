import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { API_CONFIG, HTTP_STATUS, ERROR_MESSAGES } from '@/config'

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.BASE_URL,
      timeout: API_CONFIG.TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            const refreshToken = localStorage.getItem('refreshToken')
            const response = await axios.post(`${API_CONFIG.BASE_URL}/auth/refresh`, {
              refreshToken,
            })

            const { token } = response.data
            localStorage.setItem('token', token)

            originalRequest.headers.Authorization = `Bearer ${token}`
            return this.client(originalRequest)
          } catch (refreshError) {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }

        return Promise.reject(this.handleError(error))
      }
    )
  }

  private handleError(error: any): Error {
    if (error.response) {
      const status = error.response.status
      const message = error.response.data?.message || ERROR_MESSAGES.UNKNOWN_ERROR

      switch (status) {
        case HTTP_STATUS.BAD_REQUEST:
          return new Error(message || ERROR_MESSAGES.VALIDATION_ERROR)
        case HTTP_STATUS.UNAUTHORIZED:
          return new Error(ERROR_MESSAGES.UNAUTHORIZED)
        case HTTP_STATUS.FORBIDDEN:
          return new Error(ERROR_MESSAGES.FORBIDDEN)
        case HTTP_STATUS.NOT_FOUND:
          return new Error(ERROR_MESSAGES.NOT_FOUND)
        case HTTP_STATUS.INTERNAL_SERVER_ERROR:
          return new Error(ERROR_MESSAGES.SERVER_ERROR)
        default:
          return new Error(message)
      }
    } else if (error.request) {
      return new Error(ERROR_MESSAGES.NETWORK_ERROR)
    } else {
      return new Error(ERROR_MESSAGES.UNKNOWN_ERROR)
    }
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.get(url, config)
    return response.data
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.post(url, data, config)
    return response.data
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.put(url, data, config)
    return response.data
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.client.delete(url, config)
    return response.data
  }
}

export const apiClient = new ApiClient()
export default apiClient
