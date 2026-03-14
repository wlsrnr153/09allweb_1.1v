import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">회사소개</h1>
          <p className="text-gray-600">
            20년 전통의 연구장비 전문 기업, 09all을 소개합니다
          </p>
        </div>
      </div>

      {/* 메인 비전 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            연구의 미래를 함께 만들어갑니다
          </h2>
          <p className="text-xl text-primary-100 max-w-3xl mx-auto">
            09all은 최첨단 연구장비와 전문적인 서비스로<br />
            고객님의 연구 성공을 지원합니다
          </p>
        </div>
      </div>

      {/* 핵심 가치 */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">핵심 가치</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎯',
              title: '전문성',
              description: '20년 이상의 경험과 노하우를 바탕으로 최상의 솔루션을 제공합니다',
            },
            {
              icon: '🤝',
              title: '신뢰성',
              description: '정직한 거래와 투명한 프로세스로 고객의 신뢰를 얻고 있습니다',
            },
            {
              icon: '💡',
              title: '혁신',
              description: '끊임없는 혁신으로 연구 환경의 발전에 기여합니다',
            },
          ].map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4">{value.icon}</div>
              <h3 className="text-xl font-bold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 회사 정보 */}
      <div className="bg-white py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">회사 개요</h2>
              <div className="space-y-4 text-gray-700">
                <div className="flex">
                  <span className="font-semibold w-32">회사명</span>
                  <span>09all (구올)</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">설립일</span>
                  <span>2004년 3월</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">대표자</span>
                  <span>홍길동</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">주요 사업</span>
                  <span>연구장비 매입, 임대, 유지보수</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">직원 수</span>
                  <span>150명</span>
                </div>
                <div className="flex">
                  <span className="font-semibold w-32">연매출</span>
                  <span>1,000억원 (2024년 기준)</span>
                </div>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '500+', label: '거래 고객사' },
                  { number: '5,000+', label: '장비 공급' },
                  { number: '99%', label: '고객 만족도' },
                  { number: '20년', label: '업력' },
                ].map((stat, index) => (
                  <div key={index} className="bg-primary-50 rounded-lg p-6 text-center">
                    <div className="text-3xl font-bold text-primary-600 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-700">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 주요 거래처 */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold text-center mb-12">주요 거래처</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
            <div
              key={index}
              className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow"
            >
              <div className="text-gray-700 font-medium">{client}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">함께 성장하는 파트너가 되어주세요</h2>
          <p className="text-primary-100 mb-8 text-lg">
            20년의 경험과 노하우로 귀하의 연구 성공을 지원하겠습니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="btn bg-white text-primary-600 hover:bg-gray-100">
              문의하기
            </Link>
            <Link href="/about/history" className="btn bg-primary-800 hover:bg-primary-900">
              연혁 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

