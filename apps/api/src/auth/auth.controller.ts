import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { ZodValidationPipe } from '../pipes/zod.pipe.js';
import { registerSchema, type RegisterDto } from './dto/register.dto.js';
import { loginSchema } from './dto/login.dto.js';
import { forgotPasswordSchema, type ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { resetPasswordSchema, type ResetPasswordDto } from './dto/reset-password.dto.js';
import { CurrentUser } from './decorators/user.decorator.js';
import type { User } from 'db';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() registerDto: RegisterDto) {
    await this.authService.register(registerDto);
    return { message: 'User registered successfully. Please check your email for verification.' };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Request() req: { user: Omit<User, 'password'> }) {
    // LocalAuthGuard has already validated the user and attached it to the request
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@CurrentUser() user: Omit<User, 'password'>) {
    return user;
  }

  @Post('forgot-password')
  @UsePipes(new ZodValidationPipe(forgotPasswordSchema))
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    await this.authService.forgotPassword(forgotPasswordDto);
    return { message: 'Password reset email sent' };
  }

  @Post('reset-password')
  @UsePipes(new ZodValidationPipe(resetPasswordSchema))
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.authService.resetPassword(resetPasswordDto);
    return { message: 'Password has been reset successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('send-verification-email')
  async sendVerificationEmail(@CurrentUser() user: Omit<User, 'password'>) {
    await this.authService.sendVerificationEmail({ email: user.email });
    return { message: 'Verification email sent' };
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    await this.authService.verifyEmail(token);
    return { message: 'Email verified successfully' };
  }
}
