import type { Lucia } from 'lucia';
import type { RegisterDto } from './dto/register.dto';
import type { LoginDto } from './dto/login.dto';
import { EmailService } from 'email';
import type { ForgotPasswordDto } from './dto/forgot-password.dto';
import type { ResetPasswordDto } from './dto/reset-password.dto';
import type { SendVerificationEmailDto } from './dto/send-verification-email.dto';
export declare class AuthService {
    private readonly lucia;
    private readonly emailService;
    private readonly prisma;
    constructor(lucia: Lucia, emailService: EmailService);
    register(registerDto: RegisterDto): Promise<import("lucia").Cookie>;
    login(loginDto: LoginDto): Promise<import("lucia").Cookie>;
    logout(sessionId: string): Promise<void>;
    forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    sendVerificationEmail(sendVerificationEmailDto: SendVerificationEmailDto): Promise<void>;
    verifyEmail(token: string): Promise<void>;
}
