import { getPublishedEquipment, getCategories, getBrands } from '@/lib/actions/equipment'
import EquipmentPageClient from './EquipmentPageClient'

export default async function EquipmentPage() {
  // 서버에서 데이터 fetch
  const [equipment, categories, brands] = await Promise.all([
    getPublishedEquipment(),
    getCategories(),
    getBrands(),
  ])

  return (
    <EquipmentPageClient 
      initialEquipment={equipment}
      categories={categories}
      brands={brands}
    />
  )
}
