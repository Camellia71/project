/**
 * SmartPark - HTTP请求封装模块 (增强版)
 * 功能：
 * 1. 请求防抖 - 避免重复请求
 * 2. 并发请求合并 - 消除重复并发调用
 * 3. Token 注入与异常链路阻断
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

// 待处理请求的数据结构
interface PendingRequest {
  promise: Promise<AxiosResponse>; // 请求的Promise对象
  abortController: AbortController; // 用于取消请求的控制器
}

// 防抖请求状态存储: 存储正在进行的请求,用于请求合并
// key: 请求唯一标识(由URL、方法、参数组成)
// value: 请求Promise和控制器
const pendingRequests = new Map<string, PendingRequest>();

// 防抖定时器存储: 存储待执行的请求定时器
// key: 请求唯一标识
// value: setTimeout返回的定时器ID
const debounceTimers = new Map<string, ReturnType<typeof setTimeout>>();

// ==================== 工具函数 ====================

/**
 * 生成请求唯一 key(基于 URL + 参数)
 * 通过HTTP方法、URL、查询参数和请求体生成唯一标识,用于识别重复请求
 */
function generateRequestKey(config: AxiosRequestConfig): string {
  const { url, method, params, data } = config;
  // 格式: "METHOD:url?params#data"
  return `${method?.toUpperCase()}:${url}?${JSON.stringify(params || {})}#${JSON.stringify(data || {})}`;
}

// ==================== HTTP 实例创建 ====================

// 创建 Axios 实例,配置基础URL、超时时间和默认请求头
const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.smartpark.com', // 从环境变量获取API地址,如果没有则使用默认值
  timeout: 10000, // 请求超时时间: 10秒
  headers: {
    'Content-Type': 'application/json;charset=UTF-8', // 默认请求头: JSON格式
  },
});

// ==================== 请求拦截器 ====================

// 请求拦截器: 在每个请求发送前自动注入认证token
http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 从Redux store中获取用户token
    const { token } = store.getState().authSlice;
    // 如果token存在且有请求头,则添加Authorization认证头
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  // 请求错误处理
  error => {
    message.error('请求配置错误，请检查网络连接');
    return Promise.reject(error);
  }
);

// ==================== 响应拦截器 ====================

// 响应拦截器: 统一处理服务器响应,检查状态码并处理错误
http.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    // 处理401未授权: 登录过期,跳转到登录页
    if (res.code === 401 || res.code === '401') {
      message.error('登录已过期，请重新登录');
      window.location.href = '/login';
      return Promise.reject(new Error('登录已过期'));
    }

    // 处理403禁止访问: 权限不足
    if (res.code === 403 || res.code === '403') {
      message.error('您没有权限访问此资源');
      return Promise.reject(new Error('权限不足'));
    }

    // 处理500服务器错误
    if (res.code === 500 || res.code === '500') {
      message.error('服务器内部错误，请稍后重试');
      return Promise.reject(new Error('服务器内部错误'));
    }

    // 处理其他错误状态码(code既不是200也不是0表示失败)
    if (res.code !== 200 && res.code !== 0) {
      message.error(`请求失败 [${res.code}]: ${res.message || '未知错误'}`);
      return Promise.reject(new Error(res.message || '请求失败'));
    }

    // 成功响应,只返回data字段而不是整个response
    return {
      ...response,
      data: res.data,
    };
  },
  // 响应错误处理: 处理网络错误、超时等
  error => {
    // 如果请求被取消,直接返回,不显示错误消息
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // 服务器返回了错误响应
    if (error.response) {
      const status = error.response.status;
      // 定义不同HTTP状态码对应的中文错误消息
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
      // 请求已发送但没有收到响应(网络问题或超时)
      message.error('网络请求超时，请检查网络连接');
    } else {
      // 其他错误(请求配置错误)
      message.error('请求配置错误');
    }

    return Promise.reject(error);
  }
);

// ==================== 增强方法 ====================

/**
 * 带防抖的请求方法
 * 在指定时间间隔内,相同请求只会执行一次,避免频繁请求
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

  // 合并请求配置,确保有HTTP方法和URL
  const fullConfig: AxiosRequestConfig = {
    ...config,
    method: config?.method || 'GET', // 默认GET方法
    url,
  };

  // 生成请求唯一标识,用于识别重复请求
  const requestKey = generateRequestKey(fullConfig);

  return new Promise<T>((resolve, reject) => {
    // 检查是否已存在相同请求的定时器,如果有则清除(防抖核心逻辑)
    const existingTimer = debounceTimers.get(requestKey);
    if (existingTimer) {
      clearTimeout(existingTimer);
    }

    // immediate=true: 立即执行请求(leading模式)
    if (immediate) {
      debounceTimers.delete(requestKey);
      http
        .request(fullConfig)
        .then(response => resolve(response.data as T))
        .catch(reject);
    } else {
      // immediate=false: 等待指定时间后再执行(trailing模式)
      // 如果在等待期间又收到相同请求,会重置定时器
      const timer = setTimeout(async () => {
        debounceTimers.delete(requestKey); // 从定时器集合中移除
        try {
          const response = await http.request(fullConfig);
          resolve(response as T);
        } catch (error) {
          reject(error);
        }
      }, wait);
      debounceTimers.set(requestKey, timer); // 存储新定时器
    }
  });
}

/**
 * 清除指定请求的待处理状态
 * 取消正在进行的请求并从集合中移除,避免内存泄漏
 * @param url 可选,如果提供则只清除包含该URL的请求,否则清除所有请求
 */
export function clearPendingRequest(url?: string): void {
  if (url) {
    // 清除所有包含指定URL的待处理请求
    const keysToDelete: string[] = [];
    pendingRequests.forEach((request, key) => {
      if (key.includes(url)) {
        request.abortController.abort(); // 取消请求
        keysToDelete.push(key);
      }
    });
    keysToDelete.forEach(key => pendingRequests.delete(key)); // 从集合中移除
  } else {
    // 清除所有待处理请求
    pendingRequests.forEach(request => request.abortController.abort());
    pendingRequests.clear();
  }
}

/**
 * 清除所有防抖定时器
 * 在组件卸载或页面离开时调用,避免内存泄漏和无效请求
 */
export function clearDebounceTimers(): void {
  debounceTimers.forEach(timer => clearTimeout(timer)); // 清除所有定时器
  debounceTimers.clear(); // 清空集合
}

// ==================== 导出 ====================

// 导出HTTP实例,支持命名导出和默认导出
export { http };
export default http;
