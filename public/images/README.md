# 사이트 이미지 관리 (`public/images`)

Next.js에서는 이 폴더 아래 파일이 **URL 경로 그대로** 제공됩니다.  
예: `public/images/home/hero/banner-01.webp` → 브라우저에서 `/images/home/hero/banner-01.webp`

## 폴더 역할

| 경로 | 용도 |
|------|------|
| `home/hero/` | 메인(홈) 상단 배너·히어로 슬라이드용 |
| `home/sections/` | 홈 중간 섹션(소개, CTA 배경 등) |
| `equipment/` | 장비 목록·상세·홈 미리보기 등 장비 관련 썸네일 |
| `shared/` | 여러 페이지에서 공통으로 쓰는 일러스트·배경(로고는 `images/` 루트의 기존 경로와 중복 시 한쪽으로 통일) |

## 파일 네이밍 권장

- 소문자, 하이픈: `lab-workbench-wide.webp`
- 변형이 있으면 접미사: `hero-01@2x.webp` 또는 `equipment-hplc-generic-01.webp`
- **웹 배포용**은 가능하면 **WebP**(또는 AVIF)로 최적화한 뒤 넣기

## 저작권·상표

- **직접 촬영**, **라이선스가 명확한 스톡**, **약관상 상업 이용이 허용된 AI 생성물** 등만 이 트리에 넣습니다.
- `pamphlet/` 등 출처·권리가 불명확한 자료는 **검증 전까지 여기에 복사하지 않습니다.**
- 사용한 이미지마다 `SOURCES.md`에 한 줄 이상 기록합니다.

## 코드에서 참조

```tsx
import Image from 'next/image'

<Image
  src="/images/home/hero/banner-01.webp"
  alt="연구실 장비 매입 안내"
  width={1920}
  height={1080}
  priority
/>
```

배너 전체 배경처럼 `fill`을 쓰는 경우는 레이아웃에 `relative`와 높이를 주고 `sizes`를 지정하세요.
