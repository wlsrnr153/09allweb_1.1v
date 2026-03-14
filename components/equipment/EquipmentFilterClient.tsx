'use client'

import EquipmentFilter, { FilterState } from './EquipmentFilter'
import { Category } from '@/types'

interface EquipmentFilterClientProps {
  categories: Category[]
  brands: string[]
  onFilterChange: (filters: FilterState) => void
}

export default function EquipmentFilterClient({
  categories,
  brands,
  onFilterChange,
}: EquipmentFilterClientProps) {
  return (
    <EquipmentFilter
      categories={categories}
      brands={brands}
      onFilterChange={onFilterChange}
    />
  )
}
