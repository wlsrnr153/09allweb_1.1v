'use client'

import { useState } from 'react'
import { openKakaoOpenChat } from '@/lib/kakao'
import { COMPANY_CONTACTS, telHref } from '@/lib/constants/contact'
import { Equipment } from '@/types'
import Image from 'next/image'
import { siteImages } from '@/lib/site-images'

interface EquipmentDetailClientProps {
  equipment: Equipment
}

export default function EquipmentDetailClient({ equipment }: EquipmentDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const fallbackByCategory: Record<string, string> = {
    analytical: siteImages.equipment('category-analytical.svg'),
    measurement: siteImages.equipment('category-measurement.svg'),
    laboratory: siteImages.equipment('category-laboratory.svg'),
    others: siteImages.equipment('category-others.svg'),
  }
  const fallbackImage =
    fallbackByCategory[equipment.category?.slug || ''] ||
    siteImages.equipment('category-others.svg')
  const imageList =
    equipment.images && equipment.images.length > 0
      ? equipment.images
      : [equipment.thumbnail || fallbackImage]
  const activeImage = imageList[Math.min(selectedImage, imageList.length - 1)] || fallbackImage

  const handleKakaoContact = () => {
    const message = `[견적 문의]\n장비: ${equipment.title}\n모델: ${equipment.model}\n\n견적 요청드립니다.`
    
    // 메시지를 클립보드에 복사
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message)
    }
    
    // 카카오톡 오픈 채팅방 열기
    openKakaoOpenChat()
  }

  return (
    <>
      {/* 이미지 갤러리 */}
      <div className="bg-white rounded-lg p-6 mb-4">
        <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
          <Image
            src={activeImage}
            alt={`${equipment.title} 상세 이미지`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        {/* 썸네일 */}
        <div className="grid grid-cols-4 gap-2">
          {imageList.slice(0, 4).map((image, i) => (
            <button
              key={`${image}-${i}`}
              onClick={() => setSelectedImage(i)}
              className={`relative aspect-square bg-gray-100 rounded-lg border-2 overflow-hidden ${
                selectedImage === i ? 'border-primary-500' : 'border-transparent'
              }`}
            >
              <Image
                src={image}
                alt={`${equipment.title} 썸네일 ${i + 1}`}
                fill
                sizes="120px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* CTA 버튼 */}
      <div className="space-y-3 mb-4">
        <button onClick={handleKakaoContact} className="btn btn-primary w-full">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z" />
          </svg>
          카카오톡 견적상담
        </button>
        <div className="grid grid-cols-1 gap-2">
          {COMPANY_CONTACTS.map(({ role, phone }) => (
            <a
              key={phone}
              href={telHref(phone)}
              className="btn btn-secondary text-center text-sm py-2.5"
            >
              📞 {role} {phone}
            </a>
          ))}
        </div>
      </div>
    </>
  )
}
