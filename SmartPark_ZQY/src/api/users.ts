/**
 * SmartPark - 用户模块API
 * 
 * 提供用户登录、菜单获取、账户列表等功能的API接口
 * 统一管理用户相关的HTTP请求
 */

import { post, get } from '../utils/http/request';

/**
 * 登录请求数据结构
 */
export interface LoginData {
  username: string;
  password: string;
}

/**
 * 账户查询参数结构
 */
export interface AccountData {
  accountName: string;
}

/**
 * 用户登录接口
 * @param data - 登录信息
 * @returns Promise<登录响应数据>
 */
export function login(data: LoginData) {
  return post('/login', data);
}

/**
 * 获取菜单列表接口
 * @returns Promise<菜单列表数据>
 */
export function getMenu() {
  return get('/menu');
}

/**
 * 获取账户列表接口
 * @param data - 查询参数
 * @returns Promise<账户列表数据>
 */
export function getAccountList(data: AccountData) {
  return post('/accountList', data);
}