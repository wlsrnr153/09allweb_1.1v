import { getPublishedEquipment, getCategories, getBrands } from '@/lib/actions/equipment'
import CatalogView from '@/components/catalog/CatalogView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '장비 카탈로그 | 09all 연구장비 매입',
  description: '09all의 전체 연구장비 목록을 한눈에 확인하고 인쇄하세요. 분석장비, 계측장비, 실험장비 등 다양한 장비를 제공합니다.',
}

export default async function CatalogPage() {
  // 서버에서 데이터 fetch
  const [equipment, categories, brands] = await Promise.all([
    getPublishedEquipment(),
    getCategories(),
    getBrands(),
  ])

  return <CatalogView initialEquipment={equipment} categories={categories} brands={brands} />
}
