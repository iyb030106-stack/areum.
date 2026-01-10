@echo off
chcp 65001 >nul
cd /d "C:\Users\dladu\OneDrive\바탕 화면\IM\areum"
echo === Git 푸시 시작 ===
echo.
git add .
echo.
git commit -m "상품 관리 개선: 모든 카테고리 필터링 및 수정 기능"
echo.
git push origin main
echo.
echo === 완료 ===
pause
