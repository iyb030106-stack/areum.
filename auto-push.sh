#!/bin/bash
# 자동 Git 푸시 스크립트

cd "/c/Users/dladu/OneDrive/바탕 화면/IM/areum" || exit 1

echo "=== 자동 Git 푸시 시작 ==="
echo "현재 디렉토리: $(pwd)"

# Git 상태 확인
echo ""
echo "Git 상태 확인 중..."
git status --short

# 모든 변경사항 추가
echo ""
echo "변경사항 추가 중..."
git add .

# 변경사항 확인
CHANGES=$(git status --short)
if [ -z "$CHANGES" ]; then
    echo ""
    echo "변경사항이 없습니다."
    exit 0
fi

# 커밋
echo ""
echo "커밋 중..."
git commit -m "관리자 기능 개선: 비회원 접속 기록 추적, 상품 수정 기능 강화 (자동 커밋)"

# 푸시
echo ""
echo "GitHub에 푸시 중..."
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✓ 성공적으로 푸시되었습니다!"
    echo "저장소: https://github.com/iyb030106-stack/areum"
else
    echo ""
    echo "✗ 푸시 중 오류가 발생했습니다."
    exit 1
fi

echo ""
echo "=== 완료 ==="
