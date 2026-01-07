'use client'

import { useState } from 'react'

export interface FilterState {
  category: string[]
  brand: string[]
  priceRange: { min: number; max: number } | null
  condition: string[]
  year: { min: number; max: number } | null
  keyword: string
}

interface EquipmentFilterProps {
  categories: Array<{ id: string; name: string; slug: string }>
  brands: string[]
  onFilterChange: (filters: FilterState) => void
}

export default function EquipmentFilter({
  categories,
  brands,
  onFilterChange,
}: EquipmentFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brand: [],
    priceRange: null,
    condition: [],
    year: null,
    keyword: '',
  })

  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleCategoryChange = (slug: string) => {
    const newCategories = filters.category.includes(slug)
      ? filters.category.filter((c) => c !== slug)
      : [...filters.category, slug]
    updateFilter('category', newCategories)
  }

  const handleBrandChange = (brand: string) => {
    const newBrands = filters.brand.includes(brand)
      ? filters.brand.filter((b) => b !== brand)
      : [...filters.brand, brand]
    updateFilter('brand', newBrands)
  }

  const handleConditionChange = (condition: string) => {
    const newConditions = filters.condition.includes(condition)
      ? filters.condition.filter((c) => c !== condition)
      : [...filters.condition, condition]
    updateFilter('condition', newConditions)
  }

  const handlePriceRangeChange = (min: number, max: number) => {
    updateFilter('priceRange', { min, max })
  }

  const handleReset = () => {
    const resetFilters: FilterState = {
      category: [],
      brand: [],
      priceRange: null,
      condition: [],
      year: null,
      keyword: '',
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const activeFilterCount =
    filters.category.length +
    filters.brand.length +
    filters.condition.length +
    (filters.priceRange ? 1 : 0) +
    (filters.year ? 1 : 0)

  return (
    <>
      {/* 모바일 필터 버튼 */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full btn btn-secondary flex items-center justify-between"
        >
          <span>필터 {activeFilterCount > 0 && `(${activeFilterCount})`}</span>
          <svg
            className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* 필터 패널 */}
      <div
        className={`
          ${isOpen ? 'block' : 'hidden'} lg:block
          bg-white rounded-lg shadow-md p-6 space-y-6
        `}
      >
        {/* 검색 */}
        <div>
          <label className="block text-sm font-semibold mb-2">검색</label>
          <input
            type="text"
            placeholder="장비명, 모델명, 제조사..."
            value={filters.keyword}
            onChange={(e) => updateFilter('keyword', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label className="block text-sm font-semibold mb-3">카테고리</label>
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.category.includes(category.slug)}
                  onChange={() => handleCategoryChange(category.slug)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{category.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 제조사 */}
        <div>
          <label className="block text-sm font-semibold mb-3">제조사</label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.brand.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 가격대 */}
        <div>
          <label className="block text-sm font-semibold mb-3">가격대</label>
          <div className="space-y-2">
            {[
              { label: '5천만원 이하', min: 0, max: 50000000 },
              { label: '5천만원 - 1억원', min: 50000000, max: 100000000 },
              { label: '1억원 - 3억원', min: 100000000, max: 300000000 },
              { label: '3억원 이상', min: 300000000, max: 999999999 },
            ].map((range) => (
              <label key={range.label} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="priceRange"
                  checked={
                    filters.priceRange?.min === range.min && filters.priceRange?.max === range.max
                  }
                  onChange={() => handlePriceRangeChange(range.min, range.max)}
                  className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 상태 */}
        <div>
          <label className="block text-sm font-semibold mb-3">상태</label>
          <div className="space-y-2">
            {[
              { value: 'new', label: '신품' },
              { value: 'refurbished', label: '리퍼비시' },
              { value: 'demo', label: '데모용' },
            ].map((condition) => (
              <label key={condition.value} className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.condition.includes(condition.value)}
                  onChange={() => handleConditionChange(condition.value)}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-gray-700">{condition.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* 초기화 버튼 */}
        {activeFilterCount > 0 && (
          <button
            onClick={handleReset}
            className="w-full btn btn-secondary"
          >
            필터 초기화 ({activeFilterCount})
          </button>
        )}
      </div>
    </>
  )
}

