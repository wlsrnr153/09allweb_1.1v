# 관리자 인증 시스템 설정 가이드

## 📋 개요

NextAuth를 기반으로 한 관리자 전용 장비 관리 시스템입니다. 일반 사용자는 접근할 수 없으며, 관리자만 장비를 추가/수정/삭제할 수 있습니다.

## 🔧 설치 및 설정

### 1. 환경변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```env
# NextAuth 설정
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production

# 관리자 계정 (반드시 변경하세요!)
ADMIN_EMAIL=admin@09all.com
ADMIN_PASSWORD=admin123!@#
ADMIN_NAME=09올 관리자
```

**⚠️ 중요:**
- `NEXTAUTH_SECRET`: 랜덤한 문자열로 변경하세요. 다음 명령어로 생성 가능:
  ```bash
  openssl rand -base64 32
  ```
- `ADMIN_EMAIL`, `ADMIN_PASSWORD`: 실제 사용할 관리자 계정 정보로 변경하세요.

### 2. 프로덕션 환경 설정 (Vercel)

Vercel 대시보드에서 환경변수를 설정하세요:

1. Vercel 프로젝트 → Settings → Environment Variables
2. 다음 변수들을 추가:
   - `NEXTAUTH_URL`: `https://your-domain.com`
   - `NEXTAUTH_SECRET`: 안전한 랜덤 문자열
   - `ADMIN_EMAIL`: 관리자 이메일
   - `ADMIN_PASSWORD`: 강력한 비밀번호
   - `ADMIN_NAME`: 관리자 이름

## 🚀 사용 방법

### 관리자 로그인

1. 브라우저에서 `/admin/login` 접속
2. 환경변수에 설정한 이메일과 비밀번호로 로그인
3. 자동으로 `/admin/equipment` 페이지로 이동

### 장비 관리

#### 장비 추가
1. 관리 페이지에서 "장비 추가" 버튼 클릭
2. 폼에 장비 정보 입력
   - 필수 항목: 장비명, 제조사, 모델명, 카테고리, 가격, 상태, 설명
   - 선택 항목: 사양, 특징, 이미지, 보증기간 등
3. "추가하기" 버튼 클릭

#### 장비 수정
1. 장비 목록에서 수정할 장비의 "수정" 버튼 클릭
2. 정보 수정 후 "수정하기" 버튼 클릭

#### 장비 삭제
1. 장비 목록에서 삭제할 장비의 "삭제" 버튼 클릭
2. 확인 대화상자에서 "확인" 클릭

## 🔒 보안 기능

### 1. 세션 기반 인증
- JWT 토큰을 사용한 안전한 세션 관리
- 세션 유효기간: 24시간
- 자동 로그아웃 기능

### 2. API 보호
- 모든 관리자 API는 인증 확인
- 권한이 없으면 401 Unauthorized 응답
- CSRF 보호 내장

### 3. 페이지 보호
- 서버 컴포넌트에서 권한 확인
- 미인증 시 자동으로 로그인 페이지로 리다이렉트
- 검색엔진 인덱싱 차단 (`noindex, nofollow`)

## 📁 파일 구조

```
app/
├── admin/
│   ├── login/
│   │   └── page.tsx          # 로그인 페이지
│   ├── equipment/
│   │   └── page.tsx          # 장비 관리 페이지
│   └── layout.tsx            # 관리자 레이아웃
├── api/
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts      # NextAuth 설정
│   └── admin/
│       └── equipment/
│           ├── route.ts      # 장비 목록/추가 API
│           └── [id]/
│               └── route.ts  # 장비 조회/수정/삭제 API

components/
├── admin/
│   ├── EquipmentManagement.tsx  # 관리 메인 컴포넌트
│   ├── EquipmentList.tsx        # 장비 목록 테이블
│   └── EquipmentForm.tsx        # 장비 추가/수정 폼
└── providers/
    └── SessionProvider.tsx      # NextAuth 세션 프로바이더

lib/
└── auth.ts                   # 인증 유틸리티 함수

types/
├── index.ts                  # 타입 정의
└── next-auth.d.ts           # NextAuth 타입 확장
```

## 🔌 API 엔드포인트

### 장비 관리 API

