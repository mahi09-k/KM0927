@echo off
setlocal
if exist "%ProgramFiles%\nodejs\npm.cmd" (
  "%ProgramFiles%\nodejs\npm.cmd" %*
  exit /b %ERRORLEVEL%
)
for /f "tokens=*" %%i in ('where npm.cmd 2^>nul') do (
  if /i not "%%~fi"=="%~f0" (
    "%%~fi" %*
    exit /b %ERRORLEVEL%
  )
)
echo [ERROR] npm is not found in PATH or standard installation.
exit /b 1
