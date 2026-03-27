# 09all 연구장비 매입 플랫폼 리모델링 PRD
## Product Requirements Document

---

## 📋 문서 정보

- **프로젝트명**: 09all 연구장비 매입 플랫폼 리모델링
- **버전**: v2.0
- **작성일**: 2026.01.05
- **목표**: HTML/CSS 기반 정적 사이트를 현대적인 Next.js 기반 플랫폼으로 전환

---

## 🎯 1. 프로젝트 개요

### 1.1 배경 및 목적
**현재 상황 (AS-IS)**
- HTML/CSS/jQuery 기반 정적 웹사이트
- 수동 콘텐츠 관리 (코드 직접 수정 필요)
- SEO 최적화 부족
- 모바일 성능 개선 필요
- 장비 데이터 관리의 어려움

**개선 방향 (TO-BE)**
- Next.js 기반 SSR/SSG 하이브리드 플랫폼
- CMS를 통한 쉬운 콘텐츠 관리
- SEO 최적화 및 검색 노출 강화
- 모바일 우선 반응형 디자인
- 카카오톡 연동으로 문의 전환율 극대화

### 1.2 핵심 목표 (KPI)
- **성능**: Lighthouse Performance Score 90+ 달성
- **SEO**: Lighthouse SEO Score 100 달성
- **전환율**: 카카오톡 문의 전환율 30% 증가
- **관리 효율**: 장비 등록/수정 시간 80% 단축 (CMS 도입)
- **사용자 경험**: 모바일 이탈률 40% 감소

---

## 🛠️ 2. 기술 스택 (Tech Stack)

### 2.1 Frontend
```
- Framework: Next.js 14.x (App Router)
- Language: TypeScript 5.x
- Styling: Tailwind CSS 3.x
- UI Components: shadcn/ui + Radix UI
- State Management: Zustand / React Context
- Form Handling: React Hook Form + Zod
- Data Fetching: TanStack Query (React Query)
```

### 2.2 Backend
```
- Runtime: Node.js 20.x LTS
- API: Next.js API Routes / Route Handlers
- CMS: Strapi 4.x (Headless CMS) 또는 Payload CMS
- Authentication: NextAuth.js (관리자 로그인)
```

### 2.3 Database
```
- Primary DB: PostgreSQL 15+ (장비 데이터, 사용자 정보)
- ORM: Prisma
- Schema:
  - Equipment (장비 정보)
  - Portfolio (매입 실적)
  - Category (카테고리)
  - Inquiry (문의 내역)
```

### 2.4 Infrastructure & Deployment
```
- Frontend Hosting: Vercel (무료/프로 플랜)
- CMS/API Hosting: AWS EC2 또는 Railway
- Database Hosting: Supabase / AWS RDS
- CDN: Cloudflare / AWS CloudFront
- Image Storage: AWS S3 / Cloudinary
- Image Optimization: Next.js Image Optimization
```

### 2.5 External APIs
```
- 카카오톡 채널: Kakao JavaScript SDK
- 지도: Kakao Maps API (국내 최적화)
- 이미지 최적화: Sharp / Cloudinary
- Analytics: Google Analytics 4
```

---

## 📐 3. 시스템 아키텍처

### 3.1 전체 구조도
```
┌─────────────────────────────────────────────────────┐
│                   Cloudflare CDN                    │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│              Next.js Frontend (Vercel)              │
│  - SSR/SSG Pages                                    │
│  - API Routes                                       │
│  - Image Optimization                               │
└────────────┬────────────────────────────────────────┘
             │
             ├─────────────────┐
             │                 │
┌────────────▼──────┐  ┌──────▼──────────────────────┐
│  Strapi CMS       │  │  PostgreSQL (Supabase)      │
│  (Railway/AWS)    │  │  - Equipment                │
│  - Equipment CRUD │  │  - Portfolio                │
│  - Portfolio CRUD │  │  - Users                    │
│  - Image Upload   │  │  - Inquiries                │
└───────────────────┘  └─────────────────────────────┘
             │
┌────────────▼──────────────────────────────────────┐
│          AWS S3 / Cloudinary                      │
│          (Image Storage)                          │
└───────────────────────────────────────────────────┘
```

### 3.2 폴더 구조 (Next.js App Router)
```
09all-v2/
├── app/                          # Next.js App Router
│   ├── (marketing)/              # 마케팅 페이지 그룹
│   │   ├── page.tsx              # 메인 페이지 (/)
│   │   ├── about/                # 회사소개
│   │   │   ├── page.tsx
│   │   │   └── history/page.tsx  # 연혁
│   │   ├── equipment/            # 장비 안내
│   │   │   ├── page.tsx          # 목록
│   │   │   └── [id]/page.tsx     # 상세
│   │   ├── portfolio/            # 매입 실적
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── contact/page.tsx      # 문의하기
│   │   ├── location/page.tsx     # 찾아오시는 길
│   │   └── layout.tsx
│   ├── admin/                    # 관리자 페이지 (Protected)
│   │   ├── dashboard/page.tsx
│   │   ├── equipment/page.tsx
│   │   └── portfolio/page.tsx
│   ├── api/                      # API Routes
│   │   ├── equipment/route.ts
│   │   ├── portfolio/route.ts
│   │   └── inquiry/route.ts
│   ├── layout.tsx                # Root Layout
│   └── globals.css
├── components/
│   ├── ui/                       # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileNav.tsx
│   │   └── FloatingButtons.tsx   # FAB + 카톡 버튼
│   ├── equipment/
│   │   ├── EquipmentCard.tsx
│   │   ├── EquipmentFilter.tsx
│   │   └── EquipmentGrid.tsx
│   └── shared/
│       ├── KakaoButton.tsx
│       └── InfiniteScroll.tsx
├── lib/
│   ├── prisma.ts                 # Prisma Client
│   ├── utils.ts
│   └── kakao.ts                  # Kakao SDK wrapper
├── types/
│   └── index.ts                  # TypeScript types
├── public/
│   └── images/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 4. UI/UX 설계 요구사항

### 4.1 디자인 시스템

#### 색상 팔레트
```css
/* Primary Colors */
--primary-50: #eff6ff;
--primary-500: #3b82f6;   /* 메인 브랜드 컬러 */
--primary-700: #1d4ed8;

