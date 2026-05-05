//新建一个RequireAuth函数，用于判断是否需要登录：
//1.如果已经登录，只能通过退出登录的方式返回到登录页（退出Home页面）
//2.如果未登录，只能通过输入用户名和密码登录，而不能直接输入"/"或"/login"进行跳转
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
//判断是否登录的方式：token是否存在
interface Iprops {
  allowed: boolean;
  redirectTo: string;
  children: React.ReactNode;
}
function RequireAuth({ allowed, redirectTo, children }: Iprops) {
  const navigate = useNavigate();
  const token = useSelector((state: { authSlice: { token: string | null } }) => state.authSlice.token);
  const isLogin = token ? true : false;
  //allowed表示当前路由是否需要登录，isLogin表示用户是否登录
  useEffect(() => {
    if (allowed !== isLogin) {
      navigate(redirectTo);
    }
  }, [allowed, isLogin, navigate, redirectTo]);

  return allowed === isLogin ? <>{children}</> : null; //给children套一个<></>,就是JSX语法
}
export default RequireAuth;
