@echo off
title SizzleSpoon Database Seeder
cd /d "%~dp0server"
echo 🌱 Seeding SizzleSpoon MySQL Database with realistic recipes ...
agy-node database/seed.js
pause
