/**
 * `public/images` 아래 정적 이미지 URL을 만듭니다.
 * 폴더 규칙·저작권 안내: `public/images/README.md`, 출처 기록: `public/images/SOURCES.md`
 */
const SITE_IMAGES_ROOT = '/images'

function joinPath(relativePath: string): string {
  const p = relativePath.replace(/^\/+/, '')
  return `${SITE_IMAGES_ROOT}/${p}`
}

export const siteImages = {
  hero: (file: string) => joinPath(`home/hero/${file}`),
  homeSection: (file: string) => joinPath(`home/sections/${file}`),
  equipment: (file: string) => joinPath(`equipment/${file}`),
  shared: (file: string) => joinPath(`shared/${file}`),
} as const
