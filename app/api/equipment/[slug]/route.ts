import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 공개용 장비 상세 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    // 장비 조회 (카테고리 정보 포함)
    const rawEquipment = await prisma.equipment.findUnique({
      where: {
        slug,
        isPublished: true, // 공개된 장비만
      },
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
    })
    
    if (!rawEquipment) {
      return NextResponse.json(
        { success: false, error: '장비를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }
    
    // 조회수 증가
    await prisma.equipment.update({
      where: { id: rawEquipment.id },
      data: { viewCount: { increment: 1 } }
    })
    
    // JSON 문자열을 객체/배열로 파싱
    const equipment = {
      ...rawEquipment,
      specifications: rawEquipment.specifications ? JSON.parse(rawEquipment.specifications) : null,
      features: JSON.parse(rawEquipment.features),
      images: JSON.parse(rawEquipment.images),
    }
    
    return NextResponse.json({
      success: true,
      data: equipment,
    })
  } catch (error) {
    console.error('장비 조회 오류:', error)
    return NextResponse.json(
      { success: false, error: '장비 정보를 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
