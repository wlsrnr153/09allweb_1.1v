/**
 * 한글과 영문을 모두 지원하는 slug 생성 함수
 */
export function generateSlug(title: string): string {
  const timestamp = Date.now()
  
  // 기본 slug 생성
  const baseSlug = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')                    // 공백을 하이픈으로
    .replace(/[^\w\u3131-\uD79D가-힣-]/g, '') // 한글, 영문, 숫자, 하이픈만 허용
    .replace(/-+/g, '-')                      // 연속된 하이픈 제거
    .replace(/^-+|-+$/g, '')                  // 시작/끝 하이픈 제거
    .substring(0, 50)                         // 최대 50자
  
  // 빈 slug 방지: 타임스탬프를 포함하여 유니크하게
  return baseSlug ? `${baseSlug}-${timestamp}` : `equipment-${timestamp}`
}

/**
 * slug가 유효한지 검증
 */
export function isValidSlug(slug: string): boolean {
  // 최소 1자, 최대 100자
  if (!slug || slug.length === 0 || slug.length > 100) {
    return false
  }
  
  // 한글, 영문, 숫자, 하이픈만 허용
  const slugPattern = /^[\w\u3131-\uD79D가-힣-]+$/
  return slugPattern.test(slug)
}

/**
 * 중복 slug 방지를 위한 유니크 slug 생성
 */
export function generateUniqueSlug(title: string, existingSlugs: string[] = []): string {
  let slug = generateSlug(title)
  let counter = 1
  
  // 중복 체크
  while (existingSlugs.includes(slug)) {
    const timestamp = Date.now()
    slug = `${slug}-${counter}-${timestamp}`
    counter++
  }
  
  return slug
}
