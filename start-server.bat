@echo off
title SizzleSpoon Backend Server
cd /d "%~dp0server"
echo 🍳 Starting SizzleSpoon Server on http://localhost:5001 ...
agy-node index.js
pause
