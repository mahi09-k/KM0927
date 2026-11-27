@echo off
setlocal
if exist "%ProgramFiles%\nodejs\npx.cmd" (
  "%ProgramFiles%\nodejs\npx.cmd" %*
  exit /b %ERRORLEVEL%
)
for /f "tokens=*" %%i in ('where npx.cmd 2^>nul') do (
  if /i not "%%~fi"=="%~f0" (
    "%%~fi" %*
    exit /b %ERRORLEVEL%
  )
)
echo [ERROR] npx is not found in PATH or standard installation.
exit /b 1
