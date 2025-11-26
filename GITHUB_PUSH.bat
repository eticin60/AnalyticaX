@echo off
echo ====================================
echo   AnalyticaX - GitHub'a Yükleme
echo ====================================
echo.

cd /d "%~dp0"

echo [1/5] Git repository başlatılıyor...
git init
if %errorlevel% neq 0 (
    echo ERROR: Git yüklü değil!
    echo Git'i yüklemek için: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo.
echo [2/5] Dosyalar ekleniyor...
git add .

echo.
echo [3/5] İlk commit yapılıyor...
git commit -m "Initial commit: AnalyticaX AI Chart Analysis Platform"
if %errorlevel% neq 0 (
    echo.
    echo UYARI: Commit yapılamadı. Belki zaten commit edilmiş?
)

echo.
echo [4/5] GitHub repository URL'i gerekli!
echo.
echo Lütfen GitHub'da bir repository oluşturun:
echo 1. https://github.com adresine gidin
echo 2. Sağ üstte "+" butonuna tıklayın
echo 3. "New repository" seçin
echo 4. Repository adı: AnalyticaX
echo 5. "Create repository" tıklayın
echo.
echo Sonra şu komutu çalıştırın (YOUR_USERNAME yerine kendi kullanıcı adınızı yazın):
echo.
echo   git remote add origin https://github.com/YOUR_USERNAME/AnalyticaX.git
echo   git branch -M main
echo   git push -u origin main
echo.
echo VEYA bu script'i çalıştırdıktan sonra manuel olarak yapabilirsiniz.
echo.

pause




