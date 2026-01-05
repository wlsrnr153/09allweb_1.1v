import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Image
                src="/images/logo_simple.svg"
                alt="09all"
                width={120}
                height={40}
                className="brightness-0 invert"
              />
            </div>
            <p className="text-sm mb-4">
              연구장비 매입, 장비 임대, 유지보수 전문 서비스
            </p>
            <address className="text-sm not-italic space-y-1">
              <p>서울특별시 강남구 테헤란로 123 (역삼동)</p>
              <p>대표전화: 02-1234-5678</p>
              <p>팩스: 02-1234-5679</p>
              <p>사업자등록번호: 123-45-67890</p>
              <p>대표자: 홍길동</p>
            </address>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  회사소개
                </Link>
              </li>
              <li>
                <Link href="/equipment" className="hover:text-white transition-colors">
                  장비안내
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-white transition-colors">
                  매입실적
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white font-semibold mb-4">고객센터</h3>
            <div className="space-y-2 text-sm">
              <p className="text-2xl font-bold text-white">1588-1234</p>
              <p>평일 09:00-18:00</p>
              <p>토·일·공휴일 휴무</p>
              <div className="mt-4">
                <Link
                  href="/contact"
                  className="inline-block px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
                >
                  문의하기
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href="/terms" className="hover:text-white transition-colors">
                이용약관
              </Link>
              <Link
                href="/privacy"
                className="font-semibold text-white hover:text-primary-300 transition-colors"
              >
                개인정보처리방침
              </Link>
              <Link href="/sitemap" className="hover:text-white transition-colors">
                사이트맵
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Image
                src="/images/logo_msit.png"
                alt="과학기술정보통신부"
                width={80}
                height={40}
                className="brightness-0 invert opacity-70"
              />
              <Image
                src="/images/logo_nfec.png"
                alt="국가연구시설장비진흥센터"
                width={80}
                height={40}
                className="brightness-0 invert opacity-70"
              />
            </div>
          </div>
          <p className="text-center mt-4 text-sm text-gray-500">
            Copyright © 2024 09all. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

