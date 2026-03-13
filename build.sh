#!/bin/bash
clear

echo "=========================================="
echo "   TONTONYUTA - ONE CLICK APK (ICON v6.0)"
echo "=========================================="

# --------------------------------------------
# 1. KIEM TRA DIEU KIEN
# --------------------------------------------
if ! command -v node &> /dev/null
then
    echo "[Loi] NodeJS chua duoc cai dat!"
    exit 1
fi

if ! command -v npm &> /dev/null
then
    echo "[Loi] npm chua duoc cai!"
    exit 1
fi

# --------------------------------------------
# 2. CAI THU VIEN
# --------------------------------------------
echo "[1/7] Dang tai thu vien..."
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/assets --save-dev

# --------------------------------------------
# 3. BUILD WEB
# --------------------------------------------
echo "[2/7] Dang build giao dien web..."
npm run build

# --------------------------------------------
# 4. CAU HINH APP
# --------------------------------------------
echo "[3/7] Thiet lap cau hinh..."

if [ -f capacitor.config.ts ]; then
    rm capacitor.config.ts
fi

if [ ! -f capacitor.config.json ]; then
    echo ""
    echo "=========================================="
    echo "[!] KHOI TAO APP MOI"
    echo "=========================================="

    read -p "1. Nhap ten App (VD: English Reading): " APP_NAME
    read -p "2. Nhap ID (VD: com.tontonyuta.english): " APP_ID

    if [ -z "$APP_NAME" ]; then
        APP_NAME="TontonYuta App"
    fi

    if [ -z "$APP_ID" ]; then
        APP_ID="com.tontonyuta.myapp"
    fi

cat > capacitor.config.json <<EOF
{
  "appId": "$APP_ID",
  "appName": "$APP_NAME",
  "webDir": "dist",
  "bundledWebRuntime": false
}
EOF

    if [ -d android ]; then
        echo "Dang xoa khung Android cu de doi ten..."
        rm -rf android
    fi

    echo "[OK] Da ghi nhan App: $APP_NAME"
fi

# --------------------------------------------
# 5. XU LY ICON
# --------------------------------------------
echo "[4/7] Dang kiem tra icon..."

if [ -f icon.png ]; then
    echo "[OK] Tim thay icon.png, dang tao icon Android..."

    mkdir -p assets
    cp icon.png assets/icon.png

    npx capacitor-assets generate --android
else
    echo "[!] Khong tim thay icon.png, dung icon mac dinh."
fi

# --------------------------------------------
# 6. KHOI TAO ANDROID
# --------------------------------------------
if [ ! -d android ]; then
    echo "[5/7] Dang tao khung Android..."

    npx cap add android

    echo "[!] Dang them quyen Internet..."

    MANIFEST="android/app/src/main/AndroidManifest.xml"

    if [ -f "$MANIFEST" ]; then
        if ! grep -q "android.permission.INTERNET" "$MANIFEST"; then
            sed -i 's/<application/<uses-permission android:name="android.permission.INTERNET" \/>\n    <application/' "$MANIFEST"
        fi
    fi
fi

# --------------------------------------------
# 7. SYNC & BUILD APK
# --------------------------------------------
echo "[6/7] Dong bo code vao Android..."
npx cap sync android

echo "[7/7] Dang build APK..."

if [ -f android/gradlew ]; then
    cd android
    chmod +x gradlew
    ./gradlew assembleDebug --daemon
    cd ..
else
    echo "[Loi] Khong tim thay Gradle!"
    exit 1
fi

echo "=========================================="
echo "        BUILD APK HOAN TAT!"
echo "=========================================="

APK_PATH="android/app/build/outputs/apk/debug"

if [ -d "$APK_PATH" ]; then
    echo "APK nam tai:"
    echo "$APK_PATH"
fi

read -p "Nhan Enter de thoat..."
