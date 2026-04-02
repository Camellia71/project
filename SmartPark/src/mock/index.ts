import Mock from 'mockjs';
Mock.setup({
  timeout: '200-600',
});
Mock.mock('https://www.demo.com/login', 'post', options => {
  const { username, password } = JSON.parse(options.body);
  console.log(username, password);
  if (username === 'admin' && password === 'admin123123') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        username: '张岐奕',
        token: 'mocktoken123456admin',
        // 只有第一次去登录才会返回token，后续请求都需要携带token；第一次不携带token，
      },
    };
  } else if (username === 'manager' && password === 'manager123123') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        username: 'manager',
        token: 'mocktoken123456manager',
        // 只有第一次去登录才会返回token，后续请求都需要携带token；第一次不携带token
      },
    };
  } else if (username === 'user' && password === 'user123123') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        username: 'user',
        token: 'mocktoken123456user',
        // 只有第一次去登录才会返回token，后续请求都需要携带token；第一次不携带token
      },
    };
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
      data: '',
    };
  }
});
