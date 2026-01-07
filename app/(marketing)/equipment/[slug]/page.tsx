'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { sampleEquipment } from '@/lib/data/sample-equipment'
import { formatPrice } from '@/lib/utils'
import { openKakaoChannel } from '@/lib/kakao'

export default function EquipmentDetailPage() {
  const params = useParams()
  const slug = params.slug as string

  // 장비 데이터 찾기
  const equipment = sampleEquipment.find((eq) => eq.slug === slug)

  const [selectedImage, setSelectedImage] = useState(0)

  if (!equipment) {
    return (
      <div className="container py-20 text-center">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-2xl font-bold mb-4">장비를 찾을 수 없습니다</h1>
        <Link href="/equipment" className="btn btn-primary">
          장비 목록으로 돌아가기
        </Link>
      </div>
    )
  }

  const conditionLabels = {
    new: '신품',
    refurbished: '리퍼비시',
    demo: '데모용',
  }

  const handleKakaoContact = () => {
    const message = `[견적 문의]\n장비: ${equipment.title}\n모델: ${equipment.model}\n\n견적 요청드립니다.`
    
    // 메시지를 클립보드에 복사
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message)
    }
    
    // 카카오톡 채널 오픈
    openKakaoChannel()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">
              홈
            </Link>
            <span>/</span>
            <Link href="/equipment" className="hover:text-primary-600">
              장비안내
            </Link>
            <span>/</span>
            <Link
              href={`/equipment?category=${equipment.category.slug}`}
              className="hover:text-primary-600"
            >
              {equipment.category.name}
            </Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{equipment.title}</span>
          </nav>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 이미지 갤러리 */}
          <div>
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
          </div>

          {/* 장비 정보 */}
          <div>
            <div className="bg-white rounded-lg p-6">
              {/* 카테고리 & 상태 */}
              <div className="flex items-center gap-3 mb-4">
                <Link
                  href={`/equipment?category=${equipment.category.slug}`}
                  className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                >
                  {equipment.category.name}
                </Link>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  {conditionLabels[equipment.condition]}
                </span>
              </div>

              {/* 제목 */}
              <h1 className="text-3xl font-bold mb-4">{equipment.title}</h1>

              {/* 제조사 정보 */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
                <div>
                  <span className="text-gray-500">제조사:</span>{' '}
                  <span className="font-medium text-gray-900">{equipment.brand}</span>
                </div>
                <div>
                  <span className="text-gray-500">모델:</span>{' '}
                  <span className="font-medium text-gray-900">{equipment.model}</span>
                </div>
                <div>
                  <span className="text-gray-500">제조년도:</span>{' '}
                  <span className="font-medium text-gray-900">{equipment.year}년</span>
                </div>
                {equipment.warranty && (
                  <div>
                    <span className="text-gray-500">보증:</span>{' '}
                    <span className="font-medium text-gray-900">{equipment.warranty}</span>
                  </div>
                )}
              </div>

              {/* 가격 */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">판매가격</div>
                <div className="text-4xl font-bold text-primary-600">
                  {formatPrice(equipment.price)}
                </div>
                <div className="text-sm text-gray-500 mt-1">VAT 별도</div>
              </div>

              {/* 재고 */}
              <div className="flex items-center gap-2 text-sm mb-6">
                <span
                  className={`w-2 h-2 rounded-full ${
                    equipment.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-gray-700">
                  {equipment.stock > 0 ? `재고 ${equipment.stock}개` : '품절'}
                </span>
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

              <Link href={`/contact?equipment=${equipment.id}`} className="btn btn-secondary w-full">
                문의 폼 작성하기
              </Link>

              {/* 공유 버튼 */}
              <div className="mt-4 pt-4 border-t">
                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 정보 탭 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="container">
              <div className="flex gap-8">
                <button className="py-4 px-2 border-b-2 border-primary-500 font-semibold text-primary-600">
                  상세설명
                </button>
                <button className="py-4 px-2 text-gray-600 hover:text-gray-900">사양</button>
                <button className="py-4 px-2 text-gray-600 hover:text-gray-900">특징</button>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* 상세설명 */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">장비 소개</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{equipment.description}</p>

              <h3 className="text-xl font-bold mb-3">주요 사양</h3>
              <table className="w-full mb-6">
                <tbody>
                  {Object.entries(equipment.specifications || {}).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-3 px-4 bg-gray-50 font-medium w-1/3">{key}</td>
                      <td className="py-3 px-4">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="text-xl font-bold mb-3">주요 특징</h3>
              <ul className="space-y-2">
                {equipment.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 관련 장비 */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">관련 장비</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleEquipment
              .filter(
                (eq) => eq.category.slug === equipment.category.slug && eq.id !== equipment.id
              )
              .slice(0, 3)
              .map((eq) => (
                <Link
                  key={eq.id}
                  href={`/equipment/${eq.slug}`}
                  className="card group hover:shadow-xl transition-all"
                >
                  <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">이미지 준비중</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary-600">
                      {eq.title}
                    </h3>
                    <div className="text-xl font-bold text-primary-600">
                      {formatPrice(eq.price)}
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

