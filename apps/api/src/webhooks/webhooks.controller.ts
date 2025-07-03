import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { StripeWebhookDto } from './dto/stripe-webhook.dto';

@Controller('webhooks')
export class WebhooksController {
  // TODO: Implement a WebhookService to handle business logic and verification
  // TODO: Add Zod validation for incoming webhook payloads

  @Post('stripe')
  @HttpCode(HttpStatus.OK) // Stripe expects a 200 OK response
  async handleStripeWebhook(
    @Body() payload: StripeWebhookDto,
    @Headers('stripe-signature') signature: string,
  ) {
    console.log('Received Stripe webhook:', payload);
    console.log('Stripe-Signature:', signature);

    // TODO: Implement actual Stripe webhook signature verification
    // const event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);

    // TODO: Process the webhook event (e.g., update subscription status, send email)
    console.log('Stripe webhook processed (simulated).');
    return { received: true };
  }

  // TODO: Add more webhook endpoints for other services (e.g., GitHub, Slack)
}
