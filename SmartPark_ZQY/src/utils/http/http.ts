/**
 * SmartPark - HTTP请求封装模块 (增强版)
 * 功能：
 * 1. 请求防抖 - 避免重复请求
 * 2. TTL 响应缓存 - 缓存 GET 请求结果
 * 3. 并发请求合并 - 消除重复并发调用
 * 4. Token 注入与异常链路阻断
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'antd';
import { store } from '../../store';

// ==================== 类型定义 ====================

interface CacheItem<T = unknown> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface PendingRequest {
  promise: Promise<AxiosResponse>;
  abortController: AbortController;
}

// ==================== 缓存与防抖存储 ====================

const cacheStore = new Map<string, CacheItem>();
const pendingRequests = new Map<string, PendingRequest>();
const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

// ==================== 工具函数 ====================

/**
 * 生成请求唯一 key（基于 URL + 参数）
 */
function generateRequestKey(config: AxiosRequestConfig): string {
  const { url, method, params, data } = config;
  return `${method?.toUpperCase()}:${url}?${JSON.stringify(params || {})}#${JSON.stringify(data || {})}`;
}

/**
 * 获取缓存数据
 */
function getCacheData<T>(key: string): T | null {
  const item = cacheStore.get(key);
  if (!item) return null;
  if (Date.now() - item.timestamp >= item.ttl) {
    cacheStore.delete(key);
    return null;
  }
  return item.data as T;
}

/**
 * 设置缓存数据
 */
function setCacheData<T>(key: string, data: T, ttl: number): void {
  cacheStore.set(key, {
    data,
    timestamp: Date.now(),
    ttl,
  });
}

// ==================== HTTP 实例创建 ====================

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.smartpark.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

// ==================== 请求拦截器 ====================

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Token 注入
    const { token } = store.getState().authSlice;
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    message.error('请求配置错误，请检查网络连接');
    return Promise.reject(error);
  }
);

// ==================== 响应拦截器 ====================

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 401 登录过期 - 强制跳转登录
    if (res.code === 401 || res.code === '401') {
      message.error('登录已过期，请重新登录');
      window.location.href = '/login';
      return Promise.reject(new Error('登录已过期'));
    }

    // 403 权限不足
    if (res.code === 403 || res.code === '403') {
      message.error('您没有权限访问此资源');
      return Promise.reject(new Error('权限不足'));
    }

    // 500 服务器错误
    if (res.code === 500 || res.code === '500') {
      message.error('服务器内部错误，请稍后重试');
      return Promise.reject(new Error('服务器内部错误'));
    }

    // 其他业务错误
    if (res.code !== 200 && res.code !== 0) {
      message.error(`请求失败 [${res.code}]: ${res.message || '未知错误'}`);
      return Promise.reject(new Error(res.message || '请求失败'));
    }

    // 成功响应，返回格式化数据
    return {
      ...response,
      data: res.data,
    };
  },
  error => {
    // 已取消的请求不提示
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // 处理 HTTP 状态码错误
    if (error.response) {
      const status = error.response.status;
      const errorMessages: Record<number, string> = {
        400: '请求参数错误',
        401: '登录已过期，请重新登录',
        403: '您没有权限访问此资源',
        404: '请求的资源不存在',
        408: '请求超时',
        500: '服务器内部错误，请稍后重试',
        502: '网关错误',
        503: '服务暂时不可用',
        504: '网关超时',
      };
      const errorMessage = errorMessages[status] || `请求失败 [${status}]`;
      message.error(errorMessage);
    } else if (error.request) {
      message.error('网络请求超时，请检查网络连接');
    } else {
      message.error('请求配置错误');
    }

    return Promise.reject(error);
  }
);

// ==================== 增强方法 ====================

/**
 * 带缓存的 GET 请求
 * @param url 请求地址
 * @param config 请求配置
 * @param options.ttl 缓存有效期（毫秒），默认 30000（30秒）
 * @param options.useCache 是否使用缓存，默认 true
 */
