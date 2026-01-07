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
  price: number
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
    <div className="card group hover:shadow-2xl transition-all duration-300">
      {/* 이미지 */}
      <Link href={`/equipment/${equipment.slug}`} className="block relative aspect-video bg-gray-100 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          이미지 준비중
        </div>
        
        {/* 상태 배지 */}
        <div className="absolute top-3 left-3 z-10">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${conditionColors[equipment.condition]}`}>
            {conditionLabels[equipment.condition]}
          </span>
        </div>

        {/* 조회수 */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-white text-xs">
          👁️ {equipment.viewCount}
        </div>
      </Link>

      {/* 정보 */}
      <div className="p-5">
        {/* 카테고리 */}
        <Link
          href={`/equipment?category=${equipment.category.slug}`}
          className="inline-block text-xs text-primary-600 hover:text-primary-700 font-medium mb-2"
        >
          {equipment.category.name}
        </Link>

        {/* 제목 */}
        <Link href={`/equipment/${equipment.slug}`}>
          <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {equipment.title}
          </h3>
        </Link>

        {/* 제조사 정보 */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <span className="font-medium">{equipment.brand}</span>
          <span className="text-gray-400">|</span>
          <span>{equipment.year}년</span>
          {equipment.warranty && (
            <>
              <span className="text-gray-400">|</span>
              <span>보증 {equipment.warranty}</span>
            </>
          )}
        </div>

        {/* 가격 */}
        <div className="text-2xl font-bold text-primary-600 mb-4">
          {formatPrice(equipment.price)}
        </div>

        {/* 버튼 */}
        <div className="flex gap-2">
          <Link
            href={`/equipment/${equipment.slug}`}
            className="flex-1 btn btn-secondary text-center text-sm"
          >
            상세보기
          </Link>
          <Link
            href={`/contact?equipment=${equipment.id}`}
            className="flex-1 btn btn-primary text-center text-sm"
          >
            견적요청
          </Link>
        </div>
      </div>
    </div>
  )
}

