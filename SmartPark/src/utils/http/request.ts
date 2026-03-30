import http from './http';
interface ApiResponse {
  code: number;
  massage: string;
  data: unknown;
}
export function get(url: string, params?: unknown): Promise<ApiResponse> {
  return http.get(url, { params });
}

export function post(url: string, data?: unknown): Promise<ApiResponse> {
  return http.post(url, data);
}
