@echo off
echo ========================================================
echo Pushing SizzleSpoon to https://github.com/mahi09-k/KM0927.git
echo ========================================================
cd /d "%~dp0"

git init
git add .
git commit -m "Deploy SizzleSpoon 2.0 to Vercel"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/mahi09-k/KM0927.git
git push -u origin main --force

echo.
echo ========================================================
echo Done! Now open https://vercel.com to import and deploy.
echo ========================================================
pause
