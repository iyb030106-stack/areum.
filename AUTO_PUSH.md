# 자동 푸시 가이드

## 방법 1: Cursor 통합 Git 사용 (가장 쉬움! ⭐)

1. **Cursor에서 왼쪽 사이드바의 "Source Control" 아이콘 클릭** (또는 `Ctrl+Shift+G`)
2. **변경된 파일 확인**
   - `components/Shop.tsx` (관리자 기능 개선)
   - `auto-push.sh` (새 파일)
   - `AUTO_PUSH.md` (새 파일)
   - `PUSH_ADMIN_FEATURES.md` (새 파일)
3. **"+" 버튼 클릭** (모든 파일 스테이징)
4. **커밋 메시지 입력**: `관리자 기능 개선: 비회원 접속 기록 추적, 상품 수정 기능 강화`
5. **"Commit" 버튼 클릭**
6. **"Sync Changes" 또는 "Push" 버튼 클릭** ⬅️ 이게 푸시입니다!

## 방법 2: Git Bash에서 스크립트 실행

Git Bash를 열고:

```bash
cd /c/Users/dladu/OneDrive/바탕\ 화면/IM/areum
bash auto-push.sh
```

## 방법 3: 간단한 Git 명령어

Git Bash에서:

```bash
cd /c/Users/dladu/OneDrive/바탕\ 화면/IM/areum
git add . && git commit -m "관리자 기능 개선" && git push origin main
```

## 🎯 추천: 방법 1 (Cursor 통합 Git)

**가장 빠르고 간단합니다!**
- 한글 경로 문제 없음
- 클릭 몇 번으로 완료
- GUI로 변경사항 확인 가능
