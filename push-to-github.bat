@echo off
title Push SizzleSpoon to GitHub
cd /d "%~dp0"
echo ========================================================
echo Pushing SizzleSpoon to https://github.com/mahi09-k/KM0927.git
echo ========================================================

if exist "%~dp0git\cmd\git.exe" (
  set "GIT_EXE=%~dp0git\cmd\git.exe"
) else if exist "%ProgramFiles%\Git\cmd\git.exe" (
  set "GIT_EXE=%ProgramFiles%\Git\cmd\git.exe"
) else (
  set "GIT_EXE=git"
)

"%GIT_EXE%" branch -M main
"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin https://github.com/mahi09-k/KM0927.git
"%GIT_EXE%" push -u origin main --force

echo.
echo ========================================================
echo Push complete!
echo ========================================================
pause
