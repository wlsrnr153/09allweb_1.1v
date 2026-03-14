import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 카테고리 목록 조회
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
    })
    
    return NextResponse.json({
      success: true,
      data: categories,
    })
  } catch (error) {
    console.error('카테고리 목록 조회 오류:', error)
    return NextResponse.json(
      { success: false, error: '카테고리 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
