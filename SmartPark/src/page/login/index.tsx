import './index.scss';
import logo from '../../assets/logo.png';
import bg from '../../assets/bg.jpg';
import lgbg from '../../assets/lgbg.jpg';
import { Button, Form, Input } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
// import http from "../../utils/http/http";
//这里就不用import http了，直接调用api/users中的login函数即可
import { login } from '../../api/users';
import {setToken} from '../../store/login/authSlice'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {useState} from 'react'
function Login() {
  const [form] = Form.useForm();
  const [loading,setLoading]=useState<boolean>(false)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogin = () => {
    form
      .validateFields()
      .then(async res => {
        setLoading(true)
        // 登录请求
        const response = await login(res);  
        setLoading(false)
        //加一个类型断言，因为login返回的是一个Promise对象，而Promise对象没有data属性，所以要加一个类型断言，
        // 把Promise对象转换为一个对象，对象有data属性，data属性是一个对象，对象有token属性，token属性是一个字符串
        const token = (response as { data: { token: string } }).data.token;
        dispatch(setToken(token))
        navigate('/',{replace:true})  //跳转到首页,
        // 加一个参数replace:true，就不能直接点返回就回到首页了(本质是修改浏览器历史记录，而不是添加新的历史记录)
      })
      .catch(err => {
        setLoading(false)
        console.log(err);
      });
  };
  return (
    <div className="login" style={{ backgroundImage: `url(${bg})` }}>
      <div className="lgbg" style={{ backgroundImage: `url(${lgbg})` }}>
        <div className="part">
          <div className="title">
            <div className="logo">
              <img src={logo} width={120} height={100} />
            </div>
            <h1>鹏远智慧园区登录平台</h1>
          </div>
          <Form form={form}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '用户名不能为空' },
                {
                  pattern: /^\w{4,8}$/,
                  message: '用户名只能包含字母、数字和下划线，长度为4-8位',
                },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="请输入您的用户名" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: '密码不能为空' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="请输入您的密码"
              />
            </Form.Item>
            <Form.Item label={null}>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={handleLogin}
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Login;
