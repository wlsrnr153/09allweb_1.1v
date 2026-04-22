'use client'

import Link from 'next/link'
import { openKakaoOpenChat } from '@/lib/kakao'
import { PRIMARY_PHONE, PHONES_DISPLAY_DOT, telHref } from '@/lib/constants/contact'

export function KakaoButton({ 
  className = '', 
  children 
}: { 
  className?: string
  children?: React.ReactNode 
}) {
  return (
    <button
      onClick={openKakaoOpenChat}
      className={className || "px-8 py-4 bg-[#FEE500] text-gray-900 font-semibold rounded-lg hover:bg-[#FDD835] transition-colors shadow-lg"}
    >
      {children || '무료 상담 신청'}
    </button>
  )
}

export function ContactCTAButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <button
        onClick={openKakaoOpenChat}
        className="px-8 py-4 bg-[#FEE500] text-gray-900 font-semibold rounded-lg hover:bg-[#FDD835] transition-colors shadow-md hover:shadow-lg"
      >
        카카오톡 상담
      </button>
      <Link
        href="/contact"
        className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
      >
        온라인 문의
      </Link>
      <a
        href={telHref(PRIMARY_PHONE)}
        className="px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors text-center"
      >
        <span className="block">전화 문의</span>
        <span className="block text-xs font-normal mt-1.5 opacity-90 leading-snug">{PHONES_DISPLAY_DOT}</span>
      </a>
    </div>
  )
}
