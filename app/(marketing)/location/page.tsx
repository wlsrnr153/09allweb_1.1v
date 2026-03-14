export default function LocationPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">오시는 길</h1>
          <p className="text-gray-600">
            09all 본사 및 전시장 위치 안내
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
                  <div className="font-semibold mb-1">본사 및 전시장</div>
                  <div>서울특별시 강남구 테헤란로 123, 456호</div>
                  <div className="text-sm text-gray-500">(06234)</div>
                </div>
              </div>
            </div>

            {/* 대중교통 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-xl mb-4 flex items-center">
                <span className="text-2xl mr-2">🚇</span>
                대중교통
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="font-semibold mb-2 flex items-center">
                    <span className="inline-block w-6 h-6 bg-blue-600 text-white text-xs font-bold rounded flex items-center justify-center mr-2">
                      2
                    </span>
                    지하철 2호선
                  </div>
                  <div className="text-sm text-gray-700 ml-8">
                    강남역 3번 출구에서 도보 5분
                  </div>
                </div>

                <div>
                  <div className="font-semibold mb-2 flex items-center">
                    <span className="inline-block w-6 h-6 bg-orange-500 text-white text-xs font-bold rounded flex items-center justify-center mr-2">
                      신
                    </span>
                    신분당선
                  </div>
                  <div className="text-sm text-gray-700 ml-8">
                    강남역 6번 출구에서 도보 7분
                  </div>
                </div>

                <div>
                  <div className="font-semibold mb-2">🚌 버스</div>
                  <div className="text-sm text-gray-700">
                    <div className="mb-1">
                      <span className="font-medium">간선:</span> 146, 740, 8001
                    </div>
                    <div>
                      <span className="font-medium">지선:</span> 3412, 4412
                    </div>
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
                  <div className="bg-gray-50 p-3 rounded">
                    서울특별시 강남구 테헤란로 123
                  </div>
                </div>

                <div>
                  <div className="font-semibold mb-1">주차 안내</div>
                  <div>
                    • 건물 지하 1~3층 주차 가능<br />
                    • 방문객 2시간 무료 주차<br />
                    • 주차권은 프런트에서 수령
                  </div>
                </div>
              </div>
            </div>

            {/* 연락처 */}
            <div className="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-lg shadow-md p-6">
              <h2 className="font-bold text-xl mb-4">문의하기</h2>
              <div className="space-y-3">
                <a href="tel:02-1234-5678" className="flex items-center hover:text-primary-100">
                  <span className="text-2xl mr-3">📞</span>
                  <div>
                    <div className="text-sm opacity-90">전화</div>
                    <div className="font-semibold text-lg">02-1234-5678</div>
                  </div>
                </a>

                <a href="mailto:info@09all.com" className="flex items-center hover:text-primary-100">
                  <span className="text-2xl mr-3">📧</span>
                  <div>
                    <div className="text-sm opacity-90">이메일</div>
                    <div className="font-semibold">info@09all.com</div>
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

