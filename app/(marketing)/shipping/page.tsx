'use client'

import Link from 'next/link'
import { openKakaoOpenChat } from '@/lib/kakao'

export default function ShippingPage() {
  const services = [
    {
      title: '전국 무료 수거 서비스',
      description: '전국 어디서든 무료로 장비를 수거해드립니다',
      icon: '🚚',
      details: [
        '서울, 경기, 인천 지역: 당일 또는 익일 수거 가능',
        '충청, 강원 지역: 2-3일 내 수거 가능',
        '경상, 전라, 제주 지역: 3-5일 내 수거 가능',
        '대형 장비도 전문 운반팀이 안전하게 수거',
      ],
      color: 'from-blue-500 to-blue-600',
    },
    {
      title: '안전한 포장 및 운반',
      description: '전문 포장팀이 장비를 안전하게 포장하고 운반합니다',
      icon: '📦',
      details: [
        '방수 포장재 사용',
        '충격 방지 포장',
        '전문 운반 차량 사용',
        '보험 가입으로 안전 보장',
      ],
      color: 'from-green-500 to-green-600',
    },
    {
      title: '수거 비용 안내',
      description: '수거 비용은 장비 규모와 지역에 따라 다릅니다',
      icon: '💰',
      details: [
        '소형 장비 (50kg 미만): 전국 무료',
        '중형 장비 (50-200kg): 수도권 무료, 지방 일부 유료',
        '대형 장비 (200kg 이상): 지역별 상담 후 결정',
        '특수 장비: 별도 상담 필요',
      ],
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      title: '수거 일정 조율',
      description: '고객님의 편의에 맞춰 수거 일정을 조율합니다',
      icon: '📅',
      details: [
        '평일 오전 9시 ~ 오후 6시 수거 가능',
        '주말 및 공휴일 수거 가능 (추가 비용 발생 가능)',
        '사전 일정 조율로 원하시는 시간에 수거',
        '긴급 수거도 가능 (추가 비용 발생)',
      ],
      color: 'from-purple-500 to-purple-600',
    },
  ]

  const process = [
    {
      step: '1',
      title: '수거 신청',
      description: '온라인 또는 전화로 수거를 신청해주세요',
    },
    {
      step: '2',
      title: '일정 조율',
      description: '고객님과 수거 일정을 조율합니다',
    },
    {
      step: '3',
      title: '현장 방문',
      description: '전문 수거팀이 현장을 방문합니다',
    },
    {
      step: '4',
      title: '포장 및 수거',
      description: '안전하게 포장하여 수거합니다',
    },
    {
      step: '5',
      title: '인수 확인',
      description: '인수 확인서를 작성하고 매입 대금을 지급합니다',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">배송 및 수거 안내</h1>
          <p className="text-gray-600">
            전국 어디서든 안전하고 신속하게 장비를 수거해드립니다
          </p>
        </div>
      </div>

      {/* 서비스 소개 */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className={`bg-gradient-to-br ${service.color} text-white p-6`}>
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{service.icon}</div>
                  <div>
                    <h2 className="text-xl font-bold mb-1">{service.title}</h2>
                    <p className="text-white/90 text-sm">{service.description}</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  {service.details.map((detail, detailIndex) => (
                    <li key={detailIndex} className="flex items-start gap-2 text-gray-700">
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
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 수거 프로세스 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-12">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">수거 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-primary-100">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <svg
                      className="w-6 h-6 text-white/50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 지역별 수거 안내 */}
      <div className="container py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">지역별 수거 안내</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                region: '수도권',
                areas: ['서울', '경기', '인천'],
                time: '당일 또는 익일',
                cost: '무료',
              },
              {
                region: '충청/강원',
                areas: ['대전', '충남', '충북', '강원'],
                time: '2-3일 내',
                cost: '무료 (일부 유료)',
              },
              {
                region: '경상/전라/제주',
                areas: ['부산', '대구', '울산', '경남', '경북', '전남', '전북', '제주'],
                time: '3-5일 내',
                cost: '상담 후 결정',
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border-2 border-primary-200 rounded-lg p-6 hover:border-primary-400 transition-colors"
              >
                <h3 className="text-xl font-bold mb-3 text-primary-600">{item.region}</h3>
                <div className="mb-4">
                  <div className="text-sm text-gray-600 mb-2">포함 지역:</div>
                  <div className="flex flex-wrap gap-2">
                    {item.areas.map((area, areaIndex) => (
                      <span
                        key={areaIndex}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-sm rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">수거 소요:</span>
                    <span className="font-semibold">{item.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">수거 비용:</span>
                    <span className="font-semibold text-primary-600">{item.cost}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 주의사항 */}
      <div className="bg-yellow-50 py-12">
        <div className="container">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <span>⚠️</span>
              <span>수거 시 주의사항</span>
            </h2>
            <ul className="space-y-3 text-gray-700">
              {[
                '장비를 수거하기 전에 개인 데이터나 중요한 정보가 있다면 반드시 삭제해주세요.',
                '장비의 부속품(케이블, 어댑터, 매뉴얼 등)을 함께 준비해주시면 더 정확한 평가가 가능합니다.',
                '대형 장비의 경우 현장에서 해체가 필요할 수 있으니 사전에 상담해주세요.',
                '수거 일정은 날씨나 교통 상황에 따라 변경될 수 있습니다.',
                '특수 장비나 위험물이 포함된 장비는 별도 안전 조치가 필요할 수 있습니다.',
              ].map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-yellow-600 font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-12">
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">지금 바로 수거 신청하세요</h2>
          <p className="text-primary-100 mb-6">
            전국 어디서든 무료로 안전하게 수거해드립니다
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
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
            >
              온라인 신청
            </Link>
            <a
              href="tel:02-1234-5678"
              className="px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors"
            >
              전화 신청
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
