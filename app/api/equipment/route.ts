import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// 공개용 장비 목록 조회 (발행된 장비만)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // 쿼리 파라미터 추출
    const category = searchParams.get('category') // 카테고리 slug
    const brand = searchParams.get('brand')
    const condition = searchParams.get('condition')
    const keyword = searchParams.get('keyword')
    const limit = parseInt(searchParams.get('limit') || '100')
    const page = parseInt(searchParams.get('page') || '1')
    
    // 필터 조건 구성
    const where: any = {
      isPublished: true, // 공개된 장비만
    }
    
    if (category) {
      // 카테고리 slug로 조회
      const categoryData = await prisma.category.findUnique({
        where: { slug: category },
        select: { id: true }
      })
      if (categoryData) {
        where.categoryId = categoryData.id
      }
    }
    
    if (brand) {
      where.brand = brand
    }
    
    if (condition) {
      where.condition = condition
    }
    
    if (keyword) {
      where.OR = [
        { title: { contains: keyword } },
        { brand: { contains: keyword } },
        { model: { contains: keyword } },
        { description: { contains: keyword } },
      ]
    }
    
    // 전체 개수 조회
    const total = await prisma.equipment.count({ where })
    
    // 장비 목록 조회 (카테고리 정보 포함)
    const rawEquipment = await prisma.equipment.findMany({
      where,
      include: {
        category: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: (page - 1) * limit,
    })
    
    // JSON 문자열을 객체/배열로 파싱
    const equipment = rawEquipment.map((eq) => ({
      ...eq,
      specifications: eq.specifications ? JSON.parse(eq.specifications) : null,
      features: JSON.parse(eq.features),
      images: JSON.parse(eq.images),
    }))
    
    return NextResponse.json({
      success: true,
      data: equipment,
      pagination: {
        page,
        limit,
        total,
        hasMore: page * limit < total,
      }
    })
  } catch (error) {
    console.error('장비 목록 조회 오류:', error)
    return NextResponse.json(
      { success: false, error: '장비 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}