/* Accent Colors */
--accent-yellow: #fbbf24;  /* 강조 포인트 */
--accent-red: #ef4444;     /* 긴급/중요 */

/* Neutral Colors */
--gray-50: #f9fafb;
--gray-900: #111827;
```

#### 타이포그래피
```
- 한글: Pretendard Variable (가변 폰트)
- 영문/숫자: Inter
- 본문: 16px / 1.6 line-height
- 모바일: 14px / 1.5 line-height
```

### 4.2 공통 컴포넌트

#### 4.2.1 Navigation Bar
**요구사항**:
- Sticky 헤더 (스크롤 시 상단 고정)
- 투명 → 불투명 전환 애니메이션
- 로고 + 검색바 + 메뉴 + CTA 버튼
- 모바일: 햄버거 메뉴

**기능**:
```typescript
interface NavProps {
  sticky: boolean;
  transparent?: boolean;
  searchEnabled: boolean;
}

// 메뉴 구조
const menuItems = [
  { label: '회사소개', href: '/about', 
    subItems: [
      { label: '회사개요', href: '/about' },
      { label: '연혁', href: '/about/history' },
      { label: '오시는길', href: '/location' },
    ]
  },
  { label: '장비안내', href: '/equipment' },
  { label: '매입실적', href: '/portfolio' },
  { label: '문의하기', href: '/contact' },
]
```

#### 4.2.2 Floating Action Button (FAB)
**요구사항**:
- 모바일 우측 하단 고정
- 카카오톡 아이콘
- 클릭 시 카카오톡 채널 오픈
- 스크롤 시 애니메이션

**구현**:
```typescript
// components/layout/FloatingButtons.tsx
<div className="fixed bottom-6 right-6 z-50 md:hidden">
  <button onClick={openKakaoChannel}>
    <Image src="/kakao-icon.svg" width={60} height={60} />
  </button>
</div>
```

#### 4.2.3 Sticky Footer (Mobile Only)
**요구사항**:
- 모바일 하단 고정
- [전화문의] | [카톡 견적상담] 2버튼
- 데스크톱에서는 숨김

**구현**:
```typescript
<div className="fixed bottom-0 left-0 right-0 md:hidden bg-white border-t">
  <div className="grid grid-cols-2 gap-0">
    <a href="tel:02-1234-5678">전화문의</a>
    <button onClick={openKakaoChannel}>카톡 견적상담</button>
  </div>
</div>
```

---

## 📄 5. 페이지별 상세 요구사항

### 5.1 메인 페이지 (/)

#### 5.1.1 Hero 섹션 + 슬라이더
**요구사항**:
- 3~5개 슬라이드 (CMS에서 관리)
- 자동 재생 (5초 간격)
- 좌우 화살표 + 인디케이터
- 배경 이미지 + 텍스트 오버레이

**데이터 구조**:
```typescript
interface HeroSlide {
  id: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  order: number;
}
```

#### 5.1.2 카테고리 그리드
**요구사항**:
- 4~6개 주요 카테고리 표시
- 아이콘 + 카테고리명 + 장비 수
- 호버 시 확대 효과
- 클릭 시 장비안내 페이지로 이동 (필터 적용)

**예시**:
```
┌──────────┬──────────┬──────────┐
│ 📊 분석장비 │ 📏 계측장비 │ 🔬 실험장비 │
│   247개   │   183개   │   156개   │
└──────────┴──────────┴──────────┘
```

#### 5.1.3 매입 실적 (최신 6개)
**요구사항**:
- 최신 매입 실적 6개 표시
- 카드형 레이아웃 (이미지 + 고객사 + 장비명)
- "더보기" 버튼 → 매입실적 페이지

---

### 5.2 장비안내 페이지 (/equipment)

#### 5.2.1 필터링 및 검색
**필수 필터**:
```typescript
interface EquipmentFilter {
  category: string[];        // 분석장비, 계측장비 등
  brand: string[];           // Agilent, Thermo 등
  priceRange: {min: number, max: number};
  condition: string[];       // 신품, 리퍼비시, 데모용
  year: {min: number, max: number};
  keyword: string;           // 전체 텍스트 검색
}
```

**UI 요구사항**:
- 좌측 사이드바 (데스크톱) / 상단 드롭다운 (모바일)
- 실시간 필터링 (API 호출 없이 프론트에서 처리)
- 선택된 필터 태그로 표시 (삭제 가능)
- "필터 초기화" 버튼

#### 5.2.2 장비 리스트 (무한 스크롤)
**요구사항**:
- 카드형 그리드 레이아웃 (3열 데스크톱, 1열 모바일)
- 무한 스크롤 (Intersection Observer)
- 페이지당 12개 로드
- 스켈레톤 로딩

**장비 카드 구성**:
```typescript
interface EquipmentCard {
  image: string;
  category: string;
  title: string;
  brand: string;
  model: string;
  price: number;
  condition: 'new' | 'refurbished' | 'demo';
  year: number;
  status: 'available' | 'sold';
}
```

**카드 UI**:
```
┌──────────────────────────┐
│      [이미지]            │
│  Badge: 신품/리퍼비시      │
├──────────────────────────┤
│  분석장비                 │
│  Agilent 1260 HPLC       │
│  제조사: Agilent (2024)   │
│  ₩ 150,000,000          │
│  [상세보기] [견적요청]     │
└──────────────────────────┘
```

#### 5.2.3 정렬 옵션
- 최신순 (기본)
- 가격 낮은 순
- 가격 높은 순
- 인기순 (조회수 기반)

---

### 5.3 장비 상세 페이지 (/equipment/[id])

#### 5.3.1 이미지 갤러리
**요구사항**:
- 메인 이미지 + 썸네일 리스트
- 확대 기능 (Lightbox)
- 스와이프 제스처 (모바일)
- 이미지 개수 표시 (1/5)

#### 5.3.2 장비 정보
**표시 정보**:
```typescript
interface EquipmentDetail {
  // 기본 정보
  title: string;
  category: string;
  brand: string;
  model: string;
  price: number;
  
