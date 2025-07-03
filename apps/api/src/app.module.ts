import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';
import { WebhooksModule } from './webhooks/webhooks.module';

const imports = [AuthModule, OrganizationModule, WebhooksModule];

// TODO: Conditionally import other modules based on feature flags (e.g., BillingModule, TwoFactorAuthModule)

@Module({
  imports: imports,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
