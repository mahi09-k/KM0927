@echo off
title Install SizzleSpoon Dependencies
cd /d "%~dp0"
echo ========================================================
echo 📦 Installing SizzleSpoon Server and Client Dependencies
echo ========================================================

if exist "%ProgramFiles%\nodejs\npm.cmd" (
  set "NPM_CMD=%ProgramFiles%\nodejs\npm.cmd"
) else (
  set "NPM_CMD=npm"
)

echo.
echo [1/2] Installing Server dependencies...
cd /d "%~dp0server"
call "%NPM_CMD%" install

echo.
echo [2/2] Installing Client dependencies...
cd /d "%~dp0client"
call "%NPM_CMD%" install

cd /d "%~dp0"
echo.
echo ========================================================
echo ✅ All dependencies installed successfully!
echo ========================================================
pause