  // 상태 정보
  condition: string;
  year: number;
  warranty: string;
  
  // 상세 설명
  description: string;
  specifications: {key: string, value: string}[];
  features: string[];
  
  // 기타
  stock: number;
  viewCount: number;
  createdAt: Date;
}
```

#### 5.3.3 CTA 버튼
- **카카오톡 견적상담** (Primary)
- **전화 문의**
- **관심 장비 저장**
- **공유하기** (카카오톡 공유 API)

---

### 5.4 매입 실적 페이지 (/portfolio)

#### 5.4.1 갤러리 그리드
**요구사항**:
- Masonry 레이아웃 (Pinterest 스타일)
- 이미지 + 고객사명 + 장비 목록
- 호버 시 정보 오버레이
- 무한 스크롤

**데이터 구조**:
```typescript
interface Portfolio {
  id: string;
  clientName: string;        // OO대학교, OO연구소
  title: string;             // 프로젝트명
  equipmentList: string[];   // 장비 목록
  images: string[];          // 사진 배열
  completedAt: Date;
  description?: string;
}
```

#### 5.4.2 상세 팝업
**요구사항**:
- 클릭 시 모달 팝업
- 이미지 슬라이더
- 장비 목록 + 수량
- 고객 후기 (선택사항)

---

### 5.5 FAQ 페이지 (/faq)

#### 5.5.1 아코디언 컴포넌트
**요구사항**:
- 카테고리별 그룹핑
- 검색 기능 (제목 + 내용)
- 펼치기/접기 애니메이션
- 앵커 링크 지원 (#faq-1)

**데이터 구조**:
```typescript
interface FAQ {
  id: string;
  category: string;          // 장비, 결제, 배송, 기타
  question: string;
  answer: string;            // Markdown 지원
  order: number;
}
```

---

### 5.6 문의 폼 페이지 (/contact)

#### 5.6.1 폼 필드
```typescript
interface InquiryForm {
  name: string;              // 필수
  company?: string;          // 선택
  phone: string;             // 필수
  email: string;             // 필수
  category: string;          // 일반문의, 견적문의, 기타
  equipmentId?: string;      // 장비 선택 (선택사항)
  message: string;           // 필수
  privacyAgreed: boolean;    // 필수
}
```

#### 5.6.2 카카오톡 연동
**요구사항**:
- 폼 제출 후 "카카오톡으로 계속 상담하기" 버튼
- 폼 내용을 카카오톡 메시지에 자동 포함
- 템플릿 메시지 형식:
```
[09all 견적 문의]
이름: 홍길동
회사: OO대학교
문의 내용:
Agilent 1260 HPLC 견적 요청드립니다.
```

---

## 🔧 6. 백엔드 및 데이터 구조

### 6.1 데이터베이스 스키마 (Prisma)

```prisma
// prisma/schema.prisma

model Category {
  id          String      @id @default(cuid())
  name        String      @unique
  slug        String      @unique
  description String?
  icon        String?
  order       Int         @default(0)
  equipments  Equipment[]
  createdAt   DateTime    @default(now())
  updatedAt   DateTime    @updatedAt
}

