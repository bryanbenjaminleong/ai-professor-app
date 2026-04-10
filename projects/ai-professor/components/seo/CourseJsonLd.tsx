'use client'

import Script from 'next/script'

interface CourseJsonLdProps {
  name: string
  description: string
  provider: {
    name: string
    url?: string
  }
  url: string
  imageUrl?: string
  duration?: string // ISO 8601 duration, e.g., "P8W" for 8 weeks
  educationalLevel?: string
  isAccessibleForFree?: boolean
  price?: number
  currency?: string
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
}

export function CourseJsonLd({
  name,
  description,
  provider,
  url,
  imageUrl,
  duration,
  educationalLevel = 'Beginner',
  isAccessibleForFree = false,
  price = 39.99,
  currency = 'USD',
  aggregateRating,
}: CourseJsonLdProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider.name,
      ...(provider.url && { url: provider.url }),
    },
    url,
    ...(imageUrl && { image: imageUrl }),
    ...(duration && { timeRequired: duration }),
    educationalLevel,
    isAccessibleForFree,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
    ...(aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: aggregateRating.ratingValue,
        reviewCount: aggregateRating.reviewCount,
      },
    }),
  }

  return (
    <Script
      id="course-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface LessonJsonLdProps {
  name: string
  description: string
  courseName: string
  courseUrl: string
  url: string
  position?: number
}

export function LessonJsonLd({
  name,
  description,
  courseName,
  courseUrl,
  url,
  position,
}: LessonJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: name,
    description,
    isPartOf: {
      '@type': 'Course',
      name: courseName,
      url: courseUrl,
    },
    url,
    ...(position && { position }),
  }

  return (
    <Script
      id="lesson-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
