import { prisma } from '@/lib/prisma'

const BASE_URL = 'https://09all.com'

type SitemapEntry = {
  loc: string
  lastmod?: string
  changefreq?: 'daily' | 'weekly' | 'monthly' | 'yearly'
  priority?: number
}

const staticEntries: SitemapEntry[] = [
  { loc: `${BASE_URL}/`, changefreq: 'daily', priority: 1.0 },
  { loc: `${BASE_URL}/services`, changefreq: 'weekly', priority: 0.9 },
  { loc: `${BASE_URL}/disposal`, changefreq: 'weekly', priority: 0.9 },
  { loc: `${BASE_URL}/equipment`, changefreq: 'weekly', priority: 0.8 },
  { loc: `${BASE_URL}/portfolio`, changefreq: 'weekly', priority: 0.8 },
  { loc: `${BASE_URL}/about`, changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/process`, changefreq: 'monthly', priority: 0.7 },
  { loc: `${BASE_URL}/contact`, changefreq: 'monthly', priority: 0.8 },
  { loc: `${BASE_URL}/faq`, changefreq: 'weekly', priority: 0.6 },
  { loc: `${BASE_URL}/brands`, changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/catalog`, changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/location`, changefreq: 'monthly', priority: 0.5 },
  { loc: `${BASE_URL}/guide`, changefreq: 'monthly', priority: 0.5 },
  { loc: `${BASE_URL}/shipping`, changefreq: 'monthly', priority: 0.5 },
  { loc: `${BASE_URL}/solutions`, changefreq: 'monthly', priority: 0.6 },
  { loc: `${BASE_URL}/brochure`, changefreq: 'monthly', priority: 0.5 },
  { loc: `${BASE_URL}/terms`, changefreq: 'yearly', priority: 0.3 },
  { loc: `${BASE_URL}/privacy`, changefreq: 'yearly', priority: 0.3 },
]

const xmlEscape = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

const toUrlNode = (entry: SitemapEntry) => {
  const parts = [
    `<loc>${xmlEscape(entry.loc)}</loc>`,
    entry.lastmod ? `<lastmod>${entry.lastmod}</lastmod>` : '',
    entry.changefreq ? `<changefreq>${entry.changefreq}</changefreq>` : '',
    typeof entry.priority === 'number' ? `<priority>${entry.priority.toFixed(1)}</priority>` : '',
  ].filter(Boolean)

  return `<url>${parts.join('')}</url>`
}

export async function GET() {
  const now = new Date().toISOString()
  const entries: SitemapEntry[] = staticEntries.map((entry) => ({
    ...entry,
    lastmod: now,
  }))

  try {
    const equipments = await prisma.equipment.findMany({
      where: { isPublished: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: 'desc' },
    })

    for (const equipment of equipments) {
      entries.push({
        loc: `${BASE_URL}/equipment/${equipment.slug}`,
        lastmod: equipment.updatedAt.toISOString(),
        changefreq: 'weekly',
        priority: 0.7,
      })
    }
  } catch {
    // DB가 없는 환경에서는 정적 경로만 사이트맵에 포함합니다.
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    `${entries.map(toUrlNode).join('')}` +
    `</urlset>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