model Equipment {
  id            String    @id @default(cuid())
  title         String
  slug          String    @unique
  brand         String
  model         String
  category      Category  @relation(fields: [categoryId], references: [id])
  categoryId    String
  
  // 가격 정보
  price         Int
  priceUnit     String    @default("KRW")
  
  // 상태 정보
  condition     String    // new, refurbished, demo
  status        String    @default("available") // available, sold, reserved
  year          Int
  warranty      String?
  
  // 재고
  stock         Int       @default(1)
  
  // 상세 정보
  description   String    @db.Text
  specifications Json?    // {key: value} 형태
  features      String[]  // 특징 배열
  
  // 이미지
  thumbnail     String
  images        String[]
  
  // 메타 정보
  viewCount     Int       @default(0)
  isPublished   Boolean   @default(true)
  
  // SEO
  metaTitle     String?
  metaDescription String?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Portfolio {
  id            String    @id @default(cuid())
  clientName    String
  title         String
  equipmentList String[]
  images        String[]
  description   String?   @db.Text
  completedAt   DateTime
  isPublished   Boolean   @default(true)
  order         Int       @default(0)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model Inquiry {
  id            String    @id @default(cuid())
  name          String
  company       String?
  phone         String
  email         String
  category      String
  equipmentId   String?
  message       String    @db.Text
  status        String    @default("pending") // pending, contacted, completed
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}

model FAQ {
  id            String    @id @default(cuid())
  category      String
  question      String
  answer        String    @db.Text
  order         Int       @default(0)
  isPublished   Boolean   @default(true)
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### 6.2 주요 API 엔드포인트

#### Equipment API
```typescript
// GET /api/equipment
// Query params: category, brand, minPrice, maxPrice, keyword, page, limit

// GET /api/equipment/[id]
// 장비 상세 정보 + 조회수 증가

// POST /api/equipment (Admin only)
// 장비 등록

// PUT /api/equipment/[id] (Admin only)
// 장비 수정

// DELETE /api/equipment/[id] (Admin only)
// 장비 삭제
```

#### Portfolio API
```typescript
// GET /api/portfolio
// Query params: page, limit

// GET /api/portfolio/[id]
// 매입 실적 상세

// POST /api/portfolio (Admin only)
// 실적 등록
```

#### Inquiry API
```typescript
// POST /api/inquiry
// 문의 등록
{
  name, company, phone, email, category, equipmentId, message, privacyAgreed
}

// GET /api/inquiry (Admin only)
// 문의 목록 조회
```

---

## 🎨 7. 카카오톡 연동 상세 설계

### 7.1 Kakao JavaScript SDK 설정

```typescript
// lib/kakao.ts

declare global {
  interface Window {
    Kakao: any;
  }
}

export const initKakao = () => {
  if (typeof window !== 'undefined' && !window.Kakao.isInitialized()) {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_APP_KEY);
  }
}

export const openKakaoChannel = () => {
  if (window.Kakao) {
    window.Kakao.Channel.chat({
      channelPublicId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID
    });
  }
}

export const shareToKakao = (data: {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}) => {
  if (window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        link: {
          mobileWebUrl: data.link,
          webUrl: data.link,
        },
      },
    });
  }
}
```

### 7.2 카카오톡 버튼 컴포넌트

```typescript
// components/shared/KakaoButton.tsx

export function KakaoButton({ 
  variant = 'default',
  message = '',
  equipmentData = null 
}: KakaoButtonProps) {
  const handleClick = () => {
    // 문의 내용을 포함한 메시지 자동 생성
    const inquiryMessage = equipmentData 
      ? `[견적 문의]\n장비: ${equipmentData.title}\n모델: ${equipmentData.model}\n\n${message}`
      : message;
    
    // 카카오톡 채널 오픈
    openKakaoChannel();
    
    // 선택사항: 메시지 클립보드 복사
    if (inquiryMessage) {
      navigator.clipboard.writeText(inquiryMessage);
    }
  };
  
  return (
    <button onClick={handleClick} className="kakao-button">
      <Image src="/kakao-icon.svg" width={24} height={24} />
      카카오톡 상담
    </button>
  );
}
```

### 7.3 모바일 URL Scheme 활용
```typescript
// 모바일 앱이 설치된 경우 직접 실행
const openKakaoApp = (channelId: string) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) {
    const kakaoUrl = `kakaoplus://plusfriend/talk/chat/${channelId}`;
    window.location.href = kakaoUrl;
    
    // 앱이 없는 경우 웹 채팅으로 폴백
    setTimeout(() => {
      window.Kakao.Channel.chat({ channelPublicId: channelId });
    }, 500);
  } else {
    window.Kakao.Channel.chat({ channelPublicId: channelId });
  }
}
```

---

## 🚀 8. 성능 최적화 전략

### 8.1 이미지 최적화

#### Next.js Image 컴포넌트 사용
```typescript
// components/shared/OptimizedImage.tsx

<Image
  src={imageUrl}
  alt={alt}
  width={800}
  height={600}
  quality={85}
  placeholder="blur"
  blurDataURL={blurDataUrl}
  loading="lazy"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>
```

#### WebP 자동 변환
- Next.js Image Optimization API 활용
- 자동으로 WebP/AVIF 포맷 서빙
- 구형 브라우저는 JPEG/PNG 폴백

#### Lazy Loading 전략
```typescript
// 뷰포트 진입 시 로드
<Image loading="lazy" />

// Intersection Observer 활용
const { ref, inView } = useInView({
  triggerOnce: true,
  threshold: 0.1,
});
```

### 8.2 코드 스플리팅

```typescript
// 동적 import로 번들 크기 최적화
const AdminPanel = dynamic(() => import('@/components/admin/AdminPanel'), {
  loading: () => <Skeleton />,
  ssr: false,
});

// 라우트 기반 자동 코드 스플리팅 (Next.js App Router)
// app/equipment/[id]/page.tsx → 별도 청크로 분리
```

### 8.3 데이터 Fetching 전략

```typescript
// 정적 생성 (SSG) - 장비 목록, 카테고리
export async function generateStaticParams() {
  const equipment = await prisma.equipment.findMany({ select: { id: true } });
  return equipment.map((item) => ({ id: item.id }));
}

// 서버 사이드 렌더링 (SSR) - 검색 결과
export default async function EquipmentPage({ searchParams }) {
  const equipment = await getEquipment(searchParams);
  return <EquipmentGrid data={equipment} />;
}

// 클라이언트 Fetching (CSR) - 무한 스크롤
const { data, fetchNextPage } = useInfiniteQuery({
  queryKey: ['equipment', filters],
  queryFn: ({ pageParam = 1 }) => fetchEquipment(filters, pageParam),
  getNextPageParam: (lastPage) => lastPage.nextPage,
});
```

### 8.4 캐싱 전략

```typescript
// Next.js Data Cache
fetch('https://api.example.com/equipment', {
  next: { revalidate: 3600 } // 1시간 캐싱
});

// React Query Cache
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5분
      cacheTime: 10 * 60 * 1000, // 10분
    },
  },
});
```

---

## 🔍 9. SEO 최적화 전략

### 9.1 Dynamic Meta Tags

```typescript
// app/equipment/[id]/page.tsx

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const equipment = await getEquipment(params.id);
  
  return {
    title: `${equipment.title} - ${equipment.brand} | 09all`,
    description: `${equipment.title} ${equipment.model} 매입 전문. ${equipment.description.substring(0, 150)}...`,
    keywords: [equipment.brand, equipment.model, equipment.category, '연구장비', '장비매입'],
    openGraph: {
      title: equipment.title,
      description: equipment.description,
      images: [equipment.thumbnail],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: equipment.title,
      description: equipment.description,
      images: [equipment.thumbnail],
    },
  };
}
```

### 9.2 JSON-LD 구조화 데이터

```typescript
// components/seo/StructuredData.tsx

