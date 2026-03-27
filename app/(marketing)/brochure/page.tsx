import BrochureView from '@/components/brochure/BrochureView'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '회사 소개서 | 09all 연구장비 매입',
  description: '09all의 전체 서비스와 회사 정보를 담은 종합 소개서입니다. 인쇄 최적화된 카탈로그를 확인하세요.',
}

export default function BrochurePage() {
  return <BrochureView />
}
