import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Lucia, Session, User } from 'lucia';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject('LUCIA') private readonly lucia: Lucia) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const sessionId = this.lucia.readSessionCookie(request.headers.cookie ?? '');
    if (!sessionId) {
      throw new UnauthorizedException();
    }

    const { session, user } = await this.lucia.validateSession(sessionId);

    if (session && session.fresh) {
      const sessionCookie = this.lucia.createSessionCookie(session.id);
      response.setHeader('Set-Cookie', sessionCookie.serialize());
    }

    if (!session) {
      const sessionCookie = this.lucia.createBlankSessionCookie();
      response.setHeader('Set-Cookie', sessionCookie.serialize());
      throw new UnauthorizedException();
    }

    request.user = user;
    request.session = session;

    return true;
  }
}

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: User;
      session?: Session;
    }
  }
}
