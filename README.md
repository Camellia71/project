# 网络请求
### OSI七层模型
![](assets/17760911839560.jpg)
物理层传输比特流，单位是bit；
数据链路层进行逻辑连接，进行硬件地址寻址等，由底层网络协议组成，将比特币组合成字节进而组合成帧，用MAC地址访问介质（MAC地址：每个网卡的唯一标识）；
网络层：依靠IP地址进行相互通信，使用IP地址来唯一标识互联网上的设备；路由（在同一个网络的内部通信不需要网络层设备，对不同网络层之间需要借助路由器等三层设备）
传输层：定义端口号，拥有TCP，UDP两个协议
会话层：是发送方和接收方进行通信时产生连接的地方，定义了一种机制，允许两方启动或者停止对话，以及当双方发生拥塞时仍能保持对话；包含了一种称为检查点（Checkpoint）的机制来维持可靠对话，检查点定义了一个最接近成功通信的点，并且定义了当发生内容丢失或者损坏时需要回滚以便修复丢失或者损坏的点，即断点下载的原理，这一层常被称为报文；
表示层：在数据发送前进行加密，接受时进行解码；
应用层：Ajax调接口发送http请求，webSocket长连接，SSH协议等，报文；
### TCP三次握手与四次挥手
```
seq：随机生成的序列号
ack：确认号，ack=seq+1
ACK：确定序列号有效
SYN：发起新连接
FIN：完成
```
三次握手流程：客户端发送SYN建立连接，发送Seq到服务端；服务端接收这个Seq并定义Ack=Seq（客户端传过来的）+1，同时产生一个新的Seq；客户端通过算法获得第一次发送给服务端的Seq并使Seq（新）=Seq+1，Ack=Seq（服务端传过来的）+1；以此来判断是否连接正确
![](assets/17761599325658.jpg)

