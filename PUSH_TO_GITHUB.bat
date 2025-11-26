@echo off
echo ====================================
echo   AnalyticaX - GitHub'a Push
echo ====================================
echo.

cd /d "%~dp0"

echo GitHub kullanıcı adınızı girin (örnek: onurcandemir):
set /p GITHUB_USER="GitHub Username: "

if "%GITHUB_USER%"=="" (
    echo HATA: GitHub kullanıcı adı girilmedi!
    pause
    exit /b 1
)

echo.
echo [1/3] Remote repository ekleniyor...
git remote remove origin 2>nul
git remote add origin https://github.com/%GITHUB_USER%/AnalyticaX.git

if %errorlevel% neq 0 (
    echo HATA: Remote eklenemedi!
    pause
    exit /b 1
)

echo.
echo [2/3] Branch main olarak ayarlanıyor...
git branch -M main

echo.
echo [3/3] GitHub'a push ediliyor...
echo.
echo NOT: Eğer ilk kez push ediyorsanız, GitHub kullanıcı adı ve şifre (veya Personal Access Token) isteyebilir.
echo.
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ====================================
    echo   ✅ BAŞARILI!
    echo ====================================
    echo.
    echo Projeniz GitHub'da yayında:
    echo https://github.com/%GITHUB_USER%/AnalyticaX
    echo.
) else (
    echo.
    echo ====================================
    echo   ❌ HATA!
    echo ====================================
    echo.
    echo Push başarısız oldu. Olası nedenler:
    echo - GitHub kullanıcı adı/şifre yanlış
    echo - Personal Access Token gerekli (Settings ^> Developer settings ^> Personal access tokens)
    echo - Repository henüz oluşturulmamış
    echo.
)

pause




