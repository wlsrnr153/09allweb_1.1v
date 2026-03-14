'use client'

import { formatPrice } from '@/lib/utils'
import type { Equipment } from '@/types'

interface CatalogCardProps {
  equipment: Equipment
  index: number
}

const conditionLabels = {
  new: '신품',
  refurbished: '리퍼비시',
  demo: '데모용',
}

export default function CatalogCard({ equipment, index }: CatalogCardProps) {
  return (
    <div className="catalog-card bg-white border-2 border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* 헤더 - 번호와 카테고리 */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            {index + 1}
          </div>
          <div>
            <div className="text-xs opacity-90">
              {equipment.category?.name || '기타'}
            </div>
            <div className="font-semibold">{equipment.brand}</div>
          </div>
        </div>
        <div className="text-xs bg-white/20 px-3 py-1 rounded-full">
          {conditionLabels[equipment.condition]}
        </div>
      </div>

      {/* 본문 */}
      <div className="p-4">
        {/* 제목 */}
        <h3 className="font-bold text-lg mb-2 text-gray-900 leading-tight">
          {equipment.title}
        </h3>

        {/* 모델 및 연도 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3 pb-3 border-b border-gray-200">
          <span className="font-medium">모델:</span>
          <span>{equipment.model}</span>
          <span className="text-gray-300">|</span>
          <span>{equipment.year}년</span>
          {equipment.warranty && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-green-600">보증 {equipment.warranty}</span>
            </>
          )}
        </div>

        {/* 설명 */}
        <p className="text-sm text-gray-700 mb-3 line-clamp-3 leading-relaxed">
          {equipment.description}
        </p>

        {/* 주요 사양 (있는 경우) */}
        {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
          <div className="mb-3 pb-3 border-b border-gray-200">
            <div className="text-xs font-semibold text-gray-900 mb-2">주요 사양</div>
            <div className="grid grid-cols-1 gap-1">
              {Object.entries(equipment.specifications).slice(0, 3).map(([key, value]) => (
                <div key={key} className="flex text-xs">
                  <span className="text-gray-600 min-w-[80px]">{key}:</span>
                  <span className="text-gray-900 font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 특징 (있는 경우) */}
        {equipment.features && equipment.features.length > 0 && (
          <div className="mb-3">
            <div className="text-xs font-semibold text-gray-900 mb-2">주요 특징</div>
            <ul className="space-y-1">
              {equipment.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="flex items-start text-xs text-gray-700">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 가격 */}
        <div className="mt-4 pt-3 border-t-2 border-primary-100">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs text-gray-600 mb-1">판매가격</div>
              <div className="text-2xl font-bold text-primary-600">
                {formatPrice(equipment.price)}
              </div>
              {typeof equipment.price === 'number' && (
                <div className="text-xs text-gray-500 mt-1">VAT 별도</div>
              )}
            </div>
            <div className="text-xs text-gray-500 text-right">
              <div>문의: 02-1234-5678</div>
              <div className="no-print">
                <a 
                  href={`/equipment/${equipment.slug}`}
                  className="text-primary-600 hover:underline"
                >
                  상세보기 →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 인쇄용 QR 코드 영역 (선택사항) */}
      <div className="print-only px-4 pb-3 pt-2 bg-gray-50 border-t border-gray-200">
        <div className="text-xs text-gray-600 text-center">
          상세 정보: www.09all.com/equipment/{equipment.slug}
        </div>
      </div>
    </div>
  )
}
