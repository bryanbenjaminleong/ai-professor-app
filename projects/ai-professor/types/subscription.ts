// Subscription Types - Placeholder
// TODO: Implement proper subscription tiers when Stripe is enabled

export interface SubscriptionPlan {
  tier: string
  name: string
  description: string
  price_monthly: number
  price_yearly: number
  features: string[]
}
