'use client'

import Link from 'next/link'
import { openKakaoOpenChat } from '@/lib/kakao'
import { PRIMARY_PHONE, PHONES_DISPLAY_DOT, telHref } from '@/lib/constants/contact'

export default function ServicesPage() {
  const services = [
    {
      icon: '💰',
      title: '장비 매입',
      subtitle: '재판매 가능한 연구장비',
      description: '정상 작동, 불용처리 하는 장비를 공정한 가격에 매입합니다.',
      features: [
        '즉시 매입 가능',
        '전국 무료 수거',
        '정확하고 신속한 처리',
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
        '폐기처리확인서 발급',
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
            재판매 가능한 장비는 즉시 매입, 노후 장비는 안전한 폐기 처리<br />
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

               {/* <tr>
                  <td className="border border-gray-300 p-4 font-semibold">처리 기간</td>
                  <td className="border border-gray-300 p-4 text-center">3-5일</td>
                  <td className="border border-gray-300 p-4 text-center">5-7일</td>
                  <td className="border border-gray-300 p-4 text-center">5-7일</td>
                </tr>*/}

                <tr className="bg-gray-50">
                  <td className="border border-gray-300 p-4 font-semibold">증명서</td>
                  <td className="border border-gray-300 p-4 text-center">계약서</td>
                  <td className="border border-gray-300 p-4 text-center">폐기처리확인서</td>
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

      {/* 통합 솔루션 예시 — 대학·연구기관 행정 맥락 */}
      <div className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-4">통합 솔루션 적용 사례</h2>
        <p className="text-center text-gray-600 text-sm max-w-2xl mx-auto mb-12">
          대학·연구소(출연연) 등에서 장비 처분·실험실 정비 시 자주 요청되는 유형을 바탕으로 한 대표 사례입니다.
        </p>

        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
            <h3 className="text-2xl font-bold mb-3 text-center text-gray-900">
              연구중심대학 소속 연구실 장비 일괄 정리
            </h3>
            <p className="text-center text-gray-700 text-sm leading-relaxed">
              연구실 이전 및 신규 연구책임자(PI) 영입에 따른 실험 공간 재편 과정에서,
              재활용(매입) 가능 장비와 폐기 대상 장비가 혼재한 상태에서 총 10대를 일괄 처리한 사례입니다.
            </p>
            <p className="text-center text-gray-500 text-xs mt-3">
              기관명·세부 일정은 비식별화한 예시이며, 실제 절차는 각 기관의 내규 및 결재 루트에 따릅니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="border-2 border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-800">
                  매입
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">재활용(매입) 처리분</h4>
                  <p className="text-sm text-gray-600">6대 — 자산·감사 대응 가능한 계약·정산 서류 제공</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-blue-600 flex-shrink-0 font-semibold">·</span>
                  <span>액체크로마토그래피(HPLC, 2023년식) — 작동 상태 양호, 중고 시장 재유통 가능</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 flex-shrink-0 font-semibold">·</span>
                  <span>기체크로마토질량분석기(GC-MS, 2022년식) — 정상 가동 확인</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600 flex-shrink-0 font-semibold">·</span>
                  <span>기타 연구장비 4대 — 현장 확인 및 감정에 따라 매입 가능 여부 개별 판정</span>
                </li>
              </ul>
              <p className="mt-4 pt-4 border-t border-blue-200 text-sm text-gray-600 leading-relaxed">
                매입 적합성은 사전 진단(사진·모델명·작동 여부)과 시세를 반영하여 안내하며,
                자산관리·연구비 집행·인수인계 일정에 맞추어 계약 및 증빙 정리를 지원합니다.
              </p>
            </div>

            <div className="border-2 border-green-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-sm font-bold text-green-800">
                  폐기
                </div>
                <div>
                  <h4 className="font-bold text-lg text-gray-900">폐기·처리확인</h4>
                  <p className="text-sm text-gray-600">4대 — 환경·폐기물 관련 법령 준수, 확인서 발급</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-700 leading-relaxed">
                <li className="flex gap-2">
                  <span className="text-green-600 flex-shrink-0 font-semibold">·</span>
                  <span>노후 분석장비 2대 — 인증 처리 경로에 따른 폐기, 폐기처리확인서 발급</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-green-600 flex-shrink-0 font-semibold">·</span>
                  <span>고장·수리 불가 계측기 2대 — 동일 절차로 처리, 장비대장·감사 대응 자료 협의</span>
                </li>
              </ul>
              <p className="mt-4 pt-4 border-t border-green-200 text-sm text-gray-600 leading-relaxed">
                매입과 폐기를 동일 건으로 진행하여 수거 일정·담당자 연락·서류 제출을 일원화하고,
                총무·구매·연구지원 부서와의 협의 일정에 맞추어 내부 결재에 필요한 설명 자료를 정리하였습니다.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg p-6 text-center">
            <div className="text-lg font-semibold mb-4">처리 성과 및 행정 지원 요지</div>
            <ul className="text-sm text-purple-100 space-y-2.5 text-left max-w-lg mx-auto leading-relaxed">
              <li className="flex gap-2">
                <span className="flex-shrink-0 font-semibold text-white">①</span>
                <span>동일 일정으로 매입·폐기 10대 일괄 수거·처리, 실험실 공간 회수 일정에 부합</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 font-semibold text-white">②</span>
                <span>매입분은 계약·정산 증빙, 폐기분은 폐기처리확인서 등으로 자산·감사 추적 가능</span>
              </li>
              <li className="flex gap-2">
                <span className="flex-shrink-0 font-semibold text-white">③</span>
                <span>연구실·기관 담당자 단일 창구로 진행 상황 공유, 인수인계 및 장비대장 반영 협의</span>
              </li>
            </ul>
            <p className="mt-5 text-xs text-purple-200/95 leading-relaxed max-w-xl mx-auto">
              조건·견적은 장비 상태, 수량, 설치 장소(층고·진입로), 지역 등에 따라 달라지며,
              상담 및 현장 확인 후 견적서·계약서로 확정됩니다. 기관별 내부 규정(폐기 심의, 구매·매각 절차)은
              사전에 안내해 주시면 절차에 맞추어 제안드리겠습니다.
            </p>
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
              href={telHref(PRIMARY_PHONE)}
              className="px-8 py-4 bg-primary-800 text-white font-semibold rounded-lg hover:bg-primary-900 transition-colors text-center"
            >
              <span className="block">전화 문의</span>
              <span className="block text-xs font-normal mt-1.5 opacity-90 leading-snug">{PHONES_DISPLAY_DOT}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
