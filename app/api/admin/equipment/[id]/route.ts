import { NextRequest, NextResponse } from 'next/server'
import { checkAdminAuth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// 특정 장비 조회
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAdminAuth()
  
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: 401 }
    )
  }

  try {
    const { id } = await params
    const rawEquipment = await prisma.equipment.findUnique({
      where: { id },
      include: {
        category: {
          select: {
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

    // JSON 문자열을 객체/배열로 파싱
    const equipment = {
      ...rawEquipment,
      specifications: rawEquipment.specifications ? JSON.parse(rawEquipment.specifications) : null,
      features: JSON.parse(rawEquipment.features),
      images: JSON.parse(rawEquipment.images),
    }

    return NextResponse.json({
      success: true,
      data: equipment
    })
  } catch (error) {
    console.error('장비 조회 오류:', error)
    return NextResponse.json(
      { success: false, error: '장비 조회에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 장비 수정
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAdminAuth()
  
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: 401 }
    )
  }

  try {
    const { id } = await params
    const body = await request.json()
    
    // 기존 장비 확인
    const existingEquipment = await prisma.equipment.findUnique({
      where: { id },
    })
    
    if (!existingEquipment) {
      return NextResponse.json(
        { success: false, error: '장비를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // DB에서 업데이트 (JSON 필드를 문자열로 변환)
    const rawUpdatedEquipment = await prisma.equipment.update({
      where: { id },
      data: {
        title: body.title,
        brand: body.brand,
        model: body.model,
        categoryId: body.categoryId,
        price: String(body.price),
        priceUnit: body.priceUnit,
        condition: body.condition,
        status: body.status,
        year: body.year,
        warranty: body.warranty || null,
        stock: body.stock,
        description: body.description,
        specifications: body.specifications ? JSON.stringify(body.specifications) : null,
        features: JSON.stringify(body.features || []),
        thumbnail: body.thumbnail,
        images: JSON.stringify(body.images || []),
        isPublished: body.isPublished,
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
    const updatedEquipment = {
      ...rawUpdatedEquipment,
      specifications: rawUpdatedEquipment.specifications ? JSON.parse(rawUpdatedEquipment.specifications) : null,
      features: JSON.parse(rawUpdatedEquipment.features),
      images: JSON.parse(rawUpdatedEquipment.images),
    }

    return NextResponse.json({
      success: true,
      data: updatedEquipment,
      message: '장비가 성공적으로 수정되었습니다.'
    })
  } catch (error) {
    console.error('장비 수정 오류:', error)
    return NextResponse.json(
      { success: false, error: '장비 수정에 실패했습니다.' },
      { status: 500 }
    )
  }
}

// 장비 삭제
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAdminAuth()
  
  if (!auth.authorized) {
    return NextResponse.json(
      { success: false, error: auth.error },
      { status: 401 }
    )
  }

  try {
    const { id } = await params
    // 기존 장비 확인
    const existingEquipment = await prisma.equipment.findUnique({
      where: { id },
    })
    
    if (!existingEquipment) {
      return NextResponse.json(
        { success: false, error: '장비를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // DB에서 삭제
    await prisma.equipment.delete({
      where: { id }
    })

    return NextResponse.json({
      success: true,
      message: '장비가 성공적으로 삭제되었습니다.'
    })
  } catch (error) {
    console.error('장비 삭제 오류:', error)
    return NextResponse.json(
      { success: false, error: '장비 삭제에 실패했습니다.' },
      { status: 500 }
    )
  }
}
