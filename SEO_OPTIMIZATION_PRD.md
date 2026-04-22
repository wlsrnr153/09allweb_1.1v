# SEO 최적화 프로젝트 - Product Requirements Document (PRD)

## 📋 문서 정보

- **프로젝트명**: 09all 웹사이트 SEO 최적화
- **버전**: 1.0
- **작성일**: 2026-04-22
- **목적**: 기자재 매입 및 폐기 관련 검색어에서 상위 노출 달성

---

## 1. 프로젝트 개요

### 1.1 배경
- 09all은 연구장비 매입 및 폐기 전문 플랫폼
- 현재 기본적인 메타데이터만 설정되어 있어 검색 엔진 최적화 미흡
- 기자재 매입 및 폐기 관련 검색에서 경쟁사 대비 낮은 노출도

### 1.2 비즈니스 목표
- **핵심 목표**: '기자재 매입', '연구장비 폐기', '실험장비 매입' 등 타겟 키워드에서 검색 상위 10위 진입
- **부가 목표**: 
  - 자연 검색 유입 트래픽 200% 증가
  - 검색 결과 CTR 30-40% 향상
  - 리치 스니펫 노출을 통한 브랜드 신뢰도 제고

### 1.3 성공 지표 (KPI)
- 타겟 키워드 검색 순위 (목표: 1-10위)
- 자연 검색 유입 트래픽 (목표: 현재 대비 200% 증가)
- 평균 CTR (목표: 5% 이상)
- 페이지별 색인 상태 (목표: 100%)
- Core Web Vitals 점수 (목표: 모두 Good)

---

## 2. 타겟 키워드 전략

### 2.1 Primary Keywords (1차 타겟)
```
- 기자재 매입
- 연구장비 매입
- 실험장비 매입
- 분석장비 매입
- 계측장비 매입
- 연구장비 폐기
- 기자재 폐기
- 실험장비 처분
```

### 2.2 Secondary Keywords (2차 타겟)
```
- 중고 연구장비 매입
- 폐실험장비 처분
- 연구실 장비 매입
- 대학 연구장비 폐기
- [지역명] + 기자재 매입
- [브랜드명] + 장비 매입
```

### 2.3 Long-tail Keywords (롱테일)
```
- 중고 원심분리기 매입
- 사용하지 않는 연구장비 처분
- 실험실 장비 매입
- 폐기자재 무료 수거
```

---

## 3. 기능 요구사항

## 🎯 Phase 1: 구조화된 데이터 + sitemap.xml 구현

### 3.1 Schema Markup (구조화된 데이터)

#### 3.1.1 Organization Schema (전역)
**위치**: `app/layout.tsx`

**필수 포함 정보**:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "09all",
  "description": "연구장비 매입, 매각, 폐기처리 전문 플랫폼",
  "url": "https://09all.com",
  "logo": "https://09all.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+82-XX-XXXX-XXXX",
    "contactType": "Customer Service",
    "availableLanguage": "Korean"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "KR"
  },
  "sameAs": [
    // SNS URLs
  ]
}
```

#### 3.1.2 Product Schema (장비 상세 페이지)
**위치**: `app/(marketing)/equipment/[slug]/page.tsx`

**필수 포함 정보**:
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "장비명",
  "description": "장비 설명",
  "image": "장비 이미지 URL",
  "brand": {
    "@type": "Brand",
    "name": "브랜드명"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "매입 가능",
    "priceCurrency": "KRW"
  }
}
```

#### 3.1.3 Service Schema (서비스 페이지)
**위치**: `app/(marketing)/services/page.tsx`, `app/(marketing)/disposal/page.tsx`

**필수 포함 정보**:
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "연구장비 매입 서비스",
  "provider": {
    "@type": "Organization",
    "name": "09all"
  },
  "areaServed": {
    "@type": "Country",
    "name": "South Korea"
  },
  "description": "서비스 상세 설명"
}
```

#### 3.1.4 BreadcrumbList Schema (모든 하위 페이지)
**위치**: 각 페이지 레이아웃

**필수 포함 정보**:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "홈",
      "item": "https://09all.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "서비스",
      "item": "https://09all.com/services"
    }
  ]
}
```

#### 3.1.5 FAQPage Schema (FAQ 페이지)
**위치**: `app/(marketing)/faq/page.tsx`

