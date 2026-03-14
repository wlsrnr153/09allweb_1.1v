# 문제 해결 요약

## 🔴 발생한 문제들

### 1. Next.js 개발 서버 lock 파일 오류
```
⨯ Unable to acquire lock at .next\dev\lock, is another instance of next dev running?
```

**원인**: 이전 node 프로세스가 제대로 종료되지 않음

**해결**:
```bash
# 1. 모든 node 프로세스 종료
Stop-Process -Name "node" -Force

# 2. .next 폴더 삭제
Remove-Item -Recurse -Force .next

# 3. 개발 서버 재시작
npm run dev
```

---

### 2. 장비 조회 실패 - slug 생성 문제
**원인**: 한글 제목의 slug가 잘못 생성되어 빈 문자열 또는 중복 발생

**해결**: `app/api/admin/equipment/route.ts` 수정
```typescript
// ✅ 한글 지원 slug 생성
const timestamp = Date.now()
const baseSlug = body.title
  .toLowerCase()
  .replace(/\s+/g, '-')
  .replace(/[^\w\u3131-\uD79D가-힣-]/g, '') // 한글 허용!
  .replace(/-+/g, '-')
  .replace(/^-+|-+$/g, '')
  .substring(0, 50)

const slug = baseSlug ? `${baseSlug}-${timestamp}` : `equipment-${timestamp}`
```

---

### 3. 서버 컴포넌트에서 fetch 사용 문제
**원인**: 서버 컴포넌트에서 `fetch('http://localhost:3000/api/...')`를 사용하면 빌드 시간이나 서버 환경에서 작동하지 않음

**해결**: 서버 컴포넌트는 Prisma 또는 서버 액션을 직접 사용

#### Before (문제)
```typescript
// ❌ 서버 컴포넌트에서 HTTP fetch
async function getEquipment(slug: string) {
  const res = await fetch(`http://localhost:3000/api/equipment/${slug}`)
  const data = await res.json()
  return data.data
}
```

#### After (해결)
```typescript
// ✅ 서버 액션 직접 사용
import { getEquipmentBySlug } from '@/lib/actions/equipment'

export default async function EquipmentDetailPage({ params }) {
  const equipment = await getEquipmentBySlug(params.slug)
  // ...
}
```

---

### 4. 데이터베이스 초기화
**문제**: DB에 카테고리와 장비 데이터가 없음

**해결**: 시드 데이터 생성
```bash
npm run db:seed
```

**결과**:
- ✅ 4개 카테고리 생성
- ✅ 12개 장비 생성

---

## ✅ 최종 구조

### 파일 구조
```
app/(marketing)/equipment/
├── page.tsx                    # 서버 컴포넌트 (데이터 fetch)
├── EquipmentPageClient.tsx     # 클라이언트 컴포넌트 (상호작용)
└── [slug]/
    ├── page.tsx                # 서버 컴포넌트 (상세 페이지)
    └── not-found.tsx           # 404 페이지

lib/actions/
└── equipment.ts                # 서버 액션 (Prisma 직접 호출)

app/api/
├── equipment/
│   ├── route.ts                # 공개 API (옵션)
│   └── [slug]/route.ts
├── categories/route.ts
└── brands/route.ts
```

### 데이터 흐름

#### 장비 목록 페이지
```
1. 서버: getPublishedEquipment() 호출 → Prisma → DB 조회
2. 서버: 데이터를 props로 클라이언트 컴포넌트에 전달
3. 클라이언트: 필터링, 정렬, 무한 스크롤 처리
```

#### 장비 상세 페이지
```
1. 서버: getEquipmentBySlug(slug) 호출 → Prisma → DB 조회
2. 서버: notFound() 또는 렌더링
3. 클라이언트: 이미지 갤러리, 카카오톡 상담 등 상호작용
```

---

## 🎯 체크리스트

- [x] node 프로세스 정리
- [x] .next 폴더 삭제
- [x] 개발 서버 재시작 ✅ http://localhost:3000
- [x] slug 생성 로직 수정 (한글 지원)
- [x] 서버 컴포넌트에서 fetch 제거
- [x] 서버 액션 직접 사용
- [x] 시드 데이터 생성
- [x] EquipmentPageClient 컴포넌트 생성

---

## 🧪 테스트 방법

### 1. 장비 목록 페이지
```
http://localhost:3000/equipment
```
**예상 결과**: 12개 장비 표시

### 2. 장비 상세 페이지
```
http://localhost:3000/equipment/agilent-1260-hplc
```
**예상 결과**: Agilent HPLC 상세 정보 표시

### 3. 관리자에서 장비 추가
```
1. http://localhost:3000/admin/login 접속
2. 새 장비 추가
3. /equipment 페이지에서 확인
```

### 4. API 직접 테스트
```powershell
# 장비 목록
Invoke-WebRequest -Uri "http://localhost:3000/api/equipment" -UseBasicParsing

# 특정 장비
Invoke-WebRequest -Uri "http://localhost:3000/api/equipment/agilent-1260-hplc" -UseBasicParsing
```

---

## 🚀 다음 단계

### 성능 최적화
1. **ISR (Incremental Static Regeneration)** 도입
```typescript
export const revalidate = 60 // 60초마다 재검증
```

2. **React Query** 또는 **SWR** 도입 (클라이언트 캐싱)

3. **이미지 최적화**
- Cloudinary 또는 AWS S3 연동
- Next.js Image 컴포넌트 활용

### 기능 추가
1. 검색 기능 강화 (Full-text search)
2. 장비 비교 기능
3. 찜하기 기능
4. 최근 본 장비

---

## 📝 중요 포인트

### 서버 컴포넌트 vs 클라이언트 컴포넌트

#### 서버 컴포넌트에서:
- ✅ Prisma 직접 호출
- ✅ 서버 액션 사용
- ❌ fetch('http://localhost:3000/...') 사용 금지
- ❌ useState, useEffect 사용 불가

#### 클라이언트 컴포넌트에서:
- ✅ useState, useEffect 사용
- ✅ 이벤트 핸들러
- ✅ 브라우저 API
- ✅ API fetch (클라이언트 사이드)

---

**작성일**: 2026-01-15  
**상태**: ✅ 모든 문제 해결 완료
