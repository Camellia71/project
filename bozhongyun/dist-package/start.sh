#!/bin/bash

# 启动短信服务平台

echo "正在启动短信服务平台..."
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "错误: 未安装 Node.js，请先安装 Node.js 18+"
    exit 1
fi

# 启动 Express 后端服务 (端口 3001)
echo "启动后端服务 (端口 3001)..."
cd "$(dirname "$0")/server"
node index.js &
SERVER_PID=$!

# 等待后端启动
sleep 2

# 启动 Next.js 前端服务 (端口 3000)
echo "启动前端服务 (端口 3000)..."
cd "$(dirname "$0")"
node server.js &
NEXT_PID=$!

echo ""
echo "=========================================="
echo "服务已启动！"
echo "前端地址: http://localhost:3000"
echo "后端地址: http://localhost:3001"
echo "=========================================="
echo ""
echo "按 Ctrl+C 停止服务"

# 等待进程退出
trap "kill $SERVER_PID $NEXT_PID 2>/dev/null; exit" SIGINT SIGTERM
wait
