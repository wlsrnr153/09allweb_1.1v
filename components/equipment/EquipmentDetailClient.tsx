'use client'

import { useState } from 'react'
import { openKakaoOpenChat } from '@/lib/kakao'
import { Equipment } from '@/types'

interface EquipmentDetailClientProps {
  equipment: Equipment
}

export default function EquipmentDetailClient({ equipment }: EquipmentDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)

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
        <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
          <span className="text-gray-400">이미지 준비중</span>
        </div>

        {/* 썸네일 */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <button
              key={i}
              onClick={() => setSelectedImage(i - 1)}
              className={`aspect-square bg-gray-100 rounded-lg border-2 ${
                selectedImage === i - 1 ? 'border-primary-500' : 'border-transparent'
              }`}
            >
              <span className="text-xs text-gray-400">이미지 {i}</span>
            </button>
          ))}
        </div>
      </div>

      {/* CTA 버튼 */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <button onClick={handleKakaoContact} className="btn btn-primary">
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z" />
          </svg>
          카카오톡 견적상담
        </button>
        <a href="tel:02-1234-5678" className="btn btn-secondary text-center">
          📞 전화 문의
        </a>
      </div>
    </>
  )
}
