# Vercel 프로젝트 설정 가이드

## ⚠️ 중요: 루트의 vercel.json 제거됨

루트에 있던 `vercel.json` 파일을 제거했습니다. 이제 Vercel 웹사이트에서 각 프로젝트의 설정을 수동으로 입력할 수 있습니다.

## 📋 랜딩페이지 프로젝트 설정

### Step 1: 프로젝트 생성
1. https://vercel.com 접속
2. "Add New..." → "Project"
3. 저장소 `iyb030106-stack/areum.` 선택 → "Import"

### Step 2: 프로젝트 설정 입력

**프로젝트 이름**: `areum-landing` (원하는 이름)

**빌드 설정 (중요!)**
- **Framework Preset**: `Vite` 선택
- **Root Directory**: `./` (기본값 유지)
- **Build Command**: `npm run build:landing` ⬅️ **반드시 입력**
- **Output Directory**: `dist-landing` ⬅️ **반드시 입력**
- **Install Command**: `npm install` (기본값)

**"Override" 버튼을 클릭**하여 기본값을 덮어써야 합니다!

### Step 3: 환경 변수 (선택)
"Environment Variables" 섹션에서:
- Key: `VITE_STORE_URL`
- Value: `https://store.areum.com` (또는 Store 실제 도메인)

### Step 4: Deploy
- "Deploy" 버튼 클릭

---

## 📋 Store 프로젝트 설정

### Step 1: 새 프로젝트 생성
1. Vercel 대시보드에서 "Add New..." → "Project"
2. **같은 저장소** `iyb030106-stack/areum.` 선택 → "Import"

### Step 2: 프로젝트 설정 입력

**프로젝트 이름**: `areum-store` (원하는 이름)

**빌드 설정 (중요!)**
- **Framework Preset**: `Vite` 선택
- **Root Directory**: `./` (기본값 유지)
- **Build Command**: `npm run build:store` ⬅️ **반드시 입력**
- **Output Directory**: `dist-store` ⬅️ **반드시 입력**
- **Install Command**: `npm install` (기본값)

**"Override" 버튼을 클릭**하여 기본값을 덮어써야 합니다!

### Step 3: 환경 변수 (선택)
"Environment Variables" 섹션에서:
- Key: `VITE_LANDING_URL`
- Value: `https://areum.com` (또는 랜딩페이지 실제 도메인)

### Step 4: Deploy
- "Deploy" 버튼 클릭

---

## 🔧 설정을 변경할 수 없을 때

만약 여전히 설정을 변경할 수 없다면:

1. **프로젝트 삭제 후 재생성**
   - 기존 프로젝트 Settings → Delete Project
   - 새로 프로젝트 생성

2. **GitHub 권한 확인**
   - Vercel Settings → Git
   - GitHub 연결 상태 확인
   - 필요시 재연결

3. **브라우저 캐시 삭제**
   - 브라우저 캐시 삭제 후 다시 시도

4. **프로젝트 이름 확인**
   - 두 프로젝트가 다른 이름인지 확인 (같은 이름이면 안 됨)

---

## ✅ 확인 사항

배포 전 확인:
- [ ] 랜딩페이지: Build Command = `npm run build:landing`
- [ ] 랜딩페이지: Output Directory = `dist-landing`
- [ ] Store: Build Command = `npm run build:store`
- [ ] Store: Output Directory = `dist-store`
- [ ] 두 프로젝트가 **다른 이름**으로 생성됨



