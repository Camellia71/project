import axios from 'axios';
import { message } from 'antd';
import { store } from '../../store';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://www.demo.com',
  timeout: 5000,
});

//请求拦截器
http.interceptors.request.use(config => {
  //在请求头中添加token
  const { token } = store.getState().authSlice;
  if (token) {
    //Authorization: 专门用来携带认证信息的字段
    //Bearer表示的是一种认证类型，表示后面携带的是一个token（令牌）
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

//响应拦截器
http.interceptors.response.use(response => {
  console.log('response', response);
  //判断是不是200状态码，放在这里就避免在每一个请求中都判断一次
  const res = response.data;
  if (res.code != 200) {
    message.error(res.code + ':' + res.message);
    return Promise.reject(new Error(res.message));
    //将错误抛出去，能被catch捕获
  }
  return response.data;
});
export default http;
