'use client'

import { useState } from 'react'
import { sampleFAQ, faqCategories } from '@/lib/data/sample-faq'

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('0')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [openFAQ, setOpenFAQ] = useState<string | null>(null)

  // 필터링된 FAQ
  const filteredFAQ = sampleFAQ.filter((faq) => {
    const matchCategory = selectedCategory === '0' || faq.categoryId === selectedCategory
    const matchKeyword =
      searchKeyword === '' ||
      faq.question.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchKeyword.toLowerCase())
    return matchCategory && matchKeyword
  })

  const toggleFAQ = (id: string) => {
    setOpenFAQ(openFAQ === id ? null : id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">자주 묻는 질문</h1>
          <p className="text-gray-600">
            궁금하신 내용을 빠르게 찾아보세요
          </p>
        </div>
      </div>

      {/* 검색 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-12">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="궁금한 내용을 검색해보세요..."
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full px-6 py-4 pr-12 rounded-lg text-gray-900 text-lg focus:ring-4 focus:ring-primary-300"
              />
              <svg
                className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* 카테고리 사이드바 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="font-bold mb-4">카테고리</h2>
              <div className="space-y-1">
                {faqCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                    {category.id === '0' ? (
                      <span className="ml-2 text-sm opacity-75">({sampleFAQ.length})</span>
                    ) : (
                      <span className="ml-2 text-sm opacity-75">
                        ({sampleFAQ.filter((f) => f.categoryId === category.id).length})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 문의하기 */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg shadow-sm p-6 mt-6">
              <h3 className="font-bold mb-2">원하는 답변이 없으신가요?</h3>
              <p className="text-sm text-primary-100 mb-4">
                직접 문의하시면 빠르게 답변해드립니다
              </p>
              <a href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100 w-full">
                문의하기
              </a>
            </div>
          </div>

          {/* FAQ 목록 */}
          <div className="lg:col-span-3">
            {/* 결과 정보 */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  총 <span className="font-bold text-primary-600">{filteredFAQ.length}</span>개의 FAQ
                </div>
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword('')}
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    검색 초기화 ×
                  </button>
                )}
              </div>
            </div>

            {/* FAQ 아코디언 */}
            {filteredFAQ.length > 0 ? (
              <div className="space-y-4">
                {filteredFAQ.map((faq) => (
                  <div key={faq.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full text-left p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold text-primary-600 bg-primary-50 px-2 py-1 rounded">
                              {faq.category}
                            </span>
                            <span className="text-xs text-gray-500">조회 {faq.viewCount}</span>
                          </div>
                          <h3 className="font-semibold text-lg flex items-start">
                            <span className="text-primary-600 mr-2">Q.</span>
                            <span>{faq.question}</span>
                          </h3>
                        </div>
                        <svg
                          className={`w-6 h-6 text-gray-400 flex-shrink-0 ml-4 transition-transform ${
                            openFAQ === faq.id ? 'rotate-180' : ''
                          }`}
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
                    </button>

                    {openFAQ === faq.id && (
                      <div className="px-6 pb-6 border-t bg-gray-50">
                        <div className="pt-6 flex items-start">
                          <span className="text-primary-600 font-semibold mr-2">A.</span>
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">검색 결과가 없습니다</h3>
                <p className="text-gray-600 mb-4">
                  다른 검색어나 카테고리를 시도해보세요
                </p>
                <button
                  onClick={() => {
                    setSearchKeyword('')
                    setSelectedCategory('0')
                  }}
                  className="btn btn-primary"
                >
                  전체 FAQ 보기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 추가 문의 CTA */}
        <div className="mt-12 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">더 궁금하신 점이 있으신가요?</h2>
          <p className="text-gray-600 mb-6">
            전문 상담원이 친절하게 답변해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn btn-primary">
              문의하기
            </a>
            <a href="tel:02-1234-5678" className="btn btn-secondary">
              📞 02-1234-5678
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

