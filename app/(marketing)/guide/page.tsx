'use client'

import Link from 'next/link'
import { openKakaoOpenChat } from '@/lib/kakao'

export default function GuidePage() {
  const sections = [
    {
      title: '매입 전 준비사항',
      icon: '📋',
      items: [
        {
          question: '어떤 정보를 준비해야 하나요?',
          answer: '장비명, 모델명, 제조사, 구매 시기, 사용 기간, 현재 상태 등 기본 정보를 준비해주시면 더 정확한 견적을 받으실 수 있습니다.',
        },
        {
          question: '장비 사진을 보내야 하나요?',
          answer: '네, 가능하시면 장비의 전면, 후면, 측면 사진과 작동 상태를 확인할 수 있는 사진을 보내주시면 사전 평가에 도움이 됩니다.',
        },
        {
          question: '장비를 작동시켜야 하나요?',
          answer: '가능하시면 작동 상태를 확인할 수 있도록 준비해주시면 좋습니다. 작동하지 않는 경우에도 매입 가능하니 걱정하지 마세요.',
        },
        {
          question: '부속품이나 매뉴얼이 있어야 하나요?',
          answer: '부속품과 매뉴얼이 있으면 매입 가격에 긍정적인 영향을 줄 수 있습니다. 하지만 필수는 아니니 없는 경우에도 문의해주세요.',
        },
      ],
    },
    {
      title: '평가 기준',
      icon: '🔍',
      items: [
        {
          question: '어떤 기준으로 평가하나요?',
          answer: '장비의 외관 상태, 작동 여부, 부품 마모도, 제조 연도, 시장 수요, 브랜드 가치 등을 종합적으로 평가합니다.',
        },
        {
          question: '가격은 어떻게 책정되나요?',
          answer: '최신 시장 가격을 조사하고, 장비 상태를 정확히 평가하여 공정하고 합리적인 가격을 제시합니다. 중고 거래 플랫폼과 전문 업체 가격을 종합적으로 고려합니다.',
        },
        {
          question: '상태가 좋지 않아도 매입 가능한가요?',
          answer: '네, 상태가 좋지 않거나 고장난 장비도 매입 가능합니다. 다만 수리 비용을 고려하여 가격이 조정될 수 있습니다.',
        },
        {
          question: '오래된 장비도 매입하나요?',
          answer: '제조 연도가 오래되었더라도 시장 수요가 있는 장비는 매입합니다. 다만 최신 모델에 비해 가격은 낮을 수 있습니다.',
        },
      ],
    },
    {
      title: '가격 책정 기준',
      icon: '💰',
      items: [
        {
          question: '신품 대비 몇 % 정도 받을 수 있나요?',
          answer: '장비 종류, 상태, 연식에 따라 다르지만 일반적으로 신품 대비 30-70% 정도의 가격을 받으실 수 있습니다. 정확한 가격은 현장 평가 후 제시됩니다.',
        },
        {
          question: '협상이 가능한가요?',
          answer: '네, 제시된 견적에 대해 협상이 가능합니다. 다만 공정한 시장 가격을 기준으로 평가하므로 과도한 협상은 어려울 수 있습니다.',
        },
        {
          question: '여러 대를 한꺼번에 매입하면 할인이 되나요?',
          answer: '네, 여러 대를 한꺼번에 매입하시면 추가 할인 혜택을 받으실 수 있습니다. 구체적인 할인율은 문의 시 안내해드립니다.',
        },
        {
          question: '지급 방법은 어떻게 되나요?',
          answer: '계약 체결 후 장비 인수 시 현금 또는 계좌 이체로 즉시 지급해드립니다. 원하시는 지급 방법을 사전에 안내해주시면 준비하겠습니다.',
        },
      ],
    },
    {
      title: '매입 불가 사유',
      icon: '⚠️',
      items: [
        {
          question: '어떤 경우에 매입이 어려운가요?',
          answer: '법적 문제가 있는 장비, 도난 의심 장비, 시장 수요가 전혀 없는 장비, 환경 오염 물질이 포함된 장비 등은 매입이 어려울 수 있습니다.',
        },
        {
          question: '수리 비용이 많이 드는 장비는?',
          answer: '수리 비용이 장비 가치를 초과하는 경우 매입이 어려울 수 있습니다. 다만 부품으로 활용 가능한 경우 부분 매입이 가능할 수 있습니다.',
        },
        {
          question: '매뉴얼이나 인증서가 없어도 되나요?',
          answer: '매뉴얼이나 인증서가 없어도 매입 가능합니다. 다만 있으면 더 정확한 평가와 높은 가격을 받으실 수 있습니다.',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">매입 가이드</h1>
          <p className="text-gray-600">
            연구장비 매입에 대한 모든 궁금증을 해결해드립니다
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-12">
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{section.icon}</div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="border-l-4 border-primary-500 pl-6">
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">
                      {item.question}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 추가 팁 */}
      <div className="bg-primary-50 py-12">
        <div className="container">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">매입 성공 팁</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  tip: '정확한 정보 제공',
                  description: '장비의 정확한 모델명과 제조사를 알려주시면 더 빠르고 정확한 견적을 받으실 수 있습니다.',
                },
                {
                  tip: '사진 미리 보내기',
                  description: '사전에 장비 사진을 보내주시면 현장 방문 전 예비 평가가 가능하여 시간을 절약할 수 있습니다.',
                },
                {
                  tip: '깨끗한 상태 유지',
                  description: '장비를 깨끗하게 정리해두시면 평가 시 긍정적인 인상을 줄 수 있습니다.',
                },
                {
                  tip: '부속품 보관',
                  description: '원래 부속품과 매뉴얼을 함께 보관해두시면 매입 가격에 도움이 됩니다.',
                },
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">{item.tip}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-12">
        <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">더 궁금한 점이 있으신가요?</h2>
          <p className="text-primary-100 mb-6">
            전문 상담원이 친절하게 답변해드립니다
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
