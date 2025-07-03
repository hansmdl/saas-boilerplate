// TODO: Use Zod for more robust validation
// TODO: Use Zod for more robust validation
export class StripeWebhookDto {
  id?: string;
  object?: string;
  type?: string;
  data?: {
    object?: unknown; // Replaced 'any' with 'unknown' for better type safety
  };
  // Add other relevant Stripe webhook properties as needed
}
