import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

/**
 * 서버 컴포넌트에서 세션 가져오기
 */
export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * 관리자 권한 확인
 */
export async function requireAdmin() {
  const session = await getSession()
  
  if (!session || session.user.role !== 'admin') {
    redirect('/admin/login')
  }
  
  return session
}

/**
 * API 라우트에서 관리자 권한 확인
 */
export async function checkAdminAuth() {
  const session = await getSession()
  
  if (!session || session.user.role !== 'admin') {
    return {
      authorized: false,
      error: '관리자 권한이 필요합니다.'
    }
  }
  
  return {
    authorized: true,
    session
  }
}
