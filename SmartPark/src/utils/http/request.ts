import http from './http';
interface ApiResponse<T = unknown> {
  code: number;
  massage: string;
  data: T;
}
export function get<T = unknown>(url: string, params?: unknown): Promise<ApiResponse<T>> {
  return http.get(url, { params });
}

export function post<T = unknown>(url: string, data?: unknown): Promise<ApiResponse<T>> {
  return http.post(url, data);
}
