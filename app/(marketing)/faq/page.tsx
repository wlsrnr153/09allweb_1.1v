import type { Metadata } from 'next'
import JsonLd from '@/components/seo/JsonLd'
import { getFAQSchema } from '@/lib/schema/faq'
import { getBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { sampleFAQ } from '@/lib/data/sample-faq'
import FAQPageClient from './FAQPageClient'

export const metadata: Metadata = {
  title: '자주 묻는 질문 (FAQ) | 연구장비 매입',
  description: '09all 연구장비 매입 관련 자주 묻는 질문. 장비 구매, 배송, 설치, A/S, 폐기 처리 등에 대한 답변을 확인하세요.',
  keywords: [
    'FAQ',
    '자주 묻는 질문',
    '연구장비 매입 문의',
    '실험장비 구매',
    '장비 폐기 문의',
    '기자재 매입 FAQ',
  ],
  openGraph: {
    title: '자주 묻는 질문 (FAQ) | 연구장비 매입 | 09all',
    description: '09all 연구장비 매입 관련 자주 묻는 질문과 답변.',
    url: 'https://09all.com/faq',
  },
}

export default function FAQPage() {
  // FAQ Schema 생성 (상위 10개만)
  const faqSchemaData = getFAQSchema(
    sampleFAQ.slice(0, 10).map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }))
  )

  // Breadcrumb Schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '홈', url: 'https://09all.com' },
    { name: 'FAQ', url: 'https://09all.com/faq' },
  ])

  return (
    <>
      <JsonLd data={faqSchemaData} />
      <JsonLd data={breadcrumbSchema} />
      <FAQPageClient />
    </>
  )
}