四次挥手流程：两方都可以发出，下面以客户端发出为例：
首先客户端发送FIN请求和seq=u值，进入WAIT_1状态；服务端接收到后产生ack=seq（u）+1，发送给客户端，客户端进入WAIT_2状态，服务端进入WAIT状态，剩余的未完成的请求会在这个时候全部完成；服务端产生seq（服务端）=w，发送ack=seq（u）+1；客户端接收到并进入超时等待状态，这里的超时等待可以避免服务端一直没有关闭服务的情况，发送seq=u+1，ack=w+1到服务端，此时服务端再close；
![](assets/17761604787907.jpg)
### URL
```
http：//www.server.com/dir1/file1.html
http:访问协议
www.server.com：服务器名称（域名）
dir1/file1.html：请求文件（资源）的路径
```
DNS：把IP和域名做了映射，方便我们通过服务器来找到对应的IP，获取资源
DNS的访问顺序是
1.先从本地缓存中查找（浏览器缓存，而后操作系统缓存）；
如果本地没有缓存，系统会将查询请求发送到本地配置的DNS服务器，此后的查询任务完全委托给这台递归解析器：
2.根域名服务器，
3.顶级域名服务器，
4.权威域名服务器
出现options预检请求的方式：
1.跨域问题
2.自定义请求
触发回流与重绘：
回流是RenderTree中的部分元素或者全部元素的尺寸，结构或者摩羯属性发生改变时，浏览器重新渲染部分或者全部文档的过程
重绘是当页面中元素样式的改变不影响他在文档流中的位置时，浏览器会重新将样式赋予元素并重新绘制它
所以回流一定引起重绘，重绘不一定引起回流
![](assets/17761626610383.jpg)
### CDN内容分发网络
CDN的全称是Content Delivery Network，即内容分发网络。由于CDN是为加快网络访问速度而被优化的网络覆盖层，因此被形象地称为“网络加速器”。
CDN可以加快用户访问网络资源的速度和稳定性，减轻源服务器的访问压力。
实现方法： 通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接和负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上，加快访问速度。
### 跨域+解决办法
出于浏览器的同源策略（请求的时候拥有相同的协议，域名，端口，只要有一个不同就属于跨域）限制，浏览器会拒绝跨域请求；
1.前后端协商jsonp
服务端 Node.js
```js
// server.js
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/api/data') {
    const { callback } = parsedUrl.query;
    
    // 要返回的数据
    const data = { 
      name: '张三', 
      age: 25, 
      city: '北京' 
    };
    
    // JSONP核心：用回调函数包裹JSON数据
    const jsonpResponse = `${callback}(${JSON.stringify(data)})`;
    
    res.writeHead(200, { 
      'Content-Type': 'application/javascript',
      'Access-Control-Allow-Origin': '*' // 实际JSONP不需要这个
    });
    res.end(jsonpResponse);
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('JSONP服务器运行在 http://localhost:3000');
});
```
前端
```html
<!DOCTYPE html>
<html>
<head>
    <title>JSONP示例</title>
</head>
<body>
    <button onclick="fetchData()">获取数据</button>
    <div id="result"></div>

    <script>
        // 全局回调函数
        function handleResponse(data) {
            document.getElementById('result').innerHTML = `
                <p>姓名: ${data.name}</p>
                <p>年龄: ${data.age}</p>
                <p>城市: ${data.city}</p>
            `;
            console.log('收到数据:', data);
        }
        
        // JSONP请求函数
        function fetchData() {
            // 创建script标签
            const script = document.createElement('script');
            
            // 设置src，包含回调函数名
            script.src = 'http://localhost:3000/api/data?callback=handleResponse';
            
            // 添加到DOM中（此时浏览器会自动请求并执行返回的JS代码）
            document.body.appendChild(script);
            
            // 请求完成后移除script标签
            script.onload = function() {
                document.body.removeChild(script);
            };
        }
    </script>
</body>
</html>
```
2.前端解决，使用代理dev
配置proxy,只对开发环境有效
```ts
//vite.config.ts
import {defineConfig} from 'vite'
export default defineConfig({
    server:{
        proxy:{
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true,
            }
        }
    }
})
```
3.后端解决，设置请求头
```js
// 安装cors中间件：npm install cors
const express = require('express');
const cors = require('cors'); // 引入cors包
const app = express();

// 方法A：全局启用，允许所有来源（最简单，适合开发）
app.use(cors()); // 默认配置：允许所有来源、所有方法

// 方法B：自定义配置（推荐用于生产）
const corsOptions = {
  origin: 'http://localhost:3000', // 允许的前端域名
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的HTTP方法
  allowedHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
  credentials: true, // 允许发送Cookie
  maxAge: 86400 // 预检请求缓存时间(秒)
};
app.use(cors(corsOptions));

// 方法C：针对单个路由启用
app.get('/api/data', cors(corsOptions), (req, res) => {
  res.json({ message: '允许跨域的数据' });
});

// 方法D：手动设置响应头（不依赖中间件）
app.get('/api/manual', (req, res) => {
  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.json({ message: '手动设置CORS头' });
});

app.listen(3001, () => console.log('Server running on port 3001'));
```
4.运维端解决，nginx代理
安装nginx之后配置location
```nginx
# 在 nginx.conf 或站点配置中
server {
    listen 80;
    server_name api.example.com;
    
    location / {
        # 处理预检请求 (OPTIONS)
        if ($request_method = 'OPTIONS') {
            add_header 'Access-Control-Allow-Origin' 'https://frontend.example.com';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
            add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Max-Age' 1728000; # 20天缓存
            add_header 'Content-Type' 'text/plain; charset=utf-8';
            add_header 'Content-Length' 0;
            return 204; # 空响应
        }
        
        # 处理实际请求
        add_header 'Access-Control-Allow-Origin' 'https://frontend.example.com' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
        add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization' always;
        add_header 'Access-Control-Allow-Credentials' 'true' always;
        
        # 代理到后端应用
        proxy_pass http://backend_server;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
### Ajax

# project
## SmartPark
### 1.项目环境配置
本项目使用vite脚手架，react-ts编程，我们先安装好脚手架
![](assets/17744252508707.jpg)
```
生产依赖与开发依赖：
1.生产依赖：是指在项目上线时需要用到的依赖，写在dependencies中
2.开发依赖：是指在本地开发时使用，项目上线时不需要的依赖
```
路由配置：react-router-dom
![](assets/17744255329033.jpg)
UI组件库安装：antd
![](assets/17744257131719.jpg)
在dependencies中看到下方内容即安装完成
![](assets/17744257691857.jpg)
模拟后端接口：mockjs
优点：调用方式与真实的后端接口完全相同，是纯前端项目的好搭子
安装：
![](assets/17747035539170.jpg)
前后端交流的工具：Axios
Axios是一个基于Promise封装的http库，可以用于浏览器和node.js中，其实就是通过Promise实现对Ajax技术的一种封装
![](assets/17747036339669.jpg)
### 2.login页面


接口请求数据检查
![](assets/17747957807672.jpg)


浏览器历史记录栈
浏览器维护着一个历史记录栈（history stack），记录用户访问过的页面：
```tsx
访问顺序: 登录页 → 主页
历史记录栈: [登录页, 主页]  ← 当前位于主页
```
可以按"返回"按钮回到登录页
当使用 replace: true时：
```tsx
// 假设当前在登录页，用户登录成功后
navigate('/', { replace: true });

// 效果：
// 历史记录栈: [主页]  ← 用主页"替换"了登录页
// 而不是：[登录页, 主页]
```