import { CanActivate, ExecutionContext } from '@nestjs/common';
import type { Lucia, Session, User } from 'lucia';
export declare class AuthGuard implements CanActivate {
    private readonly lucia;
    constructor(lucia: Lucia);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
declare global {
    namespace Express {
        interface Request {
            user?: User;
            session?: Session;
        }
    }
}
