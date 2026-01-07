# 배포 가이드 (Deployment Guide)

빌드가 완료되었습니다! 아래 방법 중 하나를 선택하여 앱을 배포할 수 있습니다.

## 🚀 배포 방법

### 1. Vercel로 배포 (가장 쉬움, 추천)

#### 방법 A: 명령어로 배포 (추천! 가장 쉬움)

1. 터미널에서 아래 명령어 실행:
```bash
npm install -g vercel
vercel
```

2. 첫 실행 시:
   - Vercel 계정 로그인 (브라우저 창이 열림)
   - 프로젝트 설정 질문에 Enter 키로 기본값 사용
   - 배포 완료!

3. 이후 배포는 그냥 `vercel` 명령어만 실행하면 됩니다.

#### 방법 B: 웹사이트에서 배포 (GitHub 사용)

Vercel 웹사이트는 주로 GitHub 저장소 연결을 사용합니다:

1. 먼저 GitHub에 프로젝트 업로드:
   - GitHub.com에서 새 저장소 생성
   - 프로젝트 파일들을 업로드 (또는 Git 명령어 사용)

2. [Vercel](https://vercel.com)에 가입/로그인
3. 대시보드에서 "Add New..." > "Project" 클릭
4. GitHub 저장소 선택 후 "Import" 클릭
5. "Deploy" 버튼 클릭

**참고**: GitHub 없이 배포하려면 방법 A (명령어)를 사용하세요!

### 2. Netlify로 배포

#### 방법 A: 명령어로 배포 (추천!)

1. 터미널에서 아래 명령어 실행:
```bash
npm install -g netlify-cli
netlify deploy --prod
```

2. 첫 실행 시:
   - `netlify login` 먼저 실행 (브라우저에서 로그인)
   - `netlify init` 실행하여 사이트 연결
   - 배포 설정 질문에 답변
   - 배포 완료!

#### 방법 B: 웹사이트에서 배포

1. [Netlify](https://www.netlify.com)에 가입/로그인
2. 대시보드에서 "Add new site" > "Deploy manually" 클릭
3. Windows 탐색기에서 **빌드된 `dist` 폴더**를 브라우저 창으로 끌어다 놓기
4. 자동 배포 완료!

**환경 변수 설정 (필요시):**
- Site settings > Environment variables > Add variable에서 `GEMINI_API_KEY` 추가

### 3. GitHub Pages로 배포

1. GitHub 저장소에 코드 푸시
2. Settings > Pages로 이동
3. Source를 "GitHub Actions"로 선택
4. `.github/workflows/deploy.yml` 파일이 자동으로 실행됩니다

**또는 수동 배포:**
```bash
# vite.config.ts에 base 추가 필요
npm run build
# dist 폴더 내용을 gh-pages 브랜치에 푸시
```

### 4. 다른 정적 호스팅 서비스

빌드된 `dist` 폴더의 내용을 다음 서비스에 업로드하면 됩니다:
- Cloudflare Pages
- AWS S3 + CloudFront
- Firebase Hosting
- Azure Static Web Apps

## 📝 참고사항

- 빌드 파일은 `dist` 폴더에 생성됩니다
- 환경 변수 `GEMINI_API_KEY`가 필요한 경우 배포 플랫폼에서 설정해야 합니다
- 빌드는 `npm run build` 명령어로 실행할 수 있습니다

