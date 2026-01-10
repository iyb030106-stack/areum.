# 🚀 빠른 배포 가이드

이 프로젝트는 **랜딩페이지**와 **Store**를 별도로 배포해야 합니다.

## 배포 방법 1: Vercel 웹사이트 (추천! 가장 쉬움)

### Step 1: GitHub에 코드 푸시 (필요시)

만약 변경사항이 있다면:
```bash
git add .
git commit -m "배포 준비"
git push origin master
```

### Step 2: 랜딩페이지 배포

1. **브라우저에서 [Vercel](https://vercel.com) 접속**
2. **"Sign Up" 또는 "Log In"** (GitHub 계정 권장)
3. **"Add New..." → "Project"** 클릭
4. **GitHub 저장소 선택**: `iyb030106-stack/areum` → **"Import"** 클릭
5. **프로젝트 설정 입력**:
   ```
   프로젝트 이름: areum-landing
   
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build:landing  ⬅️ 반드시 입력!
   Output Directory: dist-landing  ⬅️ 반드시 입력!
   Install Command: npm install
   ```
   **"Override" 버튼을 클릭하여 설정 변경!**
6. **"Deploy"** 버튼 클릭
7. 배포 완료 후 URL 확인 (예: `https://areum-landing.vercel.app`)

### Step 3: Store 배포

1. **Vercel 대시보드에서 "Add New..." → "Project"** 클릭
2. **같은 GitHub 저장소 선택**: `iyb030106-stack/areum` → **"Import"** 클릭
3. **프로젝트 설정 입력**:
   ```
   프로젝트 이름: areum-store  ⬅️ 다른 이름!
   
   Framework Preset: Vite
   Root Directory: ./
   Build Command: npm run build:store  ⬅️ 반드시 입력!
   Output Directory: dist-store  ⬅️ 반드시 입력!
   Install Command: npm install
   ```
   **"Override" 버튼을 클릭하여 설정 변경!**
4. **"Deploy"** 버튼 클릭
5. 배포 완료 후 URL 확인 (예: `https://areum-store.vercel.app`)

---

## 배포 방법 2: Netlify 웹사이트

### 랜딩페이지 배포

1. **[Netlify](https://www.netlify.com) 접속** → 로그인
2. **"Add new site" → "Import an existing project"** 클릭
3. **GitHub 저장소 연결**: `iyb030106-stack/areum`
4. **빌드 설정**:
   ```
   Build command: npm run build:landing
   Publish directory: dist-landing
   ```
5. **"Deploy site"** 클릭

### Store 배포

1. **"Add new site" → "Import an existing project"** 클릭
2. **같은 GitHub 저장소 연결**
3. **빌드 설정**:
   ```
   Build command: npm run build:store
   Publish directory: dist-store
   ```
4. **"Deploy site"** 클릭

---

## ✅ 배포 후 확인사항

- [ ] 랜딩페이지 URL이 정상 작동하는지 확인
- [ ] Store URL이 정상 작동하는지 확인
- [ ] 두 프로젝트가 서로 다른 URL을 가지고 있는지 확인

---

## 🔗 도메인 연결 (선택사항)

각 프로젝트의 Settings → Domains에서 원하는 도메인을 연결할 수 있습니다:
- 랜딩페이지: `areum.com`, `www.areum.com`
- Store: `store.areum.com`, `shop.areum.com`

---

## ⚠️ 중요 사항

1. **두 프로젝트는 반드시 다른 이름**으로 생성해야 합니다!
2. **Build Command와 Output Directory를 반드시 입력**해야 합니다!
3. **각 프로젝트는 같은 GitHub 저장소**를 사용하지만 **다른 빌드 설정**을 가집니다!
