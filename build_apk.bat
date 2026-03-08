@echo off
echo ==========================================
echo    TONTONYUTA - AUTO BUILD ANDROID APK
echo ==========================================

echo [1/4] Dang xoa thu muc build cu...
if exist dist rmdir /s /q dist

echo [2/4] Dang build tai nguyen Web (Vite)...
call npm run build

echo [3/4] Dang dong bo vao Capacitor...
call npx cap copy

echo [4/4] Dang xuat file APK Debug...
cd android
call .\gradlew assembleDebug
cd ..

echo ==========================================
echo    BUILD THANH CONG! 
echo    Dang mo thu muc chua file APK...
echo ==========================================
start explorer "android\app\build\outputs\apk\debug"
pause