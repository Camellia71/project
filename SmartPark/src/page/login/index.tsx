import './index.scss'
import logo from "../../assets/logo.png"
import bg from "../../assets/bg.jpg"
import lgbg from "../../assets/lgbg.jpg"
import { Button, Form, Input } from 'antd';
function Login() {
    return (
        <div className="login" style={{backgroundImage:`url(${bg})`}}> 
        <div className="lgbg" style={{backgroundImage:`url(${lgbg})`}}>
            <div className="part">
                <div className="title">
                    <div className="logo">
                        <img src={logo} width={120} height={100} />
                    </div>
                    <h1>鹏远智慧园区登录平台</h1>
                </div>
        <Form>
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item label={null}>
      <Button >
        Submit
      </Button>
    </Form.Item>
  </Form>
            </div>
        </div>
        </div>
    )
}
export default Login
