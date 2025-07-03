"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const email_1 = require("email");
const db_1 = require("db");
let AuthService = class AuthService {
    jwtService;
    emailService;
    prisma;
    constructor(jwtService, emailService, prisma) {
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.prisma = prisma;
    }
    async validateUser(email, pass) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (user && user.password) {
            const isValidPassword = await bcrypt.compare(pass, user.password);
            if (isValidPassword) {
                return user;
            }
        }
        return null;
    }
    async login(user) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
    async register(registerDto) {
        const { email, password } = registerDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await this.prisma.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        await this.sendVerificationEmail({ email: user.email });
        return user;
    }
    async forgotPassword(forgotPasswordDto) {
        const { email } = forgotPasswordDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            // Don't reveal if user exists or not
            return;
        }
        const token = (0, crypto_1.randomUUID)();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
        await this.prisma.passwordResetToken.create({
            data: {
                token,
                email,
                expiresAt,
            },
        });
        await this.emailService.sendPasswordResetEmail(email, token);
    }
    async resetPassword(resetPasswordDto) {
        const { token, password } = resetPasswordDto;
        const resetToken = await this.prisma.passwordResetToken.findUnique({
            where: { token },
        });
        if (!resetToken || new Date() > resetToken.expiresAt) {
            throw new common_1.UnauthorizedException('Invalid or expired password reset token');
        }
        const user = await this.prisma.user.findUnique({
            where: { email: resetToken.email },
        });
        if (!user) {
            // This should not happen if the token is valid
            throw new common_1.UnauthorizedException('Invalid token');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        await this.prisma.user.update({
            where: { id: user.id },
            data: { password: hashedPassword },
        });
        await this.prisma.passwordResetToken.delete({
            where: { token },
        });
    }
    async sendVerificationEmail(sendVerificationEmailDto) {
        const { email } = sendVerificationEmailDto;
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.emailVerified) {
            return;
        }
        const token = (0, crypto_1.randomUUID)();
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour
        await this.prisma.emailVerificationToken.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
            },
        });
        await this.emailService.sendEmailVerificationEmail(email, token);
    }
    async verifyEmail(token) {
        const verificationToken = await this.prisma.emailVerificationToken.findUnique({
            where: { token },
        });
        if (!verificationToken || new Date() > verificationToken.expiresAt) {
            throw new common_1.UnauthorizedException('Invalid or expired verification token');
        }
        await this.prisma.user.update({
            where: { id: verificationToken.userId },
            data: { emailVerified: true },
        });
        await this.prisma.emailVerificationToken.delete({
            where: { token },
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        email_1.EmailService,
        db_1.PrismaService])
], AuthService);
