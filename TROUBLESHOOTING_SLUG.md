# Slug 생성 문제 해결 가이드

## 🔴 문제 상황
관리자 페이지에서 장비를 추가했는데 프론트엔드에서 "장비를 찾을 수 없습니다" 오류 발생

## 🔍 원인
기존 slug 생성 로직이 **한글을 제거**하여 빈 문자열 또는 잘못된 slug 생성

### 기존 코드 (문제)
```typescript
const slug = body.title
  .toLowerCase()
  .replace(/[^\w\s-]/g, '') // ❌ 한글을 특수문자로 취급하여 제거!
  .replace(/\s+/g, '-')
  .trim()
```

**예시:**
- 제목: "아길런트 HPLC 시스템"
- 생성된 slug: `"hplc-"` (한글이 모두 제거됨)
- URL: `/equipment/hplc-` → 다른 장비와 중복되거나 찾을 수 없음

### 수정된 코드 (해결)
```typescript
const timestamp = Date.now()
const baseSlug = body.title
  .toLowerCase()
  .replace(/\s+/g, '-')      
  .replace(/[^\w\u3131-\uD79D가-힣-]/g, '') // ✅ 한글 허용!
  .replace(/-+/g, '-')       
  .replace(/^-+|-+$/g, '')   
  .substring(0, 50)

const slug = baseSlug ? `${baseSlug}-${timestamp}` : `equipment-${timestamp}`
```

**예시:**
- 제목: "아길런트 HPLC 시스템"
- 생성된 slug: `"아길런트-hplc-시스템-1736923456789"`
- URL: `/equipment/아길런트-hplc-시스템-1736923456789` ✅ 정상 작동

## ✅ 해결 방법

### 1. 기존 데이터 확인 및 정리

#### 1-1. Prisma Studio에서 확인
```bash
npx prisma studio --port 5555
```
브라우저에서 http://localhost:5555 접속

**확인 사항:**
- `Equipment` 테이블에서 `slug` 컬럼 확인
- 빈 문자열이나 이상한 값이 있는지 체크
- `isPublished`가 `true`인지 확인

#### 1-2. 잘못된 데이터 삭제
Prisma Studio에서:
1. Equipment 테이블 선택
2. slug가 이상한 행 찾기
3. 해당 행 삭제 (휴지통 아이콘)

또는 명령어로:
```bash
npx prisma db push --force-reset
npx prisma db seed
```
⚠️ **주의**: 모든 데이터가 삭제됩니다!

### 2. 새로운 장비 추가 테스트

#### 2-1. 관리자 페이지 접속
```
http://localhost:3000/admin/login
```

#### 2-2. 장비 추가
- 제목: "테스트 장비" 또는 "Test Equipment"
- 필수 필드 모두 입력
- **isPublished 체크** ✅
- 저장

#### 2-3. 프론트엔드 확인
```
http://localhost:3000/equipment
```
방금 추가한 장비가 표시되는지 확인

#### 2-4. 상세 페이지 확인
장비 카드 클릭 → 상세 페이지 정상 표시

## 🔧 추가 디버깅

### API 직접 테스트

#### 관리자 API (모든 장비)
```bash
curl http://localhost:3000/api/admin/equipment \
  -H "Cookie: next-auth.session-token=YOUR_TOKEN"
```

#### 공개 API (발행된 장비만)
```bash
curl http://localhost:3000/api/equipment
```

#### 특정 장비 조회
```bash
curl http://localhost:3000/api/equipment/[생성된-slug]
```

### 개발자 도구 확인
1. F12 → Network 탭
2. 장비 목록 페이지 새로고침
3. `/api/equipment` 요청 확인
4. Response 확인:
   ```json
   {
     "success": true,
     "data": [...],
     "pagination": {...}
   }
   ```

### 콘솔 로그 확인
터미널에서 Next.js 개발 서버 로그 확인:
```
POST /api/admin/equipment 201 in 123ms
```

에러가 있다면:
```
장비 추가 오류: Error: ...
```

## 📊 데이터베이스 스키마 확인

```sql
-- SQLite에서 직접 확인
sqlite3 prisma/dev.db

-- 테이블 확인
.tables

-- 장비 데이터 확인
SELECT id, title, slug, isPublished FROM equipment;

-- slug가 비어있는 데이터 찾기
SELECT * FROM equipment WHERE slug = '' OR slug IS NULL;

-- 종료
.exit
```

## 🚨 일반적인 문제들

### 1. 404 에러 - 장비를 찾을 수 없습니다
**원인:**
- slug가 잘못 생성됨
- isPublished = false
- 데이터가 DB에 저장 안됨

**해결:**
```bash
# Prisma Studio에서 확인
npx prisma studio

# isPublished를 true로 변경
# slug 값 확인 및 수정
```

### 2. 빈 목록 - 장비가 하나도 안보임
**원인:**
- 모든 장비가 `isPublished: false`
- API 에러
- DB 연결 문제

**해결:**
```bash
# API 직접 테스트
curl http://localhost:3000/api/equipment

# DB 연결 확인
npx prisma studio
```

### 3. 한글 제목이 깨짐
**원인:**
- 인코딩 문제 (이전에 해결함)

**해결:**
- `.vscode/settings.json`에서 UTF-8 확인
- `app/layout.tsx`에 charset 메타 태그 확인

## 🎯 체크리스트

관리자에서 장비 추가 시:
- [ ] 모든 필수 필드 입력
- [ ] `isPublished` 체크 ✅
- [ ] 저장 후 성공 메시지 확인
- [ ] Prisma Studio에서 데이터 확인
- [ ] slug 값이 정상인지 확인 (비어있지 않음)
- [ ] 프론트엔드에서 목록에 표시되는지 확인
- [ ] 상세 페이지 접속 가능한지 확인

## 📝 테스트 데이터 예시

### 성공 케이스
```json
{
  "title": "아길런트 HPLC 시스템",
  "brand": "Agilent",
  "model": "1260 Infinity II",
  "categoryId": "실제-카테고리-ID",
  "price": "50000000",
  "condition": "new",
  "description": "고성능 액체 크로마토그래피 시스템",
  "features": ["고감도", "자동화"],
  "isPublished": true
}
```

**생성된 slug:** `아길런트-hplc-시스템-1736923456789` ✅

### 실패 케이스 (기존 코드)
```json
{
  "title": "아길런트 HPLC 시스템",
  ...
}
```

**생성된 slug (구버전):** `hplc-` ❌ (한글 제거됨)

## 🔄 마이그레이션 (기존 데이터 수정)

기존에 잘못 생성된 장비가 있다면:

```sql
-- 1. 잘못된 slug 확인
SELECT id, title, slug FROM equipment WHERE length(slug) < 5;

-- 2. 수동으로 slug 수정
UPDATE equipment 
SET slug = 'proper-slug-' || id 
WHERE slug = '' OR slug IS NULL;
```

또는 Prisma Studio에서 직접 수정

## 📞 추가 지원

문제가 계속되면:
1. 터미널 로그 확인
2. 브라우저 개발자 도구 Network 탭 확인
3. Prisma Studio에서 데이터 확인
4. API 직접 테스트

---

**수정 완료 날짜:** 2026-01-15  
**수정 내용:** 한글을 지원하는 slug 생성 로직으로 변경
