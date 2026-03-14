export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white border-b">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-2">개인정보처리방침</h1>
          <p className="text-gray-600">
            최종 수정일: 2024년 1월 1일
          </p>
        </div>
      </div>

      {/* 개인정보처리방침 내용 */}
      <div className="container py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 md:p-12">
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">1. 개인정보의 처리 목적</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                09all(이하 "회사")은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
              </p>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  <strong>서비스 제공:</strong> 매입 견적 제공, 상담 서비스 제공, 본인 확인 등을 목적으로 개인정보를 처리합니다.
                </li>
                <li>
                  <strong>고객 문의 대응:</strong> 문의사항 접수 및 처리, 답변 제공 등을 목적으로 개인정보를 처리합니다.
                </li>
                <li>
                  <strong>마케팅 및 광고:</strong> 신규 서비스 개발 및 맞춤 서비스 제공, 이벤트 및 광고성 정보 제공 등을 목적으로 개인정보를 처리합니다. (동의 시에만)
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">2. 개인정보의 처리 및 보유기간</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>
                  회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
                </li>
                <li>
                  각각의 개인정보 처리 및 보유 기간은 다음과 같습니다:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-2">
                    <li><strong>서비스 이용 기록:</strong> 3년 (통신비밀보호법)</li>
                    <li><strong>계약 또는 청약철회 등에 관한 기록:</strong> 5년 (전자상거래법)</li>
                    <li><strong>대금결제 및 재화 등의 공급에 관한 기록:</strong> 5년 (전자상거래법)</li>
                    <li><strong>소비자의 불만 또는 분쟁처리에 관한 기록:</strong> 3년 (전자상거래법)</li>
                  </ul>
                </li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">3. 처리하는 개인정보의 항목</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 다음의 개인정보 항목을 처리하고 있습니다:
              </p>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <h3 className="font-semibold mb-2">필수항목:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>이름, 연락처(전화번호, 이메일), 회사명</li>
                  <li>서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">선택항목:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>마케팅 수신 동의 시: 이메일, 전화번호</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">4. 개인정보의 제3자 제공</h2>
              <p className="text-gray-700 leading-relaxed">
                회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">5. 개인정보처리의 위탁</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다:
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-4 font-semibold">수탁업체</th>
                      <th className="text-left py-2 px-4 font-semibold">위탁업무 내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2 px-4">호스팅 업체</td>
                      <td className="py-2 px-4">서버 운영 및 관리</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-4">이메일 발송 업체</td>
                      <td className="py-2 px-4">이메일 발송 서비스</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">6. 정보주체의 권리·의무 및 행사방법</h2>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>정보주체는 회사에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다:
                  <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                    <li>개인정보 처리정지 요구</li>
                    <li>개인정보 열람 요구</li>
                    <li>개인정보 정정·삭제 요구</li>
                    <li>개인정보 처리정지 요구</li>
                  </ul>
                </li>
                <li>제1항에 따른 권리 행사는 회사에 대해 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체 없이 조치하겠습니다.</li>
                <li>정보주체가 개인정보의 오류에 대한 정정을 요구한 경우에는 회사는 정정을 완료하기 전까지 당해 개인정보를 이용하거나 제공하지 않습니다.</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">7. 개인정보의 파기</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold mb-2">파기 방법:</h3>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>전자적 파일 형태: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제</li>
                  <li>기록물, 인쇄물, 서면 등: 분쇄하거나 소각</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">8. 개인정보 보호책임자</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
              </p>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="space-y-2 text-gray-700">
                  <li><strong>개인정보 보호책임자:</strong> 홍길동</li>
                  <li><strong>연락처:</strong> 02-1234-5678, info@09all.com</li>
                  <li><strong>주소:</strong> 서울특별시 강남구 테헤란로 123, 456호</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">9. 개인정보의 안전성 확보조치</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-700">
                <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
                <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
                <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">10. 개인정보처리방침 변경</h2>
              <p className="text-gray-700 leading-relaxed">
                이 개인정보처리방침은 2024년 1월 1일부터 적용되며, 법령 및 방침에 따른 변경내용의 추가, 삭제 및 정정이 있는 경우에는 변경사항의 시행 7일 전부터 공지사항을 통하여 고지할 것입니다.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
