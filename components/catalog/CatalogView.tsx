'use client'

import { useState, useMemo } from 'react'
import CatalogCard from './CatalogCard'
import { PHONES_DISPLAY_COMMA } from '@/lib/constants/contact'
import { COMPANY_ADDRESS, COMPANY_EMAIL } from '@/lib/constants/company'
import type { Equipment, Category } from '@/types'

interface CatalogViewProps {
  initialEquipment: Equipment[]
  categories: Category[]
  brands: string[]
}

export default function CatalogView({ initialEquipment, categories, brands }: CatalogViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedBrand, setSelectedBrand] = useState<string>('all')
  const [sortBy, setSortBy] = useState<'name' | 'brand' | 'category'>('category')

  // 필터링 및 정렬
  const filteredEquipment = useMemo(() => {
    let filtered = [...initialEquipment]

    // 카테고리 필터
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category?.slug === selectedCategory)
    }

    // 브랜드 필터
    if (selectedBrand !== 'all') {
      filtered = filtered.filter(item => item.brand === selectedBrand)
    }

    // 정렬
    filtered.sort((a, b) => {
      if (sortBy === 'name') {
        return a.title.localeCompare(b.title, 'ko')
      } else if (sortBy === 'brand') {
        return a.brand.localeCompare(b.brand, 'ko')
      } else {
        // category
        const categoryA = a.category?.name || ''
        const categoryB = b.category?.name || ''
        if (categoryA === categoryB) {
          return a.title.localeCompare(b.title, 'ko')
        }
        return categoryA.localeCompare(categoryB, 'ko')
      }
    })

    return filtered
  }, [initialEquipment, selectedCategory, selectedBrand, sortBy])

  const handlePrint = () => {
    window.print()
  }

  const handleReset = () => {
    setSelectedCategory('all')
    setSelectedBrand('all')
    setSortBy('category')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 - 인쇄 시에만 표시 */}
      <div className="print-only">
        <div className="bg-white border-b-4 border-primary-600 py-8 mb-6">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">09all 연구장비 카탈로그</h1>
            <p className="text-gray-600">전문 연구장비 매입 전문업체</p>
            <p className="text-sm text-gray-500 mt-4">
              문의: {PHONES_DISPLAY_COMMA} | www.09all.com | {new Date().toLocaleDateString('ko-KR')} 발행
            </p>
          </div>
        </div>
      </div>

      {/* 필터 및 컨트롤 - 화면에만 표시 (인쇄 시 숨김) */}
      <div className="no-print bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* 제목 */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">장비 카탈로그</h1>
            <p className="text-gray-600">전체 장비 목록을 확인하고 인쇄하실 수 있습니다</p>
          </div>

          {/* 필터 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* 카테고리 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">전체 카테고리</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name} ({cat.equipmentCount || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* 브랜드 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">브랜드</label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="all">전체 브랜드</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            {/* 정렬 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">정렬</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="category">카테고리순</option>
                <option value="name">제품명순</option>
                <option value="brand">브랜드순</option>
              </select>
            </div>

            {/* 버튼 */}
            <div className="flex items-end gap-2">
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                초기화
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-md flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                인쇄
              </button>
            </div>
          </div>

          {/* 결과 카운트 */}
          <div className="text-sm text-gray-600">
            총 <span className="font-bold text-primary-600">{filteredEquipment.length}</span>개 장비
          </div>
        </div>
      </div>

      {/* 카탈로그 그리드 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredEquipment.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">장비가 없습니다</h3>
            <p className="text-gray-600">다른 조건으로 검색해보세요</p>
          </div>
        ) : (
          <div className="catalog-grid">
            {filteredEquipment.map((equipment, index) => (
              <CatalogCard key={equipment.id} equipment={equipment} index={index} />
            ))}
          </div>
        )}
      </div>

      {/* 푸터 - 인쇄 시에만 표시 */}
      <div className="print-only mt-12">
        <div className="max-w-7xl mx-auto px-4 border-t-2 border-gray-300 pt-6">
          <div className="text-center text-sm text-gray-600">
            <p className="font-semibold text-gray-900 mb-2">09all 연구장비 매입 전문</p>
            <p>
              {COMPANY_ADDRESS} | 전화: {PHONES_DISPLAY_COMMA} | 이메일: {COMPANY_EMAIL}
            </p>
            <p className="mt-2 text-xs text-gray-500">
              본 카탈로그의 모든 정보는 발행일 기준이며, 실제 재고 및 가격은 변동될 수 있습니다.
            </p>
          </div>
        </div>
      </div>

      {/* 인쇄용 스타일 */}
      <style jsx global>{`
        @media print {
          /* 인쇄 시 숨김 */
          .no-print {
            display: none !important;
          }

          /* 인쇄 시에만 표시 */
          .print-only {
            display: block !important;
          }

          /* 페이지 설정 */
          @page {
            size: A4;
            margin: 15mm;
          }

          body {
            background: white;
          }

          /* 카탈로그 그리드 - 인쇄 시 2열 */
          .catalog-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10mm;
          }

          /* 페이지 나누기 방지 */
          .catalog-card {
            page-break-inside: avoid;
            break-inside: avoid;
          }

          /* 링크 색상 */
          a {
            color: inherit;
            text-decoration: none;
          }
        }

        @media screen {
          /* 화면에서는 숨김 */
          .print-only {
            display: none;
          }

          /* 화면용 그리드 - 3열 */
          .catalog-grid {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            gap: 1.5rem;
          }

          @media (min-width: 768px) {
            .catalog-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }

          @media (min-width: 1024px) {
            .catalog-grid {
              grid-template-columns: repeat(3, 1fr);
            }
          }
        }
      `}</style>
    </div>
  )
}
