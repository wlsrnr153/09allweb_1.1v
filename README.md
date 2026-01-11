# 09all v2.0 - 연구장비 매입 플랫폼

Next.js 14 기반의 현대적인 연구장비 매입 플랫폼입니다.

## 🚀 시작하기

### 필수 요구사항

- Node.js 20.x 이상
- npm 10.x 이상
- PostgreSQL 15.x 이상

### 설치

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env.local
# .env.local 파일을 열어 필요한 값 입력

# Prisma 설정
npx prisma generate
npx prisma db push

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
09all-v2/
├── app/                    # Next.js App Router
│   ├── (marketing)/       # 마케팅 페이지
│   ├── layout.tsx         # Root Layout
│   └── globals.css        # Global Styles
├── components/            # React 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   └── ui/               # UI 컴포넌트
├── lib/                   # 유틸리티 함수
│   ├── prisma.ts         # Prisma Client
│   ├── kakao.ts          # 카카오 SDK
│   └── utils.ts          # 헬퍼 함수
├── prisma/               # Prisma 스키마
├── types/                # TypeScript 타입
└── public/               # 정적 파일
```

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod

## 📝 주요 기능

- ✅ Next.js 14 App Router
- ✅ TypeScript 타입 안전성
- ✅ Tailwind CSS 반응형 디자인
- ✅ Prisma ORM 데이터베이스 관리
- ✅ 카카오톡 채널 연동
- ✅ SEO 최적화
- ✅ 이미지 최적화 (Next/Image)

## 🔧 개발 명령어

```bash
# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 린트 검사
npm run lint

# 타입 체크
npm run type-check
```

## 📦 배포

### Vercel (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Docker

```bash
# Docker 이미지 빌드
docker build -t 09all-v2 .

# 컨테이너 실행
docker run -p 3000:3000 09all-v2
```

## 🌐 환경 변수

```env
# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Kakao
NEXT_PUBLIC_KAKAO_APP_KEY="..."
NEXT_PUBLIC_KAKAO_CHANNEL_ID="..."
```

## 📄 라이선스

Copyright © 2024 09all. All rights reserved.
