var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, Param, Post, Request, UseGuards, UsePipes, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ZodValidationPipe } from '../pipes/zod.pipe';
import { registerSchema } from './dto/register.dto';
import { loginSchema } from './dto/login.dto';
import { forgotPasswordSchema } from './dto/forgot-password.dto';
import { resetPasswordSchema } from './dto/reset-password.dto';
import { CurrentUser } from './decorators/user.decorator';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    async register(registerDto) {
        await this.authService.register(registerDto);
        return { message: 'User registered successfully. Please check your email for verification.' };
    }
    async login(req) {
        // LocalAuthGuard has already validated the user and attached it to the request
        return this.authService.login(req.user);
    }
    async me(user) {
        return user;
    }
    async forgotPassword(forgotPasswordDto) {
        await this.authService.forgotPassword(forgotPasswordDto);
        return { message: 'Password reset email sent' };
    }
    async resetPassword(resetPasswordDto) {
        await this.authService.resetPassword(resetPasswordDto);
        return { message: 'Password has been reset successfully' };
    }
    async sendVerificationEmail(user) {
        await this.authService.sendVerificationEmail({ email: user.email });
        return { message: 'Verification email sent' };
    }
    async verifyEmail(token) {
        await this.authService.verifyEmail(token);
        return { message: 'Email verified successfully' };
    }
};
__decorate([
    Post('register'),
    UsePipes(new ZodValidationPipe(registerSchema)),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    UseGuards(AuthGuard('local')),
    Post('login'),
    UsePipes(new ZodValidationPipe(loginSchema)),
    __param(0, Request()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Get('me'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
__decorate([
    Post('forgot-password'),
    UsePipes(new ZodValidationPipe(forgotPasswordSchema)),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    Post('reset-password'),
    UsePipes(new ZodValidationPipe(resetPasswordSchema)),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    UseGuards(JwtAuthGuard),
    Post('send-verification-email'),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "sendVerificationEmail", null);
__decorate([
    Get('verify-email/:token'),
    __param(0, Param('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
