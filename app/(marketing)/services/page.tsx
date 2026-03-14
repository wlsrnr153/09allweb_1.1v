'use client'

import Link from 'next/link'
import { openKakaoOpenChat } from '@/lib/kakao'

export default function ServicesPage() {
  const services = [
    {
      icon: '💰',
      title: '장비 매입',
      subtitle: '재판매 가능한 연구장비',
      description: '정상 작동하는 장비를 공정한 가격에 즉시 매입합니다.',
      features: [
        '현금 즉시 지급',
        '전국 무료 수거',
        '3-5일 빠른 처리',
        '투명한 가격 산정',
      ],
      color: 'from-blue-500 to-blue-600',
      link: '/equipment',
      cta: '매입 가능 장비 보기',
    },
    {
      icon: '♻️',
      title: '폐기 처리',
      subtitle: '안전하고 합법적인 처리',
      description: '작동 불가 또는 노후 장비를 환경친화적으로 처리합니다.',
      features: [
        '폐기증명서 발급',
        '법적 절차 준수',
        '환경부 인증 처리',
        '데이터 완전 삭제',
      ],
      color: 'from-green-500 to-green-600',
      link: '/disposal',
      cta: '폐기 처리 상세보기',
    },
    {
      icon: '🔄',
      title: '통합 솔루션',
      subtitle: '원스톱 종합 서비스',
      description: '매입과 폐기를 함께 처리하여 시간과 비용을 절감합니다.',
      features: [
        '맞춤형 솔루션 제공',
        '통합 처리 할인',
        '무료 사전 진단',
        '최적의 비용 절감',
      ],
      color: 'from-purple-500 to-purple-600',
      link: '/solutions',
      cta: '통합 솔루션 알아보기',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero 섹션 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">
            연구장비 매입부터 폐기까지<br />
            원스톱 종합 서비스
          </h1>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
            재판매 가능한 장비는 현금 매입, 노후 장비는 안전한 폐기 처리<br />
            09all이 모든 것을 해결해드립니다
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={openKakaoOpenChat}
              className="px-8 py-4 bg-[#FEE500] text-gray-900 font-semibold rounded-lg hover:bg-[#FDD835] transition-colors shadow-lg"
            >
              무료 상담 신청
            </button>
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              견적 문의하기
            </Link>
          </div>
        </div>
      </div>

      {/* 서비스 카드 */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className={`bg-gradient-to-r ${service.color} text-white p-8 text-center`}>
                <div className="text-6xl mb-4">{service.icon}</div>
                <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                <p className="text-white/90">{service.subtitle}</p>
              </div>
              
              <div className="p-8">
                <p className="text-gray-700 mb-6">{service.description}</p>
                
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={service.link}
                  className="block w-full py-3 bg-primary-600 text-white text-center font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {service.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 비교표 */}
      <div className="bg-white py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">서비스 비교</h2>
          
          <div className="max-w-5xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-4 text-left font-semibold">구분</th>
                  <th className="border border-gray-300 p-4 text-center font-semibold bg-blue-50">장비 매입</th>
                  <th className="border border-gray-300 p-4 text-center font-semibold bg-green-50">폐기 처리</th>
                  <th className="border border-gray-300 p-4 text-center font-semibold bg-purple-50">통합 솔루션</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">대상 장비</td>
                  <td className="border border-gray-300 p-4 text-center">재판매 가능</td>
                  <td className="border border-gray-300 p-4 text-center">작동불가/노후</td>
                  <td className="border border-gray-300 p-4 text-center">혼합 가능</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold">비용</td>
                  <td className="border border-gray-300 p-4 text-center text-blue-600 font-bold">매입비 지급</td>
                  <td className="border border-gray-300 p-4 text-center text-red-600">처리비 발생</td>
                  <td className="border border-gray-300 p-4 text-center text-purple-600">통합 정산</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">처리 기간</td>
                  <td className="border border-gray-300 p-4 text-center">3-5일</td>
                  <td className="border border-gray-300 p-4 text-center">5-7일</td>
                  <td className="border border-gray-300 p-4 text-center">5-7일</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold">증명서</td>
                  <td className="border border-gray-300 p-4 text-center">계약서</td>
                  <td className="border border-gray-300 p-4 text-center">폐기증명서</td>
                  <td className="border border-gray-300 p-4 text-center">모두 발급</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 p-4 font-semibold">수거</td>
                  <td className="border border-gray-300 p-4 text-center">전국 무료</td>
                  <td className="border border-gray-300 p-4 text-center">전국 무료</td>
                  <td className="border border-gray-300 p-4 text-center">전국 무료</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold">추천 대상</td>
                  <td className="border border-gray-300 p-4 text-center text-sm">정상 작동 장비</td>
                  <td className="border border-gray-300 p-4 text-center text-sm">노후/고장 장비</td>
                  <td className="border border-gray-300 p-4 text-center text-sm">
                    <strong className="text-purple-600">대량 처리 시</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 통합 솔루션 예시 */}
      <div className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-12">통합 솔루션 예시</h2>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-4 text-center">A대학교 연구실 정리 사례</h3>
            <p className="text-center text-gray-700">총 10대의 연구장비 처리</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">💰</div>
                <div>
                  <h4 className="font-bold text-lg">매입 대상</h4>
                  <p className="text-sm text-gray-600">6대</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>HPLC (2023년)</span>
                  <span className="font-semibold">+2,000만원</span>
                </li>
                <li className="flex justify-between">
                  <span>GC-MS (2022년)</span>
                  <span className="font-semibold">+1,500만원</span>
                </li>
                <li className="flex justify-between">
                  <span>기타 4대</span>
                  <span className="font-semibold">+1,500만원</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-blue-200">
                <div className="flex justify-between font-bold text-blue-600">
                  <span>매입 소계</span>
                  <span>+5,000만원</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-2xl">♻️</div>
                <div>
                  <h4 className="font-bold text-lg">폐기 대상</h4>
                  <p className="text-sm text-gray-600">4대</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>노후 분석장비 2대</span>
                  <span className="text-red-600">-20만원</span>
                </li>
                <li className="flex justify-between">
                  <span>고장난 계측기 2대</span>
                  <span className="text-red-600">-10만원</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="flex justify-between font-bold text-green-600">
                  <span>폐기 소계</span>
                  <span className="text-red-600">-30만원</span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-600">
                ✓ 통합처리 10% 할인 적용
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6 text-center">
            <div className="text-lg mb-2">최종 정산 금액</div>
            <div className="text-4xl font-bold mb-2">+4,970만원</div>
            <div className="text-sm text-purple-100">
              ✓ 한 번의 방문으로 모든 장비 처리 완료<br />
              ✓ 매입비 즉시 지급 + 폐기 증명서 발급
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">어떤 서비스가 필요하신가요?</h2>
          <p className="text-primary-100 mb-8 text-lg">
            무료 상담으로 최적의 솔루션을 찾아드립니다
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
              온라인 문의
            </Link>
            <a
              href="tel:02-1234-5678"
              className="px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors"
            >
              전화 문의
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
