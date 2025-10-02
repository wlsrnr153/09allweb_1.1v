# 연구장비매입센터 (Research Equipment Shop) v1.0

연구실험장비 구매, 임대, 유지보수 서비스를 제공하는 전문 웹사이트입니다.

## 🚀 주요 기능

### 1. 장비구매 서비스
- **분석장비**: X-ray 회절분석기, 전자현미경, 질량분석기, NMR 등
- **측정장비**: 표면조도측정기, 3D 스캐너 등  
- **가공장비**: CNC, 3D 프린터 등
- **안전장비**: 실험실 안전 관련 장비

### 2. 장비임대 서비스
- **단기임대**: 1일~1개월 단기 사용
- **장기임대**: 1년 이상 장기 계약
- **리스**: 구매 전환 옵션 포함

### 3. 유지보수 서비스
- **정기점검**: 예방정비 및 성능 최적화
- **긴급수리**: 24시간 긴급 출동 서비스
- **교정서비스**: 정밀도 유지를 위한 교정

### 4. 컨설팅 서비스
- **장비선정**: 연구목적에 맞는 최적 장비 추천
- **설치지원**: 전문 기술진의 설치 및 셋업
- **교육훈련**: 장비 운용 교육 프로그램

## 🛠️ 기술 스택

- **Frontend**: HTML5, CSS3, JavaScript (jQuery)
- **Design**: 반응형 웹디자인 (Mobile-First)
- **Browser Support**: Chrome, Firefox, Safari, Edge
- **Standards**: Web Accessibility Guidelines (WCAG 2.1)

## 📁 프로젝트 구조

```
research-equipment-shop-1.0/
├── index.html              # 메인 페이지
├── css/
│   ├── common.css          # 공통 스타일
│   ├── layout.css          # 레이아웃 스타일
│   └── main.css           # 메인페이지 스타일
├── js/
│   └── main.js            # 메인 JavaScript
├── images/                # 이미지 파일들
└── README.md             # 프로젝트 문서
```

## 🎨 디자인 특징

### ZEUS 포털 참조 디자인
- **헤더**: 로고, 검색바, 네비게이션 메뉴
- **메인 배너**: 자동 슬라이드 배너 (3개 슬라이드)
- **퀵메뉴**: 주요 서비스 바로가기
- **장비 카탈로그**: 탭 기반 카테고리 분류
- **서비스 소개**: 4개 주요 서비스 카드
- **공지사항/뉴스**: 2단 레이아웃

### 색상 팔레트
- **Primary**: #3498db (파란색)
- **Secondary**: #e74c3c (빨간색)  
- **Dark**: #2c3e50 (진한 회색)
- **Light**: #ecf0f1 (연한 회색)
- **Background**: #f8f9fa (배경색)

## 📱 반응형 디자인

### 브레이크포인트
- **Desktop**: 1024px 이상
- **Tablet**: 768px ~ 1023px
- **Mobile**: 767px 이하

### 모바일 최적화
- 햄버거 메뉴 네비게이션
- 터치 친화적 버튼 크기
- 스와이프 제스처 지원
- 모바일 검색 최적화

## ⚡ JavaScript 기능

### 1. 배너 슬라이더
- 자동 슬라이드 (5초 간격)
- 마우스 호버시 일시정지
- 좌우 화살표 네비게이션
- 점(dot) 인디케이터

### 2. 모바일 메뉴
- 햄버거 메뉴 토글
- 서브메뉴 아코디언 효과
- 외부 클릭시 자동 닫기

### 3. 탭 시스템
- 장비 카테고리 탭 전환
- 페이드 인/아웃 애니메이션
- 키보드 네비게이션 지원

### 4. 견적 요청 모달
- 동적 모달 생성
- 폼 유효성 검사
- 이메일 형식 검증
- 반응형 모달 디자인

### 5. 스크롤 투 탑
- 300px 스크롤 후 버튼 표시
- 부드러운 스크롤 애니메이션
- 우하단 고정 위치

## 🔧 설치 및 실행

### 1. 프로젝트 다운로드
```bash
# 프로젝트 폴더로 이동
cd research-equipment-shop-1.0
```

### 2. 웹서버 실행
```bash
# Python 3 사용시
python -m http.server 8000

# Python 2 사용시  
python -m SimpleHTTPServer 8000

# Node.js http-server 사용시
npx http-server -p 8000
```

### 3. 브라우저에서 확인
```
http://localhost:8000
```

## 🌐 브라우저 호환성

| Browser | Version | Support |
|---------|---------|---------|
| Chrome  | 60+     | ✅ Full |
| Firefox | 55+     | ✅ Full |
| Safari  | 12+     | ✅ Full |
| Edge    | 79+     | ✅ Full |
| IE      | 11      | ⚠️ Limited |

## 📋 할일 목록 (TODO)

### Phase 2 개발 계획
- [ ] 장비 상세페이지 구현
- [ ] 검색 기능 고도화
- [ ] 사용자 계정 시스템
- [ ] 장바구니 기능
- [ ] 결제 시스템 연동
- [ ] 관리자 페이지
- [ ] 다국어 지원 (영어)
- [ ] SEO 최적화

### 성능 최적화
- [ ] 이미지 지연 로딩 (Lazy Loading)
- [ ] CSS/JS 파일 압축
- [ ] CDN 적용
- [ ] 캐싱 전략 구현

### 접근성 개선
- [ ] 스크린 리더 최적화
- [ ] 키보드 네비게이션 강화
- [ ] 고대비 모드 지원
- [ ] 폰트 크기 조절 기능

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 문의사항

- **이메일**: info@research-equipment.co.kr
- **전화**: 1588-1234
- **주소**: 서울특별시 강남구 테헤란로 123, 456호

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 🔖 버전 히스토리

### v1.0.0 (2024-03-20)
- 초기 버전 출시
- ZEUS 포털 기반 디자인 구현
- 반응형 웹 디자인 적용
- 기본 JavaScript 기능 구현
- 견적 요청 시스템 구현

---

**© 2024 연구장비매입센터. All rights reserved.**


