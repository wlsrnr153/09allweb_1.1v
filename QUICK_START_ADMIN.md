# ⚡ 관리자 기능 빠른 시작 가이드

## 1️⃣ 환경변수 설정 (필수)

프로젝트 루트에 `.env.local` 파일을 생성하세요:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=change-this-to-random-string
ADMIN_EMAIL=admin@09all.com
ADMIN_PASSWORD=your-secure-password
ADMIN_NAME=관리자
```

**💡 보안 키 생성:**
```bash
# PowerShell에서
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))

# 또는 온라인에서: https://generate-secret.vercel.app/32
```

## 2️⃣ 개발 서버 실행

```bash
npm run dev
```

## 3️⃣ 관리자 로그인

브라우저에서 접속:
```
http://localhost:3000/admin/login
```

환경변수에 설정한 이메일/비밀번호로 로그인하세요.

## 4️⃣ 장비 관리

로그인 후 자동으로 장비 관리 페이지로 이동합니다:
```
http://localhost:3000/admin/equipment
```

### 기능:
- ✅ 장비 추가
- ✅ 장비 수정
- ✅ 장비 삭제
- ✅ 공개/비공개 설정
- ✅ 재고 관리

## 🚀 프로덕션 배포 (Vercel)

1. Vercel 대시보드 → Settings → Environment Variables
2. 다음 변수 추가:
   - `NEXTAUTH_URL`: `https://your-domain.com`
   - `NEXTAUTH_SECRET`: 안전한 랜덤 문자열
   - `ADMIN_EMAIL`: 관리자 이메일
   - `ADMIN_PASSWORD`: 강력한 비밀번호
   - `ADMIN_NAME`: 관리자 이름
3. 재배포

## 📚 상세 문서

더 자세한 내용은 [ADMIN_SETUP_GUIDE.md](./ADMIN_SETUP_GUIDE.md)를 참고하세요.

## ⚠️ 주의사항

- `.env.local` 파일은 Git에 커밋하지 마세요 (이미 `.gitignore`에 포함됨)
- 프로덕션에서는 반드시 강력한 비밀번호를 사용하세요
- HTTPS를 사용하는 프로덕션 환경에서만 안전합니다
