import type { Metadata } from 'next'
import './globals.css'
import SessionProvider from '@/components/providers/SessionProvider'
import JsonLd from '@/components/seo/JsonLd'
import { getOrganizationSchema } from '@/lib/schema/organization'

export const metadata: Metadata = {
  title: {
    default: '기자재 매입 및 연구장비 폐기 전문 | 09all',
    template: '%s | 09all',
  },
  description: '중고 연구장비, 실험장비, 분석장비 매입 전문. 폐기자재 무료 수거. 전국 출장 매입 서비스. 20년 경력의 연구장비 매입 기업.',
  keywords: [
    '기자재 매입',
    '연구장비 매입',
    '실험장비 매입',
    '분석장비 매입',
    '계측장비 매입',
    '연구장비 폐기',
    '기자재 폐기',
    '실험장비 처분',
    '중고 연구장비',
    '폐실험장비',
  ],
  authors: [{ name: '09all' }],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://09all.com',
    siteName: '09all',
    title: '기자재 매입 및 연구장비 폐기 전문 | 09all',
    description: '중고 연구장비, 실험장비, 분석장비 매입 전문. 폐기자재 무료 수거.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Google Search Console 인증 코드를 여기에 추가할 수 있습니다
    // google: 'your-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const organizationSchema = getOrganizationSchema()

  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <link 
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css" 
          rel="stylesheet" 
        />
        <JsonLd data={organizationSchema} />
      </head>
      <body className="font-sans antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}

