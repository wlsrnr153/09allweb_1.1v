import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { getServiceSchema } from '@/lib/schema/service'
import { getBreadcrumbSchema } from '@/lib/schema/breadcrumb'
import { KakaoButton, ContactCTAButtons } from '@/components/contact/ContactButtons'

export const metadata: Metadata = {
  title: '연구장비 폐기 처분 서비스 | 무료 수거',
  description: '사용하지 않는 연구장비, 실험장비 폐기 처분. 무료 수거, 친환경 폐기, 법적 절차 대행. 폐기처리확인서 발급. 전국 서비스 가능.',
  keywords: [
    '연구장비 폐기',
    '기자재 폐기',
    '실험장비 처분',
    '폐실험장비',
    '장비 무료 수거',
    '연구실 장비 폐기',
    '폐기처리확인서',
    '친환경 폐기',
  ],
  openGraph: {
    title: '연구장비 폐기 처분 서비스 | 무료 수거 | 09all',
    description: '사용하지 않는 연구장비, 실험장비 폐기 처분. 무료 수거, 친환경 폐기, 법적 절차 대행.',
    url: 'https://09all.com/disposal',
  },
}

export default function DisposalPage() {
  const serviceSchema = getServiceSchema({
    name: '연구장비 폐기 처리 서비스',
    serviceType: '연구장비 폐기 및 처분',
    description: '사용하지 않는 연구장비, 실험장비 안전한 폐기 처리. 무료 수거, 친환경 폐기, 법적 절차 대행',
    url: 'https://09all.com/disposal',
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: '홈', url: 'https://09all.com' },
    { name: '폐기 서비스', url: 'https://09all.com/disposal' },
  ])
  const disposalMethods = [
    {
      icon: '♻️',
      title: '환경 친화적 재활용',
      description: '금속, 플라스틱 등 재활용 가능한 자원을 최대한 회수하여 환경을 보호합니다.',
      items: [
        '금속 부품 분리 재활용',
        '플라스틱 자원 회수',
        '전자 부품 전문 처리',
        '유가 자원 추출',
      ],
    },
    {
      icon: '📋',
      title: '법적 절차 준수',
      description: '폐기물관리법에 따른 합법적인 절차로 안심하고 처리하실 수 있습니다.',
      items: [
        '폐기물 처리 신고',
        '환경부 승인 절차',
        '관련 법규 완벽 준수',
        '처리 과정 기록 관리',
      ],
    },
    {
      icon: '🔒',
      title: '안전한 폐기',
      description: '위험물질과 민감 데이터를 안전하게 처리하여 법적 문제를 예방합니다.',
      items: [
        '위험물질 전문 처리',
        '데이터 저장장치 완전 파기',
        '민감 정보 보호',
        '안전 작업 절차 준수',
      ],
    },
    {
      icon: '📜',
      title: '인증서 발급',
      description: '법적 효력이 있는 폐기 증명서를 발급하여 향후 문제를 방지합니다.',
      items: [
        '폐기 증명서',
        '처리 내역서',
        '실적 증명원',
        '완료계',
      ],
    },
  ]

  const processSteps = [
    {
      number: '01',
      title: '문의 접수',
      description: '장비 정보와 폐기 사유를 알려주세요',
      icon: '📞',
    },
    {
      number: '02',
      title: '현장 평가',
      description: '전문가가 방문하여 장비 상태를 확인합니다',
      icon: '🔍',
    },
    {
      number: '03',
      title: '견적 제시',
      description: '처리 방법과 비용을 투명하게 안내합니다',
      icon: '💰',
    },
    {
      number: '04',
      title: '계약 체결',
      description: '처리 조건을 확정하고 계약을 체결합니다',
      icon: '📝',
    },
    {
      number: '05',
      title: '폐기 처리',
      description: '안전하게 수거하여 합법적으로 처리합니다',
      icon: '♻️',
    },
  ]

  return (
    <>
      <JsonLd data={serviceSchema} />
      <JsonLd data={breadcrumbSchema} />
      
      <div className="min-h-screen bg-gray-50">
        {/* Hero 섹션 */}
        <div className="bg-gradient-to-br from-green-600 to-green-800 text-white py-20">
          <div className="container text-center">
            <div className="inline-block px-6 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6">
              안전하고 합법적인 폐기 처리
            </div>
            <h1 className="text-5xl font-bold mb-6">
              연구장비 폐기 처리 전문
            </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto mb-8">
            매입이 어려운 노후·고장 장비를 환경친화적으로 처리하고<br />
            법적 효력이 있는 폐기 증명서를 발급해드립니다
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>폐기물관리법 준수</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>환경부 인증 처리업체</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>폐기 증명서 발급</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-green-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>전국 무료 수거</span>
            </div>
          </div>
        </div>
      </div>

      {/* 폐기 처리 방법 */}
      <div className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-4">폐기 처리 방법</h2>
        <p className="text-center text-gray-600 mb-12 text-lg">
          20년 경력의 전문 업체가 책임지고 처리합니다
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {disposalMethods.map((method, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-4xl">
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{method.title}</h3>
                </div>
              </div>
              <p className="text-gray-700 mb-6">{method.description}</p>
              <ul className="space-y-3">
                {method.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 처리 프로세스 */}
      <div className="bg-white py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">폐기 처리 프로세스</h2>
          <p className="text-center text-gray-600 mb-12">5단계로 간단하고 투명하게 진행됩니다</p>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* 연결선 */}
              <div className="hidden md:block absolute top-16 left-0 right-0 h-1 bg-green-200"></div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-5xl mb-4 shadow-lg relative z-10">
                      {step.icon}
                    </div>
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-3 font-bold">
                      {step.number}
                    </div>
                    <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <div className="mt-12 text-center">
            <div className="inline-block bg-green-50 border-2 border-green-200 rounded-lg px-8 py-4">
              <div className="text-sm text-gray-600 mb-1">평균 처리 기간</div>
              <div className="text-3xl font-bold text-green-600">5-7일</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* 처리 가능 품목 */}
      <div className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-12">처리 가능 품목</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">♻️</span>
              폐기 처리 대상
            </h3>
            <ul className="space-y-3">
              {[
                '작동 불가 장비',
                '15년 이상 노후 장비',
                '수리 불가 고장 장비',
                '부품 단종 장비',
                '재판매 시장 없는 장비',
                '위험물질 포함 장비',
                '폐기 의무 대상 장비',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-gray-700">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-lg p-8 border-2 border-blue-200">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <span className="text-3xl">💡</span>
              확실하지 않으신가요?
            </h3>
            <p className="text-gray-700 mb-6">
              장비가 매입 가능한지 폐기 대상인지 궁금하신가요?<br />
              <strong className="text-primary-600">무료 사전 진단</strong>을 통해 최적의 처리 방법을 찾아드립니다!
            </p>
            <ul className="space-y-2 mb-6 text-sm text-gray-700">
              <li>✓ 매입 가능 여부 판단</li>
              <li>✓ 폐기 처리 방법 안내</li>
              <li>✓ 예상 비용 제시</li>
              <li>✓ 통합 솔루션 제안</li>
            </ul>
            <KakaoButton className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors">
              무료 진단 신청하기
            </KakaoButton>
          </div>
        </div>
      </div>

      {/* 비용 안내
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">폐기 처리 비용</h2>
          <p className="text-center text-gray-300 mb-12">투명하고 합리적인 비용으로 처리해드립니다</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">📦</div>
                <h3 className="text-xl font-bold mb-2">소형 장비</h3>
                <div className="text-sm text-gray-300">50kg 미만</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50,000원~</div>
                <div className="text-sm text-gray-300">기본 처리비</div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-sm text-gray-300">
                  위험물질 포함 시: 100,000원~
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border-2 border-green-400">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">📦📦</div>
                <h3 className="text-xl font-bold mb-2">중형 장비</h3>
                <div className="text-sm text-gray-300">50-200kg</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">100,000원~</div>
                <div className="text-sm text-gray-300">기본 처리비</div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-sm text-gray-300">
                  위험물질 포함 시: 200,000원~
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-center mb-4">
                <div className="text-4xl mb-3">📦📦📦</div>
                <h3 className="text-xl font-bold mb-2">대형 장비</h3>
                <div className="text-sm text-gray-300">200kg 이상</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-2">별도 견적</div>
                <div className="text-sm text-gray-300">현장 평가 후 산정</div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/20">
                <div className="text-sm text-gray-300">
                  크레인 필요 시 추가 비용
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-300 text-sm">
              * 특수 장비(방사선, 생물안전, 화학폐기물 등)는 별도 견적이 필요합니다
            </p>
          </div>
        </div>
      </div> */}

      {/* 폐기 증명서 */}
      {/* <div className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-4">폐기 증명서 발급</h2>
        <p className="text-center text-gray-600 mb-12">법적 효력이 있는 공식 증명서를 발급해드립니다</p>
        
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 border-2 border-green-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">증명서 포함 내용</h3>
              <ul className="space-y-3">
                {[
                  '폐기 장비 상세 목록',
                  '폐기 처리 방법',
                  '처리 일자 및 장소',
                  '처리업체 정보 (허가번호)',
                  '환경부 인증 확인',
                  '법적 효력 확인',
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-center">증명서의 중요성</h3>
              <div className="space-y-4 text-sm">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <strong className="block mb-1">법적 책임 면제</strong>
                    <span className="text-gray-700">장비 폐기에 대한 법적 책임이 처리업체로 이전됩니다</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <strong className="block mb-1">회계 증빙</strong>
                    <span className="text-gray-700">폐기 비용 회계 처리를 위한 공식 문서로 활용</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <strong className="block mb-1">감사 대비</strong>
                    <span className="text-gray-700">외부 감사 시 적법한 처리를 증명하는 자료</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

        {/* CTA */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white py-16">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-4">폐기 처리가 필요하신가요?</h2>
            <p className="text-green-100 mb-8 text-lg">
              전문가의 무료 상담으로 최적의 처리 방법을 찾아드립니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <KakaoButton className="px-8 py-4 bg-[#FEE500] text-gray-900 font-semibold rounded-lg hover:bg-[#FDD835] transition-colors shadow-md hover:shadow-lg" />
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-green-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-md hover:shadow-lg"
              >
                온라인 문의
              </Link>
              <Link
                href="/services"
                className="px-8 py-4 bg-green-800 text-white font-semibold rounded-lg hover:bg-green-900 transition-colors"
              >
                서비스 비교하기
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
