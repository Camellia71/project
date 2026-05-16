/**
 * SmartPark - HTTP请求方法封装
 *
 * GET 请求缓存策略（类 HTTP 缓存机制）：
 * - staleTime: 数据在 staleTime 内视为新鲜，直接返回缓存
 * - gcTime: 数据失效后缓存保留时间，过期后垃圾回收
 * - 相同 URL + 参数的请求自动复用缓存
 * - 写操作后调用 invalidateGet 使相关缓存失效
 */

import { queryClient } from '../queryClient';
import http, {
  debouncedRequest,
  clearPendingRequest,
  clearDebounceTimers,
} from './http';

export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

function buildQueryKey(url: string, params?: unknown): string[] {
  return params ? [url, JSON.stringify(params)] : [url];
}

export function get<T = unknown>(url: string, params?: unknown): Promise<T> {
  return http.get(url, { params });
}

export async function cachedGet<T = unknown>(
  url: string,
  params?: unknown
): Promise<T> {
  const queryKey = buildQueryKey(url, params);

  const cached = queryClient.getQueryData<T>(queryKey);
  if (cached !== undefined) {
    return cached;
  }

  const data = await http.get<T>(url, { params });
  const result = (data as { data: T }).data ?? data;
  queryClient.setQueryData(queryKey, result as T);
  return result as T;
}

export function invalidateGet(url: string, params?: unknown): void {
  const queryKey = buildQueryKey(url, params);
  queryClient.invalidateQueries({ queryKey, exact: true });
}

export function invalidateGetByUrlPrefix(prefix: string): void {
  queryClient.invalidateQueries({
    predicate: query => {
      const key = query.queryKey[0];
      return typeof key === 'string' && key.startsWith(prefix);
    },
  });
}

export function getCacheData<T = unknown>(
  url: string,
  params?: unknown
): T | undefined {
  return queryClient.getQueryData<T>(buildQueryKey(url, params));
}

export function setCacheData<T = unknown>(
  url: string,
  params: unknown,
  data: T
): void {
  queryClient.setQueryData(buildQueryKey(url, params), data);
}

export function removeCacheData(url: string, params?: unknown): void {
  queryClient.removeQueries({
    queryKey: buildQueryKey(url, params),
    exact: true,
  });
}

export function post<T = unknown>(url: string, data?: unknown): Promise<T> {
  return http.post(url, data);
}

export function put<T = unknown>(url: string, data?: unknown): Promise<T> {
  return http.put(url, data);
}

export function del<T = unknown>(url: string, params?: unknown): Promise<T> {
  return http.delete(url, { params });
}

export function patch<T = unknown>(url: string, data?: unknown): Promise<T> {
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
    onUploadProgress: progressEvent => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
        onProgress(progress);
      }
    },
  });
}

// ==================== 增强方法导出 ====================

export { debouncedRequest, clearPendingRequest, clearDebounceTimers };
