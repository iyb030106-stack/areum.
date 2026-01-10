# 간단한 Git 푸시 방법

터미널 경로 문제로 인해 **Cursor의 통합 Git 기능**을 사용하는 것이 가장 쉽습니다.

## ✅ Cursor에서 Git 푸시하기

1. **왼쪽 사이드바에서 Source Control 아이콘 클릭** (또는 `Ctrl+Shift+G`)

2. **변경된 파일 확인**
   - `.gitignore` (수정됨)
   - `QUICK_DEPLOY.md` (새 파일)
   - `PUSH_TO_GITHUB.md` (새 파일)
   - `deploy-to-github.ps1` (새 파일)
   - `git-push-commands.sh` (새 파일)
   - `GIT_PUSH_SIMPLE.md` (새 파일)

3. **"+ Stage All Changes" 버튼 클릭** (모든 파일 스테이징)

4. **커밋 메시지 입력**: `배포 준비: 프로젝트 파일 업데이트`

5. **"Commit" 버튼 클릭** (또는 `Ctrl+Enter`)

6. **"Sync Changes" 또는 "Push" 버튼 클릭**

7. **처음 푸시하는 경우**:
   - 원격 저장소 URL 입력: `https://github.com/iyb030106-stack/areum.git`
   - 브랜치 이름: `main`

## 완료!

푸시가 완료되면:
- GitHub 저장소: https://github.com/iyb030106-stack/areum 에서 확인 가능
- 다음 단계: `QUICK_DEPLOY.md` 파일 참고하여 Vercel에서 배포하기
