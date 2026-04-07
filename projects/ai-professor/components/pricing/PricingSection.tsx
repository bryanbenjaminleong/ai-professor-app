'use client'

import React from 'react'
import { Check, Sparkles } from 'lucide-react'
import { Button, Card } from '@/components/ui'

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            One-time payment. Lifetime access. No subscriptions.
          </p>
        </div>

        <div className="max-w-lg mx-auto">
          <Card className="relative overflow-hidden border-2 border-primary-500 dark:border-primary-400 shadow-xl">
            <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 text-sm font-semibold">
              New Sign-Ups
            </div>
            <div className="p-8">
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">Free</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  First module on us — any module, one-time
                </p>
              </div>

              <ul className="space-y-4 mb-8">
                {[
                  'Any single module (standalone or program)',
                  'Full module access with all lessons',
                  'Lifetime access',
                  'Progress tracking',
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={() => (window.location.href = '/courses')}
                className="w-full"
                size="lg"
              >
                Browse Modules
              </Button>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Programs from $149.99 • Modules from $39.99
              </p>
            </div>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button variant="outline" onClick={() => (window.location.href = '/pricing')}>
            View All Pricing
          </Button>
        </div>
      </div>
    </section>
  )
}
