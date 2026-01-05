# 작업 내용 백업 가이드

## 🚨 Git이 설치되어 있지 않은 상황

현재 시스템에 Git이 설치되어 있지 않아서 Git을 통한 버전 관리가 불가능합니다.

## 📦 백업 방법들

### 1. 수동 백업 (권장)
```bash
# 전체 프로젝트 폴더를 복사
xcopy "C:\Users\bb\Desktop\web_scrap_v2\research-equipment-shop-1.0" "C:\Users\bb\Desktop\web_scrap_v2\research-equipment-shop-1.0-backup" /E /I
```

### 2. 압축 파일로 백업
- 프로젝트 폴더를 우클릭 → "압축" 또는 "ZIP으로 보내기"
- 백업 날짜를 포함한 파일명 사용 (예: `research-equipment-shop-1.0-2024-backup.zip`)

### 3. 클라우드 백업
- Google Drive, OneDrive, Dropbox 등에 폴더 동기화
- 자동 백업 설정으로 실시간 보호

## 🔧 Git 설치 및 설정 (권장)

### Git 설치
1. [Git 공식 사이트](https://git-scm.com/download/win)에서 Windows용 Git 다운로드
2. 설치 후 PowerShell 재시작

### Git 초기화 및 커밋
```bash
# 프로젝트 폴더로 이동
cd "C:\Users\bb\Desktop\web_scrap_v2\research-equipment-shop-1.0"

# Git 저장소 초기화
git init

# 모든 파일 추가
git add .

# 첫 번째 커밋
git commit -m "Initial commit: 기자재의모든것 웹사이트 완성

- 브랜드 리뉴얼: 연구장비매입센터 → 기자재의모든것
- 새로운 로고 디자인 (SVG)
- 공지사항 페이지 추가
- 모든 페이지 로고 업데이트
- 반응형 디자인 구현"

# 원격 저장소 연결 (GitHub 등)
git remote add origin [저장소 URL]
git push -u origin main
```

## 📋 작업한 파일 목록

### 새로 생성된 파일
- `notice.html` - 공지사항 페이지
- `css/notice.css` - 공지사항 스타일
- `images/logo_simple.svg` - 기본 로고
- `images/logo_premium.svg` - 프리미엄 로고
- `images/logo_equipment_all.svg` - 확장 로고
- `images/logo_equipment_all.html` - 로고 미리보기
- `CHANGELOG.md` - 변경 로그
- `BACKUP_GUIDE.md` - 백업 가이드

### 수정된 파일
- `index.html` - 로고 변경
- `about.html` - 로고 변경
- `contact.html` - 로고 변경
- `equipment.html` - 로고 변경
- `history.html` - 로고 변경
- `kakao.html` - 로고 변경
- `location.html` - 로고 변경

## 🎯 권장사항

1. **즉시 백업**: 현재 작업 내용을 안전한 곳에 백업
2. **Git 설치**: 버전 관리를 위한 Git 설치
3. **정기 백업**: 작업 진행 시 정기적인 백업 습관
4. **클라우드 동기화**: 실시간 백업을 위한 클라우드 서비스 활용

## 📞 도움이 필요한 경우
- Git 설치 및 설정 도움
- 백업 방법 문의
- 추가 기능 개발 요청
