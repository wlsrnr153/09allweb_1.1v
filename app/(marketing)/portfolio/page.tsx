'use client'

import { useState } from 'react'
import Link from 'next/link'
import { samplePortfolio } from '@/lib/data/sample-portfolio'
import { formatDate } from '@/lib/utils'
import { COMPANY_CONTACTS, telHref } from '@/lib/constants/contact'

export default function PortfolioPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string | null>(null)

  const selected = samplePortfolio.find((p) => p.id === selectedPortfolio)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">매입 실적</h1>
          <p className="text-gray-600">
            다양한 기관으로부터 매입한 장비 실적을 소개합니다
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        {/* 통계 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">총 매입 건수</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">300+</div>
            <div className="text-gray-600">거래 기관</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">20년</div>
            <div className="text-gray-600">업력</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="text-3xl font-bold text-primary-600 mb-2">99%</div>
            <div className="text-gray-600">고객 만족도</div>
          </div>
        </div>

        {/* 포트폴리오 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {samplePortfolio.map((portfolio) => (
            <div
              key={portfolio.id}
              onClick={() => setSelectedPortfolio(portfolio.id)}
              className="card group cursor-pointer hover:shadow-2xl transition-all duration-300"
            >
              {/* 이미지 */}
              <div className="aspect-video bg-gradient-to-br from-primary-100 to-primary-200 rounded-t-lg relative overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="text-4xl mb-2">📦</div>
                    <div className="text-sm text-primary-700 font-medium">
                      {portfolio.equipmentList.length}개 장비
                    </div>
                  </div>
                </div>

                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="text-2xl mb-2">👁️</div>
                    <div className="text-sm">자세히 보기</div>
                  </div>
                </div>
              </div>

              {/* 정보 */}
              <div className="p-5">
                <div className="text-xs text-primary-600 font-medium mb-2">
                  {formatDate(portfolio.completedAt)}
                </div>
                <h3 className="font-bold text-lg mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors">
                  {portfolio.clientName}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {portfolio.title}
                </p>

                {/* 장비 목록 */}
                <div className="text-xs text-gray-500 space-y-1">
                  {portfolio.equipmentList.slice(0, 2).map((eq, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-primary-500 mr-1">•</span>
                      <span className="line-clamp-1">{eq}</span>
                    </div>
                  ))}
                  {portfolio.equipmentList.length > 2 && (
                    <div className="text-primary-600 font-medium">
                      외 {portfolio.equipmentList.length - 2}개
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 문의 CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">장비 매입 문의</h2>
          <p className="text-primary-100 mb-6">
            귀사의 연구, 전산장비 환경에 최적화된 장비 매입, 폐기 솔루션을 제공해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap">
            <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              문의하기
            </Link>
            {COMPANY_CONTACTS.map(({ role, phone }) => (
              <a
                key={phone}
                href={telHref(phone)}
                className="btn bg-primary-800 hover:bg-primary-900 text-sm"
              >
                📞 {role} {phone}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 상세 모달 */}
      {selectedPortfolio && selected && (
        <div
          onClick={() => setSelectedPortfolio(null)}
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* 헤더 */}
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div>
                <div className="text-sm text-primary-600 font-medium mb-1">
                  {formatDate(selected.completedAt)}
                </div>
                <h2 className="text-2xl font-bold">{selected.clientName}</h2>
              </div>
              <button
                onClick={() => setSelectedPortfolio(null)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* 본문 */}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{selected.title}</h3>
              <p className="text-gray-700 mb-6">{selected.description}</p>

              <h4 className="font-semibold mb-3">매입 장비 목록</h4>
              <ul className="space-y-2 mb-6">
                {selected.equipmentList.map((equipment, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>{equipment}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-sm text-gray-600">
                  <div className="flex items-center justify-between mb-2">
                    <span>프로젝트 완료일</span>
                    <span className="font-medium text-gray-900">
                      {formatDate(selected.completedAt)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>납품 장비 수</span>
                    <span className="font-medium text-gray-900">
                      {selected.equipmentList.length}개
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 푸터 */}
            <div className="border-t p-6">
              <Link
                href="/contact"
                onClick={() => setSelectedPortfolio(null)}
                className="btn btn-primary w-full"
              >
                유사 프로젝트 문의하기
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

