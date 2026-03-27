'use client'

import { Equipment } from '@/types'
import Image from 'next/image'

interface EquipmentListProps {
  equipment: Equipment[]
  onEdit: (equipment: Equipment) => void
  onDelete: (id: string) => void
}

export default function EquipmentList({ equipment, onEdit, onDelete }: EquipmentListProps) {
  if (equipment.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold mb-2">등록된 장비가 없습니다</h3>
        <p className="text-gray-600">새 장비를 추가해보세요</p>
      </div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              장비
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              제조사/모델
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              가격
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              상태
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              재고
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              공개
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              작업
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {equipment.map((eq) => (
            <tr key={eq.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="h-12 w-12 flex-shrink-0 relative rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={eq.thumbnail}
                      alt={eq.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{eq.title}</div>
                    <div className="text-sm text-gray-500">{eq.category?.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{eq.brand}</div>
                <div className="text-sm text-gray-500">{eq.model}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {typeof eq.price === 'number' 
                    ? `₩${eq.price.toLocaleString()}`
                    : eq.price
                  }
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${eq.status === 'available' ? 'bg-green-100 text-green-800' : ''}
                  ${eq.status === 'sold' ? 'bg-red-100 text-red-800' : ''}
                  ${eq.status === 'reserved' ? 'bg-yellow-100 text-yellow-800' : ''}
                `}>
                  {eq.status === 'available' && '판매중'}
                  {eq.status === 'sold' && '판매완료'}
                  {eq.status === 'reserved' && '예약중'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {eq.stock}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${eq.isPublished ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}
                `}>
                  {eq.isPublished ? '공개' : '비공개'}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  onClick={() => onEdit(eq)}
                  className="text-primary-600 hover:text-primary-900 mr-4"
                >
                  수정
                </button>
                <button
                  onClick={() => onDelete(eq.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
