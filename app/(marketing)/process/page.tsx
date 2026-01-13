'use client'

import Link from 'next/link'
import { openKakaoOpenChat } from '@/lib/kakao'

export default function ProcessPage() {
  const steps = [
    {
      number: '01',
      title: '문의 접수',
      description: '온라인 문의, 전화, 카카오톡을 통해 매입을 원하시는 장비 정보를 알려주세요.',
      details: [
        '장비명, 모델명, 제조사 정보',
        '구매 시기 및 사용 기간',
        '현재 상태 및 보관 환경',
        '희망 매입 가격 (선택사항)',
      ],
      icon: '📞',
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: '02',
      title: '현장 방문',
      description: '전문 평가사가 현장을 방문하여 장비의 상태를 정확히 평가합니다.',
      details: [
        '장비 외관 및 작동 상태 점검',
        '부품 마모도 및 수명 평가',
        '정확한 시장 가격 조사',
        '매입 가능 여부 최종 확인',
      ],
      icon: '🚗',
      color: 'from-green-500 to-green-600',
    },
    {
      number: '03',
      title: '견적 제시',
      description: '평가 결과를 바탕으로 공정하고 합리적인 매입 가격을 제시해드립니다.',
      details: [
        '시장 가격 기준 공정한 평가',
        '상세한 견적서 제공',
        '가격 협의 가능',
        '계약 조건 안내',
      ],
      icon: '💰',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      number: '04',
      title: '계약 체결',
      description: '견적에 동의하시면 계약서를 작성하고 매입 조건을 확정합니다.',
      details: [
        '계약서 작성 및 서명',
        '매입 가격 및 조건 확정',
        '인수 일정 조율',
        '지급 방법 안내',
      ],
      icon: '📝',
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: '05',
      title: '장비 인수',
      description: '약정된 일정에 맞춰 장비를 안전하게 수거하고 매입 대금을 지급합니다.',
      details: [
        '전문 운반팀 출동',
        '안전한 포장 및 운반',
        '인수 확인서 작성',
        '매입 대금 즉시 지급',
      ],
      icon: '📦',
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">매입 프로세스</h1>
          <p className="text-gray-600">
            간단하고 투명한 5단계 매입 프로세스로 신속하게 진행됩니다
          </p>
        </div>
      </div>

      {/* 프로세스 단계 */}
      <div className="container py-12">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-8">
                {/* 왼쪽: 아이콘 및 번호 */}
                <div className="flex flex-col items-center justify-center lg:border-r border-gray-200">
                  <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-5xl mb-4 shadow-lg`}>
                    {step.icon}
                  </div>
                  <div className="text-6xl font-bold text-gray-200">{step.number}</div>
                </div>

                {/* 중앙: 내용 */}
                <div className="lg:col-span-2">
                  <h2 className="text-2xl font-bold mb-3">{step.title}</h2>
                  <p className="text-gray-700 mb-4 text-lg">{step.description}</p>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <svg
                          className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 화살표 (마지막 제외) */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-4">
                  <svg
                    className="w-8 h-8 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 소요 시간 안내 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">빠르고 신속한 매입 프로세스</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">당일</div>
                <div className="text-primary-100">견적 제시</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">1-2일</div>
                <div className="text-primary-100">계약 체결</div>
              </div>
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                <div className="text-4xl font-bold mb-2">3-5일</div>
                <div className="text-primary-100">장비 인수 완료</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">지금 바로 매입 견적을 받아보세요</h2>
          <p className="text-gray-600 mb-6">
            간단한 문의만으로 빠른 견적과 전문 상담을 받으실 수 있습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openKakaoOpenChat}
              className="px-8 py-4 bg-[#FEE500] text-gray-900 font-semibold rounded-lg hover:bg-[#FDD835] transition-colors shadow-md hover:shadow-lg"
            >
              카카오톡 상담
            </button>
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              온라인 문의
            </Link>
            <a
              href="tel:02-1234-5678"
              className="px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              전화 문의
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
