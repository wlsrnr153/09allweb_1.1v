'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    label: '회사소개',
    href: '/about',
    subItems: [
      { label: '회사개요', href: '/about' },
      { label: '오시는길', href: '/location' },
    ],
  },
  {
    label: '장비안내',
    href: '/equipment',
  },
  {
    label: '매입실적',
    href: '/portfolio',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: '문의하기',
    href: '/contact',
  },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white shadow-md'
      }`}
    >
      {/* 상단 유틸리티 바 */}
      <div className="bg-primary-700 text-white">
        <div className="container">
          <div className="flex items-center justify-between h-10 text-sm">
            <div className="flex items-center gap-4">
              <a href="tel:02-1234-5678" className="flex items-center gap-1 hover:text-primary-100">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                02-1234-5678
              </a>
              <span className="text-white/50">|</span>
              <span className="text-white/80">평일 09:00-18:00</span>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Link href="/contact" className="hover:text-primary-100">
                문의하기
              </Link>
              <span className="text-white/50">|</span>
              <Link href="/about" className="hover:text-primary-100">
                회사소개
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 네비게이션 */}
      <div className="bg-white">
        <div className="container">
          <div className="flex items-center justify-between h-20">
            {/* 로고 */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="text-3xl font-bold">
                <span className="text-primary-600">09</span>
                <span className="text-gray-900">all</span>
              </div>
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden lg:flex items-center space-x-1">
              {menuItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`px-6 py-8 text-base font-semibold transition-colors inline-block ${
                      pathname === item.href || pathname.startsWith(item.href + '/')
                        ? 'text-primary-600'
                        : 'text-gray-700 hover:text-primary-600'
                    }`}
                  >
                    {item.label}
                  </Link>

                  {/* 드롭다운 메뉴 */}
                  {item.subItems && (
                    <div
                      className={`absolute left-0 top-full min-w-[200px] bg-white rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                        activeDropdown === item.label
                          ? 'opacity-100 visible translate-y-0'
                          : 'opacity-0 invisible -translate-y-2'
                      }`}
                    >
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-6 py-3 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA 버튼 */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/equipment"
                className="px-6 py-3 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                장비 검색
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
              >
                무료 견적 상담
              </Link>
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-primary-600"
              aria-label="메뉴"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <nav className="container py-4 max-h-[calc(100vh-180px)] overflow-y-auto">
            {menuItems.map((item) => (
              <div key={item.label} className="border-b border-gray-100 last:border-0">
                <Link
                  href={item.href}
                  className="flex items-center justify-between py-4 text-gray-700 font-semibold hover:text-primary-600"
                  onClick={() => !item.subItems && setMobileMenuOpen(false)}
                >
                  {item.label}
                  {item.subItems && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>
                {item.subItems && (
                  <div className="pl-4 pb-2 space-y-2">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="block py-2 text-sm text-gray-600 hover:text-primary-600"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 space-y-2">
              <Link
                href="/contact"
                className="block w-full py-3 bg-primary-600 text-white text-center font-semibold rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                무료 견적 상담
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
