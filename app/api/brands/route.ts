import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 제조사 목록 조회 (발행된 장비에서 추출)
export async function GET() {
  try {
    const equipment = await prisma.equipment.findMany({
      where: {
        isPublished: true,
      },
      select: {
        brand: true,
      },
      distinct: ['brand'],
      orderBy: {
        brand: 'asc',
      },
    })
    
    const brands = equipment.map(eq => eq.brand)
    
    return NextResponse.json({
      success: true,
      data: brands,
    })
  } catch (error) {
    console.error('제조사 목록 조회 오류:', error)
    return NextResponse.json(
      { success: false, error: '제조사 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
