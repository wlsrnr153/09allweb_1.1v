import { PrismaClient } from '@prisma/client'
import { sampleEquipment, sampleCategories } from '../lib/data/sample-equipment'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 시드 데이터 생성 시작...')

  // 기존 데이터 삭제
  await prisma.equipment.deleteMany()
  await prisma.category.deleteMany()
  
  console.log('✅ 기존 데이터 삭제 완료')

  // 카테고리 생성
  const categories = await Promise.all(
    sampleCategories.map((cat) =>
      prisma.category.create({
        data: {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          icon: cat.icon,
          order: parseInt(cat.id),
        },
      })
    )
  )

  console.log(`✅ ${categories.length}개 카테고리 생성 완료`)

  // 장비 데이터 생성 (JSON 필드를 문자열로 변환)
  const equipment = await Promise.all(
    sampleEquipment.map((eq) =>
      prisma.equipment.create({
        data: {
          id: eq.id,
          title: eq.title,
          slug: eq.slug,
          brand: eq.brand,
          model: eq.model,
          categoryId: eq.categoryId,
          price: typeof eq.price === 'number' ? String(eq.price) : eq.price,
          priceUnit: eq.priceUnit,
          condition: eq.condition,
          status: eq.status,
          year: eq.year,
          warranty: eq.warranty || null,
          stock: eq.stock,
          description: eq.description,
          specifications: eq.specifications ? JSON.stringify(eq.specifications) : null,
          features: JSON.stringify(eq.features),
          thumbnail: eq.thumbnail,
          images: JSON.stringify(eq.images),
          viewCount: eq.viewCount,
          isPublished: eq.isPublished,
          metaTitle: (eq as any).metaTitle ?? null,
          metaDescription: (eq as any).metaDescription ?? null,
          createdAt: eq.createdAt,
          updatedAt: eq.updatedAt,
        },
      })
    )
  )

  console.log(`✅ ${equipment.length}개 장비 생성 완료`)
  console.log('🎉 시드 데이터 생성 완료!')
}

main()
  .catch((e) => {
    console.error('❌ 시드 에러:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
