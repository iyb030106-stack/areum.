#!/bin/bash
# GitHub에 푸시하는 스크립트
# Git Bash에서 실행하세요

echo "=== GitHub 푸시 스크립트 ==="

# 프로젝트 디렉토리로 이동
cd "/c/Users/dladu/OneDrive/바탕 화면/IM/areum"

# 현재 디렉토리 확인
echo "현재 디렉토리: $(pwd)"

# 프로젝트 파일 확인
if [ ! -f "package.json" ]; then
    echo "오류: package.json을 찾을 수 없습니다."
    exit 1
fi

# Git 초기화 (이미 있으면 스킵)
if [ ! -d ".git" ]; then
    echo "Git 저장소 초기화 중..."
    git init
    git remote add origin https://github.com/iyb030106-stack/areum.git
fi

# 원격 저장소 확인
echo ""
echo "원격 저장소 확인 중..."
git remote -v

# 원격 브랜치 가져오기
echo ""
echo "원격 브랜치 가져오기..."
git fetch origin

# main 브랜치로 체크아웃 또는 생성
current_branch=$(git branch --show-current 2>/dev/null || echo "")
if [ -z "$current_branch" ] || [ "$current_branch" != "main" ]; then
    if git branch | grep -q "master"; then
        echo "master 브랜치를 main으로 변경..."
        git branch -M main
    else
        echo "main 브랜치 생성 중..."
        git checkout -b main 2>/dev/null || git checkout main
    fi
else
    git checkout main
fi

# 원격 main과 병합 시도
echo ""
echo "원격 main 브랜치와 병합 시도..."
git pull origin main --allow-unrelated-histories --no-edit 2>&1 || echo "병합 완료 또는 충돌 없음"

# 변경사항 추가
echo ""
echo "변경사항 추가 중..."
git add .

# 변경사항 확인
status=$(git status --short)
if [ -n "$status" ]; then
    echo ""
    echo "추가된 파일:"
    git status --short
    
    # 커밋
    echo ""
    echo "커밋 중..."
    git commit -m "배포 준비: 프로젝트 파일 업데이트"
    
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
    fi
else
    echo ""
    echo "변경사항이 없습니다."
fi

echo ""
echo "=== 완료 ==="
