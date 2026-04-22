import { Organization, WithContext } from 'schema-dts'

export function getOrganizationSchema(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '09all',
    description: '연구장비 매입 및 폐기처리 전문 플랫폼',
    url: 'https://09all.com',
    logo: 'https://09all.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+82-2-123-4567',
      contactType: 'Customer Service',
      availableLanguage: 'Korean',
      areaServed: 'KR',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KR',
      addressLocality: '서울',
    },
    foundingDate: '2004',
    sameAs: [
      // SNS URLs can be added here
    ],
  }
}
