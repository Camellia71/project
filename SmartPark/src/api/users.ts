//这里的目的是将请求封装起来，统一管理，方便调用
import { post } from '../utils/http/request';

interface LoginData {
  username: string;
  password: string;
}
export function login(data: LoginData) {
  return post('/login', data);
}
