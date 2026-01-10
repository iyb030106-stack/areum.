# Store URL 설정 가이드

## 🔴 문제: 404 에러 발생

"아름 시작하기" 버튼을 클릭했을 때 404 에러가 발생하는 경우, Store 프로젝트가 아직 배포되지 않았거나 URL이 잘못 설정되었을 수 있습니다.

## ✅ 해결 방법

### 방법 1: Vercel 환경 변수 설정 (권장)

#### 랜딩페이지 프로젝트에서:
1. Vercel 대시보드에서 **랜딩페이지 프로젝트** 선택
2. **Settings** → **Environment Variables** 클릭
3. 새 환경 변수 추가:
   - **Key**: `VITE_STORE_URL`
   - **Value**: Store 프로젝트의 실제 URL
     - 예: `https://areum-store.vercel.app`
     - 또는 커스텀 도메인: `https://store.areum.com`
4. **Save** 클릭
5. 프로젝트 **재배포** (Deployments → 최신 배포 → ... → Redeploy)

#### Store 프로젝트에서:
1. Vercel 대시보드에서 **Store 프로젝트** 선택
2. **Settings** → **Environment Variables** 클릭
3. 새 환경 변수 추가:
   - **Key**: `VITE_LANDING_URL`
   - **Value**: 랜딩페이지 프로젝트의 실제 URL
     - 예: `https://areum-landing.vercel.app`
     - 또는 커스텀 도메인: `https://areum.com`
4. **Save** 클릭
5. 프로젝트 **재배포**

### 방법 2: Store 프로젝트 배포 확인

Store 프로젝트가 배포되어 있는지 확인하세요:

1. Vercel 대시보드 확인
   - Store 프로젝트가 있는지 확인
   - 배포 상태가 "Ready"인지 확인
   - 배포 URL 확인 (예: `https://areum-store.vercel.app`)

2. Store 프로젝트가 없다면:
   - `VERCEL_SETUP_GUIDE.md` 파일 참고하여 Store 프로젝트 배포

### 방법 3: 임시 해결책 (개발 환경)

로컬 개발 환경에서는 자동으로 감지됩니다:
- 랜딩페이지: `http://localhost:3000`
- Store: `http://localhost:3001`

## 🔍 현재 상태 확인

브라우저 콘솔(F12)에서 다음을 확인하세요:
- "Store로 이동: [URL]" 메시지 확인
- 실제로 이동하는 URL이 올바른지 확인

## 📝 체크리스트

- [ ] Store 프로젝트가 Vercel에 배포되어 있음
- [ ] 랜딩페이지 프로젝트에 `VITE_STORE_URL` 환경 변수 설정
- [ ] Store 프로젝트에 `VITE_LANDING_URL` 환경 변수 설정
- [ ] 환경 변수 설정 후 두 프로젝트 모두 재배포 완료
- [ ] Store URL이 정상 작동하는지 확인 (직접 접속 테스트)

## 🆘 여전히 문제가 있나요?

1. **Store 프로젝트 배포 상태 확인**
   - Vercel 대시보드에서 Store 프로젝트 확인
   - 배포가 성공했는지 확인

2. **환경 변수 확인**
   - Vercel 프로젝트 Settings → Environment Variables
   - 변수가 올바르게 설정되었는지 확인
   - 변수 이름이 정확한지 확인 (`VITE_STORE_URL`, `VITE_LANDING_URL`)

3. **재배포 확인**
   - 환경 변수 설정 후 반드시 재배포해야 함
   - 자동 재배포가 안 되면 수동으로 Redeploy

4. **URL 형식 확인**
   - 환경 변수 값에 `http://` 또는 `https://` 포함
   - 예: `https://areum-store.vercel.app` (올바름)
   - 예: `areum-store.vercel.app` (잘못됨, 프로토콜 없음)



