//这里的目的是将请求封装起来，统一管理，方便调用
import { post, get } from '../utils/http/request';

interface MenuType {
  icon: string;
  label: string;
  key: string;
  children?: MenuType[];
}

interface LoginData {
  username: string;
  password: string;
}
export function login(data: LoginData) {
  return post('/login', data);
}
export function getMenu() {
  return get<MenuType[]>('/menu');
}