export async function cachedGet<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  options: { ttl?: number; useCache?: boolean } = {}
): Promise<T> {
  const { ttl = 30000, useCache = true } = options;

  // 合并配置
  const fullConfig: AxiosRequestConfig = {
    ...config,
    method: 'GET',
    url,
  };

  const requestKey = generateRequestKey(fullConfig);

  // 检查缓存
  if (useCache && fullConfig.method === 'GET') {
    const cachedData = getCacheData<T>(requestKey);
    if (cachedData !== null) {
      console.log(`[HTTP Cache Hit] ${url}`);
      return cachedData;
    }
  }

  // 检查是否有正在进行的相同请求（并发合并）
  const existingRequest = pendingRequests.get(requestKey);
  if (existingRequest) {
    console.log(`[HTTP Request Merge] ${url} - 复用进行中的请求`);
    return existingRequest.promise as Promise<T>;
  }

  // 创建新的请求
  const abortController = new AbortController();
  const requestPromise = http.request({
    ...fullConfig,
    signal: abortController.signal,
  }) as Promise<AxiosResponse>;

  // 存储正在进行的请求
  pendingRequests.set(requestKey, {
    promise: requestPromise,
    abortController,
  });

  try {
    const response = await requestPromise;

    // 缓存响应数据（仅缓存 GET 请求）
    if (fullConfig.method === 'GET' && useCache) {
      setCacheData(requestKey, response, ttl);
    }

    return response as T;
  } finally {
    // 请求完成后移除
    pendingRequests.delete(requestKey);
  }
}

/**
 * 带防抖的请求
 * @param url 请求地址
 * @param config 请求配置
 * @param options.wait 防抖等待时间（毫秒），默认 300
 * @param options.immediate 是否立即执行（trailing 模式），默认 false
 */
export async function debouncedRequest<T = unknown>(
  url: string,
  config?: AxiosRequestConfig,
  options: { wait?: number; immediate?: boolean } = {}
): Promise<T> {
  const { wait = 300, immediate = false } = options;

  const fullConfig: AxiosRequestConfig = {
    ...config,
    method: config?.method || 'GET',
    url,
  };

  const requestKey = generateRequestKey(fullConfig);

  return new Promise<T>((resolve, reject) => {
    // 清除之前的定时器
    const existingTimer = debounceTimers.get(requestKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    if (immediate) {
      // leading 模式：立即执行
      debounceTimers.delete(requestKey);
      http
        .request(fullConfig)
        .then(resolve as any)
        .catch(reject);
    } else {
      // trailing 模式：延迟执行
      const timer = setTimeout(async () => {
        debounceTimers.delete(requestKey);
        try {
          const response = await http.request(fullConfig);
          resolve(response as T);
        } catch (error) {
          reject(error);
        }
      }, wait);
      debounceTimers.set(requestKey, timer);
    }
  });
}

/**
 * 清除指定缓存
 */
export function clearCache(url?: string): void {
  if (url) {
    // 清除指定 URL 的缓存（模糊匹配）
    const keysToDelete: string[] = [];
    cacheStore.forEach((_, key) => {
      if (key.includes(url)) {
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => cacheStore.delete(key));
  } else {
    // 清除所有缓存
    cacheStore.clear();
  }
}

/**
 * 清除指定请求的待处理状态
 */
export function clearPendingRequest(url?: string): void {
  if (url) {
    // 清除指定 URL 的请求
    const keysToDelete: string[] = [];
    pendingRequests.forEach((request, key) => {
      if (key.includes(url)) {
        request.abortController.abort();
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => pendingRequests.delete(key));
  } else {
    // 取消所有待处理的请求
    pendingRequests.forEach(request => request.abortController.abort());
    pendingRequests.clear();
  }
}

/**
 * 清除所有防抖定时器
 */
export function clearDebounceTimers(): void {
  debounceTimers.forEach(timer => clearTimeout(timer));
  debounceTimers.clear();
}

// ==================== 导出 ====================

export { http };
export default http;
