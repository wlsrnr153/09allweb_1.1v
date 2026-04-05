/** 회사 연락처(휴대전화) — UI·문서 전반에서 동일하게 사용 */
export const COMPANY_CONTACTS = [
  { role: '1팀 :', phone: '010-4393-2018' },
  { role: '2팀 :', phone: '010-5147-5006' },
  { role: '3팀 :', phone: '010-4773-3107' },
] as const

export type CompanyContact = (typeof COMPANY_CONTACTS)[number]

export function telHref(phone: string): string {
  return `tel:${phone.replace(/\D/g, '')}`
}

export const PHONES_DISPLAY_COMMA = COMPANY_CONTACTS.map((c) => `${c.role} ${c.phone}`).join(', ')
export const PHONES_DISPLAY_DOT = COMPANY_CONTACTS.map((c) => `${c.role} ${c.phone}`).join(' · ')

/** 대표 발신(팀장) — 단일 tel: 링크용 */
export const PRIMARY_PHONE = COMPANY_CONTACTS[0].phone
