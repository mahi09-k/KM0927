@echo off
title SizzleSpoon Database Seeder
cd /d "%~dp0server"
echo ========================================================
echo 🌱 Seeding SizzleSpoon MySQL Database with realistic recipes
echo ========================================================
if exist "%ProgramFiles%\nodejs\node.exe" (
  "%ProgramFiles%\nodejs\node.exe" database/seed.js
) else (
  node database/seed.js
)
pause
