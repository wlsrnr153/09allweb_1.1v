import { Product, WithContext } from 'schema-dts'

interface ProductSchemaParams {
  name: string
  description: string
  image: string
  brand: string
  model: string
  condition?: 'NewCondition' | 'RefurbishedCondition' | 'UsedCondition'
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder'
  url: string
}

export function getProductSchema(params: ProductSchemaParams): WithContext<Product> {
  const {
    name,
    description,
    image,
    brand,
    model,
    condition = 'UsedCondition',
    availability = 'InStock',
    url,
  } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image,
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    model,
    itemCondition: `https://schema.org/${condition}`,
    offers: {
      '@type': 'Offer',
      availability: `https://schema.org/${availability}`,
      price: '문의',
      priceCurrency: 'KRW',
      url,
    },
  }
}
