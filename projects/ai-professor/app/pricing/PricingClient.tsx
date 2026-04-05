'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

const pricingTiers = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'forever',
    description: 'Get started with quick guides and curated news',
    features: [
      '24 Quick Guides',
      'CXO News (19 sources)',
      'Browse module previews',
      'Newsletter',
    ],
    cta: 'Get Started Free',
    ctaLink: '/guides',
  },
  {
    id: 'single-course',
    name: 'Single Module',
    price: 19.99,
    interval: 'one-time',
    description: 'Buy individual modules. Lifetime access.',
    features: [
      'Full module access',
      'All lessons included',
      'Lifetime access',
      'Progress tracking',
    ],
    recommended: true,
    cta: 'Buy Now',
    ctaLink: '/courses',
  },
  {
    id: 'program',
    name: 'Program Bundle',
    price: 49.99,
    interval: 'one-time',
    description: 'Multi-module programs. Save vs buying individually.',
    features: [
      'All modules in the program',
      'Structured program',
      'Lifetime access',
      'Progress tracking',
    ],
    cta: 'Browse Programs',
    ctaLink: '/paths',
  },
];

const faqs = [
  {
    question: 'Do modules expire?',
    answer: 'No. Every purchase comes with lifetime access. Learn at your own pace.',
  },
  {
    question: 'Is there a free trial?',
    answer: 'Our Quick Guides and CXO News are completely free. For full modules, try the free lesson available during our soft launch.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards via Stripe. More payment options coming soon.',
  },
  {
    question: 'Can I get a refund?',
    answer: 'If you\'re not satisfied within 7 days of purchase, contact us for a full refund.',
  },
];

export default function PricingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-white dark:bg-gray-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            One-time payment. Lifetime access. No subscriptions.
          </p>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: pricingTiers.indexOf(tier) * 0.1 }}
            >
              <Card className={cn(
                'relative p-8 h-full flex flex-col',
                tier.recommended && 'ring-2 ring-primary-600 shadow-lg scale-105'
              )}>
                {tier.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                      POPULAR
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{tier.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{tier.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900 dark:text-white">
                    ${tier.price}
                  </span>
                  {tier.interval === 'one-time' && (
                    <span className="text-gray-500 ml-1">/ one-time</span>
                  )}
                  {tier.interval === 'forever' && (
                    <span className="text-gray-500 ml-1">/ forever</span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={tier.ctaLink}>
                  <Button className={cn(
                    'w-full',
                    tier.recommended
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                  )}>
                    {tier.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg border">
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{faq.question}</span>
                <ChevronDown className={cn(
                  'w-5 h-5 text-gray-500 transition-transform',
                  openFaq === idx && 'rotate-180'
                )} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
