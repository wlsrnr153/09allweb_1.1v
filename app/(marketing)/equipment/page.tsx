'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import EquipmentFilter, { FilterState } from '@/components/equipment/EquipmentFilter'
import EquipmentCard from '@/components/equipment/EquipmentCard'
import { sampleEquipment, sampleCategories, sampleBrands } from '@/lib/data/sample-equipment'

type SortOption = 'latest' | 'price-low' | 'price-high' | 'popular'

const ITEMS_PER_PAGE = 12

export default function EquipmentPage() {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    brand: [],
    priceRange: null,
    condition: [],
    year: null,
    keyword: '',
  })
  const [sortBy, setSortBy] = useState<SortOption>('latest')
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const [isLoading, setIsLoading] = useState(false)
  const observerRef = useRef<HTMLDivElement>(null)

  // 필터링 및 정렬된 장비 목록
  const filteredEquipment = useMemo(() => {
    let result = [...sampleEquipment]

    // 카테고리 필터
    if (filters.category.length > 0) {
      result = result.filter((eq) => filters.category.includes(eq.category.slug))
    }

    // 제조사 필터
    if (filters.brand.length > 0) {
      result = result.filter((eq) => filters.brand.includes(eq.brand))
    }

    // 가격 범위 필터
    if (filters.priceRange) {
      result = result.filter(
        (eq) => eq.price >= filters.priceRange!.min && eq.price <= filters.priceRange!.max
      )
    }

    // 상태 필터
    if (filters.condition.length > 0) {
      result = result.filter((eq) => filters.condition.includes(eq.condition))
    }

    // 키워드 검색
    if (filters.keyword) {
      const keyword = filters.keyword.toLowerCase()
      result = result.filter(
        (eq) =>
          eq.title.toLowerCase().includes(keyword) ||
          eq.brand.toLowerCase().includes(keyword) ||
          eq.model.toLowerCase().includes(keyword) ||
          eq.description.toLowerCase().includes(keyword)
      )
    }

    // 정렬
    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        break
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result.sort((a, b) => b.viewCount - a.viewCount)
        break
    }

    return result
  }, [filters, sortBy])

  // 표시할 장비 목록 (무한 스크롤용)
  const displayedEquipment = filteredEquipment.slice(0, displayCount)
  const hasMore = displayCount < filteredEquipment.length

  // 무한 스크롤 구현
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting && hasMore && !isLoading) {
          setIsLoading(true)
          // 로딩 시뮬레이션 (실제 API에서는 제거)
          setTimeout(() => {
            setDisplayCount((prev) => prev + ITEMS_PER_PAGE)
            setIsLoading(false)
          }, 500)
        }
      },
      { threshold: 0.1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasMore, isLoading])

  // 필터 변경 시 표시 개수 초기화
  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [filters, sortBy])

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
            <EquipmentFilter
              categories={sampleCategories}
              brands={sampleBrands}
              onFilterChange={setFilters}
            />
          </div>

          {/* 장비 목록 */}
          <div className="lg:col-span-3">
            {/* 결과 정보 및 정렬 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  총 <span className="font-bold text-primary-600">{filteredEquipment.length}</span>개의 장비
                </p>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">정렬:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="latest">최신순</option>
                  <option value="price-low">가격 낮은 순</option>
                  <option value="price-high">가격 높은 순</option>
                  <option value="popular">인기순</option>
                </select>
              </div>
            </div>

            {/* 장비 그리드 */}
            {filteredEquipment.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayedEquipment.map((equipment) => (
                    <EquipmentCard key={equipment.id} equipment={equipment} />
                  ))}
                </div>

                {/* 무한 스크롤 트리거 */}
                <div ref={observerRef} className="py-8 text-center">
                  {isLoading && (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                      <span className="ml-3 text-gray-600">로딩 중...</span>
                    </div>
                  )}
                  {!hasMore && displayedEquipment.length > 0 && (
                    <p className="text-gray-500">모든 장비를 확인했습니다</p>
                  )}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">
                  다른 검색어나 필터 조건을 시도해보세요
                </p>
                <button
                  onClick={() =>
                    setFilters({
                      category: [],
                      brand: [],
                      priceRange: null,
                      condition: [],
                      year: null,
                      keyword: '',
                    })
                  }
                  className="btn btn-primary"
                >
                  필터 초기화
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