export function ProductSchema({ equipment }: { equipment: Equipment }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: equipment.title,
    brand: {
      '@type': 'Brand',
      name: equipment.brand,
    },
    model: equipment.model,
    description: equipment.description,
    offers: {
      '@type': 'Offer',
      price: equipment.price,
      priceCurrency: 'KRW',
      availability: equipment.status === 'available' 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
    },
    image: equipment.images,
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 9.3 Sitemap & Robots.txt

```typescript
// app/sitemap.ts

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const equipment = await prisma.equipment.findMany({
    select: { slug: string, updatedAt: Date }
  });
  
  const equipmentUrls = equipment.map((item) => ({
    url: `https://09all.com/equipment/${item.slug}`,
    lastModified: item.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));
  
  return [
    {
      url: 'https://09all.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...equipmentUrls,
  ];
}

// app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://09all.com/sitemap.xml',
  };
}
```

---

## 🛡️ 10. 보안 및 관리자 시스템

### 10.1 관리자 인증 (NextAuth.js)

```typescript
// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // DB에서 관리자 계정 확인
        const user = await verifyAdmin(credentials);
        return user || null;
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
  },
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
```

### 10.2 관리자 페이지 보호

```typescript
// app/admin/layout.tsx

import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user.role !== 'admin') {
    redirect('/admin/login');
  }
  
  return <div>{children}</div>;
}
```

### 10.3 API Rate Limiting

```typescript
// middleware.ts

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'), // 10초에 10회
});

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/inquiry')) {
    const ip = request.ip ?? '127.0.0.1';
    const { success } = await ratelimit.limit(ip);
    
    if (!success) {
      return new Response('Too Many Requests', { status: 429 });
    }
  }
}
```

---

## 📊 11. 관리자 기능 요구사항

### 11.1 대시보드 (/admin/dashboard)
**표시 정보**:
- 총 장비 수 / 카테고리별 통계
- 이번 달 문의 수
- 최근 문의 목록 (5개)
- 인기 장비 Top 10

### 11.2 장비 관리 (/admin/equipment)
**기능**:
- 장비 목록 (테이블 형식)
- 검색 / 필터링
- 장비 등록 / 수정 / 삭제
- 이미지 업로드 (Drag & Drop)
- 일괄 등록 (CSV 업로드)
- 공개/비공개 전환

**폼 필드**:
```typescript
interface EquipmentForm {
  title: string;
  brand: string;
  model: string;
  categoryId: string;
  price: number;
  condition: string;
  status: string;
  year: number;
  warranty: string;
  description: string; // WYSIWYG 에디터
  specifications: {key: string, value: string}[];
  features: string[];
  images: File[];
  metaTitle: string;
  metaDescription: string;
  isPublished: boolean;
}
```

### 11.3 매입 실적 관리 (/admin/portfolio)
**기능**:
- 실적 목록 (그리드 형식)
- 실적 등록 / 수정 / 삭제
- 이미지 다중 업로드
- 순서 변경 (Drag & Drop)

### 11.4 문의 관리 (/admin/inquiry)
**기능**:
- 문의 목록 (테이블)
- 상태별 필터링 (대기/연락완료/처리완료)
- 상세 보기 / 메모 추가
- 카카오톡으로 답변하기 (링크)

---

## 📱 12. 모바일 최적화 요구사항

### 12.1 반응형 브레이크포인트
```css
/* Tailwind CSS 기본 브레이크포인트 사용 */
sm: 640px   /* 모바일 */
md: 768px   /* 태블릿 */
lg: 1024px  /* 데스크톱 */
xl: 1280px  /* 대형 데스크톱 */
2xl: 1536px /* 초대형 */
```

### 12.2 터치 최적화
- 버튼 최소 크기: 44x44px (애플 HIG 기준)
- 스와이프 제스처 (이미지 갤러리, 슬라이더)
- Pull-to-refresh (선택사항)

### 12.3 모바일 전용 기능
- 전화 직접 연결 (`tel:` 링크)
- 카카오톡 앱 직접 실행 (URL Scheme)
- 하단 고정 CTA 버튼
- 간소화된 필터링 (모달 형식)

---

## 🧪 13. 테스트 전략

### 13.1 단위 테스트 (Jest + React Testing Library)
```typescript
// 컴포넌트 테스트
describe('EquipmentCard', () => {
  it('should render equipment information', () => {
    render(<EquipmentCard data={mockEquipment} />);
    expect(screen.getByText(mockEquipment.title)).toBeInTheDocument();
  });
});

// API 테스트
describe('Equipment API', () => {
  it('should return filtered equipment', async () => {
    const response = await fetch('/api/equipment?category=analytical');
    const data = await response.json();
    expect(data.every(item => item.category === 'analytical')).toBe(true);
  });
});
```

### 13.2 E2E 테스트 (Playwright)
```typescript
// e2e/equipment.spec.ts

test('사용자가 장비를 검색하고 상세 페이지로 이동할 수 있다', async ({ page }) => {
  await page.goto('/equipment');
  await page.fill('input[name="keyword"]', 'HPLC');
  await page.click('button[type="submit"]');
  
  await expect(page.locator('.equipment-card')).toHaveCount(3);
  
  await page.click('.equipment-card:first-child');
  await expect(page).toHaveURL(/\/equipment\/\w+/);
  await expect(page.locator('h1')).toContainText('HPLC');
});
```

### 13.3 성능 테스트
- Lighthouse CI 자동화
- Core Web Vitals 모니터링
- 목표: LCP < 2.5s, FID < 100ms, CLS < 0.1

---

## 📈 14. 분석 및 모니터링

### 14.1 Google Analytics 4
**이벤트 추적**:
```typescript
// lib/gtag.ts

export const trackEvent = (action: string, params: any) => {
  window.gtag('event', action, params);
}

// 사용 예시
trackEvent('view_equipment', {
  equipment_id: equipment.id,
  equipment_name: equipment.title,
  category: equipment.category,
});

