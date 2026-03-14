'use client'

import { useState } from 'react'
import EquipmentFilterClient from '@/components/equipment/EquipmentFilterClient'
import EquipmentListClient from '@/components/equipment/EquipmentListClient'
import { FilterState } from '@/components/equipment/EquipmentFilter'
import { Equipment, Category } from '@/types'

interface EquipmentPageClientProps {
  initialEquipment: Equipment[]
  categories: Category[]
  brands: string[]
}

export default function EquipmentPageClient({
  initialEquipment,
  categories,
  brands,
}: EquipmentPageClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brand: [],
    priceRange: null,
    includeNonNumericPrice: false,
    condition: [],
    year: null,
    keyword: '',
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">매입 가능 장비</h1>
          <p className="text-gray-600">
            매입 가능한 연구장비를 확인하고 견적을 요청하세요
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 필터 사이드바 */}
          <div className="lg:col-span-1">
            <EquipmentFilterClient
              categories={categories}
              brands={brands}
              onFilterChange={setFilters}
            />
          </div>

          {/* 장비 목록 */}
          <div className="lg:col-span-3">
            <EquipmentListClient 
              equipment={initialEquipment}
              filters={filters}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
