import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container py-20 text-center">
      <div className="text-6xl mb-4">😕</div>
      <h1 className="text-2xl font-bold mb-4">장비를 찾을 수 없습니다</h1>
      <p className="text-gray-600 mb-6">
        요청하신 장비가 존재하지 않거나 삭제되었습니다.
      </p>
      <Link href="/equipment" className="btn btn-primary">
        장비 목록으로 돌아가기
      </Link>
    </div>
  )
}
