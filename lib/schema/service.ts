import { Service, WithContext } from 'schema-dts'

interface ServiceSchemaParams {
  name: string
  serviceType: string
  description: string
  url: string
  provider?: string
}

export function getServiceSchema(params: ServiceSchemaParams): WithContext<Service> {
  const { name, serviceType, description, url, provider = '09all' } = params

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: 'https://09all.com',
    },
    areaServed: {
      '@type': 'Country',
      name: 'South Korea',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: url,
    },
  }
}