trackEvent('contact_kakao', {
  source: 'equipment_detail',
  equipment_id: equipment.id,
});
```

**주요 추적 이벤트**:
- `page_view`: 페이지 조회
- `view_equipment`: 장비 상세 조회
- `contact_kakao`: 카카오톡 문의
- `contact_phone`: 전화 문의
- `submit_inquiry`: 문의 폼 제출
- `search`: 검색 수행

### 14.2 에러 모니터링 (Sentry)
```typescript
// sentry.client.config.ts

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  integrations: [new Sentry.BrowserTracing()],
});
```

---

## 🚀 15. 배포 및 CI/CD

### 15.1 Vercel 배포 설정
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXT_PUBLIC_KAKAO_APP_KEY": "@kakao-app-key"
  }
}
```

### 15.2 GitHub Actions CI/CD
```yaml
# .github/workflows/ci.yml

name: CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📅 16. 개발 일정 (추천)

### Phase 1: 기반 구축 (2주)
- [x] Next.js 프로젝트 셋업
- [x] Tailwind CSS 설정
- [x] Prisma + DB 설정
- [x] 기본 레이아웃 컴포넌트 개발
- [x] 인증 시스템 구축

### Phase 2: 핵심 기능 개발 (4주)
- [ ] 장비 안내 페이지 (필터링, 검색, 무한 스크롤)
- [ ] 장비 상세 페이지
- [ ] 매입 실적 페이지
- [ ] 카카오톡 연동
- [ ] 문의 폼

### Phase 3: 관리자 시스템 (2주)
- [ ] 관리자 대시보드
- [ ] 장비 관리 (CRUD)
- [ ] 매입 실적 관리
- [ ] 문의 관리

### Phase 4: 최적화 및 테스트 (2주)
- [ ] 이미지 최적화
- [ ] SEO 최적화
- [ ] 성능 개선
- [ ] 크로스 브라우저 테스트
- [ ] 모바일 테스트

### Phase 5: 배포 및 모니터링 (1주)
- [ ] 프로덕션 배포
- [ ] GA4 설정
- [ ] Sentry 설정
- [ ] 성능 모니터링

**총 예상 기간**: 11주 (약 2.5개월)

---

## ✅ 17. 체크리스트 (개발 시작 전)

### 필수 준비사항
- [ ] 카카오 개발자 계정 및 앱 등록
- [ ] 카카오톡 채널 개설
- [ ] 도메인 준비 (예: 09all.com)
- [ ] Vercel 계정
- [ ] AWS 계정 (S3, RDS)
- [ ] 디자인 시안 (Figma 등)
- [ ] 장비 데이터 (최소 50개 이상)
- [ ] 매입 실적 이미지 (10개 이상)

### 환경 변수
```env
# .env.local

# Database
DATABASE_URL="postgresql://..."

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."

# Kakao
NEXT_PUBLIC_KAKAO_APP_KEY="..."
NEXT_PUBLIC_KAKAO_CHANNEL_ID="..."

# AWS S3
AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
AWS_REGION="ap-northeast-2"
AWS_S3_BUCKET="..."

# Analytics
NEXT_PUBLIC_GA_ID="G-..."
SENTRY_DSN="..."
```

---

## 🎯 18. 성공 지표 (KPI)

### 기술 지표
- Lighthouse Performance Score: **90+**
- Lighthouse SEO Score: **100**
- First Contentful Paint: **< 1.5초**
- Time to Interactive: **< 3초**
- 모바일 페이지 로드 시간: **< 2초**

### 비즈니스 지표
- 카카오톡 문의 전환율: **5% → 7%** (목표)
- 월 방문자 수: **30% 증가**
- 평균 체류 시간: **2분 → 4분**
- 이탈률: **60% → 40%**
- 장비 상세 페이지 조회수: **50% 증가**

---

## 📞 19. 문의 및 지원

프로젝트 진행 중 문의사항이 있으시면 언제든지 연락 주세요.

**이 PRD를 검토하신 후 승인되면, 바로 개발을 시작하겠습니다!** 🚀

---

## 📝 개발 진행 현황

### 2026.01.07 - Phase 2 완료 ✅
**전체 플로우 구성 완료**
- ✅ 샘플 데이터 생성 (장비 12개, 매입 실적 6개, FAQ 10개)
- ✅ 장비 안내 페이지 개발 (필터링, 검색, 정렬, 무한 스크롤)
- ✅ 장비 상세 페이지 개발 (이미지 갤러리, 사양 정보, 카카오톡 연동)
- ✅ 매입 실적 페이지 개발 (그리드 레이아웃, 모달 상세보기)
- ✅ 문의 폼 페이지 개발 (유효성 검사, 카카오톡 연동)
- ✅ FAQ 페이지 개발 (아코디언, 카테고리 필터, 검색)
- ✅ 회사소개 페이지 마이그레이션
- ✅ 오시는 길 페이지 마이그레이션
- ✅ 헤더 네비게이션 업데이트 (FAQ 링크 추가)
- **다음 단계**: 관리자 시스템 개발 또는 실제 API 연동

### 2026.01.05 - Phase 1 완료 ✅
- ✅ Next.js 15.5.9 프로젝트 초기 셋업 완료 (App Router, TypeScript, Tailwind CSS)
- ✅ Prisma 스키마 작성 완료 (Equipment, Portfolio, Category, Inquiry, FAQ 모델)
- ✅ 기본 레이아웃 컴포넌트 개발 (Header, Footer, FloatingButtons)
- ✅ 카카오톡 연동 유틸리티 구현 (openKakaoChannel, shareToKakao)
- ✅ 메인 페이지 UI 구현 (Hero, Categories, Featured Equipment, Services)
- ✅ TypeScript 타입 정의 완료 (Equipment, Portfolio, Inquiry, FAQ 등)
- ✅ Vercel 배포 오류 수정 (Pretendard 폰트 CDN 전환, React 18.3.1 호환성 확보)

### 설치 및 실행 방법
```bash
# 의존성 설치
npm install

# 환경변수 설정 (.env.local 파일 생성)
# DATABASE_URL, NEXT_PUBLIC_KAKAO_APP_KEY 등

# Prisma 클라이언트 생성
npx prisma generate