**필수 포함 정보**:
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "질문",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "답변"
      }
    }
  ]
}
```

### 3.2 Sitemap 생성

#### 3.2.1 동적 Sitemap
**파일**: `app/sitemap.ts` (새로 생성)

**요구사항**:
- 모든 정적 페이지 자동 포함
- 동적 장비 페이지 (equipment/[slug]) 포함
- 우선순위(priority) 설정:
  - 홈: 1.0
  - 주요 서비스 페이지: 0.9
  - 장비 카탈로그: 0.8
  - 개별 장비: 0.7
  - 기타 페이지: 0.5
- changeFrequency 설정:
  - 홈: daily
  - 서비스: weekly
  - 장비: weekly
  - 정적 페이지: monthly

**기술 스펙**:
```typescript
// Next.js 16의 sitemap 기능 활용
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 정적 페이지 목록
  // 동적 장비 페이지 DB에서 조회
  // 각 페이지별 lastModified, changeFrequency, priority 설정
}
```

#### 3.2.2 Robots.txt
**파일**: `app/robots.ts` (새로 생성)

**요구사항**:
- 모든 검색 엔진 크롤링 허용
- sitemap 위치 명시
- admin 페이지 크롤링 차단

**기술 스펙**:
```typescript
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/']
    },
    sitemap: 'https://09all.com/sitemap.xml'
  }
}
```

---

## 🎯 Phase 2: 페이지별 동적 메타데이터 + 타겟 키워드 최적화

### 3.3 페이지별 메타데이터 최적화

#### 3.3.1 홈페이지
**파일**: `app/(marketing)/page.tsx`

**메타데이터 요구사항**:
```typescript
export const metadata: Metadata = {
  title: '기자재 매입 전문 | 연구장비 폐기 처분 | 09all',
  description: '중고 연구장비, 실험장비, 분석장비 매입. 폐기자재 무료 수거. 전국 출장 매입 서비스. 연구실 장비 처분 전문.',
  keywords: [
    '기자재 매입',
    '연구장비 매입',
    '실험장비 매입',
    '분석장비 매입',
    '연구장비 폐기',
    '기자재 처분',
    '중고 연구장비',
    '실험실 장비 매입'
  ],
  openGraph: {
    title: '기자재 매입 전문 | 연구장비 폐기 처분 | 09all',
    description: '중고 연구장비, 실험장비 매입. 전국 출장 매입 서비스.',
    images: ['/images/og-home.png']
  }
}
```

#### 3.3.2 서비스 페이지
**파일**: `app/(marketing)/services/page.tsx`

**메타데이터 요구사항**:
```typescript
export const metadata: Metadata = {
  title: '연구장비 매입 서비스 | 신속한 매입,폐기 처리 서비스 | 09all',
  description: '연구실 장비 매입. 분석장비, 계측장비, 실험장비 전문. 전국 출장 매입, 빠른 견적.',
  keywords: [
    '연구장비 매입 서비스',
    '실험장비 매입',
    '분석장비 매입',
    '계측장비 매입',
    '장비 매입'
  ]
}
```

#### 3.3.3 폐기 서비스 페이지
**파일**: `app/(marketing)/disposal/page.tsx`

**메타데이터 요구사항**:
```typescript
export const metadata: Metadata = {
  title: '연구장비 폐기 처분 서비스 | 무료 수거 | 09all',
  description: '사용하지 않는 연구장비, 실험장비 폐기 처분. 무료 수거, 친환경 폐기, 법적 절차 대행. 전국 서비스 가능.',
  keywords: [
    '연구장비 폐기',
    '기자재 폐기',
    '실험장비 처분',
    '폐실험장비',
    '장비 무료 수거',
    '연구실 장비 폐기'
  ]
}
```

#### 3.3.4 장비 카탈로그 페이지
**파일**: `app/(marketing)/equipment/page.tsx`

**메타데이터 요구사항**:
```typescript
export const metadata: Metadata = {
  title: '매입 가능 장비 카탈로그 | 연구장비 종류 | 09all',
  description: '매입 가능한 연구장비, 실험장비 전체 목록. 분석장비, 계측장비, 광학장비 등 다양한 장비 매입.',
  keywords: [
    '연구장비 종류',
    '실험장비 목록',
    '분석장비 카탈로그',
    '매입 가능 장비'
  ]
}
```

#### 3.3.5 개별 장비 페이지 (동적)
**파일**: `app/(marketing)/equipment/[slug]/page.tsx`

**메타데이터 요구사항**:
```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  const equipment = await getEquipmentBySlug(params.slug)
  
  return {
    title: `${equipment.name} 매입 | ${equipment.category} | 09all`,
    description: `${equipment.name} 중고 매입. ${equipment.brand} ${equipment.category}. 최고가 매입, 빠른 견적, 전국 출장 서비스.`,
    keywords: [
      `${equipment.name} 매입`,
      `중고 ${equipment.name}`,
      `${equipment.brand} ${equipment.name}`,
      `${equipment.category} 매입`
    ]
  }
}
```

### 3.4 HTML 구조 및 콘텐츠 최적화

#### 3.4.1 Heading 계층 구조
**요구사항**:
- 모든 페이지에 단일 H1 태그 (타겟 키워드 포함)
- 논리적인 H2, H3 계층 구조
- 키워드를 자연스럽게 heading에 포함

**예시 (홈페이지)**:
```html
<h1>기자재 매입 및 연구장비 폐기 전문 플랫폼 - 09all</h1>