#### GET `/api/admin/equipment`
- 설명: 모든 장비 목록 조회 (비공개 포함)
- 권한: 관리자 필수
- 응답:
  ```json
  {
    "success": true,
    "data": [...],
    "total": 65
  }
  ```

#### POST `/api/admin/equipment`
- 설명: 새 장비 추가
- 권한: 관리자 필수
- 요청 본문:
  ```json
  {
    "title": "장비명",
    "brand": "제조사",
    "model": "모델명",
    "categoryId": "1",
    "price": "10000000",
    "condition": "new",
    "description": "설명",
    ...
  }
  ```

#### GET `/api/admin/equipment/[id]`
- 설명: 특정 장비 조회
- 권한: 관리자 필수

#### PUT `/api/admin/equipment/[id]`
- 설명: 장비 정보 수정
- 권한: 관리자 필수

#### DELETE `/api/admin/equipment/[id]`
- 설명: 장비 삭제
- 권한: 관리자 필수

## 🎨 UI 특징

### 관리자 대시보드
- 깔끔한 테이블 형식의 장비 목록
- 실시간 검색 및 필터링
- 반응형 디자인 (모바일 지원)
- 직관적인 추가/수정/삭제 버튼

### 장비 폼
- 단계별 입력 폼
- 실시간 유효성 검사
- 사양/특징 동적 추가
- 이미지 업로드 지원 (준비됨)

## 🔄 데이터베이스 연동

현재는 샘플 데이터(`sample-equipment.ts`)를 사용하고 있습니다.
실제 DB 연동 시 다음 파일들을 수정하세요:

1. **API 라우트 수정**
   - `app/api/admin/equipment/route.ts`
   - `app/api/admin/equipment/[id]/route.ts`
   
   주석 처리된 Prisma 코드를 활성화:
   ```typescript
   // 현재
   console.log('새 장비 추가:', newEquipment)
   
   // DB 연동 시
   await prisma.equipment.create({ data: newEquipment })
   ```

2. **Prisma 스키마 확인**
   - `prisma/schema.prisma` 파일이 이미 준비되어 있습니다.

## 🧪 테스트

### 로컬 테스트
```bash
# 개발 서버 실행
npm run dev

# 관리자 로그인 페이지 접속
http://localhost:3000/admin/login

# 기본 계정 (환경변수에 설정된 값 사용)
이메일: admin@09all.com
비밀번호: admin123!@#
```

## 🚨 문제 해결

### 로그인이 안 돼요
1. `.env.local` 파일이 프로젝트 루트에 있는지 확인
2. 환경변수 값이 올바른지 확인
3. 개발 서버 재시작 (`npm run dev`)

### 세션이 유지되지 않아요
1. `NEXTAUTH_SECRET`이 설정되어 있는지 확인
2. 브라우저 쿠키가 활성화되어 있는지 확인
3. HTTPS 사용 시 `NEXTAUTH_URL`이 https로 시작하는지 확인

### API 호출 시 401 오류
1. 로그인이 되어 있는지 확인
2. 세션이 만료되지 않았는지 확인 (24시간)
3. 브라우저 콘솔에서 에러 메시지 확인

## 📝 추가 기능 구현 예정

- [ ] 이미지 업로드 기능
- [ ] 엑셀 일괄 업로드
- [ ] 장비 복제 기능
- [ ] 히스토리 관리
- [ ] 다중 관리자 계정 지원
- [ ] 역할 기반 권한 관리 (RBAC)

## 🔐 보안 권장사항

1. **강력한 비밀번호 사용**
   - 최소 12자 이상
   - 대소문자, 숫자, 특수문자 조합

2. **HTTPS 사용**
   - 프로덕션에서는 반드시 HTTPS 사용
   - Vercel은 자동으로 HTTPS 제공

3. **환경변수 보안**
   - `.env.local` 파일을 Git에 커밋하지 마세요
   - `.gitignore`에 포함되어 있는지 확인

4. **정기적인 비밀번호 변경**
   - 3개월마다 관리자 비밀번호 변경 권장

5. **IP 화이트리스트 (선택사항)**
   - 특정 IP에서만 접근 가능하도록 설정 가능
   - Vercel의 Edge Config 또는 Middleware 활용

## 📞 지원

문제가 발생하거나 추가 기능이 필요하시면 개발팀에 문의하세요.
