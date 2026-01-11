'use client'

import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/utils'

interface Equipment {
  id: string
  title: string
  slug: string
  brand: string
  model: string
  category: { name: string; slug: string }
<<<<<<< HEAD
  price: number | string
=======
  price: number
>>>>>>> 3239ec7a1d549603c3f6a29f68585b6b84c1e801
  condition: 'new' | 'refurbished' | 'demo'
  year: number
  warranty?: string
  thumbnail: string
  viewCount: number
}

interface EquipmentCardProps {
  equipment: Equipment
}

const conditionLabels = {
  new: '신품',
  refurbished: '리퍼비시',
  demo: '데모용',
}

const conditionColors = {
  new: 'bg-green-100 text-green-800',
  refurbished: 'bg-blue-100 text-blue-800',
  demo: 'bg-orange-100 text-orange-800',
}

export default function EquipmentCard({ equipment }: EquipmentCardProps) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 group border border-gray-100 hover:border-primary-200">
      {/* 이미지 */}
      <Link href={`/equipment/${equipment.slug}`} className="block relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-5xl mb-2">🔬</div>
            <div className="text-gray-400 text-sm">이미지 준비중</div>
          </div>
        </div>
        
        {/* 상태 배지 */}
        <div className="absolute top-4 left-4 z-10">
          <span className={`px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ${conditionColors[equipment.condition]}`}>
            {conditionLabels[equipment.condition]}
          </span>
        </div>

        {/* 조회수 */}
        <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-gray-700 text-xs font-semibold shadow">
          👁️ {equipment.viewCount}
        </div>

        {/* 호버 오버레이 */}
        <div className="absolute inset-0 bg-primary-600/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            <div className="font-semibold">자세히 보기</div>
          </div>
        </div>
      </Link>

      {/* 정보 */}
      <div className="p-6">
        {/* 카테고리 */}
        <Link
          href={`/equipment?category=${equipment.category.slug}`}
          className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-semibold mb-3 hover:bg-primary-100 transition-colors"
        >
          {equipment.category.name}
        </Link>

        {/* 제목 */}
        <Link href={`/equipment/${equipment.slug}`}>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[3.5rem]">
            {equipment.title}
          </h3>
        </Link>

        {/* 제조사 정보 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="font-semibold text-gray-900">{equipment.brand}</span>
          </div>
          <span className="text-gray-300">|</span>
          <span>{equipment.year}년</span>
          {equipment.warranty && (
            <>
              <span className="text-gray-300">|</span>
              <span className="text-accent-green">보증 {equipment.warranty}</span>
            </>
          )}
        </div>

        {/* 가격 */}
        <div className="mb-4">
          <div className="text-3xl font-bold text-primary-600">
            {formatPrice(equipment.price)}
          </div>
          <div className="text-xs text-gray-500 mt-1">VAT 별도</div>
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Link
            href={`/equipment/${equipment.slug}`}
            className="flex-1 py-3 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors text-center text-sm"
          >
            상세보기
          </Link>
          <Link
            href={`/contact?equipment=${equipment.id}`}
            className="flex-1 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors text-center text-sm shadow-md hover:shadow-lg"
          >
            견적요청
          </Link>
        </div>
      </div>
    </div>
  )
}

