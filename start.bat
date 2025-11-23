@echo off
title AnalyticaX Server
color 0A
echo.
echo ====================================
echo   AnalyticaX - Starting Server
echo ====================================
echo.

cd /d "%~dp0backend"

echo [1/3] Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
node --version
echo [OK] Node.js found
echo.

echo [2/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] npm install failed!
    pause
    exit /b 1
)
echo [OK] Dependencies installed
echo.

echo [3/3] Starting server...
echo.
echo ====================================
echo   Server will run on:
echo   http://localhost:5000
echo ====================================
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

call npm start

pause

