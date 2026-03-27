'use server'

import { prisma } from '@/lib/prisma'
import { Equipment, Category } from '@/types'
import { sampleEquipment, sampleCategories, sampleBrands } from '@/lib/data/sample-equipment'

// 환경 변수 체크
const isDatabaseAvailable = !!process.env.DATABASE_URL

// 공개된 장비 목록 조회 (서버 액션)
export async function getPublishedEquipment(filters?: {
  categorySlug?: string
  brand?: string
  condition?: string
  keyword?: string
}) {
  // DB가 없으면 샘플 데이터 사용
  if (!isDatabaseAvailable) {
    console.log('📦 Using sample equipment data (DATABASE_URL not configured)')
    return sampleEquipment as Equipment[]
  }

  try {
    const where: any = {
      isPublished: true,
    }
    
    // 카테고리 필터
    if (filters?.categorySlug) {
      const category = await prisma.category.findUnique({
        where: { slug: filters.categorySlug },
        select: { id: true }
      })
      if (category) {
        where.categoryId = category.id
      }
    }
    
    // 제조사 필터
    if (filters?.brand) {
      where.brand = filters.brand
    }
    
    // 상태 필터
    if (filters?.condition) {
      where.condition = filters.condition
    }
    
    // 키워드 검색
    if (filters?.keyword) {
      where.OR = [
        { title: { contains: filters.keyword } },
        { brand: { contains: filters.keyword } },
        { model: { contains: filters.keyword } },
        { description: { contains: filters.keyword } },
      ]
    }
    
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
    })
    
    // JSON 문자열 파싱
    const equipment = rawEquipment.map((eq) => ({
      ...eq,
      specifications: eq.specifications ? JSON.parse(eq.specifications) : null,
      features: JSON.parse(eq.features),
      images: JSON.parse(eq.images),
    })) as Equipment[]
    
    return equipment
  } catch (error) {
    console.error('장비 목록 조회 오류:', error)
    console.log('📦 Fallback to sample equipment data')
    return sampleEquipment as Equipment[]
  }
}

// 장비 상세 조회 (서버 액션)
export async function getEquipmentBySlug(slug: string) {
  // DB가 없으면 샘플 데이터에서 찾기
  if (!isDatabaseAvailable) {
    const equipment = sampleEquipment.find(eq => eq.slug === slug)
    return equipment || null
  }

  try {
    const rawEquipment = await prisma.equipment.findUnique({
      where: {
        slug,
        isPublished: true,
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
      return null
    }
    
    // 조회수 증가 (비동기로 처리, 에러 무시)
    prisma.equipment.update({
      where: { id: rawEquipment.id },
      data: { viewCount: { increment: 1 } }
    }).catch(() => {})
    
    // JSON 문자열 파싱
    const equipment = {
      ...rawEquipment,
      specifications: rawEquipment.specifications ? JSON.parse(rawEquipment.specifications) : null,
      features: JSON.parse(rawEquipment.features),
      images: JSON.parse(rawEquipment.images),
    } as Equipment
    
    return equipment
  } catch (error) {
    console.error('장비 조회 오류:', error)
    const fallback = sampleEquipment.find(eq => eq.slug === slug)
    return fallback || null
  }
}

// 관련 장비 조회 (같은 카테고리)
export async function getRelatedEquipment(categoryId: string, currentEquipmentId: string, limit = 3) {
  // DB가 없으면 샘플 데이터에서 찾기
  if (!isDatabaseAvailable) {
    const related = sampleEquipment
      .filter(eq => eq.categoryId === categoryId && eq.id !== currentEquipmentId)
      .slice(0, limit)
    return related as Equipment[]
  }

  try {
    const rawEquipment = await prisma.equipment.findMany({
      where: {
        categoryId,
        isPublished: true,
        id: { not: currentEquipmentId },
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
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
    })
    
    // JSON 문자열 파싱
    const equipment = rawEquipment.map((eq) => ({
      ...eq,
      specifications: eq.specifications ? JSON.parse(eq.specifications) : null,
      features: JSON.parse(eq.features),
      images: JSON.parse(eq.images),
    })) as Equipment[]
    
    return equipment
  } catch (error) {
    console.error('관련 장비 조회 오류:', error)
    return []
  }
}

// 카테고리 목록 조회
export async function getCategories() {
  // DB가 없으면 샘플 데이터 사용
  if (!isDatabaseAvailable) {
    return sampleCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: undefined,
      icon: cat.icon,
      order: parseInt(cat.id),
      equipmentCount: cat.count,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as Category[]
  }

  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        order: 'asc',
      },
    })
    
    return categories as Category[]
  } catch (error) {
    console.error('카테고리 목록 조회 오류:', error)
    return sampleCategories.map(cat => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: undefined,
      icon: cat.icon,
      order: parseInt(cat.id),
      equipmentCount: cat.count,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as Category[]
  }
}

// 제조사 목록 조회 (발행된 장비에서 추출)
export async function getBrands() {
  // DB가 없으면 샘플 데이터 사용
  if (!isDatabaseAvailable) {
    return sampleBrands
  }

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
    
    return equipment.map(eq => eq.brand)
  } catch (error) {
    console.error('제조사 목록 조회 오류:', error)
    return sampleBrands
  }
}
