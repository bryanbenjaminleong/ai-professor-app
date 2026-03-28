'use client'

import Script from 'next/script'

interface HowToJsonLdProps {
  name: string
  description: string
  url: string
  steps: {
    name: string
    text: string
    imageUrl?: string
  }[]
  totalTime?: string // ISO 8601 duration, e.g., "PT30M" for 30 minutes
  estimatedCost?: {
    currency: string
    value: string
  }
  supply?: string[]
  tool?: string[]
}

export function HowToJsonLd({
  name,
  description,
  url,
  steps,
  totalTime,
  estimatedCost,
  supply,
  tool,
}: HowToJsonLdProps) {
  const schema: any = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.imageUrl && {
        image: {
          '@type': 'ImageObject',
          url: step.imageUrl,
        },
      }),
    })),
    ...(totalTime && { totalTime }),
    ...(estimatedCost && {
      estimatedCost: {
        '@type': 'MonetaryAmount',
        currency: estimatedCost.currency,
        value: estimatedCost.value,
      },
    }),
    ...(supply && {
      supply: supply.map(item => ({
        '@type': 'HowToSupply',
        name: item,
      })),
    }),
    ...(tool && {
      tool: tool.map(item => ({
        '@type': 'HowToTool',
        name: item,
      })),
    }),
  }

  return (
    <Script
      id="howto-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQJsonLdProps {
  questions: {
    question: string
    answer: string
  }[]
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <Script
      id="faq-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
