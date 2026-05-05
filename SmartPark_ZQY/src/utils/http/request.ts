/**
 * SmartPark - HTTP请求方法封装
 */

import http from './http';

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

export function get<T = unknown>(url: string, params?: any): Promise<T> {
  return http.get(url, { params });
}

export function post<T = unknown>(url: string, data?: any): Promise<T> {
  return http.post(url, data);
}

export function put<T = unknown>(url: string, data?: any): Promise<T> {
  return http.put(url, data);
}

export function del<T = unknown>(url: string, params?: any): Promise<T> {
  return http.delete(url, { params });
}

export function patch<T = unknown>(url: string, data?: any): Promise<T> {
  return http.patch(url, data);
}

export function upload<T = unknown>(
  url: string,
  formData: FormData,
  onProgress?: (progress: number) => void
): Promise<T> {
  return http.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
        onProgress(progress);
      }
    },
  });
}