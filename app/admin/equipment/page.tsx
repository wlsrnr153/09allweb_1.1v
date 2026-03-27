import { requireAdmin } from '@/lib/auth'
import EquipmentManagement from '@/components/admin/EquipmentManagement'

export default async function AdminEquipmentPage() {
  // 관리자 권한 확인 (권한 없으면 로그인 페이지로 리다이렉트)
  await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50">
      <EquipmentManagement />
    </div>
  )
}
