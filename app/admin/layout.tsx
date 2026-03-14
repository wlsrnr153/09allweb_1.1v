import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '관리자 - 09올',
  description: '09올 관리자 페이지',
  robots: 'noindex, nofollow', // 검색엔진 차단
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
