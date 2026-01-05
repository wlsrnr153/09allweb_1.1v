import Link from 'next/link'
import Image from 'next/image'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              최첨단 연구장비로<br />
              연구의 새로운 가능성을 열어보세요
            </h1>
            <p className="text-xl mb-8 text-primary-100">
              전문가가 추천하는 검증된 연구장비를 합리적인 가격으로 만나보세요
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/equipment"
                className="btn btn-primary bg-white text-primary-600 hover:bg-gray-100"
              >
                장비 둘러보기
              </Link>
              <Link
                href="/contact"
                className="btn bg-transparent border-2 border-white hover:bg-white/10"
              >
                무료 견적 상담
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">장비 카테고리</h2>
            <p className="text-gray-600">다양한 연구 분야의 장비를 만나보세요</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: '분석장비', count: 247, icon: '📊', slug: 'analytical' },
              { name: '계측장비', count: 183, icon: '📏', slug: 'measurement' },
              { name: '실험장비', count: 156, icon: '🔬', slug: 'laboratory' },
              { name: '기타장비', count: 89, icon: '⚙️', slug: 'others' },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/equipment?category=${category.slug}`}
                className="card p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
                <p className="text-gray-600">{category.count}개</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Equipment */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">추천 연구장비</h2>
            <p className="text-gray-600">전문가가 엄선한 인기 연구장비</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Placeholder equipment cards */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div className="aspect-video bg-gray-200 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                    이미지 준비중
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-sm text-gray-500 mb-2">분석장비</div>
                  <h3 className="font-semibold text-lg mb-2">
                    장비명 {i}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    제조사: Agilent (2024)
                  </p>
                  <div className="text-2xl font-bold text-primary-600 mb-4">
                    ₩ 150,000,000
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/equipment/${i}`}
                      className="btn btn-secondary flex-1 text-center"
                    >
                      상세보기
                    </Link>
                    <Link
                      href="/contact"
                      className="btn btn-primary flex-1 text-center"
                    >
                      견적요청
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">서비스 안내</h2>
            <p className="text-gray-600">연구장비 전문기업이 제공하는 종합 서비스</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🛒',
                title: '장비매입',
                description: '국내외 우수 연구장비를 경쟁력 있는 가격으로 매입',
                features: ['전문가 상담', '맞춤형 견적', '방문 상담'],
              },
              {
                icon: '💡',
                title: '컨설팅',
                description: '연구목적에 최적화된 장비 솔루션 제공',
                features: ['장비선정 컨설팅', '실험실 설계', '운영 최적화'],
              },
              {
                icon: '🔧',
                title: '유지보수',
                description: '전문 기술진의 체계적인 관리서비스',
                features: ['정기점검', '긴급수리', '예방정비'],
              },
            ].map((service, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, j) => (
                    <li key={j} className="text-sm text-gray-600">
                      ✓ {feature}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="btn btn-primary w-full">
                  자세히 보기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">
            전문 상담을 원하시나요?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            연구장비 전문가가 맞춤형 솔루션을 제공해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="btn bg-white text-primary-600 hover:bg-gray-100"
            >
              무료 견적 상담
            </Link>
            <a
              href="tel:02-1234-5678"
              className="btn bg-transparent border-2 border-white hover:bg-white/10"
            >
              📞 02-1234-5678
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

