# GitHub에 푸시하는 방법

## 방법 1: PowerShell 스크립트 사용 (추천)

1. 프로젝트 디렉토리(`C:\Users\dladu\OneDrive\바탕 화면\IM\areum`)에서 PowerShell 열기
2. 아래 명령 실행:
```powershell
.\deploy-to-github.ps1
```

## 방법 2: 수동 명령어

프로젝트 디렉토리에서 아래 명령어를 순서대로 실행하세요:

```bash
# 1. Git 초기화 (이미 있으면 스킵)
git init

# 2. 원격 저장소 연결 (이미 있으면 스킵)
git remote add origin https://github.com/iyb030106-stack/areum.git

# 3. 원격 저장소 확인
git remote -v

# 4. 원격 브랜치 가져오기
git fetch origin

# 5. main 브랜치로 체크아웃
git checkout -b main
# 또는 이미 main 브랜치가 있으면: git checkout main

# 6. 원격 main과 병합
git pull origin main --allow-unrelated-histories

# 7. 모든 파일 추가
git add .

# 8. 커밋
git commit -m "배포 준비: 프로젝트 업데이트"

# 9. 푸시
git push origin main
```

## 방법 3: GitHub Desktop 사용

1. [GitHub Desktop](https://desktop.github.com/) 설치
2. GitHub 계정으로 로그인
3. "File" → "Add Local Repository" → 프로젝트 디렉토리 선택
4. 변경사항 확인 후 "Commit to main" 클릭
5. "Push origin" 클릭

## 방법 4: VSCode Git 기능 사용

1. VSCode에서 프로젝트 폴더 열기
2. 왼쪽 사이드바에서 "Source Control" 아이콘 클릭 (또는 `Ctrl+Shift+G`)
3. "Stage All Changes" 클릭 (또는 `Ctrl+K` 후 `Ctrl+S`)
4. 커밋 메시지 입력: "배포 준비"
5. "Commit" 버튼 클릭
6. "Sync Changes" 또는 "Push" 클릭

## 문제 해결

### 한글 경로 문제
PowerShell에서 한글 경로 문제가 발생하면:
- **방법 1**: GitHub Desktop 사용 (GUI)
- **방법 2**: Git Bash 사용 (한글 경로 지원)
- **방법 3**: VSCode의 통합 터미널 사용

### 권한 오류
만약 "Permission denied" 오류가 발생하면:
- 관리자 권한으로 PowerShell 실행
- 또는 `.git` 폴더 권한 확인

### 병합 충돌
만약 병합 충돌이 발생하면:
```bash
# 충돌 파일 확인
git status

# 충돌 해결 후
git add .
git commit -m "충돌 해결"
git push origin main
```
