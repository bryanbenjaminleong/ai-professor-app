// Stripe & Pricing Configuration — CXO Academy

export const PRICING_TIERS = {
  TIER_1: {
    name: 'Programs & Modules',
    tagline: 'One-time payment. Lifetime access. No subscriptions.',
    products: {
      FREE_MODULE: {
        id: 'free_module',
        name: 'Free First Module',
        price: 0,
        priceDisplay: 'Free',
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
      },
      SINGLE_MODULE: {
        id: 'single_module',
        name: 'Single Module',
        price: 3999, // $39.99 in cents
        priceDisplay: '$39.99',
        description: 'Buy any individual module. Lifetime access.',
        features: [
          'Full module access with all lessons',
          'Knowledge checks & glossaries',
          'Lifetime access',
          'Progress tracking',
        ],
        cta: 'Buy Module',
        ctaLink: '/courses',
      },
      SINGLE_PROGRAM: {
        id: 'single_program',
        name: 'Single Program',
        price: 14999, // $149.99 in cents
        priceDisplay: '$149.99',
        description: 'All modules in a program. Save vs buying individually.',
        features: [
          'All modules in the program (4-5 modules)',
          'Structured learning path',
          'Lifetime access',
          'Progress tracking',
          'Save up to 50% vs individual modules',
        ],
        cta: 'Buy Program',
        ctaLink: '/paths',
        recommended: true,
      },
      PROGRAM_BUNDLE: {
        id: 'program_bundle',
        name: '2-Program Bundle',
        price: 24999, // $249.99 in cents
        priceDisplay: '$249.99',
        description: 'Pick any 2 programs. Best value for serious learners.',
        features: [
          '2 programs of your choice',
          '8-10 modules included',
          'Lifetime access',
          'Progress tracking',
          'Save $50 vs buying separately',
        ],
        cta: 'Choose 2 Programs',
        ctaLink: '/paths',
      },
    },
  },
  TIER_2: {
    name: 'Executive Education',
    tagline: 'Where Theory Meets the War Room',
    status: 'coming_soon' as const,
    description:
      'Immersive, executive decision-making simulations for sitting C-level and directors. Boardroom scenarios, AI adversary mode, branching consequences, and capstone projects with auto-marking.',
    launchPrograms: [
      'CEO',
      'CFO',
      'Cybersecurity',
      'AI Strategy',
      'Risk Mastery',
      'Digital Transformation',
    ],
    products: {
      EXEC_PROGRAM: {
        id: 'exec_program',
        name: 'Single Executive Program',
        price: 59900, // $599
        priceDisplay: '$599',
        description: 'Advanced simulations for one program.',
        features: [
          'AI Adversary Mode — hostile board/regulator pushes back',
          'Branching Consequences — decisions affect future scenarios',
          'ASEAN Regulatory Complexity — MAS/BNM/OJK scenarios',
          'Capstone with Auto-Marking — Board Performance Review',
          'Peer Comparison Analytics',
          'Certificate of completion',
        ],
        cta: 'Join Waitlist',
        ctaLink: '/waitlist',
        comingSoon: true,
        featured: true,
      },
      EXEC_ALL_ACCESS: {
        id: 'exec_all_access',
        name: 'All-Access Executive Pass',
        price: 179900, // $1,799
        priceDisplay: '$1,799',
        description: 'Unlimited access to all executive simulations.',
        features: [
          'All 6+ executive programs at launch',
          'AI Adversary Mode across all programs',
          'Branching Consequences & ASEAN scenarios',
          'Capstone with Board Performance Review',
          'Peer Comparison Analytics',
          'Priority access to new simulations',
          'Certificate for each completed program',
        ],
        cta: 'Join Waitlist',
        ctaLink: '/waitlist',
        comingSoon: true,
      },
    },
  },
} as const;

// Upgrade pricing
export const UPGRADE_PRICE = {
  freeModuleToProgram: 10000, // $100 top-up in cents
  freeModuleToProgramDisplay: '$100',
} as const;

// Free module notification messages
export const FREE_MODULE_MESSAGES = {
  standalone:
    "This is your first module and it's on us. Standalone modules cannot be upgraded to a program. Happy learning!",
  programPart:
    "This is your first module and it's on us. As this module is part of a program, you can upgrade (top-up $100) to the full program. Happy learning!",
} as const;

// Stripe config
export const STRIPE_CONFIG = {
  currency: 'usd',
  successUrl: '/courses?payment=success',
  cancelUrl: '/pricing?payment=cancelled',
} as const;

// Helpers
export function formatPrice(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100);
}

export function canUpgradeToProgram(isStandalone: boolean): boolean {
  return !isStandalone;
}

export function getFreeModuleMessage(isStandalone: boolean): string {
  return isStandalone
    ? FREE_MODULE_MESSAGES.standalone
    : FREE_MODULE_MESSAGES.programPart;
}
