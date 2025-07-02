import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import type { RegisterDto } from './dto/register.dto';
import { registerSchema } from './dto/register.dto';
import { ZodValidationPipe } from '../pipes/zod.pipe';
import { loginSchema } from './dto/login.dto';
import type { LoginDto } from './dto/login.dto';
import { forgotPasswordSchema } from './dto/forgot-password.dto';
import type { ForgotPasswordDto } from './dto/forgot-password.dto';
import { resetPasswordSchema } from './dto/reset-password.dto';
import type { ResetPasswordDto } from './dto/reset-password.dto';
import { sendVerificationEmailSchema } from './dto/send-verification-email.dto';
import type { SendVerificationEmailDto } from './dto/send-verification-email.dto';
import { AuthGuard } from './lucia.guard';
import { CurrentUser } from './decorators/user.decorator';
import { CurrentSession } from './decorators/session.decorator';
import type { User, Session } from 'lucia';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ZodValidationPipe(registerSchema))
  async register(@Body() registerDto: RegisterDto, @Res({ passthrough: true }) response: Response) {
    const sessionCookie = await this.authService.register(registerDto);
    response.setHeader('Set-Cookie', sessionCookie.serialize());
    return { message: 'User registered successfully' };
  }

  @Post('login')
  @UsePipes(new ZodValidationPipe(loginSchema))
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) response: Response) {
    const sessionCookie = await this.authService.login(loginDto);
    response.setHeader('Set-Cookie', sessionCookie.serialize());
    return { message: 'Logged in successfully' };
  }

  @Post('logout')
  @UseGuards(AuthGuard)
  async logout(@CurrentSession() session: Session, @Res({ passthrough: true }) response: Response) {
    await this.authService.logout(session.id);
    // Here you should also clear the cookie from the client
    // For example, by setting an expired cookie
    response.clearCookie('lucia_session');
    return { message: 'Logged out successfully' };
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@CurrentUser() user: User) {
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

  @Post('send-verification-email')
  @UseGuards(AuthGuard)
  async sendVerificationEmail(@CurrentUser() user: User) {
    await this.authService.sendVerificationEmail({ email: user.email });
    return { message: 'Verification email sent' };
  }

  @Get('verify-email/:token')
  async verifyEmail(@Param('token') token: string) {
    await this.authService.verifyEmail(token);
    return { message: 'Email verified successfully' };
  }
}
