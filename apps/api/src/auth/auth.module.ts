import { Module } from '@nestjs/common';
import { lucia } from './lucia';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [
    {
      provide: 'LUCIA',
      useValue: lucia,
    },
    AuthService,
  ],
  exports: ['LUCIA', AuthService],
})
export class AuthModule {}
