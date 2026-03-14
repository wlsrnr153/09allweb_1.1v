import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// 장비 목록 조회 (관리자용 - 비공개 포함)
export async function GET(request: NextRequest) {
  const auth = await checkAdminAuth()
  
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: 401 }
    )
  }

  try {
    // DB에서 조회 (카테고리 정보 포함)
    const rawEquipment = await prisma.equipment.findMany({
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
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
      total: equipment.length
    })
  } catch (error) {
    console.error('장비 목록 조회 오류:', error)
    return NextResponse.json(
      { success: false, error: '장비 목록을 불러오는데 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 장비 추가
export async function POST(request: NextRequest) {
  const auth = await checkAdminAuth()
  
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: 401 }
    )
  }

  try {
    const body = await request.json()
    
    // 필수 필드 검증
    const requiredFields = ['title', 'brand', 'model', 'categoryId', 'price', 'condition', 'description']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `${field} 필드는 필수입니다.` },
          { status: 400 }
        )
      }
    }

    // slug 생성 (한글 + 영문 + 숫자 + 타임스탬프)
    const timestamp = Date.now()
    const baseSlug = body.title
      .toLowerCase()
      .replace(/\s+/g, '-')      // 공백을 하이픈으로
      .replace(/[^\w\u3131-\uD79D가-힣-]/g, '') // 한글, 영문, 숫자만 허용
      .replace(/-+/g, '-')       // 연속된 하이픈 제거
      .replace(/^-+|-+$/g, '')   // 시작/끝 하이픈 제거
      .substring(0, 50)          // 최대 50자
    
    // 빈 slug 방지: 타임스탬프를 포함하여 유니크하게
    const slug = baseSlug ? `${baseSlug}-${timestamp}` : `equipment-${timestamp}`
    
    // DB에 저장 (JSON 필드를 문자열로 변환)
    const rawEquipment = await prisma.equipment.create({
      data: {
        slug,
        title: body.title,
        brand: body.brand,
        model: body.model,
        categoryId: body.categoryId,
        price: String(body.price),
        priceUnit: body.priceUnit || 'KRW',
        condition: body.condition,
        status: body.status || 'available',
        year: body.year || new Date().getFullYear(),
        warranty: body.warranty || null,
        stock: body.stock || 1,
        description: body.description,
        specifications: body.specifications ? JSON.stringify(body.specifications) : null,
        features: JSON.stringify(body.features || []),
        thumbnail: body.thumbnail || '/images/equipment/placeholder.jpg',
        images: JSON.stringify(body.images || []),
        viewCount: 0,
        isPublished: body.isPublished ?? true,
        metaTitle: body.metaTitle || null,
        metaDescription: body.metaDescription || null,
      },
      include: {
        category: {
          select: {
            name: true,
            slug: true,
          },
        },
      },
    })
    
    // JSON 문자열을 객체/배열로 파싱하여 반환
    const newEquipment = {
      ...rawEquipment,
      specifications: rawEquipment.specifications ? JSON.parse(rawEquipment.specifications) : null,
      features: JSON.parse(rawEquipment.features),
      images: JSON.parse(rawEquipment.images),
    }

    return NextResponse.json({
      success: true,
      data: newEquipment,
      message: '장비가 성공적으로 추가되었습니다.'
    }, { status: 201 })
  } catch (error) {
    console.error('장비 추가 오류:', error)
    return NextResponse.json(
      { success: false, error: '장비 추가에 실패했습니다.' },
      { status: 500 }
    )
  }
}
