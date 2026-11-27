@echo off
title SizzleSpoon Backend Server
cd /d "%~dp0server"
echo ========================================================
echo 🍳 Starting SizzleSpoon Server on http://localhost:5001
echo ========================================================
if exist "%ProgramFiles%\nodejs\node.exe" (
  "%ProgramFiles%\nodejs\node.exe" index.js
) else (
  node index.js
)
pause
