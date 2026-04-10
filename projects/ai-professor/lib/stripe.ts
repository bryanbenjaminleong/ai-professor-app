// Stripe Client Configuration - Stub for build
// TODO: Enable Stripe when ready for production payments

export const STRIPE_CONFIG = {
  coursePrice: 3999, // $39.99 in cents
  currency: 'usd',
  priceDisplay: '$39.99',
}

export function formatPrice(cents: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(cents / 100)
}

// Placeholder functions
export async function createCheckoutSession() {
  throw new Error('Stripe not configured')
}

export async function createBillingPortalSession() {
  throw new Error('Stripe not configured')
}
