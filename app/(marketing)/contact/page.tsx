'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { sampleEquipment } from '@/lib/data/sample-equipment'
import { openKakaoChannel } from '@/lib/kakao'

export default function ContactPage() {
  const searchParams = useSearchParams()
  const equipmentId = searchParams.get('equipment')
  
  const selectedEquipment = equipmentId 
    ? sampleEquipment.find((eq) => eq.id === equipmentId)
    : null

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    category: '일반문의',
    equipmentId: equipmentId || '',
    message: '',
    privacyAgreed: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.privacyAgreed) {
      alert('개인정보 수집 및 이용에 동의해주세요')
      return
    }

    setIsSubmitting(true)

    // 실제 API 호출 시뮬레이션 (2초 지연)
    await new Promise((resolve) => setTimeout(resolve, 2000))

    console.log('Form submitted:', formData)
    setIsSubmitting(false)
    setSubmitted(true)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleKakaoContact = () => {
    let message = `[09all 문의]\n이름: ${formData.name || '미입력'}\n회사: ${formData.company || '미입력'}\n\n`
    
    if (selectedEquipment) {
      message += `문의 장비: ${selectedEquipment.title}\n\n`
    }
    
    if (formData.message) {
      message += `문의 내용:\n${formData.message}`
    }

    // 클립보드에 복사
    if (navigator.clipboard && message) {
      navigator.clipboard.writeText(message)
    }

    // 카카오톡 채널 오픈
    openKakaoChannel()
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold mb-4">매입 견적 요청이 접수되었습니다</h2>
          <p className="text-gray-600 mb-6">
            빠른 시일 내에 전문가가 현장 방문하여<br />
            정확한 평가를 진행하겠습니다.<br />
            감사합니다.
          </p>
          <div className="space-y-3">
            <button
              onClick={handleKakaoContact}
              className="btn btn-primary w-full"
            >
              카카오톡으로 계속 매입 상담하기
            </button>
            <a href="/" className="btn btn-secondary w-full">
              홈으로 돌아가기
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">매입 문의</h1>
          <p className="text-gray-600">
            사용하지 않는 연구장비 매입 견적을 요청해주세요
          </p>
        </div>
      </div>

      {/* 카카오톡 강조 배너 */}
      <div className="bg-gradient-to-r from-[#FEE500] to-[#FDD835] border-b-4 border-[#FDD835]">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z"
                    fill="#3C1E1E"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  카카오톡으로 빠르게 상담받으세요!
                </h3>
                <p className="text-sm text-gray-700">
                  실시간 견적 문의 · 평일 09:00-18:00 · 평균 응답 시간 5분 이내
                </p>
              </div>
            </div>
            <button
              onClick={handleKakaoContact}
              className="px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl whitespace-nowrap flex items-center gap-2"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z" fill="white" />
              </svg>
              카카오톡 상담 시작
            </button>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 연락처 정보 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="font-bold text-xl mb-4">매입 상담 연락처</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="text-primary-600 mr-3 mt-1">📞</div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">전화</div>
                    <a href="tel:02-1234-5678" className="font-semibold text-lg hover:text-primary-600">
                      02-1234-5678
                    </a>
                    <div className="text-xs text-gray-500 mt-1">
                      평일 09:00-18:00
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary-600 mr-3 mt-1">📠</div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">팩스</div>
                    <div className="font-semibold">02-1234-5679</div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary-600 mr-3 mt-1">📧</div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">이메일</div>
                    <a href="mailto:info@09all.com" className="font-semibold hover:text-primary-600">
                      info@09all.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="text-primary-600 mr-3 mt-1">📍</div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">주소</div>
                    <div className="font-semibold">
                      서울특별시 강남구<br />
                      테헤란로 123, 456호
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={handleKakaoContact}
                  className="w-full py-4 bg-gradient-to-r from-[#FEE500] to-[#FDD835] text-gray-900 font-bold rounded-xl hover:from-[#FDD835] hover:to-[#FEE500] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 text-lg relative group"
                >
                  <svg className="w-7 h-7 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z" fill="#3C1E1E" />
                  </svg>
                  <span>카카오톡 매입 상담</span>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    빠름
                  </span>
                </button>
                <p className="text-xs text-center text-gray-500 mt-2">
                  평균 응답 시간 5분 이내
                </p>
              </div>
            </div>
          </div>

          {/* 문의 폼 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              {selectedEquipment && (
                <div className="bg-primary-50 rounded-lg p-4 mb-6">
                  <div className="text-sm text-primary-600 font-medium mb-1">
                    문의 장비
                  </div>
                  <div className="font-semibold">{selectedEquipment.title}</div>
                  <div className="text-sm text-gray-600">
                    {selectedEquipment.brand} | {selectedEquipment.model}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* 이름 */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="홍길동"
                  />
                </div>

                {/* 회사명 */}
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                    회사/기관명
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="OO대학교"
                  />
                </div>

                {/* 연락처 & 이메일 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="010-1234-5678"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      이메일 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="example@email.com"
                    />
                  </div>
                </div>

                {/* 문의 유형 */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                    문의 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="일반문의">일반문의</option>
                    <option value="견적문의">견적문의</option>
                    <option value="AS문의">AS문의</option>
                    <option value="기타">기타</option>
                  </select>
                </div>

                {/* 문의 내용 */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    매입 장비 정보 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="매입하실 장비명, 모델명, 제조사, 구매년도, 사용 상태 등을 자세히 입력해주세요"
                  />
                </div>

                {/* 개인정보 동의 */}
                <div>
                  <label className="flex items-start cursor-pointer">
                    <input
                      type="checkbox"
                      name="privacyAgreed"
                      checked={formData.privacyAgreed}
                      onChange={handleChange}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 mt-0.5"
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      개인정보 수집 및 이용에 동의합니다 <span className="text-red-500">*</span>
                      <div className="text-xs text-gray-500 mt-1">
                        수집항목: 이름, 회사명, 연락처, 이메일<br />
                        이용목적: 문의 응대 및 상담<br />
                        보유기간: 문의 처리 완료 후 3개월
                      </div>
                    </span>
                  </label>
                </div>

                {/* 제출 버튼 */}
                <div className="space-y-3">
                  <div className="flex gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? '제출 중...' : '매입 견적 요청'}
                  </button>
                    <button
                      type="button"
                      onClick={handleKakaoContact}
                      className="px-6 py-4 bg-gradient-to-r from-[#FEE500] to-[#FDD835] text-gray-900 font-bold rounded-lg hover:from-[#FDD835] hover:to-[#FEE500] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z" fill="#3C1E1E" />
                      </svg>
                      <span className="hidden sm:inline">카카오톡</span>
                    </button>
                  </div>
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={handleKakaoContact}
                      className="text-sm text-primary-600 hover:text-primary-700 font-semibold underline"
                    >
                      또는 카카오톡으로 바로 매입 상담받기 →
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