<h2>연구장비 매입 서비스</h2>
  <h3>분석장비 매입</h3>
  <h3>계측장비 매입</h3>
  <h3>실험장비 매입</h3>

<h2>연구장비 폐기 서비스</h2>
  <h3>친환경 폐기 처분</h3>
  <h3>무료 수거 서비스</h3>
```

#### 3.4.2 키워드 밀도 및 배치
**요구사항**:
- 페이지당 1차 키워드 3-5회 자연스럽게 배치
- 첫 문단에 타겟 키워드 포함
- Alt 텍스트에 키워드 포함
- 내부 링크 anchor 텍스트에 키워드 활용

#### 3.4.3 Semantic HTML
**요구사항**:
- `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` 적절히 사용
- 모든 이미지에 의미 있는 alt 속성
- `<time>` 태그로 날짜 마크업
- 리스트는 `<ul>`, `<ol>` 사용

---

## 4. 기술 스펙

### 4.1 개발 환경
- Next.js 16 (App Router)
- React 19
- TypeScript 5.4.3
- Prisma (DB ORM)

### 4.2 구현 파일 목록

#### 새로 생성할 파일:
```
app/
  sitemap.ts              # 동적 sitemap 생성
  robots.ts               # robots.txt 생성
lib/
  schema/
    organization.ts       # Organization Schema 유틸
    product.ts           # Product Schema 유틸
    service.ts           # Service Schema 유틸
    breadcrumb.ts        # Breadcrumb Schema 유틸
    faq.ts              # FAQ Schema 유틸
components/
  seo/
    JsonLd.tsx          # JSON-LD 컴포넌트
    SchemaMarkup.tsx    # 스키마 마크업 래퍼
