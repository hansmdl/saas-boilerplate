import { Module } from '@nestjs/common';
import { lucia } from './lucia';
import { AuthService } from './auth.service';

@Module({
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
