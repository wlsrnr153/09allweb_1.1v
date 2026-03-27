'use client'

import { useState, useEffect } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Equipment } from '@/types'
import EquipmentForm from './EquipmentForm'
import EquipmentList from './EquipmentList'

export default function EquipmentManagement() {
  const { data: session } = useSession()
  const [equipment, setEquipment] = useState<Equipment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingEquipment, setEditingEquipment] = useState<Equipment | null>(null)

  // 장비 목록 불러오기
  const fetchEquipment = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/admin/equipment')
      const data = await response.json()
      
      if (data.success) {
        setEquipment(data.data)
      }
    } catch (error) {
      console.error('장비 목록 불러오기 실패:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchEquipment()
  }, [])

  // 장비 추가
  const handleAdd = () => {
    setEditingEquipment(null)
    setShowForm(true)
  }

  // 장비 수정
  const handleEdit = (eq: Equipment) => {
    setEditingEquipment(eq)
    setShowForm(true)
  }

  // 장비 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('정말 이 장비를 삭제하시겠습니까?')) {
      return
    }

    try {
      const response = await fetch(`/api/admin/equipment/${id}`, {
        method: 'DELETE',
      })
      
      const data = await response.json()
      
      if (data.success) {
        alert('장비가 삭제되었습니다.')
        fetchEquipment()
      } else {
        alert(data.error || '삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('장비 삭제 실패:', error)
      alert('삭제 중 오류가 발생했습니다.')
    }
  }

  // 폼 제출 완료
  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingEquipment(null)
    fetchEquipment()
  }

  return (
    <div>
      {/* 헤더 */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="container py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">장비 관리</h1>
              <p className="text-sm text-gray-600 mt-1">
                {session?.user?.name}님 환영합니다
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="btn btn-primary flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                장비 추가
              </button>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="px-4 py-2 text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="container py-8">
        {showForm ? (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">
                {editingEquipment ? '장비 수정' : '새 장비 추가'}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false)
                  setEditingEquipment(null)
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <EquipmentForm
              equipment={editingEquipment}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false)
                setEditingEquipment(null)
              }}
            />
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  전체 장비 <span className="text-primary-600">({equipment.length})</span>
                </h2>
              </div>
            </div>
            
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                <p className="mt-4 text-gray-600">로딩 중...</p>
              </div>
            ) : (
              <EquipmentList
                equipment={equipment}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
