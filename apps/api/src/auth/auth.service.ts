import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Lucia } from 'lucia';
import { PrismaClient, User } from 'db';
import type { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import type { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  private readonly prisma = new PrismaClient();

  constructor(@Inject('LUCIA') private readonly lucia: Lucia) {}

  async register(registerDto: RegisterDto) {
    const { email, password } = registerDto;

    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    const session = await this.lucia.createSession(user.id, {});
    return this.lucia.createSessionCookie(session.id);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const session = await this.lucia.createSession(user.id, {});
    return this.lucia.createSessionCookie(session.id);
  }

  async logout(sessionId: string) {
    await this.lucia.invalidateSession(sessionId);
  }
}
