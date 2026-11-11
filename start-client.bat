@echo off
title SizzleSpoon Frontend Client
cd /d "%~dp0client"
set PATH=%~dp0;%PATH%
echo 🚀 Starting SizzleSpoon Vite Client on http://localhost:5173 ...
call ..\npm.cmd run dev
pause
