@echo off
chcp 65001 >nul
echo 正在启动短信服务平台...
echo.

cd /d "%~dp0"

echo 启动后端服务 (端口 3001)...
start "SMS Server" cmd /k "cd server && node index.js"

timeout /t 2 /nobreak >nul

echo 启动前端服务 (端口 3000)...
start "SMS Frontend" cmd /k "node server.js"

echo.
echo ==========================================
echo 服务已启动！
echo 前端地址: http://localhost:3000
echo 后端地址: http://localhost:3001
echo ==========================================
echo.
echo 关闭此窗口会停止服务
pause
