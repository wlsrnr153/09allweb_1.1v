import { COMPANY_CONTACTS, telHref } from '@/lib/constants/contact'
import {
  COMPANY_ADDRESS,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME_FULL,
  SITE_BRAND_NAME,
} from '@/lib/constants/company'

export default function LocationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">오시는 길</h1>
          <p className="text-gray-600">
            {COMPANY_LEGAL_NAME_FULL} · {SITE_BRAND_NAME} 본사 소재지 안내
          </p>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 지도 */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-2">🗺️</div>
                  <div>카카오맵 연동 예정</div>
                  <div className="text-sm mt-2">
                    Kakao Maps API 키 설정 필요
                  </div>
                </div>
              </div>
            </div>

            {/* 약도 다운로드 */}
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold mb-1">오시는 길 약도</div>
                  <div className="text-sm text-gray-600">PDF 다운로드</div>
                </div>
                <button className="btn btn-primary">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  다운로드
                </button>
              </div>
            </div>
          </div>

          {/* 정보 */}
          <div className="space-y-6">
            {/* 주소 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-xl mb-4 flex items-center">
                <span className="text-2xl mr-2">📍</span>
                주소
              </h2>
              <div className="space-y-2">
                <div className="text-gray-700">
                  <div className="font-semibold mb-1">본사</div>
                  <div>{COMPANY_ADDRESS}</div>
                </div>
              </div>
            </div>

            {/* 대중교통 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-xl mb-4 flex items-center">
                <span className="text-2xl mr-2">🚇</span>
                대중교통
              </h2>
              <div className="space-y-4 text-sm text-gray-700">
                <p>
                  시흥시 과림동 인근은 시내버스·마을버스 노선이 운행합니다. 출발지에 맞는 노선은{' '}
                  <span className="font-medium">네이버·카카오 지도</span> 또는 시흥시 버스정보에서 확인해 주세요.
                </p>
                <div>
                  <div className="font-semibold mb-2">🚌 버스</div>
                  <div>
                    시흥시 환승센터·정왕역·오이도 방면 등 연결 노선을 이용한 뒤, 과림동 인근 정류장에서 하차하시면 됩니다.
                  </div>
                </div>
              </div>
            </div>

            {/* 자가용 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-xl mb-4 flex items-center">
                <span className="text-2xl mr-2">🚗</span>
                자가용
              </h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div>
                  <div className="font-semibold mb-1">네비게이션 주소</div>
                  <div className="bg-gray-50 p-3 rounded">{COMPANY_ADDRESS}</div>
                </div>

                <div>
                  <div className="font-semibold mb-1">주차 안내</div>
                  <div>
                    • 현장 주차 가능 여부는 방문 전 문의 시 안내드립니다<br />
                    • 제3경인·서해안 고속도로 등 이용 시 시흥 IC 인근에서 접근 가능합니다
                  </div>
                </div>
              </div>
            </div>

            {/* 연락처 */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-xl mb-4">문의하기</h2>
              <div className="space-y-3">
                <div className="flex items-start hover:text-primary-100">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <div className="text-sm opacity-90">전화</div>
                    <div className="space-y-1">
                      {COMPANY_CONTACTS.map(({ role, phone }) => (
                        <a key={phone} href={telHref(phone)} className="block font-semibold text-lg hover:underline">
                          {role} {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <a href={`mailto:${COMPANY_EMAIL}`} className="flex items-center hover:text-primary-100">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <div className="text-sm opacity-90">이메일</div>
                    <div className="font-semibold">{COMPANY_EMAIL}</div>
                  </div>
                </a>

                <div className="flex items-center">
                  <span className="text-2xl mr-3">🕐</span>
                  <div>
                    <div className="text-sm opacity-90">운영시간</div>
                    <div className="font-semibold">평일 09:00 - 18:00</div>
                    <div className="text-sm opacity-75">주말 및 공휴일 휴무</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

