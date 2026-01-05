'use client'

import { useState, useEffect } from 'react'
import { openKakaoChannel } from '@/lib/kakao'

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <>
      {/* Kakao FAB */}
      <button
        onClick={openKakaoChannel}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 bg-[#FEE500] rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110 md:hidden"
        aria-label="카카오톡 상담"
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z"
            fill="#3C1E1E"
          />
        </svg>
      </button>

      {/* Scroll to Top Button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 bg-white border border-gray-300 rounded-full shadow-lg flex items-center justify-center transition-all hover:bg-gray-50 hidden md:flex"
          aria-label="맨 위로"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
        <div className="grid grid-cols-2 gap-0">
          <a
            href="tel:02-1234-5678"
            className="flex items-center justify-center py-4 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            전화문의
          </a>
          <button
            onClick={openKakaoChannel}
            className="flex items-center justify-center py-4 text-sm font-medium text-white bg-[#FEE500] hover:bg-[#FDD835] transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 3C6.48 3 2 6.58 2 11C2 13.5 3.5 15.72 5.83 17.17L4.5 21L8.67 18.83C9.72 19.08 10.84 19.25 12 19.25C17.52 19.25 22 15.67 22 11.25C22 6.83 17.52 3 12 3Z"
                fill="#3C1E1E"
              />
            </svg>
            <span className="text-gray-900 font-semibold">카톡 견적상담</span>
          </button>
        </div>
      </div>
    </>
  )
}

