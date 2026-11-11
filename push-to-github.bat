@echo off
set "PATH=%~dp0;%~dp0git\cmd;%PATH%"
echo ========================================================
echo Pushing SizzleSpoon to https://github.com/mahi09-k/KM0927.git
echo ========================================================
cd /d "%~dp0"

git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/mahi09-k/KM0927.git
git push -u origin main --force

echo.
echo ========================================================
echo Push complete!
echo ========================================================
pause
