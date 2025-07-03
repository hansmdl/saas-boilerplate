import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WebhooksService {
  private readonly logger = new Logger(WebhooksService.name);

  // TODO: Store webhook URLs in the database, associated with organizations
  private readonly registeredWebhooks: string[] = [
    'http://localhost:3002/test-webhook-receiver', // Example URL for testing
  ];

  async sendWebhook(event: string, data: object) { // Changed 'any' to 'object'
    this.logger.log(`Attempting to send webhook for event: ${event}`);
    for (const url of this.registeredWebhooks) {
      try {
        // TODO: Implement retry logic and dead-letter queue for failed webhooks
        // TODO: Implement secure signing of outgoing webhooks
        await axios.post(url, { event, data });
        this.logger.log(`Successfully sent webhook to ${url} for event ${event}`);
      } catch (error) {
        if (error instanceof Error) {
          this.logger.error(`Failed to send webhook to ${url} for event ${event}: ${error.message}`);
        } else {
          this.logger.error(`Failed to send webhook to ${url} for event ${event}: An unknown error occurred`);
        }
      }
    }
  }

  // TODO: Add methods for registering, updating, and deleting webhooks
}