```

#### 수정할 파일:
```
app/layout.tsx                              # Organization Schema 추가
app/(marketing)/page.tsx                    # 홈 메타데이터 최적화
app/(marketing)/services/page.tsx           # 서비스 메타데이터 + Schema
app/(marketing)/disposal/page.tsx           # 폐기 메타데이터 + Schema
app/(marketing)/equipment/page.tsx          # 카탈로그 메타데이터
app/(marketing)/equipment/[slug]/page.tsx   # 개별 장비 메타데이터 + Schema
app/(marketing)/faq/page.tsx               # FAQ Schema 추가
```

### 4.3 외부 연동
- Google Search Console (사이트 등록 및 sitemap 제출)
- Google Analytics 4 (검색 트래픽 모니터링)
- Schema.org 검증 도구

---

## 5. 구현 우선순위

### Priority 1 (High) - 즉시 구현
- [ ] `app/sitemap.ts` 생성
- [ ] `app/robots.ts` 생성
- [ ] Organization Schema (layout.tsx)
- [ ] 홈페이지 메타데이터 최적화
- [ ] 서비스 페이지 메타데이터 + Schema
- [ ] 폐기 페이지 메타데이터 + Schema

### Priority 2 (Medium) - 1주 내 구현
- [ ] Product Schema (개별 장비 페이지)
- [ ] 장비 카탈로그 메타데이터
- [ ] FAQ Schema
- [ ] Breadcrumb Schema (모든 페이지)
- [ ] H1/H2/H3 계층 구조 개선

### Priority 3 (Low) - 2주 내 구현
- [ ] 모든 페이지 키워드 최적화
- [ ] Semantic HTML 구조 개선
- [ ] 이미지 alt 텍스트 최적화
- [ ] 내부 링크 구조 개선

---

## 6. 검증 및 테스트

### 6.1 개발 단계 검증
- [ ] Schema Markup Validator (schema.org)
- [ ] Rich Results Test (Google)
- [ ] Lighthouse SEO 점수 (목표: 90점 이상)
- [ ] 메타데이터 미리보기 확인

### 6.2 배포 후 검증
- [ ] Google Search Console에 sitemap 제출
- [ ] 색인 요청 (주요 페이지)
- [ ] Rich Results 모니터링
- [ ] 검색 순위 추적 (주 단위)

### 6.3 성능 모니터링
- [ ] Google Analytics 4 설정
  - 자연 검색 트래픽
  - 랜딩 페이지별 유입
  - 전환율
- [ ] Google Search Console
  - 검색어별 노출/클릭
  - 평균 순위
  - CTR

---

## 7. 예상 효과 및 타임라인

### 7.1 단기 효과 (1-2주)
- sitemap 제출 후 색인 속도 개선
- 메타데이터 최적화로 CTR 10-15% 향상
- Rich Results 테스트 통과

### 7.2 중기 효과 (1-2개월)
- 타겟 키워드 20-50위권 진입
- Schema Markup으로 리치 스니펫 노출 시작
- 자연 검색 트래픽 50-100% 증가

### 7.3 장기 효과 (3-6개월)
- 타겟 키워드 10위권 진입
- 자연 검색 트래픽 200% 이상 증가
- 브랜드 검색 증가

### 7.4 구현 타임라인
```
Week 1: Priority 1 항목 구현 (sitemap, robots, 주요 메타데이터)
Week 2: Priority 2 항목 구현 (Product Schema, Breadcrumb)
Week 3: Priority 3 항목 구현 (콘텐츠 최적화)
Week 4: 테스트 및 배포, Google Search Console 설정
```

---

## 8. 위험 요소 및 대응 방안

### 8.1 기술적 위험
| 위험 요소 | 영향도 | 대응 방안 |
|---------|-------|---------|
| 동적 장비 페이지 색인 누락 | 높음 | sitemap에 모든 동적 페이지 포함, SSG 사용 |
| Schema 마크업 오류 | 중간 | 배포 전 검증 도구로 철저히 테스트 |
| 중복 메타데이터 | 중간 | 각 페이지 고유 콘텐츠 확보 |

### 8.2 SEO 위험
| 위험 요소 | 영향도 | 대응 방안 |
|---------|-------|---------|
| 키워드 경쟁 과다 | 높음 | 롱테일 키워드 병행 공략 |
| 알고리즘 변경 | 중간 | 기본 원칙(양질의 콘텐츠) 준수 |
| 순위 변동 시간 소요 | 낮음 | 지속적 모니터링 및 개선 |

---

## 9. 추가 고려사항

### 9.1 콘텐츠 전략 (선택사항)
- 블로그/뉴스 섹션 추가
- '장비별 매입 가이드' 상세 페이지 제작
- 고객 사례(testimonial) 페이지

### 9.2 기술적 SEO (Phase 3)
- Core Web Vitals 최적화
- 이미지 최적화 (WebP 포맷)
- 모바일 사용성 개선
- 페이지 속도 최적화

### 9.3 로컬 SEO (선택사항)
- Google Business Profile 등록
- 지역별 랜딩 페이지 제작
- LocalBusiness Schema 추가

---

## 10. 부록

### 10.1 참고 자료
- [Google Search Central](https://developers.google.com/search)
- [Schema.org](https://schema.org/)
- [Next.js SEO 가이드](https://nextjs.org/learn/seo/introduction-to-seo)

### 10.2 체크리스트
```
Phase 1: 구조화된 데이터 + Sitemap
□ sitemap.ts 생성
□ robots.ts 생성
□ Organization Schema
□ Product Schema
□ Service Schema
□ Breadcrumb Schema
□ FAQ Schema
□ Schema 검증 완료

Phase 2: 메타데이터 최적화
□ 홈페이지 메타데이터
□ 서비스 페이지 메타데이터
□ 폐기 페이지 메타데이터
□ 장비 카탈로그 메타데이터
□ 개별 장비 페이지 메타데이터
□ H1/H2/H3 구조 개선
□ 키워드 배치 완료
□ Semantic HTML 적용

배포 및 검증
□ Google Search Console 등록
□ Sitemap 제출
□ Rich Results Test 통과
□ Lighthouse SEO 90점 이상
□ 색인 요청 완료
```

---

## 11. 승인 및 검토

### 검토 포인트
1. **타겟 키워드가 비즈니스 목표와 일치하는가?**
2. **구현 우선순위가 적절한가?**
3. **기술 스펙이 현재 환경에서 실현 가능한가?**
4. **추가로 필요한 정보나 수정사항은?**
5. **예산 및 리소스 고려사항은?**

### 다음 단계
검토 완료 후 승인되면:
1. Priority 1 항목부터 순차적 구현 시작
2. 각 단계별 검증 및 테스트
3. 배포 후 모니터링

---

**문서 작성자**: AI Assistant  
**검토 요청 대상**: 프로젝트 담당자  
**예상 검토 시간**: 1-2시간