# 개발 서버 실행
npm run dev
```

---

*이 문서는 실제 개발 과정에서 지속적으로 업데이트됩니다.*

---

## 📝 개발 진행 현황 (추가)

### 2026.01.20 - 서비스 확장: 불용물품 처리 (폐기, 매각)
**종합 솔루션으로 확장**
- ✅ 서비스 다각화 (매입 + 폐기 처리)
- ✅ 통합 프로세스 시스템
- ✅ 원스톱 서비스 제공
- **다음 단계**: 폐기 처리 페이지 구현 및 통합 견적 시스템

---

## 🔄 20. 불용물품 처리 서비스 (신규)

### 20.1 서비스 확장 배경

**현재 (AS-IS)**
- 연구장비 매입 서비스만 제공
- 재판매 가능한 장비만 대상
- 매입 불가 장비는 고객이 별도 처리 필요

**개선 방향 (TO-BE)**
- 매입 + 폐기 처리 통합 서비스
- 매입 불가 장비도 전문적으로 처리
- 원스톱 종합 솔루션 제공
- 환경 친화적 폐기 인증

### 20.2 서비스 유형

#### 20.2.1 장비 매입 (기존)
**대상:**
- 재판매 가능한 장비
- 정상 작동하는 장비
- 시장 수요가 있는 장비

**특징:**
- 현금 즉시 지급
- 무료 수거
- 3-5일 완료

#### 20.2.2 폐기 처리 (신규)
**대상:**
- 작동 불가 장비
- 노후화된 장비
- 부품 파손 장비
- 매입 가치 없는 장비
- 위험물질 포함 장비

**특징:**
- 법적 절차 준수 (폐기물관리법)
- 환경부 인증 처리업체
- 폐기 증명서 발급
- 데이터 완전 삭제
- 5-7일 완료

#### 20.2.3 통합 솔루션 (신규)
**특징:**
- 매입 + 폐기 동시 처리
- 혼합 처리 할인
- 무료 사전 진단
- 맞춤형 솔루션 제공

**사례:**
```
Case 1: 전체 매입
- 모든 장비가 재판매 가능
- 매입금 지급

Case 2: 전체 폐기
- 모든 장비가 노후/파손
- 폐기비용 발생

Case 3: 혼합 처리 (추천)
- 일부는 매입 (예: 3대)
- 일부는 폐기 (예: 2대)
- 매입금에서 폐기비 차감 정산
```

### 20.3 폐기 처리 프로세스

#### Step 1: 문의 접수
**필요 정보:**
- 장비명, 모델명, 제조사
- 구매 시기 및 사용 기간
- 작동 상태 (정상/부분고장/완전고장)
- 폐기 사유
- 위험물질 포함 여부

#### Step 2: 현장 평가
**평가 항목:**
- 매입 가능 여부 판단
- 폐기 필요 여부 확인
- 위험물질 검사
- 처리 방법 결정
- 비용 산정

#### Step 3: 견적 제시
**견적 내용:**
```typescript
interface UnifiedQuote {
  purchaseItems: {
    equipment: Equipment[]
    totalAmount: number  // 매입금 (지급)
  }
  disposalItems: {
    equipment: Equipment[]
    totalCost: number    // 폐기비 (청구)
  }
  finalAmount: number    // 최종 정산금액
}
```

#### Step 4: 계약 체결
**계약서 포함 사항:**
- 매입 장비 목록 + 금액
- 폐기 장비 목록 + 비용
- 처리 방법 및 일정
- 법적 책임 및 보증
- 증명서 발급 약정

#### Step 5: 처리 및 완료
**매입 장비:**
- 안전한 수거 및 운반
- 매입금 즉시 지급
- 계약서 교부

**폐기 장비:**
- 환경 친화적 처리
- 재활용 가능 자원 분리
- 법적 절차 준수
- 폐기 증명서 발급
- 처리 내역서 제공

### 20.4 폐기 처리 방법

#### 20.4.1 환경 친화적 재활용
```
금속 부품 → 금속 재활용 업체
플라스틱 → 플라스틱 재활용
전자 부품 → 전자폐기물 전문 처리
유가 자원 → 자원 회수
```

#### 20.4.2 법적 절차 준수
- 폐기물 처리 신고
- 환경부 승인 절차
- 관련 법규 준수 (폐기물관리법)
- 처리 과정 기록 관리

#### 20.4.3 안전한 폐기
- 위험물질 전문 처리
- 데이터 저장장치 완전 파기
- 민감 정보 보호
- 안전 작업 절차

#### 20.4.4 인증서 발급
- 폐기 증명서 (법적 효력)
- 처리 내역서
- 재활용 실적 증명

### 20.5 처리 가능 품목

#### 매입 가능 장비
- ✅ 정상 작동 분석장비
- ✅ 계측장비 (최근 10년 이내)
- ✅ 실험장비 (상태 양호)
- ✅ 시장 수요 있는 브랜드
- ✅ A급 리퍼비시 가능 장비

#### 폐기 처리 대상
- ♻️ 작동 불가 장비
- ♻️ 15년 이상 노후 장비
- ♻️ 수리 불가 고장 장비
- ♻️ 부품 단종 장비
- ♻️ 재판매 시장 없는 장비
- ♻️ 위험물질 포함 장비
- ♻️ 폐기 의무 대상 장비

### 20.6 비용 안내

#### 폐기 처리 비용
```
소형 장비 (50kg 미만)
- 기본: 50,000원~
- 위험물질 포함: 100,000원~

중형 장비 (50-200kg)
- 기본: 100,000원~
- 위험물질 포함: 200,000원~

대형 장비 (200kg 이상)
- 별도 견적 (현장 평가 후)
- 크레인 필요 시 추가 비용

특수 장비
- 방사선 장비: 별도 견적
- 생물안전장비: 별도 견적
- 화학폐기물 포함: 별도 견적
```

#### 통합 처리 할인
```
예시:
매입 장비 3대: +5,000만원
폐기 장비 2대: -20만원
------------------------
최종 정산: +4,980만원

