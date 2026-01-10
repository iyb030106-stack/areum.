# GitHub에 푸시하는 스크립트
# 이 스크립트는 프로젝트 디렉토리에서 실행해야 합니다

Write-Host "=== GitHub 푸시 스크립트 ===" -ForegroundColor Green

# 현재 디렉토리 확인
$currentDir = Get-Location
Write-Host "현재 디렉토리: $currentDir" -ForegroundColor Yellow

# 프로젝트 파일 확인
if (-not (Test-Path "package.json")) {
    Write-Host "오류: package.json을 찾을 수 없습니다. 프로젝트 디렉토리에서 실행해주세요." -ForegroundColor Red
    exit 1
}

# Git 초기화 (이미 있으면 스킵)
if (-not (Test-Path ".\.git")) {
    Write-Host "Git 저장소 초기화 중..." -ForegroundColor Yellow
    git init
    git remote add origin https://github.com/iyb030106-stack/areum.git
}

# 원격 저장소 확인
Write-Host "`n원격 저장소 확인 중..." -ForegroundColor Yellow
git remote -v

# 원격 브랜치 가져오기
Write-Host "`n원격 브랜치 가져오기..." -ForegroundColor Yellow
git fetch origin

# main 브랜치로 체크아웃 또는 생성
$branches = git branch
if ($branches -notmatch "main") {
    if ($branches -match "master") {
        Write-Host "master 브랜치를 main으로 변경..." -ForegroundColor Yellow
        git branch -M main
    } else {
        Write-Host "main 브랜치 생성 중..." -ForegroundColor Yellow
        git checkout -b main
    }
} else {
    git checkout main
}

# 원격 main과 병합 시도
Write-Host "`n원격 main 브랜치와 병합 시도..." -ForegroundColor Yellow
git pull origin main --allow-unrelated-histories --no-edit 2>&1 | Out-Null
if ($LASTEXITCODE -ne 0) {
    Write-Host "병합 충돌이 발생했습니다. 수동으로 해결해주세요." -ForegroundColor Yellow
}

# 변경사항 추가
Write-Host "`n변경사항 추가 중..." -ForegroundColor Yellow
git add .

# 변경사항 확인
$status = git status --short
if ($status) {
    Write-Host "`n추가된 파일:" -ForegroundColor Green
    git status --short
    
    # 커밋
    Write-Host "`n커밋 중..." -ForegroundColor Yellow
    git commit -m "배포 준비: 프로젝트 파일 업데이트"
    
    # 푸시
    Write-Host "`nGitHub에 푸시 중..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "`n✓ 성공적으로 푸시되었습니다!" -ForegroundColor Green
        Write-Host "저장소: https://github.com/iyb030106-stack/areum" -ForegroundColor Cyan
    } else {
        Write-Host "`n✗ 푸시 중 오류가 발생했습니다." -ForegroundColor Red
    }
} else {
    Write-Host "`n변경사항이 없습니다." -ForegroundColor Yellow
}

Write-Host "`n=== 완료 ===" -ForegroundColor Green
