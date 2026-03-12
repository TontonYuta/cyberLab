@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
cd /d "%~dp0"

echo ==========================================
echo    TONTONYUTA - ONE CLICK APK (ICON v6.0)
echo ==========================================

REM --------------------------------------------
REM 1. KIEM TRA DIEU KIEN
REM --------------------------------------------
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [Loi] NodeJS chua duoc cai dat tren may!
    pause
    exit /b
)

REM --------------------------------------------
REM 2. CAI THU VIEN (NODEJS & CAPACITOR & ASSETS)
REM --------------------------------------------
echo [1/7] Dang tai nguyen lieu...
call npm install
call npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/assets --save-dev

REM --------------------------------------------
REM 3. BUILD GIAO DIEN WEB
REM --------------------------------------------
echo [2/7] Dang ghep noi giao diện Web...
call npm run build

REM --------------------------------------------
REM 4. XU LY CAU HINH APP
REM --------------------------------------------
echo [3/7] Thiet lap cau hinh he thong...
if exist capacitor.config.ts del /f /q capacitor.config.ts

if not exist capacitor.config.json (
    echo.
    echo ==========================================
    echo [!] KHOI TAO APP MOI
    echo ==========================================
    set /p APP_NAME="1. Nhap ten App (VD: English Reading): "
    set /p APP_ID="2. Nhap ID (VD: com.tontonyuta.english): "

    if "!APP_NAME!"=="" set APP_NAME=TontonYuta App
    if "!APP_ID!"=="" set APP_ID=com.tontonyuta.myapp

    (
    echo {
    echo   "appId": "!APP_ID!",
    echo   "appName": "!APP_NAME!",
    echo   "webDir": "dist",
    echo   "bundledWebRuntime": false
    echo }
    ) > capacitor.config.json
    
    if exist android (
        echo Dang xoa khung Android cu de doi ten...
        rd /s /q android
    )
    echo [OK] Da ghi nhan App: !APP_NAME!
)

REM --------------------------------------------
REM 5. XU LY ICON (MOI)
REM --------------------------------------------
echo [4/7] Dang kiem tra va tao Icon...
REM Neu co file icon.png o ngoai cung, se tu dong tao icon cho Android
if exist "icon.png" (
    echo [OK] Da tim thay icon.png. Dang tu dong tao bo Icon cho Android...
    if not exist "assets" mkdir assets
    copy /y "icon.png" "assets\icon.png" >nul
    call npx capacitor-assets generate --android
) else (
    echo [!] Khong tim thay file icon.png o thu muc goc. App se dung icon mac dinh.
)

REM --------------------------------------------
REM 6. KHOI TAO ANDROID & CAP QUYEN
REM --------------------------------------------
if not exist android (
    echo [5/7] Dang dung bo khung Android...
    call npx cap add android
    
    echo [!] Dang cap quyen Internet...
    powershell -Command "$p='android\app\src\main\AndroidManifest.xml'; if (Test-Path $p) { $c=Get-Content $p; if($c -notmatch 'android.permission.INTERNET'){ $c -replace '<application', '<uses-permission android:name=\"android.permission.INTERNET\" />`n    <application' | Set-Content $p } }"
)

REM --------------------------------------------
REM 7. DONG BO & BUILD APK
REM --------------------------------------------
echo [6/7] Dong bo code vao Android...
call npx cap sync android

echo [7/7] Dang Build APK (Vui long doi)...
if exist "android\gradlew.bat" (
    cd android
    call gradlew.bat assembleDebug --daemon
    cd ..
) else (
    echo [Loi] Khong tim thay Gradle!
    pause
    exit /b
)

echo ==========================================
echo           BUILD APK HOAN TAT!
echo ==========================================

if exist "android\app\build\outputs\apk\debug" (
    start explorer "android\app\build\outputs\apk\debug"
)

pause