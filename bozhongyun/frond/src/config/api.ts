export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000,
  RETRY_TIMES: 3,
  RETRY_DELAY: 1000,
}

export const ENDPOINTS = {
  SMS: {
    SEND: '/sms/send',
    HISTORY: '/sms/history',
    TEMPLATES: '/sms/templates',
    STATISTICS: '/sms/statistics',
  },
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REGISTER: '/auth/register',
    REFRESH: '/auth/refresh',
  },
  USER: {
    PROFILE: '/user/profile',
    SETTINGS: '/user/settings',
  },
}

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

export const ERROR_MESSAGES = {
  NETWORK_ERROR: '网络连接失败，请检查您的网络设置',
  SERVER_ERROR: '服务器错误，请稍后重试',
  UNAUTHORIZED: '未授权，请重新登录',
  FORBIDDEN: '您没有权限执行此操作',
  NOT_FOUND: '请求的资源不存在',
  VALIDATION_ERROR: '数据验证失败',
  UNKNOWN_ERROR: '发生未知错误',
}
