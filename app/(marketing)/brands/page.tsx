import Link from 'next/link'
import Image from 'next/image'

export default function BrandsPage() {
  const brands = [
    {
      name: 'Agilent Technologies',
      description: '분석기기 및 측정 솔루션 분야의 글로벌 리더',
      categories: ['HPLC', 'GC', 'LC-MS', 'GC-MS', '분광기'],
      logo: '🔬',
      color: 'from-blue-500 to-blue-600',
      popularEquipment: ['Agilent 1260 Infinity II HPLC', 'Agilent 7890B GC', 'Agilent 5977B MSD'],
    },
    {
      name: 'Thermo Fisher Scientific',
      description: '생명과학 및 분석기기 분야의 세계적 기업',
      categories: ['질량분석기', '분광기', '현미경', '세포배양기'],
      logo: '⚗️',
      color: 'from-green-500 to-green-600',
      popularEquipment: ['Thermo Scientific TSQ 8000', 'Thermo Scientific Nicolet iS50'],
    },
    {
      name: 'Waters Corporation',
      description: '액체크로마토그래피 및 질량분석기 전문 기업',
      categories: ['UPLC', 'LC-MS', 'HPLC'],
      logo: '💧',
      color: 'from-cyan-500 to-cyan-600',
      popularEquipment: ['Waters ACQUITY UPLC', 'Waters Xevo TQ-S'],
    },
    {
      name: 'Shimadzu',
      description: '일본의 대표적인 분석기기 제조사',
      categories: ['HPLC', 'GC', '분광기', '현미경'],
      logo: '🔍',
      color: 'from-purple-500 to-purple-600',
      popularEquipment: ['Shimadzu LC-2030', 'Shimadzu GC-2010 Plus'],
    },
    {
      name: 'PerkinElmer',
      description: '분석기기 및 진단 솔루션 제공 기업',
      categories: ['분광기', '질량분석기', '현미경'],
      logo: '📊',
      color: 'from-orange-500 to-orange-600',
      popularEquipment: ['PerkinElmer Lambda 950', 'PerkinElmer Clarus 680 GC'],
    },
    {
      name: 'Bruker',
      description: 'NMR, 질량분석기, 분광기 전문 기업',
      categories: ['NMR', '질량분석기', 'X-ray 분석기'],
      logo: '🧲',
      color: 'from-red-500 to-red-600',
      popularEquipment: ['Bruker AVANCE III HD', 'Bruker timsTOF Pro'],
    },
    {
      name: 'JEOL',
      description: '전자현미경 및 분석기기 제조사',
      categories: ['전자현미경', 'NMR', '질량분석기'],
      logo: '🔬',
      color: 'from-indigo-500 to-indigo-600',
      popularEquipment: ['JEOL JEM-2100F', 'JEOL JNM-ECZ400S'],
    },
    {
      name: 'Hitachi',
      description: '다양한 분석기기 및 측정 장비 제조',
      categories: ['분광기', '현미경', '원소분석기'],
      logo: '⚡',
      color: 'from-yellow-500 to-yellow-600',
      popularEquipment: ['Hitachi U-3900', 'Hitachi SU-8010'],
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">장비 브랜드 소개</h1>
          <p className="text-gray-600">
            다양한 브랜드의 연구장비를 전문적으로 매입합니다
          </p>
        </div>
      </div>

      {/* 브랜드 소개 */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* 브랜드 헤더 */}
              <div className={`bg-gradient-to-br ${brand.color} text-white p-6`}>
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-5xl">{brand.logo}</div>
                  <h2 className="text-xl font-bold">{brand.name}</h2>
                </div>
                <p className="text-white/90 text-sm">{brand.description}</p>
              </div>

              {/* 브랜드 정보 */}
              <div className="p-6">
                {/* 주요 카테고리 */}
                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">주요 카테고리</h3>
                  <div className="flex flex-wrap gap-2">
                    {brand.categories.map((category, catIndex) => (
                      <span
                        key={catIndex}
                        className="px-3 py-1 bg-primary-50 text-primary-700 text-xs rounded-full font-medium"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 인기 장비 */}
                {brand.popularEquipment && brand.popularEquipment.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-2">인기 매입 장비</h3>
                    <ul className="space-y-1">
                      {brand.popularEquipment.map((equipment, eqIndex) => (
                        <li key={eqIndex} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className="text-primary-600 mt-1">•</span>
                          <span>{equipment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* CTA 버튼 */}
              <div className="px-6 pb-6">
                <Link
                  href={`/equipment?brand=${encodeURIComponent(brand.name)}`}
                  className="block w-full text-center px-4 py-2 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                >
                  {brand.name} 장비 보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 전체 브랜드 안내 */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white py-12">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">모든 브랜드 매입 가능</h2>
            <p className="text-primary-100 mb-6 text-lg">
              위에 소개된 브랜드 외에도 다양한 제조사의 연구장비를 매입합니다.
              <br />
              보유하신 장비의 브랜드와 상관없이 언제든지 문의해주세요.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              {[
                'Beckman Coulter',
                'Bio-Rad',
                'Eppendorf',
                'Mettler Toledo',
                'Sartorius',
                'Zeiss',
                'Olympus',
                'Leica',
              ].map((brand, index) => (
                <div
                  key={index}
                  className="bg-white/10 rounded-lg p-4 backdrop-blur-sm text-center"
                >
                  <div className="text-sm font-medium">{brand}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">보유하신 장비를 매입해드립니다</h2>
          <p className="text-gray-600 mb-6">
            브랜드와 상관없이 모든 연구장비를 전문적으로 평가하고 매입합니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
            >
              매입 견적 요청
            </Link>
            <Link
              href="/equipment"
              className="px-8 py-4 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
            >
              매입 가능 장비 보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
