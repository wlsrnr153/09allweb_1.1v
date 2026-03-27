'use client'

import { useState } from 'react'
import { sampleCategories } from '@/lib/data/sample-equipment'
import { samplePortfolio } from '@/lib/data/sample-portfolio'
import { COMPANY_CONTACTS } from '@/lib/constants/contact'
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME_FULL,
  SITE_BRAND_NAME,
} from '@/lib/constants/company'

export default function BrochureView() {
  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 인쇄 버튼 - 화면에만 표시 */}
      <div className="no-print fixed top-20 right-4 z-50">
        <button
          onClick={handlePrint}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          카탈로그 인쇄
        </button>
      </div>

      {/* Page 1: 표지 */}
      <div className="brochure-page page-cover bg-gradient-to-br from-primary-700 via-primary-600 to-primary-800 text-white flex flex-col justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-8">
          <div className="mb-8">
            <div className="text-7xl font-bold mb-4">09all</div>
            <div className="text-3xl font-light tracking-wider">구올</div>
          </div>
          
          <div className="h-1 w-32 bg-white mx-auto mb-8"></div>
          
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            연구장비 매입 전문 기업
          </h1>
          
          <p className="text-2xl text-primary-100 mb-12 leading-relaxed">
            20년 전통과 신뢰로<br />
            귀사의 연구 성공을 함께합니다
          </p>
          
          <div className="grid grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-primary-100">년 업력</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">거래 고객사</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-primary-100">장비 공급</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">99%</div>
              <div className="text-primary-100">고객 만족도</div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 text-primary-200 text-sm">
          {new Date().getFullYear()} Company Brochure
        </div>
      </div>

      {/* Page 2: 목차 */}
      <div className="brochure-page bg-gray-50">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <h2 className="text-5xl font-bold mb-12 text-gray-900">목차</h2>
          
          <div className="space-y-6">
            {[
              { number: '01', title: '회사 개요', page: 3 },
              { number: '02', title: '회사 연혁', page: 4 },
              { number: '03', title: '핵심 가치', page: 5 },
              { number: '04', title: '서비스 소개', page: 6 },
              { number: '05', title: '매입 프로세스', page: 7 },
              { number: '06', title: '매입 가이드', page: 8 },
              { number: '07', title: '배송 및 수거', page: 9 },
              { number: '08', title: '주요 실적', page: 10 },
              { number: '09', title: '연락처', page: 11 },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between border-b border-gray-300 pb-4">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold text-xl">
                    {item.number}
                  </div>
                  <div className="text-2xl font-semibold text-gray-900">{item.title}</div>
                </div>
                <div className="text-xl text-gray-500">P.{item.page}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 3: 회사 개요 */}
      <div className="brochure-page">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">01</div>
            <h2 className="text-4xl font-bold text-gray-900">회사 개요</h2>
          </div>
          
          <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-2xl p-8 mb-12">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              <strong className="text-primary-600">{COMPANY_LEGAL_NAME_FULL}</strong>는 경기도 시흥시 과림동에 본사를 두고,{' '}
              <strong className="text-primary-600">{SITE_BRAND_NAME}</strong> 브랜드로 2004년 설립 이래 연구장비 매입·처리 분야에서
              전문성과 신뢰를 쌓아 온 기업입니다.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              대학교, 연구소, 기업 등 500여 개 기관과의 거래를 통해 5,000대 이상의 연구장비를 
              성공적으로 매입하였으며, 고객 만족도 99%라는 높은 신뢰를 받고 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">회사명</div>
                <div className="text-gray-900">
                  {COMPANY_LEGAL_NAME_FULL} <span className="text-gray-500">· 서비스명 {SITE_BRAND_NAME}</span>
                </div>
              </div>
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">설립일</div>
                <div className="text-gray-900">2004년 3월</div>
              </div>
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">대표자</div>
                <div className="text-gray-900">엄성희</div>
              </div>
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">직원 수</div>
                <div className="text-gray-900">150명</div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">주요 사업</div>
                <div className="text-gray-900">연구장비 매입, 임대, 유지보수</div>
              </div>
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">연매출</div>
                <div className="text-gray-900">1,000억원 (2024년 기준)</div>
              </div>
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">주소</div>
                <div className="text-gray-900">{COMPANY_ADDRESS}</div>
              </div>
              <div className="flex items-start">
                <div className="w-32 font-semibold text-gray-700">전화</div>
                <div className="text-gray-900 space-y-0.5">
                  {COMPANY_CONTACTS.map(({ role, phone }) => (
                    <div key={phone}>
                      {role} {phone}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border-2 border-primary-200 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-primary-600">우리의 비전</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              연구의 미래를 함께 만들어가는 파트너로서, 최첨단 연구장비와 전문적인 서비스를 통해 
              고객님의 연구 성공을 지원하며, 대한민국 과학기술 발전에 기여합니다.
            </p>
          </div>
        </div>
      </div>

      {/* Page 4: 회사 연혁 */}
      <div className="brochure-page bg-gray-50">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">02</div>
            <h2 className="text-4xl font-bold text-gray-900">회사 연혁</h2>
          </div>

          <div className="relative">
            {/* 타임라인 선 */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-primary-200"></div>

            <div className="space-y-8">
              {[
                {
                  year: '2024',
                  events: [
                    '연매출 1,000억원 달성',
                    '거래 고객사 500개 돌파',
                    '신규 물류센터 개설 (경기도)',
                  ],
                },
                {
                  year: '2020',
                  events: [
                    'AI 기반 장비 평가 시스템 도입',
                    '전국 네트워크 확장 (부산, 대구 지점)',
                    'ISO 9001 품질경영시스템 인증',
                  ],
                },
                {
                  year: '2015',
                  events: [
                    '누적 장비 거래 3,000대 달성',
                    '우수 중소기업 선정 (중소벤처기업부)',
                    '온라인 플랫폼 서비스 시작',
                  ],
                },
                {
                  year: '2010',
                  events: [
                    '경기 시흥 본사 시설 정비',
                    '전문 엔지니어 팀 50명 확보',
                    '대학 및 연구소 전담 부서 신설',
                  ],
                },
                {
                  year: '2004',
                  events: [
                    `${SITE_BRAND_NAME} 서비스 시작 · 본사 경기 시흥`,
                    '연구장비 매입 사업 시작',
                    '초기 10개 거래처 확보',
                  ],
                },
              ].map((item, index) => (
                <div key={index} className="relative pl-24">
                  <div className="absolute left-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {item.year.slice(2)}
                  </div>
                  <div className="bg-white rounded-xl shadow-md p-6">
                    <h3 className="text-2xl font-bold mb-4 text-primary-600">{item.year}</h3>
                    <ul className="space-y-2">
                      {item.events.map((event, eventIndex) => (
                        <li key={eventIndex} className="flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span className="text-gray-700">{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Page 5: 핵심 가치 */}
      <div className="brochure-page">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">03</div>
            <h2 className="text-4xl font-bold text-gray-900">핵심 가치</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 mb-12">
            {[
              {
                icon: '🎯',
                title: '전문성 (Expertise)',
                description: '20년 이상의 경험과 노하우를 바탕으로 최상의 솔루션을 제공합니다.',
                details: [
                  '150명의 전문 인력 보유',
                  '모든 장비 카테고리 전문가 배치',
                  '정확한 시장 가격 평가 시스템',
                  '지속적인 교육과 기술 개발',
                ],
                color: 'from-blue-500 to-blue-600',
              },
              {
                icon: '🤝',
                title: '신뢰성 (Reliability)',
                description: '정직한 거래와 투명한 프로세스로 고객의 신뢰를 얻고 있습니다.',
                details: [
                  '공정한 가격 평가 시스템',
                  '투명한 계약 및 결제 프로세스',
                  '고객 정보 보안 철저',
                  '사후 관리 서비스 제공',
                ],
                color: 'from-green-500 to-green-600',
              },
              {
                icon: '💡',
                title: '혁신 (Innovation)',
                description: '끊임없는 혁신으로 연구 환경의 발전에 기여합니다.',
                details: [
                  'AI 기반 장비 평가 시스템',
                  '온라인 실시간 견적 서비스',
                  '최신 물류 시스템 구축',
                  '친환경 재활용 프로세스',
                ],
                color: 'from-purple-500 to-purple-600',
              },
            ].map((value, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className={`bg-gradient-to-r ${value.color} text-white p-6`}>
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{value.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">{value.title}</h3>
                      <p className="text-white/90">{value.description}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <ul className="grid grid-cols-2 gap-3">
                    {value.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <svg className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 6: 서비스 소개 */}
      <div className="brochure-page bg-gray-50">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">04</div>
            <h2 className="text-4xl font-bold text-gray-900">서비스 소개</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-primary-600">매입 가능 장비 카테고리</h3>
            <div className="grid grid-cols-2 gap-6">
              {sampleCategories.map((category, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg">
                  <div className="text-4xl">{category.icon}</div>
                  <div>
                    <div className="font-bold text-lg text-gray-900">{category.name}</div>
                    <div className="text-sm text-gray-600">매입 가능 {category.count}+ 종류</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                title: '주요 취급 브랜드',
                items: ['Agilent', 'Thermo Fisher', 'Waters', 'Bruker', 'PerkinElmer', 'Keysight', 'Tektronix', 'Fluke', 'Eppendorf', 'Mettler Toledo', 'Sartorius', 'Shimadzu'],
              },
              {
                title: '서비스 영역',
                items: ['대학 연구실', '정부 출연 연구소', '기업 연구소', '의료기관', '검사기관', '제조업체'],
              },
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-xl font-bold mb-4 text-primary-600">{section.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {section.items.map((item, itemIndex) => (
                    <span key={itemIndex} className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg font-medium">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 7: 매입 프로세스 */}
      <div className="brochure-page">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">05</div>
            <h2 className="text-4xl font-bold text-gray-900">매입 프로세스</h2>
          </div>

          <div className="bg-primary-50 rounded-xl p-6 mb-8 text-center">
            <p className="text-xl text-gray-700">
              <strong>간단하고 투명한 5단계</strong> 프로세스로 <strong className="text-primary-600">3-5일 이내</strong> 신속하게 진행됩니다
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                number: '01',
                title: '문의 접수',
                icon: '📞',
                description: '온라인 문의, 전화, 카카오톡을 통해 장비 정보를 알려주세요.',
                time: '즉시',
              },
              {
                number: '02',
                title: '현장 방문',
                icon: '🚗',
                description: '전문 평가사가 현장을 방문하여 장비 상태를 정확히 평가합니다.',
                time: '1-2일',
              },
              {
                number: '03',
                title: '견적 제시',
                icon: '💰',
                description: '평가 결과를 바탕으로 공정하고 합리적인 매입 가격을 제시합니다.',
                time: '당일',
              },
              {
                number: '04',
                title: '계약 체결',
                icon: '📝',
                description: '견적에 동의하시면 계약서를 작성하고 매입 조건을 확정합니다.',
                time: '1일',
              },
              {
                number: '05',
                title: '장비 인수',
                icon: '📦',
                description: '약정된 일정에 맞춰 장비를 안전하게 수거하고 대금을 즉시 지급합니다.',
                time: '1-2일',
              },
            ].map((step, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="flex items-center">
                  <div className="w-24 bg-primary-600 text-white flex flex-col items-center justify-center py-6">
                    <div className="text-3xl mb-2">{step.icon}</div>
                    <div className="font-bold">{step.number}</div>
                  </div>
                  <div className="flex-1 p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{step.title}</h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        소요: {step.time}
                      </span>
                    </div>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 8: 매입 가이드 */}
      <div className="brochure-page bg-gray-50">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">06</div>
            <h2 className="text-4xl font-bold text-gray-900">매입 가이드</h2>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {[
              {
                icon: '📋',
                title: '매입 전 준비사항',
                items: [
                  '장비명, 모델명, 제조사 정보',
                  '구매 시기 및 사용 기간',
                  '현재 상태 및 보관 환경',
                  '장비 사진 (전면, 후면, 측면)',
                ],
              },
              {
                icon: '🔍',
                title: '평가 기준',
                items: [
                  '장비의 외관 상태 및 작동 여부',
                  '부품 마모도 및 수명',
                  '제조 연도 및 시장 수요',
                  '브랜드 가치 및 유지보수 이력',
                ],
              },
              {
                icon: '💰',
                title: '가격 책정',
                items: [
                  '신품 대비 30-70% 수준',
                  '최신 시장 가격 조사 기반',
                  '상태에 따른 공정한 평가',
                  '협상 가능 (합리적 범위 내)',
                ],
              },
              {
                icon: '✅',
                title: '매입 성공 팁',
                items: [
                  '정확한 정보 제공으로 빠른 견적',
                  '사진 미리 보내기로 시간 절약',
                  '깨끗한 상태 유지로 좋은 평가',
                  '부속품 보관으로 가격 상승',
                ],
              },
            ].map((section, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{section.icon}</div>
                  <h3 className="text-xl font-bold text-primary-600">{section.title}</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-start gap-2">
                      <span className="text-primary-600 mt-1">•</span>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 9: 배송 및 수거 */}
      <div className="brochure-page">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">07</div>
            <h2 className="text-4xl font-bold text-gray-900">배송 및 수거 안내</h2>
          </div>

          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-4">전국 무료 수거 서비스</h3>
            <p className="text-primary-100 text-lg">전문 운반팀이 전국 어디서든 안전하게 장비를 수거해드립니다</p>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            {[
              {
                region: '수도권',
                time: '당일/익일',
                cost: '무료',
                areas: ['서울', '경기', '인천'],
              },
              {
                region: '충청/강원',
                time: '2-3일',
                cost: '무료',
                areas: ['대전', '충남북', '강원'],
              },
              {
                region: '경상/전라',
                time: '3-5일',
                cost: '상담 후 결정',
                areas: ['부산', '대구', '광주', '제주'],
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center">
                <div className="text-2xl font-bold text-primary-600 mb-3">{item.region}</div>
                <div className="space-y-2 text-sm mb-4">
                  <div>
                    <span className="text-gray-600">소요:</span>
                    <span className="font-semibold ml-2">{item.time}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">비용:</span>
                    <span className="font-semibold ml-2 text-green-600">{item.cost}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                  {item.areas.map((area, areaIndex) => (
                    <span key={areaIndex} className="px-2 py-1 bg-primary-50 text-primary-700 text-xs rounded">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              {
                title: '안전한 포장',
                icon: '📦',
                points: ['방수 포장재 사용', '충격 방지 포장', '전문 운반 차량', '보험 가입 완료'],
              },
              {
                title: '수거 프로세스',
                icon: '🚚',
                points: ['신청 접수', '일정 조율', '현장 방문', '포장 및 수거', '대금 지급'],
              },
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{item.icon}</div>
                  <h3 className="text-lg font-bold">{item.title}</h3>
                </div>
                <ul className="space-y-2">
                  {item.points.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-center gap-2 text-sm text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 10: 주요 실적 */}
      <div className="brochure-page bg-gray-50">
        <div className="max-w-4xl mx-auto px-12 py-16">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-primary-600 text-white rounded-lg flex items-center justify-center font-bold">08</div>
            <h2 className="text-4xl font-bold text-gray-900">주요 실적</h2>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6 text-primary-600">주요 거래처</h3>
            <div className="grid grid-cols-4 gap-4">
              {[
                '서울대학교',
                'KAIST',
                'POSTECH',
                '연세대학교',
                '고려대학교',
                '성균관대학교',
                '한국과학기술연구원',
                '한국기초과학지원연구원',
              ].map((client, index) => (
                <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="font-medium text-gray-800">{client}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {samplePortfolio.slice(0, 4).map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-primary-600 text-white p-4">
                  <div className="font-bold text-lg">{item.clientName}</div>
                  <div className="text-sm text-primary-100">{new Date(item.completedAt).getFullYear()}년</div>
                </div>
                <div className="p-4">
                  <div className="text-sm font-semibold mb-2">{item.title}</div>
                  <div className="text-xs text-gray-600 space-y-1">
                    {item.equipmentList.slice(0, 3).map((equipment, eqIndex) => (
                      <div key={eqIndex}>• {equipment}</div>
                    ))}
                    {item.equipmentList.length > 3 && (
                      <div className="text-primary-600">외 {item.equipmentList.length - 3}건</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Page 11: 연락처 */}
      <div className="brochure-page page-contact bg-gradient-to-br from-primary-700 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-12 py-16 h-full flex flex-col justify-center">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">문의하기</h2>
            <p className="text-2xl text-primary-100">언제든지 편하게 연락주세요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">연락처 정보</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">📞</div>
                  <div>
                    <div className="text-sm text-primary-100">전화</div>
                    <div className="font-semibold text-xl space-y-0.5">
                      {COMPANY_CONTACTS.map(({ role, phone }) => (
                        <div key={phone}>
                          {role} {phone}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">📠</div>
                  <div>
                    <div className="text-sm text-primary-100">팩스</div>
                    <div className="font-semibold text-xl">02-1234-5679</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">✉️</div>
                  <div>
                    <div className="text-sm text-primary-100">이메일</div>
                    <div className="font-semibold text-xl">{COMPANY_EMAIL}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl">💬</div>
                  <div>
                    <div className="text-sm text-primary-100">카카오톡</div>
                    <div className="font-semibold text-xl">@09all</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
              <h3 className="text-2xl font-bold mb-6">오시는 길</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-primary-100 mb-2">주소</div>
                  <div className="font-semibold text-lg">{COMPANY_ADDRESS}</div>
                </div>
                <div>
                  <div className="text-sm text-primary-100 mb-2">대중교통</div>
                  <div className="font-semibold">
                    시흥시 시내버스·마을버스 (과림동 인근 정류장 하차, 노선은 지도 앱에서 확인)
                  </div>
                </div>
                <div>
                  <div className="text-sm text-primary-100 mb-2">자가용</div>
                  <div className="font-semibold">네비에「{COMPANY_ADDRESS}」검색</div>
                </div>
                <div>
                  <div className="text-sm text-primary-100 mb-2">주차</div>
                  <div className="font-semibold">건물 지하 주차장 이용 가능</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">운영시간</h3>
            <div className="grid grid-cols-2 gap-8 text-lg">
              <div>
                <div className="text-primary-100 mb-2">평일</div>
                <div className="font-semibold">09:00 - 18:00</div>
              </div>
              <div>
                <div className="text-primary-100 mb-2">주말 및 공휴일</div>
                <div className="font-semibold">휴무</div>
              </div>
            </div>
            <div className="mt-6 text-sm text-primary-100">
              * 긴급 문의는 카카오톡이나 이메일로 언제든지 가능합니다
            </div>
          </div>

          <div className="text-center mt-12 pt-8 border-t border-white/20">
            <div className="text-4xl font-bold mb-4">09all</div>
            <div className="text-primary-100">
              연구장비 매입 전문 기업 | Since 2004
            </div>
          </div>
        </div>
      </div>

      {/* 인쇄 스타일 */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }

          .brochure-page {
            min-height: 100vh;
            page-break-after: always;
            page-break-inside: avoid;
          }

          .brochure-page:last-child {
            page-break-after: auto;
          }

          @page {
            size: A4;
            margin: 0;
          }

          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
        }

        @media screen {
          .brochure-page {
            min-height: calc(100vh - 80px);
            padding: 2rem 0;
          }

          .page-cover,
          .page-contact {
            min-height: 100vh;
          }
        }
      `}</style>
    </div>
  )
}
