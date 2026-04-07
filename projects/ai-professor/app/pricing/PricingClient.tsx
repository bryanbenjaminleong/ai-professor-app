'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ChevronDown, Sparkles, Crown, Clock, Zap } from 'lucide-react';
import { Button, Card } from '@/components/ui';
import { cn } from '@/lib/utils';

const tier1Products = [
  {
    id: 'free_module',
    name: 'Free First Module',
    price: 'Free',
    description: 'Your first module on us — any module, one-time for new sign-ups.',
    features: [
      'Any single module (standalone or part of a program)',
      'Full module access with all lessons',
      'Lifetime access',
      'Progress tracking',
    ],
    cta: 'Claim Free Module',
    ctaLink: '/courses',
    badge: 'New Sign-Ups',
    highlighted: false,
  },
  {
    id: 'single_module',
    name: 'Single Module',
    price: '$39.99',
    description: 'Buy any individual module. Lifetime access.',
    features: [
      'Full module access with all lessons',
      'Knowledge checks & glossaries',
      'Lifetime access',
      'Progress tracking',
    ],
    cta: 'Buy Now',
    ctaLink: '/courses',
    badge: null,
    highlighted: false,
  },
  {
    id: 'single_program',
    name: 'Single Program',
    price: '$149.99',
    description: 'All modules in a program. Best value for deep learning.',
    features: [
      'All modules in the program',
      'Structured learning path',
      'Lifetime access',
      'Progress tracking',
      'Upgrade from free module for $100',
    ],
    cta: 'Browse Programs',
    ctaLink: '/paths',
    badge: 'Best Value',
    highlighted: true,
  },
  {
    id: 'two_program_bundle',
    name: '2-Program Bundle',
    price: '$249.99',
    description: 'Pick any 2 programs. Save $50 vs buying individually.',
    features: [
      'Any 2 programs of your choice',
      'All modules in both programs',
      'Lifetime access',
      'Progress tracking',
      'Save $50 vs individual purchase',
    ],
    cta: 'Get Bundle',
    ctaLink: '/paths',
    badge: 'Save $50',
    highlighted: false,
  },
];

const tier2Products = [
  {
    id: 'exec_program',
    name: 'Single Executive Program',
    price: '$599',
    description: 'Immersive simulations with AI-powered scenarios.',
    features: [
      'AI Adversary Mode — hostile board member pushes back',
      'Branching Consequences — decisions affect future scenarios',
      'ASEAN Regulatory Complexity — MAS, BNM, OJK',
      'Capstone with Auto-Marking',
      'Peer Comparison Analytics',
    ],
    cta: 'Join Waitlist',
    ctaLink: '/waitlist',
    featured: true,
  },
  {
    id: 'exec_all_access',
    name: 'All-Access Executive',
    price: '$1,799',
    description: 'All executive simulations across every program.',
    features: [
      'All Single Executive Program features',
      'Access to all executive programs',
      'Priority cohort placement',
      'Executive certificate',
      'Quarterly new scenario releases',
    ],
    cta: 'Join Waitlist',
    ctaLink: '/waitlist',
    featured: false,
  },
];

const tier2LaunchPrograms = [
  'CEO', 'CFO', 'Cybersecurity', 'AI Strategy', 'Risk Mastery', 'Digital Transformation',
];

const faqs = [
  {
    question: 'Do modules expire?',
    answer: 'No. Every purchase comes with lifetime access. Learn at your own pace.',
  },
  {
    question: 'Can I try before I buy?',
    answer: 'Yes! New sign-ups get their first module completely free. Choose any module — standalone or part of a program.',
  },
  {
    question: 'What if my free module is part of a program?',
    answer: 'You can upgrade to the full program for just $100 (top-up). This gives you access to all remaining modules in that program.',
  },
  {
    question: 'Can standalone modules be upgraded to a program?',
    answer: 'No. Only modules that are part of a program are eligible for the $100 upgrade. Standalone modules remain individual courses.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards via Stripe. More payment options coming soon.',
  },
  {
    question: 'Can I get a refund?',
    answer: "If you're not satisfied within 7 days of purchase, contact us for a full refund.",
  },
  {
    question: 'When will Executive Education be available?',
    answer: 'Executive Education programs are launching soon. Join the waitlist to be notified and get early access pricing.',
  },
  {
    question: "What's the difference between Programs & Modules and Executive Education?",
    answer: 'Programs & Modules teach you the frameworks and knowledge. Executive Education puts you in the hot seat — AI-powered simulations, branching consequences, and capstone assessments where your decisions actually matter.',
  },
];

export default function PricingClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-primary-100 dark:text-gray-300 max-w-2xl mx-auto">
              One-time payment. Lifetime access. No subscriptions.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Tier 1 */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Programs & Modules
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Graduate-level content for aspiring and sitting executives
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tier1Products.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card
                className={cn(
                  'relative p-6 h-full flex flex-col',
                  product.highlighted && 'ring-2 ring-primary-600 shadow-lg'
                )}
              >
                {product.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span
                      className={cn(
                        'text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap',
                        product.id === 'free_module'
                          ? 'bg-green-500 text-white'
                          : product.id === 'two_program_bundle'
                          ? 'bg-blue-500 text-white'
                          : 'bg-primary-600 text-white'
                      )}
                    >
                      {product.badge}
                    </span>
                  </div>
                )}

                <div className="mb-4 mt-2">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {product.description}
                  </p>
                </div>

                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {product.price}
                  </span>
                  {product.price !== 'Free' && (
                    <span className="text-gray-500 dark:text-gray-400 ml-1 text-sm">
                      / one-time
                    </span>
                  )}
                </div>

                <ul className="space-y-2 mb-6 flex-grow">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={product.ctaLink}>
                  <Button
                    className={cn(
                      'w-full',
                      product.highlighted
                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white'
                    )}
                  >
                    {product.cta}
                  </Button>
                </Link>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tier 2 */}
      <div className="bg-gray-900 dark:bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 px-4 py-2 rounded-full mb-4">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">Coming Soon</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">
              Executive Education
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Where theory meets the war room. Immersive simulations for sitting C-level and directors.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {tier2Products.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
              >
                <Card
                  className={cn(
                    'relative p-6 h-full flex flex-col bg-gray-800 border-gray-700',
                    product.featured && 'ring-2 ring-amber-500'
                  )}
                >
                  {product.featured && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-amber-500 text-gray-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <div className="mb-4 mt-2">
                    <h3 className="text-lg font-semibold text-white">{product.name}</h3>
                    <p className="text-sm text-gray-400 mt-1">{product.description}</p>
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold text-white">{product.price}</span>
                    <span className="text-gray-400 ml-1 text-sm">/ one-time</span>
                  </div>

                  <ul className="space-y-2 mb-6 flex-grow">
                    {product.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Crown className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={cn(
                      'w-full',
                      product.featured
                        ? 'bg-amber-500 hover:bg-amber-600 text-gray-900'
                        : 'bg-gray-700 hover:bg-gray-600 text-white'
                    )}
                    onClick={() => (window.location.href = product.ctaLink)}
                  >
                    {product.cta}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              Launch programs: {tier2LaunchPrograms.join(' • ')}
            </p>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <button
                className="w-full flex items-center justify-between p-4 text-left"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <span className="font-medium text-gray-900 dark:text-white pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    'w-5 h-5 text-gray-500 transition-transform flex-shrink-0',
                    openFaq === idx && 'rotate-180'
                  )}
                />
              </button>
              {openFaq === idx && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="px-4 pb-4 text-gray-600 dark:text-gray-400"
                >
                  {faq.answer}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
