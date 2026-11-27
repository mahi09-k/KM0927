@echo off
title SizzleSpoon Frontend Client
cd /d "%~dp0client"
echo ========================================================
echo 🚀 Starting SizzleSpoon Vite Client on http://localhost:5173
echo ========================================================
if exist "%ProgramFiles%\nodejs\npm.cmd" (
  call "%ProgramFiles%\nodejs\npm.cmd" run dev
) else (
  call npm run dev
)
pause
