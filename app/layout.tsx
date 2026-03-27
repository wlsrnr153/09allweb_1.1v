import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'

export const metadata: Metadata = {
  title: {
    default: '09all - 연구장비 매입 전문 플랫폼',
    template: '%s | 09all',
  },
  description: '연구장비 매입, 장비 임대, 유지보수 전문 서비스를 제공합니다.',
  keywords: ['연구장비', '장비매입', '실험장비', '분석장비', '계측장비'],
  authors: [{ name: '09all' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://09all.com',
    siteName: '09all',
    title: '09all - 연구장비 매입 전문 플랫폼',
    description: '연구장비 매입, 장비 임대, 유지보수 전문 서비스를 제공합니다.',
  },
  other: {
    charset: 'utf-8',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        {/* Pretendard CDN */}
        <link 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

