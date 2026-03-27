# 📊 데이터베이스 가이드

## 개요

이 프로젝트는 **SQLite + Prisma**를 사용하여 장비 데이터를 관리합니다.

## 🗄️ 데이터베이스 구조

### 모델

- **Category** - 장비 카테고리 (분석장비, 계측장비, 실험장비, 기타장비)
- **Equipment** - 장비 정보
- **Portfolio** - 포트폴리오 (미사용)
- **Inquiry** - 문의 (미사용)
- **FAQ** - FAQ (미사용)
- **User** - 사용자 (미사용)

### Equipment 모델 필드

| 필드 | 타입 | 설명 |
|------|------|------|
| id | String | 고유 ID (cuid) |
| title | String | 장비명 |
| slug | String | URL slug |
| brand | String | 제조사 |
| model | String | 모델명 |
| categoryId | String | 카테고리 ID (FK) |
| price | String | 가격 (숫자 또는 "별도협의") |
| priceUnit | String | 가격 단위 (기본: KRW) |
| condition | String | 상태 (new/refurbished/demo) |
| status | String | 판매상태 (available/sold/reserved) |
| year | Int | 제조년도 |
| warranty | String? | 보증기간 (선택) |
| stock | Int | 재고 수량 |
| description | String | 상세 설명 |
| specifications | String? | 사양 (JSON string) |
| features | String | 특징 (JSON string) |
| thumbnail | String | 썸네일 이미지 경로 |
| images | String | 이미지 배열 (JSON string) |
| viewCount | Int | 조회수 |
| isPublished | Boolean | 공개 여부 |
| metaTitle | String? | SEO 제목 (선택) |
| metaDescription | String? | SEO 설명 (선택) |
| createdAt | DateTime | 생성일시 |
| updatedAt | DateTime | 수정일시 |

## 🚀 데이터베이스 명령어

### 초기 설정

```bash
# Prisma Client 생성
npx prisma generate

# 데이터베이스 스키마 생성/업데이트
npx prisma db push

# 샘플 데이터 삽입
npm run db:seed
```

### 일반 작업

```bash
# 데이터베이스 초기화 + 샘플 데이터 삽입
npm run db:reset

# Prisma Studio 실행 (GUI 데이터 관리)
npx prisma studio
```

### 개발 워크플로우

1. **새로운 개발 시작**
   ```bash
   npm run db:reset  # 깨끗한 상태로 시작
   npm run dev       # 개발 서버 실행
   ```

2. **스키마 변경 시**
   ```bash
   # prisma/schema.prisma 수정
   npx prisma db push
   npm run db:seed
   ```

3. **데이터 확인/수정**
   ```bash
   npx prisma studio  # http://localhost:5555 에서 GUI로 확인
   ```

## 📝 JSON 필드 처리

SQLite는 JSON 타입을 직접 지원하지 않아, JSON 데이터를 문자열로 저장합니다.

### 저장 시

```typescript
await prisma.equipment.create({
  data: {
    specifications: JSON.stringify({ '검출기': 'DAD' }),
    features: JSON.stringify(['높은 분리능', '저소음']),
    images: JSON.stringify(['/images/1.jpg', '/images/2.jpg']),
  }
})
```

### 조회 시

```typescript
const raw = await prisma.equipment.findMany()
const parsed = raw.map(eq => ({
  ...eq,
  specifications: eq.specifications ? JSON.parse(eq.specifications) : null,
  features: JSON.parse(eq.features),
  images: JSON.parse(eq.images),
}))
```

**💡 이 변환은 API 라우트에서 자동으로 처리됩니다!**

## 🔄 데이터 마이그레이션

### 샘플 데이터 수정

1. `lib/data/sample-equipment.ts` 파일 수정
2. 시드 재실행:
   ```bash
   npm run db:reset
   ```

### 새 장비 추가 (관리자 페이지)

1. 브라우저에서 `/admin/login` 접속
2. 로그인 후 "장비 추가" 버튼 클릭
3. 폼 작성 후 저장 → **자동으로 DB에 저장됨!**

## 🗂️ 파일 구조

```
prisma/
├── schema.prisma    # 데이터베이스 스키마
└── seed.ts          # 시드 데이터 스크립트

lib/
├── prisma.ts        # Prisma Client 인스턴스
└── data/
    └── sample-equipment.ts  # 샘플 데이터 소스

dev.db              # SQLite 데이터베이스 파일
dev.db-journal      # SQLite 저널 파일
```

## 🔍 데이터 확인

### 방법 1: Prisma Studio (권장)

```bash
npx prisma studio
```

브라우저에서 http://localhost:5555 열림 → GUI로 데이터 확인/수정 가능

### 방법 2: SQLite CLI

```bash
# SQLite 설치 필요
sqlite3 dev.db

# 테이블 목록 보기
.tables

# 장비 목록 보기
SELECT id, title, brand FROM equipment;

# 종료
.exit
```

### 방법 3: 관리자 페이지

```
http://localhost:3000/admin/login
```

로그인 후 모든 장비를 GUI로 확인 가능

## ⚠️ 주의사항

1. **데이터베이스 파일은 Git에 커밋하지 마세요**
   - `.gitignore`에 `*.db` 포함됨
   - 각 개발자가 로컬에서 시드를 실행

2. **SQLite 제한사항**
   - JSON 타입 미지원 → 문자열로 저장
   - 배열 타입 미지원 → JSON 문자열로 저장
   - 동시 쓰기 제한 (단일 사용자 환경에 적합)

3. **프로덕션 배포 시**
   - SQLite는 소규모에 적합
   - 대규모 트래픽은 PostgreSQL 권장
   - Vercel에서는 Vercel Postgres 또는 PlanetScale 사용 권장

## 🚨 문제 해결

### "DATABASE_URL not found" 오류

```bash
# .env 파일 생성 확인
echo 'DATABASE_URL="file:./dev.db"' > .env
npx prisma db push
```

### 스키마 동기화 오류

```bash
# 데이터베이스 재생성
rm dev.db dev.db-journal
npx prisma db push
npm run db:seed
```

### 시드 실행 오류

```bash
# Prisma Client 재생성
npx prisma generate
npm run db:seed
```

## 📚 참고 자료

- [Prisma 문서](https://www.prisma.io/docs)
- [SQLite 문서](https://www.sqlite.org/docs.html)
- [Prisma Studio](https://www.prisma.io/studio)