* 폐기 비용 10% 할인 적용
```

### 20.7 페이지 구조

#### 20.7.1 서비스 소개 페이지 (`/services`)
**구성:**
```
1. 서비스 개요
2. 매입 vs 폐기 비교표
3. 통합 솔루션의 장점
4. 처리 프로세스
5. 고객 사례
6. FAQ
7. 무료 상담 신청
```

#### 20.7.2 폐기 처리 페이지 (`/disposal`)
**구성:**
```
1. Hero 섹션
   - 안전하고 합법적인 폐기 처리
   
2. 폐기 처리 방법
   - 환경 친화적 재활용
   - 법적 절차 준수
   - 안전한 폐기
   - 인증서 발급
   
3. 처리 프로세스 (5단계)

4. 처리 가능 품목
   - 대상 장비 목록
   
5. 비용 안내
   - 크기별 요금표
   
6. 관련 법규
   - 폐기물관리법
   - 환경부 인증
   
7. 폐기 증명서 샘플

8. CTA (무료 견적 요청)
```

#### 20.7.3 통합 솔루션 페이지 (`/solutions`)
**구성:**
```
1. 통합 솔루션이란?

2. 스마트 진단 시스템
   - 장비 정보 입력
   - AI 자동 분석
   - 맞춤 견적 제시
   
3. 처리 사례
   - Case 1: 전체 매입
   - Case 2: 전체 폐기
   - Case 3: 혼합 처리
   
4. 비용 절감 효과

5. 고객 후기

6. 통합 견적 신청
```

### 20.8 데이터베이스 스키마

```prisma
// 서비스 유형
enum ServiceType {
  PURCHASE    // 매입
  DISPOSAL    // 폐기
  MIXED       // 혼합
}

// 폐기 사유
enum DisposalReason {
  NOT_WORKING       // 작동 불가
  TOO_OLD          // 노후화
  NO_MARKET_VALUE  // 시장가치 없음
  DAMAGED          // 파손
  HAZARDOUS        // 위험물질
  MANDATORY        // 법적 의무
}

// 폐기 방법
enum DisposalMethod {
  RECYCLE     // 재활용
  INCINERATE  // 소각
  LANDFILL    // 매립
  SPECIAL     // 특수 처리
}

model Quote {
  id              String       @id @default(cuid())
  serviceType     ServiceType
  
  // 고객 정보
  customerName    String
  customerPhone   String
  customerEmail   String
  company         String?
  
  // 장비 정보
  equipmentList   String       // JSON string
  
  // 매입 정보
  purchaseAmount  Int?         // 매입 금액
  purchaseItems   String?      // JSON: 매입 장비 목록
  
  // 폐기 정보
  disposalCost    Int?         // 폐기 비용
  disposalItems   String?      // JSON: 폐기 장비 목록
  disposalReason  DisposalReason?
  
  // 최종 정산
  finalAmount     Int          // 최종 금액 (+ 매입금, - 폐기비)
  discount        Int?         // 할인액
  
  // 상태
  status          String       @default("pending")
  notes           String?
  
  createdAt       DateTime     @default(now())
  updatedAt       DateTime     @updatedAt
  
  @@map("quotes")
}

model DisposalRecord {
  id                String          @id @default(cuid())
  quoteId           String?         // 연결된 견적
  
  // 장비 정보
  equipmentName     String
  equipmentModel    String?
  equipmentBrand    String?
  
  // 폐기 정보
  disposalMethod    DisposalMethod
  disposalReason    DisposalReason
  hazardousMaterial Boolean         @default(false)
  
  // 처리 내역
  certificateNumber String          // 폐기증명서 번호
  disposalDate      DateTime
  cost              Int
  weight            Float?          // kg
  
  // 처리 업체
  processorName     String          // 처리업체명
  processorLicense  String          // 허가번호
  
  // 인증
  certifiedBy       String?         // 인증기관
  certificateUrl    String?         // 증명서 파일 URL
  
  notes             String?
  
  createdAt         DateTime        @default(now())
  updatedAt         DateTime        @updatedAt
  
  @@map("disposal_records")
}
```

### 20.9 SEO 최적화

**타겟 키워드:**
- 연구장비 폐기
- 실험장비 폐기처리
- 연구실 장비 처분
- 노후 장비 폐기
- 장비 매입 폐기
- 폐기물 처리 인증
- 환경친화적 장비 폐기
- 폐기증명서 발급

**메타 정보:**
```typescript
{
  title: '연구장비 매입·폐기 통합 서비스 | 09all',
  description: '매입부터 폐기까지 원스톱! 재판매 가능 장비는 현금 매입, 노후 장비는 합법적 폐기 처리. 폐기증명서 발급. 20년 경력의 09all',
  keywords: [
    '연구장비 매입',
    '연구장비 폐기',
    '실험장비 처분',
    '장비 폐기처리',
    '폐기증명서',
    '통합 솔루션',
  ]
}
```

### 20.10 기대 효과

#### 비즈니스 측면
- **시장 확대**: 매입 불가 고객도 확보
- **매출 증대**: 폐기 서비스 수익 추가 (연 2억원 예상)
- **고객 유지**: 장기 고객 관계 구축
- **경쟁 우위**: 종합 솔루션 제공 업체로 차별화

#### 고객 측면
- **편리성**: 한 곳에서 모든 문제 해결
- **비용 절감**: 통합 처리 할인 (최대 20%)
- **법적 안전**: 폐기 증명서로 법적 책임 해소
- **시간 절약**: 복수 업체 비교 불필요

#### 환경 측면
- **자원 재활용**: 재사용 가능 부품 최대 회수
- **탄소 배출 감소**: 효율적인 처리 과정
- **친환경 인증**: 환경부 인증 처리업체
- **순환 경제**: 자원 순환 생태계 기여

---

