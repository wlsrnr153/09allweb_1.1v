# 09all v2.0 - 연구장비 매입 플랫폼

Next.js 16 기반의 현대적인 연구장비 매입 플랫폼입니다.

## 🔐 관리자 기능

**관리자 전용 장비 관리 시스템이 구현되어 있습니다!**

- NextAuth 기반 보안 인증
- 장비 추가/수정/삭제 기능
- 직관적인 관리 대시보드

👉 **[관리자 설정 가이드 보기](./ADMIN_SETUP_GUIDE.md)**

## 📚 카탈로그 시스템

### 1. 장비 카탈로그
**전체 장비 목록 카탈로그**

- 전체 장비 목록을 카탈로그 형태로 제공
- 카테고리/브랜드별 필터링
- 원클릭 인쇄 기능 (A4 최적화)

👉 **[장비 카탈로그 가이드](./CATALOG_GUIDE.md)** | 페이지: `/catalog`

### 2. 회사 소개서
**인쇄 최적화된 전문 브로셔 (11페이지)**

- 회사 개요, 연혁, 핵심 가치
- 서비스 소개, 매입 프로세스
- 주요 실적 및 연락처
- A4 인쇄 완벽 지원

👉 **[회사 소개서 가이드](./BROCHURE_GUIDE.md)** | 페이지: `/brochure`

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
- ✅ **장비 카탈로그** - 인쇄 최적화된 웹 카탈로그 시스템

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
# Database (선택사항 - 없으면 샘플 데이터 사용)
DATABASE_URL="file:./dev.db"              # SQLite (개발용)
# DATABASE_URL="postgresql://..."        # PostgreSQL (프로덕션용)
# DATABASE_URL="mysql://..."             # MySQL (프로덕션용)

# NextAuth (관리자 기능 사용 시 필요)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="your-password"
ADMIN_NAME="관리자"

# Kakao (카카오톡 연동 시 필요)
NEXT_PUBLIC_KAKAO_APP_KEY="..."
NEXT_PUBLIC_KAKAO_CHANNEL_ID="..."
```

### 💡 데이터베이스 모드

#### 🎯 **샘플 데이터 모드** (기본값)
- `DATABASE_URL` 환경 변수 없이 실행
- 하드코딩된 12개 샘플 장비 사용
- 빠른 시작, 데모/테스트용
- 관리자 기능 제외한 모든 기능 작동

#### 🗄️ **데이터베이스 모드**
- `DATABASE_URL` 환경 변수 설정
- SQLite/PostgreSQL/MySQL 지원
- 관리자 기능 포함 전체 기능 사용
- 프로덕션 배포용

```bash
# 개발 환경 (SQLite)
echo 'DATABASE_URL="file:./dev.db"' > .env

# 프로덕션 환경 (PostgreSQL)
# Vercel 환경 변수에 추가:
# DATABASE_URL="postgresql://user:pass@host/db"
```

## 📄 라이선스

Copyright © 2024 09all. All rights reserved.
