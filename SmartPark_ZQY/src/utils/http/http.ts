/**
 * SmartPark - HTTP请求封装模块
 */

import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { message } from 'antd';
import { store } from '../../store';

const http: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.smartpark.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

http.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;

    if (res.code === 401) {
      message.error('登录已过期，请重新登录');
      return Promise.reject(new Error('登录已过期'));
    }

    if (res.code === 403) {
      message.error('您没有权限访问此资源');
      return Promise.reject(new Error('权限不足'));
    }

    if (res.code !== 200) {
      message.error(`请求失败 [${res.code}]: ${res.message || '未知错误'}`);
      return Promise.reject(new Error(res.message || '请求失败'));
    }

    return {
      ...response,
      data: res.data,
    };
  },
  error => {
    if (error.response) {
      const status = error.response.status;
      const errorMessages: Record<number, string> = {
        404: '请求的资源不存在',
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

export default http;
