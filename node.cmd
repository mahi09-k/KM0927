@echo off
setlocal
if exist "%ProgramFiles%\nodejs\node.exe" (
  "%ProgramFiles%\nodejs\node.exe" %*
  exit /b %ERRORLEVEL%
)
for /f "tokens=*" %%i in ('where node.exe 2^>nul') do (
  if /i not "%%~fi"=="%~f0" (
    "%%~fi" %*
    exit /b %ERRORLEVEL%
  )
)
where agy-node >nul 2>nul
if %ERRORLEVEL% equ 0 (
  agy-node %*
  exit /b %ERRORLEVEL%
)
echo [ERROR] node is not found in PATH or standard installation.
exit /b 1
