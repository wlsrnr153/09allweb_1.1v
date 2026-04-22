import type { Metadata } from 'next'
import { getPublishedEquipment, getCategories, getBrands } from '@/lib/actions/equipment'
import EquipmentPageClient from './EquipmentPageClient'
import JsonLd from '@/components/seo/JsonLd'
import { getBreadcrumbSchema } from '@/lib/schema/breadcrumb'

export const metadata: Metadata = {
  title: '매입 가능 장비 카탈로그 | 연구장비 종류',
  description: '매입 가능한 연구장비, 실험장비 전체 목록. 분석장비, 계측장비, 광학장비 등 다양한 장비 매입. Agilent, Thermo Fisher 등 모든 브랜드.',
  keywords: [
    '연구장비 종류',
    '실험장비 목록',
    '분석장비 카탈로그',
    '매입 가능 장비',
    '계측장비 목록',
    'Agilent 장비 매입',
    'Thermo Fisher 매입',
  ],
  openGraph: {
    title: '매입 가능 장비 카탈로그 | 연구장비 종류 | 09all',
    description: '매입 가능한 연구장비, 실험장비 전체 목록. 분석장비, 계측장비, 광학장비 등.',
    url: 'https://09all.com/equipment',
  },
}

export default async function EquipmentPage() {
  // 서버에서 데이터 fetch
  const [equipment, categories, brands] = await Promise.all([
    getPublishedEquipment(),
    getCategories(),
    getBrands(),
  ])

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '홈', url: 'https://09all.com' },
    { name: '매입 가능 장비', url: 'https://09all.com/equipment' },
  ])

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <EquipmentPageClient 
        initialEquipment={equipment}
        categories={categories}
        brands={brands}
      />
    </>
  )
}
