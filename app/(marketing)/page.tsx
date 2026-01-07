'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { sampleEquipment, sampleCategories } from '@/lib/data/sample-equipment'
import { samplePortfolio } from '@/lib/data/sample-portfolio'
import EquipmentCard from '@/components/equipment/EquipmentCard'
import { openKakaoChannel } from '@/lib/kakao'

export default function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'latest' | 'popular' | 'special'>('latest')

  const slides = [
    {
      title: '최첨단 연구장비로\n연구의 미래를 열어갑니다',
      description: '20년 전통의 신뢰할 수 있는 연구장비 전문 기업',
      cta: '장비 둘러보기',
      link: '/equipment',
      bg: 'from-primary-600 via-primary-700 to-primary-800',
    },
    {
      title: '전문가가 추천하는\n검증된 분석장비',
      description: 'Agilent, Thermo Fisher 등 글로벌 브랜드 정품 공급',
      cta: '견적 문의하기',
      link: '/contact',
      bg: 'from-cyan-600 via-blue-600 to-blue-700',
    },
    {
      title: '합리적인 가격의\n리퍼비시 장비',
      description: '전문 기술진의 철저한 점검을 거친 중고 장비',
      cta: '실적 보기',
      link: '/portfolio',
      bg: 'from-indigo-600 via-indigo-700 to-purple-700',
    },
  ]

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  // 탭별 장비 필터링
  const filteredEquipment = 
    activeTab === 'latest' 
      ? sampleEquipment.slice(0, 6)
      : activeTab === 'popular'
      ? [...sampleEquipment].sort((a, b) => b.viewCount - a.viewCount).slice(0, 6)
      : sampleEquipment.filter(eq => eq.condition === 'refurbished').slice(0, 6)

  return (
    <div className="min-h-screen">
      {/* 히어로 슬라이더 */}
      <section className="relative h-[500px] md:h-[650px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === activeSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`h-full bg-gradient-to-r ${slide.bg} flex items-center`}>
              <div className="container">
                <div className="max-w-3xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 whitespace-pre-line leading-tight">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90">
                    {slide.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <Link
                      href={slide.link}
                      className="px-6 md:px-8 py-3 md:py-4 bg-white text-primary-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      {slide.cta}
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                    <Link
                      href="/contact"
                      className="px-6 md:px-8 py-3 md:py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-center"
                    >
                      무료 상담
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* 슬라이드 인디케이터 */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`h-2 md:h-3 rounded-full transition-all ${
                index === activeSlide ? 'bg-white w-6 md:w-8' : 'bg-white/50 w-2 md:w-3'
              }`}
              aria-label={`슬라이드 ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 검색바 섹션 */}
      <section className="bg-gray-50 py-8 md:py-12">
        <div className="container">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 max-w-4xl mx-auto border border-gray-100">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <input
                type="text"
                placeholder="장비명, 모델명, 제조사를 검색하세요..."
                className="flex-1 px-4 md:px-6 py-3 md:py-4 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none text-base md:text-lg transition-colors"
              />
              <Link
                href="/equipment"
                className="px-6 md:px-8 py-3 md:py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all hover:shadow-lg whitespace-nowrap text-center"
              >
                장비 검색
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 카카오톡 상담 강조 배너 */}
      <section className="bg-gradient-to-r from-[#FEE500] to-[#FDD835] py-6 md:py-8">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 md:w-10 md:h-10" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z"
                    fill="#3C1E1E"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                  카카오톡으로 빠르게 상담받으세요!
                </h3>
                <p className="text-sm md:text-base text-gray-700">
                  실시간 견적 문의 및 상담 가능 · 평일 09:00-18:00
                </p>
              </div>
            </div>
            <button
              onClick={openKakaoChannel}
              className="px-6 md:px-8 py-3 md:py-4 bg-gray-900 text-white font-bold rounded-lg hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl whitespace-nowrap text-sm md:text-base"
            >
              카카오톡 상담 시작하기 →
            </button>
          </div>
        </div>
      </section>

      {/* 빠른 링크 */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '💬', title: '견적 문의', link: '/contact', color: 'bg-blue-50 text-blue-600' },
              { icon: '📦', title: '장비 카탈로그', link: '/equipment', color: 'bg-green-50 text-green-600' },
              { icon: '📞', title: '고객센터', link: '/contact', color: 'bg-orange-50 text-orange-600' },
              { icon: '📍', title: '오시는 길', link: '/location', color: 'bg-purple-50 text-purple-600' },
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 ${item.color} rounded-full flex items-center justify-center text-3xl group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{item.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 통계 */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '5,000+', label: '총 납품 장비', icon: '📦' },
              { number: '500+', label: '거래 기관', icon: '🏢' },
              { number: '20년', label: '업력', icon: '🏆' },
              { number: '99%', label: '고객 만족도', icon: '⭐' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg text-white/90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 장비 카테고리 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">장비 카테고리</h2>
            <p className="text-xl text-gray-600">다양한 분야의 연구장비를 만나보세요</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {sampleCategories.map((category) => (
              <Link
                key={category.id}
                href={`/equipment?category=${category.slug}`}
                className="group bg-white border-2 border-gray-200 rounded-xl p-8 text-center hover:border-primary-500 hover:shadow-lg transition-all"
              >
                <div className="text-5xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">{category.name}</h3>
                <p className="text-gray-600">{category.count}개 장비</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 장비 탭 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">추천 장비</h2>
            <p className="text-xl text-gray-600">전문가가 엄선한 고품질 연구장비</p>
          </div>

          {/* 탭 */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-md">
              {[
                { key: 'latest', label: '최신 등록' },
                { key: 'popular', label: '인기 장비' },
                { key: 'special', label: '특가 장비' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    activeTab === tab.key
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* 장비 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredEquipment.map((equipment) => (
              <EquipmentCard key={equipment.id} equipment={equipment} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/equipment"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
            >
              전체 장비 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 매입 실적 */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">납품 실적</h2>
            <p className="text-xl text-gray-600">신뢰할 수 있는 파트너, 검증된 실적</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {samplePortfolio.slice(0, 3).map((portfolio) => (
              <Link
                key={portfolio.id}
                href="/portfolio"
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center">
                  <div className="text-6xl">📦</div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-primary-600 font-semibold mb-2">
                    {portfolio.completedAt.toLocaleDateString('ko-KR')}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600">
                    {portfolio.clientName}
                  </h3>
                  <p className="text-gray-600 text-sm">{portfolio.title}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary-600 text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors"
            >
              전체 실적 보기
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* 뉴스/공지 */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* 공지사항 */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">공지사항</h3>
                <Link href="/faq" className="text-primary-600 hover:text-primary-700 font-semibold">
                  더보기 →
                </Link>
              </div>
              <ul className="space-y-4">
                {[
                  { title: '2026년 신년 휴무 안내', date: '2026.01.02', badge: 'NEW' },
                  { title: '신규 장비 라인업 추가', date: '2025.12.28' },
                  { title: '연말 특가 프로모션 안내', date: '2025.12.20' },
                  { title: '고객센터 운영시간 변경', date: '2025.12.15' },
                ].map((notice, index) => (
                  <li key={index}>
                    <Link href="/faq" className="flex items-start gap-3 hover:text-primary-600 group">
                      <span className="text-primary-600 mt-1">•</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="group-hover:underline">{notice.title}</span>
                          {notice.badge && (
                            <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                              {notice.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-500">{notice.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 장비 소식 */}
            <div className="bg-white rounded-xl p-8 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold">장비 소식</h3>
                <Link href="/equipment" className="text-primary-600 hover:text-primary-700 font-semibold">
                  더보기 →
                </Link>
              </div>
              <ul className="space-y-4">
                {[
                  { title: 'Agilent 최신 HPLC 시스템 입고', date: '2026.01.05' },
                  { title: 'Thermo Fisher GC-MS 특가 행사', date: '2026.01.03' },
                  { title: 'Bruker NMR 시스템 재고 확보', date: '2025.12.30' },
                  { title: 'Waters UPLC 신규 모델 출시', date: '2025.12.25' },
                ].map((news, index) => (
                  <li key={index}>
                    <Link href="/equipment" className="flex items-start gap-3 hover:text-primary-600 group">
                      <span className="text-primary-600 mt-1">•</span>
                      <div className="flex-1">
                        <span className="group-hover:underline block">{news.title}</span>
                        <span className="text-sm text-gray-500">{news.date}</span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-800 text-white relative overflow-hidden">
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FEE500]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#FEE500]/10 rounded-full blur-3xl"></div>
        
        <div className="container text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">장비 구매 문의</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            전문 상담원이 귀하의 연구 환경에 최적화된 장비 솔루션을 제안해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {/* 카카오톡 버튼 - 강조 */}
            <button
              onClick={openKakaoChannel}
              className="px-10 py-5 bg-[#FEE500] text-gray-900 font-bold rounded-xl hover:bg-[#FDD835] transition-all shadow-2xl hover:shadow-[#FEE500]/50 hover:scale-105 inline-flex items-center justify-center gap-3 text-lg relative group"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z" fill="#3C1E1E" />
              </svg>
              <span>카카오톡 상담</span>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                NEW
              </span>
            </button>
            <a
              href="tel:02-1234-5678"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              📞 02-1234-5678
            </a>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              문의 폼 작성
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
