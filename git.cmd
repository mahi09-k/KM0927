@echo off
setlocal
if exist "%~dp0git\cmd\git.exe" (
  "%~dp0git\cmd\git.exe" %*
  exit /b %ERRORLEVEL%
)
if exist "%ProgramFiles%\Git\cmd\git.exe" (
  "%ProgramFiles%\Git\cmd\git.exe" %*
  exit /b %ERRORLEVEL%
)
for /f "tokens=*" %%i in ('where git.exe 2^>nul') do (
  if /i not "%%~fi"=="%~f0" (
    "%%~fi" %*
    exit /b %ERRORLEVEL%
  )
)
echo [ERROR] git is not found in local bundle or standard installation.
exit /b 1
