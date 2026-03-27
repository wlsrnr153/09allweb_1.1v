import Link from 'next/link'
import { notFound } from 'next/navigation'
import { formatPrice } from '@/lib/utils'
import EquipmentDetailClient from '@/components/equipment/EquipmentDetailClient'
import { getEquipmentBySlug, getRelatedEquipment } from '@/lib/actions/equipment'

export default async function EquipmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const equipment = await getEquipmentBySlug(slug)

  if (!equipment) {
    notFound()
  }

  const relatedEquipment = equipment.category 
    ? await getRelatedEquipment(equipment.categoryId, equipment.id, 3)
    : []

  const conditionLabels: Record<string, string> = {
    new: '신품',
    refurbished: '리퍼비시',
    demo: '데모용',
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container py-4">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary-600">
              홈
            </Link>
            <span>/</span>
            <Link href="/equipment" className="hover:text-primary-600">
              장비안내
            </Link>
            <span>/</span>
            {equipment.category && (
              <>
                <Link
                  href={`/equipment?category=${equipment.category.slug}`}
                  className="hover:text-primary-600"
                >
                  {equipment.category.name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-gray-900 font-medium">{equipment.title}</span>
          </nav>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* 이미지 갤러리 */}
          <div>
            <EquipmentDetailClient equipment={equipment} />
          </div>

          {/* 장비 정보 */}
          <div>
            <div className="bg-white rounded-lg p-6">
              {/* 카테고리 & 상태 */}
              <div className="flex items-center gap-3 mb-4">
                {equipment.category && (
                  <Link
                    href={`/equipment?category=${equipment.category.slug}`}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    {equipment.category.name}
                  </Link>
                )}
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  {conditionLabels[equipment.condition]}
                </span>
              </div>

              {/* 제목 */}
              <h1 className="text-3xl font-bold mb-4">{equipment.title}</h1>

              {/* 제조사 정보 */}
              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
                <div>
                  <span className="text-gray-500">제조사:</span>{' '}
                  <span className="font-medium text-gray-900">{equipment.brand}</span>
                </div>
                <div>
                  <span className="text-gray-500">모델:</span>{' '}
                  <span className="font-medium text-gray-900">{equipment.model}</span>
                </div>
                <div>
                  <span className="text-gray-500">제조년도:</span>{' '}
                  <span className="font-medium text-gray-900">{equipment.year}년</span>
                </div>
                {equipment.warranty && (
                  <div>
                    <span className="text-gray-500">보증:</span>{' '}
                    <span className="font-medium text-gray-900">{equipment.warranty}</span>
                  </div>
                )}
              </div>

              {/* 가격 */}
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-1">판매가격</div>
                <div className="text-4xl font-bold text-primary-600">
                  {formatPrice(equipment.price)}
                </div>
                <div className="text-sm text-gray-500 mt-1">VAT 별도</div>
              </div>

              {/* 재고 */}
              <div className="flex items-center gap-2 text-sm mb-6">
                <span
                  className={`w-2 h-2 rounded-full ${
                    equipment.stock > 0 ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-gray-700">
                  {equipment.stock > 0 ? `재고 ${equipment.stock}개` : '품절'}
                </span>
              </div>

              <Link href={`/contact?equipment=${equipment.id}`} className="btn btn-secondary w-full">
                문의 폼 작성하기
              </Link>

              {/* 공유 버튼 */}
              <div className="mt-4 pt-4 border-t">
                <button className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                  공유하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 상세 정보 탭 */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="border-b">
            <div className="container">
              <div className="flex gap-8">
                <button className="py-4 px-2 border-b-2 border-primary-500 font-semibold text-primary-600">
                  상세설명
                </button>
                <button className="py-4 px-2 text-gray-600 hover:text-gray-900">사양</button>
                <button className="py-4 px-2 text-gray-600 hover:text-gray-900">특징</button>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* 상세설명 */}
            <div className="prose max-w-none">
              <h2 className="text-2xl font-bold mb-4">장비 소개</h2>
              <p className="text-gray-700 leading-relaxed mb-6">{equipment.description}</p>

              <h3 className="text-xl font-bold mb-3">주요 사양</h3>
              <table className="w-full mb-6">
                <tbody>
                  {Object.entries(equipment.specifications || {}).map(([key, value]) => (
                    <tr key={key} className="border-b">
                      <td className="py-3 px-4 bg-gray-50 font-medium w-1/3">{key}</td>
                      <td className="py-3 px-4">{String(value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <h3 className="text-xl font-bold mb-3">주요 특징</h3>
              <ul className="space-y-2">
                {equipment.features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary-600 mr-2">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 관련 장비 */}
        {relatedEquipment.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">관련 장비</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedEquipment.map((eq: any) => (
                <Link
                  key={eq.id}
                  href={`/equipment/${eq.slug}`}
                  className="card group hover:shadow-xl transition-all"
                >
                  <div className="aspect-video bg-gray-100 rounded-t-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">이미지 준비중</span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold mb-2 group-hover:text-primary-600">
                      {eq.title}
                    </h3>
                    <div className="text-xl font-bold text-primary-600">
                      {formatPrice(eq.price)}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
