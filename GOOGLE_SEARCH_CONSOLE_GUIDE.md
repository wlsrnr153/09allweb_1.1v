# Google Search Console 설정 가이드

## 1. Sitemap 제출

### 방법 1: Google Search Console 웹 인터페이스
1. [Google Search Console](https://search.google.com/search-console) 접속
2. 왼쪽 메뉴에서 **"Sitemaps"** 클릭
3. **"새 사이트맵 추가"** 입력란에 `sitemap.xml` 입력
4. **"제출"** 버튼 클릭

### 방법 2: 직접 URL 확인
- 개발 환경: http://localhost:3000/sitemap.xml
- 프로덕션: https://09all.com/sitemap.xml

---

## 2. 주요 페이지 색인 요청

### URL 검사 도구 사용
1. Google Search Console 상단의 **"URL 검사"** 입력란 사용
2. 다음 주요 URL들을 하나씩 검사하고 색인 요청:

```
https://09all.com/
https://09all.com/services
https://09all.com/disposal
https://09all.com/equipment
https://09all.com/faq
https://09all.com/about
https://09all.com/contact
https://09all.com/portfolio
```

3. 각 URL에 대해:
   - URL 입력 → **"색인 생성 요청"** 클릭
   - 몇 분 정도 소요됩니다

---

## 3. Rich Results Test (Schema 검증)

### Google Rich Results Test
1. [Rich Results Test](https://search.google.com/test/rich-results) 접속
2. 다음 페이지들을 테스트:

#### Organization Schema (모든 페이지)
- URL: `https://09all.com/`
- 확인 사항: Organization 정보가 올바르게 표시되는지

#### Service Schema
- URL: `https://09all.com/services`
- URL: `https://09all.com/disposal`
- 확인 사항: Service 타입 인식

#### Product Schema
- URL: `https://09all.com/equipment/[장비-slug]`
- 확인 사항: Product 정보, 가격, 브랜드 등

#### FAQ Schema
- URL: `https://09all.com/faq`
- 확인 사항: FAQ 질문/답변 구조

#### Breadcrumb Schema
- URL: `https://09all.com/equipment`
- URL: `https://09all.com/services`
- 확인 사항: 탐색 경로 표시

---

## 4. Schema Markup Validator

### Schema.org Validator
1. [Schema Markup Validator](https://validator.schema.org/) 접속
2. 페이지 URL 입력 또는 JSON-LD 코드 직접 입력
3. 에러 및 경고 확인

---

## 5. Lighthouse SEO 점수 측정

### Chrome DevTools 사용
1. Chrome 브라우저에서 사이트 접속
2. `F12` 또는 `우클릭 > 검사` 로 개발자 도구 열기
3. **"Lighthouse"** 탭 선택
4. **"SEO"** 카테고리만 선택 (또는 전체)
5. **"Analyze page load"** 클릭

### 목표 점수
- **SEO**: 90점 이상
- **Performance**: 80점 이상
- **Accessibility**: 90점 이상
- **Best Practices**: 90점 이상

### 주요 체크 항목
✅ Document has a meta description
✅ Page has successful HTTP status code
✅ Links have descriptive text
✅ Document has a valid hreflang
✅ Document has a meta viewport tag
✅ Image elements have alt attributes
✅ Page has the HTML doctype
✅ robots.txt is valid

---

## 6. 모니터링 체크리스트

### 1주차
- [ ] Sitemap 제출 완료
- [ ] 주요 페이지 색인 요청 완료
- [ ] Rich Results Test 통과
- [ ] Schema Markup 검증 통과
- [ ] Lighthouse SEO 90점 이상

### 2-4주차
- [ ] Google Search Console에서 색인 상태 확인
- [ ] 검색 노출 시작 확인
- [ ] CTR 모니터링
- [ ] 검색 쿼리 분석

### 1-3개월
- [ ] 타겟 키워드 순위 추적
- [ ] 자연 검색 트래픽 증가 확인
- [ ] Google Analytics 데이터 분석
- [ ] 필요 시 메타데이터 조정

---

## 7. 추가 최적화 팁

### 검색 결과 모니터링
```
기자재 매입
연구장비 매입
실험장비 매입
연구장비 폐기
기자재 폐기
```

### Google Analytics 4 연동 (선택사항)
1. GA4 속성 생성
2. 추적 코드 `app/layout.tsx`에 추가
3. 이벤트 추적 설정

### Search Console Insights
- Performance 보고서 정기 확인
- 상위 검색 쿼리 분석
- CTR 낮은 페이지 메타데이터 개선

---

## 8. 문제 해결

### Sitemap이 읽히지 않을 때
- robots.txt에 sitemap 경로 확인
- sitemap.xml 직접 접속하여 XML 형식 확인
- 서버 응답 코드 200 확인

### 색인이 안 될 때
- robots.txt에서 차단되지 않았는지 확인
- noindex 메타 태그가 없는지 확인
- 페이지가 404 에러 없이 정상 작동하는지 확인

### Schema 에러 발생 시
- JSON-LD 문법 확인
- 필수 필드 누락 여부 확인
- Schema.org 문서 참조

---

**작성일**: 2026-05-05
**다음 검토일**: 배포 후 1주일 (2026-05-12)
