'use client'

import Link from 'next/link'
import { useState } from 'react'
import { openKakaoOpenChat } from '@/lib/kakao'

export default function SolutionsPage() {
  const [selectedCase, setSelectedCase] = useState<'all-purchase' | 'all-disposal' | 'mixed'>('mixed')

  const cases = {
    'all-purchase': {
      title: 'Case 1: 전체 매입',
      subtitle: '모든 장비가 재판매 가능한 경우',
      icon: '💰',
      color: 'from-blue-500 to-blue-600',
      example: {
        total: 10,
        purchase: 10,
        disposal: 0,
        result: '전체 매입 처리',
      },
      benefits: [
        '장비 매입 진행',
        '빠른 처리 (3-5일)',
        '수거 서비스 제공',
        '신속한 처리',
      ],
    },
    'all-disposal': {
      title: 'Case 2: 전체 폐기',
      subtitle: '모든 장비가 노후/고장인 경우',
      icon: '♻️',
      color: 'from-green-500 to-green-600',
      example: {
        total: 10,
        purchase: 0,
        disposal: 10,
        result: '전체 폐기 처리',
      },
      benefits: [
        '법적 절차 완벽 준수',
        '폐기 증명서 발급',
        '환경친화적 처리',
        '안전한 데이터 삭제',
      ],
    },
    'mixed': {
      title: 'Case 3: 혼합 처리 (추천)',
      subtitle: '매입과 폐기를 함께 처리',
      icon: '🔄',
      color: 'from-purple-500 to-purple-600',
      example: {
        total: 10,
        purchase: 7,
        disposal: 3,
        result: '매입 + 폐기 통합 솔루션',
      },
      benefits: [
        '한 번의 방문으로 해결',
        '통합 처리시 비용 절감',
        '최적의 비용 효율적',
        '처리 확인서 등 발급',
      ],
    },
  }

  const currentCase = cases[selectedCase]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero 섹션 */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-6">
            맞춤형 통합 솔루션
          </h1>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            매입 가능 장비와 폐기 대상 장비를 함께 처리하여<br />
            시간과 비용을 최대한 절감해드립니다
          </p>
        </div>
      </div>

      {/* 통합 솔루션이란? */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-8">통합 솔루션이란?</h2>
          <div className="bg-white rounded-xl shadow-lg p-8">
            <p className="text-lg text-gray-700 mb-6">
              연구실이나 기업에서 여러 대의 장비를 정리할 때, 일부는 재판매 가능하고 일부는 폐기해야 하는 경우가 많습니다. 
              <strong className="text-primary-600"> 통합 솔루션</strong>은 이 모든 것을 한 번에 해결하는 서비스입니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-4xl mb-3">👨‍🔬</div>
                <h3 className="font-bold mb-2">전문가 진단</h3>
                <p className="text-sm text-gray-600">
                  각 장비의 상태를 정확히 평가하여 매입/폐기 여부를 판단
                </p>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-lg">
                <div className="text-4xl mb-3">💡</div>
                <h3 className="font-bold mb-2">최적 방안 제시</h3>
                <p className="text-sm text-gray-600">
                  고객에게 가장 유리한 처리 방법과 비용을 산출
                </p>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-lg">
                <div className="text-4xl mb-3">🎯</div>
                <h3 className="font-bold mb-2">원스톱 처리</h3>
                <p className="text-sm text-gray-600">
                  한 번의 방문으로 모든 장비 문제를 완벽하게 해결
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 케이스별 비교 */}
      <div className="bg-white py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">처리 케이스 비교</h2>
          
          {/* 케이스 선택 탭 */}
          <div className="flex justify-center gap-4 mb-12">
            {Object.entries(cases).map(([key, caseData]) => (
              <button
                key={key}
                onClick={() => setSelectedCase(key as any)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  selectedCase === key
                    ? `bg-gradient-to-r ${caseData.color} text-white shadow-lg`
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="text-2xl mb-1">{caseData.icon}</div>
                <div className="text-sm">{caseData.title.split(':')[0]}</div>
              </button>
            ))}
          </div>

          {/* 선택된 케이스 상세 */}
          <div className="max-w-5xl mx-auto">
            <div className={`bg-gradient-to-r ${currentCase.color} text-white rounded-t-xl p-8 text-center`}>
              <div className="text-6xl mb-4">{currentCase.icon}</div>
              <h3 className="text-3xl font-bold mb-2">{currentCase.title}</h3>
              <p className="text-lg opacity-90">{currentCase.subtitle}</p>
            </div>

            <div className="bg-white rounded-b-xl shadow-lg p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* 처리 내역 */}
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>📊</span>
                    처리 내역
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                      <span>총 장비 수</span>
                      <span className="font-bold">{currentCase.example.total}대</span>
                    </div>
                    {currentCase.example.purchase > 0 && (
                      <div className="flex justify-between p-3 bg-blue-50 rounded-lg">
                        <span className="text-blue-800">매입 장비</span>
                        <span className="font-bold text-blue-600">{currentCase.example.purchase}대</span>
                      </div>
                    )}
                    {currentCase.example.disposal > 0 && (
                      <div className="flex justify-between p-3 bg-green-50 rounded-lg">
                        <span className="text-green-800">폐기 장비</span>
                        <span className="font-bold text-green-600">{currentCase.example.disposal}대</span>
                      </div>
                    )}
                    <div className="flex justify-between p-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg mt-4">
                      <span className="text-lg">처리 방식</span>
                      <span className="font-bold text-lg">{currentCase.example.result}</span>
                    </div>
                  </div>
                </div>

                {/* 주요 혜택 */}
                <div>
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>✨</span>
                    주요 혜택
                  </h4>
                  <ul className="space-y-3">
                    {currentCase.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center pt-6 border-t border-gray-200">
                <button
                  onClick={openKakaoOpenChat}
                  className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md"
                >
                  이 케이스로 상담받기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 실제 사례 */}
      <div className="container py-16">
        <h2 className="text-4xl font-bold text-center mb-12">실제 처리 사례</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* 사례 1 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">A대학교 화학과</h3>
              <p className="text-blue-100">연구실 이전 시 장비 정리</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">처리 장비</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>• HPLC 2대, GC-MS 1대</span>
                    <span className="text-blue-600 font-semibold">매입</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• 노후 분광기 5대</span>
                    <span className="text-green-600 font-semibold">폐기</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-3 p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold">매입 처리</span>
                  <span className="font-bold text-blue-600">3대 매입</span>
                </div>
                <div className="flex justify-between mb-3 p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">폐기 처리</span>
                  <span className="font-bold text-green-600">5대 폐기</span>
                </div>
                <div className="flex justify-between p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg">
                  <span className="font-semibold">최종 결과</span>
                  <span className="font-bold">통합 솔루션 제공</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
                <strong>고객 평가:</strong> "한 번의 방문으로 모든 장비를 처리할 수 있어서 매우 편리했습니다."
              </div>
            </div>
          </div>

          {/* 사례 2 */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6">
              <h3 className="text-2xl font-bold mb-2">B제약회사 연구소</h3>
              <p className="text-green-100">시설 개편 시 장비 교체</p>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">처리 장비</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>• 최신 분석장비 4대</span>
                    <span className="text-blue-600 font-semibold">매입</span>
                  </div>
                  <div className="flex justify-between">
                    <span>• 구형 장비 8대</span>
                    <span className="text-green-600 font-semibold">폐기</span>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between mb-3 p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold">매입 처리</span>
                  <span className="font-bold text-blue-600">4대 매입</span>
                </div>
                <div className="flex justify-between mb-3 p-3 bg-green-50 rounded-lg">
                  <span className="font-semibold">폐기 처리</span>
                  <span className="font-bold text-green-600">8대 폐기</span>
                </div>
                <div className="flex justify-between p-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg">
                  <span className="font-semibold">최종 결과</span>
                  <span className="font-bold">통합 솔루션 제공</span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg text-sm text-gray-700">
                <strong>고객 평가:</strong> "폐기 증명서까지 완벽하게 받아서 감사 대비도 문제없었어요."
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 비용 절감 효과 */}
      <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white py-16">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">통합 솔루션의 비용 절감 효과</h2>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">⏰</div>
              <div className="text-3xl font-bold mb-2">50%</div>
              <div className="text-purple-100">시간 절약</div>
              <p className="text-sm text-purple-200 mt-2">
                복수 업체 대신<br />한 번에 해결
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border-2 border-white/30">
              <div className="text-5xl mb-4">💰</div>
              <div className="text-3xl font-bold mb-2">10-20%</div>
              <div className="text-purple-100">비용 절감</div>
              <p className="text-sm text-purple-200 mt-2">
                통합 처리<br />비용 절감
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-5xl mb-4">📋</div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-purple-100">편의성</div>
              <p className="text-sm text-purple-200 mt-2">
                처리 확인서 등 <br />한 번에 발급
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 통합 견적 신청 */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">통합 견적 신청하기</h2>
            <p className="text-xl text-primary-100 mb-8">
              전문가가 방문하여 장비를 진단하고<br />
              최적의 솔루션을 제안해드립니다
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">📞</div>
                <div className="font-semibold">1. 연락주세요</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">🔍</div>
                <div className="font-semibold">2. 장비 진단</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-3xl mb-2">✅</div>
                <div className="font-semibold">3. 최적 방안 제시</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openKakaoOpenChat}
                className="px-8 py-4 bg-[#FEE500] text-gray-900 font-semibold rounded-lg hover:bg-[#FDD835] transition-colors shadow-lg"
              >
                카카오톡으로 신청
              </button>
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
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
    </div>
  )
}
